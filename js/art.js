/* ============================================================
   Summer Camp — SVG art library
   [ENGINE]: parchment, compass, creatures, banner, defs.
   [MATH]:   element icons & terrain motifs.
   All original, hand-authored, franchise-INSPIRED. SVG filters
   render once (static) — animation is transform/opacity only.
   ============================================================ */

window.SC = window.SC || {};

SC.Art = (function () {

  /* ---- shared <defs>: textures, wobble, gradients ---- */
  function defs(idp) {
    return `<defs>
      <filter id="${idp}-rough" x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="7" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="9"/>
      </filter>
      <filter id="${idp}-rough2" x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="13" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="6"/>
      </filter>
      <filter id="${idp}-paper">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n"/>
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.22  0 0 0 0.06 0"/>
        <feComposite operator="over" in2="SourceGraphic"/>
      </filter>
      <radialGradient id="${idp}-oceanG" cx="50%" cy="42%" r="75%">
        <stop offset="0%" stop-color="#7ab7cf"/>
        <stop offset="55%" stop-color="#4f93b4"/>
        <stop offset="100%" stop-color="#2e6587"/>
      </radialGradient>
      <radialGradient id="${idp}-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#9fe8e2" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#3aa6a0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${idp}-parchG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#efe0bd"/>
        <stop offset="50%" stop-color="#e9d6ac"/>
        <stop offset="100%" stop-color="#dec896"/>
      </linearGradient>
    </defs>`;
  }

  /* ---- parchment sheet with torn, wobbled edge ---- */
  function parchment(idp, W, H) {
    return `<g filter="url(#${idp}-paper)">
      <path filter="url(#${idp}-rough)" fill="url(#${idp}-parchG)" stroke="#b99a5e" stroke-width="3"
        d="M 14 22 Q ${W * 0.25} 6, ${W * 0.5} 16 T ${W - 14} 20
           Q ${W - 4} ${H * 0.3}, ${W - 16} ${H * 0.55} T ${W - 10} ${H - 18}
           Q ${W * 0.7} ${H - 4}, ${W * 0.45} ${H - 14} T 16 ${H - 16}
           Q 4 ${H * 0.7}, 14 ${H * 0.45} T 14 22 Z"/>
    </g>`;
  }

  /* ---- painted title banner ---- */
  function banner(idp, x, y, w, text, cls) {
    const h = 38;
    return `<g class="art-banner ${cls || ""}">
      <path filter="url(#${idp}-rough2)" fill="#c8a45f" stroke="#8a6a32" stroke-width="2"
        d="M ${x - w / 2} ${y - h / 2} L ${x + w / 2} ${y - h / 2} L ${x + w / 2 + 14} ${y} L ${x + w / 2} ${y + h / 2}
           L ${x - w / 2} ${y + h / 2} L ${x - w / 2 - 14} ${y} Z"/>
      <text x="${x}" y="${y + 6}" text-anchor="middle" class="banner-text">${text}</text>
    </g>`;
  }

  /* ---- compass rose ---- */
  function compass(x, y, r) {
    const pt = (ang, rr) => `${x + rr * Math.cos(ang)} ${y + rr * Math.sin(ang)}`;
    let star = "";
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI / 4) * i - Math.PI / 2;
      const rr = i % 2 === 0 ? r : r * 0.45;
      star += `${i === 0 ? "M" : "L"} ${pt(a, rr)} L ${pt(a + Math.PI / 8, r * 0.18)} `;
    }
    return `<g class="compass">
      <circle cx="${x}" cy="${y}" r="${r * 1.15}" fill="none" stroke="#2c3e50" stroke-width="1.5" opacity="0.7"/>
      <path d="${star}Z" fill="#2c3e50" opacity="0.85"/>
      <circle cx="${x}" cy="${y}" r="${r * 0.12}" fill="#e9d6ac" stroke="#2c3e50"/>
      <text x="${x}" y="${y - r * 1.3}" text-anchor="middle" class="compass-n">N</text>
    </g>`;
  }

  /* ---- ocean life ---- */
  function waves(x, y, n) {
    let p = "";
    for (let i = 0; i < (n || 3); i++) {
      p += `<path d="M ${x + i * 26} ${y + (i % 2) * 5} q 6 -7 13 0 q 6 -7 13 0" class="sea-wave"/>`;
    }
    return p;
  }

  function serpent(x, y) {
    return `<g class="serpent">
      <path d="M ${x} ${y} q 10 -16 20 0" class="serp-hump"/>
      <path d="M ${x + 30} ${y} q 10 -13 20 0" class="serp-hump"/>
      <path d="M ${x + 60} ${y} q 8 -18 14 -4 q 8 2 4 8 q -6 4 -10 0" class="serp-head"/>
    </g>`;
  }

  function koiPair(x, y) {
    return `<g class="koi" style="--kx:${x}px; --ky:${y}px">
      <path d="M 0 -10 q 9 4 0 12 q -5 5 -2 9 q -7 -3 -4 -10 q -7 -6 6 -11" class="koi-white"/>
      <path d="M 0 10 q -9 -4 0 -12 q 5 -5 2 -9 q 7 3 4 10 q 7 6 -6 11" class="koi-dark"/>
    </g>`;
  }

  function cloud(x, y, s, cls) {
    return `<g class="cloud ${cls || ""}" style="--cx:${x}px; --cy:${y}px; --cs:${s}">
      <path d="M 0 0 q 8 -14 22 -8 q 6 -12 20 -6 q 14 -4 16 8 q 12 2 6 10 q -30 6 -64 -4 Z" class="cloud-fill"/>
    </g>`;
  }

  function whale(x, y) {
    return `<g class="whale" transform="translate(${x} ${y})">
      <path d="M -24 0 Q -10 -14 10 -10 Q 24 -7 26 2 Q 10 8 -10 6 Q -20 5 -24 0 Z" fill="#37667e" stroke="#1d4357" stroke-width="1.5"/>
      <path d="M 24 0 q 8 -8 12 -10 q -2 8 2 12 q -8 2 -14 -2" fill="#37667e" stroke="#1d4357" stroke-width="1.5"/>
      <circle cx="-12" cy="-3" r="1.6" fill="#102b38"/>
      <path d="M -16 -12 q -1 -7 3 -10 M -13 -12 q 3 -6 0 -10" fill="none" stroke="#9fd0e2" stroke-width="2" stroke-linecap="round" class="spout"/>
    </g>`;
  }

  function islet(idp, x, y, withPalms) {
    return `<g><path filter="url(#${idp}-rough2)" fill="#bfae8a" stroke="#8a7a5a" stroke-width="2"
      d="M ${x - 22} ${y} C ${x - 14} ${y - 9} ${x + 10} ${y - 10} ${x + 20} ${y - 3} C ${x + 28} ${y + 3} ${x + 24} ${y + 12} ${x + 12} ${y + 15} C ${x - 2} ${y + 18} ${x - 18} ${y + 13} ${x - 22} ${y} Z"/>
      ${withPalms ? palms(x - 6, y + 6, 1) : ""}</g>`;
  }

  function boat(x, y) {
    return `<g class="boat" transform="translate(${x} ${y})">
      <path d="M -16 0 Q 0 10 16 0 L 10 6 Q 0 12 -10 6 Z" fill="#7a5230" stroke="#4d331e"/>
      <line x1="0" y1="0" x2="0" y2="-22" stroke="#4d331e" stroke-width="2"/>
      <path d="M 0 -22 Q 14 -14 2 -4 L 0 -4 Z" fill="#e8dcc0" stroke="#9a8a68"/>
    </g>`;
  }

  /* ---- terrain motifs ---- */
  function mountains(x, y, n, color) {
    let m = "";
    for (let i = 0; i < n; i++) {
      const mx = x + i * 22 + (i % 2) * 8, my = y + (i % 2) * 6, h = 16 + (i % 3) * 5;
      m += `<path d="M ${mx} ${my} l 10 -${h} l 10 ${h} Z" fill="${color}" stroke="#3d3326" stroke-width="1.2" opacity="0.85"/>
            <path d="M ${mx + 7} ${my - h * 0.55} l 3 -${h * 0.42} l 3 ${h * 0.42} Z" fill="#f4efe2" opacity="0.9"/>`;
    }
    return m;
  }

  function pines(x, y, n, color) {
    let t = "";
    for (let i = 0; i < n; i++) {
      const tx = x + i * 18 + (i % 2) * 7, ty = y + (i % 3) * 5;
      t += `<path d="M ${tx} ${ty} l 7 -14 l 7 14 Z M ${tx + 2} ${ty - 8} l 5 -10 l 5 10 Z" fill="${color}" stroke="#2f3b22" stroke-width="0.8"/>
            <rect x="${tx + 5.5}" y="${ty}" width="3" height="5" fill="#5b4226"/>`;
    }
    return t;
  }

  function palms(x, y, n) {
    let t = "";
    for (let i = 0; i < n; i++) {
      const tx = x + i * 24, ty = y + (i % 2) * 6;
      t += `<path d="M ${tx} ${ty} q 3 -14 1 -20" fill="none" stroke="#6b4a2a" stroke-width="2.5"/>
        <path d="M ${tx + 1} ${ty - 20} q -10 -6 -16 -2 M ${tx + 1} ${ty - 20} q 10 -6 16 -2 M ${tx + 1} ${ty - 20} q -6 -10 -2 -14 M ${tx + 1} ${ty - 20} q 8 -8 12 -8"
          fill="none" stroke="#4e7a3a" stroke-width="2.2" stroke-linecap="round"/>`;
    }
    return t;
  }

  function flames(x, y, n) {
    let f = "";
    for (let i = 0; i < n; i++) {
      const fx = x + i * 20, fy = y + (i % 2) * 6;
      f += `<path d="M ${fx} ${fy} q -6 -8 0 -16 q 2 5 5 6 q 4 -6 2 -10 q 8 8 3 18 q -4 6 -10 2 Z" fill="#d4622e" stroke="#8c3218" stroke-width="1"/>`;
    }
    return f;
  }

  function swirls(x, y, n) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const sx = x + i * 26, sy = y + (i % 2) * 8;
      s += `<path d="M ${sx} ${sy} a 8 8 0 1 1 8 8 a 5.5 5.5 0 1 0 5.5 -5.5" fill="none" stroke="#b8742e" stroke-width="2" stroke-linecap="round" opacity="0.8"/>`;
    }
    return s;
  }

  function gnarledTree(x, y) {
    return `<g>
      <path d="M ${x} ${y} q -2 -10 -8 -14 q 4 0 7 3 q -1 -9 3 -15 q 2 6 1 11 q 5 -7 12 -8 q -6 6 -8 12 q 6 -2 9 1 q -8 1 -11 6 q 1 2 -1 4 Z"
        fill="#5e5340" stroke="#3c3322" stroke-width="1.2"/>
      <circle cx="${x - 8}" cy="${y - 20}" r="1.6" class="spirit-mote"/>
      <circle cx="${x + 10}" cy="${y - 14}" r="1.3" class="spirit-mote m2"/>
      <circle cx="${x + 2}" cy="${y - 26}" r="1.2" class="spirit-mote m3"/>
    </g>`;
  }

  function pagoda(x, y, color) {
    return `<g stroke="#4a3a26" stroke-width="1.1" fill="${color || "#c8a45f"}">
      <path d="M ${x - 9} ${y} h 18 l -3 -6 h -12 Z"/>
      <path d="M ${x - 7} ${y - 6} h 14 l -3 -6 h -8 Z"/>
      <path d="M ${x - 5} ${y - 12} h 10 l -5 -8 Z"/>
    </g>`;
  }

  /* ---- element icon badges (original, element-inspired) ---- */
  const EL_COLORS = { water: "#2e6f9e", earth: "#4c7a3d", fire: "#a33b2a", air: "#c2641f", spirit: "#6d5a9e", avatarstate: "#3aa6a0" };

  function elementGlyph(el, x, y, r) {
    const c = EL_COLORS[el] || "#777";
    let inner = "";
    if (el === "water") inner = `<path d="M ${x - r * 0.55} ${y} q ${r * 0.28} -${r * 0.5} ${r * 0.55} 0 t ${r * 0.55} 0 M ${x - r * 0.55} ${y + r * 0.34} q ${r * 0.28} -${r * 0.5} ${r * 0.55} 0 t ${r * 0.55} 0" fill="none" stroke="#fff" stroke-width="${r * 0.16}" stroke-linecap="round"/>`;
    if (el === "earth") inner = `<path d="M ${x - r * 0.5} ${y + r * 0.42} l ${r * 0.34} -${r * 0.75} l ${r * 0.3} ${r * 0.4} l ${r * 0.2} -${r * 0.28} l ${r * 0.26} ${r * 0.63} Z" fill="#fff"/>`;
    if (el === "fire") inner = `<path d="M ${x} ${y + r * 0.5} q -${r * 0.5} -${r * 0.45} -${r * 0.12} -${r * 0.95} q ${r * 0.1} ${r * 0.3} ${r * 0.3} ${r * 0.36} q ${r * 0.25} -${r * 0.4} ${r * 0.1} -${r * 0.62} q ${r * 0.55} ${r * 0.5} ${r * 0.05} ${r * 1.1} q -${r * 0.18} ${r * 0.18} -${r * 0.33} ${r * 0.11} Z" fill="#fff"/>`;
    if (el === "air") inner = `<path d="M ${x - r * 0.45} ${y + r * 0.1} a ${r * 0.42} ${r * 0.42} 0 1 1 ${r * 0.42} ${r * 0.42} a ${r * 0.26} ${r * 0.26} 0 1 0 ${r * 0.26} -${r * 0.26}" fill="none" stroke="#fff" stroke-width="${r * 0.15}" stroke-linecap="round"/>`;
    if (el === "spirit") inner = `<path d="M ${x} ${y - r * 0.5} a ${r * 0.5} ${r * 0.5} 0 0 1 0 ${r}  a ${r * 0.25} ${r * 0.25} 0 0 1 0 -${r * 0.5} a ${r * 0.25} ${r * 0.25} 0 0 0 0 -${r * 0.5}" fill="#fff"/><circle cx="${x}" cy="${y - r * 0.25}" r="${r * 0.08}" fill="${c}"/><circle cx="${x}" cy="${y + r * 0.25}" r="${r * 0.08}" fill="#fff"/>`;
    if (el === "avatarstate") inner = `<circle cx="${x}" cy="${y}" r="${r * 0.5}" fill="none" stroke="#fff" stroke-width="${r * 0.13}"/><circle cx="${x}" cy="${y - r * 0.5}" r="${r * 0.13}" fill="#fff"/><circle cx="${x + r * 0.5}" cy="${y}" r="${r * 0.13}" fill="#fff"/><circle cx="${x}" cy="${y + r * 0.5}" r="${r * 0.13}" fill="#fff"/><circle cx="${x - r * 0.5}" cy="${y}" r="${r * 0.13}" fill="#fff"/>`;
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#fff" stroke-width="${r * 0.12}"/>
      <circle cx="${x}" cy="${y}" r="${r * 0.82}" fill="none" stroke="#ffffff55" stroke-width="1"/>${inner}</g>`;
  }

  /* inline HTML badge (for chips/cards) */
  function elementBadge(el, size) {
    const s = size || 22;
    return `<svg viewBox="0 0 30 30" width="${s}" height="${s}" class="el-badge">${elementGlyph(el, 15, 15, 13)}</svg>`;
  }

  /* ---- subject icons for the landing map ---- */
  function subjectGlyph(id, x, y, r) {
    if (id === "math") return elementGlyph("air", x, y, r);
    if (id === "world") return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#2e6f9e" stroke="#fff" stroke-width="2"/>
      <ellipse cx="${x}" cy="${y}" rx="${r * 0.5}" ry="${r}" fill="none" stroke="#fff" stroke-width="1.4"/>
      <line x1="${x - r}" y1="${y}" x2="${x + r}" y2="${y}" stroke="#fff" stroke-width="1.4"/>
      <path d="M ${x - r * 0.86} ${y - r * 0.5} q ${r * 0.86} ${r * 0.3} ${r * 1.72} 0 M ${x - r * 0.86} ${y + r * 0.5} q ${r * 0.86} -${r * 0.3} ${r * 1.72} 0" fill="none" stroke="#fff" stroke-width="1.2"/></g>`;
    if (id === "science") return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#6d5a9e" stroke="#fff" stroke-width="2"/>
      <path d="M ${x - r * 0.18} ${y - r * 0.55} h ${r * 0.36} v ${r * 0.35} l ${r * 0.38} ${r * 0.6} q ${r * 0.12} ${r * 0.3} -${r * 0.2} ${r * 0.3} h -${r * 0.72} q -${r * 0.32} 0 -${r * 0.2} -${r * 0.3} l ${r * 0.38} -${r * 0.6} Z" fill="#fff"/>
      <circle cx="${x - r * 0.12}" cy="${y + r * 0.32}" r="${r * 0.1}" fill="#6d5a9e"/><circle cx="${x + r * 0.18}" cy="${y + r * 0.45}" r="${r * 0.08}" fill="#6d5a9e"/></g>`;
    if (id === "logic") return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#a33b2a" stroke="#fff" stroke-width="2"/>
      <path d="M ${x} ${y - r * 0.62} L ${x + r * 0.18} ${y - r * 0.18} L ${x + r * 0.62} ${y} L ${x + r * 0.18} ${y + r * 0.18} L ${x} ${y + r * 0.62} L ${x - r * 0.18} ${y + r * 0.18} L ${x - r * 0.62} ${y} L ${x - r * 0.18} ${y - r * 0.18} Z" fill="#fff"/>
      <circle cx="${x}" cy="${y}" r="${r * 0.14}" fill="#a33b2a"/></g>`;
    if (id === "basketball") return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#c2641f" stroke="#fff" stroke-width="2"/>
      <path d="M ${x - r} ${y} h ${2 * r} M ${x} ${y - r} v ${2 * r} M ${x - r * 0.74} ${y - r * 0.68} q ${r * 0.75} ${r * 0.68} 0 ${r * 1.36} M ${x + r * 0.74} ${y - r * 0.68} q -${r * 0.75} ${r * 0.68} 0 ${r * 1.36}" fill="none" stroke="#fff" stroke-width="1.4"/></g>`;
    return elementGlyph("air", x, y, r);
  }

  return { defs, parchment, banner, compass, waves, serpent, koiPair, cloud, boat, whale, islet,
    mountains, pines, palms, flames, swirls, gnarledTree, pagoda,
    elementGlyph, elementBadge, subjectGlyph, EL_COLORS };
})();
