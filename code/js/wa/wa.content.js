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
      { t: "lead", html: "Ancient Greece wasn't a single country with one ruler and one flag. It was a scattered world of hundreds of independent <b>city-states</b> — called a <i>polis</i> each — strung across rocky peninsulas and islands. Mountains and seas kept them apart, so each city-state grew up fiercely proud and stubbornly independent, often trading with its neighbors one year and going to war with them the next." },
      { t: "p", html: "The most famous of these was <b>Athens</b>. Around 508 BC, after years of being ruled by powerful individuals, Athens tried something almost nobody had attempted before: it built the first known <b>democracy</b> — a word stitched together from the Greek <i>demos</i> (people) and <i>kratos</i> (power), meaning <i>“rule by the people.”</i> Instead of a king deciding everything, citizens climbed a hill called the Pnyx, listened to speeches, and then voted directly on laws, taxes, and whether to go to war." },
      { t: "p", html: "Why did this happen in Athens and not somewhere else? Partly because Athens was a busy trading port full of merchants, sailors, and craftsmen who were used to arguing, bargaining, and thinking for themselves. Because so many ordinary people already had a voice in the marketplace, it felt natural to give them a voice in government too." },
      { t: "scene", art: "columns", caption: "Greek temples like the Parthenon still stand in Athens today." },
      { t: "p", html: "It was far from perfect. Only free adult men who were citizens could vote — women, enslaved people, and foreigners who had moved there were all shut out. By that measure, only a small slice of the people actually held power. But the <b>idea</b> underneath it — that a government should answer to its people, and that ordinary citizens were fit to make big decisions — was genuinely revolutionary. Once that idea existed in the world, it never truly disappeared, even when kings and emperors tried to bury it for centuries afterward." },
      { t: "fact", html: "Greeks also gave us the <b>Olympic Games</b>, geometry (thanks, Pythagoras), theatre, and philosophers like <b>Socrates, Plato, and Aristotle</b> who asked, “How should we live?”" },
      { t: "guide", html: "Owl tip: notice how many everyday words trace back to Greece — <i>geography, telephone, photograph, hippopotamus</i>. Spotting Greek roots in a word is like finding an ancient fingerprint hidden in plain sight." },
      { t: "fact", html: "Athenians sometimes voted to <b>banish</b> a person they thought was getting too dangerous — for ten years! They scratched the name onto broken pottery called an <i>ostrakon</i>, which is exactly where we get the word <b>ostracize</b>." },
      { t: "scenario", title: "You're a citizen of Athens", prompt: "The assembly is voting on whether to go to war with a neighboring city. There's no TV, no internet — just speeches. What do you trust most?",
        opts: [
          { label: "The most powerful speaker", tag: "Watch out", outcome: "Athens learned that great speakers (called <i>demagogues</i>) could sway crowds into bad decisions. Persuasion isn't the same as being right." },
          { label: "Evidence and past results", tag: "Wise", outcome: "Weighing real evidence is exactly the skill democracy needs — and it's still hard today!" },
          { label: "Whatever my friends pick", tag: "Common", outcome: "Going with the crowd is human, but it's how mistakes spread. Democracy works best when people think for themselves." },
        ] },
      { t: "modern", html: "Every time a country holds an election — anywhere on Earth — it is using an idea that Athens tested first roughly 2,500 years ago. The very words <b>democracy, politics, and citizen</b> all come straight from ancient Greek, and so do the deeper questions democracy still wrestles with: who counts as a citizen, how do we keep powerful speakers honest, and how do we make decisions together without splitting apart? Athens didn't answer all of those perfectly, but it was brave enough to ask them out loud, and the world has been working on them ever since." },
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
      { t: "lead", html: "How does a single city on the banks of one Italian river end up ruling from the cold coasts of Britain to the deserts of the Middle East? The Roman answer was a powerful combination: disciplined armies, an enormous network of roads, a shared system of law — and a clever knack for absorbing the very people they conquered, turning former enemies into Roman citizens, soldiers, and taxpayers rather than crushing them entirely." },
      { t: "p", html: "Rome reinvented itself several times. It began as a <b>kingdom</b> ruled by kings, then — after throwing those kings out — became a <b>republic</b> governed by elected senators who shared power so that no single man could seize it all. Finally, after a long stretch of civil wars, it became an <b>empire</b> ruled by emperors, starting with <b>Augustus</b> in 27 BC. At its height, you could travel thousands of miles, cross dozens of modern countries, and still be “in Rome,” using Roman coins and reading Roman signs the whole way." },
      { t: "scene", art: "colosseum", caption: "The Colosseum held 50,000 people for games and spectacles." },
      { t: "p", html: "The Romans were master <b>engineers</b>, and engineering was a kind of glue holding the empire together. They built famously straight roads — so well made that some are still walked on today — along with <b>aqueducts</b> that carried fresh water across valleys and mountains for dozens of miles, and they perfected a recipe for <b>concrete</b> so durable that modern scientists still study it. Because their armies could march quickly on those roads and cities could be supplied with clean water, the empire stayed connected and healthy enough to keep growing." },
      { t: "p", html: "Just as important as the roads was Roman <b>law</b>. The Romans wrote rules down, applied them across the whole empire, and developed ideas we still rely on — like the notion that an accused person should be considered innocent until proven guilty. Many of their inventions, from courts and the Senate to the structure of our calendar, quietly shape daily life even now." },
      { t: "order", title: "Order Rome's story", sub: "Drag these into order, earliest to latest.",
        items: [
          { yr: "~753 BC", label: "Rome founded as a small city" },
          { yr: "509 BC", label: "Rome becomes a Republic" },
          { yr: "27 BC", label: "Augustus becomes first emperor" },
          { yr: "117 AD", label: "Empire reaches its greatest size" },
          { yr: "476 AD", label: "Last Western Roman emperor falls" },
        ] },
      { t: "p", html: "So why did such a mighty empire fall? Historians stress that there was never one single reason — it was a slow pile-up of troubles feeding on one another. The empire had grown so vast that its borders were almost impossible to defend; because defending them cost so much, the government ran into serious money problems and had to raise taxes, which made ordinary people resentful. Political fighting weakened leadership at the top, deadly plagues thinned the population, and waves of invading peoples pressed in from outside. In <b>476 AD</b> the last Western emperor was quietly removed from power. Yet Rome did not vanish overnight: the wealthier, better-defended <b>Eastern</b> half — the Byzantine Empire, centered on its great capital Constantinople — lived on for another thousand years." },
      { t: "fact", html: "Our months <b>July</b> and <b>August</b> are named after Julius Caesar and Augustus. And “Caesar” became a title — “Kaiser” and “Tsar” both come from it!" },
      { t: "guide", html: "Owl tip: when you read that something “fell,” look for many causes, not one. Big things in history — empires, companies, even ideas — usually weaken from several directions at once, then tip over from a final push." },
      { t: "modern", html: "Look around and you'll find Rome hiding in plain sight: the domes on government buildings, the layout of a courtroom, the lettering stamped on a coin, even the way some roads and laws are organized. Roman engineering and Roman law are baked so deeply into modern life across Europe, the Americas, and beyond that we often use them without ever realizing where they came from. An empire can fall and still leave its skeleton inside the world that follows." },
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
      { t: "lead", html: "When the Western Roman Empire collapsed, the roads, courts, and armies that had kept order for centuries fell apart with it. Without one big power to keep the peace, life became dangerous and uncertain — and frightened people quietly made a hard trade: they gave up much of their freedom in exchange for protection. Powerful local lords offered safety behind their walls; in return, ordinary people worked the lords' land and fought in their wars." },
      { t: "p", html: "This arrangement spread across Europe because it solved an urgent problem. Because there was no distant king who could realistically defend a small farming village from raiders, the nearest strong lord became the next best thing. Loyalty flowed upward and protection flowed downward, link by link, all the way from the king at the top to the humblest farmer at the bottom — a chain we now call <b>feudalism</b>." },
      { t: "compare", title: "Who's who in feudalism",
        a: { title: "Top of the pyramid", items: ["<b>King</b> — owns all the land in theory", "<b>Lords / nobles</b> — given land, raise armies", "<b>Knights</b> — armored warriors who serve a lord"] },
        b: { title: "Most of the people", items: ["<b>Peasants & serfs</b> — farm the land", "Give part of their crops to the lord", "Get protection, but little freedom"] } },
      { t: "scene", art: "castle", caption: "Stone castles were homes, forts, and symbols of power." },
      { t: "p", html: "Alongside the lords stood the other giant power of the age: the <b>Catholic Church</b>. Its reach was astonishing. It crowned and blessed kings, ran nearly all the schools, and preserved learning by copying entire books out by hand in quiet monasteries — slow, careful work that kept ancient knowledge alive through dangerous centuries. The Church touched daily life everywhere, marking births, marriages, and deaths, and a powerful bishop could rival a noble in wealth and influence." },
      { t: "p", html: "It would be a mistake, though, to imagine the Middle Ages as nothing but gloom and mud. Over the centuries, towns swelled and trade routes lengthened, the first <b>universities</b> were founded, and soaring stone <b>cathedrals</b> rose toward the sky as proud feats of engineering and faith. Ideas traveled along with merchants and pilgrims, slowly knitting distant regions together. Then came catastrophe: the <b>Black Death</b> (1347–1351), a plague that may have killed roughly a third of all Europeans in just a few years." },
      { t: "p", html: "As terrible as it was, the Black Death also cracked open the old order. Because so many workers had died, the survivors suddenly became valuable — there simply weren't enough hands to farm the fields. So peasants could demand better pay and fairer treatment, and some walked away from cruel lords entirely. Step by step, the rigid feudal pyramid began to loosen, showing how a single disaster can reshape who holds power in a society." },
      { t: "fact", html: "Most people couldn't read, so cathedrals taught stories through <b>stained-glass windows</b> — like comic strips made of light." },
      { t: "guide", html: "Owl tip: when a lot of workers become scarce, those workers usually gain bargaining power — fewer people to do the job means each one matters more. That simple rule of supply and demand has shaped history again and again." },
      { t: "modern", html: "Words like <b>“loyalty,” “chivalry,”</b> and even the way we picture knights, castles, and dragons in books and films all flow out of this age. And the Black Death is more than a grim story: it shows how a fast-spreading disease can ripple far beyond sickness alone, reshaping economies, weakening old systems, and changing the balance of power — patterns the whole world recognized again during the recent global pandemic." },
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
      { t: "lead", html: "The word “Renaissance” means <b>rebirth</b>, and that name captures exactly what happened. After the long, hard centuries that followed Rome's fall, thinkers in Italy began rediscovering the writings, art, and science of the ancient Greeks and Romans — much of it preserved in dusty manuscripts and in the libraries of the Islamic world. They didn't just copy the old wisdom; they combined it with bold new creativity, and the result felt like Europe waking up." },
      { t: "p", html: "Why Italy, and why then? Wealthy trading cities like Florence and Venice had grown rich on commerce, and rich merchant families — most famously the <b>Medici</b> — were eager to spend their fortunes sponsoring brilliant artists and scholars. Because money flowed toward beauty and learning, talented people had the freedom and resources to experiment, and genius had somewhere to bloom." },
      { t: "p", html: "Artists like <b>Leonardo da Vinci</b> and <b>Michelangelo</b> created strikingly lifelike art by studying mathematics, anatomy, light, and careful observation of the real world. Leonardo, in particular, refused to stay inside any single field: he was a painter, an inventor sketching flying machines, an anatomist, and a scientist all at once — the ultimate curious mind, forever asking <i>how</i> and <i>why</i>." },
      { t: "hotmap", map: "europe", title: "Where ideas caught fire", sub: "Tap each center of new thinking.",
        spots: [
          { x: 205, y: 150, label: "Florence, Italy", text: "The cradle of the Renaissance, funded by rich merchant families like the Medici." },
          { x: 150, y: 120, label: "Mainz, Germany", text: "Around 1440, Gutenberg's printing press let books spread faster than ever before." },
          { x: 110, y: 130, label: "Paris & beyond", text: "Later, Enlightenment thinkers debated reason, science, and rights in cafés and salons." },
        ] },
      { t: "p", html: "Then, around <b>1440</b>, came one of the most important inventions in all of history: <b>Gutenberg's printing press</b>. Before it, every book had to be copied out by hand, so books were rare and treasured almost like jewels. After it, books could be printed quickly and cheaply by the hundreds. Because ideas no longer had to crawl from one hand-copied page to another, a thought written in one city could be read across the whole continent in a matter of months instead of lifetimes — and arguments, discoveries, and challenges to authority spread just as fast." },
      { t: "p", html: "That flood of shared ideas helped set up the <b>Enlightenment</b> (the 1600s and 1700s). Thinkers like Isaac Newton, Galileo, and John Locke insisted that you should <b>test ideas with evidence and reason</b> rather than simply trusting old authorities, and that every person is born with natural rights that no king should be allowed to trample. Because these ideas were now printed, debated in cafés and salons, and passed from country to country, they grew too powerful to silence — and they later helped inspire the revolutions in America and France that built new nations on the principle of rights and reason." },
      { t: "fact", html: "Galileo pointed a new invention — the <b>telescope</b> — at the sky and showed Earth orbits the Sun, not the other way around. It got him in big trouble at the time." },
      { t: "guide", html: "Owl tip: notice the pattern — a new tool (the printing press) doesn't just do one job, it changes <i>everything</i> downstream. Cheaper books meant more readers, more readers meant more thinkers, and more thinkers meant revolutions. New technology often reshapes the world in ways its inventor never imagined." },
      { t: "modern", html: "The scientific method, freedom of speech, and the very idea of human rights all grew out of this remarkable stretch of European history. Every time you form a hypothesis and test it in a science class, debate an idea instead of just accepting it, or read a book that challenges what powerful people want you to think, you are standing inside this story. The Renaissance and Enlightenment taught the world a habit it never lost: question, test, and dare to think for yourself." },
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
      { t: "lead", html: "For almost the entire span of human history, the great majority of people did the same kind of work their great-grandparents had done: they farmed the land by hand, with help from animals, and life changed astonishingly slowly. Then, beginning around 1760 in Britain, steam-powered machines arrived — and in barely a century, millions of people left the countryside and crowded into cities to work in enormous <b>factories</b>. Few transformations in history have ever moved so fast or reshaped daily life so completely." },
      { t: "p", html: "It began with <b>textiles</b> — the making of cloth — and with the <b>steam engine</b>, a machine that burned <b>coal</b> to boil water and turn that energy into motion. Because a steam engine never grew tired and could run day and night, a single factory could now produce more cloth in a week than a village of hand-weavers could make in a year. Soon that same steam power was driving <b>railways</b> and <b>steamships</b>, which shrank the world: goods, letters, and people now moved across countries and oceans at speeds that would have seemed like magic only a generation earlier." },
      { t: "scene", art: "factory", caption: "Factory towns grew fast — with smoke, machines, and crowded streets." },
      { t: "compare", title: "Life before vs. after",
        a: { title: "Before (farming world)", items: ["Most people farmed the land", "Goods made slowly, by hand", "Few people lived in cities", "Life changed little for centuries"] },
        b: { title: "After (industrial world)", items: ["Millions worked in factories", "Machines made goods cheaply, fast", "Cities exploded in size", "Trains and clocks ran daily life"] } },
      { t: "p", html: "But this new world had a genuinely hard and painful side. Early factories often ran on <b>long hours, low pay, and child labor</b> — children as young as six sometimes worked dangerous machines for twelve hours a day — and the coal smoke choked the growing cities with pollution. Change came slowly and only because people fought for it: workers banded together into unions to demand better treatment, and over time governments passed laws that brought shorter working days, safety rules, and — crucially — sent children to school instead of into the factories. The comforts of industry, in other words, were partly built on suffering that later generations worked hard to fix." },
      { t: "fact", html: "Before factories, towns set clocks by the sun, so every town's time was a little different. Railways needed everyone on the <b>same schedule</b> — that's why we have standard time zones!" },
      { t: "guide", html: "Owl tip: big leaps forward almost always carry a hidden cost. The smart question to ask of any new invention isn't just “What can it do for us?” but also “Who might it hurt, and how do we protect them?” That question is exactly what those early reformers were answering." },
      { t: "modern", html: "Mass-produced goods on every store shelf, the daily habit of commuting to work, the way our lives run by the clock, and even climate change (driven by burning fossil fuels like coal and oil) all trace their roots back to this period. In a very real sense, we are still living inside the world the Industrial Revolution built — enjoying its incredible abundance while also wrestling with the very problems, from pollution to fair working conditions, that it first created." },
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
      { t: "lead", html: "Europe in 1914 looked peaceful on the surface, but underneath it was a tense web of <b>alliances</b> — solemn promises that if one country were attacked, its friends would rush to its defense. The trouble with such promises is that they can turn a small, local quarrel into an enormous one almost automatically. Picture a long row of dominoes standing in a row: knock over the first, and the rest topple whether anyone wants them to or not." },
      { t: "p", html: "To remember the deeper causes, historians use the word <b>M-A-I-N</b>: <b>M</b>ilitarism (a race to build the biggest, most powerful armies and navies), <b>A</b>lliances (those tangled promises to defend one another), <b>I</b>mperialism (rival empires competing greedily for colonies and resources around the globe), and <b>N</b>ationalism (an intense, often aggressive pride in one's own nation). For years these forces built up pressure across the continent, like steam trapped in a sealed pot — all it would take was one spark to make it burst." },
      { t: "p", html: "That spark came in June 1914, when <b>Archduke Franz Ferdinand</b>, heir to the throne of Austria-Hungary, was assassinated. By itself it was a single tragic event in one city. But because of the alliance system, Austria-Hungary's response pulled in its allies, which pulled in their allies' rivals, and within a few short weeks the dominoes had fallen and much of Europe was plunged into war." },
      { t: "scene", art: "trench", caption: "Soldiers dug trenches and faced new, terrible weapons." },
      { t: "p", html: "It quickly became a horrifying new kind of war. Soldiers dug long <b>trenches</b> and hunkered in the mud for months, while deadly new weapons — machine guns, tanks, poison gas, and airplanes — made attacking across open ground almost suicidal. Because the defending side was now so powerful, battles could rage for months and cost hundreds of thousands of lives while the front line barely moved a few miles. Millions of young men died over tiny patches of churned-up earth, and people, stunned by the scale of the slaughter, hoped it would be “the war to end all wars.”" },
      { t: "order", title: "The road to war and after", sub: "Earliest to latest.",
        items: [
          { yr: "June 1914", label: "Archduke Franz Ferdinand assassinated" },
          { yr: "Aug 1914", label: "Alliances trigger — war spreads" },
          { yr: "1917", label: "The United States joins the war" },
          { yr: "Nov 1918", label: "Armistice — fighting ends" },
          { yr: "1919", label: "Treaty of Versailles punishes Germany" },
        ] },
      { t: "fact", html: "WWI helped redraw the world map — old empires (Austro-Hungarian, Ottoman, Russian) collapsed, and many modern countries were born from the pieces." },
      { t: "guide", html: "Owl tip: watch how one cause leads to the next here. Alliances made the war huge; the huge war demanded a harsh peace; the harsh peace bred anger; and that anger helped spark the next war. History often runs in chains like this — each link pulling the following one." },
      { t: "modern", html: "When the fighting finally stopped, the victorious nations forced a harsh peace treaty on Germany, demanding heavy payments and blame. That treaty left Germany humiliated, angry, and economically struggling — and, tragically, that bitterness created exactly the kind of desperate, resentful mood that a dangerous new leader could later exploit. In this way the “war to end all wars” helped plant the seeds of an even larger one just twenty years later, a sobering reminder that how a war ends can matter as much as how it begins." },
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
      { t: "lead", html: "The 1930s were a frightening, uncertain time. The wounds of World War I had barely healed when a worldwide economic collapse — the <b>Great Depression</b> — threw millions of people out of work and into poverty. When people are scared, hungry, and feel that the future has been stolen from them, they sometimes become willing to accept a dangerous bargain. Several leaders stepped forward offering exactly that: give me total power, they said, and I alone will make our nation strong, proud, and great again." },
      { t: "p", html: "The system these leaders built was called <b>fascism</b>. It placed a single all-powerful leader above everyone, fueled itself with extreme nationalism, abolished real freedom and honest elections, and ruthlessly crushed anyone who dared to disagree. Because there were no free newspapers, no fair courts, and no way to vote a bad leader out, nothing remained to stop these rulers once they seized control. In Germany, <b>Adolf Hitler</b> and the Nazi party pushed fascism to its most horrifying extreme, building their power on hatred of others." },
      { t: "p", html: "World War II began in 1939, when Germany invaded its neighbor <b>Poland</b>. The conflict swiftly split much of the world into two great sides: the <b>Allies</b> — including Britain, the Soviet Union, and the United States — and the <b>Axis</b> — Germany, Italy, and Japan. It would grow into the deadliest war in all of human history, reaching across nearly every continent." },
      { t: "compare", title: "Two ways to run a country",
        a: { title: "Democracy", items: ["Leaders chosen by elections", "Freedom of speech & press", "Power is limited and shared", "People can disagree safely"] },
        b: { title: "Fascist dictatorship", items: ["One leader holds total power", "Speech and press controlled", "No real elections", "Opponents silenced or jailed"] } },
      { t: "p", html: "The war's most terrible horror was the <b>Holocaust</b>: the deliberate Nazi murder of six million Jewish people, along with millions of others the Nazis hated and targeted. This was not a battle but a systematic genocide, and it stands as one of the darkest chapters in all of human history. We study it not to dwell on cruelty, but because it is a solemn reminder of where hatred, prejudice, and unchecked power can lead when no one is allowed to say “no” — and of why the world made a promise to never let such a thing happen again." },
      { t: "fact", html: "WWII sped up technology dramatically: radar, jet engines, computers, and (tragically) the atomic bomb all advanced during these years." },
      { t: "guide", html: "Owl tip: notice the protections in the “Democracy” column above — free speech, free press, real elections, limited power. They aren't just nice features; they are the brakes that can stop a country before it rolls toward something like fascism. That's why people work so hard to defend them." },
      { t: "modern", html: "Out of the ruins of the deadliest war in history, the world's nations resolved to do better. After 1945 they created the <b>United Nations</b> to give countries a place to settle disputes with words instead of weapons, and they wrote down a list of universal <b>human rights</b> that belong to every person simply for being human. The phrase “Never again” became a guiding promise — a vow that the lessons of this terrible war must never be forgotten. The institutions and ideals born in those years still shape how nations try to keep the peace today." },
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
      { t: "lead", html: "It was called the <b>Cold War</b> because the two giants — the United States and the Soviet Union — never actually fought each other head-on with armies, the way a “hot” shooting war is fought. The danger was that both sides now possessed nuclear weapons, so a direct war could have destroyed the whole world. Instead, they competed fiercely in every other arena they could: spies and secrets, the Olympics and sports, the race to space, ever-bigger weapons, and a tug-of-war for influence over other countries around the globe." },
      { t: "p", html: "Behind the rivalry lay two completely opposite visions of how a society should work. The <b>United States</b> led the democratic, free-market West, where people voted for their leaders and ran their own businesses. The <b>Soviet Union (USSR)</b> led the <b>communist</b> East, where the government controlled the economy, planned what would be produced, and allowed no rival political parties to exist. Because each side was convinced its system was the right one for the future, neither was willing to back down — and that clash of ideas, not just of armies, is what kept the world on edge for decades." },
      { t: "p", html: "Europe itself was sliced in two by an invisible boundary that Britain's Winston Churchill famously named the <b>“Iron Curtain.”</b> On one side lay the free, democratic West; on the other, the tightly controlled communist East. Nowhere was this division more painful than in the city of Berlin, which in 1961 was split by a very real concrete <b>wall</b>. Families were separated literally overnight — a person might have gone to bed in one half of the city and woken up cut off from relatives and friends on the other side, with armed guards ready to stop anyone who tried to cross." },
      { t: "scene", art: "wall", caption: "The Berlin Wall split a city in two for 28 years." },
      { t: "hotmap", map: "europe", title: "A divided continent", sub: "Tap to explore the Cold War's flashpoints.",
        spots: [
          { x: 150, y: 110, label: "Berlin, Germany", text: "Divided by a wall in 1961; its fall in 1989 became the symbol of the Cold War's end." },
          { x: 130, y: 90, label: "The Iron Curtain", text: "An invisible line splitting democratic Western Europe from communist Eastern Europe." },
          { x: 250, y: 80, label: "Moscow, USSR", text: "Capital of the Soviet Union, the communist superpower that rivaled the United States." },
        ] },
      { t: "p", html: "One of the most thrilling parts of the rivalry was the <b>Space Race</b>. Because reaching space proved a nation's scientific and military might, both sides poured enormous effort into it: the USSR stunned the world by launching the first artificial satellite, <b>Sputnik</b>, in 1957, and then sent the first human into orbit — and the United States answered by landing the first people on the <b>Moon</b> in 1969. Then, after decades of tension, the great change came almost gently. In <b>1989</b>, as communist governments lost their grip, the Berlin Wall was joyfully torn down; and by 1991 the Soviet Union itself peacefully broke apart into separate nations, bringing the long Cold War to a close without the catastrophic war so many had feared." },
      { t: "fact", html: "When the Wall fell on November 9, 1989, crowds celebrated and chipped off pieces as souvenirs. People keep chunks of the Berlin Wall in museums all over the world today." },
      { t: "guide", html: "Owl tip: the Cold War is a powerful example of how competition can push humanity forward in surprising ways. The same rivalry that built terrifying weapons also sent the first humans to the Moon and gave us satellites, computers, and technologies we still use every single day." },
      { t: "modern", html: "The Cold War still shapes the world you live in today: the space programs and satellites that power your maps and weather forecasts, many of the borders that divide modern Europe, and the global influence held by the United States and Russia all trace back to it. Perhaps its most hopeful lesson is how it ended — peacefully. The fact that such a vast, rigid system could change and dissolve without a giant war is a reminder that even the most fixed-seeming arrangements in the world are never truly permanent." },
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
      { t: "lead", html: "For thousands of years China was ruled by <b>dynasties</b> — powerful families of emperors who passed the throne down from parent to child, generation after generation. When a dynasty grew weak, corrupt, or unlucky, it eventually collapsed and a new family rose to replace it. Chinese historians explained this endless rise-and-fall with an idea called the <b>“Mandate of Heaven”</b>: the belief that heaven itself granted an emperor the right to rule, but could just as easily withdraw that blessing if he ruled badly. Floods, famines, defeats in war, and rebellions were all read as signs that a ruler had lost heaven's favor — and that someone new deserved it." },
      { t: "p", html: "China is one of the world's <b>oldest continuous civilizations</b>, meaning its written language, traditions, and sense of identity have stretched in an unbroken thread for thousands of years — far longer than most nations have even existed. Held together by a shared culture and a powerful central government, China repeatedly rebuilt itself after invasions and civil wars, always returning to its dynastic pattern." },
      { t: "p", html: "Chinese inventors were astonishingly ahead of their time. The “<b>Four Great Inventions</b>” — <b>paper, printing, gunpowder, and the compass</b> — eventually changed the entire world when they slowly spread westward along trade routes. Each one solved a problem people everywhere shared: how to record knowledge, how to copy it cheaply, how to wage war, and how to find your way across open water. Because these tools were invented in China first, China held an enormous head start in technology for centuries." },
      { t: "scene", art: "greatwall", caption: "The Great Wall stretches thousands of miles — built to defend the empire." },
      { t: "p", html: "To protect against fierce nomadic raiders from the northern steppes, a series of emperors connected and extended older defensive walls into the immense <b>Great Wall of China</b>, which winds over <b>13,000 miles</b> in total when every branch is counted. It was not a single wall built in one go, but the work of many dynasties across many centuries — built, abandoned, and rebuilt as threats came and went. Meanwhile, goods and ideas flowed outward along the <b>Silk Road</b>, a sprawling network of overland trade routes that carried silk, spices, and inventions all the way to the Middle East and even to ancient Rome." },
      { t: "p", html: "The Silk Road mattered for more than just goods. Because merchants, monks, and travelers carried <i>ideas</i> as well as cargo, religions, art styles, foods, and technologies all spread along it in both directions. When Chinese paper and printing finally reached Europe centuries later, the effect was explosive: cheaper books meant more readers, more readers meant faster-spreading ideas, and faster-spreading ideas helped fuel revolutions in science and learning. So a quiet Chinese invention helped reshape a continent on the other side of the world." },
      { t: "order", title: "China's inventions reach the world", sub: "These are roughly when each invention appeared. Order them earliest to latest.",
        items: [
          { yr: "~100 BC", label: "Paper is invented in China" },
          { yr: "~700 AD", label: "Woodblock printing develops" },
          { yr: "~900 AD", label: "Gunpowder is discovered" },
          { yr: "~1100 AD", label: "The magnetic compass guides sailors" },
        ] },
      { t: "fact", html: "The compass let sailors find their way far from land — without it, the later European Age of Exploration might never have happened. A floating magnetized needle always pointing north meant ships no longer had to hug the coastline or wait for clear skies to read the stars." },
      { t: "fact", html: "Did you know? China invented <b>paper money</b> too, roughly a thousand years ago — long before Europe. Carrying around heavy strings of metal coins was exhausting, so merchants began trading paper notes instead, an idea that eventually spread across the entire planet." },
      { t: "guide", html: "Owl tip: when you read that one civilization “invented” something, remember that ideas usually take centuries to travel and change as they go. A Chinese invention might be tweaked in the Middle East, transformed in Europe, and finally end up in your pocket — each stop adding something new." },
      { t: "modern", html: "You used a Chinese invention today: paper. And gunpowder, printing, and the compass each reshaped the whole world — proof that one region's ideas can change everyone's future. Today China is once again a global leader in technology and manufacturing, exporting goods to nearly every country on Earth — a modern echo of the ancient inventiveness that first put it ahead of the world." },
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
      { t: "lead", html: "India's history stretches back over <b>4,000 years</b> to the remarkable <b>Indus Valley</b> civilization — among the very first urban societies on Earth. Its cities, like Harappa and Mohenjo-daro, were astonishingly advanced: they had streets laid out in neat grids, public wells, covered drains, and even indoor plumbing at a time when most of the world lived in scattered villages. The people of the Indus Valley traded over long distances and developed a writing system that scholars still cannot fully read today." },
      { t: "p", html: "Two of the world's great religions were born here. <b>Hinduism</b>, one of the oldest living faiths on the planet, grew gradually over thousands of years and shaped Indian art, music, festivals, and daily life. Centuries later, <b>Buddhism</b> was founded by a prince named <b>Siddhartha Gautama</b>, who gave up his wealth to search for the meaning of suffering and became known as the <b>Buddha</b> (“the awakened one”). His teachings of compassion and mindfulness spread far beyond India — to China, Japan, and across much of Asia — making this one of the most influential ideas ever to come out of the subcontinent." },
      { t: "p", html: "India was also home to dazzling empires. The <b>Maurya Empire</b>, over 2,000 years ago, united most of the subcontinent under one ruler; its emperor Ashoka famously turned away from war toward peace and tolerance after seeing the suffering a great battle caused. Much later, the <b>Mughal Empire</b> brought Persian-influenced art, architecture, and gardens, and ruled vast wealthy lands. These empires built wonders that still leave visitors speechless today." },
      { t: "scene", art: "taj", caption: "The Taj Mahal, built by Mughal emperor Shah Jahan as a tomb for his wife." },
      { t: "p", html: "Beginning in the 1700s and tightening through the 1800s, <b>Britain</b> gradually took control of India — first through a trading company, then directly as a colony. India became known as the “jewel in the crown” of the British Empire because of its enormous population, resources, and wealth. But being ruled from a faraway country meant Indians had little say over their own laws, taxes, or futures, and over time the desire to govern themselves again grew into a powerful national movement." },
      { t: "p", html: "Their most famous leader, <b>Mahatma Gandhi</b>, chose an extraordinary and difficult path: <b>nonviolent resistance</b>. Rather than meet force with force, he urged Indians to refuse to cooperate with unjust laws through peaceful marches, boycotts of British goods, and quiet, disciplined courage in the face of arrest and even beatings. The logic was powerful: if millions simply refused to obey, no empire could rule without their consent. After decades of struggle, India finally won its <b>independence in 1947</b> — a victory that inspired civil-rights and freedom movements around the world." },
      { t: "scenario", title: "Gandhi's choice", prompt: "An unjust law taxes salt — something everyone needs. How do you protest without violence?",
        opts: [
          { label: "March to the sea and make your own salt", tag: "What Gandhi did", outcome: "Gandhi's 240-mile Salt March in 1930 broke the law peacefully and drew the world's attention to India's cause." },
          { label: "Attack the tax offices", tag: "Not his way", outcome: "Gandhi believed violence would only bring more violence — and lose the moral high ground." },
          { label: "Do nothing and hope it changes", tag: "Too slow", outcome: "Gandhi believed in peaceful <i>action</i>, not silence — courage without weapons." },
        ] },
      { t: "fact", html: "Today India is the world's <b>most populous country</b> and the largest democracy in history, with over a billion people who speak hundreds of different languages and follow many religions — yet vote together in the same enormous elections." },
      { t: "fact", html: "Did you know? India gave the world the concept of <b>zero</b> as a number you can calculate with, along with the digit system we now call “Arabic numerals” (which actually traveled from India to the Arab world and then to Europe). Without that idea, modern math and computers would be almost impossible." },
      { t: "guide", html: "Owl tip: notice the chain reaction here — Gandhi influenced people he never met, on continents he never visited. A single powerful idea, lived out bravely, can ripple outward for generations. That's why studying history is really studying how ideas spread." },
      { t: "modern", html: "Gandhi's nonviolent methods inspired leaders like <b>Martin Luther King Jr.</b> during the American civil-rights movement and <b>Nelson Mandela</b> in South Africa. Ideas, like trade goods, travel across the world — and some of the most powerful exports a nation ever sends out are not products at all, but ways of thinking. Today India is also a rising technology power, home to a booming software industry and a thriving film world known as Bollywood." },
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
      { t: "lead", html: "Like medieval Europe, old Japan ran on its own version of a <b>feudal system</b> — a pyramid of loyalty in which land and protection were traded for service. At the very top sat an <b>emperor</b>, who was treated as a sacred symbol of the nation but held little day-to-day power. The real authority belonged to a supreme military commander called the <b>shogun</b>, who governed in the emperor's name. Beneath the shogun were powerful lords, and serving them were the famous warrior knights known as <b>samurai</b>, who lived by a demanding code of honor called <i>bushido</i> — “the way of the warrior” — that prized loyalty, discipline, and courage even unto death." },
      { t: "p", html: "For over <b>200 years</b>, Japan deliberately sealed itself off from the rest of the world in a policy of near-total isolation. Foreigners were mostly forbidden to enter, and Japanese were forbidden to leave, partly out of fear that outside ideas and foreign powers might destabilize the country. Behind this closed door, Japanese arts, crafts, and traditions flourished in peace — but the nation also fell behind the rapid industrial advances happening in Europe and America." },
      { t: "p", html: "Then, in <b>1853</b>, American warships under Commodore Matthew Perry sailed into a Japanese harbor and demanded that the country open up to trade. Their steam-powered ships and modern cannons made it dramatically clear how far Japan had fallen behind in technology. Rather than be carved up like other Asian nations, Japan's leaders made a bold, almost unbelievable decision: instead of resisting, they would <b>modernize fast</b> — borrowing the best ideas from the very powers that threatened them, and beating them at their own game." },
      { t: "scene", art: "torii", caption: "A torii gate marks the entrance to a Shinto shrine." },
      { t: "p", html: "During the <b>Meiji era</b> (beginning in 1868), Japan transformed itself at breathtaking speed. In just a few decades it built railways, telegraph lines, factories, modern schools open to all children, and a powerful navy — compressing changes that had taken Europe more than a century into a single generation. Because the whole nation pulled in the same direction, Japan rose to become a major world power, the first Asian nation to industrialize on this scale." },
      { t: "compare", title: "Old Japan vs. Meiji Japan",
        a: { title: "Before (feudal)", items: ["Ruled by shoguns & samurai", "Closed to the outside world", "Sword-based warrior culture", "Mostly farming economy"] },
        b: { title: "After (Meiji)", items: ["Modern government & army", "Open to global trade & ideas", "Railways and factories", "Fast-growing industry"] } },
      { t: "fact", html: "Japan adopted useful ideas from many countries — it modeled its navy partly on Britain's, its army partly on Germany's, and its schools partly on Western Europe's — but it carefully kept its own language, religion, and traditions. This blend of borrowing and preserving became a hallmark of modern Japan." },
      { t: "fact", html: "Did you know? Japan's <b>bullet trains</b>, called the <i>Shinkansen</i>, opened in 1964 and were among the fastest in the world. For decades, not a single passenger died in a crash — a record of safety and precision that nations everywhere have tried to copy." },
      { t: "guide", html: "Owl tip: Japan's story raises a fascinating question — is it better to keep the world out and protect your traditions, or to open up and absorb new ideas? Japan eventually chose to open up <i>and</i> protect, and that double choice helped make it powerful. History rarely forces an either/or." },
      { t: "modern", html: "After enormous hardship and destruction in World War II, Japan rebuilt itself yet again — this time into one of the world's largest and most innovative economies, famous worldwide for its cars, electronics, video games, animation, and bullet trains. Twice in a single century, Japan reinvented itself almost from scratch, showing just how quickly a determined nation can transform — and how culture and modern technology can thrive side by side." },
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
      { t: "lead", html: "The religion of <b>Islam</b> began in the <b>600s AD</b> in the deserts of Arabia and spread with remarkable speed across the Middle East, North Africa, and beyond. Within roughly a century, lands stretching from Spain to the borders of India shared a common faith, language of learning, and network of trade. As these Islamic empires grew, their great cities became dazzling <b>centers of learning</b>, gathering, preserving, and advancing knowledge in mathematics, science, and medicine during the very centuries when much of Europe was struggling through its Middle Ages." },
      { t: "p", html: "The debt the modern world owes to these scholars is enormous. Muslim mathematicians gave us the word <b>“algebra”</b> (from the Arabic <i>al-jabr</i>) and the very word <b>“algorithm,”</b> named after the scholar al-Khwarizmi. Astronomers mapped the stars with such precision that many stars still carry Arabic names today. Crucially, scholars translated and carefully copied ancient Greek and Roman books — works by Aristotle, Euclid, and others — that had been lost or forgotten in Europe. Great cities like <b>Baghdad</b> and <b>Córdoba</b> glittered with libraries, hospitals, and houses of study that drew thinkers of every faith." },
      { t: "p", html: "Among the most powerful of the Islamic empires was the <b>Ottoman Empire</b>, founded around <b>1300</b> by Turkish warriors in what is now Turkey. Over the following centuries it grew into a true superpower, eventually ruling parts of three continents — Asia, Europe, and Africa — at once. Its decisive moment came in <b>1453</b>, when Ottoman forces captured the mighty walled city of <b>Constantinople</b> (now Istanbul). This conquest ended the last surviving remnant of the ancient Roman Empire, which had endured in the east for nearly a thousand years after Rome itself fell, and it placed the Ottomans in command of the key trade routes linking East and West." },
      { t: "p", html: "Geography made the Ottoman Empire fabulously wealthy and important. Because it sat astride the crossroads where Europe, Asia, and Africa meet, almost every valuable good traveling between those worlds — spices, silk, gemstones, and ideas — had to pass through Ottoman lands. Controlling that crossroads meant the Ottomans could tax and shape the flow of trade across half the world, which is exactly why other powers both envied and feared them." },
      { t: "scene", art: "scroll", caption: "Islamic scholars preserved and expanded human knowledge for centuries." },
      { t: "hotmap", map: "mideast", title: "A bridge between worlds", sub: "Tap to explore the Ottoman crossroads.",
        spots: [
          { x: 130, y: 110, label: "Istanbul (Constantinople)", text: "Captured in 1453, it became the Ottoman capital — a meeting point of Europe and Asia." },
          { x: 210, y: 140, label: "Trade routes", text: "The Ottomans controlled key routes for spices and silk between East and West." },
          { x: 250, y: 90, label: "Centers of learning", text: "Islamic cities preserved Greek knowledge and advanced math, science, and medicine." },
        ] },
      { t: "fact", html: "Because the Ottomans controlled the overland trade routes — and could charge whatever tolls they liked — Europeans grew desperate to find their own <b>sea</b> routes to Asia. That hunger for an ocean shortcut to the spices of the East led directly to the European voyages of explorers like Columbus, who stumbled upon the Americas while searching for a back door to Asia." },
      { t: "fact", html: "Did you know? The world's first <b>coffeehouses</b> appeared in Ottoman cities like Istanbul, where people gathered to sip coffee, talk, play games, and trade news. When the custom finally reached Europe, coffeehouses there became buzzing hubs of conversation and new ideas." },
      { t: "guide", html: "Owl tip: watch how one event triggers the next. The Ottomans never set out to “cause” the discovery of the Americas — but by controlling the land routes, they pushed Europe out to sea. History is full of these accidental chains, where one power's choice reshapes a continent it never even saw." },
      { t: "modern", html: "Modern <b>Turkey</b> grew directly out of the heart of the Ottoman Empire after it dissolved in the aftermath of World War I. And countless words and customs you use every day — algebra, algorithm, coffee, sugar, cotton, even the way we write numbers — reached Europe through the Islamic world. The next time you do a math problem or drink something warm in the morning, you're touching a thread that runs straight back to those medieval centers of learning." },
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
      { t: "lead", html: "<b>Colonialism</b> is when one country takes control of another — its land, its people, and its resources — and governs it from afar for its own benefit. Beginning in earnest in the 1600s and reaching its peak in the 1800s, European powers including <b>Britain, France, the Netherlands, Portugal, and Spain</b> colonized vast stretches of Asia, ruling over hundreds of millions of people who had their own ancient civilizations, languages, and governments long before the Europeans arrived." },
      { t: "p", html: "Why did they do it? The simplest answer is <b>resources and trade</b>. Asia was rich in things Europe craved: spices to flavor and preserve food, tea, silk, cotton, rubber, and tin, plus enormous markets where European-made goods could be sold. Controlling the source of these treasures — rather than buying them through middlemen — promised tremendous profit and power." },
      { t: "p", html: "But wanting something is not the same as being able to seize it. The deeper reason colonialism succeeded was a sharp imbalance in technology created by the <b>Industrial Revolution</b>. Steamships could carry troops and cargo quickly against wind and current; railways could move armies and supplies inland; the telegraph let distant rulers send orders in minutes; and modern factory-made rifles and cannons gave small European forces a deadly advantage in battle. Because of these tools, a handful of European nations could control populations many times larger than their own — not because they were wiser or more deserving, but because they held a temporary technological edge." },
      { t: "scene", art: "ship", caption: "European trading companies arrived by sea, then stayed to rule." },
      { t: "compare", title: "Two sides of colonial rule",
        a: { title: "What colonizers built", items: ["Railways, ports, and roads", "New schools and laws", "Global trade links"] },
        b: { title: "What it cost the people", items: ["Lost the right to rule themselves", "Wealth and resources taken away", "Local cultures pushed aside", "Famines and unfair treatment"] } },
      { t: "p", html: "Colonial control often began not with an army, but with a <b>trading company</b> — a private business set up to buy and sell goods. The most famous, the <b>British East India Company</b>, started simply by trading in spices and cloth, but over time it grew so vast and rich that it began raising its own private army, collecting taxes, and ruling territory like a government. It is one of history's strangest twists: a company, founded to make money, ended up governing much of India before the British government finally took over directly." },
      { t: "p", html: "It is important to see colonialism honestly and from both sides. The colonizers did build lasting things — railways, ports, telegraph lines, schools, and shared legal systems that, in some places, still function today. Yet the same era stripped colonized peoples of the right to govern themselves, drained away their wealth and raw materials, pushed aside local cultures and languages, and at times brought terrible famines and unjust treatment. Both truths can be held at once: real things were built, and a deep injustice was done." },
      { t: "fact", html: "At its height, the <b>British Empire</b> was so large and so spread across the globe that the sun was always shining on some part of it — earning it the nickname “the empire on which the sun never sets.” It covered roughly a quarter of all the land on Earth." },
      { t: "fact", html: "Did you know? The competition to control Asia's spice trade was so fierce that, in one 1600s treaty, the Dutch traded the tiny island of Manhattan (now part of New York City) to the English in exchange for a single spice island worth its weight in nutmeg. Spices were once that valuable." },
      { t: "modern", html: "Colonial borders, languages, and railways still shape many Asian countries today — sometimes helpfully, sometimes as the source of lasting tensions. Understanding colonialism helps explain a great deal about the modern world: why English is spoken so widely, why some national borders run in strange straight lines, and why questions of fairness between rich and poor nations still echo loudly. The age of empires is over, but its consequences are all around us." },
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
      { t: "lead", html: "By the middle of the 20th century, the long age of European empires was finally crumbling. Two devastating world wars had exhausted and bankrupted the European powers, draining the money, soldiers, and political will needed to hold distant colonies by force. At the same time, decades of education, organizing, and rising national pride had given colonized peoples across Asia powerful, confident movements of their own. They demanded independence — and, country after country, they won it." },
      { t: "p", html: "<b>India</b> led the way in <b>1947</b>, achieving independence after Gandhi's long nonviolent movement and inspiring others to believe their own freedom was possible. A cascade followed: <b>Indonesia</b> broke free from the Dutch, the <b>Philippines</b> gained independence, and <b>Vietnam</b> and many others won self-rule through the 1940s, 50s, and 60s. In just two decades, the political map of an entire continent was redrawn as dozens of new nations were born." },
      { t: "p", html: "Independence, however, was rarely smooth or simple. As empires withdrew, they often left behind borders that had been drawn for the convenience of colonizers rather than the needs of local peoples. Sometimes these new lines split communities apart or forced rival groups into a single country, sparking painful upheavals and even violence — as happened when British India was divided into India and Pakistan. Some nations won freedom through patient, peaceful negotiation; others only after bitter armed struggle. The path to freedom was different in every land, but the destination was the same: the right to rule themselves." },
      { t: "order", title: "Asia becomes independent", sub: "Order these independence years, earliest to latest.",
        items: [
          { yr: "1945", label: "Indonesia declares independence" },
          { yr: "1946", label: "The Philippines becomes independent" },
          { yr: "1947", label: "India and Pakistan gain independence" },
          { yr: "1957", label: "Malaysia (Malaya) becomes independent" },
        ] },
      { t: "fact", html: "The idea of <b>self-determination</b> — that every people has the right to govern itself rather than be ruled by outsiders — spread around the globe in the 1900s. It proved so powerful that it helped end most of the world's empires within a single human lifetime, one of the fastest political transformations in all of history." },
      { t: "fact", html: "Did you know? When the largest colonies won freedom, the change rippled outward fast. Once India — the “jewel” of the British Empire — became independent, it grew far harder for any empire to argue that holding colonies was either right or even possible. One nation's freedom helped unlock others'." },
      { t: "guide", html: "Owl tip: ask <i>why now?</i> whenever a big wave of change happens. These nations had wanted freedom for a long time — but it took the weakening of Europe <i>and</i> the rise of strong local movements <i>together</i> to make it happen. Big historical shifts usually need several causes lining up at once." },
      { t: "modern", html: "Most of today's Asian nations are younger than your grandparents — many were born within the last 70 or 80 years! Their journey from colony to country shaped the borders, languages, and governments you see on the map right now. When you look at modern Asia, you are looking at the still-fresh result of one of history's greatest movements toward freedom." },
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
      { t: "lead", html: "China's last imperial dynasty collapsed in <b>1912</b>, ending more than two thousand years of rule by emperors. But what followed was not a smooth transition to a new system — it was nearly four decades of turmoil. China endured the breakdown of central authority, the rise of regional warlords, a brutal invasion by Japan during World War II, and a long civil war between rival political movements. Out of this chaos, in <b>1949</b>, the Communist Party, led by <b>Mao Zedong</b>, finally won control and founded the People's Republic of China." },
      { t: "p", html: "Under communism, the government took sweeping control over nearly every part of life: it organized farms into large collectives, ran the factories, planned the economy from the top down, and shaped education, work, and daily routines. The aim was to build a society of strict equality where the state, rather than private owners, directed the nation's resources. The transformation of Chinese society was enormous — but some of these grand policies were carried out so quickly and harshly that they caused severe shortages and great hardship for ordinary people. It was an era of dramatic ambition and painful difficulty alike." },
      { t: "p", html: "Then came a second great turning point — one almost as sweeping as the first. Beginning around <b>1978</b>, the new leader <b>Deng Xiaoping</b> launched a bold set of reforms that cautiously opened China to business, investment, and global trade. The country kept its single-party political system, but it began allowing markets, private enterprise, and foreign companies to operate. Deng reportedly captured the practical spirit of the change with the saying that it doesn't matter whether a cat is black or white, as long as it catches mice — meaning that results mattered more than rigid theory." },
      { t: "compare", title: "China's two big changes",
        a: { title: "1949: Communist Revolution", items: ["One-party communist government", "State controls the economy", "Major social transformation"] },
        b: { title: "1978+: Economic opening", items: ["Allowed markets and businesses", "Joined global trade", "Hundreds of millions rose out of poverty"] } },
      { t: "fact", html: "China's explosive growth since the 1980s lifted <b>more than 800 million people</b> out of extreme poverty in a few short decades — more people than live in all of North and South America combined. Many historians call it one of the largest and fastest reductions in poverty the world has ever seen." },
      { t: "fact", html: "Did you know? The coastal city of Shenzhen was a small fishing town of a few tens of thousands of people in the late 1970s. After it was chosen as one of China's first “special economic zones” to test market reforms, it exploded into a high-tech megacity of well over ten million — a vivid symbol of just how fast China changed." },
      { t: "guide", html: "Owl tip: notice that China made two enormous changes — one toward strict state control, then one toward open markets — without changing who held political power. It's a reminder that a country's <i>economy</i> and its <i>government</i> are two different machines, and a nation can overhaul one while keeping the other." },
      { t: "modern", html: "Today China is the world's second-largest economy and most populous rival to the West, manufacturing goods sold in nearly every country on the planet — from phones and toys to solar panels and electric cars. Its rapid rise from poverty and turmoil to global powerhouse, all within a single lifetime, is one of the biggest and most consequential stories of our time, reshaping trade, technology, and the balance of power across the whole world." },
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
      { t: "lead", html: "In the decades after World War II, four small Asian economies grew so rapidly and so consistently that observers gave them a fitting nickname: the <b>“Asian Tigers”</b> — <b>South Korea, Taiwan, Singapore, and Hong Kong</b>. None of them was blessed with vast oil fields or sprawling farmland. Instead, each chose to invest heavily in <b>education, technology, and trade</b>, building skilled workforces and selling high-quality goods to the whole world. Their success showed that a nation's most valuable resource can be the knowledge and effort of its own people." },
      { t: "p", html: "Consider <b>South Korea</b>. In the 1950s, after a devastating war, it was one of the poorest countries on Earth, with many people struggling simply to find enough food. Within a single lifetime it transformed into a global leader in electronics, shipbuilding, and cars — and even in entertainment, exporting wildly popular K-pop music and films watched around the world. Or consider <b>Singapore</b>, a tiny island city with almost no natural resources at all. Through disciplined long-term planning, world-class education, low corruption, and a relentless focus on trade, it became one of the wealthiest and cleanest places on the planet — proof that smart choices can matter more than lucky geography." },
      { t: "scene", art: "torii", caption: "Modern Asia blends ancient traditions with cutting-edge technology." },
      { t: "p", html: "Today, Asia is home to <b>more than half of all the people on Earth</b> and to many of the world's largest and fastest-growing economies. <b>China</b> and <b>India</b> — the two most populous countries in human history — are rising powers whose decisions about technology, trade, energy, and the environment will help shape the entire planet's future. Alongside them, nations like Vietnam, Indonesia, and others are quickly developing, making the continent the center of gravity for much of the global economy." },
      { t: "fact", html: "Many of your everyday gadgets — phones, TVs, laptops, and game consoles — were designed, engineered, or assembled in Asia. From the high-tech factories of South Korea and Taiwan to the vast manufacturing centers of China, the continent has become both the workshop and the research lab of the modern world." },
      { t: "fact", html: "Did you know? The tiny country of <b>Singapore</b>, smaller in area than many cities, became so prosperous through trade and planning that its standard of living now rivals or exceeds that of much larger, resource-rich nations. It's a powerful example that size and luck matter far less than good decisions." },
      { t: "guide", html: "Owl tip: the lesson hidden in the Asian Tigers is hopeful — countries that start out poor are not doomed to stay poor. With education, fair institutions, hard work, and trade, a nation can leap forward astonishingly fast. History is not a fixed script; choices change the ending." },
      { t: "modern", html: "From the smartphone in a pocket to the cars on the road and the electronics in nearly every home, modern Asia quietly touches daily life almost everywhere on Earth. To understand where much of the 21st century is being invented, manufactured, and shaped, you have to understand Asia — a continent that, across these eight lessons, you've watched move from ancient empires to colonial rule to hard-won freedom and, finally, to the cutting edge of the modern world." },
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
      { t: "lead", html: "Africa is where humanity began — the earliest known human ancestors lived here millions of years ago, which is why scientists sometimes call it the “cradle of humankind.” But Africa is far more than a starting point. Its long history brims with powerful, wealthy, and sophisticated civilizations that traded, wrote books, studied the stars, and built cities of stone." },
      { t: "p", html: "In the north, <b>Ancient Egypt</b> built the towering pyramids more than 4,000 years ago — engineering marvels so precise that modern builders still study how they were made. The Egyptians also developed one of the world's earliest writing systems (hieroglyphics), advanced medicine, and careful astronomy used to track the seasons and the flooding of the Nile River. Because the Nile flooded so reliably each year, farmers could grow surplus crops, and that surplus is what allowed Egypt to support priests, scribes, artists, and engineers rather than only farmers." },
      { t: "scene", art: "pyramids", caption: "Egypt's pyramids have stood for over 4,000 years." },
      { t: "p", html: "Further south and west, great kingdoms rose around <b>trade</b> rather than farming alone. The kingdoms of <b>Ghana, Mali, and Songhai</b> in West Africa grew enormously rich by controlling the exchange of <b>gold and salt</b> across the Sahara Desert. This may sound strange — why would salt be valuable? — but in a hot climate without refrigerators, salt was essential for preserving food and keeping people healthy, and West Africa had gold but little salt, while the Sahara had salt but little gold. Because each region needed what the other had, long camel caravans crossed the desert for centuries, and the kings who taxed that trade became some of the wealthiest rulers on Earth." },
      { t: "p", html: "The fabled city of <b>Timbuktu</b> in Mali became one of the great centers of learning anywhere in the medieval world. It held universities and libraries packed with thousands of handwritten books on subjects from law and mathematics to astronomy and medicine, and scholars travelled great distances to study and debate there. A famous saying captured its reputation: that salt, gold, and divine blessing all met in Timbuktu — but so did knowledge." },
      { t: "p", html: "Mali's ruler <b>Mansa Musa</b> may well have been the richest person in all of history. On a famous pilgrimage to Mecca around 1324, he travelled with a vast caravan and gave away so much gold to the people he met along the way that he accidentally caused prices to rise and the value of gold to fall in the lands he passed through — an economic ripple that lasted for years afterward. It is one of the only times in history that a single person's generosity reshaped whole economies." },
      { t: "hotmap", map: "africa", title: "Africa's golden kingdoms", sub: "Tap to explore centers of wealth and learning.",
        spots: [
          { x: 210, y: 60, label: "Ancient Egypt", text: "Builders of the pyramids and pioneers of writing and medicine." },
          { x: 120, y: 110, label: "Mali & Timbuktu", text: "Rich from gold and salt; Timbuktu held famous libraries and universities." },
          { x: 230, y: 150, label: "Great Zimbabwe", text: "A stone city in the south, center of a powerful trading kingdom." },
        ] },
      { t: "p", html: "Far to the south stood <b>Great Zimbabwe</b>, a magnificent city built entirely of carefully fitted stone — without mortar to hold the blocks together. At its height around 700 years ago it was home to thousands of people and sat at the heart of a trading network that reached all the way to the coast of the Indian Ocean and beyond, exchanging gold and ivory for goods from as far away as China. When European explorers later saw its ruins, some refused to believe Africans had built it — a mistake that careful study has long since corrected." },
      { t: "fact", html: "Timbuktu's libraries held hundreds of thousands of manuscripts on math, science, and law — proof that Africa had thriving centers of knowledge for centuries. Many of these ancient books have survived, passed down through families, and are still being carefully preserved and studied today." },
      { t: "fact", html: "The word “salary” comes from <i>salarium</i>, money once given to Roman soldiers partly to buy salt — a reminder that across the ancient world, including the Sahara trade routes, salt was treated almost like money itself." },
      { t: "guide", html: "Here's the big idea to carry forward: a civilization grows rich and powerful not only from what it owns, but from what it can <i>trade</i> and what it chooses to <i>learn</i>. Egypt had the Nile, Mali had gold and salt, and all of them invested in knowledge — and that combination is exactly why their names still echo across thousands of years." },
      { t: "modern", html: "These kingdoms remind us that Africa's story is one of wealth, learning, and achievement — not just the difficult chapters that came later. The continent built pyramids, universities, and stone cities while inventing trade routes that spanned a desert larger than the United States. History is far bigger than any single chapter, and Africa's earliest chapters are some of the most impressive of all." },
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
      { t: "lead", html: "From the 1500s to the 1800s, European traders forced <b>more than 12 million enslaved Africans</b> across the Atlantic Ocean to the Americas. This is called the <b>Atlantic slave trade</b>, and it stands as one of the largest and most painful forced movements of people in all of human history. Each of those millions was a real person — with a name, a family, hopes, and a home — torn away from everything they knew." },
      { t: "p", html: "It is important to understand <i>why</i> this happened, because the reasons matter. European colonists in the Americas wanted to grow valuable crops like <b>sugar, cotton, and tobacco</b> on enormous plantations, and growing those crops required huge amounts of back-breaking labor. Rather than pay workers, traders captured and bought human beings to do the work for free. Because there was money to be made, a cruel and well-organized system grew up around it — but money never made it right. Enslaved people were treated as property to be bought and sold, separated from their families, and denied their most basic rights as human beings." },
      { t: "scene", art: "ship", caption: "Enslaved people endured a terrible ocean voyage called the Middle Passage." },
      { t: "p", html: "The ocean crossing itself, known as the <b>Middle Passage</b>, was a horror. People were packed into the dark, crowded holds of ships for voyages that lasted many weeks, and enormous numbers did not survive the journey. Those who lived arrived in a strange land, far from home, with their freedom stolen. It is a hard truth, and we do not look away from it — but we tell it carefully, because honoring people begins with telling their story truthfully." },
      { t: "p", html: "And here is what must never be forgotten: despite suffering that is almost impossible to imagine, enslaved Africans showed extraordinary <b>strength, courage, and resilience</b>. They protected one another, they resisted in countless brave ways, and they kept their cultures alive through music, food, language, and faith. Because they refused to let their humanity be erased, those traditions survived — and they went on to shape the Americas forever, from the foods we eat to the music the whole world now loves." },
      { t: "p", html: "Brave people of every background also fought to <i>end</i> slavery. They were called <b>abolitionists</b>, from the word “abolish,” meaning to do away with something completely. Among the most famous were formerly enslaved people like <b>Frederick Douglass</b>, who taught himself to read and became a powerful writer and speaker, and <b>Harriet Tubman</b>, who escaped slavery and then risked her own freedom again and again to guide others to safety. Because so many people refused to accept injustice, the system was finally torn down: slavery was abolished in the British Empire in <b>1833</b>, and in the United States in <b>1865</b>." },
      { t: "fact", html: "Much of American music — blues, jazz, gospel, and even rock and hip-hop — grew from the traditions of enslaved Africans and their descendants. Their culture became a treasured part of the world's culture, sung and celebrated on every continent today." },
      { t: "fact", html: "Harriet Tubman made around 13 dangerous journeys to lead enslaved people to freedom and, by her own account, never lost a single person she guided. She later said that people honor those who survived this history best by remembering them and by treating every person with dignity." },
      { t: "guide", html: "If this lesson feels heavy, that's because it is — and that's okay. We study difficult history not to feel bad, but to understand what people endured, to make sure it never happens again, and to admire the strength of those who survived it. Knowing the hard parts is part of respecting the people who lived through them." },
      { t: "modern", html: "We study this painful history so it is never repeated, and to honor the millions who suffered, resisted, and survived. Their descendants helped build nations across the Americas, contributing to science, art, government, and sport, and their cultures enrich the whole world today. Out of one of history's darkest chapters, generations of people built lives of dignity, achievement, and joy — and that, too, is part of the story we must always tell." },
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
      { t: "lead", html: "In the late 1800s, the nations of Europe raced one another to claim African territory for its valuable resources — rubber, diamonds, gold, ivory, and rich farmland. Historians call this frantic land-grab the <b>“Scramble for Africa,”</b> because it happened with astonishing speed: in barely thirty years, nearly an entire continent was claimed by outsiders who had not lived there." },
      { t: "p", html: "The pace was driven by competition. Because the European powers were rivals — Britain, France, Belgium, Germany, Portugal, and others — each feared that if it did not seize African land first, a rival would. That fear turned into a race, and the race turned into conquest. New inventions made it possible: steamships and railways moved soldiers and goods quickly, the telegraph carried orders across oceans in minutes, and new medicines protected Europeans from diseases that had once kept them away from the African interior." },
      { t: "p", html: "At a famous meeting in Berlin in <b>1884–85</b>, European leaders sat around a table and literally divided Africa among themselves on a map — <b>without a single African present</b> to speak for the millions of people whose lives they were deciding. They agreed on rules for how Europeans would split the land, treating an entire continent of nations, languages, and cultures as if it were empty space to be carved up. By <b>1914</b>, almost the whole of Africa was under European control." },
      { t: "p", html: "Because the men drawing the borders knew little about the people who actually lived there, the lines they drew were often perfectly straight — the kind you make with a ruler, following lines of longitude rather than rivers, mountains, or communities. The result was that a single people might suddenly be split across two or three different colonies, while groups who had long been rivals were forced together inside the same border. This caused real and lasting harm, because borders are not just lines on paper — they decide who lives in which country, who shares a government, and who is treated as a neighbor or a stranger. Astonishingly, many of these colonial borders are still the borders of African countries today." },
      { t: "scene", art: "scroll", caption: "Europeans drew new borders across Africa — often with little local knowledge." },
      { t: "compare", title: "Colonial rule in Africa",
        a: { title: "What was built", items: ["Railways, roads, and ports", "Mines and plantations", "Some schools and hospitals"] },
        b: { title: "What was lost", items: ["The right to self-rule", "Land and resources taken", "Borders that ignored real communities", "Forced labor and unfair treatment"] } },
      { t: "p", html: "It would be unfair to pretend colonial rule built nothing at all — railways, ports, and some schools and hospitals did appear. But it would be far more unfair to pretend that made it worthwhile. Almost everything that was built was designed to move resources <i>out</i> of Africa and into Europe, not to help Africans, and it came at the cost of people's freedom, their land, and often their dignity through forced labor and harsh treatment. A fair look at history weighs both sides honestly — and the scale here tilts heavily toward what was taken." },
      { t: "fact", html: "Only two African countries avoided being colonized: <b>Ethiopia</b>, which defeated a European invasion at the Battle of Adwa in 1896 and remained proudly independent, and <b>Liberia</b>, which had been founded in part by formerly enslaved people from the Americas." },
      { t: "fact", html: "The borders agreed on in Berlin were drawn so quickly that, in some places, a community might wake up to find an invisible line now ran straight through the middle of its land — separating families, farms, and even single villages between two different empires." },
      { t: "modern", html: "Many of the conflicts and challenges in modern Africa can be traced directly back to those hastily-drawn colonial borders, which forced very different groups to share a country or split united peoples apart. Knowing this history does not excuse today's problems, but it helps explain them — and it helps make sense of why Africa's map looks the way it does, with its many ruler-straight lines that no African ever chose." },
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
      { t: "lead", html: "After the Second World War ended in 1945, Africans across the continent began to demand the right to govern themselves — and the movement quickly grew unstoppable. The reasons came together at once: many Africans had fought bravely alongside Europeans during the war and rightly asked why they should not be free in their own lands; the European powers had been left weakened and exhausted; and a new generation of educated African leaders was ready to lead. Because all these forces pushed in the same direction, change that might have taken centuries instead took only a few remarkable decades." },
      { t: "p", html: "<b>Ghana</b> led the way in <b>1957</b>, becoming the first colony in sub-Saharan Africa to win its independence, under the determined leadership of <b>Kwame Nkrumah</b>. Its success showed the rest of the continent that freedom was truly possible, and the example spread like a spark. The year <b>1960</b> was so crowded with new nations that historians call it the “<b>Year of Africa</b>” — an astonishing <b>17 countries</b> became independent in that single year alone, redrawing the political map almost overnight." },
      { t: "p", html: "Independence did not always come easily, and one of the hardest struggles was in South Africa. There, a cruel system of racial segregation called <b>apartheid</b> — an Afrikaans word meaning “apartness” — used the law to keep the Black majority from voting, owning land freely, or living as equals in their own country. Fighting this injustice took enormous courage. <b>Nelson Mandela</b> spent <b>27 years in prison</b> for opposing apartheid — most of an entire lifetime behind bars — yet he never gave up his belief in a fair, shared future. When he finally walked free in 1990, he chose not revenge but reconciliation, helping to build a united, democratic South Africa and becoming its first Black president in 1994." },
      { t: "order", title: "Africa becomes free", sub: "Order these milestones, earliest to latest.",
        items: [
          { yr: "1957", label: "Ghana — first to gain independence" },
          { yr: "1960", label: "“Year of Africa” — 17 nations free" },
          { yr: "1990", label: "Nelson Mandela released from prison" },
          { yr: "1994", label: "Mandela elected South Africa's president" },
        ] },
      { t: "p", html: "Why does Mandela's choice still matter so much? Because after suffering a terrible wrong, the easy path is anger, and anger can tear a country apart. Mandela understood that a nation could only heal if its people — those who had suffered under apartheid and those who had benefited from it — agreed to live together as equals. He worked alongside his former opponents, set up ways for people to tell the truth about the past, and asked everyone to build the future together. That decision likely saved South Africa from a far more violent path, and it made him a model of leadership studied around the world." },
      { t: "fact", html: "Nelson Mandela won the Nobel Peace Prize in 1993 and became one of the most admired people in the world — a living symbol of forgiveness, patience, and reconciliation. South Africans affectionately called him by his clan name, “Madiba,” as a sign of deep respect and love." },
      { t: "fact", html: "When apartheid finally ended, South Africa held its first election in which everyone could vote in 1994. People stood in lines that stretched for miles and waited many hours for a chance many had been denied their entire lives — and they did so peacefully." },
      { t: "modern", html: "In just a few decades, the map of Africa transformed from a continent of colonies into dozens of proud, independent nations. The road was rarely smooth, but leaders like Kwame Nkrumah and Nelson Mandela showed the world the power of perseverance, courage, and forgiveness — proving that even the deepest injustices can be overcome when people refuse to give up on a fairer future." },
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
      { t: "lead", html: "Winning independence was a glorious moment — but it was really just the beginning. Freedom brought enormous hope, and also enormous challenges. A new nation cannot run on celebration alone; it needs a government that works, schools to teach its children, hospitals to keep people well, and an economy that lets families earn a living. Africa's new countries had to build all of this, often almost from scratch, and frequently within those tricky colonial borders that they had never chosen for themselves." },
      { t: "p", html: "The results varied widely, which is exactly what you would expect when dozens of very different countries each face such a huge task. Some nations thrived and grew steadily. Others struggled with conflict, poverty, or unstable leadership — and one reason was that the colonial powers had often left in a hurry, having trained very few local people to run governments, hospitals, or large businesses. Because the skills and institutions needed to govern a country take years to build, nations that started with almost none had a far harder climb." },
      { t: "p", html: "The wider world made things more complicated, too. These were the years of the <b>Cold War</b>, when the two superpowers — the United States and the Soviet Union (USSR) — competed for influence everywhere on Earth, and Africa was no exception. Each side offered money, weapons, and support to leaders who would take its side, which sometimes propped up poor leaders or fueled conflicts that might otherwise have cooled. African nations were rarely the cause of these rivalries, but they often felt the effects." },
      { t: "p", html: "Yet Africans also built remarkable things in these decades. They created pan-African cooperation, where nations work together rather than alone — today the <b>African Union</b> unites the entire continent's countries to tackle shared problems. Cities grew rapidly, universities trained new generations of doctors and engineers, and proud cultural identities flourished in music, literature, and art. Many countries found their footing, and across the continent ordinary people built schools, businesses, and communities through patient, determined effort." },
      { t: "scenario", title: "You lead a brand-new nation", prompt: "Your country just became independent. You have limited money. What do you invest in first?",
        opts: [
          { label: "Schools and education", tag: "Long-term win", outcome: "Educating people builds doctors, engineers, and leaders for the future — many successful nations chose this." },
          { label: "A big new palace", tag: "Risky", outcome: "Spending on show instead of people rarely helps a young nation grow." },
          { label: "Roads and electricity", tag: "Also smart", outcome: "Infrastructure connects people to jobs and markets — a strong foundation for growth." },
        ] },
      { t: "fact", html: "The <b>African Union</b>, formed in 2002, brings together 55 member states — a bit like Africa's own version of the European Union. Its headquarters in Addis Ababa, Ethiopia, is where leaders from across the continent meet to plan a shared future." },
      { t: "fact", html: "Did you know there is no single “Africa” that is all the same? The continent is home to <b>54 countries</b> and well over a thousand different languages — which is part of why building cooperation between them is such an impressive achievement." },
      { t: "guide", html: "Here's a thinking tool worth keeping: when you judge any choice — a leader's, a country's, even your own — ask whether it helps in the <i>short term</i>, the <i>long term</i>, or both. A big palace might impress people today, but a school quietly builds the doctors and inventors of tomorrow. The wisest leaders, like the wisest planners anywhere, learn to invest in the future even when the rewards are slow to arrive." },
      { t: "modern", html: "Nation-building is slow, difficult work, and it is still going on across the continent right now. Understanding these challenges — the hurried departures, the borrowed borders, the Cold War pressures — helps explain both the struggles and the genuine successes you see in Africa today. The countries that invested patiently in their people are very often the ones now rising fastest." },
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
      { t: "lead", html: "Africa today is bursting with energy and possibility. It has the world's <b>youngest population</b> — across the continent, most people are under the age of 25 — and it is home to several of the fastest-growing economies anywhere on Earth. A young population matters enormously, because young people are the inventors, builders, teachers, and dreamers of the decades to come. Where other parts of the world are growing older, Africa is just getting started." },
      { t: "p", html: "One of the most exciting things happening is what experts call <b>leapfrogging</b> — skipping straight past an old technology to a newer one. Just as some countries went from no telephones at all directly to mobile phones, many Africans never bothered with landlines and went straight to cellphones. Because so many people had phones but lived far from any bank, African innovators invented <b>mobile money</b> — paying and saving with your phone — before most of the wealthy world had even thought of it. Kenya's famous <b>M-Pesa</b> system let millions of people send money, run businesses, and save safely without ever setting foot in a bank, and the idea has since spread around the globe." },
      { t: "p", html: "Real challenges certainly remain, and pretending otherwise would not be honest — poverty, the effects of climate change, and inequality are serious problems. But the people best placed to solve them are African innovators, scientists, artists, and entrepreneurs, and they are already hard at work. At the same time, African culture is sweeping across the planet: <b>Afrobeats</b> music tops charts on every continent, Nigeria's film industry pours out thousands of movies, and African fashion and design shape global style. Far from being shut out of world culture, Africa is increasingly helping to lead it." },
      { t: "scene", art: "globe", caption: "A young, fast-growing Africa is shaping the global future." },
      { t: "fact", html: "<b>Nigeria's “Nollywood”</b> is one of the largest film industries in the world by the number of movies made each year — producing more films than Hollywood does! Its movies are watched and loved across Africa and far beyond." },
      { t: "fact", html: "Some of the world's largest renewable-energy projects are being built in Africa — from vast solar farms in the Sahara's sunshine to wind farms by Kenya's Lake Turkana — because the continent's young, growing cities are choosing clean power as they build for the future." },
      { t: "modern", html: "By 2050, demographers expect that roughly <b>one in four people on Earth</b> will be African — a staggering share of all humanity. The continent's energy, youth, and creativity mean that the choices made in African cities, classrooms, and laboratories will help shape everyone's future, everywhere. Africa's story began with the very first humans, and today it is still being written — boldly, and at last on its own terms, by its own people." },
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
      { t: "lead", html: "The Americas were never empty. For thousands of years before any European set foot here, millions of people lived across these two continents, and they were anything but “primitive.” They built advanced civilizations with their own sciences, religions, art styles, trade networks, and cities — some of them larger and more sophisticated than the great cities of Europe at the same moment in history." },
      { t: "p", html: "The <b>Maya</b>, who flourished in what is now southern Mexico and Central America, were among the finest mathematicians and astronomers of the ancient world. They independently developed the concept of <b>zero</b> — a breakthrough that many cultures never made at all — and used it to perform complex calculations. Because they tracked the movements of the Sun, Moon, and planets so carefully, their calendar was astonishingly accurate, and they also created a complete writing system of carved symbols called <i>glyphs</i>." },
      { t: "p", html: "Several centuries later, the <b>Aztecs</b> built a stunning capital called <b>Tenochtitlan</b> on an island in the middle of a lake. To connect it to the mainland they engineered long raised roads called <i>causeways</i>, and to feed their growing population they invented floating farm plots called <i>chinampas</i> that produced food right on the water. Towering temple-pyramids rose above the rooftops. When Spanish soldiers first saw it, they could scarcely believe their eyes — it was cleaner, better organized, and larger than most cities back home. Today that same place is <b>Mexico City</b>, one of the biggest cities on Earth." },
      { t: "scene", art: "aztec", caption: "Step pyramids towered over Aztec and Maya cities." },
      { t: "p", html: "High in the Andes Mountains of South America, the <b>Inca</b> ruled the largest empire in the Americas, stretching for thousands of miles down the western edge of the continent. To hold such a vast realm together, they built an incredible network of <b>stone roads</b> — over 20,000 miles of them — complete with rope suspension bridges across deep canyons and relay runners who could carry a message hundreds of miles in a single day. Their most famous city, the mountaintop citadel of <b>Machu Picchu</b>, was constructed from enormous stones fitted so tightly that a knife blade cannot slip between them — and the Inca did it all <b>without iron tools, without the wheel for transport, and without a written alphabet</b>." },
      { t: "hotmap", map: "americas", title: "Three great civilizations", sub: "Tap to explore each one.",
        spots: [
          { x: 130, y: 80, label: "The Maya", text: "Central America: masters of astronomy, math (zero!), and writing." },
          { x: 120, y: 95, label: "The Aztecs", text: "Mexico: built Tenochtitlan, a huge city on a lake — now Mexico City." },
          { x: 150, y: 175, label: "The Inca", text: "The Andes: a vast empire linked by stone roads, builders of Machu Picchu." },
        ] },
      { t: "p", html: "How did these civilizations grow so large? A big part of the answer is <b>farming</b>. Because Indigenous farmers learned to grow reliable, nourishing crops — especially <b>corn (maize)</b> — they could feed dense populations, which freed many people to become priests, builders, astronomers, and artists rather than spending every hour searching for food. A steady food supply, in other words, made great cities possible." },
      { t: "fact", html: "The Inca recorded information using <b>knotted strings</b> called <i>quipu</i> instead of writing — the color, position, and type of each knot stood for numbers and records. It was a clever code that scholars are still decoding today." },
      { t: "guide", html: "Whooo — here's how I like to remember them: <b>M</b>aya for <b>M</b>ath, the <b>A</b>ztecs for their <b>A</b>mazing lake-city, and the <b>I</b>nca for their <b>I</b>ncredible mountain roads. Three peoples, three superpowers!" },
      { t: "modern", html: "These civilizations still shape your daily life in a way you might not expect: foods the whole world now loves — <b>chocolate, corn, potatoes, tomatoes, vanilla, and chili peppers</b> — were all first grown by these Indigenous peoples and existed <i>nowhere else</i> until 1492. Imagine pizza without tomato sauce, French fries without potatoes, or a candy aisle without chocolate. And millions of people today still speak Indigenous languages and proudly carry on these ancient cultures." },
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
      { t: "lead", html: "In 1492, an Italian navigator named <b>Christopher Columbus</b> convinced the king and queen of Spain to fund a daring gamble: instead of sailing <i>around</i> Africa to reach the rich markets of Asia, he would sail straight <i>west</i> across the open Atlantic. After weeks at sea, his three small ships reached islands in the Caribbean. Columbus was certain he had landed near Asia — but he was wrong by an entire ocean and two whole continents. He had stumbled onto lands that Europeans had no idea existed." },
      { t: "p", html: "Because that crossing succeeded, it began huge and <b>permanent</b> contact between the <b>Old World</b> (Europe, Asia, and Africa) and the <b>New World</b> (the Americas) — two halves of the planet that had developed completely separately for thousands of years. News of the new lands spread fast, and Spanish and Portuguese explorers and soldiers, called <b>conquistadors</b> (Spanish for “conquerors”), soon followed in search of gold, glory, and land to claim." },
      { t: "p", html: "Astonishingly, small bands of just a few hundred conquistadors managed to topple the mighty Aztec and Inca empires, each of which had millions of people. How was that even possible? Steel armor, guns, and horses gave the invaders an edge, and they were skilled at turning rival peoples into allies. But by far the biggest factor was <b>disease</b>. Europeans unknowingly carried germs — especially <b>smallpox</b> — that Indigenous peoples had never been exposed to and had no resistance to. Because the illnesses were entirely new to them, they spread with terrible speed and killed a tragic number of people, weakening the great empires before many battles were even fought." },
      { t: "scene", art: "ship", caption: "European ships brought explorers, settlers — and devastating diseases." },
      { t: "p", html: "Historians call the enormous two-way swap of plants, animals, people, and diseases between the hemispheres the <b>Columbian Exchange</b>. Heading west to the Americas came horses, cattle, pigs, wheat, and sugar; heading east to the rest of the world came corn, potatoes, tomatoes, and chocolate. This exchange reshaped what people everywhere ate and how they farmed — the potato, for instance, became so important to Europe that it helped its population grow for centuries afterward." },
      { t: "fact", html: "Before Europeans arrived, there were <b>no horses</b> in the Americas at all! The famous horse-riding cultures of the Great Plains — peoples like the Lakota and Comanche — developed their skill <i>only after</i> Spanish horses escaped and spread across the land." },
      { t: "p", html: "It is worth being honest about both sides of this story. The meeting of the two worlds connected humanity in lasting ways and shared foods that now feed billions. But it also brought conquest, disease, and the loss of millions of Indigenous lives. Both things are true at once, and understanding that lets us see history clearly rather than as a simple tale of heroes and villains." },
      { t: "modern", html: "The collision of these worlds reshaped the entire planet — for better and for worse — and it set in motion the blending of Indigenous, European, and African peoples and cultures that defines the Americas today. Nearly everything about the modern Americas, from its languages to its foods to its mixed populations, traces back to the moment those two worlds first met." },
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
      { t: "lead", html: "European colonies in the Americas discovered they could grow enormously valuable crops — <b>sugar, cotton, and tobacco</b> — that people across the world wanted to buy. But these crops required back-breaking labor on a massive scale, season after season. Tragically, the colonists chose to meet that need not by paying workers, but by forcing millions of human beings to labor against their will. This is one of the hardest parts of the Americas' story, and it deserves to be understood honestly and with respect for the people who lived through it." },
      { t: "p", html: "As you learned in the Africa section, over <b>12 million enslaved Africans</b> were captured and carried across the Atlantic Ocean in brutal conditions — a forced journey known as the <b>Middle Passage</b>. Most were taken to the sugar plantations of the Caribbean and South America; about 400,000 were brought to what became the United States, where the enslaved population later grew to roughly four million people. Behind every one of those numbers was a real person with a family, a name, and a homeland torn away from them." },
      { t: "p", html: "Enslaved people had no freedom, earned no pay, and could be bought and sold like property — and yet their labor produced much of the early wealth of the Americas. Despite unimaginable hardship, they did far more than survive: they held tight to their humanity, kept their cultures alive, blended African traditions with new surroundings, and passed down music, food, faith, language, and hope from one generation to the next. That resilience, in the face of cruelty, is one of the most powerful stories in all of history." },
      { t: "scene", art: "scroll", caption: "Enslaved people resisted, endured, and shaped the cultures of the Americas." },
      { t: "p", html: "And people fought to end it. Enslaved people resisted in countless ways — slowing work, preserving their traditions, rising up, and risking everything to escape. The <b>Underground Railroad</b>, a secret network of brave guides and safe houses, helped many reach freedom in the northern states and Canada. Meanwhile, <b>abolitionists</b> — people both Black and white who believed slavery was deeply wrong — campaigned tirelessly through speeches, newspapers, and the law. Their long struggle paid off: slavery was abolished across the Americas during the 1800s, last of all in <b>Brazil in 1888</b>." },
      { t: "fact", html: "<b>Harriet Tubman</b> escaped slavery herself, then returned to the South again and again to guide dozens of other people to freedom along the Underground Railroad. She made these dangerous trips knowing that capture could cost her life — and she never lost a single person she led." },
      { t: "guide", html: "Whooo — it can feel heavy to read about slavery, and it should. But notice where the story keeps going: people resisted, people helped, and people fought until it ended. Remembering the courage alongside the cruelty is how we honor everyone who lived through it." },
      { t: "modern", html: "The descendants of enslaved people are central to the cultures, music, food, language, and identity of nations throughout the Americas — from jazz, blues, and hip-hop in the United States to the rhythms of Brazil and the Caribbean. Slavery left deep wounds, and its effects are still felt today, but facing this history honestly — without flinching and without shame — is exactly how people work to build a fairer, more just future for everyone." },
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
      { t: "lead", html: "Remember the Enlightenment — the burst of new thinking in Europe that argued people are born with <b>rights</b>, and that governments exist to serve the people rather than to rule over them? Colonists across the Americas read those ideas, took them seriously, and then did something remarkable: they acted on them. Within a single generation, that one powerful idea helped spark a wave of revolutions that swept across two whole continents." },
      { t: "p", html: "It began in the north. In <b>1776</b>, thirteen British colonies grew tired of being taxed and governed by a king an ocean away, and they declared their independence, forming the <b>United States of America</b>. After a long and difficult war against one of the most powerful empires on Earth, they won. Then they did something even rarer than winning: instead of crowning a new king, they wrote a <b>Constitution</b> — a written plan of government with elected leaders, divided powers, and rules meant to prevent any one person from gaining too much control. It was a bold experiment in self-rule." },
      { t: "p", html: "Because the American example proved that ordinary people <i>could</i> defeat an empire and govern themselves, the idea spread rapidly southward. The great general <b>Simón Bolívar</b> — nicknamed “The Liberator” — led armies that freed much of South America from Spanish rule, dreaming of uniting the freed lands into a single grand republic. By the 1820s, most of Latin America had won independence, giving birth to nations like Colombia, Venezuela, Peru, and <b>Bolivia</b>, which was named in Bolívar's honor." },
      { t: "order", title: "The age of revolutions", sub: "Order these, earliest to latest.",
        items: [
          { yr: "1776", label: "US Declaration of Independence" },
          { yr: "1804", label: "Haiti — first nation freed by enslaved people" },
          { yr: "1810s–20s", label: "Bolívar frees much of South America" },
          { yr: "1821", label: "Mexico wins independence from Spain" },
        ] },
      { t: "p", html: "Not every new nation lived up to its grand promises right away. The United States declared that “all men are created equal,” yet slavery continued for nearly another century, and Indigenous peoples and women were left out of the new freedoms. The young Latin American republics, too, often struggled with poverty and power struggles. The Enlightenment ideals were planted in this era — but living up to them fully would take many more generations of hard work." },
      { t: "fact", html: "<b>Haiti</b> made history in 1804 as the first country in the world born from a successful revolution <i>of enslaved people themselves</i>. They rose up and defeated the army of Napoleon — one of the strongest military forces on the planet at the time — to win both their freedom and their nation." },
      { t: "guide", html: "Whooo — here's the big idea to carry with you: one inspiring success can light a fire across the whole world. The American Revolution sparked Haiti, which sparked Bolívar, which sparked still more. Ideas, it turns out, can travel even faster than armies." },
      { t: "modern", html: "Most nations in the Americas — from Canada to Argentina — trace their independence and their forms of government back to this electric age of revolutions. The Enlightenment idea that people should rule themselves reshaped two entire continents, and it remains the foundation of how most of the Americas are governed today." },
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
      { t: "lead", html: "Through the 1800s, the young United States expanded westward at a breathtaking pace, eventually stretching all the way from the Atlantic to the Pacific Ocean. The promise of cheap farmland, the building of railroads, and the famous <b>California Gold Rush</b> of 1849 drew millions of settlers west in search of a better life. But this expansion had a painful and unjust side: as settlers pushed across the continent, the government forced many <b>Native American nations</b> off the lands they had lived on for countless generations." },
      { t: "p", html: "These removals were often heartbreaking. One of the most infamous, the <b>Trail of Tears</b>, forced thousands of Cherokee and other peoples to march hundreds of miles from their homelands, and many died along the way. Yet Native nations did not vanish — they resisted, adapted, and endured. Today their descendants continue to preserve their languages, traditions, and identities, and their history is honored as a vital part of the American story." },
      { t: "p", html: "Meanwhile, one enormous question was tearing the country apart from the inside: should <b>slavery</b> be allowed to spread into the new western states? The Northern states, where factories and free labor were growing, increasingly opposed it; the Southern economy, built on plantation crops like cotton, depended on it. Because neither side would give way, the disagreement grew sharper and angrier year after year — until it finally broke into open war." },
      { t: "p", html: "The <b>Civil War</b> (1861–1865) became the deadliest war in all of US history, with Americans fighting fellow Americans on a terrible scale. President <b>Abraham Lincoln</b> led the Union (the North) and was determined both to keep the country from splitting apart and to confront slavery. In the middle of the war he issued the <b>Emancipation Proclamation</b>, declaring enslaved people in the rebelling states to be free — a crucial step on the road to ending slavery for good." },
      { t: "scene", art: "star", caption: "The Civil War decided whether the United States would stay united — and free." },
      { t: "p", html: "In the end the North won, the country stayed united as one nation, and slavery was abolished throughout the United States in <b>1865</b>. That was a momentous victory — but it was not the finish line. The long, hard work of winning <i>true</i> equal rights for formerly enslaved people and their descendants was only beginning, and it would continue across many generations to come." },
      { t: "fact", html: "The <b>transcontinental railroad</b>, completed in 1869, let people cross the entire United States in about a week — a journey that used to take four to six grueling months by covered wagon. Much of the brutal track-laying work was done by Chinese and Irish immigrant laborers." },
      { t: "guide", html: "Whooo — notice how a single era can hold triumph and tragedy side by side: a nation reuniting and ending slavery, while also displacing the people who had lived on the land first. Real history is rarely all good or all bad — and understanding both is what makes you a true scholar." },
      { t: "modern", html: "The Civil War permanently settled that the United States would remain a single nation, and one without slavery. But the struggle for equal rights that it set in motion carried on into the <b>Civil Rights Movement</b> of the 1900s — when leaders like Dr. Martin Luther King Jr. pressed the country to live up to its founding promise of equality — and it continues to shape America to this very day." },
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
      { t: "lead", html: "When the Industrial Revolution crossed the Atlantic and reached the Americas, it changed everything almost overnight. Factories sprang up by the thousands, machines began producing goods at speeds no human hand could match, and cities exploded in size. All of this growth created an enormous hunger for workers — and the world answered that call in one of the greatest movements of people in human history." },
      { t: "p", html: "Between about 1880 and 1920, tens of millions of <b>immigrants</b> poured into the Americas from Europe, Asia, the Middle East, and beyond, chasing jobs, freedom, and the dream of a better life for their children. In the United States, countless newcomers caught their very first glimpse of their new home as their ships sailed into New York harbor, past the towering <b>Statue of Liberty</b>, before they landed at the immigration station on <b>Ellis Island</b> to begin their American lives." },
      { t: "scene", art: "factory", caption: "Booming factories drew immigrants to growing cities." },
      { t: "compare", title: "Why people came — and what they found",
        a: { title: "Reasons to leave home", items: ["Poverty or hunger", "Escaping war or unfair treatment", "Dreams of a better life"] },
        b: { title: "Life in the new world", items: ["Hard factory jobs, long hours", "Crowded city neighborhoods", "But: opportunity and freedom", "Building diverse, mixed communities"] } },
      { t: "p", html: "Why did so many leave everything behind? For most, the pull was a simple but powerful hope: that hard work could buy a future for their families that was impossible back home, where poverty, hunger, or unfair treatment had closed every door. The reality they met was rarely easy. Newcomers often took dangerous, low-paying factory jobs, crowded into tight city neighborhoods, and frequently faced prejudice from people who had arrived only a generation or two earlier themselves." },
      { t: "p", html: "But over the years and generations, something extraordinary grew out of all that struggle. Because so many different peoples settled side by side, sharing foods, languages, music, and ideas, the great mixing created some of the most diverse societies on Earth — especially in the United States, Canada, Brazil, and Argentina. Out of many separate streams of people, new and richly blended cultures were born." },
      { t: "fact", html: "So many people passed through New York's <b>Ellis Island</b> during these decades that around <b>40% of Americans today</b> can trace at least one ancestor who first set foot in the country there." },
      { t: "guide", html: "Whooo — here's a thought to chew on: nearly every family in the Americas has an immigration story somewhere in its past, even if it happened long ago. Ask the grown-ups in your life where <i>your</i> family first came from — you might uncover an adventure!" },
      { t: "modern", html: "The food on our plates, the music in our headphones, the words in our slang, and the holidays we celebrate across the Americas all flow from this incredible blend of peoples. The very idea of a nation built and renewed by immigrants — strangers from everywhere becoming neighbors — sits at the heart of American identity to this day." },
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
      { t: "lead", html: "The 1900s transformed the place of the Americas in the world. After helping to win two enormous world wars, the <b>United States</b> emerged as one of the planet's two great <b>superpowers</b>, locked in a decades-long rivalry called the <b>Cold War</b> with the Soviet Union (the USSR). It was a contest fought not mainly with armies, but with science, ideas, spying, and the race to build the strongest economy — and it pushed the United States to become a global leader in technology, business, and culture." },
      { t: "p", html: "That competition fueled astonishing achievements. The US poured resources into research and won the “Space Race” by landing the first humans on the <b>Moon in 1969</b> — a feat people watching on television could scarcely believe. American laboratories and companies also helped invent much of the modern world, including the <b>internet</b> you use every day. Meanwhile, American movies from Hollywood, music styles like rock and hip-hop, and brands of all kinds spread to nearly every corner of the globe." },
      { t: "p", html: "The rest of the Americas was changing dramatically too. Several Latin American nations passed through difficult years of dictatorship and Cold War struggle before moving, often peacefully, toward democracy. Because their economies and populations grew so large, <b>Brazil</b> and <b>Mexico</b> became major powers in their own right. And the region's vibrant culture — soccer (the world's favorite sport), salsa and samba music, and the dazzling carnival festivals — delighted and influenced people everywhere." },
      { t: "p", html: "The nations of the Americas also learned that some challenges are too big to face alone. They signed <b>trade agreements</b> to do business more easily across borders, worked together to protect the irreplaceable <b>Amazon rainforest</b> — often called the “lungs of the planet” — and built cultural connections that link people from Canada all the way to the tip of Chile. Cooperation, not just competition, became part of the story." },
      { t: "fact", html: "The <b>Amazon rainforest</b>, most of which lies in Brazil, produces a huge share of Earth's oxygen and is home to more kinds of plants and animals than almost anywhere else on the planet — scientists are still discovering brand-new species there every single year." },
      { t: "guide", html: "Whooo — step back and look at the whole journey: from ancient pyramid-builders to Moon-walkers, from empires that fell to nations that rose, the Americas packed thousands of years of dramatic change into one connected story. And you just learned all of it!" },
      { t: "modern", html: "From Hollywood to the Amazon, from space rockets to soccer stadiums, the modern Americas help shape global culture, technology, and the future of the environment. Two great continents, dozens of proud nations, and one remarkable, connected story — still being written today, with the next chapters waiting for your generation to add." },
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
      { t: "lead", html: "Between two great rivers — the <b>Tigris</b> and the <b>Euphrates</b> — lay <b>Mesopotamia</b>, a name that means “land between rivers,” in what is today the country of Iraq. The rivers flooded each year and left behind rich, fertile soil, so farmers could grow more grain than their own families needed. That surplus was the spark for everything: when a community can feed people who are <i>not</i> farming, some of them become builders, priests, soldiers, traders, and record-keepers instead. Out of that division of work, humans first built true <b>cities</b> here, more than 5,000 years ago." },
      { t: "p", html: "The people called the <b>Sumerians</b> invented <b>writing</b> around 3200 BC — a script called <b>cuneiform</b>, made by pressing a reed stylus into soft clay to leave little wedge-shaped marks. At first they used it for something very practical: keeping track of who owned how much grain and how many goats. But once you can write down a number, you can write down a name, a promise, a prayer, and a story. Writing let humans record laws, contracts, history, and ideas for the very first time — and it is precisely <i>because</i> they wrote on near-indestructible clay that we can still read their words today. (That is, quite literally, how we even know about them!)" },
      { t: "scene", art: "scroll", caption: "Cuneiform, pressed into clay, was the world's first writing." },
      { t: "p", html: "These early peoples gave us an astonishing string of firsts: the <b>wheel</b>, the plow, the sailboat, and a system of math built around the number 60 (which is exactly why we still have 60 minutes in an hour and 360 degrees in a circle!). They also produced the first great written <b>laws</b> — the famous <b>Code of Hammurabi</b>, carved into a tall stone pillar so that everyone could see that the same rules applied to all. Later, the mighty <b>Persian Empire</b> rose nearby and stitched its enormous realm together with paved royal roads and one of history's first postal systems, so that a message could travel hundreds of miles in days rather than weeks." },
      { t: "p", html: "Why did so many “firsts” cluster in this one corner of the world? Because the rivers created the food surplus, and the surplus created cities, and cities packed thousands of people together where ideas could collide and combine. A merchant needed to count goods, so counting improved; a king needed to settle arguments fairly, so written law appeared; a temple needed to predict the flood season, so astronomy and the calendar advanced. Each invention made the next one possible — a chain reaction of human cleverness." },
      { t: "hotmap", map: "mideast", title: "Where it all began", sub: "Tap to explore the cradle of civilization.",
        spots: [
          { x: 200, y: 130, label: "Mesopotamia", text: "Land between the Tigris and Euphrates rivers — home of the first cities." },
          { x: 150, y: 110, label: "Sumer", text: "Where writing (cuneiform) and the wheel were invented." },
          { x: 270, y: 120, label: "Persia", text: "A vast empire with great roads and an early postal system." },
        ] },
      { t: "fact", html: "Next time you check a clock, thank the ancient Mesopotamians — our 60-minute hour and 60-second minute come from their counting system based on 60!" },
      { t: "fact", html: "One Sumerian poem, the <b>Epic of Gilgamesh</b>, is the oldest great story we have — written down more than 4,000 years ago, long before the tales of ancient Greece. People have been telling epic adventures for a very, very long time." },
      { t: "guide", html: "Notice the pattern, young scholar: a surplus of food freed people to think, and thinking gave us writing, law, and the wheel. Whenever you see a great leap forward in history, look first for what gave people the time and safety to make it." },
      { t: "modern", html: "Cities, writing, written laws, the wheel, the way we measure time — the foundations of civilization itself were laid here. The keyboard you type on is a distant grandchild of cuneiform, and the clock on your wall still keeps Mesopotamian time. Everything else in this app, and much of the modern world, builds on what started in the Middle East." },
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
      { t: "lead", html: "Three of the world's most followed religions — <b>Judaism, Christianity, and Islam</b> — all began in the Middle East, within a few hundred miles of one another. Scholars call them the <b>Abrahamic religions</b>, because all three trace themselves back to the same ancient figure, Abraham. They share deep historical roots, some of the same early stories, and many of the same prophets, even as they grew into distinct faiths with their own beliefs and practices." },
      { t: "p", html: "<b>Judaism</b> is one of the oldest, with a history stretching back thousands of years and built around a single God and a sacred set of teachings. <b>Christianity</b> began about 2,000 years ago with the life and teachings of <b>Jesus</b>, and over the centuries it spread across the entire globe. <b>Islam</b> began in the 600s AD on the Arabian Peninsula with the Prophet <b>Muhammad</b>, and it spread with remarkable speed — within roughly a century its influence reached from Spain in the west to the borders of India in the east." },
      { t: "p", html: "The city of <b>Jerusalem</b> is holy to all three religions at once, which is part of why it has been one of the most cherished — and most contested — cities on Earth throughout history. When a single place matters enormously to many different peoples, it can become both a meeting point and a source of disagreement. That shared sacredness is something to understand thoughtfully and treat with real respect." },
      { t: "scene", art: "scroll", caption: "Scholars in Baghdad preserved and advanced human knowledge." },
      { t: "p", html: "From roughly the 700s to the 1200s, the Islamic world enjoyed what historians call a <b>Golden Age</b> of learning. In <b>Baghdad's “House of Wisdom,”</b> scholars from many backgrounds gathered to advance <b>algebra</b>, astronomy, and medicine, and to translate the great works of ancient Greece, India, and Persia into Arabic. This mattered enormously: during these same centuries, much of Europe had lost or forgotten that older knowledge. Because Muslim scholars carefully copied, corrected, and built upon it, that learning survived — and centuries later it flowed <i>back</i> into Europe, helping to spark the Renaissance. In other words, the books your school is built on took a long detour through Baghdad." },
      { t: "p", html: "It was not only preservation; it was genuine invention. A mathematician named <b>al-Khwarizmi</b> wrote a book whose very title gave us the word “algebra,” and whose Latinized name gave us the word “algorithm” — the step-by-step logic that powers every computer and app today. Doctors wrote medical encyclopedias used in universities for hundreds of years, and astronomers mapped the stars so precisely that some of their star names are still the ones we use." },
      { t: "fact", html: "Words like <b>algebra, algorithm, chemistry, and even “check” (as in chess and banking)</b> came into English from Arabic — a sign of how much the Islamic Golden Age shaped science and math." },
      { t: "fact", html: "Look up at the night sky and you are reading Arabic: stars such as <b>Aldebaran, Altair, and Betelgeuse</b> carry names given by Golden-Age astronomers more than a thousand years ago." },
      { t: "guide", html: "Here is a lesson worth keeping: knowledge does not belong to any one people. It is borrowed, translated, improved, and passed along like a torch from hand to hand. The Greeks lit it, the Islamic world carried it, Europe later ran with it — and now it is your turn to hold it carefully." },
      { t: "modern", html: "Billions of people today follow religions that began here, and Jerusalem remains sacred to all three. And the math and science you study — especially algebra and the algorithms inside every device you own — were preserved and advanced in this region's golden age. When you solve for <i>x</i>, you are using a tool first sharpened in Baghdad." },
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
      { t: "lead", html: "You met the Ottoman Empire back in the Asia section. For roughly 600 years it ruled most of the Middle East, North Africa, and southeastern Europe — a genuine superpower whose capital, Istanbul, sat at the crossroads of three continents. At its height it controlled the great trade routes that carried silk, spices, and gold between East and West, and that control was a huge source of its wealth and power." },
      { t: "p", html: "But by the 1800s, the empire was struggling to keep up. The reason was a profound shift happening elsewhere: the <b>Industrial Revolution</b> had transformed Western Europe, giving Britain, France, and others steam-powered factories, railroads, and modern weapons. Because the Ottomans had not industrialized at the same pace, they fell behind in both money and military strength — and outsiders began, somewhat unkindly, to call the empire “the sick man of Europe.” As it weakened, European powers grew increasingly interested in the region's strategic location, its trade routes, and its potential riches." },
      { t: "p", html: "A pivotal moment came in <b>1869</b>: the <b>Suez Canal</b> opened in Egypt, a man-made waterway slicing through the desert to connect the Mediterranean Sea directly to the Red Sea. The effect was dramatic. Before the canal, a ship sailing from Britain to India had to travel all the way around the southern tip of Africa — a journey of many extra thousands of miles. Suddenly that voyage could be cut nearly in half. Because the canal made the region the fastest gateway between Europe and Asia, whoever controlled it held a key to global trade, and European powers wanted that key badly." },
      { t: "scene", art: "ship", caption: "The Suez Canal made the Middle East a vital global crossroads." },
      { t: "p", html: "Everything came to a head with <b>World War I</b> (1914–1918). The Ottomans entered the war on the side that ultimately lost, and when the fighting ended, their exhausted empire — already weakened for a century — finally collapsed entirely. Suddenly an enormous expanse of land, stretching across much of the modern Middle East, had no ruler. The victorious European powers stepped in to help redraw the entire map of the region. Those decisions, made far away by people who often did not live there, would shape the borders and the tensions of the Middle East for the next hundred years — which is exactly the story of our next lesson." },
      { t: "fact", html: "The Suez Canal is still one of the world's most important waterways — about <b>12% of all global trade</b> passes through it. When a giant ship got stuck there in 2021, it jammed world trade for days!" },
      { t: "fact", html: "Digging the Suez Canal took about <b>ten years</b> and the labor of hundreds of thousands of workers. When it opened in 1869, it was one of the largest engineering projects humanity had ever attempted." },
      { t: "guide", html: "Watch how geography becomes power, my friend. A narrow strip of water or a single mountain pass can decide the fate of empires. Whenever a place sits on the road between two great regions, expect the powerful to compete fiercely to control it." },
      { t: "modern", html: "Control of key waterways and trade routes still makes the Middle East globally important today. The Suez Canal you might see in the news is the same one opened in 1869 — and the 2021 traffic jam there proved that a single chokepoint can still ripple across the whole world's economy in a matter of days." },
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
      { t: "lead", html: "When the Ottoman Empire collapsed after World War I, its vast lands were suddenly without a ruler, and the victorious powers — mainly <b>Britain and France</b> — took on the job of deciding what came next. Working largely in distant meeting rooms, they divided the region into new territories that they would administer and guide. Some of these arrangements were sketched out even before the war ended, in secret agreements between the European powers, which is why so many people in the region later felt the decisions had been made <i>about</i> them rather than <i>by</i> them." },
      { t: "p", html: "From those lines on the map emerged many of today's countries — including <b>Iraq, Syria, Jordan, and Lebanon</b>. Just as had happened in Africa, the borders were sometimes drawn as remarkably straight lines across the desert, following the convenience of mapmakers rather than the reality on the ground. Because those borders frequently cut through or lumped together different ethnic groups, religions, and tribes who did not all see themselves as one people, the new countries often began with built-in tensions — groups who suddenly found themselves sharing a nation, or split apart from relatives across a new frontier." },
      { t: "p", html: "Over the following decades, these territories shed outside control and became fully independent nations. Some became <b>kingdoms</b> ruled by royal families, others became <b>republics</b> with presidents, and each charted its own path through the twentieth century. But the combination of a rich mix of peoples and faiths, brand-new borders that few had chosen, and the sudden wealth that oil would soon bring made for a complicated and sometimes turbulent start. Understanding this origin story is the single most useful key to making sense of the region's modern history." },
      { t: "compare", title: "Old empire vs. new map",
        a: { title: "Before WWI", items: ["One big Ottoman Empire", "Ruled from Istanbul", "Few internal borders"] },
        b: { title: "After WWI", items: ["Many separate territories", "Borders drawn by outsiders", "New nations like Iraq, Syria, Jordan", "A patchwork of peoples and faiths"] } },
      { t: "fact", html: "Some Middle Eastern countries are younger than your great-grandparents — created in the 1900s from the pieces of the Ottoman Empire." },
      { t: "fact", html: "The border between several Middle Eastern countries runs in such a long, near-perfect straight line through the desert that it is sometimes nicknamed “<b>Winston's Hiccup</b>,” after the British official said to have drawn it." },
      { t: "guide", html: "A wise traveler reads borders carefully. A line on a map is not a fact of nature — it is a human decision, made by someone, at some moment, for some reason. Ask who drew it and why, and a tangled history begins to make sense." },
      { t: "modern", html: "Many of the region's modern challenges — and nearly all of its borders — trace directly back to decisions made in the years right after World War I. When you see a headline about a conflict or a boundary dispute in the Middle East, you are very often looking at the long echo of a map drawn a century ago. History, once again, helps explain today's news." },
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
      { t: "lead", html: "In the early 1900s, geologists discovered something extraordinary beneath the sands of the Middle East: huge underground reserves of <b>oil</b>, the fuel of the modern age. The timing could hardly have been more important. Just as cars, airplanes, ships, and factories around the world were converting to run on oil and gasoline, the planet realized that an enormous share of that precious resource lay beneath this one region. Almost overnight, places that outsiders had once overlooked became some of the most important real estate on Earth." },
      { t: "p", html: "Countries such as <b>Saudi Arabia, Iran, Iraq, and Kuwait</b> turned out to be sitting on truly colossal oil supplies. Selling that oil to the rest of the world brought in staggering wealth. Because that money arrived so quickly and in such vast amounts, it transformed several nations almost beyond recognition — turning quiet desert kingdoms and pearl-fishing towns into modern, gleaming cities full of skyscrapers, highways, airports, and universities within the span of a single human lifetime." },
      { t: "scene", art: "oil", caption: "Oil turned parts of the Middle East into global economic powers." },
      { t: "p", html: "But wealth this important always attracts attention. Because the entire world depends on oil to keep moving, the Middle East became a permanent focus of global attention — and, at times, of intense competition and even conflict between powerful nations all hoping to secure a steady supply. Decisions made in the region could send the price of fuel up or down on the other side of the planet, which is one reason so many distant countries take such a keen interest in what happens here." },
      { t: "p", html: "The region is also home to long-running disagreements, including over the land where the state of <b>Israel</b> was established in <b>1948</b>, near its neighbors. These are sensitive topics that thoughtful people see very differently — and they remain unresolved today. The kind thing is to learn the facts, listen to all sides, and treat everyone's history with respect." },
      { t: "p", html: "It helps to hold two ideas at once. People on different sides of these questions each carry real histories, deep attachments to the land, and painful memories — and each side's story matters to the people who live it. A careful student does not rush to declare one group entirely right and another entirely wrong. Instead, the wise approach is to gather accurate facts from many sources, listen patiently and respectfully to how different people describe their own experience, and remember that behind every headline are ordinary families simply hoping for safety, dignity, and a peaceful future. That spirit of humble, respectful curiosity is exactly what we practice in this app." },
      { t: "fact", html: "Dubai, in the United Arab Emirates, used its oil wealth to build the world's <b>tallest building</b> (the Burj Khalifa) and grew from a small trading town into a futuristic city in just a few decades." },
      { t: "fact", html: "Knowing that oil will not last forever, several oil-rich nations have set aside enormous savings funds and are pouring money into tourism, technology, and clean energy — planning today for a future <i>after</i> oil." },
      { t: "guide", html: "When a subject is tender and people disagree deeply, the bravest thing you can do is slow down. Learn before you judge, listen before you speak, and treat every person's history as something precious. Understanding is not the same as taking a side — and it is almost always the wiser path." },
      { t: "modern", html: "Every time a car fills up or a plane takes off, it connects to the Middle East's oil. The region's resources, its location at the crossroads of the world, and its unresolved disagreements keep it at the center of world affairs — which is exactly why it appears in the news so often, and why understanding it carefully is so valuable." },
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
      { t: "lead", html: "The modern Middle East is, above all, a region of striking contrasts. In the very same week, a visitor might walk through ruins that are thousands of years old and then ride an elevator up one of the world's newest, most futuristic skyscrapers. Ancient bazaars sit a short drive from gleaming shopping malls and high-tech research labs. To understand the region today, you have to be comfortable holding the very old and the very new in your mind at the same time." },
      { t: "p", html: "There are real and serious challenges. Some areas have endured conflict and difficult times, and many countries are working hard to build stable governments, strong economies, and good lives for their citizens. One of the region's most important features is its strikingly <b>young population</b> — in many Middle Eastern countries, a large share of people are under the age of 30. That youthfulness is a kind of fuel: it means enormous energy, ambition, and creativity, but it also means these nations must create vast numbers of schools, universities, and jobs to give all those young people a bright future. How well they meet that challenge will shape the region for decades." },
      { t: "p", html: "And there is genuinely exciting change underway. Knowing that oil will not power the world forever, many countries are deliberately investing <i>beyond</i> oil — in tourism, technology, finance, sports, and renewable energy like solar power, which the sun-drenched deserts can produce in abundance. <b>Qatar</b> hosted the soccer World Cup in 2022, drawing fans from every corner of the globe; the <b>UAE</b> sent a spacecraft all the way to Mars; and cities like Dubai and Riyadh have grown into major global business hubs where companies from around the world set up shop." },
      { t: "scene", art: "globe", caption: "The Middle East blends ancient roots with a fast-changing future." },
      { t: "p", html: "Why does all of this matter to you, far away? Because the Middle East sits at the literal crossroads of three continents and supplies energy that the whole planet relies on, what happens there ripples outward to affect prices, politics, and daily life almost everywhere else. Following the region's news with an open, fair-minded, and curious attitude is one of the best ways to understand the wider world you are growing up in." },
      { t: "fact", html: "The <b>United Arab Emirates' “Hope” probe</b> reached Mars in 2021, making it one of only a handful of nations or groups ever to successfully send a mission to the Red Planet." },
      { t: "fact", html: "Several Middle Eastern cities are building enormous <b>solar farms</b> in the desert, betting that abundant sunshine can become the oil of the future — clean energy sold to power homes far beyond their borders." },
      { t: "guide", html: "A region, like a person, is never just one thing. The Middle East is ancient and futuristic, troubled and hopeful, all at once. Hold that complexity gently, and you will understand it far better than someone who reaches for a single, simple label." },
      { t: "modern", html: "From the cradle of civilization to missions to Mars, the Middle East's story spans the entire arc of human history — and it is still being written, right now, by its young, ambitious, and remarkably energetic people. To watch the news from this region is, quite genuinely, to watch history being made." },
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
      { t: "lead", html: "<b>Aboriginal Australians</b> have one of the <b>oldest continuous living cultures on Earth</b> — a heritage stretching back more than <b>60,000 years</b>, far older than the pyramids, older than written language itself. For all that time they passed down knowledge, law, geography, and the deep history of their land through art, song, dance, and the sacred stories Europeans came to call the <b>“Dreamtime”</b> — accounts of how the world and its creatures were made." },
      { t: "p", html: "Because there were no books, every fact had to live inside memory and ceremony — and that turned out to be remarkably reliable. Some Aboriginal stories describe coastlines and islands that vanished beneath rising seas at the end of the last Ice Age, more than <b>7,000 years ago</b>. In other words, accurate memories were carried by voice across hundreds of generations, which is one of the most astonishing feats of human memory ever recorded." },
      { t: "scene", art: "boomerang", caption: "The boomerang is one of humanity's oldest tools — and it still works!" },
      { t: "p", html: "Far across the vast Pacific, a different people earned a different kind of fame. The <b>Polynesians</b> were perhaps history's greatest explorers. In nothing more than large wooden canoes, with no compasses, no maps, and no engines, they crossed <b>thousands of miles of open ocean</b> to find and settle islands as far apart as Hawaii, New Zealand, and remote Easter Island — a triangle of sea so enormous it could swallow Europe many times over." },
      { t: "p", html: "How could anyone find a speck of land in all that water? They read the <b>stars, ocean swells, winds, cloud shapes, and the flight of seabirds</b> like a living map. A homeward-flying bird at dusk pointed toward land; a certain pattern of waves bouncing off a distant island could be felt in the hull of a canoe long before the island itself appeared. This skill, called <b>wayfinding</b>, took a lifetime to master, and because the knowledge lived only in expert navigators, it nearly disappeared — yet today it is being carefully revived." },
      { t: "guide", html: "Think about it: a Polynesian navigator could be blindfolded and still know which way to steer, just from the rhythm of the swells under the boat. They turned the entire ocean into an instrument they could read." },
      { t: "hotmap", map: "oceania", title: "A world of islands", sub: "Tap to explore the Pacific.",
        spots: [
          { x: 200, y: 130, label: "Australia", text: "Home to Aboriginal peoples for over 60,000 years." },
          { x: 300, y: 70, label: "Polynesia", text: "Voyagers settled islands from Hawaii to Easter Island by reading the stars." },
          { x: 90, y: 170, label: "Open Pacific", text: "The world's largest ocean — bigger than all of Earth's land combined." },
        ] },
      { t: "fact", html: "The Pacific Ocean is so huge it covers about <b>a third of the entire planet</b> — you could fit all the continents inside it with room to spare." },
      { t: "fact", html: "The word <b>“boomerang”</b> comes from an Aboriginal language. Not every boomerang returns when thrown — many were heavy hunting weapons built to fly straight and hard — but the famous returning kind is a genuine masterpiece of aerodynamics, invented long before anyone understood the physics of flight." },
      { t: "p", html: "Because these two stories — Aboriginal Australia and Polynesian voyaging — are so often overlooked, it is worth pausing on what they prove: that human beings mastered their environments brilliantly without any of the technology we take for granted. Memory replaced books; the stars replaced satellites. When we say these were “ancient” cultures, we should not picture them as primitive. They were sophisticated, scientific, and deeply observant of the natural world." },
      { t: "modern", html: "These ancient cultures are very much alive today. Modern navigators have revived traditional wayfinding, crossing thousands of miles of open Pacific the old way — guided only by stars, swells, and birds — to honor and preserve this incredible knowledge and pass it on to a new generation. It still matters because it reminds the whole world that there is more than one way to know a place." },
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
      { t: "lead", html: "For centuries, European mapmakers left a huge blank space at the bottom of the world. They were so certain a vast unknown <b>“southern land”</b> must exist — a continent heavy enough to “balance” the lands of the north — that they even gave it a name before anyone had seen it: <i>Terra Australis</i>, Latin for “southern land.” In the 1700s, Europeans finally crossed the Pacific to find out what was really there." },
      { t: "p", html: "The most famous of these explorers was Britain's <b>Captain James Cook</b>. On three remarkable voyages, he charted the coast of New Zealand, the eastern coast of Australia, and dozens of Pacific islands with an accuracy that astonished other sailors — many of his maps were still in use more than a hundred years later. He sailed with scientists and artists too, so his ships brought home not only charts but detailed drawings of plants, animals, and the peoples he encountered." },
      { t: "scene", art: "ship", caption: "European ships charted the Pacific's islands in the 1700s." },
      { t: "p", html: "It is important to remember that none of these islands were truly “discovered,” because people already lived on them and had navigated these waters for thousands of years. What changed was that the Pacific was now linked to Europe — and that link carried enormous consequences. As had happened in the Americas, European <b>diseases</b> such as measles and smallpox spread to Indigenous peoples who had no immunity, and in some places this caused terrible loss of life. New plants, animals, and metal tools arrived as well, transforming island life in ways both helpful and harmful." },
      { t: "p", html: "Because Cook's maps showed exactly where these lands lay and how to reach them, they opened the door for Britain to establish colonies. The first British colony in Australia was founded in <b>1788</b> — partly as a faraway prison settlement for convicts. From that moment, the long isolation of the Pacific was over, and the lives of Aboriginal Australians, Maori, and Pacific Islanders would never be the same again." },
      { t: "guide", html: "Maps are never just maps. When Cook charted a coastline, he wasn't only recording where land was — he was making it possible for ships, settlers, and whole empires to follow. A single accurate map can change the course of history." },
      { t: "fact", html: "Captain Cook's crew were among the first Europeans to see a <b>kangaroo</b>. When they asked what it was, the answer became the animal's English name!" },
      { t: "fact", html: "Cook also helped solve one of the great killers of long sea voyages: <b>scurvy</b>, a disease caused by a lack of vitamin C. By insisting his crews eat certain fresh and pickled foods, he kept his sailors far healthier than was normal at the time — proof that good observation could save lives even before the science was fully understood." },
      { t: "modern", html: "Cook's voyages connected the Pacific to the wider world — and this is why his name still sparks debate today. To some he was a brilliant navigator and scientist; to many Indigenous peoples his arrival marked the beginning of losing their lands, and that pain is real and remembered. Both things are true at once. Understanding history honestly means holding the achievement and the harm together, rather than pretending only one of them happened." },
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
      { t: "lead", html: "<b>Australia</b> and <b>New Zealand</b> both began as distant British colonies on the far side of the world, but over time they developed their own distinct identities, economies, and democratic governments, eventually becoming fully independent nations that still keep close ties to Britain and to each other. Their story is one of building new societies — and slowly learning to face the cost those societies had imposed on the peoples who were already there." },
      { t: "p", html: "In New Zealand, the British and the Indigenous <b>Maori</b> signed the <b>Treaty of Waitangi</b> in 1840 — an agreement meant to set out how the two peoples would share the land and live together. It remains one of the most important documents in the country's history, but it is also a famously <b>disputed</b> one: the English and Maori versions used different words and promised different things, and arguments over what the treaty truly meant continue to shape New Zealand to this very day. Remarkably, New Zealand also became, in <b>1893</b>, one of the first self-governing countries on Earth where <b>women won the right to vote</b> — decades ahead of most of the world." },
      { t: "p", html: "Both nations grew genuinely wealthy, and the reasons reveal a lot about their land. With huge open spaces and mild climates, they became giants of farming — New Zealand alone has long had far more <b>sheep</b> than people — while Australia's vast interior held rich deposits of <b>minerals and metals</b> to mine and sell. Later, technology, education, and tourism added to that prosperity. Because their economies were so productive, both countries built strong democracies and some of the highest standards of living anywhere in the world." },
      { t: "scene", art: "star", caption: "Australia and New Zealand became prosperous Pacific democracies." },
      { t: "p", html: "Yet that prosperity was built on land taken from Indigenous peoples, and for a long time their cultures were pushed aside or even forbidden. Importantly, both countries have since worked hard to recognize those past wrongs and to celebrate Indigenous cultures rather than hide them. Today, Maori language and traditions in New Zealand, and Aboriginal art, music, and heritage in Australia, are increasingly honored as national treasures — taught in schools, used in official ceremonies, and proudly shared with visitors." },
      { t: "guide", html: "Notice the pattern here: a country can be both genuinely admirable and still owe a debt to the people it displaced. Growing up, for a nation, often means finding the courage to admit that and try to make it right." },
      { t: "fact", html: "Before a game, New Zealand's famous rugby team, the <b>All Blacks</b>, performs the <b>haka</b> — a powerful Maori ceremonial dance — sharing Indigenous culture with the whole world." },
      { t: "fact", html: "Many words in everyday New Zealand and Australian English come straight from Indigenous languages — and so do thousands of <b>place names</b>. The famous rock <b>Uluru</b> in central Australia is known by the name the local Anangu people have used for it across countless generations." },
      { t: "modern", html: "Australia and New Zealand show how nations can grow prosperous while working to respect and include the peoples who lived there first — an ongoing journey often called <b>reconciliation</b>. It is not finished, and it is not always smooth, but it still matters: it offers the rest of the world a model for how a country can be honest about its past without losing pride in what it has become." },
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
      { t: "lead", html: "For most of history, the remote islands of the Pacific had been some of the most peaceful places on Earth. That changed dramatically when <b>World War II</b> spread across the ocean and turned it into a vast battlefield. Japan and the Allies — led by the <b>United States</b> — fought enormous battles across thousands of miles of sea, using a strategy that came to be called <b>“island-hopping.”</b>" },
      { t: "p", html: "The idea behind island-hopping was clever: instead of trying to capture every single island, the Allies seized only the most important ones — the islands with airfields and harbors — and simply bypassed the rest, cutting them off from supplies. Famous, hard-fought battles took place at places like <b>Midway</b>, where the United States won a decisive naval victory, and <b>Guadalcanal</b>, where soldiers fought for months in brutal jungle conditions. Because whoever held these tiny islands controlled the airfields and supply routes across the world's largest ocean, specks of land that most people had never heard of suddenly decided the fate of millions. The Pacific war finally ended in <b>1945</b>." },
      { t: "p", html: "After the war, the map of the Pacific kept changing. One by one, island nations that had been ruled by faraway empires gradually won their <b>independence</b> — small countries such as <b>Fiji, Samoa, and Tonga</b>, each tiny in land but stretched across enormous areas of ocean, and each carrying proud cultures and languages thousands of years old. They proved that a nation does not need to be big to matter." },
      { t: "scene", art: "globe", caption: "Today, Pacific nations lead the world in raising the alarm about climate change." },
      { t: "p", html: "Today the greatest threat to these nations is not war but <b>climate change</b>. The reason is simple but serious: many Pacific islands are low and flat, sometimes rising only a meter or two above the waves. As the planet warms, the oceans expand and polar ice melts, so the sea slowly rises — and because these islands are so low, <b>rising seas</b> can flood farmland, poison fresh water with salt, and threaten entire homelands. Faced with losing the very ground beneath them, Pacific leaders have become some of the world's clearest and most powerful voices urging every country to protect the planet." },
      { t: "guide", html: "Here is the cause and effect to hold onto: because the islands are low, even a small rise in the sea is a huge danger. The countries that did the least to cause climate change are among the first to feel its consequences — which is exactly why their voices carry such moral weight." },
      { t: "fact", html: "The low-lying nation of <b>Tuvalu</b> is so threatened by rising seas that it began creating a “digital version” of itself online — recreating its islands in a virtual world to preserve its culture, language, and history no matter what happens to the land itself." },
      { t: "fact", html: "Many Pacific peoples are working hard to <b>adapt</b> rather than simply give up — building sea walls, restoring protective coral reefs and mangroves, and planning carefully — proof that even in the face of a slow-rising ocean, communities refuse to lose their homes without a fight." },
      { t: "modern", html: "From the battles of WWII to the front line of climate change, the Pacific reminds us of a powerful truth: even the most remote places on Earth are deeply connected to the whole world's choices — including ours. The fate of a tiny island thousands of miles away can depend on decisions made in distant capitals and crowded cities. That is exactly why these stories still matter, and why the voices of the Pacific deserve to be heard." },
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
