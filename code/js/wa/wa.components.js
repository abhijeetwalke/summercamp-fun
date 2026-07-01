/* ============================================================
   World Awareness — Components  [SUBJECT: world]
   Reusable "explorable explanation" primitives + SVG art.
   Every lesson is content + config; no per-lesson code.
   ============================================================ */

window.WA = window.WA || {};

WA.UI = (function () {
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

  /* ---------- toast ---------- */
  /* WA renders inside a .wa-scope container so its styles never bleed into the
     Math app. Floating layers (toast/confetti/modal) must live INSIDE that scope
     to inherit the scoped CSS, so we append to the scope root, not document.body. */
  function root() { return document.querySelector(".wa-scope") || document.body; }

  var toastTimer;
  function toast(msg, emoji) {
    var t = root().querySelector(".wa-toast");
    if (!t) { t = el("div", { class: "wa-toast" }); root().appendChild(t); }
    t.innerHTML = (emoji ? "<span>" + emoji + "</span>" : "") + "<span>" + msg + "</span>";
    requestAnimationFrame(function () { t.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ---------- confetti ---------- */
  function confetti(n) {
    n = n || 90;
    var box = el("div", { class: "wa-confetti" });
    var colors = ["#c79a3a", "#2e8b8b", "#3a6ea5", "#b23a48", "#2e7d54", "#d68910"];
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

  /* ---------- modal ---------- */
  function modal(contentNode) {
    var back = el("div", { class: "wa-modal-back", onclick: function (e) { if (e.target === back) close(); } });
    var box = el("div", { class: "wa-modal", role: "dialog", "aria-modal": "true" });
    var x = el("button", { class: "iconbtn m-close", "aria-label": "Close", text: "✕", onclick: close });
    box.appendChild(x); box.appendChild(contentNode);
    back.appendChild(box); root().appendChild(back);
    function esc(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", esc);
    function close() { back.remove(); document.removeEventListener("keydown", esc); }
    return { close: close };
  }

  /* ============================================================
     GLOSSARY — hover/tap reveal for terms a kid may not know.
     Runs over rendered text automatically (all lessons, quizzes,
     cards). Each term: what it stands for, a kid-friendly meaning,
     and an example. Accessible (keyboard focus + aria) and touch-
     friendly (tap focuses the term → tooltip shows).
     ============================================================ */
  var GLOSS = {
    BC:   { full: "Before Christ", def: "years counted backwards before year 1 — the bigger the number, the longer ago", ex: "Rome was founded around 753 BC, over 2,700 years ago." },
    AD:   { full: "Anno Domini (Latin for “in the year of our Lord”)", def: "years counted forward from year 1 — the system most of the world uses today", ex: "The Western Roman Empire fell in 476 AD." },
    BCE:  { full: "Before Common Era", def: "exactly the same as BC — just a name that doesn't mention religion", ex: "500 BCE means the same year as 500 BC." },
    CE:   { full: "Common Era", def: "exactly the same as AD", ex: "1492 CE means the same year as 1492 AD." },
    WWI:  { full: "World War I (1914–1918)", def: "the first war that pulled in much of the world", ex: "WWI began after an archduke was assassinated in 1914." },
    WWII: { full: "World War II (1939–1945)", def: "the deadliest war in history", ex: "WWII ended in 1945." },
    USSR: { full: "the Soviet Union (1922–1991)", def: "a huge communist country led by Russia; the USA's rival in the Cold War", ex: "The USSR launched the first satellite, Sputnik." },
    UN:   { full: "the United Nations", def: "an organization founded in 1945 where countries meet to try to keep peace", ex: "Almost every country in the world belongs to the UN." },
    UAE:  { full: "the United Arab Emirates", def: "a country in the Middle East, home to the city of Dubai", ex: "The UAE sent a probe to Mars in 2021." },
  };
  // longest-first so "WWII" wins over "WWI", "BCE" over "BC"
  var GLOSS_PATTERN = "\\b(WWII|WWI|USSR|BCE|UAE|BC|AD|CE|UN)\\b";

  function ensureGlossCSS() {
    if (document.getElementById("wa-gloss-style")) return;
    var s = document.createElement("style");
    s.id = "wa-gloss-style";
    s.textContent =
      ".wa-scope .gloss{border-bottom:1.5px dotted var(--gold-deep);cursor:help;position:relative;font-weight:600;}" +
      ".wa-scope .gloss:focus{outline:2px solid var(--gold);outline-offset:2px;border-radius:3px;}" +
      ".wa-scope .gloss .gloss-pop{visibility:hidden;opacity:0;position:absolute;left:50%;bottom:140%;transform:translateX(-50%) translateY(6px);width:min(280px,78vw);background:var(--ink);color:var(--paper);padding:10px 13px;border-radius:10px;font-size:.85rem;font-weight:400;line-height:1.45;box-shadow:var(--shadow-lg);z-index:200;transition:opacity .15s,transform .15s;pointer-events:none;text-align:left;white-space:normal;}" +
      ".wa-scope .gloss .gloss-pop b{color:var(--gold);}" +
      ".wa-scope .gloss .gloss-pop em{color:var(--paper);opacity:.75;font-style:italic;}" +
      ".wa-scope .gloss:hover .gloss-pop,.wa-scope .gloss:focus .gloss-pop,.wa-scope .gloss:focus-within .gloss-pop{visibility:visible;opacity:1;transform:translateX(-50%) translateY(0);}" +
      ".wa-scope .gloss .gloss-pop:after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:var(--ink);}";
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

  function glossify(root) {
    if (!root || typeof document.createTreeWalker !== "function") return;
    ensureGlossCSS();
    var testRe = new RegExp(GLOSS_PATTERN);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !testRe.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        while (p && p !== root) {
          var t = p.nodeName;
          if (t === "BUTTON" || t === "A" || t === "CODE" || t === "PRE" || t === "SCRIPT" || t === "STYLE" || t === "svg" ||
              (p.classList && p.classList.contains("gloss"))) return NodeFilter.FILTER_REJECT;
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
     SVG ART — a curated, reusable scene library.
     Drawn with currentColor + an accent so they theme nicely.
     ============================================================ */
  function svg(vb, inner, cls) {
    return '<svg viewBox="' + vb + '" class="' + (cls || "") + '" xmlns="http://www.w3.org/2000/svg" role="img">' + inner + '</svg>';
  }
  var sky = '<defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0ec"/><stop offset="1" stop-color="#e9dcc0"/></linearGradient></defs>';

  var ART = {
    columns: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<polygon points="40,40 360,40 340,58 60,58" fill="#caa044"/>' +
      '<polygon points="60,58 340,58 330,68 70,68" fill="#b8902f"/>' +
      [70,120,170,220,270,320].map(function(x){return '<rect x="'+x+'" y="68" width="22" height="100" fill="#e8e0cd"/><rect x="'+x+'" y="68" width="22" height="100" fill="none" stroke="#cbbfa3"/>';}).join("") +
      '<rect x="56" y="168" width="290" height="14" fill="#caa044"/><rect x="48" y="182" width="306" height="10" fill="#b8902f"/>'),
    colosseum: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<ellipse cx="200" cy="150" rx="150" ry="46" fill="#cdbfa3"/>' +
      '<path d="M70,150 A150,55 0 0 1 330,150 L330,150 L70,150 Z" fill="#e0d6bf"/>' +
      [0,1,2,3].map(function(r){var y=70+r*20;return [80,120,160,200,240,280,320].map(function(x){return '<rect x="'+x+'" y="'+y+'" width="12" height="14" rx="6" fill="#a98b52"/>';}).join("");}).join("") +
      '<ellipse cx="200" cy="150" rx="150" ry="46" fill="none" stroke="#a98b52" stroke-width="3"/>'),
    castle: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="120" y="80" width="160" height="100" fill="#9aa3ad"/>' +
      '<rect x="90" y="60" width="40" height="120" fill="#828b95"/><rect x="270" y="60" width="40" height="120" fill="#828b95"/>' +
      '<g fill="#6f7882">'+[90,100,110,120,270,280,290,300].map(function(x){return '<rect x="'+x+'" y="50" width="8" height="12"/>';}).join("")+'</g>' +
      '<rect x="185" y="120" width="30" height="60" fill="#5a4632"/><circle cx="200" cy="120" r="15" fill="#5a4632"/>' +
      '<polygon points="110,60 130,30 150,60" fill="#b23a48"/><polygon points="290,60 270,30 250,60" fill="#b23a48"/>'),
    factory: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="60" y="110" width="200" height="70" fill="#7a6a55"/>' +
      '<g fill="#5e5142"><rect x="100" y="60" width="22" height="120"/><rect x="160" y="50" width="22" height="130"/></g>' +
      '<g fill="#cfcabf" opacity=".85"><circle cx="111" cy="48" r="16"/><circle cx="130" cy="34" r="20"/><circle cx="171" cy="40" r="18"/><circle cx="195" cy="26" r="22"/></g>' +
      '<g fill="#3a4255">'+[80,120,160,200,240].map(function(x){return '<rect x="'+x+'" y="130" width="16" height="20"/>';}).join("")+'</g>'),
    trench: svg("0 0 400 200",
      '<rect width="400" height="200" fill="#8d7d5e"/>' +
      '<path d="M0,120 L120,120 L140,150 L260,150 L280,120 L400,120 L400,200 L0,200 Z" fill="#5e5238"/>' +
      '<g stroke="#3f3724" stroke-width="3">'+[20,60,100,300,340,380].map(function(x){return '<line x1="'+x+'" y1="120" x2="'+x+'" y2="100"/>';}).join("")+'</g>' +
      '<g stroke="#cbbf9e" stroke-width="1.5" opacity=".7">'+[30,70,310,350].map(function(x){return '<line x1="'+(x-8)+'" y1="96" x2="'+(x+8)+'" y2="104"/><line x1="'+(x-8)+'" y1="104" x2="'+(x+8)+'" y2="96"/>';}).join("")+'</g>' +
      '<rect width="400" height="40" fill="#9a8a68"/>'),
    wall: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="90" width="180" height="90" fill="#9aa3ad"/><rect x="220" y="90" width="180" height="90" fill="#9aa3ad"/>' +
      '<g fill="#7c858f">'+[10,40,70,100,130,160,230,260,290,320,350,380].map(function(x){return '<rect x="'+x+'" y="78" width="18" height="14"/>';}).join("")+'</g>' +
      '<text x="200" y="150" font-size="40" text-anchor="middle">🕊️</text>'),
    greatwall: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<polygon points="0,180 80,100 140,150 220,80 300,140 400,90 400,200 0,200" fill="#8a9a6b"/>' +
      '<path d="M0,180 L80,120 L140,160 L220,100 L300,150 L400,110" fill="none" stroke="#7a6a55" stroke-width="14"/>' +
      '<g fill="#5e5142">'+[80,220].map(function(x){var y = x===80?112:92;return '<rect x="'+(x-12)+'" y="'+y+'" width="24" height="26"/>';}).join("")+'</g>'),
    torii: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="170" width="400" height="30" fill="#3a6ea5" opacity=".5"/>' +
      '<rect x="120" y="70" width="160" height="14" fill="#b23a48"/><rect x="110" y="54" width="180" height="12" fill="#b23a48"/>' +
      '<rect x="135" y="84" width="16" height="96" fill="#b23a48"/><rect x="249" y="84" width="16" height="96" fill="#b23a48"/>' +
      '<rect x="170" y="84" width="60" height="10" fill="#b23a48"/>'),
    taj: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="150" y="110" width="100" height="70" fill="#f3eee3"/>' +
      '<path d="M165,110 Q200,40 235,110 Z" fill="#f3eee3"/><circle cx="200" cy="56" r="8" fill="#caa044"/>' +
      '<rect x="120" y="120" width="14" height="60" fill="#eee7d8"/><rect x="266" y="120" width="14" height="60" fill="#eee7d8"/>' +
      '<rect x="190" y="150" width="20" height="30" fill="#caa044"/>'),
    pyramids: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="150" width="400" height="50" fill="#e3c878"/>' +
      '<polygon points="120,150 200,50 280,150" fill="#d4a84a"/><polygon points="200,150 200,50 280,150" fill="#b8902f"/>' +
      '<polygon points="40,150 95,80 150,150" fill="#d4a84a"/><polygon points="95,80 150,150 95,150" fill="#b8902f"/>' +
      '<circle cx="330" cy="60" r="22" fill="#e8b84a"/>'),
    ship: svg("0 0 400 200",
      '<rect width="400" height="200" fill="#bfe0ec"/>' +
      '<path d="M0,150 q100,18 200,0 t200,0 v50 H0 Z" fill="#2e6f9e"/>' +
      '<path d="M140,150 l120,0 l-18,30 l-84,0 Z" fill="#6b4a2b"/>' +
      '<rect x="198" y="60" width="6" height="90" fill="#4a3520"/>' +
      '<path d="M204,66 q60,20 0,70 Z" fill="#f3eee3"/><path d="M198,66 q-50,18 0,64 Z" fill="#e7dec9"/>' +
      '<path d="M204,60 l40,10 -40,10 Z" fill="#b23a48"/>'),
    scroll: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="90" y="50" width="220" height="110" rx="6" fill="#f3eadb" stroke="#cbbfa3"/>' +
      '<rect x="78" y="44" width="14" height="122" rx="7" fill="#caa044"/><rect x="308" y="44" width="14" height="122" rx="7" fill="#caa044"/>' +
      '<g stroke="#9c8e6e" stroke-width="3">'+[70,86,102,118,134].map(function(y){return '<line x1="108" y1="'+y+'" x2="292" y2="'+y+'"/>';}).join("")+'</g>'),
    oil: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="160" width="400" height="40" fill="#e3c878"/>' +
      '<polygon points="170,160 230,160 215,60 185,60" fill="none" stroke="#5e5142" stroke-width="6"/>' +
      '<line x1="185" y1="110" x2="215" y2="110" stroke="#5e5142" stroke-width="4"/>' +
      '<line x1="178" y1="135" x2="222" y2="135" stroke="#5e5142" stroke-width="4"/>' +
      '<rect x="190" y="40" width="20" height="24" fill="#3a4255"/><circle cx="200" cy="36" r="10" fill="#1c2230"/>'),
    boomerang: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="150" width="400" height="50" fill="#c97b3a"/>' +
      '<path d="M150,90 q40,-30 70,0 q-20,10 -35,35 q-15,-25 -35,-35 Z" fill="#7a4a23"/>' +
      '<circle cx="300" cy="60" r="20" fill="#e8b84a"/><g stroke="#caa044" stroke-width="3">'+[0,45,90,135].map(function(a){var r=a*Math.PI/180;return '<line x1="'+(300+Math.cos(r)*26)+'" y1="'+(60+Math.sin(r)*26)+'" x2="'+(300+Math.cos(r)*34)+'" y2="'+(60+Math.sin(r)*34)+'"/>';}).join("")+'</g>'),
    fasces: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<g fill="#9aa3ad">'+[170,182,194,206,218].map(function(x){return '<rect x="'+x+'" y="50" width="9" height="120"/>';}).join("")+'</g>' +
      '<g stroke="#5e5142" stroke-width="4" fill="none">'+[80,110,140].map(function(y){return '<line x1="166" y1="'+y+'" x2="232" y2="'+y+'"/>';}).join("")+'</g>'),
    star: svg("0 0 400 200",
      '<rect width="400" height="200" fill="#b23a48"/>' +
      '<polygon points="200,55 215,100 262,100 224,128 238,173 200,146 162,173 176,128 138,100 185,100" fill="#f3d35a"/>'),
    aztec: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<polygon points="120,170 280,170 250,120 150,120" fill="#caa044"/>' +
      '<polygon points="150,120 250,120 228,80 172,80" fill="#b8902f"/>' +
      '<polygon points="172,80 228,80 214,52 186,52" fill="#a8761f"/>' +
      '<g stroke="#7a5a18" stroke-width="3"><line x1="190" y1="170" x2="190" y2="52"/><line x1="210" y1="170" x2="210" y2="52"/></g>' +
      '<circle cx="330" cy="55" r="20" fill="#e8b84a"/>'),
    globe: svg("0 0 120 120",
      '<circle cx="60" cy="60" r="52" fill="#2e6f9e"/>' +
      '<path d="M30,45 q20,-10 40,0 t25,8 q-10,15 -30,10 t-35,-18z" fill="#4c7a3d"/>' +
      '<path d="M40,80 q15,8 35,2 q-5,12 -25,12 t-10,-14z" fill="#4c7a3d"/>' +
      '<ellipse cx="60" cy="60" rx="52" ry="52" fill="none" stroke="#fff" stroke-opacity=".25"/>' +
      '<ellipse cx="60" cy="60" rx="22" ry="52" fill="none" stroke="#fff" stroke-opacity=".18"/>' +
      '<line x1="8" y1="60" x2="112" y2="60" stroke="#fff" stroke-opacity=".18"/>'),
    island: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="150" width="400" height="50" fill="#2e9fc0"/>' +
      '<ellipse cx="200" cy="158" rx="132" ry="24" fill="#ece0b0"/>' +
      '<ellipse cx="200" cy="156" rx="70" ry="10" fill="#cdb478" opacity=".5"/>' +
      '<rect x="195" y="92" width="9" height="64" fill="#8a6334"/>' +
      '<g stroke="#3f9a52" stroke-width="7" fill="none" stroke-linecap="round">' +
        '<path d="M200,94 q-32,-6 -54,8"/><path d="M200,94 q32,-6 54,8"/>' +
        '<path d="M200,92 q-20,-24 -42,-26"/><path d="M200,92 q20,-24 42,-26"/></g>' +
      '<circle cx="200" cy="90" r="7" fill="#3f9a52"/>' +
      '<circle cx="330" cy="52" r="20" fill="#e8b84a"/>'),
    reef: svg("0 0 400 200",
      '<rect width="400" height="200" fill="#1c84b0"/>' +
      '<rect x="0" y="0" width="400" height="58" fill="#2e9fc0" opacity=".5"/>' +
      '<ellipse cx="200" cy="188" rx="230" ry="32" fill="#caa86a"/>' +
      '<g fill="#e86a8a"><circle cx="118" cy="162" r="18"/><circle cx="138" cy="152" r="14"/><circle cx="100" cy="153" r="13"/></g>' +
      '<path d="M250,172 q10,-40 0,-52 q-10,10 -16,30 q-6,-14 -14,-20 q-2,26 6,42 Z" fill="#e8a23a"/>' +
      '<g fill="#f3d35a"><polygon points="304,92 322,84 322,100"/><circle cx="310" cy="92" r="6"/></g>' +
      '<g fill="#f3eee3"><polygon points="176,72 192,66 192,78"/><circle cx="182" cy="72" r="5"/></g>'),
    kangaroo: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="160" width="400" height="40" fill="#d99a4a"/>' +
      '<circle cx="332" cy="54" r="22" fill="#e8b84a"/>' +
      '<g fill="#9c6b3f">' +
        '<path d="M214,162 q-30,-2 -42,-38 q-8,-30 14,-48 q12,-8 20,2 q-8,12 0,28 q8,20 26,26 q22,8 10,32 q-14,10 -26,8 Z"/>' +
        '<path d="M206,54 q-4,-20 3,-27 q7,8 5,25 Z"/><path d="M216,54 q2,-21 11,-25 q2,11 -4,25 Z"/>' +
        '<path d="M172,150 q-20,6 -34,18 q16,6 38,1 Z"/>' +
      '</g>' +
      '<circle cx="208" cy="62" r="2.6" fill="#2a1a0a"/>'),
    marae: svg("0 0 400 200", sky +
      '<rect width="400" height="200" fill="url(#g1)"/>' +
      '<rect x="0" y="172" width="400" height="28" fill="#6b8f4a"/>' +
      '<rect x="120" y="112" width="160" height="62" fill="#8a3a2b"/>' +
      '<polygon points="108,112 200,60 292,112" fill="#a8472f"/>' +
      '<g stroke="#e8d9a8" stroke-width="3"><line x1="108" y1="112" x2="200" y2="64"/><line x1="292" y1="112" x2="200" y2="64"/></g>' +
      '<polygon points="200,62 192,50 208,50" fill="#caa044"/>' +
      '<rect x="190" y="132" width="20" height="42" fill="#5a2418"/>' +
      '<g fill="#caa044">' + [138,168,228,258].map(function(x){return '<rect x="'+x+'" y="120" width="10" height="54"/>';}).join("") + '</g>'),
  };
  function art(key) { return ART[key] || ART.scroll; }

  /* ============================================================
     REAL PHOTO with graceful SVG fallback.
     A scene/photo beat may carry { file, caption, credit, art }.
     `file` is a Wikimedia Commons filename, loaded via the stable
     Special:FilePath endpoint. If it fails to load (offline / 404),
     we swap in the SVG art(b.art) fallback so the page never breaks.
     Every photo shows a caption + a credit line.
     ============================================================ */
  var COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";
  function photoSrc(file, w) { return COMMONS + encodeURIComponent(file) + "?width=" + (w || 1100); }
  function sceneFigure(b) {
    var fig = el("figure", { class: "scene" + (b.file ? " has-photo" : "") });
    var frame = el("div", { class: "scene-frame" });
    if (b.file) {
      var swapped = false;
      var img = el("img", { class: "scene-img", loading: "lazy", decoding: "async",
        alt: b.alt || b.caption || "", src: photoSrc(b.file, b.w),
        onerror: function () {
          if (swapped) return; swapped = true;
          frame.innerHTML = ""; frame.classList.add("is-fallback");
          frame.appendChild(nodeFromHTML(art(b.art)));
        } });
      frame.appendChild(img);
    } else {
      frame.appendChild(nodeFromHTML(art(b.art)));
    }
    fig.appendChild(frame);
    if (b.caption || b.credit) {
      var cap = el("figcaption", {});
      if (b.caption) cap.appendChild(el("span", { class: "cap", html: b.caption }));
      if (b.credit) cap.appendChild(el("span", { class: "cred", html: b.credit }));
      fig.appendChild(cap);
    }
    return fig;
  }

  /* continent banner (decorative gradient + motif) */
  function banner(color, emoji) {
    return svg("0 0 400 100",
      '<defs><linearGradient id="b'+color.replace("#","")+'" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="'+color+'"/><stop offset="1" stop-color="'+color+'" stop-opacity=".55"/></linearGradient></defs>' +
      '<rect width="400" height="100" fill="url(#b'+color.replace("#","")+')"/>' +
      '<g fill="#fff" fill-opacity=".10">'+[0,1,2,3,4].map(function(i){return '<circle cx="'+(i*90+30)+'" cy="'+(i%2?20:78)+'" r="40"/>';}).join("")+'</g>' +
      '<path d="M0,82 q100,-26 200,0 t200,0 v18 H0 Z" fill="#fff" fill-opacity=".12"/>');
  }

  /* ============================================================
     INTERACTIVE BEATS
     ============================================================ */

  // 1) Order-the-timeline (drag on desktop, up/down buttons everywhere)
  function buildOrder(spec) {
    var correct = spec.items;                 // given in correct chronological order
    var order = shuffle(correct);
    while (order.length > 1 && order.every(function (it, i) { return it === correct[i]; })) order = shuffle(correct);

    var box = el("div", { class: "ix" });
    box.appendChild(el("div", { class: "ix-head" }, [el("span", { class: "chip", text: "Try it" }), el("h4", { text: spec.title || "Put these in order" })]));
    box.appendChild(el("div", { class: "ix-sub", text: spec.sub || "Drag, or use the arrows, to arrange these from earliest to latest." }));
    var list = el("div", { class: "order-list" });
    var dragEl = null;

    function rowFor(item) {
      var r = el("div", { class: "order-item", draggable: "true" });
      r._item = item;
      var ctrls = el("span", { style: "display:flex;flex-direction:column;gap:2px" }, [
        el("button", { class: "iconbtn", style: "width:24px;height:24px;font-size:.8rem", "aria-label": "Move up", text: "▲", onclick: function () { move(r, -1); } }),
        el("button", { class: "iconbtn", style: "width:24px;height:24px;font-size:.8rem", "aria-label": "Move down", text: "▼", onclick: function () { move(r, 1); } }),
      ]);
      r.appendChild(el("span", { class: "grip", text: "⠿" }));
      r.appendChild(el("span", { class: "yr", text: item.yr }));
      r.appendChild(el("span", { style: "flex:1", text: item.label }));
      r.appendChild(ctrls);
      r.addEventListener("dragstart", function () { dragEl = r; r.classList.add("dragging"); });
      r.addEventListener("dragend", function () { r.classList.remove("dragging"); dragEl = null; clearOver(); });
      r.addEventListener("dragover", function (e) { e.preventDefault(); clearOver(); r.classList.add("over"); });
      r.addEventListener("drop", function (e) { e.preventDefault(); if (dragEl && dragEl !== r) list.insertBefore(dragEl, r); clearOver(); });
      return r;
    }
    function clearOver() { Array.prototype.forEach.call(list.children, function (c) { c.classList.remove("over"); }); }
    function move(r, dir) {
      var i = Array.prototype.indexOf.call(list.children, r);
      var j = i + dir;
      if (j < 0 || j >= list.children.length) return;
      if (dir < 0) list.insertBefore(r, list.children[j]);
      else list.insertBefore(list.children[j], r);
    }
    order.forEach(function (it) { list.appendChild(rowFor(it)); });
    box.appendChild(list);

    var result = el("span", { class: "order-result" });
    var check = el("button", { class: "btn ghost", text: "Check order", onclick: function () {
      var rows = Array.prototype.slice.call(list.children);
      var ok = true;
      rows.forEach(function (r, i) {
        r.classList.remove("correct", "wrong");
        if (r._item === correct[i]) r.classList.add("correct");
        else { r.classList.add("wrong"); ok = false; }
      });
      result.textContent = ok ? "Perfect — that's the right order! 🎉" : "Not quite — green rows are in the right spot. Try again!";
      result.style.color = ok ? "var(--good)" : "var(--bad)";
      if (ok) confetti(40);
    }});
    box.appendChild(el("div", { class: "order-actions" }, [check, result]));
    return box;
  }

  // 2) Click-to-reveal hotspot map
  function buildHotmap(spec) {
    var box = el("div", { class: "ix" });
    box.appendChild(el("div", { class: "ix-head" }, [el("span", { class: "chip", text: "Explore" }), el("h4", { text: spec.title || "Tap the map" })]));
    box.appendChild(el("div", { class: "ix-sub", text: spec.sub || "Tap each glowing point to discover what happened there." }));
    var mapWrap = el("div", { class: "hotmap" });
    var spots = (spec.spots || []).map(function (s, i) {
      return '<g class="hotspot" data-i="' + i + '" tabindex="0" role="button" aria-label="' + (s.label||"") + '">' +
        '<circle cx="' + s.x + '" cy="' + s.y + '" r="13" fill="#c79a3a" fill-opacity=".25"/>' +
        '<circle cx="' + s.x + '" cy="' + s.y + '" r="7" fill="#c79a3a"/>' +
        '<text x="' + s.x + '" y="' + (s.y + 4) + '" font-size="9" text-anchor="middle" fill="#2a210a" font-weight="700">' + (i + 1) + '</text></g>';
    }).join("");
    mapWrap.innerHTML = MAP[spec.map] ? MAP[spec.map].replace("__SPOTS__", spots) : svg("0 0 400 240", '<rect width="400" height="240" fill="#bcd9e6"/>' + spots);
    box.appendChild(mapWrap);
    var readout = el("div", { class: "hot-readout empty", html: "Tap a point to learn about it…" });
    box.appendChild(readout);
    var seen = {};
    function reveal(i) {
      var s = spec.spots[i];
      readout.classList.remove("empty");
      readout.innerHTML = "<b>" + s.label + "</b> — " + s.text;
      var g = mapWrap.querySelector('.hotspot[data-i="' + i + '"]');
      if (g) g.classList.add("seen");
      seen[i] = true;
      if (Object.keys(seen).length === spec.spots.length) toast("You explored every spot!", "🗺️");
    }
    mapWrap.querySelectorAll(".hotspot").forEach(function (g) {
      g.addEventListener("click", function () { reveal(+g.getAttribute("data-i")); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(+g.getAttribute("data-i")); } });
    });
    return box;
  }

  // 3) Compare two things
  function buildCompare(spec) {
    var box = el("div", { class: "ix" });
    box.appendChild(el("div", { class: "ix-head" }, [el("span", { class: "chip", text: "Compare" }), el("h4", { text: spec.title || "Two sides" })]));
    var grid = el("div", { class: "compare" });
    [["a", spec.a], ["b", spec.b]].forEach(function (pair) {
      var col = el("div", { class: "col " + pair[0] });
      col.appendChild(el("h5", { text: pair[1].title }));
      col.appendChild(el("ul", {}, pair[1].items.map(function (t) { return el("li", { html: t }); })));
      grid.appendChild(col);
    });
    box.appendChild(grid);
    return box;
  }

  // 4) Scenario — "what would you do?" (ungraded, sparks thinking)
  function buildScenario(spec) {
    var box = el("div", { class: "ix scenario" });
    box.appendChild(el("div", { class: "ix-head" }, [el("span", { class: "chip", style: "background:var(--gold)", text: "Think" }), el("h4", { text: spec.title || "What would you do?" })]));
    box.appendChild(el("div", { class: "ix-sub", html: spec.prompt }));
    var opts = el("div", { class: "opts" });
    var outcome = el("div", { class: "outcome hidden" });
    spec.opts.forEach(function (o) {
      var b = el("button", { class: "opt", html: o.label, onclick: function () {
        opts.querySelectorAll(".opt").forEach(function (x) { x.classList.remove("picked"); });
        b.classList.add("picked");
        outcome.classList.remove("hidden");
        outcome.innerHTML = "<b>" + (o.tag || "One outcome") + ":</b> " + o.outcome;
      }});
      opts.appendChild(b);
    });
    box.appendChild(opts); box.appendChild(outcome);
    return box;
  }

  /* ---------- beat renderer ---------- */
  function renderBeat(b) {
    switch (b.t) {
      case "lead":   return el("div", { class: "beat lead" }, el("p", { html: b.html }));
      case "p":      return el("div", { class: "beat" }, el("p", { html: b.html }));
      case "hook":   return el("div", { class: "beat" }, el("div", { class: "hook", html: b.html }));
      case "fact":   return el("div", { class: "beat" }, el("div", { class: "fact" }, [el("span", { class: "bulb", text: "💡" }), el("div", {}, [el("b", { text: "Did you know?" }), el("span", { html: b.html })])]));
      case "guide":  return el("div", { class: "beat" }, el("div", { class: "guide" }, [el("span", { class: "face", text: "🦉" }), el("div", { class: "bubble", html: b.html })]));
      case "scene":  return el("div", { class: "beat" }, sceneFigure(b));
      case "photo":  return el("div", { class: "beat" }, sceneFigure(b));
      case "modern": return el("div", { class: "beat" }, el("div", { class: "modern" }, [el("div", { class: "tag", text: "Why it still matters" }), el("p", { style: "margin:.3em 0 0", html: b.html })]));
      case "order":  return wrapBeat(buildOrder(b));
      case "hotmap": return wrapBeat(buildHotmap(b));
      case "compare":return wrapBeat(buildCompare(b));
      case "scenario":return wrapBeat(buildScenario(b));
      default:       return el("div", { class: "beat" }, el("p", { html: b.html || "" }));
    }
  }
  function wrapBeat(node) { var w = el("div", { class: "beat" }); w.appendChild(node); return w; }
  function nodeFromHTML(html) { var d = el("div"); d.innerHTML = html; return d.firstChild; }

  /* reveal-on-scroll */
  function observeBeats(root) {
    var beats = root.querySelectorAll(".beat");
    if (!("IntersectionObserver" in window)) { beats.forEach(function (b) { b.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    beats.forEach(function (b) { io.observe(b); });
  }

  return {
    el: el, shuffle: shuffle, toast: toast, confetti: confetti, modal: modal,
    art: art, banner: banner, renderBeat: renderBeat, observeBeats: observeBeats, nodeFromHTML: nodeFromHTML,
    glossify: glossify,
  };

  /* ---------- simplified stylized maps for hotspots ---------- */
})();

/* Stylized landmass maps (kept outside the IIFE return for clarity).
   Simple, recognizable shapes — reliable static SVG over fragile widgets.
   __SPOTS__ is replaced with hotspot markup. */
var MAP = {
  europe: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#bcd9e6"/>' +
    '<path d="M70,60 q40,-15 80,-5 q30,-12 70,6 q40,-8 70,12 q20,30 -10,46 q10,30 -20,40 q-30,26 -70,18 q-40,18 -80,-6 q-36,6 -52,-26 q-18,-30 8,-52 q-10,-30 26,-43z" fill="#9cbf72" stroke="#7a9a55" stroke-width="2"/>' +
    '<path d="M40,70 l24,8 -18,14z" fill="#9cbf72"/>__SPOTS__</svg>',
  asia: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#bcd9e6"/>' +
    '<path d="M60,70 q80,-30 160,-10 q70,-18 130,18 q30,40 -6,70 q14,40 -40,52 q-60,26 -120,8 q-50,16 -96,-10 q-40,-24 -22,-66 q-26,-40 14,-62z" fill="#c8b27a" stroke="#a8915a" stroke-width="2"/>__SPOTS__</svg>',
  africa: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#bcd9e6"/>' +
    '<path d="M150,30 q70,-6 96,20 q14,40 -14,66 q-6,40 -34,70 q-20,40 -50,40 q-30,2 -40,-40 q-40,-20 -40,-70 q-20,-40 16,-72 q24,-30 60,-14z" fill="#d8b15a" stroke="#b8902f" stroke-width="2"/>__SPOTS__</svg>',
  americas: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#bcd9e6"/>' +
    '<path d="M120,20 q60,-6 70,30 q-6,30 -40,40 q40,6 30,40 l-20,10 q30,40 4,70 q-30,20 -44,-16 q-20,-40 -2,-66 q-40,-16 -30,-56 q-20,-36 32,-46z" fill="#7fbf8f" stroke="#5a9a6a" stroke-width="2"/>__SPOTS__</svg>',
  mideast: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#bcd9e6"/>' +
    '<path d="M90,60 q90,-24 170,-4 q50,16 60,54 q-10,50 -70,64 q-70,18 -130,-6 q-50,-22 -52,-66 q-6,-32 22,-46z" fill="#cd9f6a" stroke="#a8794a" stroke-width="2"/>' +
    '<path d="M150,150 q30,30 70,30" fill="none" stroke="#2e6f9e" stroke-width="3" opacity=".6"/>__SPOTS__</svg>',
  oceania: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#9fd0dd"/>' +
    '<path d="M150,90 q70,-16 120,8 q30,30 -2,60 q-50,30 -110,16 q-46,-12 -42,-50 q2,-26 34,-34z" fill="#c97b4a" stroke="#a85a2a" stroke-width="2"/>' +
    '<ellipse cx="300" cy="70" rx="16" ry="10" fill="#7fbf8f"/><ellipse cx="80" cy="170" rx="12" ry="8" fill="#7fbf8f"/>__SPOTS__</svg>',
  world: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="240" fill="#acd2e0"/>' +
    '<path d="M40,70 q40,-20 80,-8 q30,-10 50,6 q-6,30 -40,36 q-40,12 -76,-6 q-26,-12 -14,-34z" fill="#9cbf72"/>' +
    '<path d="M70,120 q30,-8 44,10 q20,40 -6,66 q-30,16 -44,-18 q-16,-36 6,-58z" fill="#7fbf8f"/>' +
    '<path d="M180,60 q90,-26 170,-2 q40,30 6,70 q-70,30 -140,10 q-50,-16 -52,-50 q-2,-20 10,-28z" fill="#c8b27a"/>' +
    '<path d="M200,140 q40,-8 60,16 q10,40 -20,54 q-40,12 -54,-22 q-12,-34 14,-48z" fill="#d8b15a"/>' +
    '<ellipse cx="330" cy="190" rx="26" ry="14" fill="#c97b4a"/>__SPOTS__</svg>',
};
