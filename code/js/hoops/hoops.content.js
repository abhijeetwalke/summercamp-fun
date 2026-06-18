/* ============================================================
   Basketball — "Hardwood" — Content  [SUBJECT: hoops]
   Teaching-first: read the story / records / history / legends,
   then quiz. Four subsections, ~20 lessons, 100+ questions,
   interleaved quick-checks + an end-of-subsection review.
   Clean, positive, age-appropriate, no-shame, effort-not-ability.
   All records fact-verified against current sources (June 2026).

   Real photos via Wikimedia Commons (Special:FilePath) with a
   bold Hardwood SVG fallback — never a broken image. Captions +
   credits on every photo.

   Beat types (rendered by hoops.components.js):
     lead | p | fact | quote | photo | statline | tradingcard |
     cards | banner | split | order | compare
   Quiz q: { q, type:'mc'|'tf'|'order'|'image', options:[], answer:idx, explain, hint?, image? }
   ============================================================ */

window.HOOPS = window.HOOPS || {};
HOOPS.CONTENT = { sections: [], lessons: {} };

(function (C) {
  var L = C.lessons;
  function sec(o) { C.sections.push(o); }
  function lesson(o) { L[o.id] = o; }

  // Photo credit shorthand
  var WC = "Wikimedia Commons";

  /* ============================================================
     SUBSECTION 1 — HEART OF A CHAMPION (grit & perseverance)
     ============================================================ */
  sec({
    id: "heart", name: "Heart of a Champion", emoji: "🔥",
    color: "#e23636", color2: "#7a1414",
    blurb: "True grit stories — and the work behind every one.",
    intro: "The greatest players didn't start at the top. They started with almost nothing — and out-worked the world to get there. Talent opened a door; <b>work</b> walked them through it.",
    badge: { name: "Heart of a Champion", emoji: "🔥" },
    lessons: ["h1", "h2", "h3", "h4", "h5"],
    debate: {
      id: "d-heart", tag: "Big Debate — argue BOTH sides",
      q: "Talent or hard work — which matters more?",
      setup: "Every player in this subsection had <b>both</b>. But if you had to pick the bigger reason they made it, what would you argue?",
      a: { label: "Hard work matters more", h: "The case for work",
        body: "Curry was 'too small.' Giannis had no food some nights. Butler had no home at 13. None of that is talent — and plenty of <i>more</i> talented players never made it because they didn't put in the reps. Work is the part you control. That's why this whole subsection celebrates the early mornings and the refusal to quit, not the gifts." },
      b: { label: "Talent matters more", h: "The case for talent",
        body: "Millions of kids work incredibly hard and never reach the NBA. These players also had rare gifts — Giannis's size and coordination, Curry's eyes and touch. Without that raw ability, no amount of work gets you to the very top. Hard work might be necessary, but talent is what makes it possible." },
    },
    review: [
      { q: "What is the BIG idea every story in this subsection shares?", type: "mc", options: ["They were all born rich", "They were all over 7 feet tall", "They out-worked huge hardships to make it", "They all played for one team"], answer: 2, explain: "Different hardships, same answer: relentless work." },
      { q: "Giannis Antetokounmpo helped his family by selling things on the streets of which city?", type: "mc", options: ["Lagos", "Athens", "Madrid", "Chicago"], answer: 1, explain: "He sold watches, sunglasses and more in Athens, Greece, where he grew up." },
      { q: "LeBron James was raised mostly by his mother, who had him when she was just 16.", type: "tf", options: ["True", "False"], answer: 0, explain: "Gloria James had LeBron at 16 and raised him through tough times in Akron, Ohio." },
      { q: "Why did big colleges pass on Stephen Curry?", type: "mc", options: ["Bad grades", "They thought he was too small and skinny", "He couldn't shoot", "He was too slow"], answer: 1, explain: "Only tiny Davidson offered him a scholarship — everyone else thought he was too small." },
      { q: "Jimmy Butler became an NBA All-Star after being homeless as a teenager.", type: "tf", options: ["True", "False"], answer: 0, explain: "Told to leave home around 13, he bounced between friends' houses, then worked his way to stardom." },
      { q: "Maya Moore stepped away from basketball at her peak to do what?", type: "mc", options: ["Become a coach", "Help free a man who was wrongly imprisoned", "Start a shoe company", "Play overseas"], answer: 1, explain: "She paused her career to help free Jonathan Irons, who was wrongfully convicted — and later married him." },
      { q: "Allen Iverson's story is mostly about…", type: "mc", options: ["Being the tallest player ever", "Heart and toughness over size", "Never missing a shot", "Inventing the dunk"], answer: 1, explain: "Smaller than most, Iverson played with relentless heart — proof size isn't everything." },
      { q: "What kind of language does this app use to praise players?", type: "mc", options: ["“They're just naturally gifted”", "“They got lucky”", "“Look at the work they put in”", "“They were born great”"], answer: 2, explain: "We celebrate the work — the drills, the grind — never just raw ability." },
      { q: "For his first 18 years, Giannis was effectively 'stateless' — meaning…", type: "mc", options: ["He had no home team", "He had no official country / papers", "He never traveled", "He had no coach"], answer: 1, explain: "With papers from neither Greece nor Nigeria, he couldn't even travel — until Greece granted him citizenship in 2013." },
    ],
  });

  lesson({
    id: "h1", section: "heart", n: 1, minutes: 5, title: "Giannis: From the Streets of Athens",
    hook: "Some nights, there was no food. The boy who sold sunglasses on the street to help his family would grow into an <b>NBA MVP and champion</b>.",
    beats: [
      { t: "lead", html: "Giannis Antetokounmpo was born in Athens, Greece, to parents who had moved there from Nigeria looking for work. They couldn't get work permits — so the whole family had to survive however they could." },
      { t: "photo", file: "Thanasis and Giannis Antetokounmpo at Sepolia, Greece.jpg", caption: "Sepolia, the Athens neighborhood where Giannis and his brothers grew up.", credit: "(" + WC + ")", fallback: "globe" },
      { t: "p", html: "From around age 6, Giannis and his older brother Thanasis sold watches, sunglasses, bags, and DVDs on the street to help their parents. In his own words: <b>if they didn't sell that night, they wouldn't eat.</b>" },
      { t: "fact", label: "Whoa:", html: "For the first 18 years of his life, Giannis was basically <b>stateless</b> — he had papers from neither Greece nor Nigeria, so he couldn't even leave the country. Greece granted him citizenship in 2013, just weeks before the NBA draft." },
      { t: "p", html: "A coach spotted Giannis at about 13, and he began training with a small Greek club called Filathlitikos — in a modest gym, a long way from the bright lights of the NBA. He spoke little English and had never faced top competition, but he practiced relentlessly, hungry to get a little better every single day." },
      { t: "p", html: "In 2013, the Milwaukee Bucks used the <b>15th pick</b> of the NBA draft on the skinny, almost-unknown teenager. He arrived in America so careful with money that he sent much of his first paychecks back home to his family — then he just kept <b>working</b>, slowly adding muscle, skill, and confidence season after season." },
      { t: "photo", file: "Giannis Antetokounmpo (51914619427).jpg", caption: "Giannis with the Milwaukee Bucks — NBA MVP and 2021 champion.", credit: "(" + WC + ", CC BY 2.0)", fallback: "jersey", tall: false },
      { t: "quote", html: "When you focus on the past, that's your ego. When you focus on the future, that's your pride. I try to focus on the moment.", who: "Giannis Antetokounmpo" },
      { t: "statline", title: "Giannis, by the numbers", stats: [
        { v: "2×", k: "MVP (2019 & 2020)" }, { v: "2021", k: "champion + Finals MVP" }, { v: "50", k: "points in the clinching Game 6" },
      ], note: "He was also Defensive Player of the Year in 2020 — about as far from 'selling sunglasses to eat' as a story can travel." },
      { t: "fact", label: "Family first:", html: "Giannis shares the dream with his brothers: Thanasis also reached the NBA, and Kostas won an NBA title with the Lakers in 2020. Their father, Charles, who worked tirelessly for the family, passed away in 2017 — Giannis says he plays for him." },
      { t: "banner", html: "A coach spotted Giannis at 13. He couldn't out-shop his way to the NBA — he <b>out-worked</b> his way there, drill after drill, year after year. That's the whole point of his story." },
    ],
    quiz: [
      { q: "How did young Giannis help his family survive?", type: "mc", options: ["Selling items on the street", "Acting in movies", "Coaching kids", "Driving a taxi"], answer: 0, explain: "He and his brother sold watches, sunglasses and more on the streets of Athens.", hint: "Think about what he did before basketball." },
      { q: "Giannis grew up with plenty of money and food.", type: "tf", options: ["True", "False"], answer: 1, explain: "Some nights there wasn't enough to eat — his family struggled hard." },
      { q: "What made traveling impossible for young Giannis?", type: "mc", options: ["He was afraid of planes", "He had no country's papers (stateless)", "He was too busy", "He had no money for a ticket"], answer: 1, explain: "Without citizenship from Greece or Nigeria, he was stateless until 2013." },
      { q: "What finally carried Giannis to the NBA?", type: "mc", options: ["Luck", "Being born tall and nothing else", "Years of hard work after a coach found him", "A rich relative"], answer: 2, explain: "Talent got him noticed; relentless work made him a champion." },
      { q: "Which NBA team drafted Giannis in 2013?", type: "mc", options: ["Milwaukee Bucks", "Los Angeles Lakers", "Golden State Warriors", "Chicago Bulls"], answer: 0, explain: "Milwaukee took the unknown teenager 15th overall in 2013.", hint: "He won his championship there." },
      { q: "Giannis won back-to-back NBA MVP awards in which years?", type: "mc", options: ["2019 & 2020", "2010 & 2011", "2023 & 2024", "2015 & 2016"], answer: 0, explain: "He was MVP in 2019 and 2020, then Finals MVP in 2021." },
    ],
  });

  lesson({
    id: "h2", section: "heart", n: 2, minutes: 5, title: "LeBron: A Kid From Akron",
    hook: "His mom was <b>16</b> when he was born. They moved <b>12 times in three years</b>. One school year he missed almost 100 days. He became one of the greatest ever.",
    beats: [
      { t: "lead", html: "LeBron James grew up in Akron, Ohio, raised mostly by his mother, Gloria, who had him when she was just 16 years old. Money was scarce and a steady home was hard to find." },
      { t: "p", html: "For a stretch of about three years, LeBron and his mom moved roughly <b>12 times</b>. In fourth grade he missed nearly <b>100 days of school</b> — sometimes there just wasn't a way to get there." },
      { t: "p", html: "A youth football coach and his family took LeBron in for a year so he could have a stable place to live and finally show up to school every day. That stability — plus a basketball — changed everything." },
      { t: "p", html: "With a steady home, LeBron took off. He became a national high-school superstar at St. Vincent–St. Mary in Akron — so famous that magazines called him 'The Chosen One' before he could even drive. In 2003, his hometown team, the Cleveland Cavaliers, made him the <b>#1 overall pick</b>." },
      { t: "photo", file: "LeBron James Lakers.jpg", caption: "LeBron James — four-time champion and the NBA's all-time leading scorer.", credit: "(" + WC + ", CC BY-SA 2.0)", fallback: "jersey", tall: false },
      { t: "statline", title: "LeBron, by the numbers (2026)", stats: [
        { v: "43,440", k: "career points (NBA record)" }, { v: "4", k: "NBA titles" }, { v: "4", k: "MVP awards" }, { v: "21+", k: "seasons played" },
      ], note: "He is the only player in NBA history to pass 40,000 career points — and he did it by working for 20+ years." },
      { t: "fact", label: "Coming home:", html: "In 2016, LeBron brought Cleveland its first NBA title ever — leading the Cavaliers back from <b>down 3 games to 1</b> in the Finals, the first team in history to do it — for the city right next to where he grew up." },
      { t: "p", html: "And he hasn't forgotten Akron. Through his family foundation he opened the <b>I PROMISE School</b> there to help kids facing the same struggles he once did. The whole point of climbing out, he says, is to reach back and pull others up." },
      { t: "quote", html: "I'm just a kid from Akron.", who: "LeBron James" },
      { t: "banner", html: "LeBron's story isn't 'born lucky.' It's a kid who got one stable year, grabbed it, and then worked harder and longer than almost anyone in the game's history." },
    ],
    quiz: [
      { q: "How old was LeBron's mother when he was born?", type: "mc", options: ["16", "25", "30", "19"], answer: 0, explain: "Gloria James had LeBron at just 16 and raised him through hard times." },
      { q: "What was the biggest challenge in LeBron's childhood?", type: "mc", options: ["Too much homework", "Moving constantly and missing school", "Being the tallest kid", "Living far from a court"], answer: 1, explain: "Frequent moves meant missing tons of school — until a coach's family gave him a stable home." },
      { q: "LeBron is the NBA's all-time leading scorer.", type: "tf", options: ["True", "False"], answer: 0, explain: "He passed Kareem Abdul-Jabbar in 2023 and is the only player past 40,000 points." },
      { q: "What does LeBron's story teach about success?", type: "mc", options: ["You need a perfect childhood", "A stable chance plus huge work can change everything", "Talent alone is enough", "Only tall kids can make it"], answer: 1, explain: "One stable year plus relentless work turned a struggling kid into a legend." },
      { q: "In 2016, LeBron led which team back from down 3 games to 1 to win the Finals — a first in NBA history?", type: "mc", options: ["Cleveland Cavaliers", "Miami Heat", "Los Angeles Lakers", "Chicago Bulls"], answer: 0, explain: "He brought Cleveland its first NBA title ever, near his hometown of Akron." },
      { q: "LeBron opened a school in his hometown of Akron to help kids facing struggles like his own.", type: "tf", options: ["True", "False"], answer: 0, explain: "The I PROMISE School is how he reaches back to help others." },
    ],
  });

  lesson({
    id: "h3", section: "heart", n: 3, minutes: 5, title: "Curry: Too Small, They Said",
    hook: "Every big college passed on him. <b>One</b> tiny school said yes. He became the greatest shooter the game has ever seen — and a California hero.",
    beats: [
      { t: "lead", html: "Coming out of high school, Stephen Curry was about six feet tall and very thin. Recruiters said he didn't pass the 'eye test' — too small, too skinny." },
      { t: "p", html: "Not one big basketball school offered him a scholarship. Only <b>Davidson</b>, a small college, believed in him. Even the famous Duke coach later admitted he <i>missed</i> on Curry because of his size." },
      { t: "p", html: "Funny thing: his dad, Dell Curry, had been an NBA player — but that didn't make Steph a sure thing. Even Virginia Tech, his father's old school, only offered him a chance to <i>walk on</i>. So he went to little Davidson, the one school that truly wanted him." },
      { t: "photo", file: "Stephen Curry 2.jpg", caption: "Stephen Curry of the Golden State Warriors — the greatest shooter in basketball history.", credit: "(" + WC + ", CC BY-SA 2.0)", fallback: "jersey", tall: false },
      { t: "p", html: "So Curry did the only thing that answers doubters: he worked. Thousands of shots a day, footwork, a lightning-fast release. At Davidson he became a national sensation — then a Golden State Warrior, then a legend." },
      { t: "fact", label: "The breakout:", html: "In 2008, Curry led tiny Davidson on a magical March run all the way to the brink of the Final Four, dropping 30-plus points on the biggest teams in the country. Overnight, the whole nation knew his name." },
      { t: "p", html: "The Warriors drafted him 7th in 2009 — but early on, <b>repeated ankle injuries</b> nearly wrecked his career. He rebuilt his body and his game, and in 2016 became the <b>first unanimous MVP</b> in NBA history: every single voter picked him." },
      { t: "statline", title: "Curry's answer to the doubters", stats: [
        { v: "4,248", k: "career 3-pointers (all-time record)" }, { v: "4", k: "NBA titles with GSW" }, { v: "2", k: "MVP awards" },
      ], note: "He is the first player ever to make 4,000 career three-pointers — by a mile (as of June 2026)." },
      { t: "fact", label: "California connection:", html: "Curry's Golden State Warriors built a Bay Area dynasty — the team that turned the three-pointer into a superpower. These are the games your home state grew up watching." },
      { t: "banner", html: "Curry couldn't change his height. He changed everything else — through work. 'Too small' became the greatest shooter alive." },
    ],
    quiz: [
      { q: "Why did big colleges overlook Stephen Curry?", type: "mc", options: ["He had bad grades", "They thought he was too small and skinny", "He didn't like basketball", "He was injured"], answer: 1, explain: "Recruiters thought he was too small — only Davidson offered a scholarship.", hint: "It was about his size." },
      { q: "Which college took a chance on Curry?", type: "mc", options: ["Duke", "Davidson", "Kentucky", "UCLA"], answer: 1, explain: "Small Davidson College was the only one to offer him a scholarship." },
      { q: "Curry holds the all-time record for most career three-pointers.", type: "tf", options: ["True", "False"], answer: 0, explain: "He's the first player ever to pass 4,000 career threes." },
      { q: "Which California team did Curry turn into a dynasty?", type: "mc", options: ["LA Lakers", "Sacramento Kings", "Golden State Warriors", "LA Clippers"], answer: 2, explain: "Curry's Golden State Warriors won four titles and changed how basketball is played." },
      { q: "In 2016, Curry made history by becoming the first player ever named MVP how?", type: "mc", options: ["Unanimously — every voter picked him", "By fan vote only", "Twice in one year", "Without playing a game"], answer: 0, explain: "He was the first unanimous MVP in NBA history." },
      { q: "Early in his career, repeated ankle injuries nearly ended Curry's career.", type: "tf", options: ["True", "False"], answer: 0, explain: "He rebuilt his body and his game through hard work — then became a legend." },
    ],
  });

  lesson({
    id: "h4", section: "heart", n: 4, minutes: 5, title: "Iverson & Butler: Heart Over Everything",
    hook: "One was 'too small' his whole life. The other had no home at 13. Both refused to quit — and both made it to the very top.",
    beats: [
      { t: "lead", html: "Allen Iverson grew up in deep poverty in Hampton, Virginia. He was always one of the smallest players on the floor — and he played with more heart than almost anyone the game has seen." },
      { t: "p", html: "At about 6 feet tall in a world of giants, Iverson became an MVP by being fearless, fast, and tougher than every defender. He proved size is not the same as toughness." },
      { t: "p", html: "His mother, Ann, had him when she was just <b>15</b>, and they grew up with almost nothing. When trouble nearly ended his basketball dreams, she went to Georgetown's coach, John Thompson, and asked him to give her son a chance. Thompson did — and Iverson became the <b>#1 overall pick</b> in 1996 and the league MVP in 2001, while being one of the smallest players on the floor." },
      { t: "split",
        a: { title: "Allen Iverson", body: "Poverty in Hampton, VA · 'too small' his whole career · played with relentless heart · NBA MVP." },
        b: { title: "Jimmy Butler", body: "Told to leave home around 13 · slept on friends' couches · nothing handed to him · NBA All-Star through pure work." } },
      { t: "p", html: "Jimmy Butler's mother told him to leave home when he was about 13. With no guaranteed place to sleep, he bounced between friends' houses in Tomball, Texas. He out-worked everyone — and turned that grit into an All-Star career." },
      { t: "p", html: "A friend's mom, Michelle Lambert, eventually took Butler in. Unrecruited out of high school, he started at a <b>junior college</b>, earned his way to Marquette, and in 2011 was the <b>very last pick of the first round</b> (30th). Nothing was handed to him — he simply refused to be out-worked." },
      { t: "quote", html: "I'm not the most talented player. I just outwork people.", who: "Jimmy Butler (on his approach)" },
      { t: "banner", html: "Two different hardships, one lesson: when you can't change your size or your start, you can always change how hard you work." },
    ],
    quiz: [
      { q: "Allen Iverson's game proved that…", type: "mc", options: ["Only tall players matter", "Heart and toughness can beat size", "Shooting doesn't matter", "Speed is useless"], answer: 1, explain: "Smaller than most, Iverson won MVP with relentless heart." },
      { q: "What happened to Jimmy Butler around age 13?", type: "mc", options: ["He won a title", "He was told to leave home", "He moved to Europe", "He quit basketball"], answer: 1, explain: "He left home young and bounced between friends' houses before working his way up." },
      { q: "Both Iverson and Butler had everything handed to them.", type: "tf", options: ["True", "False"], answer: 1, explain: "Both overcame serious hardship — nothing was handed to them." },
      { q: "The shared lesson of their stories is…", type: "mc", options: ["Give up when it's hard", "Out-work what you can't control", "Only talent matters", "Height is destiny"], answer: 1, explain: "When you can't change your size or your start, you can change your effort." },
      { q: "Iverson's mom asked which coach to give her son a chance, launching his career?", type: "mc", options: ["John Thompson at Georgetown", "Coach K at Duke", "Phil Jackson", "Red Auerbach"], answer: 0, explain: "John Thompson gave Iverson his shot at Georgetown; he became the #1 pick in 1996." },
      { q: "After high school, where did unrecruited Jimmy Butler start his college path?", type: "mc", options: ["A junior college", "Straight to the NBA", "Duke University", "Overseas"], answer: 0, explain: "Junior college → Marquette → the very last pick of the 2011 first round. Pure work." },
    ],
  });

  lesson({
    id: "h5", section: "heart", n: 5, minutes: 5, title: "Maya Moore: The Bravest Choice",
    hook: "She was one of the best players in the world. Then she walked away — at her peak — to fight for someone else's freedom.",
    beats: [
      { t: "lead", html: "Maya Moore was a WNBA superstar: champion, MVP, an Olympic gold medalist — right in the prime of her career." },
      { t: "p", html: "First, understand how great she was. At the University of Connecticut she won <b>two national titles</b> (2009 and 2010) and was part of a 90-game winning streak. Then she won <b>four WNBA championships</b> with the Minnesota Lynx, was league MVP in 2014, and earned Olympic gold — one of the very best players on the planet." },
      { t: "p", html: "In 2019, Moore stepped away from basketball. Her goal wasn't a bigger contract or a new team — it was to help free <b>Jonathan Irons</b>, a family friend she believed had been wrongly sent to prison as a teenager." },
      { t: "fact", label: "Not a one-day favor:", html: "This wasn't a quick visit. Moore spent <b>years</b> on the case — studying it, showing up to hearings, and using her fame to make people pay attention. A court found key evidence had been hidden at Irons' trial." },
      { t: "p", html: "In 2020, Irons' conviction was overturned and he walked free — after <b>23 years</b> behind bars. He and Moore later married and started a family. She gave up prime years of a Hall-of-Fame career for something she believed mattered more than basketball." },
      { t: "p", html: "That's a different kind of grit — the courage to use your strength for someone else, even when it costs you the thing you're best at." },
      { t: "quote", html: "I'm in a really good place... where I can clearly see that the timing is right to step away.", who: "Maya Moore (2019)" },
      { t: "banner", html: "Grit isn't only about winning games. Sometimes the hardest, bravest work happens off the court." },
    ],
    quiz: [
      { q: "What did Maya Moore step away from basketball to do?", type: "mc", options: ["Start a team", "Help free a wrongly imprisoned man", "Coach in college", "Open a restaurant"], answer: 1, explain: "She fought to free Jonathan Irons, whose conviction was later overturned." },
      { q: "Maya Moore left basketball when she was washed-up and no longer good.", type: "tf", options: ["True", "False"], answer: 1, explain: "She left at her PEAK — that's what made the choice so bold." },
      { q: "How did Jonathan Irons' case end?", type: "mc", options: ["He stayed in prison", "His conviction was overturned and he was freed", "Nothing changed", "He was never in prison"], answer: 1, explain: "In 2020 his conviction was overturned and he was released; he and Moore later married." },
      { q: "Maya Moore's story shows that grit can mean…", type: "mc", options: ["Only scoring points", "Using your strength to help others", "Never caring about people", "Quitting when it's hard"], answer: 1, explain: "Her bravest work was off the court, for someone else's freedom." },
      { q: "Before stepping away, how many WNBA titles did Moore win with the Minnesota Lynx?", type: "mc", options: ["Four", "One", "Zero", "Ten"], answer: 0, explain: "Four WNBA championships, plus 2014 MVP and two national titles at UConn." },
      { q: "About how long had Jonathan Irons been imprisoned before he was freed in 2020?", type: "mc", options: ["About 23 years", "About 2 years", "A few months", "50 years"], answer: 0, explain: "He was released after about 23 years; he and Moore later married." },
    ],
  });

  /* ============================================================
     SUBSECTION 2 — THE RECORD BOOKS
     ============================================================ */
  sec({
    id: "records", name: "The Record Books", emoji: "📒",
    color: "#1d9bf0", color2: "#11405e",
    blurb: "The “wait, REALLY?” numbers — verified for 2026.",
    intro: "Basketball is a game of jaw-dropping numbers. <b>100 points in one game.</b> <b>11 championships.</b> <b>4,000+ threes.</b> Here are the records every fan should know — checked to their current values.",
    badge: { name: "Record Keeper", emoji: "📒" },
    lessons: ["r1", "r2", "r3", "r4", "r5"],
    debate: {
      id: "d-records", tag: "Big Debate — argue BOTH sides",
      q: "Which is more impressive: Wilt's 100 points in ONE game, or LeBron's 40,000+ over a career?",
      a: { label: "The 100-point game", h: "One unrepeatable night",
        body: "Nobody else has ever come close to 100 in a single game — the next best is 81. It's a record that has stood since 1962 and may never be broken. One night of perfection is rarer than anything." },
      b: { label: "The career scoring crown", h: "Two decades of greatness",
        body: "Scoring 40,000+ points means being great <i>every season for 20 years</i> — staying healthy, hungry, and dominant longer than anyone ever has. A single hot night is luck plus skill; a career record is unbreakable consistency." },
    },
    review: [
      { q: "How many points did Wilt Chamberlain score in a single game — an NBA record?", type: "mc", options: ["81", "100", "73", "61"], answer: 1, explain: "Wilt scored 100 in one game in 1962. The next-highest ever is Kobe Bryant's 81." },
      { q: "Who is the NBA's all-time leading scorer?", type: "mc", options: ["Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James", "Kobe Bryant"], answer: 2, explain: "LeBron passed Kareem in 2023; he's at 43,440 points (2026)." },
      { q: "How many championships did Bill Russell win — the most by any player?", type: "mc", options: ["6", "8", "11", "5"], answer: 2, explain: "Russell won 11 titles with the Boston Celtics in 13 seasons." },
      { q: "Who holds the record for most career three-pointers?", type: "mc", options: ["Ray Allen", "Stephen Curry", "Klay Thompson", "Reggie Miller"], answer: 1, explain: "Curry passed Ray Allen in 2021 and is the first ever past 4,000 threes." },
      { q: "The Golden State Warriors set the record for most wins in a season. How many?", type: "mc", options: ["70", "72", "73", "75"], answer: 2, explain: "The 2015–16 Warriors went 73–9, beating the Bulls' old mark of 72–10." },
      { q: "Who is the WNBA's all-time leading scorer?", type: "mc", options: ["A'ja Wilson", "Diana Taurasi", "Lisa Leslie", "Sue Bird"], answer: 1, explain: "Diana Taurasi retired in 2025 as the WNBA's all-time scoring leader (10,646 points)." },
      { q: "A'ja Wilson made history in 2025 by becoming the first player to win how many WNBA MVP awards?", type: "mc", options: ["Three", "Four", "Five", "Two"], answer: 1, explain: "She became the first FOUR-time WNBA MVP in 2025." },
      { q: "Caitlin Clark set the all-time NCAA Division I scoring record (men's or women's).", type: "tf", options: ["True", "False"], answer: 0, explain: "In 2024 she passed Pete Maravich, finishing as the all-time D-I scoring leader." },
      { q: "Russell Westbrook broke a record long held by Oscar Robertson. For what?", type: "mc", options: ["Most dunks", "Most career triple-doubles", "Most blocks", "Tallest player"], answer: 1, explain: "Westbrook passed Oscar Robertson for the most career triple-doubles in 2021." },
      { q: "Why does this app say records should be 'verified to current values'?", type: "mc", options: ["Records never change", "Records DO change, so we check the latest numbers", "Numbers don't matter", "To make it harder"], answer: 1, explain: "Scoring leaders and made-threes keep climbing — so we always check the current value." },
    ],
  });

  lesson({
    id: "r1", section: "records", n: 1, minutes: 5, title: "Scoring: 100 in a Night, 40,000 in a Career",
    hook: "In 1962, one player scored <b>100 points in a single game.</b> It has never been topped. Meanwhile, another player just became the first ever past <b>40,000 career points.</b>",
    beats: [
      { t: "lead", html: "Two of basketball's most famous numbers live at opposite ends: one unforgettable night, and one unbelievable career." },
      { t: "statline", title: "The two great scoring records", stats: [
        { v: "100", k: "Wilt's single-game record (1962)" }, { v: "81", k: "Kobe's 2nd-best (2006)" }, { v: "43,440", k: "LeBron's career total (2026)" },
      ], note: "Wilt Chamberlain's 100-point game has stood for over 60 years. The closest anyone has come is Kobe Bryant's 81." },
      { t: "p", html: "For decades the all-time career scoring crown belonged to <b>Kareem Abdul-Jabbar</b> and his unblockable skyhook. In 2023, <b>LeBron James</b> passed him — and became the first player ever to cross 40,000 career points." },
      { t: "photo", file: "Kobe Bryant 8.jpg", caption: "Kobe Bryant scored 81 in one game in 2006 — the second-most ever, behind only Wilt's 100.", credit: "(" + WC + ")", fallback: "ball", tall: false },
      { t: "fact", label: "Mind-bender:", html: "To score 100 in one game, Wilt made <b>36 field goals and 28 free throws.</b> Players today are thrilled to score 30 in a night." },
      { t: "p", html: "That 100-point night came during Wilt's wildest season. In 1961–62 he <b>averaged 50.4 points per game</b> for the <i>entire year</i> — the only player ever to average more than 50 a game. No one has come close since." },
      { t: "fact", label: "A record that stood 39 years:", html: "Kareem's career scoring record lasted from 1984 all the way to 2023 — almost four decades — before LeBron passed it in his <b>20th season</b>. Lasting that long, that good, is its own kind of greatness." },
      { t: "p", html: "How do you score 40,000 points? You have to be great <i>and</i> durable. LeBron rarely got badly hurt and almost never took long breaks — he just kept showing up, year after year, while younger stars came and went." },
      { t: "p", html: "Before LeBron, <b>Kareem Abdul-Jabbar</b> ruled the scoring list for almost 40 years thanks to his <b>skyhook</b> — a high, arcing shot nobody could block. He piled up more than 38,000 points with it." },
      { t: "fact", label: "Most scoring titles:", html: "Michael Jordan led the entire league in scoring <b>10 times</b> — more than anyone ever — including seven seasons in a row. Leading the league once is hard; doing it ten times is almost unfair." },
      { t: "banner", html: "One record is a single perfect night; the other is twenty years of greatness. Both are almost impossible — and both are real." },
    ],
    quiz: [
      { q: "How many points did Wilt Chamberlain score in his record game?", type: "mc", options: ["73", "81", "100", "61"], answer: 2, explain: "100 — in 1962, and still the single-game record.", hint: "It's a nice round number." },
      { q: "Who scored the second-most points in a single game (81)?", type: "mc", options: ["Kobe Bryant", "LeBron James", "Michael Jordan", "Stephen Curry"], answer: 0, explain: "Kobe Bryant dropped 81 in 2006 — closest anyone has come to Wilt's 100." },
      { q: "Who is the NBA's all-time leading scorer?", type: "mc", options: ["Kareem Abdul-Jabbar", "LeBron James", "Michael Jordan", "Wilt Chamberlain"], answer: 1, explain: "LeBron passed Kareem in 2023 and is the only player past 40,000 points." },
      { q: "Wilt's 100-point game has been broken many times since.", type: "tf", options: ["True", "False"], answer: 1, explain: "It has never been topped — it's stood for over 60 years." },
      { q: "Who held the scoring record for almost 40 years before LeBron, using his famous skyhook?", type: "mc", options: ["Kareem Abdul-Jabbar", "Wilt Chamberlain", "Michael Jordan", "Kobe Bryant"], answer: 0, explain: "Kareem's unblockable skyhook made him the scoring king from 1984 to 2023." },
      { q: "Who led the NBA in scoring a record 10 times?", type: "mc", options: ["Michael Jordan", "LeBron James", "Stephen Curry", "Bill Russell"], answer: 0, explain: "Jordan won 10 scoring titles, including seven years in a row." },
    ],
  });

  lesson({
    id: "r2", section: "records", n: 2, minutes: 5, title: "Rings & Dynasties: 11 Titles, 73 Wins",
    hook: "One player won <b>11 championships</b> in 13 years. One team won <b>73 games</b> in a single season. Greatness loves company — and dynasties.",
    beats: [
      { t: "lead", html: "Championships are the ultimate team record. A few players and teams stacked them up in ways that may never be repeated." },
      { t: "photo", file: "Bill Russell and Red Auerbach 1966 Champions.jpg", caption: "Bill Russell (with coach Red Auerbach) won 11 NBA titles with the Boston Celtics.", credit: "(" + WC + ")", fallback: "trophy", tall: false },
      { t: "statline", title: "Championship records", stats: [
        { v: "11", k: "Bill Russell's titles (most ever)" }, { v: "6", k: "Jordan's titles (Bulls)" }, { v: "6", k: "Kareem's MVPs (most ever)" },
      ], note: "Bill Russell's 11 rings in 13 seasons is the gold standard no player has matched." },
      { t: "p", html: "Then there are the great team runs: the 1960s Celtics, the 1980s Lakers and Celtics, the 1990s Chicago Bulls, and the 2010s Golden State Warriors. The Warriors' <b>2015–16 team went 73–9</b> — the most wins in a single season ever, breaking the Bulls' old record of 72–10." },
      { t: "fact", label: "Wins aren't everything:", html: "Wild twist: that record-setting 73–9 Warriors team actually <b>lost</b> the 2016 Finals — to LeBron's Cavaliers. Even the winningest regular season ever doesn't guarantee a championship." },
      { t: "p", html: "Russell's Celtics also won <b>eight titles in a row</b> (1959–1966) — a streak no team in any major U.S. pro sport has ever matched. The Celtics and Lakers have piled up the most championships of all, and they've met in the Finals again and again." },
      { t: "fact", label: "Most MVPs:", html: "The Most Valuable Player award has gone to <b>Kareem Abdul-Jabbar</b> a record six times — more than anyone in NBA history." },
      { t: "p", html: "A 'dynasty' is a team that keeps winning over many years — not one lucky season. Building one takes more than a superstar: it takes a great supporting cast and a great coach, all pulling the same direction." },
      { t: "fact", label: "Behind every dynasty:", html: "Russell had coach Red Auerbach; Jordan had Scottie Pippen and coach Phil Jackson; Curry had Klay Thompson and Draymond Green. The legends always had the right people around them." },
      { t: "banner", html: "Rings are won by teams, not just stars. The greatest players made everyone around them better — that's how dynasties are built." },
    ],
    quiz: [
      { q: "Who won the most championships of any NBA player?", type: "mc", options: ["Michael Jordan", "Bill Russell", "LeBron James", "Kobe Bryant"], answer: 1, explain: "Bill Russell won 11 titles with the Celtics — the most ever." },
      { q: "How many games did the record-setting 2015–16 Warriors win?", type: "mc", options: ["70", "72", "73", "75"], answer: 2, explain: "73–9, the most wins in a single NBA season." },
      { q: "Who won the most MVP awards in NBA history (six)?", type: "mc", options: ["Kareem Abdul-Jabbar", "Michael Jordan", "Wilt Chamberlain", "LeBron James"], answer: 0, explain: "Kareem Abdul-Jabbar won MVP a record six times." },
      { q: "Michael Jordan won six championships with which team?", type: "mc", options: ["New York Knicks", "Chicago Bulls", "LA Lakers", "Boston Celtics"], answer: 1, explain: "Jordan's Chicago Bulls won six titles in the 1990s." },
      { q: "What is a basketball 'dynasty'?", type: "mc", options: ["A team that keeps winning over many years", "A single great game", "A type of shot", "A championship trophy"], answer: 0, explain: "Dynasties — like the Celtics, Bulls, and Warriors — rule for a whole era." },
      { q: "The record-setting 73–9 Warriors went on to win the title that season.", type: "tf", options: ["True", "False"], answer: 1, explain: "They actually lost the 2016 Finals to LeBron's Cavaliers — wins aren't everything." },
    ],
  });

  lesson({
    id: "r3", section: "records", n: 3, minutes: 5, title: "Stat Kings: Boards, Dimes & Triple-Doubles",
    hook: "Scoring gets the headlines. But rebounds, assists, steals, blocks — and the magical <b>triple-double</b> — crown their own kings.",
    beats: [
      { t: "lead", html: "A 'triple-double' means double-digits in three stats in one game — like 10 points, 10 rebounds, 10 assists. It's the sign of a do-everything player." },
      { t: "statline", title: "Record holders (NBA all-time)", stats: [
        { v: "23,924", k: "Wilt — career rebounds" }, { v: "15,806", k: "Stockton — career assists" }, { v: "3,830", k: "Hakeem — career blocks" },
      ], note: "John Stockton also holds the career steals record (3,265). These leaders have stood for years." },
      { t: "p", html: "The triple-double king is <b>Russell Westbrook</b>, who in 2021 passed the legendary <b>Oscar Robertson</b> for the most career triple-doubles. Robertson did something wild first, though: back in 1961–62 he <b>averaged a triple-double for an entire season</b> — and Westbrook later matched that feat several times." },
      { t: "fact", label: "Glass cleaner:", html: "Wilt Chamberlain once grabbed <b>55 rebounds in a single game</b> — another record that still stands. He was a rebounding machine." },
      { t: "p", html: "John Stockton's numbers are almost unfair: he holds the all-time records for <b>both assists (15,806) and steals (3,265)</b>. He set them by being incredibly steady — barely missing a single game across 19 seasons." },
      { t: "fact", label: "Iron man:", html: "In one season Wilt averaged over <b>48 minutes per game</b> — meaning, with overtimes, he basically <i>never left the floor</i>. Durability is a superpower too." },
      { t: "p", html: "Quick guide: a <b>rebound</b> is grabbing a missed shot, an <b>assist</b> is a pass that leads to a basket, a <b>steal</b> takes the ball from the other team, and a <b>block</b> swats their shot away. The best players pile up all of them, not just points." },
      { t: "fact", label: "Hustle is a skill:", html: "Dennis Rodman barely scored — but he led the league in rebounding <b>seven straight years</b> through pure effort and timing. Proof you can be a star by doing the dirty work nobody else wants." },
      { t: "banner", html: "The best players fill up the whole box score. Points are fun, but rebounds, assists, steals, and blocks win games too." },
    ],
    quiz: [
      { q: "A triple-double means reaching double digits in how many stats?", type: "mc", options: ["Two", "Three", "Four", "Five"], answer: 1, explain: "Three categories — like points, rebounds, and assists.", hint: "It's in the name: 'triple.'" },
      { q: "Who holds the record for most career triple-doubles?", type: "mc", options: ["Oscar Robertson", "Russell Westbrook", "Magic Johnson", "LeBron James"], answer: 1, explain: "Westbrook passed Oscar Robertson for the all-time lead in 2021." },
      { q: "Oscar Robertson once averaged a triple-double for an entire season.", type: "tf", options: ["True", "False"], answer: 0, explain: "He did it in 1961–62 — decades before Westbrook matched it." },
      { q: "Who is the NBA's all-time leader in rebounds?", type: "mc", options: ["Bill Russell", "Wilt Chamberlain", "Dennis Rodman", "Shaquille O'Neal"], answer: 1, explain: "Wilt Chamberlain pulled down 23,924 career rebounds — and once grabbed 55 in one game." },
      { q: "What is an 'assist' in basketball?", type: "mc", options: ["A pass that leads to a basket", "A missed shot", "A blocked shot", "A free throw"], answer: 0, explain: "An assist is the pass that sets up a teammate's score." },
      { q: "Dennis Rodman became a star mainly through which skill?", type: "mc", options: ["Rebounding and hustle", "Scoring", "Three-pointers", "Free throws"], answer: 0, explain: "He led the league in rebounding seven straight years without big scoring — hustle is a skill." },
    ],
  });

  lesson({
    id: "r4", section: "records", n: 4, minutes: 5, title: "The Three-Point Revolution: Curry's 4,000",
    hook: "The three-point line changed basketball forever — and one California guard turned it into a superpower nobody had ever seen.",
    beats: [
      { t: "lead", html: "The three-point line was added to the NBA in 1979. For years it was a specialty shot. Then Stephen Curry came along and made it the most dangerous weapon in the game." },
      { t: "photo", file: "Stephen Curry 2.jpg", caption: "Stephen Curry launching from deep — the all-time three-point king.", credit: "(" + WC + ", CC BY-SA 2.0)", fallback: "ball", tall: false },
      { t: "statline", title: "The made-threes record (2026)", stats: [
        { v: "4,248", k: "Curry — career threes" }, { v: "1st", k: "ever to reach 4,000" }, { v: "2", k: "MVP awards" },
      ], note: "Curry passed Ray Allen for the all-time lead in 2021 — and keeps extending it every game." },
      { t: "p", html: "Curry shoots from distances that used to be considered crazy, and he does it off the dribble, on the move, in a flash. Defenses have to guard him almost from half-court — which opens up the whole floor for his team." },
      { t: "fact", label: "Why it matters:", html: "Because of shooters like Curry, today's teams launch <b>way</b> more threes than teams did 20 years ago. He didn't just break a record — he changed how the whole sport is played." },
      { t: "p", html: "Curry passed the old record-holder, Ray Allen, in 2021 — and kept right on going. Alongside his 'Splash Brother' Klay Thompson, he turned Golden State into a three-point factory; Klay once made <b>14 threes in a single game</b>, a record all its own." },
      { t: "fact", label: "The simple math:", html: "A three-pointer is worth <b>50% more</b> than a regular basket. Once shooters like Curry proved you could make them in bunches, every team started hunting threes — which is exactly why the modern game looks so different." },
      { t: "p", html: "The three-pointer also makes comebacks faster: a team down by a lot can climb right back with a few quick shots from deep. In today's game, <b>no lead ever feels totally safe</b>." },
      { t: "p", html: "Curry's effect trickled all the way down to the playground — kids everywhere now launch deep threes and yell his name. He didn't just change the NBA; he changed how the game is played at every level." },
      { t: "banner", html: "Remember Curry's grit story? 'Too small' built the greatest shooting record in history — one rep at a time." },
    ],
    quiz: [
      { q: "Who holds the record for most career three-pointers?", type: "mc", options: ["Ray Allen", "Stephen Curry", "Reggie Miller", "Klay Thompson"], answer: 1, explain: "Curry passed Ray Allen in 2021 and is the first ever past 4,000 threes." },
      { q: "When was the three-point line added to the NBA?", type: "mc", options: ["1946", "1979", "2000", "1991"], answer: 1, explain: "It arrived in 1979 and slowly became central to the game." },
      { q: "Stephen Curry was the first player ever to make 4,000 career threes.", type: "tf", options: ["True", "False"], answer: 0, explain: "He reached 4,000 first — and keeps climbing (4,248 by June 2026)." },
      { q: "Curry's biggest effect on basketball was…", type: "mc", options: ["Making dunks illegal", "Changing how the whole game is played", "Slowing the game down", "Ending the three-point shot"], answer: 1, explain: "He helped make the three-pointer the most important shot in modern basketball." },
      { q: "Who is Curry's 'Splash Brother,' who once made 14 threes in a single game?", type: "mc", options: ["Klay Thompson", "Draymond Green", "Kevin Durant", "Ray Allen"], answer: 0, explain: "Klay Thompson — together they turned Golden State into a three-point factory." },
      { q: "Why is a three-pointer so valuable?", type: "mc", options: ["It's worth 50% more than a regular basket", "It's easier than a layup", "It stops the clock", "It counts as two baskets"], answer: 0, explain: "Three points vs. two — that's 50% more, which is why teams chase them." },
    ],
  });

  lesson({
    id: "r5", section: "records", n: 5, minutes: 5, title: "The Women's Game: Taurasi, A'ja & Caitlin",
    hook: "Records aren't a men-only list. The women's game has its own giants — a 10,000-point scorer, a four-time MVP, and a college phenomenon who broke a 54-year record.",
    beats: [
      { t: "lead", html: "The WNBA and women's college basketball are full of history-makers. Here are three you should know." },
      { t: "tradingcard", file: "A'ja Wilson (53756794398).jpg", name: "A'ja Wilson", team: "Las Vegas Aces", role: "First-ever 4× WNBA MVP (2025)", credit: "(" + WC + ")",
        stats: [{ v: "4", k: "MVPs" }, { v: "2024–25", k: "back-to-back" }] },
      { t: "p", html: "<b>Diana Taurasi</b> retired in 2025 as the WNBA's all-time leading scorer with <b>10,646 points</b> — the first and only player to pass 10,000. She also won three WNBA titles and six Olympic gold medals." },
      { t: "p", html: "<b>A'ja Wilson</b> made history in 2025 by becoming the <b>first four-time WNBA MVP</b> ever, breaking a tie with legends like Lisa Leslie and Sheryl Swoopes." },
      { t: "photo", file: "Caitlin Clark Final Four 2024.jpg", caption: "Caitlin Clark set the all-time NCAA Division I scoring record in 2024.", credit: "(" + WC + ")", fallback: "ball", tall: false },
      { t: "p", html: "<b>Caitlin Clark</b> of Iowa became the all-time NCAA Division I leading scorer in 2024 — men's or women's — passing 'Pistol' Pete Maravich's record that had stood since 1970, and finishing with 3,951 career points." },
      { t: "p", html: "Don't forget <b>Breanna Stewart</b> — a winner at every level: four national titles at UConn, WNBA championships and MVPs, and Olympic gold. She's one of the most decorated players of her era, women's or men's." },
      { t: "fact", label: "The game is booming:", html: "The WNBA began in 1997, and lately it has <b>exploded</b> in popularity. With stars like Clark, A'ja Wilson, and Stewart, recent seasons set records for fans in the stands and watching on TV — the women's game is bigger than ever." },
      { t: "p", html: "And the greats go back further too: <b>Sheryl Swoopes</b> and <b>Lisa Leslie</b> were early MVPs who built the league in its first years, and <b>Cynthia Cooper</b> led the very first WNBA dynasty in Houston." },
      { t: "fact", label: "Respect:", html: "Kobe Bryant admired Diana Taurasi's game so much he nicknamed her the <b>'White Mamba'</b> — a twist on his own 'Black Mamba.' The best players knew exactly how good she was." },
      { t: "banner", html: "Same game, same greatness. The women's record book is every bit as jaw-dropping as the men's." },
    ],
    quiz: [
      { q: "Who is the WNBA's all-time leading scorer?", type: "mc", options: ["A'ja Wilson", "Diana Taurasi", "Lisa Leslie", "Breanna Stewart"], answer: 1, explain: "Diana Taurasi retired in 2025 with 10,646 points — the only player past 10,000." },
      { q: "A'ja Wilson became the first player to win how many WNBA MVPs?", type: "mc", options: ["Two", "Three", "Four", "Five"], answer: 2, explain: "She became the first FOUR-time WNBA MVP in 2025." },
      { q: "Caitlin Clark broke a college scoring record that had stood since 1970, set by…", type: "mc", options: ["Pete Maravich", "Michael Jordan", "Larry Bird", "Magic Johnson"], answer: 0, explain: "She passed 'Pistol' Pete Maravich for the all-time NCAA Division I scoring record." },
      { q: "Women's basketball records are far less impressive than men's.", type: "tf", options: ["True", "False"], answer: 1, explain: "The women's record book is every bit as remarkable — 10,000 points, 4 MVPs, a 54-year record broken." },
      { q: "Which player led the very first WNBA dynasty, the Houston Comets?", type: "mc", options: ["Cynthia Cooper", "Caitlin Clark", "A'ja Wilson", "Sue Bird"], answer: 0, explain: "Cooper led the Comets to the league's first four championships." },
      { q: "Breanna Stewart has won championships AND MVP awards in the WNBA.", type: "tf", options: ["True", "False"], answer: 0, explain: "A winner at every level — UConn, the WNBA, and the Olympics." },
    ],
  });

  /* ============================================================
     SUBSECTION 3 — ROOTS & REVOLUTION (history)
     Honest but age-appropriate; the courage-and-triumph story of
     how the game was invented and transformed.
     ============================================================ */
  sec({
    id: "roots", name: "Roots & Revolution", emoji: "📜",
    color: "#caa12e", color2: "#6b5210",
    blurb: "A peach basket in 1891 → a global game. Courage included.",
    intro: "Basketball started with a teacher, a peach basket, and 13 rules. From there it became a story of invention and <b>courage</b> — of athletes who broke unfair barriers and changed not just a game, but a country.",
    badge: { name: "Hardwood Historian", emoji: "📜" },
    lessons: ["ro1", "ro2", "ro3", "ro4", "ro5", "ro6"],
    debate: {
      id: "d-roots", tag: "Big Debate — argue BOTH sides",
      q: "Can a game really change a country?",
      a: { label: "Yes, sports change society", h: "The case for yes",
        body: "When Texas Western's all-Black starting five beat all-white Kentucky in 1966, millions of people watched unfairness lose on national TV. When Bill Russell led teams and marched for civil rights, he changed minds. Sports put courage and fairness on the biggest stage — and people who watched were never quite the same." },
      b: { label: "Real change is bigger than sports", h: "The case for caution",
        body: "Games are powerful symbols, but laws, voters, teachers, and ordinary people did the hard work of changing the country. A basketball score didn't end unfairness by itself. Sports can <i>inspire</i> change — but it takes a whole society to actually make it happen." },
    },
    review: [
      { q: "Who invented basketball, and in what year?", type: "mc", options: ["Michael Jordan, 1984", "James Naismith, 1891", "Abe Saperstein, 1926", "Bill Russell, 1957"], answer: 1, explain: "James Naismith invented the game in 1891 with a peach basket and 13 rules." },
      { q: "What was the very first basketball 'hoop'?", type: "mc", options: ["A metal rim", "A peach basket", "A bucket", "A net on a pole"], answer: 1, explain: "Naismith nailed a peach basket to a railing — they had to fetch the ball out each time!" },
      { q: "The Harlem Globetrotters, founded in the 1920s, were famous for…", type: "mc", options: ["Losing on purpose", "Dazzling skill and showmanship", "Only playing in Harlem", "Being a college team"], answer: 1, explain: "The Globetrotters wowed the world with skill and showmanship, founded in 1926." },
      { q: "In 1950, three players broke the NBA's 'color line.' This means they…", type: "mc", options: ["Painted the court", "Were among the first Black players in the league", "Invented the three-pointer", "Were the tallest players"], answer: 1, explain: "Earl Lloyd, Chuck Cooper, and Nat Clifton broke the barrier that had kept Black players out." },
      { q: "Who was the first Black player to play in an NBA game (1950)?", type: "mc", options: ["Chuck Cooper", "Nat Clifton", "Earl Lloyd", "Bill Russell"], answer: 2, explain: "Earl Lloyd was first to step on the court (Oct 31, 1950); Cooper was first drafted, Clifton first signed." },
      { q: "What made Texas Western's 1966 NCAA title historic?", type: "mc", options: ["First overtime final", "First all-Black starting five to win it", "First tie game", "First women's title"], answer: 1, explain: "Texas Western started five Black players and beat all-white Kentucky — a turning point." },
      { q: "Bill Russell was also the first Black head coach in major U.S. pro sports.", type: "tf", options: ["True", "False"], answer: 0, explain: "He became the Celtics' player-coach in 1966 — and a leader in the civil-rights era." },
      { q: "Put these in time order: who came FIRST?", type: "mc", options: ["The Chicago Bulls dynasty", "Naismith invents basketball", "Texas Western wins the title", "Magic vs. Bird"], answer: 1, explain: "1891 (invention) → 1966 (Texas Western) → 1980s (Magic & Bird) → 1990s (Bulls)." },
      { q: "Who is often credited with taking basketball 'global' in the 1990s?", type: "mc", options: ["Michael Jordan", "James Naismith", "Wilt Chamberlain", "George Mikan"], answer: 0, explain: "Jordan's worldwide fame helped turn basketball into a global game." },
      { q: "The honest tone of this history is best described as…", type: "mc", options: ["Pretending nothing was unfair", "Courage and triumph over real barriers", "Only sad", "Only about winning"], answer: 1, explain: "We tell the hard parts honestly — and celebrate the courage that overcame them." },
    ],
  });

  lesson({
    id: "ro1", section: "roots", n: 1, minutes: 5, title: "1891: A Teacher and a Peach Basket",
    hook: "Basketball wasn't discovered — it was <b>invented</b>, on purpose, by one teacher who needed to keep a rowdy class busy indoors during a cold winter.",
    beats: [
      { t: "lead", html: "In December 1891, a physical-education teacher named <b>James Naismith</b> was asked to invent an indoor game for restless students in Springfield, Massachusetts." },
      { t: "photo", file: "Dr. James Naismith.jpg", caption: "Dr. James Naismith, who invented basketball in 1891.", credit: "(public domain, " + WC + ")", fallback: "court", tall: false },
      { t: "p", html: "He nailed a <b>peach basket</b> to a railing, wrote <b>13 simple rules</b>, and had students try to toss a soccer ball into it. The basket still had its bottom — so every time someone scored, they had to fetch the ball back out!" },
      { t: "photo", file: "Dr. James Naismith's Original 13 Rules of Basket Ball pg 1.jpg", caption: "Naismith's original 13 rules of 'Basket Ball.'", credit: "(public domain, " + WC + ")", fallback: "whistle", tall: false, contain: true },
      { t: "fact", label: "Original rule:", html: "In Naismith's first rules you <b>couldn't run with the ball</b> — you had to throw it from where you caught it. Dribbling came later." },
      { t: "p", html: "The very first game was a glorious mess: about nine players a side, lots of fouls, and a final score of just <b>1–0</b>. But the students loved it, and word spread fast from that one gym in Springfield." },
      { t: "fact", label: "From a gym to the Olympics:", html: "Naismith taught at a YMCA training school, and through the YMCA the game raced around the world. By <b>1936</b> basketball was an Olympic sport — and Naismith himself was there in Berlin to watch the game he invented." },
      { t: "p", html: "At first there were no nets at all — someone had to climb a ladder to fetch the ball out of the peach basket after <i>every single score!</i> Soon they cut the bottom out, then added open metal hoops and wooden backboards, and the game sped up." },
      { t: "fact", label: "Still true today:", html: "Many of Naismith's original ideas — no running with the ball, scoring by tossing it into a raised goal — are still the heart of basketball more than 130 years later." },
      { t: "banner", html: "From one peach basket and 13 rules grew a game now played and loved by hundreds of millions of people around the world." },
    ],
    quiz: [
      { q: "Who invented basketball?", type: "mc", options: ["James Naismith", "Michael Jordan", "Bill Russell", "Abe Saperstein"], answer: 0, explain: "James Naismith invented it in 1891.", hint: "He was a P.E. teacher in Massachusetts." },
      { q: "What did Naismith first use as a hoop?", type: "mc", options: ["A metal rim", "A peach basket", "A wooden box", "A barrel"], answer: 1, explain: "A peach basket — with the bottom still in it!" },
      { q: "Basketball was invented by accident while playing another sport.", type: "tf", options: ["True", "False"], answer: 1, explain: "It was invented on purpose, to give students an indoor winter game." },
      { q: "How many original rules did Naismith write?", type: "mc", options: ["5", "10", "13", "24"], answer: 2, explain: "13 simple rules started it all." },
      { q: "Why did players have to fetch the ball after early baskets?", type: "mc", options: ["The peach basket still had its bottom", "There was no court", "The ball was too big", "There were no referees"], answer: 0, explain: "The basket's bottom was still in — someone climbed a ladder to get the ball out!" },
      { q: "By what year had basketball become an Olympic sport, with Naismith there to watch?", type: "mc", options: ["1936", "1891", "1976", "2000"], answer: 0, explain: "It spread worldwide through the YMCA and reached the Olympics in 1936." },
    ],
  });

  lesson({
    id: "ro2", section: "roots", n: 2, minutes: 5, title: "The Early Game & the Harlem Globetrotters",
    hook: "Long before the NBA, traveling teams dazzled crowds. None more famous than the <b>Harlem Globetrotters</b> — masters of skill, joy, and showmanship.",
    beats: [
      { t: "lead", html: "In basketball's early decades, the pro game was a patchwork of barnstorming teams that traveled town to town to play. During the 1920s–40s, Black players built brilliant teams in an era often called the 'Black Fives.'" },
      { t: "p", html: "The most famous of all were the <b>Harlem Globetrotters</b>, founded in 1926. They combined real skill with dazzling tricks, comedy, and showmanship — and toured the world spreading the joy of the game." },
      { t: "p", html: "The Globetrotters actually started in <b>Chicago</b> — the 'Harlem' in their name told crowds they were a Black team. Led by organizer Abe Saperstein, they traveled constantly, often facing unfair treatment in the towns they visited, yet winning over fans everywhere with their brilliance and joy." },
      { t: "fact", label: "Proof they were great:", html: "The Globetrotters weren't just clowns — in 1948 they beat the powerful <b>Minneapolis Lakers</b>, the best pro team of the day. Wins like that helped convince the young NBA that Black players belonged at the top." },
      { t: "photo", file: "", caption: "The Harlem Globetrotters dazzled crowds worldwide with skill and showmanship.", credit: "(Hardwood illustration)", fallback: "globe", tall: false },
      { t: "fact", label: "Black Fives greats:", html: "Another team, the <b>New York Rens</b>, once won <b>88 games in a row</b> in 1932–33 — still the longest pro winning streak ever — even though segregation kept them out of the white leagues." },
      { t: "p", html: "Almost a hundred years later, the Globetrotters are <i>still</i> touring and performing for crowds around the world — a living link all the way back to basketball's earliest days." },
      { t: "banner", html: "The early game spread basketball far and wide — and showed that the players who'd soon be kept out unfairly were already among the very best." },
    ],
    quiz: [
      { q: "The Harlem Globetrotters were founded in which decade?", type: "mc", options: ["1890s", "1920s", "1960s", "1990s"], answer: 1, explain: "Founded in 1926, they became basketball's most famous traveling team." },
      { q: "The Globetrotters were famous for…", type: "mc", options: ["Skill, tricks, and showmanship", "Always losing", "Never traveling", "Playing only one game"], answer: 0, explain: "They mixed real skill with dazzling showmanship and toured the world." },
      { q: "The Globetrotters proved they were elite by beating the best all-white pro team of the day.", type: "tf", options: ["True", "False"], answer: 0, explain: "Their 1948–49 wins helped prove Black players belonged at the top." },
      { q: "Early pro teams mostly made money by…", type: "mc", options: ["Staying in one city", "Traveling town to town to play", "Selling peaches", "Playing only on TV"], answer: 1, explain: "They were 'barnstorming' teams that traveled to play wherever they could." },
      { q: "Which all-Black team won a record 88 games in a row in 1932–33?", type: "mc", options: ["The New York Rens", "The Lakers", "The Celtics", "Texas Western"], answer: 0, explain: "The New York Rens' 88-game streak is still the longest in pro basketball history." },
      { q: "The Harlem Globetrotters actually started in Chicago.", type: "tf", options: ["True", "False"], answer: 0, explain: "The 'Harlem' in their name signaled to crowds that they were a Black team." },
    ],
  });

  lesson({
    id: "ro3", section: "roots", n: 3, minutes: 6, title: "1950: Breaking the Color Line",
    hook: "For its first years, the NBA kept Black players out. In <b>1950</b>, three brave men changed that forever — and the game was never the same.",
    beats: [
      { t: "lead", html: "When the NBA began, an unwritten barrier — a 'color line' — kept Black players out of the league, even though many were clearly among the best in the world. This was part of a larger, unfair system of segregation in America." },
      { t: "p", html: "In 1950, three players broke that barrier in the same season:" },
      { t: "compare", title: "The three who broke the color line (1950)",
        a: { title: "Firsts", items: ["<b>Earl Lloyd</b> — first to <i>play</i> in an NBA game (Oct 31, 1950)", "<b>Chuck Cooper</b> — first to be <i>drafted</i> by an NBA team"] },
        b: { title: "And", items: ["<b>Nat 'Sweetwater' Clifton</b> — first to <i>sign</i> an NBA contract", "Together they opened the door that had been unfairly shut"] } },
      { t: "p", html: "It took real courage. These players faced insults and unfair treatment in many cities, yet they kept showing up, playing hard, and proving — game after game — that the old barrier never made any sense." },
      { t: "p", html: "This happened just a few years after Jackie Robinson broke baseball's color line in 1947 — America was still segregated, with unfair laws separating people by race. Lloyd joined the Washington Capitols, Cooper was drafted by the Celtics, and Clifton signed with the Knicks, each carrying that weight." },
      { t: "fact", label: "He kept breaking barriers:", html: "Earl Lloyd went on to <b>win an NBA championship</b> (1955) and later became one of the league's first Black coaches — opening doors not just on the court, but on the sidelines too." },
      { t: "fact", label: "Why it matters:", html: "Within a few years, Black athletes were not just <i>allowed</i> in the league — they were transforming and elevating it. Today's game grew directly from the door these three men pushed open." },
      { t: "p", html: "Breaking a barrier is one thing; surviving it is another. In some cities these players couldn't stay in the same hotels or eat in the same restaurants as their own teammates — yet they kept their dignity and let their play do the talking." },
      { t: "banner", html: "Their courage is the reason the game could become what it is. They didn't just join the league — they changed who the league could be for." },
    ],
    quiz: [
      { q: "What was the NBA 'color line'?", type: "mc", options: ["A line on the court", "A barrier that kept Black players out", "The three-point line", "A type of jersey"], answer: 1, explain: "It was an unfair barrier that excluded Black players from the early NBA." },
      { q: "Who was the first Black player to PLAY in an NBA game?", type: "mc", options: ["Chuck Cooper", "Earl Lloyd", "Nat Clifton", "Bill Russell"], answer: 1, explain: "Earl Lloyd stepped on the court first, on October 31, 1950." },
      { q: "All three barrier-breakers did it in the same year, 1950.", type: "tf", options: ["True", "False"], answer: 0, explain: "Lloyd, Cooper, and Clifton all broke through in the 1950 season." },
      { q: "What did these players face as they broke the barrier?", type: "mc", options: ["An easy welcome everywhere", "Insults and unfair treatment, met with courage", "No challenges at all", "Instant retirement"], answer: 1, explain: "They faced real unfairness — and kept showing up and proving themselves." },
      { q: "Breaking the NBA's color line came a few years after which athlete broke baseball's color line?", type: "mc", options: ["Jackie Robinson", "Babe Ruth", "Hank Aaron", "Willie Mays"], answer: 0, explain: "Jackie Robinson broke baseball's color line in 1947 — America was still segregated." },
      { q: "After breaking in, these players sometimes couldn't stay in the same hotels as their own teammates.", type: "tf", options: ["True", "False"], answer: 0, explain: "They faced segregation on the road, yet kept their dignity and let their play talk." },
    ],
  });

  lesson({
    id: "ro4", section: "roots", n: 4, minutes: 5, title: "1966: Texas Western Changes Everything",
    hook: "A team that started <b>five Black players</b> — unheard of at the time — beat a famous all-white team for the national title. The country was watching.",
    beats: [
      { t: "lead", html: "In 1966, college basketball's championship game featured <b>Texas Western</b> (now UTEP) against the powerful, all-white University of Kentucky." },
      { t: "p", html: "Texas Western's coach, Don Haskins, started <b>five Black players</b> — something no team had ever done in an NCAA title game. At the time, many people wrongly believed that wasn't possible at the highest level." },
      { t: "statline", title: "The 1966 NCAA Championship", stats: [
        { v: "72–65", k: "Texas Western wins" }, { v: "5", k: "Black starters (a first)" }, { v: "1966", k: "a turning point" },
      ], note: "The result helped shatter an ugly myth and sped up the integration of college basketball across the country." },
      { t: "p", html: "Texas Western won, 72–65. Millions saw unfairness lose on the sport's biggest college stage — and college teams across the South began to change who they recruited." },
      { t: "p", html: "At the time, an ugly unwritten rule across much of college basketball limited how many Black players a team would put on the floor at once. Coach Don Haskins ignored it and simply played his five best players — against Kentucky's powerful all-white team and its famous coach." },
      { t: "fact", label: "The story lives on:", html: "Texas Western's win mattered so much it later became a book and the movie <b>'Glory Road.'</b> Within a few years, Southern college teams that had refused to recruit Black players began to change." },
      { t: "p", html: "Texas Western (now called UTEP) was a small school in El Paso, Texas — not a national power. That an underdog starting five Black players could beat mighty, all-white Kentucky made the result impossible for the country to ignore." },
      { t: "fact", label: "Heroes, then and now:", html: "Some people sent the team hateful messages afterward — but history remembers those players as heroes who helped change the sport for good." },
      { t: "banner", html: "One game didn't fix everything — but it proved the old myths wrong in front of the whole country, and the sport changed faster because of it." },
    ],
    quiz: [
      { q: "What made Texas Western's 1966 title historic?", type: "mc", options: ["First all-Black starting five to win it", "First overtime", "First women's title", "First tie"], answer: 0, explain: "They started five Black players and won — a first in an NCAA title game." },
      { q: "Who did Texas Western beat in the 1966 final?", type: "mc", options: ["Duke", "Kentucky", "UCLA", "Kansas"], answer: 1, explain: "They beat the all-white University of Kentucky, 72–65." },
      { q: "The 1966 game helped speed up integration in college basketball.", type: "tf", options: ["True", "False"], answer: 0, explain: "It shattered a myth and pushed Southern teams to change who they recruited." },
      { q: "The lesson of Texas Western is that a single game…", type: "mc", options: ["Fixes everything instantly", "Can prove old myths wrong and push change", "Means nothing", "Is only about the score"], answer: 1, explain: "It didn't fix everything, but it proved the doubters wrong on the biggest stage." },
      { q: "Texas Western (now UTEP) was a small school located in…", type: "mc", options: ["El Paso, Texas", "Lexington, Kentucky", "Los Angeles, California", "New York, New York"], answer: 0, explain: "A small school in El Paso, Texas — making the upset even bigger." },
      { q: "Which movie tells the story of Texas Western's 1966 title?", type: "mc", options: ["Glory Road", "Space Jam", "Hoosiers", "The Last Dance"], answer: 0, explain: "'Glory Road' brought the team's courageous story to a new generation." },
    ],
  });

  lesson({
    id: "ro5", section: "roots", n: 5, minutes: 5, title: "Bill Russell: Champion and Leader",
    hook: "He won more championships than any player ever — <b>11</b>. Then he broke another barrier as a coach, and stood up for what was right off the court too.",
    beats: [
      { t: "lead", html: "Bill Russell was the ultimate winner: 11 NBA championships with the Boston Celtics in just 13 seasons. He won by playing defense and rebounding like no one before him — making everyone around him better." },
      { t: "photo", file: "Civil Rights March on Washington, D.C. (Former National Basketball Association player, Bill Russell.) - NARA - 542073.jpg", caption: "Bill Russell at the 1963 March on Washington — a champion and a civil-rights leader.", credit: "(National Archives, public domain)", fallback: "trophy", tall: false },
      { t: "p", html: "In 1966, Russell became the <b>first Black head coach</b> in any major U.S. professional sport — as the Celtics' player-coach — and he won titles in that role too." },
      { t: "p", html: "Russell won everywhere he went: an NCAA championship in college (at San Francisco) and an Olympic gold medal in 1956, even before his 11 NBA titles. His battles with Wilt Chamberlain became the stuff of legend." },
      { t: "fact", label: "Bigger than basketball:", html: "Russell marched for civil rights and spoke out against unfairness, even when it cost him. He believed standing up for what's right mattered more than comfort or popularity." },
      { t: "fact", label: "Honored forever:", html: "Russell received the Presidential Medal of Freedom in 2011. And when he passed away in 2022, the NBA retired his number <b>6 across the entire league</b> — the first time it had ever done that for anyone." },
      { t: "p", html: "Russell won by making everyone better. He blocked shots like no one before him, ruled the boards, and started fast breaks that buried opponents — defense and teamwork over flashy scoring." },
      { t: "quote", html: "The most important measure of how good a game I played was how much better I'd made my teammates play.", who: "Bill Russell" },
      { t: "banner", html: "Russell's record — 11 rings — may never be broken. But his courage off the court is just as much a part of why he's a legend." },
    ],
    quiz: [
      { q: "How many championships did Bill Russell win?", type: "mc", options: ["6", "8", "11", "5"], answer: 2, explain: "11 titles in 13 seasons — the most of any player ever." },
      { q: "Russell was the first Black head coach in major U.S. pro sports.", type: "tf", options: ["True", "False"], answer: 0, explain: "He became the Celtics' player-coach in 1966." },
      { q: "Russell was famous mostly for…", type: "mc", options: ["Defense and rebounding", "Only scoring", "Three-pointers", "Dunk contests"], answer: 0, explain: "His defense and rebounding made his teams unbeatable." },
      { q: "Off the court, Russell was known for…", type: "mc", options: ["Avoiding all causes", "Standing up for civil rights", "Refusing to lead", "Only caring about stats"], answer: 1, explain: "He marched and spoke out for civil rights, even at personal cost." },
      { q: "Russell made his team great mainly through…", type: "mc", options: ["Defense and teamwork", "Three-point shooting", "Dunk contests", "Free throws"], answer: 0, explain: "Shot-blocking, rebounding, and trust — he made everyone around him better." },
      { q: "When Russell died in 2022, the NBA retired his number 6 across the entire league.", type: "tf", options: ["True", "False"], answer: 0, explain: "The first time the league ever retired a number for every team at once." },
    ],
  });

  lesson({
    id: "ro6", section: "roots", n: 6, minutes: 5, title: "The Revolution: Dr. J to Magic, Bird & Jordan",
    hook: "From a soaring high-flyer to a rivalry that saved the league to a man who took basketball <b>global</b> — this is how the modern game caught fire.",
    beats: [
      { t: "lead", html: "By the 1970s, a bold rival league called the <b>ABA</b> brought flash and creativity — the slam-dunk contest, the red-white-and-blue ball, and a star named <b>Julius 'Dr. J' Erving</b> who made flying through the air look like art." },
      { t: "p", html: "The ABA merged into the NBA in 1976 and brought its style along. Dr. J once dunked after leaping from near the <b>free-throw line</b> — as if he could fly. Creativity and high-flying flair became part of the game forever." },
      { t: "order", title: "How the modern game caught fire", sub: "Put these eras in order, earliest to latest.",
        items: [
          { yr: "1970s", label: "Dr. J & the high-flying ABA" },
          { yr: "1980s", label: "Magic Johnson vs. Larry Bird save the NBA" },
          { yr: "1990s", label: "Michael Jordan takes the game global" },
          { yr: "Today", label: "An overwhelmingly Black, globally beloved game" },
        ] },
      { t: "p", html: "In the 1980s, the rivalry between <b>Magic Johnson</b>'s Lakers and <b>Larry Bird</b>'s Celtics brought fans roaring back to the NBA. Then in the 1990s, <b>Michael Jordan</b> became the most famous athlete on Earth and made basketball a <b>global</b> game." },
      { t: "fact", label: "The Dream Team:", html: "In 1992, the U.S. sent its first squad of NBA stars — Jordan, Magic, Bird and more — to the Olympics. This 'Dream Team' was so beloved around the world that it helped basketball catch fire in country after country." },
      { t: "p", html: "Today's NBA and WNBA are overwhelmingly Black and increasingly global — players come from every continent (remember Giannis from Greece). The game Naismith invented in one gym now belongs to the whole world." },
      { t: "p", html: "Each era handed the game to the next: the ABA's creativity, Magic and Bird's rivalry, Jordan's worldwide fame, and now a global league of superstars. Nobody 'owns' basketball — every generation adds something new." },
      { t: "fact", label: "A world game:", html: "Today's players come from more than 40 countries — Greece, Slovenia, Serbia, Cameroon, Australia and beyond — a long, long way from one teacher's gym in Springfield." },
      { t: "banner", html: "From a peach basket to a planet of fans — the throughline is courage, creativity, and excellence, generation after generation." },
    ],
    quiz: [
      { q: "Which 1980s rivalry helped save the NBA?", type: "mc", options: ["Magic Johnson vs. Larry Bird", "Curry vs. LeBron", "Shaq vs. Kobe", "Wilt vs. Russell"], answer: 0, explain: "Magic's Lakers vs. Bird's Celtics brought fans roaring back." },
      { q: "Who is most credited with taking basketball global in the 1990s?", type: "mc", options: ["Michael Jordan", "Dr. J", "Magic Johnson", "Naismith"], answer: 0, explain: "Jordan became the most famous athlete on Earth and globalized the game." },
      { q: "The ABA introduced fun features like the slam-dunk contest.", type: "tf", options: ["True", "False"], answer: 0, explain: "The ABA brought the dunk contest, the colorful ball, and high-flying style." },
      { q: "Today's game is best described as…", type: "mc", options: ["Played only in America", "Global, with stars from every continent", "Smaller than ever", "Exactly like 1891"], answer: 1, explain: "Players now come from all over the world — basketball belongs to the planet." },
      { q: "The 1992 U.S. Olympic 'Dream Team' helped do what?", type: "mc", options: ["Spread basketball around the world", "End the NBA", "Invent the three-pointer", "Start the WNBA"], answer: 0, explain: "Jordan, Magic, Bird and more made the world fall in love with the game." },
      { q: "About how many countries do today's NBA players come from?", type: "mc", options: ["More than 40", "Exactly 2", "About 5", "Just 1"], answer: 0, explain: "From Greece to Slovenia to Cameroon — a long way from one gym in Springfield." },
    ],
  });

  /* ============================================================
     SUBSECTION 4 — LEGENDS & GREATEST MOMENTS (pure fun)
     ============================================================ */
  sec({
    id: "legends", name: "Legends & Greatest Moments", emoji: "🏆",
    color: "#ff7a18", color2: "#8a3a0a",
    blurb: "The GOATs, the iconic moments, the signature moves.",
    intro: "Now the pure fun: the greatest players ever, the moments every fan should know, the signature moves — and the argument that never ends: <b>who's the GOAT?</b>",
    badge: { name: "Hall of Famer", emoji: "🏆" },
    lessons: ["leg1", "leg2", "leg3", "leg4"],
    debate: {
      id: "d-goat", tag: "🐐 The GOAT Debate — argue BOTH sides",
      q: "Who's the GOAT — Michael Jordan or LeBron James?",
      setup: "There's no single right answer. Great fans can argue either side — and the BEST fans can argue <i>both</i>. Try it.",
      a: { label: "Michael Jordan", h: "The case for Jordan",
        body: "6 NBA Finals, 6 championships, 6 Finals MVPs — and he never lost in the Finals. Five regular-season MVPs, an unmatched will to win, and a global fame that turned basketball into a worldwide game. For many, perfect Finals record = GOAT." },
      b: { label: "LeBron James", h: "The case for LeBron",
        body: "The all-time leading scorer (43,440 points), four titles with three different teams, four MVPs, and greatness for 20+ seasons — longevity nobody has matched. He fills up every stat column and makes everyone better. For many, the most complete career ever = GOAT." },
    },
    review: [
      { q: "Which player is famous for 'The Shot,' the 'Flu Game,' and six titles?", type: "mc", options: ["LeBron James", "Michael Jordan", "Kobe Bryant", "Magic Johnson"], answer: 1, explain: "All three belong to Michael Jordan's legendary career." },
      { q: "Whose signature move was the unblockable 'skyhook'?", type: "mc", options: ["Hakeem Olajuwon", "Kareem Abdul-Jabbar", "Shaquille O'Neal", "Tim Duncan"], answer: 1, explain: "Kareem's skyhook helped make him the longtime all-time scoring leader." },
      { q: "In the 2016 Finals, LeBron made a famous game-saving play known as…", type: "mc", options: ["The Shot", "The Block", "The Dream Shake", "The Wave"], answer: 1, explain: "'The Block' on Andre Iguodala in Game 7 helped Cleveland win the title." },
      { q: "Kobe Bryant's legendary single-game total was…", type: "mc", options: ["50", "61", "81", "100"], answer: 2, explain: "Kobe scored 81 points in one game in 2006." },
      { q: "Which center's footwork move was nicknamed the 'Dream Shake'?", type: "mc", options: ["Shaquille O'Neal", "Hakeem Olajuwon", "Bill Russell", "Wilt Chamberlain"], answer: 1, explain: "Hakeem 'The Dream' Olajuwon's dizzying footwork was the 'Dream Shake.'" },
      { q: "Damian Lillard's famous series-winner where he waved goodbye was against which team?", type: "mc", options: ["Oklahoma City Thunder", "LA Lakers", "Boston Celtics", "Miami Heat"], answer: 0, explain: "Lillard's deep buzzer-beater 'waved goodbye' to the Thunder in 2019." },
      { q: "Which of these is a WNBA legend?", type: "mc", options: ["Sue Bird", "Larry Bird", "Bird Brain", "Big Bird"], answer: 0, explain: "Sue Bird is a WNBA legend — most career assists, 4 titles, 5 Olympic golds." },
      { q: "Lisa Leslie made history as the first player to do what in a WNBA game?", type: "mc", options: ["Score 100", "Dunk", "Coach", "Miss on purpose"], answer: 1, explain: "Lisa Leslie threw down the first dunk in WNBA history in 2002." },
      { q: "The 'GOAT debate' has one correct, final answer everyone agrees on.", type: "tf", options: ["True", "False"], answer: 1, explain: "There's no single right answer — the fun is arguing both sides!" },
      { q: "Ray Allen's clutch 2013 Finals shot was a…", type: "mc", options: ["Half-court heave", "Corner three", "Free throw", "Dunk"], answer: 1, explain: "Ray Allen's corner three saved Game 6 of the 2013 Finals for Miami." },
    ],
  });

  lesson({
    id: "leg1", section: "legends", n: 1, minutes: 5, title: "The GOATs: The Greatest of All Time",
    hook: "Every fan has a list. Here are the names that appear on almost <b>all</b> of them — the towering legends of the game.",
    beats: [
      { t: "lead", html: "Who's the greatest ever? Fans argue forever (you'll get your turn in the debate card!). But a handful of players appear on nearly every list." },
      { t: "cards", cards: [
        { file: "Jordan by Lipofsky 16577.jpg", name: "Michael Jordan", team: "Bulls", number: "23", role: "6 titles · 6 Finals MVPs", credit: "(" + WC + ")", stats: [{ v: "6", k: "rings" }, { v: "5", k: "MVPs" }] },
        { file: "LeBron James Lakers.jpg", name: "LeBron James", team: "Lakers", number: "23", role: "All-time scoring leader", credit: "(" + WC + ")", stats: [{ v: "4", k: "rings" }, { v: "43k+", k: "points" }] },
        { file: "Kareem Abdul-Jabbar 1974.jpeg", name: "Kareem", team: "Lakers", number: "33", role: "6 MVPs · the skyhook", credit: "(" + WC + ")", stats: [{ v: "6", k: "rings" }, { v: "6", k: "MVPs" }] },
      ] },
      { t: "p", html: "Add to them <b>Magic Johnson</b> and <b>Larry Bird</b> (the rivalry that saved the league), <b>Wilt Chamberlain</b> and <b>Bill Russell</b> (the giants of the early game), <b>Kobe Bryant</b> and <b>Shaquille O'Neal</b> (the Lakers' unstoppable duo), and big men <b>Hakeem Olajuwon</b> and <b>Tim Duncan</b>." },
      { t: "p", html: "How do you even rank them? Some fans count championships, some count MVP awards, some value who changed the game or stayed great the longest. Because everyone weighs it differently, the 'GOAT' argument never truly ends — and that's exactly the fun of it." },
      { t: "fact", label: "Jordan's case:", html: "Michael Jordan went <b>6-for-6</b> in the Finals — six titles, six Finals MVPs, never beaten on the biggest stage — plus five regular-season MVPs and ten scoring titles. For many fans, that's the GOAT résumé." },
      { t: "fact", label: "California note:", html: "Look how many wore <b>purple and gold</b>: Kareem, Magic, Kobe, Shaq, and now LeBron — the Lakers have collected legends for decades." },
      { t: "p", html: "Look closer and every name has a case. <b>Tim Duncan</b> quietly won five titles as maybe the most fundamentally perfect big man ever; <b>Kobe Bryant</b> chased Jordan's greatness with legendary work habits and won five titles of his own." },
      { t: "fact", label: "From everywhere:", html: "<b>Hakeem Olajuwon</b> grew up in Nigeria and barely played basketball until he was a teenager — then became one of the greatest centers the game has ever seen." },
      { t: "banner", html: "There's no single 'right' GOAT — that's what makes the argument so fun. But these are the names every fan should know." },
    ],
    quiz: [
      { q: "Which player won six titles and six Finals MVPs with the Bulls?", type: "mc", options: ["Michael Jordan", "Magic Johnson", "Tim Duncan", "Shaquille O'Neal"], answer: 0, explain: "Jordan went 6-for-6 in the Finals — never lost on the biggest stage." },
      { q: "Who is the NBA's all-time leading scorer?", type: "mc", options: ["Kobe Bryant", "LeBron James", "Larry Bird", "Wilt Chamberlain"], answer: 1, explain: "LeBron James — 43,440 points and counting." },
      { q: "There's one correct answer to 'who is the GOAT.'", type: "tf", options: ["True", "False"], answer: 1, explain: "Nope — it's an endless, fun debate with no single right answer." },
      { q: "Which legendary duo starred for the Lakers?", type: "mc", options: ["Kobe & Shaq", "Bird & Magic", "Curry & Klay", "Stockton & Malone"], answer: 0, explain: "Kobe Bryant and Shaquille O'Neal won three straight titles together." },
      { q: "Which legendary center grew up in Nigeria and barely played until he was a teenager?", type: "mc", options: ["Hakeem Olajuwon", "Tim Duncan", "Shaquille O'Neal", "Bill Russell"], answer: 0, explain: "Hakeem 'The Dream' became one of the greatest centers ever." },
      { q: "Michael Jordan's Finals record was…", type: "mc", options: ["6 wins in 6 tries — never lost", "3 wins in 5 tries", "4 wins in 7 tries", "2 wins in 4 tries"], answer: 0, explain: "6-for-6 in the Finals, with six Finals MVPs — a big part of his GOAT case." },
    ],
  });

  lesson({
    id: "leg2", section: "legends", n: 2, minutes: 5, title: "Iconic Moments Every Fan Knows",
    hook: "Some plays are so famous they get their own names: <b>The Shot. The Block. The Flu Game.</b> Here are the moments that live forever.",
    beats: [
      { t: "lead", html: "Basketball history is made of unforgettable seconds. Learn these and you'll always have something to talk about with any fan." },
      { t: "compare", title: "Moments with their own names",
        a: { title: "Jordan's legend", items: ["<b>'The Shot'</b> (1989) — buzzer-beater over Cleveland", "<b>'The Flu Game'</b> (1997) — 38 points while sick", "His <b>last shot</b> (1998) — title-winner over Utah"] },
        b: { title: "More iconic moments", items: ["<b>Ray Allen's corner three</b> (2013) — saved the Finals for Miami", "<b>LeBron's 'The Block'</b> (2016) — Game 7 chase-down", "<b>Kobe's 81</b> (2006) · <b>Lillard's wave goodbye</b> (2019)"] } },
      { t: "p", html: "Each of these came down to one player, one moment, and a whole lot of preparation. The 'clutch' players aren't lucky — they've practiced those exact shots thousands of times." },
      { t: "p", html: "Take Jordan's '<b>Flu Game</b>' (1997): so sick he could barely stand, he scored 38 and won a Finals game anyway. Or Ray Allen's 2013 corner three — Miami was seconds from losing the title when he backpedaled to the <i>exact</i> corner he'd practiced a thousand times and buried it. They won in overtime, then took Game 7." },
      { t: "fact", label: "The Block:", html: "In Game 7 of the 2016 Finals, LeBron chased down a fast break and pinned the ball against the backboard — a defensive play so famous it's just called <b>'The Block.'</b> Cleveland won the title minutes later." },
      { t: "p", html: "'<b>The Shot</b>' (1989): Jordan rose at the buzzer over Cleveland's Craig Ehlo and sank a jumper to win a playoff series — then leaped and pumped both fists in one of the most famous photos in all of sports." },
      { t: "fact", label: "From way downtown:", html: "Damian Lillard's 2019 series-winner came from <b>37 feet</b> — basically the moment he crossed half-court — and after it dropped, he calmly waved goodbye to the other team." },
      { t: "p", html: "And Kobe Bryant's <b>81-point game</b> (2006) is the second-most points ever scored in a single night — a one-man explosion fans still talk about today." },
      { t: "banner", html: "Big moments look like magic. They're really the payoff of countless boring reps nobody saw." },
    ],
    quiz: [
      { q: "What is 'The Block' (2016)?", type: "mc", options: ["A Jordan dunk", "LeBron's Game 7 chase-down save", "A Curry three", "A Kobe pass"], answer: 1, explain: "LeBron's chase-down block in Game 7 helped Cleveland win the 2016 title." },
      { q: "Ray Allen's famous 2013 Finals shot was a…", type: "mc", options: ["Corner three", "Dunk", "Free throw", "Half-court heave"], answer: 0, explain: "His clutch corner three saved Game 6 for Miami." },
      { q: "'Clutch' players succeed mostly because of luck.", type: "tf", options: ["True", "False"], answer: 1, explain: "They've practiced those shots thousands of times — preparation, not luck." },
      { q: "Damian Lillard 'waved goodbye' after a buzzer-beater against which team?", type: "mc", options: ["Thunder", "Lakers", "Celtics", "Warriors"], answer: 0, explain: "His deep series-winner sent the Thunder home in 2019." },
      { q: "From about how far away was Lillard's 2019 series-winning shot?", type: "mc", options: ["37 feet", "3 feet", "94 feet", "10 feet"], answer: 0, explain: "About 37 feet — basically the moment he crossed half-court." },
      { q: "What was Jordan's 'Flu Game' (1997)?", type: "mc", options: ["Scoring 38 while very sick in the Finals", "A game he sat out", "A dunk contest", "A blowout loss"], answer: 0, explain: "Barely able to stand, he scored 38 and won a Finals game anyway." },
    ],
  });

  lesson({
    id: "leg3", section: "legends", n: 3, minutes: 5, title: "Signature Moves: The Art of the Game",
    hook: "The skyhook. The Dream Shake. The fadeaway. The crossover. The dunk. Great players don't just play — they have a <b>signature</b>.",
    beats: [
      { t: "lead", html: "A signature move is a player's trademark — the thing defenders know is coming and still can't stop." },
      { t: "compare", title: "Legendary signature moves",
        a: { title: "Big-man magic", items: ["<b>Skyhook</b> — Kareem's high, unblockable arc", "<b>Dream Shake</b> — Hakeem's dizzying footwork", "<b>Drop step</b> — power to the rim"] },
        b: { title: "Guard & wing flash", items: ["<b>Fadeaway</b> — Jordan & Kobe leaning back", "<b>Crossover</b> — Iverson freezing defenders", "<b>The dunk</b> — the loudest two points in sports"] } },
      { t: "photo", file: "Kareem Abdul-Jabbar 1974.jpeg", caption: "Kareem Abdul-Jabbar, master of the unblockable skyhook.", credit: "(" + WC + ")", fallback: "hoop", tall: false },
      { t: "p", html: "Why was the skyhook unstoppable? Kareem shot it high, with his body between the ball and the defender — nobody could reach it, and he scored more points with it than anyone in history. The crossover (think Iverson, or Tim Hardaway's 'killer crossover') works the opposite way: pure speed and deception that freezes a defender in place." },
      { t: "fact", label: "Try it yourself:", html: "Most signature moves start simple. A crossover is just a quick change of direction — but practiced 10,000 times, it becomes unstoppable. Every 'natural' move is really a built one." },
      { t: "p", html: "The <b>fadeaway</b> is a shot taken while jumping <i>backward</i>, away from the defender — Jordan and Kobe made it deadly because it's nearly impossible to block. Its modern cousin, the <b>step-back</b>, creates the same kind of space for a jumper." },
      { t: "p", html: "The <b>dunk</b> is the loudest play in sports — and it has its own art form: the slam-dunk contest, where players leap over cars or take off from the free-throw line. Many fans still call <b>Vince Carter's 2000 contest</b> the greatest ever." },
      { t: "p", html: "Don't forget the <b>no-look pass</b> — Magic Johnson's trademark — where he'd stare one way and fire the ball the other, fooling defenders and dazzling the crowd. The most famous crossover ever? A young <b>Allen Iverson crossing up Michael Jordan</b> in 1997." },
      { t: "banner", html: "Signature moves are reps made visible. The flash you see is years of work you didn't." },
    ],
    quiz: [
      { q: "Whose signature move was the 'skyhook'?", type: "mc", options: ["Kareem Abdul-Jabbar", "Allen Iverson", "Stephen Curry", "Magic Johnson"], answer: 0, explain: "Kareem's high, unblockable skyhook is one of the game's greatest moves." },
      { q: "The 'Dream Shake' belonged to which big man?", type: "mc", options: ["Shaquille O'Neal", "Hakeem Olajuwon", "Tim Duncan", "Wilt Chamberlain"], answer: 1, explain: "Hakeem 'The Dream' Olajuwon's footwork was the 'Dream Shake.'" },
      { q: "Allen Iverson was famous for which move?", type: "mc", options: ["Skyhook", "Crossover", "Fadeaway", "Drop step"], answer: 1, explain: "His lightning crossover left defenders frozen." },
      { q: "Signature moves come naturally and need no practice.", type: "tf", options: ["True", "False"], answer: 1, explain: "They take thousands of reps — the flash hides years of work." },
      { q: "Whose trademark was the 'no-look pass'?", type: "mc", options: ["Magic Johnson", "Kareem Abdul-Jabbar", "Shaquille O'Neal", "Tim Duncan"], answer: 0, explain: "Magic would look one way and fire the ball the other — dazzling everyone." },
      { q: "Many fans call whose 2000 performance the greatest slam-dunk contest ever?", type: "mc", options: ["Vince Carter", "LeBron James", "Stephen Curry", "Bill Russell"], answer: 0, explain: "Vince Carter's 2000 contest is still legendary." },
    ],
  });

  lesson({
    id: "leg4", section: "legends", n: 4, minutes: 5, title: "Women's Legends of the Game",
    hook: "The greatest women's players belong on any list of legends — record-setters, champions, and trailblazers who grew the game.",
    beats: [
      { t: "lead", html: "The women's game has its own Mount Rushmore of legends — players who set records, won everything, and inspired millions." },
      { t: "cards", cards: [
        { file: "A'ja Wilson (53756794398).jpg", name: "A'ja Wilson", team: "Aces", role: "First 4× WNBA MVP", credit: "(" + WC + ")", stats: [{ v: "4", k: "MVPs" }] },
        { file: "Caitlin Clark Final Four 2024.jpg", name: "Caitlin Clark", team: "Iowa → WNBA", role: "All-time NCAA scoring leader", credit: "(" + WC + ")", stats: [{ v: "3,951", k: "college pts" }] },
      ] },
      { t: "p", html: "<b>Lisa Leslie</b> was a three-time MVP and the first player to <b>dunk</b> in a WNBA game. <b>Diana Taurasi</b> retired as the league's all-time scorer. <b>Sue Bird</b> won four titles and five Olympic golds with the most assists in WNBA history. <b>Breanna Stewart</b> has stacked up MVPs and championships." },
      { t: "p", html: "The legends go way back. <b>Cynthia Cooper</b> led the first WNBA dynasty — the Houston Comets won the league's first four titles in a row — and <b>Cheryl Miller</b>, before the WNBA even existed, was so dominant that many call her one of the greatest players ever, period." },
      { t: "fact", label: "Golden:", html: "Sue Bird and Diana Taurasi — college teammates at UConn — each won <b>five Olympic gold medals</b>, the most in basketball history by anyone, woman or man." },
      { t: "fact", label: "Trailblazer:", html: "When Lisa Leslie dunked in a WNBA game in 2002, it was a first that showed the world the women's game keeps reaching new heights." },
      { t: "p", html: "<b>Maya Moore</b> — from our grit story — belongs on this list too: a champion at every level before she walked away at her peak to fight for justice. And the list keeps growing: today <b>A'ja Wilson</b> and <b>Caitlin Clark</b> are filling arenas and inspiring a whole new generation of players." },
      { t: "banner", html: "Same game, same greatness, same grit. These legends grew basketball for everyone who plays it today." },
    ],
    quiz: [
      { q: "Who was the first player to dunk in a WNBA game?", type: "mc", options: ["Sue Bird", "Lisa Leslie", "A'ja Wilson", "Diana Taurasi"], answer: 1, explain: "Lisa Leslie threw down the first WNBA dunk in 2002." },
      { q: "Sue Bird is the WNBA's all-time leader in…", type: "mc", options: ["Assists", "Blocks", "Dunks", "Rebounds"], answer: 0, explain: "Bird holds the career assists record, with 4 titles and 5 Olympic golds." },
      { q: "A'ja Wilson and Caitlin Clark are modern legends of the women's game.", type: "tf", options: ["True", "False"], answer: 0, explain: "Wilson is a 4× MVP; Clark set the all-time NCAA scoring record." },
      { q: "Women's legends belong on a list of basketball's greats.", type: "mc", options: ["No, only men count", "Yes — same game, same greatness", "Only in college", "Only one of them"], answer: 1, explain: "Records aren't a men-only list — these legends are all-time greats." },
      { q: "Sue Bird and Diana Taurasi each won how many Olympic gold medals — the most ever?", type: "mc", options: ["Five", "One", "Three", "Ten"], answer: 0, explain: "Five golds each — the most in basketball history, women's or men's." },
      { q: "Which all-time great stepped away at her peak to fight for justice?", type: "mc", options: ["Maya Moore", "Lisa Leslie", "Sue Bird", "Cynthia Cooper"], answer: 0, explain: "Maya Moore — a champion at every level — paused her career to help free a wrongly imprisoned man." },
    ],
  });

})(HOOPS.CONTENT);

