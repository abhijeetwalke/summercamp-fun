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
      // Outer group holds the position; inner .land scales in place (no lurch on click).
      return `<g class="land-pos" transform="translate(${tx} ${ty})">
        <g class="land ${s.active ? "land-active" : "land-soon"}" data-subject="${s.id}" tabindex="0" role="button"
          aria-label="${s.landLabel}${s.comingSoon ? " — coming soon" : ""}">
          <path d="${g.path}" transform="translate(0 10)" fill="#06141c" opacity="0.32" filter="url(#${idp}-soft)" class="land-cast"></path>
          <path d="${g.path}" filter="url(#${idp}-rough)" fill="${g.fill}" class="land-shape"></path>
          <path d="${g.path}" filter="url(#${idp}-rough)" fill="url(#${idp}-cel)" class="land-cel"></path>
          <path d="${g.path}" filter="url(#${idp}-rough)" fill="none" stroke="#ffffff" stroke-width="1.6" opacity="0.26" transform="translate(0 -1.6)" class="land-rim"></path>
          <g class="land-deco">${g.deco(A)}</g>
          ${A.subjectGlyph(s.id, g.lx, g.ly - 28, 16)}
          ${A.banner(idp, g.lx, g.ly + 4, Math.max(116, s.landLabel.length * 9), s.landLabel)}
          ${s.comingSoon ? `<g class="soon-flag" transform="translate(${g.lx + 56} ${g.ly - 50})">
              <line x1="0" y1="0" x2="0" y2="28" stroke="#2a2114" stroke-width="2"/>
              <path d="M 0 0 h 58 l -7 7 l 7 7 h -58 Z" fill="#2c2820"/>
              <text x="29" y="11" text-anchor="middle" class="soon-text">COMING SOON</text></g>` : ""}
        </g>
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
        const subj = SC.getSubject(land.dataset.subject);
        land.classList.remove("land-pressed", "land-zoom");
        void land.getBoundingClientRect();
        if (subj && subj.active) {
          land.classList.add("land-zoom");   // zoom in place, then enter the world
          setTimeout(() => onEnter(subj.id), reduceMotion ? 0 : 430);
        } else {
          land.classList.add("land-pressed");
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
  // Six landmasses clustered into one continent silhouette, separated by thin
  // ocean cracks (the gaps between paths) — distant/exotic jointed look.
  const TERR = {
    water: { ax: 405, ay: 116,
      path: "M 250 132 C 250 100 304 84 364 90 C 424 96 470 78 522 96 C 560 110 562 142 538 162 C 506 184 448 180 398 174 C 348 168 300 184 272 168 C 250 156 250 146 250 132 Z",
      deco: (a) => a.waves(452, 150, 2) },
    air: { ax: 150, ay: 240,
      path: "M 90 202 C 86 168 122 150 162 156 C 200 162 226 188 228 226 C 230 268 220 308 188 322 C 154 336 110 326 96 296 C 84 270 88 246 88 224 C 89 214 88 210 90 202 Z",
      deco: (a) => a.swirls(106, 250, 2) },
    earth: { ax: 408, ay: 296,
      path: "M 300 212 C 350 192 430 190 492 202 C 542 212 552 252 548 296 C 544 340 510 372 454 380 C 398 388 340 384 306 360 C 276 338 270 300 274 262 C 276 234 282 224 300 212 Z",
      deco: (a) => a.mountains(322, 342, 3, "#5f8a4a") + a.pines(500, 300, 2, "#3f6b33") },
    fire: { ax: 632, ay: 268,
      path: "M 580 212 C 584 184 620 172 658 180 C 692 188 700 220 694 254 C 688 292 696 322 674 344 C 650 366 610 356 592 330 C 574 306 576 280 576 252 C 576 232 574 224 580 212 Z",
      deco: (a) => a.flames(612, 318, 2) },
    spirit: { ax: 212, ay: 376,
      path: "M 130 382 C 128 360 162 348 198 352 C 236 356 266 362 284 386 C 300 408 290 438 262 454 C 230 470 184 468 156 452 C 132 438 126 416 128 400 C 129 392 128 388 130 382 Z",
      deco: (a) => a.gnarledTree(170, 408) + a.gnarledTree(256, 430) },
    avatarstate: { ax: 408, ay: 438,
      path: "M 352 412 C 350 396 380 388 412 392 C 446 396 468 406 472 430 C 474 452 452 468 422 472 C 392 476 360 470 348 450 C 340 436 346 424 352 412 Z",
      deco: () => "" },
  };

  const MASTERY_FILL = { gray: "#9a8a63", amber: "#c2871f", green: "#52803f" };

  function continentMap(subjectCfg, stats, capUnlocked, routes) {
    const idp = "fn";
    const terr = subjectCfg.elements.map((el) => {
      const t = TERR[el.id];
      if (!t) return "";
      const d = stats[el.id];
      let state = "gray";
      if (el.id === "avatarstate") state = capUnlocked ? "cap" : "gray";
      else if (d && d.colorState) state = d.colorState;
      const fill = state === "cap" ? "#2f9890" : MASTERY_FILL[state];
      const lvl = d ? SC.PLATFORM.levels[d.level] : SC.PLATFORM.levels[0];
      const pct = d && d.attempts ? Math.round(d.rate * 100) + "%" : null;
      const meta = el.capstone ? (capUnlocked ? "the final trial" : "master 3 to unlock") : (pct ? `${lvl} · ${pct}` : "unexplored");
      const ax = t.ax, ay = t.ay;       // label anchor
      return `<g class="territory terr-${state}" data-el="${el.id}" tabindex="0" role="button" aria-label="${el.name} territory">
        ${el.id === "avatarstate" && capUnlocked ? `<circle cx="${ax}" cy="${ay - 4}" r="66" fill="url(#${idp}-glow)"/>` : ""}
        <path d="${t.path}" transform="translate(0 8)" fill="#0a1d27" opacity="0.30" filter="url(#${idp}-soft)" class="terr-cast"></path>
        <path d="${t.path}" filter="url(#${idp}-rough)" fill="${fill}" stroke="${A.EL_COLORS[el.id]}" stroke-width="3" class="terr-shape"></path>
        <path d="${t.path}" filter="url(#${idp}-rough)" fill="url(#${idp}-cel)" class="terr-cel"></path>
        <g class="terr-deco">${t.deco(A)}</g>
        ${A.elementGlyph(el.id, ax, ay - 25, 11)}
        <text x="${ax}" y="${ay + 2}" text-anchor="middle" class="terr-name">${el.name}</text>
        <text x="${ax}" y="${ay + 16}" text-anchor="middle" class="terr-meta">${meta}</text>
      </g>`;
    }).join("");

    // Kyoshi islet (small detached island under the Kyoshi marker)
    const islet = `<g><path filter="url(#${idp}-rough2)" fill="#b09a6e" stroke="#6d5a36" stroke-width="1.5"
      d="M 206 440 C 214 433 232 433 240 440 C 247 447 245 459 234 464 C 223 469 209 467 204 457 C 200 450 200 445 206 440 Z"/>
      ${A.palms(214, 456, 1)}</g>`;

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
    const markers = (SC.Journey ? SC.Journey.LOCATIONS : []).map((l) => {
      const a = TERR[l.el];
      const below = !a || l.y > (a.ay || a.ly);   // push label away from the region label
      const ty = below ? l.y + 17 : l.y - 12;
      return `<g class="loc ${stopsVisited.has(l.name) ? "loc-visited" : ""}" data-loc="${l.name}" tabindex="0" role="button" aria-label="${l.name}">
        <circle cx="${l.x}" cy="${l.y}" r="12" class="loc-hit"/>
        <text x="${l.x}" y="${l.y - 8}" text-anchor="middle" class="loc-glyph">${l.glyph}</text>
        <circle cx="${l.x}" cy="${l.y}" r="4" class="loc-dot"/>
        <text x="${l.x}" y="${ty}" text-anchor="middle" class="loc-label">${l.name}</text>
      </g>`;
    }).join("");

    const hasRoutes = (routes || []).some((r) => r.stops && r.stops.length >= 2);
    return `<svg viewBox="0 0 760 540" width="100%" aria-label="The Four Nations mastery map">
      ${A.defs(idp)}
      <rect x="0" y="0" width="760" height="540" fill="#9c8456" rx="10"/>
      ${A.parchment(idp, 760, 540)}
      <path filter="url(#${idp}-rough2)" fill="url(#${idp}-oceanG)"
        d="M 44 58 H 716 Q 730 280 716 484 H 44 Q 28 280 44 58 Z"/>
      <g class="ocean-life">
        ${A.waves(100, 90, 2)}${A.waves(620, 100, 2)}${A.waves(560, 470, 3)}${A.waves(120, 470, 2)}
        ${A.serpent(560, 380)}${A.koiPair(96, 250)}${A.boat(660, 330)}
      </g>
      ${terr}${islet}${routeArt}${markers}
      ${A.compass(86, 474, 28)}
      ${A.cloud(220, 62, 0.9, "c1")}${A.cloud(600, 70, 0.7, "c2")}
      ${A.banner(idp, 380, 36, 230, "The Four Nations", "title-banner")}
      <g class="map-key" transform="translate(536 484)">
        <rect x="-12" y="-18" width="232" height="54" rx="10" class="key-bg"></rect>
        <line x1="4" y1="-3" x2="30" y2="-3" class="key-line"></line>
        <path d="M 30 -3 l -8 -4.5 l 0 9 Z" class="key-arrow"></path>
        <text x="42" y="1" class="key-label">${hasRoutes ? "your journeys so far" : "journeys appear as you travel"}</text>
        <path d="M 5 16 l 11 11 M 5 27 l 11 -11" class="route-x"></path>
        <text x="42" y="24" class="key-label">✕  journey's end</text>
      </g>
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
