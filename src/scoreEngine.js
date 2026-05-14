export const subjects = [
  {
    slug: 'apush',
    name: 'AP US History',
    shortName: 'APUSH',
    title: 'AP US History Score Calculator 2026',
    description: 'Estimate your AP US History score from MCQ, SAQ, DBQ, and LEQ points with transparent 2026 assumptions.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 55, weight: 40 },
      { key: 'saq', label: 'Short Answer', max: 9, weight: 20 },
      { key: 'dbq', label: 'DBQ', max: 7, weight: 25 },
      { key: 'leq', label: 'LEQ', max: 6, weight: 15 }
    ],
    displayMaxComposite: 100,
    compositeModel: 'weighted-100',
    cutoffs: { 1: 0, 2: 30, 3: 45, 4: 65, 5: 80 },
    confidence: 'medium',
    riskNote: 'DBQ/LEQ and yearly score-setting can move the final boundary, so treat the gap as a conservative planning range rather than a fixed cutoff.',
    structure: 'AP US History uses a weighted-100 framing: MCQ contributes 40%, SAQ 20%, DBQ 25%, and LEQ 15%. The calculator converts each section into its weighted share before mapping the total to an estimated AP score.',
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
  },
  {
    slug: 'ap-world-history',
    name: 'AP World History',
    shortName: 'AP World',
    title: 'AP World History Score Calculator 2026',
    description: 'Estimate your AP World History score from MCQ, SAQ, DBQ, and LEQ points with transparent 2026 assumptions.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 55, weight: 40 },
      { key: 'saq', label: 'Short Answer', max: 9, weight: 20 },
      { key: 'dbq', label: 'DBQ', max: 7, weight: 25 },
      { key: 'leq', label: 'LEQ', max: 6, weight: 15 }
    ],
    displayMaxComposite: 100,
    compositeModel: 'weighted-100',
    cutoffs: { 1: 0, 2: 28, 3: 42, 4: 62, 5: 78 },
    confidence: 'medium',
    riskNote: 'DBQ/LEQ rubric scoring and yearly score-setting can shift boundaries; treat the gap as a conservative planning range rather than a fixed cutoff.',
    structure: 'AP World History uses a weighted-100 framing: MCQ contributes 40%, SAQ 20%, DBQ 25%, and LEQ 15%. The calculator converts each section into its weighted share before mapping the total to an estimated AP score.',
    assumptions: 'Estimated from public exam structure and historical scoring patterns; not an official College Board conversion.'
  },
  {
    slug: 'ap-csp',
    name: 'AP Computer Science Principles',
    shortName: 'AP CSP',
    title: 'AP Computer Science Principles Score Calculator 2026',
    description: 'Estimate your AP Computer Science Principles score from MCQ and Create task points with transparent 2026 assumptions.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 70, weight: 1 },
      { key: 'create', label: 'Create task + written responses (estimated)', max: 30, weight: 1 }
    ],
    cutoffs: { 1: 0, 2: 35, 3: 52, 4: 70, 5: 85 },
    confidence: 'low',
    riskNote: 'The Create task includes submitted work plus exam-day written responses, and official scoring can move boundaries significantly; use a wider buffer before assuming you are safely in the next band.',
    structure: 'AP CSP combines a multiple-choice section with Create task scoring that includes submitted work and written responses. This calculator uses 70 MCQ points plus an estimated 30-point Create component, then maps the total to an estimated AP score.',
    assumptions: 'Cutoffs are estimated ranges based on historical scoring patterns and public exam structure; not an official College Board conversion.'
  },
  {
    slug: 'ap-physics-1',
    name: 'AP Physics 1',
    shortName: 'AP Physics 1',
    title: 'AP Physics 1 Score Calculator 2026',
    description: 'Estimate your AP Physics 1 score from MCQ and FRQ points with transparent 2026 assumptions and target-gap guidance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 40, weight: 1.25 },
      { key: 'frq', label: 'Free Response', max: 40, weight: 1.25 }
    ],
    cutoffs: { 1: 0, 2: 28, 3: 45, 4: 62, 5: 78 },
    confidence: 'medium',
    riskNote: 'FRQ partial credit and exam-form difficulty can shift boundaries, especially near the 3/4 and 4/5 edges.',
    structure: 'AP Physics 1 uses 40 multiple-choice questions and 4 free-response questions, with each section worth about 50% of the exam score. This calculator scales each section to an estimated 50-point share before mapping the total to an AP score estimate.',
    assumptions: 'Cutoffs are estimated ranges based on historical scoring patterns and public exam structure.'
  },
  {
    slug: 'ap-physics-2',
    name: 'AP Physics 2',
    shortName: 'AP Physics 2',
    title: 'AP Physics 2 Score Calculator 2026',
    description: 'Estimate your AP Physics 2 score from MCQ and FRQ points with transparent 2026 assumptions and target-gap guidance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 40, weight: 1.25 },
      { key: 'frq', label: 'Free Response', max: 40, weight: 1.25 }
    ],
    cutoffs: { 1: 0, 2: 30, 3: 48, 4: 65, 5: 80 },
    confidence: 'medium',
    riskNote: 'FRQ partial credit and exam-form difficulty can shift boundaries, especially near the 3/4 and 4/5 edges.',
    structure: 'AP Physics 2 uses 40 multiple-choice questions and 4 free-response questions, with each section worth about 50% of the exam score. This calculator scales each section to an estimated 50-point share before mapping the total to an AP score estimate.',
    assumptions: 'Cutoffs are estimated ranges based on historical scoring patterns and public exam structure.'
  },
  {
    slug: 'ap-macroeconomics',
    name: 'AP Macroeconomics',
    shortName: 'AP Macro',
    title: 'AP Macroeconomics Score Calculator 2026',
    description: 'Estimate your AP Macroeconomics score from MCQ and FRQ points with transparent 2026 assumptions and target-gap guidance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 60, weight: 1.11 },
      { key: 'frq', label: 'Free Response (scaled)', max: 30, weight: 1 }
    ],
    cutoffs: { 1: 0, 2: 32, 3: 50, 4: 66, 5: 80 },
    confidence: 'medium',
    riskNote: 'FRQ scoring details and yearly equating can change the practical boundary; use the estimate to prioritize weak topics.',
    structure: 'AP Macroeconomics combines 60 multiple-choice questions with 3 free-response questions. This calculator uses MCQ points plus a scaled 30-point FRQ input, then maps the composite to an estimated AP score.',
    assumptions: 'Cutoffs are estimated ranges based on historical scoring patterns and public exam structure.'
  },
  {
    slug: 'ap-microeconomics',
    name: 'AP Microeconomics',
    shortName: 'AP Micro',
    title: 'AP Microeconomics Score Calculator 2026',
    description: 'Estimate your AP Microeconomics score from MCQ and FRQ points with transparent 2026 assumptions and target-gap guidance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 60, weight: 1.11 },
      { key: 'frq', label: 'Free Response (scaled)', max: 30, weight: 1 }
    ],
    cutoffs: { 1: 0, 2: 34, 3: 52, 4: 68, 5: 82 },
    confidence: 'medium',
    riskNote: 'FRQ scoring details and yearly equating can change the practical boundary; use the estimate to prioritize weak topics.',
    structure: 'AP Microeconomics combines 60 multiple-choice questions with 3 free-response questions. This calculator uses MCQ points plus a scaled 30-point FRQ input, then maps the composite to an estimated AP score.',
    assumptions: 'Cutoffs are estimated ranges based on historical scoring patterns and public exam structure.'
  },
  {
    slug: 'ap-human-geography',
    name: 'AP Human Geography',
    shortName: 'AP HuG',
    title: 'AP Human Geography Score Calculator 2026',
    description: 'Estimate your AP Human Geography score from MCQ and FRQ points with transparent 2026 assumptions and target-gap guidance.',
    sections: [
      { key: 'mcq', label: 'Multiple Choice', max: 60, weight: 1 },
      { key: 'frq', label: 'Free Response', max: 21, weight: 2.86 }
    ],
    cutoffs: { 1: 0, 2: 34, 3: 52, 4: 70, 5: 86 },
    confidence: 'medium',
    riskNote: 'FRQ task variation and yearly equating can shift boundaries, especially near the 3/4 and 4/5 edges.',
    structure: 'AP Human Geography combines 60 multiple-choice questions with 3 free-response questions. Each section is worth about 50% of the exam score, so the calculator scales 21 FRQ rubric points to a 60-point equivalent before estimating the AP score.',
    assumptions: 'Cutoffs are estimated ranges based on historical scoring patterns and public exam structure.'
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
  if (subject.compositeModel === 'weighted-100') {
    return subject.sections.reduce((sum, section) => {
      const safeValue = sanitizePoint(inputs[section.key], section.max);
      const contribution = section.max > 0 ? (safeValue / section.max) * section.weight : 0;
      return round1(sum + Math.round(contribution * 10) / 10);
    }, 0);
  }

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
    const gap = Math.max(0, subject.cutoffs[target] - composite);
    acc[target] = Math.round(gap * 10) / 10;
    return acc;
  }, {});
}

export function sectionDiagnostics(subject, inputs = {}) {
  const rawMax = subject.sections.reduce((sum, section) => sum + section.max * section.weight, 0);
  const displayMax = maxComposite(subject);
  return subject.sections.map((section) => {
    const raw = sanitizePoint(inputs[section.key], section.max);
    const accuracy = section.max > 0 ? raw / section.max : 0;
    let weightedEarned;
    let weightedMax;
    if (subject.compositeModel === 'weighted-100') {
      weightedMax = section.weight;
      weightedEarned = section.max > 0 ? (raw / section.max) * section.weight : 0;
    } else {
      const scale = rawMax > 0 ? displayMax / rawMax : 0;
      weightedMax = section.max * section.weight * scale;
      weightedEarned = raw * section.weight * scale;
    }
    const weightedLost = Math.max(0, weightedMax - weightedEarned);
    const pointValue = section.max > 0 ? weightedMax / section.max : 0;
    const weaknessScore = (weightedLost * 0.45) + ((1 - accuracy) * weightedMax * 0.25) + (pointValue * 3);
    return {
      key: section.key,
      label: section.label,
      raw,
      max: section.max,
      weight: section.weight,
      accuracy: Math.round(accuracy * 1000) / 1000,
      accuracyPct: Math.round(accuracy * 100),
      weightedEarned: Math.round(weightedEarned * 10) / 10,
      weightedMax: Math.round(weightedMax * 10) / 10,
      weightedLost: Math.round(weightedLost * 10) / 10,
      weaknessScore: Math.round(weaknessScore * 10) / 10,
      pointValue: Math.round(pointValue * 10) / 10
    };
  }).sort((a, b) => b.weaknessScore - a.weaknessScore);
}

const confidenceBuffers = { high: 2, medium: 4, low: 6 };

const sectionAdvice = {
  apush: {
    mcq: ['stimulus-based MCQ pacing', 'drill missed time periods and explain why each distractor is wrong'],
    saq: ['SAQ evidence precision', 'write 3-part SAQs with one named fact per point'],
    dbq: ['DBQ rubric points', 'practice thesis, sourcing, outside evidence, and complexity on one document set'],
    leq: ['LEQ argument structure', 'outline thesis, topic sentences, and evidence before writing']
  },
  'ap-lang': {
    mcq: ['rhetorical reading accuracy', 'review missed passage questions by claim, evidence, and function'],
    synthesis: ['synthesis essay source use', 'write a thesis and integrate three sources in a timed outline'],
    rhetorical: ['rhetorical analysis commentary', 'annotate choices, purpose, and effect before drafting'],
    argument: ['argument essay evidence', 'build claims with specific examples and counterargument']
  },
  'ap-chemistry': {
    mcq: ['chemistry concept fluency', 'redo missed MCQs by unit and write the rule used'],
    frq: ['FRQ partial credit', 'practice setup, units, and explanation points on released FRQs']
  },
  'ap-calculus-ab': {
    mcq: ['calculus MCQ accuracy and pacing', 'sort misses by limits, derivatives, integrals, and applications'],
    frq: ['FRQ setup and notation', 'write complete justifications, units, and calculator/no-calculator steps']
  },
  'ap-biology': {
    mcq: ['biology concept application', 'redo missed graph/data MCQs and name the tested concept'],
    frq: ['FRQ claim-evidence reasoning', 'practice short explanations with variables, controls, and data references']
  },
  'ap-gov': {
    mcq: ['foundational concept MCQs', 'review missed constitutional principles, cases, and documents'],
    frq: ['FRQ task verbs', 'practice claim, evidence, comparison, and SCOTUS explanation prompts']
  },
  'ap-statistics': {
    mcq: ['statistics MCQ interpretation', 'redo missed probability, inference, and design questions'],
    frq: ['FRQ communication', 'write conditions, calculations, and context sentences for each response']
  },
  'ap-psychology': {
    mcq: ['psychology terminology accuracy', 'make retrieval cards for missed terms and apply them to scenarios'],
    frq: ['FRQ application points', 'practice defining terms and applying them to the prompt situation']
  },
  'ap-lit': {
    mcq: ['literary passage analysis', 'review missed tone, speaker, structure, and inference questions'],
    poetry: ['poetry essay commentary', 'annotate speaker, shift, imagery, and line-level evidence'],
    prose: ['prose essay evidence', 'connect narration, characterization, and detail to a defensible claim'],
    argument: ['literary argument evidence', 'prepare flexible works and topic sentences for common themes']
  },
  'ap-world-history': {
    mcq: ['stimulus-based MCQ pacing', 'drill missed time periods and explain why each distractor is wrong'],
    saq: ['SAQ evidence precision', 'write 3-part SAQs with one named fact per point'],
    dbq: ['DBQ rubric points', 'practice thesis, sourcing, outside evidence, and complexity on one document set'],
    leq: ['LEQ argument structure', 'outline thesis, topic sentences, and evidence before writing']
  },
  'ap-csp': {
    mcq: ['CSP concept fluency', 'redo missed MCQs by topic: algorithms, data, internet, impact'],
    create: ['Create Performance Task rubric', 'practice written responses for program purpose, algorithm, and abstraction']
  },
  'ap-physics-1': {
    mcq: ['physics MCQ accuracy', 'sort misses by kinematics, dynamics, energy, and momentum topics'],
    frq: ['FRQ setup and explanation', 'practice showing work, free-body diagrams, and justification points on released FRQs']
  },
  'ap-physics-2': {
    mcq: ['physics MCQ accuracy', 'sort misses by fluids, thermodynamics, electricity, and magnetism topics'],
    frq: ['FRQ setup and explanation', 'practice showing work, diagrams, and justification points on released FRQs']
  },
  'ap-macroeconomics': {
    mcq: ['macro MCQ accuracy', 'review missed AD/AS, fiscal policy, monetary policy, and trade questions'],
    frq: ['FRQ graphing and explanation', 'practice drawing correctly labeled graphs with shifts and multi-step reasoning']
  },
  'ap-microeconomics': {
    mcq: ['micro MCQ accuracy', 'review missed supply/demand, market structures, and cost curve questions'],
    frq: ['FRQ graphing and explanation', 'practice drawing correctly labeled graphs with shifts, surplus, and profit analysis']
  },
  'ap-human-geography': {
    mcq: ['HuG MCQ accuracy', 'review missed population, migration, urban, and political geography questions'],
    frq: ['FRQ application points', 'practice defining geographic terms and applying models to the prompt situation']
  }
};

function adviceFor(subject, sectionKey) {
  return sectionAdvice[subject.slug]?.[sectionKey] || ['section-specific accuracy', `practice targeted ${sectionKey} questions and retest`];
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

export function buildStudyPlan(slug, inputs = {}) {
  const subject = getSubject(slug);
  const result = calculateScore(slug, inputs);
  const diagnostics = sectionDiagnostics(subject, inputs);
  const weakest = diagnostics[0];
  const secondary = diagnostics[1] || diagnostics[0];
  const supplemental = diagnostics
    .filter((item) => item.key !== weakest.key && item.weightedLost > 0)
    .sort((a, b) => a.pointValue - b.pointValue || b.weaknessScore - a.weaknessScore)[0] || secondary;
  const strength = diagnostics.filter((item) => item.key !== weakest.key).sort((a, b) => b.accuracy - a.accuracy)[0] || weakest;
  const targetScore = result.predictedScore >= 5 ? 5 : result.predictedScore >= 4 ? 5 : result.predictedScore >= 3 ? 4 : 3;
  const gap = targetScore === 5 && result.predictedScore === 5 ? 0 : round1(Math.max(0, subject.cutoffs[targetScore] - result.composite));
  const buffer = confidenceBuffers[subject.confidence] ?? 4;
  const bufferGoal = round1(gap + buffer);
  const [weakestSkill, weakestDrill] = adviceFor(subject, weakest.key);
  const [secondarySkill, secondaryDrill] = adviceFor(subject, secondary.key);
  const singleGain = weakest.pointValue;
  const gainOptions = [
    {
      label: `+1 ${weakest.label} point`,
      gain: singleGain,
      description: `About +${singleGain.toFixed(1)} estimated composite points from ${weakest.label}.`
    },
    {
      label: `+1 ${weakest.label} point + 1 ${supplemental.label} point`,
      gain: round1(singleGain + supplemental.pointValue),
      description: `About +${round1(singleGain + supplemental.pointValue).toFixed(1)} estimated composite points by splitting work across ${weakest.label} and ${supplemental.label}.`
    }
  ];
  const targetLabel = result.predictedScore >= 5 ? 'protect AP 5' : `AP ${targetScore}`;
  const status = result.predictedScore >= 5
    ? `You are in the estimated AP 5 range for ${subject.shortName}; use the plan to protect your buffer.`
    : `You are currently in the estimated AP ${result.predictedScore} range for ${subject.shortName}.`;
  const gapText = result.predictedScore >= 5
    ? 'No higher AP band exists. Maintain your buffer and reduce preventable misses.'
    : `Your next target is ${targetLabel}. You need about ${gap.toFixed(1).replace(/\.0$/, '')} more estimated composite points, or about ${bufferGoal.toFixed(1).replace(/\.0$/, '')} with buffer.`;
  const focus = strength.key === weakest.key
    ? `${weakest.label} is the most balanced current section (${weakest.accuracyPct}% accuracy, ${weakest.weightedLost.toFixed(1)} weighted points still available). Keep it stable while you lift the next-biggest gap.`
    : `${weakest.label} is the best next focus (${weakest.accuracyPct}% accuracy, ${weakest.weightedLost.toFixed(1)} weighted points still available). Your strongest current section is ${strength.label}.`;
  const timelines = [
    { weeks: 2, title: '2-week sprint', actions: [`Prioritize ${weakestSkill}: ${weakestDrill}.`, `Run one timed ${weakest.label} drill, then retest and re-enter scores.`, `If the gap remains, add ${secondarySkill} practice.`] },
    { weeks: 4, title: '4-week build', actions: [`Weeks 1–2: fix ${weakest.label} misses with targeted review.`, `Week 3: combine ${weakest.label} with ${secondary.label} practice.`, `Week 4: take a mixed timed set and compare the new target gap.`] },
    { weeks: 8, title: '8-week plan', actions: [`Weeks 1–3: rebuild the weakest skill through short drills.`, `Weeks 4–6: rotate ${weakest.label}, ${secondary.label}, and full-section timing.`, `Weeks 7–8: simulate exam pacing and protect ${strength.label}.`] }
  ];
  return { subject: subject.name, shortName: subject.shortName, result, diagnostics, weakest, secondary, strength, targetScore, targetLabel, gap, bufferGoal, status, focus, gapText, weakestSkill, weakestDrill, gainOptions, timelines };
}

export function calculateScore(slug, inputs = {}) {
  const subject = getSubject(slug);
  const composite = calculateComposite(subject, inputs);
  const score = predictedScore(subject, composite);
  const needed = scoreNeeded(slug, composite);
  const nextTarget = [3, 4, 5].find((target) => needed[target] > 0);
  const gap = nextTarget ? needed[nextTarget] : 0;
  const gapText = subject.compositeModel === 'weighted-100' ? Number(gap).toFixed(1).replace(/\.0$/, '') : gap;

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
      ? `You may need about ${gapText} more estimated composite points to reach a ${nextTarget}.`
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
