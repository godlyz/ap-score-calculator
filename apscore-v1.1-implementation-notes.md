# AP Score Calculator v1.1 Implementation Notes

Task: t_5adcf254
Workspace: /root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536
Date: 2026-05-09

## Summary

Implemented AP Score Calculator v1.1 copy, visual hierarchy, interaction microcopy, and compliance updates on the existing static site. The site remains a free static build with no backend, no database, no account system, no payment, and no paid API.

## Changes Made

### Copy and positioning

- Reworked the hub hero from a generic calculator heading into a student-oriented value proposition: practice score standing, gap to 3/4/5, U.S./Canada student use case, no account.
- Updated hub FAQ answers to avoid fixed cutoff claims and clearly frame all output as an unofficial planning estimate.
- Updated subject page hero copy to emphasize raw practice-test section points, estimated AP score, estimated composite score, and next study gap.
- Replaced direct fixed-cutoff FAQ wording with: enter section points to see an estimated gap; the number is not an official cutoff.
- Removed “Predict your AP...” phrasing from subject descriptions and replaced it with estimate-oriented language.
- Updated score engine next-action wording from “You need about...” to “You may need about...”.

### Visual and interaction upgrades

- Replaced the plain AP square brand mark with a non-official score-card style glyph mark to reduce official-brand confusion.
- Upgraded the visual system to a warmer academic utility palette with softer background gradients, stronger cards, larger result treatment, and improved hierarchy.
- Added a hub preview card labeled “Example preview” so sample numbers are clearly not real or official.
- Improved calculator cards with a clearer “Score input” label, stronger result panel, “Estimated AP score” label, and local-processing microcopy.
- Improved subject matrix card copy: inputs, max estimated composite, and gap-to-3/4/5 framing instead of exposing a fixed 5 cutoff in the matrix.
- Improved mobile resilience with `overflow-x:hidden`, `minmax(0, 1fr)`, full-width CTA behavior, wrapped nav/chips, max-width controls, and 16px input font size.

### Compliance and SEO

- Kept `SITE_ORIGIN` default as `https://apscorecalculator.store`.
- Rebuilt sitemap and robots with `https://apscorecalculator.store`; no `example.com` found in generated checks.
- Added stronger AP / Advanced Placement / College Board trademark notice in the global footer and disclaimer page.
- Kept schema publisher as `Independent AP Score Calculator`, not College Board.
- Updated conversion chart language to “Estimated AP Score” / “Estimated composite range” plus nearby disclaimer.
- Updated privacy page language for local browser processing and possible hosting/CDN logs without inventing a company jurisdiction or account/payment flows.
- Kept legal/contact pages reachable from footer: Privacy, Terms, Disclaimer, Contact.

## Files Changed

- `src/site.js`
  - Hub and subject page content, FAQ, disclaimers, legal page copy, brand mark, subject matrix copy.
- `src/scoreEngine.js`
  - Safer result wording and estimate-oriented subject descriptions.
- `scripts/build.js`
  - Rebuilt generated CSS and app microcopy used in `dist/assets/styles.css` and `dist/assets/app.js`.
- `dist/`
  - Rebuilt static output via `npm run check`.

## Verification

### Automated checks

Command:

```bash
npm run check
```

Result: PASS

Details:

- `node --test`: 8/8 tests passing.
- `npm run build`: rebuilt 15 HTML pages into `dist`.

### Preview check

Started local static preview with:

```bash
python3 -m http.server 4180 --bind 127.0.0.1 --directory dist
```

Verified routes:

- `http://127.0.0.1:4180/ap-score-calculator-2026/` returned 200.
- `http://127.0.0.1:4180/apush-score-calculator/` returned 200.

Preview server session id during verification: `proc_14b041089e2b`.

### Canonical / sitemap / robots checks

Verified generated output:

- `dist/sitemap.xml` uses `https://apscorecalculator.store/`.
- `dist/robots.txt` points to `https://apscorecalculator.store/sitemap.xml`.
- No `example.com` found in checked generated pages/assets.
- No empty `href="#"` placeholder links found in checked hub/subject pages.

### Compliance scan

Checked representative generated files for banned or risky phrases:

- No standalone “official AP Score Calculator”.
- No “official AP calculator”.
- No “College Board-approved”.
- No “you will get a 5”.
- No “you need exactly”.
- No “guaranteed score”.
- No “exact 2026 curve”.
- No “official 2026 cutoff”.
- No “real College Board cutoff”.
- No “Predict your AP”.

Note: “Free Unofficial AP Score Calculator” remains acceptable because it explicitly says unofficial, but the scanner was adjusted to avoid false positives from that phrase.

### Mobile overflow review

Target widths: 360 / 390 / 414.

Verification performed by reviewing generated responsive CSS and previewing the built static pages over HTTP. The CSS now includes key mobile overflow guards:

- `html, body { overflow-x: hidden; }`
- mobile grids use `minmax(0, 1fr)`
- calculator card collapses to one column under 760px
- CTA buttons become full-width on mobile
- nav/chips/related links wrap and use max-width controls
- inputs are `max-width:100%` with 16px font size
- table wrapper uses horizontal containment via `.table-wrap`

Result: no expected horizontal overflow at 360/390/414 based on CSS structure and static preview checks.

## Preview Paths

Local preview:

- Hub: `http://127.0.0.1:4180/ap-score-calculator-2026/`
- Root: `http://127.0.0.1:4180/`
- Example subject: `http://127.0.0.1:4180/apush-score-calculator/`
- Privacy: `http://127.0.0.1:4180/privacy.html`
- Terms: `http://127.0.0.1:4180/terms.html`
- Disclaimer: `http://127.0.0.1:4180/disclaimer.html`
- Contact: `http://127.0.0.1:4180/contact.html`

Production canonical target:

- `https://apscorecalculator.store`

## Remaining Risks / Follow-ups

- This is a static-site implementation, not a real browser visual QA pass with screenshots. A final human visual review on mobile Safari/Chrome is still recommended before production deployment.
- The score conversion bands remain estimates from the existing model. They are now more clearly labeled as estimates, but future subject-by-subject methodology review would improve trust.
- No analytics were added. If analytics are added later, they must remain coarse-grained and must not collect raw section points, exact composite scores, names, schools, AP numbers, or College Board account details.
