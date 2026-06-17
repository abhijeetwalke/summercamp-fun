/* ============================================================
   Summer Camp — Mission engine  [ENGINE]
   Constrained randomization: tier blend (ramp) + element spread +
   style diversity + no repeats + bounce-backs + capstone rule.
   Also: hint ladder, frustration sensing, reward computation.
   ============================================================ */

window.SC = window.SC || {};

SC.Engine = (function () {

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* Pick `n` from `pool` honoring a tier blend and spreading elements/styles. */
  function constrainedPick(pool, n, blend) {
    const byTier = { 1: [], 2: [], 3: [] };
    pool.forEach((q) => byTier[q.tier] && byTier[q.tier].push(q));
    Object.keys(byTier).forEach((t) => (byTier[t] = shuffle(byTier[t])));

    // tier quotas (largest-remainder rounding)
    const quotas = {};
    let assigned = 0;
    [1, 2, 3].forEach((t) => { quotas[t] = Math.floor(n * (blend[t] || 0)); assigned += quotas[t]; });
    const rema = [1, 2, 3].sort((a, b) => (n * blend[b] % 1) - (n * blend[a] % 1));
    for (let i = 0; assigned < n && i < 3; i++, assigned++) quotas[rema[i % 3]] += 1;

    const picked = [];
    const elCount = {}, styleCount = {};
    function scoreQ(q) { // prefer under-represented elements & styles
      return (elCount[q.el] || 0) * 2 + (styleCount[q.style] || 0);
    }
    [1, 2, 3].forEach((t) => {
      let need = quotas[t];
      const cands = byTier[t];
      while (need > 0 && cands.length) {
        cands.sort((a, b) => scoreQ(a) - scoreQ(b));
        const q = cands.shift();
        picked.push(q);
        elCount[q.el] = (elCount[q.el] || 0) + 1;
        styleCount[q.style] = (styleCount[q.style] || 0) + 1;
        need--;
      }
    });
    // backfill from any tier if a tier ran dry (small starter pool)
    if (picked.length < n) {
      const rest = shuffle(pool.filter((q) => !picked.includes(q)));
      while (picked.length < n && rest.length) picked.push(rest.shift());
    }
    return shuffle(picked);
  }

  /* ---- Build a Mission ---- */
  function buildMission(subjectCfg, bank, opts) {
    opts = opts || {};
    const sub = SC.State.subject(subjectCfg.id);
    const kind = opts.kind || "daily";
    const size = opts.size || (kind === "redemption" ? 5 : Math.min(SC.PLATFORM.missionSize, bank.length));
    const { week, blend } = SC.blendForMission(sub.dailyCount);

    const used = new Set();
    sub.missions.forEach((m) => { if (m.kind === "daily") m.qids.forEach((id) => used.add(id)); });

    let pool = bank.filter((q) => !used.add ? true : !used.has(q.id));
    if (kind === "retake") pool = bank.filter((q) => opts.qids.includes(q.id));
    if (pool.length < size) pool = bank.slice(); // starter pool is small; allow reuse rather than starve

    // capstone rule: ~capstonePerMission from avatarstate; rest from regular elements
    const capN = kind === "daily" && subjectCfg.capstonePerMission ? subjectCfg.capstonePerMission(week) : 0;
    const capPool = pool.filter((q) => q.el === "avatarstate");
    const regPool = pool.filter((q) => q.el !== "avatarstate");
    let picked = constrainedPick(regPool, size - Math.min(capN, capPool.length), blend);
    if (capN && capPool.length) picked = picked.concat(shuffle(capPool).slice(0, capN));

    // bounce-backs: swap in up to 2 previously-missed questions (fresh chance at an old miss)
    const bounceIds = kind === "daily" ? SC.State.bouncebackCandidates(subjectCfg.id).slice(0, 2) : [];
    const bounceQs = bank.filter((q) => bounceIds.includes(q.id) && !picked.find((p) => p.id === q.id));
    bounceQs.forEach((bq) => { if (picked.length >= size) picked.pop(); picked.push(bq); });
    picked = shuffle(picked);

    if (kind === "retake") picked = shuffle(bank.filter((q) => opts.qids.includes(q.id)));

    const mission = {
      idx: sub.missions.length,
      kind, week,
      attemptNumber: kind === "retake" ? opts.attemptNumber : 1,
      retakeOf: kind === "retake" ? opts.retakeOf : null,
      qids: picked.map((q) => q.id),
      bounceIds,
      optionOrders: {}, // per-question display permutation (persisted so refresh is stable)
      perQ: {},
      currentQ: 0,
      startedAt: Date.now(),
      elapsedMs: 0,
      done: false,
      story: SC.Journey ? SC.Journey.generate(picked, subjectCfg, opts.routeHint) : null,
      frustration: [],
    };
    picked.forEach((q) => {
      mission.optionOrders[q.id] = shuffle([0, 1, 2, 3, 4]);
      mission.perQ[q.id] = { clicks: 0, picks: [], hint1: false, hint2: false,
        postHint: null, timeMs: 0, bounceback: bounceIds.includes(q.id), breather: false };
    });
    sub.missions.push(mission);
    SC.State.save();
    return mission;
  }

  /* ---- Hint ladder: what to show after `clicks` wrong clicks ---- */
  function hintFor(q, rec) {
    if (rec.clicks === 1) return { level: 1, text: q.hint1 };
    if (rec.clicks === 2) return { level: 2, text: q.hint2 };
    return { level: 3, text: null }; // Miss 3+: no hint; flagged hot, walkthrough teaches
  }

  /* ---- Frustration sensing v1 (derived from existing logs only) ---- */
  function senseFrustration(mission, qid, rec, clickGapMs) {
    const triggers = [];
    if (clickGapMs != null && clickGapMs < 2500 && rec.clicks >= 2) triggers.push("rapid-fire");
    if (rec.timeMs > 4 * 60 * 1000 && rec.clicks === 0) triggers.push("stall");
    const order = mission.qids;
    const i = order.indexOf(qid);
    if (i >= 2) {
      const lastThree = order.slice(i - 2, i + 1).map((id) => mission.perQ[id]);
      if (lastThree.every((r) => r.clicks >= 2)) triggers.push("three-multi-click");
    }
    if (triggers.length) mission.frustration.push({ qid, triggers, at: Date.now() });
    return triggers;
  }

  /* ---- Rewards (effort-aligned, never gating) ---- */
  function computeRewards(mission, bank) {
    const qIndex = {}; bank.forEach((q) => (qIndex[q.id] = q));
    const recs = mission.qids.map((id) => mission.perQ[id]);
    const firstClicks = recs.filter((r) => r.clicks === 1).length;
    const hintFree = recs.filter((r) => !r.hint1 && !r.hint2).length;
    const bounceWins = mission.qids.filter((id) => mission.perQ[id].bounceback && mission.perQ[id].clicks === 1).length;

    let best = 0, cur = 0; // longest first-click run
    mission.qids.forEach((id) => { cur = mission.perQ[id].clicks === 1 ? cur + 1 : 0; best = Math.max(best, cur); });

    const breakdown = [];
    let tiles = 0;
    tiles += 3; breakdown.push({ why: "Journey completed", tiles: 3 });
    const streakBonus = Math.floor(best / 4);
    if (streakBonus) { tiles += streakBonus; breakdown.push({ why: `First-try run of ${best}`, tiles: streakBonus }); }
    const hintBonus = Math.floor(hintFree / 7);
    if (hintBonus) { tiles += hintBonus; breakdown.push({ why: `${hintFree} challenges without a hint`, tiles: hintBonus }); }
    if (bounceWins) { tiles += bounceWins * 2; breakdown.push({ why: `${bounceWins} bounce-back${bounceWins > 1 ? "s" : ""} — old misses, beaten`, tiles: bounceWins * 2 }); }
    const whiteLotus = mission.kind === "daily" && firstClicks === mission.qids.length;
    return { tiles, whiteLotus, breakdown, firstClicks, hintFree, bounceWins, bestRun: best };
  }

  return { buildMission, hintFor, senseFrustration, computeRewards, shuffle };
})();
