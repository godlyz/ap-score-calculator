# APSC v5 Copy System — APUSH Concise Page Copy + Shared Labels

Date: 2026-05-12
Task: t_064903e7
Project: AP Score Calculator / apscorecalculator.store
Scope: Content/copy handoff only. Do not deploy production. Do not replace port 3000.

---

## 1. Copy strategy

v5 should read like a calculator product, not an APUSH article.

The competitor reference should only influence interaction quality and information hierarchy:

- Fast calculator-first access.
- Clear result interpretation after inputs.
- One place for each idea.
- Short supporting reference content.

Do not copy or add competitor-style content blocks. Do not add extra benchmark tables, resource grids, fake trust proof, testimonials, or repeated score-band modules.

Primary page promise:

> Enter your practice-test section points, estimate your AP score, and get a study plan based on your weakest section.

Primary copy rule:

> The result panel explains the score. The dynamic study plan explains what to do next. Everything else is reference.

---

## 2. APUSH v5 page copy

### 2.1 Hero

Eyebrow:

APUSH Score Calculator 2026 · unofficial planning tool

H1:

APUSH Score Calculator 2026

Hero copy:

Enter MCQ, SAQ, DBQ, and LEQ points from a practice test to estimate your APUSH score and see what to study next.

Primary CTA:

Estimate my APUSH score

Secondary CTA:

See scoring assumptions

Trust line:

Free · Browser-local · No signup · Not affiliated with College Board

Mini dashboard labels:

- Estimated AP
- Composite
- Score range preview

Mini dashboard helper copy:

Your full score gap and study plan appear after you enter section scores.

Copy notes:

- Remove hero target cards.
- Do not show 3/4/5 gaps in the hero.
- The hero may show a small score-band marker, but the detailed interpretation belongs in the calculator result panel.

---

### 2.2 Calculator workspace

Input card kicker:

Enter scores

Input card heading:

Use your practice-test points

Input helper:

Enter raw points for each APUSH section. Leave a field blank if you do not have that section yet.

Field labels:

- MCQ correct
- SAQ points
- DBQ points
- LEQ points

Field helper labels:

- MCQ correct: 0–55
- SAQ points: 0–9
- DBQ points: 0–7
- LEQ points: 0–6

Input validation copy:

- Empty state: Enter at least one section score to generate an estimate.
- Above max: This section maxes out at {sectionMax} points. We capped it for the estimate.
- Below zero: Scores cannot be below 0. We reset this field to 0.
- Partial input note: This estimate is based on the sections you entered. Add the missing sections for a more useful plan.

Result panel title:

Your estimated result

Result panel empty copy:

Add your section points to see your estimated AP score, composite score, target gap, weakest section, and study plan.

Primary result labels:

- Estimated AP score
- Estimated composite
- Next target
- Target gap
- Best next focus
- Section diagnostics
- Dynamic study plan

Result confidence microcopy:

Unofficial estimate. Actual AP scores may differ by year, exam form, and official score-setting.

Privacy microcopy:

Your inputs are processed in your browser and are not stored by us.

---

### 2.3 Interpretation layer copy

This copy lives inside the result panel, not as a standalone section.

#### State: no input

Status sentence:

Enter your APUSH section scores to generate a result.

Target gap sentence:

Your target gap will appear after the calculator has enough information.

Weakest section sentence:

Your weakest section will be based on weighted score opportunity, not just the lowest raw score.

#### State: estimated AP 1–2

Status sentence:

You are currently in the estimated AP {score} range.

Target gap sentence:

Your first target is AP 3. You need about {gap} more estimated composite points to reach that range.

Focus sentence:

Start with {weakestSection}, because it has the largest realistic score opportunity in your current inputs.

Tone rule:

Use "build a passing-score path" language. Do not imply the student is failing permanently.

#### State: estimated AP 3

Status sentence:

You are currently in the estimated AP 3 range.

Target gap sentence:

Your next target is AP 4. You need about {gap} more estimated composite points to reach that range.

Focus sentence:

Stabilize the 3 first, then use {weakestSection} to push toward a 4.

#### State: estimated AP 4

Status sentence:

You are currently in the estimated AP 4 range.

Target gap sentence:

Your next target is AP 5. You need about {gap} more estimated composite points to reach that range.

Focus sentence:

The fastest path is usually one focused gain in {weakestSection}, or a split gain across {weakestSection} and {secondarySection}.

#### State: estimated AP 5 with low buffer

Status sentence:

You are in the estimated AP 5 range, but the buffer is still thin.

Target gap sentence:

Focus on protecting your 5 by adding buffer in {weakestSection}.

Focus sentence:

Reduce avoidable misses before chasing harder material.

#### State: strong estimated AP 5

Status sentence:

You are in a strong estimated AP 5 range.

Target gap sentence:

You do not need a higher score target. Your goal is to maintain timing and avoid preventable point loss.

Focus sentence:

Keep {weakestSection} warm while rotating mixed timed practice.

---

### 2.4 Section diagnostics copy

Section diagnostics title:

Where your score is leaking points

Intro copy:

These diagnostics compare each section by accuracy and weighted point opportunity. The weakest section is the best first place to look, not a final judgment.

Section row labels:

- Raw points
- Accuracy
- Weighted contribution
- Estimated points left

Weakest badge:

Best next focus

Strength badge:

Current strength

Secondary badge:

Second focus

Tooltip / helper copy:

A large section can matter more even if the raw score looks higher. The plan ranks sections by weighted opportunity and accuracy together.

---

### 2.5 Dynamic study plan copy

Component title:

Dynamic study plan

Empty state title:

Your study plan will appear here

Empty state copy:

Enter MCQ, SAQ, DBQ, and LEQ scores to see your weakest section, target gap, and 2-week / 4-week / 8-week plan.

Plan intro:

This plan uses your current score estimate and section diagnostics. Re-enter new practice scores after each timed set to update it.

Gain options title:

Fastest improvement options

Gain option label patterns:

- Option A: +{points} {sectionLabel} point(s) → about +{gain} composite points
- Option B: +{points} {sectionLabel} point(s) → about +{gain} composite points
- Split option: +{pointsA} {sectionA} + {pointsB} {sectionB} → about +{gain} composite points

Close-gap label:

Likely enough to cross the estimated target before buffer.

Build-toward label:

Not enough by itself, but useful progress toward the target.

Retest nudge:

After one timed practice set, enter the new scores and check whether the gap changed.

Variant tabs:

- 2 weeks
- 4 weeks
- 8 weeks

2-week title:

2-week sprint

2-week summary:

Use this when the exam is close or your gap is small. Focus on the one section most likely to move the estimate.

4-week title:

4-week rebuild

4-week summary:

Use this when you have time for targeted drills, one retest cycle, and a second weak section.

8-week title:

8-week system

8-week summary:

Use this when the gap is large or you need a full prep structure before timed exam practice.

---

### 2.6 Reference accordion group

This group replaces separate long sections.

Group heading:

Scoring reference

Group intro:

Use these details when you want to understand the estimate. They should not distract from the calculator result.

Accordion 1 title:

Estimated APUSH composite ranges

Accordion 1 intro:

These ranges are unofficial estimates for planning. Official AP score cutoffs can vary.

Table labels:

- Estimated AP score
- Estimated composite range
- How to read it

Table row copy:

- AP 5: High-score estimate. Keep buffer because yearly cutoffs can move.
- AP 4: Strong estimate. Use the study plan if you are close to the AP 5 boundary.
- AP 3: Passing-score estimate. Build consistency before pushing higher.
- AP 2: Below the usual passing target. Focus on the largest weak section first.
- AP 1: Diagnostic baseline. Start with core content and short practice sets.

Accordion 2 title:

How APUSH scoring works

Accordion 2 copy:

APUSH uses four sections: MCQ, SAQ, DBQ, and LEQ. This calculator converts each section into its estimated weighted share, adds the weighted points, then maps the composite to an estimated AP 1–5 score.

Formula bullets:

- MCQ: 55 questions, estimated 40% of the score.
- SAQ: 9 points, estimated 20% of the score.
- DBQ: 7 points, estimated 25% of the score.
- LEQ: 6 points, estimated 15% of the score.

Optional generated drawer title:

Your math

Optional generated drawer intro:

This breakdown uses the scores you entered.

Do not use a hardcoded worked example. If a math drawer exists, it must be generated from the user's current inputs.

Accordion 3 title:

2026 APUSH exam format

Accordion 3 intro:

Use this as a quick format reminder. Always check official College Board materials for exam-day rules.

Exam format row copy:

- MCQ: 55 stimulus-based questions.
- SAQ: 3 short-answer questions.
- DBQ: 1 document-based question.
- LEQ: 1 long essay question.

Bluebook note:

APUSH is administered digitally in Bluebook. Practice typing DBQ and LEQ responses under time limits, and complete the Bluebook preview before exam day.

Accordion 4 title:

Methodology and assumptions

Accordion 4 copy:

This calculator is an independent planning tool. It uses public exam structure, historical scoring patterns, and transparent assumptions to estimate a score range. It is not an official College Board conversion table and does not guarantee any AP result, college credit, or placement outcome.

Last updated line:

Last updated: {lastUpdated}

---

### 2.7 Compact FAQ

Use one FAQ section only. FAQ schema must match these visible questions.

FAQ heading:

APUSH score calculator FAQ

FAQ intro:

Short answers for using the calculator safely and realistically.

Q1: Is this APUSH score calculator official?

A1: No. This is an independent, unofficial planning tool. It is not affiliated with or endorsed by College Board, and it cannot guarantee your official AP score.

Q2: How accurate is the APUSH score estimate?

A2: It is best used as a planning estimate. The calculator uses transparent APUSH section weights and estimated cutoffs, but official score-setting can vary by year and exam form.

Q3: What score do I need for a 5 on APUSH?

A3: Enter your MCQ, SAQ, DBQ, and LEQ points to see your estimated gap to AP 5. If you are close, build extra buffer instead of aiming for the exact cutoff.

Q4: What should I study after I get my result?

A4: Use the dynamic study plan. It identifies the weakest section from your inputs and gives 2-week, 4-week, and 8-week options based on your target gap.

Q5: Does this calculator store my scores?

A5: No. Score inputs are processed in your browser and are not stored by this site. Do not send official score reports, student IDs, or private account information.

Q6: Why does my result differ from another calculator?

A6: Different calculators may use different cutoff assumptions or weighting models. Treat any unofficial calculator as a study-planning tool, not an official score report.

---

### 2.8 Related calculators

Heading:

Related AP calculators

Intro copy:

Studying more than one AP subject? Use the same calculator-first workflow for other exams.

Primary link:

All AP score calculators

Subject link pattern:

{shortName} calculator

---

### 2.9 Footer / legal copy

Footer disclaimer:

AP® and Advanced Placement® are trademarks registered by College Board. College Board is not affiliated with, and does not endorse, this website or calculator.

Privacy footer:

Calculator inputs are processed locally in your browser. This site does not require accounts.

Footer links:

- Privacy Policy
- Terms of Use
- Disclaimer
- Contact

---

## 3. Copy to remove from v4 APUSH

Remove or replace these visible copy patterns:

- "See the APUSH score bands before you interpret the estimate"
- "APUSH points do not all move the estimate the same way" as a standalone section heading
- "What score do I need?" as a standalone static interpretation section
- "What to practice next: APUSH Study Resources — Use These With the Calculator"
- Static resource cards with placeholder links
- "3-Month APUSH Study Plan" as a static page block
- Static recommendation cards: Weak MCQ / Weak SAQ / Weak DBQ / Weak LEQ
- Hardcoded worked example using 45 / 7 / 5 / 4
- Any duplicate FAQ heading after the compact FAQ
- Any benchmark table that duplicates target 3 / 4 / 5 advice

Developer note:

The ideas may reappear only as dynamic result-panel content, generated from the user's current inputs.

---

## 4. Developer-ready copy keys

Recommended key namespace: `copy.v5.subjectPage` and `copy.v5.studyPlan`.

### 4.1 Page keys

```js
copy.v5.subjectPage = {
  hero: {
    eyebrow: '{shortName} Score Calculator 2026 · unofficial planning tool',
    h1: '{title}',
    body: 'Enter section points from a practice test to estimate your {shortName} score and see what to study next.',
    primaryCta: 'Estimate my {shortName} score',
    secondaryCta: 'See scoring assumptions',
    trustLine: 'Free · Browser-local · No signup · Not affiliated with College Board',
    miniDashboardHelper: 'Your full score gap and study plan appear after you enter section scores.'
  },
  calculator: {
    kicker: 'Enter scores',
    heading: 'Use your practice-test points',
    helper: 'Enter raw points for each section. Leave a field blank if you do not have that section yet.',
    resultTitle: 'Your estimated result',
    emptyResult: 'Add your section points to see your estimated AP score, composite score, target gap, weakest section, and study plan.',
    unofficialNote: 'Unofficial estimate. Actual AP scores may differ by year, exam form, and official score-setting.',
    privacyNote: 'Your inputs are processed in your browser and are not stored by us.'
  },
  diagnostics: {
    title: 'Where your score is leaking points',
    intro: 'These diagnostics compare each section by accuracy and weighted point opportunity.',
    rawPoints: 'Raw points',
    accuracy: 'Accuracy',
    weightedContribution: 'Weighted contribution',
    estimatedPointsLeft: 'Estimated points left',
    weakestBadge: 'Best next focus',
    strengthBadge: 'Current strength',
    secondaryBadge: 'Second focus'
  },
  reference: {
    heading: 'Scoring reference',
    intro: 'Use these details when you want to understand the estimate. They should not distract from the calculator result.',
    rangesTitle: 'Estimated {shortName} composite ranges',
    scoringTitle: 'How {shortName} scoring works',
    formatTitle: '2026 {shortName} exam format',
    methodTitle: 'Methodology and assumptions',
    methodCopy: 'This calculator is an independent planning tool. It uses public exam structure, historical scoring patterns, and transparent assumptions to estimate a score range. It is not an official College Board conversion table and does not guarantee any AP result, college credit, or placement outcome.',
    lastUpdated: 'Last updated: {lastUpdated}'
  },
  faq: {
    heading: '{shortName} score calculator FAQ',
    intro: 'Short answers for using the calculator safely and realistically.'
  },
  related: {
    heading: 'Related AP calculators',
    intro: 'Studying more than one AP subject? Use the same calculator-first workflow for other exams.',
    allCalculators: 'All AP score calculators',
    subjectPattern: '{shortName} calculator'
  }
}
```

### 4.2 APUSH override keys

```js
copy.v5.apush = {
  hero: {
    eyebrow: 'APUSH Score Calculator 2026 · unofficial planning tool',
    h1: 'APUSH Score Calculator 2026',
    body: 'Enter MCQ, SAQ, DBQ, and LEQ points from a practice test to estimate your APUSH score and see what to study next.',
    primaryCta: 'Estimate my APUSH score',
    secondaryCta: 'See scoring assumptions'
  },
  inputs: {
    mcq: 'MCQ correct',
    saq: 'SAQ points',
    dbq: 'DBQ points',
    leq: 'LEQ points',
    helper: 'Use raw practice-test points: MCQ 0–55, SAQ 0–9, DBQ 0–7, LEQ 0–6.'
  },
  examFormat: {
    intro: 'Use this as a quick format reminder. Always check official College Board materials for exam-day rules.',
    bluebookNote: 'APUSH is administered digitally in Bluebook. Practice typing DBQ and LEQ responses under time limits, and complete the Bluebook preview before exam day.'
  }
}
```

### 4.3 Study-plan keys

See `v5-subject-study-plan-copy.md` for the full all-subject copy templates, state copy, and subject advice map.

---

## 5. Acceptance criteria for this copy system

### Page de-duplication

- APUSH page has one hero, one calculator workspace, one reference accordion group, one compact FAQ, one related-calculators section, and footer.
- APUSH page does not include standalone score-band dashboard copy after the calculator.
- APUSH page does not include a standalone section-weighting chart section.
- APUSH page does not include duplicate FAQ sections.
- APUSH page does not include static resource cards or placeholder resource links.
- APUSH page does not include hardcoded 45 / 7 / 5 / 4 worked-example copy outside a generated user-input math drawer.

### Dynamic plan copy

- Dynamic study-plan copy appears inside the result panel.
- The plan references the actual predicted score, target score, target gap, weakest section, secondary section, and feasible gain options.
- The page never shows generic static APUSH study advice as the main recommendation.
- Score 5 copy uses protect / maintain language and never promises a score above 5.

### All-subject safety

- APUSH-specific terms (DBQ, LEQ, SAQ, APUSH, Bluebook APUSH note) do not appear on non-APUSH pages unless that subject data actually uses them.
- AP Lang and AP Lit essay labels stay subject-specific.
- AP Bio, AP Chem, AP Calc AB, AP Stats, AP Gov, and AP Psych use MCQ/FRQ or their own section labels, not APUSH language.

### Trust / compliance

- Every subject page includes visible unofficial / not affiliated with College Board language.
- Copy does not claim official cutoffs, promised scores, college credit promises, or exact accuracy.
- Copy does not invent user counts, testimonials, media mentions, or endorsements.
- Browser-local privacy copy remains visible near the calculator result.

### SEO / FAQ

- One visible FAQ section per subject page.
- FAQ schema matches the visible FAQ questions.
- Meta title and description can keep existing SEO intent, but page body should not repeat SEO filler blocks.

---

## 6. Implementation note for downstream dev

Use this file as the copy source for APUSH v5 IA and shared subject page labels. Use `v5-subject-study-plan-copy.md` as the source for dynamic plan strings and per-subject advice.

This task changed content artifacts only. It did not modify production code or deploy anything.
