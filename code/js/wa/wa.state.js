/* ============================================================
   World Awareness — State manager  [SUBJECT: world]
   localStorage persistence. Mirrors the platform pattern:
   no backend, no auth, progress is per-device (browser storage).
   ============================================================ */

window.WA = window.WA || {};

WA.State = (function () {
  var KEY = "summer-camp-world-v1";
  var cache = null;

  function fresh() {
    return {
      version: 1,
      role: "child",                 // forward-accommodation for parent/child split
      profile: { nickname: "", avatar: "🧭", theme: "light" },
      lessons: {},                   // id -> { done:true, best:0..100, attempts:n, lastScore, completedAt }
      sections: {},                  // continentId -> { quizBest:0..100, badge:true }
      countriesSeen: {},             // countryCode -> true
      streak: { current: 0, best: 0, lastDay: null },
      drill: { best: 0, plays: 0 },  // Geography Drill (competition-prep layer)
      log: [],                       // chronological activity (for dashboard)
      milestonesShown: {},           // milestone key -> true (so we celebrate once)
    };
  }

  function load() {
    if (cache) return cache;
    try {
      var raw = localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : fresh();
      // light migration guard
      var f = fresh();
      for (var k in f) if (!(k in cache)) cache[k] = f[k];
    } catch (e) { cache = fresh(); }
    return cache;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cache)); }
    catch (e) { /* storage blocked — keep working in memory */ }
  }
  function reset() { cache = fresh(); save(); }

  /* ---------- day / streak ---------- */
  function today() { return new Date().toISOString().slice(0, 10); }
  function touchStreak() {
    var s = load(), t = today();
    if (s.streak.lastDay === t) return;          // already counted today
    var y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (s.streak.lastDay === y) s.streak.current += 1;
    else s.streak.current = 1;
    s.streak.lastDay = t;
    if (s.streak.current > s.streak.best) s.streak.best = s.streak.current;
    save();
  }
  // streak is "alive" only if last activity was today or yesterday
  function liveStreak() {
    var s = load();
    if (!s.streak.lastDay) return 0;
    var t = today(), y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    return (s.streak.lastDay === t || s.streak.lastDay === y) ? s.streak.current : 0;
  }

  /* ---------- lessons ---------- */
  function lesson(id) { var s = load(); return s.lessons[id] || null; }
  function recordLesson(id, scorePct) {
    var s = load(), t = Date.now();
    var rec = s.lessons[id] || { done: false, best: 0, attempts: 0 };
    rec.attempts += 1;
    rec.lastScore = scorePct;
    if (scorePct > rec.best) rec.best = scorePct;
    var firstTime = !rec.done;
    rec.done = true;
    rec.completedAt = rec.completedAt || t;
    s.lessons[id] = rec;
    s.log.unshift({ t: t, kind: "lesson", id: id, score: scorePct });
    s.log = s.log.slice(0, 60);
    touchStreak();
    save();
    return { firstTime: firstTime, best: rec.best };
  }

  /* ---------- section quizzes + badges ---------- */
  function recordSectionQuiz(contId, scorePct, passMark) {
    var s = load(), t = Date.now();
    var rec = s.sections[contId] || { quizBest: 0, badge: false };
    if (scorePct > rec.quizBest) rec.quizBest = scorePct;
    var earnedNow = false;
    if (scorePct >= passMark && !rec.badge) { rec.badge = true; earnedNow = true; }
    s.sections[contId] = rec;
    s.log.unshift({ t: t, kind: "section", id: contId, score: scorePct });
    s.log = s.log.slice(0, 60);
    touchStreak();
    save();
    return { earnedNow: earnedNow };
  }
  function hasBadge(contId) { var s = load(); return !!(s.sections[contId] && s.sections[contId].badge); }

  /* ---------- countries ---------- */
  function seeCountry(code) { var s = load(); if (!s.countriesSeen[code]) { s.countriesSeen[code] = true; save(); } }
  function countriesSeenCount() { return Object.keys(load().countriesSeen).length; }

  /* ---------- geography drill ---------- */
  function recordDrill(scorePct) {
    var s = load(), t = Date.now();
    s.drill.plays += 1;
    var isBest = scorePct > s.drill.best;
    if (isBest) s.drill.best = scorePct;
    s.log.unshift({ t: t, kind: "drill", id: "geo", score: scorePct });
    s.log = s.log.slice(0, 60);
    touchStreak();
    save();
    return { isBest: isBest, best: s.drill.best };
  }
  function drillStats() { return load().drill; }

  /* ---------- derived progress ---------- */
  function continentProgress(cont) {
    var s = load(), total = cont.lessons.length, done = 0;
    cont.lessons.forEach(function (lid) { if (s.lessons[lid] && s.lessons[lid].done) done += 1; });
    return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0,
             allDone: done === total && total > 0 };
  }
  function totalsAcross(continents) {
    var lessonsDone = 0, lessonsTotal = 0, badges = 0;
    continents.forEach(function (c) {
      var p = continentProgress(c);
      lessonsDone += p.done; lessonsTotal += p.total;
      if (hasBadge(c.id)) badges += 1;
    });
    return { lessonsDone: lessonsDone, lessonsTotal: lessonsTotal, badges: badges,
             pct: lessonsTotal ? Math.round(lessonsDone / lessonsTotal * 100) : 0 };
  }
  function bestScore() {
    var s = load(), b = 0, where = null;
    for (var id in s.lessons) if (s.lessons[id].best > b) { b = s.lessons[id].best; where = id; }
    return { score: b, lessonId: where };
  }

  /* unlocking: a continent is open if it's the first, or the previous one has >=1 lesson done.
     (Progressive unlocking per the vision — but never a hard wall: once you finish a continent
      the next is fully open.) */
  function continentUnlocked(continents, idx) {
    if (idx === 0) return true;
    var prev = continents[idx - 1];
    return continentProgress(prev).done >= 1;
  }
  // a lesson within a continent unlocks when the previous lesson in that continent is done
  function lessonUnlocked(cont, lessonIdx) {
    if (lessonIdx === 0) return true;
    var prevId = cont.lessons[lessonIdx - 1];
    var s = load();
    return !!(s.lessons[prevId] && s.lessons[prevId].done);
  }
  function sectionQuizUnlocked(cont) {
    return continentProgress(cont).allDone;
  }

  /* ---------- profile ---------- */
  function profile() { return load().profile; }
  function setProfile(patch) { var s = load(); Object.assign(s.profile, patch); save(); }

  /* ---------- milestones (celebrate once) ---------- */
  function milestoneOnce(key) {
    var s = load();
    if (s.milestonesShown[key]) return false;
    s.milestonesShown[key] = true; save(); return true;
  }

  return {
    load: load, save: save, reset: reset,
    lesson: lesson, recordLesson: recordLesson,
    recordSectionQuiz: recordSectionQuiz, hasBadge: hasBadge,
    seeCountry: seeCountry, countriesSeenCount: countriesSeenCount,
    recordDrill: recordDrill, drillStats: drillStats,
    continentProgress: continentProgress, totalsAcross: totalsAcross, bestScore: bestScore,
    continentUnlocked: continentUnlocked, lessonUnlocked: lessonUnlocked, sectionQuizUnlocked: sectionQuizUnlocked,
    liveStreak: liveStreak, profile: profile, setProfile: setProfile, milestoneOnce: milestoneOnce,
    log: function () { return load().log; },
  };
})();
