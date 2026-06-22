/* ============================================================
   The Sun & the Sword — State manager  [SUBJECT: sunsword]
   localStorage persistence, per-device (no backend, no auth).
   Own key so it never collides with Math, World, or Hardwood.
   Tracks: lessons done + best score, arc badges (the Hall of
   Names), day-streak, personal-best, debate cards considered.
   Mirrors the hoops/wa state contract so the engine plugs in.
   ============================================================ */

window.SUNSWORD = window.SUNSWORD || {};

SUNSWORD.State = (function () {
  var KEY = "summer-camp-sunsword-v1";
  var cache = null;

  function fresh() {
    return {
      version: 1,
      role: "child",                  // forward-accommodation for the parent/child split
      profile: { nickname: "", theme: "light" }, // the island reads in warm daylight
      lessons: {},                    // id -> { done, best, attempts, lastScore, completedAt }
      arcs: {},                       // arcId -> { quizBest, badge:true }
      personalBest: 0,                // best single quiz score across the whole island
      streak: { current: 0, best: 0, lastDay: null },
      debatesSeen: {},                // debate card id -> true
      log: [],                        // chronological activity
      milestonesShown: {},
    };
  }

  function load() {
    if (cache) return cache;
    try {
      var raw = localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : fresh();
      var f = fresh();
      for (var k in f) if (!(k in cache)) cache[k] = f[k];
    } catch (e) { cache = fresh(); }
    return cache;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {} }
  function reset() { cache = fresh(); save(); }

  /* ---------- day / streak ---------- */
  function today() { return new Date().toISOString().slice(0, 10); }
  function touchStreak() {
    var s = load(), t = today();
    if (s.streak.lastDay === t) return;
    var y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (s.streak.lastDay === y) s.streak.current += 1; else s.streak.current = 1;
    s.streak.lastDay = t;
    if (s.streak.current > s.streak.best) s.streak.best = s.streak.current;
    save();
  }
  function liveStreak() {
    var s = load();
    if (!s.streak.lastDay) return 0;
    var t = today(), y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    return (s.streak.lastDay === t || s.streak.lastDay === y) ? s.streak.current : 0;
  }

  /* ---------- personal best (any quiz) ---------- */
  function recordScore(pct) {
    var s = load(), isPB = pct > s.personalBest;
    if (isPB) { s.personalBest = pct; save(); }
    return isPB;
  }
  function personalBest() { return load().personalBest; }

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
    var isPB = recordScore(scorePct);
    touchStreak(); save();
    return { firstTime: firstTime, best: rec.best, isPB: isPB };
  }

  /* ---------- arc review quizzes + badges (the Hall of Names) ---------- */
  function recordArcQuiz(arcId, scorePct, passMark) {
    var s = load(), t = Date.now();
    var rec = s.arcs[arcId] || { quizBest: 0, badge: false };
    if (scorePct > rec.quizBest) rec.quizBest = scorePct;
    var earnedNow = false;
    if (scorePct >= passMark && !rec.badge) { rec.badge = true; earnedNow = true; }
    s.arcs[arcId] = rec;
    s.log.unshift({ t: t, kind: "review", id: arcId, score: scorePct });
    s.log = s.log.slice(0, 60);
    var isPB = recordScore(scorePct);
    touchStreak(); save();
    return { earnedNow: earnedNow, isPB: isPB };
  }
  function hasBadge(arcId) { var s = load(); return !!(s.arcs[arcId] && s.arcs[arcId].badge); }
  function arcQuizBest(arcId) { var s = load(); return (s.arcs[arcId] || {}).quizBest || 0; }

  /* ---------- debate cards ---------- */
  function seeDebate(id) { var s = load(); if (!s.debatesSeen[id]) { s.debatesSeen[id] = true; save(); } }
  function debatesSeenCount() { return Object.keys(load().debatesSeen).length; }

  /* ---------- derived progress ---------- */
  function arcProgress(arc) {
    var s = load(), total = arc.lessons.length, done = 0;
    arc.lessons.forEach(function (lid) { if (s.lessons[lid] && s.lessons[lid].done) done += 1; });
    return { done: done, total: total, pct: total ? Math.round(done / total * 100) : 0,
             allDone: done === total && total > 0 };
  }
  function totalsAcross(arcs) {
    var lessonsDone = 0, lessonsTotal = 0, badges = 0;
    arcs.forEach(function (arc) {
      var p = arcProgress(arc);
      lessonsDone += p.done; lessonsTotal += p.total;
      if (hasBadge(arc.id)) badges += 1;
    });
    return { lessonsDone: lessonsDone, lessonsTotal: lessonsTotal, badges: badges,
             pct: lessonsTotal ? Math.round(lessonsDone / lessonsTotal * 100) : 0 };
  }
  function bestScoreLesson() {
    var s = load(), b = 0, where = null;
    for (var id in s.lessons) if (s.lessons[id].best > b) { b = s.lessons[id].best; where = id; }
    return { score: b, lessonId: where };
  }

  /* Unlocking: everything is open, in any order, always — same call as the kid's
     other worlds (Abhi, 2026-06-18). Progress, best scores, and badges still track. */
  function arcUnlocked(arcs, idx) { return true; }
  function lessonUnlocked(arc, lessonIdx) { return true; }
  function reviewUnlocked(arc) { return true; }

  /* ---------- profile / milestones ---------- */
  function profile() { return load().profile; }
  function setProfile(patch) { var s = load(); Object.assign(s.profile, patch); save(); }
  function milestoneOnce(key) { var s = load(); if (s.milestonesShown[key]) return false; s.milestonesShown[key] = true; save(); return true; }

  return {
    load: load, save: save, reset: reset,
    liveStreak: liveStreak, touchStreak: touchStreak,
    recordScore: recordScore, personalBest: personalBest,
    lesson: lesson, recordLesson: recordLesson,
    recordArcQuiz: recordArcQuiz, hasBadge: hasBadge, arcQuizBest: arcQuizBest,
    seeDebate: seeDebate, debatesSeenCount: debatesSeenCount,
    arcProgress: arcProgress, totalsAcross: totalsAcross, bestScoreLesson: bestScoreLesson,
    arcUnlocked: arcUnlocked, lessonUnlocked: lessonUnlocked, reviewUnlocked: reviewUnlocked,
    profile: profile, setProfile: setProfile, milestoneOnce: milestoneOnce,
    log: function () { return load().log; },
  };
})();
