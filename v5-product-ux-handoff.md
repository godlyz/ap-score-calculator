# APSC v5 Product UX Handoff — De-duplicated all-subject calculator + dynamic study plans

Date: 2026-05-12
Task: t_de47d42b
Project: AP Score Calculator / apscorecalculator.store
Primary page to redesign first: /apush-score-calculator/
Production instruction: Do not deploy production. Do not replace the user-facing port 3000 until QA GO and user preview handoff.

---

## 1. Redesign decision

The v4 APUSH page should not be patched by adding more benchmark-inspired modules. The user rejected v4 because the reference site was treated as content to copy instead of inspiration for interaction quality.

v5 must rebuild the product UX around one calculator-first flow:

1. Calculator core
2. Interpretation layer
3. Dynamic study plan
4. Methodology / disclaimer
5. Compact SEO FAQ

The page should feel like a useful score-planning tool, not a long article with repeated dashboards, benchmark tables, and static resource cards.

Hard acceptance criteria from user feedback:

- Borrow interaction patterns and clarity from competitors, not their content blocks.
- Audit the whole page for repetition before implementing.
- Study guidance must be generated dynamically from the user's score inputs.
- The dynamic study-plan component must work for every subject page, not only APUSH.

---

## 2. Current v4 UX problem summary

Current APUSH v4 has too many repeated representations of the same few ideas:

- Score bands appear as hero strip, standalone dashboard, conversion table, result-panel cards, cutoff bars, and benchmark table.
- Target gaps appear in multiple dashboard strips instead of being part of the user's result.
- Section weights appear in the result panel, a standalone chart, and scoring explanation.
- Methodology / confidence language appears in the result panel, a note card, and footer.
- Study advice appears as static text, static recommendation cards, and resource placeholders instead of using the actual input scores.

The v5 UX must make one place responsible for each information type:

| Information type | v5 canonical location |
|---|---|
| User inputs | Calculator core |
| Estimated AP score + composite | Result summary inside calculator workspace |
| Gap to 3 / 4 / 5 | Interpretation layer inside result panel |
| Section strengths / weakest section | Dynamic section diagnostics inside result panel |
| What to study next | Dynamic study plan inside result panel |
| Conversion cutoffs | One collapsed reference table |
| Exam format | One compact accordion |
| Methodology / unofficial disclaimer | One short trust note + footer/legal pages |
| SEO questions | One compact FAQ section |

---

## 3. Unified all-subject calculator experience

Every subject page should share the same product skeleton. APUSH can have subject-specific labels and exam-format content, but it must not have a separate one-off UX that other subjects cannot reuse.

Target page flow:

```text
1. Hero
   - One-sentence subject promise
   - CTA: Estimate my score
   - Small mini-preview only; no full target-card system here

2. Calculator workspace
   - Left / top: score inputs
   - Right / below: unified dynamic result panel
   - Result panel contains:
     a. Estimated AP score
     b. Composite score
     c. Gap to next target and optional gap to 3/4/5
     d. Section diagnostics
     e. Dynamic study plan with 2-week / 4-week / 8-week variants

3. Reference drawer / accordion group
   - Estimated conversion table
   - How scoring works
   - Exam format help

4. One-line methodology / unofficial note

5. Compact SEO FAQ

6. Related calculators

7. Footer
```

Design implication:

- The calculator workspace is the page's product center.
- Everything after the calculator must support, not compete with, the calculator.
- No repeated score-band or benchmark modules below the fold.

---

## 4. Required all-subject dynamic study-plan model

### 4.1 Inputs the component receives

The study-plan component should be generated from the same subject data already used by the calculator:

```js
subject = {
  slug,
  name,
  shortName,
  sections: [
    { key, label, max, weight }
  ],
  cutoffs,
  confidence,
  riskNote,
  structure,
  assumptions,
  compositeModel?
}

values = {
  [section.key]: rawPointValue
}

result = calculateScore(subject.slug, values)
```

No APUSH-only assumptions should be baked into the shared algorithm. APUSH copy can be provided through subject-specific section advice maps.

### 4.2 Normalize each section

For every section:

```text
raw = clamped input value
max = section.max
weight = section.weight
accuracy = raw / max
weightedEarned = normalized contribution used by calculator
weightedMax = section's max possible contribution
weightedLost = weightedMax - weightedEarned
```

For `weighted-100` subjects like APUSH:

```text
weightedMax = section.weight
weightedEarned = (raw / max) * section.weight
weightedLost = section.weight - weightedEarned
```

For other subjects:

```text
rawWeightedEarned = raw * section.weight
rawWeightedMax = section.max * section.weight
weightedEarned = normalized to displayMaxComposite if the score engine scales raw scores
weightedMax = normalized max contribution
weightedLost = weightedMax - weightedEarned
```

Implementation note: To avoid drift from `calculateComposite`, put this logic in a shared helper such as `sectionDiagnostics(subject, values)` and unit-test it against the score engine.

### 4.3 Identify weakest section

The weakest section should not simply be the lowest raw points. Use a two-signal ranking:

```text
weaknessScore = (weightedLost * 0.65) + ((1 - accuracy) * weightedMax * 0.35)
```

Then sort descending.

Why:

- `weightedLost` shows where the score has the largest realistic composite opportunity.
- `accuracy` prevents a large section from always winning if the student is already strong there.

Output:

```js
weakest = diagnostics[0]
secondary = diagnostics[1]
strength = highest accuracy section
```

### 4.4 Calculate target gap

Choose the target as follows:

```text
If current AP score is 1 or 2 -> primary target = 3
If current AP score is 3 -> primary target = 4
If current AP score is 4 -> primary target = 5
If current AP score is 5 -> primary target = protect 5 / build buffer
```

Gap:

```text
gap = subject.cutoffs[target] - result.composite
safeGap = max(0, rounded gap)
bufferGoal = gap + confidenceBuffer
```

Confidence buffer:

```text
high confidence: +2 composite points
medium confidence: +4 composite points
low confidence: +6 composite points
```

For score 5:

```text
protectGap = result.composite - subject.cutoffs[5]
if protectGap < buffer => focus on protecting weakest section
else focus on exam pacing and maintenance
```

### 4.5 Convert the gap into section-improvement options

For each section, calculate how many raw points would be needed to close the target gap if the student improved only that section.

For APUSH weighted-100:

```text
rawPointsNeeded = ceil(gap / (section.weight / section.max))
rawPointsAvailable = section.max - raw
feasibleGain = min(rawPointsNeeded, rawPointsAvailable)
compositeGainFromFeasible = feasibleGain * (section.weight / section.max)
```

For scaled raw-score subjects:

```text
rawPointCompositeValue = normalized section contribution per raw point
rawPointsNeeded = ceil(gap / rawPointCompositeValue)
rawPointsAvailable = section.max - raw
```

Output concrete options:

```text
Option A: +N raw points in weakest section -> +X composite
Option B: +N raw points in secondary section -> +Y composite
Option C: split plan, e.g. +A in weakest +B in secondary -> close gap with lower pressure
```

Rules:

- Never suggest more raw points than the section has available.
- If one section cannot close the gap alone, present a split option.
- If the target gap is too large for short-term improvement, label the plan as "build toward target" rather than promising a score jump.

### 4.6 Study-plan time variants

The component must render 2-week, 4-week, and 8-week variants.

Each variant uses the same diagnostics but changes intensity and scope.

#### 2-week plan

Use when:

- Exam is soon
- Student is near cutoff
- Gap is small or moderate

Structure:

```text
2-week sprint
Week 1: Fix the weakest section's highest-yield scoring habit.
Week 2: Mixed timed practice + retest calculator inputs.
Daily: 25-45 minutes, one measurable task.
```

#### 4-week plan

Use when:

- Student has time for one retest cycle
- Gap is moderate

Structure:

```text
4-week rebuild
Week 1: Diagnose misses and rebuild weakest section fundamentals.
Week 2: Targeted drills for weakest section.
Week 3: Add secondary section and mixed practice.
Week 4: Full practice set, recalculate, adjust.
```

#### 8-week plan

Use when:

- Gap is large
- Student wants a structured prep path
- Current score is 1-2 or low 3

Structure:

```text
8-week system
Weeks 1-2: Core content / skill foundation.
Weeks 3-4: Section-specific drills.
Weeks 5-6: Mixed timed practice.
Week 7: Full practice exam and calculator retest.
Week 8: Buffer building and exam-day pacing.
```

### 4.7 Result states and copy rules

The study plan should adapt to score state:

| State | Condition | Primary message |
|---|---|---|
| No input | No values entered | "Enter scores to generate a plan." |
| Below 3 | predicted 1-2 | "Build a passing-score path first." |
| At 3 | predicted 3 | "Stabilize the 3, then push the best section for a 4." |
| At 4 | predicted 4 | "Close the 5 gap with targeted section gains." |
| At 5 but low buffer | predicted 5 and buffer under threshold | "Protect your 5 by building buffer in the weakest section." |
| Strong 5 | predicted 5 and buffer >= threshold | "Maintain timing and reduce avoidable misses." |

Use plain student-facing language. Avoid generic AI phrases like "unlock your potential", "revolutionize", or "seamless".

---

## 5. Subject-specific adaptation rules

The shared component should use a subject advice map. It should not hardcode APUSH-only content into the renderer.

Recommended data shape:

```js
const sectionAdvice = {
  apush: {
    mcq: {
      skill: 'stimulus reading + content recall',
      drill: 'Do 20 stimulus-based MCQs, tag every miss by time period and skill.',
      gainHabit: 'Review why each wrong answer is wrong, not just the right answer.'
    },
    saq: {
      skill: 'concise evidence points',
      drill: 'Write 3 SAQs with a 12-minute timer and score each subpart.',
      gainHabit: 'Answer the command verb first, then attach one precise evidence phrase.'
    },
    dbq: {
      skill: 'thesis, document use, sourcing, outside evidence',
      drill: 'Rewrite one DBQ thesis and group documents before writing the full essay.',
      gainHabit: 'Secure thesis + document use before chasing complexity.'
    },
    leq: {
      skill: 'argument structure + historical evidence',
      drill: 'Outline 3 LEQ prompts before writing one timed response.',
      gainHabit: 'Use claim -> evidence -> reasoning paragraphs.'
    }
  },
  'ap-lang': {
    mcq: { skill: 'passage reading + rhetorical choices', drill: 'Review missed MCQs by question type, then redo a short passage set.' },
    synthesis: { skill: 'source integration', drill: 'Plan one synthesis essay with source pairings before writing.' },
    rhetorical: { skill: 'rhetorical analysis', drill: 'Annotate choices and explain effect before drafting.' },
    argument: { skill: 'claim + evidence + reasoning', drill: 'Outline claims and evidence for 3 prompts.' }
  },
  'ap-lit': {
    mcq: { skill: 'close reading', drill: 'Practice one poetry or prose passage and explain every missed inference.' },
    poetry: { skill: 'poetic analysis', drill: 'Write thesis + 2 evidence bullets for one poem.' },
    prose: { skill: 'narrative technique analysis', drill: 'Annotate character, setting, and diction choices before writing.' },
    argument: { skill: 'literary evidence recall', drill: 'Build evidence banks for 2 works you know well.' }
  },
  'ap-biology': {
    mcq: { skill: 'concept application + data reading', drill: 'Do mixed MCQs and tag misses by unit and graph/table skill.' },
    frq: { skill: 'claim-evidence-reasoning responses', drill: 'Write short FRQ answers and compare against rubric verbs.' }
  },
  'ap-chemistry': {
    mcq: { skill: 'concept + calculation accuracy', drill: 'Drill missed calculation types and write units on every step.' },
    frq: { skill: 'multi-step explanations and lab reasoning', drill: 'Complete one long FRQ and one short FRQ, then score by rubric point.' }
  },
  'ap-calculus-ab': {
    mcq: { skill: 'procedure recognition + pacing', drill: 'Do calculator/no-calculator mixed sets and mark slow problem types.' },
    frq: { skill: 'setup, notation, and justification', drill: 'Write full FRQ solutions with units, intervals, and reasoning.' }
  },
  'ap-statistics': {
    mcq: { skill: 'concept recognition + interpretation', drill: 'Do MCQs by unit and write why each distractor is wrong.' },
    frq: { skill: 'conditions, calculations, and contextual conclusions', drill: 'Practice FRQs with full sentences and checked conditions.' }
  },
  'ap-gov': {
    mcq: { skill: 'foundational concepts + scenario reading', drill: 'Drill missed concepts and connect each to a required document or case.' },
    frq: { skill: 'task verbs and evidence use', drill: 'Write one argument FRQ outline and one concept application response.' }
  },
  'ap-psychology': {
    mcq: { skill: 'term recognition + scenario application', drill: 'Practice vocabulary-in-context MCQs and explain the scenario clue.' },
    frq: { skill: 'definition + application writing', drill: 'Write concise definitions and apply each term to the prompt.' }
  }
}
```

Fallback if a subject/section key has no custom advice:

```text
skill: subject section label
Drill: Review missed questions in this section, then complete a timed mini-set and re-enter your points.
```

---

## 6. APUSH v5 page IA

The APUSH page should be the first implementation target, but it must be implemented through the shared v5 component where possible.

### 6.1 Top-level page structure

```text
1. Hero
   Eyebrow: APUSH Score Calculator 2026 · unofficial planning tool
   H1: APUSH Score Calculator 2026
   Copy: Enter MCQ, SAQ, DBQ, and LEQ points to estimate your APUSH score and get a study plan based on your weakest section.
   CTAs: Estimate my APUSH score / See scoring assumptions
   Mini dashboard: score + composite + tiny marker only; no target cards.

2. Calculator workspace
   Left: Enter scores
   Right: Dynamic result panel
   Dynamic result panel includes:
   - estimated AP score
   - composite out of 100
   - target gap card
   - section diagnostics bars
   - dynamic study plan tabs: 2 weeks / 4 weeks / 8 weeks

3. Reference accordion group
   - Estimated APUSH composite ranges
   - How APUSH scoring works
   - 2026 APUSH exam format

4. Methodology / unofficial note
   One compact note, not a large repeated section.

5. FAQ
   5-6 compact APUSH questions, one FAQ only.

6. Related calculators

7. Footer
```

### 6.2 Modules to remove from APUSH v4

Remove these as separate visible modules:

- Standalone score-band dashboard section.
- Standalone section-weighting chart.
- Standalone result-interpretation section.
- APUSH benchmark table inside exam-format section.
- Static recommendation cards.
- Static resource-card grid with `href="#resources"` placeholder links.
- Hardcoded worked example unless it is generated from current user inputs.

### 6.3 Modules to keep, but compress

- Conversion table: keep once, collapsed by default or placed in a compact reference drawer.
- How scoring works: keep as accordion content, not a full section.
- Exam format: keep as accordion content with table + Bluebook note only.
- FAQ: keep once and make it shorter.
- Related calculators: keep.

### 6.4 Worked example rule

Do not show the current hardcoded 45 / 7 / 5 / 4 example as a page block.

Allowed alternatives:

1. No worked example at all.
2. A generated "Your math" drawer inside the result panel after the user enters scores.

If implemented, "Your math" should reflect the actual user inputs:

```text
MCQ: 45/55 -> 32.7 weighted points
SAQ: 7/9 -> 15.6 weighted points
DBQ: 5/7 -> 17.9 weighted points
LEQ: 4/6 -> 10.0 weighted points
Composite: 76.2 -> estimated AP 4
Gap to AP 5: 3.8 composite points
```

---

## 7. Dynamic study-plan UI specification

### 7.1 Component placement

Place the component inside the calculator workspace result panel, directly after score and section diagnostics.

It should not be a separate below-the-fold resource section.

### 7.2 Component states

#### Empty state

```text
Title: Your study plan will appear here
Copy: Enter your section scores to see the weakest section, target gap, and a 2-week / 4-week / 8-week plan.
```

#### Result state layout

```text
Dynamic study plan
- Status line: "You are estimated at AP 4. You need about 3.8 composite points to reach AP 5."
- Focus card: "Best next focus: DBQ" or actual weakest section
- Gain options:
  Option A: +2 DBQ rubric points -> about +7.1 composite points
  Option B: +1 DBQ + 2 MCQ -> about +X composite points
- Tabs or segmented buttons:
  2 weeks | 4 weeks | 8 weeks
- Plan body:
  Week-by-week checklist based on selected variant
- Recalculate nudge:
  "After one timed practice set, enter the new scores and check whether the gap changed."
```

### 7.3 APUSH example output for 45 / 7 / 5 / 4

Given:

```text
MCQ 45/55
SAQ 7/9
DBQ 5/7
LEQ 4/6
Composite 76.2
Estimated AP 4
Gap to AP 5: 3.8
```

Likely plan output:

```text
Status: You are in the estimated AP 4 range and about 3.8 composite points from an AP 5.
Best next focus: LEQ or DBQ, depending on normalized lost points. DBQ has larger weight; LEQ may be faster if one rubric habit is missing.
Option A: Add +2 MCQ correct -> about +1.5 composite points.
Option B: Add +1 DBQ point -> about +3.6 composite points.
Option C: Add +1 DBQ point and +1 MCQ correct -> about +4.3 composite points, enough to cross the estimated AP 5 cutoff before buffer.
2-week sprint:
- Days 1-3: Review one DBQ rubric point you often miss; rewrite thesis and sourcing for two past prompts.
- Days 4-7: Do two 20-question MCQ sets and tag misses by period.
- Week 2: Write one timed DBQ, one timed LEQ outline, then re-enter scores.
```

Do not hardcode this example into the page; this is only a QA fixture and design reference.

---

## 8. Visual and interaction direction

Use v5 to make the product feel calmer and less stuffed.

### 8.1 Visual hierarchy

- Hero should be shorter than v4.
- Calculator workspace should be the largest visual element on the page.
- Result panel should use one score card, one gap card, one diagnostics group, and one plan card.
- Accordions should visually recede below the calculator.

### 8.2 Anti-template constraints

- Avoid adding more large article cards under the calculator.
- Avoid emoji icons in core UI. Use text labels, simple SVG / CSS marks, or no icons.
- Avoid purple-blue generic SaaS gradients.
- Avoid repeated white/gray card stacks that make every section feel equal.
- Avoid fake testimonials or unsupported claims.

### 8.3 Mobile behavior

At 375px:

- Calculator inputs stack in one column.
- Input labels stay readable; no tiny score-entry fields.
- Result panel appears immediately after inputs.
- Study plan tabs fit as horizontal segmented buttons or stacked buttons.
- Accordions come after the result panel.
- No horizontal scroll.
- Tap targets at least 44px high.

---

## 9. Developer implementation notes

### 9.1 Shared helpers to add

Add these helpers in score engine or a small adjacent module:

```js
getSectionDiagnostics(subject, values)
getPrimaryTarget(subject, result)
getGapPlanOptions(subject, values, result, diagnostics)
generateStudyPlan(subject, values, result)
```

Recommended return shape:

```js
{
  state: 'empty' | 'below-3' | 'at-3' | 'at-4' | 'protect-5' | 'strong-5',
  targetScore: 3 | 4 | 5 | null,
  currentScore,
  composite,
  gap,
  bufferGoal,
  weakestSection: {...},
  secondarySection: {...},
  gainOptions: [
    { label, rawChanges: [{ key, points }], estimatedCompositeGain, closesGap }
  ],
  variants: {
    twoWeek: { title, weeks: [...] },
    fourWeek: { title, weeks: [...] },
    eightWeek: { title, weeks: [...] }
  }
}
```

### 9.2 Rendering rule

Render one shared `dynamic-study-plan` component for every subject page.

Do not create `apushDynamicResultsPanel` as a long-term APUSH-only fork. Either rename it to shared behavior or replace it with a shared result panel renderer that accepts subject-specific advice.

### 9.3 Existing code areas to inspect

Current source areas likely affected:

- `src/scoreEngine.js`: subject data and score calculation.
- `src/site.js`: page IA and server-rendered initial HTML.
- `scripts/build.js`: client-side dashboard sync and calculator interaction bundle.
- `test/scoreEngine.test.js`: scoring tests.
- `test/site.test.js`: generated HTML and IA regression tests.

---

## 10. Developer acceptance criteria

### 10.1 Page de-duplication criteria

- APUSH page has no standalone `visual-score-section` after the calculator.
- APUSH page has no standalone `weight-section`.
- APUSH page has no `v4-band-card` grid in the result panel.
- APUSH page has no benchmark table that duplicates 3/4/5 score targets.
- APUSH page has no static resource-card grid with placeholder `#resources` links.
- APUSH page has one conversion table or conversion accordion only.
- APUSH page has one FAQ section only.
- Methodology / confidence copy is not repeated in three places.
- Top-level APUSH page section count is 8 or fewer, excluding header/footer.

### 10.2 Dynamic study-plan criteria

- Every subject page renders a dynamic study-plan container.
- The plan updates after calculator input changes.
- The weakest section is based on normalized performance and weighted lost points, not raw score alone.
- The component shows target gap to the next realistic target.
- It provides concrete raw-point gain options.
- It provides 2-week, 4-week, and 8-week variants.
- APUSH advice mentions MCQ / SAQ / DBQ / LEQ correctly.
- AP Lang advice mentions MCQ / Synthesis / Rhetorical / Argument correctly.
- AP Bio / AP Chem / AP Calc / AP Stats / AP Gov / AP Psych use subject-appropriate wording and do not mention APUSH-only terms.
- If no scores are entered, the component shows an empty state rather than fake guidance.
- If the student is already in AP 5 range, the component switches to protect-buffer / maintain guidance.

### 10.3 UX and mobile criteria

- 375px mobile has no horizontal overflow.
- Input labels do not wrap awkwardly or shrink below readable size.
- Result panel appears close enough to inputs that the calculator feels responsive.
- Study-plan tabs/buttons are usable with 44px tap targets.
- Accordions do not bury the calculator result.
- Hero remains concise and does not repeat the full result panel.

### 10.4 SEO / legal criteria

- Canonical URLs remain unchanged.
- Sitemap remains valid.
- FAQ schema matches the single visible FAQ section.
- Unofficial / not affiliated with College Board language remains visible.
- Calculator inputs remain browser-local; no analytics or storage of score inputs introduced.

---

## 11. Exact tests needed

### 11.1 Unit tests for study-plan logic

Add tests for:

1. APUSH 45 / 7 / 5 / 4:
   - composite remains 76.2
   - estimated score remains 4
   - AP 5 gap remains 3.8
   - generated plan target is 5
   - gain options include at least one feasible DBQ or split option

2. APUSH low score:
   - target becomes 3
   - plan state is below-3
   - 8-week plan emphasizes foundations

3. APUSH score 5 with small buffer:
   - plan state is protect-5
   - target is null or protect-buffer
   - guidance focuses on weakest section and buffer

4. AP Lang essay weakness:
   - weakest section can be synthesis / rhetorical / argument
   - advice does not mention APUSH, DBQ, LEQ, or Bluebook APUSH-specific copy

5. AP Chem / AP Bio two-section subject:
   - weakest section is chosen by weighted lost points
   - gain options never exceed available raw points

6. AP Calc scaled weights:
   - raw-point-to-composite gain respects section weights
   - target gap options are feasible and rounded clearly

7. Empty inputs:
   - study plan returns empty state
   - no fake weakest section is shown

### 11.2 Generated HTML tests

Add tests that generated pages contain:

- `[data-dynamic-study-plan]` on every subject page.
- `data-plan-variant="2-week"`, `data-plan-variant="4-week"`, and `data-plan-variant="8-week"` or equivalent accessible controls.
- APUSH page has exactly one FAQ block.
- APUSH page has no `href="#resources"` placeholder resource cards.
- APUSH page has no `v4-band-card` markup.
- Non-APUSH pages contain dynamic plan markup and do not contain APUSH-only section names unless that page is APUSH.

Add tests that generated APUSH page does not contain duplicate headings:

- No standalone heading: "See the APUSH score bands before you interpret the estimate".
- No standalone heading: "APUSH points do not all move the estimate the same way".
- No standalone heading: "What to practice next: APUSH Study Resources".
- At most one heading containing "Frequently Asked Questions" or "FAQ".

### 11.3 Browser / interaction tests

Manual or Playwright/browser tests:

1. Load `/apush-score-calculator/`.
2. Enter 45 / 7 / 5 / 4.
3. Verify:
   - score: 4
   - composite: 76.2 / 100
   - AP 5 gap: 3.8
   - dynamic study plan appears
   - plan target is AP 5
   - plan contains APUSH-specific advice
4. Change DBQ from 5 to 6.
5. Verify:
   - composite increases
   - AP 5 gap decreases or score changes
   - plan updates without reload
6. Load `/ap-lang-score-calculator/`.
7. Enter weak essay scores.
8. Verify:
   - dynamic study plan appears
   - AP Lang language appears
   - no APUSH-only advice appears
9. Check mobile widths 360 / 390 / 414:
   - no horizontal overflow
   - inputs readable
   - study-plan controls usable

### 11.4 Regression tests

Run:

```bash
npm run check
```

Expected:

- Build passes.
- Existing scoring tests still pass.
- New study-plan tests pass.
- Existing SEO/legal/canonical tests still pass.

---

## 12. QA preview handoff requirement

After implementation, do not deploy production and do not swap the current user-facing preview port until QA gives GO.

The implementation worker should provide:

- changed files
- test results
- preview URL or local route
- screenshots or browser notes for APUSH desktop and mobile
- explicit statement that production was not deployed
