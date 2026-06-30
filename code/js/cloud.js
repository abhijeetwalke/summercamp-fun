/* ============================================================
   Summer Camp — Cloud accounts + sync  [ENGINE]
   Adds real accounts on top of the static app, backed by a free
   Supabase project. Two roles:
     • kid   — signs up (name/sex/birthday/username/password), logs
               in anywhere, and his progress follows him (cloud).
     • admin — one pre-seeded login (in the DB, role='admin') that
               sees every kid's info placard + daily time/progress.

   PROGRESS SAFETY (the #1 rule): a kid's existing on-device progress
   is NEVER wiped. On first login (cloud empty) we UPLOAD local
   progress; otherwise we merge cloud over local per-subject. The
   four progress localStorage keys are the same ones the app already
   uses, so nothing about how subjects save changes.

   Loaded after the Supabase UMD client (window.supabase) and after
   config.js, before app.js. Login is required before the app boots.
   ============================================================ */

window.SC = window.SC || {};
SC.Cloud = (function () {
  var SUPA_URL = "https://ovwmdnuzuglgejqwqlfb.supabase.co";
  var SUPA_KEY = "sb_publishable_fxEL2O09bqMjowjLY7jlmg_3j5ZG6YJ";
  var SESSION_KEY = "summer-camp-session-v1";
  // The exact progress keys each subject already uses — we sync these, untouched.
  var PROGRESS_KEYS = ["summer-camp-state-v1", "summer-camp-world-v1", "summer-camp-hoops-v1", "summer-camp-sunsword-v1"];

  var sb = null;
  function client() {
    if (!sb && window.supabase && window.supabase.createClient) {
      sb = window.supabase.createClient(SUPA_URL, SUPA_KEY, { auth: { persistSession: false } });
    }
    return sb;
  }
  function online() { return !!client(); }

  /* ---------- session (persisted, never expires) ---------- */
  function session() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) { return null; }
  }
  function setSession(s) { try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {} }
  function clearSession() { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} }

  /* ---------- accounts: signup / login ---------- */
  function signup(f) {
    var c = client(); if (!c) return Promise.reject(new Error("offline"));
    var row = { username: (f.username || "").trim(), password: f.password || "", name: (f.name || "").trim(),
      sex: f.sex || null, birthday: f.birthday || null, role: "kid", progress: {} };
    return c.from("accounts").insert(row).select().single().then(function (r) {
      if (r.error) {
        if ((r.error.code === "23505") || /duplicate|unique/i.test(r.error.message || "")) throw new Error("That username is already taken — try another.");
        throw new Error(r.error.message || "Could not create the account.");
      }
      return r.data;
    });
  }
  function login(username, password) {
    var c = client(); if (!c) return Promise.reject(new Error("offline"));
    return c.from("accounts").select("*").eq("username", (username || "").trim()).eq("password", password || "").maybeSingle()
      .then(function (r) {
        if (r.error) throw new Error(r.error.message || "Login failed.");
        if (!r.data) throw new Error("That username and password don't match. Check and try again.");
        return r.data;
      });
  }

  /* ---------- progress: read / write / merge (SAFE) ---------- */
  function readLocal() {
    var o = {};
    PROGRESS_KEYS.forEach(function (k) { var v = localStorage.getItem(k); if (v != null) o[k] = v; });
    return o;
  }
  function writeLocal(obj) {
    if (!obj) return;
    PROGRESS_KEYS.forEach(function (k) { if (obj[k] != null && hasData(obj[k])) { try { localStorage.setItem(k, obj[k]); } catch (e) {} } });
  }
  function hasData(v) { return typeof v === "string" && v.length > 2 && v !== "{}" && v !== "null" && v !== "[]"; }
  // SAFEST rule for "never reset his progress": if THIS device already has data for a
  // subject, keep it (and push it up) — never overwrite his device with a stale cloud copy.
  // Cloud is only adopted for subjects this device has nothing for (e.g. a brand-new device).
  function merge(cloud, local) {
    var m = {};
    PROGRESS_KEYS.forEach(function (k) {
      var cv = cloud && cloud[k], lv = local && local[k];
      m[k] = hasData(lv) ? lv : (hasData(cv) ? cv : (lv != null ? lv : cv));
    });
    return m;
  }

  var ACCOUNT = null;          // the logged-in account row
  var lastPushed = "";         // serialized progress last sent up

  function pushProgress(force) {
    var c = client(); if (!c || !ACCOUNT) return Promise.resolve();
    var local = readLocal(); var s = JSON.stringify(local);
    if (!force && s === lastPushed) return Promise.resolve();
    lastPushed = s;
    return c.from("accounts").update({ progress: local, updated_at: new Date().toISOString() }).eq("id", ACCOUNT.id)
      .then(function () {}, function () {});
  }

  // Pull cloud, merge with local (preserving the device's progress), write merged back
  // to both. Returns a promise resolved once localStorage holds the merged progress.
  function syncOnLogin(account) {
    ACCOUNT = account;
    var cloud = account.progress || {};
    var local = readLocal();
    var merged = merge(cloud, local);
    writeLocal(merged);                 // app will render from this
    lastPushed = "";                    // force first push of the merged set
    return pushProgress(true);
  }

  /* ---------- daily time + progress tracking ---------- */
  var visibleSince = null, todayKey = "", trackTimer = null;
  function dayStr() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function secKey() { return "summer-camp-secs-" + (ACCOUNT ? ACCOUNT.id : "x") + "-" + todayKey; }
  function todaySecs() { try { return parseInt(localStorage.getItem(secKey()) || "0", 10) || 0; } catch (e) { return 0; } }
  function addSecs(n) { try { localStorage.setItem(secKey(), String(todaySecs() + n)); } catch (e) {} }

  function startTracking() {
    todayKey = dayStr();
    visibleSince = (document.visibilityState === "visible") ? Date.now() : null;
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", function () { accrue(); pushProgress(); flushActivity(); });
    trackTimer = setInterval(function () { accrue(); pushProgress(); flushActivity(); }, 20000);
  }
  function onVis() {
    if (document.visibilityState === "visible") { visibleSince = Date.now(); }
    else { accrue(); pushProgress(); flushActivity(); }
  }
  function accrue() {
    if (visibleSince) {
      var delta = Math.round((Date.now() - visibleSince) / 1000);
      if (delta > 0 && delta < 3600) addSecs(delta);  // ignore absurd gaps (sleep/closed lid)
      visibleSince = (document.visibilityState === "visible") ? Date.now() : null;
    }
    if (dayStr() !== todayKey) todayKey = dayStr();   // roll over at midnight
  }
  function flushActivity() {
    var c = client(); if (!c || !ACCOUNT) return;
    c.from("activity").upsert({ account_id: ACCOUNT.id, day: todayKey, time_seconds: todaySecs(),
      summary: summary(), updated_at: new Date().toISOString() }, { onConflict: "account_id,day" }).then(function () {}, function () {});
  }

  // A small, defensive snapshot of progress for the admin dashboard.
  function summary() {
    var s = { math: 0, world: 0, hoops: 0, sunsword: 0, streak: 0, tiles: 0 };
    try { var m = JSON.parse(localStorage.getItem("summer-camp-state-v1") || "{}");
      var sub = m.subjects && m.subjects.math; if (sub) { s.math = (sub.missions || []).filter(function (x) { return x.done; }).length; s.streak = (sub.streak && sub.streak.current) || 0; s.tiles = (sub.tiles && sub.tiles.count) || 0; } } catch (e) {}
    try { var w = JSON.parse(localStorage.getItem("summer-camp-world-v1") || "{}"); s.world = countDone(w.lessons); } catch (e) {}
    try { var h = JSON.parse(localStorage.getItem("summer-camp-hoops-v1") || "{}"); s.hoops = countDone(h.lessons); } catch (e) {}
    try { var sw = JSON.parse(localStorage.getItem("summer-camp-sunsword-v1") || "{}"); s.sunsword = countDone(sw.lessons); } catch (e) {}
    return s;
  }
  function countDone(obj) { if (!obj) return 0; var n = 0; for (var k in obj) { if (obj[k] && obj[k].done) n++; } return n; }

  /* ---------- boot: gate the app behind login ---------- */
  function boot(onReady) {
    if (!online()) { renderOffline(); return; }
    var s = session();
    if (!s) { showAuth(function (acc) { afterLogin(acc, onReady); }); return; }
    // refresh the account from the DB (so progress + role are current), fall back to stored session
    client().from("accounts").select("*").eq("id", s.id).maybeSingle().then(function (r) {
      afterLogin((r && r.data) || s, onReady);
    }, function () { afterLogin(s, onReady); });
  }
  function afterLogin(account, onReady) {
    setSession({ id: account.id, username: account.username, role: account.role, name: account.name });
    if (account.role === "admin") { showAdmin(); return; }
    syncOnLogin(account).then(function () { startTracking(); onReady(); }, function () { startTracking(); onReady(); });
  }
  function logout() { accrue(); pushProgress(true); flushActivity(); clearSession(); location.hash = "#/"; location.reload(); }

  /* =========================================================
     UI — login / signup, admin dashboard, small helpers
     ========================================================= */
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function renderOffline() {
    document.getElementById("app").innerHTML = '<div class="auth-scope"><div class="auth-card">' +
      '<h1>Summer Camp</h1><p class="auth-msg">Can’t reach the accounts server right now. Check your internet connection and refresh.</p></div></div>';
  }

  function showAuth(onSuccess) {
    var root = document.getElementById("app");
    root.innerHTML =
      '<div class="auth-scope"><div class="auth-card">' +
        '<h1>Summer Camp</h1>' +
        '<div class="auth-tabs"><button id="tab-login" class="auth-tab on">Log in</button><button id="tab-signup" class="auth-tab">Sign up</button></div>' +
        '<div id="auth-err" class="auth-err" hidden></div>' +
        // login
        '<form id="form-login" class="auth-form">' +
          '<label>Username<input id="li-user" autocomplete="username" autocapitalize="none" spellcheck="false"></label>' +
          '<label>Password<input id="li-pass" type="password" autocomplete="current-password"></label>' +
          '<button class="auth-go" type="submit">Log in</button>' +
        '</form>' +
        // signup
        '<form id="form-signup" class="auth-form" hidden>' +
          '<label>Your name<input id="su-name" autocomplete="name"></label>' +
          '<label>Sex<select id="su-sex"><option value="">Choose…</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></label>' +
          '<label>Birthday<input id="su-bday" type="date"></label>' +
          '<label>Pick a username<input id="su-user" autocomplete="username" autocapitalize="none" spellcheck="false"></label>' +
          '<label>Pick a password<input id="su-pass" type="text" autocomplete="new-password"></label>' +
          '<button class="auth-go" type="submit">Create my account</button>' +
        '</form>' +
        '<p class="auth-foot">Your login is remembered on this device. Ask a grown-up if you forget it.</p>' +
      '</div></div>';

    var errEl = el("auth-err");
    function showErr(m) { errEl.textContent = m; errEl.hidden = false; }
    function clearErr() { errEl.hidden = true; }
    function tab(which) {
      var lg = which === "login";
      el("tab-login").classList.toggle("on", lg); el("tab-signup").classList.toggle("on", !lg);
      el("form-login").hidden = !lg; el("form-signup").hidden = lg; clearErr();
    }
    el("tab-login").onclick = function () { tab("login"); };
    el("tab-signup").onclick = function () { tab("signup"); };

    el("form-login").onsubmit = function (e) {
      e.preventDefault(); clearErr();
      var btn = e.target.querySelector("button"); btn.disabled = true; btn.textContent = "Logging in…";
      login(el("li-user").value, el("li-pass").value).then(function (acc) { onSuccess(acc); },
        function (err) { showErr(err.message || "Login failed."); btn.disabled = false; btn.textContent = "Log in"; });
    };
    el("form-signup").onsubmit = function (e) {
      e.preventDefault(); clearErr();
      var name = el("su-name").value.trim(), user = el("su-user").value.trim(), pass = el("su-pass").value;
      if (!name) return showErr("Please enter your name.");
      if (user.length < 3) return showErr("Pick a username with at least 3 letters.");
      if (pass.length < 4) return showErr("Pick a password with at least 4 characters.");
      var btn = e.target.querySelector("button"); btn.disabled = true; btn.textContent = "Creating…";
      signup({ name: name, sex: el("su-sex").value, birthday: el("su-bday").value || null, username: user, password: pass })
        .then(function (acc) { onSuccess(acc); },
          function (err) { showErr(err.message || "Could not create the account."); btn.disabled = false; btn.textContent = "Create my account"; });
    };
  }

  /* ---------- admin dashboard ---------- */
  // Reconstruct the REAL day-by-day history from his saved progress: every lesson/mission
  // records WHEN it was done (completedAt / startedAt, epoch ms), so we group by the true date
  // rather than lumping everything onto the first sync.
  function historyByDay(progress) {
    var byDay = {};
    function dayOf(ms) { if (typeof ms !== "number" || ms < 1e12) return null; var d = new Date(ms); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
    function add(day, subj) { if (!day) return; (byDay[day] = byDay[day] || { math: 0, world: 0, hoops: 0, sunsword: 0 })[subj]++; }
    function parse(k) { try { return JSON.parse((progress && progress[k]) || "null"); } catch (e) { return null; } }
    [["summer-camp-world-v1", "world"], ["summer-camp-hoops-v1", "hoops"], ["summer-camp-sunsword-v1", "sunsword"]].forEach(function (pair) {
      var blob = parse(pair[0]), ls = blob && blob.lessons; if (!ls) return;
      for (var id in ls) { var r = ls[id]; if (r && r.done && r.completedAt) add(dayOf(r.completedAt), pair[1]); }
    });
    var m = parse("summer-camp-state-v1"), mm = m && m.subjects && m.subjects.math;
    if (mm && mm.missions) mm.missions.forEach(function (mi) { if (mi && mi.done && mi.kind === "daily") add(dayOf(mi.startedAt), "math"); });
    return byDay;
  }
  function showAdmin() {
    var root = document.getElementById("app");
    root.innerHTML = '<div class="auth-scope admin"><div class="admin-wrap">' +
      '<div class="admin-top"><h1>Parent Admin</h1><button id="admin-out" class="auth-tab">Log out</button></div>' +
      '<p class="auth-msg" id="admin-status">Loading accounts…</p><div id="admin-list"></div></div></div>';
    el("admin-out").onclick = function () { logout(); };
    var c = client();
    c.from("accounts").select("*").eq("role", "kid").order("created_at", { ascending: true }).then(function (r) {
      if (r.error) { el("admin-status").textContent = "Couldn't load accounts: " + r.error.message; return; }
      var kids = r.data || [];
      if (!kids.length) { el("admin-status").textContent = "No kid accounts yet. When your child signs up, they'll appear here."; return; }
      el("admin-status").textContent = kids.length + (kids.length === 1 ? " account" : " accounts") + ".";
      kids.forEach(function (k) { renderKid(k); });
    }, function () { el("admin-status").textContent = "Couldn't reach the server."; });

    function renderKid(k) {
      var card = document.createElement("div"); card.className = "admin-card";
      card.innerHTML =
        '<div class="placard">' +
          '<div class="pl-name">' + esc(k.name || "(no name)") + '</div>' +
          '<div class="pl-grid">' +
            row("Username", k.username) + row("Password", k.password) +
            row("Sex", k.sex || "—") + row("Birthday", k.birthday || "—") +
          '</div>' +
        '</div>' +
        '<div class="pl-daily"><h3>Daily progress &amp; time</h3><div class="pl-days">loading…</div></div>';
      el("admin-list").appendChild(card);
      var daysEl = card.querySelector(".pl-days");
      c.from("activity").select("*").eq("account_id", k.id).order("day", { ascending: false }).limit(30).then(function (r2) {
        // What he completed on each REAL date (from his saved timestamps)...
        var doneBy = historyByDay(k.progress || {});
        // ...and the measured time per day (only exists from the day cloud tracking began).
        var timeBy = {}; ((r2 && r2.data) || []).forEach(function (a) { timeBy[a.day] = a.time_seconds; });
        var days = {};
        Object.keys(doneBy).forEach(function (d) { days[d] = 1; });
        Object.keys(timeBy).forEach(function (d) { days[d] = 1; });
        var list = Object.keys(days).sort().reverse().slice(0, 90); // newest first
        if (!list.length) { daysEl.innerHTML = '<p class="muted">No activity yet. As he does lessons, each day shows up here.</p>'; return; }
        daysEl.innerHTML = list.map(function (day) {
          var cc = doneBy[day] || {}, parts = [];
          if (cc.math) parts.push("+" + cc.math + " Math");
          if (cc.world) parts.push("+" + cc.world + " World");
          if (cc.hoops) parts.push("+" + cc.hoops + " Hoops");
          if (cc.sunsword) parts.push("+" + cc.sunsword + " Sun&amp;Sword");
          var did = parts.length ? '<b>' + parts.join(" · ") + '</b>' : '<span class="muted">on the app — no lessons finished</span>';
          var t = (timeBy[day] != null) ? ('⏱ ' + mmss(timeBy[day])) : '<span class="muted" title="time wasn\'t measured before cloud tracking began">⏱ —</span>';
          return '<div class="day-row"><span class="d-date">' + esc(day) + '</span>' +
            '<span class="d-time">' + t + '</span>' +
            '<span class="d-sum">' + did + '</span></div>';
        }).join("");
      });
    }
    function row(lbl, val) { return '<div class="pl-row"><span class="pl-k">' + lbl + '</span><span class="pl-v">' + esc(val) + '</span></div>'; }
  }
  function mmss(sec) { sec = sec || 0; var m = Math.floor(sec / 60), s = sec % 60; if (m >= 60) { var h = Math.floor(m / 60); return h + "h " + (m % 60) + "m"; } return m + "m " + (s < 10 ? "0" : "") + s + "s"; }

  return {
    boot: boot, logout: logout, session: session,
    // exposed for any future use / debugging
    pushProgress: pushProgress, online: online,
  };
})();
