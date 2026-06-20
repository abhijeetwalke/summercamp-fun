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
     LANDING MAP — airport route map (each subject = an airport)
     Self-contained SVG (no Art deps). Every airport keeps the
     .land-pos / .land + data-subject contract so wireLanding's
     click → zoom → enter flow works unchanged.
     ============================================================ */
  const AIRPORTS = {
    math:       { code: "MTH", name: "Math",                accent: "#e6a23c", tower: "#f6c878", ink: "#3a2606", r: 78 },
    world:      { code: "WLD", name: "World Awareness",     accent: "#4a9fd4", tower: "#a7d2ee", ink: "#08263b", r: 54 },
    basketball: { code: "HWD", name: "Basketball",          accent: "#e07a3c", tower: "#f2b288", ink: "#3a1c08", r: 54 },
    sunsword:   { code: "SUN", name: "The Sun & the Sword", accent: "#c2553f", tower: "#eaa478", ink: "#3a1410", r: 54 },
    science:    { code: "SCI", name: "Science / Data",      accent: "#5b7488", tower: "#9fb4c4", ink: "#11212c", r: 50 },
    logic:      { code: "LGC", name: "Logic / Puzzles",     accent: "#5b7488", tower: "#9fb4c4", ink: "#11212c", r: 50 },
  };
  const AIRPORT_POS = {
    math: [600, 235], world: [205, 300], science: [990, 250],
    sunsword: [360, 515], logic: [700, 515], basketball: [965, 510],
  };

  /* a small control tower glyph, drawn around (0,0), scaled to the marker */
  function tower(scale, fill) {
    const s = scale.toFixed(2);
    return `<g transform="scale(${s})" fill="${fill}">
      <rect x="-13" y="-18" width="26" height="6" rx="2.5"></rect>
      <polygon points="-11,-12 11,-12 14,16 -14,16"></polygon>
      <line x1="0" y1="-18" x2="0" y2="-30" stroke="${fill}" stroke-width="2"></line>
      <circle cx="0" cy="-32" r="2.4"></circle>
      <rect x="-7" y="-4" width="5" height="8" fill="#0f2c44"></rect>
      <rect x="2" y="-4" width="5" height="8" fill="#0f2c44"></rect>
    </g>`;
  }

  function airport(s) {
    const m = AIRPORTS[s.id]; if (!m) return "";
    const [cx, cy] = AIRPORT_POS[s.id] || [0, 0];
    const soon = !!s.comingSoon || !s.active;
    const r = m.r, ring = m.accent;
    const dash = soon ? ` stroke-dasharray="6 7"` : "";
    const glow = soon ? "" : `<circle r="${r + 16}" fill="${ring}" opacity="0.10"></circle>`;
    const pillY = r + 18, pw = Math.max(54, m.code.length * 15 + 22), ph = 30;
    const nameY = pillY + ph + 24, subY = nameY + 20;
    const status = soon ? "OPENING SOON" : "OPEN";
    // Outer group holds the position; inner .land scales in place on click (no lurch).
    return `<g class="land-pos" transform="translate(${cx} ${cy})">
      <g class="land ${soon ? "land-soon" : "land-active"}" data-subject="${s.id}" tabindex="0" role="button"
         aria-label="${m.name}${soon ? " — opening soon" : " — open"}">
        ${glow}
        <circle r="${r}" fill="#163a57" stroke="${ring}" stroke-width="3.2"${dash}></circle>
        <circle r="${r - 12}" fill="#0f2c44"></circle>
        ${tower(r / 54, m.tower)}
        <rect x="${-pw / 2}" y="${pillY}" width="${pw}" height="${ph}" rx="${ph / 2}" fill="${ring}"></rect>
        <text x="0" y="${pillY + 20}" text-anchor="middle" class="ap-code" fill="${m.ink}">${m.code}</text>
        <text x="0" y="${nameY}" text-anchor="middle" class="ap-name">${m.name}</text>
        <text x="0" y="${subY}" text-anchor="middle" class="ap-sub ${soon ? "ap-soon" : ""}">${status}</text>
      </g>
    </g>`;
  }

  function landingMap(subjects) {
    const W = 1180, H = 700;
    const ports = subjects.map(airport).join("");
    const grid = `<g stroke="#214663" stroke-width="1" opacity="0.4">
      <line x1="28" y1="250" x2="1152" y2="250"></line><line x1="28" y1="450" x2="1152" y2="450"></line>
      <line x1="320" y1="28" x2="320" y2="672"></line><line x1="600" y1="28" x2="600" y2="672"></line><line x1="880" y1="28" x2="880" y2="672"></line>
    </g>`;
    const routes = `<g fill="none" stroke="#5f93ba" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round" opacity="0.85">
      <path d="M 258 280 Q 410 190 528 230"></path>
      <path d="M 676 232 Q 815 195 942 244"></path>
      <path d="M 668 280 Q 850 360 918 470"></path>
      <path d="M 545 290 Q 430 400 392 470"></path>
      <path d="M 412 525 Q 560 575 652 522"></path>
      <path d="M 748 512 Q 860 540 915 505"></path>
    </g>`;
    const plane = `<g transform="translate(398 200) rotate(-20)"><path d="M 0 0 L 26 0 L 36 -7 L 27 3 L 38 10 L 21 6 L 13 15 L 14 5 L 0 3 Z" fill="#dfeaf2"></path></g>`;
    const compass = `<g transform="translate(108 600)" opacity="0.7">
      <circle r="36" fill="none" stroke="#2e577a" stroke-width="1.5"></circle>
      <circle r="27" fill="none" stroke="#2e577a" stroke-width="0.8" opacity="0.6"></circle>
      <path d="M 0 -34 L 6 -6 L 0 0 L -6 -6 Z" fill="#7fa8c6"></path>
      <path d="M 0 34 L 6 6 L 0 0 L -6 6 Z" fill="#244a66"></path>
      <text x="0" y="-40" text-anchor="middle" class="ap-compass">N</text>
    </g>`;
    return `<svg id="landing-map" viewBox="0 0 ${W} ${H}" width="100%" aria-label="Summer Camp airport route map" preserveAspectRatio="xMidYMid meet">
      <rect x="6" y="6" width="1168" height="688" rx="20" fill="#0c1f30" stroke="#20405c" stroke-width="2"></rect>
      <rect x="28" y="28" width="1124" height="644" rx="14" fill="#0f2840" stroke="#274866" stroke-width="1.5" opacity="0.85"></rect>
      ${grid}${routes}${plane}${compass}${ports}
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
      const y = 70 + Math.random() * 110;
      const plane = document.createElementNS("http://www.w3.org/2000/svg", "path");
      plane.setAttribute("d", "M 0 0 L 22 0 L 31 -6 L 23 2 L 33 8 L 18 5 L 11 13 L 12 4 L 0 3 Z");
      plane.setAttribute("class", "planedrift");
      plane.style.setProperty("--birdY", y + "px");
      layer.appendChild(plane);
      setTimeout(() => plane.remove(), 18000);
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
