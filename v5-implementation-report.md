# v5 Implementation Report

## Inputs
- Domain: apscorecalculator.store
- Project: AP Score Calculator 2026 MVP static site
- Workspace: /root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536
- Product / UX handoff: v5-product-ux-handoff.md
- APUSH trim plan: v5-page-trim-plan.md
- Subject study plan copy: v5-subject-study-plan-copy.md

## Changes
- Extended the reusable score engine with v5 study-plan primitives:
  - buildStudyPlan(slug, inputs)
  - sectionDiagnostics(subject, inputs)
  - section-specific advice, target gap copy, gain options, and 2/4/8-week timelines
- Expanded the dynamic Study Plan from APUSH-only to all 9 subject calculator pages.
- Preserved calculator-first flow on APUSH while replacing duplicated v4 article modules with a compact v5 workspace.
- Added reusable page markup for:
  - data-study-plan
  - data-study-status
  - data-study-diagnostics
  - data-study-gains
  - data-study-timelines
  - per-section diagnostic rows
- Updated the browser app bundle generation in scripts/build.js so dynamic calculator updates also refresh the Study Plan.
- Added Study Plan CSS to the generated stylesheet.
- Updated regression tests to cover v5 while preserving v3/v4 SEO, dashboard, hub, legal, and no-placeholder protections.

## Routes / Output
- Static build still generates 15 HTML pages into dist/.
- Subject pages still follow the existing route pattern: /<subject>-score-calculator/.
- APUSH route remains /apush-score-calculator/ and keeps the calculator-first hero/dashboard path.
- Legal/contact and SEO support files remain in place.

## APUSH v5 Trim
- APUSH keeps:
  - calculator hero
  - dashboard preview
  - v5-apush-workspace
  - Dynamic study plan
  - compact APUSH scoring reference
  - one FAQ section
- APUSH removes/avoids old duplicate v4 modules in generated page tests:
  - visual-score-section
  - weight-section
  - v4-results-panel
  - v4-worked-example
  - What to practice next: APUSH Study Resources
  - href="#resources"

## Verification
- npm run check: PASS
- Build result: PASS — Built 15 HTML pages into dist
- Test result: PASS — 20 tests, 20 pass, 0 fail
- Focused v5 checks added:
  - APUSH 45/7/5/4 plan targets AP 5 gap and DBQ gain options
  - APUSH weighted-100 diagnostics prioritize DBQ opportunity
  - every subject page includes reusable Dynamic Study Plan with 2/4/8-week timelines
  - APUSH duplicate v4 content is removed while compact FAQ remains

## Files Changed
- scripts/build.js
- src/scoreEngine.js
- src/site.js
- test/scoreEngine.test.js
- test/site.test.js
- dist/ generated assets/pages from npm run build

## Notes / Review Focus
- Review the new weakness ranking and gain-option logic in src/scoreEngine.js, especially the APUSH weighted-100 case.
- Review the v5 compatibility updates in test/site.test.js to ensure old v3/v4 assertions are relaxed only where v5 intentionally changed copy/DOM.
- No production deploy was performed in this task.
