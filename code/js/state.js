/* ============================================================
   Summer Camp — State manager  [ENGINE]
   localStorage persistence + derived stats (mastery, streaks).
   Diagnostic of record = first attempts of "daily" missions only.
   ============================================================ */

window.SC = window.SC || {};

SC.State = (function () {
  let cache = null;

  function fresh() {
    return {
      version: 1,
      role: "child", // forward-accommodation for the future parent/child split
      subjects: {},  // per-subject progress, keyed by subject id
    };
  }

  function freshSubject() {
    return {
      missions: [],          // every run, in order (kinds: daily | retake | redemption)
      dailyCount: 0,         // completed kind:"daily" missions (drives the tier ramp)
      streak: { current: 0, best: 0, lastDay: null, pendingGap: null },
      tiles: { count: 0, whiteLotus: 0, log: [] },
      frustrationLog: [],
    };
  }

  function load() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(SC.APP.stateKey);
      cache = raw ? JSON.parse(raw) : fresh();
    } catch (e) { cache = fresh(); }
    return cache;
  }

  function save() {
    try { localStorage.setItem(SC.APP.stateKey, JSON.stringify(cache)); }
    catch (e) { /* storage full/blocked — app keeps working in memory */ }
  }

  function subject(id) {
    const s = load();
    if (!s.subjects[id]) { s.subjects[id] = freshSubject(); save(); }
    return s.subjects[id];
  }

  /* ---- Domain stats: first-click rate per element (diagnostic of record) ---- */
  function domainStats(subjectId, bank) {
    const sub = subject(subjectId);
    const byEl = {};
    const qIndex = {};
    bank.forEach((q) => (qIndex[q.id] = q));
    sub.missions.forEach((m) => {
      if (m.kind !== "daily" || !m.done) return; // retakes/redemption excluded from mastery
      Object.entries(m.perQ).forEach(([qid, rec]) => {
        const q = qIndex[qid];
        if (!q) return;
        const el = q.el;
        byEl[el] = byEl[el] || { attempts: 0, firstClicks: 0 };
        byEl[el].attempts += 1;
        if (rec.clicks === 1) byEl[el].firstClicks += 1;
      });
    });
    const P = SC.PLATFORM;
    Object.values(byEl).forEach((d) => {
      d.rate = d.attempts ? d.firstClicks / d.attempts : 0;
      d.guarded = d.attempts >= P.minAttemptsGuard;
      d.level = !d.guarded ? 0 : d.rate >= P.masterThreshold ? 2 : d.rate >= P.masteryThreshold ? 1 : 0;
      d.colorState = d.attempts === 0 ? "gray" : d.guarded && d.rate >= P.masteryThreshold ? "green" : "amber";
    });
    return byEl;
  }

  /* Avatar State unlock: >=3 other elements at Adept+ (architect default, logged) */
  function capstoneUnlocked(stats) {
    return Object.entries(stats).filter(([el, d]) => el !== "avatarstate" && d.level >= 1).length >= 3;
  }

  /* ---- Missed questions eligible for bounce-back (gap >= 1 mission) ---- */
  function bouncebackCandidates(subjectId) {
    const sub = subject(subjectId);
    const missed = {}; // qid -> last mission index where it was missed
    sub.missions.forEach((m, idx) => {
      if (m.kind !== "daily" || !m.done) return;
      Object.entries(m.perQ).forEach(([qid, rec]) => { if (rec.clicks > 1) missed[qid] = idx; });
    });
    // already bounced successfully? remove
    sub.missions.forEach((m) => {
      Object.entries(m.perQ).forEach(([qid, rec]) => {
        if (rec.bounceback && rec.clicks === 1) delete missed[qid];
      });
    });
    const lastIdx = sub.missions.length - 1;
    return Object.entries(missed).filter(([, i]) => lastIdx - i >= 1).map(([qid]) => qid);
  }

  /* ---- Streak (Mon–Fri). Returns "ok" | "gap" depending on missed weekdays ---- */
  function weekdaysBetween(d1, d2) {
    const out = [];
    const cur = new Date(d1); cur.setDate(cur.getDate() + 1);
    while (cur < d2) {
      const dow = cur.getDay();
      if (dow >= 1 && dow <= 5) out.push(cur.toISOString().slice(0, 10));
      cur.setDate(cur.getDate() + 1);
    }
    return out;
  }

  function checkStreak(subjectId) {
    const sub = subject(subjectId);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (!sub.streak.lastDay) return "ok";
    const last = new Date(sub.streak.lastDay + "T00:00:00");
    const missed = weekdaysBetween(last, today);
    if (missed.length > 0 && sub.streak.current > 0) { sub.streak.pendingGap = missed.length; return "gap"; }
    return "ok";
  }

  function bumpStreak(subjectId) {
    const sub = subject(subjectId);
    const todayStr = new Date().toISOString().slice(0, 10);
    if (sub.streak.lastDay === todayStr) return; // one bump per day
    sub.streak.current += 1;
    sub.streak.best = Math.max(sub.streak.best, sub.streak.current);
    sub.streak.lastDay = todayStr;
    sub.streak.pendingGap = null;
    save();
  }

  function resetStreak(subjectId) {
    const sub = subject(subjectId);
    sub.streak.current = 0; sub.streak.pendingGap = null; save();
  }

  return { load, save, subject, domainStats, capstoneUnlocked, bouncebackCandidates, checkStreak, bumpStreak, resetStreak };
})();
