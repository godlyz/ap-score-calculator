# AP Score Calculator v8 Competitor Gap Growth Brief

> **Status:** ready for Ningge review; competitor data enriched on 2026-05-17  
> **Created:** 2026-05-17  
> **Scope:** post-launch SEO/competitor gap iteration for the already-live AP Score Calculator site  
> **Production:** `https://apscorecalculator.store`  
> **Evidence:**  
> - `docs/research/semrush-keyword-gap-summary-2026-05-16.md`  
> - `docs/research/semrush-keyword-gap-raw-2026-05-16.json`  
> - `docs/seo/current-index-checklist.md`  
> - `docs/research/ap-score-content-opportunity-backlog-2026-05-16.md`  
> - `docs/research/ap-score-top-competitor-ux-teardown.md`  
> - `docs/research/ap-score-expanded-subject-keyword-validation.md`  
> - `docs/research/ap-score-official-source-evidence-pack-2026-05-17.md`  
>
> **Important gate note:** Google Search Console later required login verification again, so no new URL Inspection/API pulls were performed in this pass. This brief uses the GSC Pages + Performance rows already captured in `current-index-checklist.md`. Per-URL Google-selected canonical remains open and should be checked once GSC access is available again.

## 1. Executive answer

The competitor gap checklist is now usable for a **v8 post-launch growth sprint**, not for another first-launch PRD.

- **Semrush Keyword Gap:** complete at domain-level for the requested competitor set: Test Ninjas, Knowt, GradGPT, NUM8ERS, Fiveable, Albert.
- **GSC/index status:** partially complete and actionable: indexed examples, excluded examples, page impressions, and clicks were filled where GSC exposed rows. Google-selected canonical per URL remains unavailable because URL Inspection requires login/API access.
- **Competitor UX/content teardown:** completed for V8 P0/P1 planning in `ap-score-top-competitor-ux-teardown.md`; Albert and NUM8ERS page-level evidence was recovered through public search/reader captures and is now usable for structural UX conclusions, while exact visual QA still requires browser screenshots if needed.

Recommendation: **approve a v8 SEO growth iteration focused on P0 calculator-page hardening first**. Do not start broad grade calculator, SAT/ACT, practice-test, or monetization expansion in this sprint.

## 2. Current GSC/index state used for prioritization

Source: `docs/seo/current-index-checklist.md`.

### Property-level snapshot

- Search type: Web
- Visible report window: current GSC 3-month report; chart dates shown `2026/5/8` to `2026/5/13`
- Total clicks: `2`
- Total impressions: `80`
- Average CTR: `2.5%`
- Average position: `26.4`
- Sitemap filter in Pages report: `https://apscorecalculator.store/sitemap.xml`
- Indexed count shown: `12`
- Not indexed count shown: `6`

### Page performance rows captured

| URL | Indexed status used here | Clicks | Impressions | Excluded reason / issue |
|---|---:|---:|---:|---|
| `https://apscorecalculator.store/ap-gov-score-calculator/` | Indexed example | 1 | 29 | none captured |
| `https://apscorecalculator.store/` | conflicting | 1 | 10 | exact URL also appeared as crawled-currently-not-indexed; needs URL Inspection |
| `https://apscorecalculator.store/ap-score-calculator-2026/` | Indexed example | 0 | 51 | none captured |
| `https://apscorecalculator.store/apush-score-calculator/` | Indexed example | 0 | 9 | none captured |
| `https://apscorecalculator.store/ap-psychology-score-calculator/` | Indexed example | 0 | 8 | none captured |
| `https://apscorecalculator.store/ap-lang-score-calculator/` | Indexed example | 0 | 8 | none captured |
| `https://apscorecalculator.store/ap-chemistry-score-calculator/` | Indexed example | 0 | 7 | none captured |
| `https://apscorecalculator.store/ap-biology-score-calculator/` | Indexed example | 0 | 6 | none captured |
| `https://apscorecalculator.store/ap-statistics-score-calculator/` | Indexed example | 0 | 6 | none captured |
| `https://apscorecalculator.store/ap-lit-score-calculator/` | Indexed example | 0 | 6 | none captured |
| `https://www.apscorecalculator.store/` | Indexed example / variant | 0 | 6 | host consolidation needs URL Inspection |
| `http://www.apscorecalculator.store/` | Indexed example / variant | 0 | 1 | host consolidation needs URL Inspection |

### Not-indexed / excluded examples captured

| URL | Indexed | Clicks | Impressions | Excluded reason |
|---|---:|---:|---:|---|
| `http://apscorecalculator.store/` | No | 0 | 0 | page with redirect / 网页会自动重定向 |
| `https://apscorecalculator.store/contact.html` | No | 0 | 0 | discovered-currently-not-indexed / 已发现 - 尚未编入索引 |
| `https://apscorecalculator.store/disclaimer.html` | No | 0 | 0 | discovered-currently-not-indexed / 已发现 - 尚未编入索引 |
| `https://apscorecalculator.store/privacy.html` | No | 0 | 0 | discovered-currently-not-indexed / 已发现 - 尚未编入索引 |
| `https://apscorecalculator.store/terms.html` | No | 0 | 0 | discovered-currently-not-indexed / 已发现 - 尚未编入索引 |
| `https://apscorecalculator.store/` | Conflicting | 1 | 10 | crawled-currently-not-indexed / 已抓取 - 尚未编入索引 |

### GSC implications

- **Fastest feedback loop:** AP Gov, hub, AP Psych, AP Lang, APUSH, Chem, Bio, Stats, Lit — these have impressions or indexed examples.
- **Index-confirm-before-pushing group:** AP World, CSP, Physics 1/2, Macro, Micro, Human Geography — no captured indexed example or impression rows; optimize lightly, then run URL Inspection/request indexing later.
- **Technical risk:** host/canonical consolidation needs review because root and `www/http` variants appeared in GSC rows.

## 3. Requested Semrush Keyword Gap output

Source: `docs/research/semrush-keyword-gap-summary-2026-05-16.md`.

### Missing keywords — competitors rank, we do not

| 关键词 | 搜索意图 | 月度搜索量 | KD | CPC |
|---|---:|---:|---:|---:|
| ap exam schedule | I | 60.5K | 23 | n/a |
| ap test schedule | I | 27.1K | 25 | n/a |
| ap score calculator | C | 14.8K | 31 | n/a |
| ap score distribution 2025 | N | 14.8K | 43 | n/a |
| apush score calculator | C/I | 14.8K | 8 | n/a |
| ap lang score calculator | I | 12.1K | 18 | n/a |
| ap calculator | C | 8.1K | 28 | n/a |
| ap bio score calculator | C/I | 6.6K | 4 | n/a |
| ap chem score calculator | C/I | 6.6K | 3 | n/a |
| ap world calculator | I | 6.6K | 6 | n/a |
| ap calc ab score calculator | C/I | 5.4K | 7 | n/a |
| ap gov score calculator | I | 5.4K | 11 | n/a |
| ap lit score calculator | I | 5.4K | 14 | n/a |
| ap stats score calculator | C/I | 4.4K | 7 | n/a |
| ap physics 1 score calculator | C/I | 3.6K | 15 | n/a |

### Weak keywords — we rank worse than competitors

| 关键词 | 搜索意图 | 月度搜索量 | KD | CPC |
|---|---:|---:|---:|---:|
| ap psych calculator | C/I | 5.4K | 8 | n/a |
| ap gov calculator | I | 3.6K | 13 | n/a |
| ap us gov score calculator | I | 2.9K | 4 | n/a |
| ap gov calculator score | I | 2.4K | 10 | n/a |
| ap language and composition score calculator | I | 2.4K | 11 | n/a |
| ap gov curve | I | 170 | 19 | n/a |
| apush ap test calculator | C/I | 110 | 8 | n/a |
| ap gov exam calc | I | 70 | 9 | n/a |
| ap gov scoring calculator | I | 50 | 8 | n/a |

### Untapped keywords — mostly adjacent or broad opportunities

| 关键词 | 搜索意图 | 月度搜索量 | KD | CPC |
|---|---:|---:|---:|---:|
| ap classroom | N | 1.5M | 78 | n/a |
| college board | N | 1M | 67 | n/a |
| grade calculator | I | 673K | 56 | n/a |
| sat test | I | 368K | 90 | n/a |
| final grade calculator | I | 135K | 42 | n/a |
| algebra calculator | I | 110K | 75 | n/a |
| ap bio | I | 90.5K | 77 | n/a |
| grade calc | I | 74K | 63 | n/a |
| sat practice test | I | 74K | 73 | n/a |
| ap exam schedule | I | 60.5K | 23 | n/a |
| final exam calculator | I | 49.5K | 38 | n/a |
| act practice test | I | 40.5K | 56 | n/a |
| ap scores | I | 33.1K | 45 | n/a |
| sat test dates | I | 33.1K | 49 | n/a |
| act test dates | I | 27.1K | 37 | n/a |
| ap test schedule | I | 27.1K | 25 | n/a |
| grading calculator | I | 27.1K | 54 | n/a |

## 4. Competitor teardown summary

### Test Ninjas

- Captured URL: `https://test-ninjas.com/ap-score-calculators`
- Positioning: free calculators for all AP subjects; combines calculator intent with AP practice funnel.
- Strengths:
  - Broad AP coverage and strong subject-grid UX.
  - Ranks #1 for several generic AP calculator terms in Semrush capture.
  - Clear route from calculator to practice questions/study plan.
- Weakness/gap to exploit:
  - We should not copy the practice funnel; we can win on faster static pages, clearer score assumptions, and cleaner calculator-first UI.

### Knowt

- Captured URL: `https://knowt.com/exams/AP/score-calculator`
- Positioning: accurate AP score calculators inside a larger AP study ecosystem.
- Strengths:
  - Strong trust/social proof and school/student ecosystem messaging.
  - Very strong subject-term rankings in Semrush capture.
  - Links calculators to AP practice/FRQ rooms.
- Weakness/gap to exploit:
  - Heavier platform context; we can position as no-login, fast, direct calculator pages.

### GradGPT

- Captured URL: `https://www.gradgpt.com/ap/calculator`
- Positioning: simple AP calculator hub grouped by subject.
- Strengths:
  - Lightweight exact-match hub and subject routing.
  - Strong generic AP calculator positions despite less complex product surface.
- Weakness/gap to exploit:
  - Minimal content depth; we can beat with better explanation, target-score guidance, FAQs, and internal links.

### Fiveable

- Captured URL: `https://fiveable.me/ap-score-calculator`
- Positioning: AP score calculators plus education/study guidance.
- Strengths:
  - Rich explanatory content around calculator intent.
  - Strong topical authority in AP study journey.
- Weakness/gap to exploit:
  - Broad education platform; our site can be more utility-first and faster.

### NUM8ERS

- Semrush batch competitor: `num8ers.com`.
- Verified calculator directory: `https://num8ers.com/score-calculators-2025/`.
- Verified AP examples include AP World, AP Lang, AP Stats, AP Human Geography, AP Microeconomics, AP Chemistry, APUSH, and AP Environmental Science pages under `/score-calculator/`.
- UX/content pattern: 2026 freshness framing, broad academic score calculator directory, search/browse interaction, tutoring CTA/social-proof funnel.
- Treatment in v8:
  - Use NUM8ERS as a valid UX/content reference for freshness, directory browsing, and subject-page instruction patterns.
  - Do not copy unsupported “trusted by X” proof unless we have our own evidence.

### Albert

- Semrush batch competitor: `albert.io`.
- Verified calculator directory: `https://www.albert.io/blog/the-best-exam-score-calculators/`.
- Verified AP examples include AP World, AP Lit, APUSH, Calc AB, Stats, AP Lang, AP CSP, AP Macroeconomics and many other subject cards.
- UX/content pattern: category grouping by AP domain, icon/card directory, “Estimate Your Score” CTA, subject-specific calculator articles, school-license funnel, strong AP/College Board trademark disclaimer.
- Treatment in v8:
  - Use Albert as a valid structural reference for category grouping, disclaimer language, and subject-directory breadth.
  - Do not copy its heavy school-sales funnel; keep our V8 pages fast, direct and no-login.

## 5. P0 / P1 / P2 action plan

### P0 — implement first: measurable calculator SEO hardening

#### P0.1 Hub exact-match optimization

Target URL: `/ap-score-calculator-2026/`

Target keywords:
- `ap score calculator`
- `ap calculator`
- `ap exam calculator`
- `ap test calculator`
- `ap grade calculator`

Required changes:
- Put subject chooser / calculator selection above the fold.
- Strengthen title/meta/H1 around AP Score Calculator 2026 and free AP exam score calculator by subject.
- Add FAQ variants for AP calculator, AP exam calculator, AP test calculator, AP grade calculator.
- Link naturally to every subject calculator with exact-match subject anchors.

Why P0:
- Hub already has 51 GSC impressions.
- Semrush still marks generic terms as missing.
- Internal linking from hub affects all subject pages.

#### P0.2 Weak visible cohort

Target URLs:
- `/ap-gov-score-calculator/`
- `/ap-psychology-score-calculator/`
- `/ap-lang-score-calculator/`

Required changes:
- AP Gov: cover `ap gov calculator`, `ap us gov score calculator`, `ap gov calculator score`, `ap gov curve`, `ap gov scoring calculator` naturally in intro/H2/FAQ.
- AP Psych: cover `ap psych calculator` synonym in intro, FAQ, and related links.
- AP Lang: cover `ap language and composition score calculator` in title/meta/H2 or FAQ.
- Add target-score guidance and raw-score improvement explanation to each.

Why P0:
- These pages have GSC impressions and Semrush weak terms, so improvement can be measured fastest.

#### P0.3 High-demand subject coverage block

Target URLs:
- `/apush-score-calculator/`
- `/ap-chemistry-score-calculator/`
- `/ap-biology-score-calculator/`
- `/ap-statistics-score-calculator/`
- `/ap-lit-score-calculator/`
- `/ap-calculus-ab-score-calculator/`

Required changes:
- Add reusable “How this AP [subject] score calculator works” section.
- Add “What raw score do I need for a 3, 4, or 5?” section.
- Add scoring assumptions / unofficial disclaimer near the calculator result.
- Add FAQ variants matching Semrush subject terms.
- Add related calculators with exact but natural anchor text.

Why P0:
- These are current-scope pages with either indexed examples or high Semrush demand.

### P1 — conditional: source-gated support and index-dependent pages

#### P1.1 Index-dependent subject pages

Evidence added: `docs/research/ap-score-expanded-subject-keyword-validation.md`.

Target URLs:
- `/ap-world-history-score-calculator/`
- `/ap-csp-score-calculator/`
- `/ap-physics-1-score-calculator/`
- `/ap-physics-2-score-calculator/`
- `/ap-macroeconomics-score-calculator/`
- `/ap-microeconomics-score-calculator/`
- `/ap-human-geography-score-calculator/`

Gate:
- Run URL Inspection/request indexing once GSC access is available again.
- Do not over-promote until canonical/index status is confirmed.

#### P1.2 AP score distribution support page

Official-source evidence added: `docs/research/ap-score-official-source-evidence-pack-2026-05-17.md`.

Candidate URL: `/ap-score-distribution/`

Target keywords:
- `ap score distribution 2025`
- `ap score distribution`
- `2025 ap score distribution`

Gate:
- Must cite official/authoritative source.
- Must clearly distinguish official score distribution from calculator estimate.
- Should link back to subject calculators.

#### P1.3 AP exam schedule / score release support page

Official-source evidence added: `docs/research/ap-score-official-source-evidence-pack-2026-05-17.md`.

Candidate URL: `/ap-exam-schedule/`

Target keywords:
- `ap exam schedule`
- `ap test schedule`
- `when do ap scores come out 2025`
- `what time do ap scores come out 2025`

Gate:
- Must cite College Board or official schedule/source pages.
- Must avoid stale 2025-only framing when 2026 cycle is primary.

### P2 — watchlist / separate discovery only

Do not include in v8 implementation unless Ningge explicitly approves a separate product line:

- Broad grade calculators: `grade calculator`, `final grade calculator`, `final exam calculator`, `grading calculator`.
- SAT/ACT clusters: `sat test`, `sat test dates`, `act test dates`, practice-test keywords.
- Practice/FRQ libraries: APUSH practice test, AP calculus FRQ, AP psychology practice test, AP statistics FRQ.
- Broad navigational terms: `ap classroom`, `college board`.
- Brand-new AP subjects not already modeled: APES, AP Euro, AP Spanish, AP Calc BC unless scoring assumptions and demand validation are completed.

## 6. Acceptance criteria for v8 implementation

- `npm run check` passes.
- Existing 22 HTML pages still build unless P1 pages are explicitly added.
- No backend, auth, database, or paid API added.
- Calculator stays above the fold on hub/subject pages.
- P0 pages include natural keyword variants without stuffing.
- FAQPage/BreadcrumbList/canonical/sitemap basics remain valid.
- Unofficial/independent disclaimer remains visible.
- GSC follow-up is scheduled after crawl delay.

## 7. Remaining open gates

1. **URL Inspection / Google-selected canonical:** still blocked until Google login verification/API access is available again. Public HTTP/canonical checks for priority URLs returned 200 with correct self-canonicals, but Google-selected canonical still requires GSC URL Inspection.
2. **Albert page-level teardown:** closed for V8 planning; directory and multiple subject examples were found/read. Browser screenshot QA remains optional if visual redesign starts.
3. **NUM8ERS AP calculator URL verification:** closed for V8 planning; directory and multiple real AP subject calculator URLs were found/read.
4. **P1 source citations:** closed for planning; official College Board schedule, score release, score distribution and course/exam sources are listed in `ap-score-official-source-evidence-pack-2026-05-17.md`. Row-level numeric/date verification remains required immediately before deploying P1 support pages.

## 8. Final recommendation

Proceed with **v8 P0 calculator SEO hardening** only. This is the highest-confidence path because it uses existing pages, captured GSC visibility, and concrete Semrush missing/weak terms. Keep P1 and P2 behind gates so the site does not drift into broad education-platform scope.
