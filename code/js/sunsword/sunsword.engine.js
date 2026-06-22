/* ============================================================
   The Sun & the Sword — Engine  [SUBJECT: sunsword]
   Story-first: read the lesson, then a difficulty-curved
   6-question quiz (warm-up → think → stretch). Finish an arc’s
   lessons to unlock its review quiz; pass it to earn a place in
   the Hall of Names. A "big question" debate card per arc.
   Plugs into the main app.js router under #/sunsword/... — we
   never add our own hashchange listener, so subjects can’t fight.
   ============================================================ */

window.SUNSWORD = window.SUNSWORD || {};

SUNSWORD.Engine = (function () {
  var U, S, C;
  var app;
  var PASS = 70;          // arc review-quiz pass mark -> Hall of Names
  var ready = false;

  function go(hash) {
    if (!hash || hash === "#/" || hash === "#") location.hash = "#/sunsword";
    else location.hash = hash.replace(/^#\//, "#/sunsword/");
  }
  function toCamp() { location.hash = "#/"; }
  function scrollTop() { try { window.scrollTo({ top: 0, behavior: "auto" }); } catch (e) {} }

  /* ---------------- shell ---------------- */
  function topbar(crumbs) {
    var bar = U.el("div", { class: "ss-topbar" });
    var row = U.el("div", { class: "ss-row" });
    var camp = U.el("button", { class: "iconbtn", "aria-label": "Back to Summer Camp map", title: "Back to Camp", text: "⛺", onclick: toCamp });
    var brand = U.el("button", { class: "ss-brand", onclick: function () { go("#/"); } }, [
      U.el("span", { class: "ss-logo", html: U.art("sunsword") }),
      U.el("span", { class: "ss-brandtext" }, [document.createTextNode("THE SUN & THE SWORD"), U.el("small", { text: "Summer Camp · the ancient world" })]),
    ]);
    var crumbNode = U.el("div", { class: "ss-crumbs", html: crumbs || "" });
    var streak = S.liveStreak();
    var streakChip = U.el("button", { class: "ss-chip", title: "Your day streak", onclick: function () { go("#/hall"); } },
      [U.el("span", { class: "fire", text: "🔥" }), document.createTextNode(streak + "")]);
    var pbChip = U.el("button", { class: "ss-chip", title: "Personal best quiz score", onclick: function () { go("#/hall"); } },
      [document.createTextNode("PB " + S.personalBest() + "%")]);
    var hallBtn = U.el("button", { class: "iconbtn", "aria-label": "Hall of Names", title: "Hall of Names", text: "🦉", onclick: function () { go("#/hall"); } });
    row.appendChild(camp); row.appendChild(brand); row.appendChild(U.el("div", { class: "spacer" }));
    row.appendChild(crumbNode); row.appendChild(streakChip); row.appendChild(pbChip); row.appendChild(hallBtn);
    bar.appendChild(row);
    return bar;
  }
  function footer() {
    return U.el("div", { class: "ss-foot", html:
      "Summer Camp · <b>The Sun &amp; the Sword</b> — meet the most magnetic humans who ever lived. " +
      "Honest about the brilliance and the cost. Progress saved on this device. " +
      "<span style='opacity:.55'>· first cut (2026-06-20)</span>" });
  }
  function page(crumbs, bodyNode) {
    var scope = U.el("div", { class: "sunsword-scope" });
    scope.appendChild(U.el("div", { class: "ss-readbar", id: "ss-readbar", "aria-hidden": "true" }));
    scope.appendChild(topbar(crumbs));
    var main = U.el("div", { class: "ss-wrap", role: "main" });
    main.appendChild(bodyNode);
    U.glossify(main);
    scope.appendChild(main);
    scope.appendChild(footer());
    app.innerHTML = ""; app.appendChild(scope);
    scrollTop();
  }
  function backbar(label, hash) {
    return U.el("div", { class: "ss-backbar" }, U.el("button", { class: "ss-backbtn",
      onclick: function () { go(hash); }, html: "‹ " + label }));
  }

  /* ---------------- HOME ---------------- */
  function renderHome() {
    var body = U.el("div");
    var totals = S.totalsAcross(C.arcs);

    var hero = U.el("div", { class: "ss-hero" });
    hero.appendChild(U.el("div", { class: "ss-hero-art", html: U.art("sunsword") }));
    var hc = U.el("div", { class: "ss-hero-copy" });
    hc.appendChild(U.el("div", { class: "ss-eyebrow", text: "THE ANCIENT WORLD — THINKERS · CONQUERORS · REBELS" }));
    hc.appendChild(U.el("h1", { html: "The Sun &amp; the Sword" }));
    hc.appendChild(U.el("p", { class: "ss-lede", html:
      "Travel back ~2,000 years and meet the people who still shape how we think, argue, lead, and live. " +
      "Read their stories — then test yourself and earn a place in the Hall of Names." }));
    var stats = U.el("div", { class: "ss-herostats" }, [
      heroStat(totals.lessonsDone + "/" + totals.lessonsTotal, "lessons"),
      heroStat(totals.badges + "/" + C.arcs.length, "arcs mastered"),
      heroStat(S.liveStreak() + "🔥", "day streak"),
      heroStat(S.personalBest() + "%", "personal best"),
    ]);
    hc.appendChild(stats);
    var cta = U.el("div", { class: "ss-cta" }, [
      U.el("button", { class: "btn accent lg", text: resumeLabel(), onclick: function () { resume(); } }),
      U.el("button", { class: "btn ghost lg", text: "🦉 Hall of Names", onclick: function () { go("#/hall"); } }),
    ]);
    hc.appendChild(cta);
    hc.appendChild(U.el("p", { class: "ss-next", text: nextCaption() }));
    hero.appendChild(hc);
    body.appendChild(hero);

    if (C.intro && C.intro.length) {
      var about = U.el("div", { class: "ss-read" });
      C.intro.forEach(function (b) { about.appendChild(U.renderBeat(b)); });
      U.glossify(about);
      about.querySelectorAll(".beat").forEach(function (b) { b.classList.add("in"); });
      body.appendChild(about);
    }

    body.appendChild(U.el("div", { class: "ss-section-title" }, [
      U.el("h2", { text: "Choose a story arc" }),
      U.el("span", { class: "ss-hint", text: "Finish an arc’s lessons to unlock its review. Start anywhere." }),
    ]));
    var grid = U.el("div", { class: "ss-arcs" });
    C.arcs.forEach(function (a, i) {
      var prog = S.arcProgress(a);
      var won = S.hasBadge(a.id);
      var card = U.el("div", { class: "arc-card", tabindex: "0", role: "button", "aria-label": a.name,
        onclick: function () { go("#/a/" + a.id); },
        onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
      var hd = U.el("div", { class: "arc-banner", style: "background:linear-gradient(135deg," + a.color + "," + a.color2 + ")" }, [
        U.el("span", { class: "arc-emoji", text: a.emoji }),
        won ? U.el("span", { class: "arc-badge", text: "🦉" }) : null,
      ]);
      card.appendChild(hd);
      var b = U.el("div", { class: "arc-body" });
      b.appendChild(U.el("div", { class: "arc-kicker", text: "ARC " + (i + 1) }));
      b.appendChild(U.el("h3", { text: a.name }));
      b.appendChild(U.el("p", { class: "arc-blurb", text: a.blurb }));
      var meter = U.el("div", { class: "ss-meter" }); meter.appendChild(U.el("i", { style: "width:" + prog.pct + "%" }));
      b.appendChild(meter);
      b.appendChild(U.el("div", { class: "ss-meter-label" }, [
        U.el("span", { text: prog.done + " / " + prog.total + " lessons" }),
        U.el("span", { text: won ? "🦉 " + a.badge.name : prog.pct + "%" }),
      ]));
      card.appendChild(b);
      grid.appendChild(card);
    });
    body.appendChild(grid);

    // honest "more coming" note — only Arc 1 is built in the first cut
    body.appendChild(U.el("div", { class: "ss-comingsoon" }, [
      U.el("b", { text: "More arcs are on the way — " }),
      document.createTextNode("the boy who wanted the world (Alexander), the king who wept (Ashoka), warrior kingdoms, the other half of the world (the Buddha, Confucius), and more. This is the first cut."),
    ]));

    page("", body);
  }
  function heroStat(big, lbl) { return U.el("div", { class: "ss-hstat" }, [U.el("b", { text: big }), U.el("span", { text: lbl })]); }
  function resumeLabel() {
    if (!nextLesson()) return "▶ Revisit the island";
    return S.totalsAcross(C.arcs).lessonsDone > 0 ? "▶ Keep going" : "▶ Begin";
  }
  function nextCaption() {
    var n = nextLesson();
    if (!n) return "You’ve read every lesson in the first cut — Seeker of Wisdom! 🦉";
    var a = arcOf(n);
    return "Next up: " + a.name + " · " + n.title;
  }
  function nextLesson() {
    for (var i = 0; i < C.arcs.length; i++) {
      var a = C.arcs[i];
      for (var j = 0; j < a.lessons.length; j++) {
        var lid = a.lessons[j];
        if (!(S.lesson(lid) && S.lesson(lid).done)) return C.lessons[lid];
      }
    }
    return null;
  }
  function resume() { var n = nextLesson(); if (n) go("#/l/" + n.id); else go("#/a/" + C.arcs[0].id); }
  function arcOf(Lsn) { return C.arcs.filter(function (a) { return a.id === Lsn.arc; })[0]; }

  /* ---------------- ARC ---------------- */
  function renderArc(id) {
    var a = C.arcs.filter(function (x) { return x.id === id; })[0];
    if (!a) return renderHome();
    var body = U.el("div");
    body.appendChild(backbar("All arcs", "#/"));

    var hero = U.el("div", { class: "arc-hero", style: "background:linear-gradient(120deg," + a.color + "22," + a.color2 + "11)" });
    hero.appendChild(U.el("div", { class: "arc-hero-emoji", text: a.emoji }));
    var ht = U.el("div");
    ht.appendChild(U.el("div", { class: "ss-eyebrow", text: "STORY ARC" }));
    ht.appendChild(U.el("h1", { text: a.name }));
    ht.appendChild(U.el("p", { class: "ss-lede", html: a.intro }));
    hero.appendChild(ht);
    body.appendChild(hero);

    if (a.overview && a.overview.length) {
      var ov = U.el("div", { class: "ss-read" });
      a.overview.forEach(function (b) { ov.appendChild(U.renderBeat(b)); });
      U.glossify(ov);
      // reveal immediately — these beats aren't scroll-observed here, so without this
      // they'd stay at opacity:0 and the box would look empty.
      ov.querySelectorAll(".beat").forEach(function (b) { b.classList.add("in"); });
      body.appendChild(ov);
    }

    var prog = S.arcProgress(a);
    var meter = U.el("div", { class: "ss-meter wide" }); meter.appendChild(U.el("i", { style: "width:" + prog.pct + "%" }));
    body.appendChild(meter);
    body.appendChild(U.el("div", { class: "ss-meter-label wide" }, [
      U.el("span", { text: prog.done + " of " + prog.total + " lessons read" }),
      U.el("span", { text: prog.pct + "%" }),
    ]));

    var list = U.el("div", { class: "lesson-list" });
    a.lessons.forEach(function (lid, idx) {
      var Lsn = C.lessons[lid], rec = S.lesson(lid), done = rec && rec.done;
      var row = U.el("div", { class: "lrow" + (done ? " done" : ""), tabindex: "0", role: "button",
        onclick: function () { go("#/l/" + lid); },
        onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
      row.appendChild(U.el("div", { class: "lnum", text: done ? "✓" : (idx + 1) }));
      var meta = U.el("div", { class: "lmeta" });
      meta.appendChild(U.el("h4", { text: Lsn.title }));
      meta.appendChild(U.el("div", { class: "ltags" }, [
        U.el("span", { text: "⏱ " + Lsn.minutes + " min" }),
        U.el("span", { text: "📝 " + Lsn.quiz.length + " questions" }),
        done ? U.el("span", { class: "best", text: "★ best " + rec.best + "%" }) : U.el("span", { text: "Tap to begin" }),
      ]));
      row.appendChild(meta);
      row.appendChild(U.el("div", { class: "lgo", text: "›" }));
      list.appendChild(row);
    });

    // arc review row
    var rBest = S.arcQuizBest(a.id);
    var rRow = U.el("div", { class: "lrow review-row", tabindex: "0", role: "button",
      onclick: function () { go("#/r/" + a.id); },
      onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
    rRow.appendChild(U.el("div", { class: "lnum", text: S.hasBadge(a.id) ? "🦉" : "★" }));
    var rMeta = U.el("div", { class: "lmeta" });
    rMeta.appendChild(U.el("h4", { text: a.name + " — Review · earn the " + a.badge.name + " mark" }));
    rMeta.appendChild(U.el("div", { class: "ltags" }, [
      U.el("span", { text: "📝 " + a.review.length + " questions" }),
      rBest ? U.el("span", { class: "best", text: "your best: " + rBest + "%" }) : U.el("span", { text: "not taken yet" }),
    ]));
    rRow.appendChild(rMeta);
    rRow.appendChild(U.el("div", { class: "lgo", text: "›" }));
    list.appendChild(rRow);
    body.appendChild(list);

    if (a.debate) body.appendChild(debateCard(a.debate));

    page("<b>" + a.name + "</b>", body);
  }

  /* ---------------- DEBATE CARD ---------------- */
  function debateCard(d) {
    var card = U.el("div", { class: "debate-card" });
    card.appendChild(U.el("div", { class: "dc-tag", text: "🗣️ " + (d.tag || "Big question — argue BOTH sides") }));
    card.appendChild(U.el("h3", { class: "dc-q", html: d.q }));
    if (d.setup) card.appendChild(U.el("p", { class: "dc-setup", html: d.setup }));
    var reveal = U.el("div", { class: "dc-reveal" });
    var mk = function (side, label, cls) {
      return U.el("button", { class: "btn ghost dc-side " + cls, html: label, onclick: function () {
        S.seeDebate(d.id);
        reveal.innerHTML = "<div class='dc-arg " + cls + "'><div class='dc-arg-h'>" + side.h + "</div><p>" + side.body + "</p></div>";
      }});
    };
    card.appendChild(U.el("div", { class: "dc-btns" }, [
      mk(d.a, "👉 " + d.a.label, "side-a"),
      mk(d.b, "👉 " + d.b.label, "side-b"),
    ]));
    card.appendChild(reveal);
    card.appendChild(U.el("p", { class: "dc-foot", text: "There’s no single right answer — making the strongest case for each side is exactly what great thinkers do." }));
    return card;
  }

  /* ---------------- LESSON READER ---------------- */
  function renderLesson(id) {
    var Lsn = C.lessons[id];
    if (!Lsn) return renderHome();
    var a = arcOf(Lsn);
    var body = U.el("div");
    body.appendChild(backbar(a.name, "#/a/" + a.id));

    var reader = U.el("div", { class: "reader" });
    reader.appendChild(U.el("div", { class: "rkicker", text: a.name + " · Lesson " + Lsn.n }));
    reader.appendChild(U.el("h1", { class: "rtitle", text: Lsn.title }));
    reader.appendChild(U.el("div", { class: "rbyline", text: "⏱ about " + Lsn.minutes + " min · " + lessonWordCount(Lsn).toLocaleString() + " words · then a quick quiz" }));
    if (Lsn.hook) reader.appendChild(U.nodeFromHTML('<div class="beat in"><div class="rhook">' + Lsn.hook + '</div></div>'));
    Lsn.beats.forEach(function (b) { reader.appendChild(U.renderBeat(b)); });

    var cta = U.el("div", { class: "beat rcta" });
    cta.appendChild(U.el("p", { class: "muted", text: "Lock it in — take the quiz. It starts easy and gets a little harder:" }));
    cta.appendChild(U.el("button", { class: "btn accent lg", text: "Take the quiz →", onclick: function () { go("#/q/" + id); } }));
    reader.appendChild(cta);

    body.appendChild(reader);
    page("<b>" + a.name + "</b> › " + Lsn.title, body);
    U.observeBeats(reader);
    setupReadbar();
  }
  function lessonWordCount(Lsn) {
    function words(s) { return String(s || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length; }
    var n = words(Lsn.hook);
    (Lsn.beats || []).forEach(function (b) {
      n += words(b.html) + words(b.note) + words(b.label) + words(b.caption);
      if (b.items) b.items.forEach(function (it) { n += words(it.label) + words(it.yr); });
      ["a", "b"].forEach(function (k) { if (b[k]) { n += words(b[k].title); if (b[k].items) b[k].items.forEach(function (it) { n += words(it); }); } });
    });
    return n;
  }
  function setupReadbar() {
    var bar = document.getElementById("ss-readbar");
    if (!bar) return;
    function upd() { var h = document.documentElement, max = h.scrollHeight - h.clientHeight; bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%"; }
    window.onscroll = upd; upd();
  }

  /* ---------------- QUIZ RUNNER (shared) ----------------
     Realizes the vision’s difficulty curve: the engine shows a
     little pip per question — warm-up (Q1–2), think (Q3–4),
     stretch (Q5–6) — based on position in a 6-question quiz. */
  function curveFor(i, total) {
    if (total <= 4) return { dots: "●●○", label: "Think" };
    var third = total / 3;
    if (i < third) return { dots: "●○○", label: "Warm-up" };
    if (i < third * 2) return { dots: "●●○", label: "Think" };
    return { dots: "●●●", label: "Stretch" };
  }
  function runQuiz(opts) {
    var qs = opts.questions, i = 0, answers = [], locked = false;
    var wrap = U.el("div", { class: "quiz-wrap" });
    var top = U.el("div", { class: "quiz-top" });
    var prog = U.el("div", { class: "qprog" }); var bar = U.el("i"); prog.appendChild(bar);
    var label = U.el("div", { class: "qprog-label" });
    top.appendChild(prog); top.appendChild(label);
    var cardSlot = U.el("div");
    wrap.appendChild(U.el("div", { class: "rkicker center", text: opts.kicker || "Quiz" }));
    wrap.appendChild(U.el("h2", { class: "center qtitle", text: opts.title || "" }));
    wrap.appendChild(top); wrap.appendChild(cardSlot);

    function renderQ() {
      locked = false;
      bar.style.width = (i / qs.length * 100) + "%";
      label.textContent = "Q " + (i + 1) + " / " + qs.length;
      var q = qs[i], cur = curveFor(i, qs.length);
      // Shuffle the option order so the correct answer isn't always in the same
      // slot (true/false stays in its natural order). We remap the correct index.
      var disp = q.options.map(function (o, idx) { return { o: o, idx: idx }; });
      if (q.type !== "tf") disp = U.shuffle(disp);
      var correctPos = 0;
      disp.forEach(function (d, k) { if (d.idx === q.answer) correctPos = k; });
      var card = U.el("div", { class: "qcard" });
      card.appendChild(U.el("div", { class: "qmeta" }, [
        U.el("span", { class: "qtype", text: qTypeLabel(q) }),
        U.el("span", { class: "qcurve", title: "Difficulty", text: cur.dots + " " + cur.label }),
      ]));
      card.appendChild(U.el("h3", { class: "qtext", html: q.q }));
      var optsBox = U.el("div", { class: "opts" });
      var keys = "ABCDE";
      disp.forEach(function (d, k) {
        var btn = U.el("button", { class: "opt-btn" }, [U.el("span", { class: "key", text: keys[k] }), U.el("span", { class: "ot", html: d.o })]);
        btn.addEventListener("click", function () { pick(k, optsBox, q, card, disp, correctPos); });
        optsBox.appendChild(btn);
      });
      card.appendChild(optsBox);
      if (q.hint) {
        var hintWrap = U.el("div", { class: "hintbox" });
        hintWrap.appendChild(U.el("button", { class: "hint-reveal", text: "💡 Need a hint?", onclick: function () { hintWrap.innerHTML = "💡 " + q.hint; } }));
        card.appendChild(hintWrap);
      }
      cardSlot.innerHTML = ""; cardSlot.appendChild(card);
      U.glossify(card); scrollTop();
    }
    function pick(pos, optsBox, q, card, disp, correctPos) {
      if (locked) return; locked = true;
      var btns = optsBox.querySelectorAll(".opt-btn");
      btns.forEach(function (b, bi) {
        b.disabled = true;
        if (bi === correctPos) b.classList.add("correct");
        else if (bi === pos) b.classList.add("wrong");
        else b.classList.add("dim");
      });
      var ok = pos === correctPos;
      var dispOpts = disp.map(function (d) { return d.o; });
      answers.push({ q: q.q, picked: pos, correct: correctPos, ok: ok, options: dispOpts });
      var ex = U.el("div", { class: "explain" + (ok ? " ok" : "") });
      ex.innerHTML = "<b>" + (ok ? "Right! " : "Not quite — ") + "</b>" + (q.explain || "");
      card.appendChild(ex); U.glossify(ex);
      var next = U.el("button", { class: "btn accent next", text: (i === qs.length - 1 ? "See results →" : "Next →"),
        onclick: function () { i++; if (i < qs.length) renderQ(); else finish(); } });
      card.appendChild(next); next.focus();
    }
    function finish() {
      var correct = answers.filter(function (a) { return a.ok; }).length;
      var pct = Math.round(correct / qs.length * 100);
      bar.style.width = "100%"; label.textContent = "Done!";
      opts.onComplete && opts.onComplete(pct, answers);
      cardSlot.innerHTML = "";
      cardSlot.appendChild(resultScreen(pct, correct, qs.length, answers, opts));
    }
    renderQ();
    return wrap;
  }
  function qTypeLabel(q) { return q.type === "tf" ? "True or false" : q.type === "order" ? "Put in order" : "Multiple choice"; }

  function resultScreen(pct, correct, total, answers, opts) {
    var box = U.el("div", { class: "result" });
    var medal = pct >= 90 ? "🦉" : pct >= 70 ? "🏛️" : pct >= 50 ? "📜" : "🌱";
    var msg = pct >= 90 ? "Wise beyond your years!" : pct >= 70 ? "Well reasoned!" : pct >= 50 ? "Solid thinking!" : "Good start — read it back!";
    box.appendChild(U.el("div", { class: "medal", text: medal }));
    box.appendChild(U.el("h1", { text: msg }));
    box.appendChild(U.el("div", { class: "scorebig", text: pct + "%" }));
    box.appendChild(U.el("p", { class: "muted", text: "You got " + correct + " of " + total + " right." }));
    if (pct >= 70) U.confetti(120);
    var btns = U.el("div", { class: "row-btns" });
    btns.appendChild(U.el("button", { class: "btn ghost", text: "↻ Try again", onclick: function () { if (opts.retryHash) go(opts.retryHash); else location.reload(); } }));
    if (opts.continueHash) btns.appendChild(U.el("button", { class: "btn accent", html: opts.continueLabel || "Continue →", onclick: function () { go(opts.continueHash); } }));
    btns.appendChild(U.el("button", { class: "btn ghost", text: "Back to " + (opts.backLabel || "arc"), onclick: function () { go(opts.backHash); } }));
    box.appendChild(btns);
    var rev = U.el("div", { class: "review-list" });
    rev.appendChild(U.el("h3", { class: "center", text: "Review" }));
    answers.forEach(function (a, idx) {
      var it = U.el("div", { class: "review-item" + (a.ok ? " ok" : " miss") });
      it.appendChild(U.el("div", { class: "q", html: (idx + 1) + ". " + a.q }));
      var ans = U.el("div", { class: "a" });
      ans.innerHTML = "Answer: <b>" + a.options[a.correct] + "</b>";
      if (!a.ok) ans.innerHTML += "<br><span class='you'>You picked: " + a.options[a.picked] + "</span>";
      else ans.innerHTML += "<br><span class='you okk'>✓ You got it</span>";
      it.appendChild(ans); rev.appendChild(it);
    });
    box.appendChild(rev);
    U.glossify(box);
    return box;
  }

  /* ---------------- LESSON QUIZ ---------------- */
  function renderLessonQuiz(id) {
    var Lsn = C.lessons[id];
    if (!Lsn) return renderHome();
    var a = arcOf(Lsn);
    var idx = a.lessons.indexOf(id), nextLid = a.lessons[idx + 1];
    var body = U.el("div");
    body.appendChild(backbar(Lsn.title, "#/l/" + id));
    body.appendChild(runQuiz({
      questions: Lsn.quiz, kicker: a.name + " · Lesson " + Lsn.n, title: Lsn.title,
      backHash: "#/a/" + a.id, backLabel: a.name,
      retryHash: "#/q/" + id,
      continueHash: nextLid ? "#/l/" + nextLid : "#/a/" + a.id,
      continueLabel: nextLid ? "Next lesson →" : "Back to " + a.name,
      onComplete: function (pct) {
        var res = S.recordLesson(id, pct);
        celebrateMilestones();
        if (res.isPB && res.best > 0) setTimeout(function () { U.toast("New personal best: " + pct + "%!", "🌟"); }, 400);
        else if (res.firstTime) U.toast("Lesson read! +1 toward your " + a.badge.name + " mark", "✅");
      },
    }));
    page("<b>" + a.name + "</b> › Quiz", body);
  }

  /* ---------------- ARC REVIEW QUIZ (Hall of Names) ---------------- */
  function renderReview(arcId) {
    var a = C.arcs.filter(function (x) { return x.id === arcId; })[0];
    if (!a) return renderHome();
    var body = U.el("div");
    body.appendChild(backbar(a.name, "#/a/" + a.id));
    body.appendChild(runQuiz({
      questions: a.review, kicker: "Arc Review", title: a.name + " — the whole story",
      backHash: "#/a/" + a.id, backLabel: a.name, retryHash: "#/r/" + arcId,
      onComplete: function (pct) {
        var res = S.recordArcQuiz(arcId, pct, PASS);
        if (res.earnedNow) { U.confetti(170); U.toast("🦉 Hall of Names: " + a.badge.name + "!", "🦉"); }
        else if (pct >= PASS) U.toast("Passed again — nicely done!", "🎯");
        else U.toast("Score " + pct + "% — reach " + PASS + "% for the mark. You’ve got this!", "💪");
        celebrateMilestones();
      },
    }));
    page("<b>" + a.name + "</b> › Review", body);
  }

  function celebrateMilestones() {
    var t = S.totalsAcross(C.arcs);
    [4, 8, 12, 16].forEach(function (m) {
      if (t.lessonsDone >= m && S.milestoneOnce("lessons" + m)) {
        setTimeout(function () { U.confetti(120); U.toast("Milestone: " + m + " lessons read!", "🎉"); }, 600);
      }
    });
    if (t.badges === C.arcs.length && C.arcs.length > 0 && S.milestoneOnce("allArcs")) {
      setTimeout(function () { U.confetti(220); U.toast("Every arc mastered — Seeker of Wisdom! 🦉", "🏛️"); }, 800);
    }
  }

  /* ---------------- HALL OF NAMES / DASHBOARD ---------------- */
  function renderHall() {
    var body = U.el("div");
    body.appendChild(backbar("Home", "#/"));
    body.appendChild(U.el("h1", { class: "ss-page-h", text: "🦉 Hall of Names" }));
    var t = S.totalsAcross(C.arcs);

    var grid = U.el("div", { class: "dash-grid" }, [
      statCard(t.lessonsDone + "/" + t.lessonsTotal, "Lessons read"),
      statCard(t.pct + "%", "Overall progress"),
      statCard(S.liveStreak() + " 🔥", "Day streak (best " + S.load().streak.best + ")"),
      statCard(t.badges + "/" + C.arcs.length, "Arcs mastered"),
      statCard(S.personalBest() + "%", "Personal best quiz"),
      statCard(S.debatesSeenCount() + "", "Big questions explored"),
    ]);
    body.appendChild(grid);

    body.appendChild(U.el("h2", { class: "ss-sub-h", text: "Arc marks" }));
    var shelf = U.el("div", { class: "mark-shelf" });
    C.arcs.forEach(function (a) {
      var won = S.hasBadge(a.id);
      var coin = U.el("div", { class: "mark" + (won ? " won" : "") });
      coin.appendChild(U.el("div", { class: "mcoin", text: won ? a.badge.emoji : "🔒" }));
      coin.appendChild(U.el("div", { class: "mname", text: a.badge.name }));
      coin.appendChild(U.el("div", { class: "msub", text: won ? "Earned!" : "Locked" }));
      shelf.appendChild(coin);
    });
    body.appendChild(shelf);

    body.appendChild(U.el("div", { class: "coach-note" }, [
      U.el("div", { class: "cn-tag", text: "🪶 A thought" }),
      U.el("p", { html: "Every person in this hall got remembered for the same reason: they <b>asked a question no one else would</b>. The score isn’t the point — could you tell one of these stories to a friend tonight? That’s the real test." }),
    ]));

    var logs = S.log();
    if (logs.length) {
      body.appendChild(U.el("h2", { class: "ss-sub-h", text: "Recent" }));
      var list = U.el("div", { class: "lesson-list" });
      logs.slice(0, 8).forEach(function (e) {
        var name = e.kind === "review"
          ? (C.arcs.filter(function (a) { return a.id === e.id; })[0] || {}).name + " — Review"
          : (C.lessons[e.id] || {}).title || e.id;
        var row = U.el("div", { class: "lrow" });
        row.appendChild(U.el("div", { class: "lnum", text: e.score >= 70 ? "✓" : "•" }));
        var meta = U.el("div", { class: "lmeta" });
        meta.appendChild(U.el("h4", { text: name }));
        meta.appendChild(U.el("div", { class: "ltags" }, [U.el("span", { text: timeAgo(e.t) }), U.el("span", { text: "scored " + e.score + "%" })]));
        row.appendChild(meta); list.appendChild(row);
      });
      body.appendChild(list);
    }

    body.appendChild(U.el("div", { class: "reset-row" },
      U.el("button", { class: "btn ghost", text: "Reset this island’s progress", onclick: function () {
        if (confirm("Reset all Sun & the Sword progress on this device? This can’t be undone.")) { S.reset(); go("#/"); U.toast("Progress reset", "🔄"); }
      }})));
    page("<b>Hall of Names</b>", body);
  }
  function statCard(big, lbl) { return U.el("div", { class: "stat-card" }, [U.el("div", { class: "big", text: big }), U.el("div", { class: "lbl", text: lbl })]); }
  function timeAgo(t) {
    var s = (Date.now() - t) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s / 60) + " min ago";
    if (s < 86400) return Math.floor(s / 3600) + " hr ago";
    return Math.floor(s / 86400) + " day(s) ago";
  }

  /* ---------------- router entry (driven by main app.js) ---------------- */
  function init() {
    if (ready) return;
    U = SUNSWORD.UI; S = SUNSWORD.State; C = SUNSWORD.CONTENT;
    app = document.getElementById("app");
    ready = true;
  }
  function handle(parts) {
    init();
    if (typeof window !== "undefined") window.onscroll = null;
    parts = parts || [];
    var a = parts[0], b = parts[1];
    if (!a) return renderHome();
    if (a === "a" && b) return renderArc(b);
    if (a === "l" && b) return renderLesson(b);
    if (a === "q" && b) return renderLessonQuiz(b);
    if (a === "r" && b) return renderReview(b);
    if (a === "hall") return renderHall();
    return renderHome();
  }
  return { init: init, handle: handle };
})();
