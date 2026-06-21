/* ============================================================
   Basketball — "Hardwood" — Components  [SUBJECT: hoops]
   Reusable primitives for the teaching-first lesson/quiz UI,
   real-photo cards with graceful SVG fallback, and the bold
   "Hardwood" SVG art library (court, hoop, trophy, jersey,
   banners, flags). Built to read for a 14-year-old: sleek,
   sports-broadcast, ESPN-grade. Everything renders inside
   .hoops-scope so styles never bleed into Math or World.

   Beat types (rendered by renderBeat):
     lead | p | fact | quote | photo | statline | tradingcard |
     banner | split | order | compare
   Quiz q: { q, type:'mc'|'tf'|'order'|'image', options:[], answer:idx, explain, hint? }
   ============================================================ */

window.HOOPS = window.HOOPS || {};

HOOPS.UI = (function () {
  /* ---------- tiny DOM helper ---------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on" && typeof attrs[k] === "function") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
      if (c == null) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function nodeFromHTML(html) { var d = el("div"); d.innerHTML = html; return d.firstChild; }

  /* Floating layers (toast/confetti/modal) live INSIDE the scope so they inherit
     the Hardwood design system and can never leak into another subject. */
  function root() { return document.querySelector(".hoops-scope") || document.body; }

  var toastTimer;
  function toast(msg, emoji) {
    var t = root().querySelector(".hoops-toast");
    if (!t) { t = el("div", { class: "hoops-toast" }); root().appendChild(t); }
    t.innerHTML = (emoji ? "<span class='te'>" + emoji + "</span>" : "") + "<span>" + msg + "</span>";
    requestAnimationFrame(function () { t.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }

  function confetti(n) {
    n = n || 110;
    var box = el("div", { class: "hoops-confetti" });
    var colors = ["#ff7a18", "#ffb347", "#f5f5f5", "#1d9bf0", "#ffd23f", "#e23636"];
    for (var i = 0; i < n; i++) {
      var p = el("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (2 + Math.random() * 2) + "s";
      p.style.animationDelay = (Math.random() * .6) + "s";
      p.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      if (Math.random() > .5) p.style.borderRadius = "50%";
      box.appendChild(p);
    }
    root().appendChild(box);
    setTimeout(function () { box.remove(); }, 4600);
  }

  function modal(contentNode) {
    var back = el("div", { class: "hoops-modal-back", onclick: function (e) { if (e.target === back) close(); } });
    var box = el("div", { class: "hoops-modal", role: "dialog", "aria-modal": "true" });
    var x = el("button", { class: "iconbtn m-close", "aria-label": "Close", text: "✕", onclick: close });
    box.appendChild(x); box.appendChild(contentNode);
    back.appendChild(box); root().appendChild(back);
    function esc(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", esc);
    function close() { back.remove(); document.removeEventListener("keydown", esc); }
    return { close: close };
  }

  /* ============================================================
     GLOSSARY — tap/hover reveal for basketball terms a kid may
     not know. Runs over rendered text automatically.
     ============================================================ */
  var GLOSS = {
    NBA:  { full: "National Basketball Association", def: "the top men's pro basketball league in the world", ex: "The NBA was founded in 1946." },
    WNBA: { full: "Women's National Basketball Association", def: "the top women's pro basketball league in the U.S.", ex: "The WNBA tipped off its first season in 1997." },
    NCAA: { full: "National Collegiate Athletic Association", def: "the organization for U.S. college sports", ex: "March Madness is the NCAA college basketball tournament." },
    ABA:  { full: "American Basketball Association (1967–1976)", def: "a bold rival league that brought the three-point line and the slam-dunk contest before merging into the NBA", ex: "Dr. J starred in the ABA before the merger." },
    MVP:  { full: "Most Valuable Player", def: "the award for the best, most important player", ex: "Stephen Curry has won the MVP award twice." },
    GOAT: { full: "Greatest Of All Time", def: "a nickname fans give to the very best ever — and they love to argue about who it is", ex: "Jordan or LeBron? The GOAT debate never ends." },
    YMCA: { full: "Young Men's Christian Association", def: "a community center; basketball was invented inside one in 1891", ex: "Naismith taught at a YMCA school in Massachusetts." },
  };
  var GLOSS_PATTERN = "\\b(WNBA|NCAA|NBA|ABA|MVP|GOAT|YMCA)\\b";

  function ensureGlossCSS() {
    if (document.getElementById("hoops-gloss-style")) return;
    var s = document.createElement("style");
    s.id = "hoops-gloss-style";
    s.textContent =
      ".hoops-scope .gloss{border-bottom:1.5px dotted var(--accent);cursor:help;position:relative;font-weight:700;}" +
      ".hoops-scope .gloss:focus{outline:2px solid var(--accent);outline-offset:2px;border-radius:3px;}" +
      ".hoops-scope .gloss .gloss-pop{visibility:hidden;opacity:0;position:absolute;left:50%;bottom:150%;transform:translateX(-50%) translateY(6px);width:min(280px,78vw);background:#0c1418;color:#f3f5f7;padding:11px 14px;border:1px solid var(--line);border-radius:12px;font-size:.85rem;font-weight:400;line-height:1.5;box-shadow:0 18px 40px rgba(0,0,0,.55);z-index:200;transition:opacity .15s,transform .15s;pointer-events:none;text-align:left;white-space:normal;}" +
      ".hoops-scope .gloss .gloss-pop b{color:var(--accent);}" +
      ".hoops-scope .gloss .gloss-pop em{opacity:.7;font-style:italic;}" +
      ".hoops-scope .gloss:hover .gloss-pop,.hoops-scope .gloss:focus .gloss-pop,.hoops-scope .gloss:focus-within .gloss-pop{visibility:visible;opacity:1;transform:translateX(-50%) translateY(0);}" +
      ".hoops-scope .gloss .gloss-pop:after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#0c1418;}";
    document.head.appendChild(s);
  }
  function makeGloss(term) {
    var g = GLOSS[term];
    var span = el("span", { class: "gloss", tabindex: "0", role: "note",
      "aria-label": term + " means " + g.full + ". " + g.def + ". Example: " + g.ex });
    span.appendChild(document.createTextNode(term));
    var pop = el("span", { class: "gloss-pop" });
    pop.innerHTML = "<b>" + term + "</b> — " + g.full + ". " + g.def + ".<br><em>e.g.</em> " + g.ex;
    span.appendChild(pop);
    return span;
  }
  function glossify(rootNode) {
    if (!rootNode || typeof document.createTreeWalker !== "function") return;
    ensureGlossCSS();
    var testRe = new RegExp(GLOSS_PATTERN);
    var walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !testRe.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        while (p && p !== rootNode) {
          var t = p.nodeName;
          if (t === "BUTTON" || t === "A" || t === "CODE" || t === "PRE" || t === "SCRIPT" || t === "STYLE" || t === "svg" ||
              (p.classList && (p.classList.contains("gloss") ||
                p.classList.contains("statline") || p.classList.contains("trading-card") || p.classList.contains("card-row"))))
            return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var nodes = [], cur;
    while ((cur = walker.nextNode())) nodes.push(cur);
    nodes.forEach(function (node) {
      var text = node.nodeValue, re = new RegExp(GLOSS_PATTERN, "g"), frag = document.createDocumentFragment(), last = 0, m;
      while ((m = re.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        frag.appendChild(makeGloss(m[0]));
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      if (node.parentNode) node.parentNode.replaceChild(frag, node);
    });
  }

  /* ============================================================
     HARDWOOD SVG ART — bold, reliable, always-renders.
     Used as decorative theme art AND as the graceful fallback
     whenever a real photo can't load. currentColor + orange.
     ============================================================ */
  function svg(vb, inner, cls) {
    return '<svg viewBox="' + vb + '" class="' + (cls || "") + '" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice">' + inner + '</svg>';
  }
  var woodDefs =
    '<defs>' +
    '<linearGradient id="hw-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2614"/><stop offset="1" stop-color="#23170c"/></linearGradient>' +
    '<linearGradient id="hw-ball" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a2a"/><stop offset="1" stop-color="#d4631a"/></linearGradient>' +
    '<linearGradient id="hw-spot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#13202a"/><stop offset="1" stop-color="#0a1116"/></linearGradient>' +
    '</defs>';
  // a basketball
  function ballSVG(cx, cy, r) {
    return '<g><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#hw-ball)" stroke="#1c1208" stroke-width="' + (r * .06) + '"/>' +
      '<path d="M' + (cx - r) + ',' + cy + ' h' + (2 * r) + '" stroke="#1c1208" stroke-width="' + (r * .05) + '" fill="none"/>' +
      '<path d="M' + cx + ',' + (cy - r) + ' v' + (2 * r) + '" stroke="#1c1208" stroke-width="' + (r * .05) + '" fill="none"/>' +
      '<path d="M' + (cx - r) + ',' + cy + ' q' + r + ',' + (-r * 1.15) + ' ' + (2 * r) + ',0" stroke="#1c1208" stroke-width="' + (r * .05) + '" fill="none"/>' +
      '<path d="M' + (cx - r) + ',' + cy + ' q' + r + ',' + (r * 1.15) + ' ' + (2 * r) + ',0" stroke="#1c1208" stroke-width="' + (r * .05) + '" fill="none"/></g>';
  }
  var ART = {
    court: svg("0 0 400 220", woodDefs +
      '<rect width="400" height="220" fill="url(#hw-wood)"/>' +
      '<g opacity=".18" stroke="#caa46a" stroke-width="2">' +
      [30, 70, 110, 150, 190, 230, 270, 310, 350].map(function (y) { return '<line x1="' + y + '" y1="0" x2="' + y + '" y2="220"/>'; }).join("") + '</g>' +
      '<g fill="none" stroke="#ff7a18" stroke-width="3" opacity=".9">' +
      '<line x1="0" y1="110" x2="400" y2="110"/><circle cx="200" cy="110" r="34"/>' +
      '<rect x="0" y="74" width="58" height="72"/><rect x="342" y="74" width="58" height="72"/>' +
      '<path d="M58,74 a36,36 0 0 1 0,72"/><path d="M342,74 a36,36 0 0 0 0,72"/></g>'),
    hoop: svg("0 0 400 220",
      '<rect width="400" height="220" fill="url(#hw-spot)"/>' +
      '<rect x="150" y="30" width="100" height="70" rx="4" fill="#0e171e" stroke="#e9eef2" stroke-width="3"/>' +
      '<rect x="178" y="56" width="44" height="32" fill="none" stroke="#ff7a18" stroke-width="3"/>' +
      '<line x1="160" y1="100" x2="240" y2="100" stroke="#ff7a18" stroke-width="5"/>' +
      '<path d="M163,102 l8,28 h58 l8,-28" fill="none" stroke="#e9eef2" stroke-width="1.5" opacity=".8"/>' +
      '<g stroke="#e9eef2" stroke-width="1" opacity=".55">' + [175, 188, 200, 212, 225].map(function (x) { return '<line x1="' + x + '" y1="102" x2="' + (x * .15 + 175) + '" y2="130"/>'; }).join("") + '</g>' +
      ballSVG(300, 165, 26)),
    ball: svg("0 0 220 220", woodDefs + '<rect width="220" height="220" fill="url(#hw-spot)"/>' + ballSVG(110, 110, 78)),
    trophy: svg("0 0 220 220",
      '<rect width="220" height="220" fill="url(#hw-spot)"/>' +
      '<defs><linearGradient id="hw-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe28a"/><stop offset="1" stop-color="#caa12e"/></linearGradient></defs>' +
      '<path d="M70,52 h80 v22 a40,40 0 0 1 -80,0 Z" fill="url(#hw-gold)"/>' +
      '<path d="M70,58 h-20 a16,16 0 0 0 18,26" fill="none" stroke="#caa12e" stroke-width="6"/>' +
      '<path d="M150,58 h20 a16,16 0 0 1 -18,26" fill="none" stroke="#caa12e" stroke-width="6"/>' +
      '<rect x="100" y="112" width="20" height="26" fill="#caa12e"/><rect x="78" y="138" width="64" height="14" rx="3" fill="url(#hw-gold)"/>' +
      '<rect x="86" y="152" width="48" height="18" rx="3" fill="#caa12e"/>' +
      '<text x="110" y="40" text-anchor="middle" font-size="22">🏆</text>'),
    jersey: svg("0 0 220 220",
      '<rect width="220" height="220" fill="url(#hw-spot)"/>' +
      '<path d="M70,52 l24,-12 q16,12 32,0 l24,12 l18,22 -22,18 -8,-8 v76 h-86 v-76 l-8,8 -22,-18 Z" fill="#ff7a18" stroke="#0a1116" stroke-width="3"/>' +
      '<text x="110" y="150" text-anchor="middle" font-size="58" font-weight="900" fill="#0a1116" font-family="Arial">23</text>'),
    banner: svg("0 0 220 220",
      '<rect width="220" height="220" fill="url(#hw-spot)"/>' +
      '<path d="M80,30 h60 v120 l-30,-22 -30,22 Z" fill="#1d3a5f" stroke="#caa12e" stroke-width="3"/>' +
      '<text x="110" y="80" text-anchor="middle" font-size="20" fill="#ffe28a" font-weight="900">NBA</text>' +
      '<text x="110" y="108" text-anchor="middle" font-size="13" fill="#e9eef2">CHAMPS</text>'),
    whistle: svg("0 0 400 220",
      '<rect width="400" height="220" fill="url(#hw-spot)"/>' +
      '<circle cx="200" cy="110" r="46" fill="#caa12e"/><rect x="200" y="86" width="60" height="34" rx="6" fill="#caa12e"/>' +
      '<circle cx="200" cy="110" r="14" fill="#0a1116"/>' +
      '<path d="M120,90 q80,-40 160,-10" fill="none" stroke="#ff7a18" stroke-width="4" stroke-dasharray="2 8"/>'),
    star: svg("0 0 400 220",
      '<rect width="400" height="220" fill="#0a1116"/>' +
      '<polygon points="200,50 222,110 286,110 234,148 254,210 200,172 146,210 166,148 114,110 178,110" fill="#ff7a18"/>'),
    globe: svg("0 0 220 220",
      '<rect width="220" height="220" fill="url(#hw-spot)"/>' +
      '<circle cx="110" cy="110" r="70" fill="#16384a"/>' +
      '<path d="M55,90 q30,-14 60,0 t40,12 q-16,22 -46,16 t-52,-26z" fill="#2f7d54"/>' +
      '<path d="M70,140 q24,12 56,4 q-8,18 -40,18 t-16,-22z" fill="#2f7d54"/>' +
      ballSVG(170, 60, 18)),
  };
  function art(key) { return ART[key] || ART.court; }

  /* ---- California "Bear Flag" (clean original SVG, always renders) ---- */
  function bearFlag() {
    return svg("0 0 300 200",
      '<rect width="300" height="200" fill="#f3efe6"/>' +
      '<rect y="170" width="300" height="30" fill="#bb2533"/>' +
      '<polygon points="36,40 44,52 58,52 47,61 51,75 36,67 21,75 25,61 14,52 28,52" fill="#bb2533"/>' +
      '<g transform="translate(96,70)"><path d="M0,44 q6,-20 30,-26 q10,-12 22,-10 q-4,6 0,10 q22,4 34,22 q14,2 20,12 l-2,6 -8,-2 -2,6 -8,-2 -120,0 z" fill="#7a5230"/>' +
      '<circle cx="22" cy="22" r="2.5" fill="#3a2a18"/></g>' +
      '<text x="150" y="158" text-anchor="middle" font-size="16" letter-spacing="3" fill="#3a2a18" font-weight="700">CALIFORNIA REPUBLIC</text>');
  }

  /* ---- Team color banner (bold "flag in the rafters") ---- */
  function teamBanner(c1, c2, label, sub) {
    return svg("0 0 260 150",
      '<path d="M40,12 h180 v110 l-90,-26 -90,26 Z" fill="' + c1 + '" stroke="' + c2 + '" stroke-width="4"/>' +
      '<text x="130" y="60" text-anchor="middle" font-size="22" font-weight="900" fill="' + c2 + '">' + label + '</text>' +
      '<text x="130" y="88" text-anchor="middle" font-size="12" fill="#ffffff" opacity=".95">' + (sub || "") + '</text>', "tb");
  }

  /* ============================================================
     REAL PHOTO with graceful fallback.
     Sources from Wikimedia Commons via the stable Special:FilePath
     redirect, scaled + lazy-loaded so the page stays agile. If the
     image can't load, it degrades to a bold Hardwood SVG — never a
     broken-image box. Every photo carries a caption + credit.
     ============================================================ */
  var COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";
  function photoSrc(file, w) { return COMMONS + encodeURIComponent(file) + "?width=" + (w || 800); }

  function photo(spec) {
    // spec: { file, alt, caption, credit, fallback:'court', tall, contain }
    var fig = el("figure", { class: "hw-photo" + (spec.tall ? " tall" : "") });
    var frame = el("div", { class: "hw-frame" });
    if (spec.file) {
      var img = el("img", { loading: "lazy", decoding: "async", alt: spec.alt || spec.caption || "",
        src: photoSrc(spec.file, spec.w || 900), class: spec.contain ? "contain" : "" });
      img.addEventListener("error", function () {
        if (frame.querySelector(".hw-fallback")) return;
        var fb = el("div", { class: "hw-fallback", html: art(spec.fallback || "court") });
        frame.innerHTML = ""; frame.appendChild(fb);
        if (spec.fallbackNote) frame.appendChild(el("div", { class: "fb-note", text: spec.fallbackNote }));
      });
      frame.appendChild(img);
    } else {
      frame.appendChild(el("div", { class: "hw-fallback", html: art(spec.fallback || "court") }));
    }
    fig.appendChild(frame);
    if (spec.caption || spec.credit) {
      var cap = el("figcaption", {});
      if (spec.caption) cap.appendChild(el("span", { class: "cap", html: spec.caption }));
      if (spec.credit) cap.appendChild(el("span", { class: "cred", html: " " + spec.credit }));
      fig.appendChild(cap);
    }
    return fig;
  }

  /* ============================================================
     STAT LINE — scoreboard / box-score motif
     ============================================================ */
  function statline(spec) {
    var box = el("div", { class: "statline" });
    if (spec.title) box.appendChild(el("div", { class: "sl-title", html: spec.title }));
    var row = el("div", { class: "sl-row" });
    (spec.stats || []).forEach(function (s) {
      row.appendChild(el("div", { class: "sl-cell" }, [
        el("div", { class: "sl-big", html: s.v }),
        el("div", { class: "sl-lbl", html: s.k }),
      ]));
    });
    box.appendChild(row);
    if (spec.note) box.appendChild(el("div", { class: "sl-note", html: spec.note }));
    return box;
  }

  /* ============================================================
     TRADING CARD — a sleek player card (photo + jersey number +
     stat strip). Falls back to a jersey SVG if the photo fails.
     ============================================================ */
  function tradingCard(spec) {
    var card = el("div", { class: "trading-card" });
    var top = el("div", { class: "tc-top" });
    if (spec.number != null) top.appendChild(el("div", { class: "tc-num", text: "#" + spec.number }));
    if (spec.team) top.appendChild(el("div", { class: "tc-team", text: spec.team }));
    card.appendChild(top);
    card.appendChild(photo({ file: spec.file, alt: spec.name, fallback: "jersey", tall: true,
      credit: spec.credit }));
    card.appendChild(el("div", { class: "tc-name", html: spec.name }));
    if (spec.role) card.appendChild(el("div", { class: "tc-role", html: spec.role }));
    if (spec.stats) {
      var strip = el("div", { class: "tc-strip" });
      spec.stats.forEach(function (s) {
        strip.appendChild(el("div", {}, [el("b", { html: s.v }), el("span", { html: s.k })]));
      });
      card.appendChild(strip);
    }
    return card;
  }

  /* ---------- beat renderer ---------- */
  function renderBeat(b) {
    switch (b.t) {
      case "lead":   return el("div", { class: "beat lead" }, el("p", { html: b.html }));
      case "p":      return el("div", { class: "beat" }, el("p", { html: b.html }));
      case "fact":   return el("div", { class: "beat" }, el("div", { class: "fact" }, [el("span", { class: "bulb", text: "🔥" }), el("div", {}, [el("b", { text: b.label || "Did you know?" }), el("span", { html: " " + b.html })])]));
      case "quote":  return el("div", { class: "beat" }, el("blockquote", { class: "hw-quote" }, [el("p", { html: "“" + b.html + "”" }), b.who ? el("cite", { html: "— " + b.who }) : null]));
      case "photo":  return wrapBeat(photo(b));
      case "statline": return wrapBeat(statline(b));
      case "tradingcard": return wrapBeat(tradingCard(b));
      case "cards":  return wrapBeat(cardRow(b));
      case "banner": return el("div", { class: "beat" }, el("div", { class: "hw-banner-beat", html: b.html }));
      case "split":  return wrapBeat(buildSplit(b));
      case "order":  return wrapBeat(buildOrder(b));
      case "compare":return wrapBeat(buildCompare(b));
      default:       return el("div", { class: "beat" }, el("p", { html: b.html || "" }));
    }
  }
  function wrapBeat(node) { var w = el("div", { class: "beat" }); w.appendChild(node); return w; }

  /* a row of small trading cards / banners */
  function cardRow(spec) {
    var grid = el("div", { class: "card-row" });
    (spec.cards || []).forEach(function (c) { grid.appendChild(tradingCard(c)); });
    return grid;
  }

  /* "split screen" — two columns side by side (e.g. then vs now, A vs B) */
  function buildSplit(spec) {
    var box = el("div", { class: "hw-split" });
    [["a", spec.a], ["b", spec.b]].forEach(function (pair) {
      var col = el("div", { class: "split-col " + pair[0] });
      col.appendChild(el("div", { class: "split-h", html: pair[1].title }));
      col.appendChild(el("div", { class: "split-body", html: pair[1].body }));
      box.appendChild(col);
    });
    return box;
  }

  function buildCompare(spec) {
    var box = el("div", { class: "ix-card" });
    box.appendChild(el("div", { class: "ix-head" }, [el("span", { class: "chip", text: "Compare" }), el("h4", { text: spec.title || "Two sides" })]));
    var grid = el("div", { class: "compare" });
    [["a", spec.a], ["b", spec.b]].forEach(function (pair) {
      var col = el("div", { class: "col " + pair[0] });
      col.appendChild(el("h5", { html: pair[1].title }));
      col.appendChild(el("ul", {}, pair[1].items.map(function (t) { return el("li", { html: t }); })));
      grid.appendChild(col);
    });
    box.appendChild(grid);
    return box;
  }

  // Order-the-timeline (drag on desktop, up/down buttons everywhere)
  function buildOrder(spec) {
    var correct = spec.items;
    var order = shuffle(correct);
    while (order.length > 1 && order.every(function (it, i) { return it === correct[i]; })) order = shuffle(correct);
    var box = el("div", { class: "ix-card" });
    box.appendChild(el("div", { class: "ix-head" }, [el("span", { class: "chip", text: "Line it up" }), el("h4", { text: spec.title || "Put these in order" })]));
    box.appendChild(el("div", { class: "ix-sub", text: spec.sub || "Drag, or use the arrows, to arrange these from earliest to latest." }));
    var list = el("div", { class: "order-list" });
    var dragEl = null;
    function rowFor(item) {
      var r = el("div", { class: "order-item", draggable: "true" });
      r._item = item;
      var ctrls = el("span", { class: "ord-ctrls" }, [
        el("button", { class: "iconbtn sm", "aria-label": "Move up", text: "▲", onclick: function () { move(r, -1); } }),
        el("button", { class: "iconbtn sm", "aria-label": "Move down", text: "▼", onclick: function () { move(r, 1); } }),
      ]);
      r.appendChild(el("span", { class: "grip", text: "⠿" }));
      r.appendChild(el("span", { class: "yr", text: item.yr }));
      r.appendChild(el("span", { class: "olbl", text: item.label }));
      r.appendChild(ctrls);
      r.addEventListener("dragstart", function () { dragEl = r; r.classList.add("dragging"); });
      r.addEventListener("dragend", function () { r.classList.remove("dragging"); dragEl = null; clearOver(); });
      r.addEventListener("dragover", function (e) { e.preventDefault(); clearOver(); r.classList.add("over"); });
      r.addEventListener("drop", function (e) { e.preventDefault(); if (dragEl && dragEl !== r) list.insertBefore(dragEl, r); clearOver(); });
      return r;
    }
    function clearOver() { Array.prototype.forEach.call(list.children, function (c) { c.classList.remove("over"); }); }
    function move(r, dir) {
      var i = Array.prototype.indexOf.call(list.children, r), j = i + dir;
      if (j < 0 || j >= list.children.length) return;
      if (dir < 0) list.insertBefore(r, list.children[j]); else list.insertBefore(list.children[j], r);
    }
    order.forEach(function (it) { list.appendChild(rowFor(it)); });
    box.appendChild(list);
    var result = el("span", { class: "order-result" });
    var check = el("button", { class: "btn ghost", text: "Check order", onclick: function () {
      var rows = Array.prototype.slice.call(list.children), ok = true;
      rows.forEach(function (r, i) {
        r.classList.remove("correct", "wrong");
        if (r._item === correct[i]) r.classList.add("correct"); else { r.classList.add("wrong"); ok = false; }
      });
      result.textContent = ok ? "Swish — perfect order! 🏀" : "Close — green rows are in the right spot. Run it back!";
      result.style.color = ok ? "var(--good)" : "var(--bad)";
      if (ok) confetti(40);
    }});
    box.appendChild(el("div", { class: "order-actions" }, [check, result]));
    return box;
  }

  /* reveal-on-scroll */
  function observeBeats(rootNode) {
    var beats = rootNode.querySelectorAll(".beat");
    if (!("IntersectionObserver" in window)) { beats.forEach(function (b) { b.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    beats.forEach(function (b) { io.observe(b); });
  }

  return {
    el: el, shuffle: shuffle, nodeFromHTML: nodeFromHTML,
    toast: toast, confetti: confetti, modal: modal, glossify: glossify,
    art: art, bearFlag: bearFlag, teamBanner: teamBanner,
    photo: photo, statline: statline, tradingCard: tradingCard,
    renderBeat: renderBeat, observeBeats: observeBeats,
  };
})();
