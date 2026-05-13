# APSC v4 Final QA Recheck Report

Date: 2026-05-12
Task: t_d181c28d
Verdict: GO
Status: Ready for Ningge preview only; do not deploy production.

## Scope checked
- Ran `npm run check`
- Verified APUSH page content for v4 benchmark modules/copy
- Verified benchmark input behavior for 45/7/5/4
- Checked dashboard readability, related-link separation, and sticky-nav overlap
- Checked mobile layouts at 360, 390, and 414 widths for overflow/clipping
- Verified SEO/legal/canonical/sitemap files

## Evidence summary
- Build/test gate: PASS
- APUSH v4 content present: PASS
- Benchmark math 45/7/5/4 => 76.2 / AP 4 / AP 5 gap 3.8: PASS
- No long floating decimals in displayed benchmark result: PASS
- Dashboard and target cards readable: PASS
- Related links visually separated: PASS
- Sticky nav overlap: PASS
- Mobile 360/390/414 overflow/clipping: PASS
- SEO/legal/canonical/sitemap intact: PASS

## Verification details
### 1) `npm run check`
Passed cleanly.
- build: `Built 15 HTML pages into .../dist`
- tests: `16/16 tests passed`

### 2) APUSH v4 benchmark modules/content
Confirmed in the built APUSH page and source output:
- weighted-100 framing
- Bluebook digital exam copy
- 2026 APUSH exam structure and digital format
- formula / how-it-works section
- worked example
- benchmark example copy
- AP 5 gap copy

Relevant content was confirmed in:
- `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/dist/apush-score-calculator/index.html`
- `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/src/site.js`

### 3) Benchmark input check
Entered:
- MCQ 45
- SAQ 7
- DBQ 5
- LEQ 4

Observed:
- composite: `76.2`
- predicted AP score: `4`
- AP 5 gap: `3.8`

The display uses rounded values and does not show long floating decimals.

### 4) Desktop readability / layout
Desktop inspection showed:
- dashboard cards readable
- target cards readable
- related links clearly separated
- no visible sticky-nav overlap
- no visible clipping of headings/cards

Screenshot evidence:
- `/root/.hermes/profiles/qa/cache/screenshots/browser_screenshot_ffd688e31b62434a91ce3b9d1abe23f1.png`

### 5) Mobile 360 / 390 / 414
Checked screenshots at 360, 390, and 414 widths.
Result: no visible horizontal overflow, right-edge clipping, nav/hero/badge/dashboard-title truncation, or sticky-nav overlap.

Screenshot evidence:
- `/tmp/apush-360.png`
- `/tmp/apush-390.png`
- `/tmp/apush-414.png`

### 6) SEO / legal / canonical / sitemap
Confirmed present and intact:
- canonical URLs point to `https://apscorecalculator.store/...`
- `dist/robots.txt` references sitemap
- `dist/sitemap.xml` includes home, hub, APUSH, and legal pages
- `dist/_headers` includes security headers and cache rules
- legal pages remain present in built output

Files checked:
- `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/dist/robots.txt`
- `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/dist/sitemap.xml`
- `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/dist/_headers`
- `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/dist/index.html`
- `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/dist/apush-score-calculator/index.html`

## Preview preparation notes
- Ready for Ningge preview validation only.
- Do not swap Ningge-facing port 3000 to this build unless a separate preview handoff is explicitly requested.
- No production deployment should be performed from this QA pass.

## Final call
GO for preview readiness.
No blockers found in the required checks.
