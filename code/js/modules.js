/* ============================================================
   Summer Camp — Interactive concept modules  [ENGINE]
   SVG-first, reliable (vision: prefer static SVG over fragile JS).
   Each returns an HTML string; light interactivity via buttons.
   Types: fractionBar | numberLine | areaModel
   ============================================================ */

window.SC = window.SC || {};

SC.Modules = (function () {

  function fractionBar(cfg) {
    const parts = cfg.parts || 4, shaded = cfg.shaded || 1;
    const W = 320, H = 46, pw = W / parts;
    let cells = "";
    for (let i = 0; i < parts; i++) {
      cells += `<rect x="${i * pw + 2}" y="2" width="${pw - 4}" height="${H - 4}" rx="6"
        class="fb-cell ${i < shaded ? "fb-shaded" : ""}" data-i="${i}"></rect>`;
    }
    return `<div class="module" data-mod="fractionBar" data-parts="${parts}">
      <div class="module-title">Fraction bar — tap pieces to shade them</div>
      <svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px">${cells}</svg>
      <div class="module-readout">Shaded: <strong class="fb-readout">${shaded}/${parts}</strong></div>
    </div>`;
  }

  function numberLine(cfg) {
    const min = cfg.min ?? 0, max = cfg.max ?? 10, marks = cfg.marks || [];
    const W = 340, H = 64, pad = 18;
    const x = (v) => pad + ((v - min) / (max - min)) * (W - 2 * pad);
    let ticks = "";
    for (let v = min; v <= max; v++) {
      const big = v % 5 === 0 || v === 0;
      ticks += `<line x1="${x(v)}" y1="${H / 2 - (big ? 8 : 5)}" x2="${x(v)}" y2="${H / 2 + (big ? 8 : 5)}" class="nl-tick"></line>`;
      if (big) ticks += `<text x="${x(v)}" y="${H / 2 + 24}" class="nl-label" text-anchor="middle">${v}</text>`;
    }
    let dots = marks.map((m, i) =>
      `<circle cx="${x(m)}" cy="${H / 2}" r="6" class="nl-dot nl-dot-${i}"></circle>`).join("");
    let hops = "";
    for (let i = 0; i + 1 < marks.length; i++) {
      const a = x(marks[i]), b = x(marks[i + 1]), mid = (a + b) / 2;
      hops += `<path d="M ${a} ${H / 2 - 6} Q ${mid} ${H / 2 - 30} ${b} ${H / 2 - 6}" class="nl-hop"></path>`;
    }
    return `<div class="module" data-mod="numberLine">
      <div class="module-title">Number line — follow the hops</div>
      <svg viewBox="0 0 ${W} ${H + 14}" width="100%" style="max-width:${W}px">
        <line x1="${pad}" y1="${H / 2}" x2="${W - pad}" y2="${H / 2}" class="nl-axis"></line>
        ${ticks}${hops}${dots}
      </svg></div>`;
  }

  function areaModel(cfg) {
    const rows = cfg.rows || 3, cols = cfg.cols || 4;
    const cell = 34, W = cols * cell + 4, H = rows * cell + 4;
    let cells = "";
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      cells += `<rect x="${c * cell + 2}" y="${r * cell + 2}" width="${cell - 3}" height="${cell - 3}" rx="4" class="am-cell"></rect>`;
    }
    return `<div class="module" data-mod="areaModel">
      <div class="module-title">Area model — count a row, then count the rows</div>
      <svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px">${cells}</svg>
      <div class="module-readout">${cols} per row × ${rows} rows = <strong>${rows * cols}</strong></div>
    </div>`;
  }

  function render(cfg) {
    if (!cfg) return "";
    if (cfg.type === "fractionBar") return fractionBar(cfg);
    if (cfg.type === "numberLine") return numberLine(cfg);
    if (cfg.type === "areaModel") return areaModel(cfg);
    return "";
  }

  /* light interactivity: fraction-bar cells toggle shading */
  function wire(root) {
    root.querySelectorAll('[data-mod="fractionBar"]').forEach((mod) => {
      const parts = +mod.dataset.parts;
      mod.querySelectorAll(".fb-cell").forEach((cell) => {
        cell.addEventListener("click", () => {
          cell.classList.toggle("fb-shaded");
          const n = mod.querySelectorAll(".fb-shaded").length;
          mod.querySelector(".fb-readout").textContent = `${n}/${parts}`;
        });
      });
    });
  }

  return { render, wire };
})();
