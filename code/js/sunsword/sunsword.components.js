/* ============================================================
   The Sun & the Sword — Components  [SUBJECT: sunsword]
   Reusable primitives for a story-first, lesson→quiz history
   island, plus an original ancient-world SVG art library (sun,
   sword, column, owl, scroll, barrel, laurel, map). Built to
   read for a sharp ~13-year-old: dignified, warm, museum-lit,
   a little theatrical when drama earns it. Everything renders
   inside .sunsword-scope so styles never bleed into Math,
   World, or Hardwood.

   Beat types (rendered by renderBeat):
     scene | lead | p | fact | quote | aside | keyidea |
     art | compare | order | banner
   Quiz q: { q, type:'mc'|'tf'|'order', options:[], answer:idx, explain, hint? }
   ============================================================ */

window.SUNSWORD = window.SUNSWORD || {};

SUNSWORD.UI = (function () {
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
     the island's design system and can never leak into another subject. */
  function root() { return document.querySelector(".sunsword-scope") || document.body; }

  var toastTimer;
  function toast(msg, emoji) {
    var t = root().querySelector(".ss-toast");
    if (!t) { t = el("div", { class: "ss-toast" }); root().appendChild(t); }
    t.innerHTML = (emoji ? "<span class='te'>" + emoji + "</span>" : "") + "<span>" + msg + "</span>";
    requestAnimationFrame(function () { t.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }

  function confetti(n) {
    n = n || 110;
    var box = el("div", { class: "ss-confetti" });
    var colors = ["#c98a3c", "#e6c478", "#7a9bb0", "#b8553f", "#d9c9a8", "#6b8f71"];
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
    var back = el("div", { class: "ss-modal-back", onclick: function (e) { if (e.target === back) close(); } });
    var box = el("div", { class: "ss-modal", role: "dialog", "aria-modal": "true" });
    var x = el("button", { class: "iconbtn m-close", "aria-label": "Close", text: "✕", onclick: close });
    box.appendChild(x); box.appendChild(contentNode);
    back.appendChild(box); root().appendChild(back);
    function esc(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", esc);
    function close() { back.remove(); document.removeEventListener("keydown", esc); }
    return { close: close };
  }

  /* ============================================================
     GLOSSARY — tap/hover reveal for ancient-world words a kid may
     not know yet. Deliberately limited to the genuinely-unfamiliar
     terms (not common words like "philosophy") so the page never
     looks like a sea of dotted underlines. Runs over rendered text.
     ============================================================ */
  var GLOSS = {
    agora:     { full: "the agora", def: "the open marketplace and gathering square at the heart of a Greek city — where people shopped, argued, and did politics", ex: "Socrates spent his days questioning people in the agora." },
    hemlock:   { full: "hemlock", def: "a poisonous plant; ancient Athens used a drink made from it to carry out executions", ex: "Socrates was sentenced to die by drinking hemlock." },
    oracle:    { full: "an oracle", def: "a sacred place (or priestess) the Greeks believed could deliver messages from the gods", ex: "The oracle at Delphi said no one was wiser than Socrates." },
    Sophist:   { full: "a Sophist", def: "a paid teacher in ancient Greece who taught clever arguing and persuasion — Socrates argued they sold wisdom like a product", ex: "Unlike a Sophist, Socrates never charged a fee." },
    Sophists:  { full: "the Sophists", def: "paid teachers in ancient Greece who taught clever arguing and persuasion", ex: "The Sophists promised to make you win any argument." },
    dialectic: { full: "dialectic", def: "working toward the truth by question-and-answer, testing each idea against the next", ex: "Socrates' dialectic exposed the holes in a confident answer." },
    tyrant:    { full: "a tyrant", def: "in the ancient world, a ruler who seized total power — often by force and without limits", ex: "Athens feared falling back under a tyrant." },
    hubris:    { full: "hubris", def: "dangerous over-confidence or arrogance — pride that overreaches and invites a fall", ex: "The Greeks told story after story warning against hubris." },
    BCE:       { full: "BCE", def: "“Before Common Era” — counts the years before year 1, so the numbers run backward: 400 BCE is before 300 BCE", ex: "Socrates was born around 470 BCE." },
    philosopher: { full: "a philosopher", def: "a “lover of wisdom” — someone who thinks hard about big questions like how to live, what is true, and what is fair", ex: "Socrates is often called the first great Western philosopher." },
    phalanx:   { full: "a phalanx", def: "a tight block of soldiers standing shoulder to shoulder with their spears or pikes leveled into a wall of points", ex: "Philip’s phalanx struck the enemy before they could land a blow." },
    sarissa:   { full: "the sarissa", def: "the very long pike (up to ~5–6 metres) used by the Macedonian phalanx, far longer than an ordinary spear", ex: "A hedge of sarissas out-reached every enemy spear." },
    sarissas:  { full: "sarissas", def: "the very long Macedonian pikes (up to ~5–6 metres), longer than ordinary spears", ex: "The phalanx leveled its sarissas into a wall of points." },
    Hellenistic: { full: "the Hellenistic age", def: "the era after Alexander when Greek language, art, and ideas blended with Persian, Egyptian, and Indian cultures across his former empire", ex: "Alexandria was a jewel of the Hellenistic world." },
    dharma:    { full: "dharma", def: "in this story, the ‘moral law’ Ashoka ruled by — a life of compassion, honesty, and non-violence", ex: "After Kalinga, Ashoka governed by dharma instead of by force." },
    edict:     { full: "an edict", def: "an official public message from a ruler; Ashoka carved his into rocks and pillars for ordinary people to read", ex: "One edict urged respect for every religion." },
    edicts:    { full: "edicts", def: "official public messages from a ruler; Ashoka inscribed his on rocks and pillars across the empire", ex: "His edicts taught kindness, honesty, and tolerance." },
  };
  var GLOSS_PATTERN = "\\b(Sophists|Sophist|dialectic|hemlock|oracle|tyrant|hubris|agora|phalanx|sarissas|sarissa|Hellenistic|dharma|edicts|edict)\\b";

  function ensureGlossCSS() {
    if (document.getElementById("ss-gloss-style")) return;
    var s = document.createElement("style");
    s.id = "ss-gloss-style";
    s.textContent =
      ".sunsword-scope .gloss{border-bottom:1.5px dotted var(--accent);cursor:help;position:relative;font-weight:600;}" +
      ".sunsword-scope .gloss:focus{outline:2px solid var(--accent);outline-offset:2px;border-radius:3px;}" +
      ".sunsword-scope .gloss .gloss-pop{visibility:hidden;opacity:0;position:absolute;left:50%;bottom:150%;transform:translateX(-50%) translateY(6px);width:min(290px,80vw);background:#2a2118;color:#f6efe2;padding:11px 14px;border:1px solid var(--line-strong);border-radius:12px;font-size:.85rem;font-weight:400;line-height:1.5;box-shadow:0 18px 40px rgba(40,28,12,.4);z-index:200;transition:opacity .15s,transform .15s;pointer-events:none;text-align:left;white-space:normal;}" +
      ".sunsword-scope .gloss .gloss-pop b{color:var(--accent-2);}" +
      ".sunsword-scope .gloss .gloss-pop em{opacity:.7;font-style:italic;}" +
      ".sunsword-scope .gloss:hover .gloss-pop,.sunsword-scope .gloss:focus .gloss-pop,.sunsword-scope .gloss:focus-within .gloss-pop{visibility:visible;opacity:1;transform:translateX(-50%) translateY(0);}" +
      ".sunsword-scope .gloss .gloss-pop:after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#2a2118;}";
    document.head.appendChild(s);
  }
  function makeGloss(term) {
    var key = GLOSS[term] ? term : term.toLowerCase();
    var g = GLOSS[term] || GLOSS[key];
    if (!g) return document.createTextNode(term);
    var span = el("span", { class: "gloss", tabindex: "0", role: "note",
      "aria-label": term + " — " + g.def + ". Example: " + g.ex });
    span.appendChild(document.createTextNode(term));
    var pop = el("span", { class: "gloss-pop" });
    pop.innerHTML = "<b>" + g.full + "</b> — " + g.def + ".<br><em>e.g.</em> " + g.ex;
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
              (p.classList && (p.classList.contains("gloss") || p.classList.contains("ss-quote") ||
                p.classList.contains("ss-art") || p.classList.contains("opt-btn"))))
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
     ANCIENT-WORLD SVG ART — original, bold, always-renders.
     Warm bronze/marble/ink palette. Decorative hero + section
     art, and a graceful stand-in when a real portrait isn't set.
     ============================================================ */
  function svg(vb, inner, cls) {
    return '<svg viewBox="' + vb + '" class="ss-svg ' + (cls || "") + '" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice">' + inner + '</svg>';
  }
  var defs =
    '<defs>' +
    '<linearGradient id="ss-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4e4c1"/><stop offset="1" stop-color="#e7c79a"/></linearGradient>' +
    '<linearGradient id="ss-marble" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f1e6"/><stop offset="1" stop-color="#e3d8c4"/></linearGradient>' +
    '<linearGradient id="ss-bronze" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e7c478"/><stop offset="1" stop-color="#b07a32"/></linearGradient>' +
    '<linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#27313f"/><stop offset="1" stop-color="#1a2230"/></linearGradient>' +
    '</defs>';

  // a rising sun with rays (the "sun" of the title — inner light)
  function sunRays(cx, cy, r) {
    var rays = "";
    for (var i = 0; i < 16; i++) {
      var a = (i / 16) * Math.PI * 2, x1 = cx + Math.cos(a) * (r + 6), y1 = cy + Math.sin(a) * (r + 6),
          x2 = cx + Math.cos(a) * (r + 6 + (i % 2 ? 10 : 20)), y2 = cy + Math.sin(a) * (r + 6 + (i % 2 ? 10 : 20));
      rays += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#caa12e" stroke-width="3" stroke-linecap="round"/>';
    }
    return '<g>' + rays + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#ss-bronze)" stroke="#8a5a22" stroke-width="2"/></g>';
  }
  // a simple Greek column
  function column(x, w, top, h) {
    var flutes = "";
    for (var i = 1; i < 5; i++) flutes += '<line x1="' + (x + (w / 5) * i) + '" y1="' + (top + 14) + '" x2="' + (x + (w / 5) * i) + '" y2="' + (top + h) + '" stroke="#c7b896" stroke-width="1.5" opacity=".5"/>';
    return '<g>' +
      '<rect x="' + (x - 6) + '" y="' + top + '" width="' + (w + 12) + '" height="10" rx="2" fill="url(#ss-marble)" stroke="#c7b896" stroke-width="1"/>' +
      '<rect x="' + x + '" y="' + (top + 10) + '" width="' + w + '" height="' + h + '" fill="url(#ss-marble)" stroke="#c7b896" stroke-width="1"/>' +
      flutes +
      '<rect x="' + (x - 8) + '" y="' + (top + 10 + h) + '" width="' + (w + 16) + '" height="12" rx="2" fill="url(#ss-marble)" stroke="#c7b896" stroke-width="1"/></g>';
  }
  // crossed sword + olive branch (the "sword" of the title — and peace beside it)
  function swordBranch(cx, cy) {
    return '<g transform="translate(' + cx + ',' + cy + ')">' +
      '<g transform="rotate(35)"><rect x="-4" y="-70" width="8" height="92" rx="2" fill="url(#ss-bronze)" stroke="#7a5018" stroke-width="1.5"/>' +
      '<rect x="-16" y="22" width="32" height="7" rx="3" fill="#8a5a22"/><rect x="-3" y="29" width="6" height="16" rx="2" fill="#8a5a22"/></g>' +
      '<g transform="rotate(-32)" stroke="#5f7d52" stroke-width="3" fill="none"><path d="M0,28 C-2,0 -2,-30 0,-58"/>' +
      '<g fill="#6f9162" stroke="none">' +
      [-44, -28, -12, 4].map(function (y) { return '<ellipse cx="-9" cy="' + y + '" rx="8" ry="4" transform="rotate(-30 -9 ' + y + ')"/><ellipse cx="9" cy="' + (y + 8) + '" rx="8" ry="4" transform="rotate(30 9 ' + (y + 8) + ')"/>'; }).join("") +
      '</g></g></g>';
  }

  var ART = {
    // the title image: sun rising behind a sword-and-olive-branch, over marble
    sunsword: svg("0 0 420 230", defs +
      '<rect width="420" height="230" fill="url(#ss-sky)"/>' +
      '<circle cx="210" cy="150" r="150" fill="#f0d39e" opacity=".5"/>' +
      sunRays(210, 120, 46) +
      swordBranch(210, 150) +
      '<rect x="0" y="200" width="420" height="30" fill="#d9bd86" opacity=".6"/>'),
    // temple / colonnade — used for the home hero & arc banners
    temple: svg("0 0 420 230", defs +
      '<rect width="420" height="230" fill="url(#ss-sky)"/>' +
      sunRays(330, 70, 28) +
      '<polygon points="60,70 210,28 360,70" fill="url(#ss-marble)" stroke="#c7b896" stroke-width="2"/>' +
      '<polygon points="92,70 210,42 328,70" fill="#efe6d4" opacity=".8"/>' +
      column(80, 26, 78, 110) + column(130, 26, 78, 110) + column(180, 26, 78, 110) +
      column(214, 26, 78, 110) + column(264, 26, 78, 110) + column(314, 26, 78, 110) +
      '<rect x="40" y="200" width="340" height="14" rx="2" fill="url(#ss-marble)" stroke="#c7b896"/>'),
    // an owl (Athena's owl — wisdom)
    owl: svg("0 0 220 220", defs + '<rect width="220" height="220" fill="url(#ss-marble)"/>' +
      '<g transform="translate(110,118)">' +
      '<ellipse cx="0" cy="6" rx="52" ry="60" fill="#9a7b4e"/>' +
      '<path d="M-52,-4 a52,60 0 0 1 104,0 q-52,28 -104,0z" fill="#b8965f"/>' +
      '<circle cx="-22" cy="-12" r="22" fill="#f7f1e6"/><circle cx="22" cy="-12" r="22" fill="#f7f1e6"/>' +
      '<circle cx="-22" cy="-12" r="10" fill="#2a2118"/><circle cx="22" cy="-12" r="10" fill="#2a2118"/>' +
      '<polygon points="0,-6 -7,8 7,8" fill="#caa12e"/>' +
      '<path d="M-44,-44 l16,18 M44,-44 l-16,18" stroke="#9a7b4e" stroke-width="6" stroke-linecap="round"/>' +
      '<g stroke="#7a5e38" stroke-width="2" opacity=".5">' + [-30,-10,10,30].map(function(x){return '<line x1="'+x+'" y1="24" x2="'+x+'" y2="58"/>';}).join("") + '</g></g>'),
    // an unrolled scroll
    scroll: svg("0 0 220 220", defs + '<rect width="220" height="220" fill="url(#ss-marble)"/>' +
      '<rect x="44" y="50" width="132" height="120" rx="6" fill="#f3ead6" stroke="#cbb98f" stroke-width="2"/>' +
      '<g stroke="#bda77f" stroke-width="3" opacity=".7">' + [74,90,106,122,138,154].map(function(y){return '<line x1="62" y1="'+y+'" x2="158" y2="'+y+'"/>';}).join("") + '</g>' +
      '<rect x="34" y="42" width="14" height="136" rx="7" fill="url(#ss-bronze)" stroke="#7a5018"/>' +
      '<rect x="172" y="42" width="14" height="136" rx="7" fill="url(#ss-bronze)" stroke="#7a5018"/>'),
    // Diogenes' barrel
    barrel: svg("0 0 220 220", defs + '<rect width="220" height="220" fill="url(#ss-marble)"/>' +
      '<g transform="translate(110,120)">' +
      '<ellipse cx="0" cy="0" rx="70" ry="58" fill="#8a5a2e"/>' +
      '<ellipse cx="0" cy="0" rx="44" ry="40" fill="#1f1813"/>' +
      '<g stroke="#5e3c1d" stroke-width="5" fill="none">' +
      '<path d="M-70,-18 a70,58 0 0 1 140,0"/><path d="M-70,18 a70,58 0 0 0 140,0"/></g>' +
      '<g stroke="#caa12e" stroke-width="3" opacity=".8">' + [-46,-15,16,47].map(function(x){return '<line x1="'+x+'" y1="-50" x2="'+x+'" y2="50"/>';}).join("") + '</g></g>'),
    // a marble bust (anonymous philosopher — portrait stand-in)
    bust: svg("0 0 220 220", defs + '<rect width="220" height="220" fill="url(#ss-night)"/>' +
      '<g transform="translate(110,108)">' +
      '<rect x="-34" y="78" width="68" height="22" rx="3" fill="url(#ss-marble)" stroke="#c7b896"/>' +
      '<path d="M-40,72 q40,18 80,0 l-6,-30 q-34,16 -68,0z" fill="url(#ss-marble)"/>' +
      '<ellipse cx="0" cy="6" rx="42" ry="50" fill="url(#ss-marble)"/>' +
      '<path d="M-42,2 q-6,-52 42,-56 q48,4 42,56 q-10,-34 -42,-34 q-32,0 -42,34z" fill="#e6dac3"/>' +
      '<path d="M-30,48 q30,26 60,0 q-6,22 -30,22 q-24,0 -30,-22z" fill="#d8caac"/>' +
      '<circle cx="-15" cy="2" r="3.4" fill="#9a8a68"/><circle cx="15" cy="2" r="3.4" fill="#9a8a68"/>' +
      '<path d="M-6,16 l-4,12 8,0z" fill="#cabf9f"/></g>'),
    // a simple Mediterranean map (Greece + the wider world) — "the map is a character"
    map: svg("0 0 420 230", defs +
      '<rect width="420" height="230" fill="#cdd8e0"/>' +
      '<path d="M40,150 q40,-30 90,-20 q30,-40 80,-20 q20,-26 60,-10 q40,-6 90,18 l0,80 -320,0z" fill="#cdbb8e" stroke="#a9925f" stroke-width="2"/>' +
      '<path d="M150,120 q20,18 10,44 q-26,4 -30,-20z" fill="#c0a86f" stroke="#a9925f"/>' +
      '<g fill="#8a5a22"><circle cx="170" cy="118" r="4"/><circle cx="250" cy="104" r="4"/><circle cx="330" cy="120" r="4"/></g>' +
      '<g stroke="#9a6a2a" stroke-width="2" stroke-dasharray="3 5" fill="none"><path d="M170,118 q50,-26 80,-14 t80,16"/></g>'),
  };
  function art(key) { return ART[key] || ART.temple; }

  /* ============================================================
     PORTRAIT with graceful fallback.
     Optionally sources a real, freely-licensed image (Wikimedia
     Commons via the stable Special:FilePath redirect, scaled +
     lazy-loaded). If none is set or it fails to load, it degrades
     to a dignified marble-bust SVG — never a broken-image box.
     Every portrait can carry a caption + credit.
     ============================================================ */
  var COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";
  function photoSrc(file, w) { return COMMONS + encodeURIComponent(file) + "?width=" + (w || 800); }

  function portrait(spec) {
    // spec: { file, alt, caption, credit, fallback:'bust', tall }
    var fig = el("figure", { class: "ss-portrait" + (spec.tall ? " tall" : "") });
    var frame = el("div", { class: "ss-frame" });
    if (spec.file) {
      var img = el("img", { loading: "lazy", decoding: "async", alt: spec.alt || spec.caption || "",
        src: photoSrc(spec.file, spec.w || 900) });
      img.addEventListener("error", function () {
        if (frame.querySelector(".ss-fallback")) return;
        frame.innerHTML = ""; frame.appendChild(el("div", { class: "ss-fallback", html: art(spec.fallback || "bust") }));
      });
      frame.appendChild(img);
    } else {
      frame.appendChild(el("div", { class: "ss-fallback", html: art(spec.fallback || "bust") }));
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

  /* ---------- beat renderer ---------- */
  function renderBeat(b) {
    switch (b.t) {
      case "scene":  return el("div", { class: "beat ss-scene" }, [
                        el("div", { class: "scene-rule" }),
                        el("p", { class: "scene-text", html: b.html }),
                        b.note ? el("div", { class: "scene-note", html: b.note }) : null ]);
      case "lead":   return el("div", { class: "beat lead" }, el("p", { html: b.html }));
      case "p":      return el("div", { class: "beat" }, el("p", { html: b.html }));
      case "fact":   return el("div", { class: "beat" }, el("div", { class: "ss-fact" }, [el("span", { class: "ss-fact-mark", text: b.mark || "📜" }), el("div", {}, [el("b", { text: b.label || "Did you know?" }), el("span", { html: " " + b.html })])]));
      case "quote":  return el("div", { class: "beat" }, el("blockquote", { class: "ss-quote" }, [el("p", { html: "“" + b.html + "”" }), b.who ? el("cite", { html: "— " + b.who }) : null]));
      case "aside":  return el("div", { class: "beat" }, el("div", { class: "ss-aside" }, [
                        el("div", { class: "aside-face", html: art(b.face || "barrel") }),
                        el("div", { class: "aside-body" }, [el("div", { class: "aside-name", text: b.who || "Diogenes says" }), el("p", { html: b.html })]) ]));
      case "keyidea":return el("div", { class: "beat" }, el("div", { class: "ss-key" }, [el("div", { class: "key-tag", text: b.tag || "The big idea" }), el("p", { html: b.html })]));
      case "art":    return wrapBeat(el("div", { class: "ss-art", html: art(b.key) + (b.caption ? "<figcaption>" + b.caption + "</figcaption>" : "") }));
      case "portrait": return wrapBeat(portrait(b));
      case "banner": return el("div", { class: "beat" }, el("div", { class: "ss-banner", html: b.html }));
      case "compare":return wrapBeat(buildCompare(b));
      case "order":  return wrapBeat(buildOrder(b));
      default:       return el("div", { class: "beat" }, el("p", { html: b.html || "" }));
    }
  }
  function wrapBeat(node) { var w = el("div", { class: "beat" }); w.appendChild(node); return w; }

  function buildCompare(spec) {
    var box = el("div", { class: "ix-card" });
    box.appendChild(el("div", { class: "ix-head" }, [el("span", { class: "chip", text: "Two sides" }), el("h4", { text: spec.title || "Compare" })]));
    var grid = el("div", { class: "ss-compare" });
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
    var check = el("button", { class: "btn ghost", text: "Check the order", onclick: function () {
      var rows = Array.prototype.slice.call(list.children), ok = true;
      rows.forEach(function (r, i) {
        r.classList.remove("correct", "wrong");
        if (r._item === correct[i]) r.classList.add("correct"); else { r.classList.add("wrong"); ok = false; }
      });
      result.textContent = ok ? "Exactly right — that's the order of history. 🏛️" : "Close — the green rows are in the right place. Try again!";
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
    art: art, portrait: portrait,
    renderBeat: renderBeat, observeBeats: observeBeats,
  };
})();
