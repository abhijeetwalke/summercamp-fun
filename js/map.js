/* ============================================================
   Summer Camp — Maps
   [ENGINE]: landing map composer (lands from subject config),
             tactile click, click sound, ambient effects.
   [MATH]:   the Avatar continent (results heat map) geometry.
   All SVG. Perf guardrails: CSS transforms/opacity only,
   prefers-reduced-motion honored, ambience starts after paint.
   ============================================================ */

window.SC = window.SC || {};

SC.Maps = (function () {
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Click sound: short "ka-chunk" via WebAudio (no asset files) ---- */
  let actx = null;
  function kachunk() {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime;
      [[180, 0, 0.06], [90, 0.05, 0.09]].forEach(([freq, dt, dur]) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = "square"; o.frequency.setValueAtTime(freq, t + dt);
        g.gain.setValueAtTime(0.12, t + dt);
        g.gain.exponentialRampToValueAtTime(0.001, t + dt + dur);
        o.connect(g).connect(actx.destination);
        o.start(t + dt); o.stop(t + dt + dur);
      });
    } catch (e) { /* sound is decoration; never break the click */ }
  }

  /* ---- Landing map: 5 asymmetric lands, jagged seams, ocean ---- */
  // Hand-drawn irregular polygons (asymmetric, fissured composition)
  const LANDS = [
    { path: "M 295 96 L 372 70 L 449 92 L 484 158 L 446 208 L 380 224 L 318 196 L 286 148 Z", lx: 385, ly: 152 },          // center-north (math)
    { path: "M 84 170 L 168 128 L 254 158 L 272 230 L 222 292 L 130 286 L 76 232 Z", lx: 172, ly: 218 },                    // west
    { path: "M 514 128 L 606 104 L 672 160 L 654 240 L 574 268 L 512 220 Z", lx: 592, ly: 188 },                            // east
    { path: "M 300 252 L 392 240 L 452 282 L 430 352 L 340 372 L 282 322 Z", lx: 368, ly: 308 },                            // center-south
    { path: "M 488 300 L 576 290 L 636 330 L 610 392 L 520 404 L 470 358 Z", lx: 552, ly: 348 },                            // southeast
  ];

  function landingMap(subjects) {
    const lands = subjects.map((s, i) => {
      const g = LANDS[i % LANDS.length];
      return `<g class="land ${s.active ? "land-active" : "land-soon"}" data-subject="${s.id}" tabindex="0" role="button"
        aria-label="${s.landLabel}${s.comingSoon ? " — coming soon" : ""}">
        <path d="${g.path}" class="land-shape land-${i}"></path>
        <text x="${g.lx}" y="${g.ly}" class="land-label" text-anchor="middle">${s.landLabel}</text>
        ${s.comingSoon ? `<text x="${g.lx}" y="${g.ly + 20}" class="land-soon-label" text-anchor="middle">Coming Soon</text>` : ""}
      </g>`;
    }).join("");

    // fissure cracks between lands (decorative seams)
    const fissures = `
      <path d="M 270 160 Q 280 190 276 226" class="fissure"></path>
      <path d="M 470 180 Q 495 190 508 178" class="fissure"></path>
      <path d="M 420 230 Q 410 245 400 246" class="fissure"></path>
      <path d="M 452 300 Q 465 310 472 330" class="fissure"></path>`;

    return `<svg id="landing-map" viewBox="0 0 740 470" width="100%" aria-label="World map">
      <rect x="0" y="0" width="740" height="470" class="ocean"></rect>
      <g class="tide-ring">${LANDS.map((g) => `<path d="${g.path}" class="tide"></path>`).join("")}</g>
      ${fissures}${lands}
      <g id="bird-layer"></g>
    </svg>`;
  }

  function wireLanding(rootEl, onEnter) {
    rootEl.querySelectorAll(".land").forEach((land) => {
      const act = () => {
        kachunk();
        land.classList.remove("land-pressed");
        void land.getBoundingClientRect(); // restart animation
        land.classList.add("land-pressed");
        const id = land.dataset.subject;
        const subj = SC.getSubject(id);
        if (subj && subj.active) {
          setTimeout(() => onEnter(id), reduceMotion ? 0 : 360);
        } else {
          const t = document.getElementById("toast");
          if (t) { t.textContent = `${subj.displayName} — coming soon. Math is open!`; t.classList.add("show");
            setTimeout(() => t.classList.remove("show"), 1800); }
        }
      };
      land.addEventListener("click", act);
      land.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
    });
    if (!reduceMotion) startAmbience(rootEl);
  }

  /* ---- Ambience: occasional drifting bird-V; pause when backgrounded ---- */
  let birdTimer = null;
  function startAmbience(rootEl) {
    stopAmbience();
    const spawn = () => {
      if (document.hidden) return;
      const layer = rootEl.querySelector("#bird-layer");
      if (!layer) return stopAmbience();
      const y = 60 + Math.random() * 120;
      const bird = document.createElementNS("http://www.w3.org/2000/svg", "path");
      bird.setAttribute("d", "M 0 0 q 5 -6 10 0 q 5 -6 10 0");
      bird.setAttribute("class", "bird");
      bird.style.setProperty("--birdY", y + "px");
      layer.appendChild(bird);
      setTimeout(() => bird.remove(), 14000);
    };
    birdTimer = setInterval(spawn, 18000 + Math.random() * 14000);
    setTimeout(spawn, 4000); // first bird after the map is interactive
  }
  function stopAmbience() { if (birdTimer) { clearInterval(birdTimer); birdTimer = null; } }
  document.addEventListener("visibilitychange", () => { /* spawn() self-checks document.hidden */ });

  /* ---- [MATH] Avatar continent: territory heat map ---- */
  const TERRITORIES = {
    water:  { path: "M 330 60 L 420 44 L 478 86 L 460 140 L 384 154 L 322 116 Z", lx: 398, ly: 104 },
    air:    { path: "M 120 120 L 208 84 L 280 122 L 268 192 L 184 214 L 116 178 Z", lx: 196, ly: 152 },
    earth:  { path: "M 300 170 L 420 160 L 488 210 L 462 290 L 340 304 L 282 240 Z", lx: 384, ly: 234 },
    fire:   { path: "M 510 160 L 596 140 L 650 196 L 628 264 L 544 278 L 498 224 Z", lx: 574, ly: 210 },
    spirit: { path: "M 150 250 L 240 240 L 286 290 L 258 348 L 170 354 L 130 304 Z", lx: 208, ly: 300 },
    avatarstate: { path: "M 360 330 L 432 322 L 470 360 L 446 404 L 372 410 L 338 372 Z", lx: 404, ly: 370 },
  };

  function continentMap(subjectCfg, stats, capUnlocked) {
    const polys = subjectCfg.elements.map((el) => {
      const t = TERRITORIES[el.id];
      if (!t) return "";
      const d = stats[el.id];
      let color = "terr-gray";
      if (el.id === "avatarstate") color = capUnlocked ? "terr-cap" : "terr-gray";
      else if (d && d.colorState === "green") color = "terr-green";
      else if (d && d.colorState === "amber") color = "terr-amber";
      const lvl = d ? SC.PLATFORM.levels[d.level] : SC.PLATFORM.levels[0];
      const pct = d && d.attempts ? Math.round(d.rate * 100) + "%" : "—";
      return `<g class="territory">
        <path d="${t.path}" class="terr ${color}"></path>
        <text x="${t.lx}" y="${t.ly - 6}" class="terr-name" text-anchor="middle">${el.name}</text>
        <text x="${t.lx}" y="${t.ly + 12}" class="terr-meta" text-anchor="middle">${el.capstone ? (capUnlocked ? "Unlocked" : "Locked") : lvl + " · " + pct}</text>
      </g>`;
    }).join("");
    return `<svg viewBox="0 0 740 460" width="100%" aria-label="Mastery map">
      <rect width="740" height="460" class="ocean ocean-light"></rect>${polys}</svg>`;
  }

  return { landingMap, wireLanding, continentMap, kachunk, stopAmbience };
})();
