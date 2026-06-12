# Deferred — Parked Subjects & Features

**This file holds everything deliberately deferred** until Math ships. Nothing here is pending a decision and nothing here is being built. When Math is done and Abhi says so, items graduate from here into `pending.md` as build work.

**Working style (locked): depth-first.** Fully bake and ship one subject before the next moves.

---

## Subjects (named, not yet designed — except where noted)

### World Awareness  *(FULLY CAPTURED in product_vision.md)*
- Its own theme/topic (may not need the One Piece skin).
- Clean, positive, apolitical tone. Leaders/countries described positively, never overly critical.
- **Learning Center** of reading material; diagnostics drawn **only from chapters he's read** (reading gates questions).
- Per-country cards for top ~50 economies: flag, positive 5–10 sentence leader note, population & % of world, currency vs USD (ballpark), government system (neutral), specialty/tourism/culture, fun facts (e.g., Vatican City as a sovereign state inside Rome).
- Reading-gated diagnostics: ~10 questions/day, only from chapters completed (cumulative).
- **Open question to explore:** "what else would an 11-year-old want to learn to become really smart?" Candidate directions: maps & geography, basic economics, history's greatest hits, how elections/government work (neutral), inventions & scientists, world religions & festivals (respectful), space & the solar system, the UN, world languages, natural & built wonders.

### Science / Data  *(Pokémon theme — named only)*
- Taxonomy, stats, knowledge-collection (Pokédex-style). Reward = badges.

### Logic / Puzzles  *(Naruto theme — named only)*
- Skills-drill mode. Reward = ninja rank progression (Genin → Chunin → Jonin).

### Basketball  *(its own theme, no franchise skin — named only)*
- Quiz mode: the greats, US & world record holders, milestones. He loves it as-is.

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
