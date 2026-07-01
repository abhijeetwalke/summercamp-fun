# CLAUDE.md — Project Front Door

**Read this first.** It orients you (Cowork / Claude Code) to the whole project so you can pick up exactly where work left off.

---

## What this project is

**App name (locked): Summer Camp.** A summer-project educational **web app for an 11-year-old** (just finished 5th grade, attends RSM accelerated math) — and possibly his friends later, so build it rich. It's a **diagnostic-first** learning app — it surfaces skill gaps through fun, themed testing, then teaches to those gaps. **Math** (themed around **Avatar: The Last Airbender**) is the founding subject. **World Awareness** has since also been built (a deliberate Abhi override of the depth-first rule, 2026-06-17) and is integrated as a second land on the index map, and **Basketball** ("Hardwood") was built next (a second override, 2026-06-18) as a third land; both are **teaching-first** (lesson → quiz), intentionally different from Math's diagnostic-first engine. Remaining subjects (Science, Logic) are designed later, one at a time.

**Core philosophy:** diagnose before teaching; pull the kid in with easy early wins, then ramp to flow; reward effort, never raw ability; keep it a clean, positive, no-shame space.

**Project location:** `/Users/abhiwalke/MyApps/AyanshSummerCamp`

---

## The documents (read in this order)

> **Layout (locked, 2026-06-13):** `CLAUDE.md` stays at the repo root; the other six docs live in **`docs/`**; the app (entry file + `css/ js/ data/ assets/`) lives in **`code/`**.

1. **`CLAUDE.md`** (this file, at root) — orientation + current status.
2. **`wisdom.md`** — the **distilled why**: 16 lines of project soul pulled from everything below. Read it before any build work; if a decision conflicts with it, wisdom wins — flag to Abhi.
3. **`product_vision.md`** — the **living spec**: the complete "what we're building" for Math (themes, Avatar mapping, Mission engine, hints, dashboard, mastery, rewards, progression, UI, sourcing, style tags). Build to it — but it's not frozen: when Abhi's words carry product-level signal, fold it into the vision directly (and log it in the decision log). Facelifts to its writing are welcome too (Abhi, 2026-06-12).
4. **`pending.md`** — the **build-work backlog** (engineering tasks), dependency-ordered phases + parallel content track. **Work from here.**
5. **`completed.md`** — finished build work. **When you finish a task, move it here** with a date + short note + file paths.
6. **`decisions_open.md`** — **product** decisions still needing Abhi's input. Currently: none — Math is fully decided. (Also holds the running decision log and operating notes.)
7. **`deferred.md`** — parked subjects (Science, Logic, Basketball) and features (auth, video, photo-upload). *(World Awareness has graduated out of here — built on preview.)* Don't build the rest until Math ships.

**Any new session:** start here, read 1→7 in order, then continue from "Current status" below. That's the whole onboarding.

**Word discipline:** "**pending**" = build work (`pending.md`). "**open**" = product decisions (`decisions_open.md`). They don't overlap.

---

## How to work this project

1. **Read `product_vision.md` fully** — it's the source of truth for behavior.
2. **Pick the next task from `pending.md`** (top-down; respect the S1-before-S2 phasing).
3. **Build it** to the vision. Build platform-wide rules as a **reusable engine** (tiers, ramp, hints, streaks, timing, rewards, progression, UI shell, clicks-logging) so future subjects plug in fast; keep math-specific content (Avatar skin, element→domain map, question bank, journey routes) separate.
4. **Move the finished task to `completed.md`** with a date, a one-line note, and the files you touched.
5. If you hit something the vision doesn't answer, **add it to `decisions_open.md`** and flag it for Abhi — don't guess on product behavior.

**Git workflow (locked): preview-first, two explicit gates.** The repo lives in this folder; `main` = approved state only, never committed to directly.

1. **Discuss → finalize** the work with Abhi.
2. **Gate 1:** ask for explicit approval → Abhi says "approved" → **Claude executes** `git commit` to the **local `preview`** branch only. **Nothing is pushed to GitHub.** Abhi reviews by opening the local `code/index.preview.html`.
3. **Gate 2:** ask "ready to push to main?" / "does preview look good?" → Abhi says yes → **Claude executes** the `preview` → `main` merge **and `git push origin main`**. This is the **only** step that touches GitHub (and therefore the only step that triggers the live Netlify deploy).
4. **Gate 2 is not complete until it's logged.** Immediately after **every** push to `main`, in the **same session**, Claude updates the docs to match what just landed: move the finished items from `pending.md` to `completed.md` (date + one-line note + files touched), and update any other doc the change affects (the "Current status" block in `CLAUDE.md`, `product_vision.md`, etc.). Landing on `main` is what "done" means — and "done" includes the log. An unlogged change on `main` is an **incomplete Gate 2**. If preview has a mistake, roll it back locally; nothing random ever reaches GitHub or `main`.

> **GitHub & who runs git (locked 2026-06-20):** `preview` is **local-only — never pushed to GitHub.** GitHub's only branch is `main`, and it changes **only** at Gate 2. Claude runs all git commands directly (Abhi no longer pushes via VS Code), but **both gates remain human checkpoints:** Claude commits to local `preview` only after Abhi's explicit "approved," and pushes to `main` only after an explicit "push to main." The verbal approval *is* the gate; execution is automatic once given. Net effect: nothing reaches GitHub or the live site until Abhi says "push to main."
>
> **Logging is mandatory (locked 2026-06-20):** every push to `main` **must** be recorded in `completed.md` (+ any doc the change affects) within the same session — Claude does this automatically as the closing step of Gate 2, without waiting to be asked. The push and the log are one atomic action.

**Entry-file naming (locked):** on `preview` the app entry is **`code/index.preview.html`** (double-click it to review); at the Gate 2 merge it becomes **`code/index.html`** on `main`.

**Doc hygiene (locked): mint condition.** Each fact lives in exactly **one** document; other docs cross-reference it, never restate it. Abhi audits for overlap.

---

## Current status (as of 2026-07-01)

- ✅ **Accounts + cloud sync: LIVE on `main` (2026-06-29).** The app boots behind a **login gate** (`code/js/cloud.js`). Kids log in by **username**; progress + daily time sync to a free **Supabase** backend (`accounts` + `activity` tables) with a device-wins merge. A pre-seeded **admin** login (`abhijeetwalke` / `admin`) opens a **Parent Admin dashboard** of every kid + **real day-by-day history** (completions grouped by their true saved timestamps, merged with measured time-per-day; updated 2026-06-30). Existing logins: `ayanshwalke` (kid), `abhijeetwalke`/`admin` (admin). ⚠️ This is the **plaintext `accounts`-table** version (Abhi's accepted risk — "it's trivia"); the secure Supabase-Auth+RLS rebuild was reverted (it would've broken login since `profiles` was never created). Optional hardening SQL sits in `docs/supabase-setup.sql`. Full log: `completed.md` + `decisions_open.md` (2026-06-25 / 2026-06-29).
- ✅ **Math product vision: fully baked.** No open product decisions.
- ✅ **Docs hardened + reorganized:** repo split into root `CLAUDE.md` + `docs/` (six docs) + `code/` (app); staleness swept (see decision log).
- ✅ **Math: LIVE** at **summercamp-fun.netlify.app** (Netlify auto-deploys from `main`). Full diagnostic engine + the **800-question bank** (400 Book Five + 400 Book Six; all G5+G6 Common Core standards; tier mix 30/40/30 — Content Track complete, validated, pushed). **Recent Math updates (2026-06-18):** Four Nations map **rebuilt as clustered landmasses with thin ocean cracks + subtle inked labels** (replacing the cramped per-element "rocks" and heavy brown badges — Abhi feedback); painterly cel-shading + darker palette; **exotic-clay Bending-Levels panel** with per-row hover info; **runaway-clock cap**; **review-follow-through ("due diligence")** metric on missed problems; retakes fold under their chapter; and a **launch fix so new players get a startable Chapter 1** (was showing only locked Chapter 2+). Still pending: parameterized variants (P2.4) and **parent spot-check of the bank (C.4)**.
- ✅ **World Awareness: LIVE on `main`, deepened to 61 lessons (2026-07-01).** The **World land on the index map** (`#/world`): 6 continents now at **10 lessons each (Americas 11) = 61 total** (was 39), plus 6 section quizzes & badges, a 29-country atlas, a Geography Drill, and per-continent "Big Question" debate cards. **Deepening (Epic A, 2026-07-01):** the ~22 new lessons add the dimensions the original political-history set lacked (physical geography, wildlife, science/invention, arts & daily-life culture, human origins, environment); **real-photo treatment** on scenes (Wikimedia Commons via `Special:FilePath`, graceful SVG fallback + caption/credit; new `photo` beat + `sceneFigure()`); **per-lesson word-count footer**; XP level ladder rescaled for ~60 lessons and **Completionist** trophy made dynamic (`totalLessonCount()`). Earlier **2.0 (2026-06-18):** XP & explorer levels (Explorer→…→World Master), a 9-trophy shelf, doubled reading, `summer-camp-world-v1` v2 migration (no saved data lost). Files: `code/js/wa/*`, `code/css/wa.css` (scoped under `.wa-scope`); wa scripts at `?v=19`, `wa.css ?v=13`. Verified static-only (no JS runtime on this machine — jsdom not re-run); Abhi in-browser review at Gate. Full log: `completed.md` (2026-07-01) + `decisions_open.md`.
- ✅ **Landing map: redesigned to nature biomes, LIVE on `main` (2026-07-01, Epic D).** The flat airport/control-tower motif is **replaced with six nature-biome "postcard" cards** (tropical/alpine/aurora/mediterranean/canyon/coast), each a **real scenic photo over an SVG-biome fallback**; OPEN/OPENING-SOON states, click-routing, and the `.land[data-subject]` contract preserved (subtitle → "Pick a land to explore"). Files: `code/js/map.js` (`?v=3`), `code/js/app.js` (`?v=2`).
- 🟡 **Basketball ("Hardwood"): BUILT on `preview` (Abhi's 2nd depth-first override; spec'd 2026-06-17, built by the scheduled run + content passes 2026-06-18).** Own clean **"Hardwood"** theme (no franchise skin), built to read for a **14-year-old** (sleek sports-broadcast look), teaching-first like World Awareness. Integrated as the **Basketball land on the index map** → `#/hoops` (its own scoped world: `code/js/hoops/*`, `code/css/hoops.css`, localStorage `summer-camp-hoops-v1`, `file://`-safe). **As built:** 4 subsections — Heart of a Champion (grit), The Record Books, Roots & Revolution (honest-but-age-appropriate history), Legends & Greatest Moments (+ GOAT debate card) — **20 lessons, a 6-question quiz per lesson + a section review each = 159 quiz questions**, Trophy Case rewards, real Wikimedia photos (Hardwood-SVG fallback + captions/credits), flags/banners + California flag, Warriors (Curry) + Lakers (LeBron/Magic/Kareem/Kobe/Shaq) home-court angle, glossary tooltips, effort-not-ability/no-shame language; records fact-verified to 2026. **Post-build fixes (2026-06-18):** routing-bug fix (land click now reaches `#/hoops`), every lesson quiz **leveled to 6 Qs**, all sections **un-gated** (any order), and **every lesson expanded into a ~15-min read at a 13-yo level (~1,100–1,300 words, avg ~1,180)** with a word-count line per lesson + overview reading on the hub & subsection pages. Headless-tested (jsdom) incl. full quiz play-throughs; **not committed to git** — on the working tree with Math + World awaiting Abhi's gates. Spec + as-built: `product_vision.md` → "Basketball"; full log: `completed.md`.
- 📄 **Vision viewer:** `docs/product_vision.html` is a navigable (sticky TOC) HTML view generated from `product_vision.md` by `docs/build-vision-html.js` — regenerate after any vision edit.
- **Next step:** Math is live; its remaining items are **parameterized variants (P2.4)** and a **parent spot-check of the 800-bank (C.4)** — the bank itself is built and shipped. World Awareness (61 lessons) + the nature-biome landing map are now live on `main`. **Active epics still in flight (2026-06-30 backlog in `pending.md`):** Epic B — app-wide artwork enrichment (Sun & the Sword is most barren = highest priority); Epic C — quizzes to 10 Qs/lesson (Sun & Sword, Basketball). Basketball: Abhi reviews → Gates. Optional Basketball levers: uniform section-review counts; more imagery.

---

## Hard constraints (don't violate)

- **Accounts + cloud sync — ADDED 2026-06-25 (supersedes the prior "no login during the build" rule; Abhi-approved).** Real per-kid accounts (name/sex/birthday/username/password) + a pre-seeded **admin** view of every kid's info + daily time, backed by a free **Supabase** project (`code/js/cloud.js`); login now gates the app, and the `role` field (kid/admin) is live. ⚠️ **Known security limitation Abhi knowingly accepted to ship:** the custom `accounts` table holds passwords in **plain text** and is **readable via the public key** (client-side login pattern) — full accepted-risk note + the recommended fix (move to **Supabase Auth + RLS**) is logged in `decisions_open.md` (2026-06-25). Don't treat this as secure until that fix lands.
- **Stack: plain HTML/CSS/JS, no framework, 100% free.** Questions = static JSON; progress = browser `localStorage` — and, since 2026-06-25, also synced to a **free Supabase backend** for cross-device accounts (the original "no backend" rule was relaxed by Abhi for accounts/sync only). Hosting = free static host. (Full setup + build order in `pending.md`.)
- **5 answer options** on every question; **clicks-to-correct** is the core diagnostic signal.
- **Hints never carry the kid to the answer** (Miss 1 nudge → Miss 2 first step → Miss 3+ none).
- **Effort-based language only** — never "you're smart"; reward what the work produced.
- **Mastery = 80% first-click rate** per domain (with a ~15–20 minimum-attempts guard) → bending-level bump + territory turns green.
- **Visuals:** prefer reliable static SVG over fragile interactive JS widgets.
- **Clean/positive content** throughout — age-appropriate, no shame, apolitical tone.
- Themes use franchise-**inspired** styling (names, palettes, vibes), **not** official copyrighted artwork/assets. *(Logged exception, Basketball only, 2026-06-17: real photos of real players/venues/moments are allowed — it's a private, non-commercial gift; source freely-licensed first (Wikimedia/public-domain) with original SVG fallback, captions+credits. This does not change the rule for franchise themes.)*
