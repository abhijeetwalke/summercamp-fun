/* ============================================================
   Summer Camp — Maps (treasure-map richness pass)
   [ENGINE]: landing map composer, tactile click, sound, ambience.
   [MATH]:   the Four Nations continent (results heat map).
   All original SVG. Filters render static; animations are
   transform/opacity only; prefers-reduced-motion honored.
   ============================================================ */

window.SC = window.SC || {};

SC.Maps = (function () {
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const A = SC.Art;

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

  /* ============================================================
     LANDING MAP — five amorphous lands on weathered parchment
     ============================================================ */
  const LANDING_LANDS = {
    math: { fill: "#d98e3f", lx: 420, ly: 178,
      path: "M 300 120 C 350 84 440 78 500 100 C 552 118 570 162 556 204 C 540 248 484 270 420 266 C 356 262 300 240 286 196 C 276 166 280 144 300 120 Z",
      deco: (a) => a.swirls(330, 150, 2) + a.mountains(470, 230, 2, "#b8742e") + a.pagoda(508, 150, "#c8a45f") },
    world: { fill: "#5b8bb0", lx: 180, ly: 210,
      path: "M 96 170 C 126 136 186 124 232 140 C 270 154 284 190 272 226 C 258 264 212 282 168 274 C 128 266 96 240 90 208 C 87 194 88 182 96 170 Z",
      deco: (a) => a.palms(140, 250, 2) + a.mountains(200, 180, 2, "#46708f") },
    science: { fill: "#8d7bb0", lx: 648, ly: 212,
      path: "M 588 160 C 622 134 676 132 706 156 C 732 178 738 214 722 246 C 704 280 660 292 622 280 C 588 268 566 240 566 208 C 566 190 572 174 588 160 Z",
      deco: (a) => a.pines(610, 252, 2, "#5e4f86") + a.mountains(660, 250, 2, "#6f619c") },
    logic: { fill: "#b0524a", lx: 386, ly: 372,
      path: "M 300 320 C 336 296 400 292 446 308 C 488 322 504 356 490 390 C 474 426 420 442 366 434 C 318 426 286 400 282 366 C 280 348 284 334 300 320 Z",
      deco: (a) => a.mountains(320, 400, 3, "#8c3d36") },
    basketball: { fill: "#c98a3c", lx: 598, ly: 376,
      path: "M 540 330 C 570 310 620 308 650 326 C 678 342 686 372 672 400 C 656 430 614 442 576 432 C 542 422 520 398 520 368 C 520 352 526 340 540 330 Z",
      deco: (a) => a.palms(560, 420, 2) },
  };

  /* wide laptop canvas: lands repositioned via per-land translate (no distortion) */
  const LANDING_POS = { math: [250, 30], world: [40, 90], science: [430, 80], logic: [180, 215], basketball: [470, 235] };

  function landingMap(subjects) {
    const idp = "lm";
    const W = 1180, H = 700;
    const lands = subjects.map((s) => {
      const g = LANDING_LANDS[s.id];
      if (!g) return "";
      const [tx, ty] = LANDING_POS[s.id] || [0, 0];
      return `<g class="land ${s.active ? "land-active" : "land-soon"}" data-subject="${s.id}" tabindex="0" role="button"
        aria-label="${s.landLabel}${s.comingSoon ? " — coming soon" : ""}" transform="translate(${tx} ${ty})">
        <path d="${g.path}" filter="url(#${idp}-rough)" fill="${g.fill}" class="land-shape"></path>
        <g class="land-deco">${g.deco(A)}</g>
        ${A.subjectGlyph(s.id, g.lx, g.ly - 28, 16)}
        ${A.banner(idp, g.lx, g.ly + 4, Math.max(116, s.landLabel.length * 9), s.landLabel)}
        ${s.comingSoon ? `<g class="soon-flag" transform="translate(${g.lx + 56} ${g.ly - 50})">
            <line x1="0" y1="0" x2="0" y2="28" stroke="#4a3a26" stroke-width="2"/>
            <path d="M 0 0 h 58 l -7 7 l 7 7 h -58 Z" fill="#3f3a33"/>
            <text x="29" y="11" text-anchor="middle" class="soon-text">COMING SOON</text></g>` : ""}
      </g>`;
    }).join("");

    const fissures = `
      <path d="M 392 270 Q 412 310 440 360" class="fissure"></path>
      <path d="M 856 260 Q 880 300 870 350" class="fissure"></path>
      <path d="M 700 480 Q 730 500 756 514" class="fissure"></path>
      <path d="M 560 320 Q 580 360 570 410" class="fissure"></path>`;

    return `<svg id="landing-map" viewBox="0 0 ${W} ${H}" width="100%" aria-label="Summer Camp world map" preserveAspectRatio="xMidYMid meet">
      ${A.defs(idp)}
      <rect x="0" y="0" width="${W}" height="${H}" fill="#cdb98a" rx="10"/>
      ${A.parchment(idp, W, H)}
      <path filter="url(#${idp}-rough2)" fill="url(#${idp}-oceanG)"
        d="M 48 60 H ${W - 48} Q ${W - 34} ${H / 2} ${W - 48} ${H - 56} H 48 Q 32 ${H / 2} 48 60 Z"/>
      <g class="ocean-life">
        ${A.waves(140, 120, 3)}${A.waves(820, 100, 2)}${A.waves(100, 560, 2)}${A.waves(1000, 600, 3)}
        ${A.waves(520, 640, 2)}${A.waves(940, 140, 2)}${A.waves(320, 100, 2)}
        ${A.serpent(120, 420)}${A.serpent(900, 560)}
        ${A.boat(700, 100)}${A.boat(250, 620)}
        ${A.koiPair(1080, 440)}${A.whale(420, 560)}
        ${A.islet(idp, 950, 460, true)}${A.islet(idp, 330, 520, false)}
      </g>
      ${fissures}${lands}
      ${A.compass(120, 590, 36)}
      ${A.cloud(280, 90, 1, "c1")}${A.cloud(760, 130, 0.8, "c2")}${A.cloud(1020, 580, 0.7, "c1")}
      <g id="bird-layer"></g>
    </svg>`;
  }

  function wireLanding(rootEl, onEnter) {
    rootEl.querySelectorAll(".land").forEach((land) => {
      const act = () => {
        kachunk();
        land.classList.remove("land-pressed");
        void land.getBoundingClientRect();
        land.classList.add("land-pressed");
        const subj = SC.getSubject(land.dataset.subject);
        if (subj && subj.active) {
          setTimeout(() => onEnter(subj.id), reduceMotion ? 0 : 360);
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

  /* ---- Ambience: occasional drifting bird-V; pauses when hidden ---- */
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
    birdTimer = setInterval(spawn, 16000 + Math.random() * 12000);
    setTimeout(spawn, 3000);
  }
  function stopAmbience() { if (birdTimer) { clearInterval(birdTimer); birdTimer = null; } }

  /* ============================================================
     [MATH] THE FOUR NATIONS — illustrated mastery map
     ============================================================ */
  const TERR = {
    water: { lx: 424, ly: 120,
      path: "M 340 64 C 372 44 432 38 470 56 C 506 72 522 102 512 132 C 500 164 462 176 424 170 C 388 164 348 152 338 122 C 330 100 332 80 340 64 Z",
      deco: (a) => a.mountains(360, 142, 2, "#9cc3d4") + a.waves(442, 142, 2) },
    air: { lx: 172, ly: 186,
      path: "M 96 150 C 120 118 168 104 206 116 C 240 126 258 156 250 190 C 244 222 214 242 178 240 C 142 238 108 220 98 192 C 92 176 90 164 96 150 Z",
      deco: (a) => a.swirls(118, 196, 2) + a.pagoda(206, 152, "#d9b06a") },
    earth: { lx: 420, ly: 244,
      path: "M 300 190 C 340 158 412 150 470 164 C 524 176 556 210 552 252 C 548 296 508 326 452 334 C 400 342 340 336 308 304 C 280 278 272 224 300 190 Z",
      deco: (a) => a.mountains(330, 282, 3, "#5f8a4a") + a.pines(450, 312, 3, "#3f6b33") + a.pagoda(478, 216, "#d9b06a") },
    fire: { lx: 644, ly: 210,
      path: "M 588 150 C 618 128 662 126 690 146 C 716 164 724 196 712 226 C 700 256 668 272 636 266 C 604 260 580 238 576 208 C 573 186 574 166 588 150 Z",
      deco: (a) => a.flames(606, 200, 2) + a.mountains(656, 244, 2, "#8c4a3a") },
    spirit: { lx: 226, ly: 366,
      path: "M 168 320 C 196 296 244 292 276 310 C 304 326 312 358 298 386 C 284 414 246 426 212 418 C 180 410 156 388 154 360 C 153 344 156 332 168 320 Z",
      deco: (a) => a.gnarledTree(216, 372) + a.gnarledTree(258, 392) },
    avatarstate: { lx: 444, ly: 432,
      path: "M 396 396 C 420 380 458 378 482 392 C 504 404 510 428 500 450 C 490 472 462 482 434 478 C 408 474 388 458 386 434 C 385 420 386 406 396 396 Z",
      deco: () => "" },
  };

  const MASTERY_FILL = { gray: "#b3a98f", amber: "#d9a23b", green: "#6f9a5d" };

  function continentMap(subjectCfg, stats, capUnlocked, routes) {
    const idp = "fn";
    const terr = subjectCfg.elements.map((el) => {
      const t = TERR[el.id];
      if (!t) return "";
      const d = stats[el.id];
      let state = "gray";
      if (el.id === "avatarstate") state = capUnlocked ? "cap" : "gray";
      else if (d && d.colorState) state = d.colorState;
      const fill = state === "cap" ? "#56b3ac" : MASTERY_FILL[state];
      const lvl = d ? SC.PLATFORM.levels[d.level] : SC.PLATFORM.levels[0];
      const pct = d && d.attempts ? Math.round(d.rate * 100) + "% first-try" : "unexplored";
      const meta = el.capstone ? (capUnlocked ? "the final trial" : "master 3 elements to unlock") : `${lvl} · ${pct}`;
      return `<g class="territory terr-${state}" data-el="${el.id}" tabindex="0" role="button" aria-label="${el.name} territory">
        ${el.id === "avatarstate" && capUnlocked ? `<circle cx="${t.lx}" cy="${t.ly - 6}" r="64" fill="url(#${idp}-glow)"/>` : ""}
        <path d="${t.path}" filter="url(#${idp}-rough)" fill="${fill}" stroke="${A.EL_COLORS[el.id]}" stroke-width="3.5" class="terr-shape"></path>
        <g class="terr-deco">${t.deco(A)}</g>
        ${A.elementGlyph(el.id, t.lx, t.ly - 28, 13)}
        ${A.banner(idp, t.lx, t.ly - 2, Math.max(86, el.name.length * 9.5), el.name)}
        <text x="${t.lx}" y="${t.ly + 26}" text-anchor="middle" class="terr-meta">${meta}</text>
      </g>`;
    }).join("");

    // Kyoshi islet (flavor)
    const islet = `<g><path filter="url(#${idp}-rough2)" fill="#bfae8a" stroke="#8a7a5a" stroke-width="2"
      d="M 306 450 C 316 442 336 442 344 450 C 352 458 350 472 338 478 C 326 484 310 482 304 470 C 300 462 300 456 306 450 Z"/>
      ${A.palms(316, 470, 1)}</g>`;

    // journey routes (dashed treasure-trails through real stops, X at the end)
    const locs = SC.Journey ? SC.Journey.LOC_BY_NAME : {};
    const routeArt = (routes || []).slice(-5).map((r, ri) => {
      const pts = r.stops.map((n) => locs[n]).filter(Boolean);
      if (pts.length < 2) return "";
      let dpath = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        dpath += ` Q ${(a.x + b.x) / 2 + (i % 2 ? 24 : -24)} ${(a.y + b.y) / 2 + (i % 2 ? -18 : 18)} ${b.x} ${b.y}`;
      }
      const end = pts[pts.length - 1];
      return `<g class="route ${r.latest ? "route-latest" : ""}">
        <path d="${dpath}" class="route-path"></path>
        <g transform="translate(${end.x} ${end.y})"><path d="M -6 -6 L 6 6 M -6 6 L 6 -6" class="route-x"></path></g>
      </g>`;
    }).join("");

    // location markers with glyph + name
    const stopsVisited = new Set();
    (routes || []).forEach((r) => r.stops.forEach((s) => stopsVisited.add(s)));
    const markers = (SC.Journey ? SC.Journey.LOCATIONS : []).map((l) =>
      `<g class="loc ${stopsVisited.has(l.name) ? "loc-visited" : ""}" data-loc="${l.name}" tabindex="0" role="button" aria-label="${l.name}">
        <circle cx="${l.x}" cy="${l.y}" r="11" class="loc-hit"/>
        <circle cx="${l.x}" cy="${l.y}" r="4" class="loc-dot"/>
        <text x="${l.x}" y="${l.y - 7}" text-anchor="middle" class="loc-glyph">${l.glyph}</text>
        <text x="${l.x}" y="${l.y + 16}" text-anchor="middle" class="loc-name">${l.name}</text>
      </g>`).join("");

    return `<svg viewBox="0 0 760 540" width="100%" aria-label="The Four Nations mastery map">
      ${A.defs(idp)}
      <rect x="0" y="0" width="760" height="540" fill="#cdb98a" rx="10"/>
      ${A.parchment(idp, 760, 540)}
      <path filter="url(#${idp}-rough2)" fill="url(#${idp}-oceanG)"
        d="M 44 58 H 716 Q 730 280 716 484 H 44 Q 28 280 44 58 Z"/>
      <g class="ocean-life">
        ${A.waves(100, 90, 2)}${A.waves(620, 100, 2)}${A.waves(560, 470, 3)}${A.waves(120, 470, 2)}
        ${A.serpent(560, 380)}${A.koiPair(96, 250)}${A.boat(660, 330)}
      </g>
      ${terr}${islet}${routeArt}${markers}
      ${A.compass(86, 472, 28)}
      ${A.cloud(220, 62, 0.9, "c1")}${A.cloud(600, 70, 0.7, "c2")}
      ${A.banner(idp, 380, 36, 220, "The Four Nations", "title-banner")}
    </svg>`;
  }

  /* Wire clicks on the continent: locations open lore, territories open element pages */
  function wireContinent(rootEl, handlers) {
    rootEl.querySelectorAll(".loc[data-loc]").forEach((g) => {
      const act = () => { kachunk(); handlers.onLoc && handlers.onLoc(g.dataset.loc); };
      g.addEventListener("click", (e) => { e.stopPropagation(); act(); });
      g.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); act(); } });
    });
    rootEl.querySelectorAll(".territory[data-el]").forEach((g) => {
      const act = () => { kachunk(); handlers.onElement && handlers.onElement(g.dataset.el); };
      g.addEventListener("click", act);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); act(); } });
    });
  }

  return { landingMap, wireLanding, continentMap, wireContinent, kachunk, stopAmbience };
})();
