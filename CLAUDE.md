# CLAUDE.md — Project Front Door

**Read this first.** It orients you (Cowork / Claude Code) to the whole project so you can pick up exactly where work left off.

---

## What this project is

**App name (locked): Summer Camp.** A summer-project educational **web app for an 11-year-old** (just finished 5th grade, attends RSM accelerated math) — and possibly his friends later, so build it rich. It's a **diagnostic-first** learning app — it surfaces skill gaps through fun, themed testing, then teaches to those gaps. The first and only subject being built now is **Math**, themed around **Avatar: The Last Airbender**. Other subjects are designed later, one at a time (depth-first).

**Core philosophy:** diagnose before teaching; pull the kid in with easy early wins, then ramp to flow; reward effort, never raw ability; keep it a clean, positive, no-shame space.

**Project location:** `/Users/abhiwalke/MyApps/AyanshSummerCamp`

---

## The documents (read in this order)

1. **`CLAUDE.md`** (this file) — orientation + current status.
2. **`wisdom.md`** — the **distilled why**: 15 lines of project soul pulled from everything below. Read it before any build work; if a decision conflicts with it, wisdom wins — flag to Abhi.
3. **`product_vision.md`** — the **living spec**: the complete "what we're building" for Math (themes, Avatar mapping, Mission engine, hints, dashboard, mastery, rewards, progression, UI, sourcing, style tags). Build to it — but it's not frozen: when Abhi's words carry product-level signal, fold it into the vision directly (and log it in the decision log). Facelifts to its writing are welcome too (Abhi, 2026-06-12).
4. **`pending.md`** — the **build-work backlog** (engineering tasks), dependency-ordered phases + parallel content track. **Work from here.**
5. **`completed.md`** — finished build work. **When you finish a task, move it here** with a date + short note + file paths.
6. **`decisions_open.md`** — **product** decisions still needing Abhi's input. Currently: none — Math is fully decided. (Also holds the running decision log and operating notes.)
7. **`deferred.md`** — parked subjects (World Awareness, Science, Logic, Basketball) and features (auth, video, photo-upload). Don't build these until Math ships.

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
2. **Gate 1:** ask for explicit approval → Abhi says "approved" → commit/push to **`preview`**.
3. **Gate 2:** ask "ready to push to main?" / "does preview look good?" → Abhi says yes → merge `preview` → `main`.
4. **Only then** move the finished items from `pending.md` to `completed.md` — landing on `main` is what "done" means. If preview has a mistake, roll it back; nothing random ever reaches `main`.

**Entry-file naming (locked):** on `preview` the app entry is **`index.preview.html`** (double-click it to review); at the Gate 2 merge it becomes **`index.html`** on `main`.

**Doc hygiene (locked): mint condition.** Each fact lives in exactly **one** document; other docs cross-reference it, never restate it. Abhi audits for overlap.

---

## Current status (as of 2026-06-12)

- ✅ **Math product vision: fully baked.** No open product decisions.
- ✅ **Docs hardened:** pending.md gap-fixed vs vision; `wisdom.md` created; git repo initialized (`main` = baseline, work on `preview`).
- 🟡 **Build: first full pass on `preview`, awaiting Gate review.** Playable app at `index.preview.html` (double-click it). Detailed marks in the STATUS block atop `pending.md`'s build order.
- **Next step:** Abhi reviews preview → Gates → then the two long poles: parameterized variants (P2.4) and the full 800-question bank (Content Track).

---

## Hard constraints (don't violate)

- **No login during the build** — single site, everything on one surface. Keep a `role` field in the data model for later.
- **Stack: plain HTML/CSS/JS, no framework, no backend, 100% free.** Questions = static JSON; progress = browser storage; hosting = free static host. (Full setup + build order in `pending.md`.)
- **5 answer options** on every question; **clicks-to-correct** is the core diagnostic signal.
- **Hints never carry the kid to the answer** (Miss 1 nudge → Miss 2 first step → Miss 3+ none).
- **Effort-based language only** — never "you're smart"; reward what the work produced.
- **Mastery = 80% first-click rate** per domain (with a ~15–20 minimum-attempts guard) → bending-level bump + territory turns green.
- **Visuals:** prefer reliable static SVG over fragile interactive JS widgets.
- **Clean/positive content** throughout — age-appropriate, no shame, apolitical tone.
- Themes use franchise-**inspired** styling (names, palettes, vibes), **not** official copyrighted artwork/assets.
