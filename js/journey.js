/* ============================================================
   Summer Camp — Journey generator
   [ENGINE]: the template composer.  [MATH]: the Avatar library.
   Story is a wrapper, never interference — flavor lines add
   context; the math stands alone.
   ============================================================ */

window.SC = window.SC || {};

SC.Journey = (function () {

  /* ---- [MATH] Avatar-world location library (franchise-INSPIRED naming) ---- */
  const LOCATIONS = [
    { name: "Southern Air Temple", el: "air" },
    { name: "Northern Water Village", el: "water" },
    { name: "Omashu", el: "earth" },
    { name: "Ba Sing Se", el: "earth" },
    { name: "Kyoshi Island", el: "water" },
    { name: "Si Wong Desert", el: "fire" },
    { name: "Ember Island", el: "fire" },
    { name: "Foggy Bottom Swamp", el: "spirit" },
    { name: "Serpent's Pass", el: "water" },
    { name: "Western Air Temple", el: "air" },
    { name: "Crystal Catacombs", el: "earth" },
    { name: "Sun Warrior Ruins", el: "fire" },
  ];

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
      title: `${from.name} → ${to.name}`,
      opening: `Today's journey: travel from ${from.name} to ${to.name}. ` +
        `Every challenge you clear is a step down the road — clear the last one and you've arrived.`,
      stops: stops.map((s) => s.name),
      flavors,
      arrival: `You've arrived at ${to.name}. The road is behind you — every step of it earned.`,
    };
  }

  return { generate, LOCATIONS };
})();
