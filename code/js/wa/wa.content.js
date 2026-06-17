/* ============================================================
   World Awareness — Content  [SUBJECT: world]
   Continent-based, teaching-first. ~40 lessons across 6
   continents; per-lesson quizzes + a section quiz each.
   Clean, positive, apolitical. Age 11, but never dumbed-down.

   Beat types (rendered by wa.components.js):
     lead | p | hook | fact | guide | scene(art) | modern
     order | hotmap | compare | scenario
   Quiz q: { q, type:'mc'|'tf'|'scenario'|'map', options:[], answer:idx, explain, hint? }
   ============================================================ */

window.WA = window.WA || {};
WA.CONTENT = { continents: [], lessons: {} };

(function (C) {
  var L = C.lessons;
  function cont(o) { C.continents.push(o); }
  function lesson(o) { L[o.id] = o; }

  /* ============================================================
     EUROPE
     ============================================================ */
  cont({
    id: "europe", name: "Europe", emoji: "🏛️", color: "#3a6ea5",
    blurb: "Greece to the Cold War",
    intro: "From the first democracy to two world wars and back to peace — Europe's story shaped governments, science, and ideas all over the planet.",
    badge: { name: "European Historian", emoji: "🏛️" },
    lessons: ["eu1", "eu2", "eu3", "eu4", "eu5", "eu6", "eu7", "eu8"],
    sectionQuiz: [
      { q: "Put these in order — which came <b>first</b>?", type: "mc", options: ["The Roman Empire", "Ancient Greek democracy", "The Industrial Revolution", "World War I"], answer: 1, explain: "Greek democracy (~508 BC) came first, then Rome, then the Industrial Revolution (1760s), then WWI (1914)." },
      { q: "Athens gave the world the idea of democracy. Which empire later spread law and engineering across Europe?", type: "mc", options: ["The Aztec Empire", "The Roman Empire", "The Ottoman Empire", "The British Empire"], answer: 1, explain: "Rome spread roads, law, and engineering far and wide." },
      { q: "Feudalism traded land for loyalty and service.", type: "tf", options: ["True", "False"], answer: 0, explain: "Lords gave land/protection in exchange for loyalty and labor." },
      { q: "Which invention from the Renaissance helped Enlightenment ideas spread quickly?", type: "mc", options: ["The printing press", "The telephone", "The car", "The internet"], answer: 0, explain: "Gutenberg's printing press (~1440) made books cheap and ideas fast-moving." },
      { q: "The Industrial Revolution moved millions of people from farms to…", type: "mc", options: ["Castles", "Factories and cities", "Monasteries", "Ships"], answer: 1, explain: "Factory work in growing cities replaced farm life for millions." },
      { q: "The harsh peace after WWI helped lead to…", type: "mc", options: ["The Renaissance", "World War II", "The fall of Rome", "The Cold War ending"], answer: 1, explain: "Resentment after WWI's treaty helped extremists rise, leading to WWII." },
      { q: "Fascism is the opposite of democracy because it…", type: "mc", options: ["Holds many fair elections", "Puts total power in one leader and crushes dissent", "Has no leader at all", "Lets everyone vote daily"], answer: 1, explain: "Fascism concentrates power and silences opposition." },
      { q: "During the Cold War, the USA and USSR mostly…", type: "mc", options: ["Fought each other directly in huge battles", "Competed without fighting each other directly", "Were close allies", "Shared one government"], answer: 1, explain: "They competed in spies, space, and influence but avoided direct war." },
      { q: "The fall of the Berlin Wall in 1989 symbolized…", type: "mc", options: ["The start of WWI", "The end of the Cold War", "The birth of Rome", "The Renaissance"], answer: 1, explain: "It marked the Cold War's end and the decline of communism in Europe." },
      { q: "Which big idea did ancient Greece, the Enlightenment, and modern democracies share?", type: "mc", options: ["Kings should have absolute power", "Government should answer to the people", "Only soldiers should rule", "Ideas should be kept secret"], answer: 1, explain: "The thread from Athens to today is government answerable to its people." },
    ],
  });

  lesson({
    id: "eu1", continent: "europe", n: 1, minutes: 5, emoji: "🏛️",
    title: "Ancient Greece & the Birth of Democracy",
    hook: "About 2,500 years ago, one city tried a wild idea: <b>let ordinary people vote on the laws.</b> We still use that idea today.",
    beats: [
      { t: "lead", html: "Greece wasn't one country. It was hundreds of independent <b>city-states</b> — each its own little world, often arguing or at war." },
      { t: "p", html: "The most famous was <b>Athens</b>. Around 508 BC, Athens built the first known <b>democracy</b> — a word from Greek meaning <i>“rule by the people.”</i> Citizens gathered on a hill and voted directly on laws and war." },
      { t: "scene", art: "columns", caption: "Greek temples like the Parthenon still stand in Athens today." },
      { t: "p", html: "It wasn't perfect: only free adult men who were citizens could vote — women, enslaved people, and foreigners couldn't. But the <b>idea</b> that government should answer to the people was revolutionary, and it never went away." },
      { t: "fact", html: "Greeks also gave us the <b>Olympic Games</b>, geometry (thanks, Pythagoras), theatre, and philosophers like <b>Socrates, Plato, and Aristotle</b> who asked, “How should we live?”" },
      { t: "scenario", title: "You're a citizen of Athens", prompt: "The assembly is voting on whether to go to war with a neighboring city. There's no TV, no internet — just speeches. What do you trust most?",
        opts: [
          { label: "The most powerful speaker", tag: "Watch out", outcome: "Athens learned that great speakers (called <i>demagogues</i>) could sway crowds into bad decisions. Persuasion isn't the same as being right." },
          { label: "Evidence and past results", tag: "Wise", outcome: "Weighing real evidence is exactly the skill democracy needs — and it's still hard today!" },
          { label: "Whatever my friends pick", tag: "Common", outcome: "Going with the crowd is human, but it's how mistakes spread. Democracy works best when people think for themselves." },
        ] },
      { t: "modern", html: "Every time a country holds an election, it's using an idea Athens tested first. The very words <b>democracy, politics, and citizen</b> come from ancient Greek." },
    ],
    quiz: [
      { q: "What does the word “democracy” mean?", type: "mc", options: ["Rule by kings", "Rule by the people", "Rule by soldiers", "Rule by priests"], answer: 1, explain: "“Demos” = people, “kratos” = power/rule.", hint: "Look at the two Greek root words." },
      { q: "Ancient Greece was organized mostly as one large empire.", type: "tf", options: ["True", "False"], answer: 1, explain: "Greece was hundreds of independent city-states, often rivals — not one empire." },
      { q: "Which city is famous as the birthplace of democracy?", type: "mc", options: ["Sparta", "Rome", "Athens", "Troy"], answer: 2, explain: "Athens built the first known democracy around 508 BC." },
      { q: "Could everyone in Athens vote?", type: "mc", options: ["Yes, everyone", "Only free adult male citizens", "Only women", "Only soldiers"], answer: 1, explain: "Only free adult male citizens — women, enslaved people, and foreigners were excluded.", hint: "Their democracy was a big idea but a limited reality." },
      { q: "Which of these did the ancient Greeks give the world?", type: "mc", options: ["The Olympic Games", "The steam engine", "Gunpowder", "The printing press"], answer: 0, explain: "The Olympics began in Greece; the others came much later and elsewhere." },
    ],
  });

  lesson({
    id: "eu2", continent: "europe", n: 2, minutes: 6, emoji: "🏟️",
    title: "The Roman Empire: Rise & Fall",
    hook: "Rome grew from a small town into an empire that ruled <b>50–60 million people</b> — and lasted, in some form, for about a thousand years.",
    beats: [
      { t: "lead", html: "How does one city end up ruling from Britain to the Middle East? Roads, armies, law — and a knack for absorbing the people they conquered." },
      { t: "p", html: "Rome began as a <b>kingdom</b>, then became a <b>republic</b> (elected senators), then an <b>empire</b> ruled by emperors starting with <b>Augustus</b> in 27 BC. At its peak, you could travel thousands of miles and still be “in Rome.”" },
      { t: "scene", art: "colosseum", caption: "The Colosseum held 50,000 people for games and spectacles." },
      { t: "p", html: "Romans were master <b>engineers</b>: straight roads, aqueducts carrying water for miles, concrete, and a legal system. Many of their ideas — courts, the Senate, even the calendar — still shape us." },
      { t: "order", title: "Order Rome's story", sub: "Drag these into order, earliest to latest.",
        items: [
          { yr: "~753 BC", label: "Rome founded as a small city" },
          { yr: "509 BC", label: "Rome becomes a Republic" },
          { yr: "27 BC", label: "Augustus becomes first emperor" },
          { yr: "117 AD", label: "Empire reaches its greatest size" },
          { yr: "476 AD", label: "Last Western Roman emperor falls" },
        ] },
      { t: "p", html: "Why did it fall? Not one reason — many: it grew too big to defend, money problems, political fighting, plagues, and invasions. In <b>476 AD</b> the last Western emperor was removed. But the <b>Eastern</b> half (the Byzantine Empire) lived on for another 1,000 years." },
      { t: "fact", html: "Our months <b>July</b> and <b>August</b> are named after Julius Caesar and Augustus. And “Caesar” became a title — “Kaiser” and “Tsar” both come from it!" },
      { t: "modern", html: "Look around: domes, courts, the words on a coin, the way roads are numbered. Roman law and engineering are baked into modern life across Europe and beyond." },
    ],
    quiz: [
      { q: "Before it was an empire, Rome was a…", type: "mc", options: ["Democracy like Athens", "Republic with a Senate", "Pirate kingdom", "Colony of Egypt"], answer: 1, explain: "Rome was a Republic with elected senators before emperors took over.", hint: "Think of the Senate." },
      { q: "Who is considered Rome's first emperor?", type: "mc", options: ["Julius Caesar", "Augustus", "Nero", "Constantine"], answer: 1, explain: "Augustus became the first emperor in 27 BC. (Julius Caesar was never officially emperor.)" },
      { q: "The Western Roman Empire fell in 476 AD.", type: "tf", options: ["True", "False"], answer: 0, explain: "476 AD marks the fall of the Western empire; the Eastern (Byzantine) half lasted ~1,000 more years." },
      { q: "Why did the Eastern (Byzantine) empire last so much longer?", type: "mc", options: ["It was richer and easier to defend", "It had no enemies", "It was much bigger", "It gave up having an army"], answer: 0, explain: "The East was wealthier, with the strong, well-defended capital of Constantinople." },
      { q: "Which is a famous Roman engineering achievement?", type: "mc", options: ["Aqueducts", "The telescope", "The compass", "The light bulb"], answer: 0, explain: "Aqueducts carried fresh water across long distances — brilliant Roman engineering." },
    ],
  });

  lesson({
    id: "eu3", continent: "europe", n: 3, minutes: 5, emoji: "🏰",
    title: "The Middle Ages: Knights, Lords & the Church",
    hook: "After Rome fell, Europe reorganized around a simple deal: <b>land in exchange for loyalty.</b> We call it feudalism.",
    beats: [
      { t: "lead", html: "With no big empire to keep order, people traded freedom for protection. Powerful lords offered safety; in return, people worked their land and fought for them." },
      { t: "compare", title: "Who's who in feudalism",
        a: { title: "Top of the pyramid", items: ["<b>King</b> — owns all the land in theory", "<b>Lords / nobles</b> — given land, raise armies", "<b>Knights</b> — armored warriors who serve a lord"] },
        b: { title: "Most of the people", items: ["<b>Peasants & serfs</b> — farm the land", "Give part of their crops to the lord", "Get protection, but little freedom"] } },
      { t: "scene", art: "castle", caption: "Stone castles were homes, forts, and symbols of power." },
      { t: "p", html: "The <b>Catholic Church</b> was the other giant power. It crowned kings, ran the only schools, copied books by hand, and touched daily life everywhere. Bishops could be as powerful as nobles." },
      { t: "p", html: "It wasn't all gloom. Towns and trade grew, universities were founded, great cathedrals rose, and ideas traveled with merchants and pilgrims. The <b>Black Death</b> (1347–1351) was a catastrophe — it killed perhaps a third of Europe — but survivors gained bargaining power, weakening the old system." },
      { t: "fact", html: "Most people couldn't read, so cathedrals taught stories through <b>stained-glass windows</b> — like comic strips made of light." },
      { t: "modern", html: "Words like <b>“loyalty,” “chivalry,”</b> and even how we picture knights and castles all come from this age. And the Black Death shows how disease can reshape whole societies — something the world saw again recently." },
    ],
    quiz: [
      { q: "Feudalism was basically a deal of…", type: "mc", options: ["Money for votes", "Land for loyalty and service", "Gold for spices", "Ships for soldiers"], answer: 1, explain: "Lords gave land/protection; people gave loyalty, labor, and military service.", hint: "What did a lord give, and what did he get back?" },
      { q: "Which group did most of the farming?", type: "mc", options: ["Knights", "Bishops", "Peasants and serfs", "Kings"], answer: 2, explain: "Peasants and serfs worked the land and supported everyone above them." },
      { q: "The Catholic Church had little influence in the Middle Ages.", type: "tf", options: ["True", "False"], answer: 1, explain: "The Church was hugely powerful — crowning kings, running schools, and shaping daily life." },
      { q: "What was the Black Death?", type: "mc", options: ["A famous battle", "A deadly plague that killed about a third of Europe", "A type of castle", "A king's nickname"], answer: 1, explain: "It was a plague (1347–1351) that killed roughly a third of Europe's people." },
      { q: "One surprising result of the Black Death was…", type: "mc", options: ["Surviving workers gained bargaining power", "Castles disappeared", "Everyone became a knight", "Rome was rebuilt"], answer: 0, explain: "With fewer workers, survivors could demand better treatment — weakening feudalism." },
    ],
  });

  lesson({
    id: "eu4", continent: "europe", n: 4, minutes: 6, emoji: "🎨",
    title: "Renaissance & Enlightenment: New Ways of Thinking",
    hook: "Starting in Italy around 1400, Europe had a <b>“rebirth”</b> of art and ideas — then learned to test the world with reason and experiment.",
    beats: [
      { t: "lead", html: "“Renaissance” means <b>rebirth</b>. Thinkers rediscovered ancient Greek and Roman learning and combined it with bold new creativity." },
      { t: "p", html: "Artists like <b>Leonardo da Vinci</b> and <b>Michelangelo</b> made lifelike art using math and observation. Leonardo was also an inventor and scientist — the ultimate curious mind." },
      { t: "hotmap", map: "europe", title: "Where ideas caught fire", sub: "Tap each center of new thinking.",
        spots: [
          { x: 205, y: 150, label: "Florence, Italy", text: "The cradle of the Renaissance, funded by rich merchant families like the Medici." },
          { x: 150, y: 120, label: "Mainz, Germany", text: "Around 1440, Gutenberg's printing press let books spread faster than ever before." },
          { x: 110, y: 130, label: "Paris & beyond", text: "Later, Enlightenment thinkers debated reason, science, and rights in cafés and salons." },
        ] },
      { t: "p", html: "A game-changer arrived around <b>1440</b>: <b>Gutenberg's printing press</b>. Suddenly books were cheap. Ideas — and arguments — spread across Europe in months instead of lifetimes." },
      { t: "p", html: "That set up the <b>Enlightenment</b> (1600s–1700s): thinkers like Newton, Galileo, and Locke argued you should <b>test ideas with evidence and reason</b>, and that people have natural rights. These ideas later inspired revolutions in America and France." },
      { t: "fact", html: "Galileo pointed a new invention — the <b>telescope</b> — at the sky and showed Earth orbits the Sun, not the other way around. It got him in big trouble at the time." },
      { t: "modern", html: "The scientific method, free speech, and the idea of human rights all grew here. Every science experiment you do in school is part of this story." },
    ],
    quiz: [
      { q: "What does “Renaissance” mean?", type: "mc", options: ["Revolution", "Rebirth", "Empire", "Darkness"], answer: 1, explain: "It means “rebirth” — of art, learning, and ideas.", hint: "Re- means again…" },
      { q: "Which invention (around 1440) made books cheap and spread ideas fast?", type: "mc", options: ["The telescope", "The printing press", "The steam engine", "The compass"], answer: 1, explain: "Gutenberg's printing press transformed how knowledge spread." },
      { q: "Leonardo da Vinci was only a painter, nothing else.", type: "tf", options: ["True", "False"], answer: 1, explain: "He was a painter, inventor, scientist, and engineer — endlessly curious." },
      { q: "The Enlightenment valued…", type: "mc", options: ["Reason, science, and evidence", "Magic and luck", "Bigger castles", "Keeping ideas secret"], answer: 0, explain: "Enlightenment thinkers prized reason, evidence, and natural rights." },
      { q: "Galileo used the telescope to support the idea that…", type: "mc", options: ["The Sun orbits Earth", "Earth orbits the Sun", "Stars are tiny", "The Moon is flat"], answer: 1, explain: "He showed Earth orbits the Sun — controversial at the time." },
    ],
  });

  lesson({
    id: "eu5", continent: "europe", n: 5, minutes: 6, emoji: "⚙️",
    title: "The Industrial Revolution",
    hook: "Around 1760 in Britain, machines began doing work that hands and animals once did. It changed how humans live — forever.",
    beats: [
      { t: "lead", html: "For thousands of years, almost everyone farmed. Then steam-powered machines arrived, and within a century millions moved to cities to work in <b>factories</b>." },
      { t: "p", html: "It started with <b>textiles</b> (cloth) and the <b>steam engine</b>, powered by coal. Railways and steamships shrank the world; goods and people moved faster than ever." },
      { t: "scene", art: "factory", caption: "Factory towns grew fast — with smoke, machines, and crowded streets." },
      { t: "compare", title: "Life before vs. after",
        a: { title: "Before (farming world)", items: ["Most people farmed the land", "Goods made slowly, by hand", "Few people lived in cities", "Life changed little for centuries"] },
        b: { title: "After (industrial world)", items: ["Millions worked in factories", "Machines made goods cheaply, fast", "Cities exploded in size", "Trains and clocks ran daily life"] } },
      { t: "p", html: "There was a hard side: early factories had <b>long hours, low pay, and child labor</b>, plus pollution. Over time, workers organized, and laws brought shorter hours, safety rules, and schools instead of work for kids." },
      { t: "fact", html: "Before factories, towns set clocks by the sun, so every town's time was a little different. Railways needed everyone on the <b>same schedule</b> — that's why we have standard time zones!" },
      { t: "modern", html: "Mass-produced goods, commuting to work, even climate change (from burning fossil fuels) trace back here. We're still living in the world the Industrial Revolution built." },
    ],
    quiz: [
      { q: "The Industrial Revolution began around 1760 in…", type: "mc", options: ["Britain", "China", "Egypt", "Brazil"], answer: 0, explain: "It began in Britain, with textiles and the steam engine.", hint: "An island nation in Europe." },
      { q: "What powered the first factories and trains?", type: "mc", options: ["Electricity", "Steam from burning coal", "Solar panels", "Wind only"], answer: 1, explain: "Coal-fired steam engines drove the early Industrial Revolution." },
      { q: "Before industry, most people worked as…", type: "mc", options: ["Factory workers", "Farmers", "Sailors", "Teachers"], answer: 1, explain: "For most of history, the vast majority farmed." },
      { q: "Early factories were always safe and fair to workers.", type: "tf", options: ["True", "False"], answer: 1, explain: "Early factories often had long hours, low pay, and child labor — laws improved this later." },
      { q: "Why did standard time zones get invented?", type: "mc", options: ["For the Olympics", "So railways could share one schedule", "To help farmers", "For television"], answer: 1, explain: "Railways needed consistent timetables, so towns adopted standard time." },
    ],
  });

  lesson({
    id: "eu6", continent: "europe", n: 6, minutes: 6, emoji: "🌍",
    title: "World War I: Causes & Consequences",
    hook: "In 1914, a single assassination set off a chain reaction that pulled the whole world into war. How?",
    beats: [
      { t: "lead", html: "Europe in 1914 was a web of <b>alliances</b> — promises that if one country was attacked, its friends would join. Like dominoes standing in a row." },
      { t: "p", html: "Historians remember the causes with <b>M-A-I-N</b>: <b>M</b>ilitarism (big armies), <b>A</b>lliances (those promises), <b>I</b>mperialism (competing for colonies), and <b>N</b>ationalism (intense pride in one's nation)." },
      { t: "p", html: "The spark: in June 1914, <b>Archduke Franz Ferdinand</b> of Austria-Hungary was assassinated. Alliances activated, and within weeks much of Europe was at war." },
      { t: "scene", art: "trench", caption: "Soldiers dug trenches and faced new, terrible weapons." },
      { t: "p", html: "It became a new kind of war: <b>trench warfare</b>, machine guns, tanks, poison gas, and airplanes. Millions of soldiers died for tiny patches of land. People called it “the war to end all wars.”" },
      { t: "order", title: "The road to war and after", sub: "Earliest to latest.",
        items: [
          { yr: "June 1914", label: "Archduke Franz Ferdinand assassinated" },
          { yr: "Aug 1914", label: "Alliances trigger — war spreads" },
          { yr: "1917", label: "The United States joins the war" },
          { yr: "Nov 1918", label: "Armistice — fighting ends" },
          { yr: "1919", label: "Treaty of Versailles punishes Germany" },
        ] },
      { t: "fact", html: "WWI helped redraw the world map — old empires (Austro-Hungarian, Ottoman, Russian) collapsed, and many modern countries were born from the pieces." },
      { t: "modern", html: "The harsh peace treaty left Germany angry and struggling — which, sadly, helped set the stage for an even bigger war just 20 years later." },
    ],
    quiz: [
      { q: "What event sparked the start of WWI?", type: "mc", options: ["The sinking of the Titanic", "The assassination of Archduke Franz Ferdinand", "The fall of Rome", "A stock market crash"], answer: 1, explain: "His assassination in 1914 triggered the alliance system into war.", hint: "It involved an archduke." },
      { q: "The “A” in the M-A-I-N causes stands for…", type: "mc", options: ["Armies", "Alliances", "America", "Anger"], answer: 1, explain: "Alliances — promises to defend one another — turned a local conflict into a world war." },
      { q: "WWI introduced trench warfare and new weapons like poison gas.", type: "tf", options: ["True", "False"], answer: 0, explain: "Yes — machine guns, tanks, gas, and planes made it horrifically deadly." },
      { q: "Which empire collapsed as a result of WWI?", type: "mc", options: ["The Roman Empire", "The Austro-Hungarian Empire", "The British Empire", "The Aztec Empire"], answer: 1, explain: "Several empires fell, including the Austro-Hungarian, Ottoman, and Russian." },
      { q: "How did the peace treaty help cause WWII later?", type: "mc", options: ["It made Germany rich", "It left Germany angry and struggling", "It united all of Europe", "It banned all armies forever"], answer: 1, explain: "The harsh Treaty of Versailles fueled resentment that extremists later exploited." },
    ],
  });

  lesson({
    id: "eu7", continent: "europe", n: 7, minutes: 6, emoji: "⚔️",
    title: "World War II & the Rise of Fascism",
    hook: "In the 1930s, hard times pushed some nations toward dictators who promised greatness — and led the world into its deadliest war.",
    beats: [
      { t: "lead", html: "After WWI and a global economic crash (the Great Depression), people were scared and poor. Some leaders offered a dangerous bargain: give me total power, and I'll make us strong again." },
      { t: "p", html: "This was <b>fascism</b> — a system with a single all-powerful leader, extreme nationalism, no real freedom or elections, and the crushing of anyone who disagreed. In Germany, <b>Adolf Hitler</b> and the Nazi party took this to a horrifying extreme." },
      { t: "p", html: "WWII began in 1939 when Germany invaded Poland. It split the world into the <b>Allies</b> (including Britain, the Soviet Union, and the United States) and the <b>Axis</b> (Germany, Italy, Japan)." },
      { t: "compare", title: "Two ways to run a country",
        a: { title: "Democracy", items: ["Leaders chosen by elections", "Freedom of speech & press", "Power is limited and shared", "People can disagree safely"] },
        b: { title: "Fascist dictatorship", items: ["One leader holds total power", "Speech and press controlled", "No real elections", "Opponents silenced or jailed"] } },
      { t: "p", html: "The war's worst horror was the <b>Holocaust</b>: the Nazi murder of six million Jewish people, plus millions of others. It's a solemn reminder of where hatred and unchecked power can lead — and why we must never forget." },
      { t: "fact", html: "WWII sped up technology dramatically: radar, jet engines, computers, and (tragically) the atomic bomb all advanced during these years." },
      { t: "modern", html: "After 1945, nations created the <b>United Nations</b> to prevent another world war, and wrote down universal <b>human rights</b>. “Never again” became a guiding promise." },
    ],
    quiz: [
      { q: "Fascism is best described as…", type: "mc", options: ["Rule by the people through voting", "A system with one all-powerful leader and no real freedom", "A type of trade agreement", "A religion"], answer: 1, explain: "Fascism centers total power in one leader and crushes dissent.", hint: "It's the opposite of democracy." },
      { q: "WWII began in 1939 when Germany invaded…", type: "mc", options: ["France", "Poland", "Russia", "Britain"], answer: 1, explain: "The invasion of Poland in 1939 started the war in Europe." },
      { q: "The Allies included Britain, the Soviet Union, and the United States.", type: "tf", options: ["True", "False"], answer: 0, explain: "Correct — they fought against the Axis (Germany, Italy, Japan)." },
      { q: "The Holocaust was…", type: "mc", options: ["A famous battle", "The Nazi murder of six million Jewish people and millions of others", "A peace treaty", "A new weapon"], answer: 1, explain: "It was a genocide — a solemn lesson about hatred and unchecked power." },
      { q: "What did nations create after WWII to help keep peace?", type: "mc", options: ["The United Nations", "The Roman Senate", "The printing press", "Feudalism"], answer: 0, explain: "The UN was founded in 1945 to prevent future world wars." },
    ],
  });

  lesson({
    id: "eu8", continent: "europe", n: 8, minutes: 6, emoji: "🧱",
    title: "The Cold War & the Fall of Communism",
    hook: "After WWII, two superpowers — the USA and the USSR — never fought directly, yet kept the world on edge for 45 years.",
    beats: [
      { t: "lead", html: "It was called the <b>Cold War</b> because the two giants never fought each other head-on. Instead they competed everywhere: spies, sports, space, weapons, and influence over other countries." },
      { t: "p", html: "They had opposite systems. The <b>United States</b> led the democratic, free-market West. The <b>Soviet Union (USSR)</b> led the <b>communist</b> East, where the government controlled the economy and allowed no other parties." },
      { t: "p", html: "Europe was split by an imaginary line Churchill called the <b>“Iron Curtain.”</b> The city of Berlin was divided by a real wall in 1961 — families separated overnight, with guards stopping anyone crossing." },
      { t: "scene", art: "wall", caption: "The Berlin Wall split a city in two for 28 years." },
      { t: "hotmap", map: "europe", title: "A divided continent", sub: "Tap to explore the Cold War's flashpoints.",
        spots: [
          { x: 150, y: 110, label: "Berlin, Germany", text: "Divided by a wall in 1961; its fall in 1989 became the symbol of the Cold War's end." },
          { x: 130, y: 90, label: "The Iron Curtain", text: "An invisible line splitting democratic Western Europe from communist Eastern Europe." },
          { x: 250, y: 80, label: "Moscow, USSR", text: "Capital of the Soviet Union, the communist superpower that rivaled the United States." },
        ] },
      { t: "p", html: "They also raced to space — the USSR launched the first satellite (<b>Sputnik</b>, 1957) and the US landed the first people on the <b>Moon</b> (1969). Then, in <b>1989</b>, the Berlin Wall fell; by 1991 the Soviet Union peacefully broke apart, and the Cold War ended." },
      { t: "fact", html: "When the Wall fell on November 9, 1989, crowds celebrated and chipped off pieces as souvenirs. People keep chunks of the Berlin Wall in museums all over the world today." },
      { t: "modern", html: "The Cold War shaped today's world: the space programs we still use, many borders in Europe, and the global influence of the US and Russia. Its peaceful end showed that even huge systems can change without a giant war." },
    ],
    quiz: [
      { q: "Why was it called the “Cold” War?", type: "mc", options: ["It happened in winter", "The two superpowers never fought each other directly", "It was fought in the Arctic", "Nobody cared about it"], answer: 1, explain: "The US and USSR competed in many ways but avoided direct war.", hint: "Think about what 'cold' means here vs. a 'hot' shooting war." },
      { q: "The two superpowers of the Cold War were…", type: "mc", options: ["Britain and France", "The USA and the USSR (Soviet Union)", "China and Japan", "Germany and Italy"], answer: 1, explain: "The democratic USA and the communist USSR led the two sides." },
      { q: "The Berlin Wall divided a city for nearly 30 years.", type: "tf", options: ["True", "False"], answer: 0, explain: "Built in 1961, it fell in 1989 — about 28 years." },
      { q: "In a communist system like the USSR's, who controlled the economy?", type: "mc", options: ["Private businesses", "The government", "Foreign kings", "No one"], answer: 1, explain: "The government controlled the economy and allowed no rival parties." },
      { q: "What year did the Berlin Wall fall, signaling the Cold War's end?", type: "mc", options: ["1945", "1969", "1989", "2001"], answer: 2, explain: "The Wall fell in 1989; the USSR dissolved in 1991." },
    ],
  });

  /* ============================================================
     ASIA
     ============================================================ */
  cont({
    id: "asia", name: "Asia", emoji: "🐉", color: "#c0392b",
    blurb: "China, India, Japan & more",
    intro: "The world's largest continent and home to its oldest civilizations, biggest populations, and many of history's greatest inventions.",
    badge: { name: "Asian Explorer", emoji: "🐉" },
    lessons: ["as1", "as2", "as3", "as4", "as5", "as6", "as7", "as8"],
    sectionQuiz: [
      { q: "Which of these was invented in ancient China?", type: "mc", options: ["The steam engine", "Paper", "The telescope", "The car"], answer: 1, explain: "China invented paper, printing, gunpowder, and the compass." },
      { q: "Gandhi led India's independence movement using…", type: "mc", options: ["A huge army", "Nonviolent resistance", "Pirate ships", "Castle sieges"], answer: 1, explain: "Gandhi's nonviolent resistance inspired movements worldwide." },
      { q: "Japan stayed exactly the same for all of history and never modernized.", type: "tf", options: ["True", "False"], answer: 1, explain: "Japan rapidly modernized during the Meiji era (late 1800s)." },
      { q: "The Silk Road was…", type: "mc", options: ["A type of cloth", "Trade routes linking Asia, the Middle East, and Europe", "A Japanese castle", "A Chinese river"], answer: 1, explain: "It was a network of trade routes carrying goods and ideas across continents." },
      { q: "Colonialism in Asia means…", type: "mc", options: ["Asian countries colonizing Europe", "European powers controlling Asian lands", "A trade festival", "A religion"], answer: 1, explain: "European powers controlled large parts of Asia for resources and trade." },
      { q: "Which is the world's most populous region?", type: "mc", options: ["Asia", "Europe", "Africa", "Oceania"], answer: 0, explain: "Asia has more people than any other continent — over half the world." },
      { q: "After WWII, several Asian economies grew so fast they were nicknamed the…", type: "mc", options: ["Asian Tigers", "Asian Lions", "Asian Eagles", "Asian Bears"], answer: 0, explain: "South Korea, Taiwan, Singapore, and Hong Kong were the 'Asian Tigers.'" },
      { q: "India is home to several major world religions, including Hinduism and Buddhism.", type: "tf", options: ["True", "False"], answer: 0, explain: "Both Hinduism and Buddhism began in ancient India." },
      { q: "The Taj Mahal was built as a…", type: "mc", options: ["Fortress", "Tomb of love by a Mughal emperor", "Train station", "School"], answer: 1, explain: "Emperor Shah Jahan built it as a tomb for his beloved wife." },
      { q: "Why did the Silk Road matter beyond trade?", type: "mc", options: ["It only moved silk", "It spread ideas, religions, and technology between cultures", "It was never used", "It connected only two cities"], answer: 1, explain: "Ideas, faiths, and inventions traveled the Silk Road along with goods." },
    ],
  });

  lesson({
    id: "as1", continent: "asia", n: 1, minutes: 6, emoji: "🐉",
    title: "Ancient China: Dynasties & Great Inventions",
    hook: "China is home to one of the world's oldest continuous civilizations — and it gave us paper, printing, gunpowder, and the compass.",
    beats: [
      { t: "lead", html: "For thousands of years China was ruled by <b>dynasties</b> — families of emperors who passed power down. When one weakened, another took over, a pattern Chinese historians called the “Mandate of Heaven.”" },
      { t: "p", html: "Chinese inventors were astonishingly ahead of their time. The “<b>Four Great Inventions</b>” — <b>paper, printing, gunpowder, and the compass</b> — eventually changed the entire world when they spread westward." },
      { t: "scene", art: "greatwall", caption: "The Great Wall stretches thousands of miles — built to defend the empire." },
      { t: "p", html: "To protect against northern invaders, emperors connected walls into the <b>Great Wall of China</b>, which winds over <b>13,000 miles</b> in total. Goods and ideas flowed out along the <b>Silk Road</b>, a network of trade routes reaching all the way to Rome." },
      { t: "order", title: "China's inventions reach the world", sub: "These are roughly when each invention appeared. Order them earliest to latest.",
        items: [
          { yr: "~100 BC", label: "Paper is invented in China" },
          { yr: "~700 AD", label: "Woodblock printing develops" },
          { yr: "~900 AD", label: "Gunpowder is discovered" },
          { yr: "~1100 AD", label: "The magnetic compass guides sailors" },
        ] },
      { t: "fact", html: "The compass let sailors find their way far from land — without it, the later European Age of Exploration might never have happened." },
      { t: "modern", html: "You used a Chinese invention today: paper. And gunpowder, printing, and the compass each reshaped the whole world — proof that one region's ideas can change everyone's future." },
    ],
    quiz: [
      { q: "China was ruled for centuries by families of emperors called…", type: "mc", options: ["Republics", "Dynasties", "Tribes", "Senates"], answer: 1, explain: "A dynasty is a ruling family that passes power down through generations.", hint: "It's a ruling family." },
      { q: "Which is one of China's “Four Great Inventions”?", type: "mc", options: ["The wheel", "Gunpowder", "The alphabet", "Concrete"], answer: 1, explain: "Paper, printing, gunpowder, and the compass are the Four Great Inventions." },
      { q: "The Great Wall of China was built mainly to…", type: "mc", options: ["Attract tourists", "Defend against northern invaders", "Store water", "Mark a race track"], answer: 1, explain: "It was a defensive barrier against invasions from the north." },
      { q: "The Silk Road connected China only to its neighbors next door.", type: "tf", options: ["True", "False"], answer: 1, explain: "It stretched all the way to the Middle East and Europe — even Rome." },
      { q: "Why was the compass so important to world history?", type: "mc", options: ["It told the time", "It let sailors navigate far from land", "It made paper", "It cooked food"], answer: 1, explain: "Navigation by compass made long ocean voyages possible." },
    ],
  });

  lesson({
    id: "as2", continent: "asia", n: 2, minutes: 6, emoji: "🕌",
    title: "India: Empires, Religion & Independence",
    hook: "India gave birth to two world religions, dazzling empires, and one of history's most inspiring independence movements.",
    beats: [
      { t: "lead", html: "India's history stretches back over 4,000 years to the <b>Indus Valley</b> cities — among the world's first, with planned streets and plumbing." },
      { t: "p", html: "Two major world religions began here: <b>Hinduism</b>, one of the oldest living faiths, and <b>Buddhism</b>, founded by Siddhartha Gautama (the Buddha). Later, great empires like the <b>Maurya</b> and the <b>Mughal</b> ruled vast lands and built wonders." },
      { t: "scene", art: "taj", caption: "The Taj Mahal, built by Mughal emperor Shah Jahan as a tomb for his wife." },
      { t: "p", html: "In the 1700s–1800s, <b>Britain</b> gradually took control of India, making it the “jewel” of its empire. Indians wanted to rule themselves again." },
      { t: "p", html: "Their leader, <b>Mahatma Gandhi</b>, chose an extraordinary path: <b>nonviolent resistance</b>. Through peaceful marches, boycotts, and courage, Indians won <b>independence in 1947</b> — inspiring civil-rights movements around the world." },
      { t: "scenario", title: "Gandhi's choice", prompt: "An unjust law taxes salt — something everyone needs. How do you protest without violence?",
        opts: [
          { label: "March to the sea and make your own salt", tag: "What Gandhi did", outcome: "Gandhi's 240-mile Salt March in 1930 broke the law peacefully and drew the world's attention to India's cause." },
          { label: "Attack the tax offices", tag: "Not his way", outcome: "Gandhi believed violence would only bring more violence — and lose the moral high ground." },
          { label: "Do nothing and hope it changes", tag: "Too slow", outcome: "Gandhi believed in peaceful <i>action</i>, not silence — courage without weapons." },
        ] },
      { t: "fact", html: "Today India is the world's <b>most populous country</b> and largest democracy, with over a billion people speaking hundreds of languages." },
      { t: "modern", html: "Gandhi's nonviolent methods inspired leaders like <b>Martin Luther King Jr.</b> in the United States. Ideas, like trade goods, travel across the world." },
    ],
    quiz: [
      { q: "Which two major world religions began in ancient India?", type: "mc", options: ["Christianity and Islam", "Hinduism and Buddhism", "Judaism and Shinto", "Sikhism and Taoism"], answer: 1, explain: "Both Hinduism and Buddhism originated in India.", hint: "One is among the oldest living faiths; the other was founded by the Buddha." },
      { q: "The Taj Mahal was built as a…", type: "mc", options: ["Palace for parties", "Tomb for an emperor's beloved wife", "Military fort", "Marketplace"], answer: 1, explain: "Mughal emperor Shah Jahan built it as a tomb for his wife." },
      { q: "Which country controlled India before its independence?", type: "mc", options: ["France", "Britain", "Portugal", "Japan"], answer: 1, explain: "Britain ruled India until 1947." },
      { q: "Gandhi led India to freedom mainly through violent rebellion.", type: "tf", options: ["True", "False"], answer: 1, explain: "He used nonviolent resistance — peaceful protest and civil disobedience." },
      { q: "In what year did India gain independence?", type: "mc", options: ["1857", "1918", "1947", "1991"], answer: 2, explain: "India became independent in 1947." },
    ],
  });

  lesson({
    id: "as3", continent: "asia", n: 3, minutes: 5, emoji: "⛩️",
    title: "Japan: From Samurai to Modern Power",
    hook: "For centuries Japan was a land of samurai and shoguns — then, in a single generation, it transformed into a modern industrial nation.",
    beats: [
      { t: "lead", html: "Like medieval Europe, old Japan had its own feudal system: an emperor as a symbol, a military ruler called the <b>shogun</b> holding real power, and warrior knights called <b>samurai</b> who followed a strict code of honor (bushido)." },
      { t: "p", html: "For over 200 years, Japan closed itself off from the outside world. Then in 1853, American ships arrived and Japan reopened — and decided to modernize <b>fast</b>." },
      { t: "scene", art: "torii", caption: "A torii gate marks the entrance to a Shinto shrine." },
      { t: "p", html: "During the <b>Meiji era</b> (from 1868), Japan built railways, factories, schools, and a modern navy in just a few decades — one of the fastest modernizations in history. It became a major world power." },
      { t: "compare", title: "Old Japan vs. Meiji Japan",
        a: { title: "Before (feudal)", items: ["Ruled by shoguns & samurai", "Closed to the outside world", "Sword-based warrior culture", "Mostly farming economy"] },
        b: { title: "After (Meiji)", items: ["Modern government & army", "Open to global trade & ideas", "Railways and factories", "Fast-growing industry"] } },
      { t: "fact", html: "Japan adopted useful ideas from many countries — its constitution, navy, and schools borrowed from Europe — but kept its own culture and traditions." },
      { t: "modern", html: "After hardship in WWII, Japan rebuilt into one of the world's largest economies, famous for cars, electronics, and bullet trains. It shows how quickly a nation can transform itself." },
    ],
    quiz: [
      { q: "Japan's warrior class, who followed a code of honor, were the…", type: "mc", options: ["Knights", "Samurai", "Legionnaires", "Vikings"], answer: 1, explain: "Samurai followed bushido, the way of the warrior.", hint: "A famous Japanese warrior." },
      { q: "The real military ruler of old Japan was called the…", type: "mc", options: ["Pharaoh", "Shogun", "Caesar", "Sultan"], answer: 1, explain: "The shogun held real power, while the emperor was a symbol." },
      { q: "During the Meiji era, Japan modernized very slowly over many centuries.", type: "tf", options: ["True", "False"], answer: 1, explain: "It modernized remarkably FAST — within just a few decades." },
      { q: "What did Japan build during its rapid modernization?", type: "mc", options: ["Pyramids", "Railways, factories, and a modern navy", "The Great Wall", "Aqueducts"], answer: 1, explain: "Railways, factories, schools, and a navy transformed Japan." },
      { q: "After WWII, Japan became famous for…", type: "mc", options: ["Cars, electronics, and bullet trains", "Pirate fleets", "Castles only", "Silk Road trade"], answer: 0, explain: "Japan rebuilt into a tech and manufacturing powerhouse." },
    ],
  });

  lesson({
    id: "as4", continent: "asia", n: 4, minutes: 6, emoji: "🕌",
    title: "The Ottoman Empire & the Spread of Islam",
    hook: "For 600 years, the Ottoman Empire bridged Asia, Europe, and Africa — one of the most powerful empires the world has known.",
    beats: [
      { t: "lead", html: "The religion of <b>Islam</b> began in the 600s AD in Arabia and spread rapidly. Islamic empires became centers of learning, preserving and advancing math, science, and medicine while Europe was in its Middle Ages." },
      { t: "p", html: "Muslim scholars gave us the word <b>“algebra,”</b> advanced astronomy, and translated ancient Greek books that Europe had lost. Great cities like Baghdad and Córdoba glittered with libraries." },
      { t: "p", html: "The <b>Ottoman Empire</b>, founded around 1300, grew into a superpower. In <b>1453</b> it captured Constantinople (now Istanbul), ending the last of the Roman Empire and controlling key trade routes between East and West." },
      { t: "scene", art: "scroll", caption: "Islamic scholars preserved and expanded human knowledge for centuries." },
      { t: "hotmap", map: "mideast", title: "A bridge between worlds", sub: "Tap to explore the Ottoman crossroads.",
        spots: [
          { x: 130, y: 110, label: "Istanbul (Constantinople)", text: "Captured in 1453, it became the Ottoman capital — a meeting point of Europe and Asia." },
          { x: 210, y: 140, label: "Trade routes", text: "The Ottomans controlled key routes for spices and silk between East and West." },
          { x: 250, y: 90, label: "Centers of learning", text: "Islamic cities preserved Greek knowledge and advanced math, science, and medicine." },
        ] },
      { t: "fact", html: "Because the Ottomans controlled the land trade routes, Europeans went looking for <b>sea</b> routes to Asia — which led directly to the European voyages that “discovered” the Americas." },
      { t: "modern", html: "Modern Turkey grew from the Ottoman Empire. And words you use — algebra, algorithm, coffee, sugar — came to Europe through the Islamic world." },
    ],
    quiz: [
      { q: "The word “algebra” comes from…", type: "mc", options: ["Latin", "Arabic / the Islamic world", "Japanese", "Greek"], answer: 1, explain: "Algebra comes from Arabic — Islamic scholars advanced mathematics greatly.", hint: "Think about who advanced math during Europe's Middle Ages." },
      { q: "In 1453, the Ottomans captured which great city?", type: "mc", options: ["Rome", "Constantinople (Istanbul)", "Athens", "Cairo"], answer: 1, explain: "Capturing Constantinople ended the last remnant of the Roman Empire." },
      { q: "While Europe was in its Middle Ages, Islamic cities were centers of learning.", type: "tf", options: ["True", "False"], answer: 0, explain: "They preserved Greek knowledge and advanced science, math, and medicine." },
      { q: "Ottoman control of land trade routes encouraged Europeans to…", type: "mc", options: ["Give up on trade", "Search for sea routes to Asia", "Build the Great Wall", "Invent the printing press"], answer: 1, explain: "The search for sea routes led to the voyages that reached the Americas." },
      { q: "The modern country that grew from the Ottoman Empire is…", type: "mc", options: ["Turkey", "Italy", "Egypt", "Greece"], answer: 0, explain: "Modern Turkey emerged from the Ottoman Empire after WWI." },
    ],
  });

  lesson({
    id: "as5", continent: "asia", n: 5, minutes: 5, emoji: "🚢",
    title: "Colonialism in Asia",
    hook: "By the 1800s, far-off European nations controlled much of Asia. How did a few small countries come to rule lands so vast?",
    beats: [
      { t: "lead", html: "<b>Colonialism</b> is when one country takes control of another to use its land, people, and resources. European powers — Britain, France, the Netherlands, and others — colonized much of Asia." },
      { t: "p", html: "Why? <b>Resources and trade</b>: spices, tea, silk, rubber, and rich markets. Powered by Industrial-Revolution technology — steamships, railways, and modern weapons — small European nations could control huge populations." },
      { t: "scene", art: "ship", caption: "European trading companies arrived by sea, then stayed to rule." },
      { t: "compare", title: "Two sides of colonial rule",
        a: { title: "What colonizers built", items: ["Railways, ports, and roads", "New schools and laws", "Global trade links"] },
        b: { title: "What it cost the people", items: ["Lost the right to rule themselves", "Wealth and resources taken away", "Local cultures pushed aside", "Famines and unfair treatment"] } },
      { t: "p", html: "It often began with <b>trading companies</b> (like the British East India Company) that grew so powerful they acted like governments — running armies and collecting taxes." },
      { t: "fact", html: "At its height, the British Empire was so large that the sun was always shining on some part of it — “the empire on which the sun never sets.”" },
      { t: "modern", html: "Colonial borders, languages, and railways still shape many Asian countries today. Understanding colonialism helps explain a lot about the modern world — including why English is spoken so widely." },
    ],
    quiz: [
      { q: "Colonialism means…", type: "mc", options: ["Two countries trading equally", "One country controlling another for its resources", "A type of festival", "A peace treaty"], answer: 1, explain: "It's one nation taking control of another's land, people, and resources.", hint: "Think about power and control, not equal partnership." },
      { q: "What made it possible for small European nations to control huge Asian lands?", type: "mc", options: ["Magic", "Industrial technology — steamships, railways, modern weapons", "Larger populations", "Friendship treaties"], answer: 1, explain: "Industrial-era technology gave them a big advantage." },
      { q: "Which resources attracted European powers to Asia?", type: "mc", options: ["Spices, tea, silk, and rubber", "Ice and snow", "Sand", "Nothing valuable"], answer: 0, explain: "Valuable trade goods and big markets drew them in." },
      { q: "Trading companies sometimes grew powerful enough to act like governments.", type: "tf", options: ["True", "False"], answer: 0, explain: "The British East India Company even had its own army and collected taxes." },
      { q: "Colonial rule had no lasting effects on Asian countries.", type: "tf", options: ["True", "False"], answer: 1, explain: "Borders, languages, and railways from colonial times still shape these countries." },
    ],
  });

  lesson({
    id: "as6", continent: "asia", n: 6, minutes: 5, emoji: "✊",
    title: "Asia Wins Its Freedom",
    hook: "In the 1900s, one Asian nation after another shook off colonial rule and claimed the right to govern itself.",
    beats: [
      { t: "lead", html: "After two world wars exhausted the European powers, colonized peoples across Asia demanded independence — and got it, country after country." },
      { t: "p", html: "<b>India</b> led the way in 1947 with Gandhi's nonviolent movement. Others followed: Indonesia, the Philippines, Vietnam, and many more became independent nations through the 1940s, 50s, and 60s." },
      { t: "p", html: "Independence wasn't always smooth. New borders sometimes split communities, and some struggles were peaceful while others involved conflict. But the age of European empires in Asia was ending." },
      { t: "order", title: "Asia becomes independent", sub: "Order these independence years, earliest to latest.",
        items: [
          { yr: "1945", label: "Indonesia declares independence" },
          { yr: "1946", label: "The Philippines becomes independent" },
          { yr: "1947", label: "India and Pakistan gain independence" },
          { yr: "1957", label: "Malaysia (Malaya) becomes independent" },
        ] },
      { t: "fact", html: "The idea of <b>self-determination</b> — that people should govern themselves — spread worldwide in the 1900s, ending most of the world's empires within a single lifetime." },
      { t: "modern", html: "Most of today's Asian nations are younger than your grandparents! Their journey from colony to country shaped the map you see now." },
    ],
    quiz: [
      { q: "What helped trigger the wave of Asian independence?", type: "mc", options: ["The European powers were exhausted after two world wars", "A new ice age", "The fall of Rome", "The Renaissance"], answer: 0, explain: "Weakened European powers could no longer hold their colonies.", hint: "Think about what happened to Europe in the first half of the 1900s." },
      { q: "Which country's 1947 independence helped lead the way for others?", type: "mc", options: ["Japan", "India", "China", "Korea"], answer: 1, explain: "India's independence inspired other colonized peoples." },
      { q: "All Asian countries became independent peacefully and easily.", type: "tf", options: ["True", "False"], answer: 1, explain: "Some transitions were peaceful, others involved conflict and difficult new borders." },
      { q: "“Self-determination” means…", type: "mc", options: ["People should govern themselves", "Empires should expand", "Kings rule forever", "Trade is banned"], answer: 0, explain: "It's the idea that people have the right to rule themselves." },
      { q: "Most modern Asian nations became independent…", type: "mc", options: ["Thousands of years ago", "In the mid-1900s", "In ancient Rome", "Only last year"], answer: 1, explain: "Many gained independence in the 1940s–60s — quite recently!" },
    ],
  });

  lesson({
    id: "as7", continent: "asia", n: 7, minutes: 5, emoji: "🚩",
    title: "China's Revolution & Transformation",
    hook: "In 1949, China became a communist nation. Decades later, it transformed again into an economic giant. Two huge turning points in one lifetime.",
    beats: [
      { t: "lead", html: "After its last dynasty ended in 1912, China went through decades of struggle, civil war, and invasion. In <b>1949</b>, the Communist Party, led by <b>Mao Zedong</b>, won control and founded the People's Republic of China." },
      { t: "p", html: "Under communism, the government controlled farms, factories, and daily life. Some policies caused great hardship; the period reshaped Chinese society enormously." },
      { t: "p", html: "Then came a second turning point. Starting around <b>1978</b>, leader <b>Deng Xiaoping</b> opened China to business and trade — keeping one-party rule but allowing markets. The results were dramatic." },
      { t: "compare", title: "China's two big changes",
        a: { title: "1949: Communist Revolution", items: ["One-party communist government", "State controls the economy", "Major social transformation"] },
        b: { title: "1978+: Economic opening", items: ["Allowed markets and businesses", "Joined global trade", "Hundreds of millions rose out of poverty"] } },
      { t: "fact", html: "China's growth since the 1980s lifted <b>more than 800 million people</b> out of extreme poverty — one of the biggest economic changes in human history." },
      { t: "modern", html: "Today China is the world's second-largest economy and most populous-rival, making goods sold everywhere. Its rapid rise is one of the biggest stories of our time." },
    ],
    quiz: [
      { q: "In what year did China become a communist nation?", type: "mc", options: ["1912", "1949", "1978", "2001"], answer: 1, explain: "The People's Republic of China was founded in 1949.", hint: "Just after WWII." },
      { q: "Who led the Communist Party to power in 1949?", type: "mc", options: ["Deng Xiaoping", "Mao Zedong", "Sun Yat-sen", "Confucius"], answer: 1, explain: "Mao Zedong founded the People's Republic of China." },
      { q: "Starting around 1978, China opened up to markets and trade.", type: "tf", options: ["True", "False"], answer: 0, explain: "Deng Xiaoping's reforms allowed business while keeping one-party rule." },
      { q: "China's economic opening after 1978 resulted in…", type: "mc", options: ["Hundreds of millions rising out of poverty", "The end of all trade", "A return to dynasties", "Nothing changing"], answer: 0, explain: "Over 800 million people rose out of extreme poverty." },
      { q: "Today, China has the world's ___-largest economy.", type: "mc", options: ["smallest", "second", "tenth", "fiftieth"], answer: 1, explain: "China is the world's second-largest economy." },
    ],
  });

  lesson({
    id: "as8", continent: "asia", n: 8, minutes: 5, emoji: "🏙️",
    title: "Modern Asia: Tigers & Rising Powers",
    hook: "In just a few decades, parts of Asia went from poor and war-torn to some of the richest, most high-tech places on Earth.",
    beats: [
      { t: "lead", html: "After WWII, four economies grew so fast they earned a nickname: the <b>“Asian Tigers”</b> — South Korea, Taiwan, Singapore, and Hong Kong. They invested in education, technology, and trade." },
      { t: "p", html: "<b>South Korea</b> went from one of the world's poorest countries in the 1950s to a global leader in electronics, cars, and even pop culture (K-pop!). <b>Singapore</b>, a tiny island with no natural resources, became one of the world's wealthiest places through smart planning and trade." },
      { t: "scene", art: "torii", caption: "Modern Asia blends ancient traditions with cutting-edge technology." },
      { t: "p", html: "Today, Asia is home to over half the world's people and many of its biggest economies. <b>China</b> and <b>India</b> — the two most populous countries — are rising powers shaping the global future." },
      { t: "fact", html: "Many of your gadgets — phones, TVs, game consoles — were designed or built in Asia. The continent is the workshop and tech lab of the modern world." },
      { t: "modern", html: "From the smartphone in a pocket to the cars on the road, modern Asia touches daily life everywhere. Understanding it means understanding where much of the 21st century is being shaped." },
    ],
    quiz: [
      { q: "The “Asian Tigers” were four fast-growing economies including…", type: "mc", options: ["South Korea and Singapore", "India and Pakistan", "Japan and China", "Iran and Iraq"], answer: 0, explain: "South Korea, Taiwan, Singapore, and Hong Kong were the Asian Tigers.", hint: "One is famous for K-pop; one is a tiny wealthy island." },
      { q: "South Korea was always one of the world's richest countries.", type: "tf", options: ["True", "False"], answer: 1, explain: "It was among the poorest in the 1950s, then transformed within a few decades." },
      { q: "How did resource-poor Singapore become wealthy?", type: "mc", options: ["Gold mining", "Smart planning, education, and trade", "Farming", "Oil"], answer: 1, explain: "Singapore relied on planning, education, and global trade." },
      { q: "Asia is home to about what share of the world's people?", type: "mc", options: ["A tenth", "A quarter", "More than half", "None"], answer: 2, explain: "Over half of all humans live in Asia." },
      { q: "Which two of the world's most populous countries are rising Asian powers?", type: "mc", options: ["China and India", "Japan and Korea", "Vietnam and Thailand", "Nepal and Bhutan"], answer: 0, explain: "China and India are the most populous nations and rising powers." },
    ],
  });

  /* ============================================================
     AFRICA
     ============================================================ */
  cont({
    id: "africa", name: "Africa", emoji: "🦁", color: "#d68910",
    blurb: "Kingdoms, trade & rebirth",
    intro: "The birthplace of humanity, home to mighty kingdoms and golden trade routes — and a continent that won back its freedom and is now young, fast-growing, and full of energy.",
    badge: { name: "Africa Pathfinder", emoji: "🦁" },
    lessons: ["af1", "af2", "af3", "af4", "af5", "af6"],
    sectionQuiz: [
      { q: "Africa is often called the birthplace of…", type: "mc", options: ["The car", "Humanity", "The printing press", "Democracy"], answer: 1, explain: "The earliest humans lived in Africa — it's where our species began." },
      { q: "The kingdom of Mali was famous for its huge wealth in…", type: "mc", options: ["Ice", "Gold and salt", "Oil", "Silk"], answer: 1, explain: "Mali grew rich from the gold and salt trade across the Sahara." },
      { q: "The Atlantic slave trade forcibly took millions of Africans across the ocean.", type: "tf", options: ["True", "False"], answer: 0, explain: "Over 12 million Africans were enslaved and shipped to the Americas — a great tragedy." },
      { q: "During the “Scramble for Africa,” European powers…", type: "mc", options: ["Left Africa alone", "Divided up almost the whole continent among themselves", "Asked Africans to rule Europe", "Built the pyramids"], answer: 1, explain: "By 1914, Europeans controlled almost all of Africa." },
      { q: "Most African nations became independent…", type: "mc", options: ["In ancient times", "Around the 1950s–60s", "Never", "In the year 2020"], answer: 1, explain: "A wave of independence swept Africa in the mid-1900s." },
      { q: "Timbuktu was famous as a center of…", type: "mc", options: ["War", "Trade and learning, with great libraries", "Ice fishing", "Car making"], answer: 1, explain: "Timbuktu was a renowned center of trade, books, and scholarship." },
      { q: "Nelson Mandela is celebrated for…", type: "mc", options: ["Inventing the telephone", "Helping end apartheid and uniting South Africa", "Building the Great Wall", "Discovering gold"], answer: 1, explain: "Mandela helped end racial segregation (apartheid) and became South Africa's first Black president." },
      { q: "Africa today has the world's youngest and fastest-growing population.", type: "tf", options: ["True", "False"], answer: 0, explain: "Africa is young and rapidly growing — full of future potential." },
      { q: "Ancient Egypt, in northern Africa, is famous for building…", type: "mc", options: ["Skyscrapers", "The pyramids", "Railways", "The Colosseum"], answer: 1, explain: "Egypt built the pyramids over 4,000 years ago." },
      { q: "Why does understanding colonialism help explain modern Africa?", type: "mc", options: ["It doesn't", "Colonial borders and choices still shape today's countries", "Africa was never colonized", "It only affected Europe"], answer: 1, explain: "Borders drawn by colonizers still influence African nations today." },
    ],
  });

  lesson({
    id: "af1", continent: "africa", n: 1, minutes: 6, emoji: "🏺",
    title: "Ancient Africa: Mighty Kingdoms & Golden Trade",
    hook: "Long before Europe's empires, Africa had golden kingdoms, libraries full of books, and one of the richest people who ever lived.",
    beats: [
      { t: "lead", html: "Africa is where humanity began — the earliest humans lived here. And its history is full of powerful, wealthy civilizations." },
      { t: "p", html: "In the north, <b>Ancient Egypt</b> built the pyramids over 4,000 years ago and developed writing, medicine, and astronomy. Further south, great kingdoms rose around trade." },
      { t: "scene", art: "pyramids", caption: "Egypt's pyramids have stood for over 4,000 years." },
      { t: "p", html: "The kingdoms of <b>Ghana, Mali, and Songhai</b> in West Africa grew rich trading <b>gold and salt</b> across the Sahara Desert. The city of <b>Timbuktu</b> became a famous center of learning, with universities and libraries holding thousands of books." },
      { t: "p", html: "Mali's ruler <b>Mansa Musa</b> may have been the richest person in history. On a journey to Mecca around 1324, he gave away so much gold along the way that he accidentally changed economies for years!" },
      { t: "hotmap", map: "africa", title: "Africa's golden kingdoms", sub: "Tap to explore centers of wealth and learning.",
        spots: [
          { x: 210, y: 60, label: "Ancient Egypt", text: "Builders of the pyramids and pioneers of writing and medicine." },
          { x: 120, y: 110, label: "Mali & Timbuktu", text: "Rich from gold and salt; Timbuktu held famous libraries and universities." },
          { x: 230, y: 150, label: "Great Zimbabwe", text: "A stone city in the south, center of a powerful trading kingdom." },
        ] },
      { t: "fact", html: "Timbuktu's libraries held hundreds of thousands of manuscripts on math, science, and law — proof that Africa had thriving centers of knowledge for centuries." },
      { t: "modern", html: "These kingdoms remind us that Africa's story is one of wealth, learning, and achievement — not just the difficult chapters that came later. History is bigger than any single chapter." },
    ],
    quiz: [
      { q: "Africa is considered the birthplace of…", type: "mc", options: ["The wheel", "Humanity", "Gunpowder", "The car"], answer: 1, explain: "The earliest humans evolved in Africa.", hint: "Where did our species first appear?" },
      { q: "West African kingdoms like Mali grew rich trading…", type: "mc", options: ["Ice and snow", "Gold and salt", "Cars and phones", "Silk and tea"], answer: 1, explain: "Gold and salt crossed the Sahara, making these kingdoms wealthy." },
      { q: "Timbuktu was famous as a center of trade and learning.", type: "tf", options: ["True", "False"], answer: 0, explain: "It had universities and libraries with thousands of books." },
      { q: "Mansa Musa of Mali is remembered for being incredibly…", type: "mc", options: ["Poor", "Wealthy", "Short", "Unknown"], answer: 1, explain: "He may have been the richest person in history." },
      { q: "Ancient Egypt is famous for building…", type: "mc", options: ["Castles", "The pyramids", "Skyscrapers", "Aqueducts"], answer: 1, explain: "Egypt built the pyramids over 4,000 years ago." },
    ],
  });

  lesson({
    id: "af2", continent: "africa", n: 2, minutes: 6, emoji: "⛓️",
    title: "The Atlantic Slave Trade",
    hook: "One of history's greatest tragedies: over 12 million Africans were taken from their homes and enslaved across the ocean. It's a hard story — and an important one.",
    beats: [
      { t: "lead", html: "From the 1500s to the 1800s, European traders shipped <b>more than 12 million enslaved Africans</b> across the Atlantic Ocean to the Americas. This is called the <b>Atlantic slave trade</b>." },
      { t: "p", html: "Enslaved people were forced to work — without pay or freedom — on plantations growing sugar, cotton, and tobacco. They were treated as property, separated from their families, and denied their basic rights as human beings." },
      { t: "scene", art: "ship", caption: "Enslaved people endured a terrible ocean voyage called the Middle Passage." },
      { t: "p", html: "Despite unimaginable hardship, enslaved Africans showed extraordinary <b>strength and resilience</b>. They kept their cultures alive through music, food, language, and faith — gifts that shaped the Americas forever, from jazz and blues to foods we eat today." },
      { t: "p", html: "Brave people fought to end it. <b>Abolitionists</b> — including formerly enslaved people like <b>Frederick Douglass</b> and <b>Harriet Tubman</b> — campaigned for freedom. Slavery was finally abolished: in the British Empire in 1833, and in the United States in 1865." },
      { t: "fact", html: "Much of American music — blues, jazz, gospel, and even rock and hip-hop — grew from the traditions of enslaved Africans and their descendants. Their culture became part of the world's culture." },
      { t: "modern", html: "We study this painful history so it's never repeated, and to honor the millions who suffered and survived. Their descendants helped build nations across the Americas, and their cultures enrich the whole world today." },
    ],
    quiz: [
      { q: "About how many Africans were taken in the Atlantic slave trade?", type: "mc", options: ["A few hundred", "Over 12 million", "About a thousand", "None"], answer: 1, explain: "More than 12 million Africans were forcibly enslaved across the Atlantic.", hint: "It was one of the largest forced migrations in history." },
      { q: "Enslaved people were forced to work without pay or freedom.", type: "tf", options: ["True", "False"], answer: 0, explain: "They were treated as property and denied basic human rights." },
      { q: "The terrible ocean crossing endured by enslaved people was called the…", type: "mc", options: ["Silk Road", "Middle Passage", "Grand Tour", "Royal Voyage"], answer: 1, explain: "The Middle Passage was the brutal Atlantic crossing." },
      { q: "People who fought to end slavery were called…", type: "mc", options: ["Abolitionists", "Colonists", "Emperors", "Knights"], answer: 0, explain: "Abolitionists campaigned to abolish (end) slavery." },
      { q: "Which kind of music grew from the traditions of enslaved Africans and their descendants?", type: "mc", options: ["Jazz and blues", "Opera only", "None", "Medieval chants"], answer: 0, explain: "Blues, jazz, gospel, and more grew from these rich traditions." },
    ],
  });

  lesson({
    id: "af3", continent: "africa", n: 3, minutes: 5, emoji: "🗺️",
    title: "The Scramble for Africa",
    hook: "In just 30 years, European powers carved up almost an entire continent — often drawing borders without ever asking the people who lived there.",
    beats: [
      { t: "lead", html: "In the late 1800s, European nations raced to claim African territory for its resources — rubber, diamonds, gold, and farmland. Historians call it the <b>“Scramble for Africa.”</b>" },
      { t: "p", html: "At a meeting in Berlin in 1884–85, European leaders literally divided Africa among themselves on a map — <b>without a single African present</b>. By 1914, almost the entire continent was under European control." },
      { t: "p", html: "The borders they drew were often straight lines that ignored where different communities actually lived — sometimes splitting one group across countries or forcing rivals together. Many of these borders still exist today." },
      { t: "scene", art: "scroll", caption: "Europeans drew new borders across Africa — often with little local knowledge." },
      { t: "compare", title: "Colonial rule in Africa",
        a: { title: "What was built", items: ["Railways, roads, and ports", "Mines and plantations", "Some schools and hospitals"] },
        b: { title: "What was lost", items: ["The right to self-rule", "Land and resources taken", "Borders that ignored real communities", "Forced labor and unfair treatment"] } },
      { t: "fact", html: "Only two African countries avoided being colonized: <b>Ethiopia</b> (which defeated an invasion) and <b>Liberia</b>." },
      { t: "modern", html: "Many conflicts and challenges in modern Africa trace back to those hastily-drawn colonial borders. Knowing this history helps make sense of today's map." },
    ],
    quiz: [
      { q: "The “Scramble for Africa” was when European powers…", type: "mc", options: ["Left Africa alone", "Raced to claim African territory", "Asked Africans to rule them", "Built pyramids"], answer: 1, explain: "Europeans rushed to claim Africa for its resources.", hint: "Think of a race to grab land." },
      { q: "At the Berlin Conference, Africa was divided up by Europeans with no Africans present.", type: "tf", options: ["True", "False"], answer: 0, explain: "European leaders split the continent among themselves on a map." },
      { q: "A problem with the borders Europeans drew was that they…", type: "mc", options: ["Were perfectly fair", "Often ignored where communities actually lived", "Were chosen by Africans", "Didn't exist"], answer: 1, explain: "Straight-line borders split or combined communities carelessly." },
      { q: "By 1914, how much of Africa was under European control?", type: "mc", options: ["None", "Almost all of it", "Only the coasts", "Half"], answer: 1, explain: "Nearly the entire continent had been colonized." },
      { q: "Which African country famously avoided colonization?", type: "mc", options: ["Egypt", "Ethiopia", "Nigeria", "Kenya"], answer: 1, explain: "Ethiopia defeated an invasion and stayed independent (as did Liberia)." },
    ],
  });

  lesson({
    id: "af4", continent: "africa", n: 4, minutes: 5, emoji: "✊🏿",
    title: "Africa Wins Its Independence",
    hook: "Starting around 1957, African nations reclaimed their freedom one after another — over 30 new countries in barely a decade.",
    beats: [
      { t: "lead", html: "After WWII, Africans across the continent demanded the right to govern themselves. The movement grew unstoppable." },
      { t: "p", html: "<b>Ghana</b> led the way in 1957, becoming the first sub-Saharan African colony to gain independence, under leader <b>Kwame Nkrumah</b>. The year <b>1960</b> was so full of new nations it's called the “<b>Year of Africa</b>” — 17 countries became independent in that year alone!" },
      { t: "p", html: "In South Africa, a cruel system of racial segregation called <b>apartheid</b> kept the Black majority from equal rights. <b>Nelson Mandela</b> spent 27 years in prison fighting it — then walked free and helped build a united, democratic South Africa, becoming its first Black president in 1994." },
      { t: "order", title: "Africa becomes free", sub: "Order these milestones, earliest to latest.",
        items: [
          { yr: "1957", label: "Ghana — first to gain independence" },
          { yr: "1960", label: "“Year of Africa” — 17 nations free" },
          { yr: "1990", label: "Nelson Mandela released from prison" },
          { yr: "1994", label: "Mandela elected South Africa's president" },
        ] },
      { t: "fact", html: "Nelson Mandela won the Nobel Peace Prize and became one of the most admired people in the world — a symbol of forgiveness and reconciliation." },
      { t: "modern", html: "In just a few decades, the map of Africa transformed from colonies to dozens of independent nations. Leaders like Mandela showed the power of perseverance and forgiveness." },
    ],
    quiz: [
      { q: "Which country was the first sub-Saharan African colony to gain independence (1957)?", type: "mc", options: ["Nigeria", "Ghana", "Kenya", "Egypt"], answer: 1, explain: "Ghana led the way in 1957 under Kwame Nkrumah.", hint: "Its name starts with G." },
      { q: "1960 is called the “Year of Africa” because…", type: "mc", options: ["A war started", "17 nations became independent that year", "The pyramids were built", "Gold was discovered"], answer: 1, explain: "Seventeen African countries gained independence in 1960." },
      { q: "Apartheid in South Africa was a system of…", type: "mc", options: ["Free trade", "Racial segregation", "Ocean exploration", "Religious study"], answer: 1, explain: "Apartheid enforced unjust racial segregation." },
      { q: "Nelson Mandela spent 27 years in prison before becoming president.", type: "tf", options: ["True", "False"], answer: 0, explain: "He was imprisoned 27 years, then led South Africa as its first Black president." },
      { q: "Mandela is especially admired for showing…", type: "mc", options: ["Forgiveness and reconciliation", "How to build pyramids", "Skill at sailing", "Love of gold"], answer: 0, explain: "He chose reconciliation over revenge, uniting his nation." },
    ],
  });

  lesson({
    id: "af5", continent: "africa", n: 5, minutes: 5, emoji: "🌱",
    title: "Building New Nations",
    hook: "Winning independence was just the start. New African nations faced a huge question: how do you build a country almost from scratch?",
    beats: [
      { t: "lead", html: "Freedom brought hope — and hard challenges. New nations had to build governments, schools, and economies, often within those tricky colonial borders." },
      { t: "p", html: "Some countries thrived; others faced difficulties like conflict, poverty, or unstable leadership. Cold War rivalries didn't help — the US and USSR sometimes competed for influence in Africa, just as they did elsewhere." },
      { t: "p", html: "But Africans also built remarkable things: pan-African cooperation (the <b>African Union</b> unites the continent's nations), growing cities, and proud cultural identities. Many countries found their footing and began to grow." },
      { t: "scenario", title: "You lead a brand-new nation", prompt: "Your country just became independent. You have limited money. What do you invest in first?",
        opts: [
          { label: "Schools and education", tag: "Long-term win", outcome: "Educating people builds doctors, engineers, and leaders for the future — many successful nations chose this." },
          { label: "A big new palace", tag: "Risky", outcome: "Spending on show instead of people rarely helps a young nation grow." },
          { label: "Roads and electricity", tag: "Also smart", outcome: "Infrastructure connects people to jobs and markets — a strong foundation for growth." },
        ] },
      { t: "fact", html: "The <b>African Union</b>, formed in 2002, brings together 55 member states — a bit like Africa's own version of the European Union." },
      { t: "modern", html: "Nation-building is slow, hard work that's still going on. Understanding these challenges helps explain both the struggles and the successes you see in Africa today." },
    ],
    quiz: [
      { q: "After independence, new African nations had to build…", type: "mc", options: ["Governments, schools, and economies", "Pyramids", "Castles", "Nothing"], answer: 0, explain: "They built the foundations of modern countries.", hint: "Think about what a country needs to function." },
      { q: "Cold War rivalries had no effect on Africa.", type: "tf", options: ["True", "False"], answer: 1, explain: "The US and USSR sometimes competed for influence in Africa." },
      { q: "The organization that unites African nations is the…", type: "mc", options: ["African Union", "United Nations", "European Union", "Silk Road"], answer: 0, explain: "The African Union (formed 2002) unites 55 member states." },
      { q: "A wise long-term investment for a new nation is…", type: "mc", options: ["A big palace", "Education and infrastructure", "More borders", "Nothing"], answer: 1, explain: "Education and infrastructure build a strong future." },
      { q: "Nation-building is quick and easy.", type: "tf", options: ["True", "False"], answer: 1, explain: "It's slow, difficult work that takes generations." },
    ],
  });

  lesson({
    id: "af6", continent: "africa", n: 6, minutes: 5, emoji: "🚀",
    title: "Modern Africa: Young, Growing, Rising",
    hook: "Africa is the world's youngest continent — and one of its fastest-growing. The 21st century may be Africa's century.",
    beats: [
      { t: "lead", html: "Africa today is bursting with energy. It has the world's <b>youngest population</b> (most people are under 25) and several of the fastest-growing economies on Earth." },
      { t: "p", html: "Technology is leapfrogging old problems. Many Africans skipped landline phones and went straight to <b>mobile phones</b> — and invented <b>mobile money</b> (paying with your phone) before most of the world. Kenya's M-Pesa let millions bank without ever visiting a bank." },
      { t: "p", html: "Challenges remain — poverty, climate change, and inequality — but African innovators, artists, and entrepreneurs are tackling them. African music (Afrobeats), movies (Nollywood is huge!), and fashion are influencing global culture." },
      { t: "scene", art: "globe", caption: "A young, fast-growing Africa is shaping the global future." },
      { t: "fact", html: "<b>Nigeria's “Nollywood”</b> is one of the largest film industries in the world by number of movies made — bigger than Hollywood in output!" },
      { t: "modern", html: "By 2050, one in four people on Earth will be African. The continent's energy, youth, and creativity mean its choices will shape everyone's future. Africa's story is still being written — by its own people." },
    ],
    quiz: [
      { q: "Africa has the world's ___ population.", type: "mc", options: ["oldest", "youngest", "smallest", "shrinking"], answer: 1, explain: "Most Africans are young — under 25.", hint: "Lots of kids and young adults." },
      { q: "Many Africans adopted mobile phones and mobile money very early.", type: "tf", options: ["True", "False"], answer: 0, explain: "Africa leapfrogged to mobile tech, inventing mobile money like M-Pesa." },
      { q: "Nigeria's huge film industry is nicknamed…", type: "mc", options: ["Bollywood", "Nollywood", "Hollywood", "Tollywood"], answer: 1, explain: "Nollywood is one of the world's largest film industries by output." },
      { q: "By 2050, roughly what share of the world's people will be African?", type: "mc", options: ["1 in 100", "1 in 4", "None", "Half"], answer: 1, explain: "About one in four people on Earth will be African by 2050." },
      { q: "Africa's future will be shaped mainly by…", type: "mc", options: ["Its own people", "Only other continents", "No one", "Ancient pharaohs"], answer: 0, explain: "Africans — young, creative, and growing — are writing their own future." },
    ],
  });

  /* ============================================================
     AMERICAS
     ============================================================ */
  cont({
    id: "americas", name: "The Americas", emoji: "🗽", color: "#2e7d54",
    blurb: "Aztecs to modern nations",
    intro: "From mighty Indigenous empires to a “New World” of immigrants, revolutions, and superpowers — the story of two connected continents.",
    badge: { name: "Americas Master", emoji: "🗽" },
    lessons: ["am1", "am2", "am3", "am4", "am5", "am6", "am7"],
    sectionQuiz: [
      { q: "Which advanced civilization built pyramids in Mexico and had a great capital city on a lake?", type: "mc", options: ["The Aztecs", "The Romans", "The Vikings", "The Egyptians"], answer: 0, explain: "The Aztecs built Tenochtitlan on a lake — now Mexico City." },
      { q: "When Europeans arrived, the biggest killer of Indigenous peoples was…", type: "mc", options: ["Hunger", "New diseases like smallpox", "Cold weather", "Earthquakes"], answer: 1, explain: "Diseases the Indigenous peoples had never faced killed enormous numbers." },
      { q: "The United States declared independence from Britain in…", type: "mc", options: ["1492", "1776", "1865", "1969"], answer: 1, explain: "The Declaration of Independence was signed in 1776." },
      { q: "The US Civil War was fought largely over…", type: "mc", options: ["Tea taxes", "Slavery and whether states could leave the Union", "Gold", "Religion"], answer: 1, explain: "Slavery and the Union's survival were central to the Civil War." },
      { q: "The Inca Empire was located in…", type: "mc", options: ["The Andes Mountains of South America", "Canada", "the Caribbean", "Alaska"], answer: 0, explain: "The Inca ruled a vast Andean empire in western South America." },
      { q: "Millions of immigrants came to the Americas seeking…", type: "mc", options: ["A better life and opportunity", "Colder weather", "Fewer jobs", "War"], answer: 0, explain: "Immigrants sought opportunity, freedom, and a fresh start." },
      { q: "Simón Bolívar is famous for…", type: "mc", options: ["Painting", "Helping free much of South America from Spain", "Inventing the car", "Building pyramids"], answer: 1, explain: "Bolívar led independence movements across South America." },
      { q: "The Maya are especially known for advances in…", type: "mc", options: ["Astronomy, math, and writing", "Steam engines", "Gunpowder", "Sailing ships"], answer: 0, explain: "The Maya had advanced astronomy, math (including zero), and writing." },
      { q: "After WWII, the United States became a global superpower.", type: "tf", options: ["True", "False"], answer: 0, explain: "The US emerged from WWII as one of the world's two superpowers." },
      { q: "The Americas today are home to many cultures because…", type: "mc", options: ["No one ever moved there", "Indigenous, European, African, and immigrant peoples all blended", "Only one group lives there", "It was always empty"], answer: 1, explain: "Indigenous, European, African, and later immigrant cultures all mixed." },
    ],
  });

  lesson({
    id: "am1", continent: "americas", n: 1, minutes: 6, emoji: "🏛️",
    title: "Indigenous Empires: Aztec, Maya & Inca",
    hook: "Long before Columbus, the Americas were home to brilliant civilizations — with cities bigger than any in Europe at the time.",
    beats: [
      { t: "lead", html: "The Americas were never empty. Millions of people lived here for thousands of years, building advanced civilizations with their own science, art, and cities." },
      { t: "p", html: "The <b>Maya</b> (in Mexico and Central America) were math and astronomy geniuses — they used the concept of <b>zero</b>, created an incredibly accurate calendar, and developed a full writing system." },
      { t: "p", html: "The <b>Aztecs</b> built a stunning capital, <b>Tenochtitlan</b>, on an island in a lake — with causeways, floating gardens, and temples. It was bigger than most European cities. (It's now Mexico City.)" },
      { t: "scene", art: "aztec", caption: "Step pyramids towered over Aztec and Maya cities." },
      { t: "p", html: "High in the Andes Mountains of South America, the <b>Inca</b> ruled a vast empire connected by <b>thousands of miles of stone roads</b>. They built the famous mountaintop city of <b>Machu Picchu</b> — without iron tools or the wheel!" },
      { t: "hotmap", map: "americas", title: "Three great civilizations", sub: "Tap to explore each one.",
        spots: [
          { x: 130, y: 80, label: "The Maya", text: "Central America: masters of astronomy, math (zero!), and writing." },
          { x: 120, y: 95, label: "The Aztecs", text: "Mexico: built Tenochtitlan, a huge city on a lake — now Mexico City." },
          { x: 150, y: 175, label: "The Inca", text: "The Andes: a vast empire linked by stone roads, builders of Machu Picchu." },
        ] },
      { t: "fact", html: "The Inca recorded information using <b>knotted strings</b> called <i>quipu</i> instead of writing — a clever code we're still decoding today." },
      { t: "modern", html: "Foods the world loves — <b>chocolate, corn, potatoes, tomatoes, and chili peppers</b> — were all first grown by these Indigenous peoples. Imagine pizza or fries without them!" },
    ],
    quiz: [
      { q: "Which civilization built Tenochtitlan, a great city on a lake?", type: "mc", options: ["The Inca", "The Aztecs", "The Maya", "The Vikings"], answer: 1, explain: "The Aztecs built Tenochtitlan — now Mexico City.", hint: "It's now Mexico City." },
      { q: "The Maya are famous for advances in…", type: "mc", options: ["Astronomy, math, and writing", "Steam power", "Gunpowder", "Sailing"], answer: 0, explain: "They mastered astronomy, math (including zero), and writing." },
      { q: "The Inca Empire was located in…", type: "mc", options: ["The Andes Mountains", "Canada", "the Sahara", "Europe"], answer: 0, explain: "The Inca ruled the Andes of western South America." },
      { q: "The Americas were empty before Europeans arrived.", type: "tf", options: ["True", "False"], answer: 1, explain: "Millions of people had lived there for thousands of years." },
      { q: "Which food was first grown by Indigenous Americans?", type: "mc", options: ["Chocolate", "Rice", "Wheat", "Olives"], answer: 0, explain: "Chocolate, corn, potatoes, and tomatoes all came from the Americas." },
    ],
  });

  lesson({
    id: "am2", continent: "americas", n: 2, minutes: 6, emoji: "⛵",
    title: "Two Worlds Collide: European Arrival",
    hook: "In 1492, Columbus crossed the Atlantic — and connected two halves of the world that had been apart for thousands of years.",
    beats: [
      { t: "lead", html: "Looking for a sea route to Asia, <b>Christopher Columbus</b> sailed west in 1492 and reached the Caribbean. He hadn't found Asia — he'd reached lands Europeans didn't know existed." },
      { t: "p", html: "This began huge, permanent contact between the <b>Old World</b> (Europe, Asia, Africa) and the <b>New World</b> (the Americas). Spanish and Portuguese explorers and soldiers (called <b>conquistadors</b>) soon followed." },
      { t: "p", html: "Small groups of conquistadors toppled the mighty Aztec and Inca empires. How? Better weapons and horses helped — but the biggest factor was <b>disease</b>. Illnesses like smallpox, which Indigenous peoples had never encountered, killed a tragic number of them." },
      { t: "scene", art: "ship", caption: "European ships brought explorers, settlers — and devastating diseases." },
      { t: "p", html: "Historians call the swap of plants, animals, people, and diseases between the two worlds the <b>Columbian Exchange</b>. Horses, wheat, and cattle went west; corn, potatoes, and chocolate went east. It changed diets and life everywhere." },
      { t: "fact", html: "Before Europeans arrived, there were <b>no horses</b> in the Americas! The horse cultures of the Great Plains developed only after Spanish horses arrived." },
      { t: "modern", html: "The meeting of these worlds reshaped the entire planet — for better and for worse. It started the blending of peoples and cultures that defines the Americas today." },
    ],
    quiz: [
      { q: "In what year did Columbus cross the Atlantic?", type: "mc", options: ["1066", "1492", "1776", "1900"], answer: 1, explain: "Columbus reached the Caribbean in 1492.", hint: "“In fourteen hundred and ninety-two…”" },
      { q: "What was the biggest reason Indigenous empires fell so fast?", type: "mc", options: ["They surrendered happily", "New diseases like smallpox", "Bad weather", "They moved away"], answer: 1, explain: "Diseases the Indigenous peoples had never faced were devastating." },
      { q: "The swap of plants, animals, and diseases between the two worlds is called the…", type: "mc", options: ["Silk Road", "Columbian Exchange", "Industrial Revolution", "Cold War"], answer: 1, explain: "The Columbian Exchange transformed diets and life worldwide." },
      { q: "There were horses in the Americas before Europeans arrived.", type: "tf", options: ["True", "False"], answer: 1, explain: "Horses were brought by the Spanish — none existed there before." },
      { q: "Spanish soldiers who conquered lands in the Americas were called…", type: "mc", options: ["Conquistadors", "Samurai", "Knights", "Pharaohs"], answer: 0, explain: "Conquistador is Spanish for “conqueror.”" },
    ],
  });

  lesson({
    id: "am3", continent: "americas", n: 3, minutes: 5, emoji: "🌾",
    title: "Slavery in the Americas",
    hook: "The wealth of the “New World” was built in large part by the forced labor of millions of enslaved people. It's a vital part of the story.",
    beats: [
      { t: "lead", html: "Colonies in the Americas grew valuable crops — sugar, cotton, tobacco — that needed huge amounts of labor. Tragically, much of that labor was forced." },
      { t: "p", html: "As you learned in the Africa section, over <b>12 million enslaved Africans</b> were brought across the Atlantic. Most were taken to the Caribbean and South America; about 400,000 to what became the United States, where the enslaved population later grew to millions." },
      { t: "p", html: "Enslaved people had no freedom and no pay, yet they built much of the Americas' early wealth — and kept their humanity, cultures, and hope alive through generations of hardship." },
      { t: "scene", art: "scroll", caption: "Enslaved people resisted, endured, and shaped the cultures of the Americas." },
      { t: "p", html: "People fought to end it. Enslaved people resisted and escaped (the <b>Underground Railroad</b> helped many reach freedom), and abolitionists campaigned tirelessly. Slavery ended across the Americas in the 1800s — last of all in Brazil in 1888." },
      { t: "fact", html: "<b>Harriet Tubman</b> escaped slavery, then returned again and again to guide dozens of others to freedom on the Underground Railroad, risking her life each time." },
      { t: "modern", html: "The descendants of enslaved people are central to the cultures, music, food, and identity of nations throughout the Americas. Facing this history honestly helps build a fairer future." },
    ],
    quiz: [
      { q: "Why did colonies in the Americas use so much forced labor?", type: "mc", options: ["To build pyramids", "To grow valuable crops like sugar, cotton, and tobacco", "For fun", "To explore space"], answer: 1, explain: "Cash crops needed enormous amounts of labor.", hint: "Think about the plantations and what they grew." },
      { q: "The Underground Railroad was…", type: "mc", options: ["A subway system", "A secret network helping enslaved people escape to freedom", "A type of train", "A mine"], answer: 1, explain: "It was a network of routes and helpers guiding people to freedom." },
      { q: "Harriet Tubman risked her life to free others after escaping slavery herself.", type: "tf", options: ["True", "False"], answer: 0, explain: "She returned many times to guide others to freedom." },
      { q: "Slavery in the Americas ended…", type: "mc", options: ["In ancient times", "During the 1800s", "It never existed", "In the 1900s"], answer: 1, explain: "It ended across the Americas in the 1800s — last in Brazil in 1888." },
      { q: "Descendants of enslaved people are central to the cultures of the Americas.", type: "tf", options: ["True", "False"], answer: 0, explain: "Their influence shapes music, food, language, and identity throughout the Americas." },
    ],
  });

  lesson({
    id: "am4", continent: "americas", n: 4, minutes: 6, emoji: "🗽",
    title: "Revolutions: The Americas Become Free",
    hook: "Inspired by Enlightenment ideas, colonists across the Americas threw off European rule — and created brand-new nations.",
    beats: [
      { t: "lead", html: "Remember the Enlightenment idea that people have rights and government should answer to them? Colonists in the Americas took it seriously — and acted." },
      { t: "p", html: "In <b>1776</b>, thirteen British colonies declared independence, forming the <b>United States of America</b>. After a hard war, they won — and wrote a Constitution creating a new kind of government with elected leaders and limited power." },
      { t: "p", html: "The idea spread south. <b>Simón Bolívar</b> — nicknamed “The Liberator” — helped free much of South America from Spain. By the 1820s, most of Latin America was independent, forming countries like Colombia, Venezuela, Peru, and Bolivia (named after Bolívar!)." },
      { t: "order", title: "The age of revolutions", sub: "Order these, earliest to latest.",
        items: [
          { yr: "1776", label: "US Declaration of Independence" },
          { yr: "1804", label: "Haiti — first nation freed by enslaved people" },
          { yr: "1810s–20s", label: "Bolívar frees much of South America" },
          { yr: "1821", label: "Mexico wins independence from Spain" },
        ] },
      { t: "fact", html: "<b>Haiti</b> made history in 1804 as the first country born from a successful revolution of enslaved people — they defeated one of the world's strongest armies to win their freedom." },
      { t: "modern", html: "Most nations in the Americas — from Canada to Argentina — trace their independence to this era. The Enlightenment idea of self-rule reshaped two whole continents." },
    ],
    quiz: [
      { q: "The United States declared independence in…", type: "mc", options: ["1492", "1776", "1865", "1945"], answer: 1, explain: "The Declaration of Independence was signed in 1776.", hint: "It's celebrated every July 4th." },
      { q: "Simón Bolívar is known as…", type: "mc", options: ["“The Liberator” of South America", "A famous painter", "An Aztec emperor", "An explorer"], answer: 0, explain: "Bolívar helped free much of South America from Spanish rule." },
      { q: "Independence movements in the Americas were inspired by Enlightenment ideas.", type: "tf", options: ["True", "False"], answer: 0, explain: "Ideas about rights and self-rule fueled these revolutions." },
      { q: "Which country was the first born from a successful revolution of enslaved people (1804)?", type: "mc", options: ["Mexico", "Haiti", "Brazil", "Cuba"], answer: 1, explain: "Haiti achieved this remarkable, historic victory in 1804." },
      { q: "The country Bolivia is named after…", type: "mc", options: ["A river", "Simón Bolívar", "A mountain", "Columbus"], answer: 1, explain: "It honors Simón Bolívar, the Liberator." },
    ],
  });

  lesson({
    id: "am5", continent: "americas", n: 5, minutes: 6, emoji: "🚂",
    title: "The US: Civil War & Westward Expansion",
    hook: "A young United States grew across a continent — but a deep disagreement over slavery nearly tore it in two.",
    beats: [
      { t: "lead", html: "Through the 1800s, the United States expanded westward all the way to the Pacific. New land, railroads, and the Gold Rush drew millions — but this expansion also pushed Native American nations off their lands, a painful chapter." },
      { t: "p", html: "A huge question divided the country: should <b>slavery</b> spread to new states? The Northern states increasingly opposed it; the Southern economy depended on it. The disagreement grew until it broke into war." },
      { t: "p", html: "The <b>Civil War</b> (1861–1865) was the deadliest war in US history — Americans fighting Americans. President <b>Abraham Lincoln</b> led the Union (North) to victory and issued the <b>Emancipation Proclamation</b>, a step toward ending slavery." },
      { t: "scene", art: "star", caption: "The Civil War decided whether the United States would stay united — and free." },
      { t: "p", html: "The North won, the country stayed united, and slavery was abolished in 1865. But the long work of winning equal rights for formerly enslaved people and their descendants would continue for generations." },
      { t: "fact", html: "The transcontinental railroad, completed in 1869, let people cross the entire United States in about a week — a journey that used to take months by wagon." },
      { t: "modern", html: "The Civil War settled that the US would remain one nation, without slavery. The struggle for equal rights it began continued into the Civil Rights Movement of the 1900s — and shapes America still." },
    ],
    quiz: [
      { q: "The US Civil War was fought mainly over…", type: "mc", options: ["Tea taxes", "Slavery and keeping the country united", "Gold", "Religion"], answer: 1, explain: "Slavery and the Union's survival were the central issues.", hint: "One side's economy depended on enslaved labor." },
      { q: "Who was the US president during the Civil War?", type: "mc", options: ["George Washington", "Abraham Lincoln", "Simón Bolívar", "Thomas Edison"], answer: 1, explain: "Abraham Lincoln led the Union to victory." },
      { q: "Westward expansion pushed many Native American nations off their lands.", type: "tf", options: ["True", "False"], answer: 0, explain: "Expansion came at a painful cost to Native peoples." },
      { q: "When did slavery end in the United States?", type: "mc", options: ["1776", "1865", "1920", "1969"], answer: 1, explain: "Slavery was abolished in 1865, after the Civil War." },
      { q: "The transcontinental railroad (1869) let people cross the US in about…", type: "mc", options: ["A week", "Six months", "A year", "A day"], answer: 0, explain: "It cut a months-long wagon journey to about a week." },
    ],
  });

  lesson({
    id: "am6", continent: "americas", n: 6, minutes: 5, emoji: "🏭",
    title: "Industry & the Great Wave of Immigration",
    hook: "Between 1880 and 1920, tens of millions of people sailed to the Americas seeking a better life — building the most diverse nations on Earth.",
    beats: [
      { t: "lead", html: "As the Industrial Revolution reached the Americas, factories boomed and cities exploded. They needed workers — and the world answered." },
      { t: "p", html: "Tens of millions of <b>immigrants</b> came from Europe, Asia, and beyond, chasing jobs, freedom, and opportunity. In the US, many first glimpsed their new home as they passed the <b>Statue of Liberty</b> and arrived at Ellis Island." },
      { t: "scene", art: "factory", caption: "Booming factories drew immigrants to growing cities." },
      { t: "compare", title: "Why people came — and what they found",
        a: { title: "Reasons to leave home", items: ["Poverty or hunger", "Escaping war or unfair treatment", "Dreams of a better life"] },
        b: { title: "Life in the new world", items: ["Hard factory jobs, long hours", "Crowded city neighborhoods", "But: opportunity and freedom", "Building diverse, mixed communities"] } },
      { t: "p", html: "It wasn't always easy or fair — newcomers often faced prejudice and tough conditions. But over generations, this great mixing of peoples created incredibly diverse societies, especially in the United States, Canada, Brazil, and Argentina." },
      { t: "fact", html: "So many people passed through New York's <b>Ellis Island</b> that around <b>40% of Americans today</b> have an ancestor who arrived there." },
      { t: "modern", html: "The food, music, languages, and traditions of the Americas come from this incredible blend of peoples. The idea of nations built by immigrants is central to American identity." },
    ],
    quiz: [
      { q: "Between 1880 and 1920, what drew tens of millions of immigrants to the Americas?", type: "mc", options: ["Cold weather", "Jobs, freedom, and opportunity", "Free castles", "War"], answer: 1, explain: "Factory jobs and the hope of a better life pulled people in.", hint: "What were they hoping to find?" },
      { q: "Many immigrants to the US first arrived at…", type: "mc", options: ["Machu Picchu", "Ellis Island", "The Great Wall", "Tenochtitlan"], answer: 1, explain: "Ellis Island in New York processed millions of newcomers." },
      { q: "Immigrants were always welcomed warmly and treated fairly.", type: "tf", options: ["True", "False"], answer: 1, explain: "Many faced prejudice and hardship, even as they built new lives." },
      { q: "This great wave of immigration helped make nations of the Americas very…", type: "mc", options: ["empty", "diverse and mixed", "ancient", "small"], answer: 1, explain: "It created some of the most diverse societies on Earth." },
      { q: "The Statue of Liberty became a symbol of…", type: "mc", options: ["War", "Hope and welcome for newcomers", "Trade", "Royalty"], answer: 1, explain: "It welcomed immigrants arriving by sea to a new life." },
    ],
  });

  lesson({
    id: "am7", continent: "americas", n: 7, minutes: 5, emoji: "🚀",
    title: "Modern Americas: Superpower & Neighbors",
    hook: "In the 1900s, the United States became a global superpower — while all the nations of the Americas found their place in the modern world.",
    beats: [
      { t: "lead", html: "After helping win two world wars, the <b>United States</b> emerged as one of the world's two superpowers (alongside the USSR) and a leader in science, business, and culture." },
      { t: "p", html: "The US led in technology — from putting the first humans on the <b>Moon in 1969</b> to inventing much of the internet. American movies, music, and brands spread worldwide." },
      { t: "p", html: "Meanwhile, Latin American nations grew and changed too — some faced dictatorships and Cold War struggles, then moved toward democracy. <b>Brazil</b> and <b>Mexico</b> became major economies, and the region's culture — from soccer to salsa to carnival — delighted the world." },
      { t: "p", html: "The Americas also worked on big challenges together: trade agreements, protecting the <b>Amazon rainforest</b> (the “lungs of the planet”), and connecting cultures across borders." },
      { t: "fact", html: "The <b>Amazon rainforest</b>, mostly in Brazil, produces a huge share of Earth's oxygen and holds more kinds of plants and animals than almost anywhere else on the planet." },
      { t: "modern", html: "From Hollywood to the Amazon, from space rockets to soccer, the modern Americas shape global culture, technology, and the environment. Two continents, many nations, one connected story." },
    ],
    quiz: [
      { q: "After WWII, the United States became…", type: "mc", options: ["A small colony", "A global superpower", "Part of Europe", "An empire of kings"], answer: 1, explain: "The US emerged as one of two world superpowers.", hint: "Think about its size and influence after 1945." },
      { q: "The US landed the first humans on the Moon in…", type: "mc", options: ["1945", "1969", "1989", "2001"], answer: 1, explain: "Apollo 11 landed on the Moon in 1969." },
      { q: "The Amazon rainforest is important because it…", type: "mc", options: ["Produces lots of oxygen and holds amazing biodiversity", "Is made of gold", "Has no animals", "Is in Europe"], answer: 0, explain: "It's vital for oxygen and is incredibly biodiverse." },
      { q: "Latin American nations all stayed exactly the same in the 1900s.", type: "tf", options: ["True", "False"], answer: 1, explain: "They changed greatly — through struggles and toward democracy and growth." },
      { q: "Which two are major Latin American economies?", type: "mc", options: ["Brazil and Mexico", "Canada and Cuba", "Peru and Haiti", "Chile and Bolivia"], answer: 0, explain: "Brazil and Mexico are the region's largest economies." },
    ],
  });

  /* ============================================================
     MIDDLE EAST  (clean, neutral, evenhanded on sensitive topics)
     ============================================================ */
  cont({
    id: "mideast", name: "Middle East", emoji: "🕌", color: "#8e5a9e",
    blurb: "Where civilization began",
    intro: "The cradle of civilization — birthplace of writing, cities, and three of the world's great religions. A crossroads of continents, ideas, and history.",
    badge: { name: "Crossroads Scholar", emoji: "🕌" },
    lessons: ["me1", "me2", "me3", "me4", "me5", "me6"],
    sectionQuiz: [
      { q: "The “cradle of civilization,” where the first cities and writing appeared, was…", type: "mc", options: ["Mesopotamia", "Antarctica", "Australia", "Greenland"], answer: 0, explain: "Mesopotamia (modern Iraq) is where civilization first arose." },
      { q: "Three major world religions began in the Middle East:", type: "mc", options: ["Judaism, Christianity, and Islam", "Hinduism, Buddhism, and Shinto", "Only Islam", "None"], answer: 0, explain: "Judaism, Christianity, and Islam all began in this region." },
      { q: "During Europe's Middle Ages, Baghdad was a world center of…", type: "mc", options: ["Ice", "Learning, science, and books", "Car making", "Pyramids"], answer: 1, explain: "Baghdad's House of Wisdom led a golden age of learning." },
      { q: "The resource that made the modern Middle East globally important is…", type: "mc", options: ["Gold", "Oil", "Coal", "Diamonds"], answer: 1, explain: "Vast oil reserves made the region central to the world economy." },
      { q: "The first system of writing was called…", type: "mc", options: ["Cuneiform", "English", "Emoji", "Hieroglyphs"], answer: 0, explain: "Cuneiform, written on clay tablets, was among the first writing systems." },
      { q: "After WWI, the borders of many modern Middle Eastern countries were…", type: "mc", options: ["Ancient and unchanged", "Drawn largely by European powers", "Chosen by a vote", "Random"], answer: 1, explain: "European powers drew many borders after the Ottoman Empire fell." },
      { q: "The state of Israel was established in…", type: "mc", options: ["1776", "1948", "2001", "1900"], answer: 1, explain: "Israel was established in 1948; the region's disputes are complex and ongoing." },
      { q: "The wheel and the first written laws came from the ancient Middle East.", type: "tf", options: ["True", "False"], answer: 0, explain: "Both the wheel and early law codes (like Hammurabi's) originated here." },
      { q: "The Middle East is a crossroads connecting which continents?", type: "mc", options: ["Asia, Europe, and Africa", "Only Asia", "the Americas", "Antarctica and Australia"], answer: 0, explain: "It sits where three continents meet — a natural crossroads." },
      { q: "Why do many disagreements in the modern Middle East trace back to history?", type: "mc", options: ["They don't", "Borders, religions, and resources from the past still shape the region", "It was always peaceful", "Nobody lives there"], answer: 1, explain: "Old borders, faiths, and resources continue to shape the region." },
    ],
  });

  lesson({
    id: "me1", continent: "mideast", n: 1, minutes: 6, emoji: "📜",
    title: "The Cradle of Civilization",
    hook: "The first cities, the first writing, the first laws, the wheel — they were all born in one region over 5,000 years ago.",
    beats: [
      { t: "lead", html: "Between two rivers (the Tigris and Euphrates) lay <b>Mesopotamia</b> — meaning “land between rivers,” in what is now Iraq. Here, humans first built <b>cities</b>." },
      { t: "p", html: "The people called <b>Sumerians</b> invented <b>writing</b> around 3200 BC — a script called <b>cuneiform</b>, pressed into clay tablets. Writing let humans record laws, stories, and history for the first time. (That's how we even know about them!)" },
      { t: "scene", art: "scroll", caption: "Cuneiform, pressed into clay, was the world's first writing." },
      { t: "p", html: "They gave us astonishing firsts: the <b>wheel</b>, the plow, math based on 60 (that's why we have 60 minutes in an hour!), and the first written laws — the <b>Code of Hammurabi</b>. Later, the mighty <b>Persian Empire</b> built roads and a postal system across a huge realm." },
      { t: "hotmap", map: "mideast", title: "Where it all began", sub: "Tap to explore the cradle of civilization.",
        spots: [
          { x: 200, y: 130, label: "Mesopotamia", text: "Land between the Tigris and Euphrates rivers — home of the first cities." },
          { x: 150, y: 110, label: "Sumer", text: "Where writing (cuneiform) and the wheel were invented." },
          { x: 270, y: 120, label: "Persia", text: "A vast empire with great roads and an early postal system." },
        ] },
      { t: "fact", html: "Next time you check a clock, thank the ancient Mesopotamians — our 60-minute hour and 60-second minute come from their counting system based on 60!" },
      { t: "modern", html: "Cities, writing, written laws, the wheel, the way we measure time — the foundations of civilization itself were laid here. Everything else in this app builds on what started in the Middle East." },
    ],
    quiz: [
      { q: "“Mesopotamia” means…", type: "mc", options: ["Land of pyramids", "Land between rivers", "City of gold", "Land of snow"], answer: 1, explain: "It means “land between rivers” — the Tigris and Euphrates.", hint: "It's about two rivers." },
      { q: "The world's first writing system was called…", type: "mc", options: ["Cuneiform", "English", "Latin", "Braille"], answer: 0, explain: "Cuneiform was pressed into clay tablets around 3200 BC." },
      { q: "The wheel was invented in the ancient Middle East.", type: "tf", options: ["True", "False"], answer: 0, explain: "Yes — along with the plow, writing, and the first cities." },
      { q: "Why do we have 60 minutes in an hour?", type: "mc", options: ["From the Romans", "From the Mesopotamian counting system based on 60", "It's random", "From the Maya"], answer: 1, explain: "Their math used 60, shaping how we measure time." },
      { q: "The Code of Hammurabi was one of the first…", type: "mc", options: ["Maps", "Sets of written laws", "Songs", "Calendars"], answer: 1, explain: "It was among the earliest written law codes." },
    ],
  });

  lesson({
    id: "me2", continent: "mideast", n: 2, minutes: 6, emoji: "🕌",
    title: "Three Great Religions & a Golden Age",
    hook: "The Middle East gave the world three of its largest religions — and once led the entire planet in science and learning.",
    beats: [
      { t: "lead", html: "Three of the world's most followed religions — <b>Judaism, Christianity, and Islam</b> — all began in the Middle East. They share deep historical roots and some of the same early stories and prophets." },
      { t: "p", html: "<b>Judaism</b> is one of the oldest. <b>Christianity</b> began about 2,000 years ago with the teachings of Jesus. <b>Islam</b> began in the 600s AD with the Prophet Muhammad and spread rapidly across the region and beyond." },
      { t: "p", html: "The city of <b>Jerusalem</b> is holy to all three religions — one reason it has been so important (and so contested) throughout history." },
      { t: "scene", art: "scroll", caption: "Scholars in Baghdad preserved and advanced human knowledge." },
      { t: "p", html: "From the 700s–1200s, the Islamic world enjoyed a <b>Golden Age</b>. In <b>Baghdad's “House of Wisdom,”</b> scholars advanced algebra, astronomy, and medicine, and translated ancient Greek works — keeping knowledge alive that Europe had lost and later borrowed back." },
      { t: "fact", html: "Words like <b>algebra, algorithm, chemistry, and even “check” (as in chess and banking)</b> came into English from Arabic — a sign of how much the Islamic Golden Age shaped science and math." },
      { t: "modern", html: "Billions of people today follow religions that began here. And the math and science you learn — especially algebra — were preserved and advanced in this region's golden age." },
    ],
    quiz: [
      { q: "Which three major religions began in the Middle East?", type: "mc", options: ["Judaism, Christianity, and Islam", "Hinduism, Buddhism, and Shinto", "Only Christianity", "None of these"], answer: 0, explain: "All three began in this region and share historical roots.", hint: "They share some of the same early stories." },
      { q: "The city holy to all three religions is…", type: "mc", options: ["Cairo", "Jerusalem", "Athens", "Rome"], answer: 1, explain: "Jerusalem is sacred to Judaism, Christianity, and Islam." },
      { q: "During Europe's Middle Ages, the Islamic world was a backwater with no learning.", type: "tf", options: ["True", "False"], answer: 1, explain: "The opposite — it was the world's leading center of science and learning." },
      { q: "Baghdad's famous center of learning was called the…", type: "mc", options: ["House of Wisdom", "Colosseum", "Parthenon", "House of Cards"], answer: 0, explain: "The House of Wisdom led the Islamic Golden Age." },
      { q: "Which subject's name came to English from Arabic?", type: "mc", options: ["Algebra", "Geography", "History", "Poetry"], answer: 0, explain: "Algebra (and algorithm, chemistry) came from Arabic." },
    ],
  });

  lesson({
    id: "me3", continent: "mideast", n: 3, minutes: 5, emoji: "🏛️",
    title: "The Ottoman Decline & European Interest",
    hook: "For centuries the Ottoman Empire ruled the Middle East. As it weakened, European powers moved in — setting the stage for the modern map.",
    beats: [
      { t: "lead", html: "You met the Ottoman Empire in the Asia section. For about 600 years it ruled most of the Middle East, North Africa, and southeastern Europe — a true superpower." },
      { t: "p", html: "By the 1800s, the empire was struggling to keep up with industrializing Europe. Some called it “the sick man of Europe.” European powers — especially Britain and France — grew interested in the region's strategic location and trade routes." },
      { t: "p", html: "A huge moment came in <b>1869</b>: the <b>Suez Canal</b> opened in Egypt, connecting the Mediterranean and Red Seas. Suddenly ships could sail between Europe and Asia without going all the way around Africa — making the region incredibly important." },
      { t: "scene", art: "ship", caption: "The Suez Canal made the Middle East a vital global crossroads." },
      { t: "p", html: "When the Ottomans joined the losing side in <b>World War I</b>, their empire collapsed. The victorious European powers would help redraw the entire map of the Middle East — which is our next lesson." },
      { t: "fact", html: "The Suez Canal is still one of the world's most important waterways — about <b>12% of all global trade</b> passes through it. When a giant ship got stuck there in 2021, it jammed world trade for days!" },
      { t: "modern", html: "Control of key waterways and trade routes still makes the Middle East globally important today. The Suez Canal you might see in the news is the same one opened in 1869." },
    ],
    quiz: [
      { q: "For about how long did the Ottoman Empire rule much of the Middle East?", type: "mc", options: ["50 years", "About 600 years", "10 years", "2,000 years"], answer: 1, explain: "The Ottoman Empire lasted roughly 600 years.", hint: "Centuries, not decades." },
      { q: "The Suez Canal (opened 1869) connects the…", type: "mc", options: ["Atlantic and Pacific", "Mediterranean and Red Seas", "Black Sea and Baltic", "Two lakes"], answer: 1, explain: "It links the Mediterranean and Red Seas, shortcutting around Africa." },
      { q: "As the Ottoman Empire weakened, European powers grew interested in the region.", type: "tf", options: ["True", "False"], answer: 0, explain: "Britain and France especially eyed its location and trade routes." },
      { q: "The Ottoman Empire collapsed after losing in…", type: "mc", options: ["World War I", "the Cold War", "the US Civil War", "the Renaissance"], answer: 0, explain: "Joining the losing side in WWI led to its collapse." },
      { q: "Why is the Suez Canal still important today?", type: "mc", options: ["It's pretty", "About 12% of global trade passes through it", "It makes oil", "It's the longest river"], answer: 1, explain: "It's a vital shortcut for world shipping." },
    ],
  });

  lesson({
    id: "me4", continent: "mideast", n: 4, minutes: 5, emoji: "🗺️",
    title: "Drawing the Modern Middle East",
    hook: "After WWI, the modern map of the Middle East was drawn — often by outsiders. Those decisions still echo today.",
    beats: [
      { t: "lead", html: "When the Ottoman Empire fell after WWI, its vast lands were up for grabs. The victorious powers, mainly <b>Britain and France</b>, divided the region into new territories." },
      { t: "p", html: "They drew borders that created many of today's countries — like <b>Iraq, Syria, Jordan, and Lebanon</b>. As in Africa, these borders were sometimes straight lines that didn't match where different communities actually lived." },
      { t: "p", html: "Over the following decades, these territories became independent nations. Some became kingdoms, others republics, each finding its own path. The region's mix of peoples, religions, and brand-new borders made for a complicated start." },
      { t: "compare", title: "Old empire vs. new map",
        a: { title: "Before WWI", items: ["One big Ottoman Empire", "Ruled from Istanbul", "Few internal borders"] },
        b: { title: "After WWI", items: ["Many separate territories", "Borders drawn by outsiders", "New nations like Iraq, Syria, Jordan", "A patchwork of peoples and faiths"] } },
      { t: "fact", html: "Some Middle Eastern countries are younger than your great-grandparents — created in the 1900s from the pieces of the Ottoman Empire." },
      { t: "modern", html: "Many of the region's modern challenges — and its borders — trace directly back to decisions made after WWI. History helps explain today's headlines." },
    ],
    quiz: [
      { q: "After WWI, who mainly drew the new borders of the Middle East?", type: "mc", options: ["The United Nations", "Britain and France", "the Ottomans", "the United States"], answer: 1, explain: "Britain and France divided the former Ottoman lands.", hint: "Two European powers that won WWI." },
      { q: "Which of these countries was created from former Ottoman lands?", type: "mc", options: ["Iraq", "Japan", "Brazil", "Canada"], answer: 0, explain: "Iraq, Syria, Jordan, and Lebanon were among the new territories." },
      { q: "The new borders perfectly matched where every community lived.", type: "tf", options: ["True", "False"], answer: 1, explain: "Like in Africa, borders often ignored real communities." },
      { q: "Many modern Middle Eastern countries were created in the…", type: "mc", options: ["ancient past", "1900s", "year 2020", "Middle Ages"], answer: 1, explain: "They emerged in the 1900s after the Ottoman collapse." },
      { q: "Understanding these post-WWI decisions helps explain…", type: "mc", options: ["Nothing", "Many of the region's modern borders and challenges", "Ancient Egypt", "the Cold War only"], answer: 1, explain: "Today's map and many tensions trace back to that era." },
    ],
  });

  lesson({
    id: "me5", continent: "mideast", n: 5, minutes: 6, emoji: "🛢️",
    title: "Oil & a Region at the Center of the World",
    hook: "In the 1900s, the world discovered that beneath the Middle East lay a treasure that would power the modern age: oil.",
    beats: [
      { t: "lead", html: "In the early 1900s, huge reserves of <b>oil</b> were discovered under the Middle East. As cars, planes, and factories ran on oil, this made the region one of the most important places on Earth." },
      { t: "p", html: "Countries like <b>Saudi Arabia, Iran, Iraq, and Kuwait</b> sat on enormous oil supplies. Selling oil brought great wealth and transformed some nations from desert kingdoms into modern, gleaming cities almost overnight." },
      { t: "scene", art: "oil", caption: "Oil turned parts of the Middle East into global economic powers." },
      { t: "p", html: "Because the whole world depends on oil, the Middle East became a focus of global attention — and sometimes of competition and conflict between powerful nations wanting to secure it." },
      { t: "p", html: "The region is also home to long-running disagreements, including over the land where the state of <b>Israel</b> was established in <b>1948</b>, near its neighbors. These are sensitive topics that thoughtful people see very differently — and they remain unresolved today. The kind thing is to learn the facts, listen to all sides, and treat everyone's history with respect." },
      { t: "fact", html: "Dubai, in the United Arab Emirates, used its oil wealth to build the world's <b>tallest building</b> (the Burj Khalifa) and grew from a small trading town into a futuristic city in just a few decades." },
      { t: "modern", html: "Every time a car fills up or a plane takes off, it connects to the Middle East's oil. The region's resources, location, and disagreements keep it at the center of world affairs — which is why it's so often in the news." },
    ],
    quiz: [
      { q: "What resource made the Middle East globally important in the 1900s?", type: "mc", options: ["Gold", "Oil", "Ice", "Silk"], answer: 1, explain: "Vast oil reserves powered the modern world and brought wealth.", hint: "It powers cars and planes." },
      { q: "Which country sits on enormous oil reserves?", type: "mc", options: ["Saudi Arabia", "Switzerland", "Iceland", "Nepal"], answer: 0, explain: "Saudi Arabia is one of the world's largest oil producers." },
      { q: "The state of Israel was established in…", type: "mc", options: ["1776", "1948", "2000", "1900"], answer: 1, explain: "Israel was established in 1948; the region's disputes remain complex." },
      { q: "The best way to think about the region's disagreements is to…", type: "mc", options: ["Pick a side quickly", "Learn the facts and respect all sides", "Ignore them", "Assume one side is all wrong"], answer: 1, explain: "Thoughtful people differ; learning and respect matter most." },
      { q: "Oil wealth helped transform some desert towns into modern cities very quickly.", type: "tf", options: ["True", "False"], answer: 0, explain: "Cities like Dubai grew remarkably fast thanks to oil wealth." },
    ],
  });

  lesson({
    id: "me6", continent: "mideast", n: 6, minutes: 5, emoji: "🌆",
    title: "The Modern Middle East: Challenge & Change",
    hook: "Today's Middle East mixes ancient history with cutting-edge cities, deep challenges with big dreams for the future.",
    beats: [
      { t: "lead", html: "The modern Middle East is a region of contrasts: thousands of years of history alongside some of the world's newest, most futuristic cities." },
      { t: "p", html: "There are real challenges — some areas have faced conflict, and many countries are working to build stable governments and good lives for young people. The region has a very <b>young population</b>, full of energy and ambition." },
      { t: "p", html: "There's also exciting change. Countries are investing beyond oil — in tourism, technology, sports, and renewable energy. <b>Qatar</b> hosted the soccer World Cup in 2022; the <b>UAE</b> sent a spacecraft to Mars; cities like Dubai and Riyadh are global business hubs." },
      { t: "scene", art: "globe", caption: "The Middle East blends ancient roots with a fast-changing future." },
      { t: "fact", html: "The <b>United Arab Emirates' “Hope” probe</b> reached Mars in 2021, making it one of only a handful of nations or groups ever to successfully send a mission to the Red Planet." },
      { t: "modern", html: "From the cradle of civilization to missions to Mars, the Middle East's story spans all of human history — and it's still being written by its young, ambitious people. Watching the news here means watching history happen." },
    ],
    quiz: [
      { q: "The modern Middle East is best described as a region of…", type: "mc", options: ["Only ancient ruins", "Contrasts — ancient history and futuristic cities", "No people", "Only deserts"], answer: 1, explain: "It blends deep history with very modern development.", hint: "Think old AND new at once." },
      { q: "Besides oil, Middle Eastern countries are now investing in…", type: "mc", options: ["Tourism, technology, sports, and clean energy", "Nothing new", "Only farming", "Castles"], answer: 0, explain: "They're diversifying into many modern industries." },
      { q: "Which country sent the “Hope” probe to Mars in 2021?", type: "mc", options: ["The United Arab Emirates", "Egypt", "Greece", "Brazil"], answer: 0, explain: "The UAE's Hope probe reached Mars in 2021." },
      { q: "The Middle East has a very young population.", type: "tf", options: ["True", "False"], answer: 0, explain: "Like Africa, much of the region's population is young." },
      { q: "Qatar made headlines in 2022 by hosting…", type: "mc", options: ["The Olympics", "The soccer World Cup", "The Moon landing", "A Renaissance"], answer: 1, explain: "Qatar hosted the FIFA World Cup in 2022." },
    ],
  });

  /* ============================================================
     OCEANIA & PACIFIC
     ============================================================ */
  cont({
    id: "oceania", name: "Oceania & Pacific", emoji: "🏝️", color: "#1597a5",
    blurb: "Ancient voyagers & island worlds",
    intro: "The world's smallest continent and its largest ocean — home to history's greatest sea-voyagers, ancient living cultures, and thousands of islands.",
    badge: { name: "Pacific Voyager", emoji: "🏝️" },
    lessons: ["oc1", "oc2", "oc3", "oc4"],
    sectionQuiz: [
      { q: "Aboriginal Australians have one of the world's…", type: "mc", options: ["Newest cultures", "Oldest continuous living cultures", "Smallest", "Only written cultures"], answer: 1, explain: "Aboriginal cultures stretch back over 60,000 years." },
      { q: "Pacific Islanders navigated vast oceans using…", type: "mc", options: ["GPS", "Stars, waves, and birds", "Engines", "Maps from Europe"], answer: 1, explain: "They were master navigators using nature itself." },
      { q: "Which European explorer mapped much of the Pacific and eastern Australia in the 1700s?", type: "mc", options: ["Captain James Cook", "Christopher Columbus", "Marco Polo", "Magellan"], answer: 0, explain: "Captain Cook charted much of the region in the 1700s." },
      { q: "The Indigenous people of New Zealand are the…", type: "mc", options: ["Maori", "Inca", "Zulu", "Inuit"], answer: 0, explain: "The Maori are New Zealand's Indigenous people." },
      { q: "The Pacific Ocean is the world's largest ocean.", type: "tf", options: ["True", "False"], answer: 0, explain: "It's the biggest ocean — bigger than all the land on Earth combined." },
      { q: "During WWII, the Pacific islands were…", type: "mc", options: ["Untouched by the war", "the site of major battles between Japan and the Allies", "where the war began in Europe", "a peaceful resort"], answer: 1, explain: "Fierce island-hopping battles were fought across the Pacific." },
      { q: "Australia and New Zealand were colonized mainly by…", type: "mc", options: ["Britain", "Spain", "France", "China"], answer: 0, explain: "Both became British colonies, then independent nations." },
      { q: "A big challenge facing low-lying Pacific islands today is…", type: "mc", options: ["Too much snow", "Rising seas from climate change", "Volcanoes only", "Too many cars"], answer: 1, explain: "Rising sea levels threaten low islands — a major climate concern." },
      { q: "Pacific peoples settled thousands of islands across an enormous ocean.", type: "tf", options: ["True", "False"], answer: 0, explain: "Their voyaging settled islands across a third of the planet's surface." },
      { q: "Why are Pacific Islanders called some of history's greatest explorers?", type: "mc", options: ["They had the best ships from Europe", "They crossed vast open oceans using only nature to navigate", "They never left home", "They used satellites"], answer: 1, explain: "They mastered the open ocean long before compasses or maps." },
    ],
  });

  lesson({
    id: "oc1", continent: "oceania", n: 1, minutes: 5, emoji: "🪃",
    title: "Ancient Cultures & Master Voyagers",
    hook: "The first people reached Australia over 60,000 years ago — and later, fearless sailors settled thousands of islands across the world's biggest ocean.",
    beats: [
      { t: "lead", html: "<b>Aboriginal Australians</b> have one of the <b>oldest continuous living cultures on Earth</b> — going back more than 60,000 years. They passed down knowledge, law, and stories through art, song, and “Dreamtime” tales." },
      { t: "scene", art: "boomerang", caption: "The boomerang is one of humanity's oldest tools — and it still works!" },
      { t: "p", html: "Across the vast Pacific, the <b>Polynesians</b> were perhaps history's greatest explorers. In wooden canoes, with no compasses or maps, they crossed thousands of miles of open ocean to settle islands from Hawaii to New Zealand to Easter Island." },
      { t: "p", html: "How? They read the <b>stars, ocean waves, winds, cloud patterns, and the flight of birds</b> like a living map. This skill, called <b>wayfinding</b>, took a lifetime to master and is being kept alive today." },
      { t: "hotmap", map: "oceania", title: "A world of islands", sub: "Tap to explore the Pacific.",
        spots: [
          { x: 200, y: 130, label: "Australia", text: "Home to Aboriginal peoples for over 60,000 years." },
          { x: 300, y: 70, label: "Polynesia", text: "Voyagers settled islands from Hawaii to Easter Island by reading the stars." },
          { x: 90, y: 170, label: "Open Pacific", text: "The world's largest ocean — bigger than all of Earth's land combined." },
        ] },
      { t: "fact", html: "The Pacific Ocean is so huge it covers about <b>a third of the entire planet</b> — you could fit all the continents inside it with room to spare." },
      { t: "modern", html: "These ancient cultures are very much alive today. Modern navigators have revived traditional wayfinding, sailing the Pacific the old way to honor and preserve this incredible knowledge." },
    ],
    quiz: [
      { q: "Aboriginal Australians have one of the world's…", type: "mc", options: ["newest cultures", "oldest continuous living cultures", "smallest populations ever", "only written cultures"], answer: 1, explain: "Their culture goes back more than 60,000 years.", hint: "Think very, very old." },
      { q: "Polynesian voyagers crossed the Pacific using…", type: "mc", options: ["GPS and engines", "stars, waves, winds, and birds", "European maps", "luck alone"], answer: 1, explain: "They read nature itself — a skill called wayfinding." },
      { q: "The skill of navigating by nature is called…", type: "mc", options: ["wayfinding", "farming", "weaving", "mining"], answer: 0, explain: "Wayfinding used stars, waves, and birds as a living map." },
      { q: "The Pacific is the world's largest ocean.", type: "tf", options: ["True", "False"], answer: 0, explain: "It covers about a third of the whole planet." },
      { q: "Polynesians settled islands as far apart as…", type: "mc", options: ["Hawaii and New Zealand", "Spain and Italy", "Egypt and Greece", "two nearby islands only"], answer: 0, explain: "Their voyages spanned an enormous triangle of the Pacific." },
    ],
  });

  lesson({
    id: "oc2", continent: "oceania", n: 2, minutes: 5, emoji: "⛵",
    title: "European Explorers Reach the Pacific",
    hook: "To Europeans, the Pacific was the last great unknown. In the 1700s, explorers mapped it — changing the islands forever.",
    beats: [
      { t: "lead", html: "For a long time, Europeans imagined a giant unknown “southern land.” In the 1700s, they finally explored the Pacific in detail." },
      { t: "p", html: "The most famous explorer was Britain's <b>Captain James Cook</b>. On three voyages, he mapped New Zealand, the eastern coast of Australia, and many Pacific islands with remarkable accuracy — and brought back amazing reports of the peoples and nature he met." },
      { t: "scene", art: "ship", caption: "European ships charted the Pacific's islands in the 1700s." },
      { t: "p", html: "Contact had big consequences. As elsewhere, European diseases harmed Indigenous peoples who had no immunity. New plants, animals, and tools arrived — and so did European settlers who would soon claim these lands." },
      { t: "p", html: "Cook's maps opened the door for Britain to establish colonies — beginning with Australia in <b>1788</b>. The islands' long isolation was over." },
      { t: "fact", html: "Captain Cook's crew were among the first Europeans to see a <b>kangaroo</b>. When they asked what it was, the answer became the animal's English name!" },
      { t: "modern", html: "Cook's voyages connected the Pacific to the wider world — bringing both new opportunities and serious hardships for Indigenous peoples, whose lands were soon settled by newcomers." },
    ],
    quiz: [
      { q: "Which explorer mapped much of the Pacific and eastern Australia in the 1700s?", type: "mc", options: ["Captain James Cook", "Columbus", "Marco Polo", "Magellan"], answer: 0, explain: "Captain Cook charted the region on three voyages.", hint: "He shares his name with a cooking word." },
      { q: "European contact brought diseases that harmed Indigenous peoples.", type: "tf", options: ["True", "False"], answer: 0, explain: "As elsewhere, new diseases were devastating." },
      { q: "Britain began colonizing Australia in…", type: "mc", options: ["1492", "1788", "1900", "1945"], answer: 1, explain: "The first British colony in Australia began in 1788." },
      { q: "Before European mapping, the Pacific was, to Europeans, mostly…", type: "mc", options: ["fully known", "a great unknown", "part of Europe", "empty of people"], answer: 1, explain: "It was the last great region Europeans charted — though islanders knew it well." },
      { q: "Cook's voyages opened the door for Europeans to…", type: "mc", options: ["establish colonies", "leave forever", "build pyramids", "start the Renaissance"], answer: 0, explain: "His maps led to British colonies in the region." },
    ],
  });

  lesson({
    id: "oc3", continent: "oceania", n: 3, minutes: 5, emoji: "🇦🇺",
    title: "Australia & New Zealand Grow Up",
    hook: "Two British colonies on the far side of the world grew into prosperous, modern nations — while learning to honor the peoples who were there first.",
    beats: [
      { t: "lead", html: "<b>Australia</b> and <b>New Zealand</b> began as British colonies but developed their own identities, economies, and democracies, eventually becoming fully independent nations." },
      { t: "p", html: "In New Zealand, the British and the Indigenous <b>Maori</b> signed the <b>Treaty of Waitangi</b> in 1840 — an important (though disputed) agreement that still shapes the country. New Zealand also became one of the first places in the world where <b>women won the right to vote</b>, in 1893!" },
      { t: "p", html: "Both nations grew wealthy through farming (lots of sheep and cattle!), mining, and later technology and tourism. They built strong democracies and high standards of living." },
      { t: "scene", art: "star", caption: "Australia and New Zealand became prosperous Pacific democracies." },
      { t: "p", html: "Importantly, both countries have worked to recognize past wrongs against Indigenous peoples and to celebrate their cultures. Maori language and traditions, and Aboriginal art and heritage, are increasingly honored as national treasures." },
      { t: "fact", html: "Before a game, New Zealand's famous rugby team, the <b>All Blacks</b>, performs the <b>haka</b> — a powerful Maori ceremonial dance — sharing Indigenous culture with the whole world." },
      { t: "modern", html: "Australia and New Zealand show how nations can grow prosperous while working to respect and include the peoples who lived there first — an ongoing journey of reconciliation." },
    ],
    quiz: [
      { q: "Australia and New Zealand began as colonies of…", type: "mc", options: ["Britain", "Spain", "France", "Japan"], answer: 0, explain: "Both were British colonies before becoming independent nations.", hint: "The same country that colonized India." },
      { q: "The Indigenous people of New Zealand are the…", type: "mc", options: ["Maori", "Aboriginal Australians", "Inca", "Inuit"], answer: 0, explain: "The Maori are New Zealand's Indigenous people." },
      { q: "New Zealand was one of the first countries where women won the right to vote.", type: "tf", options: ["True", "False"], answer: 0, explain: "Women gained the vote there in 1893 — among the world's first." },
      { q: "Both nations grew wealthy partly through…", type: "mc", options: ["farming, mining, and tourism", "pyramids", "oil only", "the Silk Road"], answer: 0, explain: "Farming, mining, technology, and tourism built their economies." },
      { q: "The haka performed by the All Blacks is a…", type: "mc", options: ["Maori ceremonial dance", "type of food", "European song", "board game"], answer: 0, explain: "The haka is a powerful Maori dance shared with the world." },
    ],
  });

  lesson({
    id: "oc4", continent: "oceania", n: 4, minutes: 5, emoji: "🌊",
    title: "The Pacific in WWII & Today",
    hook: "During WWII, the peaceful Pacific became a vast battlefield. Today, its islands face a new challenge: the rising sea itself.",
    beats: [
      { t: "lead", html: "When WWII spread to the Pacific, the ocean's islands became crucial. Japan and the Allies (led by the United States) fought enormous battles across the sea in a strategy called <b>“island-hopping.”</b>" },
      { t: "p", html: "Famous, hard-fought battles took place at places like <b>Midway</b> and <b>Guadalcanal</b>. Control of tiny islands meant control of airfields and supply routes across the world's largest ocean. The Pacific war ended in 1945." },
      { t: "p", html: "After the war, Pacific island nations gradually became independent — small countries with big ocean territories, like Fiji, Samoa, and Tonga, each with proud cultures." },
      { t: "scene", art: "globe", caption: "Today, Pacific nations lead the world in raising the alarm about climate change." },
      { t: "p", html: "Today the biggest threat isn't war but <b>climate change</b>. Many Pacific islands are low and flat, and <b>rising seas</b> endanger homes and even whole nations. Pacific leaders have become some of the world's strongest voices urging everyone to protect the planet." },
      { t: "fact", html: "The low-lying nation of <b>Tuvalu</b> is so threatened by rising seas that it began creating a “digital version” of itself online — to preserve its culture and history no matter what happens to the land." },
      { t: "modern", html: "From the battles of WWII to the front line of climate change, the Pacific reminds us that even the most remote places are deeply connected to the whole world's choices — including ours." },
    ],
    quiz: [
      { q: "The WWII strategy of capturing key Pacific islands one by one was called…", type: "mc", options: ["island-hopping", "trench warfare", "the Silk Road", "wayfinding"], answer: 0, explain: "“Island-hopping” captured strategic islands across the Pacific.", hint: "It involves moving from island to island." },
      { q: "Who fought the major battles in the Pacific during WWII?", type: "mc", options: ["Japan and the Allies (led by the US)", "Rome and Greece", "Britain and France only", "no one"], answer: 0, explain: "Japan and the Allies fought across the Pacific." },
      { q: "The biggest threat to many Pacific islands today is…", type: "mc", options: ["rising seas from climate change", "too much snow", "volcanoes only", "traffic"], answer: 0, explain: "Low islands are endangered by rising sea levels." },
      { q: "Pacific island nations have been quiet and silent about climate change.", type: "tf", options: ["True", "False"], answer: 1, explain: "They're among the world's loudest voices urging climate action." },
      { q: "Pacific island nations like Fiji and Samoa are…", type: "mc", options: ["small countries with large ocean territories", "huge land empires", "uninhabited", "part of Europe"], answer: 0, explain: "They're small in land but rich in ocean and culture." },
    ],
  });

  /* ============================================================
     COMPETITION-PREP LAYER  (added 2026-06-13)
     "Mix it up" toward World Scholar's Cup (debate / breadth) and the
     International Geography Bee (places, flags, physical geography).
     Optional + effort-framed — never a peer leaderboard.
     ============================================================ */

  /* WSC-style "Big Question" per continent — argue BOTH sides (Team-Debate flavor). */
  C.bigQuestions = {
    europe: { q: "Did the Industrial Revolution do more good or more harm?",
      a: "More good: it lifted living standards, sparked medicine and technology, and connected the world like never before.",
      b: "More harm: early factories meant child labor and harsh conditions, plus pollution and the roots of today's climate change." },
    asia: { q: "Is it better for a country to open up to the world, or to protect its own traditions?",
      a: "Open up: trade and new ideas brought huge growth — think Japan's Meiji era and the Asian Tigers.",
      b: "Protect traditions: staying true to your culture guards identity and avoids being exploited by outsiders." },
    africa: { q: "Should countries keep borders that were drawn long ago, even when they don't fit the people?",
      a: "Keep them: redrawing borders could spark new conflicts, and the world already recognizes these nations.",
      b: "Redraw them: borders should match where communities actually live — fairness matters more than old maps." },
    americas: { q: "When two cultures meet, is it more an exchange or more a loss?",
      a: "Exchange: foods, ideas, and people blended to create rich, diverse nations across the Americas.",
      b: "Loss: meeting often meant conquest, disease, and the displacement of Indigenous peoples." },
    mideast: { q: "Is being rich in a resource like oil a blessing, or a mixed blessing?",
      a: "A blessing: oil wealth built modern cities, schools, and even space programs in just decades.",
      b: "Mixed: it can create dependence on one resource and draw outside competition and conflict." },
    oceania: { q: "Who should lead on protecting the planet — the biggest countries, or the small ones most affected?",
      a: "Big countries: they have the most resources, the most emissions, and the most power to change things.",
      b: "Small nations: those most at risk (like Pacific islands) have the clearest moral voice to demand action." },
  };

  /* Physical-geography question pool for the Geography Drill (IGB flavor). */
  C.geoFacts = [
    { q: "Which is the largest <b>hot</b> desert in the world?", options: ["The Sahara", "The Gobi", "The Arabian Desert", "The Kalahari"], answer: 0, explain: "The Sahara, in North Africa, is the largest hot desert. (Antarctica is the largest desert overall — a cold one!)" },
    { q: "What is the tallest mountain above sea level?", options: ["K2", "Mount Everest", "Kilimanjaro", "Denali"], answer: 1, explain: "Mount Everest, in the Himalayas, reaches about 8,849 m (29,032 ft)." },
    { q: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2, explain: "The Pacific is the largest — bigger than all of Earth's land combined." },
    { q: "Which is the largest continent?", options: ["Africa", "Asia", "North America", "Europe"], answer: 1, explain: "Asia is the largest continent by both area and population." },
    { q: "Which continent is also a single country?", options: ["Antarctica", "Australia", "Europe", "Africa"], answer: 1, explain: "Australia is the only country that is also a whole continent." },
    { q: "What is the largest country in the world by area?", options: ["Canada", "China", "Russia", "USA"], answer: 2, explain: "Russia is by far the largest, spanning 11 time zones." },
    { q: "Which is the largest rainforest on Earth?", options: ["The Congo", "The Amazon", "The Daintree", "Borneo's"], answer: 1, explain: "The Amazon, mostly in Brazil, is the world's largest rainforest." },
    { q: "Which is the world's largest island?", options: ["Madagascar", "Greenland", "New Guinea", "Borneo"], answer: 1, explain: "Greenland is the largest island (Australia counts as a continent, not an island)." },
    { q: "The imaginary line dividing Earth into the Northern and Southern Hemispheres is the…", options: ["Prime Meridian", "Equator", "Tropic of Cancer", "Arctic Circle"], answer: 1, explain: "The Equator is at 0° latitude, halfway between the poles." },
    { q: "Which is the longest mountain range on land?", options: ["The Himalayas", "The Rockies", "The Andes", "The Alps"], answer: 2, explain: "The Andes run about 7,000 km down the western edge of South America." },
    { q: "By volume of water, the largest river in the world is the…", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: 1, explain: "The Amazon carries the most water by far; the Nile is often called the longest." },
    { q: "Which is the world's largest lake (by area)?", options: ["Lake Superior", "Lake Victoria", "The Caspian Sea", "Lake Baikal"], answer: 2, explain: "The Caspian Sea is technically the world's largest lake. (Baikal is the deepest.)" },
    { q: "Which two continents does the Suez Canal sit between?", options: ["Africa & Asia", "Europe & Asia", "Asia & Australia", "Europe & Africa"], answer: 0, explain: "The Suez Canal, in Egypt, links the Mediterranean and Red Seas between Africa and Asia." },
    { q: "Roughly what fraction of Earth's surface is covered by water?", options: ["About one quarter", "About half", "About 70%", "About 90%"], answer: 2, explain: "Water covers about 71% of Earth's surface." },
  ];

})(WA.CONTENT);
