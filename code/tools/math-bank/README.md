# Math question-bank generator (Content Track)

This is the parameterized-template pipeline that produced the 740 generated
questions appended to `code/data/math.bank.js` (growing it to 800 total).
It is also the foundation for the vision's **replenishment pipeline** (variants
+ new drafts), since every question is computed from a template, not hand-typed.

## Files
- `gen.js` — one template factory per Common Core standard (G5: OA/NBT/NF/MD/G,
  G6: RP/NS/EE/G/SP) with easy/med/hard variants, computed answers, and
  mistake-based distractors. Cross-domain capstones (`avatarstate`) fill each
  grade to 400 while keeping the global tier mix at ~30/40/30. Deterministic
  (seeded RNG) → reproducible output.
- `emit.js` — serializes the generated questions and appends them to the
  existing bank (the original starter set is preserved verbatim).
- `validate.js` — full validation harness: schema, distinct options,
  element→domain consistency, spirit-only-G6, standards coverage, tier/style
  distribution, and independent arithmetic recomputation of numeric items.

## Regenerate / extend
```bash
cd code/tools/math-bank
node emit.js ../../data/math.bank.js /tmp/math.bank.new.js   # build a fresh full bank
node validate.js /tmp/math.bank.new.js                       # must print all gates PASS
cp /tmp/math.bank.new.js ../../data/math.bank.js             # publish
```

## Schema (per question)
`{ id, grade(5|6, data-only), el, ccss, tier(1-3), style, prompt, options[5]
  (index 0 = correct, engine shuffles), hint1, hint2, intent, steps[], module? }`
