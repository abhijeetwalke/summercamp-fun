/* emit.js — generate 740 questions and append them into a full math.bank.js
   Preserves the existing 60 entries byte-for-byte; appends before the closing ];  */
"use strict";
const fs = require("fs");
const path = require("path");
const g = require("./gen.js");

const BANK = process.argv[2]; // path to existing math.bank.js
const OUT  = process.argv[3]; // path to write the new full bank

const src = fs.readFileSync(BANK, "utf8");
const idx = src.lastIndexOf("];");
if (idx < 0) { console.error("Could not find closing ]; in bank"); process.exit(1); }
const head = src.slice(0, idx).replace(/\s*$/, "").replace(/,\s*$/, "");  // up to final ]; , strip any trailing comma

const S = (v) => JSON.stringify(v);  // safe JS string/number/array literal (valid JS)

function emitModule(m){
  const parts = Object.keys(m).map(k => `${k}:${typeof m[k]==="string"?S(m[k]):m[k]}`);
  return `{ ${parts.join(", ")} }`;
}
function emitQ(q){
  let s = `{ id:${S(q.id)}, grade:${q.grade}, el:${S(q.el)}, ccss:${S(q.ccss)}, tier:${q.tier}, style:${S(q.style)},\n`;
  s += `  prompt:${S(q.prompt)},\n`;
  s += `  options:[${q.options.map(S).join(",")}],\n`;
  s += `  hint1:${S(q.hint1)},\n`;
  s += `  hint2:${S(q.hint2)},\n`;
  s += `  intent:${S(q.intent)},\n`;
  s += `  steps:[${q.steps.map(S).join(", ")}]`;
  if (q.module) s += `,\n  module:${emitModule(q.module)}`;
  s += ` }`;
  return s;
}

const qs = g.generate();
const banner = `\n\n/* ============================================================\n   BOOK FIVE + BOOK SIX — full generated bank (Content Track)\n   ${qs.length} questions appended ${new Date().toISOString().slice(0,10)} to reach 800 total.\n   Generated from a parameterized template engine (one factory per\n   Common Core standard, computed answers + mistake-based distractors).\n   Schema identical to the starter set above.\n   ============================================================ */\n`;

const body = qs.map(emitQ).join(",\n\n");
const full = head + ",\n" + banner + "\n" + body + "\n];\n";
fs.writeFileSync(OUT, full);
console.log("Wrote", OUT, "with", qs.length, "new questions.");
