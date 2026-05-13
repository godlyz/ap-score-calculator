# APSC v5 Subject Study Plan Copy — All-Subject Dynamic Templates

Date: 2026-05-12
Task: t_064903e7
Project: AP Score Calculator / apscorecalculator.store
Scope: Content/copy handoff only. Do not deploy production. Do not replace port 3000.

---

## 1. Purpose

This file defines developer-ready copy for the v5 dynamic study-plan component.

The plan must be generated from:

- Current subject data in `src/scoreEngine.js`.
- The user's entered section scores.
- The calculated estimated AP score and composite.
- Normalized section diagnostics.
- The target gap to AP 3, AP 4, AP 5, or protect / maintain AP 5.

Hard rule:

> The dynamic study plan must exist for every current subject calculator page, not only APUSH.

Current subject coverage from `src/scoreEngine.js`:

1. APUSH — `apush`
2. AP English Language — `ap-lang`
3. AP Chemistry — `ap-chemistry`
4. AP Calculus AB — `ap-calculus-ab`
5. AP Biology — `ap-biology`
6. AP US Government and Politics — `ap-gov`
7. AP Statistics — `ap-statistics`
8. AP Psychology — `ap-psychology`
9. AP English Literature — `ap-lit`

---

## 2. Component copy keys

Recommended namespace:

```js
copy.v5.studyPlan = {
  title: 'Dynamic study plan',
  emptyTitle: 'Your study plan will appear here',
  emptyBody: 'Enter your section scores to see the weakest section, target gap, and a 2-week / 4-week / 8-week plan.',
  intro: 'This plan uses your current estimate and section diagnostics. Re-enter new practice scores after each timed set to update it.',
  currentStatusLabel: 'Current status',
  weakestInsightLabel: 'Best next focus',
  targetGapLabel: 'Target gap',
  fastestPathLabel: 'Fastest improvement path',
  gainOptionsLabel: 'Fastest improvement options',
  variantsLabel: 'Choose your timeline',
  retestNudge: 'After one timed practice set, enter the new scores and check whether the gap changed.',
  disclaimer: 'This is unofficial study guidance based on estimated scoring assumptions. It does not guarantee an AP score.'
}
```

---

## 3. Universal state templates

Variables:

- `{subjectName}` = full subject name, e.g. AP US History
- `{shortName}` = short name, e.g. APUSH
- `{currentScore}` = predicted AP score 1–5
- `{composite}` = estimated composite
- `{maxComposite}` = max composite
- `{targetScore}` = AP 3, AP 4, or AP 5
- `{gap}` = rounded estimated composite point gap
- `{bufferGoal}` = gap plus confidence buffer
- `{weakestSection}` = label of top-ranked weak section
- `{secondarySection}` = label of second-ranked weak section
- `{strengthSection}` = label of highest-accuracy section
- `{weakestSkill}` = subject-specific skill string
- `{weakestDrill}` = subject-specific drill string
- `{gainOption}` = generated raw-point option

### 3.1 Empty / no input state

Current status sentence:

Enter your {shortName} section scores to generate a plan.

Weakest-section insight:

Your weakest section will appear after you enter scores. It will be based on weighted opportunity and accuracy, not raw points alone.

Target-gap explanation:

Your next target and gap will appear after the calculator has enough information.

Fastest improvement path:

Start with one complete practice set, enter the section points, then use the plan to choose your next drill.

CTA / nudge:

Enter scores to generate my plan

---

### 3.2 Estimated AP 1–2: build toward AP 3

Current status sentence:

You are currently in the estimated AP {currentScore} range for {shortName}.

Weakest-section insight:

Your best first focus is {weakestSection}. It shows the largest current opportunity when accuracy and weighted points are combined.

Target-gap explanation:

Your first target is AP 3. You need about {gap} more estimated composite points to reach that range, and about {bufferGoal} points for a safer buffer.

Fastest improvement path:

Build a passing-score path first. Use {weakestDrill}, then retest that section before spreading time across every topic.

Tone guardrail:

Say "build toward AP 3" or "build a passing-score path." Do not shame the student or imply certainty about the official result.

---

### 3.3 Estimated AP 3: stabilize 3, push toward 4

Current status sentence:

You are currently in the estimated AP 3 range for {shortName}.

Weakest-section insight:

{weakestSection} is the best next focus. Your strongest section is {strengthSection}, so protect that while you improve the weaker area.

Target-gap explanation:

Your next target is AP 4. You need about {gap} more estimated composite points to reach that range, plus buffer if you are near the cutoff.

Fastest improvement path:

Stabilize the 3 first. Then use focused {weakestSkill} practice to make the AP 4 push more realistic.

---

### 3.4 Estimated AP 4: close the AP 5 gap

Current status sentence:

You are currently in the estimated AP 4 range for {shortName}.

Weakest-section insight:

{weakestSection} is the best next focus. If one section cannot close the full gap, split work with {secondarySection}.

Target-gap explanation:

Your next target is AP 5. You need about {gap} more estimated composite points to reach that range before buffer.

Fastest improvement path:

Look for the smallest raw-point gain with the largest composite effect. Start with {gainOption}, then retest with a timed set.

---

### 3.5 Estimated AP 5 with low buffer: protect AP 5

Current status sentence:

You are in the estimated AP 5 range for {shortName}, but your buffer is still thin.

Weakest-section insight:

Protect the 5 by reducing avoidable misses in {weakestSection}.

Target-gap explanation:

You do not need a higher AP score target. Your goal is to stay safely above the estimated AP 5 cutoff.

Fastest improvement path:

Prioritize low-risk gains: fix recurring misses, practice pacing, and retest under exam timing.

---

### 3.6 Strong estimated AP 5: maintain timing

Current status sentence:

You are in a strong estimated AP 5 range for {shortName}.

Weakest-section insight:

{weakestSection} is still worth monitoring, but your main goal is consistency.

Target-gap explanation:

There is no higher AP score band to chase. Maintain your buffer and avoid preventable mistakes.

Fastest improvement path:

Rotate mixed timed practice. Keep your strongest section sharp and use short drills for {weakestSection}.

---

## 4. Gain option copy templates

### 4.1 Single-section option

Label:

+{rawPoints} {sectionLabel} point(s)

Description:

About +{estimatedCompositeGain} estimated composite points if the gain comes from {sectionLabel}.

Closes gap note:

This may be enough to cross the estimated AP {targetScore} cutoff before buffer.

Does-not-close note:

This helps, but you will likely need more points or a split gain to reach AP {targetScore}.

### 4.2 Split option

Label:

Split gain: +{rawPointsA} {sectionLabelA} + {rawPointsB} {sectionLabelB}

Description:

About +{estimatedCompositeGain} estimated composite points with less pressure on one section.

Note:

Use this when one section alone cannot close the gap or would require an unrealistic jump.

### 4.3 Large gap option

Label:

Build toward AP {targetScore}

Description:

Your current gap is too large for one short sprint. Use the 8-week plan to build foundations, then recalculate after a full practice set.

### 4.4 AP 5 protection option

Label:

Protect your AP 5 buffer

Description:

You are already in the estimated 5 range. Add buffer in {weakestSection} and reduce avoidable misses under timing.

---

## 5. Timeline plan copy templates

The renderer should combine these templates with subject-specific action labels from Section 7.

### 5.1 2-week sprint

Title:

2-week sprint

Best for:

Exam soon, small-to-moderate gap, or one clear weak section.

Summary:

Use this plan when you need the fastest realistic score movement. Keep each task measurable.

Week 1 copy:

Fix the highest-yield habit in {weakestSection}. {weakestDrill}

Week 2 copy:

Add timed mixed practice with {secondarySection}. Re-enter your new scores after one practice set.

Daily task copy:

Daily: 25–45 minutes. One drill, one error log, one next action.

Retest copy:

At the end of week 2, update the calculator and compare the new target gap.

---

### 5.2 4-week rebuild

Title:

4-week rebuild

Best for:

Moderate gap, one retest cycle, or a student who needs focused practice before full exams.

Summary:

Use this plan to rebuild the weakest section first, then connect it to mixed practice.

Week 1 copy:

Diagnose misses in {weakestSection}. Sort errors by concept, timing, and rubric habit.

Week 2 copy:

Run targeted drills for {weakestSkill}. {weakestDrill}

Week 3 copy:

Add {secondarySection}. Practice mixed sets so the gain survives outside isolated drills.

Week 4 copy:

Complete a timed practice set, update the calculator, and choose the next plan based on the new gap.

---

### 5.3 8-week system

Title:

8-week system

Best for:

Large gap, AP 1–2 estimate, low AP 3 estimate, or students who need a full structure.

Summary:

Use this plan when you need foundations and timed practice, not just a quick point grab.

Weeks 1–2 copy:

Rebuild foundations for {weakestSection}. Review the core concepts or rubric skills behind your misses.

Weeks 3–4 copy:

Drill {weakestSkill} with short timed sets. Keep an error log and repeat missed question types.

Weeks 5–6 copy:

Add {secondarySection} and mixed practice. Practice switching between question types under time pressure.

Week 7 copy:

Take a full or near-full practice set. Enter the new section scores and compare the gap.

Week 8 copy:

Build buffer. Protect {strengthSection}, clean up {weakestSection}, and practice exam-day pacing.

---

## 6. Subject copy mapping from current data

The mapping below covers every current subject calculator page in the project.

### 6.1 APUSH — `apush`

Subject names:

- Full: AP US History
- Short: APUSH

Sections:

- `mcq`: Multiple Choice, max 55, weight 40, label in UI: MCQ correct
- `saq`: Short Answer, max 9, weight 20, label in UI: SAQ points
- `dbq`: DBQ, max 7, weight 25, label in UI: DBQ points
- `leq`: LEQ, max 6, weight 15, label in UI: LEQ points

Current status wording:

You are currently in the estimated AP {currentScore} range for APUSH.

Weakest-section insight pattern:

Your best next APUSH focus is {weakestSection}. The plan weighs section accuracy and APUSH score weight together.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Because DBQ and LEQ scoring can vary, build extra buffer near the cutoff.

Fastest path pattern:

Start with the APUSH section where one rubric habit or question habit can move the most weighted points.

Section action labels:

```js
apush: {
  mcq: {
    label: 'MCQ correct',
    skill: 'stimulus reading + content recall',
    drill: 'Do 20 stimulus-based MCQs, then tag every miss by time period and skill.',
    gainHabit: 'Review why each wrong answer is wrong, not just why the right answer is right.'
  },
  saq: {
    label: 'SAQ points',
    skill: 'concise evidence points',
    drill: 'Write 3 SAQs with a 12-minute timer and score each subpart.',
    gainHabit: 'Answer the command verb first, then attach one precise evidence phrase.'
  },
  dbq: {
    label: 'DBQ points',
    skill: 'thesis, document use, sourcing, and outside evidence',
    drill: 'Rewrite one DBQ thesis and group the documents before writing a full essay.',
    gainHabit: 'Secure thesis and document use before chasing complexity.'
  },
  leq: {
    label: 'LEQ points',
    skill: 'argument structure + historical evidence',
    drill: 'Outline 3 LEQ prompts before writing one timed response.',
    gainHabit: 'Use claim → evidence → reasoning paragraphs.'
  }
}
```

---

### 6.2 AP English Language — `ap-lang`

Subject names:

- Full: AP English Language
- Short: AP Lang

Sections:

- `mcq`: Multiple Choice, max 45, weight 1
- `synthesis`: Synthesis Essay, max 6, weight 3
- `rhetorical`: Rhetorical Analysis Essay, max 6, weight 3
- `argument`: Argument Essay, max 6, weight 3

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Lang.

Weakest-section insight pattern:

Your best next AP Lang focus is {weakestSection}. Essay sections can move the estimate quickly because rubric-point gains are heavily weighted.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Because essay scoring is reader-dependent, leave a wider buffer near the cutoff.

Fastest path pattern:

Use one essay rubric habit or one passage-reading pattern as the first lever.

Section action labels:

```js
'ap-lang': {
  mcq: {
    label: 'MCQ correct',
    skill: 'passage reading + rhetorical choices',
    drill: 'Review missed MCQs by question type, then redo one short passage set.',
    gainHabit: 'Name the rhetorical choice and its purpose before choosing an answer.'
  },
  synthesis: {
    label: 'Synthesis Essay points',
    skill: 'source integration',
    drill: 'Plan one synthesis essay with source pairings before writing.',
    gainHabit: 'Use sources to support your line of reasoning, not as a list of summaries.'
  },
  rhetorical: {
    label: 'Rhetorical Analysis points',
    skill: 'rhetorical analysis',
    drill: 'Annotate choices and explain their effect before drafting.',
    gainHabit: 'Connect every device or choice to the writer’s purpose.'
  },
  argument: {
    label: 'Argument Essay points',
    skill: 'claim + evidence + reasoning',
    drill: 'Outline claims and evidence for 3 prompts before writing one full essay.',
    gainHabit: 'Make the reasoning explicit after every example.'
  }
}
```

---

### 6.3 AP Chemistry — `ap-chemistry`

Subject names:

- Full: AP Chemistry
- Short: AP Chem

Sections:

- `mcq`: Multiple Choice, max 60, weight 1
- `frq`: Free Response, max 46, weight 1

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Chem.

Weakest-section insight pattern:

Your best next AP Chem focus is {weakestSection}. The plan compares calculation accuracy, concept application, and available raw points.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Keep a small buffer because FRQ partial credit and exam-form difficulty can shift boundaries.

Fastest path pattern:

Start with the question type where calculation setup or explanation habits are costing repeatable points.

Section action labels:

```js
'ap-chemistry': {
  mcq: {
    label: 'MCQ correct',
    skill: 'concept + calculation accuracy',
    drill: 'Drill missed calculation types and write units on every step.',
    gainHabit: 'Separate concept misses from arithmetic or unit misses in your error log.'
  },
  frq: {
    label: 'FRQ points',
    skill: 'multi-step explanations and lab reasoning',
    drill: 'Complete one long FRQ and one short FRQ, then score by rubric point.',
    gainHabit: 'Show setup, units, and reasoning so partial credit is easier to earn.'
  }
}
```

---

### 6.4 AP Calculus AB — `ap-calculus-ab`

Subject names:

- Full: AP Calculus AB
- Short: AP Calc AB

Sections:

- `mcq`: Multiple Choice, max 45, weight 1.2
- `frq`: Free Response, max 54, weight 1

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Calc AB.

Weakest-section insight pattern:

Your best next AP Calc AB focus is {weakestSection}. The plan compares procedure recognition, setup accuracy, and weighted point opportunity.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Keep buffer because this simplified calculator groups calculator and no-calculator work into two inputs.

Fastest path pattern:

Start with the slow or repeat-miss problem type that appears across units.

Section action labels:

```js
'ap-calculus-ab': {
  mcq: {
    label: 'MCQ correct',
    skill: 'procedure recognition + pacing',
    drill: 'Do mixed calculator/no-calculator sets and mark the slow problem types.',
    gainHabit: 'Write the first setup step before solving; most wrong paths start there.'
  },
  frq: {
    label: 'FRQ points',
    skill: 'setup, notation, and justification',
    drill: 'Write full FRQ solutions with units, intervals, and reasoning.',
    gainHabit: 'State the theorem, setup, or interpretation before the final answer.'
  }
}
```

---

### 6.5 AP Biology — `ap-biology`

Subject names:

- Full: AP Biology
- Short: AP Bio

Sections:

- `mcq`: Multiple Choice, max 60, weight 1
- `frq`: Free Response, max 46, weight 1

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Bio.

Weakest-section insight pattern:

Your best next AP Bio focus is {weakestSection}. The plan looks for the section where concept application or data-reading gains can move the estimate fastest.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Leave buffer because FRQ scoring details and yearly equating can change the practical boundary.

Fastest path pattern:

Start with the skill that turns content knowledge into points: data interpretation, graph reading, or claim-evidence-reasoning.

Section action labels:

```js
'ap-biology': {
  mcq: {
    label: 'MCQ correct',
    skill: 'concept application + data reading',
    drill: 'Do mixed MCQs and tag misses by unit and graph/table skill.',
    gainHabit: 'For every miss, write the concept and the clue you overlooked.'
  },
  frq: {
    label: 'FRQ points',
    skill: 'claim-evidence-reasoning responses',
    drill: 'Write short FRQ answers and compare each sentence against the rubric verb.',
    gainHabit: 'Answer the verb directly, then attach evidence from the prompt or data.'
  }
}
```

---

### 6.6 AP US Government and Politics — `ap-gov`

Subject names:

- Full: AP US Government and Politics
- Short: AP Gov

Sections:

- `mcq`: Multiple Choice, max 55, weight 1
- `frq`: Free Response, max 20, weight 2.25

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Gov.

Weakest-section insight pattern:

Your best next AP Gov focus is {weakestSection}. FRQ points can matter heavily, so the plan checks raw opportunity and weighting together.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Keep buffer because this calculator uses total FRQ points for speed.

Fastest path pattern:

Start with task verbs, required documents, required cases, or scenario-reading misses that repeat across practice.

Section action labels:

```js
'ap-gov': {
  mcq: {
    label: 'MCQ correct',
    skill: 'foundational concepts + scenario reading',
    drill: 'Drill missed concepts and connect each to a required document or case.',
    gainHabit: 'Explain why the scenario points to one institution, principle, or case.'
  },
  frq: {
    label: 'FRQ points',
    skill: 'task verbs and evidence use',
    drill: 'Write one argument FRQ outline and one concept-application response.',
    gainHabit: 'Answer the task verb first, then support it with the required evidence.'
  }
}
```

---

### 6.7 AP Statistics — `ap-statistics`

Subject names:

- Full: AP Statistics
- Short: AP Stats

Sections:

- `mcq`: Multiple Choice, max 40, weight 1.25
- `frq`: Free Response, max 50, weight 1

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Stats.

Weakest-section insight pattern:

Your best next AP Stats focus is {weakestSection}. The plan looks for missed interpretation, conditions, and calculation habits with the best point return.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Leave buffer because FRQ partial credit and the investigative task can matter near a cutoff.

Fastest path pattern:

Start with interpretation and conditions. In AP Stats, correct math without context often leaves points behind.

Section action labels:

```js
'ap-statistics': {
  mcq: {
    label: 'MCQ correct',
    skill: 'concept recognition + interpretation',
    drill: 'Do MCQs by unit and write why each distractor is wrong.',
    gainHabit: 'Name the test, distribution, or inference idea before calculating.'
  },
  frq: {
    label: 'FRQ points',
    skill: 'conditions, calculations, and contextual conclusions',
    drill: 'Practice FRQs with full sentences and checked conditions.',
    gainHabit: 'End each answer with a conclusion in context, not just a number.'
  }
}
```

---

### 6.8 AP Psychology — `ap-psychology`

Subject names:

- Full: AP Psychology
- Short: AP Psych

Sections:

- `mcq`: Multiple Choice, max 75, weight 1
- `frq`: Free Response, max 14, weight 2

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Psych.

Weakest-section insight pattern:

Your best next AP Psych focus is {weakestSection}. The plan separates term recognition from scenario application and short-answer clarity.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Use conservative buffer language because AP Psychology scoring and exam structure have had recent changes.

Fastest path pattern:

Start by turning vocabulary into scenario application. Memorized terms only help if you can apply them to the prompt.

Section action labels:

```js
'ap-psychology': {
  mcq: {
    label: 'MCQ correct',
    skill: 'term recognition + scenario application',
    drill: 'Practice vocabulary-in-context MCQs and explain the scenario clue.',
    gainHabit: 'For every term, write one definition and one example situation.'
  },
  frq: {
    label: 'FRQ points',
    skill: 'definition + application writing',
    drill: 'Write concise definitions and apply each term directly to the prompt.',
    gainHabit: 'Use one sentence to define, one sentence to apply.'
  }
}
```

---

### 6.9 AP English Literature — `ap-lit`

Subject names:

- Full: AP English Literature
- Short: AP Lit

Sections:

- `mcq`: Multiple Choice, max 55, weight 1
- `poetry`: Poetry Essay, max 6, weight 3
- `prose`: Prose Essay, max 6, weight 3
- `argument`: Literary Argument Essay, max 6, weight 3

Current status wording:

You are currently in the estimated AP {currentScore} range for AP Lit.

Weakest-section insight pattern:

Your best next AP Lit focus is {weakestSection}. Essay gains can move the estimate quickly, but reader variation means you should build extra buffer.

Target-gap explanation pattern:

You need about {gap} more estimated composite points to reach AP {targetScore}. Because the exam is essay-heavy, treat near-cutoff estimates as a range.

Fastest path pattern:

Start with close reading and evidence selection. The best essay gains usually come from clearer claims and better textual support.

Section action labels:

```js
'ap-lit': {
  mcq: {
    label: 'MCQ correct',
    skill: 'close reading',
    drill: 'Practice one poetry or prose passage and explain every missed inference.',
    gainHabit: 'Underline the exact phrase that supports the answer before choosing.'
  },
  poetry: {
    label: 'Poetry Essay points',
    skill: 'poetic analysis',
    drill: 'Write a thesis and 2 evidence bullets for one poem before drafting.',
    gainHabit: 'Connect diction, structure, or imagery to a specific interpretation.'
  },
  prose: {
    label: 'Prose Essay points',
    skill: 'narrative technique analysis',
    drill: 'Annotate character, setting, and diction choices before writing.',
    gainHabit: 'Explain how the author’s choices shape meaning, not just what happens.'
  },
  argument: {
    label: 'Literary Argument points',
    skill: 'literary evidence recall',
    drill: 'Build evidence banks for 2 works you know well.',
    gainHabit: 'Choose evidence that proves the claim instead of retelling the plot.'
  }
}
```

---

## 7. Fallback copy for future subjects or missing section advice

If a subject or section does not have custom advice, use this safe fallback.

Section label:

{section.label}

Skill:

{section.label} accuracy

Drill:

Review missed questions in this section, complete a timed mini-set, then re-enter your points.

Gain habit:

Track one repeat mistake and fix it before adding more practice volume.

Weakest-section insight:

{section.label} is the best next focus based on your current inputs and estimated scoring weight.

No subject-specific terms should be invented.

---

## 8. FAQ consolidation for all subject pages

Each subject page should render one FAQ section only. The APUSH page may use the APUSH-specific version in `v5-copy-system.md`. Non-APUSH pages can use this shared FAQ set with subject variables.

FAQ heading:

{shortName} score calculator FAQ

FAQ intro:

Short answers for using the calculator safely and realistically.

Q1: Is this {shortName} score calculator official?

A1: No. This is an independent, unofficial planning tool. It is not affiliated with or endorsed by College Board, and it cannot guarantee your official AP score.

Q2: How accurate is the {shortName} score estimate?

A2: It is best used as a planning estimate. The calculator uses public exam structure, historical scoring patterns, and transparent assumptions, but official score-setting can vary by year and exam form.

Q3: What score do I need for a 5 on {shortName}?

A3: Enter your section points to see your estimated gap to AP 5. If you are near the cutoff, build extra buffer instead of aiming for the exact estimated threshold.

Q4: What should I study after I get my result?

A4: Use the dynamic study plan. It identifies the weakest section from your inputs and gives 2-week, 4-week, and 8-week options based on your target gap.

Q5: Does this calculator store my scores?

A5: No. Score inputs are processed in your browser and are not stored by this site. Do not send official score reports, student IDs, or private account information.

Q6: Why does my result differ from another calculator?

A6: Different calculators may use different cutoff assumptions or weighting models. Treat any unofficial calculator as study-planning guidance, not an official score report.

FAQ schema rule:

The JSON-LD FAQ schema must use exactly the same questions and answers shown on the page.

---

## 9. Developer-ready return shape for generated copy

Recommended generated study-plan object:

```js
{
  state: 'empty' | 'below-3' | 'at-3' | 'at-4' | 'protect-5' | 'strong-5',
  currentStatus: 'You are currently in the estimated AP 4 range for APUSH.',
  weakestInsight: 'Your best next APUSH focus is DBQ...',
  targetGapExplanation: 'Your next target is AP 5. You need about 3.8 more estimated composite points...',
  fastestPath: 'Look for the smallest raw-point gain with the largest composite effect...',
  gainOptions: [
    {
      label: '+1 DBQ point',
      description: 'About +3.6 estimated composite points if the gain comes from DBQ.',
      note: 'This helps, but add a small buffer near the cutoff.'
    }
  ],
  variants: {
    twoWeek: {
      title: '2-week sprint',
      bestFor: 'Exam soon, small-to-moderate gap, or one clear weak section.',
      weeks: [
        'Fix the highest-yield habit in DBQ. Rewrite one DBQ thesis and group the documents before writing a full essay.',
        'Add timed mixed practice with MCQ. Re-enter your new scores after one practice set.'
      ],
      daily: 'Daily: 25–45 minutes. One drill, one error log, one next action.'
    },
    fourWeek: {
      title: '4-week rebuild',
      weeks: ['...', '...', '...', '...']
    },
    eightWeek: {
      title: '8-week system',
      weeks: ['Weeks 1–2...', 'Weeks 3–4...', 'Weeks 5–6...', 'Week 7...', 'Week 8...']
    }
  },
  retestNudge: 'After one timed practice set, enter the new scores and check whether the gap changed.',
  disclaimer: 'This is unofficial study guidance based on estimated scoring assumptions. It does not guarantee an AP score.'
}
```

---

## 10. Copy acceptance criteria

### Coverage

- All 9 current subjects have subject-specific plan copy.
- Every section key in `src/scoreEngine.js` has a matching action label.
- Future missing sections have safe fallback copy.

### Dynamic behavior

- Current status sentence changes by predicted score state.
- Target gap sentence uses the next realistic target: 1/2 → 3, 3 → 4, 4 → 5, 5 → protect / maintain.
- Weakest-section copy uses the calculated weakest section, not a static APUSH assumption.
- Fastest improvement path uses generated gain options and subject-specific drills.
- The 2-week, 4-week, and 8-week plans always render.

### Subject safety

- APUSH copy mentions MCQ / SAQ / DBQ / LEQ only on APUSH.
- AP Lang copy mentions Synthesis / Rhetorical Analysis / Argument correctly.
- AP Lit copy mentions Poetry / Prose / Literary Argument correctly.
- AP Bio, AP Chem, AP Calc AB, AP Stats, AP Gov, and AP Psych use MCQ/FRQ wording and never mention DBQ or LEQ.
- Bluebook APUSH-specific copy does not leak into non-APUSH pages.

### Compliance

- No copy claims official score conversion or guaranteed accuracy.
- No copy guarantees AP score, college credit, or placement.
- No fake testimonials, fake user counts, fake media proof, or unsupported endorsements.
- Privacy copy says browser-local processing without overclaiming beyond current site behavior.

### UX

- Copy fits inside a result panel; avoid long article paragraphs.
- Each plan item is measurable and action-oriented.
- Empty state does not fabricate guidance.
- AP 5 state uses protect / maintain language, not "reach AP 6" or similar impossible language.

---

## 11. Implementation handoff note

Use `v5-copy-system.md` for APUSH page structure and shared page labels. Use this file for all dynamic study-plan strings, subject-specific action labels, and all-subject FAQ consolidation.

This task changed content artifacts only. It did not modify production code or deploy anything.
