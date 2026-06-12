/* ============================================================
   Summer Camp — App shell: router + views  [ENGINE]
   Hash routes:  #/            landing map
                 #/math        subject home (ribbon + mastery map)
                 #/math/mission          play the active mission
                 #/math/results/<i>      results dashboard
                 #/math/review/<i>/<qid> thinking-model walkthrough
                 #/math/collection       Pai Sho tile collection
   Effort-based language ONLY. Grade is never displayed.
   ============================================================ */

(function () {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const app = () => $("#app");
  const MATH = SC.getSubject("math");
  const BANK = window[MATH.contentGlobal] || [];
  const qById = {};
  BANK.forEach((q) => (qById[q.id] = q));

  let clockTimer = null, lastClickAt = null, nudged = false;

  /* ------------------------- router ------------------------- */
  function route() {
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    SC.Maps.stopAmbience();
    const h = location.hash.replace(/^#\/?/, "");
    const p = h.split("/").filter(Boolean);
    if (p.length === 0) return viewLanding();
    if (p[0] === "math") {
      if (p.length === 1) return viewMathHome();
      if (p[1] === "mission") return viewMission();
      if (p[1] === "results") return viewResults(+p[2]);
      if (p[1] === "review") return viewReview(+p[2], p[3]);
      if (p[1] === "collection") return viewCollection();
    }
    location.hash = "#/";
  }
  window.addEventListener("hashchange", route);

  /* ------------------------- landing ------------------------- */
  function viewLanding() {
    app().innerHTML = `
      <div class="landing">
        <h1 class="app-title">Summer Camp</h1>
        <p class="app-sub">Pick a land. Every land is a world to master.</p>
        ${SC.Maps.landingMap(SC.SUBJECTS)}
        <div id="toast" class="toast"></div>
      </div>`;
    SC.Maps.wireLanding(app(), (id) => { location.hash = "#/" + id; });
  }

  /* ------------------------- math home ------------------------- */
  function activeMission(sub) {
    const m = sub.missions[sub.missions.length - 1];
    return m && !m.done ? m : null;
  }

  function viewMathHome() {
    const sub = SC.State.subject("math");
    const stats = SC.State.domainStats("math", BANK);
    const cap = SC.State.capstoneUnlocked(stats);
    const live = activeMission(sub);
    const gap = !live && SC.State.checkStreak("math") === "gap";

    const ribbon = sub.missions.map((m, i) => {
      const r = SC.Engine.computeRewards(m, BANK);
      const label = m.kind === "redemption" ? "Redemption" : m.kind === "retake" ? `Mission ${m.retakeOf + 1} · attempt ${m.attemptNumber}` : `Mission ${i + 1}`;
      return `<div class="ribbon-item ${m.done ? "done" : "open"}">
        <div class="ribbon-name">${label}</div>
        <div class="ribbon-meta">${m.done ? `${r.firstClicks}/${m.qids.length} first-try` : "in progress"}</div>
        <div class="ribbon-actions">
          ${m.done ? `<a href="#/math/results/${i}">results</a>` : `<a href="#/math/mission">continue</a>`}
          ${m.done && m.kind === "daily" ? `<button class="linklike" data-retake="${i}">retake</button>` : ""}
        </div></div>`;
    }).join("") || `<div class="ribbon-empty">Your first Mission awaits.</div>`;

    app().innerHTML = `
      <div class="subject-home">
        <header class="subj-head">
          <a class="back" href="#/">← Camp</a>
          <h1>Airbender <span class="muted">(Math)</span></h1>
          <div class="head-stats">
            <span class="chip" title="Mon–Fri streak">🔥 ${sub.streak.current}-day streak</span>
            <a class="chip" href="#/math/collection" title="Pai Sho collection">⬡ ${sub.tiles.count} tiles${sub.tiles.whiteLotus ? " · ☸ " + sub.tiles.whiteLotus : ""}</a>
          </div>
        </header>
        <div class="home-grid">
          <aside class="ribbon"><h2>Missions</h2>${ribbon}</aside>
          <main class="home-main">
            ${gap ? streakGapHtml(sub) : ""}
            <div class="map-card"><h2>Your World</h2>${SC.Maps.continentMap(MATH, stats, cap)}
              <p class="map-legend"><span class="lg lg-gray"></span> untouched <span class="lg lg-amber"></span> in progress <span class="lg lg-green"></span> mastered (80% first-try)</p>
            </div>
            <button id="start-btn" class="primary big">${live ? "Continue today's Mission" : "Start today's Mission"}</button>
            <p class="muted small">~20 challenges · bring your notebook — the real bending happens on paper.</p>
          </main>
        </div>
      </div>`;

    $("#start-btn").addEventListener("click", () => {
      if (!activeMission(SC.State.subject("math"))) SC.Engine.buildMission(MATH, BANK, { kind: "daily" });
      location.hash = "#/math/mission";
    });
    app().querySelectorAll("[data-retake]").forEach((b) => b.addEventListener("click", () => {
      const i = +b.dataset.retake;
      const orig = sub.missions[i];
      const attempts = sub.missions.filter((m) => m.retakeOf === i).length + 2;
      SC.Engine.buildMission(MATH, BANK, { kind: "retake", qids: orig.qids, retakeOf: i, attemptNumber: attempts });
      location.hash = "#/math/mission";
    }));
    const keep = $("#streak-keep"), lose = $("#streak-reset");
    if (keep) keep.addEventListener("click", () => { SC.Engine.buildMission(MATH, BANK, { kind: "redemption" }); location.hash = "#/math/mission"; });
    if (lose) lose.addEventListener("click", () => { SC.State.resetStreak("math"); viewMathHome(); });
  }

  function streakGapHtml(sub) {
    return `<div class="card notice">
      <h3>Your ${sub.streak.current}-day streak is waiting on a choice</h3>
      <p>A day slipped by — happens to every traveler. Keep the streak alive with a short 5-challenge redemption set, or let it reset and start fresh. Your call, no judgment either way.</p>
      <div class="row"><button id="streak-keep" class="primary">Redemption set (5 challenges)</button>
      <button id="streak-reset" class="ghost">Let it reset</button></div></div>`;
  }

  /* ------------------------- mission play ------------------------- */
  function viewMission() {
    const sub = SC.State.subject("math");
    const m = activeMission(sub);
    if (!m) { location.hash = "#/math"; return; }
    const qid = m.qids[m.currentQ];
    const q = qById[qid];
    if (!q) { location.hash = "#/math"; return; }
    const rec = m.perQ[qid];
    rec._qStart = rec._qStart || Date.now();
    lastClickAt = null; nudged = nudged || false;

    const tally = missionTally(m);
    const flavor = m.story && m.story.flavors[qid] ? m.story.flavors[qid] : "";
    const order = m.optionOrders[qid];
    const opts = order.map((oi) => {
      const tried = rec.picks.includes(oi);
      return `<button class="option ${tried ? "tried" : ""}" data-oi="${oi}" ${tried ? "disabled" : ""}>${q.options[oi]}</button>`;
    }).join("");

    const showClock = sub.clockOn !== false;
    app().innerHTML = `
      <div class="mission">
        <header class="mission-head">
          <div><div class="journey-title">${m.story ? m.story.title : "Training"}</div>
          <div class="muted small">Challenge ${m.currentQ + 1} of ${m.qids.length}${rec.bounceback ? " · ⟲ bounce-back" : ""}</div></div>
          <div class="head-right">
            <span class="tally" title="Mission tally">${tally.first} first-try · ${tally.multi} multi-try</span>
            <span id="clock" class="clock ${showClock ? "" : "hidden"}">0:00</span>
            <button id="clock-toggle" class="linklike" title="Show/hide clock">${showClock ? "hide clock" : "show clock"}</button>
          </div>
        </header>
        ${m.currentQ === 0 && m.story ? `<p class="story-open">${m.story.opening}</p>` : ""}
        <div class="card q-card">
          ${flavor ? `<p class="flavor">${flavor}</p>` : ""}
          <p class="prompt">${q.prompt}</p>
          <div class="options">${opts}</div>
          <div id="hint-area" class="hint-area">${hintHtml(q, rec)}</div>
          <div class="q-foot">
            <span class="attempts">clicks on this one: <strong id="click-count">${rec.clicks}</strong></span>
            <span class="style-tag">${MATH.styleTags[q.style] || q.style}</span>
          </div>
        </div>
        <div id="break-offer" class="toast wide"></div>
      </div>`;

    startClock(m);
    $("#clock-toggle").addEventListener("click", () => {
      sub.clockOn = sub.clockOn === false ? true : false; SC.State.save(); viewMission();
    });

    app().querySelectorAll(".option:not(.tried)").forEach((btn) => {
      btn.addEventListener("click", () => onAnswer(m, q, rec, +btn.dataset.oi, btn));
    });
  }

  function hintHtml(q, rec) {
    if (rec.clicks === 0) return "";
    const h = SC.Engine.hintFor(q, rec);
    if (h.level === 1) return `<div class="hint"><span class="hint-tag">Hint</span> ${q.hint1}</div>`;
    if (h.level === 2) return `<div class="hint"><span class="hint-tag">Hint</span> ${q.hint1}</div>
      <div class="hint"><span class="hint-tag">Hint 2</span> ${q.hint2}</div>`;
    return `<div class="hint hint-out"><span class="hint-tag">No more hints</span> Use elimination to finish — then the walkthrough after the Mission will break this one all the way down.</div>`;
  }

  function missionTally(m) {
    let first = 0, multi = 0;
    m.qids.forEach((id) => {
      const r = m.perQ[id];
      if (r.solved) (r.clicks === 1 ? first++ : multi++);
    });
    return { first, multi };
  }

  function onAnswer(m, q, rec, oi, btn) {
    const now = Date.now();
    const gap = lastClickAt ? now - lastClickAt : null;
    lastClickAt = now;
    rec.timeMs = now - (rec._qStart || now);

    const hadHint = rec.clicks >= 1; // a hint was on screen before this click
    if (oi === 0) { /* options[0] is authored-correct */
      rec.clicks += 1;
      rec.solved = true;
      if (hadHint && rec.postHint === null) rec.postHint = "success"; // hint efficacy
      delete rec._qStart;
      SC.State.save();
      btn.classList.add("correct");
      const praise = rec.clicks === 1
        ? ["First try — your training shows.", "Clean strike. On to the next.", "That notebook work paid off."]
        : ["You stayed with it — that's the whole game.", "Got there. The walkthrough will lock it in."];
      toast(praise[Math.floor(Math.random() * praise.length)]);
      setTimeout(() => advance(m), 700);
    } else {
      rec.clicks += 1;
      rec.picks.push(oi);
      if (hadHint && rec.postHint === null) rec.postHint = "fail";
      if (rec.clicks === 1) rec.hint1 = true;
      if (rec.clicks === 2) rec.hint2 = true;
      const triggers = SC.Engine.senseFrustration(m, q.id, rec, gap);
      SC.State.save();
      btn.classList.add("wrong");
      btn.disabled = true; btn.classList.add("tried");
      $("#hint-area").innerHTML = hintHtml(q, rec);
      $("#click-count").textContent = rec.clicks;
      if (triggers.length) offerBreak();
    }
  }

  function offerBreak() {
    const el = $("#break-offer");
    if (!el || el.classList.contains("show")) return;
    el.innerHTML = `Even the Avatar rests between training sessions. Want a breather? The Mission will wait. <button id="break-ok" class="linklike">take a break</button>`;
    el.classList.add("show");
    $("#break-ok").addEventListener("click", () => { location.hash = "#/math"; });
    setTimeout(() => el.classList.remove("show"), 9000);
  }

  function advance(m) {
    if (m.currentQ + 1 < m.qids.length) {
      m.currentQ += 1; SC.State.save(); viewMission();
    } else {
      finishMission(m);
    }
  }

  function finishMission(m) {
    const sub = SC.State.subject("math");
    m.done = true;
    m.elapsedMs += Date.now() - m.startedAt;
    if (m.kind === "daily") { sub.dailyCount += 1; SC.State.bumpStreak("math"); }
    if (m.kind === "redemption") SC.State.bumpStreak("math");
    const r = SC.Engine.computeRewards(m, BANK);
    if (m.kind !== "retake") {
      sub.tiles.count += r.tiles;
      if (r.whiteLotus) sub.tiles.whiteLotus += 1;
      sub.tiles.log.push({ mission: m.idx, tiles: r.tiles, whiteLotus: r.whiteLotus, at: Date.now() });
    }
    SC.State.save();
    location.hash = "#/math/results/" + m.idx;
  }

  /* ------------------------- clock ------------------------- */
  function startClock(m) {
    const begin = Date.now();
    const base = m.elapsedMs + (Date.now() - m.startedAt);
    clockTimer = setInterval(() => {
      const el = $("#clock");
      if (!el) return;
      const ms = base + (Date.now() - begin);
      const min = Math.floor(ms / 60000), sec = Math.floor((ms % 60000) / 1000);
      el.textContent = `${min}:${String(sec).padStart(2, "0")}`;
      const budget = SC.PLATFORM.sessionBudgetMin;
      if (!nudged && min >= budget - 10) {
        nudged = true;
        toast(`~10 minutes left in the journey — finish strong, or rest and return.`);
      }
    }, 1000);
  }

  function toast(msg) {
    let t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ------------------------- results dashboard ------------------------- */
  function viewResults(i) {
    const sub = SC.State.subject("math");
    const m = sub.missions[i];
    if (!m) { location.hash = "#/math"; return; }
    const r = SC.Engine.computeRewards(m, BANK);
    const stats = SC.State.domainStats("math", BANK);
    const cap = SC.State.capstoneUnlocked(stats);

    // click distribution
    const dist = {};
    m.qids.forEach((id) => { const c = m.perQ[id].clicks; dist[c] = (dist[c] || 0) + 1; });
    const distHtml = Object.keys(dist).sort((a, b) => +a - +b).map((c) => {
      const n = dist[c];
      return `<div class="dist-row"><span class="dist-label">${c} click${c > 1 ? "s" : ""}</span>
        <div class="dist-bar ${+c === 1 ? "good" : +c >= 3 ? "hot" : ""}" style="width:${(n / m.qids.length) * 100}%"></div>
        <span class="dist-n">${n}</span></div>`;
    }).join("");

    // flagged problems (2+ clicks), hottest first
    const flagged = m.qids.filter((id) => m.perQ[id].clicks > 1)
      .sort((a, b) => m.perQ[b].clicks - m.perQ[a].clicks)
      .map((id) => {
        const q = qById[id], rec = m.perQ[id];
        return `<a class="flag" href="#/math/review/${i}/${id}">
          <span class="flag-clicks ${rec.clicks >= 3 ? "hot" : ""}">${rec.clicks}×</span>
          <span class="flag-prompt">${q.prompt.slice(0, 80)}${q.prompt.length > 80 ? "…" : ""}</span>
          <span class="flag-el">${MATH.elements.find((e) => e.id === q.el).name}</span></a>`;
      }).join("") || `<p class="muted">Nothing flagged — every challenge fell on the first try.</p>`;

    // soft spots by element (this mission)
    const byEl = {};
    m.qids.forEach((id) => {
      const q = qById[id]; byEl[q.el] = byEl[q.el] || { n: 0, first: 0 };
      byEl[q.el].n += 1; if (m.perQ[id].clicks === 1) byEl[q.el].first += 1;
    });
    const softHtml = Object.entries(byEl).map(([el, d]) => {
      const name = MATH.elements.find((e) => e.id === el).name;
      const pct = Math.round((d.first / d.n) * 100);
      return `<div class="soft-row"><span>${name}</span><div class="soft-bar"><div class="soft-fill ${pct >= 80 ? "good" : pct >= 50 ? "" : "hot"}" style="width:${pct}%"></div></div><span>${d.first}/${d.n}</span></div>`;
    }).join("");

    const mins = Math.round(m.elapsedMs / 60000);
    const rewardsHtml = m.kind === "retake" ? "" : `
      <div class="card"><h2>Earned this journey</h2>
        ${r.breakdown.map((b) => `<div class="reward-row"><span>${b.why}</span><strong>+${b.tiles} ⬡</strong></div>`).join("")}
        ${r.whiteLotus ? `<div class="reward-row wl"><span>Perfect journey — every challenge first-try</span><strong>☸ White Lotus tile</strong></div>` : ""}
      </div>`;

    app().innerHTML = `
      <div class="results">
        <header class="subj-head"><a class="back" href="#/math">← Camp</a>
          <h1>${m.story ? m.story.title : "Mission " + (i + 1)} — Results</h1><span class="chip">${mins} min</span></header>
        ${m.story ? `<p class="story-open">${m.story.arrival}</p>` : ""}
        <div class="results-grid">
          <div class="card"><h2>Click distribution</h2>${distHtml}
            <p class="muted small">1 click = had it cold. Extra clicks mark exactly where training goes next.</p></div>
          <div class="card"><h2>This Mission by element</h2>${softHtml}</div>
          <div class="card span2"><h2>Worth a second look</h2>${flagged}
            <p class="muted small">Each one links to a full thinking-model walkthrough — mistakes feed the loop.</p></div>
          ${rewardsHtml}
          <div class="card span2"><h2>Your World</h2>${SC.Maps.continentMap(MATH, stats, cap)}</div>
        </div>
      </div>`;
  }

  /* ------------------------- walkthrough ------------------------- */
  function viewReview(i, qid) {
    const sub = SC.State.subject("math");
    const m = sub.missions[i];
    const q = qById[qid];
    if (!m || !q) { location.hash = "#/math"; return; }
    let shown = 0;

    function render() {
      const steps = q.steps.map((s, k) =>
        `<div class="step ${k < shown ? "revealed" : "veiled"}"><span class="step-n">${k + 1}</span> ${k < shown ? s : ""}</div>`).join("");
      app().innerHTML = `
        <div class="review">
          <header class="subj-head"><a class="back" href="#/math/results/${i}">← Results</a><h1>Thinking it through</h1></header>
          <div class="card">
            <p class="prompt">${q.prompt}</p>
            <p class="intent"><strong>What this problem is really asking:</strong> ${q.intent}</p>
            ${SC.Modules.render(q.module)}
            <div class="steps">${steps}</div>
            ${shown < q.steps.length
              ? `<button id="next-step" class="primary">Work the next step</button>`
              : `<div class="closer"><p><strong>Answer: ${q.options[0]}</strong></p>
                 <p>You just walked the whole path — that's how this becomes yours. A fresh version of this problem will return in a future Mission; beating it then is a bounce-back, and bounce-backs are how territory turns green.</p>
                 <a class="primary btnlink" href="#/math/results/${i}">Back to results</a></div>`}
          </div>
        </div>`;
      SC.Modules.wire(app());
      const btn = $("#next-step");
      if (btn) btn.addEventListener("click", () => { shown += 1; render(); });
    }
    render();
  }

  /* ------------------------- collection ------------------------- */
  function viewCollection() {
    const sub = SC.State.subject("math");
    const tiles = [];
    for (let k = 0; k < sub.tiles.count; k++) tiles.push(`<span class="tile">⬡</span>`);
    for (let k = 0; k < sub.tiles.whiteLotus; k++) tiles.push(`<span class="tile wl">☸</span>`);
    app().innerHTML = `
      <div class="collection">
        <header class="subj-head"><a class="back" href="#/math">← Camp</a><h1>Pai Sho Collection</h1></header>
        <div class="card">
          <p class="muted">${sub.tiles.count} tile${sub.tiles.count === 1 ? "" : "s"}${sub.tiles.whiteLotus ? ` · ${sub.tiles.whiteLotus} White Lotus` : ""} — every one earned by effort: journeys finished, first-try runs, hint-free streaks, bounce-backs.</p>
          <div class="tile-grid">${tiles.join("") || '<p class="muted">Complete your first Mission to earn your first tiles.</p>'}</div>
        </div>
      </div>`;
  }

  /* ------------------------- boot ------------------------- */
  document.addEventListener("DOMContentLoaded", route);
  if (document.readyState !== "loading") route();
})();
