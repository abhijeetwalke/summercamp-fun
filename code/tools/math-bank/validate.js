/* validate.js — full validation harness for the Summer Camp math bank.
   Usage: node validate.js <path-to-math.bank.js>  */
"use strict";
const fs = require("fs");
const file = process.argv[2];
global.window = {};
require(file);
const Q = window.MATH_QUESTIONS;

const ELS = ["water","earth","fire","air","spirit","avatarstate"];
const STYLES = ["visual","insight","deepdive","exploratory","standards"];
const errors = [];
const warn = [];
const E = (id,msg) => errors.push(`${id}: ${msg}`);

/* expected Common Core standards */
const G5_STD = [
 "5.OA.A.1","5.OA.A.2","5.OA.B.3",
 "5.NBT.A.1","5.NBT.A.2","5.NBT.A.3","5.NBT.A.4","5.NBT.B.5","5.NBT.B.6","5.NBT.B.7",
 "5.NF.A.1","5.NF.A.2","5.NF.B.3","5.NF.B.4","5.NF.B.5","5.NF.B.6","5.NF.B.7",
 "5.MD.A.1","5.MD.B.2","5.MD.C.3","5.MD.C.4","5.MD.C.5",
 "5.G.A.1","5.G.A.2","5.G.B.3","5.G.B.4"
];
const G6_STD = [
 "6.RP.A.1","6.RP.A.2","6.RP.A.3",
 "6.NS.A.1","6.NS.B.2","6.NS.B.3","6.NS.B.4","6.NS.C.5","6.NS.C.6","6.NS.C.7","6.NS.C.8",
 "6.EE.A.1","6.EE.A.2","6.EE.A.3","6.EE.A.4","6.EE.B.5","6.EE.B.6","6.EE.B.7","6.EE.B.8","6.EE.C.9",
 "6.G.A.1","6.G.A.2","6.G.A.3","6.G.A.4",
 "6.SP.A.1","6.SP.A.2","6.SP.A.3","6.SP.B.4","6.SP.B.5"
];

/* the original starter set (first 60): W001-12, E001-10, F001-11, A001-11, S001-09, X001-07 */
const EXIST_MAX = { W:12, E:10, F:11, A:11, S:9, X:7 };
function isExisting(id){ const m=String(id).match(/^([A-Z])(\d+)$/); if(!m) return false; return EXIST_MAX[m[1]]!==undefined && Number(m[2])<=EXIST_MAX[m[1]]; }

/* element -> domain family expected (by grade) */
function elDomainOK(q){
  const c = q.ccss;
  if (q.el==="avatarstate") return c==="capstone";
  if (q.el==="spirit") return q.grade===6 && /^6\.SP/.test(c);
  if (q.grade===5){
    if (q.el==="water") return /^5\.NF/.test(c);
    if (q.el==="earth") return /^5\.(MD|G)/.test(c);
    if (q.el==="fire")  return /^5\.OA/.test(c);
    if (q.el==="air")   return /^5\.NBT/.test(c);
  } else {
    if (q.el==="water") return /^6\.NS/.test(c);
    if (q.el==="earth") return /^6\.G/.test(c);
    if (q.el==="fire")  return /^6\.EE/.test(c);
    if (q.el==="air")   return /^6\.RP/.test(c);
  }
  return false;
}

/* ---------- tiny safe arithmetic evaluator (+ - * / and parens) ---------- */
function evalArith(str){
  const s = str.replace(/×/g,"*").replace(/÷/g,"/").replace(/[−–]/g,"-");
  if(!/^[-0-9.+*/() ]+$/.test(s)) return null;     // only arithmetic chars
  if(!/[+\-*/]/.test(s)) return null;              // must contain an operator
  let i=0;
  function peek(){ while(s[i]===" ")i++; return s[i]; }
  function num(){ peek(); let st=i; if(s[i]==="-")i++; while(/[0-9.]/.test(s[i]))i++; return parseFloat(s.slice(st,i)); }
  function factor(){ peek(); if(s[i]==="("){ i++; const v=expr(); peek(); if(s[i]===")")i++; return v; } if(s[i]==="-"){ i++; return -factor(); } return num(); }
  function term(){ let v=factor(); while(true){ const c=peek(); if(c==="*"){i++; v*=factor();} else if(c==="/"){i++; v/=factor();} else break; } return v; }
  function expr(){ let v=term(); while(true){ const c=peek(); if(c==="+"){i++; v+=term();} else if(c==="-"){i++; v-=term();} else break; } return v; }
  try{ const v=expr(); peek(); if(i<s.length) return null; return v; } catch(e){ return null; }
}
/* numeric value of an option string ("1/10","3/4","2 1/2","18 km","12") */
function optVal(s){
  s=String(s).trim(); let m;
  if(m=s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/)) return Number(m[1])+ (Number(m[1])<0?-1:1)*Number(m[2])/Number(m[3]);
  if(m=s.match(/^(-?\d+)\/(\d+)$/)) return Number(m[1])/Number(m[2]);
  if(m=s.match(/^(-?\d+(?:\.\d+)?)/)) return Number(m[1]);
  return null;
}

let numVerified=0, numSkipped=0, numMismatch=0;
function tryArithmeticCheck(q){
  const p=q.prompt;
  // skip mixed-number prompts (ambiguous "2 1/2")
  if(/\d+\s+\d+\/\d+/.test(p)) { numSkipped++; return; }
  let expr=null;
  let m = p.match(/What is\s+(.+?)\?/);
  if(m) expr=m[1];
  // bare "Evaluate X." forms
  if(!expr){ m=p.match(/^Evaluate\s+(.+?)[.?]/); if(m && !/[a-wyzA-WYZ]/.test(m[1])) expr=m[1]; }
  if(!expr){ numSkipped++; return; }
  // reject if it contains letters (word problem / has x²)
  if(/[a-zA-Z²]/.test(expr)){ numSkipped++; return; }
  // skip fraction-arithmetic: a flat evaluator can't reliably read "÷ 1/2" as ÷(1/2)
  if(/\d\s*\/\s*\d/.test(expr)){ numSkipped++; return; }
  const val=evalArith(expr);
  if(val===null){ numSkipped++; return; }
  const ov=optVal(q.options[0]);
  if(ov===null){ numSkipped++; return; }
  numVerified++;
  if(Math.abs(val-ov) > 1e-6){ numMismatch++; E(q.id, `arithmetic mismatch: prompt "${expr}" = ${val} but options[0]=${q.options[0]} (${ov})`); }
}

/* solve-for-x linear checks: "ax + b = c", "ax = c", "x + a = c" */
function trySolveCheck(q){
  const p=q.prompt.replace(/×/g,"*").replace(/[−–]/g,"-");
  let m;
  if(m=p.match(/Solve for x:\s*(\d+)x\s*\+\s*(\d+)\s*=\s*(\d+)/)){ const a=+m[1],b=+m[2],c=+m[3]; const x=(c-b)/a; if(Math.abs(x-optVal(q.options[0]))>1e-6) E(q.id,`solve mismatch ${a}x+${b}=${c} -> ${x} vs ${q.options[0]}`); else numVerified++; return; }
  if(m=p.match(/Solve for x:\s*(\d+)x\s*=\s*(\d+)/)){ const a=+m[1],c=+m[2]; const x=c/a; if(Math.abs(x-optVal(q.options[0]))>1e-6) E(q.id,`solve mismatch ${a}x=${c} -> ${x} vs ${q.options[0]}`); else numVerified++; return; }
  if(m=p.match(/Solve for x:\s*x\s*\+\s*(\d+)\s*=\s*(\d+)/)){ const a=+m[1],c=+m[2]; const x=c-a; if(Math.abs(x-optVal(q.options[0]))>1e-6) E(q.id,`solve mismatch x+${a}=${c} -> ${x} vs ${q.options[0]}`); else numVerified++; return; }
}

/* ---------- per-question schema validation ---------- */
const ids=new Set();
for(const q of Q){
  if(!q || !q.id){ E("?", "missing id / null entry"); continue; }
  if(ids.has(q.id)) E(q.id,"duplicate id"); ids.add(q.id);
  if(![5,6].includes(q.grade)) E(q.id,`bad grade ${q.grade}`);
  if(!ELS.includes(q.el)) E(q.id,`bad el ${q.el}`);
  if(![1,2,3].includes(q.tier)) E(q.id,`bad tier ${q.tier}`);
  if(!STYLES.includes(q.style)) E(q.id,`bad style ${q.style}`);
  if(!q.ccss || !( q.ccss==="capstone" || /^[56]\.[A-Z]{1,3}(\.[A-Z]\.\d+)?$/.test(q.ccss))) E(q.id,`bad ccss ${q.ccss}`);
  if(!Array.isArray(q.options) || q.options.length!==5) E(q.id,`options length ${q.options&&q.options.length}`);
  else {
    const set=new Set(q.options.map(String));
    if(set.size!==5) E(q.id,`options not distinct: ${JSON.stringify(q.options)}`);
    if(q.options[0]===undefined||String(q.options[0]).trim()==="") E(q.id,"empty correct option");
  }
  if(!q.prompt || !q.prompt.trim()) E(q.id,"empty prompt");
  if(!q.hint1 || !q.hint1.trim()) E(q.id,"empty hint1");
  if(!q.hint2 || !q.hint2.trim()) E(q.id,"empty hint2");
  if(!q.intent || !q.intent.trim()) E(q.id,"empty intent");
  if(!Array.isArray(q.steps) || q.steps.length===0) E(q.id,"empty steps");
  if(q.el==="spirit" && q.grade!==6) E(q.id,"spirit must be grade 6");
  // element/domain rule applies to NEW questions; the original 60 (starter set) have a couple of
  // intentional theme choices (e.g. W010 decimal-add themed water) and are exempt -> warning only.
  if(!elDomainOK(q)){ if(isExisting(q.id)) warn.push(`${q.id}: (existing) el/domain ${q.el}/${q.ccss}`); else E(q.id,`element/domain mismatch: el=${q.el} grade=${q.grade} ccss=${q.ccss}`); }
  // literal interpolation leak
  [q.prompt,q.hint1,q.hint2,q.intent,...(q.steps||[]),...(q.options||[])].forEach(s=>{ if(typeof s==="string" && s.includes("${")) E(q.id,`literal \${} in "${s}"`); });
  // grade-label leak
  if(/grade\s*[56]\b|book (five|six)|fifth grade|sixth grade|[56]th grade/i.test([q.prompt,...(q.steps||[])].join(" "))) E(q.id,"grade label leak");
  tryArithmeticCheck(q);
  trySolveCheck(q);
}

/* ---------- distributions ---------- */
const by=(f)=>{const m={};Q.forEach(x=>{const k=f(x);m[k]=(m[k]||0)+1});return m};
const tier=by(x=>x.tier), grade=by(x=>x.grade), el=by(x=>x.el), style=by(x=>x.style), ccss=by(x=>x.ccss);

console.log("================ VALIDATION REPORT ================");
console.log("TOTAL:", Q.length);
console.log("By grade:", grade);
console.log("By tier:", tier, "=>", [1,2,3].map(t=>((tier[t]/Q.length*100).toFixed(1)+"%")).join(" / "));
console.log("By element:", el);
console.log("By style:", style, "=>", STYLES.map(s=>(s+":"+(style[s]/Q.length*100).toFixed(1)+"%")).join("  "));

/* standards coverage */
const missing5 = G5_STD.filter(s=>!ccss[s]);
const missing6 = G6_STD.filter(s=>!ccss[s]);
console.log("\nG5 standards present:", G5_STD.length-missing5.length, "/", G5_STD.length, missing5.length?("MISSING: "+missing5.join(",")):"(all present)");
console.log("G6 standards present:", G6_STD.length-missing6.length, "/", G6_STD.length, missing6.length?("MISSING: "+missing6.join(",")):"(all present)");
const thin = Object.keys(ccss).filter(c=>c!=="capstone" && ccss[c]<8).map(c=>c+":"+ccss[c]);
console.log("Standards with <8 questions:", thin.length?thin.join(", "):"(none)");
console.log("\nPer-standard counts:");
const allStd=[...G5_STD,...G6_STD,"capstone"];
console.log(allStd.map(s=>`  ${s}: ${ccss[s]||0}`).join("\n"));

/* tolerances */
const t1=tier[1]/Q.length, t2=tier[2]/Q.length, t3=tier[3]/Q.length;
const tierOK = Math.abs(t1-0.30)<=0.05 && Math.abs(t2-0.40)<=0.05 && Math.abs(t3-0.30)<=0.05;
const styleOK = STYLES.every(s=>style[s]/Q.length>=0.10);

console.log("\n---------------- arithmetic recomputation ----------------");
console.log("independently verified:", numVerified, "| skipped (non-arithmetic/word):", numSkipped, "| mismatches:", numMismatch);

console.log("\n---------------- gates ----------------");
console.log("total == 800        :", Q.length===800 ? "PASS" : "FAIL");
console.log("each grade == 400   :", (grade[5]===400&&grade[6]===400) ? "PASS" : "FAIL");
console.log("all standards present:", (missing5.length===0&&missing6.length===0) ? "PASS":"FAIL");
console.log("tier mix ~30/40/30  :", tierOK ? "PASS":"FAIL");
console.log("every style >=10%   :", styleOK ? "PASS":"FAIL");
console.log("arithmetic checks   :", numMismatch===0 ? "PASS":"FAIL");
console.log("schema errors       :", errors.length===0 ? "PASS" : `FAIL (${errors.length})`);
if(errors.length){ console.log("\nFIRST 30 ERRORS:"); errors.slice(0,30).forEach(e=>console.log("  -",e)); }
process.exit(errors.length || numMismatch ? 1 : 0);
