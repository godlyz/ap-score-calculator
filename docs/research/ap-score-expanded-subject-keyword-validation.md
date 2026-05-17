# AP Score Expanded Subject Keyword Validation

> Status: **completed as V8 P1 directional validation**  
> Created: 2026-05-17  
> Project: AP Score Calculator 2026  
> Source: Semrush Keyword Gap raw export plus public SERP/competitor discovery.

## Summary verdict

The 7 newer/zero-impression subject pages should stay live, but V8 should not over-promote all of them equally.

Priority order for P1 after P0 hardening:

1. **AP World History** — strong Semrush demand and multiple direct competitor URLs.
2. **AP Physics 1** — Semrush demand exists; improve after World if resources allow.
3. **AP Human Geography / AP Microeconomics / AP Macroeconomics / AP CSP** — direct competitor pages exist, but Semrush export did not expose strong keyword rows in the captured top set; keep live and lightly improve.
4. **AP Physics 2** — keep live but lower priority; no captured Semrush row and likely lower search demand than Physics 1.

## Subject validation table

### AP World History

- Current URL: `https://apscorecalculator.store/ap-world-history-score-calculator/`
- Semrush evidence:
  - `ap world calculator` — volume `6.6K`, KD `6`, missing.
  - `ap world score calculator` — volume `5.4K`, KD `6`, missing.
  - `ap world exam` — volume `2.9K`, KD `43`, missing; broader informational intent.
- Competitor URLs found:
  - Test Ninjas: `https://test-ninjas.com/ap-world-history-score-calculator`
  - Knowt: `https://knowt.com/exams/AP/AP-World-History_Modern/score-calculator`
  - Albert: `https://www.albert.io/blog/ap-world-history-score-calculator/`
  - NUM8ERS: `https://num8ers.com/score-calculator/ap-world-history-score-calc/`
- Recommendation: **P1-high**. Improve title/meta/H1, add target-score guidance, add official exam-format/source citations, and request indexing after URL Inspection is available.

### AP Computer Science Principles / AP CSP

- Current URL: `https://apscorecalculator.store/ap-csp-score-calculator/`
- Semrush evidence: no strong CSP row exposed in captured top Keyword Gap rows.
- Competitor URLs found:
  - Albert: `https://www.albert.io/blog/ap-computer-science-principles-score-calculator/`
  - Knowt likely has CSP route pattern under `knowt.com/exams/AP/.../score-calculator` if needed for manual verification.
- Recommendation: **P1-light**. Keep live, improve only after official exam-format verification. Do not make it a top hub link above AP World/Physics 1 unless GSC starts showing impressions.

### AP Physics 1

- Current URL: `https://apscorecalculator.store/ap-physics-1-score-calculator/`
- Semrush evidence:
  - `ap physics 1 score calculator` — volume `3.6K`, KD `15`, missing in both Semrush competitor batches.
- Competitor URLs found:
  - Albert: listed as AP® Physics 1 Score Calculator on Albert calculator directory.
  - Test Ninjas likely ranks for AP Physics calculators in the AP score calculator cluster.
- Recommendation: **P1-medium/high**. Good demand; improve after AP World or together with P0 subject-template modules.

### AP Physics 2

- Current URL: `https://apscorecalculator.store/ap-physics-2-score-calculator/`
- Semrush evidence: no captured Keyword Gap row in current export.
- Competitor URLs found:
  - Albert: listed as AP® Physics 2 Score Calculator on Albert calculator directory.
- Recommendation: **P2/watchlist**. Keep live; do not prioritize until GSC or Semrush shows demand.

### AP Macroeconomics

- Current URL: `https://apscorecalculator.store/ap-macroeconomics-score-calculator/`
- Semrush evidence: no captured Keyword Gap row in current export.
- Competitor URLs found:
  - Albert: `https://www.albert.io/blog/ap-macroeconomics-score-calculator/`
- Recommendation: **P1-light**. Improve if reusing the subject template is cheap; otherwise wait for GSC impressions.

### AP Microeconomics

- Current URL: `https://apscorecalculator.store/ap-microeconomics-score-calculator/`
- Semrush evidence: no captured Keyword Gap row in current export.
- Competitor URLs found:
  - NUM8ERS: `https://num8ers.com/score-calculator/ap-micro-score-calculator/`
- Recommendation: **P1-light**. Keep live and validate official scoring assumptions before heavy promotion.

### AP Human Geography

- Current URL: `https://apscorecalculator.store/ap-human-geography-score-calculator/`
- Semrush evidence: no captured Keyword Gap row in current export.
- Competitor URLs found:
  - Knowt: `https://knowt.com/exams/AP/AP-Human-Geography/score-calculator`
  - NUM8ERS: `https://num8ers.com/score-calculator/ap-human-geography-score-calculator/`
  - Albert: listed as AP® Human Geography Score Calculator on Albert calculator directory.
- Recommendation: **P1-light/medium**. Direct competitors exist; keep live, improve copy and internal links, then wait for indexing/performance signal.

## Implementation implication

For V8 P0, do not spend build time creating new subject pages. Use the current 16-page scope and improve:

- Hub exact-match routing.
- P0 visible pages with GSC impressions.
- Reusable subject modules that can also benefit AP World and Physics 1 without over-promoting every zero-impression page.

## Indexing gate

All 7 newer subject pages still require URL Inspection / request indexing once GSC access is available:

- AP World History
- AP CSP
- AP Physics 1
- AP Physics 2
- AP Macroeconomics
- AP Microeconomics
- AP Human Geography
