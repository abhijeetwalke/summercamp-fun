<a id="top"></a>

# Ayansh Summer Camp — Product Vision

This document holds **locked decisions** — the frozen product spec for Math, ready to build.

**Document set** (full orientation in `CLAUDE.md`): `product_vision.md` (this — the frozen spec) · `pending.md` (build-work backlog) · `completed.md` (finished work) · `decisions_open.md` (product decisions still needing Abhi) · `deferred.md` (parked subjects/features). Word discipline: "pending" = build work, "open" = product decisions.

---

## 📖 Contents

- [Project Overview](#project-overview)
- [Build Strategy](#build-strategy)
- [Platform-Wide Rules vs. Subject-Specific Rules](#platform-wide-rules-vs-subject-specific-rules)
- [Themes](#themes)
- [Index Page — The Landing Map](#index-page-the-landing-map)
- [UI & Navigation](#ui-navigation)
- [Math Mode — Avatar: The Last Airbender](#math-mode-avatar-the-last-airbender)
- [Accounts & Auth](#accounts-auth)
- [World Awareness](#world-awareness)
- [Basketball](#basketball)
- [The Sun & the Sword](#the-sun-the-sword)
- [Design Principles](#design-principles)

---

<a id="project-overview"></a>
## Project Overview

**App name (locked): "Summer Camp."** Simple, true to what it is, and roomy enough to hold every future subject as a camp activity.

A summer-project web app for an 11-year-old (just completed 5th grade, attends RSM). The app is organized as **modes** (subjects) presented as themed worlds on an index map. The first deliverable is the **Math mode diagnostic engine** — a fun, testing-first experience that surfaces skill gaps. It is explicitly **not** a tutoring product; diagnosis comes first, learning content is keyed to exposed gaps afterward.

This spec covers the **diagnostic piece**. The post-diagnostic learning session is a placeholder hook (see `decisions_open.md`).


[↑ Back to top](#top)

<a id="build-strategy"></a>
## Build Strategy

**Depth-first, not breadth-first.** Math gets fully densified and baked in the product vision before any other subject moves — no advancing three topics one pawn-step at a time. A fully baked vision makes the build-out fast. This is the working style for all future modes as well: bake one completely, then build.

**Tech stack (locked): plain HTML / CSS / JavaScript — no framework, no build step, no backend. 100% free.** Questions ship as static JSON; all progress persists in the browser (localStorage / IndexedDB); hosting is a free static host (GitHub Pages / Cloudflare Pages). Tradeoff: progress is per-device until a later light cloud-sync (deferred). Full build sequencing lives in `pending.md`.

---


[↑ Back to top](#top)

<a id="platform-wide-rules-vs-subject-specific-rules"></a>
## Platform-Wide Rules vs. Subject-Specific Rules

Some rules belong to the **platform** (true for every subject — math, world awareness, science, logic, basketball) and should be built as shared/common mechanics, not re-invented per subject. Others are **subject-specific**.

**Platform-wide (common across all themes):**
- Three difficulty tiers (easy / medium / hard) and the **week-by-week tier-blend ramp** (the 70/25/5 → 25/45/30 schedule, hand-tuned from data).
- **Five answer options** on every question.
- **Clicks-to-correct** logging + live per-question counter + Mission-level tally.
- **Hint ladder** (Miss 1 nudge → Miss 2 first-step → Miss 3+ none) with efficacy tracking.
- **Closed-loop** thinking-model solutions + interactive concept modules.
- **Streaks** (Mon–Fri, redemption choice), **session timing** (time budget, toggle clock), **frustration sensing**.
- **Rewards** (theme-native currency, effort-aligned, never gating) and **progression payoffs** (status levels + territory unlocks).
- **UI shell**: top-nav subjects, left ribbon, sequential unlock, retakes with attempt counts, simple clear fonts, theme-native palettes.
- **Pull-don't-push** + **effort-based (never ability-based)** feedback.
- **Pedagogical style tags** concept (the specific styles may vary by subject).

**Subject-specific (math example):**
- The **Avatar** narrative frame and **element-to-Common-Core-domain** mapping.
- Math's particular **style tags** (Singapore bar-model, sansu, etc.).
- The math **question bank** and its thinking models.
- **Mission-as-journey** routes through the Avatar world.

Builder guidance: implement platform-wide rules as a reusable engine; each subject plugs in its own content, theme skin, and domain map.

---


[↑ Back to top](#top)

<a id="themes"></a>
## Themes

Available franchise themes: **Naruto, One Piece, Avatar: The Last Airbender, Pokémon**.

Rule: **one subject = one theme.** Themes are never mixed within a subject.

| Theme | Subject |
|---|---|
| Avatar: The Last Airbender | **Math** |
| ~~One Piece~~ → its own **"Atlas"** theme (as built) | **World awareness** (history & geography across continents) |
| Pokémon | **Science / data** (taxonomy, stats, knowledge collection) |
| Naruto | **Logic / puzzles** (skills-drill mode) |
| Basketball (itself — no franchise wrapper) | **Basketball** (quiz mode: greats, record-holders, US & world records) |

> **Theme update (2026-06-17):** World Awareness was originally pencilled in for a One Piece skin, but when built it got **its own clean "Atlas" identity** (explorer's-journal look) — the vision had always allowed a subject to stand as its own theme (like Basketball), and a neutral atlas fit world history better than a pirate skin. Science and Logic remain as mapped above.

> **Basketball update (2026-06-17, Abhi):** Basketball is now **fully spec'd** (see the [Basketball](#basketball) section) — a deliberate second override of depth-first, after World Awareness. It is its own clean **"Hardwood"** theme (no franchise skin), **teaching-first** like World Awareness (read the story → quiz at the end), built around **grit & perseverance, records, and history**. **Built on `preview` 2026-06-18** (see the [Basketball](#basketball) section).

Science and Logic are named but **not yet designed** — Math is being fully baked, with World Awareness and now Basketball built alongside (see Build Strategy + their sections). **Basketball** is its own subject themed simply as basketball — he loves it as-is, so it needs no franchise skin.

Theme-to-subject mapping is config-driven, not hardcoded.

Note for the builder: use franchise-*inspired* styling (names, palettes, vibes), not official artwork or assets.

---


[↑ Back to top](#top)

<a id="index-page-the-landing-map"></a>
## Index Page — The Landing Map (locked)

The app opens on a **world map of continents drifting together** — the visual centerpiece and the front door to every subject.

- **Composition:** 4–6 **asymmetric landmasses** meeting in an abstract way — cracked lands in the middle with **fissures** between them, **ocean** around the edges. The pieces fit like a jagged puzzle that doesn't quite interlock — irregular seams, not clean borders.
- **One land per theme/subject.** The Avatar continent is labeled **"Airbender (Math)"** — franchise name with the subject in parentheses. The other lands are the other subjects.
- **Tactile click (mostly visual + sound):** clicking a land gives a satisfying **press-down-and-spring-back** "ka-chunk" — the land depresses slightly and snaps back, a crack/snap micro-animation, accompanied by a **click sound**. The feel is physical and deliberate.
- **Active land (Math):** the click zooms into that continent → the math world (nations/elements, the Missions ribbon, etc.).
- **Active lands (Math, World Awareness, Basketball):** clicking zooms in and enters that world. *(World Awareness was activated 2026-06-17 → `#/world`. Basketball — the "Hardwood" land — was built 2026-06-18 and routes to `#/hoops`.)*
- **Inactive lands (Science/Data, Logic):** visible on the map and **still clickable** — the tactile click feedback fires — but they show a **"Coming Soon"** label and do **not** lead anywhere, because nothing is built behind them yet. (Builds anticipation.)
- Navigation overall: landing map → click a land → (Math) zoom into the subject world → mode home → start today's Mission.

### Ambient Effects — Landing Map (locked)

Subtle background life that makes the map feel alive without distracting. **Classy and restrained, never in-your-face.**

- **Occasional bird:** every so often (not constant) a bird — or a small Avatar-style V — drifts across the screen and is gone. Rewards a glance; never demands attention.
- **Gentle tides:** the ocean breathes softly at the land edges — slow, subtle, calm.
- **Restraint is the rule:** ambient effects sit *behind* the lands and never compete with them. If in doubt, less.

**Performance guardrails (hard — agile beats pretty):**
- Lightweight and GPU-cheap only: CSS transforms/opacity, SVG, or light canvas. **No heavy video, no huge sprite loops.**
- Page must stay **agile** — fast load, no jank, no waiting. Effects start **after** the map is interactive and never block first paint or input.
- Pause/reduce animation when the tab is backgrounded; honor **prefers-reduced-motion**; cap frame cost so it never becomes a CPU/battery hog.
- **Rule:** if an effect ever costs load speed or responsiveness, the effect loses.


[↑ Back to top](#top)

<a id="ui-navigation"></a>
## UI & Navigation (locked)

- **Top nav: the subjects/topics sit up top** (Math, World awareness, Science/data, Logic/puzzles, Basketball), each in its theme.
- **Side-panel ribbon:** inside a subject, a left-hand panel shows the Missions laid out as a ribbon, in order.
- **Sequential unlock: only one Mission is unlocked at a time.** All previous Missions remain fully visible — their content, results, everything.
- **Retakes allowed, and counted:** any previous Mission can be taken again. Every Mission carries a **session count** — which attempt this is — shown right on the ribbon (e.g., "attempt 2"). The **first attempt is the diagnostic of record**; retakes are logged separately as improvement signal (they pair naturally with bounce-back rewards).
- **Color:** each subject uses its theme-native palette (Avatar world colors for math — and within it, nation palettes can tint their territories: Water Tribe blues, Earth Kingdom greens, Fire Nation reds, Air Nomad oranges). Tweakable.
- **Laptop-first, full-bleed (locked, 2026-06-12):** the app is custom-cut for MacBook/laptop screens — layouts stretch to fill the viewport, the landing map is a full-screen scene, and no screen ships with large dead margins. Mobile-friendliness is explicitly NOT a requirement.
- **Visual richness bar (locked, 2026-06-12):** maps and worlds must feel like a hand-illustrated treasure map, not a diagram — amorphous organic landmasses (never plain geometric shapes), parchment texture, per-element iconography and terrain motifs (mountains, waves, flames, swirls, trees), dashed journey routes traced on the map, a compass rose, sea creatures, ambient life. Mystical and abstract beats simple and clean-empty; no large dead whitespace on any screen. All artwork original SVG, franchise-inspired — never copied assets. (Perf guardrails still rule: filters render static, animations stay transform/opacity.)
- **Painterly polish + darker palette (locked, 2026-06-13 — after Abhi's "childish, not polished anime" feedback):** map art is **cel-shaded** — layered top-light/bottom-shadow gradients, a soft cast shadow under each landmass, a thin rim-light — over a **deeper, richer palette** (deep-teal ocean, aged parchment, darker territory fills) so it reads as polished anime, not childish-flat. **Map structure (rebuilt 2026-06-18 after Abhi's "looks like a rock" feedback):** the Four Nations are **six larger landmasses clustered into one continent silhouette, separated by thin ocean cracks** (a distant, jointed look) — not tiny separate islands; each element's locations spread across its region so they have room. Element identity shows as **subtle inked labels** on the land (element name + level·% with a soft cream halo — *not* heavy badges); **location names are hidden until hover** (visited stops stay named), so the map reads clean. An in-map **legend** explains the dashed lines (= your journeys) and the ✕ (= journey's end). Clicking a land **zooms in place** (no sideways lurch) before entering the world. Feature panels (e.g. Bending Levels) may use an **exotic-clay** surface; each Bending-Level row carries **hover info** (its Common-Core domain + what the level/% means). Still all original SVG; perf guardrails hold.
- **Typography: clear and simple, never fancy.** An 11-year-old has good eyes — the font just needs to stay out of the way. No decorative typefaces, no fonts that make him think about the font. Attractive **themes**, simple type, everything clearly visible.

---


[↑ Back to top](#top)

<a id="math-mode-avatar-the-last-airbender"></a>
## Math Mode — Avatar: The Last Airbender

### Core Narrative Frame

The premise of the show is the premise of the diagnostic: **the Avatar must master all four elements — he must master all math domains.** The student is the Avatar.

### Theme-to-Structure Mapping

| Avatar concept | Math structure |
|---|---|
| **The Avatar** (the student) | Must achieve mastery across all elements/domains |
| **Books** (seasons, e.g. "Book One: Water") | Grade levels — **Book Five** (advanced 5th), **Book Six** (6th) |
| **Nations / elements** | Common Core domain clusters — Water, Earth, Fire, Air, Spirit, + Avatar State capstone (table below) |
| **Missions** | Daily 20-question diagnostics |
| **World Map** | Results heat map — each nation's territory colored by mastery |

### Element-to-Domain Mapping

Full Common Core coverage — every Grade 5 and Grade 6 domain has a home; no domain is missed.

| Element | Logic | Grade 5 domain | Grade 6 domain |
|---|---|---|---|
| **Water** | flow, fluidity | Number & Operations — Fractions (NF) | The Number System (NS) |
| **Earth** | solid, structural | Geometry (G); Measurement & Data (MD) | Geometry (G) |
| **Fire** | power, transformation | Operations & Algebraic Thinking (OA) | Expressions & Equations (EE) |
| **Air** | balance, movement | Number & Operations in Base Ten (NBT) | Ratios & Proportional Relationships (RP) |
| **Spirit / Energy** | the unseen, patterns you can't see directly | — (no G5 stats domain) | Statistics & Probability (SP) |
| **Avatar State** | true capstone — mastery of all at once | cross-domain mixed multi-step | cross-domain mixed multi-step |

Coverage check — **Grade 5 (5 domains):** OA, NBT, NF, MD, G — all mapped. **Grade 6 (5 domains):** RP, NS, EE, G, SP — all mapped. Statistics & Probability gets its own first-class element (**Spirit**) rather than being buried. **Avatar State** is now purely the cross-domain capstone, not a dumping ground for unmapped domains.

### Question Pools

- **Book Five (advanced 5th grade): 400 questions.** "Advanced" because he has already passed 5th grade; calibrate to the top end.
- **Book Six (6th grade): 400 questions.**
- **Coverage guarantee:** no Common Core standard within either grade is missed. Grade 5 ≈ 26 standards, Grade 6 ≈ 29 — at 400/grade that's ~14 questions per standard, enough to cover each standard across multiple **style tags** and **difficulty tiers** without holes. (At the old 400 total it was ~7–8/standard — too thin once split by style × tier.)
- **Build phasing:** 800 questions, each with a thinking-model solution and two derived hints, is a deliberate multi-session build. Plan: **Session 1** — generate + validate the question bank (top-tier, no sloppiness). **Session 2** — app shell, UI, wiring. No corner-cutting; if it spills to a third session, fine.
- Distribute questions **evenly across the Common Core domains** within each grade.
- Question style: **applied math, competition-flavored** — Math Kangaroo / AMC 8 / international 5th–6th grade competitive-exam caliber. Multi-step reasoning and word problems preferred over bare computation.
- **Difficulty tiers:** every question is tagged Tier 1 (easy / confidence-builder), Tier 2 (grade-solid), or Tier 3 (competition-stretch).
- **Sourcing (locked):** the initial 800 are a **mix** — hand-curated from Math Kangaroo, AMC, and RSM, *plus* LLM-generated against Common Core specs (answer-checked, domain- and tier-tagged, parent spot-checked before entering the pool).
- **Pedagogical style tags (locked):** every question also carries a **style tag** (shown bottom-right of the question) capturing the *character* of the problem, not just its domain. The same domain (fractions stays fractions) can appear in different styles — and which styles click for him is its own diagnostic signal a US classroom would never surface:
  - **Visual / Model-based** — Singapore bar-model flavor; concrete → pictorial → abstract; word problems reasoned through drawn quantities.
  - **Insight / Puzzle** — Kangaroo / AMC / olympiad lineage; pattern, cleverness, the "aha."
  - **Deep-dive / One-problem-many-ways** — Japanese *sansu* flavor; a single problem explored multiple ways; productive struggle.
  - **Exploratory / Conceptual** — open-middle, low-stakes, "why does this work?"; pairs naturally with the no-shame, effort-based design.
  - **Standards / Procedural** — US Common Core baseline.
- Numbers (400/400 = 800 total, 20/day) define the **structure**; they are tunable, config-driven parameters — not sacred values.

### Daily Mission Flow

- **One Mission per day: ~20 problems, Monday through Friday.** Near twenty is the rule, not exactly twenty — 18 in one Mission and 22 in another is fine if the story or domain coverage calls for it.
- **Future load balancing:** ~20 holds while Math is the only subject. Once other subjects (world awareness, science, logic, basketball) come online and he's doing several a day, the per-subject Mission size drops — likely to ~15, then ~10 — so total daily load stays sane.
- **Missions are chapters, never numbers (locked 2026-06-12):** every Mission carries an episode-style name ("The Road to Omashu", "The White Lotus Errand") shown as "Chapter N · {name}" — flat "Mission 3" labels are banned. Future locked Missions appear in the ribbon as **named journey teasers** with real routes (the engine honors them when the Mission starts) — the road ahead pulls him forward.
- **Every Mission is a journey (locked):** each Mission has its own self-contained story — the Avatar traveling from one place to another in the world (e.g., Southern Air Temple → Omashu). The problems are the **challenges encountered along the way**: crossing a river, bartering in a market, repairing a glider — each challenge *is* a math problem. Completing the final challenge means arriving at the destination.
  - The story is a wrapper, never interference: problems stay rigorous; the narrative supplies context and motivation.
  - Route design can mirror the set's element coverage — the journey passes through the territories whose domains appear in that Mission.
  - Stories are template-generated per Mission from a library of locations, travel beats, and challenge framings, so they stay fresh across a whole summer without hand-writing each one.
- **Pull, don't push (core design intent):** early Missions must be easy. The first few Missions draw heavily from Tier 1 — fast finishes and big early wins create the hook that brings him back on his own.
- **Static difficulty ramp:** each subsequent Mission shifts the tier blend toward Tier 2 and Tier 3 on a **fixed schedule** (not adaptive). The goal is flow — challenge rising to meet demonstrated skill. The clicks-to-correct data tells the parent when the ramp is outpacing or boring him; the tier-blend schedule is hand-tuned between weeks.
- Each Mission pulls questions across all nations/elements (preserving the even-spread rule), mixing Book Five and Book Six.
- **Grade is invisible to him (locked):** never show whether a question is 5th- or 6th-grade — no "Book Five/Six," grade, or level labels anywhere in the kid-facing UI. A question is just a challenge on the journey. Grade lives in the data only (tracking, ramp tuning, the future parent view).
- **Problem diversity:** each Mission's set is deliberately diverse (problem types, contexts, formats), and diversity is also sprinkled across the week — no two days should feel the same.
- **Constrained randomization (scales with the pool):** the pool starts at 400 per grade and grows toward ~2,000 per grade over time; problem selection uses constrained randomization — random within the rules (tier blend, element spread, diversity, no repeats).
- Format: **multiple choice — five answer options on every question, all tiers, all the time.** Five options (vs. four) keeps the clicks-to-correct signal meaningful: a second click is a 1-in-4 guess, not 1-in-3, so the diagnostic stays honest deeper into a question.
- If he answers wrong, he **keeps clicking until he finds the correct answer** — he always finishes the question.
- **Show your work (locked):** he keeps a physical scratch notebook / whiteboard (his choice) beside the app to work out steps. This is deliberately *not* a pure clicking game — easy items he can read and compute mentally; harder ones demand written work he can show his parent. **Difficulty is not held back** on account of the MCQ format: hard, multi-step questions are wanted, because the work happens off-screen in the notebook and the click only records the result. (Future option, not now: a photo-of-work upload — parked.)
- **Hints:** a miss on the first attempt triggers a **hint** that channels him in the right direction without giving the answer away. **Hint efficacy is tracked:** if he gets it right on the click after the hint, the hint worked — this data vets hint quality over time.

### Hint System (approved)

- **Escalation ladder:**
  - **Miss 1 → Hint 1:** a directional nudge — reframes what the problem is really asking, points at the right element/technique. Never a step of the solution.
  - **Miss 2 → Hint 2:** names the concept and reveals the *first step* of the thinking model (e.g., "convert both to twelfths first").
  - **Miss 3+:** no more hints. He finishes the question by elimination; it's flagged hot on the dashboard and the full thinking-model walkthrough does the teaching.
- **Authoring:** both hints are **pre-written per question, derived from the question's thinking-model solution** (Hint 1 from its intent statement, Hint 2 from its first step) — so hints and solution always agree. Drafted by LLM, human-reviewed before entering the pool.
- **Quality loop:** post-hint success rates per question identify weak hints for rewrite; consistently failing hints are also a signal the question itself is mis-tiered.
- **Log attempts per question (clicks-to-correct).** 1 click = solid. 2+ clicks = he didn't have it; each extra click is option-exhaustion. The attempt count is the core diagnostic signal, not just right/wrong.
- **Live attempt display:** a live counter on each question shows attempts for that specific question, plus a Mission-level running tally (e.g., how many solved first-try so far vs. multi-try) — since some he'll nail first time and some not so much.

### Tracking & Results Dashboard

- Track per question: question ID, element/domain, Book (grade), attempts-to-correct, hint shown / hint efficacy, date.
- Track per student: Missions completed, cumulative per-element performance.
- **Attempt counts are visible to him** — not hidden. The primary surface is the post-Mission **results dashboard**.
- **Dashboard shows the click distribution:** e.g., "Out of 20 — 3 problems took 4 clicks, 2 took 3 clicks, 1 took 2 clicks, everything else first try." That distribution is the diagnostic at a glance.
- **The dashboard links directly to the flagged problems** — that's how he knows what to pay attention to.
- **Pool replenishment (locked direction):** the pool will be replenished as it depletes. A key mechanic: **variant problems** — the same problem regenerated with different numbers — to verify he now truly gets it. This leans on the brain's neuroplasticity: revisiting a missed pattern in a fresh skin converts the mistake into durable skill.
- **Replenishment pipeline (approved):** every question is stored as a **parameterized template** (numbers as variables, answer computed from them), so variants are generated mechanically, not rewritten. Weekly batch: (1) variants of his missed problems re-enter the pool after ~1–2 weeks; (2) new LLM-drafted questions are validated (answer-checked, domain-tagged, tier-tagged) and parent spot-checked before going live. This is how 400 grows toward 2,000 without quality drift.
- **Output: soft spots, not summaries.** The **World Map** updates after each Mission: each nation's territory colored by mastery. No motivational fluff. Raw signal, backed by attempt counts.

### Progress Benchmarks — the Training Record (approved 2026-06-12; evolves with Abhi)

How Ayansh's math progress is benchmarked — every metric derived from existing logs, no new instrumentation. Kid-facing surface: the **Training Record** page (streak chip opens it), in effort language. The same numbers feed the future parent view.

- **Mastery coverage** — elements at Adept+ (the 80% bar) out of all elements: the headline number.
- **Overall first-try rate** — cumulative and per element.
- **Tier handling** — first-try rate split by tier. Reading: Tier 1 should stay ~green (confidence floor); **Tier 2 ≥80% = grade-solid**; **Tier 3 ≥60% = competition-ready signal** (Kangaroo/AMC-caliber questions make this an external anchor).
- **Style profile** — first-try rate per pedagogical style tag: which styles click (a diagnostic no classroom surfaces).
- **Independence** — % solved hint-free, and post-hint success rate (hint efficacy).
- **Bounce-back conversion** — % of revisited misses beaten: the neuroplasticity loop measured. This is the purest "is he learning from mistakes" number.
- **Review follow-through ("due diligence", added 2026-06-13)** — of the challenges he got wrong, the % whose full step-by-step thinking model he actually walked through afterward. The habit-of-learning signal: did he go back and do the work on his misses, or just move on? Tracked per problem (a ✓ on each flagged item) and rolled up on the Training Record.
- **Consistency** — streak, missions/week, average session time vs. budget.
- **Grade frontier** (parent-facing later; computed now, never shown to him) — G5 vs G6 performance split, for the "lean into Book Six" call.

### Progression Payoffs (approved)

- The World Map isn't just a heat map — it **visibly accrues** as he works, so earned mastery feels like building a place, not watching a number. This is the antidote to week-3 novelty decay.
- **Bending levels per element:** each element/domain has a rising level (e.g., Apprentice → Adept → Master), driven by first-click rate and bounce-backs in that domain. "I'm a Master Waterbender" = "I've got fractions cold."
- **Territory unlocks:** completing Missions and clearing soft spots opens up regions of the map (new nations, sub-locations), tied to the Mission-as-journey routes — completed journeys trace visibly across the map.
- Pairs with rewards (Pai Sho tiles) but is distinct: tiles are currency, bending levels are *status*. Both accrue from effort, never from raw ability.

### World Map Mastery Mechanics (locked)

The numeric definition of "mastery" that drives both bending levels and territory color:

- **Core metric: first-click rate across all questions in a domain.** A question is "mastered" if answered correctly on the **first click**; multi-click answers don't count toward mastery (they're soft spots).
- **Mastery threshold = 80% first-click rate** across all questions he has attempted in that element/domain.
  - Hitting **80% first-click in Fractions (Water)** bumps him from **Apprentice → Adept** in Water Bending, and that territory shifts toward green.
  - (Higher tiers — Adept → Master — can use a higher bar, e.g. 90%, *and* require a minimum attempt count so it reflects durable skill, not a small lucky sample. Exact upper-tier thresholds: architect's default, Abhi tunes from data.)
- **Territory color follows the same 80% rule:** gray (untouched) → amber (in progress) → green (≥80% first-click). Same signal as bending level, shown spatially.
- **Minimum sample guard:** a domain needs a minimum number of attempted questions (architect default ~15–20) before a level/color can be earned, so one good Mission doesn't fake mastery.
- **Bounce-backs help:** correctly solving a variant of a previously-missed problem (on first click) counts toward the rate — the neuroplasticity loop directly moves the mastery needle.

### Closed-Loop Learning (per problem)

- The system is a **closed loop**: it's okay to make mistakes — mistakes feed the loop. From the dashboard, he returns to each missed problem and works through it.
- **Every question carries an extremely detailed solution written as a thinking model, not a written-down answer.** It walks the intent of the problem, the mental process, and the full solution step by step by step. Reading and following the thinking model is what builds his confidence.
- **The learning format is interactive** — he works through the thinking model, not passively reads it.
- **Interactive concept modules (locked):** where a concept benefits from manipulation — number lines, fraction bars, place-value/number-system explorers, area models — the walkthrough embeds a hands-on interactive module that demonstrates the point. Build cost is accepted; these are a core part of the closed loop, not a nice-to-have.
- **Videos are a stretch goal:** curated video solutions may be added later, but only if they are bang on / on point for the exact problem, and **with no commercials**. Video sourcing (YouTube, API access) is parked for now.
- Flow: Mission → results dashboard (click distribution + World Map) → revisit flagged problems → thinking-model walkthroughs.

---

### Rewards (locked; details = architect's design)

Every Mission ends with a reward. The carrot matters — rewards are what make a kid *want* to move on — so each theme carries its own native reward currency rather than generic points:

| Theme / subject | Reward currency |
|---|---|
| Avatar (Math) | **Pai Sho tiles** — collectible tiles; rare **White Lotus tile** for special feats |
| Atlas (World awareness) — *as built* | **Continent badges** + day-streak + personal-best (no franchise currency) |
| Hardwood (Basketball) — *as spec'd* | **Trophy case** — a badge per subsection ("Heart of a Champion," "Record Keeper," "Hardwood Historian," "Hall of Famer") + day-streak + personal-best (no franchise currency) |
| Pokémon (Science/data) | Badges |
| Naruto (Logic/puzzles) | Ninja rank progression (Genin → Chunin → Jonin) |

- **How rewards are earned (effort-aligned):** base reward for completing the Mission, bonuses for first-click streaks, hint-free problems, and **bounce-backs** (correctly solving a variant of a problem he previously missed — the neuroplasticity loop made visible and celebrated).
- **Rewards never gate progress.** They are earnings on top of the journey, not locks in front of it — tomorrow's Mission is always open.
- A collection screen shows the tile set growing; tiles can unlock small map cosmetics. Kept light: the reward system serves the pull, it doesn't become the product.

### Tier Ramp — Default Schedule (approved; Abhi hand-tunes weekly)

| Week | Tier 1 (easy) | Tier 2 (grade-solid) | Tier 3 (stretch) |
|---|---|---|---|
| 1 | 70% | 25% | 5% |
| 2 | 50% | 35% | 15% |
| 3 | 35% | 40% | 25% |
| 4+ | 25% | 45% | 30% |

Config values only — the clicks-to-correct data decides whether the next week's blend holds, accelerates, or eases off. **The easy→medium→hard ratios above are kept as-is** — they're considered well-calibrated.

**Grade-scope flexibility (keep everything, including easy):** keep **all** of Book Five — easy, medium, and hard — even though he's RSM-accelerated and may already be at a 6th-grade level. Rationale: if he finds 5th-grade easy, he'll **bang through it fast**, and that speed is itself a pull — it hooks him. Don't strip the easy tier to "save time." If the early data shows he's burning through everything easy, the fallback is to **keep only the hardest tier of Book Five and lean into Book Six** — but that's a post-launch tuning call once Abhi sees what he can handle, not a pre-build cut.

### Frustration Sensing (approved)

- **Signals (v1, zero new instrumentation — all derivable from existing logs):** time-per-click outliers (long stall *or* rapid-fire option-mashing), consecutive multi-click questions, mid-Mission abandonment.
- **Response (v1, gentle):** after a frustration trigger, the next question served is a Tier 1 confidence-builder (a "breather" question), and the app offers — never forces — a break ("Even the Avatar rests between training sessions"). All triggers logged for the parent dashboard; no nagging, no shame language.

### Streaks (approved)

- A **Monday–Friday streak** is tracked and shown prominently — he likes streaks, and they are a clean, honest pull (reward for showing up, every day).
- **Streak redemption (his choice):** if he misses a day, the streak isn't silently lost. He's **offered a choice** — keep the streak alive by completing a short **5-problem redemption set** (a small ramp covering the missed day), or let the streak reset. His call, no judgment either way.
- Redemption problems follow the same rules as Missions (tier-appropriate, diverse), just a lighter count. Redemption activity is logged but kept separate from the first-attempt diagnostic of record.

### Session Timing (approved)

- **Time budget:** ~20 problems is budgeted at roughly **40–60 minutes** (architect's call: ~45 min target). Generous enough to think; bounded enough to not sprawl. He can take a break during or mid-Mission.
- **Not endless.** Open-ended time is boring and lets the session sprawl into the whole afternoon — against the pull intent. The Mission has a sense of an ending.
- **Clock, with a toggle (his choice):** a clock can show in the top-right from the moment he starts. He can **toggle it on or off** — some kids panic at a ticking clock, some like knowing. A gentle "~10 minutes left" style nudge is preferred over an anxiety-inducing countdown. Whether or not the clock is visible, **elapsed time is always recorded** and shown afterward.
- **Results dashboard shows time:** total session time and (optionally) per-question time appear in the results, so neither he nor the parent has to guess how long he sat at the screen. Explicit goal: **he should not sit in front of the screen forever.**
- **Runaway guard (locked 2026-06-13):** the clock counts only **active** time (it pauses when the tab is hidden) and **hard-stops after ~2 hours** with a gentle "looks like you stepped away — time isn't counting anymore" message, so a session left open overnight can't record an absurd time (e.g. 1337:00). The cap is config (`clockRunawayMin`).

---


[↑ Back to top](#top)

<a id="accounts-auth"></a>
## Accounts & Auth (CAPTURED — DEFERRED; build without login first)

> Intent logged so it's not lost. **No auth work during the initial build** — build the whole thing on one site, no login, then add the account layer later.

- **Eventual model: separate child and parent accounts.**
  - **Parent view:** sees everything — full results dashboard, what math he's doing, time spent, frustration triggers, progression.
  - **Child view:** a focused subset — his Missions, his World Map, his rewards/streaks; not the parent-analytics surface.
  - Two distinct dashboard views over the same underlying data.
- **For now (build phase):** single website, no login, everything on one surface. Auth, account separation, and the two-view split come **after** the core app is built and working. Designing the data model so a `role` (parent/child) can later gate views is a cheap forward-accommodation; actual login is deferred.

---


[↑ Back to top](#top)

<a id="world-awareness"></a>
## World Awareness (BUILT on preview — integrated into the main site)

> **BUILT — a deliberate Abhi override of depth-first (2026-06-17).** World Awareness is live on `preview`, integrated as the **World land on the index map** (clicking it routes into `#/world`). It stands as **its own themed world** ("Atlas" design, not the One Piece skin). What's live: 6 continents · 39 interactive lessons (~255 quiz questions) + 6 section quizzes & badges · a 29-country atlas · a Geography Drill · per-continent "Big Question" debate cards · dashboard/streaks. Files under `code/` (`code/world-awareness` is integrated via `code/js/wa/*` + `code/css/wa.css`). Not yet committed to git (still on the working tree; Math's preview→main gates untouched). Full build log: `completed.md` + `decisions_open.md`. The spec below is what was built.

> 📝 **Build-time notes.** The full vision below describes a **continent-based, teaching-first, interactive-lesson** product. All three earlier open differences were resolved (2026-06-13) and the product was then **built on preview** (2026-06-17); these were the decisions that shaped it:
> - ✅ **RESOLVED — Spine: teaching-first by design** (Abhi, 2026-06-13). World Awareness teaches first (lesson), then the quiz follows. Per-lesson quizzes **plus** a section-level quiz after a group of lessons (e.g., a 10-lesson section → one section quiz). This is *intentionally different from Math* (which is diagnostic-first) — subjects are allowed to differ; not a conflict.
> - ✅ **RESOLVED — Delivery: interactive "explorable explanations"** (Abhi, 2026-06-13: "use the most sophisticated way within this environment"). Lessons are scroll-driven and *manipulable*, not passive video. Rendering palette, by reliability-first preference: **animated SVG (default)** → **Canvas/WebGL** for rich scenes & small simulations → **interactive widgets** (draggable timelines, click-to-reveal maps, manipulable models) → **pre-rendered media** (Lottie JSON or short video clips) only for cinematic moments. Still within the locked stack: vanilla HTML/CSS/JS, **no framework, no backend, no auth** (libraries via CDN are fine; progress in **browser storage** like Math), static free hosting. Engineered for speed + graceful fallback per *"never make him wait."* Build a **reusable lesson engine** (shared scroll/animation/widget primitives) so each lesson is content + config, not new code. *Cost to accept: highest authoring effort per lesson — the engine is what keeps ~40 lessons tractable.*
> - ✅ **RESOLVED — Structure: continent/lesson spine + per-country cards both kept** (Abhi, 2026-06-13). The 6-continent × ~40-lesson structure is the backbone; the **per-country cards (flags, currencies, leaders, etc.) survive as a feature inside it** — e.g., reachable from a continent/region or a map, complementing the lessons rather than replacing them.

---

### Summer Camp World Awareness — Product Vision Document

#### Executive Summary
A comprehensive world awareness platform that teaches an 11-year-old learner about major historic events and turning points across all continents. Content is organized geographically (by continent) and delivers bite-sized animated lessons followed by integrated quizzes. The learner completes one lesson, takes a quiz on that specific lesson, and moves to the next.

**Platform Goal:** Build genuine world awareness by exploring what actually mattered in human history across different regions—why events happened, who they affected, and why they still matter today.

#### Target Audience
- **Primary User:** One 11-year-old learner with strong intellect and curiosity about world events and history
- **Secondary Users:** Parent/guardian (progress tracking, content oversight)
- **Learning Style:** Visual learner who enjoys animation; prefers digestible, focused content over dense textbooks

#### Core Learning Objectives
By completing this platform, the learner will:
1. Understand major historic turning points across every continent
2. Recognize cause-and-effect in world events (why things happened, what changed)
3. Develop geographical and cultural context for global affairs
4. See interconnections between events across regions (trade, war, migration, ideas)
5. Build ability to ask informed questions about current world events
6. Appreciate the diversity of human experience across cultures and histories

#### Content Architecture

**Curriculum Structure: Continents as Organizing Principle.** The platform is organized into **6 continental sections**, each containing lessons on the most important historic events and turning points in that region.

```
World Awareness Platform
├── Europe
│   ├── Lesson 1: Ancient Greece & Democracy
│   ├── Lesson 2: Roman Empire Rise & Fall
│   ├── Lesson 3: Medieval Feudalism & The Church
│   ├── Lesson 4: Renaissance & Enlightenment
│   ├── Lesson 5: Industrial Revolution
│   ├── Lesson 6: World War I: Causes & Consequences
│   ├── Lesson 7: World War II: Rise of Fascism
│   └── Lesson 8: Cold War & Fall of Communism
│   └── [End-of-Section Quiz: 50 questions across all Europe lessons]
│
├── Asia
│   ├── Lesson 9: Ancient China: Dynasties & Inventions
│   ├── Lesson 10: India: Empires, Religion, & Independence
│   ├── Lesson 11: Japan: Feudalism to Modernization
│   ├── Lesson 12: Ottoman Empire & Islam
│   ├── Lesson 13: Colonialism in Asia
│   ├── Lesson 14: Asian Independence Movements (1900s)
│   ├── Lesson 15: China's Communist Revolution
│   └── Lesson 16: Modern Asia: Tigers & Powers
│   └── [End-of-Section Quiz: 50 questions across all Asia lessons]
│
├── Africa
│   ├── Lesson 17: Ancient Africa: Kingdoms & Trade
│   ├── Lesson 18: Slavery & The Atlantic Trade
│   ├── Lesson 19: European Colonization
│   ├── Lesson 20: African Independence Movements
│   ├── Lesson 21: Post-Colonial Africa
│   └── Lesson 22: Modern Africa: Challenges & Growth
│   └── [End-of-Section Quiz: 40 questions]
│
├── Americas (North, Central, South)
│   ├── Lesson 23: Indigenous Civilizations (Aztec, Maya, Inca)
│   ├── Lesson 24: European Conquest & Colonization
│   ├── Lesson 25: Slavery in the Americas
│   ├── Lesson 26: American & Latin American Independence
│   ├── Lesson 27: US Civil War & Expansion
│   ├── Lesson 28: Industrial Boom & Immigration
│   └── Lesson 29: Modern Americas: Cold War & After
│   └── [End-of-Section Quiz: 40 questions]
│
├── Middle East
│   ├── Lesson 30: Birth of Civilization (Mesopotamia, Persia)
│   ├── Lesson 31: Islam & Islamic Empires
│   ├── Lesson 32: Ottoman Decline & European Interests
│   ├── Lesson 33: Creation of Modern Middle East (Post-WWI)
│   ├── Lesson 34: Oil, Geopolitics & Israel
│   └── Lesson 35: Modern Middle East: Conflicts & Change
│   └── [End-of-Section Quiz: 40 questions]
│
└── Oceania & Pacific
    ├── Lesson 36: Indigenous Peoples & Cultures
    ├── Lesson 37: European Exploration & Colonization
    ├── Lesson 38: Australia & New Zealand Development
    └── Lesson 39: Pacific Islands & WWII
    └── [End-of-Section Quiz: 30 questions]

Total Lessons: ~40 lessons across all continents
Total Quiz Questions: ~250–300 integrated + 6 section reviews
```

**Lesson Design Principles**
- **Length:** 4–6 minutes of animation per lesson
- **Focus:** One major historic event or turning point per lesson
- **Visual Style:** Animated maps, timelines, character illustrations, cause-and-effect diagrams
- **Narrative:** "Why did this happen? What changed? Why does it matter today?"
- **Language:** Age-appropriate, avoids jargon without sacrificing accuracy
- **Structure:** (1) Hook (compelling question or scenario); (2) Historical context (what came before); (3) The event itself (what happened, who was involved); (4) Consequences (how the world changed); (5) Modern relevance (why this still matters)

> **Reading depth — DOUBLE IT (Abhi, 2026-06-18).** The first build's lessons read too thin for a ~13-year-old. **Every one of the 39 lessons must roughly double its reading prose (~2×)** while **keeping all the same themes, structure, beats, interactives, and quizzes** — this is *add more*, never remove. Aim for ~**350–500 words** of genuine reading per lesson (was ~150–250). Go deeper, not just longer: more vivid narrative and human detail, more cause-and-effect ("because of this, that happened"), an extra paragraph or two of historical context, more "why it still matters today," and a couple more "Did you know?" facts. Pitch the **vocabulary and sentence complexity up to a confident 12–13-year-old** reading level (richer words, longer sentences, real nuance) — still clear, still accurate, still clean/positive/apolitical. The existing beat types stay; we lengthen the `p`/`lead` beats and add new `p`/`fact`/`guide` beats. Applies **across the board, all six continents.** — ***Status: BUILT on `preview`** (2026-06-18, autonomous scheduled run). All 39 lessons expanded to avg ~545 reading words (up from ~150–250), every theme/beat/interactive/quiz kept verbatim; sensitive topics handled factually and evenhandedly; jsdom-verified all 39 render at 350+ words, 0 errors. Awaiting Abhi's Gate review. See `completed.md`.*

**Quiz Integration: Two-Level System**

*Level 1: Lesson-End Quizzes.* Each lesson is immediately followed by its own quiz — 5–10 questions specific to that lesson; types include multiple choice, true/false, short answer, scenario-based; immediate right/wrong feedback with explanation; difficulty adapts based on performance; flow is watch lesson → take quiz → move to next lesson (immediate reinforcement).

Example — Lesson 2 "Roman Empire Rise & Fall": 5-minute animation (founding → peak → decline) + 8-question quiz ("Which event marked the 'fall' of the Western Roman Empire?"; "Why did the Eastern/Byzantine empire last longer?"; scenario: "You're a Roman general in 200 AD. What challenges do you see?").

*Level 2: Section-End Reviews.* After completing all lessons in a continent, the learner takes a comprehensive cumulative quiz — 50 questions covering the whole section (adjustable down to 25 if too long); scope is cross-lesson connections, synthesis, application ("How did the Industrial Revolution in Europe change Asia?"; "Compare colonialism in Africa vs. Americas"; map-based "Identify which continent each event belongs to"; timeline "Put these 5 events in chronological order"). Reward: a section badge ("European Historian," "Asian Explorer") on completion.

#### Platform Features

**Learning Experience.** Lesson Player with play/pause/rewind, transcript toggle (read along), 1.5x/2x speed for re-watching, and "Did you know?" bonus facts sprinkled throughout. Integrated Quiz Interface that is clean and distraction-free, with a progress indicator (question 3/8), immediate feedback with explanations, a review mode (see all answers after completing), and one hint per quiz if needed. Dashboard giving an overview of progress, badges earned, current streak, and upcoming lessons.

#### Engagement & Fun: Making It Genuinely Enjoyable

**Narrative & Voice.** A **guide character** (animated or narrated) who reacts to events, asks rhetorical questions, and makes connections ("Wait—did you catch that?") in a conversational, non-preachy tone. **Surprising hooks** open each lesson ("The Roman Empire lasted 1,000 years. How long has the US existed?"). **Real-world bridges** end lessons by connecting to modern news the learner may have heard about.

**Gamification Done Right.** Streak counter ("You've learned 5 days in a row!"), badges by continent ("European Historian," "Asian Explorer," "Americas Master") unlocked per section, personal-best tracking ("Your highest quiz score: 92% on Lesson 7" — celebrating individual achievement, not competition), progress visualization (lessons completed, sections mastered, overall journey), and small achievement animations when unlocking a badge or milestone.

**Interactive & Dynamic Learning.** Drag-and-drop timelines (order events chronologically, instant feedback), click-to-reveal maps (tap regions to discover events, trade routes, cultural connections), scenario questions ("What would you have done?" — ungraded, just thinking), and easter eggs (hidden bonus facts and fun connections).

**Choice & Autonomy.** Pick your path (learner chooses which continent to explore first), optional deep dives (lessons on specific figures — Cleopatra, Napoleon, Genghis Khan), profile customization (avatar, color theme, nickname — unlocked via badges), and difficulty tuning (quiz difficulty adapts; no "stuck" feeling).

**Social & Parent Involvement.** Section report cards for the parent ("Your son mastered European history! Here are 3 fun facts to discuss at dinner"), teaching-as-mastery (encourage the learner to explain a lesson back to a parent), an optional parent challenge ("Can you score higher than your son on the Americas section?"), and discussion prompts ("Ask your parent: What do they remember about this event?").

**Pacing & Surprise.** Varied lesson length (most 4–6 min, some 3, some 7) to avoid mechanical repetition; cliffhanger openers ("By the end you'll understand why an island nation defeated a continental superpower…"); a mix of serious topics (wars, politics) and lighter ones (innovations, cultural moments); and surprise facts ("This technology was invented 1,000 years before anyone else…").

**Rewards That Matter.** Progressive unlocking (unlock Asia after completing Europe, etc.), milestone celebrations (at 10/20/30 lessons — "You've learned 1/3 of world history!"), mastery badges displayed on the dashboard and shareable with a parent, and bragging rights ("You're now an expert on [continent]").

**The Secret Sauce: Genuine Expertise.** After each section, prompt "Can you explain to your parent what you learned about [continent]?" — pride of mastery beats any gamification mechanic. If the learner asks deeper questions, optional "rabbit hole" sections let them explore further.

#### Accessibility
Captions/subtitles on all animations; adjustable text size; dark mode for evening learning; playback speed 0.75x–2x for accessibility and re-learning.

**Glossary tooltips (built 2026-06-17).** Unfamiliar terms — **BC, AD, BCE, CE, WWI, WWII, USSR, UN, UAE** — render with a subtle dotted underline; **hovering (or tapping, on tablets)** reveals what the term stands for, a kid-friendly meaning, and a quick example. It runs automatically over all rendered text (lessons, quiz questions, explanations, country cards), is keyboard-focusable with screen-reader labels, and deliberately skips answer buttons so it never interferes with a quiz. Easy to extend — add a term to the `GLOSS` map in `code/js/wa/wa.components.js`.

#### Proposed Roadmap

*Phase 1 (MVP — Launch with ~40 Lessons).* Continent priority order (by content availability & learner interest): (1) **Europe** — 8 lessons, Ancient Greece through Cold War; (2) **Asia** — 8 lessons, China, India, Japan, Ottoman; (3) **Americas** — 7 lessons, Indigenous to modern; (4) **Africa** — 6 lessons; (5) **Middle East** — 6 lessons; (6) **Oceania** — 4 lessons. Launch content: all 40 lessons + 6 section-level quizzes.

*Phase 2 (Expansion & Depth).* Theme deep-dives ("Women in History Across Continents," "Trade Routes & Empires"), interactive maps (click to explore events by location), a "connections" module (how events across continents influenced each other), a chronological timeline across all continents, and biographical deep-dives.

#### Technical Requirements

> ✅ *Superseded by the resolved delivery decision at the top of this section: interactive "explorable explanations" in vanilla HTML/CSS/JS — **no backend, no auth, no framework** (libraries via CDN ok), progress in browser storage, static free hosting. The video-player / backend / auth / Firebase language below is kept only as the original brain-dump; the resolved approach governs.*

**Frontend:** animated video player (HTML5, WebGL, or an animation library like Lottie); quiz interface (form validation, immediate feedback); responsive design (tablet, laptop, possibly mobile); progress state management (local storage or backend sync). **Backend (if needed):** simple user authentication (child + parent); progress-tracking database (chapter completion, quiz scores); quiz question-bank management; parent-dashboard API. **Content Management:** easy-to-edit lesson metadata (title, description, video file); quiz question database (importable from spreadsheet or CMS); A/B testing framework for difficulty tuning.

#### Success Metrics

*Learning Outcomes:* lesson completion rate (target 80%+ of 40 lessons); quiz performance (target 70%+ first attempt); section mastery (target 75%+); retention (score improvement on re-takes); cross-lesson connections (questions linking continents). *Engagement:* session length (target 5–10 min/lesson); return visits (days active/week); quiz engagement (lessons completed to quizzes taken); retry rate. *Satisfaction & Impact:* learner feedback ("Can you explain it to a friend?"), parent observation (is he asking about world news?), and curiosity indicators (does he want to deep-dive further?).

#### Design & Tone
Colorful, modern animations; clear typography; minimal clutter. Conversational, respectful voice (not "talking down" to an intelligent kid). Energetic but not overwhelming pacing; lessons end on cliffhangers or compelling questions. Diverse representation in characters, perspectives, and examples.

#### Timeline & Milestones
Wk 1–2: finalize all 40 lesson outlines · Wk 3–4: write Europe & Asia scripts (16) · Wk 5–6: create/source Europe & Asia animations (16) · Wk 7–8: write & animate Americas, Africa, Middle East, Oceania (24) · Wk 9: build lesson player & quiz interface · Wk 10: develop quiz banks (40 lessons + 6 section reviews) · Wk 11: integrate backend (auth, progress, submission) · Wk 12: end-to-end testing & learner feedback · Wk 13: launch on subdomain (vercel.app) · Wk 14+: monitor, gather feedback, plan Phase 2.

#### Risks & Mitigation
| Risk | Mitigation |
|------|-----------|
| Animation production is time-consuming across 40 lessons | Start with simpler 2D animation; use templates or AI-assisted tools; prioritize most interesting continents first |
| Content accuracy across diverse regions & histories | Research rigorously; cite sources; fact-check; be transparent about bias & perspective |
| Lessons feel disconnected (why does Africa matter to a kid in California?) | Emphasize relevance: immigration, trade, cultural influence, modern geopolitics; show how continents connect |
| Quiz difficulty varies wildly across lessons | Clear rubrics for question difficulty; test with the learner; adaptively adjust pool |
| Learner loses motivation mid-curriculum | Badges per continent, streak tracking, parent engagement, milestone celebrations |
| Tracking 40 lessons + 250+ questions | Simple backend (Firebase or similar); keep question bank in CSV initially; scale only if needed |

#### Future Expansion Ideas
Interactive world map (click any region for major events), timeline view (scroll chronologically across all continents), theme deep-dives ("Women in History," "Trade & Economics," "Technology's Impact," "Religious Movements"), comparison module (colonialism in Africa vs. Asia vs. Americas), biographical profiles (emperors, generals, freedom fighters, inventors), discussion forum, podcast companion (audio for car rides), printable workbook, parent guide (dinner-table conversation starters), and a current-events bridge ("This news story connects to Lesson 12 about the Middle East").

#### Conclusion
This platform transforms world awareness from a dry checklist of facts into a guided journey across continents, discovering what actually mattered in human history and why it still shapes our world. By combining ~40 focused animated lessons with integrated, immediate-feedback quizzes, it empowers an intelligent young learner to build genuine global literacy at his own pace. The continent-based structure avoids treating world history as "Europe + everybody else" — it gives equal weight to Asia, Africa, the Americas, Middle East, and Oceania, showing how regions influenced each other and developed independently. **Success = the learner completes most lessons, understands cause-and-effect across continents, asks questions about global affairs, and sees connections between past and present.**

---

### Competition Alignment & External Resources (added 2026-06-13)

**Direction (Abhi, 2026-06-13): keep the current content, but "mix it up" so the app doubles as gentle, early prep for two standout, internationally-available competitions.** The goal is to light a fire from age ~10 and give the learner a real ladder to climb as world events keep unfolding — not to turn the app into a cram tool. Tone stays no-pressure and effort-based; the competitions are an *aspiration*, not a stressor.

#### Standout #1 — World Scholar's Cup (WSC)  *(the lead target)*
- **What it is:** a joyful, team-based academic tournament built around a fresh **annual theme**, spanning six subject areas — **History, Social Studies / current affairs, Science & Technology, Literature & the Arts, and a rotating Special Area** — across four events: **Team Debate, Collaborative Writing, the Scholar's Challenge (written multiple-choice), and the Scholar's Bowl (a multimedia team quiz).**
- **Age fit:** **Junior Division ≈ ages 10–13** (no hard lower limit; most are ≥10), plus **Skittles / Lpaca** tracks for 10–11-year-olds. Ideal for the target learner.
- **The ladder (what sustains interest):** Regional Round → **Global Round** (host cities worldwide) → **Tournament of Champions at Yale University**.
- **Global reach:** runs on every inhabited continent. **India:** regional rounds in Delhi, Chennai, Mumbai, Bangalore. **Europe & beyond (2026 Global Rounds):** Prague (Europe), Dubai, Kuala Lumpur, Seoul, Shanghai, Bangkok, Da Nang, Christchurch.
- **Links:** scholarscup.org/faq · scholarscup.org/global-round · scholarscup.org/calendar

#### Standout #2 — International Geography Championships / International Geography Bee (IGB)  *(the geography complement)*
- **What it is:** a pure "where is the world and what's happening in it" competition — **physical & human geography, countries / capitals / flags, maps, and current events tied to places.**
- **Format & ladder:** a **free Online Regional Qualifying Exam (50 MCQ)** → Regional Finals → National / Continental Championships → the **International Geography Championships** (Summer).
- **Age fit (divisions):** **Elementary** (finishing grades 1–4), **Intermediate** (grades 5–6), **Middle** (7–8), **High** (9–12), with **JV / Varsity** levels. *A learner finishing 5th grade competes in the Intermediate division.*
- **Global reach:** **USA**, **Europe** (IHBB European Division — buzzer-based online regional tournaments, no prior qualifying needed), **Asia** (International Academic Competitions – Asian Division; **India via Xpress Minds**), and Canada. The exam window runs ~September → early May.
- **Links:** geochampionships.com/qualify · geochampionships.com/about/faq · internationalgeographybee.com/europe · iacompetitionsasia.com/international-geography-bee

#### Other options (aspirational / context — not primary targets)
- **National Current Events League** (US, low-friction in-school meets; has an elementary division) — good for building the news habit.
- **Academic WorldQuest** (team foreign-affairs) and most **Model UN** programs are **high-school / older-middle** — north stars for later.
- **National Geographic GeoBee:** **permanently discontinued** (last held 2019). A new independent **National Geography Bee** launched but is currently **high-school-focused**.

#### How the app "mixes in" these two (build direction — keep all current content, layer these on)
1. **Geography depth (for IGB):** keep the 39 lessons + country atlas; layer in **place knowledge** — capitals, flags (have), and **physical features (rivers, mountains, deserts)** — plus **"where did this happen?" map questions** tied to each lesson, and an optional **map-drill / capitals quiz mode**.
2. **WSC-style breadth & thinking:** add per-section **"Big Question" debate prompts** (argue *both* sides — mirrors Team Debate), a short **"collaborative writing" spark**, **current-events bridges** ("this connects to a news story you may have heard"), and **cross-subject tie-ins** (art / science / literature woven into history). Consider an **annual-theme** framing like WSC's.
3. **Quiz-style variety:** include **multimedia "identify the flag / map / image"** items (Scholar's-Bowl flavor) and an optional **timed MCQ round** (Scholar's-Challenge flavor) alongside the current teaching-checks.
4. **Guardrail:** all of the above stays optional and effort-framed — no leaderboards-vs-peers, no shame; the existing badge/streak/personal-best loop is the reward.

*Status (2026-06-13): first build of this layer is DONE on preview — a **Geography Drill** (flags / capitals / physical-geography, relaxed or ⏱️ timed, with a personal-best) and per-continent **"Big Question" debate cards** (argue both sides). Still to come if wanted: per-lesson "where did this happen?" map placement, a collaborative-writing spark, and an annual-theme framing.*

---

### Visual & Engagement Glow-Up — World Awareness only (2026-06-17)

**Direction (Abhi):** make the World Awareness experience look and feel like it's for a **12–13-year-old** — more attractive, more "I want to open this," less like schoolwork. **Scope: World Awareness only** (the Math/Avatar world and the landing map keep their current look for now). **Vibe: game-like & energetic** — the Duolingo/Kahoot register a 12–13-year-old gravitates to: confident bold color, big satisfying progress, punchy headings, snappy motion — but still clean, never babyish.

**Two engagement systems to add** (Abhi picked these; *not* doing avatar/profile or sound this round):

1. **XP & Levels.** Every action earns **XP** — completing a lesson, passing a quiz, a drill run, earning a section badge (more XP for higher scores / first-try). A persistent **XP bar** shows progress to the next level. **Level ladder** (effort-framed, explorer-themed), e.g. *Explorer → Scout → Navigator → Cartographer → Globetrotter → World Master*. **Level-up is a moment** — celebratory animation + "You reached Navigator!" Levels are status, never a gate; XP only ever goes up (no loss), keeping it no-shame.
2. **Achievements / Trophies.** Collectible milestones *beyond* the six continent badges, shown on a **trophy shelf** in the dashboard (locked = silhouette, unlocked = full-color + earned-date). Examples: *First Steps* (1st lesson), *Perfect!* (100% on a quiz), *Globetrotter* (a lesson on every continent), *On Fire* (3- and 7-day streaks), *Map Master* (90%+ geography drill), *Completionist* (all 39 lessons), *Atlas Explorer* (opened every country card), *Debater* (used a Big Question). Unlocking pops a celebratory toast.

**Look & feel changes (WA only):** richer, more saturated continent accent colors + subtle gradients; a bolder display typeface for headings; bigger, rounded, animated progress bars; more "lift" and motion on cards (hover/press); a stronger hero with the level/XP front and centre; level-up & achievement celebrations (confetti + toast). 

**Guardrails (unchanged):** stays **effort-based, no-shame** (reward the work, never "you're smart"; XP never decreases); all of it **optional/ambient** (no pressure, no peer leaderboards); **progress preserved** — XP/levels/achievements are *derived from or added to* the existing `summer-camp-world-v1` localStorage with a migration so no current saved progress is lost; everything stays **scoped under `.wa-scope`** so it can't touch Math/landing; vanilla HTML/CSS/JS, no backend; accessible + reduced-motion respected.

*Status: **BUILT on `preview`** (2026-06-18, autonomous scheduled run). XP & Levels (animated XP bar + explorer ladder + level-up celebration) and Achievements/Trophies (dashboard trophy shelf, 9 trophies, locked-silhouette → colour + earned date, unlock toast) shipped, plus the look-and-feel pass (bolder display headings, animated rounded progress bars, punchier cards, topbar level chip, stronger hero). Progress preserved via a one-time `summer-camp-world-v1` v2 migration (back-fills XP + earned trophies). Scoped under `.wa-scope`; reduced-motion respected; jsdom-verified (42/42, 0 errors). Awaiting Abhi's Gate review. See `completed.md`.*

---

### Prior capture (preserved — reconcile with the vision above)

> Earlier brain-dump from Abhi, kept so nothing is lost. Its **reading-gated, per-country** model and **diagnostic-first** spine differ from the continent/lesson vision above; the two need merging or a pick before build.

**Spirit & boundaries:** a **clean, positive environment.** Leaders and countries are described in a positive, factual light — *not* overly critical of anyone. Keep it apolitical in tone; favor wonder and fun facts over hot-button geopolitics.

**Learning Center (distinct from diagnostics):** the topic has a **learning-center region** of reading material; the diagnostic questions are drawn *only from material he has actually read*. Reading gates questions, not the other way around.

**Per-country content (top ~50 countries by economy):** a "Top 10 things to know" style card per country, e.g.:
- Flag (recognize flags of important countries)
- Leader — a short, positive 5–10 sentence note (e.g., Modi in India, the US president) on who they are / how they came to power. Positive framing only.
- Population and % of world
- Currency, with a ballpark USD comparison (e.g., $1 ≈ ₹90) — exact rates change daily, ballpark is fine
- System of government (democracy or other), described neutrally
- Specialty, tourism, culture
- Fun facts (e.g., **Vatican City** — a sovereign state inside Rome, not part of any nation; show where it sits geographically)

**Fun-facts ≠ questions:** an interesting-facts layer exists for wonder alone; it's also the well the diagnostics draw from.

**Reading-gated diagnostics (10/day):** once he's read certain chapters, that day's 10 questions come **only** from those chapters. Example: finished chapters 1–3 → 10 questions drawn from any of chapters 1–3. Next day, finished 4–5 → 10 questions from any of chapters 1–5. Cumulative, reading-gated.

**Open question Abhi posed (to explore later):** *what else would an 11-year-old want to learn to become really smart?* — candidate directions to discuss when World Awareness is taken up: world geography & maps, basic economics (why currencies differ, trade), world history's greatest hits, how governments/elections work (neutrally), famous inventions & scientists, world religions & festivals (respectfully), space & the solar system, the UN / how countries cooperate, languages of the world, great wonders (natural & built).

---


[↑ Back to top](#top)

<a id="basketball"></a>
## Basketball — "Hardwood" (BUILT on preview 2026-06-18 — spec'd 2026-06-17)

> **BUILT on `preview` (2026-06-18).** The scheduled 10:30 PM PT build landed Basketball as the **"Hardwood" land on the index map** (`#/hoops`), its own scoped world (`code/js/hoops/*`, `code/css/hoops.css`, own localStorage key `summer-camp-hoops-v1`, runs from `file://`) — the same integration pattern as World Awareness. **As built:** 4 subsections · **20 illustrated lessons** (Heart 5 · Records 5 · Roots 6 · Legends 4) · a **6-question quiz at the end of every lesson** + a **section review quiz** per subsection + one argue-both-sides **debate card** each = **159 quiz questions** total (120 lesson + 39 review). Trophy Case rewards, real Wikimedia photos (with Hardwood-SVG fallbacks + captions/credits), California/Warriors/Lakers strip, glossary tooltips, effort-not-ability/no-shame language. Records fact-verified to 2026 values. Follow-up content passes (2026-06-18): a routing-bug fix (land click now reaches `#/hoops`); every lesson quiz leveled to **6 questions**; all sections fully **un-gated** (any lesson, any order); and — after Abhi found 5-min/~300-word lessons too thin for a 13-year-old — **every lesson expanded into a ~15-minute read at a 13-yo level (~1,100–1,300 reading words each, avg ~1,180, ~4× the prior depth)**, with a **word-count line at the bottom of each lesson** and real **overview reading blocks on the hub and every subsection page** (not just cards/badges). Full build + fix log: `completed.md`. Still on `preview` only — Abhi's two gates unchanged. The spec below is what was built.

> **Spec'd as a deliberate second override of depth-first (Abhi, 2026-06-17)** — after World Awareness. Basketball gets its **own clean "Hardwood" theme** (no franchise skin; he loves the game as-is) and is **teaching-first like World Awareness**: the kid *reads the story / the records / the history first*, and the **quiz comes at the end of each subsection** — explicitly **not** Math's diagnostic-first engine. It will live as the **Basketball ("Hardwood") land on the index map**, routing to `#/hoops`, rendered as its own themed world (scoped CSS, own localStorage key, runs from `file://`) — the same integration pattern World Awareness used. The four subsections, the records, the stories, and the history below are the locked content map; the build researches and **fact-verifies every record, story, and date** before it ships (records change — e.g. the all-time scoring leader, the made-threes record — so nothing is taken from memory).

### Look & feel — build it to read for a 14-year-old (locked, 2026-06-17 — Abhi)

> Even though the learner is 11, **the Basketball section should *look and feel* like it was built for a 14-year-old** — older, cooler, more grown-up than the rest of the app. Think **sports-broadcast / ESPN-grade**, not a kids' cartoon: a sleek, confident **dark "Hardwood" UI** (deep court tones, hardwood texture, bold orange accents, crisp sans-serif type, stat-line / scoreboard / trading-card motifs), big vivid edge-to-edge photography, tasteful motion. No bubbly fonts, no babyish mascots, no cutesy stickers. The *content* stays age-appropriate and no-shame; only the **visual maturity** levels up. This applies to Basketball specifically — Math (Avatar) and World Awareness (Atlas) keep their own looks.

### Why this subject, and the feeling we're after

This is the subject he already loves, so it doesn't need a costume — it needs **heart**. The spine of Basketball is **grit**: true, heart-touching stories of where the greatest players came from and what they survived to get there. The intent (Abhi, 2026-06-17): *he should be thoroughly blown away by how hard the road was for these people* — and should walk away understanding that what got them there was **work, not luck and not raw "talent."** That lands straight on the project's core rule: **reward effort, never ability.** Around that emotional core sit the parts a basketball-obsessed 11-year-old devours — the **records** ("wait, *100* points in one game?"), the **history** of how the game was invented and how Black athletes transformed and came to define it, and the **legends and greatest moments**.

### Spine & flow (locked)

- **Teaching-first, info → quiz — and *lots* of quizzes (Abhi, 2026-06-17).** Quizzes are the **muscle-memory rep**: they're how the facts stick and how the fun happens, so the build is **quiz-dense, not quiz-light.** Each subsection is a run of **illustrated info cards / mini-lessons** (a story, a record cluster, a history beat), and **almost every info card is immediately followed by a quick check** — 2–4 questions on what he just read — so reading and answering alternate the whole way through. Then each subsection **also** ends with a larger **review quiz** that mixes everything in that subsection. Net effect: many small quizzes per subsection plus a capstone review — *lots and lots* of questions, by design.
  - **Question count target:** a meaty bank — aim for **roughly 12–20+ questions per subsection** (lesson checks + the end review), i.e. well over **50 questions across Basketball** at launch, with room to grow. Counts are config, tuned to keep it fun, never a slog.
  - **As built (2026-06-18):** rather than a check after *every* card, each **lesson** ends with its own **6-question quiz**, and each **subsection** ends with a **review quiz** (8–10 Qs). That's **159 questions total** (120 lesson + 39 review) across 20 lessons — comfortably past the "lots of quizzes" bar. (Open lever if wanted: bring section reviews to a uniform count, or move toward true after-each-card checks.)
  - **Variety keeps the reps fun:** mix formats — multiple choice, true/false, "which is the record-holder," "put these in order," and image-based "who/what is this?" using the real photos/flags. Immediate right/wrong feedback with a one-line explanation on every question (World-Awareness style); no-shame on a miss — it explains and moves on.
  - **Reuse** the World Awareness lesson/quiz engine where it fits; Basketball is content + a Hardwood skin + real imagery, not new engine code.
- **No gating — everything is open (Abhi, 2026-06-18).** Unlike World Awareness's progressive unlock, **Basketball has no precedence**: every subsection, every lesson, and every section review is unlocked from the start, so he can do anything in any order, anytime. Progress, best scores, and trophies still track — there's just no "finish this before that" wall. *(Implemented in `code/js/hoops/hoops.state.js`: the unlock checks return true unconditionally.)*
- **Effort-based, no-shame language throughout.** Every story closes on what the *work* produced — the drills, the early mornings, the refusal to quit — never "he was just gifted." No shame on a wrong quiz answer; it just explains and moves on.
- **Clean, positive, age-appropriate.** Hardship is told with honesty and dignity, never gratuitously. The tone is courage and triumph.
- **Rewards:** a **Trophy Case** — one badge per subsection completed (Heart of a Champion, Record Keeper, Hardwood Historian, Hall of Famer), plus a day-streak and a personal-best on quizzes (same light reward loop as World Awareness; no franchise currency).

### Iconic imagery (locked, 2026-06-17 — Abhi)

> **Use real imagery.** Abhi's call: this is a **private, non-commercial gift for one child** (and possibly his friends), not a product and not monetized — so it should show **real photos of the actual players, venues, moments, and events**, because real faces and real places are what make it hit. This is a deliberate, logged exception for Basketball; it does **not** change the franchise-themes rule (Avatar/Pokémon/etc. still use *inspired* original art, never copyrighted assets).

- **Sourcing order (reliability-first, so nothing breaks or looks sketchy):** (1) **freely-licensed real photos** — **Wikimedia Commons / Wikipedia** have excellent shots of players, arenas, and historic moments (Naismith, the Globetrotters, Texas Western, etc.); public-domain historic photography; official press/league imagery that permits embedding. (2) **Original "Hardwood" SVG/illustration** — court lines, hoop, jersey-number plates, trophy icons, silhouette art — as the **fallback** wherever a clean free photo doesn't exist, and as the connective theme art throughout. (3) Every image carries a small **caption + credit** line (good habit + it teaches him where things come from).
- **Flags & banners (Abhi, 2026-06-17):** lean into **flags and banners** as imagery — team flags/logos, **championship banners** ("flags in the rafters"), and the **California state flag** as a home-pride touch — they read as bold, colorful, and instantly recognizable to a kid, and they make the pages pop.
- **Imagery should *attract him* — this is his thing.** Pick the boldest, most recognizable, most exciting shots (dunks, championship moments, famous arenas), big and vivid, not tiny thumbnails. The visuals are a primary pull here, not decoration.
- **Performance guardrails still hold:** images are sized/lazy-loaded so the page stays **agile** (the project's "never make him wait" rule). A missing image must degrade gracefully to the SVG fallback, never a broken-image box.

### Home court — California (locked, 2026-06-17 — Abhi)

They're in **California**, so the app should lean into **his teams and the local stars he already loves**: the **Golden State Warriors** (Stephen Curry & the Bay Area dynasty) and the **Los Angeles Lakers** (LeBron James, and the Lakers' deep history — Magic, Kareem, Kobe, Shaq). Surface these prominently across the subsections — Curry leads the three-point records, LeBron anchors both the scoring records and a grit story, and the Warriors/Lakers carry big chunks of the championship and "greatest moments" content. The California connection is a deliberate hook: *these are the players he watches.*

### The four subsections (locked content map)

> Quiz at the **end of each** subsection. Exact player rosters/counts are the build's to finalize during fact-checking; the set below is the spine.

**1. Heart of a Champion — Grit & Perseverance** *(the emotional core)*
Heart-touching, true origin stories. The build verifies each and tells it with dignity, closing on the work that carried them:
- **Giannis Antetokounmpo** — son of undocumented Nigerian immigrants in Greece; sold sunglasses, toys, and watches on the street with his brothers; days without food; a kid with no country that fully claimed him → NBA MVP and champion.
- **LeBron James** — born to a 16-year-old single mother in Akron; constant moves; missed dozens of school days one year for lack of a stable home → one of the greatest ever.
- **Jimmy Butler** — told to leave home around age 13; bounced between friends' houses with nothing guaranteed → All-Star through relentless work.
- **Allen Iverson** — grew up in deep poverty and adversity in Hampton, VA; "too small" his whole life; heart over size.
- **Stephen Curry** — overlooked as too small and too skinny; only tiny Davidson recruited him → the greatest shooter the game has seen.
- **One woman's story included** (build to verify and choose — e.g. a WNBA great's road through illness or hardship, or **Maya Moore** stepping away at her peak to free a wrongfully imprisoned man) so grit isn't told as a men-only story.
- *Optional add:* a global-character story (e.g. **Dikembe Mutombo**'s journey from Congo and his humanitarian work).

**2. The Record Books — Records & Milestones (US-focused, with the women's game)**
The "whoa, really?" numbers, verified to current values at build time:
- **Scoring:** Wilt Chamberlain's 100-point game; the all-time scoring crown (Kareem → **LeBron**, current leader); huge single-season and single-game marks.
- **Championships & dynasties:** Bill Russell's 11 rings; the great Celtics/Lakers/Bulls/Warriors runs; most MVPs.
- **Rebounds / assists / steals / blocks:** Wilt's rebounding feats; the assists and steals leaders.
- **The three-point era:** **Stephen Curry**, all-time made threes.
- **Triple-doubles & streaks:** Oscar Robertson's and Russell Westbrook's triple-double seasons; the longest winning streaks; the 73-win season.
- **The women's game (WNBA + college):** all-time WNBA scoring and MVP leaders (e.g. Diana Taurasi, A'ja Wilson, Breanna Stewart) and the NCAA scoring record (**Caitlin Clark**) — so records aren't a men-only list.

**3. Roots & Revolution — History** *(honest but age-appropriate; where the Black-excellence story lives)*
Told as a story of invention, courage, and transformation — **honest about the real barriers, framed around the courage to break them and the triumph that followed** (Abhi's chosen tone, 2026-06-17):
- **The invention:** James Naismith, 1891, a peach basket in Springfield, the first 13 rules.
- **Early game & the Black Fives / Harlem Renaissance era; the Harlem Globetrotters** (1926).
- **Breaking the color line (1950):** Earl Lloyd (first to play), Chuck Cooper (first drafted), Nat "Sweetwater" Clifton (first signed) — and an age-appropriate, honest account of the segregation and exclusion they pushed through.
- **Texas Western, 1966:** the first all-Black starting five to win the NCAA title, over an all-white Kentucky — a turning point.
- **Bill Russell:** 11 titles, the first Black NBA head coach, and a leader in the civil-rights era.
- **The transformation:** Dr. J and the ABA → Magic & Bird reviving the league → Michael Jordan taking it global → today's overwhelmingly Black, globally beloved game and culture.
- The throughline: *why this history matters* — courage, fairness, and excellence.

**4. Legends & Greatest Moments** *(pure fun)*
The greats and the moments every fan should know — capped by a debate card:
- **The GOATs:** Jordan, LeBron, Kareem, Magic, Bird, Wilt, Russell, Kobe, Shaq, Hakeem, Duncan — plus women's legends (Lisa Leslie, Diana Taurasi, A'ja Wilson, Sue Bird, Caitlin Clark).
- **Iconic moments:** Jordan's "The Shot" and "Flu Game" and last shot; Ray Allen's 2013 corner three; Kobe's 81; LeBron's 2016 block; Lillard's wave-goodbye.
- **Signature moves:** the skyhook, the Dream Shake, the fadeaway, the crossover, the dunk.
- **"Who's the GOAT?" debate card** — argue *both* sides (e.g. Jordan vs. LeBron), the same argue-both-sides format World Awareness uses for its "Big Question" cards. No single right answer; it teaches reasoning.

### Build notes (for the scheduled build)

- **Integration:** activate the Basketball/"Hardwood" land on the index map → route `#/hoops` → render Basketball as its own scoped world (mirror the World Awareness integration: `config.js` flips the land active; the router gains one `#/hoops` branch; CSS scoped under a wrapper class so it can't bleed into Math or World; its own `localStorage` key; data shipped as `.js` globals so it runs from `file://`).
- **Reuse** the World Awareness teaching-first lesson/quiz primitives, debate-card pattern, badges/streak/personal-best, and glossary-tooltip system where they fit — Basketball should be **content + Hardwood skin + real imagery**, not a new engine.
- **Fact-check gate:** before it's considered done, every record value, story detail, name, and date is **verified against current sources** (web research at build time), and images carry captions + credits.
- **Gates unchanged:** the build lands on `preview` only; it is **not** committed to `main` until Abhi's two-gate review — same as Math and World Awareness.


[↑ Back to top](#top)

<a id="the-sun-the-sword"></a>
## The Sun & the Sword

> **Status: VISION ONLY (v1.0, added 2026-06-20).** A north star for tone, experience, and intent — *not* a build spec. Lives on the index map as the **SUN** airport (coming soon); not yet built. Arc list, cast, and lesson count are firm enough to build against and loose enough to improve. *Working name* — the "sun and sword" duality (Diogenes' inner light vs. everything Alexander conquered to get one) is the part to keep; swap the name freely.

**The North Star.** An island where a curious child travels back ~2,000 years and meets the most magnetic humans who ever lived — conquerors, philosophers, rebels, builders, and a few genuine villains — and comes away not with a list of dates but with a working sense of how power, ideas, and consequence actually move through the world. The promise to the learner: *you are about to meet someone unforgettable, and by the end you'll understand something you didn't before — about them, and quietly, about yourself.* The promise to the parent: this is the screen that makes the other screens look boring. We compete with the two-hour movie and the endless scroll, and win using their own weapons — narrative pull, stakes, beautiful images, cliffhangers — pointed at something that compounds.

**Who it's for.** A bright 11-year-old who reads above his age and already handles 15-minute lessons with appetite. Reading level, conceptual reach, and moral complexity sit at roughly a sharp 13-year-old's bar — stretching, never condescending. He already knows Diogenes by name and loves "step out of my sunlight." This is the window where he's forming instincts about what to admire, what to distrust, and what consequences look like.

### What one lesson feels like

A short, vivid chapter (5–15 min) with the rhythm of a great bedtime story told to a kid too old for bedtime stories and too smart to be talked down to. It **opens on a scene, not a summary** — not "Alexander was a Macedonian king," but a knot of soldiers staring across a river at an army ten times their size while their 23-year-old commander smiles. Through the chapter we braid four threads as one current, never as separate sections:

- **The drama** — real stakes, real tension; dramatic where drama earns its keep, never cartoonish. On the edge of his seat, not over the top.
- **The ingenuity** — these people were inventors under pressure (the sarissa pike, Ashoka's roads and rock-cut edicts, Persian royal couriers, siege and supply). Cleverness reframes "great" as *resourceful* — a thing he can imitate.
- **The geography** — where it happens and why mountains, rivers, and trade routes mattered; how an idea or an army crossed a continent. The map is a character.
- **The moral weight** — the brilliance *and* the wreckage (Alexander's genius and the cities he burned; Ashoka and Kalinga; Socrates and the hemlock). Never preach; let the consequence sit in the room and trust him to feel it.

Each chapter ends on a small hook — a question, a turn, a "but what he didn't know was…" — that makes the next lesson feel like the next episode.

### The engine: flow (story-first, then a 6-question quiz)

Tuned to **flow** — challenge a notch above current skill, time disappears. **Story first, always**; the narrative earns his attention, *then* comes the quiz — which is the next rung of the ladder, not a test. Difficulty curve:

- **Q1–2 — Easy.** He just read it. Purpose is confidence and momentum: *I've got this.*
- **Q3–4 — Medium.** Connect two things, or recall a detail he had to be paying attention to catch.
- **Q5–6 — Trickier.** A small inference, a "why do you think…," a comparison across two figures, a consequence to reason about — just a tad harder than comfortable, the exact place where engagement is born.

Design rule: never the head-scratch that discourages. Miss one → feedback is warm and *teaches*, never scolds. The exit emotion of every lesson: *that was fun, I'm a little smarter, and I want the next one.* (Shares the teaching-first lesson→quiz spine with World Awareness and Basketball; difficulty-curved quiz is the new wrinkle.)

### Content architecture

Roughly **100 lessons**, grouped into thematic story arcs of **8–12 lessons** each, so figures recur, collide, and pay off across chapters (by lesson 60 he's delighted to see a name from lesson 9). Era anchor: ~**500–300 BC** — the relay of Socrates → Plato → Aristotle → Alexander, with giants thinking and conquering in parallel half a world away. Emphatically **not Europe-only**: Greece is one bright room in a very large house. Representative (not final) arcs:

1. **The Men Who Asked Why** — Socrates, Plato, Aristotle, Diogenes. "How should a person live?" The hemlock. The barrel. The sunlight.
2. **The Boy Who Wanted the World** — Philip's blueprint, Aristotle as tutor, Alexander's campaigns, the genius and the cost, the empire that dissolved the day he died.
3. **The King Who Wept** — Ashoka: conquest, Kalinga, remorse, and a conqueror who chose dharma over more war.
4. **Warrior Kingdoms** — Sparta, the Persian empires; discipline, glory, brutality, and what such systems cost the people inside them.
5. **The Other Half of the World Was Thinking Too** — Confucius and Laozi in China, the Upanishadic sages in India. Good ideas were no one civilization's property.
6. **Roads, Silk, and Silver** — the Silk Road and ancient trade; how a road can change a world more than an army.
7. **Ingenious Under Pressure** — a cross-cutting arc on invention: phalanx, siege engines, roads, writing, currency, navigation. Constraint as the mother of cleverness.
8. **The Long Reach of Empire** (bridge toward World Awareness) — an age-appropriate, unromantic look at how later empires used firepower and organization to dominate, extract, and divide. Connects this ancient world to the modern one he already studies.

Starting clusters, not a locked syllabus — builders should discover better groupings as the cast assembles.

### The cast

Imagery is the hook; the cast is the heart. Every major figure gets a handsome, characterful portrait — art a kid is drawn to, like a hero on a movie poster. A non-final roster with the angle that makes each magnetic:

- **Diogenes** — the troublemaker philosopher in his barrel, mocking power to its face. His favorite; possibly the island's recurring "narrator's friend" who questions every conqueror's glory.
- **Alexander the Great** — the dazzling, dangerous young genius. Admire him *and* count the cost.
- **Socrates** — the questioner who would rather die than stop asking.
- **Plato & Aristotle** — student and student's student; ideas as inheritance.
- **Ashoka** — the conqueror who looked at what he'd done and changed.
- **Leonidas and the Spartans** — discipline and sacrifice, and the hard truth beneath the glory.
- **Persian kings (Cyrus, Darius, Xerxes)** — empire as administration and ambition, seen from their side, not only the Greek one.
- **Confucius & Laozi** — order and flow; two answers to how to live, from the other side of the world.
- **The Upanishadic sages** — the inward turn; wisdom as a different kind of conquest.
- **Marcus Aurelius** (reaching forward) — the emperor who wrote himself reminders to stay humble; power that examines itself.

And room, always, for the **not-so-great** — the cruel, the cynical, the counter-examples. He doesn't need every figure to be admirable; he needs them true, carrying a consequence he can learn from.

### Art, voice, and what he walks away with

- **Art direction:** handsome, dignified, characterful; a coherent house style across all ~100 lessons so the island feels like one world. **Maps as living visuals** — campaign routes that draw themselves, trade routes that light up, empires that bloom and recede. Period texture (armor, scrolls, marble, the sarissa, the barrel, the rock edict). The image arrives *before or with* the beat it illustrates, never decorating after.
- **Voice & tone:** storyteller, not textbook — warm, vivid, a little theatrical when earned. Respect his intelligence (big ideas in plain words). **Show, don't sermonize** — lay the consequence in front of him and trust him. Honest about evil and folly; no sanitizing. Curiosity is the exit emotion — every lesson leaves a door open.
- **What he walks away with:** a felt map of the ancient world and how its parts connected; a gallery of human beings whose choices he can reason about (models and warnings both); early, durable instincts about power, freedom, ambition, and consequence; the discovery that wisdom and greatness belonged to every civilization, not one; and a reflex he'll keep for life — that a screen can make him *more* curious, not less.

**Build note (when it's time):** integrate as the `sunsword` subject — flip the index-map airport active, add one router branch and a scoped world (mirror World Awareness / Basketball: scoped CSS, own `localStorage` key, `.js` data globals for `file://`). Hold the soul (story-first, flow-tuned difficulty, global scope, moral honesty, beautiful imagery); iterate everything else. Two-gate review unchanged.


[↑ Back to top](#top)

<a id="design-principles"></a>
## Design Principles

1. **Diagnostic-first.** Surface gaps; don't teach until gaps are known.
2. **Structure over numbers.** Pool sizes, daily counts, schedules are config parameters.
3. **Fun testing experience.** Franchise-inspired theming and game-like progression — but the data captured is rigorous.
4. **Pull, don't push.** Easy early Missions create the hook; difficulty ramps to keep challenge meeting skill (flow). Sign-up and getting started must be as easy and fun as possible — zero friction at the front door.
5. **Effort-based feedback, never ability-based.** The app's language mirrors the Avatar frame — mastery comes from training, drills, and practice. Reward what the work produced (first-click streaks, training completed, territory earned). Never "you're smart." The experience theme is cleverness, hard work, and intuition made concrete — not abstract praise.
6. **Not adaptive (v1).** Fixed pools, even domain distribution, fixed tier-ramp schedule. Adaptivity is a later consideration.
7. **Extensible modes.** Math is the first region on the map; the architecture must accommodate future subjects as new themed regions.
8. **Agile, never make him wait.** Fast loads, snappy interactions, no jank. Polish and ambient effects are welcome only when they stay lightweight and never cost speed or responsiveness — agile beats pretty, every time.


[↑ Back to top](#top)