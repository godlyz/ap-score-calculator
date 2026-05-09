# AP Score Calculator v1 Implementation Notes

## Build path

- Workspace: `/root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536`
- Source entry points:
  - `src/site.js`
  - `src/scoreEngine.js`
  - `scripts/build.js`
- Static output: `dist/`
- Target origin: `https://apscorecalculator.store`

## What changed

### 1. Production origin / canonical / sitemap / robots

- Changed default production origin from `https://example.com` to `https://apscorecalculator.store` in `src/site.js`.
- Exported `siteOrigin` and reused it in `scripts/build.js` so canonical URLs, `robots.txt`, and `sitemap.xml` share one origin source.
- Rebuilt `dist/robots.txt` with:
  - `Sitemap: https://apscorecalculator.store/sitemap.xml`
- Rebuilt `dist/sitemap.xml` with clean canonical paths such as:
  - `https://apscorecalculator.store/ap-score-calculator-2026/`
  - `https://apscorecalculator.store/apush-score-calculator/`
  - legal/contact pages.
- Verified generated source/dist no longer contain `example.com`; only the test assertion regex references it.

### 2. P0 SEO / UX improvements

Implemented the requested P0 improvements while keeping the product static and free:

- US/Canada education-tool visual style:
  - brighter educational SaaS palette,
  - sticky header,
  - pill CTAs,
  - card-based subject matrix,
  - trust/highlight panel,
  - mobile-first spacing and typography.
- Mobile calculator first screen:
  - calculator pages now use a two-column desktop layout that collapses on mobile,
  - calculator card is moved before the intro on mobile via CSS order,
  - numeric inputs use `inputmode="numeric"`, 16px font sizing, and larger touch targets.
- Subject matrix:
  - grouped all nine AP calculators into STEM / English / Social Science sections,
  - each card includes subject title, input count, max composite, and 5-target threshold.
- Result explanation:
  - result panel now includes `data-result-explanation`, showing next-action study guidance from the scoring engine.
  - JS updates the explanation with `result.nextAction` and reiterates the unofficial planning nature.
- FAQ and internal links:
  - hub keeps FAQ schema and visible FAQ.
  - each subject page keeps subject FAQ schema and related AP calculator links.
  - footer links to Home / Privacy / Terms / Disclaimer / Contact.
- SEO positioning strengthened:
  - explicit 2026 freshness notes,
  - “what score do I need” sections,
  - raw/composite conversion tables,
  - fast mobile-first messaging,
  - transparent unofficial estimate disclaimers.

### 3. Compliance / static-stack guardrails

- No backend added.
- No database added.
- No paid API added.
- No accounts or score storage added.
- Calculator remains browser-only with static HTML/CSS/JS.
- Added/kept accessible legal and contact pages:
  - `privacy.html`
  - `terms.html`
  - `disclaimer.html`
  - `contact.html`
- Reinforced trademark and unofficial-estimate disclaimers in footer, legal pages, calculator result panels, methodology, FAQ, and schema-visible content.

### 4. Tests updated

Updated `test/site.test.js` to cover:

- all nine subject pages plus Privacy / Terms / Disclaimer / Contact,
- subject pages containing calculator, schema, result interpretation, raw conversion, “what score do I need”, internal links, and disclaimers,
- hub subject matrix and 2026/mobile-first positioning,
- default canonical URLs using `https://apscorecalculator.store`,
- generated pages avoiding `example.com`, placeholder text, and dead placeholder links.

## Verification results

Command run from workspace:

```bash
npm run check
```

Result:

- Tests: 8 passed / 0 failed
- Build: passed
- Build output: `Built 15 HTML pages into /root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/dist`

Additional scans:

```bash
grep -RInE 'example\.com|Lorem ipsum|Your Company' dist src scripts test || true
```

Result:

- No generated `dist/`, `src/`, or `scripts/` placeholder hits.
- Only `test/site.test.js` contains `example.com` as a negative assertion pattern.

Sitemap spot check:

- `dist/sitemap.xml` now contains `https://apscorecalculator.store/...` URLs without `index.html` suffix for directory pages.
- `dist/robots.txt` points at `https://apscorecalculator.store/sitemap.xml`.

## Changed files

- `src/site.js`
- `scripts/build.js`
- `test/site.test.js`
- regenerated `dist/` output including:
  - `dist/index.html`
  - `dist/ap-score-calculator-2026/index.html`
  - nine subject calculator pages
  - `dist/privacy.html`
  - `dist/terms.html`
  - `dist/disclaimer.html`
  - `dist/contact.html`
  - `dist/assets/styles.css`
  - `dist/assets/app.js`
  - `dist/robots.txt`
  - `dist/sitemap.xml`

## Remaining P1 / P2

P1:

- Add real browser visual QA at 320 / 360 / 375 / 390 / 768 / 1024 widths if a browser preview environment is required before launch.
- Add analytics only if privacy-friendly IDs are provided; avoid collecting raw score inputs.
- Improve per-subject copy with more exam-specific 2026 nuance after a content editor review.

P2:

- Add optional printable study-plan snippets per score band.
- Add comparison pages for high-volume terms such as “APUSH score calculator vs AP score calculator”.
- Add lightweight screenshot regression checks if this static generator continues to evolve.
