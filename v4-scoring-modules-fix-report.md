# v4 Scoring & Modules Fix Report

## Summary
- Restored APUSH v4 weighted-100 scoring and re-wired the APUSH calculator page so the v4 benchmark modules render in the final build.
- Fixed a follow-up consistency issue in the v4 dynamic APUSH dashboard: section contribution labels and values now use weighted-100 math instead of raw points multiplied by the percent weight.
- Added regression coverage for the 45/7/5/4 benchmark case, rounded AP 5 gap, v4 module copy, and the dynamic dashboard contribution formula.
- No deployment was performed, and Ningge-facing port 3000 was not replaced.

## Changed files
- `src/scoreEngine.js`
- `src/site.js`
- `scripts/build.js`
- `test/scoreEngine.test.js`
- `test/site.test.js`
- `dist/` regenerated via `npm run check`

## What changed
- APUSH now uses a weighted-100 model:
  - MCQ 40%
  - SAQ 20%
  - DBQ 25%
  - LEQ 15%
- APUSH scoring now returns:
  - benchmark input `45/7/5/4`
  - composite `76.2`
  - predicted score `4`
  - AP 5 gap `3.8`
- Reintroduced the APUSH v4 content modules in the generated page:
  - weighted-100 framing
  - Bluebook digital exam copy
  - 2026 APUSH exam format
  - worked example
  - formula/how-it-works section
  - benchmark example copy
  - AP 5 gap copy
- Rewired the APUSH page to include the dynamic v4 dashboard panel in the final rendered page.
- Corrected dynamic v4 dashboard section contribution math so the client-side panel displays weighted contributions, e.g. `(raw / max) × section weight`, not `raw × section weight`.

## Verification
- `npm run check` ✅
  - `npm run build` ✅ — built 15 HTML pages into `dist/`
  - `npm test` ✅ — 16/16 tests passed
- Targeted runtime check with `calculateScore('apush', { mcq: 45, saq: 7, dbq: 5, leq: 4 })` ✅
  - returned `76.2`, score `4`, gap `3.8`
- Static content scan confirmed the built APUSH page includes required v4 modules/copy ✅
  - weighted-100 framing
  - Bluebook
  - 2026 APUSH exam structure and digital format
  - Worked Example
  - How This APUSH Score Calculator Works
  - What Score Do You Need? Benchmarks
  - `76.2 → Predicted Score: 4`
  - `about 3.8 more composite points`
- Static JS guard confirmed `dist/assets/app.js` includes the weighted contribution formula and no longer contains the old `weighted=raw*section.weight` pattern ✅

## Deployment / preview status
- No production deployment was triggered.
- No Ningge-facing port-3000 replacement or preview swap was performed.
- The task is awaiting QA review; no production deployment was triggered.
