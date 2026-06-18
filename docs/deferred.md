# Deferred — Parked Subjects & Features

**This file holds everything deliberately deferred** until Math ships. Nothing here is pending a decision. *(Exceptions: **World Awareness** and **Basketball** were both built ahead of schedule on deliberate Abhi overrides; they have graduated out of this file — see below.)* When Math is done and Abhi says so, the remaining items graduate from here into `pending.md` as build work.

**Working style (locked): depth-first.** Fully bake and ship one subject before the next moves. *(Knowingly overridden twice — World Awareness (built) and Basketball (spec'd + build scheduled), both 2026-06-17, both logged in `decisions_open.md`.)*

---

## Subjects

### World Awareness — ✅ GRADUATED (no longer deferred)
- **Built on `preview` (2026-06-17), integrated into the main site.** Full spec + build details live in `product_vision.md` → "World Awareness", with the decision trail in `decisions_open.md` and build log in `completed.md`.
- *(The earlier deferred brain-dump — reading-gated diagnostics, per-country cards for the top ~50 economies, the "what else makes an 11-yo smart?" open question — is preserved in `product_vision.md` under "Prior capture," reconciled against the version that was actually built.)*

### Basketball — ✅ GRADUATED (no longer deferred) — BUILT on preview
- **SPEC'D 2026-06-17 → BUILT on `preview` 2026-06-18** (Abhi's second deliberate override of depth-first, after World Awareness). Its own clean **"Hardwood"** theme (built to read for a 14-year-old), teaching-first (story/records/history → quizzes), spine = grit & perseverance. As built: 4 subsections, 20 lessons, 159 quiz questions, real imagery + fallbacks, Trophy Case, California/Warriors/Lakers angle. Full spec + as-built in `product_vision.md` → "Basketball"; build/fix log in `completed.md`; decision trail in `decisions_open.md`.

## Subjects still parked (named, not yet designed)

### Science / Data  *(Pokémon theme — named only)*
- Taxonomy, stats, knowledge-collection (Pokédex-style). Reward = badges.

### Logic / Puzzles  *(Naruto theme — named only)*
- Skills-drill mode. Reward = ninja rank progression (Genin → Chunin → Jonin).

---

## Platform Features (deferred)

### Cloud sync (deferred)
- Because the build is free/static with browser-only storage, progress lives **per-device**. When the parent/child split lands, a **light cloud sync** (or export/import) will be needed so progress follows him across devices. Deferred until after math ships and auth is taken up.

### Accounts & Auth
- Build the whole app on one site with **no login first**.
- Eventual model: separate **parent** account (sees everything — dashboard, time, frustration, progression) and **child** account (focused subset — Missions, World Map, rewards/streaks). Two views over the same data.
- Data model carries a parent/child `role` field now so views can be gated later cheaply; actual auth comes after the core app works.

### Video Solutions (stretch)
- Superseded by interactive concept modules. Revisit only if a specific, on-point, **commercial-free** video is wanted for a particular problem.

### Photo-of-work upload
- Possible future: let him photograph his scratch-notebook work to attach to a question. Parked.

### Future load balancing
- Once multiple subjects are live, drop per-subject daily Mission size from ~20 → ~15 → ~10 so total daily load stays sane.
