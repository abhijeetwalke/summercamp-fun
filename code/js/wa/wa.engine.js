/* ============================================================
   World Awareness — Engine  [SUBJECT: world]
   Hash routing, landing map, lesson player, quiz runner,
   section quizzes, dashboard, country atlas.
   Teaching-first: lesson -> quiz. Per-lesson quizzes + a
   section quiz per continent (badge on pass).
   ============================================================ */

window.WA = window.WA || {};

WA.Engine = (function () {
  var U, S, C;
  var app;
  var PASS = 70;             // section-quiz pass mark -> badge
  var LESSON_PASS = 60;      // lesson quiz "passed" mark (still completes the lesson either way)

  /* This subject plugs into the main site's router. All WA routes live under
     #/world/...  go() translates a local hash ("#/c/europe") to "#/world/c/europe";
     the main app.js router catches the hashchange and calls WA.Engine.handle(). */
  function go(hash) {
    if (!hash || hash === "#/" || hash === "#") location.hash = "#/world";
    else location.hash = hash.replace(/^#\//, "#/world/");
  }
  function toCamp() { location.hash = "#/"; }   // back to the landing map
  function scrollTop() { try { window.scrollTo({ top: 0, behavior: "auto" }); } catch (e) {} }

  /* ---------------- top bar ---------------- */
  function topbar(crumbs) {
    var p = S.profile();
    var bar = U.el("div", { class: "topbar" });
    var row = U.el("div", { class: "row wrap" });

    var camp = U.el("button", { class: "iconbtn", "aria-label": "Back to Summer Camp map", title: "Back to Camp", text: "⛺", onclick: toCamp });

    var brand = U.el("button", { class: "brand", onclick: function () { go("#/"); } }, [
      U.nodeFromHTML(U.art("globe")),
      U.el("span", {}, [document.createTextNode("World Awareness"), U.el("small", { text: "Summer Camp" })]),
    ]);
    brand.querySelector("svg") && brand.querySelector("svg").classList.add("globe");

    var crumbNode = U.el("div", { class: "crumbs spacer", html: crumbs || "" });

    var streak = S.liveStreak();
    var streakChip = U.el("button", { class: "streak-chip", title: "Your learning streak", onclick: function () { go("#/dash"); } },
      [U.el("span", { class: "flame", text: "🔥" }), document.createTextNode(streak + " day" + (streak === 1 ? "" : "s"))]);

    var themeBtn = U.el("button", { class: "iconbtn", "aria-label": "Toggle dark mode", title: "Light / dark",
      text: p.theme === "dark" ? "☀️" : "🌙", onclick: function () {
        var scope = document.querySelector(".wa-scope");
        var dark = scope ? scope.classList.toggle("wa-dark") : false;
        S.setProfile({ theme: dark ? "dark" : "light" });
        themeBtn.textContent = dark ? "☀️" : "🌙";
      }});
    var dashBtn = U.el("button", { class: "iconbtn", "aria-label": "Dashboard", title: "Your progress", text: "📊", onclick: function () { go("#/dash"); } });
    var atlasBtn = U.el("button", { class: "iconbtn", "aria-label": "Country atlas", title: "Country atlas", text: "🗺️", onclick: function () { go("#/atlas"); } });

    row.appendChild(camp); row.appendChild(brand); row.appendChild(crumbNode);
    row.appendChild(streakChip); row.appendChild(atlasBtn); row.appendChild(dashBtn); row.appendChild(themeBtn);
    bar.appendChild(row);
    return bar;
  }

  function footer() {
    return U.el("div", { class: "foot wrap", html:
      "Summer Camp · World Awareness — a journey across continents. " +
      "Built clean, positive, and apolitical. Your progress is saved on this device." });
  }

  /* Everything WA renders is wrapped in .wa-scope so its design system is fully
     isolated from the Math app. Dark theme is a class on that wrapper. */
  function page(crumbs, bodyNode) {
    var scope = U.el("div", { class: "wa-scope" + (S.profile().theme === "dark" ? " wa-dark" : "") });
    scope.appendChild(U.el("div", { class: "wa-readbar", id: "wa-readbar", "aria-hidden": "true" }));
    scope.appendChild(topbar(crumbs));
    var main = U.el("div", { class: "wrap", role: "main" });
    main.appendChild(bodyNode);
    scope.appendChild(main);
    scope.appendChild(footer());
    // Belt-and-suspenders: force the critical layout props on EVERY button so text
    // always sits centered inside the pill and can never spill out — even if a stale
    // cached stylesheet is in play. (Set per-property so we don't clobber a button's
    // own inline sizing like the hero pills' min-width.)
    scope.querySelectorAll(".btn").forEach(function (b) {
      b.style.display = "inline-flex";
      b.style.alignItems = "center";
      b.style.justifyContent = "center";
      b.style.whiteSpace = "nowrap";
      if (!b.style.gap) b.style.gap = "8px";
    });
    app.innerHTML = "";
    app.appendChild(scope);
    scrollTop();
  }

  /* ---------------- HOME ---------------- */
  function renderHome() {
    var body = U.el("div");

    // hero
    var totals = S.totalsAcross(C.continents);
    var hero = U.el("div", { class: "hero" });
    hero.appendChild(U.el("div", { class: "hero-eyebrow", text: "An explorer's journey through human history" }));
    hero.appendChild(U.el("h1", { html: "Discover what <em>mattered</em> — across every continent." }));
    hero.appendChild(U.el("p", { class: "lede", html:
      "Forty bite-sized, interactive lessons. Watch history come alive, then test what you learned. " +
      "Why did it happen? What changed? And why does it still matter today?" }));
    var stats = U.el("div", { class: "hero-stats" }, [
      heroStat(totals.lessonsDone + "/" + totals.lessonsTotal, "lessons done"),
      heroStat(totals.badges + "/" + C.continents.length, "badges earned"),
      heroStat(S.liveStreak() + "🔥", "day streak"),
    ]);
    hero.appendChild(stats);
    // Layout-critical styles are set INLINE (not just in wa.css) so the pills
    // render correctly even if a cached stylesheet is in play. Inline-block +
    // nowrap = each pill sizes to its own text and can never overlap.
    var pillStyle = "display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;vertical-align:middle;text-align:center;box-sizing:border-box;min-width:210px;font-size:1rem;padding:17px 36px;margin:0 14px 12px 0;line-height:1.1";
    var cta = U.el("div", { style: "margin-top:22px" }, [
      U.el("button", { class: "btn lg", style: pillStyle, text: resumeLabel(), onclick: function () { resume(); } }),
      U.el("button", { class: "btn ghost lg", style: pillStyle, text: "🗺️ Country atlas", onclick: function () { go("#/atlas"); } }),
      U.el("button", { class: "btn ghost lg", style: pillStyle, text: "🌐 Geography drill", onclick: function () { go("#/drill"); } }),
    ]);
    hero.appendChild(cta);
    hero.appendChild(U.el("p", { class: "muted", style: "margin:12px 0 0;font-size:.95rem", text: nextLessonCaption() }));
    body.appendChild(hero);

    // continent picker
    body.appendChild(U.el("div", { class: "section-title" }, [
      U.el("h2", { text: "Pick your path" }),
      U.el("span", { class: "hint", text: "Start anywhere — finish a continent to earn its badge." }),
    ]));

    var grid = U.el("div", { class: "continents" });
    C.continents.forEach(function (cont, i) {
      var unlocked = S.continentUnlocked(C.continents, i);
      var prog = S.continentProgress(cont);
      var hasBadge = S.hasBadge(cont.id);
      var card = U.el("div", { class: "cont-card" + (unlocked ? "" : " locked"),
        tabindex: "0", role: "button", "aria-label": cont.name,
        onclick: function () { if (unlocked) go("#/c/" + cont.id); else U.toast("Finish a lesson in " + C.continents[i - 1].name + " to unlock this", "🔒"); },
        onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
      var banner = U.el("div", { class: "banner" });
      banner.innerHTML = U.banner(cont.color, cont.emoji);
      banner.appendChild(U.el("span", { class: "emoji", text: cont.emoji }));
      card.appendChild(banner);
      if (hasBadge) card.appendChild(U.el("div", { class: "badge-won", text: "🏅 " + cont.badge.name }));
      else if (!unlocked) card.appendChild(U.el("div", { class: "lock", text: "🔒 Locked" }));
      var b = U.el("div", { class: "body" });
      b.appendChild(U.el("h3", { text: cont.name }));
      b.appendChild(U.el("div", { class: "sub", text: cont.lessons.length + " lessons · " + cont.blurb }));
      var meter = U.el("div", { class: "meter" });
      meter.appendChild(U.el("i", { style: "width:" + prog.pct + "%;background:" + cont.color }));
      b.appendChild(meter);
      b.appendChild(U.el("div", { class: "meter-label" }, [
        U.el("span", { text: prog.done + " / " + prog.total + " done" }),
        U.el("span", { text: prog.pct + "%" }),
      ]));
      card.appendChild(b);
      grid.appendChild(card);
    });
    body.appendChild(grid);

    page("", body);
  }
  function heroStat(big, lbl) { return U.el("div", { class: "hero-stat" }, [U.el("b", { text: big }), U.el("span", { text: lbl })]); }

  function resumeLabel() {
    if (!nextLesson()) return "▶ Review your journey";
    return S.totalsAcross(C.continents).lessonsDone > 0 ? "▶ Keep exploring" : "▶ Start exploring";
  }
  function nextLessonCaption() {
    var n = nextLesson();
    if (!n) return "You've completed every lesson — incredible work! 🎉";
    var cont = C.continents.filter(function (c) { return c.id === n.continent; })[0];
    return "Next up: " + cont.name + " · " + n.title;
  }
  function nextLesson() {
    for (var i = 0; i < C.continents.length; i++) {
      var cont = C.continents[i];
      if (!S.continentUnlocked(C.continents, i)) continue;
      for (var j = 0; j < cont.lessons.length; j++) {
        var lid = cont.lessons[j];
        if (!(S.lesson(lid) && S.lesson(lid).done)) return C.lessons[lid];
      }
    }
    return null;
  }
  function resume() { var n = nextLesson(); if (n) go("#/l/" + n.id); else go("#/c/" + C.continents[0].id); }

  /* ---------------- CONTINENT ---------------- */
  function renderContinent(id) {
    var cont = C.continents.filter(function (c) { return c.id === id; })[0];
    if (!cont) return renderHome();
    var body = U.el("div");
    body.appendChild(backbar("All continents", "#/"));

    var hero = U.el("div", { class: "cont-hero" });
    hero.appendChild(U.el("div", { class: "big-emoji", text: cont.emoji }));
    var htxt = U.el("div");
    htxt.appendChild(U.el("h1", { text: cont.name }));
    htxt.appendChild(U.el("p", { text: cont.intro || cont.blurb }));
    hero.appendChild(htxt);
    body.appendChild(hero);

    var prog = S.continentProgress(cont);
    var pmeter = U.el("div", { class: "meter", style: "max-width:340px;margin:18px 0 0" });
    pmeter.appendChild(U.el("i", { style: "width:" + prog.pct + "%;background:" + cont.color }));
    body.appendChild(pmeter);
    body.appendChild(U.el("div", { class: "meter-label", style: "max-width:340px" }, [
      U.el("span", { text: prog.done + " of " + prog.total + " lessons complete" }),
      U.el("span", { text: prog.pct + "%" }),
    ]));

    var list = U.el("div", { class: "lesson-list" });
    cont.lessons.forEach(function (lid, idx) {
      var L = C.lessons[lid];
      var rec = S.lesson(lid);
      var unlocked = S.lessonUnlocked(cont, idx);
      var row = U.el("div", { class: "lrow" + (rec && rec.done ? " done" : "") + (unlocked ? "" : " locked"),
        tabindex: "0", role: "button",
        onclick: function () { if (unlocked) go("#/l/" + lid); else U.toast("Finish the lesson above first", "🔒"); },
        onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
      row.appendChild(U.el("div", { class: "num", text: (rec && rec.done) ? "✓" : (idx + 1) }));
      var meta = U.el("div", { class: "meta" });
      meta.appendChild(U.el("h4", { text: L.title }));
      meta.appendChild(U.el("div", { class: "tags" }, [
        U.el("span", { text: "⏱ " + L.minutes + " min" }),
        U.el("span", { text: "📝 " + L.quiz.length + " questions" }),
        rec && rec.done ? U.el("span", { text: "✓ best " + rec.best + "%" }) : (unlocked ? U.el("span", { text: "Tap to begin" }) : U.el("span", { text: "🔒 locked" })),
      ]));
      row.appendChild(meta);
      row.appendChild(U.el("div", { class: "go", text: unlocked ? "›" : "🔒" }));
      list.appendChild(row);
    });

    // section quiz row
    var sqUnlocked = S.sectionQuizUnlocked(cont);
    var sqBest = (S.load().sections[cont.id] || {}).quizBest || 0;
    var sqRow = U.el("div", { class: "lrow section-quiz-row" + (sqUnlocked ? "" : " locked"),
      tabindex: "0", role: "button",
      onclick: function () { if (sqUnlocked) go("#/sq/" + cont.id); else U.toast("Finish all " + cont.lessons.length + " lessons to unlock the section quiz", "🔒"); },
      onkeydown: function (e) { if (e.key === "Enter") this.click(); } });
    sqRow.appendChild(U.el("div", { class: "num", text: S.hasBadge(cont.id) ? "🏅" : "★" }));
    var sqMeta = U.el("div", { class: "meta" });
    sqMeta.appendChild(U.el("h4", { text: cont.name + " Section Quiz — earn the " + cont.badge.name + " badge" }));
    sqMeta.appendChild(U.el("div", { class: "tags" }, [
      U.el("span", { text: "📝 " + cont.sectionQuiz.length + " questions" }),
      U.el("span", { text: "🎯 pass " + PASS + "%" }),
      sqBest ? U.el("span", { text: "best " + sqBest + "%" }) : U.el("span", { text: sqUnlocked ? "ready!" : "🔒 locked" }),
    ]));
    sqRow.appendChild(sqMeta);
    sqRow.appendChild(U.el("div", { class: "go", text: sqUnlocked ? "›" : "🔒" }));
    list.appendChild(sqRow);

    body.appendChild(list);

    // WSC-style "Big Question" — placed AFTER the lessons, as a culminating
    // debate once the learner has actually explored the material.
    var bq = C.bigQuestions && C.bigQuestions[cont.id];
    if (bq) {
      var card = U.el("div", { class: "modern", style: "margin:26px 0 6px" });
      card.appendChild(U.el("div", { class: "tag", text: "🗣️ Big Question — now that you've explored, argue BOTH sides" }));
      card.appendChild(U.el("p", { style: "margin:.3em 0 12px;font-weight:700;font-size:1.08rem", text: bq.q }));
      var reveal = U.el("div");
      var mkSide = function (which, color, label) {
        return U.el("button", { class: "btn ghost", style: "margin:0 10px 8px 0",
          text: label, onclick: function () {
            reveal.innerHTML = "<div style='padding:11px 15px;border-left:3px solid " + color + ";background:var(--paper-2);border-radius:0 10px 10px 0'>" + (which === "a" ? bq.a : bq.b) + "</div>";
          } });
      };
      card.appendChild(mkSide("a", "var(--navy-2)", "👉 One side"));
      card.appendChild(mkSide("b", "var(--crimson)", "👉 The other side"));
      card.appendChild(reveal);
      card.appendChild(U.el("p", { class: "muted", style: "font-size:.85rem;margin:10px 0 0", text: "There's no \"right\" answer — making the case for each side is exactly what debaters do." }));
      body.appendChild(card);
    }

    page("<b>" + cont.name + "</b>", body);
  }

  function backbar(label, hash) {
    return U.el("div", { class: "backbar" }, U.el("button", { class: "backbtn",
      onclick: function () { go(hash); }, html: "‹ " + label }));
  }

  /* ---------------- LESSON PLAYER ---------------- */
  function renderLesson(id) {
    var L = C.lessons[id];
    if (!L) return renderHome();
    var cont = C.continents.filter(function (c) { return c.id === L.continent; })[0];
    var body = U.el("div");
    body.appendChild(backbar(cont.name, "#/c/" + cont.id));

    var reader = U.el("div", { class: "reader" });
    reader.appendChild(U.el("div", { class: "kicker", text: cont.name + " · Lesson " + L.n }));
    reader.appendChild(U.el("h1", { class: "title", text: L.title }));
    reader.appendChild(U.el("div", { class: "byline", text: "⏱ about " + L.minutes + " minutes · then a quick quiz" }));

    if (L.hook) reader.appendChild(U.nodeFromHTML('<div class="beat in"><div class="hook">' + L.hook + '</div></div>'));

    L.beats.forEach(function (b) { reader.appendChild(U.renderBeat(b)); });

    // end CTA
    var cta = U.el("div", { class: "beat", style: "text-align:center;margin-top:40px" });
    cta.appendChild(U.el("p", { class: "muted", text: "Ready to lock it in?" }));
    cta.appendChild(U.el("button", { class: "btn gold lg", text: "Take the quiz →", onclick: function () { go("#/q/" + id); } }));
    reader.appendChild(cta);

    body.appendChild(reader);
    page("<b>" + cont.name + "</b> › " + L.title, body);

    U.observeBeats(reader);
    setupReadbar();
  }

  function setupReadbar() {
    var bar = document.getElementById("wa-readbar");
    if (!bar) return;
    function upd() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    window.onscroll = upd; upd();
  }

  /* ---------------- QUIZ RUNNER (shared) ---------------- */
  function runQuiz(opts) {
    // opts: { questions, title, kicker, onComplete(pct, answers, secs), backHash, timed, retryHash }
    var qs = opts.questions, i = 0, answers = [], locked = false;
    var startT = Date.now(), timerInt = null, timerEl = null;
    var wrap = U.el("div", { class: "quiz-wrap" });
    var top = U.el("div", { class: "quiz-top" });
    var prog = U.el("div", { class: "qprog" }); var bar = U.el("i"); prog.appendChild(bar);
    var label = U.el("div", { class: "qprog-label" });
    top.appendChild(prog); top.appendChild(label);
    if (opts.timed) {
      timerEl = U.el("div", { class: "qtimer", title: "Time (just for fun — no pressure!)", text: "0:00",
        style: "font-weight:800;color:var(--gold-deep);white-space:nowrap;font-size:.95rem" });
      top.appendChild(timerEl);
      timerInt = setInterval(function () {
        if (!document.body.contains(wrap)) { clearInterval(timerInt); return; } // stop if navigated away
        var s = Math.floor((Date.now() - startT) / 1000);
        timerEl.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
      }, 1000);
    }
    var cardSlot = U.el("div");
    wrap.appendChild(U.el("div", { class: "kicker", style: "text-align:center", text: opts.kicker || "Quiz" }));
    wrap.appendChild(U.el("h2", { class: "center", style: "margin:.1em 0 14px", text: opts.title || "" }));
    wrap.appendChild(top); wrap.appendChild(cardSlot);

    function renderQ() {
      locked = false;
      bar.style.width = (i / qs.length * 100) + "%";
      label.textContent = "Question " + (i + 1) + " / " + qs.length;
      var q = qs[i];
      var card = U.el("div", { class: "qcard" });
      card.appendChild(U.el("div", { class: "qtype", text: qTypeLabel(q) }));
      card.appendChild(U.el("h3", { class: "qtext", html: q.q }));
      var optsBox = U.el("div", { class: "opts" });
      var keys = "ABCDE";
      q.options.forEach(function (opt, oi) {
        var btn = U.el("button", { class: "opt-btn" }, [U.el("span", { class: "key", text: keys[oi] }), U.el("span", { html: opt })]);
        btn.addEventListener("click", function () { pick(oi, card, optsBox, q); });
        optsBox.appendChild(btn);
      });
      card.appendChild(optsBox);

      // optional hint (one per question)
      var foot = U.el("div", { class: "quiz-foot" });
      var hintWrap = U.el("div", { class: "hintbox" });
      if (q.hint) {
        var hintBtn = U.el("button", { class: "hint-reveal", text: "💡 Need a hint?", onclick: function () {
          hintWrap.innerHTML = "💡 " + q.hint;
        }});
        hintWrap.appendChild(hintBtn);
      }
      foot.appendChild(hintWrap);
      foot.appendChild(U.el("span", {}));
      card.appendChild(foot);

      cardSlot.innerHTML = ""; cardSlot.appendChild(card);
      scrollTop();
    }

    function pick(oi, card, optsBox, q) {
      if (locked) return; locked = true;
      var correct = q.answer;
      var btns = optsBox.querySelectorAll(".opt-btn");
      btns.forEach(function (b, bi) {
        b.disabled = true;
        if (bi === correct) b.classList.add("correct");
        else if (bi === oi) b.classList.add("wrong");
        else b.classList.add("dim");
      });
      var ok = oi === correct;
      answers.push({ q: q.q, picked: oi, correct: correct, ok: ok, options: q.options });
      var ex = U.el("div", { class: "explain" + (ok ? " ok" : "") });
      ex.innerHTML = "<b>" + (ok ? "Correct! " : "Not quite. ") + "</b>" + (q.explain || "");
      card.appendChild(ex);
      var next = U.el("button", { class: "btn", style: "margin-top:16px",
        text: (i === qs.length - 1 ? "See results →" : "Next question →"),
        onclick: function () { i++; if (i < qs.length) renderQ(); else finish(); } });
      card.appendChild(next);
      next.focus();
    }

    function finish() {
      var correct = answers.filter(function (a) { return a.ok; }).length;
      var pct = Math.round(correct / qs.length * 100);
      var secs = Math.floor((Date.now() - startT) / 1000);
      if (timerInt) clearInterval(timerInt);
      bar.style.width = "100%"; label.textContent = "Done!";
      opts.onComplete && opts.onComplete(pct, answers, secs);
      cardSlot.innerHTML = "";
      cardSlot.appendChild(resultScreen(pct, correct, qs.length, answers, opts, opts.timed ? secs : null));
    }

    renderQ();
    return wrap;
  }
  function qTypeLabel(q) { return q.type === "tf" ? "True or false" : q.type === "scenario" ? "Scenario" : q.type === "map" ? "Map / geography" : "Multiple choice"; }

  function resultScreen(pct, correct, total, answers, opts, secs) {
    var box = U.el("div", { class: "result" });
    var medal = pct >= 90 ? "🏆" : pct >= 70 ? "🥇" : pct >= 50 ? "🥈" : "🌱";
    var msg = pct >= 90 ? "Outstanding!" : pct >= 70 ? "Great work!" : pct >= 50 ? "Nice effort!" : "Good start — try again!";
    box.appendChild(U.el("div", { class: "medal", text: medal }));
    box.appendChild(U.el("h1", { text: msg }));
    box.appendChild(U.el("div", { class: "scorebig", text: pct + "%" }));
    box.appendChild(U.el("p", { class: "muted", text: "You got " + correct + " of " + total + " right." +
      (secs != null ? "  ·  Finished in " + Math.floor(secs / 60) + ":" + String(secs % 60).padStart(2, "0") : "") }));
    if (pct >= 70) U.confetti(110);

    var btns = U.el("div", { class: "row-btns" });
    btns.appendChild(U.el("button", { class: "btn ghost", text: "↻ Try again", onclick: function () {
      if (opts.retryHash) go(opts.retryHash); else if (app.querySelector(".quiz-wrap")) location.reload();
    }}));
    if (opts.continueHash) btns.appendChild(U.el("button", { class: "btn gold", html: opts.continueLabel || "Continue →", onclick: function () { go(opts.continueHash); } }));
    btns.appendChild(U.el("button", { class: "btn ghost", text: "Back to " + (opts.backLabel || "continent"), onclick: function () { go(opts.backHash); } }));
    box.appendChild(btns);

    // review
    var rev = U.el("div", { class: "review-list" });
    rev.appendChild(U.el("h3", { class: "center", text: "Review" }));
    answers.forEach(function (a, idx) {
      var it = U.el("div", { class: "review-item" });
      it.appendChild(U.el("div", { class: "q", html: (idx + 1) + ". " + a.q }));
      var ans = U.el("div", { class: "a" });
      ans.innerHTML = "Correct answer: <b>" + a.options[a.correct] + "</b>";
      if (!a.ok) ans.innerHTML += '<br><span class="you">Your answer: ' + a.options[a.picked] + "</span>";
      else ans.innerHTML += '<br><span class="you ok">✓ You got it</span>';
      it.appendChild(ans);
      rev.appendChild(it);
    });
    box.appendChild(rev);
    return box;
  }

  /* ---------------- LESSON QUIZ ---------------- */
  function renderLessonQuiz(id) {
    var L = C.lessons[id];
    if (!L) return renderHome();
    var cont = C.continents.filter(function (c) { return c.id === L.continent; })[0];
    var idx = cont.lessons.indexOf(id);
    var nextLid = cont.lessons[idx + 1];
    var body = U.el("div");
    body.appendChild(backbar(L.title, "#/l/" + id));
    var quiz = runQuiz({
      questions: L.quiz,
      kicker: cont.name + " · Lesson " + L.n,
      title: L.title,
      backHash: "#/c/" + cont.id, backLabel: cont.name,
      continueHash: nextLid ? "#/l/" + nextLid : "#/c/" + cont.id,
      continueLabel: nextLid ? "Next lesson →" : "Back to " + cont.name,
      onComplete: function (pct, answers) {
        var res = S.recordLesson(id, pct);
        celebrateMilestones();
        if (res.firstTime) U.toast("Lesson complete! +1 toward your " + cont.badge.name + " badge", "✅");
      },
    });
    body.appendChild(quiz);
    page("<b>" + cont.name + "</b> › Quiz", body);
  }

  /* ---------------- SECTION QUIZ ---------------- */
  function renderSectionQuiz(contId) {
    var cont = C.continents.filter(function (c) { return c.id === contId; })[0];
    if (!cont) return renderHome();
    var body = U.el("div");
    body.appendChild(backbar(cont.name, "#/c/" + cont.id));
    var quiz = runQuiz({
      questions: cont.sectionQuiz,
      kicker: "Section Quiz",
      title: cont.name + " — the whole journey",
      backHash: "#/c/" + cont.id, backLabel: cont.name,
      onComplete: function (pct, answers) {
        var res = S.recordSectionQuiz(contId, pct, PASS);
        if (res.earnedNow) {
          U.confetti(160);
          U.toast("🏅 Badge earned: " + cont.badge.name + "!", cont.badge.emoji);
        } else if (pct >= PASS) {
          U.toast("Passed again — nice!", "🎯");
        } else {
          U.toast("Score " + pct + "% — reach " + PASS + "% for the badge. You've got this!", "💪");
        }
        celebrateMilestones();
      },
    });
    body.appendChild(quiz);
    page("<b>" + cont.name + "</b> › Section Quiz", body);
  }

  function celebrateMilestones() {
    var t = S.totalsAcross(C.continents);
    [10, 20, 30, 40].forEach(function (m) {
      if (t.lessonsDone >= m && S.milestoneOnce("lessons" + m)) {
        var frac = m === 40 ? "all of world history" : (m / t.lessonsTotal * 100).toFixed(0) + "% of the journey";
        setTimeout(function () { U.confetti(120); U.toast("Milestone: " + m + " lessons — " + frac + "!", "🎉"); }, 600);
      }
    });
  }

  /* ---------------- DASHBOARD ---------------- */
  function renderDashboard() {
    var body = U.el("div");
    body.appendChild(backbar("Home", "#/"));
    body.appendChild(U.el("h1", { style: "margin-top:6px", text: "Your journey" }));

    var t = S.totalsAcross(C.continents);
    var best = S.bestScore();
    var grid = U.el("div", { class: "dash-grid" }, [
      statCard(t.lessonsDone + "/" + t.lessonsTotal, "Lessons completed"),
      statCard(t.pct + "%", "Overall progress"),
      statCard(S.liveStreak() + " 🔥", "Current streak (best " + S.load().streak.best + ")"),
      statCard(t.badges + "/" + C.continents.length, "Continent badges"),
      statCard(best.score ? best.score + "%" : "—", best.lessonId ? "Best score · " + C.lessons[best.lessonId].title : "Best quiz score"),
      statCard(S.countriesSeenCount(), "Country cards explored"),
      statCard(S.drillStats().plays ? S.drillStats().best + "%" : "—", "Geography drill best"),
    ]);
    body.appendChild(grid);

    // badges shelf
    body.appendChild(U.el("h2", { style: "margin-top:30px", text: "Badges" }));
    var shelf = U.el("div", { class: "badge-shelf" });
    C.continents.forEach(function (cont) {
      var won = S.hasBadge(cont.id);
      var coin = U.el("div", { class: "badge-coin" + (won ? " won" : "") });
      coin.appendChild(U.el("div", { class: "coin", text: won ? cont.badge.emoji : "🔒" }));
      coin.appendChild(U.el("div", { class: "bn", text: cont.badge.name }));
      shelf.appendChild(coin);
    });
    body.appendChild(shelf);

    // teaching prompt (the "secret sauce")
    body.appendChild(U.el("div", { class: "modern", style: "margin-top:24px" }, [
      U.el("div", { class: "tag", text: "Try this" }),
      U.el("p", { style: "margin:.3em 0 0", html: "Can you explain one thing you learned to a parent or friend? Teaching it back is the best way to truly own it. 🦉" }),
    ]));

    // recent activity
    var logs = S.log();
    if (logs.length) {
      body.appendChild(U.el("h2", { style: "margin-top:30px", text: "Recent activity" }));
      var list = U.el("div", { class: "lesson-list" });
      logs.slice(0, 8).forEach(function (e) {
        var name = e.kind === "section"
          ? (C.continents.filter(function (c) { return c.id === e.id; })[0] || {}).name + " — Section Quiz"
          : e.kind === "drill" ? "🌐 Geography Drill"
          : (C.lessons[e.id] || {}).title || e.id;
        var row = U.el("div", { class: "lrow" });
        row.appendChild(U.el("div", { class: "num", text: e.score >= 70 ? "✓" : "•" }));
        var meta = U.el("div", { class: "meta" });
        meta.appendChild(U.el("h4", { text: name }));
        meta.appendChild(U.el("div", { class: "tags" }, [U.el("span", { text: timeAgo(e.t) }), U.el("span", { text: "scored " + e.score + "%" })]));
        row.appendChild(meta);
        list.appendChild(row);
      });
      body.appendChild(list);
    }

    // reset
    body.appendChild(U.el("div", { style: "margin-top:34px;text-align:center" },
      U.el("button", { class: "btn ghost", text: "Reset all progress", onclick: function () {
        if (confirm("Reset all World Awareness progress on this device? This can't be undone.")) { S.reset(); go("#/"); U.toast("Progress reset", "🧭"); }
      }})));

    page("<b>Dashboard</b>", body);
  }
  function statCard(big, lbl) { return U.el("div", { class: "stat-card" }, [U.el("div", { class: "big", text: big }), U.el("div", { class: "lbl", text: lbl })]); }
  function timeAgo(t) {
    var s = (Date.now() - t) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s / 60) + " min ago";
    if (s < 86400) return Math.floor(s / 3600) + " hr ago";
    return Math.floor(s / 86400) + " day(s) ago";
  }

  /* ---------------- ATLAS (country cards) ---------------- */
  function renderAtlas() {
    var body = U.el("div");
    body.appendChild(backbar("Home", "#/"));
    body.appendChild(U.el("h1", { style: "margin-top:6px", text: "🗺️ Country Atlas" }));
    body.appendChild(U.el("p", { class: "muted", html: "Tap any country to learn its flag, leader, currency, and a few fun facts. Explored <b>" + S.countriesSeenCount() + "</b> so far." }));

    // search
    var search = U.el("input", { type: "search", placeholder: "Search a country…", "aria-label": "Search countries",
      style: "width:100%;max-width:340px;padding:11px 15px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);font-size:1rem;margin:6px 0 4px" });
    body.appendChild(search);

    var byRegion = {};
    WA.COUNTRIES.list.forEach(function (c) { (byRegion[c.region] = byRegion[c.region] || []).push(c); });

    var container = U.el("div");
    function draw(filter) {
      container.innerHTML = "";
      Object.keys(byRegion).forEach(function (region) {
        var items = byRegion[region].filter(function (c) { return !filter || c.name.toLowerCase().indexOf(filter) >= 0; });
        if (!items.length) return;
        container.appendChild(U.el("div", { class: "section-title", style: "margin:26px 0 0" }, U.el("h2", { style: "font-size:1.3rem", text: region })));
        var grid = U.el("div", { class: "country-grid" });
        items.forEach(function (c) {
          var card = U.el("div", { class: "flag-card", tabindex: "0", role: "button",
            onclick: function () { openCountry(c); }, onkeydown: function (e) { if (e.key === "Enter") openCountry(c); } });
          card.appendChild(U.el("div", { class: "flag", text: c.flag }));
          card.appendChild(U.el("div", { class: "cn", text: c.name }));
          card.appendChild(U.el("div", { class: "cap", text: c.capital }));
          grid.appendChild(card);
        });
        container.appendChild(grid);
      });
      if (!container.children.length) container.appendChild(U.el("p", { class: "muted center", text: "No countries match that search." }));
    }
    search.addEventListener("input", function () { draw(search.value.trim().toLowerCase()); });
    draw("");
    body.appendChild(container);
    page("<b>Country Atlas</b>", body);
  }

  function openCountry(c) {
    S.seeCountry(c.code);
    var node = U.el("div");
    var top = U.el("div", { class: "m-top" }, [
      U.el("div", { class: "flag", text: c.flag }),
      U.el("div", {}, [U.el("h2", { text: c.name }), U.el("div", { class: "gov", text: c.government + " · capital " + c.capital })]),
    ]);
    node.appendChild(top);
    var b = U.el("div", { class: "m-body" });
    b.appendChild(U.el("div", { class: "leader-note", html: "<b>Leader:</b> " + c.leader }));
    var rows = U.el("div", { class: "fact-rows" }, [
      factCell("Population", c.population),
      factCell("% of world", c.pctWorld),
      factCell("Currency", c.currency),
      factCell("$1 ≈", c.usd),
    ]);
    b.appendChild(rows);
    b.appendChild(U.el("div", { class: "leader-note", style: "background:color-mix(in srgb,var(--teal) 8%, var(--paper));border-color:var(--teal)", html: "<b>Known for:</b> " + c.specialty }));
    b.appendChild(U.el("div", { style: "margin-top:10px;font-weight:700;color:var(--gold-deep)", text: "✨ Fun facts" }));
    b.appendChild(U.el("ul", { class: "funlist" }, c.funFacts.map(function (f) { return U.el("li", { html: f }); })));
    node.appendChild(b);
    U.modal(node);
  }
  function factCell(k, v) { return U.el("div", { class: "fact-cell" }, [U.el("div", { class: "k", text: k }), U.el("div", { class: "v", text: v })]); }

  /* ---------------- GEOGRAPHY DRILL (competition-prep layer) ----------------
     Flags / capitals / physical geography — practice for the Geography Bee &
     World Scholar's Cup. Optional, effort-framed, with a relaxed/timed toggle.
     Inline styles on new UI so it renders even behind a cached stylesheet. */
  function renderDrillSetup() {
    var body = U.el("div");
    body.appendChild(backbar("Home", "#/"));
    body.appendChild(U.el("h1", { style: "margin-top:6px", text: "🌐 Geography Drill" }));
    body.appendChild(U.el("p", { class: "muted", html: "Sharpen your flags, capitals, and world geography — great warm-up for the <b>Geography Bee</b> and <b>World Scholar's Cup</b>. Pick a focus:" }));
    var st = S.drillStats();
    if (st.plays) body.appendChild(U.el("p", { class: "muted", text: "⭐ Your best: " + st.best + "%  ·  played " + st.plays + " time" + (st.plays === 1 ? "" : "s") }));

    var chosen = { topic: "mixed", mode: "relaxed" };
    var topics = [
      { id: "mixed", emoji: "🌍", name: "Mixed", sub: "A bit of everything" },
      { id: "flags", emoji: "🚩", name: "Flags", sub: "Match flags & countries" },
      { id: "capitals", emoji: "🏙️", name: "Capitals", sub: "Name the capital city" },
      { id: "physical", emoji: "⛰️", name: "Physical", sub: "Rivers, mountains, oceans" },
    ];
    var grid = U.el("div", { class: "country-grid", style: "margin:18px 0" });
    topics.forEach(function (t) {
      var card = U.el("button", { class: "flag-card", style: "border:2px solid " + (t.id === chosen.topic ? "var(--gold)" : "var(--line)"),
        onclick: function () { chosen.topic = t.id; grid.querySelectorAll(".flag-card").forEach(function (x) { x.style.borderColor = "var(--line)"; }); card.style.borderColor = "var(--gold)"; } },
        [U.el("div", { class: "flag", text: t.emoji }), U.el("div", { class: "cn", text: t.name }), U.el("div", { class: "cap", text: t.sub })]);
      grid.appendChild(card);
    });
    body.appendChild(grid);

    var relaxBtn, timeBtn;
    function setMode(m) { chosen.mode = m;
      relaxBtn.className = "btn " + (m === "relaxed" ? "gold" : "ghost"); timeBtn.className = "btn " + (m === "timed" ? "gold" : "ghost"); }
    relaxBtn = U.el("button", { style: "margin:0 8px 0 0", text: "😌 Relaxed", onclick: function () { setMode("relaxed"); } });
    timeBtn = U.el("button", { style: "margin:0 8px 0 0", text: "⏱️ Timed", onclick: function () { setMode("timed"); } });
    var modeRow = U.el("div", { style: "display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:6px 0 20px" },
      [U.el("span", { class: "muted", text: "Mode:" }), relaxBtn, timeBtn]);
    body.appendChild(modeRow);
    setMode("relaxed");

    body.appendChild(U.el("button", { class: "btn lg gold", style: "display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;font-size:.98rem;padding:17px 36px",
      text: "Start drill →", onclick: function () { go("#/drill/" + chosen.topic + "/" + chosen.mode); } }));
    page("<b>Geography Drill</b>", body);
  }

  function sampleFrom(arr, k, exclude) {
    var c = arr.slice(), r = [];
    while (r.length < k && c.length) { var x = c.splice(Math.floor(Math.random() * c.length), 1)[0]; if (x !== exclude) r.push(x); }
    return r;
  }
  function generateDrill(topic, n) {
    n = n || 10;
    var list = WA.COUNTRIES.list, facts = C.geoFacts;
    function capitalQ(c) {
      var opts = U.shuffle([c.capital].concat(sampleFrom(list.filter(function (x) { return x.code !== c.code; }), 3).map(function (x) { return x.capital; })));
      return { q: "What is the capital of <b>" + c.name + "</b>?", type: "map", options: opts, answer: opts.indexOf(c.capital), explain: c.capital + " is the capital of " + c.name + "." };
    }
    function flagToCountry(c) {
      var opts = U.shuffle([c.name].concat(sampleFrom(list.filter(function (x) { return x.code !== c.code; }), 3).map(function (x) { return x.name; })));
      return { q: "Which country's flag is this?<div style='font-size:3.2rem;margin-top:6px'>" + c.flag + "</div>", type: "map", options: opts, answer: opts.indexOf(c.name), explain: c.flag + " is the flag of " + c.name + "." };
    }
    function countryToFlag(c) {
      var opts = U.shuffle([c.flag].concat(sampleFrom(list.filter(function (x) { return x.code !== c.code; }), 3).map(function (x) { return x.flag; })));
      return { q: "Which flag belongs to <b>" + c.name + "</b>?", type: "map",
        options: opts.map(function (f) { return "<span style='font-size:1.7rem'>" + f + "</span>"; }), answer: opts.indexOf(c.flag), explain: c.flag + " is " + c.name + "'s flag." };
    }
    var gens = topic === "capitals" ? [capitalQ] : topic === "flags" ? [flagToCountry, countryToFlag] : [capitalQ, flagToCountry, countryToFlag];
    var out = [];
    if (topic === "physical") return U.shuffle(facts).slice(0, n);
    var countries = U.shuffle(list), usedFacts = [];
    for (var k = 0; k < n; k++) {
      if (topic === "mixed" && Math.random() < 0.25) {
        var pool = facts.filter(function (f) { return usedFacts.indexOf(f) < 0; });
        if (pool.length) { var f = pool[Math.floor(Math.random() * pool.length)]; usedFacts.push(f); out.push(f); continue; }
      }
      var c = countries[k % countries.length];
      out.push(gens[Math.floor(Math.random() * gens.length)](c));
    }
    return out.slice(0, n);
  }
  function renderDrillRun(topic, mode) {
    var qs = generateDrill(topic, 10);
    if (!qs.length) return renderDrillSetup();
    var labels = { mixed: "Mixed", flags: "Flags", capitals: "Capitals", physical: "Physical Geography" };
    var body = U.el("div");
    body.appendChild(backbar("Drill menu", "#/drill"));
    body.appendChild(runQuiz({
      questions: qs,
      kicker: "Geography Drill" + (mode === "timed" ? " · ⏱️ Timed" : ""),
      title: labels[topic] || "Geography",
      timed: mode === "timed",
      backHash: "#/drill", backLabel: "drill menu",
      retryHash: "#/drill/" + topic + "/" + mode,
      continueHash: "#/drill", continueLabel: "Pick another drill →",
      onComplete: function (pct) {
        var r = S.recordDrill(pct);
        if (r.isBest && S.drillStats().plays > 1) U.toast("New personal best: " + pct + "%!", "🌟");
        else U.toast("Drill done — " + pct + "%", "🌐");
      },
    }));
    page("<b>Geography Drill</b>", body);
  }

  /* ---------------- entry points (driven by the main app router) ----------------
     The main app.js owns the single hashchange listener. When the hash is
     #/world/...  it calls WA.Engine.handle(parts), where parts = the path
     segments after "world" (e.g. ["c","europe"]). We never add our own
     hashchange listener, so the two subjects can't fight over routing. */
  var ready = false;
  function init() {
    if (ready) return;
    U = WA.UI; S = WA.State; C = WA.CONTENT;
    app = document.getElementById("app");
    ready = true;
  }

  function handle(parts) {
    init();
    if (typeof window !== "undefined") window.onscroll = null;
    parts = parts || [];
    var a = parts[0], b = parts[1];
    if (!a) return renderHome();
    if (a === "c" && b) return renderContinent(b);
    if (a === "l" && b) return renderLesson(b);
    if (a === "q" && b) return renderLessonQuiz(b);
    if (a === "sq" && b) return renderSectionQuiz(b);
    if (a === "dash") return renderDashboard();
    if (a === "atlas") return renderAtlas();
    if (a === "drill") return b ? renderDrillRun(b, parts[2] || "relaxed") : renderDrillSetup();
    return renderHome();
  }

  return { init: init, handle: handle };
})();
