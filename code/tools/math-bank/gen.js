/* ============================================================
   Summer Camp — Math question-bank GENERATOR
   Produces the 740 new questions (G5 + G6) that grow the bank
   from 60 -> 800, matching code/data/math.bank.js schema exactly.
   Each standard has easy/med/hard parameterized templates with
   computed answers and mistake-based distractors.
   ============================================================ */
"use strict";

/* ---------- deterministic RNG (seeded) ---------- */
let _seed = 1337;
function rng(){ _seed = (_seed*1103515245 + 12345) & 0x7fffffff; return _seed/0x7fffffff; }
function ri(a,b){ return a + Math.floor(rng()*(b-a+1)); }          // int in [a,b]
function pick(arr){ return arr[Math.floor(rng()*arr.length)]; }
function shuffleInPlace(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; }

/* ---------- Avatar flavor pools ---------- */
const WATERFOLK = ["Katara","Sokka","Yue","Hama","Pakku","Kya"];
const EARTHFOLK = ["Toph","Bumi","Haru","Kuei","Long Feng","Suki"];
const FIREFOLK  = ["Zuko","Iroh","Azula","Mai","Ty Lee","Jeong Jeong"];
const AIRFOLK   = ["Aang","Gyatso","Tenzin","Jinora","Meelo"];
const ANYONE    = ["Aang","Katara","Sokka","Toph","Zuko","Iroh","Suki","Yue","Bumi","Jinora"];
const PLACES    = ["Omashu","Ba Sing Se","the Southern Air Temple","Kyoshi Island","the Northern Water Tribe","Gaoling","the Fire Nation capital","the Misty Palms Oasis","Republic City","the Western Air Temple"];
const CRITTERS  = ["Momo","Appa","a platypus-bear","a turtle-duck","a sky bison","an ostrich-horse","a hog-monkey","a fire ferret"];
const ITEMS     = ["scrolls","dumplings","melons","copper pieces","silk ribbons","tea leaves","arrows","pai sho tiles","cabbages","moon peaches"];

/* ---------- fraction helpers ---------- */
function fracStr(n,d){ const g=gcd(n,d); n/=g; d/=g; if(d===1) return ""+n; return n+"/"+d; }
function mixedStr(n,d){ // improper -> mixed display
  const g=gcd(n,d); n/=g; d/=g;
  if(d===1) return ""+n;
  if(Math.abs(n)<d) return n+"/"+d;
  const whole=Math.trunc(n/d); const rem=Math.abs(n%d);
  if(rem===0) return ""+whole;
  return whole+" "+rem+"/"+d;
}

/* ---------- canonical value (so a fallback distractor can never equal the correct answer) ---------- */
function canon(s){ s=String(s).trim(); let m;
  if(m=s.match(/^(-?\d+)\s*:\s*(-?\d+)$/)) return "r:"+Number(m[1])+":"+Number(m[2]);                       // ratio a : b
  if(m=s.match(/^\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/)) return "c:"+Number(m[1])+":"+Number(m[2]);             // coord (a, b)
  if(m=s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/)) return "v:"+(Number(m[1])+Number(m[2])/Number(m[3]));            // mixed w n/d
  if(m=s.match(/^(-?\d+)\/(\d+)$/)) return "v:"+(Number(m[1])/Number(m[2]));                                // fraction n/d
  if(m=s.match(/^(-?\d+(?:\.\d+)?)\s*(.*)$/)) { const u=m[2].replace(/\s+/g,''); return (u?("u"+u):"v")+":"+Number(m[1]); } // number (+unit)
  return "s:"+s;
}
/* ---------- produce a clean, plausible variant of a value (for emergency distractor fill) ---------- */
function perturb(s,k){ s=String(s); let m;
  if(m=s.match(/^(-?\d+)\s*:\s*(-?\d+)$/)) return m[1]+" : "+(Number(m[2])+k);                  // bump second ratio term
  if(m=s.match(/^\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/)) return "("+(Number(m[1])+k)+", "+m[2]+")";  // bump x of coord
  if(m=s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/)) return (Number(m[1])+k)+" "+m[2]+"/"+m[3];           // bump whole part of mixed
  if(m=s.match(/^(-?\d+)\/(\d+)$/)) return (Number(m[1])+k)+"/"+m[2];                            // bump numerator
  if(m=s.match(/^(-?\d+(?:\.\d+)?)(.*)$/)) return (Math.round((Number(m[1])+k)*100)/100)+m[2];   // bump number, keep unit text
  return s+" #"+k;
}
/* ---------- option assembly: correct first, then 4 distinct distractors (clean fallback if needed) ---------- */
function opts(correct, cands){
  const out=[String(correct)];
  const seenCanon=new Set([canon(correct)]);
  const add=(c)=>{ const s=String(c); if(out.indexOf(s)!==-1) return false; const cn=canon(s); if(seenCanon.has(cn)) return false; out.push(s); seenCanon.add(cn); return true; };
  for(const c of cands){ if(out.length===5) break; add(c); }
  // emergency fill: clean, value-distinct perturbations of the correct answer (never equals it)
  const bumps=[1,-1,2,-2,3,-3,4,-4,5,-5,6,7,8];
  let bi=0;
  while(out.length<5 && bi<bumps.length){ add(perturb(correct,bumps[bi])); bi++; }
  return out;
}

/* ============================================================
   REGISTRY  — every standard registers its generators here.
   reg(ccss, el, grade, {easy, med, hard})
   each gen(i) returns: {prompt, options[5], hint1, hint2, intent, steps[], module?}
   ============================================================ */
const REG = {};
function reg(ccss, el, grade, gens){ REG[ccss] = { ccss, el, grade, gens }; }

/* ============================================================
   GRADE 5 — FIRE (Operations & Algebraic Thinking, OA)
   ============================================================ */

reg("5.OA.A.1","fire",5,{
  easy:()=>{ const a=ri(2,9),b=ri(2,9),c=ri(2,9); const ans=a+b*c;
    return { prompt:`A firebending drill counts ${a} warm-up breaths, then ${b} sets of ${c} flame punches. What is ${a} + ${b} × ${c}?`,
      options:opts(ans,[(a+b)*c,a*b+c,a+b+c,a*b*c]),
      hint1:"There is a required ORDER here — which operation must happen before the other?",
      hint2:`First step: do the multiplication, ${b} × ${c}, before the addition.`,
      intent:"Order of operations: multiplication is done before addition.",
      steps:[`Multiply first: ${b} × ${c} = ${b*c}.`,`Then add: ${a} + ${b*c} = ${ans}.`,
        `The trap ${(a+b)*c} comes from adding ${a} + ${b} first — left-to-right is not the rule.`] }; },
  med:()=>{ const a=ri(3,9),b=ri(2,6),c=ri(6,12),d=ri(2,9); const ans=a+b*(c-d);
    return { prompt:`What is ${a} + ${b} × (${c} − ${d})?`,
      options:opts(ans,[(a+b)*(c-d),a+b*c-d,a+(b*c-d),(a+b)*c-d]),
      hint1:"Two operations are waiting — but something is locked inside parentheses. Free it first.",
      hint2:`First step: the parentheses, ${c} − ${d} = ${c-d}.`,
      intent:"Order of operations: parentheses, then multiplication, then addition.",
      steps:[`Parentheses first: ${c} − ${d} = ${c-d}.`,`Multiply: ${b} × ${c-d} = ${b*(c-d)}.`,
        `Add: ${a} + ${b*(c-d)} = ${ans}.`,`Check each layer was handled in the right order.`] }; },
  hard:()=>{ const a=ri(2,6),b=ri(2,5),c=ri(2,4),d=ri(10,30),e=ri(2,5); const inner=b*c; const ans=d - inner*e + a*a;
    return { prompt:`Evaluate ${d} − ${b} × ${c} × ${e} + ${a}². Work carefully, one layer at a time.`,
      options:opts(ans,[d-b*c*e+a*2, (d-b)*c*e+a*a, d-(b*c*e+a*a), d-b*c*(e+a*a)]),
      hint1:"An exponent and a chain of multiplications are both hiding here — neither is addition's job to wait on.",
      hint2:`First step: handle the power, ${a}² = ${a*a}, and the multiplication ${b} × ${c} × ${e} = ${inner*e}.`,
      intent:"Order of operations with an exponent: powers and multiplication before add/subtract.",
      steps:[`Power: ${a}² = ${a*a}.`,`Multiplication chain: ${b} × ${c} × ${e} = ${inner*e}.`,
        `Now left to right for +/−: ${d} − ${inner*e} + ${a*a} = ${ans}.`,
        `A common slip is reading ${a}² as ${a}×2 = ${a*2}; an exponent means the number times itself.`] }; }
});

reg("5.OA.A.2","fire",5,{
  easy:()=>{ const a=ri(3,9),b=ri(2,8),c=ri(2,6);
    return { prompt:`Which expression means: "add ${a} and ${b}, then multiply the result by ${c}"?`,
      options:opts(`(${a} + ${b}) × ${c}`,[`${a} + ${b} × ${c}`,`${a} + ${b} + ${c}`,`${a} × ${b} × ${c}`,`(${a} × ${b}) + ${c}`]),
      hint1:"What gets done FIRST in the sentence? That part needs to be bundled together.",
      hint2:"First step: 'add then multiply' means the addition must be grouped in parentheses.",
      intent:"Translating words to expressions: grouping controls which operation happens first.",
      steps:[`'Add ${a} and ${b}' → (${a} + ${b}).`,`'Then multiply by ${c}' → (${a} + ${b}) × ${c}.`,
        `Without the parentheses, ${a} + ${b} × ${c} would multiply first — the wrong order.`] }; },
  med:()=>{ const a=ri(2,6),s1=ri(3,8),s2=ri(3,8); const ans=a*(s1+s2);
    return { prompt:`${pick(FIREFOLK)} writes "${a} times the sum of ${s1} and ${s2}." What number is that?`,
      options:opts(ans,[a*s1+s2,a+s1+s2,a*s1*s2,a+(s1+s2)]),
      hint1:"'The sum of' tells you two numbers must be joined before anything else happens.",
      hint2:`First step: the sum of ${s1} and ${s2} is ${s1+s2}.`,
      intent:"Interpret a written expression: form the sum first, then scale it.",
      steps:[`Sum: ${s1} + ${s2} = ${s1+s2}.`,`Times ${a}: ${a} × ${s1+s2} = ${ans}.`,
        `The trap ${a*s1+s2} multiplies only the first number — 'the sum' means both.`] }; },
  hard:()=>{ const a=ri(2,5);
    return { prompt:`Without calculating, decide: the expression ${a} × (37 + 488) is how many times as large as (37 + 488)?`,
      options:opts(`${a} times`,["the same","525 times",`${a+1} times`,`${a*37} times`]),
      hint1:"You don't need the value inside the parentheses — look at what is being done to that whole bundle.",
      hint2:"First step: treat (37 + 488) as a single block; the expression multiplies that block by a number.",
      intent:"Interpret multiplication as scaling without computing the inside.",
      steps:[`Call the block B = (37 + 488).`,`The expression is ${a} × B.`,
        `So it is exactly ${a} times as large as B — no arithmetic needed.`,
        `This is the heart of seeing structure instead of grinding numbers.`] }; }
});

reg("5.OA.B.3","fire",5,{
  easy:()=>{ const start=ri(2,6),step=ri(2,6); const seq=[start,start+step,start+2*step,start+3*step]; const ans=start+4*step;
    return { prompt:`A flame grows in a steady pattern: ${seq.join(", ")}, … What number comes next?`,
      options:opts(ans,[ans+step,ans-step,start+5*step,seq[3]+step+1]),
      hint1:"How much does the pattern jump each time? Find that single repeated step.",
      hint2:`First step: ${seq[1]} − ${seq[0]} = ${step}; the pattern adds ${step} each time.`,
      intent:"Extend an arithmetic pattern by its constant step.",
      steps:[`The step is ${step} (each term is ${step} more than the last).`,`Next: ${seq[3]} + ${step} = ${ans}.`,
        `Check the step is the same all the way along the list.`] }; },
  med:()=>{ const a=ri(2,4); const ruleAdd=ri(1,3);
    const A=[0,a,2*a,3*a]; const B=A.map(x=>x+ruleAdd);
    return { prompt:`Two patterns start together. Pattern A adds ${a} each step starting at 0: ${A.join(", ")}. Pattern B is always ${ruleAdd} more than A. What is B's 5th term?`,
      options:opts(4*a+ruleAdd,[4*a, 4*a+2*ruleAdd, 5*a+ruleAdd, 4*a-ruleAdd]),
      hint1:"Find A's 5th term first, then apply B's relationship to it.",
      hint2:`First step: A's 5th term is 4 × ${a} = ${4*a}.`,
      intent:"Relate two generated patterns using a stated rule between them.",
      steps:[`A's terms: 0, ${a}, ${2*a}, ${3*a}, ${4*a} — the 5th is ${4*a}.`,
        `B is ${ruleAdd} more: ${4*a} + ${ruleAdd} = ${4*a+ruleAdd}.`,
        `B stays exactly ${ruleAdd} above A at every step, so it never 'catches up' or falls behind.`] }; },
  hard:()=>{ const start=ri(1,3),mult=2,add=ri(1,3);
    const s=[start]; for(let k=0;k<3;k++) s.push(s[s.length-1]*mult+add);
    const ans=s[s.length-1]*mult+add;
    return { prompt:`A drill follows one hidden rule: ${s.join(", ")}, … Each number is built from the one before. What comes next?`,
      options:opts(ans,[s[s.length-1]*mult, s[s.length-1]+ (s[s.length-1]-s[s.length-2]), s[s.length-1]*mult+2*add, ans+mult]),
      hint1:"Test a 'multiply then add' rule — and make sure it works for EVERY pair, not just the first.",
      hint2:`First step: check ×${mult} + ${add}: ${s[0]} → ${s[0]*mult+add}. Does it keep working?`,
      intent:"Discover a recursive rule by verifying it across all consecutive pairs.",
      steps:[`Try ×${mult} + ${add}: ${s[0]}→${s[1]} ✓, ${s[1]}→${s[2]} ✓, ${s[2]}→${s[3]} ✓.`,
        `Apply once more: ${s[s.length-1]} × ${mult} + ${add} = ${ans}.`,
        `A rule checked on only one pair can fool you — test the whole chain.`] }; }
});

/* ============================================================
   GRADE 5 — AIR (Number & Operations in Base Ten, NBT)
   ============================================================ */

reg("5.NBT.A.1","air",5,{
  easy:()=>{ const d=ri(2,9),place=pick([10,100,1000]); const big=d*place; const small=d;
    return { prompt:`In the number, the digit ${d} in the ${place===10?"tens":place===100?"hundreds":"thousands"} place is worth how many times the digit ${d} in the ones place?`,
      options:opts(`${place}`,[`${place/10}`,`${d}`,`${place*10}`,`${d*place}`]),
      hint1:"Each place to the left is worth ten times the place on its right. Count the jumps.",
      hint2:`First step: from ones to ${place===10?"tens":place===100?"hundreds":"thousands"} is ${place===10?1:place===100?2:3} place(s) left.`,
      intent:"Place value: each step left multiplies a digit's worth by 10.",
      steps:[`Ones → tens is ×10, tens → hundreds is ×10 again, and so on.`,
        `From ones to that place is ${place===10?1:place===100?2:3} jump(s): ${place===10?"10":place===100?"10×10=100":"10×10×10=1000"}.`,
        `So it is worth ${place} times as much.`] }; },
  med:()=>{ const th=ri(1,9),h=ri(0,9),te=ri(0,9),o=ri(0,9); const val=th*1000+h*100+te*10+o;
    return { prompt:`Write the number with ${th} thousands, ${h} hundreds, ${te} tens, and ${o} ones.`,
      options:opts(val,[th*1000+h*100+o, th*1000+h*10+te, th*100+h*10+te+o, val+ (te===0?100:0) + (te===0?0:0) ]),
      hint1:"Every place gets exactly one digit — even a place that holds zero.",
      hint2:`First step: line up the places: thousands ${th}, hundreds ${h}, tens ${te}, ones ${o}.`,
      intent:"Build a number from place-value parts; zeros are real placeholders.",
      steps:[`Place the digits in order: ${th}, ${h}, ${te}, ${o}.`,`That gives ${val}.`,
        `Dropping a zero place would collapse the number into the wrong size.`] }; },
  hard:()=>{ const d=ri(2,9);
    return { prompt:`A digit ${d} sits in the hundreds place of one number and in the tenths place of another. The hundreds-place ${d} is worth how many times the tenths-place ${d}?`,
      options:opts("1000",["100","10","10000","0.001"]),
      hint1:"Count the place-value jumps from tenths all the way up to hundreds — each jump is ×10.",
      hint2:"First step: tenths → ones → tens → hundreds is three jumps left.",
      intent:"Compare digit values across the decimal point using powers of ten.",
      steps:["Hundreds = 100, tenths = 0.1.","100 ÷ 0.1 = 1000.",
        "Equivalently, tenths→hundreds is 3 places left: 10×10×10 = 1000.",
        "Crossing the decimal point doesn't change the rule — still ×10 each step."] }; }
});

reg("5.NBT.A.2","air",5,{
  easy:()=>{ const base=ri(2,9)+ri(0,9)/10; const p=pick([10,100,1000]); const ans=Math.round(base*p*100)/100;
    return { prompt:`What is ${base} × ${p}?`,
      options:opts(ans,[Math.round(base*(p/10)*100)/100, Math.round(base*(p*10)*100)/100, base, Math.round(base*p*10)/10===ans? ans+0.5: Math.round((base+p)*100)/100]),
      hint1:`Multiplying by ${p} shifts every digit — in which direction does the number grow?`,
      hint2:`First step: ${p} has ${String(p).length-1} zero(s), so shift the decimal that many places right.`,
      intent:"Multiplying by a power of 10 shifts the decimal point right.",
      steps:[`×${p} moves the decimal ${String(p).length-1} place(s) right.`,`${base} → ${ans}.`,
        `Size check: ${base} grows ${p}-fold, so the answer is much larger.`] }; },
  med:()=>{ const e=ri(2,4); const ans=Math.pow(10,e);
    return { prompt:`Sky bison fly in formations of 10. ${e} formations of formations… written as a power, the count is 10^${e}. What number is 10^${e}?`,
      options:opts(ans,[e*10, Math.pow(10,e-1), Math.pow(10,e+1), 10+e]),
      hint1:"An exponent counts how many 10's are multiplied together — and that many zeros follow the 1.",
      hint2:`First step: 10^${e} = 1 followed by ${e} zeros.`,
      intent:"Powers of ten: the exponent equals the number of zeros.",
      steps:[`10^${e} means ${e} tens multiplied: ${Array(e).fill("10").join(" × ")}.`,`That is ${ans}.`,
        `The trap ${e*10} multiplies instead of stacking the tens.`] }; },
  hard:()=>{ const base=Math.round((ri(2,9)+ri(1,9)/10)*10)/10; const p=pick([100,1000]); const ans=Math.round(base/p*1e6)/1e6;
    return { prompt:`What is ${base} ÷ ${p}? Watch which way the decimal travels.`,
      options:opts(ans,[Math.round(base*p*100)/100, Math.round(base/(p/10)*1e6)/1e6, Math.round(base/(p*10)*1e6)/1e6, base]),
      hint1:`Dividing by ${p} makes the number SMALLER — the decimal shifts the other way from multiplying.`,
      hint2:`First step: ÷${p} shifts the decimal ${String(p).length-1} places LEFT.`,
      intent:"Dividing by a power of 10 shifts the decimal point left.",
      steps:[`÷${p} moves the decimal ${String(p).length-1} place(s) left.`,`${base} → ${ans}.`,
        `Size check: the answer must be far smaller than ${base}.`] }; }
});

reg("5.NBT.A.3","air",5,{
  easy:()=>{ const a=ri(1,4)+ri(0,9)/10+ri(0,9)/100; const b=a+ (ri(1,3)/10);
    const A=Math.round(a*100)/100, B=Math.round(b*100)/100;
    return { prompt:`Which decimal is GREATER: ${A.toFixed(2)} or ${B.toFixed(2)}?`,
      options:opts(B.toFixed(2),[A.toFixed(2),"they are equal", (A+0.01).toFixed(2), (B+0.01).toFixed(2)]),
      hint1:"Compare place by place from the left: ones first, then tenths, then hundredths.",
      hint2:"First step: the ones digits match, so the tenths place decides.",
      intent:"Compare decimals by lining up place values left to right.",
      steps:[`Ones are equal; compare tenths.`,`${B.toFixed(2)} has the larger tenths digit, so it is greater.`,
        `More digits does NOT mean bigger — place value decides.`] }; },
  med:()=>{ const vals=[]; const base=ri(2,4); for(let k=0;k<5;k++){ vals.push(Math.round((base+rng())*1000)/1000); }
    const mx=Math.max(...vals);
    return { prompt:`Which of these is the LARGEST: ${vals.map(v=>v.toFixed(3)).join(", ")}?`,
      options:opts(mx.toFixed(3),[vals.filter(v=>v!==mx).sort((a,b)=>b-a)[0].toFixed(3), vals.sort((a,b)=>a-b)[0].toFixed(3), (mx-0.1).toFixed(3), vals[1].toFixed(3)]),
      hint1:"Don't be fooled by length — a number with more digits can still be smaller.",
      hint2:"First step: all share the same ones digit, so compare tenths first.",
      intent:"Order decimals to thousandths by comparing place by place.",
      steps:["Compare tenths across all five.","The largest tenths wins; break ties at hundredths, then thousandths.",
        `Largest is ${mx.toFixed(3)}.`] }; },
  hard:()=>{
    return { prompt:`Order from least to greatest: 0.5, 0.49, 0.409, 0.5 has how many tenths more than 0.409? Pick the correct LEAST value.`,
      options:opts("0.409",["0.49","0.5","0.490","0.5 and 0.49 tie"]),
      hint1:"Write each with the same number of decimal places, then they line up cleanly.",
      hint2:"First step: 0.5 = 0.500, 0.49 = 0.490, 0.409 = 0.409.",
      intent:"Compare decimals of different lengths by padding to equal places.",
      steps:["Pad to thousandths: 0.500, 0.490, 0.409.","Now compare: 0.409 < 0.490 < 0.500.",
        "The least is 0.409 — even though it 'looks longest', its tenths digit (4) is smallest."] }; }
});

reg("5.NBT.A.4","air",5,{
  easy:()=>{ const n=Math.round((ri(2,8)+rng())*100)/100; const t=Math.round(n*10)/10;
    return { prompt:`Round ${n.toFixed(2)} to the nearest TENTH.`,
      options:opts(t.toFixed(1),[Math.floor(n*10)/10===t? (t+0.1).toFixed(1):(Math.floor(n*10)/10).toFixed(1), Math.round(n).toFixed(1), n.toFixed(2), (Math.ceil(n*10)/10).toFixed(1)===t.toFixed(1)?(t-0.1).toFixed(1):(Math.ceil(n*10)/10).toFixed(1)]),
      hint1:"Find the tenths digit, then let the digit just to its right decide whether it climbs.",
      hint2:`First step: the hundredths digit is what decides; is it 5 or more?`,
      intent:"Rounding: locate the target place, check the single digit to its right.",
      steps:[`Tenths digit of ${n.toFixed(2)} chosen; look one place right.`,`Round based on whether that digit is ≥ 5.`,
        `Result: ${t.toFixed(1)}.`] }; },
  med:()=>{ const n=Math.round((ri(10,90)+rng())*100)/100; const w=Math.round(n);
    return { prompt:`${pick(ANYONE)} measured a rope as ${n.toFixed(2)} m. Round it to the nearest WHOLE metre.`,
      options:opts(""+w,[""+(Math.floor(n)===w?w+1:Math.floor(n)), n.toFixed(1), ""+(Math.ceil(n)===w?w-1:Math.ceil(n)), n.toFixed(2)]),
      hint1:"The tenths digit is the gatekeeper for rounding to a whole number.",
      hint2:"First step: look at the tenths digit — 5 or more rounds up.",
      intent:"Round a decimal to the nearest whole number using the tenths digit.",
      steps:[`Tenths digit decides up or down.`,`${n.toFixed(2)} rounds to ${w}.`,
        `Everything past the decimal is then dropped.`] }; },
  hard:()=>{
    return { prompt:`A number rounds to 7.0 when rounded to the nearest tenth. What is the SMALLEST it could be (to the hundredth)?`,
      options:opts("6.95",["7.04","6.96","6.94","7.05"]),
      hint1:"Rounding to a tenth catches everything from halfway below to just under halfway above.",
      hint2:"First step: the lowest value that still rounds UP to 7.0 is exactly halfway down: 6.95.",
      intent:"Reason backwards about rounding boundaries.",
      steps:["Numbers from 6.95 up to 7.04 round to 7.0 at the tenths place.","6.95 rounds up to 7.0 (the 5 rounds up).",
        "6.94 would round to 6.9 instead, so 6.95 is the smallest that lands on 7.0."] }; }
});

reg("5.NBT.B.5","air",5,{
  easy:()=>{ const a=ri(12,29),b=ri(3,9); const ans=a*b;
    return { prompt:`A caravan carries ${a} ${pick(ITEMS)} in each of ${b} carts. How many is that altogether?`,
      options:opts(ans,[a*(b-1)+a+1, a+b, (a-10)*b+10, a*b+a]),
      hint1:"Equal groups repeated — reach for multiplication.",
      hint2:`First step: ${a} × ${b}. Break ${a} into ${Math.floor(a/10)*10} + ${a%10} if it helps.`,
      intent:"Multiply a two-digit number by a one-digit number.",
      steps:[`${a} × ${b} = (${Math.floor(a/10)*10} × ${b}) + (${a%10} × ${b}) = ${Math.floor(a/10)*10*b} + ${(a%10)*b} = ${ans}.`,
        `Splitting by place value keeps multi-digit multiplication tidy.`] }; },
  med:()=>{ const a=ri(21,49),b=ri(11,29); const ans=a*b;
    return { prompt:`What is ${a} × ${b}?`,
      options:opts(ans,[a*(b-10)+a, (a*b)-a, Math.floor(a/10)*Math.floor(b/10)*100 + (a%10)*(b%10), a*b+10]),
      hint1:"Break one factor apart by place value, multiply the pieces, then add.",
      hint2:`First step: ${a} × ${b} = ${a} × ${Math.floor(b/10)*10} + ${a} × ${b%10}.`,
      intent:"Multiply two two-digit numbers via the distributive property.",
      steps:[`${a} × ${Math.floor(b/10)*10} = ${a*Math.floor(b/10)*10}.`,`${a} × ${b%10} = ${a*(b%10)}.`,
        `Add: ${a*Math.floor(b/10)*10} + ${a*(b%10)} = ${ans}.`,
        `A common error multiplies only the matching place values and forgets the cross terms.`] }; },
  hard:()=>{ const crates=ri(12,24),per=ri(11,18),lost=ri(3,9); const ans=crates*per-lost;
    return { prompt:`A merchant ships ${crates} crates of ${per} ${pick(ITEMS)} each. On the road ${lost} spill out and are lost. How many arrive?`,
      options:opts(ans,[crates*per, crates*per-crates, (crates-lost)*per, crates*(per-lost)]),
      hint1:"Two stages: the full shipment first, then the loss. Don't merge them.",
      hint2:`First step: total loaded = ${crates} × ${per} = ${crates*per}.`,
      intent:"Multi-digit multiplication followed by a subtraction — finish the last step.",
      steps:[`Loaded: ${crates} × ${per} = ${crates*per}.`,`Arrived: ${crates*per} − ${lost} = ${ans}.`,
        `The trap ${crates*per} stops at the shipment and forgets the spill.`] }; }
});

reg("5.NBT.B.6","air",5,{
  easy:()=>{ const b=ri(3,9),q=ri(11,29); const a=b*q;
    return { prompt:`${a} ${pick(ITEMS)} are shared equally among ${b} villages. How many does each village get?`,
      options:opts(q,[q+1,q-1,a-b,Math.floor(a/(b+1))]),
      hint1:"Sharing equally is division — how many in each group?",
      hint2:`First step: ${a} ÷ ${b}.`,
      intent:"Divide to find equal shares.",
      steps:[`${a} ÷ ${b} = ${q}.`,`Check: ${b} × ${q} = ${a}. ✓`] }; },
  med:()=>{ const b=ri(12,24),q=ri(13,40); const a=b*q;
    return { prompt:`What is ${a} ÷ ${b}?`,
      options:opts(q,[q+1,q-1, Math.floor(a/(b-2)), q+10]),
      hint1:`Estimate first: about how many ${b}'s fit into ${a}?`,
      hint2:`First step: ${b} × 10 = ${b*10}; is the answer above or below 10?`,
      intent:"Divide a multi-digit number by a two-digit divisor.",
      steps:[`${b} × ${q} = ${a}, so ${a} ÷ ${b} = ${q}.`,
        `Estimating with ${b} × 10 = ${b*10} keeps the answer in range.`] }; },
  hard:()=>{ const b=ri(12,20),q=ri(14,30),r=ri(1,b-1); const a=b*q+r;
    return { prompt:`${a} ${pick(ITEMS)} are packed ${b} to a box. How many FULL boxes are filled, and how many are left over? (Give the number of full boxes.)`,
      options:opts(q,[q+1, r, Math.ceil(a/b), q-1]),
      hint1:"Only FULL boxes count — the leftover doesn't fill a box.",
      hint2:`First step: ${a} ÷ ${b} gives a quotient and a remainder.`,
      intent:"Division with remainder, interpreting the quotient in context.",
      steps:[`${a} ÷ ${b} = ${q} remainder ${r}.`,`${q} boxes are full; ${r} ${r===1?"item is":"items are"} left over.`,
        `Rounding UP (${Math.ceil(a/b)}) would wrongly count a not-yet-full box.`] }; }
});

reg("5.NBT.B.7","air",5,{
  easy:()=>{ const a=Math.round((ri(1,5)+rng())*10)/10, b=Math.round((ri(1,5)+rng())*100)/100; const ans=Math.round((a+b)*100)/100;
    return { prompt:`What is ${a.toFixed(1)} + ${b.toFixed(2)}?`,
      options:opts(ans.toFixed(2),[(a*10+b*100).toString(), (Math.round((a+b)*100)/100+0.1).toFixed(2), (a+ Math.round(b*10)/10).toFixed(2), (Math.round((a+b)*100)/100 -0.09).toFixed(2)]),
      hint1:"Line up the decimal points — tenths under tenths, hundredths under hundredths.",
      hint2:`First step: write ${a.toFixed(1)} as ${a.toFixed(2)} so both reach the hundredths place.`,
      intent:"Add decimals by aligning place values.",
      steps:[`Pad: ${a.toFixed(1)} = ${a.toFixed(2)}.`,`Add: ${a.toFixed(2)} + ${b.toFixed(2)} = ${ans.toFixed(2)}.`,
        `Gluing digits without aligning places is the classic decimal trap.`] }; },
  med:()=>{ const price=Math.round((ri(1,4)+rng())*100)/100, n=ri(3,6); const ans=Math.round(price*n*100)/100;
    return { prompt:`Tea costs ${price.toFixed(2)} copper per cup. ${pick(FIREFOLK)} buys ${n} cups. What is the total cost?`,
      options:opts(ans.toFixed(2),[(price*(n-1)).toFixed(2), (price+n).toFixed(2), (Math.round(price*n*10)/10+0.5).toFixed(2), (price*n+price).toFixed(2)]),
      hint1:"Same price, several cups — that's repeated addition, i.e. multiplication.",
      hint2:`First step: ${price.toFixed(2)} × ${n}.`,
      intent:"Multiply a decimal by a whole number in context.",
      steps:[`${price.toFixed(2)} × ${n} = ${ans.toFixed(2)}.`,
        `Estimate: about ${Math.round(price)} × ${n} = ${Math.round(price)*n}, so ${ans.toFixed(2)} is reasonable.`] }; },
  hard:()=>{ const paid=ri(10,20), price=Math.round((ri(1,3)+rng())*100)/100, n=ri(3,6); const cost=Math.round(price*n*100)/100; const ans=Math.round((paid-cost)*100)/100;
    return { prompt:`${pick(ANYONE)} buys ${n} ${pick(ITEMS)} at ${price.toFixed(2)} copper each and pays with a ${paid}-copper coin. How much change is returned?`,
      options:opts(ans.toFixed(2),[cost.toFixed(2), (paid-price).toFixed(2), (Math.round((paid-cost)*100)/100+1).toFixed(2), (paid - Math.round(price*n)).toFixed(2)]),
      hint1:"Two steps: the total cost first, then subtract from what was paid.",
      hint2:`First step: cost = ${price.toFixed(2)} × ${n} = ${cost.toFixed(2)}.`,
      intent:"Decimal multiplication then subtraction — a money two-stepper.",
      steps:[`Cost: ${price.toFixed(2)} × ${n} = ${cost.toFixed(2)}.`,`Change: ${paid}.00 − ${cost.toFixed(2)} = ${ans.toFixed(2)}.`,
        `The trap ${cost.toFixed(2)} reports the cost, not the change.`] }; }
});

/* ============================================================
   GRADE 5 — WATER (Number & Operations — Fractions, NF)
   ============================================================ */

reg("5.NF.A.1","water",5,{
  easy:()=>{ const d1=pick([2,3,4]); let d2=pick([4,6,8]); if(d2%d1!==0) d2=d1*2; const lcm=d2;
    const ans_n=lcm/d1 + lcm/d2; const g=gcd(ans_n,lcm);
    return { prompt:`What is 1/${d1} + 1/${d2}?`,
      options:opts(fracStr(ans_n,lcm),[`2/${d1+d2}`,`1/${d1+d2}`,fracStr(lcm/d1,lcm),`2/${lcm}`]),
      hint1:"You can only add pieces that are the same size. Are these the same size yet?",
      hint2:`First step: rewrite 1/${d1} with denominator ${d2}: 1/${d1} = ${lcm/d1}/${d2}.`,
      intent:"Add fractions by finding a common denominator first.",
      steps:[`Common denominator ${lcm}: 1/${d1} = ${lcm/d1}/${lcm}, 1/${d2} = ${lcm/d2}/${lcm}.`,
        `Add: ${lcm/d1}/${lcm} + ${lcm/d2}/${lcm} = ${ans_n}/${lcm} = ${fracStr(ans_n,lcm)}.`,
        `The trap 2/${d1+d2} adds tops and bottoms — that is never how fractions add.`] }; },
  med:()=>{ const d1=pick([3,4,6]); let d2=pick([2,3,4]); while(d2===d1) d2=pick([2,3,4]); const lcm=d1*d2/gcd(d1,d2);
    const n1=ri(1,d1-1), n2=ri(1,d2-1); const num=n1*(lcm/d1)+n2*(lcm/d2);
    return { prompt:`A waterskin gains ${fracStr(n1,d1)} of a litre, then ${fracStr(n2,d2)} of a litre. How much water was added in all?`,
      options:opts(mixedStr(num,lcm),[`${fracStr(n1+n2,d1+d2)}`, mixedStr(num+1,lcm), fracStr(n1+n2,lcm), mixedStr(num,lcm*2)]),
      hint1:"Different-size pieces must be made the same size before they can join.",
      hint2:`First step: common denominator is ${lcm}.`,
      intent:"Add two fractions with unlike denominators in context.",
      steps:[`Rewrite: ${fracStr(n1,d1)} = ${n1*(lcm/d1)}/${lcm}, ${fracStr(n2,d2)} = ${n2*(lcm/d2)}/${lcm}.`,
        `Add: ${num}/${lcm} = ${mixedStr(num,lcm)}.`,`Check the result against a quick estimate.`] }; },
  hard:()=>{ const d=12; const a=ri(5,11), b=ri(1,a-1);
    return { prompt:`A barrel is ${fracStr(a,d)} full. ${pick(WATERFOLK)} pours in ${fracStr(b,d)} more, but it can never exceed 1 whole barrel. How much OVERFLOWS?`,
      options:opts(fracStr(a+b-d,d)==="0"?"0":fracStr(a+b-d,d),[fracStr(a+b,d), fracStr(d-a,d), fracStr(a+b-d+1,d), fracStr(b,d)]),
      hint1:"Add first to see how far past a full barrel you go — the spill is whatever is over 1.",
      hint2:`First step: ${fracStr(a,d)} + ${fracStr(b,d)} = ${fracStr(a+b,d)}; compare to 1 = ${d}/${d}.`,
      intent:"Add fractions, then compare to a whole to find the excess.",
      steps:[`Total poured: ${a}/${d} + ${b}/${d} = ${a+b}/${d}.`,
        `That is ${a+b-d}/${d} more than a full barrel (${d}/${d}).`,
        `Overflow = ${fracStr(a+b-d,d)}.`] }; }
});

reg("5.NF.A.2","water",5,{
  easy:()=>{ const d=pick([4,5,6,8]); const a=ri(1,d-1), b=ri(1,d-a);
    return { prompt:`A ribbon is ${fracStr(a,d)} of a metre. ${pick(WATERFOLK)} cuts off ${fracStr(b,d)} of a metre. How much ribbon is left?`,
      options:opts(fracStr(a-b,d),[fracStr(a+b,d), fracStr(b,d), fracStr(a-b,d*2), fracStr(d-a,d)]),
      hint1:"Same-size pieces here — so this is a straight subtraction.",
      hint2:`First step: ${a}/${d} − ${b}/${d}, keep the denominator.`,
      intent:"Subtract like fractions in a word problem.",
      steps:[`${a}/${d} − ${b}/${d} = ${a-b}/${d} = ${fracStr(a-b,d)}.`,
        `Subtract the numerators; the size of the pieces (${d}) does not change.`] }; },
  med:()=>{ // benchmark estimation
    return { prompt:`Without exact arithmetic, estimate: is 7/8 + 11/12 closest to 1, 2, or 3?`,
      options:opts("2",["1","3","1 1/2","0"]),
      hint1:"How close is each fraction to a whole? Round each to the nearest easy benchmark.",
      hint2:"First step: 7/8 is just under 1, and 11/12 is just under 1.",
      intent:"Use benchmark fractions (near 0, 1/2, 1) to estimate a sum.",
      steps:["7/8 ≈ 1 and 11/12 ≈ 1.","So the sum ≈ 1 + 1 = 2.","Both are a hair under 1, so the true sum is a touch under 2 — still closest to 2."] }; },
  hard:()=>{ const d=6; const used=ri(2,4), left_n=1, left_d=2; // start full? use story
    return { prompt:`${pick(WATERFOLK)} has 5/6 of a scroll of ink. After writing, 1/3 of a scroll is left. What fraction of a scroll was USED?`,
      options:opts(fracStr(5*1 - 2, 6),[ "1/3","5/6","1/6","2/3"]),
      hint1:"Used = what you started with minus what remains. Make the denominators match.",
      hint2:"First step: 5/6 − 1/3, and 1/3 = 2/6.",
      intent:"Subtract unlike fractions to find a 'used' amount.",
      steps:["Start 5/6, left 1/3 = 2/6.","Used: 5/6 − 2/6 = 3/6 = 1/2.","Check: used 1/2 + left 1/3 = 5/6 ✓."] }; }
});

reg("5.NF.B.3","water",5,{
  easy:()=>{ const a=ri(2,7), b=ri(2,5); // a items shared by b
    return { prompt:`${a} identical rice cakes are shared equally among ${b} friends. How much does each friend get?`,
      options:opts(fracStr(a,b),[fracStr(b,a), fracStr(a-b>0?a-b:1,1), fracStr(a,b+1), fracStr(a+1,b)]),
      hint1:"Sharing a-things among b-people is exactly the fraction a over b.",
      hint2:`First step: ${a} ÷ ${b} can be written as the fraction ${a}/${b}.`,
      intent:"Interpret a fraction as division: a/b = a ÷ b.",
      steps:[`Each friend gets ${a} ÷ ${b} = ${a}/${b} = ${mixedStr(a,b)} cake(s).`,
        `Flipping it to ${b}/${a} would answer the wrong question.`] }; },
  med:()=>{ const total=ri(13,23), groups=ri(3,5);
    return { prompt:`${total} metres of rope are cut into ${groups} equal pieces. How long is each piece (as a mixed number)?`,
      options:opts(mixedStr(total,groups),[mixedStr(groups,total), mixedStr(total+groups,groups), mixedStr(total,groups+1), (Math.floor(total/groups))+""]),
      hint1:"Equal pieces from a total is division — and it may not come out even.",
      hint2:`First step: ${total} ÷ ${groups} = ${total}/${groups}.`,
      intent:"Express a division as a mixed number.",
      steps:[`${total} ÷ ${groups} = ${total}/${groups} = ${mixedStr(total,groups)} m.`,
        `Just taking the whole-number part (${Math.floor(total/groups)}) throws away the leftover.`] }; },
  hard:()=>{ const people=ri(3,5), pizzas=ri(7,11);
    return { prompt:`${pizzas} pies are split equally among ${people} hungry travelers. Each traveler eats their full share. How many pies does each eat, and is it more or less than 2? (Give each share.)`,
      options:opts(mixedStr(pizzas,people),[mixedStr(people,pizzas), mixedStr(pizzas,people-1), mixedStr(pizzas+people,people), ""+Math.round(pizzas/people)]),
      hint1:"Share = pies ÷ people; then compare the result to 2.",
      hint2:`First step: ${pizzas} ÷ ${people} = ${pizzas}/${people}.`,
      intent:"Fraction-as-division with a reasoning check against a benchmark.",
      steps:[`Each share: ${pizzas}/${people} = ${mixedStr(pizzas,people)} pies.`,
        `Compare to 2 = ${2*people}/${people}: since ${pizzas} ${pizzas>2*people?">":"<"} ${2*people}, each eats ${pizzas>2*people?"more":"less"} than 2.`] }; }
});

reg("5.NF.B.4","water",5,{
  easy:()=>{ const d=pick([3,4,5,6]); const n=ri(1,d-1); const whole=d*ri(2,5); const ans=whole*n/d;
    return { prompt:`A basket holds ${whole} ${pick(ITEMS)}. ${pick(CRITTERS)} takes ${n}/${d} of them. How many is that?`,
      options:opts(ans,[whole/d, whole-ans, whole*n/(d+1), whole-(whole/d)]),
      hint1:`'${n}/${d} of ${whole}' means split into ${d} equal groups, then take ${n} of them.`,
      hint2:`First step: ${whole} ÷ ${d} = ${whole/d} in each group.`,
      intent:"A fraction OF a whole: divide by denominator, multiply by numerator.",
      steps:[`Group size: ${whole} ÷ ${d} = ${whole/d}.`,`Take ${n} groups: ${n} × ${whole/d} = ${ans}.`,
        `The trap ${whole/d} stops after one group.`],
      module:{ type:"fractionBar", parts:d, shaded:n } }; },
  med:()=>{ const a_n=ri(1,3),a_d=pick([2,3,4]); const b_n=ri(1,3),b_d=pick([2,3,5]); const num=a_n*b_n, den=a_d*b_d;
    return { prompt:`What is ${fracStr(a_n,a_d)} × ${fracStr(b_n,b_d)}?`,
      options:opts(fracStr(num,den),[fracStr(a_n+b_n,a_d+b_d), fracStr(a_n*b_d+b_n*a_d, a_d*b_d), fracStr(num,den)==="0"?"1":fracStr(a_n*b_n,a_d+b_d), fracStr(a_n*b_d, a_d*b_n)]),
      hint1:"Multiplying fractions is friendlier than adding — no common denominator needed.",
      hint2:"First step: multiply the numerators together, and the denominators together.",
      intent:"Multiply two fractions: top × top, bottom × bottom, then simplify.",
      steps:[`Numerators: ${a_n} × ${b_n} = ${num}. Denominators: ${a_d} × ${b_d} = ${den}.`,
        `${num}/${den} = ${fracStr(num,den)}.`,`A product of two proper fractions is smaller than either — a good sanity check.`] }; },
  hard:()=>{ const l_n=ri(2,5),l_d=pick([2,3,4]); const w_n=ri(2,5),w_d=pick([2,3,4]);
    const num=l_n*w_n, den=l_d*w_d;
    return { prompt:`A rectangular garden plot is ${fracStr(l_n,l_d)} m long and ${fracStr(w_n,w_d)} m wide. What is its area in square metres?`,
      options:opts(mixedStr(num,den),[mixedStr(l_n*w_d+w_n*l_d,l_d*w_d), mixedStr(2*(l_n*w_d+w_n*l_d), l_d*w_d), mixedStr(num,den+1), mixedStr(l_n+w_n,l_d+w_d)]),
      hint1:"Area is length × width — even when the sides are fractions.",
      hint2:"First step: multiply the two fractions (top×top, bottom×bottom).",
      intent:"Fraction multiplication as area of a rectangle.",
      steps:[`Area = ${fracStr(l_n,l_d)} × ${fracStr(w_n,w_d)} = ${num}/${den} = ${mixedStr(num,den)} m².`,
        `The trap adds sides (that would be perimeter-flavored), not multiplies them.`] }; }
});

reg("5.NF.B.5","water",5,{
  easy:()=>{ const base=ri(6,20), f=pick([["1/2",0.5],["1/3",1/3],["1/4",0.25]]); // scale down
    const bb = f[0]==="1/2"?base*2 : f[0]==="1/3"?base*3 : base*4; // ensure whole
    const factor = f[0]==="1/2"?0.5:f[0]==="1/3"?1/3:0.25;
    const ans=Math.round(bb*factor);
    return { prompt:`A number is multiplied by ${f[0]}. Will the result be larger or smaller than the original ${bb}? (Give the result.)`,
      options:opts(ans,[bb, bb+ans, Math.round(bb*factor*2), bb-1]),
      hint1:"Multiplying by a fraction less than 1 makes things… which way?",
      hint2:`First step: ${f[0]} of ${bb} means take a ${f[0]==="1/2"?"half":f[0]==="1/3"?"third":"quarter"} of it.`,
      intent:"Scaling: multiplying by a fraction below 1 shrinks the number.",
      steps:[`${f[0]} of ${bb} = ${ans}.`,`Because ${f[0]} < 1, the result (${ans}) is smaller than ${bb}.`] }; },
  med:()=>{ const base=ri(10,30);
    return { prompt:`A potion's strength is ${base}. A recipe says to multiply it by 5/4. Without computing exactly, is the new strength more or less than ${base}?`,
      options:opts("more than "+base,["less than "+base,"exactly "+base,"exactly double","exactly half"]),
      hint1:"Compare the multiplier to 1. Is 5/4 above or below 1?",
      hint2:"First step: 5/4 = 1.25, which is greater than 1.",
      intent:"Interpret multiplication as scaling by comparing the factor to 1.",
      steps:["5/4 is greater than 1.","Multiplying by a number above 1 makes the result larger.",
        `So the new strength is more than ${base} — no exact calculation needed.`] }; },
  hard:()=>{ const base=ri(8,16);
    return { prompt:`Which result is LARGER, without computing both exactly: ${base} × 3/3, or ${base} × 4/5?`,
      options:opts(`${base} × 3/3`,[`${base} × 4/5`,"they are equal",`${base} × 1/2`,"cannot tell"]),
      hint1:"3/3 equals what number? Compare each multiplier to 1.",
      hint2:"First step: 3/3 = 1, while 4/5 < 1.",
      intent:"Reason about scaling by comparing factors to 1 rather than calculating.",
      steps:[`3/3 = 1, so that product equals the original ${base}.`,`4/5 < 1, so that product is smaller than ${base}.`,
        `Therefore ${base} × 3/3 is larger.`] }; }
});

reg("5.NF.B.6","water",5,{
  easy:()=>{ const d=pick([2,3,4]); const n=ri(1,d-1); const whole=d*ri(3,6); const ans=whole*n/d;
    return { prompt:`A journey is ${whole} km. ${pick(AIRFOLK)} has flown ${n}/${d} of it. How many km is that?`,
      options:opts(ans,[whole-ans, whole/d, whole*n/(d+1), whole-(whole/d)]),
      hint1:"A fraction of a distance: split into equal parts, then count the parts done.",
      hint2:`First step: ${whole} ÷ ${d} = ${whole/d} per part.`,
      intent:"Real-world fraction of a quantity.",
      steps:[`Each part: ${whole} ÷ ${d} = ${whole/d}.`,`Flown: ${n} × ${whole/d} = ${ans} km.`] }; },
  med:()=>{ const whole=ri(20,40)*3; const used_n=2,used_d=3; const used=whole*2/3; const left=whole-used;
    return { prompt:`A water tank holds ${whole} L. During the day 2/3 of it is used. How many litres are LEFT?`,
      options:opts(left,[used, whole/3*0+used, whole/3 + 0, whole - whole/2]),
      hint1:"Careful — the question asks what remains, not what was used.",
      hint2:"First step: if 2/3 is used, then 1/3 remains.",
      intent:"Two-step fraction problem: find the remaining fraction, then take it.",
      steps:[`Remaining fraction: 1 − 2/3 = 1/3.`,`1/3 of ${whole} = ${whole/3} L.`,
        `The trap ${used} is how much was USED.`] }; },
  hard:()=>{ const whole=ri(4,8)*6; const f1=2,f1d=3; const f2=1,f2d=4;
    const afterFirst=whole*2/3; const second=afterFirst*1/4; const ans=second;
    return { prompt:`A reservoir holds ${whole} kL. ${pick(WATERFOLK)} drains 2/3 of it, then 1/4 of WHAT REMAINS evaporates. How much evaporates?`,
      options:opts(ans,[whole/4, afterFirst, whole*1/4*1, whole - afterFirst]),
      hint1:"The second fraction is taken of the leftover, not the original. Find the leftover first.",
      hint2:`First step: after draining 2/3, the amount left is 1/3 of ${whole}.`,
      intent:"Chain two fraction-of operations, tracking which whole each acts on.",
      steps:[`Drained 2/3 leaves 1/3 × ${whole} = ${whole/3} kL.`,
        `Evaporated: 1/4 × ${whole/3} = ${ans} kL.`,
        `The trap takes 1/4 of the original ${whole}, ignoring the drain.`] }; }
});

reg("5.NF.B.7","water",5,{
  easy:()=>{ const d=pick([2,3,4,5]); const whole=ri(2,6);
    return { prompt:`What is ${whole} ÷ 1/${d}? (How many ${d===2?"halves":"1/"+d+" pieces"} are in ${whole}?)`,
      options:opts(whole*d,[whole+d, whole, Math.round(whole/d*100)/100, whole*d+d]),
      hint1:`How many 1/${d} pieces fit inside one whole? Then scale up to ${whole} wholes.`,
      hint2:`First step: each whole contains ${d} pieces of size 1/${d}.`,
      intent:"Divide a whole number by a unit fraction = multiply by the denominator.",
      steps:[`One whole holds ${d} pieces of 1/${d}.`,`${whole} wholes hold ${whole} × ${d} = ${whole*d} pieces.`,
        `Dividing by a fraction below 1 makes a BIGGER number — that surprises many.`] }; },
  med:()=>{ const d=pick([2,3,4]); let w=pick([2,3,4,5]); if(w===d) w=d+1; const ans=fracStr(1,d*w);
    return { prompt:`What is 1/${d} ÷ ${w}?`,
      options:opts(ans,[fracStr(1,d), fracStr(1,w), fracStr(1,d+w), fracStr(w,d)]),
      hint1:"Splitting a small fraction into several equal parts makes each part even smaller.",
      hint2:`First step: dividing 1/${d} by ${w} multiplies the denominator by ${w}.`,
      intent:"Divide a unit fraction by a whole number.",
      steps:[`1/${d} ÷ ${w} = 1/(${d} × ${w}) = ${ans}.`,`Dividing by a whole number n multiplies the denominator by n, so the share shrinks.`] }; },
  hard:()=>{ const d=pick([2,3,4]); const wholes=ri(2,4);
    return { prompt:`${pick(WATERFOLK)} has ${wholes} litres of broth and pours it into cups that each hold 1/${d} of a litre. How many cups can be filled?`,
      options:opts(wholes*d,[wholes, Math.round(wholes/d*10)/10, wholes+d, wholes*d-1]),
      hint1:"Each litre fills several small cups — figure out how many per litre first.",
      hint2:`First step: one litre fills ${d} cups of size 1/${d}.`,
      intent:"Whole ÷ unit fraction in a measurement context.",
      steps:[`Per litre: ${d} cups.`,`Total: ${wholes} × ${d} = ${wholes*d} cups.`,
        `Treating it as ${wholes} ÷ ${d} (tiny answer) reverses the relationship.`] }; }
});

/* ============================================================
   GRADE 5 — EARTH (Measurement & Data, MD)  +  (Geometry, G)
   ============================================================ */

reg("5.MD.A.1","earth",5,{
  easy:()=>{ const m=Math.round((ri(1,6)+rng())*10)/10; const cm=Math.round(m*100);
    return { prompt:`A stone pillar is ${m.toFixed(1)} m tall. How tall is it in centimetres?`,
      options:opts(cm,[Math.round(m*10), Math.round(m*1000), Math.round(m+100), Math.round(m*100)+5]),
      hint1:"How many centimetres are in ONE metre? Then scale up.",
      hint2:"First step: 1 m = 100 cm, so multiply by 100.",
      intent:"Convert metres to centimetres (×100).",
      steps:[`1 m = 100 cm.`,`${m.toFixed(1)} × 100 = ${cm} cm.`,`×100 shifts the decimal two places right.`] }; },
  med:()=>{ const km=Math.round((ri(1,5)+rng())*100)/100; const m=Math.round(km*1000);
    return { prompt:`${pick(EARTHFOLK)} marches ${km} km. How many metres is that?`,
      options:opts(m,[Math.round(km*100), Math.round(km*10000), Math.round(km+1000), Math.round(km*1000)+10]),
      hint1:"Bigger unit to smaller unit means the NUMBER gets bigger. By what factor?",
      hint2:"First step: 1 km = 1000 m.",
      intent:"Convert kilometres to metres (×1000).",
      steps:[`1 km = 1000 m.`,`${km} × 1000 = ${m} m.`] }; },
  hard:()=>{ const liters=ri(2,5), extraMl=ri(100,800); const totalMl=liters*1000+extraMl;
    return { prompt:`A cistern holds ${liters} L and ${extraMl} mL of water. Express the cistern's total amount as millilitres.`,
      options:opts(totalMl,[liters*100+extraMl, liters*1000, liters+extraMl, liters*1000+extraMl*10]),
      hint1:"Convert the litres to millilitres first, then add the leftover millilitres.",
      hint2:`First step: ${liters} L = ${liters*1000} mL.`,
      intent:"Convert and combine mixed units (L and mL).",
      steps:[`${liters} L = ${liters*1000} mL.`,`Add the ${extraMl} mL: ${liters*1000} + ${extraMl} = ${totalMl} mL.`,
        `Using ×100 instead of ×1000 for litres is the classic conversion slip.`] }; }
});

reg("5.MD.B.2","earth",5,{
  easy:()=>{
    return { prompt:`On a line plot, three ribbons measure 1/4 m, 1/4 m, and 2/4 m. What is the TOTAL length of all three?`,
      options:opts("1",["3/4","1/4","2/4","1 1/4"]),
      hint1:"All the pieces are quarters — just count how many quarters there are in total.",
      hint2:"First step: 1/4 + 1/4 + 2/4 — add the numerators over 4.",
      intent:"Add fractional measurements read from a line plot.",
      steps:["Quarters: 1 + 1 + 2 = 4 quarters.","4/4 = 1 metre total.","Same-size pieces add by counting the pieces."] }; },
  med:()=>{
    return { prompt:`A line plot shows liquid amounts: 1/8, 1/8, 3/8, and 3/8 of a cup. If all four are poured together and shared equally between 2 jars, how much is in EACH jar?`,
      options:opts("1/2",["1","1/4","3/8","2/8"]),
      hint1:"Find the total first, then split that total in two.",
      hint2:"First step: 1/8 + 1/8 + 3/8 + 3/8 = 8/8 = 1 cup.",
      intent:"Combine line-plot data, then redistribute equally.",
      steps:["Total: (1+1+3+3)/8 = 8/8 = 1 cup.","Split between 2 jars: 1 ÷ 2 = 1/2 cup each.",
        "Two steps: total, then divide."] }; },
  hard:()=>{
    return { prompt:`Six seedlings have heights (in metres): 1/2, 1/2, 1/4, 3/4, 1/2, 1/4. What is the difference between the TALLEST and the SHORTEST?`,
      options:opts("1/2",["3/4","1/4","1","2/4"]),
      hint1:"Find the largest and smallest values on the plot, then subtract.",
      hint2:"First step: tallest = 3/4, shortest = 1/4.",
      intent:"Read extremes from a line plot and find their difference.",
      steps:["Tallest 3/4, shortest 1/4.","3/4 − 1/4 = 2/4 = 1/2.","Same denominator, so subtract the numerators."] }; }
});

reg("5.MD.C.3","earth",5,{
  easy:()=>{ const a=ri(2,5),b=ri(2,5),c=ri(2,5); const ans=a*b*c;
    return { prompt:`A solid box is built from unit cubes, ${a} along, ${b} across, and ${c} high. How many unit cubes is that?`,
      options:opts(ans,[a+b+c, a*b+c, 2*(a*b+b*c+a*c), a*b*c+1]),
      hint1:"Volume counts the cubes inside — think layers stacked up.",
      hint2:`First step: the bottom layer has ${a} × ${b} = ${a*b} cubes.`,
      intent:"Volume as a count of unit cubes (V = l×w×h).",
      steps:[`Bottom layer: ${a} × ${b} = ${a*b}.`,`Stack ${c} layers: ${a*b} × ${c} = ${ans}.`],
      module:{ type:"areaModel", rows:b, cols:a } }; },
  med:()=>{ const a=ri(3,6),b=ri(2,5),c=ri(2,5); const ans=a*b*c;
    return { prompt:`A stone vault measures ${a} units by ${b} units by ${c} units. How many 1-unit cubes fill it completely?`,
      options:opts(ans,[2*(a*b+b*c+a*c), a+b+c, a*b*c - a*b, (a-1)*(b-1)*(c-1)]),
      hint1:"Fill it layer by layer — area of the base times the height.",
      hint2:`First step: base area ${a} × ${b} = ${a*b}.`,
      intent:"Compute volume by counting unit cubes.",
      steps:[`Base: ${a*b}. Height: ${c}.`,`Volume: ${a*b} × ${c} = ${ans} cubes.`,
        `The trap 2(ab+bc+ac) is the SURFACE area, not the volume.`] }; },
  hard:()=>{ const a=ri(2,4),b=ri(2,4),c=ri(2,4); const v=a*b*c; const newc=c*2;
    return { prompt:`A cube structure is ${a}×${b}×${c} units (volume ${v}). If its HEIGHT is doubled and the rest stays the same, what is the new volume?`,
      options:opts(v*2,[v, v+a*b, v*v, v*4]),
      hint1:"Doubling just one dimension does what to the whole product?",
      hint2:`First step: new height = ${c} × 2 = ${newc}.`,
      intent:"Reason about how volume scales when one dimension doubles.",
      steps:[`Volume = ${a}×${b}×height.`,`Doubling height doubles the volume: ${v} × 2 = ${v*2}.`,
        `Only one factor changed, so the volume simply doubles — not quadruples.`] }; }
});

reg("5.MD.C.4","earth",5,{
  easy:()=>{ const a=ri(2,4),b=ri(2,4),c=ri(2,3); const ans=a*b*c;
    return { prompt:`Counting unit cubes, a model is ${a} wide, ${b} deep, and ${c} tall. What is its volume in cubic units?`,
      options:opts(ans,[a*b, a+b+c, a*b*c+a, 2*(a+b+c)]),
      hint1:"Count one layer of cubes, then how many layers.",
      hint2:`First step: one layer is ${a} × ${b} = ${a*b} cubes.`,
      intent:"Measure volume by counting unit cubes.",
      steps:[`Layer: ${a*b}. Layers: ${c}.`,`Volume: ${ans} cubic units.`] }; },
  med:()=>{ const v=ri(24,60); const a=pick([2,3,4]); const bc=v/a; // ensure integer? pick v as product
    const aa=ri(2,4),bb=ri(2,5),cc=ri(2,5); const vol=aa*bb*cc;
    return { prompt:`A container is filled with exactly ${vol} unit cubes. Its base is ${aa} by ${bb}. How TALL is it?`,
      options:opts(cc,[vol/(aa+bb), cc+1, Math.round(vol/aa), cc-1]),
      hint1:"Volume = base area × height. You know volume and base — work backwards.",
      hint2:`First step: base area = ${aa} × ${bb} = ${aa*bb}.`,
      intent:"Find a missing dimension from a known volume.",
      steps:[`Base area: ${aa} × ${bb} = ${aa*bb}.`,`Height: ${vol} ÷ ${aa*bb} = ${cc}.`] }; },
  hard:()=>{ const a=ri(2,4),b=ri(2,4),c=ri(2,4); const d=ri(2,3),e=ri(2,3),f=ri(2,3); const ans=a*b*c+d*e*f;
    return { prompt:`A figure is made of two boxes joined together: one is ${a}×${b}×${c} and the other is ${d}×${e}×${f}. What is the TOTAL volume?`,
      options:opts(ans,[a*b*c, d*e*f, a*b*c*d*e*f, (a+d)*(b+e)*(c+f)]),
      hint1:"Volumes of separate pieces simply add.",
      hint2:`First step: first box = ${a}×${b}×${c} = ${a*b*c}.`,
      intent:"Additive volume of a composite solid.",
      steps:[`Box 1: ${a*b*c}. Box 2: ${d*e*f}.`,`Total: ${a*b*c} + ${d*e*f} = ${ans}.`,
        `Multiplying the volumes instead of adding badly overshoots.`] }; }
});

reg("5.MD.C.5","earth",5,{
  easy:()=>{ const a=ri(3,8),b=ri(2,6),c=ri(2,6); const ans=a*b*c;
    return { prompt:`A treasure chest is ${a} cm long, ${b} cm wide, and ${c} cm tall. What is its volume?`,
      options:opts(ans+" cm³",[(a+b+c)+" cm³",(a*b+c)+" cm³",(2*(a*b+b*c+a*c))+" cm³",(a*b)+" cm³"]),
      hint1:"Volume of a box = length × width × height.",
      hint2:`First step: ${a} × ${b} = ${a*b} (the base).`,
      intent:"Apply the box volume formula.",
      steps:[`${a} × ${b} × ${c} = ${ans} cm³.`,`The base times the height fills the box.`] }; },
  med:()=>{ const a=ri(4,9),b=ri(3,7); const v=ri(60,200); const c=Math.max(2,Math.round(v/(a*b))); const vol=a*b*c;
    return { prompt:`A tank with a ${a} m by ${b} m base holds ${vol} m³ of water when full. How DEEP is the tank?`,
      options:opts(c+" m",[(vol-a*b)+" m",(Math.round(vol/(a+b)))+" m",(c+1)+" m",(a*b)+" m"]),
      hint1:"Depth is the missing factor: volume ÷ base area.",
      hint2:`First step: base area = ${a} × ${b} = ${a*b} m².`,
      intent:"Find a missing dimension from volume and base.",
      steps:[`Base: ${a*b} m².`,`Depth: ${vol} ÷ ${a*b} = ${c} m.`] }; },
  hard:()=>{ const a=ri(2,4),b=ri(2,4),c=ri(2,4); const cut=ri(1,2); const ans=a*b*c - cut*cut*cut;
    return { prompt:`A solid ${a}×${b}×${c} stone block has a small ${cut}×${cut}×${cut} cube carved out of one corner. What volume of stone REMAINS?`,
      options:opts(ans,[a*b*c, cut*cut*cut, a*b*c+cut*cut*cut, a*b*c-cut*3]),
      hint1:"Whole block minus the carved-out cube.",
      hint2:`First step: whole block = ${a}×${b}×${c} = ${a*b*c}.`,
      intent:"Composite volume by subtraction.",
      steps:[`Whole: ${a*b*c}. Removed: ${cut}³ = ${cut*cut*cut}.`,`Remaining: ${a*b*c} − ${cut*cut*cut} = ${ans}.`] }; }
});

reg("5.G.A.1","earth",5,{
  easy:()=>{ const x=ri(1,6),y=ri(1,6);
    return { prompt:`On a coordinate grid, ${pick(EARTHFOLK)} starts at the origin, walks ${x} units RIGHT, then ${y} units UP. What ordered pair names this point?`,
      options:opts(`(${x}, ${y})`,[`(${y}, ${x})`,`(${x+y}, 0)`,`(0, ${x+y})`,`(${x}, ${x})`]),
      hint1:"Order matters: the first number is across (x), the second is up (y).",
      hint2:`First step: across ${x} → x-coordinate is ${x}.`,
      intent:"Plot a point using (x, y) order.",
      steps:[`x (across) = ${x}, y (up) = ${y}.`,`Point: (${x}, ${y}).`,`Swapping to (${y}, ${x}) is the classic order mix-up.`] }; },
  med:()=>{ const x=ri(2,7),y=ri(2,7),dx=ri(1,3);
    return { prompt:`A point sits at (${x}, ${y}). It moves ${dx} unit${dx===1?'':'s'} to the RIGHT. What are its new coordinates?`,
      options:opts(`(${x+dx}, ${y})`,[`(${x}, ${y+dx})`,`(${x-dx}, ${y})`,`(${x+dx}, ${y+dx})`,`(${y}, ${x+dx})`]),
      hint1:"Right/left changes only the x; up/down changes only the y.",
      hint2:`First step: moving right adds to x: ${x} + ${dx}.`,
      intent:"Translate a point horizontally on the grid.",
      steps:[`Right ${dx}: x becomes ${x+dx}, y unchanged.`,`New point: (${x+dx}, ${y}).`] }; },
  hard:()=>{ const x=ri(2,5),y=ri(2,5);
    return { prompt:`Three corners of a square are (${x}, ${y}), (${x+3}, ${y}), and (${x}, ${y+3}). What is the FOURTH corner?`,
      options:opts(`(${x+3}, ${y+3})`,[`(${x+3}, ${y})`,`(${x}, ${y+3})`,`(${x+6}, ${y+6})`,`(${x-3}, ${y-3})`]),
      hint1:"Sketch the three points — the fourth completes the square opposite the start.",
      hint2:`First step: the side lengths are 3; the far corner shares x with one point and y with another.`,
      intent:"Use coordinate structure to complete a square.",
      steps:[`The square spans 3 right and 3 up.`,`The missing corner is across AND up: (${x+3}, ${y+3}).`,
        `It lines up vertically with (${x+3}, ${y}) and horizontally with (${x}, ${y+3}).`] }; }
});

reg("5.G.A.2","earth",5,{
  easy:()=>{ const start=ri(1,3),rate=ri(2,4),t=ri(2,5);
    return { prompt:`A plant is ${start} cm tall and grows ${rate} cm each day. Plotted as (day, height), what is the height at day ${t}?`,
      options:opts(start+rate*t,[rate*t, start+rate, start*rate*t, start+t]),
      hint1:"Start height plus the growth over the days gives the point's height.",
      hint2:`First step: growth in ${t} days = ${rate} × ${t} = ${rate*t}.`,
      intent:"Interpret real-world coordinate points (input, output).",
      steps:[`Growth: ${rate} × ${t} = ${rate*t}.`,`Height: ${start} + ${rate*t} = ${start+rate*t} cm.`] }; },
  med:()=>{ const x1=ri(1,3),y1=ri(2,5),x2=x1+ri(2,3),y2=y1+ri(2,4);
    return { prompt:`On a savings graph, ${pick(ANYONE)} has (${x1}, ${y1}) meaning ${y1} coins on day ${x1}, and (${x2}, ${y2}) on day ${x2}. How many coins were saved BETWEEN those days?`,
      options:opts(y2-y1,[x2-x1, y2+y1, (y2-y1)+(x2-x1), Math.abs(y2-x2)]),
      hint1:"Coins saved is the change in the y-values (the heights).",
      hint2:`First step: ${y2} − ${y1}.`,
      intent:"Read change from two real-world coordinate points.",
      steps:[`Coins went from ${y1} to ${y2}.`,`Change: ${y2} − ${y1} = ${y2-y1} coins.`] }; },
  hard:()=>{ const rate=ri(3,6);
    return { prompt:`A line of points goes (0,0), (1,${rate}), (2,${2*rate}), (3,${3*rate}). If the pattern holds, what is the y-value when x = 10?`,
      options:opts(10*rate,[rate, 10+rate, 10*rate+rate, 9*rate]),
      hint1:"Each step right of 1 adds the same amount up. What's that constant rate?",
      hint2:`First step: from (1,${rate}) the rate is ${rate} per step.`,
      intent:"Extend a proportional pattern on the coordinate plane.",
      steps:[`Each x increases y by ${rate}.`,`At x = 10: 10 × ${rate} = ${10*rate}.`] }; }
});

reg("5.G.B.3","earth",5,{
  easy:()=>{
    return { prompt:`Which statement is ALWAYS true?`,
      options:opts("Every square is a rectangle",["Every rectangle is a square","Every rhombus is a square","A square is not a quadrilateral","No square has right angles"]),
      hint1:"Think about the definition each shape must satisfy, and which is more demanding.",
      hint2:"First step: a rectangle needs 4 right angles; a square has those PLUS equal sides.",
      intent:"Understand that attributes of a category belong to its subcategories.",
      steps:["A square has 4 right angles and 4 equal sides.","So it meets every requirement of a rectangle.",
        "Thus every square IS a rectangle, but not every rectangle is a square."] }; },
  med:()=>{
    return { prompt:`A shape is a quadrilateral with 4 right angles. Which name must it have?`,
      options:opts("rectangle",["square","rhombus","trapezoid","triangle"]),
      hint1:"Four right angles is exactly the defining feature of one family.",
      hint2:"First step: 4 right angles → rectangle family (a square is a special case).",
      intent:"Classify a figure by a defining property.",
      steps:["4 right angles defines a rectangle.","It might also be a square, but 'rectangle' is the name guaranteed.",
        "A triangle can't apply — that has 3 sides, not 4."] }; },
  hard:()=>{
    return { prompt:`'All squares are rhombuses.' Why is this true?`,
      options:opts("A square has 4 equal sides, which is the rhombus requirement",
        ["A rhombus has 4 right angles","Squares and rhombuses are unrelated","A square has only 2 equal sides","Rhombuses are not quadrilaterals"]),
      hint1:"What single property defines a rhombus? Does a square always have it?",
      hint2:"First step: a rhombus is a quadrilateral with 4 equal sides.",
      intent:"Reason about the shape hierarchy using definitions.",
      steps:["Rhombus = 4 equal sides.","A square always has 4 equal sides (plus right angles).",
        "So every square satisfies the rhombus definition — squares are a special kind of rhombus."] }; }
});

reg("5.G.B.4","earth",5,{
  easy:()=>{
    return { prompt:`A four-sided figure has exactly ONE pair of parallel sides. What is it?`,
      options:opts("trapezoid",["parallelogram","rectangle","rhombus","square"]),
      hint1:"Count the pairs of parallel sides each shape requires.",
      hint2:"First step: a parallelogram needs TWO pairs; this has only one.",
      intent:"Classify quadrilaterals by their parallel sides.",
      steps:["Exactly one pair of parallel sides → trapezoid.","Two pairs would make it a parallelogram.",
        "So the single-pair figure is a trapezoid."] }; },
  med:()=>{
    return { prompt:`Which figure is NOT always a parallelogram?`,
      options:opts("trapezoid",["square","rectangle","rhombus","none of these"]),
      hint1:"A parallelogram has two pairs of parallel sides. Which shape can fail that?",
      hint2:"First step: a trapezoid may have only one pair of parallel sides.",
      intent:"Distinguish which shapes always belong to the parallelogram family.",
      steps:["Squares, rectangles, rhombuses all have two pairs of parallel sides.","A trapezoid need not — so it is not always a parallelogram."] }; },
  hard:()=>{
    return { prompt:`A quadrilateral has 4 equal sides but NO right angles. What is the most specific name?`,
      options:opts("rhombus",["square","rectangle","trapezoid","parallelogram"]),
      hint1:"Equal sides point to one family; the missing right angles rule out another.",
      hint2:"First step: 4 equal sides → rhombus or square; no right angles rules out square.",
      intent:"Use multiple properties to name a figure precisely.",
      steps:["4 equal sides → rhombus family.","No right angles → it is not a square.","Most specific name: rhombus."] }; }
});

/* ============================================================
   GRADE 6 — AIR (Ratios & Proportional Relationships, RP)
   ============================================================ */

reg("6.RP.A.1","air",6,{
  easy:()=>{ const a=ri(2,6),k=ri(2,4); const b=a*k; const g=gcd(a,b);
    return { prompt:`A rack holds ${a} gliders and ${b} staffs. Write the ratio of gliders to staffs in simplest form.`,
      options:opts(`${a/g} : ${b/g}`,[`${b/g} : ${a/g}`,`${a} : ${a+b}`,`1 : ${b}`,`${a/g} : ${b}`]),
      hint1:"Order follows the words — gliders first. Then simplify like a fraction.",
      hint2:`First step: write ${a} : ${b}, then divide both by ${g}.`,
      intent:"Express and simplify a ratio, respecting order.",
      steps:[`Gliders : staffs = ${a} : ${b}.`,`Divide both by ${g}: ${a/g} : ${b/g}.`,
        `Reversing to staffs:gliders is the classic order trap.`] }; },
  med:()=>{ const boys=ri(3,7),girls=ri(3,7);
    return { prompt:`In a class of ${boys} boys and ${girls} girls, what is the ratio of boys to the TOTAL number of students?`,
      options:opts(`${boys/gcd(boys,boys+girls)} : ${(boys+girls)/gcd(boys,boys+girls)}`,
        [`${boys} : ${girls}`,`${girls} : ${boys+girls}`,`${boys+girls} : ${boys}`,`1 : ${girls}`]),
      hint1:"'To the total' means the second number is everyone combined, not just the girls.",
      hint2:`First step: total = ${boys} + ${girls} = ${boys+girls}.`,
      intent:"Form a part-to-whole ratio.",
      steps:[`Total students: ${boys+girls}.`,`Boys : total = ${boys} : ${boys+girls}.`,
        `Boys : girls (${boys} : ${girls}) would be part-to-part — a different question.`] }; },
  hard:()=>{ const r1=ri(2,4),r2=ri(3,5); const part=ri(2,4); const juice=part*r1, water=part*r2;
    return { prompt:`A drink mixes juice to water in the ratio ${r1} : ${r2}. If it uses ${water} cups of water, how many cups of JUICE does it use?`,
      options:opts(juice,[water, r1*r2, water-r1, r2*part+r1]),
      hint1:"Find how big one 'part' is using the water, then count the juice parts.",
      hint2:`First step: ${water} cups of water is ${r2} parts, so one part = ${water} ÷ ${r2} = ${part}.`,
      intent:"Use a ratio and one known quantity to find the other.",
      steps:[`One part = ${water} ÷ ${r2} = ${part} cups.`,`Juice is ${r1} parts: ${r1} × ${part} = ${juice} cups.`,
        `Check: juice ${juice} : water ${water} reduces to ${r1} : ${r2}. ✓`] }; }
});

reg("6.RP.A.2","air",6,{
  easy:()=>{ const n=ri(3,6),total=n*ri(3,6); const rate=total/n;
    return { prompt:`${n} sky bison eat ${total} melons in a morning. At the same rate, how many melons does ONE bison eat?`,
      options:opts(rate,[total-n, total+n, n, rate+1]),
      hint1:"A unit rate is the amount for exactly one. Divide.",
      hint2:`First step: ${total} ÷ ${n}.`,
      intent:"Find a unit rate by dividing.",
      steps:[`${total} ÷ ${n} = ${rate} melons per bison.`,`Check: ${n} × ${rate} = ${total}. ✓`] }; },
  med:()=>{ const dist=ri(2,6)*ri(2,5), hrs=ri(2,5); const d=dist*hrs; const speed=d/hrs;
    return { prompt:`A glider covers ${d} km in ${hrs} hours of steady flight. What is its speed in km per hour?`,
      options:opts(speed+" km/h",[(d-hrs)+" km/h",(d+hrs)+" km/h",(d*hrs)+" km/h",(speed+1)+" km/h"]),
      hint1:"'Per hour' = distance for ONE hour.",
      hint2:`First step: ${d} ÷ ${hrs}.`,
      intent:"Speed as a unit rate: distance ÷ time.",
      steps:[`${d} ÷ ${hrs} = ${speed} km/h.`,`Check: ${speed} × ${hrs} = ${d}. ✓`] }; },
  hard:()=>{ const items=ri(3,5),cost=items*ri(2,4); const want=items*ri(2,4); const unit=cost/items; const ans=unit*want;
    return { prompt:`${items} ${pick(ITEMS)} cost ${cost} copper. At the same rate, what do ${want} of them cost?`,
      options:opts(ans,[cost+ (want-items), cost*want/items===ans? ans+items : Math.round(cost*want), want*items, cost+want]),
      hint1:"Find the price of ONE first, then multiply by how many you want.",
      hint2:`First step: one costs ${cost} ÷ ${items} = ${unit} copper.`,
      intent:"Use a unit rate to scale to a new quantity.",
      steps:[`Unit price: ${cost} ÷ ${items} = ${unit}.`,`For ${want}: ${unit} × ${want} = ${ans} copper.`,
        `Adding the difference instead of scaling is a common ratio error.`] }; }
});

reg("6.RP.A.3","air",6,{
  easy:()=>{ const whole=ri(2,8)*10, pct=pick([10,20,25,50]); const ans=whole*pct/100;
    return { prompt:`${pct}% of the ${whole} acolytes are first-years. How many first-years are there?`,
      options:opts(ans,[pct, whole-ans, ans*2, whole*pct/10]),
      hint1:"A percent is a fraction out of 100 — turn it into one you can take of the whole.",
      hint2:`First step: ${pct}% = ${pct}/100.`,
      intent:"Find a percent of a quantity.",
      steps:[`${pct}% of ${whole} = ${pct}/100 × ${whole} = ${ans}.`,
        `The trap ${pct} just copies the percent — a percent is a rate, not a count.`] }; },
  med:()=>{ const cm=ri(2,4),km=ri(3,6); const mapcm=ri(5,9); const ans=Math.round(mapcm*km/cm*10)/10;
    return { prompt:`On a map, ${cm} cm represents ${km} km. Two towns are ${mapcm} cm apart on the map. What is the real distance?`,
      options:opts(ans+" km",[(mapcm*cm)+" km",(mapcm+km)+" km",Math.round(mapcm*cm/km*10)/10+" km",(mapcm*km)+" km"]),
      hint1:"How many km does ONE cm stand for? Then scale up.",
      hint2:`First step: 1 cm = ${km} ÷ ${cm} = ${Math.round(km/cm*100)/100} km.`,
      intent:"Use a scale (unit rate) to convert map distance to real distance.",
      steps:[`Per cm: ${km} ÷ ${cm} = ${Math.round(km/cm*100)/100} km.`,`${mapcm} cm × that = ${ans} km.`] }; },
  hard:()=>{ const orig=ri(4,8)*10, pct=pick([10,20,25]); const discount=orig*pct/100; const ans=orig-discount;
    return { prompt:`A glider costs ${orig} silver. It is marked down ${pct}%. What is the SALE price?`,
      options:opts(ans,[discount, orig+discount, orig-pct, Math.round(orig*pct/100*10)]),
      hint1:"The discount is taken OFF the price — find it, then subtract.",
      hint2:`First step: ${pct}% of ${orig} = ${discount}.`,
      intent:"Apply a percent discount: find the part, subtract from the whole.",
      steps:[`Discount: ${pct}% of ${orig} = ${discount} silver.`,`Sale price: ${orig} − ${discount} = ${ans} silver.`,
        `The trap ${discount} reports the discount, not the new price.`] }; }
});

/* ============================================================
   GRADE 6 — WATER (The Number System, NS)
   ============================================================ */

reg("6.NS.A.1","water",6,{
  easy:()=>{ const b=pick([2,3,4]); const a=ri(1,b-1); const c=1,d=pick([2,3,4]); // (a/b) ÷ (1/d), proper a/b
    const num=a*d, den=b*c;
    return { prompt:`What is ${a}/${b} ÷ 1/${d}?`,
      options:opts(fracStr(num,den),[fracStr(a,b*d), fracStr(b,a*d), fracStr(a*c,b*d), fracStr(a+d,b)]),
      hint1:"Dividing by a fraction is the same as multiplying by its flip.",
      hint2:`First step: ${a}/${b} ÷ 1/${d} = ${a}/${b} × ${d}/1.`,
      intent:"Divide fractions by multiplying by the reciprocal.",
      steps:[`Flip the divisor: ÷ 1/${d} becomes × ${d}/1.`,`${a}/${b} × ${d} = ${num}/${den} = ${fracStr(num,den)}.`] }; },
  med:()=>{ const b=pick([2,3,4]); const a=ri(1,b-1); const d=pick([2,3,4]); const c=ri(1,d-1); const num=a*d,den=b*c;
    return { prompt:`What is ${a}/${b} ÷ ${c}/${d}?`,
      options:opts(fracStr(num,den),[fracStr(a*c,b*d), fracStr(b*c,a*d), fracStr(a,b)==="0"?"1":fracStr(a*d,b), fracStr(a+c,b+d)]),
      hint1:"Keep the first fraction, flip the second, then multiply.",
      hint2:`First step: rewrite as ${a}/${b} × ${d}/${c}.`,
      intent:"Divide a fraction by a fraction (multiply by reciprocal).",
      steps:[`Flip the divisor: × ${d}/${c}.`,`Multiply: ${a*d}/${b*c} = ${fracStr(num,den)}.`,
        `Multiplying straight across without flipping is the usual mistake.`] }; },
  hard:()=>{ const total_n=3,total_d=4; const each_n=1,each_d=8; // 3/4 ÷ 1/8 = 6 servings
    return { prompt:`${pick(WATERFOLK)} has 3/4 of a litre of tonic and pours it into vials holding 1/8 litre each. How many vials can be filled?`,
      options:opts(6,[Math.round(3/4/8*100)/100, 12, 4, 8]),
      hint1:"How many 1/8-litre pieces fit into 3/4 of a litre? That's a division.",
      hint2:"First step: 3/4 ÷ 1/8 = 3/4 × 8.",
      intent:"Fraction division in a measurement context.",
      steps:["3/4 ÷ 1/8 = 3/4 × 8/1 = 24/4 = 6.","So 6 vials can be filled.",
        "Dividing by a fraction below 1 yields a larger count — that's expected here."] }; }
});

reg("6.NS.B.2","water",6,{
  easy:()=>{ const b=ri(11,24),q=ri(11,40); const a=b*q;
    return { prompt:`What is ${a} ÷ ${b}?`,
      options:opts(q,[q+1,q-1,Math.floor(a/(b-1)),q+10]),
      hint1:`Estimate how many ${b}'s are in ${a}, then refine.`,
      hint2:`First step: ${b} × 10 = ${b*10}; the answer is above 10.`,
      intent:"Divide multi-digit whole numbers.",
      steps:[`${b} × ${q} = ${a}, so ${a} ÷ ${b} = ${q}.`] }; },
  med:()=>{ const b=ri(13,29),q=ri(20,60); const a=b*q;
    return { prompt:`A storehouse has ${a} ${pick(ITEMS)} packed evenly into ${b} crates. How many per crate?`,
      options:opts(q,[q+1,q-1,Math.floor(a/(b+2)),a-b]),
      hint1:"Even packing means divide the total by the number of crates.",
      hint2:`First step: ${a} ÷ ${b}.`,
      intent:"Apply long division in context.",
      steps:[`${a} ÷ ${b} = ${q} per crate.`,`Check: ${b} × ${q} = ${a}. ✓`] }; },
  hard:()=>{ const b=ri(14,22),q=ri(15,35),r=ri(1,b-1); const a=b*q+r;
    return { prompt:`${a} travelers must cross a river in boats that hold ${b} each. How many boats are needed so EVERYONE crosses?`,
      options:opts(q+1,[q, r, Math.floor(a/b), q+2]),
      hint1:"A leftover group still needs its own boat — so round UP here.",
      hint2:`First step: ${a} ÷ ${b} = ${q} remainder ${r}.`,
      intent:"Division with remainder, interpreting whether to round up.",
      steps:[`${a} ÷ ${b} = ${q} remainder ${r}.`,`The ${r} leftover travelers need one more boat: ${q} + 1 = ${q+1}.`,
        `Rounding down (${q}) would strand ${r} people.`] }; }
});

reg("6.NS.B.3","water",6,{
  easy:()=>{ const a=Math.round((ri(1,5)+rng())*100)/100, b=Math.round((ri(1,5)+rng())*100)/100; const ans=Math.round((a+b)*100)/100;
    return { prompt:`What is ${a.toFixed(2)} + ${b.toFixed(2)}?`,
      options:opts(ans.toFixed(2),[(ans+0.1).toFixed(2),(Math.round((a-b)*100)/100).toFixed(2),(ans-0.09).toFixed(2),(a*b).toFixed(2)]),
      hint1:"Align the decimal points before adding.",
      hint2:"First step: stack hundredths under hundredths.",
      intent:"Add decimals fluently.",
      steps:[`${a.toFixed(2)} + ${b.toFixed(2)} = ${ans.toFixed(2)}.`] }; },
  med:()=>{ const a=Math.round((ri(2,6)+rng())*10)/10, b=ri(2,5); const ans=Math.round(a*b*100)/100;
    return { prompt:`What is ${a.toFixed(1)} × ${b}?`,
      options:opts(ans.toFixed(2),[(a*b+a).toFixed(2),(a+b).toFixed(2),(Math.round(a*b*10)/10+0.5).toFixed(2),(a*(b-1)).toFixed(2)]),
      hint1:"Multiply as whole numbers, then place the decimal point.",
      hint2:`First step: ignore the decimal, multiply, then restore one decimal place.`,
      intent:"Multiply a decimal by a whole number.",
      steps:[`${a.toFixed(1)} × ${b} = ${ans.toFixed(2)}.`,`Estimate ${Math.round(a)} × ${b} = ${Math.round(a)*b} to sanity-check.`] }; },
  hard:()=>{ const total=Math.round((ri(8,16)+rng())*100)/100, n=ri(2,5); const ans=Math.round(total/n*100)/100;
    return { prompt:`A ${total.toFixed(2)}-copper bill is split equally among ${n} friends. How much does each pay?`,
      options:opts(ans.toFixed(2),[(total-n).toFixed(2),(total*n).toFixed(2),(ans+0.1).toFixed(2),(Math.round(total/(n+1)*100)/100).toFixed(2)]),
      hint1:"Equal split is division — by the number of friends.",
      hint2:`First step: ${total.toFixed(2)} ÷ ${n}.`,
      intent:"Divide a decimal by a whole number.",
      steps:[`${total.toFixed(2)} ÷ ${n} = ${ans.toFixed(2)} each.`,`Check: ${ans.toFixed(2)} × ${n} ≈ ${total.toFixed(2)}. ✓`] }; }
});

reg("6.NS.B.4","water",6,{
  easy:()=>{ const a=ri(2,6),b=ri(2,6); const x=a*ri(2,4), y=b*ri(2,4); // gcf question
    const A=12, B=18; // fixed clean pair varied below
    const m=pick([[12,18,6],[8,12,4],[9,15,3],[10,25,5],[16,24,8]]);
    return { prompt:`What is the greatest common factor (GCF) of ${m[0]} and ${m[1]}?`,
      options:opts(m[2],[m[0]*m[1], m[0]+m[1], m[2]*2, 1]),
      hint1:"List the factors of each, and find the biggest they share.",
      hint2:`First step: factors of ${m[0]} include 1, …; check which divide ${m[1]} too.`,
      intent:"Find the greatest common factor.",
      steps:[`The largest number dividing both ${m[0]} and ${m[1]} is ${m[2]}.`,
        `${m[0]*m[1]} is the product, not the GCF — a common mix-up.`] }; },
  med:()=>{ const m=pick([[4,6,12],[3,5,15],[6,8,24],[4,10,20],[6,9,18]]);
    return { prompt:`What is the least common multiple (LCM) of ${m[0]} and ${m[1]}?`,
      options:opts(m[2],[m[0]*m[1], gcd(m[0],m[1]), m[0]+m[1], m[2]*2]),
      hint1:"List multiples of each until they first meet.",
      hint2:`First step: multiples of ${m[1]}: ${m[1]}, ${2*m[1]}, …; which is also a multiple of ${m[0]}?`,
      intent:"Find the least common multiple.",
      steps:[`The smallest number both ${m[0]} and ${m[1]} divide is ${m[2]}.`,
        `Their product ${m[0]*m[1]} is a common multiple but not the LEAST one (unless they share no factors).`] }; },
  hard:()=>{ const g=ri(3,6),x=ri(2,4),y=ri(3,5); const a=g*x,b=g*y;
    return { prompt:`Use the GCF to rewrite ${a} + ${b} as a product: ${a} + ${b} = GCF × (sum). What is the GCF you factor out?`,
      options:opts(g,[a+b, g*2, gcd(a,b)===g?1:gcd(a,b), x+y]),
      hint1:"Pull out the largest number that divides BOTH terms.",
      hint2:`First step: the GCF of ${a} and ${b} is ${g}.`,
      intent:"Apply the distributive property using the GCF.",
      steps:[`GCF of ${a} and ${b} is ${g}.`,`${a} + ${b} = ${g}(${x} + ${y}) = ${g} × ${x+y}.`,
        `Factoring out the GCF rewrites a sum as a clean product.`] }; }
});

reg("6.NS.C.5","water",6,{
  easy:()=>{ const drop=ri(3,9);
    return { prompt:`The temperature is 0°C and then DROPS ${drop} degrees. What integer represents the new temperature?`,
      options:opts(`−${drop}`,[`${drop}`,`0`,`−${drop+1}`,`${drop}°`]),
      hint1:"Below zero is written with a negative sign.",
      hint2:`First step: a drop from 0 goes below zero by ${drop}.`,
      intent:"Represent a real-world decrease with a negative integer.",
      steps:[`Dropping ${drop} from 0 gives −${drop}°C.`,`Positive ${drop} would mean ABOVE zero.`] }; },
  med:()=>{ const dep=ri(20,60), wd=ri(10,40); const ans=dep-wd;
    return { prompt:`${pick(ANYONE)}'s account starts at 0, gains ${dep} copper, then a debt of ${wd} copper is recorded as a withdrawal. What integer is the balance?`,
      options:opts(ans,[dep+wd, -(dep-wd), wd-dep, -wd]),
      hint1:"A deposit is positive, a withdrawal is negative — combine them.",
      hint2:`First step: +${dep} then −${wd}.`,
      intent:"Combine positive and negative quantities in context.",
      steps:[`0 + ${dep} − ${wd} = ${ans}.`,`A positive result means money remains.`] }; },
  hard:()=>{ const below=ri(20,80);
    return { prompt:`Sea level is 0. A submarine sits at −${below} m and a gull flies at +${ri(5,15)} m. Which describes the submarine's position?`,
      options:opts(`${below} m below sea level`,[`${below} m above sea level`,`at sea level`,`${below} m to the right`,`higher than the gull`]),
      hint1:"A negative position relative to 0 means below the reference point.",
      hint2:`First step: −${below} means ${below} units below the zero line (sea level).`,
      intent:"Interpret the meaning of a negative quantity in context.",
      steps:[`−${below} m means ${below} m below sea level.`,`The negative sign encodes 'below' here.`] }; }
});

reg("6.NS.C.6","water",6,{
  easy:()=>{ const n=ri(2,9);
    return { prompt:`What is the OPPOSITE of −${n}?`,
      options:opts(`${n}`,[`−${n}`,`0`,`1/${n}`,`−${n+1}`]),
      hint1:"Opposites are the same distance from 0 but on the other side.",
      hint2:`First step: −${n} is ${n} units left of 0; its opposite is ${n} units right.`,
      intent:"Understand opposites on the number line.",
      steps:[`The opposite of −${n} is +${n}.`,`Opposites sum to zero: −${n} + ${n} = 0.`] }; },
  med:()=>{ const x=ri(-5,-1), y=ri(1,5);
    return { prompt:`On a number line, which is farther to the LEFT: ${x} or ${y}?`,
      options:opts(`${x}`,[`${y}`,"they are the same","neither","both"]),
      hint1:"Left means smaller on the number line.",
      hint2:`First step: negatives sit left of 0, positives to the right.`,
      intent:"Locate and compare integers on the number line.",
      steps:[`${x} is negative (left of 0); ${y} is positive (right of 0).`,`So ${x} is farther left.`] }; },
  hard:()=>{ const x=ri(2,6); let y=ri(2,6); if(y===x) y=(x===6?5:x+1);
    return { prompt:`The point (${x}, ${y}) is reflected across the y-axis. What are its new coordinates?`,
      options:opts(`(−${x}, ${y})`,[`(${x}, −${y})`,`(−${x}, −${y})`,`(${y}, ${x})`,`(${x}, ${y})`]),
      hint1:"Reflecting across the y-axis flips left/right — which coordinate changes sign?",
      hint2:"First step: the x-coordinate changes sign; y stays.",
      intent:"Reflect a point across an axis using sign changes.",
      steps:[`Across the y-axis: x → −x, y unchanged.`,`(${x}, ${y}) → (−${x}, ${y}).`,
        `Reflecting across the x-axis would instead flip the y-sign.`] }; }
});

reg("6.NS.C.7","water",6,{
  easy:()=>{ const vals=[ri(-9,-1),ri(-9,-1),ri(1,5)]; const mn=Math.min(...vals);
    return { prompt:`Which is the SMALLEST: ${vals.join(", ")}?`,
      options:opts(`${mn}`,[`${Math.max(...vals)}`,`${vals[2]}`,`0`,`${-mn}`]),
      hint1:"Smallest means farthest left on the number line.",
      hint2:"First step: the more negative a number, the smaller it is.",
      intent:"Order rational numbers.",
      steps:[`Place them on a line; the leftmost is ${mn}.`,`Bigger digits after a minus sign mean a SMALLER number.`] }; },
  med:()=>{ const n=ri(3,9);
    return { prompt:`What is the absolute value, |−${n}|?`,
      options:opts(`${n}`,[`−${n}`,`0`,`${2*n}`,`1/${n}`]),
      hint1:"Absolute value is distance from 0 — always non-negative.",
      hint2:`First step: how far is −${n} from 0?`,
      intent:"Compute absolute value as distance from zero.",
      steps:[`|−${n}| = ${n} (distance from 0).`,`Distance is never negative.`] }; },
  hard:()=>{ const a=ri(2,8),b=ri(2,8);
    return { prompt:`${pick(ANYONE)} owes ${a} copper; ${pick(ANYONE)} owes ${b} copper. Whose DEBT is larger, and by how much? (Give the larger absolute amount.)`,
      options:opts(Math.max(a,b),[Math.min(a,b), a+b, Math.abs(a-b), -(Math.max(a,b))]),
      hint1:"A bigger debt is a number farther from 0 — compare absolute values.",
      hint2:`First step: debts are −${a} and −${b}; compare |−${a}| and |−${b}|.`,
      intent:"Interpret absolute value as magnitude (size of a debt).",
      steps:[`|−${a}| = ${a}, |−${b}| = ${b}.`,`The larger debt has the larger absolute value: ${Math.max(a,b)}.`,
        `Even though −${Math.max(a,b)} is the SMALLER number, it is the BIGGER debt.`] }; }
});

reg("6.NS.C.8","water",6,{
  easy:()=>{ const x=ri(2,6),y1=ri(1,4),y2=y1+ri(2,5);
    return { prompt:`Two points (${x}, ${y1}) and (${x}, ${y2}) lie on the same vertical line. How far apart are they?`,
      options:opts(y2-y1,[x, y2+y1, Math.abs(x-y1), y2]),
      hint1:"Same x means they line up vertically — the distance is the y-gap.",
      hint2:`First step: ${y2} − ${y1}.`,
      intent:"Find distance between points sharing a coordinate.",
      steps:[`Same x, so distance = ${y2} − ${y1} = ${y2-y1}.`] }; },
  med:()=>{ const x1=ri(-5,-1),x2=ri(2,6),y=ri(1,5);
    return { prompt:`Find the distance between (${x1}, ${y}) and (${x2}, ${y}).`,
      options:opts(x2-x1,[x2+x1, Math.abs(x2)-Math.abs(x1), x1+x2+y, x2]),
      hint1:"Same y means a horizontal distance — but the points straddle 0.",
      hint2:`First step: from ${x1} to 0 is ${Math.abs(x1)}, from 0 to ${x2} is ${x2}.`,
      intent:"Distance across zero is the sum of the two distances from zero.",
      steps:[`|${x1}| + |${x2}| = ${Math.abs(x1)} + ${x2} = ${x2-x1}.`,
        `Subtracting signed values: ${x2} − (${x1}) = ${x2-x1}.`] }; },
  hard:()=>{ const x1=ri(1,3),y1=ri(1,3),side=ri(3,5);
    return { prompt:`A rectangle has corners (${x1}, ${y1}), (${x1+side}, ${y1}), (${x1+side}, ${y1+side-1}), (${x1}, ${y1+side-1}). What is its PERIMETER?`,
      options:opts(2*(side+(side-1)),[side*(side-1), 2*side, side+(side-1), 4*side]),
      hint1:"Find the width and height from the coordinates, then go around.",
      hint2:`First step: width = ${side}, height = ${side-1}.`,
      intent:"Use coordinates to find side lengths, then perimeter.",
      steps:[`Width: ${(x1+side)}−${x1} = ${side}. Height: ${side-1}.`,
        `Perimeter: 2 × (${side} + ${side-1}) = ${2*(side+(side-1))}.`,
        `Multiplying the sides gives AREA, not perimeter.`] }; }
});

/* ============================================================
   GRADE 6 — FIRE (Expressions & Equations, EE)
   ============================================================ */

reg("6.EE.A.1","fire",6,{
  easy:()=>{ const b=ri(2,5),e=ri(2,3); const ans=Math.pow(b,e);
    return { prompt:`What is ${b}^${e}?`,
      options:opts(ans,[b*e, b+e, Math.pow(b,e)+b, b*e*e]),
      hint1:"An exponent tells how many copies of the base are multiplied.",
      hint2:`First step: ${b}^${e} = ${Array(e).fill(b).join(" × ")}.`,
      intent:"Evaluate a whole-number power.",
      steps:[`${b}^${e} = ${Array(e).fill(b).join(" × ")} = ${ans}.`,
        `The trap ${b*e} multiplies base × exponent — a very common slip.`] }; },
  med:()=>{ const b=ri(2,4); const ans=Math.pow(b,3);
    return { prompt:`A cube has edge ${b}. Its volume is ${b}^3. What number is that?`,
      options:opts(ans,[b*3, b*b, 3*b*b, ans+b]),
      hint1:"Cubing means three of the base multiplied together.",
      hint2:`First step: ${b}^3 = ${b} × ${b} × ${b}.`,
      intent:"Connect an exponent to repeated multiplication.",
      steps:[`${b} × ${b} × ${b} = ${ans}.`] }; },
  hard:()=>{ const b=ri(2,3),e=ri(2,3),add=ri(2,6); const ans=Math.pow(b,e)+add*2;
    return { prompt:`Evaluate ${b}^${e} + ${add} × 2.`,
      options:opts(ans,[(Math.pow(b,e)+add)*2, b*e+add*2, Math.pow(b,e)+add, Math.pow(b,e)*add*2]),
      hint1:"Powers and multiplication both come before addition.",
      hint2:`First step: ${b}^${e} = ${Math.pow(b,e)} and ${add} × 2 = ${add*2}.`,
      intent:"Order of operations including an exponent.",
      steps:[`${b}^${e} = ${Math.pow(b,e)}; ${add} × 2 = ${add*2}.`,`Add: ${Math.pow(b,e)} + ${add*2} = ${ans}.`] }; }
});

reg("6.EE.A.2","fire",6,{
  easy:()=>{ const a=ri(2,6),x=ri(2,6); const ans=a*x;
    return { prompt:`If x = ${x}, what is the value of ${a}x?`,
      options:opts(ans,[Number(`${a}${x}`), a+x, a-x+ x, a*x+a]),
      hint1:"A number next to a letter means multiply.",
      hint2:`First step: ${a}x = ${a} × x.`,
      intent:"Evaluate an expression with a variable.",
      steps:[`${a}x = ${a} × ${x} = ${ans}.`,`Gluing digits to read '${a}${x}' is wrong — algebra multiplies, never concatenates.`] }; },
  med:()=>{ const a=ri(2,5),b=ri(2,8),x=ri(2,6); const ans=a*x+b;
    return { prompt:`Evaluate ${a}x + ${b} when x = ${x}.`,
      options:opts(ans,[a*(x+b), a+x+b, a*x*b, a*x-b]),
      hint1:"Substitute the value, then follow order of operations.",
      hint2:`First step: ${a} × ${x} = ${a*x}.`,
      intent:"Substitute and evaluate a two-term expression.",
      steps:[`${a}x = ${a} × ${x} = ${a*x}.`,`Add ${b}: ${a*x} + ${b} = ${ans}.`] }; },
  hard:()=>{ const a=ri(2,4),x=ri(2,5); const ans=a*x*x;
    return { prompt:`Evaluate ${a}x² when x = ${x}.`,
      options:opts(ans,[Math.pow(a*x,2), a*x*2, a*2*x, Math.pow(x,2)+a]),
      hint1:"The exponent attaches only to x — square x first, then multiply.",
      hint2:`First step: x² = ${x}² = ${x*x}.`,
      intent:"Evaluate an expression with a coefficient and an exponent.",
      steps:[`x² = ${x*x}.`,`${a} × ${x*x} = ${ans}.`,
        `The trap (${a}x)² squares the ${a} too — but the exponent is on x alone.`] }; }
});

reg("6.EE.A.3","fire",6,{
  easy:()=>{ const a=ri(2,5),b=ri(2,5);
    return { prompt:`Use the distributive property: ${a}(x + ${b}) = ?`,
      options:opts(`${a}x + ${a*b}`,[`${a}x + ${b}`,`x + ${a*b}`,`${a}x + ${a+b}`,`${a+1}x + ${a*b}`]),
      hint1:"The number outside multiplies EVERY term inside the parentheses.",
      hint2:`First step: ${a} × x = ${a}x.`,
      intent:"Expand using the distributive property.",
      steps:[`${a} × x = ${a}x; ${a} × ${b} = ${a*b}.`,`So ${a}(x + ${b}) = ${a}x + ${a*b}.`,
        `Forgetting to multiply the ${b} is the usual error.`] }; },
  med:()=>{ const a=ri(2,5),x=ri(2,4);
    return { prompt:`Combine like terms: ${a}x + ${x}x = ?`,
      options:opts(`${a+x}x`,[`${a*x}x`,`${a+x}`,`${a+x}x²`,`${a}x${x}`]),
      hint1:"Like terms (both have x) add by adding their coefficients.",
      hint2:`First step: ${a} + ${x} = ${a+x}.`,
      intent:"Generate an equivalent expression by combining like terms.",
      steps:[`${a}x + ${x}x = (${a} + ${x})x = ${a+x}x.`,
        `Multiplying the coefficients (${a*x}) would be wrong — like terms ADD.`] }; },
  hard:()=>{ const a=ri(2,4),b=ri(2,5),c=ri(2,5);
    return { prompt:`Factor out the greatest common factor: ${a*b}x + ${a*c} = ?`,
      options:opts(`${a}(${b}x + ${c})`,[`${a}(${b}x + ${a*c})`,`${a*b}(x + ${c})`,`${a}x(${b} + ${c})`,`${b}(${a}x + ${c})`]),
      hint1:"Pull out the largest number dividing both terms.",
      hint2:`First step: the GCF of ${a*b} and ${a*c} is ${a}.`,
      intent:"Write an equivalent expression by factoring out the GCF.",
      steps:[`GCF is ${a}.`,`${a*b}x + ${a*c} = ${a}(${b}x + ${c}).`,
        `Check by distributing: ${a} × ${b}x = ${a*b}x and ${a} × ${c} = ${a*c}. ✓`] }; }
});

reg("6.EE.A.4","fire",6,{
  easy:()=>{ const a=ri(2,5);
    return { prompt:`Which expression is equivalent to ${a}x + ${a}x?`,
      options:opts(`${2*a}x`,[`${a*a}x`,`${2*a}x²`,`${a}x²`,`${2*a}`]),
      hint1:"Two equal terms — add their coefficients.",
      hint2:`First step: ${a}x + ${a}x = (${a} + ${a})x.`,
      intent:"Identify equivalent expressions via like terms.",
      steps:[`${a}x + ${a}x = ${2*a}x.`,`The exponent on x does NOT change when adding like terms.`] }; },
  med:()=>{ const a=ri(2,5),b=ri(2,5);
    return { prompt:`Which is equivalent to ${a}(x + ${b})?`,
      options:opts(`${a}x + ${a*b}`,[`${a}x + ${b}`,`${a+b}x`,`x + ${a*b}`,`${a}x + ${a+b}`]),
      hint1:"Distribute and compare.",
      hint2:`First step: multiply ${a} by each term inside.`,
      intent:"Recognize equivalent expressions using distribution.",
      steps:[`${a}(x + ${b}) = ${a}x + ${a*b}.`,`That matches the first option.`] }; },
  hard:()=>{ const x=3; const a=ri(2,4),b=ri(2,4); // test by substitution
    return { prompt:`Two expressions are claimed equal: ${a}(x + ${b}) and ${a}x + ${b}. Test with x = 1 — are they equivalent?`,
      options:opts("No — they differ",["Yes — always equal","Only for x = 0","Only for negative x","Cannot be tested"]),
      hint1:"Plug in a number for x into BOTH and compare results.",
      hint2:`First step: at x = 1, ${a}(1 + ${b}) = ${a*(1+b)} but ${a}(1) + ${b} = ${a+b}.`,
      intent:"Use substitution to decide whether expressions are equivalent.",
      steps:[`${a}(x + ${b}) distributes to ${a}x + ${a*b}, not ${a}x + ${b}.`,
        `At x = 1: ${a*(1+b)} vs ${a+b} — different, so NOT equivalent.`,
        `A single value where they differ disproves equivalence.`] }; }
});

reg("6.EE.B.5","fire",6,{
  easy:()=>{ const a=ri(2,9),sol=ri(2,9); const c=a+sol;
    return { prompt:`Which value of x makes x + ${a} = ${c} true?`,
      options:opts(sol,[c, c+a, sol+1, a]),
      hint1:"Test the options, or undo the addition.",
      hint2:`First step: x = ${c} − ${a}.`,
      intent:"Understand solving as finding the value that makes an equation true.",
      steps:[`x + ${a} = ${c} means x = ${c} − ${a} = ${sol}.`,`Check: ${sol} + ${a} = ${c}. ✓`] }; },
  med:()=>{ const a=ri(2,6),sol=ri(2,6); const c=a*sol;
    return { prompt:`Which value of x makes ${a}x = ${c} true?`,
      options:opts(sol,[c, c+a, a, sol+1]),
      hint1:"Undo the multiplication to test.",
      hint2:`First step: x = ${c} ÷ ${a}.`,
      intent:"Find the solution value of a one-step equation.",
      steps:[`${a}x = ${c} → x = ${c} ÷ ${a} = ${sol}.`,`Check: ${a} × ${sol} = ${c}. ✓`] }; },
  hard:()=>{ const c=ri(5,9);
    return { prompt:`Which value of x makes the inequality x + 3 > ${c+3} true?`,
      options:opts(`${c+1}`,[`${c}`,`${c-1}`,`${c-2}`,`${c+3}`===`${c+1}`?`0`:`${c-3}`]),
      hint1:"Solve the inequality, then pick a value that satisfies it.",
      hint2:`First step: x + 3 > ${c+3} means x > ${c}.`,
      intent:"Identify a value that satisfies an inequality.",
      steps:[`x + 3 > ${c+3} → x > ${c}.`,`Only ${c+1} is greater than ${c}.`,
        `x = ${c} fails because it must be strictly greater.`] }; }
});

reg("6.EE.B.6","fire",6,{
  easy:()=>{ const cost=ri(2,5);
    return { prompt:`Each scroll costs ${cost} copper. Which expression gives the cost of n scrolls?`,
      options:opts(`${cost}n`,[`n + ${cost}`,`${cost} + n`,`n/${cost}`,`${cost}`]),
      hint1:"Cost scales with how many you buy — that's multiplication by n.",
      hint2:`First step: ${cost} copper for each of n scrolls.`,
      intent:"Use a variable to represent a quantity.",
      steps:[`Cost = ${cost} × n = ${cost}n.`,`Adding n would mix copper with a count.`] }; },
  med:()=>{ const base=ri(5,12),rate=ri(2,4);
    return { prompt:`A plant starts ${base} cm tall and grows ${rate} cm per week. Which expression gives its height after w weeks?`,
      options:opts(`${base} + ${rate}w`,[`${rate} + ${base}w`,`${base+rate}w`,`${base}w + ${rate}`,`${base} − ${rate}w`]),
      hint1:"Start with the initial height, then add the steady growth.",
      hint2:`First step: growth after w weeks is ${rate}w.`,
      intent:"Build an expression from a real situation.",
      steps:[`Height = starting ${base} + growth ${rate}w = ${base} + ${rate}w.`] }; },
  hard:()=>{ const total=ri(20,40),each=ri(2,5);
    return { prompt:`${pick(ANYONE)} has ${total} copper and spends ${each} copper per day. Which expression gives the money LEFT after d days?`,
      options:opts(`${total} − ${each}d`,[`${total} + ${each}d`,`${each}d − ${total}`,`${total} − ${each} + d`,`${total-each}d`]),
      hint1:"Money decreases — subtract the daily spending from the start.",
      hint2:`First step: spent after d days is ${each}d.`,
      intent:"Represent a decreasing quantity with a variable expression.",
      steps:[`Left = ${total} − ${each}d.`,`Spending grows with d, so it's subtracted.`] }; }
});

reg("6.EE.B.7","fire",6,{
  easy:()=>{ const a=ri(3,12),sol=ri(2,9); const c=a+sol;
    return { prompt:`Solve for x:  x + ${a} = ${c}`,
      options:opts(sol,[c, c+a, sol-1, a]),
      hint1:"Undo what was done to x.",
      hint2:`First step: subtract ${a} from both sides.`,
      intent:"Solve a one-step addition equation.",
      steps:[`x = ${c} − ${a} = ${sol}.`,`Check: ${sol} + ${a} = ${c}. ✓`] }; },
  med:()=>{ const a=ri(2,6),sol=ri(2,8); const c=a*sol;
    return { prompt:`Solve for x:  ${a}x = ${c}`,
      options:opts(sol,[c, c+a, a, sol+1]),
      hint1:`x is multiplied by ${a} — undo with the inverse.`,
      hint2:`First step: divide both sides by ${a}.`,
      intent:"Solve a one-step multiplication equation.",
      steps:[`x = ${c} ÷ ${a} = ${sol}.`,`Check: ${a} × ${sol} = ${c}. ✓`] }; },
  hard:()=>{ const a=ri(2,5),b=ri(3,9),sol=ri(2,6); const c=a*sol+b;
    return { prompt:`Solve for x:  ${a}x + ${b} = ${c}`,
      options:opts(sol,[(c-b), c, sol+1, Math.round(c/a)]),
      hint1:"Two steps: peel off the addition first, then the multiplication.",
      hint2:`First step: subtract ${b} from both sides → ${a}x = ${c-b}.`,
      intent:"Solve a two-step linear equation.",
      steps:[`Subtract ${b}: ${a}x = ${c-b}.`,`Divide by ${a}: x = ${sol}.`,
        `Check: ${a}(${sol}) + ${b} = ${c}. ✓ The trap ${c-b} is ${a}x, not x.`] }; }
});

reg("6.EE.B.8","fire",6,{
  easy:()=>{ const c=ri(3,9);
    return { prompt:`${pick(ANYONE)} must be AT LEAST ${c} years old to train. Which inequality describes the allowed ages a?`,
      options:opts(`a ≥ ${c}`,[`a > ${c}`,`a ≤ ${c}`,`a < ${c}`,`a = ${c}`]),
      hint1:"'At least' includes the number itself — which symbol allows equality?",
      hint2:`First step: 'at least ${c}' means ${c} or more.`,
      intent:"Translate a word condition into an inequality.",
      steps:[`'At least ${c}' means ${c} or greater: a ≥ ${c}.`,`The ≥ includes ${c} itself; > would exclude it.`] }; },
  med:()=>{ const c=ri(3,9);
    return { prompt:`Which number is a solution to x > ${c}?`,
      options:opts(`${c+1}`,[`${c}`,`${c-1}`,`${c-2}`,`0`]),
      hint1:`A solution must be strictly greater than ${c}.`,
      hint2:`First step: ${c} itself does NOT satisfy x > ${c}.`,
      intent:"Recognize solutions of an inequality.",
      steps:[`x > ${c} needs values above ${c}.`,`${c+1} works; ${c} does not (not strictly greater).`] }; },
  hard:()=>{ const c=ri(2,6);
    return { prompt:`On a number line, the solution to x ≤ ${c} is shown as…`,
      options:opts(`a closed dot at ${c} with shading to the LEFT`,
        [`an open dot at ${c} shading left`,`a closed dot at ${c} shading right`,`an open dot at ${c} shading right`,`a single point at ${c}`]),
      hint1:"≤ includes the endpoint (closed dot); 'less than' shades toward smaller numbers.",
      hint2:`First step: ≤ means the dot at ${c} is filled in (closed).`,
      intent:"Connect an inequality to its number-line graph.",
      steps:[`≤ → closed dot at ${c} (the value is included).`,`'Less than or equal' shades LEFT toward smaller values.`] }; }
});

reg("6.EE.C.9","fire",6,{
  easy:()=>{ const rate=ri(2,5);
    return { prompt:`A cart travels ${rate} km each hour. Using d for distance and t for time, which equation relates them?`,
      options:opts(`d = ${rate}t`,[`t = ${rate}d`,`d = t + ${rate}`,`d = ${rate} + t`,`d = ${rate}/t`]),
      hint1:"Distance depends on time at a steady rate — distance is the dependent variable.",
      hint2:`First step: each hour adds ${rate} km, so d = ${rate} × t.`,
      intent:"Write an equation relating dependent and independent variables.",
      steps:[`d = ${rate}t.`,`Here t is independent (you choose it) and d depends on it.`] }; },
  med:()=>{ const rate=ri(2,4),t=ri(3,6);
    return { prompt:`In y = ${rate}x, x is the number of hours and y the pages read. How many pages after x = ${t} hours?`,
      options:opts(rate*t,[rate+t, t, rate*t+rate, Math.round(t/rate)]),
      hint1:"Substitute the independent value into the equation.",
      hint2:`First step: y = ${rate} × ${t}.`,
      intent:"Use an equation relating two variables to find a value.",
      steps:[`y = ${rate} × ${t} = ${rate*t} pages.`] }; },
  hard:()=>{ const rate=ri(2,4);
    return { prompt:`A table shows x: 1, 2, 3 and y: ${rate}, ${2*rate}, ${3*rate}. Which equation fits, and what is the dependent variable?`,
      options:opts(`y = ${rate}x; y depends on x`,
        [`x = ${rate}y; x depends on y`,`y = x + ${rate}`,`y = ${rate} + x; x depends on y`,`y = ${rate}; constant`]),
      hint1:"Find the rule from the table, then decide which variable is controlled.",
      hint2:`First step: each y is ${rate} times its x.`,
      intent:"Identify the equation and the dependent variable from a table.",
      steps:[`y = ${rate}x fits all rows.`,`y is computed FROM x, so y is the dependent variable.`] }; }
});

/* ============================================================
   GRADE 6 — EARTH (Geometry, G)
   ============================================================ */

reg("6.G.A.1","earth",6,{
  easy:()=>{ const b=ri(4,12),h=ri(2,10); const ans=b*h/2;
    return { prompt:`A triangular banner has base ${b} dm and height ${h} dm. What is its area?`,
      options:opts(ans+" dm²",[(b*h)+" dm²",(b+h)+" dm²",((b+h)/2)+" dm²",(b*h/2+b)+" dm²"]),
      hint1:"A triangle is half of the rectangle around it.",
      hint2:`First step: ${b} × ${h} = ${b*h} (the surrounding rectangle).`,
      intent:"Area of a triangle = (base × height) ÷ 2.",
      steps:[`Rectangle: ${b} × ${h} = ${b*h}.`,`Triangle is half: ${b*h} ÷ 2 = ${ans} dm².`,
        `The trap ${b*h} forgets to halve.`] }; },
  med:()=>{ const b1=ri(4,8),b2=ri(9,14),h=ri(2,6); const ans=(b1+b2)*h/2;
    return { prompt:`A trapezoid has parallel sides ${b1} m and ${b2} m, with height ${h} m. What is its area?`,
      options:opts(ans+" m²",[((b1+b2)*h)+" m²",(b1*b2/2)+" m²",((b1+b2)/2)+" m²",(b1*h+b2)+" m²"]),
      hint1:"Average the two parallel sides, then multiply by the height.",
      hint2:`First step: (${b1} + ${b2}) ÷ 2 = ${(b1+b2)/2}.`,
      intent:"Area of a trapezoid = average of parallel sides × height.",
      steps:[`Average base: (${b1} + ${b2}) ÷ 2 = ${(b1+b2)/2}.`,`Times height: ${(b1+b2)/2} × ${h} = ${ans} m².`] }; },
  hard:()=>{ const w=ri(6,10),h=ri(5,9),cutB=ri(2,4),cutH=ri(2,4); const ans=w*h - cutB*cutH/2;
    return { prompt:`A rectangular flag is ${w} dm by ${h} dm. A right triangle with legs ${cutB} dm and ${cutH} dm is cut from one corner. What area REMAINS?`,
      options:opts(ans+" dm²",[(w*h)+" dm²",(w*h-cutB*cutH)+" dm²",(cutB*cutH/2)+" dm²",(w*h-cutB-cutH)+" dm²"]),
      hint1:"Whole rectangle minus the triangular cut. Mind the ÷2 on the triangle.",
      hint2:`First step: rectangle = ${w} × ${h} = ${w*h}; triangle = ${cutB} × ${cutH} ÷ 2 = ${cutB*cutH/2}.`,
      intent:"Composite area: subtract a triangle from a rectangle.",
      steps:[`Rectangle: ${w*h}. Triangle: ${cutB*cutH/2}.`,`Remaining: ${w*h} − ${cutB*cutH/2} = ${ans} dm².`,
        `Forgetting the triangle's ÷2 (subtracting ${cutB*cutH}) is the common slip.`] }; }
});

reg("6.G.A.2","earth",6,{
  easy:()=>{ const a=ri(2,4),b=ri(2,4); const half=1; const ans=a*b*0.5;
    return { prompt:`A box is ${a} units by ${b} units by 1/2 unit. What is its volume?`,
      options:opts(ans,[a*b, a*b*2, a+b, a*b+0.5]),
      hint1:"Volume is still length × width × height, even with a fractional height.",
      hint2:`First step: ${a} × ${b} = ${a*b}, then × 1/2.`,
      intent:"Volume with a fractional edge length.",
      steps:[`${a} × ${b} × 1/2 = ${ans} cubic units.`,`A half-unit height halves the volume of the unit-tall box.`] }; },
  med:()=>{ const a=ri(2,4),b=ri(2,4),c=ri(3,5); const ans=Math.round(a*b*(c/2)*100)/100;
    return { prompt:`A chest measures ${a} m by ${b} m by ${c}/2 m. What is its volume in cubic metres?`,
      options:opts(ans,[a*b*c, a*b+c/2, Math.round(a*b*c/2*100)/100===ans? ans+1:Math.round(a+b+c/2), a*b]),
      hint1:`Multiply all three dimensions; the height is ${c}/2.`,
      hint2:`First step: ${a} × ${b} = ${a*b}.`,
      intent:"Volume of a right prism with a fractional edge.",
      steps:[`${a} × ${b} × ${c}/2 = ${a*b} × ${c/2} = ${ans} m³.`] }; },
  hard:()=>{ const unit="1/3"; const a=ri(2,4),b=ri(2,4),c=ri(2,4); const cubes=a*b*c; const ans=Math.round(cubes*(1/27)*1000)/1000;
    return { prompt:`A box ${a}/3 m by ${b}/3 m by ${c}/3 m is filled with little cubes of edge 1/3 m. How MANY little cubes fit?`,
      options:opts(cubes,[a*b*c+3, a+b+c, Math.round(cubes/3), cubes*3]),
      hint1:"Along each edge, how many 1/3-m cubes fit? Then multiply the counts.",
      hint2:`First step: the ${a}/3 m edge holds ${a} little cubes.`,
      intent:"Count unit-fraction cubes filling a prism.",
      steps:[`Edges hold ${a}, ${b}, and ${c} little cubes.`,`Total: ${a} × ${b} × ${c} = ${cubes} cubes.`,
        `Each is (1/3)³ = 1/27 m³, and ${cubes} × 1/27 = ${ans} m³ confirms the volume.`] }; }
});

reg("6.G.A.3","earth",6,{
  easy:()=>{ const x1=ri(1,3),x2=x1+ri(3,5),y=ri(2,5);
    return { prompt:`A line segment runs from (${x1}, ${y}) to (${x2}, ${y}). How long is it?`,
      options:opts(x2-x1,[x2+x1, y, x2, Math.abs(x1-y)]),
      hint1:"Same y means a horizontal segment — subtract the x's.",
      hint2:`First step: ${x2} − ${x1}.`,
      intent:"Find a side length on the coordinate plane.",
      steps:[`Length = ${x2} − ${x1} = ${x2-x1}.`] }; },
  med:()=>{ const x1=ri(1,3),y1=ri(1,3),w=ri(3,6),h=ri(2,5); const ans=w*h;
    return { prompt:`A rectangle has corners (${x1},${y1}), (${x1+w},${y1}), (${x1+w},${y1+h}), (${x1},${y1+h}). What is its AREA?`,
      options:opts(ans,[2*(w+h), w+h, ans+w, w*h+h]),
      hint1:"Read the width and height off the coordinates, then multiply.",
      hint2:`First step: width = ${w}, height = ${h}.`,
      intent:"Compute area of a polygon drawn in the coordinate plane.",
      steps:[`Width ${w}, height ${h}.`,`Area: ${w} × ${h} = ${ans}.`,
        `2(w+h) = ${2*(w+h)} would be the perimeter.`] }; },
  hard:()=>{ const x1=ri(1,3),y1=ri(1,3),w=ri(4,6); const ans=w*w/2;
    return { prompt:`A triangle has vertices (${x1},${y1}), (${x1+w},${y1}), and (${x1},${y1+w}). What is its AREA?`,
      options:opts(ans,[w*w, w+w, w*w/2+w, 2*w]),
      hint1:"It's a right triangle — find the two legs from the coordinates.",
      hint2:`First step: both legs measure ${w}.`,
      intent:"Area of a right triangle placed on the coordinate plane.",
      steps:[`Legs: base ${w}, height ${w}.`,`Area: ${w} × ${w} ÷ 2 = ${ans}.`] }; }
});

reg("6.G.A.4","earth",6,{
  easy:()=>{ const s=ri(2,6); const ans=6*s*s;
    return { prompt:`A cube has edge ${s} cm. What is its total SURFACE area?`,
      options:opts(ans+" cm²",[(s*s*s)+" cm²",(s*s)+" cm²",(4*s*s)+" cm²",(6*s)+" cm²"]),
      hint1:"A cube has 6 identical square faces.",
      hint2:`First step: one face = ${s} × ${s} = ${s*s} cm².`,
      intent:"Surface area of a cube = 6 × face area.",
      steps:[`One face: ${s*s}.`,`Six faces: 6 × ${s*s} = ${ans} cm².`,
        `The trap ${s*s*s} is the VOLUME.`] }; },
  med:()=>{ const l=ri(3,6),w=ri(2,5),h=ri(2,4); const ans=2*(l*w+l*h+w*h);
    return { prompt:`A rectangular box is ${l} by ${w} by ${h}. What is its surface area?`,
      options:opts(ans,[l*w*h, l*w+l*h+w*h, 2*(l+w+h), l*w*2]),
      hint1:"Three pairs of matching faces: top/bottom, front/back, sides.",
      hint2:`First step: the three distinct faces are ${l*w}, ${l*h}, and ${w*h}.`,
      intent:"Surface area of a rectangular prism using a net.",
      steps:[`Faces: ${l*w}, ${l*h}, ${w*h}.`,`Double the sum: 2(${l*w} + ${l*h} + ${w*h}) = ${ans}.`,
        `Forgetting to double (one of each face) halves the answer.`] }; },
  hard:()=>{ const l=ri(2,4),w=ri(2,4),h=ri(2,4); const sa=2*(l*w+l*h+w*h); const v=l*w*h;
    return { prompt:`A ${l}×${w}×${h} box: which is larger in number, its surface area or its volume? (Give the surface area.)`,
      options:opts(sa,[v, sa+v, Math.abs(sa-v), l+w+h]),
      hint1:"Compute both, then compare. Surface area uses faces; volume uses the inside.",
      hint2:`First step: surface area = 2(lw + lh + wh); volume = lwh.`,
      intent:"Distinguish surface area from volume by computing both.",
      steps:[`Surface area: 2(${l*w}+${l*h}+${w*h}) = ${sa}.`,`Volume: ${l}×${w}×${h} = ${v}.`,
        `They measure different things (area vs. space) — comparing them shows why units matter.`] }; }
});

/* ============================================================
   GRADE 6 — SPIRIT (Statistics & Probability, SP)
   ============================================================ */
function meanOf(a){ return a.reduce((s,x)=>s+x,0)/a.length; }
function medianOf(a){ const s=[...a].sort((x,y)=>x-y); const n=s.length; return n%2? s[(n-1)/2] : (s[n/2-1]+s[n/2])/2; }

reg("6.SP.A.1","spirit",6,{
  easy:()=>{
    return { prompt:`Which of these is a STATISTICAL question (one that expects variability in the answers)?`,
      options:opts(`"How tall are the students in the class?"`,
        [`"How tall is Aang?"`,`"What is 7 × 8?"`,`"How many days are in June?"`,`"Is the sky blue right now?"`]),
      hint1:"A statistical question has many different answers, not one fixed answer.",
      hint2:"First step: ask whether the answers would VARY from person to person.",
      intent:"Identify statistical questions (those anticipating variability).",
      steps:["A class of students has many different heights — answers vary.",
        "'How tall is Aang?' has one answer, so it is not statistical."] }; },
  med:()=>{
    return { prompt:`Which question would you answer by COLLECTING DATA from many people?`,
      options:opts(`"What is the typical number of pets per family in the village?"`,
        [`"How many legs does a turtle-duck have?"`,`"What is 100 ÷ 4?"`,`"What color is Appa?"`,`"How many hours in a day?"`]),
      hint1:"Look for a question whose answer differs across a group.",
      hint2:"First step: 'typical number of pets' varies family to family.",
      intent:"Recognize when data collection is needed (variability).",
      steps:["Pets per family varies, so you'd survey many families.","The others have single fixed answers."] }; },
  hard:()=>{
    return { prompt:`Why is "How old are the members of the White Lotus?" a statistical question, but "How old is Iroh?" is not?`,
      options:opts(`The first expects a variety of ages; the second has one answer`,
        [`The first is harder to compute`,`Both are statistical`,`Neither is statistical`,`The second needs data collection`]),
      hint1:"The key is whether you EXPECT the answers to vary.",
      hint2:"First step: many members → many ages → variability.",
      intent:"Explain the defining feature of a statistical question.",
      steps:["Many members have differing ages — the data varies.","One person has a single age — no variability, so not statistical."] }; }
});

reg("6.SP.A.2","spirit",6,{
  easy:()=>{ const data=[ri(2,4),ri(5,7),ri(8,10)];
    return { prompt:`A data set's values cluster tightly around ${data[1]} with no far-out values. Which word describes its SPREAD?`,
      options:opts("small",["large","negative","skewed high","none"]),
      hint1:"Spread tells how far apart the values are. Tightly clustered means…?",
      hint2:"First step: 'cluster tightly' signals values close together.",
      intent:"Describe a distribution by its spread.",
      steps:["Tightly clustered values are close together → small spread.","A wide range of values would mean large spread."] }; },
  med:()=>{ const data=[3,3,4,5,5,5,6,12];
    return { prompt:`In the data 3, 3, 4, 5, 5, 5, 6, 12, the value 12 sits far from the rest. What is it called?`,
      options:opts("an outlier",["the mean","the mode","the median","the range"]),
      hint1:"A single value far from the others has a special name.",
      hint2:"First step: 12 is much larger than the cluster near 4–6.",
      intent:"Identify an outlier in a distribution.",
      steps:["Most values sit between 3 and 6; 12 is far away.","A value that stands apart like this is an outlier."] }; },
  hard:()=>{ const data=[2,2,3,3,3,4,4,9];
    const m=medianOf(data);
    return { prompt:`For 2, 2, 3, 3, 3, 4, 4, 9, which measure of CENTER is LESS affected by the value 9: the mean or the median? (Pick the more stable one.)`,
      options:opts("the median",["the mean","both equally","neither","the range"]),
      hint1:"One outlier drags one of these measures much more than the other.",
      hint2:"First step: the mean adds every value, so a big 9 pulls it up.",
      intent:"Compare resistance of mean vs. median to outliers.",
      steps:["The mean sums all values, so the 9 inflates it.","The median only depends on the middle position, so it barely moves.",
        "Thus the median is the more stable center here."] }; }
});

reg("6.SP.A.3","spirit",6,{
  easy:()=>{
    return { prompt:`Which of these is a measure of CENTER (not spread)?`,
      options:opts("mean",["range","interquartile range","spread","maximum minus minimum"]),
      hint1:"Center describes a typical value; spread describes how scattered the data is.",
      hint2:"First step: which one names a 'middle' or 'average' value?",
      intent:"Distinguish measures of center from measures of variability.",
      steps:["The mean is a center (average).","Range and IQR measure spread, not center."] }; },
  med:()=>{
    return { prompt:`Which pair correctly labels a center AND a spread?`,
      options:opts("median (center), range (spread)",
        ["range (center), mean (spread)","mode (spread), IQR (center)","mean (spread), median (center)","maximum (center), minimum (spread)"]),
      hint1:"Center = typical value; spread = how scattered.",
      hint2:"First step: median is a center; range is a spread.",
      intent:"Match measures to center vs. variability roles.",
      steps:["Median summarizes the middle (center).","Range = max − min summarizes spread.","Only the first pair labels both correctly."] }; },
  hard:()=>{ const data=[4,6,6,8,10]; const mean=meanOf(data);
    return { prompt:`For 4, 6, 6, 8, 10, the mean is ${mean}. The average distance of values from the mean (the MAD) measures what?`,
      options:opts("how spread out the data is",["the typical value","the largest value","the median","the most common value"]),
      hint1:"MAD = mean absolute deviation — 'deviation' is about distance from center.",
      hint2:"First step: it averages how far each value is from the mean.",
      intent:"Interpret MAD as a measure of variability.",
      steps:[`Mean is ${mean}.`,"MAD averages |value − mean| across the data.",
        "A larger MAD means the values are more spread out from the center."] }; }
});

reg("6.SP.B.4","spirit",6,{
  easy:()=>{
    return { prompt:`Which display is BEST for showing how often each whole-number score appears in a small data set?`,
      options:opts("a dot plot",["a circle of arrows","a single number","a paragraph","a treasure map"]),
      hint1:"You want to see frequency of each value at a glance.",
      hint2:"First step: a plot that stacks a dot per data point shows frequency.",
      intent:"Choose an appropriate data display.",
      steps:["A dot plot stacks one dot per value, showing frequency clearly.","It's ideal for small whole-number data sets."] }; },
  med:()=>{
    return { prompt:`A histogram groups data into intervals (bins). What does the HEIGHT of each bar show?`,
      options:opts("how many values fall in that interval",
        ["the largest value","the average","the interval width","the median"]),
      hint1:"Bars in a histogram count members of each group.",
      hint2:"First step: a taller bar means more data points in that bin.",
      intent:"Interpret a histogram's bar heights as frequencies.",
      steps:["Each bar covers an interval of values.","Its height is the count (frequency) of values in that interval."] }; },
  hard:()=>{ const mn=ri(2,4),q1=ri(5,6),med=ri(7,8),q3=ri(9,10),mx=ri(11,13);
    return { prompt:`A box plot has minimum ${mn}, Q1 ${q1}, median ${med}, Q3 ${q3}, maximum ${mx}. What is the INTERQUARTILE RANGE (IQR)?`,
      options:opts(q3-q1,[mx-mn, med, q3+q1, mx-med]),
      hint1:"IQR is the width of the box: Q3 minus Q1.",
      hint2:`First step: ${q3} − ${q1}.`,
      intent:"Read IQR from a box plot.",
      steps:[`IQR = Q3 − Q1 = ${q3} − ${q1} = ${q3-q1}.`,`Max − min (${mx-mn}) is the full RANGE, not the IQR.`] }; }
});

reg("6.SP.B.5","spirit",6,{
  easy:()=>{ const data=[ri(2,5),ri(6,8),ri(9,12),ri(3,7),ri(8,11)]; const total=data.reduce((s,x)=>s+x,0); const ans=total/data.length;
    return { prompt:`Five trials scored ${data.join(", ")}. What is the MEAN?`,
      options:opts(Math.round(ans*100)/100,[total, Math.round(ans)+1, Math.round(total/(data.length-1)*100)/100, medianOf(data)]),
      hint1:"Mean is the fair share: total divided by how many.",
      hint2:`First step: add them — ${data.join(" + ")} = ${total}.`,
      intent:"Mean = sum ÷ count.",
      steps:[`Total: ${total}.`,`Mean: ${total} ÷ ${data.length} = ${Math.round(ans*100)/100}.`,
        `The trap ${total} is the SUM, not the mean.`] }; },
  med:()=>{ const data=shuffleInPlace([ri(2,5),ri(6,8),ri(9,12),ri(3,7),ri(8,11)]); const med=medianOf(data);
    return { prompt:`Times (minutes): ${data.join(", ")}. What is the MEDIAN?`,
      options:opts(med,[data[2], Math.round(meanOf(data)*10)/10, Math.max(...data), Math.min(...data)]),
      hint1:"Sort the list first, then find the middle value.",
      hint2:`First step: order them: ${[...data].sort((a,b)=>a-b).join(", ")}.`,
      intent:"Median = middle value of the sorted list.",
      steps:[`Sorted: ${[...data].sort((a,b)=>a-b).join(", ")}.`,`The middle of 5 values is the 3rd: ${med}.`,
        `Taking the middle of the UNSORTED list is the classic mistake.`] }; },
  hard:()=>{ const oldN=ri(3,4), oldMean=ri(80,88), newMean=oldMean+ri(2,4); const total=oldN*oldMean; const needTotal=(oldN+1)*newMean; const ans=needTotal-total;
    return { prompt:`After ${oldN} trials, ${pick(WATERFOLK)}'s average is ${oldMean}. To raise the average over ${oldN+1} trials to ${newMean}, what must the next score be?`,
      options:opts(ans,[newMean, oldMean, ans-oldN, Math.round((oldMean+newMean)/2)]),
      hint1:"Averages hide totals — convert each average to a total first.",
      hint2:`First step: current total = ${oldN} × ${oldMean} = ${total}.`,
      intent:"Use totals to solve a 'what score is needed' mean problem.",
      steps:[`Current total: ${oldN} × ${oldMean} = ${total}.`,`Needed total: ${oldN+1} × ${newMean} = ${needTotal}.`,
        `Next score: ${needTotal} − ${total} = ${ans}.`] }; }
});

/* ============================================================
   CAPSTONES — AVATAR STATE (cross-domain, both grades)
   Registered separately; the driver fills each grade to 400 with these.
   ============================================================ */
const CAP5 = {
  easy:[
    ()=>{ const per=ri(4,6),baskets=ri(4,7),price=ri(2,3); const ans=per*baskets*price;
      return { prompt:`The cabbage merchant packs ${per} cabbages per basket and fills ${baskets} baskets. Each cabbage sells for ${price} copper. How many copper does he earn?`,
        options:opts(ans,[per*baskets, per*baskets+price, per+baskets+price, per*price]),
        hint1:"Two stages: count the cabbages, then turn them into coins.",
        hint2:`First step: ${per} × ${baskets} = ${per*baskets} cabbages.`,
        intent:"Chain two multiplications; finish at the question.",
        steps:[`Cabbages: ${per} × ${baskets} = ${per*baskets}.`,`Coins: ${per*baskets} × ${price} = ${ans}.`,
          `Stopping at ${per*baskets} answers 'how many cabbages', not coins.`] }; },
    ()=>{ const start="10:"+pick(["20","40","15"]); const mins=pick([75,90,95,80]);
      const sh=10, sm=Number(start.split(":")[1]); const total=sm+mins; const eh=10+Math.floor(total/60), em=total%60;
      return { prompt:`Training starts at ${start} and lasts ${mins} minutes. When does it end?`,
        options:opts(`${eh}:${String(em).padStart(2,"0")}`,
          [`${eh}:${String((em+10)%60).padStart(2,"0")}`,`${eh-1}:${String(em).padStart(2,"0")}`,`${eh}:${String((em+15)%60).padStart(2,"0")}`,`${eh+1}:${String(em).padStart(2,"0")}`]),
        hint1:"Break the minutes into a whole hour plus the rest.",
        hint2:`First step: ${mins} minutes = ${Math.floor(mins/60)} hour and ${mins%60} minutes.`,
        intent:"Elapsed-time addition with a :60 rollover.",
        steps:[`Add ${Math.floor(mins/60)} hour: ${start} → ${sh+Math.floor(mins/60)}:${String(sm).padStart(2,"0")}.`,
          `Add ${mins%60} more minutes, rolling past :60 if needed → ${eh}:${String(em).padStart(2,"0")}.`] }; }
  ],
  med:[
    ()=>{ const cost=ri(36,60), people=3; const share=Math.round(cost/people); const total=share*people;
      const realCost=share*people; const ans=2*share;
      return { prompt:`Three friends split a ${realCost}-copper gift equally. ${pick(EARTHFOLK)} pays her own share and one friend's share. How much does she pay?`,
        options:opts(ans,[share, realCost, Math.round(realCost/2), share*3]),
        hint1:"Find one share first, then count how many shares she covers.",
        hint2:`First step: one share = ${realCost} ÷ 3 = ${share}.`,
        intent:"Division for the share, then scale by the number of shares.",
        steps:[`One share: ${realCost} ÷ 3 = ${share}.`,`Two shares: 2 × ${share} = ${ans}.`,
          `Dividing by 2 (${Math.round(realCost/2)}) ignores that there are THREE shares.`] }; },
    ()=>{ const total=ri(4,7)*5, fracD=5, fracN=2; const part1=total*fracN/fracD; const rest=total-part1; const rate=ri(4,6); const ans=rest/rate;
      // ensure rest divisible
      return (function(){ let t=total; while((t-(t*2/5))% rate!==0 || (t*2/5)%1!==0){ t+=5; }
        const p1=t*2/5, r=t-p1, time=r/rate;
        return { prompt:`A ${t} km journey: ${pick(AIRFOLK)} flies the first 2/5, then walks the rest at ${rate} km/h. How many HOURS of walking is that?`,
          options:opts(time,[Math.round(t/rate), p1/rate, time+1, r]),
          hint1:"Three steps: flown distance, walked distance, then time.",
          hint2:`First step: flown = 2/5 of ${t} = ${p1} km.`,
          intent:"Chain fraction-of-a-quantity with a unit rate.",
          steps:[`Flown: 2/5 × ${t} = ${p1} km.`,`Walked: ${t} − ${p1} = ${r} km.`,`Time: ${r} ÷ ${rate} = ${time} h.`] }; })(); }
  ],
  hard:[
    ()=>{ const groups=ri(3,4), per=3, cost=2, buy=groups*per, paid=ri(9,12); const c=groups*cost; const ans=paid-c;
      return { prompt:`Mangoes sell at ${per} for ${cost} silver. ${pick(AIRFOLK)} buys ${buy} mangoes and pays with a ${paid}-silver coin. How much change is returned?`,
        options:opts(ans,[c, paid-cost, ans-1, buy]),
        hint1:"Cost of the mangoes first, then the change.",
        hint2:`First step: ${buy} mangoes = ${groups} groups of ${per}, each ${cost} silver.`,
        intent:"Rate to find cost, then subtract from payment.",
        steps:[`Groups: ${buy} ÷ ${per} = ${groups}.`,`Cost: ${groups} × ${cost} = ${c}.`,`Change: ${paid} − ${c} = ${ans}.`] }; },
    ()=>{ const rows=10; const ans=rows*(rows+1)/2;
      return { prompt:`Practice stones are stacked: 1 in the top row, 2 in the next, then 3, on down to ${rows}. How many stones in total?`,
        options:opts(ans,[rows*rows, ans+rows, rows*rows/2, (rows-1)*rows/2]),
        hint1:`Pair the rows from the ends: 1 with ${rows}, 2 with ${rows-1}…`,
        hint2:`First step: each end-pair sums to ${rows+1}; there are ${rows/2} pairs.`,
        intent:"Sum 1..n by pairing (Gauss's trick).",
        steps:[`Pairs: (1+${rows}), (2+${rows-1}), … each = ${rows+1}.`,`There are ${rows/2} pairs: ${rows/2} × ${rows+1} = ${ans}.`] }; }
  ]
};

const CAP6 = {
  easy:[
    ()=>{ const r1=2,r2=3, total=ri(4,8)*5; const part=total/(r1+r2); const juice=part*r1;
      return { prompt:`A healer mixes juice and water ${r1}:${r2}. She makes ${total} cups total. How many cups of JUICE?`,
        options:opts(juice,[part*r2, total/2, part, r1*r2]),
        hint1:"Total parts first, then size of one part, then count juice parts.",
        hint2:`First step: ${r1} + ${r2} = ${r1+r2} parts; one part = ${total} ÷ ${r1+r2} = ${part}.`,
        intent:"Ratio split of a total.",
        steps:[`Parts: ${r1+r2}. One part: ${part}.`,`Juice: ${r1} × ${part} = ${juice} cups.`,
          `${part*r2} is the WATER — the classic swap.`] }; },
    ()=>{ const pct=pick([10,20,25]), whole=ri(4,8)*10; const ans=whole-whole*pct/100;
      return { prompt:`A ${whole}-silver glider is marked down ${pct}%. What is the sale price?`,
        options:opts(ans,[whole*pct/100, whole+whole*pct/100, whole-pct, ans-1]),
        hint1:"Find the discount, then subtract it from the price.",
        hint2:`First step: ${pct}% of ${whole} = ${whole*pct/100}.`,
        intent:"Percent discount applied to a price.",
        steps:[`Discount: ${whole*pct/100} silver.`,`Sale: ${whole} − ${whole*pct/100} = ${ans}.`] }; }
  ],
  med:[
    ()=>{ const oldN=4, oldMean=ri(82,86), newMean=oldMean+ri(1,3); const total=oldN*oldMean, need=(oldN+1)*newMean, ans=need-total;
      return { prompt:`After ${oldN} trials ${pick(WATERFOLK)} averages ${oldMean}. What score on the 5th trial makes the 5-trial average ${newMean}?`,
        options:opts(ans,[newMean, oldMean, Math.round((oldMean+newMean)/2), ans-oldN]),
        hint1:"Turn both averages into totals; totals can be added and subtracted.",
        hint2:`First step: current total = ${oldN} × ${oldMean} = ${total}.`,
        intent:"Mean-to-total reasoning for a needed score.",
        steps:[`Current total: ${total}.`,`Needed total: ${need}.`,`5th score: ${need} − ${total} = ${ans}.`] }; },
    ()=>{ const start=ri(5,9)*10; const dropPct=10; const afterDrop=start-start*dropPct/100; const ans=Math.round((afterDrop+afterDrop*dropPct/100)*100)/100;
      return { prompt:`A glider costs ${start} silver. The price DROPS 10%, then later RISES 10%. What is the final price?`,
        options:opts(ans,[start, start- start*dropPct/100, start+ start*dropPct/100, afterDrop]),
        hint1:"The two 10%s are taken of DIFFERENT amounts — don't assume they cancel.",
        hint2:`First step: drop 10% of ${start} = ${start*dropPct/100}, giving ${afterDrop}.`,
        intent:"Successive percents act on changing values.",
        steps:[`Drop: ${start} − ${start*dropPct/100} = ${afterDrop}.`,`Rise: ${afterDrop} + ${Math.round(afterDrop*dropPct/100*100)/100} = ${ans}.`,
          `It does NOT return to ${start} — the rise is of a smaller number.`] }; }
  ],
  hard:[
    ()=>{ const serves=8, mult=ri(2,3); const newServes=serves*mult; const riceN=3, riceD=4; const num=riceN*mult;
      return { prompt:`A recipe serves ${serves} and needs 3/4 cup of rice. How much rice serves ${newServes} people?`,
        options:opts(mixedStr(num,riceD),[`3/4 cup`, mixedStr(num+1,riceD), `${mult} cups`, mixedStr(num,riceD*2)]),
        hint1:"How many times bigger is the feast? Scale the rice by that.",
        hint2:`First step: ${newServes} ÷ ${serves} = ${mult}.`,
        intent:"Scale a fractional quantity by a whole number.",
        steps:[`Scale: ${mult}.`,`Rice: ${mult} × 3/4 = ${num}/4 = ${mixedStr(num,riceD)} cups.`] }; },
    ()=>{ const speed1=ri(4,6), t1=ri(2,3), speed2=ri(2,3), d2=ri(8,12);
      const d1=speed1*t1; const t2=d2/speed2; // ensure integer
      return (function(){ let s2=speed2, dd2=d2; while(dd2%s2!==0){ dd2++; }
        const tt2=dd2/s2; const dd1=speed1*t1; const totalD=dd1+dd2; const totalT=t1+tt2;
        return { prompt:`${pick(AIRFOLK)} flies ${dd1} km in ${t1} h, then walks ${dd2} km at ${s2} km/h. What is the TOTAL travel time in hours?`,
          options:opts(totalT,[t1+dd2, totalD, tt2, t1+s2]),
          hint1:"Find the walking time, then add the flying time.",
          hint2:`First step: walking time = ${dd2} ÷ ${s2} = ${tt2} h.`,
          intent:"Combine a known time with a computed unit-rate time.",
          steps:[`Walk time: ${dd2} ÷ ${s2} = ${tt2} h.`,`Total: ${t1} + ${tt2} = ${totalT} h.`] }; })(); }
  ]
};

function buildCapstone(grade, tier, gi){
  const pack = grade===5?CAP5:CAP6;
  const arr = tier===1?pack.easy : tier===2?pack.med : pack.hard;
  const q = arr[gi % arr.length]();
  const item = {
    id: mkId("avatarstate"),
    grade, el:"avatarstate", ccss:"capstone", tier,
    style: styleFor(tier),
    prompt:q.prompt, options:q.options, hint1:q.hint1, hint2:q.hint2, intent:q.intent, steps:q.steps
  };
  if(q.module) item.module=q.module;
  return item;
}

/* ============================================================
   DRIVER
   ============================================================ */
const T1_STYLES=["standards","visual","exploratory"];
const T2_STYLES=["standards","visual","insight","deepdive"];
const T3_STYLES=["insight","deepdive","exploratory"];
let s1=0,s2=0,s3=0;
function styleFor(tier){
  if(tier===1) return T1_STYLES[(s1++)%T1_STYLES.length];
  if(tier===2) return T2_STYLES[(s2++)%T2_STYLES.length];
  return T3_STYLES[(s3++)%T3_STYLES.length];
}

const PREFIX={ water:"W", earth:"E", fire:"F", air:"A", spirit:"S", avatarstate:"X" };
const counters={ W:12, E:10, F:11, A:11, S:9, X:7 }; // continue past existing max ids (W001-12,E001-10,F001-11,A001-11,S001-09,X001-07)

function mkId(el){ const p=PREFIX[el]; counters[p]=(counters[p]||0)+1; return p+String(counters[p]).padStart(3,"0"); }

function buildOne(entry, tier, gi){
  const g = tier===1?entry.gens.easy : tier===2?entry.gens.med : entry.gens.hard;
  const q = g(gi);
  const o = q.options;
  const item = {
    id: mkId(entry.el),
    grade: entry.grade,
    el: entry.el,
    ccss: entry.ccss,
    tier,
    style: styleFor(tier),
    prompt: q.prompt,
    options: o,
    hint1: q.hint1,
    hint2: q.hint2,
    intent: q.intent,
    steps: q.steps
  };
  if(q.module) item.module = q.module;
  return item;
}

/* per-standard tier plans (T1/T2/T3 share ~ 30/40/30) */
const G5_PLAN = [1,1,1,1, 2,2,2,2,2,2, 3,3,3,3];   // 14/standard  (26 std -> 364)
const G6_PLAN = [1,1,1,1, 2,2,2,2,   3,3,3,3];      // 12/standard  (29 std -> 348)

// existing-bank tier counts (the 60 already in math.bank.js), so the global mix is honest
const EXISTING_TIERS = { 1:18, 2:25, 3:17 };
const GRADE_TARGET = { 5:400, 6:400 };

function generate(){
  const out=[];
  for(const ccss of Object.keys(REG)){
    const entry=REG[ccss];
    const plan = entry.grade===5 ? G5_PLAN : G6_PLAN;
    let ie=0,im=0,ih=0;
    for(const t of plan){
      if(t===1) out.push(buildOne(entry,1,ie++));
      else if(t===2) out.push(buildOne(entry,2,im++));
      else out.push(buildOne(entry,3,ih++));
    }
  }
  // ---- capstone fill: bring each grade to its 400 target, balancing the global tier mix ----
  // existing avatarstate already in bank: g5=3, g6=4  (X001-X007)
  const EXISTING_GRADE = { 5:29, 6:31 };
  // running tier totals = existing + freshly generated standards
  const tierTot = { 1:EXISTING_TIERS[1], 2:EXISTING_TIERS[2], 3:EXISTING_TIERS[3] };
  out.forEach(q=>{ tierTot[q.tier]++; });
  const grandTarget = GRADE_TARGET[5]+GRADE_TARGET[6]; // 800
  const tierGoal = { 1:Math.round(grandTarget*0.30), 2:Math.round(grandTarget*0.40), 3:Math.round(grandTarget*0.30) };

  for(const grade of [5,6]){
    const have = EXISTING_GRADE[grade] + out.filter(q=>q.grade===grade).length;
    const need = GRADE_TARGET[grade] - have;
    let gi=0;
    for(let k=0;k<need;k++){
      // choose the tier with the largest remaining deficit toward its goal
      let bestT=2, bestDef=-1e9;
      for(const t of [1,2,3]){ const def=tierGoal[t]-tierTot[t]; if(def>bestDef){ bestDef=def; bestT=t; } }
      const cap = buildCapstone(grade, bestT, gi++);
      out.push(cap); tierTot[bestT]++;
    }
  }
  return out;
}

module.exports = { generate, REG, reg, ri, pick, opts, fracStr, mixedStr, gcd, shuffleInPlace,
  WATERFOLK, EARTHFOLK, FIREFOLK, AIRFOLK, ANYONE, PLACES, CRITTERS, ITEMS, mkId, buildOne, REG_KEYS:()=>Object.keys(REG) };
