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

  /* friendly element → domain blurbs (for Bending Levels hover info) */
  const ELEMENT_BLURB = {
    water: "Water · fractions & the number system",
    earth: "Earth · geometry & measurement",
    fire: "Fire · operations, expressions & equations",
    air: "Air · place value & ratios and proportions",
    spirit: "Spirit · statistics & probability",
    avatarstate: "Avatar State · cross-domain capstone",
  };

  /* ------------------------- router ------------------------- */
  function route() {
    stopClock();
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
      if (p[1] === "element") return viewElement(p[2]);
      if (p[1] === "stats") return viewStats();
    }
    // World Awareness plugs in here: it's its own themed world (wa.* files),
    // rendered into #app. The main router stays the single source of routing.
    if (p[0] === "world" && window.WA && WA.Engine) return WA.Engine.handle(p.slice(1));
    // Basketball ("Hardwood") plugs in here the same way: its own themed world
    // (hoops.* files), rendered into #app under #/hoops.
    if (p[0] === "hoops" && window.HOOPS && HOOPS.Engine) return HOOPS.Engine.handle(p.slice(1));
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
    SC.Maps.wireLanding(app(), (id) => {
      const subj = SC.getSubject(id);
      location.hash = "#/" + ((subj && subj.route) || id); // some subjects route under a theme name (e.g. basketball → hoops)
    });
  }

  /* ------------------------- math home ------------------------- */
  function activeMission(sub) {
    const m = sub.missions[sub.missions.length - 1];
    return m && !m.done ? m : null;
  }

  function dailyRoutes(sub) {
    const done = sub.missions.filter((m) => m.kind === "daily" && m.done && m.story);
    return done.map((m, k) => ({ stops: m.story.stops, latest: k === done.length - 1 }));
  }

  /* Make every "glyph Place Name" in a string a clickable lore link */
  function linkify(text) {
    if (!text || !SC.Journey) return text;
    SC.Journey.LOCATIONS.forEach((l) => {
      const t = `${l.glyph} ${l.name}`;
      text = text.split(t).join(`<button class="loc-link" data-loc="${l.name}">${t}</button>`);
    });
    return text;
  }
  function wireLocLinks(root) {
    (root || app()).querySelectorAll(".loc-link").forEach((b) =>
      b.addEventListener("click", (e) => { e.stopPropagation(); showLocation(b.dataset.loc); }));
  }

  function viewMathHome() {
    const sub = SC.State.subject("math");
    const stats = SC.State.domainStats("math", BANK);
    const cap = SC.State.capstoneUnlocked(stats);
    const live = activeMission(sub);
    const gap = !live && SC.State.checkStreak("math") === "gap";

    // retakes fold into their parent mission (one row per chapter, not a row per attempt)
    const retakesByParent = {};
    sub.missions.forEach((mm) => {
      if (mm.kind === "retake" && mm.retakeOf != null) (retakesByParent[mm.retakeOf] = retakesByParent[mm.retakeOf] || []).push(mm);
    });
    let ribbon = sub.missions.map((m, i) => {
      if (m.kind === "retake") return ""; // shown under its parent, not as its own chapter
      const r = SC.Engine.computeRewards(m, BANK);
      const isDaily = m.kind === "daily";
      const label = m.kind === "redemption" ? "🔥 Redemption set" : (m.story && m.story.name ? m.story.name : `Mission ${i + 1}`);
      const chapter = isDaily ? `Chapter ${sub.missions.slice(0, i + 1).filter((x) => x.kind === "daily").length}` : "";
      const retakes = retakesByParent[i] || [];
      const doneRetakes = retakes.filter((x) => x.done).length;
      const retakeInProgress = retakes.some((x) => !x.done);
      const retakeNote = (doneRetakes || retakeInProgress)
        ? `<div class="ribbon-sub">↻ ${doneRetakes ? `retaken ${doneRetakes}×` : ""}${doneRetakes && retakeInProgress ? " · " : ""}${retakeInProgress ? "retake in progress" : ""}</div>`
        : "";
      return `<div class="ribbon-item ${m.done ? "done" : "open"}">
        ${chapter ? `<div class="ribbon-chapter">${chapter}</div>` : ""}
        <div class="ribbon-name">${label}</div>
        ${m.story ? `<div class="ribbon-route">${linkify(m.story.title)}</div>` : ""}
        <div class="ribbon-meta">${m.done ? `${r.firstClicks}/${m.qids.length} first-try · ⬡ ${r.tiles}` : "⚔ in progress"}</div>
        ${retakeNote}
        <div class="ribbon-actions">
          ${m.done ? `<a href="#/math/results/${i}">results</a>` : `<a href="#/math/mission">continue</a>`}
          ${m.done && isDaily && !live ? `<button class="linklike" data-retake="${i}">retake</button>` : ""}
          ${retakeInProgress ? `<a href="#/math/mission">continue retake</a>` : ""}
        </div></div>`;
    }).join("");
    const dailiesSoFar = sub.missions.filter((m) => m.kind === "daily").length;
    // TODAY'S JOURNEY — the next chapter to play, always shown as a startable entry.
    // (Without this, a brand-new player saw only locked Chapter 2+ and no Chapter 1.)
    if (!live) {
      const nextN = dailiesSoFar + 1;
      const tease = SC.Journey.teaserFor(nextN);
      ribbon += `<div class="ribbon-item open today">
        <div class="ribbon-chapter">Chapter ${nextN} · ▶ today</div>
        <div class="ribbon-name">${tease.name}</div>
        <div class="ribbon-route">${linkify(tease.label)}</div>
        <div class="ribbon-meta">ready when you are</div>
        <div class="ribbon-actions"><button class="linklike strong" id="ribbon-start">▶ Start this journey</button></div>
      </div>`;
    }
    if (!ribbon) ribbon = `<div class="ribbon-empty">Your first journey awaits, Avatar.</div>`;
    // the road ahead: locked teasers AFTER today's chapter (pull, don't push)
    const firstLocked = dailiesSoFar + (live ? 1 : 2); // today's mission isn't locked
    for (let k = 0; k < 5; k++) {
      const n = firstLocked + k;
      const tease = SC.Journey.teaserFor(n);
      ribbon += `<div class="ribbon-item locked">
        <div class="ribbon-chapter">Chapter ${n} · 🔒</div>
        <div class="ribbon-name">${tease.name}</div>
        <div class="ribbon-route">${linkify(tease.label)}</div>
        <div class="ribbon-meta">${k === 0 ? "opens when today's journey ends" : "the road continues…"}</div></div>`;
    }

    const guard = SC.PLATFORM.minAttemptsGuard;
    const levelRows = MATH.elements.filter((e) => !e.capstone).map((el) => {
      const d = stats[el.id];
      const lvl = d ? SC.PLATFORM.levels[d.level] : "Apprentice";
      const pct = d && d.attempts ? Math.round(d.rate * 100) : 0;
      const att = d ? d.attempts : 0;
      const meaning = pct >= 90 ? "Master — you own this." :
        pct >= 80 ? "Adept — this territory is green." :
        att ? `${80 - pct}% of first-tries from Adept (80%) — then the territory turns green.` :
        "Not trained yet — face challenges here to start your bending level.";
      const guardNote = att && att < guard ? ` ${guard - att} more challenges needed before a level can be earned.` : "";
      const tip = `${ELEMENT_BLURB[el.id]}. ${att ? `${pct}% first-try across ${att} challenge${att === 1 ? "" : "s"}. ` : ""}${meaning}${guardNote}`;
      return `<div class="level-row" title="${tip}">
        ${SC.Art.elementBadge(el.id, 24)}
        <div class="level-info"><div class="level-name">${lvl} ${el.bender}</div>
          <div class="level-bar"><div class="level-fill ${pct >= 80 ? "good" : ""}" style="width:${pct}%"></div></div></div>
        <span class="level-pct">${att ? pct + "%" : "—"}</span>
      </div>`;
    }).join("");

    app().innerHTML = `
      <div class="subject-home">
        <header class="subj-head">
          <a class="back" href="#/">← Camp</a>
          <h1 class="themed-title">Airbender <span class="muted">(Math)</span></h1>
          <div class="head-stats">
            <a class="chip" href="#/math/stats" title="Your full training record">🔥 ${sub.streak.current}-day streak</a>
            <a class="chip" href="#/math/stats" title="Your full training record">📜 Training Record</a>
            <a class="chip" href="#/math/collection" title="Pai Sho collection">⬡ ${sub.tiles.count} tiles${sub.tiles.whiteLotus ? " · ☸ " + sub.tiles.whiteLotus : ""}</a>
          </div>
        </header>
        <div class="home-grid">
          <aside>
            <div class="ribbon"><h2>Missions</h2>${ribbon}</div>
            <div class="ribbon levels"><h2>Bending Levels</h2>${levelRows}
              <p class="muted small">80% first-try in an element = Adept. The map turns green with you.</p></div>
          </aside>
          <main class="home-main">
            ${gap ? streakGapHtml(sub) : ""}
            <div class="map-card">${SC.Maps.continentMap(MATH, stats, cap, dailyRoutes(sub))}
              <p class="map-legend">
                <span class="lg-term" title="No challenges from this nation faced yet — the territory is still gray and waiting."><span class="lg lg-gray"></span> unexplored</span>
                <span class="lg-term" title="You've trained here, but the first-try rate is still below 80% — amber means in progress."><span class="lg lg-amber"></span> in training</span>
                <span class="lg-term" title="80%+ first-try across 16+ challenges — the territory turns green and your bending level rises."><span class="lg lg-green"></span> mastered</span>
                <span class="lg-term" title="Every completed Mission traces its route here, ending in a red X — like any good treasure map.">· dashed trails = your journeys</span></p>
            </div>
            <button id="start-btn" class="primary big">${live ? "⚔ Continue today's Mission" : "⚔ Start today's Mission"}</button>
            <p class="muted small">~20 challenges · bring your notebook — the real bending happens on paper.</p>
          </main>
        </div>
      </div>`;

    const startToday = () => {
      const s = SC.State.subject("math");
      if (!activeMission(s)) {
        const dNum = s.missions.filter((m) => m.kind === "daily").length + 1;
        SC.Engine.buildMission(MATH, BANK, { kind: "daily", routeHint: SC.Journey.teaserFor(dNum) });
      }
      location.hash = "#/math/mission";
    };
    $("#start-btn").addEventListener("click", startToday);
    const ribbonStart = $("#ribbon-start");
    if (ribbonStart) ribbonStart.addEventListener("click", startToday);
    wireLocLinks();
    app().querySelectorAll("[data-retake]").forEach((b) => b.addEventListener("click", () => {
      const s = SC.State.subject("math");
      if (activeMission(s)) { location.hash = "#/math/mission"; return; } // one mission at a time — finish the current one first
      const i = +b.dataset.retake;
      const orig = sub.missions[i];
      const attempts = sub.missions.filter((m) => m.retakeOf === i).length + 2;
      const routeHint = orig.story ? { from: orig.story.stops[0], to: orig.story.stops[orig.story.stops.length - 1], name: orig.story.name } : undefined;
      SC.Engine.buildMission(MATH, BANK, { kind: "retake", qids: orig.qids, retakeOf: i, attemptNumber: attempts, routeHint });
      location.hash = "#/math/mission";
    }));
    const keep = $("#streak-keep"), lose = $("#streak-reset");
    if (keep) keep.addEventListener("click", () => { SC.Engine.buildMission(MATH, BANK, { kind: "redemption" }); location.hash = "#/math/mission"; });
    if (lose) lose.addEventListener("click", () => { SC.State.resetStreak("math"); viewMathHome(); });
    wireMap();
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
          <div><a class="back" href="#/math" title="Back to camp — your journey waits for you">←</a></div>
          <div><div class="journey-title">${m.story && m.story.name ? m.story.name : "Training"}</div>
          <div class="muted small">${m.story ? linkify(m.story.title) + " · " : ""}Challenge ${m.currentQ + 1} of ${m.qids.length}${rec.bounceback ? " · ⟲ bounce-back" : ""}</div></div>
          <div class="head-right">
            <span class="tally" title="Mission tally">${tally.first} first-try · ${tally.multi} multi-try</span>
            <span id="clock" class="clock ${showClock ? "" : "hidden"}">0:00</span>
            <button id="clock-toggle" class="linklike" title="Show/hide clock">${showClock ? "hide clock" : "show clock"}</button>
          </div>
        </header>
        ${m.currentQ === 0 && m.story ? `<p class="story-open">${linkify(m.story.opening)}</p>` : ""}
        <div class="card q-card">
          ${flavor ? `<p class="flavor">${flavor}</p>` : ""}
          <p class="prompt">${q.prompt}</p>
          <div class="options">${opts}</div>
          <div id="hint-area" class="hint-area">${hintHtml(q, rec)}</div>
          <div id="encourage" class="encourage" aria-live="polite"></div>
          <div class="q-foot">
            <span class="el-chip">${SC.Art.elementBadge(q.el, 18)} ${MATH.elements.find((e) => e.id === q.el).name}</span>
            <span class="attempts">clicks: <strong id="click-count">${rec.clicks}</strong></span>
            <span class="style-tag">${MATH.styleTags[q.style] || q.style}</span>
          </div>
        </div>
        <div id="break-offer" class="toast wide"></div>
      </div>`;

    startClock(m);
    wireLocLinks();
    $("#clock-toggle").addEventListener("click", () => {
      sub.clockOn = sub.clockOn === false ? true : false; SC.State.save(); viewMission();
    });

    app().querySelectorAll(".option:not(.tried)").forEach((btn) => {
      btn.addEventListener("click", () => onAnswer(m, q, rec, +btn.dataset.oi, btn));
    });
  }

  function hintHtml(q, rec, fresh) {
    if (rec.clicks === 0) return "";
    const bulb = (n) => `<span class="bulb ${fresh ? "bulb-pop" : ""}">💡</span>`;
    const h = SC.Engine.hintFor(q, rec);
    if (h.level === 1) return `<div class="hint ${fresh ? "hint-in" : ""}">${bulb()}<span class="hint-tag">Hint</span> ${q.hint1}</div>`;
    if (h.level === 2) return `<div class="hint">${bulb()}<span class="hint-tag">Hint</span> ${q.hint1}</div>
      <div class="hint ${fresh ? "hint-in" : ""}">${bulb()}<span class="hint-tag">Hint 2</span> ${q.hint2}</div>`;
    return `<div class="hint hint-out ${fresh ? "hint-in" : ""}"><span class="hint-tag">🧭 No more hints</span> Use elimination to finish — then the walkthrough after the Mission will break this one all the way down.</div>`;
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
      btn.classList.add("wrong", "shake");
      btn.disabled = true; btn.classList.add("tried");
      $("#hint-area").innerHTML = hintHtml(q, rec, true);
      $("#click-count").textContent = rec.clicks;
      const enc = $("#encourage");
      if (enc) {
        enc.textContent = rec.clicks === 1 ? "Not that one — take the hint and go again." :
          rec.clicks === 2 ? "Closer. Slow down, check the first step." : "Eliminate and finish — you'll get the full breakdown after.";
        enc.classList.remove("enc-in"); void enc.offsetWidth; enc.classList.add("enc-in");
      }
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
    stopClock();   // accumulate active time (capped at runaway) into m.elapsedMs
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

  /* ------------------------- clock -------------------------
     Counts only ACTIVE time (resumes from accumulated elapsedMs, not wall-clock
     since the mission was built) and hard-stops at the runaway cap so a clock
     left running overnight can't report 1337:00. */
  let clockMission = null, clockBegin = 0, clockStopped = false;

  function startClock(m) {
    const runawayMs = SC.PLATFORM.clockRunawayMin * 60000;
    clockMission = m; clockBegin = Date.now();
    clockStopped = m.elapsedMs >= runawayMs;
    clockTimer = setInterval(() => {
      const el = $("#clock");
      if (!el) return;
      let ms = m.elapsedMs + (Date.now() - clockBegin);
      if (ms >= runawayMs) {                       // anti-runaway: freeze + tell them
        ms = runawayMs; m.elapsedMs = runawayMs; clockBegin = Date.now();
        clearInterval(clockTimer); clockTimer = null;
        SC.State.save();
        el.textContent = `${Math.floor(ms / 60000)}:00`;
        el.classList.add("clock-stopped");
        if (!clockStopped) { clockStopped = true;
          toast("Clock stopped — looks like you stepped away. Time isn't counting anymore; pick up whenever you're ready."); }
        return;
      }
      const min = Math.floor(ms / 60000), sec = Math.floor((ms % 60000) / 1000);
      el.textContent = `${min}:${String(sec).padStart(2, "0")}`;
      const budget = SC.PLATFORM.sessionBudgetMin;
      if (!nudged && min >= budget - 10 && min < budget + 5) {
        nudged = true;
        toast(`~10 minutes left in the journey — finish strong, or rest and return.`);
      }
    }, 1000);
  }

  /* Accumulate active time into the mission and tear the clock down. */
  function stopClock() {
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    if (clockMission) {
      const runawayMs = SC.PLATFORM.clockRunawayMin * 60000;
      clockMission.elapsedMs = Math.min(clockMission.elapsedMs + (Date.now() - clockBegin), runawayMs);
      SC.State.save();
      clockMission = null;
    }
  }
  /* Pause counting when the tab is hidden; resume on return. */
  document.addEventListener("visibilitychange", () => {
    if (!clockMission) return;
    if (document.hidden) { stopClock(); }
    else if (activeMission(SC.State.subject("math")) && location.hash.includes("/mission")) { startClock(activeMission(SC.State.subject("math"))); }
  });

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
          ${rec.reviewed ? `<span class="reviewed-tag" title="Walked through the full thinking model">✓ reviewed</span>` : ""}
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
          <h1 class="themed-title">${m.story ? linkify(m.story.title) : "Mission " + (i + 1)} — Results</h1><span class="chip">${mins} min</span></header>
        ${m.story ? `<p class="story-open">${linkify(m.story.arrival)}</p>` : ""}
        <div class="results-grid">
          <div class="card"><h2>Click distribution</h2>${distHtml}
            <p class="muted small">1 click = had it cold. Extra clicks mark exactly where training goes next.</p></div>
          <div class="card"><h2>This Mission by element</h2>${softHtml}</div>
          <div class="card span2"><h2>Worth a second look</h2>${flagged}
            <p class="muted small">Each one links to a full thinking-model walkthrough — mistakes feed the loop.</p></div>
          ${rewardsHtml}
          <div class="card span2"><h2>Your World</h2>${SC.Maps.continentMap(MATH, stats, cap, dailyRoutes(sub))}</div>
        </div>
      </div>`;
    wireMap();
    wireLocLinks();
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
      if (btn) btn.addEventListener("click", () => {
        shown += 1;
        if (shown >= q.steps.length) {            // walked the whole thinking model = due diligence
          const rec = m.perQ[qid];
          if (rec && !rec.reviewed) { rec.reviewed = true; SC.State.save(); }
        }
        render();
      });
    }
    render();
  }

  /* ------------------------- training record (benchmark v1) -------------------------
     The benchmark framework (vision → Progress Benchmarks): every number below is
     derived from the existing logs — no new instrumentation. */
  function benchmark(sub) {
    const recs = []; // every first-attempt daily encounter
    sub.missions.forEach((m) => {
      if (m.kind !== "daily" || !m.done) return;
      m.qids.forEach((qid) => {
        const q = qById[qid], r = m.perQ[qid];
        if (q && r.clicks > 0) recs.push({ q, r, week: m.week, elapsed: r.timeMs });
      });
    });
    const rate = (list) => (list.length ? list.filter((x) => x.r.clicks === 1).length / list.length : null);
    const byTier = {}, byStyle = {};
    [1, 2, 3].forEach((t) => (byTier[t] = rate(recs.filter((x) => x.q.tier === t))));
    Object.keys(MATH.styleTags).forEach((s) => (byStyle[s] = rate(recs.filter((x) => x.q.style === s))));
    const hinted = recs.filter((x) => x.r.hint1);
    const postHintWins = hinted.filter((x) => x.r.postHint === "success").length;
    const bounces = recs.filter((x) => x.r.bounceback);
    const missed = recs.filter((x) => x.r.clicks > 1);          // got it wrong at least once
    const reviewedMissed = missed.filter((x) => x.r.reviewed).length;
    const missions = sub.missions.filter((m) => m.kind === "daily" && m.done);
    const totalMs = missions.reduce((a, m) => a + (m.elapsedMs || 0), 0);
    return {
      total: recs.length,
      overall: rate(recs),
      hintFree: recs.length ? recs.filter((x) => !x.r.hint1).length / recs.length : null,
      hintEfficacy: hinted.length ? postHintWins / hinted.length : null,
      bounceConversion: bounces.length ? bounces.filter((x) => x.r.clicks === 1).length / bounces.length : null,
      bounceCount: bounces.length,
      reviewFollowThrough: missed.length ? reviewedMissed / missed.length : null,
      missedCount: missed.length,
      reviewedCount: reviewedMissed,
      byTier, byStyle,
      missions: missions.length,
      avgMin: missions.length ? Math.round(totalMs / missions.length / 60000) : 0,
      totalMin: Math.round(totalMs / 60000),
    };
  }

  function viewStats() {
    const sub = SC.State.subject("math");
    const stats = SC.State.domainStats("math", BANK);
    const b = benchmark(sub);
    const pct = (v) => (v == null ? "—" : Math.round(v * 100) + "%");
    const bar = (v, tip) => `<div class="level-bar" title="${tip || ""}"><div class="level-fill ${v >= 0.8 ? "good" : ""}" style="width:${v == null ? 0 : Math.round(v * 100)}%"></div></div>`;
    const adeptCount = Object.values(stats).filter((d) => d.level >= 1).length;

    const tierRows = [["1", "Confidence (Tier 1)", "Easy ground — should stay green"], ["2", "Grade-solid (Tier 2)", "The heart of the grade — 80% here = solid"], ["3", "Stretch (Tier 3)", "Competition-flavored — 60%+ here is strong"]]
      .map(([t, name, tip]) => `<div class="level-row" title="${tip}">
        <div class="level-info"><div class="level-name">${name}</div>${bar(b.byTier[t], tip)}</div>
        <span class="level-pct">${pct(b.byTier[t])}</span></div>`).join("");

    const styleRows = Object.entries(MATH.styleTags).map(([s, label]) =>
      `<div class="level-row"><div class="level-info"><div class="level-name">${label}</div>${bar(b.byStyle[s])}</div>
       <span class="level-pct">${pct(b.byStyle[s])}</span></div>`).join("");

    app().innerHTML = `
      <div class="stats-page">
        <header class="subj-head"><a class="back" href="#/math">← Camp</a>
          <h1 class="themed-title">📜 Training Record</h1></header>
        <div class="results-grid">
          <div class="card"><h2>Showing up</h2>
            <div class="stat-big">🔥 ${sub.streak.current}<span class="stat-unit">day streak</span></div>
            <p class="muted small">Best: ${sub.streak.best} · Missions completed: ${b.missions} · Challenges faced: ${b.total}</p>
            <p class="muted small">Time trained: ${b.totalMin} min total · ~${b.avgMin} min per Mission (budget ~${SC.PLATFORM.sessionBudgetMin})</p></div>
          <div class="card"><h2>Mastery</h2>
            <div class="stat-big">${adeptCount}<span class="stat-unit">of ${MATH.elements.length - 1} elements at Adept+</span></div>
            <div class="level-row"><div class="level-info"><div class="level-name">Overall first-try rate</div>${bar(b.overall, "Share of challenges solved on the very first click")}</div>
            <span class="level-pct">${pct(b.overall)}</span></div>
            <p class="muted small">80% first-try in an element (16+ challenges) = Adept; 90% = Master.</p></div>
          <div class="card"><h2>How each tier is treating you</h2>${tierRows}</div>
          <div class="card"><h2>Which styles click</h2>${styleRows}
            <p class="muted small">Same math, different character — your strong styles are a real diagnostic.</p></div>
          <div class="card"><h2>Independence</h2>
            <div class="level-row"><div class="level-info"><div class="level-name">Hint-free solves</div>${bar(b.hintFree)}</div><span class="level-pct">${pct(b.hintFree)}</span></div>
            <div class="level-row"><div class="level-info"><div class="level-name">Hints that landed (post-hint wins)</div>${bar(b.hintEfficacy)}</div><span class="level-pct">${pct(b.hintEfficacy)}</span></div></div>
          <div class="card"><h2>Bounce-backs</h2>
            <div class="stat-big">⟲ ${pct(b.bounceConversion)}<span class="stat-unit">of revisited misses beaten (${b.bounceCount} faced)</span></div>
            <p class="muted small">Old misses, returned in new skins. Beating them is how mistakes become skill.</p></div>
          <div class="card"><h2>Due diligence</h2>
            <div class="stat-big">📖 ${pct(b.reviewFollowThrough)}<span class="stat-unit">of missed challenges walked through step-by-step (${b.missedCount} missed)</span></div>
            <p class="muted small">When he misses one, does he go back and work the full thinking model? That habit is what turns a miss into mastery.</p></div>
        </div>
        ${b.total === 0 ? '<p class="muted">No record yet — your first Mission writes the first page.</p>' : ""}
      </div>`;
  }

  /* ------------------------- map exploration ------------------------- */
  function wireMap() {
    SC.Maps.wireContinent(app(), {
      onLoc: showLocation,
      onElement: (el) => { location.hash = "#/math/element/" + el; },
    });
  }

  function showLocation(name) {
    const l = SC.Journey.LOC_BY_NAME[name];
    if (!l) return;
    const sub = SC.State.subject("math");
    const visits = sub.missions
      .map((m, i) => ({ m, i }))
      .filter(({ m }) => m.kind === "daily" && m.story && m.story.stops.includes(name));
    const visitHtml = visits.length
      ? visits.map(({ m, i }) =>
          `<a class="visit" href="#/math/results/${i}" onclick="document.getElementById('loc-modal').remove()">Mission ${i + 1} — ${m.story.title}${m.done ? "" : " (in progress)"}</a>`).join("")
      : `<p class="muted small">No journey has passed through here yet. The road will come.</p>`;
    const elName = MATH.elements.find((e) => e.id === l.el).name;
    const old = document.getElementById("loc-modal");
    if (old) old.remove();
    const div = document.createElement("div");
    div.id = "loc-modal";
    div.className = "modal-backdrop";
    div.innerHTML = `<div class="modal">
      <div class="modal-head"><span class="loc-modal-glyph">${l.glyph}</span>
        <div><h3>${l.name}</h3><span class="el-chip">${SC.Art.elementBadge(l.el, 16)} ${elName} territory</span></div>
        <button class="modal-close" aria-label="close">✕</button></div>
      <p class="lore">${l.lore}</p>
      <h4>Journeys through here</h4>${visitHtml}
    </div>`;
    div.addEventListener("click", (e) => { if (e.target === div || e.target.classList.contains("modal-close")) div.remove(); });
    document.body.appendChild(div);
  }

  function viewElement(elId) {
    const el = MATH.elements.find((e) => e.id === elId);
    if (!el) { location.hash = "#/math"; return; }
    const sub = SC.State.subject("math");
    const stats = SC.State.domainStats("math", BANK);
    const d = stats[elId];
    const lvl = d ? SC.PLATFORM.levels[d.level] : "Apprentice";
    const pct = d && d.attempts ? Math.round(d.rate * 100) : 0;
    const att = d ? d.attempts : 0;
    const guard = SC.PLATFORM.minAttemptsGuard;

    // every encounter with this element (daily missions = the record)
    const history = [];
    sub.missions.forEach((m, i) => {
      if (m.kind !== "daily") return;
      m.qids.forEach((qid) => {
        const q = qById[qid];
        if (q && q.el === elId && m.perQ[qid].clicks > 0) history.push({ q, rec: m.perQ[qid], i, done: m.done });
      });
    });
    const histHtml = history.length ? history.map(({ q, rec, i }) =>
      `<a class="flag" href="#/math/review/${i}/${q.id}">
        <span class="flag-clicks ${rec.clicks >= 3 ? "hot" : rec.clicks === 1 ? "good-c" : ""}">${rec.clicks}×</span>
        <span class="flag-prompt">${q.prompt.slice(0, 78)}${q.prompt.length > 78 ? "…" : ""}</span>
        <span class="flag-el">${MATH.styleTags[q.style].split(" ")[0]}</span></a>`).join("")
      : `<p class="muted">No challenges faced here yet — they'll come with your Missions.</p>`;

    const places = SC.Journey.LOCATIONS.filter((l) => l.el === elId)
      .map((l) => `<button class="place-chip" data-loc="${l.name}">${l.glyph} ${l.name}</button>`).join("") || "";

    app().innerHTML = `
      <div class="element-page">
        <header class="subj-head"><a class="back" href="#/math">← Camp</a>
          <h1 class="themed-title">${SC.Art.elementBadge(elId, 30)} ${el.name}${el.capstone ? " — the final trial" : " Nation"}</h1></header>
        <div class="results-grid">
          <div class="card">
            <h2>${el.capstone ? "Avatar State" : lvl + " " + el.bender}</h2>
            ${el.capstone
              ? `<p>Cross-domain challenges that draw on everything at once. ${SC.State.capstoneUnlocked(stats) ? "Unlocked — the glow is yours." : "Reach Adept in three elements to unlock its glow."}</p>`
              : `<div class="level-bar big"><div class="level-fill ${pct >= 80 ? "good" : ""}" style="width:${pct}%"></div></div>
                 <p class="muted small">${att} challenge${att === 1 ? "" : "s"} faced · ${pct}% first-try${att < guard ? ` · ${guard - att} more to qualify for a level` : ""} · 80% = Adept, 90% = Master</p>`}
          </div>
          <div class="card"><h2>Places of this nation</h2><div class="place-wrap">${places || '<p class="muted small">Its places reveal themselves on the map.</p>'}</div></div>
          <div class="card span2"><h2>Every challenge faced here</h2>${histHtml}</div>
        </div>
      </div>`;
    app().querySelectorAll(".place-chip").forEach((b) => b.addEventListener("click", () => showLocation(b.dataset.loc)));
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { const mo = document.getElementById("loc-modal"); if (mo) mo.remove(); }
  });
  document.addEventListener("DOMContentLoaded", route);
  if (document.readyState !== "loading") route();
})();
