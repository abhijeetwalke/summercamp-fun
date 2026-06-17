/* ============================================================
   Summer Camp — Platform config  [ENGINE]
   The subject plug-in contract (pending.md P0.4).
   Adding a future subject = add a config object + content files.
   No subject-specific logic belongs in engine code.
   ============================================================ */

window.SC = window.SC || {};

SC.APP = {
  name: "Summer Camp",
  stateKey: "summer-camp-state-v1",
};

/* ---- Platform defaults (every subject inherits; may override) ---- */
SC.PLATFORM = {
  optionsPerQuestion: 5,          // locked: 5 options, all tiers, always
  missionSize: 20,                // ~20; 18–22 acceptable
  missionsPerWeek: 5,             // "week" in the ramp = 5 completed Missions (architect default)
  sessionBudgetMin: 45,           // ~40–60 min budget
  clockRunawayMin: 120,           // stop a forgotten clock after ~2h (anti-runaway)
  masteryThreshold: 0.80,         // first-click rate => Adept + green territory
  masterThreshold: 0.90,          // Adept -> Master (architect default, tunable)
  minAttemptsGuard: 16,           // ~15–20 attempts before mastery can be earned
  // Tier-ramp default schedule (approved; Abhi hand-tunes weekly)
  tierRamp: [
    { week: 1, blend: { 1: 0.70, 2: 0.25, 3: 0.05 } },
    { week: 2, blend: { 1: 0.50, 2: 0.35, 3: 0.15 } },
    { week: 3, blend: { 1: 0.35, 2: 0.40, 3: 0.25 } },
    { week: 4, blend: { 1: 0.25, 2: 0.45, 3: 0.30 } }, // week 4+
  ],
  levels: ["Apprentice", "Adept", "Master"],
};

/* ---- Subject registry (one entry per land on the map) ---- */
SC.SUBJECTS = [
  {
    id: "math",
    active: true,
    displayName: "Math",
    landLabel: "Airbender (Math)",
    themeName: "Avatar-inspired",
    palette: {
      primary: "#c2641f",   // Air Nomad orange
      water: "#2e6f9e", earth: "#4c7a3d", fire: "#a33b2a",
      air: "#c2641f", spirit: "#6d5a9e", avatarstate: "#3aa6a0",
    },
    rewardCurrency: { name: "Pai Sho tiles", unit: "tile", special: "White Lotus tile" },
    levelNames: { 0: "Apprentice", 1: "Adept", 2: "Master" },
    levelTitle: (el, lvl) => `${lvl} ${el.bender}`,
    // Element/domain map. NOTE (locked): grade is data-only — NEVER shown in kid-facing UI.
    elements: [
      { id: "water", name: "Water", bender: "Waterbender", domains: { g5: "NF", g6: "NS" } },
      { id: "earth", name: "Earth", bender: "Earthbender", domains: { g5: "G,MD", g6: "G" } },
      { id: "fire",  name: "Fire",  bender: "Firebender",  domains: { g5: "OA", g6: "EE" } },
      { id: "air",   name: "Air",   bender: "Airbender",   domains: { g5: "NBT", g6: "RP" } },
      { id: "spirit", name: "Spirit", bender: "Spirit-guide", domains: { g6: "SP" } }, // G6 only
      { id: "avatarstate", name: "Avatar State", bender: "Avatar", capstone: true },
    ],
    // Avatar State capstone: ~1 per Mission from week 2 (architect default)
    capstonePerMission: (week) => (week >= 2 ? 1 : 0),
    styleTags: {
      visual: "Visual / Model-based",
      insight: "Insight / Puzzle",
      deepdive: "Deep-dive",
      exploratory: "Exploratory",
      standards: "Standards",
    },
    contentGlobal: "MATH_QUESTIONS", // window.<X> set by the data file
  },
  { id: "world",      active: true,  displayName: "World Awareness", landLabel: "World Awareness" }, // its own themed world — wa.* files, routes under #/world
  { id: "science",    active: false, displayName: "Science / Data",  landLabel: "Science / Data",  comingSoon: true },
  { id: "logic",      active: false, displayName: "Logic / Puzzles", landLabel: "Logic / Puzzles", comingSoon: true },
  { id: "basketball", active: false, displayName: "Basketball",      landLabel: "Basketball",      comingSoon: true },
];

SC.getSubject = (id) => SC.SUBJECTS.find((s) => s.id === id);

/* Tier blend for a given completed-mission count */
SC.blendForMission = function (missionIdx) {
  const week = Math.floor(missionIdx / SC.PLATFORM.missionsPerWeek) + 1;
  const ramp = SC.PLATFORM.tierRamp;
  const row = ramp.find((r) => r.week === Math.min(week, ramp[ramp.length - 1].week));
  return { week, blend: row.blend };
};
