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

  /* Real scenic photo per land (Wikimedia Commons via Special:FilePath); the SVG
     biome underneath shows automatically if a photo can't load (offline/404). */
  const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";
  function photoSrc(file, w) { return COMMONS + encodeURIComponent(file) + "?width=" + (w || 900); }
  // Real scenic photos (Wikimedia Commons). Credits (CC/PD, best-effort):
  //  world: Tiare Scott CC BY 2.0 · math: Nelson Minar CC BY-SA 2.0 · science: USAF/J. Strang PD
  //  sunsword: Sharon Mollerus CC BY 2.0 · logic: Romain Guy CC0 · basketball: S. Guest-Smith CC0
  const LAND_PHOTOS = {
    world: "Bora Bora Landscape - Flickr - tiarescott.jpg",
    math: "Zermatt with Matterhorn - Flickr - Nelson Minar.jpg",
    science: "Aurora borealis over Eielson Air Force Base, Alaska.jpg",
    sunsword: "Temple of Poseidon, 444 BC, Cape Sounion, Greece (3347933347).jpg",
    logic: "Horseshoe Bend Sunset - Flickr - romainguy.jpg",
    basketball: "Venice beach at sunset (Unsplash).jpg",
  };

  /* ---- Click sound: short "ka-chunk" via WebAudio (no asset files) ---- */
  let actx = null;
  function kachunk() {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime;
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(440, t);
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.07);
      o.connect(g).connect(actx.destination);
      o.start(t); o.stop(t + 0.08);
    } catch (e) { /* sound is decoration; never break the click */ }
  }

  /* ============================================================
     LANDING MAP — six "lands", each its own nature biome.
     Replaces the old airport/control-tower motif. Each subject is a
     framed landscape postcard with layered depth. The .land-pos /
     .land[data-subject] contract is preserved so wireLanding's
     click -> zoom -> enter flow works unchanged.
     ============================================================ */
  const LANDS = {
    world:      { name: "World Awareness",     accent: "#2f9e6a", biome: "tropical" },
    math:       { name: "Math",                accent: "#5a93c4", biome: "alpine"   },
    science:    { name: "Science / Data",      accent: "#6a78c0", biome: "aurora"   },
    sunsword:   { name: "The Sun & the Sword", accent: "#d08a3a", biome: "mediter"  },
    logic:      { name: "Logic / Puzzles",     accent: "#c06a34", biome: "canyon"   },
    basketball: { name: "Basketball",          accent: "#e07a3c", biome: "coast"    },
  };
  const CARD = { w: 348, h: 236, sh: 176 };
  const GRID = {
    world: [40, 40],  math: [416, 40],  science: [792, 40],
    sunsword: [40, 304], logic: [416, 304], basketball: [792, 304],
  };

  // each biome paints into local coords 0..348 (w) x 0..176 (scene height)
  const BIOME = {
    tropical: () => `
      <rect width="348" height="176" fill="url(#lm-sky-trop)"></rect>
      <circle cx="288" cy="40" r="40" fill="#fff3bf" opacity="0.18"></circle>
      <circle cx="288" cy="40" r="24" fill="#fff3bf"></circle>
      <rect y="108" width="348" height="68" fill="url(#lm-sea-trop)"></rect>
      <path d="M104 108 q42 -64 92 0 Z" fill="#3c7a4c"></path>
      <path d="M132 108 q30 -46 64 0 Z" fill="#34673f"></path>
      <path d="M150 78 l 6 -10 l 6 10 Z" fill="#6b4a2a"></path>
      <path d="M0 150 q174 -24 348 0 L348 176 L0 176 Z" fill="#ecd6a0"></path>
      <g stroke="#cdeef2" stroke-width="2" fill="none" opacity="0.85" stroke-linecap="round">
        <path d="M36 130 q7 -7 14 0 q7 -7 14 0"></path><path d="M214 136 q7 -7 14 0 q7 -7 14 0"></path></g>
      ${A.palms(34, 168, 1)}${A.palms(300, 170, 1)}`,
    alpine: () => `
      <rect width="348" height="176" fill="url(#lm-sky-alp)"></rect>
      <circle cx="286" cy="38" r="18" fill="#fff7e4"></circle>
      ${A.mountains(6, 122, 9, "#9fb1c6")}
      ${A.mountains(34, 138, 7, "#c4d3e3")}
      <g fill="#e7caa0" stroke="#4a3a26" stroke-width="1.1">
        <path d="M163 116 h18 l-3 -6 h-12 Z"></path><path d="M165 110 h14 l-3 -6 h-8 Z"></path><path d="M167 104 h10 l-5 -7 Z"></path></g>
      <path d="M0 150 q174 -14 348 0 L348 176 L0 176 Z" fill="#84b974"></path>
      ${A.pines(26, 152, 3, "#3c6745")}${A.pines(250, 154, 3, "#3c6745")}`,
    aurora: () => `
      <rect width="348" height="176" fill="url(#lm-sky-aur)"></rect>
      <g fill="#eaf2ff">
        <circle cx="40" cy="30" r="1.3"></circle><circle cx="92" cy="20" r="1"></circle><circle cx="148" cy="36" r="1.4"></circle>
        <circle cx="208" cy="22" r="1"></circle><circle cx="250" cy="46" r="1.2"></circle><circle cx="120" cy="58" r="1"></circle><circle cx="322" cy="30" r="1.2"></circle></g>
      <circle cx="300" cy="40" r="13" fill="#eef3ff"></circle><circle cx="295" cy="37" r="13" fill="url(#lm-sky-aur)"></circle>
      <path d="M-20 64 Q120 22 200 52 T372 40" fill="none" stroke="#5ff0b4" stroke-width="11" opacity="0.30"></path>
      <path d="M-20 84 Q140 48 240 74 T372 62" fill="none" stroke="#8aa6f2" stroke-width="9" opacity="0.26"></path>
      <path d="M0 132 q174 -12 348 0 L348 176 L0 176 Z" fill="#dbe7f4"></path>
      <path d="M0 152 q174 -10 348 6 L348 176 L0 176 Z" fill="#bccee2"></path>
      ${A.pines(32, 150, 3, "#16273a")}${A.pines(250, 150, 3, "#16273a")}`,
    mediter: () => `
      <rect width="348" height="176" fill="url(#lm-sky-med)"></rect>
      <circle cx="174" cy="62" r="58" fill="#ffe39a" opacity="0.20"></circle>
      <circle cx="174" cy="62" r="38" fill="#ffe6a0"></circle>
      <rect y="116" width="348" height="14" fill="#2f86a8" opacity="0.6"></rect>
      <path d="M0 128 q90 -26 180 -6 q90 22 168 -2 L348 176 L0 176 Z" fill="#c7a45a"></path>
      <path d="M0 150 q120 -16 240 2 q60 8 108 -2 L348 176 L0 176 Z" fill="#b3914a"></path>
      <g fill="#ece1c4" stroke="#b6a781" stroke-width="1">
        <rect x="148" y="96" width="7" height="34"></rect><rect x="164" y="96" width="7" height="34"></rect><rect x="180" y="96" width="7" height="34"></rect>
        <rect x="143" y="90" width="49" height="7"></rect></g>
      <path d="M70 150 q-6 -30 0 -46 q6 16 0 46 Z" fill="#3f5e3a"></path>
      <path d="M286 150 q-6 -28 0 -42 q6 14 0 42 Z" fill="#3f5e3a"></path>`,
    canyon: () => `
      <rect width="348" height="176" fill="url(#lm-sky-can)"></rect>
      <circle cx="286" cy="44" r="16" fill="#fff0cf" opacity="0.85"></circle>
      <path d="M0 92 H118 L136 106 H348 V124 H0 Z" fill="#c2693a"></path>
      <path d="M0 122 H78 L96 136 H250 L268 122 H348 V176 H0 Z" fill="#a4502b"></path>
      <path d="M40 176 V142 a26 26 0 0 1 52 0 V176 H78 V148 a14 14 0 0 0 -28 0 V176 Z" fill="#8c4226"></path>
      <g fill="#3f6b42" stroke="#2c4d30" stroke-width="1"><rect x="290" y="138" width="8" height="38" rx="4"></rect><rect x="282" y="150" width="6" height="14" rx="3"></rect><rect x="300" y="146" width="6" height="16" rx="3"></rect></g>
      <rect y="170" width="348" height="6" fill="#caa06a"></rect>`,
    coast: () => `
      <rect width="348" height="176" fill="url(#lm-sky-coast)"></rect>
      <circle cx="174" cy="116" r="46" fill="#ffd98a" opacity="0.25"></circle>
      <circle cx="174" cy="118" r="28" fill="#ffe0a0"></circle>
      <rect y="118" width="348" height="58" fill="url(#lm-sea-coast)"></rect>
      <rect x="164" y="118" width="20" height="58" fill="#ffe7b4" opacity="0.45"></rect>
      <path d="M0 158 q174 -12 348 0 L348 176 L0 176 Z" fill="#e6c489"></path>
      ${A.palms(32, 172, 1)}
      <line x1="300" y1="172" x2="300" y2="132" stroke="#3a3a3a" stroke-width="3"></line>
      <rect x="288" y="120" width="24" height="16" rx="2" fill="#dadada" stroke="#3a3a3a" stroke-width="1.5"></rect>
      <ellipse cx="300" cy="138" rx="7" ry="3" fill="none" stroke="#e07a3c" stroke-width="2"></ellipse>`,
  };

  function landCard(s) {
    const m = LANDS[s.id]; if (!m) return "";
    const [x, y] = GRID[s.id] || [0, 0];
    const soon = !!s.comingSoon || !s.active;
    const W = CARD.w, H = CARD.h, SH = CARD.sh;
    const clip = "lm-clip-" + s.id;
    const scene = BIOME[m.biome] ? BIOME[m.biome]() : "";
    const ph = LAND_PHOTOS[s.id];
    const photoLayer = ph ? `<image href="${photoSrc(ph)}" x="0" y="0" width="${W}" height="${SH}" preserveAspectRatio="xMidYMid slice" onerror="this.style.display='none'"></image>` : "";
    const statusTxt = soon ? "OPENING SOON" : "OPEN";
    const pillFill = soon ? "#6b7785" : "#2f9e6a";
    const pillW = soon ? 128 : 60;
    const label = `
      <rect y="${SH}" width="${W}" height="${H - SH}" fill="#12273d"></rect>
      <rect y="${SH}" width="6" height="${H - SH}" fill="${m.accent}"></rect>
      <text x="22" y="${SH + 38}" fill="#ffffff" font-size="21" font-weight="800">${m.name}</text>
      <rect x="${W - pillW - 18}" y="${SH + 18}" width="${pillW}" height="24" rx="12" fill="${pillFill}"></rect>
      <text x="${W - 18 - pillW / 2}" y="${SH + 34.5}" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700" letter-spacing="0.6">${statusTxt}</text>`;
    const overlay = soon ? `<rect width="${W}" height="${SH}" fill="#0b1c2e" opacity="0.40"></rect>
      <g transform="translate(${W / 2} ${SH / 2})" opacity="0.92"><rect x="-15" y="-7" width="30" height="22" rx="4" fill="#e9eef4"></rect><path d="M -9 -7 v -6 a 9 9 0 0 1 18 0 v 6" fill="none" stroke="#e9eef4" stroke-width="3"></path><circle cy="4" r="3.2" fill="#12273d"></circle></g>` : "";
    const dash = soon ? ` stroke-dasharray="9 7"` : "";
    return `<g class="land-pos" transform="translate(${x} ${y})">
      <g class="land land-card ${soon ? "land-soon" : "land-active"}" data-subject="${s.id}" tabindex="0" role="button" aria-label="${m.name}${soon ? " — opening soon" : " — open"}">
        <clipPath id="${clip}"><rect width="${W}" height="${H}" rx="18"></rect></clipPath>
        <g clip-path="url(#${clip})">${scene}${photoLayer}${label}${overlay}</g>
        <rect width="${W}" height="${H}" rx="18" fill="none" stroke="${m.accent}" stroke-width="3"${dash}></rect>
      </g>
    </g>`;
  }

  function landingMap(subjects) {
    const W = 1180, H = 580;
    const cards = subjects.map(landCard).join("");
    const defs = `<defs>
      <linearGradient id="lm-sky-trop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fcfe6"></stop><stop offset="1" stop-color="#d7f0ee"></stop></linearGradient>
      <linearGradient id="lm-sea-trop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2ba0b8"></stop><stop offset="1" stop-color="#14627e"></stop></linearGradient>
      <linearGradient id="lm-sky-alp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6d6ef"></stop><stop offset="1" stop-color="#f1e9d8"></stop></linearGradient>
      <linearGradient id="lm-sky-aur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071a33"></stop><stop offset="1" stop-color="#10325a"></stop></linearGradient>
      <linearGradient id="lm-sky-med" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd987"></stop><stop offset="1" stop-color="#ffc06a"></stop></linearGradient>
      <linearGradient id="lm-sky-can" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7cda0"></stop><stop offset="1" stop-color="#e79a6f"></stop></linearGradient>
      <linearGradient id="lm-sky-coast" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffbf73"></stop><stop offset="0.55" stop-color="#ff8a66"></stop><stop offset="1" stop-color="#7d5685"></stop></linearGradient>
      <linearGradient id="lm-sea-coast" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4673c"></stop><stop offset="1" stop-color="#9a4f6e"></stop></linearGradient>
    </defs>`;
    return `<svg id="landing-map" viewBox="0 0 ${W} ${H}" width="100%" aria-label="Summer Camp — pick a land to explore" preserveAspectRatio="xMidYMid meet">
      ${defs}
      ${cards}
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
      const y = 14 + Math.random() * 34;
      const plane = document.createElementNS("http://www.w3.org/2000/svg", "path");
      plane.setAttribute("d", "M 0 0 q 6 -5 12 0 q -6 -5 -12 0 Z");
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
