# CLAUDE.md — Project Front Door

**Read this first.** It orients you (Cowork / Claude Code) to the whole project so you can pick up exactly where work left off.

---

## What this project is

A summer-project educational **web app for an 11-year-old** (just finished 5th grade, attends RSM accelerated math). It's a **diagnostic-first** learning app — it surfaces skill gaps through fun, themed testing, then teaches to those gaps. The first and only subject being built now is **Math**, themed around **Avatar: The Last Airbender**. Other subjects are designed later, one at a time (depth-first).

**Core philosophy:** diagnose before teaching; pull the kid in with easy early wins, then ramp to flow; reward effort, never raw ability; keep it a clean, positive, no-shame space.

**Project location:** `/Users/abhiwalke/MyApps/AyanshSummerCamp`

---

## The documents (read in this order)

1. **`CLAUDE.md`** (this file) — orientation + current status.
2. **`product_vision.md`** — the **frozen spec**. The complete "what we're building" for Math: themes, Avatar mapping, Mission engine, hints, dashboard, mastery mechanics, rewards, progression, UI, sourcing, style tags. **Treat as locked** — don't redesign; build to it. Changes to vision happen only via explicit decisions with Abhi.
3. **`pending.md`** — the **build-work backlog** (engineering tasks), pre-populated with the full Math task breakdown across two sessions (S1 = 800-question bank, S2 = app shell + wiring). **Work from here.**
4. **`completed.md`** — finished build work. **When you finish a task, move it here** with a date + short note + file paths.
5. **`decisions_open.md`** — **product** decisions still needing Abhi's input. Currently: none — Math is fully decided. (Also holds the running decision log and operating notes.)
6. **`deferred.md`** — parked subjects (World Awareness, Science, Logic, Basketball) and features (auth, video, photo-upload). Don't build these until Math ships.

**Word discipline:** "**pending**" = build work (`pending.md`). "**open**" = product decisions (`decisions_open.md`). They don't overlap.

---

## How to work this project

1. **Read `product_vision.md` fully** — it's the source of truth for behavior.
2. **Pick the next task from `pending.md`** (top-down; respect the S1-before-S2 phasing).
3. **Build it** to the vision. Build platform-wide rules as a **reusable engine** (tiers, ramp, hints, streaks, timing, rewards, progression, UI shell, clicks-logging) so future subjects plug in fast; keep math-specific content (Avatar skin, element→domain map, question bank, journey routes) separate.
4. **Move the finished task to `completed.md`** with a date, a one-line note, and the files you touched.
5. If you hit something the vision doesn't answer, **add it to `decisions_open.md`** and flag it for Abhi — don't guess on product behavior.

---

## Current status (as of 2026-06-12)

- ✅ **Math product vision: fully baked.** No open product decisions.
- ⬜ **Build: not started.** `pending.md` is fully populated and ready.
- **Next step:** begin **Phase 0 — Foundation** in `pending.md` (project skeleton → data schema → reusable engine core → sample questions), then Phase 1 vertical slice.

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
