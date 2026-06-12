# Pending — Build Work Backlog

**This file tracks BUILD WORK** (engineering tasks), not product decisions. Product decisions live in `decisions_open.md`; the frozen spec lives in `product_vision.md`.

**Lifecycle:** a task starts here → Cowork/Code builds it → the task moves to `completed.md` with a date + short note + files touched. Deferred subjects/features live in `deferred.md`.

**Scope: MATH only.** Other subjects and auth are in `deferred.md` until math ships.

---

## TECH & BUILD SETUP (read before coding)

**Stack: plain HTML / CSS / JavaScript. No framework, no build step, no backend. 100% free.**

- **No server, no database.** Everything runs client-side in the browser.
- **Question bank = static JSON** files shipped with the site (e.g. `/data/book5.json`, `/data/book6.json`). **Shipped as `.js` data files** (`window.X = {...}`) rather than fetched `.json`, so the app works opened directly from Finder (`file://` blocks `fetch` of local JSON). Same data, different wrapper.
- **All progress persists in the browser** via `localStorage` (or `IndexedDB` if data grows) — clicks, attempts, streaks, mastery, rewards, bending levels, territory state.
- **Hosting: free static host** (GitHub Pages or Cloudflare Pages) — $0/month.
- **Keep a `role` field (parent/child) in the data shapes now**, even though there's no login yet, so views can be gated later.
- **Known tradeoff (note, not a blocker):** progress lives on one device/browser. The eventual parent/child split will need light cloud sync — **deferred** (see `deferred.md`).

**Golden rules for the builder:**
- **Agile beats pretty.** Fast load, no jank. Effects never block first paint/input.
- **Build platform-wide rules as a reusable engine** (tiers, ramp, hints, streaks, timing, rewards, progression, clicks-logging, UI shell). Math plugs in content + Avatar skin + element→domain map. This is what makes the next subjects fast.
- **Vertical slice first:** get ONE Mission working end-to-end (load → answer → log → dashboard) before building breadth or polish.
- Prefer reliable static **SVG** over fragile interactive JS widgets.

**ENGINE vs MATH — every task below is one or the other:**
- **[ENGINE]** = platform-wide, subject-agnostic. Built once, reused by every future subject (world awareness, science, logic, basketball). No Avatar references in engine code — themes/strings/palettes come from config.
- **[MATH]** = math-specific content and skin: the question bank, Avatar narrative frame, element→domain map, journey routes/library, Pai Sho visuals, the Avatar continent map art.
- Rule of thumb: if basketball mode would need it too, it's [ENGINE]. Building all [ENGINE] work fully now is in-scope (approved by Abhi 2026-06-12) — it ships as part of Math, but written so the next subject is config + content, not new code.

---

# BUILD ORDER (dependency-sequenced — do phases in order)

> **STATUS (2026-06-12, on `preview` — moves to completed.md only after Gate 2 / main):**
> ✅ Phase 0 complete (P0.1–P0.4). ✅ Phase 1 complete (P1.1–P1.4). ✅ P2.1 journeys, P2.2 mastery + continent map, P2.3 streaks/timing/frustration/rewards, P2.5 three modules (fraction bar, number line, area model). ◐ P2.4 partial — bounce-backs re-serve the original question; parameterized variants still to build. ✅ P3.1–P3.3 initial (landing map + tactile click + sound + ambience + subject shell). ⬜ P3.4 deploy. ◐ Content: 60-question starter bank (of 800), schema-validated, balanced across elements/tiers/grades — NOT yet parent-spot-checked (C.4 gate).

## PHASE 0 — Foundation (build first; everything depends on it)

### P0.1 — Project skeleton
- [ ] Static site scaffold: `index.html`, `/css`, `/js`, `/data`, `/assets`. No build tooling.
- [ ] Simple client-side routing (hash-based or single-page view switching) — landing → subject → mission → dashboard.

### P0.2 — Data schema (the contract everything else uses)
- [ ] Define the **question JSON schema**: id, grade (5/6), element/domain (Water/Earth/Fire/Air/Spirit/AvatarState), Common Core standard code, tier (1/2/3), style tag (Visual/Insight/Deep-dive/Exploratory/Standards), parameterized template (variables + answer formula), 5 options, correct answer, distractors, Hint 1, Hint 2, thinking-model solution, optional interactive-module ref.
- [ ] Define the **progress/state schema** (in localStorage): per-question attempts & clicks-to-correct, per-domain first-click rate, mastery levels, territory state, streak, rewards/tiles, time logs, hint-efficacy. Include a `role` field.
- [ ] Write 5–10 **sample questions** by hand conforming to the schema, so the engine can be built and tested before the full bank exists.

### P0.3 — Reusable engine core (platform-wide, subject-agnostic)
- [ ] Mission builder: constrained randomization across elements + tiers + styles, no repeats, configurable count (~20).
  - **Even-spread is per-grade:** Spirit (SP) exists only in Grade 6 — Book Five spreads across 5 domains, Book Six across 6 elements.
  - **Avatar State (capstone) inclusion rule:** architect default — occasional cross-domain question (e.g., ~1 per Mission from week 2+); log the chosen rule in `decisions_open.md` for Abhi to tune.
  - **"Week" in the tier ramp = 5 completed Missions** (not calendar), so missed days don't skip difficulty. (Architect default; log it.)
- [ ] Tier-ramp config (week-by-week blend 70/25/5 → 25/45/30).
- [ ] State manager: read/write progress to localStorage; compute first-click rate per domain.
### P0.4 — Subject plug-in contract (the platform's key abstraction)
- [ ] Define the **subject config interface**: one JSON/config object per subject — id, display name, theme name, palette, reward currency (name, icon, bonus rules), domain/element list + display names, mission size, tier-ramp ref, content paths (question bank, journey library), landing-map land ref, "coming soon" flag.
- [ ] Math is the first instance of the contract; the other four subjects exist as stub configs (coming-soon lands). **Adding a future subject must require zero engine-code changes** — config + content only.
- **Phase 0 done when:** the data shapes are fixed, a few sample questions load, the engine can assemble a Mission in memory, and the subject contract exists with Math as instance #1.

*Phase 0 is entirely [ENGINE].*

---

## PHASE 1 — Vertical Slice (one Mission, end to end)

Goal: a single playable Mission proving the whole loop, before breadth/polish.

### P1.1 — Mission play screen
- [ ] Render a question: prompt + **5 answer options**.
- [ ] Show the question's **style tag bottom-right** (Visual / Insight / Deep-dive / Exploratory / Standards) — per the vision, which styles click is its own diagnostic.
- [ ] **Never show grade/Book (5th vs 6th) in kid-facing UI** — grade is data-only (see vision, Daily Mission Flow).
- [ ] Keep-clicking-until-correct; **log clicks-to-correct**.
- [ ] **Live per-question attempt counter** + Mission-level running tally.

### P1.2 — Hint system
- [ ] Miss 1 → Hint 1 (nudge); Miss 2 → Hint 2 (first step); Miss 3+ → no hint, flag hot.
- [ ] Track hint efficacy (post-hint first-click success).

### P1.3 — Results dashboard
- [ ] Click-distribution view ("Out of 20 — 3×4 clicks, 2×3 …").
- [ ] Links to flagged problems.
- [ ] Total session time (per-question optional).
- [ ] Soft-spots by domain.

### P1.4 — Closed-loop walkthrough
- [ ] Per-problem thinking-model walkthrough (interactive, not passive).
- **Phase 1 done when:** he can open one Mission, answer 20 questions, get hints, see the dashboard, and open a thinking-model for a missed problem — all persisting across refresh.

*Phase 1 is [ENGINE] (UI + logic); the sample math questions are just test data.*

---

## PHASE 2 — Full Math Experience (breadth on the proven slice)

### P2.1 — Mission-as-journey
- [ ] Story wrapper: template-generated journey (place A → place B), each problem a challenge en route; arrival on completion.

### P2.2 — Progression & mastery
- [ ] **Math World Map (the zoomed-in Avatar continent) — render it.** Static SVG of the nations/territories (Water, Earth, Fire, Air, Spirit, Avatar State home), heat-colored by mastery (gray→amber→green), with completed journey routes traced visibly. This is the results centerpiece — distinct from the Phase 3 *landing* map.
- [ ] Mastery engine: **80% first-click rate** per domain (with ~15–20 min-attempts guard) → bending-level bump + territory color (gray→amber→green). **Mastery rate uses first attempts only** (diagnostic of record); retakes/redemption logged separately. Bounce-back first-clicks DO count.
- [ ] Bending levels (Apprentice→Adept→Master) per element. Avatar State level/territory rule = architect default (e.g., unlocked by mastering the others); log it.
- [ ] Territory unlocks tied to journey routes.

### P2.3 — Engagement systems
- [ ] Mon–Fri **streak** tracker + redemption choice (5-problem set or reset).
- [ ] **Session timing:** ~40–60 min budget; top-right clock with **on/off toggle**; gentle "~10 minutes left" nudge (no anxiety countdown); elapsed time always recorded.
- [ ] **Frustration sensing** (stall / rapid-fire / abandonment) → Tier 1 breather + optional break ("Even the Avatar rests"). Breather swaps are logged and excluded from tier-blend accounting; all triggers surfaced on the dashboard.
- [ ] **Rewards:** Pai Sho tiles, effort-aligned (completion + first-click streaks + hint-free + bounce-backs); collection screen; never gating.

### P2.4 — Replenishment
- [ ] Variant generator from parameterized templates.
- [ ] Missed-problem variants re-enter after ~1–2 weeks; bounce-backs feed the mastery rate.

### P2.5 — Interactive concept modules
- [ ] Number line, fraction bar, area model, place-value explorer — SVG-first, reliable; embedded in walkthroughs.
- **Phase 2 done when:** a full week of Missions works with story, mastery progression, streaks, rewards, timing, and replenishment.

*Phase 2 is [ENGINE] except: journey library content, the Avatar continent map art, and the concept modules' math content — those are [MATH].*

---

## PHASE 3 — Landing Map & Polish (last; it's the front door but depends on subjects existing)

### P3.1 — Landing map
- [ ] World of 4–6 **asymmetric continents** drifting together — fissures, ocean edges, jagged-puzzle composition. One land per subject.
- [ ] Math land labeled **"Airbender (Math)"**; other lands present but **"Coming Soon"** (clickable, fire the click feedback, but don't navigate).
- [ ] **Tactile click:** visual press-down + spring-back / crack-snap micro-animation + click **sound**.
- [ ] Active land (Math) zooms into the subject world.

### P3.2 — Ambient effects (classy, restrained)
- [ ] Occasional bird / small V drifting across; gentle ocean tides at edges. Behind the lands, never competing.
- [ ] **Perf guardrails:** CSS/SVG/light-canvas only (no heavy video/sprites); start after map is interactive (never block first paint/input); pause when tab backgrounded; honor `prefers-reduced-motion`; cap frame cost. If an effect costs speed/responsiveness, cut it.

### P3.3 — Subject-world shell
- [ ] Top-nav subjects; left side-panel **ribbon** of Missions.
- [ ] Sequential unlock (one Mission open at a time); past Missions viewable + retakeable with visible **attempt counts** (first attempt = diagnostic of record).
- [ ] Simple, clear fonts (no fancy typefaces); Avatar palette with per-nation tints.

### P3.4 — Ship it
- [ ] Deploy to a free static host (GitHub Pages or Cloudflare Pages); verify localStorage persistence on the live URL.
- [ ] Smoke-test on the actual devices he'll use (laptop/tablet browser); check load speed and tap targets.
- **Phase 3 done when:** the app opens on the living map, math zooms in, coming-soon lands behave, the whole thing stays agile, and it's live on a real URL.

*Phase 3 is [ENGINE] — lands, palettes, and labels come from subject configs (P0.4); Avatar palette values are just Math's config.*

---

## CONTENT TRACK (runs parallel — the 800-question bank) — all [MATH]

This is the big content lift; it can proceed alongside Phases once P0.2 schema is fixed.

### C.1 — Coverage matrix
- [ ] Common Core checklist: Grade 5 (~26 standards: OA, NBT, NF, MD, G) + Grade 6 (~29: RP, NS, EE, G, SP).
- [ ] Allocate ~14 questions/standard across 3 tiers × 5 style tags — no standard or style under-covered.

### C.2 — Generation (800 total)
- [ ] Book Five (400): Kangaroo/AMC/RSM-**caliber** problems; LLM-generate vs. Common Core for the rest.
- [ ] Book Six (400): same mix.
- [ ] **Copyright rule:** all questions are **original, written in the style of** Kangaroo/AMC/RSM — never copied verbatim (competition questions are copyrighted; originals also fit the parameterized-template requirement better).
- [ ] Each as a parameterized template (numbers as variables, answer computed) for mechanical variants.
- [ ] 5 options each; distractors reflect **common mistakes**, not random.

### C.3 — Solutions & hints
- [ ] Thinking-model solution per question (intent → mental process → step-by-step).
- [ ] Hint 1 from the intent; Hint 2 from the first step. Hints never carry to the answer.

### C.4 — Validation
- [ ] **Automated answer-check harness (script, not eyeballs):** for every parameterized template, recompute the answer from the variables and confirm it matches the keyed option; verify exactly one correct option among the 5; run across multiple variant instantiations. At 800 questions this must be tooling.
- [ ] Verify domain/tier/style tags (scripted checks for distribution + completeness; human judgment for tier sanity).
- [ ] Parent spot-check before entering the live pool.

### C.5 — Journey template library (content for P2.1)
- [ ] Library of Avatar-world **locations**, **travel beats**, and **challenge framings** (river crossing, market barter, glider repair…) that the Mission-as-journey engine composes from — enough variety to stay fresh all summer.
- [ ] Routes mirror each Mission's element coverage where possible.
- **Content done when:** all 800 validated, tagged, and loadable as static JSON, and the journey library covers a full summer without repeats feeling stale.

---

## SUGGESTED ORDER FOR COWORK
1. **Phase 0** (foundation + schema + engine + sample questions)
2. **Phase 1** (vertical slice — prove the loop)
3. Begin **Content Track** in parallel (C.1 → C.2 …) once schema is frozen
4. **Phase 2** (full experience)
5. **Phase 3** (landing map + polish + deploy)

**Note on S1/S2 phasing:** `CLAUDE.md` / `product_vision.md` frame the build as "Session 1 = question bank, Session 2 = app." This file's order refines that: the **P0.2 schema must freeze before the bank is written** (questions conform to the schema, not vice versa), so Phase 0 + the vertical slice come first, then the bank in bulk. Spirit of S1/S2 preserved — the bank is still the big dedicated lift, it just starts after the contract exists.

Expand each task at build time: read the task, read the matching section of `product_vision.md`, propose the implementation, then build. Move finished items to `completed.md`.
