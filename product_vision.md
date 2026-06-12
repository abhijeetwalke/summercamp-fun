# Ayansh Summer Camp — Product Vision

This document holds **locked decisions** — the frozen product spec for Math, ready to build.

**Document set** (full orientation in `CLAUDE.md`): `product_vision.md` (this — the frozen spec) · `pending.md` (build-work backlog) · `completed.md` (finished work) · `decisions_open.md` (product decisions still needing Abhi) · `deferred.md` (parked subjects/features). Word discipline: "pending" = build work, "open" = product decisions.

---

## Project Overview

A summer-project web app for an 11-year-old (just completed 5th grade, attends RSM). The app is organized as **modes** (subjects) presented as themed worlds on an index map. The first deliverable is the **Math mode diagnostic engine** — a fun, testing-first experience that surfaces skill gaps. It is explicitly **not** a tutoring product; diagnosis comes first, learning content is keyed to exposed gaps afterward.

This spec covers the **diagnostic piece**. The post-diagnostic learning session is a placeholder hook (see decisions_pending.md).

## Build Strategy

**Depth-first, not breadth-first.** Math gets fully densified and baked in the product vision before any other subject moves — no advancing three topics one pawn-step at a time. A fully baked vision makes the build-out fast. This is the working style for all future modes as well: bake one completely, then build.

**Tech stack (locked): plain HTML / CSS / JavaScript — no framework, no build step, no backend. 100% free.** Questions ship as static JSON; all progress persists in the browser (localStorage / IndexedDB); hosting is a free static host (GitHub Pages / Cloudflare Pages). Tradeoff: progress is per-device until a later light cloud-sync (deferred). Full build sequencing lives in `pending.md`.

---

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

## Themes

Available franchise themes: **Naruto, One Piece, Avatar: The Last Airbender, Pokémon**.

Rule: **one subject = one theme.** Themes are never mixed within a subject.

| Theme | Subject |
|---|---|
| Avatar: The Last Airbender | **Math** |
| One Piece | **World awareness** (geography, trade, where the world is going) |
| Pokémon | **Science / data** (taxonomy, stats, knowledge collection) |
| Naruto | **Logic / puzzles** (skills-drill mode) |
| Basketball (itself — no franchise wrapper) | **Basketball** (quiz mode: greats, record-holders, US & world records) |

Subjects other than Math are named but **not yet designed** — math is being fully baked first (see Build Strategy below). **Basketball** is its own subject themed simply as basketball — he loves it as-is, so it needs no franchise skin. The basketball mode is a **quiz section**: names of the greats, world/US record holders, milestones.

Theme-to-subject mapping is config-driven, not hardcoded.

Note for the builder: use franchise-*inspired* styling (names, palettes, vibes), not official artwork or assets.

---

## Index Page — The Landing Map (locked)

The app opens on a **world map of continents drifting together** — the visual centerpiece and the front door to every subject.

- **Composition:** 4–6 **asymmetric landmasses** meeting in an abstract way — cracked lands in the middle with **fissures** between them, **ocean** around the edges. The pieces fit like a jagged puzzle that doesn't quite interlock — irregular seams, not clean borders.
- **One land per theme/subject.** The Avatar continent is labeled **"Airbender (Math)"** — franchise name with the subject in parentheses. The other lands are the other subjects.
- **Tactile click (mostly visual + sound):** clicking a land gives a satisfying **press-down-and-spring-back** "ka-chunk" — the land depresses slightly and snaps back, a crack/snap micro-animation, accompanied by a **click sound**. The feel is physical and deliberate.
- **Active land (Math):** the click zooms into that continent → the math world (nations/elements, the Missions ribbon, etc.).
- **Inactive lands (World Awareness, Science/Data, Logic, Basketball):** visible on the map and **still clickable** — the tactile click feedback fires — but they show a **"Coming Soon"** label and do **not** lead anywhere, because nothing is built behind them yet. (Builds anticipation; explains why only Math is enterable now.)
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

## UI & Navigation (locked)

- **Top nav: the subjects/topics sit up top** (Math, World awareness, Science/data, Logic/puzzles, Basketball), each in its theme.
- **Side-panel ribbon:** inside a subject, a left-hand panel shows the Missions laid out as a ribbon, in order.
- **Sequential unlock: only one Mission is unlocked at a time.** All previous Missions remain fully visible — their content, results, everything.
- **Retakes allowed, and counted:** any previous Mission can be taken again. Every Mission carries a **session count** — which attempt this is — shown right on the ribbon (e.g., "attempt 2"). The **first attempt is the diagnostic of record**; retakes are logged separately as improvement signal (they pair naturally with bounce-back rewards).
- **Color:** each subject uses its theme-native palette (Avatar world colors for math — and within it, nation palettes can tint their territories: Water Tribe blues, Earth Kingdom greens, Fire Nation reds, Air Nomad oranges). Tweakable.
- **Typography: clear and simple, never fancy.** An 11-year-old has good eyes — the font just needs to stay out of the way. No decorative typefaces, no fonts that make him think about the font. Attractive **themes**, simple type, everything clearly visible.

---

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
| One Piece (World awareness) | Treasure / Berries |
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

---

## Accounts & Auth (CAPTURED — DEFERRED; build without login first)

> Intent logged so it's not lost. **No auth work during the initial build** — build the whole thing on one site, no login, then add the account layer later.

- **Eventual model: separate child and parent accounts.**
  - **Parent view:** sees everything — full results dashboard, what math he's doing, time spent, frustration triggers, progression.
  - **Child view:** a focused subset — his Missions, his World Map, his rewards/streaks; not the parent-analytics surface.
  - Two distinct dashboard views over the same underlying data.
- **For now (build phase):** single website, no login, everything on one surface. Auth, account separation, and the two-view split come **after** the core app is built and working. Designing the data model so a `role` (parent/child) can later gate views is a cheap forward-accommodation; actual login is deferred.

---

## World Awareness (CAPTURED — NOT BEING BUILT YET; math first)

> Brain-dump from Abhi, logged so nothing is lost. **No build work until math is fully shipped.** World Awareness may stand as **its own theme/topic** (like Basketball) — it does not need to borrow the One Piece skin if its own identity is cleaner.

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

## Design Principles

1. **Diagnostic-first.** Surface gaps; don't teach until gaps are known.
2. **Structure over numbers.** Pool sizes, daily counts, schedules are config parameters.
3. **Fun testing experience.** Franchise-inspired theming and game-like progression — but the data captured is rigorous.
4. **Pull, don't push.** Easy early Missions create the hook; difficulty ramps to keep challenge meeting skill (flow). Sign-up and getting started must be as easy and fun as possible — zero friction at the front door.
5. **Effort-based feedback, never ability-based.** The app's language mirrors the Avatar frame — mastery comes from training, drills, and practice. Reward what the work produced (first-click streaks, training completed, territory earned). Never "you're smart." The experience theme is cleverness, hard work, and intuition made concrete — not abstract praise.
6. **Not adaptive (v1).** Fixed pools, even domain distribution, fixed tier-ramp schedule. Adaptivity is a later consideration.
7. **Extensible modes.** Math is the first region on the map; the architecture must accommodate future subjects as new themed regions.
8. **Agile, never make him wait.** Fast loads, snappy interactions, no jank. Polish and ambient effects are welcome only when they stay lightweight and never cost speed or responsiveness — agile beats pretty, every time.
