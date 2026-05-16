# AP Score Calculator Competitor Gap Checklist

> Status: **open / gated**  
> Project: AP Score Calculator 2026  
> Repo: `/root/ap-score-calculator`  
> Production: `https://apscorecalculator.store`  
> Created: 2026-05-16  
> Purpose: make competitor-research omissions explicit before anyone claims the competitor analysis is “complete / no遗漏”.

## Source reports

- `/root/reports/ap-score-calculator-2026-competitor-analysis-2026-05-08.md`
- `/root/reports/ap-score-calculator-semrush-report-2026-05-14.md`
- `/root/reports/ap-score-calculator-data-gathering-2026-05-14.md`
- `/root/ap-score-calculator/docs/prd/ap-score-calculator-v6-iteration-prd.md`
- Production verification on 2026-05-16:
  - `https://apscorecalculator.store/` → 200
  - `https://apscorecalculator.store/ap-score-calculator-2026/` → 200
  - `https://apscorecalculator.store/sitemap.xml` → 200, 22 URLs
  - `https://apscorecalculator.store/robots.txt` → 200

## Hard gate rule

**No full growth PRD, no aggressive SEO roadmap, and no “竞品分析无遗漏” claim until the remaining GSC/index blocker is closed:**

1. **Full Keyword Gap export**: completed 2026-05-16 for `apscorecalculator.store` vs `test-ninjas.com`, `knowt.com`, `gradgpt.com`, `num8ers.com`, `fiveable.me`, `albert.io`; see `semrush-keyword-gap-summary-2026-05-16.md`.
2. **Current GSC / Google index check** for the live 22-URL production sitemap: completed for Pages indexed/excluded examples and Performance page/query rows on 2026-05-16; remaining URL Inspection canonical detail is follow-up.

A limited, competitor-gated iteration PRD may still guide low-risk fixes, but it must be labeled as gated.

## Current production baseline checked before writing this checklist

The site is not APUSH-only. Production sitemap currently includes:

- Home: `https://apscorecalculator.store/`
- Hub: `https://apscorecalculator.store/ap-score-calculator-2026/`
- Subject calculators: 16 pages
- Legal/support pages: privacy, terms, disclaimer, contact

This corrects the outdated statement in the Semrush report that “we currently only have APUSH one calculator.” That report remains useful for keyword and competitor evidence, but its current-site inventory is stale.

## Competitor gap checklist

### Gap 1 — Full Semrush Keyword Gap export

- **Owner:** seo / 凌搜
- **Status:** closed for domain-level Keyword Gap discovery — completed 2026-05-16 via `sem.3ue.co` automation. Raw export: `semrush-keyword-gap-raw-2026-05-16.json`; prioritized summary: `semrush-keyword-gap-summary-2026-05-16.md`.
- **Priority:** P0 blocker for full growth PRD
- **Evidence already available:** Semrush Keyword Overview and Organic Research data exist for core keywords and selected competitors.
- **What was captured:** Semrush Keyword Gap for target `apscorecalculator.store` against the required competitor set, run in two UI batches because Semrush accepts three competitors per run. Captured rows: missing 100 raw rows, weak 18 raw rows, untapped 100 raw rows.
- **Required competitor set:**
  - `test-ninjas.com`
  - `knowt.com`
  - `gradgpt.com`
  - `num8ers.com`
  - `fiveable.me`
  - `albert.io`
- **Required output fields:**
  - Keyword
  - US volume
  - KD
  - Ranking competitor
  - Ranking competitor URL
  - Our current URL, if any
  - Gap type: missing page, weak page, FAQ gap, conversion-table gap, title/meta gap, internal-link gap, authority/backlink gap
  - Proposed action: improve existing page, add module, create new page, de-prioritize, or watchlist
- **Impact if left open:** we can harden current pages, but cannot confidently choose the next SEO expansion sequence.
- **Acceptance criteria:** met for domain-level keyword discovery; summary contains 35 missing, 9 weak, and 17 relevant untapped prioritized opportunities. URL-level competitor landing-page mapping remains a follow-up because the captured Keyword Gap table exposed positions by domain, not competitor URLs.

### Gap 2 — Current GSC / Google index state

- **Owner:** seo / ops
- **Status:** closed for requested checklist fields available in GSC UI — Pages indexed/excluded examples and Performance clicks/impressions were captured on 2026-05-16 and written to `docs/seo/current-index-checklist.md`. Remaining follow-up: per-URL Google-selected canonical requires URL Inspection/API.
- **Priority:** P0 blocker for “index-ready” claims
- **Evidence already available:** production sitemap/robots/canonical are reachable; Semrush previously saw a small number of early keywords, but this does not prove current index coverage.
- **What is missing:** Google Search Console status for all current sitemap URLs.
- **Required output fields:**
  - URL
  - GSC indexed status
  - Last crawl date
  - Query impressions
  - Clicks
  - Exclusion reason, if any
  - Sitemap discovered status
  - Canonical selected by Google
- **Fallback if GSC is unavailable:** public `site:` checks can be recorded as weak evidence only; do not treat them as authoritative.
- **Impact if left open:** cannot know whether poor performance is due to ranking, indexing delay, crawl exclusion, canonical selection, or sitemap issue.
- **Acceptance criteria:** met for indexed / impressions / clicks / excluded reason fields exposed by GSC Pages + Performance. URL Inspection canonical remains a non-blocking enrichment task.

### Gap 3 — Top competitor UX teardown for current 16-subject scope

- **Owner:** content + design + seo
- **Status:** open
- **Priority:** P1, needed before major visual/content redesign
- **Evidence already available:** APUSH-focused teardown and broad competitor notes exist.
- **What is missing:** current-version teardown across hub and representative subject pages, not just APUSH.
- **Required competitors:**
  - Test Ninjas AP Score Calculators hub
  - Knowt AP Score Calculator hub
  - Fiveable AP Score Calculators page
  - Albert calculator/resource pages
  - GradGPT AP calculator
- **Required teardown fields:**
  - First-screen promise
  - Calculator input model
  - Result output model
  - Target-score / “what score do I need” guidance
  - Conversion table / scoring explanation
  - FAQ/schema evidence
  - Trust/disclaimer language
  - CTA / monetization
  - Mobile UX notes
  - Internal linking pattern
  - What to copy structurally, not textually
  - What to avoid
- **Impact if left open:** development may improve pages technically but still miss user-perceived competitive quality.
- **Acceptance criteria:** at least 10 concrete recommendations mapped to P0/P1/P2.

### Gap 4 — Keyword validation for expanded subjects

- **Owner:** seo
- **Status:** open
- **Priority:** P1 before promotion / internal-link emphasis
- **Evidence already available:** many original high-priority subjects have Semrush volume/KD data.
- **What is missing:** refreshed validation for the expanded 16-subject set, especially pages added after earlier reports.
- **Subjects needing validation or refresh:**
  - AP Physics 1
  - AP Physics 2
  - AP Macroeconomics
  - AP Microeconomics
  - AP Human Geography
  - AP Computer Science Principles / AP CSP
  - AP World History refresh
- **Required output fields:**
  - Primary keyword
  - US volume
  - KD
  - Top 5 SERP competitors
  - Top competitor URL pattern
  - Whether current page should remain index-priority, be de-emphasized, or be improved
- **Impact if left open:** these pages can remain live, but should not be treated as proven priority pages.
- **Acceptance criteria:** each subject has Semrush data or clearly labeled fallback/public evidence.

### Gap 5 — Similarweb second-pass details

- **Owner:** seo / ops
- **Status:** open
- **Priority:** P2 for strategy confidence, not a blocker for current static MVP
- **Evidence already available:** public Similarweb details for Fiveable and some competitor references.
- **What is missing:** clean full exports for competitor traffic channels, countries, trends, and referral/search mix.
- **Required competitors:** Test Ninjas, Knowt, Fiveable, Albert, GradGPT, College Transitions if available.
- **Impact if left open:** channel and geo assumptions remain directional, not final.
- **Acceptance criteria:** each competitor has channel split, top countries, monthly trend, and confidence label; unavailable items are explicitly marked.

### Gap 6 — Monetization / CTA model

- **Owner:** product + finance + ops
- **Status:** open
- **Priority:** P2; do not add monetization before trust/indexing are stable
- **Evidence already available:** competitor notes mention practice tests, study resources, accounts, ads, school/demo flows.
- **What is missing:** a decision brief for our site’s own CTA path.
- **Options to evaluate:**
  - Stay pure free utility until traffic appears
  - Add email capture after result
  - Add AP study-resource affiliate links
  - Add display ads only after measurable organic traffic
  - Build practice-plan content later
- **Default recommendation:** keep v6 as a free, fast, browser-local utility; delay monetization until GSC shows real impressions and pages earn trust.
- **Impact if left open:** acceptable for v6, but do not design pricing, ads, or lead capture modules yet.
- **Acceptance criteria:** `docs/product/ap-score-monetization-options.md` or equivalent decision brief exists before monetization work.

## Subject URL inventory for current competitor/index checks

- `https://apscorecalculator.store/apush-score-calculator/`
- `https://apscorecalculator.store/ap-lang-score-calculator/`
- `https://apscorecalculator.store/ap-chemistry-score-calculator/`
- `https://apscorecalculator.store/ap-calculus-ab-score-calculator/`
- `https://apscorecalculator.store/ap-biology-score-calculator/`
- `https://apscorecalculator.store/ap-gov-score-calculator/`
- `https://apscorecalculator.store/ap-statistics-score-calculator/`
- `https://apscorecalculator.store/ap-psychology-score-calculator/`
- `https://apscorecalculator.store/ap-lit-score-calculator/`
- `https://apscorecalculator.store/ap-world-history-score-calculator/`
- `https://apscorecalculator.store/ap-csp-score-calculator/`
- `https://apscorecalculator.store/ap-physics-1-score-calculator/`
- `https://apscorecalculator.store/ap-physics-2-score-calculator/`
- `https://apscorecalculator.store/ap-macroeconomics-score-calculator/`
- `https://apscorecalculator.store/ap-microeconomics-score-calculator/`
- `https://apscorecalculator.store/ap-human-geography-score-calculator/`

## Current recommended next actions

1. Fill GSC status into `docs/seo/current-index-checklist.md`.
2. Use `semrush-keyword-gap-summary-2026-05-16.md` to prioritize page/module work; optionally enrich top 20 keywords with URL-level SERP/competitor landing pages.
3. Create `docs/research/ap-score-expanded-subject-keyword-validation.md` for the 7 expanded subjects.
4. Create `docs/research/ap-score-top-competitor-ux-teardown.md` before another large design pass.
5. Keep monetization out of v6 unless Ningge explicitly chooses a CTA strategy.
