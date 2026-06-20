/* ============================================================
   Basketball — "Hardwood" — Engine  [SUBJECT: hoops]
   Teaching-first: read the story / records / history, then quiz.
   Per-lesson quick-checks + a subsection review quiz (badge on
   pass) + a "Who's the GOAT?" argue-both-sides debate card.
   Plugs into the main app.js router under #/hoops/... — we never
   add our own hashchange listener, so subjects can't fight.
   ============================================================ */

window.HOOPS = window.HOOPS || {};

HOOPS.Engine = (function () {
  var U, S, C;
  var app;
  var PASS = 70;          // review-quiz pass mark -> Trophy Case badge
  var ready = false;

  function go(hash) {
    if (!hash || hash === "#/" || hash === "#") location.hash = "#/hoops";
    else location.hash = hash.replace(/^#\//, "#/hoops/");
  }
  function toCamp() { location.hash = "#/"; }
  function scrollTop() { try { window.scrollTo({ top: 0, behavior: "auto" }); } catch (e) {} }

  function normBtns(rootEl) {
    if (!rootEl || !rootEl.querySelectorAll) return;
    rootEl.querySelectorAll(".btn").forEach(function (b) {
      b.style.display = "inline-flex"; b.style.alignItems = "center"; b.style.justifyContent = "center";
      b.style.whiteSpace = "nowrap"; b.style.width = "auto"; b.style.height = "auto";
      if (!b.style.gap) b.style.gap = "8px";
    });
  }

  /* ---------------- shell ---------------- */
  function topbar(crumbs) {
    var bar = U.el("div", { class: "hw-topbar" });
    var row = U.el("div", { class: "hw-row" });
    var camp = U.el("button", { class: "iconbtn", "aria-label": "Back to Summer Camp map", title: "Back to Camp", text: "⛺", onclick: toCamp });
    var brand = U.el("button", { class: "hw-brand", onclick: function () { go("#/"); } }, [
      U.el("span", { class: "hw-logo", html: U.art("ball") }),
      U.el("span", { class: "hw-brandtext" }, [document.createTextNode("HARDWOOD"), U.el("small", { text: "Summer Camp · Basketball" })]),
    ]);
    var crumbNode = U.el("div", { class: "hw-crumbs", html: crumbs || "" });
    var streak = S.liveStreak();
    var streakChip = U.el("button", { class: "hw-chip", title: "Your day streak", onclick: function () { go("#/trophies"); } },
      [U.el("span", { class: "fire", text: "🔥" }), document.createTextNode(streak + "")]);
    var pbChip = U.el("button", { class: "hw-chip", title: "Personal best quiz score", onclick: function () { go("#/trophies"); } },
      [document.createTextNode("PB " + S.personalBest() + "%")]);
    var trophiesBtn = U.el("button", { class: "iconbtn", "aria-label": "Trophy Case", title: "Trophy Case", text: "🏆", onclick: function () { go("#/trophies"); } });
    row.appendChild(camp); row.appendChild(brand); row.appendChild(U.el("div", { class: "spacer" }));
    row.appendChild(crumbNode); row.appendChild(streakChip); row.appendChild(pbChip); row.appendChild(trophiesBtn);
    bar.appendChild(row);
    return bar;
  }
  function footer() {
    return U.el("div", { class: "hw-foot", html:
      "Summer Camp · <b>Hardwood</b> — the heart, the records, the history, the legends. " +
      "Real photos from Wikimedia Commons / public domain, with credits. Progress saved on this device. " +
      "<span style='opacity:.55'>· build v1.0 (2026-06-17)</span>" });
  }
  function page(crumbs, bodyNode) {
    var scope = U.el("div", { class: "hoops-scope" });
    scope.appendChild(U.el("div", { class: "hw-readbar", id: "hw-readbar", "aria-hidden": "true" }));
    scope.appendChild(topbar(crumbs));
    var main = U.el("div", { class: "hw-wrap", role: "main" });
    main.appendChild(bodyNode);
    U.glossify(main);
    scope.appendChild(main);
    scope.appendChild(footer());
    normBtns(scope);
    app.innerHTML = ""; app.appendChild(scope);
    scrollTop();
  }
  function backbar(label, hash) {
    return U.el("div", { class: "hw-backbar" }, U.el("button", { class: "hw-backbtn",
      onclick: function () { go(hash); }, html: "‹ " + label }));
  }

  /* ---------------- HOME ---------------- */
  function renderHome() {
    var body = U.el("div");
    var totals = S.totalsAcross(C.sections);

    // hero
    var hero = U.el("div", { class: "hw-hero" });
    hero.appendChild(U.el("div", { class: "hw-hero-art", html: U.art("hoop") }));
    var hc = U.el("div", { class: "hw-hero-copy" });
    hc.appendChild(U.el("div", { class: "hw-eyebrow", text: "THE GAME — HEART, RECORDS, HISTORY, LEGENDS" }));
    hc.appendChild(U.el("h1", { html: "Welcome to the <em>Hardwood</em>." }));
    hc.appendChild(U.el("p", { class: "hw-lede", html:
      "The greatest players weren't just gifted — they <b>worked</b>. Read their stories, learn the records that'll make your jaw drop, " +
      "see how the game was invented and transformed, then quiz yourself and stack up trophies." }));
    var stats = U.el("div", { class: "hw-herostats" }, [
      heroStat(totals.lessonsDone + "/" + totals.lessonsTotal, "lessons"),
      heroStat(totals.badges + "/" + C.sections.length, "trophies"),
      heroStat(S.liveStreak() + "🔥", "day streak"),
      heroStat(S.personalBest() + "%", "personal best"),
    ]);
    hc.appendChild(stats);
    var cta = U.el("div", { class: "hw-cta" }, [
      U.el("button", { class: "btn accent lg", text: resumeLabel(), onclick: function () { resume(); } }),
      U.el("button", { class: "btn ghost lg", text: "🏆 Trophy Case", onclick: function () { go("#/trophies"); } }),
    ]);
    hc.appendChild(cta);
    hc.appendChild(U.el("p", { class: "hw-next", text: nextCaption() }));
    hero.appendChild(hc);
    body.appendChild(hero);

    // California home-court strip
    var cal = U.el("div", { class: "hw-cal" });
    cal.appendChild(U.el("div", { class: "cal-flag", html: U.bearFlag() }));
    cal.appendChild(U.el("div", {}, [
      U.el("div", { class: "cal-h", text: "HOME COURT — CALIFORNIA" }),
      U.el("p", { html: "Your teams run through these pages: the <b>Golden State Warriors</b> (Stephen Curry & the Bay dynasty) and the <b>Los Angeles Lakers</b> (LeBron, Magic, Kareem, Kobe, Shaq). The stars you watch are the stars you'll study." }),
      U.el("div", { class: "cal-banners" }, [
        U.nodeFromHTML(U.teamBanner("#1D428A", "#FFC72C", "WARRIORS", "Bay Area")),
        U.nodeFromHTML(U.teamBanner("#552583", "#FDB927", "LAKERS", "Los Angeles")),
      ]),
    ]));
    body.appendChild(cal);

    // reading: what the Hardwood is about (overview prose, not just cards)
    if (C.intro && C.intro.length) {
      var about = U.el("div", { class: "hw-read" });
      C.intro.forEach(function (b) { about.appendChild(U.renderBeat(b)); });
      U.glossify(about);
      body.appendChild(about);
    }

    // subsection picker
    body.appendChild(U.el("div", { class: "hw-section-title" }, [
      U.el("h2", { text: "Pick where to start" }),
      U.el("span", { class: "hint", text: "Finish a subsection to earn its trophy. Start anywhere." }),
    ]));
    var grid = U.el("div", { class: "hw-sections" });
    C.sections.forEach(function (sec, i) {
      var unlocked = S.sectionUnlocked(C.sections, i);
      var prog = S.sectionProgress(sec);
      var won = S.hasBadge(sec.id);
      var card = U.el("div", { class: "sec-card" + (unlocked ? "" : " locked"), tabindex: "0", role: "button",
        "aria-label": sec.name,
        onclick: function () { if (unlocked) go("#/s/" + sec.id); else U.toast("Finish a lesson in " + C.sections[i - 1].name + " first", "🔒"); },
        onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
      var hd = U.el("div", { class: "sec-banner", style: "background:linear-gradient(135deg," + sec.color + "," + sec.color2 + ")" }, [
        U.el("span", { class: "sec-emoji", text: sec.emoji }),
        won ? U.el("span", { class: "sec-trophy", text: "🏆" }) : null,
      ]);
      card.appendChild(hd);
      var b = U.el("div", { class: "sec-body" });
      b.appendChild(U.el("div", { class: "sec-kicker", text: "SUBSECTION " + (i + 1) }));
      b.appendChild(U.el("h3", { text: sec.name }));
      b.appendChild(U.el("p", { class: "sec-blurb", text: sec.blurb }));
      var meter = U.el("div", { class: "hw-meter" }); meter.appendChild(U.el("i", { style: "width:" + prog.pct + "%" }));
      b.appendChild(meter);
      b.appendChild(U.el("div", { class: "hw-meter-label" }, [
        U.el("span", { text: prog.done + " / " + prog.total + " lessons" }),
        U.el("span", { text: won ? "🏆 " + sec.badge.name : prog.pct + "%" }),
      ]));
      card.appendChild(b);
      grid.appendChild(card);
    });
    body.appendChild(grid);
    page("", body);
  }
  function heroStat(big, lbl) { return U.el("div", { class: "hw-hstat" }, [U.el("b", { text: big }), U.el("span", { text: lbl })]); }
  function resumeLabel() {
    if (!nextLesson()) return "▶ Review the Hardwood";
    return S.totalsAcross(C.sections).lessonsDone > 0 ? "▶ Keep going" : "▶ Tip off";
  }
  function nextCaption() {
    var n = nextLesson();
    if (!n) return "You've finished every lesson — Hall of Fame work! 🏆";
    var sec = secOf(n);
    return "Next up: " + sec.name + " · " + n.title;
  }
  function nextLesson() {
    for (var i = 0; i < C.sections.length; i++) {
      var sec = C.sections[i];
      if (!S.sectionUnlocked(C.sections, i)) continue;
      for (var j = 0; j < sec.lessons.length; j++) {
        var lid = sec.lessons[j];
        if (!(S.lesson(lid) && S.lesson(lid).done)) return C.lessons[lid];
      }
    }
    return null;
  }
  function resume() { var n = nextLesson(); if (n) go("#/l/" + n.id); else go("#/s/" + C.sections[0].id); }
  function secOf(L) { return C.sections.filter(function (s) { return s.id === L.section; })[0]; }

  /* ---------------- SUBSECTION ---------------- */
  function renderSection(id) {
    var sec = C.sections.filter(function (s) { return s.id === id; })[0];
    if (!sec) return renderHome();
    var body = U.el("div");
    body.appendChild(backbar("All subsections", "#/"));

    var hero = U.el("div", { class: "sec-hero", style: "background:linear-gradient(120deg," + sec.color + "22," + sec.color2 + "11)" });
    hero.appendChild(U.el("div", { class: "sec-hero-emoji", text: sec.emoji }));
    var ht = U.el("div");
    ht.appendChild(U.el("div", { class: "hw-eyebrow", text: "HARDWOOD · SUBSECTION" }));
    ht.appendChild(U.el("h1", { text: sec.name }));
    ht.appendChild(U.el("p", { class: "hw-lede", html: sec.intro }));
    hero.appendChild(ht);
    body.appendChild(hero);

    // reading: a real overview of this subsection (prose, before the lesson list)
    if (sec.overview && sec.overview.length) {
      var ov = U.el("div", { class: "hw-read" });
      sec.overview.forEach(function (b) { ov.appendChild(U.renderBeat(b)); });
      U.glossify(ov);
      body.appendChild(ov);
    }

    var prog = S.sectionProgress(sec);
    var meter = U.el("div", { class: "hw-meter wide" }); meter.appendChild(U.el("i", { style: "width:" + prog.pct + "%" }));
    body.appendChild(meter);
    body.appendChild(U.el("div", { class: "hw-meter-label wide" }, [
      U.el("span", { text: prog.done + " of " + prog.total + " lessons complete" }),
      U.el("span", { text: prog.pct + "%" }),
    ]));

    var list = U.el("div", { class: "lesson-list" });
    sec.lessons.forEach(function (lid, idx) {
      var L = C.lessons[lid], rec = S.lesson(lid), unlocked = S.lessonUnlocked(sec, idx);
      var rowrec = rec && rec.done;
      var row = U.el("div", { class: "lrow" + (rowrec ? " done" : "") + (unlocked ? "" : " locked"), tabindex: "0", role: "button",
        onclick: function () { if (unlocked) go("#/l/" + lid); else U.toast("Finish the lesson above first", "🔒"); },
        onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
      row.appendChild(U.el("div", { class: "lnum", text: rowrec ? "✓" : (idx + 1) }));
      var meta = U.el("div", { class: "lmeta" });
      meta.appendChild(U.el("h4", { text: L.title }));
      meta.appendChild(U.el("div", { class: "ltags" }, [
        U.el("span", { text: "⏱ " + L.minutes + " min" }),
        U.el("span", { text: "📝 " + L.quiz.length + " questions" }),
        rowrec ? U.el("span", { class: "best", text: "★ best " + rec.best + "%" }) : (unlocked ? U.el("span", { text: "Tap to begin" }) : U.el("span", { text: "🔒 locked" })),
      ]));
      row.appendChild(meta);
      row.appendChild(U.el("div", { class: "lgo", text: unlocked ? "›" : "🔒" }));
      list.appendChild(row);
    });

    // review quiz row
    var rUnlocked = S.reviewUnlocked(sec);
    var rBest = S.sectionQuizBest(sec.id);
    var rRow = U.el("div", { class: "lrow review-row" + (rUnlocked ? "" : " locked"), tabindex: "0", role: "button",
      onclick: function () { if (rUnlocked) go("#/r/" + sec.id); else U.toast("Finish all " + sec.lessons.length + " lessons to unlock the review", "🔒"); },
      onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
    rRow.appendChild(U.el("div", { class: "lnum", text: S.hasBadge(sec.id) ? "🏆" : "★" }));
    var rMeta = U.el("div", { class: "lmeta" });
    rMeta.appendChild(U.el("h4", { text: sec.name + " — Review Quiz · win the " + sec.badge.name + " trophy" }));
    rMeta.appendChild(U.el("div", { class: "ltags" }, [
      U.el("span", { text: "📝 " + sec.review.length + " questions" }),
      U.el("span", { text: "🎯 pass " + PASS + "%" }),
      rBest ? U.el("span", { class: "best", text: "best " + rBest + "%" }) : U.el("span", { text: rUnlocked ? "ready!" : "🔒 locked" }),
    ]));
    rRow.appendChild(rMeta);
    rRow.appendChild(U.el("div", { class: "lgo", text: rUnlocked ? "›" : "🔒" }));
    list.appendChild(rRow);
    body.appendChild(list);

    // debate card (placed after lessons — argue both sides once you've explored)
    if (sec.debate) body.appendChild(debateCard(sec.debate));

    page("<b>" + sec.name + "</b>", body);
  }

  /* ---------------- DEBATE CARD (argue both sides) ---------------- */
  function debateCard(d) {
    var card = U.el("div", { class: "debate-card" });
    card.appendChild(U.el("div", { class: "dc-tag", text: "🗣️ " + (d.tag || "Big Debate — argue BOTH sides") }));
    card.appendChild(U.el("h3", { class: "dc-q", html: d.q }));
    if (d.setup) card.appendChild(U.el("p", { class: "dc-setup", html: d.setup }));
    var reveal = U.el("div", { class: "dc-reveal" });
    var mk = function (side, label, cls) {
      return U.el("button", { class: "btn ghost dc-side " + cls, html: label, onclick: function () {
        S.seeDebate(d.id);
        reveal.innerHTML = "<div class='dc-arg " + cls + "'><div class='dc-arg-h'>" + side.h + "</div>" + side.body + "</div>";
      }});
    };
    card.appendChild(U.el("div", { class: "dc-btns" }, [
      mk(d.a, "👉 " + d.a.label, "side-a"),
      mk(d.b, "👉 " + d.b.label, "side-b"),
    ]));
    card.appendChild(reveal);
    card.appendChild(U.el("p", { class: "dc-foot", text: "There's no single right answer — making the strongest case for each side is exactly what great thinkers (and great debaters) do." }));
    return card;
  }

  /* ---------------- LESSON PLAYER ---------------- */
  function renderLesson(id) {
    var L = C.lessons[id];
    if (!L) return renderHome();
    var sec = secOf(L);
    var body = U.el("div");
    body.appendChild(backbar(sec.name, "#/s/" + sec.id));

    var reader = U.el("div", { class: "reader" });
    reader.appendChild(U.el("div", { class: "rkicker", text: sec.name + " · Lesson " + L.n }));
    reader.appendChild(U.el("h1", { class: "rtitle", text: L.title }));
    reader.appendChild(U.el("div", { class: "rbyline", text: "⏱ about " + L.minutes + " min · then a quick check" }));
    reader.appendChild(U.el("div", { class: "rwordcount top", text: "📖 " + lessonWordCount(L).toLocaleString() + " words" }));
    if (L.hook) reader.appendChild(U.nodeFromHTML('<div class="beat in"><div class="rhook">' + L.hook + '</div></div>'));
    L.beats.forEach(function (b) { reader.appendChild(U.renderBeat(b)); });

    var cta = U.el("div", { class: "beat rcta" });
    var wc = lessonWordCount(L);
    cta.appendChild(U.el("div", { class: "rwordcount", text: "📖 " + wc.toLocaleString() + " words · ~" + L.minutes + " min lesson (read + quiz)" }));
    cta.appendChild(U.el("p", { class: "muted", text: "Lock it in — run the quick check:" }));
    cta.appendChild(U.el("button", { class: "btn accent lg", text: "Take the quiz →", onclick: function () { go("#/q/" + id); } }));
    reader.appendChild(cta);

    body.appendChild(reader);
    page("<b>" + sec.name + "</b> › " + L.title, body);
    U.observeBeats(reader);
    setupReadbar();
  }
  // Count the reading words in a lesson (hook + prose beats), for the on-page word-count line.
  function lessonWordCount(L) {
    function words(s) { return String(s || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length; }
    var n = words(L.hook);
    (L.beats || []).forEach(function (b) {
      n += words(b.html) + words(b.note) + words(b.label);
      if (b.stats) b.stats.forEach(function (s) { n += words((s.v || "") + " " + (s.k || "")); });
      ["a", "b"].forEach(function (k) { if (b[k]) { n += words(b[k].title) + words(b[k].body); if (b[k].items) b[k].items.forEach(function (it) { n += words(it); }); } });
      if (b.items) b.items.forEach(function (it) { n += words(it.label || it); });
    });
    return n;
  }
  function setupReadbar() {
    var bar = document.getElementById("hw-readbar");
    if (!bar) return;
    function upd() { var h = document.documentElement, max = h.scrollHeight - h.clientHeight; bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%"; }
    window.onscroll = upd; upd();
  }

  /* ---------------- QUIZ RUNNER (shared) ---------------- */
  function runQuiz(opts) {
    var qs = opts.questions, i = 0, answers = [], locked = false, startT = Date.now();
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
      var q = qs[i];
      var card = U.el("div", { class: "qcard" });
      card.appendChild(U.el("div", { class: "qtype", text: qTypeLabel(q) }));
      card.appendChild(U.el("h3", { class: "qtext", html: q.q }));
      if (q.image) card.appendChild(U.renderBeat({ t: "photo", file: q.image.file, caption: q.image.caption, credit: q.image.credit, fallback: q.image.fallback || "court" }));
      var optsBox = U.el("div", { class: "opts" });
      var keys = "ABCDE";
      q.options.forEach(function (opt, oi) {
        var btn = U.el("button", { class: "opt-btn" }, [U.el("span", { class: "key", text: keys[oi] }), U.el("span", { class: "ot", html: opt })]);
        btn.addEventListener("click", function () { pick(oi, card, optsBox, q); });
        optsBox.appendChild(btn);
      });
      card.appendChild(optsBox);
      var foot = U.el("div", { class: "quiz-foot" });
      var hintWrap = U.el("div", { class: "hintbox" });
      if (q.hint) hintWrap.appendChild(U.el("button", { class: "hint-reveal", text: "💡 Need a hint?", onclick: function () { hintWrap.innerHTML = "💡 " + q.hint; } }));
      foot.appendChild(hintWrap);
      card.appendChild(foot);
      cardSlot.innerHTML = ""; cardSlot.appendChild(card);
      U.glossify(card); normBtns(card); scrollTop();
    }
    function pick(oi, card, optsBox, q) {
      if (locked) return; locked = true;
      var correct = q.answer, btns = optsBox.querySelectorAll(".opt-btn");
      btns.forEach(function (b, bi) {
        b.disabled = true;
        if (bi === correct) b.classList.add("correct");
        else if (bi === oi) b.classList.add("wrong");
        else b.classList.add("dim");
      });
      var ok = oi === correct;
      answers.push({ q: q.q, picked: oi, correct: correct, ok: ok, options: q.options });
      var ex = U.el("div", { class: "explain" + (ok ? " ok" : "") });
      ex.innerHTML = "<b>" + (ok ? "Bucket! " : "No worries — ") + "</b>" + (q.explain || "");
      card.appendChild(ex); U.glossify(ex);
      var next = U.el("button", { class: "btn accent next", text: (i === qs.length - 1 ? "See results →" : "Next →"),
        onclick: function () { i++; if (i < qs.length) renderQ(); else finish(); } });
      card.appendChild(next); normBtns(card); next.focus();
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
  function qTypeLabel(q) { return q.type === "tf" ? "True or false" : q.type === "image" ? "Who / what is this?" : q.type === "order" ? "Which came first?" : "Multiple choice"; }

  function resultScreen(pct, correct, total, answers, opts) {
    var box = U.el("div", { class: "result" });
    var medal = pct >= 90 ? "🏆" : pct >= 70 ? "🥇" : pct >= 50 ? "🥈" : "🌱";
    var msg = pct >= 90 ? "Unstoppable!" : pct >= 70 ? "Great work!" : pct >= 50 ? "Solid effort!" : "Good start — run it back!";
    box.appendChild(U.el("div", { class: "medal", text: medal }));
    box.appendChild(U.el("h1", { text: msg }));
    box.appendChild(U.el("div", { class: "scorebig", text: pct + "%" }));
    box.appendChild(U.el("p", { class: "muted", text: "You got " + correct + " of " + total + " right." }));
    if (pct >= 70) U.confetti(120);
    var btns = U.el("div", { class: "row-btns" });
    btns.appendChild(U.el("button", { class: "btn ghost", text: "↻ Try again", onclick: function () { if (opts.retryHash) go(opts.retryHash); else location.reload(); } }));
    if (opts.continueHash) btns.appendChild(U.el("button", { class: "btn accent", html: opts.continueLabel || "Continue →", onclick: function () { go(opts.continueHash); } }));
    btns.appendChild(U.el("button", { class: "btn ghost", text: "Back to " + (opts.backLabel || "subsection"), onclick: function () { go(opts.backHash); } }));
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
    U.glossify(box); normBtns(box);
    return box;
  }

  /* ---------------- LESSON QUIZ ---------------- */
  function renderLessonQuiz(id) {
    var L = C.lessons[id];
    if (!L) return renderHome();
    var sec = secOf(L);
    var idx = sec.lessons.indexOf(id), nextLid = sec.lessons[idx + 1];
    var body = U.el("div");
    body.appendChild(backbar(L.title, "#/l/" + id));
    body.appendChild(runQuiz({
      questions: L.quiz, kicker: sec.name + " · Lesson " + L.n, title: L.title,
      backHash: "#/s/" + sec.id, backLabel: sec.name,
      retryHash: "#/q/" + id,
      continueHash: nextLid ? "#/l/" + nextLid : "#/s/" + sec.id,
      continueLabel: nextLid ? "Next lesson →" : "Back to " + sec.name,
      onComplete: function (pct, answers) {
        var res = S.recordLesson(id, pct);
        celebrateMilestones();
        if (res.isPB && res.best > 0) setTimeout(function () { U.toast("New personal best: " + pct + "%!", "🌟"); }, 400);
        else if (res.firstTime) U.toast("Lesson done! +1 toward your " + sec.badge.name + " trophy", "✅");
      },
    }));
    page("<b>" + sec.name + "</b> › Quiz", body);
  }

  /* ---------------- REVIEW QUIZ (badge) ---------------- */
  function renderReview(secId) {
    var sec = C.sections.filter(function (s) { return s.id === secId; })[0];
    if (!sec) return renderHome();
    var body = U.el("div");
    body.appendChild(backbar(sec.name, "#/s/" + sec.id));
    body.appendChild(runQuiz({
      questions: sec.review, kicker: "Review Quiz", title: sec.name + " — the whole story",
      backHash: "#/s/" + sec.id, backLabel: sec.name, retryHash: "#/r/" + secId,
      onComplete: function (pct) {
        var res = S.recordSectionQuiz(secId, pct, PASS);
        if (res.earnedNow) { U.confetti(170); U.toast("🏆 Trophy earned: " + sec.badge.name + "!", "🏆"); }
        else if (pct >= PASS) U.toast("Passed again — nice!", "🎯");
        else U.toast("Score " + pct + "% — reach " + PASS + "% for the trophy. You've got this!", "💪");
        celebrateMilestones();
      },
    }));
    page("<b>" + sec.name + "</b> › Review", body);
  }

  function celebrateMilestones() {
    var t = S.totalsAcross(C.sections);
    [5, 10, 15, 20].forEach(function (m) {
      if (t.lessonsDone >= m && S.milestoneOnce("lessons" + m)) {
        setTimeout(function () { U.confetti(120); U.toast("Milestone: " + m + " lessons down!", "🎉"); }, 600);
      }
    });
    if (t.badges === C.sections.length && S.milestoneOnce("allTrophies")) {
      setTimeout(function () { U.confetti(220); U.toast("Every trophy won — you're in the Hall of Fame! 🏛️", "🏆"); }, 800);
    }
  }

  /* ---------------- TROPHY CASE / DASHBOARD ---------------- */
  function renderTrophies() {
    var body = U.el("div");
    body.appendChild(backbar("Home", "#/"));
    body.appendChild(U.el("h1", { class: "hw-page-h", text: "🏆 Trophy Case" }));
    var t = S.totalsAcross(C.sections), best = S.bestScoreLesson();

    var grid = U.el("div", { class: "dash-grid" }, [
      statCard(t.lessonsDone + "/" + t.lessonsTotal, "Lessons completed"),
      statCard(t.pct + "%", "Overall progress"),
      statCard(S.liveStreak() + " 🔥", "Day streak (best " + S.load().streak.best + ")"),
      statCard(t.badges + "/" + C.sections.length, "Trophies won"),
      statCard(S.personalBest() + "%", "Personal best quiz"),
      statCard(S.debatesSeenCount() + "", "Debates explored"),
    ]);
    body.appendChild(grid);

    body.appendChild(U.el("h2", { class: "hw-sub-h", text: "The trophies" }));
    var shelf = U.el("div", { class: "trophy-shelf" });
    C.sections.forEach(function (sec) {
      var won = S.hasBadge(sec.id);
      var coin = U.el("div", { class: "trophy" + (won ? " won" : "") });
      coin.appendChild(U.el("div", { class: "tcoin", text: won ? "🏆" : "🔒" }));
      coin.appendChild(U.el("div", { class: "tname", text: sec.badge.name }));
      coin.appendChild(U.el("div", { class: "tsub", text: won ? "Earned!" : "Locked" }));
      shelf.appendChild(coin);
    });
    body.appendChild(shelf);

    // effort-framed coach note
    body.appendChild(U.el("div", { class: "coach-note" }, [
      U.el("div", { class: "cn-tag", text: "🎯 Coach's note" }),
      U.el("p", { html: "Every player you studied got there the same way: <b>reps</b>. The score isn't the point — coming back and running it again is. Could you explain one story you learned to a friend? Teaching it back is the best rep of all." }),
    ]));

    // recent activity
    var logs = S.log();
    if (logs.length) {
      body.appendChild(U.el("h2", { class: "hw-sub-h", text: "Recent activity" }));
      var list = U.el("div", { class: "lesson-list" });
      logs.slice(0, 8).forEach(function (e) {
        var name = e.kind === "review"
          ? (C.sections.filter(function (s) { return s.id === e.id; })[0] || {}).name + " — Review"
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
      U.el("button", { class: "btn ghost", text: "Reset Basketball progress", onclick: function () {
        if (confirm("Reset all Basketball (Hardwood) progress on this device? This can't be undone.")) { S.reset(); go("#/"); U.toast("Progress reset", "🔄"); }
      }})));
    page("<b>Trophy Case</b>", body);
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
    U = HOOPS.UI; S = HOOPS.State; C = HOOPS.CONTENT;
    app = document.getElementById("app");
    ready = true;
  }
  function handle(parts) {
    init();
    if (typeof window !== "undefined") window.onscroll = null;
    parts = parts || [];
    var a = parts[0], b = parts[1];
    if (!a) return renderHome();
    if (a === "s" && b) return renderSection(b);
    if (a === "l" && b) return renderLesson(b);
    if (a === "q" && b) return renderLessonQuiz(b);
    if (a === "r" && b) return renderReview(b);
    if (a === "trophies") return renderTrophies();
    return renderHome();
  }
  return { init: init, handle: handle };
})();
