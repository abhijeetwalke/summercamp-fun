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
      // ---- Glow-Up v2 (2026-06-18): XP / levels / achievements ----
      xp: 0,                         // explorer XP — only ever increases (no-shame)
      achievements: {},              // achievement id -> earnedAt timestamp
      flags: { everPerfect: false, debater: false },
      // NOTE: migratedV2 is intentionally NOT set here, so the one-time v2
      // back-fill in load() runs once even for brand-new states (a no-op then).
      // If it were seeded here, the light-migration loop would copy it onto an
      // old v1 record and skip the back-fill.
    };
  }

  function load() {
    if (cache) return cache;
    try {
      var raw = localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : fresh();
      // light migration guard — add any new top-level keys without losing data
      var f = fresh();
      for (var k in f) if (!(k in cache)) cache[k] = f[k];
      // ---- v2 migration (XP / levels / achievements) ----
      // Extends the existing "summer-camp-world-v1" record in place so NO saved
      // progress is ever lost. Runs once (guarded by migratedV2). Back-fills XP
      // and unlocks earned achievements from the progress already on the device,
      // silently (no toasts) so a returning learner sees their real level.
      if (!cache.flags) cache.flags = { everPerfect: false, debater: false };
      if (typeof cache.xp !== "number") cache.xp = 0;
      if (!cache.achievements) cache.achievements = {};
      if (!cache.migratedV2) {
        cache.migratedV2 = true;
        var bx = 0, id;
        for (id in cache.lessons) {
          if (cache.lessons[id] && cache.lessons[id].done) {
            bx += 20 + Math.round((cache.lessons[id].best || 0) / 10) * 2;
            if ((cache.lessons[id].best || 0) === 100) cache.flags.everPerfect = true;
          }
        }
        for (var cid in cache.sections) if (cache.sections[cid] && cache.sections[cid].badge) bx += 60;
        if (cache.drill && cache.drill.best) bx += 10 + (cache.drill.best >= 90 ? 10 : 0);
        bx += Object.keys(cache.countriesSeen || {}).length * 2;
        cache.xp = Math.max(cache.xp, bx);
        evaluateAchievements(cache);   // unlock anything already earned (silent)
      }
    } catch (e) { cache = fresh(); }
    return cache;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cache)); }
    catch (e) { /* storage blocked — keep working in memory */ }
  }
  function reset() { cache = fresh(); save(); }

  /* ============================================================
     GLOW-UP v2 — XP, explorer levels, and achievements.
     Effort-based + no-shame: XP only ever goes UP, levels are status
     (never a gate), and nothing here can lock a learner out of content.
     ============================================================ */

  // Explorer level ladder (status, not a gate). Thresholds are tuned so a full
  // pass of the whole ~60+ lesson app (10 per continent) + badges + drills
  // comfortably reaches "World Master". Rescaled 2026-06-30 as lands grew past 39.
  var LEVELS = [
    { name: "Explorer",     min: 0,    emoji: "🧭" },
    { name: "Scout",        min: 150,  emoji: "🔭" },
    { name: "Navigator",    min: 400,  emoji: "⛵" },
    { name: "Cartographer", min: 800,  emoji: "🗺️" },
    { name: "Globetrotter", min: 1400, emoji: "🌍" },
    { name: "World Master", min: 2100, emoji: "🌟" },
  ];

  function levelInfo(xp) {
    xp = xp || 0;
    var i = 0;
    for (var k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k].min) i = k;
    var cur = LEVELS[i], next = LEVELS[i + 1] || null;
    var into = xp - cur.min, span = next ? (next.min - cur.min) : 1;
    return {
      index: i, level: i + 1, name: cur.name, emoji: cur.emoji, xp: xp,
      curMin: cur.min, nextMin: next ? next.min : cur.min,
      into: into, span: span,
      pct: next ? Math.max(0, Math.min(100, Math.round(into / span * 100))) : 100,
      isMax: !next, nextName: next ? next.name : null, nextEmoji: next ? next.emoji : null,
    };
  }

  // Achievement definitions — collectible milestones beyond the six continent
  // badges. Each test(s) reads the state object (s) and returns true when earned.
  var ACH = [
    { id: "first_steps",   name: "First Steps",   emoji: "👣", desc: "Complete your very first lesson",
      test: function (s) { return lessonsDoneCount(s) >= 1; } },
    { id: "perfect",       name: "Perfect!",      emoji: "💯", desc: "Score 100% on any quiz",
      test: function (s) { return !!(s.flags && s.flags.everPerfect); } },
    { id: "globetrotter",  name: "Globetrotter",  emoji: "🌐", desc: "Learn a lesson on every continent",
      test: function (s) { return continentsTouched(s) >= 6; } },
    { id: "on_fire",       name: "On Fire",       emoji: "🔥", desc: "Reach a 3-day learning streak",
      test: function (s) { return (s.streak && s.streak.best) >= 3; } },
    { id: "unstoppable",   name: "Unstoppable",   emoji: "⚡", desc: "Reach a 7-day learning streak",
      test: function (s) { return (s.streak && s.streak.best) >= 7; } },
    { id: "map_master",    name: "Map Master",    emoji: "🎯", desc: "Score 90%+ on a Geography Drill",
      test: function (s) { return (s.drill && s.drill.best) >= 90; } },
    { id: "completionist", name: "Completionist", emoji: "🎓", desc: "Finish every lesson",
      test: function (s) { return lessonsDoneCount(s) >= totalLessonCount(); } },
    { id: "atlas_explorer",name: "Atlas Explorer",emoji: "🧳", desc: "Open every country card in the atlas",
      test: function (s) {
        var total = (window.WA && window.WA.COUNTRIES && window.WA.COUNTRIES.list) ? window.WA.COUNTRIES.list.length : 9999;
        return Object.keys(s.countriesSeen || {}).length >= total;
      } },
    { id: "debater",       name: "Debater",       emoji: "🗣️", desc: "Explore both sides of a Big Question",
      test: function (s) { return !!(s.flags && s.flags.debater); } },
  ];

  function lessonsDoneCount(s) { var n = 0; for (var id in s.lessons) if (s.lessons[id] && s.lessons[id].done) n++; return n; }
  // Total lessons currently defined in content (dynamic — adapts as lands grow).
  // Falls back high so the Completionist trophy is never awarded before content loads.
  function totalLessonCount() { var C = (window.WA && window.WA.CONTENT); return (C && C.lessons) ? Object.keys(C.lessons).length : 9999; }
  function continentsTouched(s) {
    var C = (window.WA && window.WA.CONTENT); if (!C) return 0; var n = 0;
    C.continents.forEach(function (co) {
      var any = co.lessons.some(function (lid) { return s.lessons[lid] && s.lessons[lid].done; });
      if (any) n++;
    });
    return n;
  }

  // Unlock any newly-earned achievements on the given state object. Mutates s
  // (caller saves) and returns the list of NEWLY unlocked ones (for celebration).
  function evaluateAchievements(s) {
    if (!s.achievements) s.achievements = {};
    var out = [];
    ACH.forEach(function (a) {
      if (s.achievements[a.id]) return;
      var ok = false; try { ok = a.test(s); } catch (e) { ok = false; }
      if (ok) { s.achievements[a.id] = Date.now(); out.push({ id: a.id, name: a.name, emoji: a.emoji, desc: a.desc }); }
    });
    return out;
  }

  // Award XP (never negative), flip any transient flags, then re-check
  // achievements. Returns a celebration payload for the engine to render.
  function grantXpAndCheck(amount, ev) {
    var s = load();
    var before = levelInfo(s.xp || 0);
    s.xp = (s.xp || 0) + Math.max(0, amount || 0);
    if (ev) { if (ev.perfect) s.flags.everPerfect = true; if (ev.debater) s.flags.debater = true; }
    var unlocked = evaluateAchievements(s);
    save();
    var after = levelInfo(s.xp);
    return {
      xpGained: Math.max(0, amount || 0),
      leveledUp: after.index > before.index,
      level: after, prevLevel: before, unlocked: unlocked,
    };
  }

  function useBigQuestion() {
    var s = load();
    var first = !(s.flags && s.flags.debater);
    return grantXpAndCheck(first ? 8 : 0, { debater: true });
  }

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
    var prevBest = rec.best;
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
    // XP: more for first completion and for higher scores; a little for improving.
    var xp = firstTime ? (20 + Math.round(scorePct / 10) * 2) : (scorePct > prevBest ? 8 : 3);
    var g = grantXpAndCheck(xp, { perfect: scorePct === 100 });
    save();
    return Object.assign({ firstTime: firstTime, best: rec.best }, g);
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
    var xp = earnedNow ? 60 : (scorePct >= passMark ? 15 : 5);
    var g = grantXpAndCheck(xp, { perfect: scorePct === 100 });
    save();
    return Object.assign({ earnedNow: earnedNow }, g);
  }
  function hasBadge(contId) { var s = load(); return !!(s.sections[contId] && s.sections[contId].badge); }

  /* ---------- countries ---------- */
  function seeCountry(code) {
    var s = load();
    if (s.countriesSeen[code]) return null;
    s.countriesSeen[code] = true;
    var g = grantXpAndCheck(2, {});   // small XP per new country; may unlock Atlas Explorer
    save();
    return g;
  }
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
    var xp = 10 + (isBest ? 10 : 0);
    var g = grantXpAndCheck(xp, { perfect: scorePct === 100 });
    save();
    return Object.assign({ isBest: isBest, best: s.drill.best }, g);
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

  /* Nothing is locked. Abhi (2026-06-20): no need to gate World Awareness — the learner
     can do a single lesson, crisscross between continents, or jump around in any order.
     Every continent, lesson, and section quiz is always open. (This matches the stated
     principle above: never a hard wall, never lock a learner out of content.)
     Signatures are kept so callers in wa.engine.js don't change. */
  function continentUnlocked(continents, idx) { return true; }
  function lessonUnlocked(cont, lessonIdx) { return true; }
  function sectionQuizUnlocked(cont) { return true; }

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
    // ---- Glow-Up v2: XP / levels / achievements ----
    xp: function () { return load().xp || 0; },
    levelInfo: function () { return levelInfo(load().xp || 0); },
    levels: function () { return LEVELS.slice(); },
    achievements: function () {
      var s = load();
      return ACH.map(function (a) {
        var at = s.achievements[a.id];
        return { id: a.id, name: a.name, emoji: a.emoji, desc: a.desc, earnedAt: at || null, unlocked: !!at };
      });
    },
    achievementsEarned: function () { var s = load(); return ACH.filter(function (a) { return s.achievements[a.id]; }).length; },
    achievementsTotal: function () { return ACH.length; },
    useBigQuestion: useBigQuestion,
  };
})();
