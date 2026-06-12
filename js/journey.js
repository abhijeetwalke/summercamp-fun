/* ============================================================
   Summer Camp — Journey generator
   [ENGINE]: the template composer.  [MATH]: the Avatar library.
   Story is a wrapper, never interference — flavor lines add
   context; the math stands alone.
   ============================================================ */

window.SC = window.SC || {};

SC.Journey = (function () {

  /* ---- [MATH] Avatar-world location library (franchise-INSPIRED naming) ----
     Each place carries a glyph (its vibe) and map coordinates (x,y on the
     continent canvas) so journeys can be SHOWN, not just named. */
  const LOCATIONS = [
    { name: "Southern Air Temple",    glyph: "⛩", el: "air",    x: 140, y: 208,
      lore: "A mountaintop sanctuary where young airbenders learn that balance comes before power. Gliders launch from its high platforms at dawn." },
    { name: "Western Air Temple",     glyph: "🌀", el: "air",    x: 196, y: 142,
      lore: "Built upside-down beneath a cliff edge — proof that the impossible is just a problem nobody has solved yet." },
    { name: "Northern Water Village", glyph: "❄", el: "water",  x: 430, y: 94,
      lore: "Canals of ice, bridges of frost. The healers here say every flow can be redirected — water, and numbers, included." },
    { name: "Serpent's Pass",         glyph: "🐉", el: "water",  x: 350, y: 158,
      lore: "A knife-thin trail between two seas. Travelers cross single file while something long and patient circles below." },
    { name: "Kyoshi Island",          glyph: "🌸", el: "water",  x: 324, y: 462,
      lore: "Home of the fan warriors. Small island, fierce pride — never underestimate what looks little." },
    { name: "Omashu",                 glyph: "⛰", el: "earth",  x: 366, y: 252,
      lore: "A stone city of mail chutes and mad genius. Its king tests visitors with riddles that look unfair until you see the trick." },
    { name: "Ba Sing Se",             glyph: "🏯", el: "earth",  x: 478, y: 212,
      lore: "The great walled city. Rings within rings — like a multi-step problem, you get in one layer at a time." },
    { name: "Crystal Catacombs",      glyph: "💎", el: "earth",  x: 502, y: 248,
      lore: "Glowing green caverns deep under the city, where what's hidden becomes visible if you bring your own light." },
    { name: "Si Wong Desert",         glyph: "🏜", el: "earth",  x: 428, y: 304,
      lore: "The driest place in the world. No landmarks, no shortcuts — only those who keep their bearings cross it." },
    { name: "Sun Warrior Ruins",      glyph: "☀", el: "fire",   x: 652, y: 172,
      lore: "Where firebending was first learned from the dragons — power drawn from discipline, not anger." },
    { name: "Ember Island",           glyph: "🌋", el: "fire",   x: 686, y: 232,
      lore: "Beach resorts and volcanic sand. Even fire takes a holiday — but the locals play a mean game of kuai ball." },
    { name: "Foggy Bottom Swamp",     glyph: "🌿", el: "spirit", x: 230, y: 372,
      lore: "The swamp shows people visions of what they've lost or not yet found. Time moves strangely beneath the banyan roots." },
  ];
  const LOC_BY_NAME = {};
  LOCATIONS.forEach((l) => (LOC_BY_NAME[l.name] = l));
  const tag = (l) => `${l.glyph} ${l.name}`;

  /* ---- [MATH] Challenge framings, keyed by element ---- */
  const FRAMINGS = {
    water: ["A ferryman at the river crossing poses a riddle before he'll pole you across:",
      "The tide-keeper won't open the canal gate until you solve this:",
      "A healer needs help measuring her remedies:"],
    earth: ["A wall of stone blocks the road — the gatekeeper tests travelers:",
      "Builders repairing the great wall ask for your help:",
      "A merchant's cart has spilled; he needs the load recounted:"],
    fire: ["A fire sage guards the path and demands a worthy answer:",
      "The forge master pauses his hammer and asks:",
      "A drill instructor at the training yard challenges you:"],
    air: ["High winds ground your glider until you work this out:",
      "A nomad elder offers passage in exchange for clear thinking:",
      "The bison feeder at the stables scratches his head over this:"],
    spirit: ["In the swamp's stillness, a vision presents a puzzle:",
      "A wandering spirit speaks in patterns — decode this one:",
      "The shrine keeper studies her records and asks:"],
    avatarstate: ["Everything you've trained for comes together — the path opens only for a true answer:",
      "The final trial of this journey draws on all four elements:"],
  };

  const BEATS = ["The road continues.", "You press on toward", "The journey bends toward", "Next stop:"];

  /* ---- [ENGINE] Compose a story for a Mission from the library ---- */
  function generate(questions, subjectCfg) {
    const els = [...new Set(questions.map((q) => q.el))];
    const stops = [];
    els.forEach((el) => {
      const opts = LOCATIONS.filter((l) => l.el === el && !stops.includes(l));
      if (opts.length) stops.push(opts[Math.floor(Math.random() * opts.length)]);
    });
    while (stops.length < 2) stops.push(LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]);
    const from = stops[0], to = stops[stops.length - 1];

    const flavors = {};
    questions.forEach((q) => {
      const f = FRAMINGS[q.el] || FRAMINGS.avatarstate;
      flavors[q.id] = f[Math.floor(Math.random() * f.length)];
    });

    return {
      title: `${tag(from)} → ${tag(to)}`,
      opening: `Today's journey: travel from ${tag(from)} to ${tag(to)}. ` +
        `Every challenge you clear is a step down the road — clear the last one and you've arrived.`,
      stops: stops.map((s) => s.name),
      flavors,
      arrival: `You've arrived at ${tag(to)}. The road is behind you — every step of it earned.`,
    };
  }

  return { generate, LOCATIONS, LOC_BY_NAME };
})();
