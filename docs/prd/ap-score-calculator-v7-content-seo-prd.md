# Growth Brief: AP Score Calculator v7 Post-Launch SEO Demand Iteration

> **Status:** post-launch SEO growth brief for the already-live site; P0 content/module changes are ready for implementation; P1 support pages gated by source review and URL Inspection  
> **Repo:** `/root/ap-score-calculator`  
> **Canonical domain:** `https://apscorecalculator.store`  
> **Input evidence:**  
> - `docs/research/semrush-keyword-gap-summary-2026-05-16.md`  
> - `docs/research/semrush-keyword-gap-raw-2026-05-16.json`  
> - `docs/seo/current-index-checklist.md`  
> - `docs/research/ap-score-content-opportunity-backlog-2026-05-16.md`  
> **Decision:** Use competitor gaps to find demand for the existing live site and drive SEO growth. Do P0 calculator SEO hardening first; defer broad grade/test calculators, SAT/ACT, practice-test libraries, and monetization.

## 1. 背景与机会 / Keyword Opportunity

### Primary keyword family

- `ap score calculator` — 14.8K US volume, KD 31, missing in Semrush Keyword Gap.
- `ap calculator` — 8.1K, KD 28, missing.
- `ap exam calculator` — 4.4K, KD 28, missing.
- `ap test calculator` — 2.9K, KD 32, missing.

### Secondary keyword families

- High-demand subject calculators:
  - `apush score calculator` — 14.8K, KD 8.
  - `ap lang score calculator` — 12.1K, KD 18.
  - `ap bio score calculator` — 6.6K, KD 4.
  - `ap chem score calculator` — 6.6K, KD 3.
  - `ap world score calculator` / `ap world calculator` — 5.4K / 6.6K, KD 6.
  - `ap calc ab score calculator` — 5.4K, KD 7.
  - `ap gov score calculator` — 5.4K, KD 11.
  - `ap lit score calculator` — 5.4K, KD 14.
  - `ap stats score calculator` — 4.4K, KD 7.
  - `ap physics 1 score calculator` — 3.6K, KD 15.
- Weak-but-visible terms:
  - `ap psych calculator` — ours #83 vs competitors top 2–6.
  - `ap gov calculator` — ours #93 vs competitors top 2–8.
  - `ap us gov score calculator` — ours #53 vs competitors top 2–8.
  - `ap language and composition score calculator` — ours #76 vs competitors top 2–4.
- Support opportunities:
  - `ap score distribution 2025` — 14.8K, KD 43.
  - `ap score distribution` — 6.6K, KD 48.
  - `ap exam schedule` — 60.5K, KD 23.
  - `ap test schedule` — 27.1K, KD 25.

### Search intent

- Core and subject calculator terms: calculator/commercial-investigation intent. User wants to enter raw scores and understand estimated AP score quickly.
- Distribution/schedule terms: informational intent. User wants official context, dates, or score distribution data.
- Broad grade/test calculator terms: adjacent utility intent; not AP-specific enough for this iteration.

### Demand evidence

- Semrush Keyword Gap captured 218 rows: 100 missing, 18 weak, 100 untapped.
- Current GSC shows early visibility: 2 clicks / 80 impressions; hub has 51 impressions; AP Gov has 1 click / 29 impressions.
- Competitors ranking for target terms include Test Ninjas, Knowt, GradGPT, NUM8ERS, Fiveable, and Albert.

### SERP risk

- Competitors already occupy top positions for exact-match terms.
- Google may still be consolidating canonical/index state; newer pages lack indexed examples.
- Distribution/schedule content must be accurate and source-cited to avoid trust issues.

### Go / No-Go verdict

- **Go for P0 calculator hardening**: low technical risk, directly supported by Semrush and GSC.
- **Conditional Go for P1 support pages**: only after source review and citation plan.
- **No-Go for P2 broad grade/test/SAT/ACT/practice-test expansion in this iteration**.

## 2. 目标 / Purpose

### Business objective

This is not a first-launch PRD. The site is already live; the objective is to convert competitor-analysis gaps into concrete SEO growth demand for the existing product: improve pages/modules that already exist, expand only tightly related support content, and increase organic clicks/impressions while keeping the product free, fast, and low-cost.

### User objective

Help AP students quickly estimate scores, understand raw-score-to-AP-score assumptions, and know what to improve next without login or friction.

### SEO objective

Improve ranking coverage for exact-match AP calculator keywords by aligning titles, headings, FAQs, conversion explanations, and internal links with Semrush gaps.

### Launch objective

Ship a safe content/module iteration that passes `npm run check`, does not break existing 22-page static build, and can be measured in GSC after crawl delay.

## 3. 用户与场景 / Users & JTBD

### Target users

- AP students preparing for exams or estimating score outcomes after practice tests.
- Parents/tutors helping students interpret raw scores.
- Students comparing multiple AP subject score possibilities.

### Core JTBD

“When I know or can estimate my raw section scores, I want to quickly calculate an estimated AP score and understand what raw-score improvement would move me toward a 3/4/5.”

### Pain points

- Existing calculators often hide assumptions or require too much scrolling.
- Students search by multiple synonyms: AP Gov calculator, AP US Gov score calculator, AP exam calculator, AP grade calculator.
- Users need reassurance that the tool is unofficial but useful.

### Decision moments

- First 5 seconds: is this the right calculator for my AP subject?
- After input: what score am I likely to get?
- After result: what section should I improve next?
- Before trusting: is this official, current, and transparent?

## 4. 产品定位 / Product Positioning

### One-liner

A fast, free, unofficial AP score calculator hub that helps students estimate scores by subject and understand what raw-score changes matter.

### Category

Educational utility / AP exam score calculator.

### Differentiation

- Static, fast, no login.
- Calculator above the fold.
- Transparent conversion assumptions and unofficial disclaimer.
- Target-score and study-plan guidance after calculation.
- Subject matrix with internal links.

### Competitor gap

Competitors rank well because they cover exact-match subject terms and generic calculator intent. Our current pages exist but need stronger query coverage, internal linking, and visible explanatory modules.

### Monetization angle

No monetization in this iteration. Keep trust and indexing first; revisit ads/affiliate/email only after meaningful organic traffic appears.

## 5. MVP 范围 / MVP Scope

### Must-have — P0

1. **Hub exact-match SEO hardening**
   - Improve `/ap-score-calculator-2026/` for `ap score calculator`, `ap calculator`, `ap exam calculator`, `ap test calculator`, and `ap grade calculator`.
   - Add/strengthen subject chooser module and FAQ variants.

2. **Weak visible page optimization**
   - Improve:
     - `/ap-gov-score-calculator/`
     - `/ap-psychology-score-calculator/`
     - `/ap-lang-score-calculator/`
   - Add synonym coverage, exact H2/FAQ variants, and stronger target-score/conversion explanations.

3. **High-demand subject page coverage block**
   - Improve:
     - `/apush-score-calculator/`
     - `/ap-chemistry-score-calculator/`
     - `/ap-biology-score-calculator/`
     - `/ap-statistics-score-calculator/`
     - `/ap-lit-score-calculator/`
     - `/ap-calculus-ab-score-calculator/`
   - Add reusable block: how calculator works, target raw scores for 3/4/5, scoring assumptions, FAQ variants, related anchors.

4. **Internal linking update**
   - Use exact-match but natural anchor variants across hub and subject pages.
   - Ensure every subject page links to hub and at least 3 related calculators.

5. **Schema and test coverage**
   - FAQPage and BreadcrumbList remain valid.
   - Static test must catch missing title/meta/canonical/calculator/study-plan/FAQ/breadcrumb/disclaimer/related links.

### Should-have — P1

1. **Index-dependent optimization for newer current pages**
   - AP World, Physics 1, Physics 2, Macro, Micro, CSP, Human Geography.
   - First inspect/request indexing; then optimize pages with validated demand.

2. **AP score distribution support page**
   - Candidate URL: `/ap-score-distribution/`.
   - Must cite official or authoritative data source.

3. **AP exam schedule support page**
   - Candidate URL: `/ap-exam-schedule/`.
   - Must cite College Board schedule/source pages.

### Not-now / Explicitly deferred

- Broad `grade calculator` / `final grade calculator` product line.
- SAT/ACT date pages.
- Practice test libraries, FRQ content libraries, quiz banks.
- Accounts, saved scores, email capture, ads, affiliates.
- Brand-new APES/AP Euro/AP Spanish/AP Calc BC pages until separate validation and scoring assumptions are ready.

### Core user flow

1. User lands on hub or subject page from search.
2. Above the fold confirms exact subject/calculator match.
3. User inputs raw section scores.
4. Result panel estimates AP score and composite.
5. Page explains assumptions, target score gap, conversion table, and related calculators.
6. User can navigate to another AP subject calculator.

### Inputs / Outputs / Limits

- Inputs: raw section scores for each subject’s available scoring model.
- Outputs: estimated AP score band, composite/weighted estimate, target-gap guidance, study plan.
- Limits: unofficial estimates only; not affiliated with College Board; scoring curves vary by year.

## 6. SEO 页面方案 / SEO Landing Plan

### Existing hub page

- URL slug: `/ap-score-calculator-2026/`
- Title direction: `AP Score Calculator 2026 | Free AP Exam Score Calculator by Subject`
- Meta direction: `Estimate AP scores for APUSH, AP Lang, AP Bio, AP Chem, AP Gov, AP Stats, AP Psych, AP Lit, AP World, Calculus, Physics, and more. Free, unofficial, no login.`
- H1 direction: `AP Score Calculator 2026`
- Required sections:
  - Calculator/subject chooser above fold.
  - “How AP score calculators work”.
  - Subject cards grouped by category.
  - Generic FAQ covering AP calculator / AP exam calculator / AP test calculator / AP grade calculator.
  - Unofficial disclaimer.

### Existing subject pages

For each P0 subject page:

- Title pattern: `<Subject> Score Calculator 2026 | Estimate Your AP Score`
- H1 pattern: `<Subject> Score Calculator`
- Required sections:
  - Calculator first screen.
  - “How this AP <Subject> score calculator works”.
  - “What raw score do I need for a 3, 4, or 5?”
  - Conversion table / scoring assumptions.
  - Target score gap guidance.
  - FAQ with synonym variants from Semrush.
  - Related AP calculators.

### New support pages — P1 only

#### `/ap-score-distribution/`

- Purpose: explain AP score distributions and link to calculators.
- Must include source citations and update date.
- Do not conflate official distribution with calculator estimates.

#### `/ap-exam-schedule/`

- Purpose: support schedule/score-release queries and link to calculators.
- Must cite College Board schedule or official source.
- Must avoid stale year-specific claims.

## 7. 技术方案 / Technical Plan

### Suggested stack

- Existing static site generator / Node build in `/root/ap-score-calculator`.
- No new backend, database, auth, or paid API.
- Cloudflare Pages static deployment remains viable.

### Likely files to modify in implementation

- `src/site.js` — page metadata, page sections, internal linking, reusable content blocks.
- `src/scoreEngine.js` — only if target-score/study-plan copy requires logic changes.
- `test/site.test.js` — assertions for SEO modules and generated pages.
- `scripts/build.js` — only if build rendering needs a new support page or reusable module wiring.
- `docs/research/*` and `docs/prd/*` — update research/PRD references.

### APIs / model dependencies

None.

### Data model

- Reuse existing subject configuration if present.
- Add keyword variant metadata per subject only if it keeps page copy DRY.
- Avoid hardcoding duplicate FAQ lists in many places if a shared helper can generate them safely.

### Key endpoints / routes

- Existing:
  - `/`
  - `/ap-score-calculator-2026/`
  - 16 subject calculator URLs.
- Candidate P1:
  - `/ap-score-distribution/`
  - `/ap-exam-schedule/`

### Abuse/privacy/compliance risks

- No personal data collection.
- Must maintain unofficial/independent disclaimer.
- Must cite sources for schedule/distribution pages.
- Avoid copying competitor text or College Board copyrighted material.

## 8. 成功标准 / Success Metrics

### SEO metrics

- After crawl delay, GSC impressions for hub and P0 pages increase from current baseline.
- At least one weak page improves average position or impressions for target queries.
- Semrush no longer marks core P0 pages as completely missing after enough recrawl time.

### Activation metrics

- Calculator remains above the fold on mobile/desktop.
- No increase in user friction; no login or modal.

### Conversion metrics

- Not applicable for monetization; measure internal navigation to related calculators if analytics exists later.

### Quality metrics

- `npm run check` passes.
- 22 existing HTML pages still build unless P1 pages are explicitly added.
- FAQPage/BreadcrumbList JSON-LD valid for subject pages.
- No new broken canonical, sitemap, or robots regression.

### Time-to-launch target

- P0 content/module iteration: 1 focused implementation cycle.
- P1 support pages: separate cycle after source-citation review.

## 9. 验收标准 / Acceptance Criteria

### Functional acceptance

- Existing calculators still accept inputs and update result/study-plan output.
- No JavaScript errors in generated pages.
- No scoring precision regression.

### Content/SEO acceptance

- Hub covers the generic keyword family naturally.
- AP Gov, AP Psych, AP Lang pages cover weak keyword variants naturally.
- P0 subject pages include how-it-works, target-score, conversion, FAQ, and related links.
- No keyword stuffing; copy reads naturally for students.

### Performance acceptance

- Static pages remain fast and deployable on Cloudflare Pages.
- No new heavy third-party scripts.

### QA acceptance

- `npm run check` passes.
- Static tests identify missing module/page by route.
- Manual spot check for hub, AP Gov, AP Psych, AP Lang, APUSH, AP Chem.

### Legal/privacy acceptance

- Unofficial disclaimer visible.
- College Board affiliation is not implied.
- No user raw scores stored.
- Schedule/distribution pages cite sources before launch.

## 10. 执行计划 / Execution Plan

### Phase 0: Validation already completed

- Semrush Keyword Gap completed for required competitor set.
- GSC/index checklist filled with available GSC Pages + Performance data.
- Content opportunity backlog created.

### Phase 1: P0 calculator SEO hardening

1. Update hub metadata, above-fold chooser, generic FAQ, and internal links.
2. Update AP Gov/AP Psych/AP Lang weak visible pages.
3. Update high-demand subject pages with reusable keyword coverage block.
4. Add or strengthen static tests for required SEO modules.
5. Run `npm run check`.
6. Preview and manually approve before production launch.

### Phase 2: P1 support pages and index-dependent subjects

1. Run URL Inspection / request indexing for newer zero-impression pages.
2. Decide which newer subject pages get content emphasis after index confirmation.
3. Source official distribution and schedule references.
4. Build `/ap-score-distribution/` and/or `/ap-exam-schedule/` only after source review.
5. Run full QA and GSC submission steps.

### Phase 3: Growth iteration

1. Re-check GSC after crawl delay.
2. Re-run Semrush/Keyword Gap after enough time.
3. Decide whether to create APES/AP Euro/AP Spanish/AP Calc BC pages.
4. Decide whether broad grade calculator is a separate project.

## 11. 团队交接 / Team Handoff

- 小凌: coordinate scope, keep P0/P1/P2 gates, ask Ningge before production launch.
- 凌搜: validate keyword mapping, monitor GSC/Semrush after launch, source distribution/schedule references.
- 凌内: write natural student-facing page copy and FAQ variants; avoid keyword stuffing.
- 凌开: implement reusable modules, metadata, routes, tests.
- 凌测: run `npm run check`, browser spot checks, mobile checks, schema/canonical/sitemap checks.
- 凌运: after launch, monitor GSC impressions/clicks and prepare heartbeat summaries.
- 凌财: not needed for MVP; no monetization in this iteration.
- 凌法: review disclaimers and source citation if support pages are added.
- 凌复: review post-launch SEO movement and whether next iteration is AP subject expansion or support content.

## 12. Open Questions / Risks

1. **URL Inspection canonical remains incomplete.** Current GSC checklist has Pages/Performance data, but Google-selected canonical per URL still needs URL Inspection/API.
2. **Some newer pages have zero impressions and no indexed example.** Do not over-promote until URL Inspection/request-indexing is done.
3. **P1 support pages need source accuracy.** Distribution and schedule pages should not be launched without cited sources.
4. **Competitor URL-level mapping is still follow-up.** Keyword Gap captured positions by domain; selected top keywords can later be enriched with competitor landing URLs.
5. **Broad grade/test calculator cluster is tempting but off-scope.** It should be a separate product-discovery decision.

## 13. Implementation checklist

- [ ] Hub metadata and copy updated.
- [ ] Hub chooser/internal links updated.
- [ ] AP Gov page optimized for weak keyword variants.
- [ ] AP Psych page optimized for weak keyword variants.
- [ ] AP Lang page optimized for long exact variant.
- [ ] APUSH, Bio, Chem, Stats, Lit, Calc AB pages get coverage block refinement.
- [ ] Tests updated for required SEO modules.
- [ ] `npm run check` passes.
- [ ] Preview manually approved before launch.
- [ ] GSC monitor date scheduled after launch/crawl delay.
