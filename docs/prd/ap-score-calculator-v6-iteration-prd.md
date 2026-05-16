# AP Score Calculator v6 Iteration PRD — Competitor-Gated Draft

> **Status:** Draft, gated by competitor-analysis completeness check  
> **Repo:** `/root/ap-score-calculator`  
> **Canonical domain:** `https://apscorecalculator.store`  
> **Last verification:** `npm run check` passed locally; build generated 22 HTML pages and 22 tests passed.  
> **Decision rule:** This PRD can guide limited development immediately, but should not be treated as a fully competitor-complete final PRD until the gap items in section 2 are closed.

---

## 1. Current Version Baseline

### 1.1 Current product state

The current site is a static AP score calculator cluster with:

- Home page and hub page.
- 16 subject calculator pages in `dist/`:
  - APUSH
  - AP Lang
  - AP Lit
  - AP Biology
  - AP Chemistry
  - AP Calculus AB
  - AP Government
  - AP Statistics
  - AP Psychology
  - AP World History
  - AP Computer Science Principles
  - AP Physics 1
  - AP Physics 2
  - AP Macroeconomics
  - AP Microeconomics
  - AP Human Geography
- Legal/support pages: privacy, terms, disclaimer, contact.
- Core page modules:
  - Above-the-fold calculator.
  - Result panel.
  - Composite / target-gap guidance.
  - Dynamic study plan.
  - Conversion table.
  - FAQ schema.
  - Breadcrumb schema.
  - Internal related calculator links.
  - Unofficial / College Board disclaimer.

### 1.2 Current verification result

Local command:

```bash
npm run check
```

Result:

- Build: 22 HTML pages generated into `dist/`.
- Tests: 22 passed, 0 failed.

This means the current codebase is structurally safe for a planning iteration.

---

## 2. Competitor Analysis Completeness Check

### 2.1 Evidence already sufficient

The following evidence is sufficient to support the broad strategy of an AP calculator SEO cluster:

1. **Search demand exists**
   - `ap score calculator`: US Volume 14.8K, KD 31%.
   - `apush score calculator`: US Volume 14.8K, KD 8%.
   - `ap lang score calculator`: US Volume 12.1K, KD 17%.
   - `ap bio score calculator`: US Volume 6.6K, KD 5%.
   - `ap lit score calculator`: US Volume 5.4K, KD 14–19% range across reports.
   - `ap calc ab score calculator`: total around 5.4K, low KD.
   - AP calculator keyword variants total around 246K search volume in Semrush report.

2. **SEO channel works for this category**
   - Test Ninjas AP calculator hub contributes material traffic and ranks for key calculator terms.
   - Knowt / Fiveable / Albert appear repeatedly across hub and subject SERPs.
   - Smaller / tool-first competitors such as GradGPT, NUM8ERS, and Test Ninjas prove a non-giant site can win non-brand calculator traffic.

3. **Current product direction matches competitor-proven pattern**
   - Competitors use hub + subject matrix.
   - Competitors place calculator, score explanation, conversion guidance, FAQ, and internal links on subject pages.
   - Current site already implements this pattern.

4. **Differentiation direction is valid**
   - Faster static pages.
   - Calculator above the fold.
   - No login.
   - Browser-local use.
   - Transparent assumptions / unofficial disclaimer.
   - Target-gap and study-plan guidance.

### 2.2 Remaining omissions / not fully complete

The competitor analysis is **not yet complete enough to claim “no遗漏”**. Remaining omissions:

1. **Full Semrush Keyword Gap export missing**
   - Existing report includes Keyword Gap judgment, but prior run had URL/tool-format issues.
   - Need explicit comparison: `apscorecalculator.store` vs `test-ninjas.com`, `knowt.com`, `gradgpt.com`, `num8ers.com`, `fiveable.me`, `albert.io`.
   - Output needed: missing keywords, weak keywords, untapped subject clusters, keyword volume/KD, ranking competitor URL.

2. **Current site GSC / Google index state missing**
   - Semrush showed early 12 keywords in one report, but current post-v5/v6 generated 22-page state needs confirmation.
   - Need GSC or at minimum `site:apscorecalculator.store` and sitemap/canonical checks.
   - Output needed: indexed URLs, impressions, clicks, queries, excluded URLs, sitemap status.

3. **Top competitor UX teardown is incomplete for the current 16-page scope**
   - Existing teardown covers major patterns, but not enough page-by-page detail for every current subject.
   - Need at least top 3 direct competitors by subject family:
     - Tool hub: Test Ninjas.
     - Education platform hub: Knowt / Fiveable.
     - Blog/content calculator: Albert / College Transitions.
   - Output needed: first-screen layout, input model, result display, conversion table, FAQ/schema, CTA, mobile behavior, trust/disclaimer, internal links.

4. **7 newly expanded subjects need keyword validation**
   - Current site has 16 subject pages, while earlier strongest data covered roughly 8–10 priority pages.
   - Need direct Semrush validation for:
     - AP Physics 1
     - AP Physics 2
     - AP Macroeconomics
     - AP Microeconomics
     - AP Human Geography
     - AP CSP / Computer Science Principles
     - AP World History was partially validated but should be refreshed.

5. **Similarweb second-pass details missing**
   - Current reports include Similarweb page-visible data for several competitors.
   - Still missing clean exports / full Top Countries / full channel trend tables.
   - This is not a blocker for SEO MVP, but it is a blocker for saying the analysis has no omissions.

6. **Monetization / CTA model is only partially analyzed**
   - Reports note practice tests, accounts, ads, school license / demo flows.
   - Need clearer recommendation on whether this site should stay pure SEO utility, add email capture, add affiliate, add ads, or delay monetization.

### 2.3 Go / No-Go decision

**Final competitor-analysis verdict:** Not fully complete; do not claim “无遗漏”.

**PRD verdict:** Can produce and execute a **limited, competitor-gated v6 iteration PRD**, because the current evidence is enough to guide low-risk improvements. But do not freeze a full growth PRD or launch a large content expansion until the omissions above are closed.

Recommended framing:

- **Can do now:** v6 technical/UX/SEO hardening based on current version + known competitor gaps.
- **Need more research first:** subject expansion beyond current 16 pages, exact prioritization by fresh Keyword Gap, aggressive SEO roadmap, monetization roadmap.

---

## 3. v6 Iteration Goal

### Goal

Turn the current AP Score Calculator cluster from a working static MVP into a more trustworthy, index-ready, competitor-informed SEO product that can be safely pushed to production and measured in GSC.

### Non-goals

- Do not build accounts.
- Do not build practice-test content libraries.
- Do not copy College Board protected material.
- Do not add raw-score claims that look official.
- Do not add new subject pages until their keyword / competitor evidence is checked.
- Do not add heavy tracking that stores user raw scores or personal information.

---

## 4. v6 Development Scope

## P0 — Must Do Before Next Production Launch

### P0.1 Add competitor-analysis gate document to repo

**Objective:** Make the research state visible to developers and prevent “竞品分析已完善” being assumed incorrectly.

**Files:**

- Create: `docs/research/ap-score-calculator-competitor-gap-checklist.md`

**Content requirements:**

- Link to source reports:
  - `/root/reports/ap-score-calculator-2026-competitor-analysis-2026-05-08.md`
  - `/root/reports/ap-score-calculator-semrush-report-2026-05-14.md`
  - `/root/reports/ap-score-calculator-data-gathering-2026-05-14.md`
- Include the six omissions from section 2.2.
- Add owner/status fields for each omission.
- Add rule: “No full growth PRD until Keyword Gap + current GSC/index check are done.”

**Acceptance criteria:**

- File exists.
- Each omission has status: `open`, `in_progress`, or `done`.
- `README.md` or a project docs index links to this checklist.

---

### P0.2 Fix / verify score display precision

**Objective:** Ensure all displayed composite scores are rounded cleanly to one decimal.

**Files:**

- Modify: `src/scoreEngine.js`
- Modify or verify tests: `test/site.test.js`

**Background:**

Previous QA found a case displaying `61.900000000000006`. Current tests now include `v5 weighted-100 composite rounds cleanly to one decimal place`, but this must remain enforced.

**Implementation requirement:**

- Keep final weighted-100 composite rounded with a single source of truth.
- Do not round display in multiple places if engine can return normalized values.

**Acceptance criteria:**

- APUSH input example `45/7/1/4` displays `61.9`, not a floating artifact.
- `npm run check` passes.

---

### P0.3 Ensure study-plan copy cannot contradict itself

**Objective:** Avoid “best next focus” and “current strength” naming the same section in a confusing way.

**Files:**

- Modify: `src/scoreEngine.js` or `src/site.js`, depending on where copy/ranking is generated.
- Test: `test/site.test.js`

**Acceptance criteria:**

- If weakest section equals strongest section, copy switches to neutral language such as “most balanced section” or excludes the weakest from the strength pool.
- Existing test `v5 balanced study-plan copy avoids strongest/weakest contradiction` remains passing.
- Check at least AP Lang, AP Lit, AP Chemistry, AP Biology, AP Gov, AP Statistics, AP Psychology default values.

---

### P0.4 Create current-site SEO index checklist

**Objective:** Make deployment/indexing measurable.

**Files:**

- Create: `docs/seo/current-index-checklist.md`

**Checklist must include:**

- Production URL.
- Sitemap URL.
- Robots URL.
- Canonical host policy.
- All 16 subject URLs.
- GSC verification status.
- Google index status per URL.
- Last crawl/index check date.
- Notes for excluded/duplicate/not indexed pages.

**Acceptance criteria:**

- The checklist lists all 16 subject calculator URLs.
- It has empty but explicit fields for GSC clicks, impressions, and indexed status.
- It tells developers not to infer index success from local build success.

---

### P0.5 Verify all generated pages have competitor-required SEO modules

**Objective:** Prevent accidental regressions in the hub + subject matrix pattern.

**Files:**

- Modify: `test/site.test.js`

**Required assertions for every subject calculator page:**

- Has `<title>` with subject + 2026.
- Has meta description.
- Has canonical URL under `https://apscorecalculator.store`.
- Has `data-calculator`.
- Has `data-study-plan`.
- Has FAQPage JSON-LD.
- Has BreadcrumbList JSON-LD.
- Has unofficial / independent / not College Board wording.
- Has at least 3 related calculator links.

**Acceptance criteria:**

- `npm run check` passes.
- Test failure message identifies the exact page and missing module.

---

## P1 — Do After P0, Before Aggressive SEO Push

### P1.1 Validate the 7 expanded subjects against Semrush

**Objective:** Confirm whether each newly added subject page deserves current priority.

**Research output file:**

- Create: `docs/research/ap-score-expanded-subject-keyword-validation.md`

**Subjects:**

- AP Physics 1
- AP Physics 2
- AP Macroeconomics
- AP Microeconomics
- AP Human Geography
- AP Computer Science Principles
- AP World History refresh

**Fields per subject:**

- Primary keyword.
- US volume.
- KD.
- Top 5 SERP competitors.
- Top competitor URL pattern.
- Whether page should remain index-priority, be de-emphasized, or be improved.

**Acceptance criteria:**

- Each of the 7 subjects has Semrush or explicitly marked fallback data.
- Any subject with weak evidence gets marked “keep live but not promotion priority” rather than deleted immediately.

---

### P1.2 Run fresh Keyword Gap and convert it into dev tasks

**Objective:** Turn competitor keyword gaps into concrete content/module requirements.

**Research output file:**

- Create: `docs/research/ap-score-keyword-gap-2026.md`

**Required competitor set:**

- `test-ninjas.com`
- `knowt.com`
- `gradgpt.com`
- `num8ers.com`
- `fiveable.me`
- `albert.io`

**Output fields:**

- Keyword.
- Volume.
- KD.
- Ranking competitor.
- Ranking URL.
- Our current URL.
- Gap type: missing page, weak module, FAQ gap, conversion-table gap, title/meta gap, internal-link gap.
- Dev action.

**Acceptance criteria:**

- At least 30 actionable keywords or all available low-KD opportunities if fewer.
- Each dev action points to an existing URL or a proposed page/module.

---

### P1.3 Top competitor UX teardown

**Objective:** Improve product quality beyond keyword matching.

**Research output file:**

- Create: `docs/research/ap-score-top-competitor-ux-teardown.md`

**Competitors:**

- Test Ninjas AP Score Calculators hub.
- Knowt AP Score Calculator hub.
- Fiveable AP Score Calculators page.
- Albert best exam score calculators / representative subject calculator.
- GradGPT AP calculator.

**Fields per competitor:**

- First-screen promise.
- Calculator input model.
- Result output model.
- “What score do I need” or target guidance.
- Conversion table / scoring explanation.
- FAQ/schema evidence.
- Trust/disclaimer language.
- CTA / monetization.
- Mobile UX notes.
- What we should copy structurally, not textually.
- What we should avoid.

**Acceptance criteria:**

- Produces at least 10 concrete design/content recommendations.
- Recommendations are mapped to P0/P1/P2 priority.

---

## P2 — Optional Growth / Polish

### P2.1 Remove unused v4 CSS if still present

**Objective:** Reduce CSS bloat and legacy confusion.

**Files:**

- Modify: `scripts/build.js` or CSS-generation source.
- Test: static check in `test/site.test.js`.

**Acceptance criteria:**

- No generated HTML depends on removed v4 classes.
- `npm run check` passes.
- Visual layout remains intact.

---

### P2.2 Monetization decision brief

**Objective:** Decide if and when to add monetization.

**File:**

- Create: `docs/product/ap-score-monetization-options.md`

**Options to evaluate:**

- Stay pure free utility until traffic appears.
- Add email capture after result.
- Add AP study resource affiliate/lead capture.
- Add display ads only after measurable organic traffic.
- Build practice-plan content later.

**Default recommendation:**

Do not add monetization in v6. Preserve speed, trust, and indexability first.

---

## 5. Recommended File Placement

Put this PRD and follow-up docs here:

```text
/root/ap-score-calculator/docs/prd/ap-score-calculator-v6-iteration-prd.md
/root/ap-score-calculator/docs/research/ap-score-calculator-competitor-gap-checklist.md
/root/ap-score-calculator/docs/research/ap-score-expanded-subject-keyword-validation.md
/root/ap-score-calculator/docs/research/ap-score-keyword-gap-2026.md
/root/ap-score-calculator/docs/research/ap-score-top-competitor-ux-teardown.md
/root/ap-score-calculator/docs/seo/current-index-checklist.md
/root/ap-score-calculator/docs/product/ap-score-monetization-options.md
```

This keeps product decisions inside the repo and lets developers implement from explicit docs rather than Telegram summaries.

---

## 6. Developer Handoff Summary

### Immediate development can start on:

1. P0.1 competitor gate checklist.
2. P0.2 score precision verification/fix.
3. P0.3 study-plan contradiction guard.
4. P0.4 current index checklist.
5. P0.5 SEO module regression tests.

### Research must continue before larger PRD freeze:

1. Full Keyword Gap export.
2. Current GSC/index check.
3. Expanded-subject keyword validation.
4. Top competitor UX teardown.
5. Monetization/CTA decision.

### Final decision

Current evidence supports a **v6 gated iteration PRD**. It does **not** support saying the competitor analysis is fully complete or omission-free.
