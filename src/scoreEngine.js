export const subjects = [
  {
    slug: 'apush',
    name: 'AP US History',
    shortName: 'APUSH',
    title: 'AP US History Score Calculator 2026',
    description: 'Estimate your AP US History score from MCQ, SAQ, DBQ, and LEQ points with transparent 2026 assumptions.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 55, weight: 1 },
      { key: 'saq', label: 'Short Answer', max: 9, weight: 2 },
      { key: 'dbq', label: 'DBQ', max: 7, weight: 4 },
      { key: 'leq', label: 'LEQ', max: 6, weight: 3 }
    ],
    displayMaxComposite: 130,
    cutoffs: { 1: 0, 2: 38, 3: 58, 4: 76, 5: 92 },
    confidence: 'medium',
    riskNote: 'DBQ/LEQ and yearly score-setting can move the final boundary, so treat the gap as a conservative planning range rather than a fixed cutoff.',
    structure: 'AP US History includes multiple-choice questions, short-answer questions, one DBQ, and one LEQ. This MVP maps your section points into an estimated composite score.',
    assumptions: 'Estimated from public exam structure and historical scoring patterns; not an official College Board conversion.'
  },
  {
    slug: 'ap-lang',
    name: 'AP English Language',
    shortName: 'AP Lang',
    title: 'AP English Language Score Calculator 2026',
    description: 'Use this calculator to estimate your AP English Language score using MCQ and essay rubric points.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 45, weight: 1 },
      { key: 'synthesis', label: 'Synthesis Essay', max: 6, weight: 3 },
      { key: 'rhetorical', label: 'Rhetorical Analysis Essay', max: 6, weight: 3 },
      { key: 'argument', label: 'Argument Essay', max: 6, weight: 3 }
    ],
    cutoffs: { 1: 0, 2: 32, 3: 50, 4: 68, 5: 83 },
    confidence: 'low',
    riskNote: 'Essay rubric scoring is highly variable across readers and prompts; use a wider buffer before assuming you are safely in the next AP score band.',
    structure: 'AP Lang combines multiple choice with three essays. Essay inputs use rubric-style point estimates.',
    assumptions: 'Essay scoring is approximate; final scores depend on official reading and yearly score setting.'
  },
  {
    slug: 'ap-chemistry',
    name: 'AP Chemistry',
    shortName: 'AP Chem',
    title: 'AP Chemistry Score Calculator 2026',
    description: 'Estimate your AP Chemistry score from MCQ and FRQ points plus an estimated raw score conversion table.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 60, weight: 1 },
      { key: 'frq', label: 'Free Response', max: 46, weight: 1 }
    ],
    cutoffs: { 1: 0, 2: 38, 3: 60, 4: 74, 5: 90 },
    confidence: 'medium',
    riskNote: 'FRQ partial credit and exam-form difficulty can shift boundaries, especially near the 3/4 and 4/5 edges.',
    structure: 'AP Chemistry includes multiple-choice and free-response sections. This calculator treats each entered point as an estimated raw/composite point.',
    assumptions: 'Cutoffs are estimated ranges based on historical scoring patterns and public exam structure.'
  },
  {
    slug: 'ap-calculus-ab',
    name: 'AP Calculus AB',
    shortName: 'AP Calc AB',
    title: 'AP Calculus AB Score Calculator 2026',
    description: 'Estimate your AP Calculus AB score with MCQ and FRQ inputs for calculator and no-calculator sections.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 45, weight: 1.2 },
      { key: 'frq', label: 'Free Response', max: 54, weight: 1 }
    ],
    cutoffs: { 1: 0, 2: 32, 3: 52, 4: 68, 5: 82 },
    confidence: 'medium',
    riskNote: 'Calculator/no-calculator mix is simplified into two inputs, so keep a small safety buffer near each estimated cutoff.',
    structure: 'AP Calculus AB combines calculator and no-calculator work across MCQ and FRQ sections. This MVP uses two simple inputs for speed.',
    assumptions: 'The formula is a transparent estimate and does not reproduce official scoring tables.'
  },
  {
    slug: 'ap-biology',
    name: 'AP Biology',
    shortName: 'AP Bio',
    title: 'AP Biology Score Calculator 2026',
    description: 'Use this calculator to estimate your AP Biology score from MCQ and FRQ points with score-needed guidance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 60, weight: 1 },
      { key: 'frq', label: 'Free Response', max: 46, weight: 1 }
    ],
    cutoffs: { 1: 0, 2: 36, 3: 58, 4: 73, 5: 88 },
    confidence: 'medium',
    riskNote: 'FRQ scoring details and yearly equating can change the practical boundary; use the estimate to prioritize weak topics.',
    structure: 'AP Biology uses multiple choice and free response. The calculator gives an estimated composite and target-score gap.',
    assumptions: 'Estimated from historical patterns; actual yearly cutoffs can vary.'
  },
  {
    slug: 'ap-gov',
    name: 'AP US Government and Politics',
    shortName: 'AP Gov',
    title: 'AP Government Score Calculator 2026',
    description: 'Estimate your AP US Government score from MCQ and FRQ section points.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 55, weight: 1 },
      { key: 'frq', label: 'Free Response', max: 20, weight: 2.25 }
    ],
    cutoffs: { 1: 0, 2: 35, 3: 52, 4: 68, 5: 82 },
    confidence: 'medium',
    riskNote: 'The calculator uses total FRQ points for speed, so individual FRQ task variation is not modeled exactly.',
    structure: 'AP Gov includes multiple choice and four free-response tasks. This calculator uses total FRQ points for a fast estimate.',
    assumptions: 'Estimated for informational use only; not a fixed official cutoff.'
  },
  {
    slug: 'ap-statistics',
    name: 'AP Statistics',
    shortName: 'AP Stats',
    title: 'AP Statistics Score Calculator 2026',
    description: 'Estimate your AP Statistics score with MCQ and FRQ points plus raw score conversion guidance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 40, weight: 1.25 },
      { key: 'frq', label: 'Free Response', max: 50, weight: 1 }
    ],
    cutoffs: { 1: 0, 2: 34, 3: 52, 4: 68, 5: 84 },
    confidence: 'medium',
    riskNote: 'Investigative-task and FRQ partial-credit variation can matter near a cutoff, so use the shown gap as a planning range.',
    structure: 'AP Statistics combines MCQ and FRQ performance. The calculator estimates a composite score and AP score band.',
    assumptions: 'Cutoffs are approximate and should be used as study guidance, not official results.'
  },
  {
    slug: 'ap-psychology',
    name: 'AP Psychology',
    shortName: 'AP Psych',
    title: 'AP Psychology Score Calculator 2026',
    description: 'Use this calculator to estimate your AP Psychology score from multiple choice and free-response performance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 75, weight: 1 },
      { key: 'frq', label: 'Free Response', max: 14, weight: 2 }
    ],
    cutoffs: { 1: 0, 2: 42, 3: 58, 4: 74, 5: 88 },
    confidence: 'low',
    riskNote: 'AP Psychology scoring and exam structure have had recent changes; this page intentionally uses conservative confidence language until more current public scoring evidence is available.',
    structure: 'AP Psychology estimates combine a large MCQ section with two FRQs. Enter raw section points for a quick prediction.',
    assumptions: 'Estimated for 2026 freshness using public structure and historical score patterns.'
  },
  {
    slug: 'ap-lit',
    name: 'AP English Literature',
    shortName: 'AP Lit',
    title: 'AP English Literature Score Calculator 2026',
    description: 'Estimate your AP English Literature score from MCQ and three essay rubric scores.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 55, weight: 1 },
      { key: 'poetry', label: 'Poetry Essay', max: 6, weight: 3 },
      { key: 'prose', label: 'Prose Essay', max: 6, weight: 3 },
      { key: 'argument', label: 'Literary Argument Essay', max: 6, weight: 3 }
    ],
    cutoffs: { 1: 0, 2: 34, 3: 52, 4: 70, 5: 86 },
    confidence: 'low',
    riskNote: 'Three essay scores make this estimate especially reader-dependent; build a larger buffer before treating a 4/5 estimate as secure.',
    structure: 'AP Literature combines multiple choice with three essay responses. Essay points are rubric-style estimates.',
    assumptions: 'Essay results are especially approximate and depend on official scoring.'
  }
];

export function subjectSlugs() {
  return subjects.map((subject) => subject.slug);
}

export function getSubject(slug) {
  const subject = subjects.find((item) => item.slug === slug);
  if (!subject) {
    throw new Error(`Unknown subject: ${slug}`);
  }
  return subject;
}

export function maxComposite(subject) {
  return subject.displayMaxComposite ?? Math.round(subject.sections.reduce((sum, section) => sum + section.max * section.weight, 0));
}

export function sanitizePoint(value, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(Math.max(number, 0), max);
}

export function calculateComposite(subject, inputs = {}) {
  const raw = subject.sections.reduce((sum, section) => {
    const safeValue = sanitizePoint(inputs[section.key], section.max);
    return sum + safeValue * section.weight;
  }, 0);
  const rawMax = subject.sections.reduce((sum, section) => sum + section.max * section.weight, 0);
  const scaled = rawMax > 0 ? (raw / rawMax) * maxComposite(subject) : 0;
  return Math.floor(scaled);
}

export function predictedScore(subject, composite) {
  const entries = Object.entries(subject.cutoffs)
    .map(([score, cutoff]) => [Number(score), cutoff])
    .sort((a, b) => a[0] - b[0]);

  return entries.reduce((current, [score, cutoff]) => {
    return composite >= cutoff ? score : current;
  }, 1);
}

export function scoreNeeded(slug, composite) {
  const subject = getSubject(slug);
  return [3, 4, 5].reduce((acc, target) => {
    acc[target] = Math.max(0, subject.cutoffs[target] - composite);
    return acc;
  }, {});
}

export function calculateScore(slug, inputs = {}) {
  const subject = getSubject(slug);
  const composite = calculateComposite(subject, inputs);
  const score = predictedScore(subject, composite);
  const needed = scoreNeeded(slug, composite);
  const nextTarget = [3, 4, 5].find((target) => needed[target] > 0);

  return {
    subject: subject.name,
    slug: subject.slug,
    composite,
    maxComposite: maxComposite(subject),
    predictedScore: score,
    scoreBand: String(score),
    needed,
    confidence: subject.confidence,
    riskNote: subject.riskNote,
    nextAction: nextTarget
      ? `You may need about ${needed[nextTarget]} more estimated composite points to reach a ${nextTarget}.`
      : 'You are in the estimated 5 range. Keep reviewing weak sections.'
  };
}

export function conversionRows(subject) {
  return [
    { apScore: 5, range: `${subject.cutoffs[5]}–${maxComposite(subject)}` },
    { apScore: 4, range: `${subject.cutoffs[4]}–${subject.cutoffs[5] - 1}` },
    { apScore: 3, range: `${subject.cutoffs[3]}–${subject.cutoffs[4] - 1}` },
    { apScore: 2, range: `${subject.cutoffs[2]}–${subject.cutoffs[3] - 1}` },
    { apScore: 1, range: `0–${subject.cutoffs[2] - 1}` }
  ];
}
