import { buildStudyPlan, calculateScore, conversionRows, maxComposite, subjects } from './scoreEngine.js';

export const siteOrigin = (process.env.SITE_ORIGIN || 'https://apscorecalculator.store').replace(/\/$/, '');
const lastUpdated = 'May 9, 2026';
const trademarkNotice = 'AP® and Advanced Placement® are trademarks registered by College Board. This website is not affiliated with, endorsed by, or sponsored by College Board. College Board is not affiliated with, and does not endorse, this website or calculator. This site provides independent, unofficial score estimates for informational and planning purposes only.';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function absoluteUrl(path) {
  return `${siteOrigin}${path}`;
}

function pageShell({ title, description, path, body, schema = [], nav = 'default' }) {
  const canonical = absoluteUrl(path);
  const schemaTags = schema.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('\n  ');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="stylesheet" href="/assets/styles.css?v=v6-3-seo-only-20260513">
  ${schemaTags}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8YKL96LGT4"></script>
</head>
<body>
  ${siteHeader(nav, path)}
  <main>${body}</main>
  ${siteFooter()}
  <script type="module" src="/assets/app.js?v=v6-3-seo-only-20260513"></script>
</body>
</html>`;
}

function navItem(href, label, currentPath, match = href) {
  const active = currentPath === match || (match !== '/' && currentPath.startsWith(`${match}#`));
  return `<a href="${href}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
}

function siteHeader(nav, currentPath) {
  const hubPath = '/ap-score-calculator-2026/';
  const apushPath = '/apush-score-calculator/';
  const homePath = '/';
  const primary = `
      ${navItem(homePath, 'Home', currentPath, homePath)}
      ${navItem(hubPath, 'Hub', currentPath, hubPath)}
      ${navItem(apushPath, 'APUSH', currentPath, apushPath)}
      ${navItem('/privacy.html', 'Privacy', currentPath, '/privacy.html')}
      ${navItem('/disclaimer.html', 'Disclaimer', currentPath, '/disclaimer.html')}`;
  return `<header class="site-header">
    <a class="brand" href="/" aria-label="AP Score Calculator 2026 home"><span class="brand-mark" aria-hidden="true">▦</span><span>AP Score Calculator 2026</span></a>
    <nav aria-label="Primary navigation">${primary}</nav>
    <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false"><span data-theme-icon>☀</span><em data-theme-label>Light</em></button>
  </header>`;
}

function siteFooter() {
  return `<footer class="site-footer">
    <div>
      <strong>Independent, transparent AP score estimates.</strong>
      <p>${trademarkNotice}</p>
    </div>
    <nav aria-label="Footer navigation">
      <a href="/">Home</a>
      <a href="/ap-score-calculator-2026/">Hub</a>
      <a href="/apush-score-calculator/">APUSH</a>
      <a href="/privacy.html">Privacy</a>
      <a href="/terms.html">Terms</a>
      <a href="/disclaimer.html">Disclaimer</a>
      <a href="/contact.html">Contact</a>
    </nav>
    <p class="fine-print">Calculator inputs are processed locally in your browser and are not stored by us. Please do not send score reports, student IDs, or College Board account details.</p>
  </footer>`;
}

function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item)
    }))
  };
}

function faqSchema(questions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a }
    }))
  };
}

function webAppSchema(subject) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: subject ? subject.title : 'AP Score Calculator 2026',
    url: subject ? absoluteUrl(`/${subject.slug}-score-calculator/`) : absoluteUrl('/ap-score-calculator-2026/'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: subject ? subject.description : 'Free static AP score calculator hub for 2026 subject calculators.',
    publisher: { '@type': 'Organization', name: 'Independent AP Score Calculator' }
  };
}

function subjectCategory(subject) {
  if (['ap-calculus-ab', 'ap-statistics', 'ap-chemistry', 'ap-biology'].includes(subject.slug)) return 'STEM';
  if (['apush', 'ap-gov', 'ap-psychology'].includes(subject.slug)) return 'Social Science';
  return 'English';
}

function confidenceLabel(subject) {
  const labels = { low: 'Conservative estimate', medium: 'Moderate confidence estimate', high: 'Higher confidence estimate' };
  return labels[subject.confidence] || 'Estimate confidence';
}

function confidenceCopy(subject) {
  if (subject.confidence === 'low') {
    return 'Leave a larger buffer around cutoffs for essay-heavy or reader-dependent scoring.';
  }
  return 'Useful for planning; yearly equating and section scoring can shift official boundaries.';
}

function subjectTone(subject) {
  if (subject.slug === 'apush') return {
    lane: 'Featured APUSH dashboard path',
    promise: 'MCQ, SAQ, DBQ, and LEQ inputs with target-gap guidance.',
    focus: 'Best for checking whether practice-test points are on track for a 3, 4, or 5.',
    proof: 'Weighted-100 APUSH model · digital Bluebook reminders'
  };
  if (subjectCategory(subject) === 'STEM') return {
    lane: 'STEM calculator',
    promise: 'Raw section points converted into an estimated composite and AP band.',
    focus: 'Best for quick practice-test checks after MCQ/FRQ review.',
    proof: 'Section points · target gap · conservative cutoff note'
  };
  if (subjectCategory(subject) === 'English') return {
    lane: 'Essay-rubric calculator',
    promise: 'MCQ plus essay rubric points with wider near-cutoff caution.',
    focus: 'Best for comparing essay gains against the score band you want.',
    proof: 'Rubric-aware inputs · reader-variation warning'
  };
  return {
    lane: 'Social science calculator',
    promise: 'Practice section points mapped to an unofficial AP estimate.',
    focus: 'Best for deciding whether content recall or written response points matter more next.',
    proof: 'Subject-specific structure · gap to 3/4/5'
  };
}

function subjectCardMeta(subject) {
  const tone = subjectTone(subject);
  return `${tone.lane} · ${subject.sections.length} inputs · gap to 3/4/5`;
}


const scoreBandColors = { 5: '#2A9D8F', 4: '#4DAA57', 3: '#E9C46A', 2: '#F4A261', 1: '#E76F51' };

function apushLabel(section) {
  const labels = { mcq: 'MCQ correct', saq: 'SAQ total points', dbq: 'DBQ score', leq: 'LEQ score' };
  return labels[section.key] || section.label;
}

function scoreBandStrip(subject, currentComposite = null) {
  const max = maxComposite(subject);
  const rows = conversionRows(subject).slice().reverse();
  const marker = currentComposite === null ? '' : `<span class="band-marker" style="left:${Math.max(0, Math.min(100, (currentComposite / max) * 100)).toFixed(1)}%">You</span>`;
  return `<div class="score-band-strip" data-score-band-strip aria-label="Estimated score band visualization">
    <div class="band-track">${rows.map((row) => {
      const start = row.apScore === 1 ? 0 : subject.cutoffs[row.apScore];
      const end = row.apScore === 5 ? max : subject.cutoffs[row.apScore + 1] - 1;
      const width = Math.max(7, ((end - start + 1) / max) * 100);
      return `<span class="band band-${row.apScore}" style="width:${width.toFixed(1)}%;--band:${scoreBandColors[row.apScore]}"><b>${row.apScore}</b></span>`;
    }).join('')}${marker}</div>
    <div class="band-legend">${rows.map((row) => `<span><i style="background:${scoreBandColors[row.apScore]}"></i>AP ${row.apScore}: ${escapeHtml(row.range)}</span>`).join('')}</div>
  </div>`;
}

function sectionWeightChart() {
  const weights = [
    ['MCQ', '40%', '#1D3557', 'Content recall + pacing'],
    ['SAQ', '20%', '#2A9D8F', 'Concise evidence points'],
    ['DBQ', '25%', '#F4A261', 'Thesis, documents, complexity'],
    ['LEQ', '15%', '#E76F51', 'Argument + historical evidence']
  ];
  return `<div class="weight-chart" aria-label="APUSH section weighting chart">${weights.map(([name, pct, color, note]) => `<div class="weight-row"><div><strong>${name}</strong><span>${note}</span></div><em>${pct}</em><b style="width:${pct};background:${color}"></b></div>`).join('')}</div>`;
}

function targetComparisonStrip(subject, result) {
  return `<div class="target-strip" data-target-strip aria-label="Gap to target scores">${[3,4,5].map((target) => {
    const gap = result.needed[target];
    const ready = gap === 0 ? 'In range' : gap <= 8 ? 'Near cutoff' : 'Build buffer';
    return `<div class="target-card target-${target}"><span>Target ${target}</span><strong>${gap === 0 ? '0' : gap}</strong><p>${gap === 0 ? 'estimated gap' : 'composite pts away'}</p><em>${ready}</em></div>`;
  }).join('')}</div>`;
}

function heroDashboardVisual(subject, result) {
  const title = subject.slug === 'apush' ? 'APUSH score dashboard preview' : `${subject.shortName} score dashboard preview`;
  const legacyApushAttr = subject.slug === 'apush' ? ' data-apush-dashboard' : '';
  return `<aside class="hero-panel score-dashboard-visual mini-score-preview" data-score-dashboard${legacyApushAttr} aria-label="${escapeHtml(title)}">
    <div class="dashboard-top"><span class="preview-label">Live-style preview</span><b>${escapeHtml(subject.shortName)} estimate</b></div>
    <div class="dashboard-score"><span>Estimated AP</span><strong data-dashboard-score>${result.predictedScore}</strong><em data-dashboard-composite>${result.composite}/${result.maxComposite} composite</em></div>
    ${scoreBandStrip(subject, result.composite)}
  </aside>`;
}

function studyPlanPanel(subject, values = {}) {
  const plan = buildStudyPlan(subject.slug, values);
  const diagnostics = plan.diagnostics.map((item) => `<div class="diagnostic-row" data-diagnostic-row="${item.key}"><div><strong>${escapeHtml(item.label)}</strong><span>${item.accuracyPct}% accuracy · ${item.weightedLost.toFixed(1)} weighted points available</span></div><div class="diagnostic-track"><i data-diagnostic-bar="${item.key}" style="width:${Math.max(4, Math.min(100, item.accuracyPct))}%"></i></div><em data-diagnostic-value="${item.key}">${item.weightedEarned.toFixed(1)}/${item.weightedMax.toFixed(1)}</em></div>`).join('');
  const gainOptions = plan.gainOptions.map((option) => `<li><strong>${escapeHtml(option.label)}</strong><span>${escapeHtml(option.description)}</span></li>`).join('');
  const timelines = plan.timelines.map((timeline) => `<article class="timeline-card" data-study-timeline="${timeline.weeks}"><span>${timeline.weeks} weeks</span><h4>${escapeHtml(timeline.title)}</h4><ul>${timeline.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join('')}</ul></article>`).join('');
  return `<section class="study-plan-panel" data-study-plan aria-label="Dynamic study plan">
    <div class="study-plan-head"><p class="eyebrow">Dynamic study plan</p><h2>Personalized next-step plan</h2><p data-study-status>${escapeHtml(plan.status)}</p></div>
    <div class="study-plan-grid">
      <article class="study-insight"><span>Target gap</span><strong data-study-gap>${escapeHtml(plan.targetLabel)}</strong><p data-study-gap-copy>${escapeHtml(plan.gapText)}</p></article>
      <article class="study-insight"><span>Best next focus</span><strong data-study-focus-title>${escapeHtml(plan.weakest.label)}</strong><p data-study-focus>${escapeHtml(plan.focus)}</p></article>
    </div>
    <div class="diagnostics-block"><h3>Section diagnostics</h3><div data-study-diagnostics>${diagnostics}</div></div>
    <div class="gain-options"><h3>Fastest improvement options</h3><ul data-study-gains>${gainOptions}</ul></div>
    <div class="timeline-grid" data-study-timelines>${timelines}</div>
    <p class="microcopy">This plan uses predicted score, target gap, weakest section, normalized section performance, and weighted lost points. It is unofficial study guidance, not an AP score guarantee.</p>
  </section>`;
}

function referenceAccordions(subject, rows) {
  const examRows = subject.sections.map((section) => `<tr><td>${escapeHtml(subject.slug === 'apush' ? apushLabel(section) : section.label)}</td><td>0–${section.max} points</td><td>${subject.compositeModel === 'weighted-100' ? `${section.weight}% weighted contribution` : `Weight ${section.weight}`}</td></tr>`).join('');
  return `<section class="section reference-accordions" id="formula">
    <div class="section-heading"><p class="eyebrow">Reference drawer</p><h2>${escapeHtml(subject.shortName)} scoring reference</h2><p>Use these details when you want the estimated ranges, scoring model, exam inputs, and assumptions. The calculator result and study plan above remain the primary product flow.</p></div>
    <details open><summary>Estimated ${escapeHtml(subject.shortName)} composite ranges</summary><div class="table-wrap"><table><thead><tr><th>Estimated AP Score</th><th>Estimated composite range</th><th>How to read it</th></tr></thead><tbody>${rows}</tbody></table></div></details>
    <details><summary>How scoring works</summary><p>${escapeHtml(subject.structure)}</p><p>${escapeHtml(subject.assumptions)}</p></details>
    <details><summary>Exam format inputs</summary><div class="table-wrap"><table><thead><tr><th>Section</th><th>Input range</th><th>Calculator weighting</th></tr></thead><tbody>${examRows}</tbody></table></div>${subject.slug === 'apush' ? '<p class="note-inline">APUSH is fully digital in Bluebook; practice typed DBQ/LEQ timing while using these section scores.</p>' : ''}</details>
    <details><summary>Methodology and confidence</summary><p><strong>${escapeHtml(confidenceLabel(subject))}:</strong> ${escapeHtml(confidenceCopy(subject))}</p><p>${escapeHtml(subject.riskNote)}</p><p>Last updated: ${lastUpdated}. This calculator is independent and not affiliated with College Board.</p></details>
  </section>`;
}

function recommendationCards() {
  const cards = [
    ['Weak MCQ', 'Content gaps lower the largest section.', 'Drill missed periods, then retest mixed sets.', '#1D3557'],
    ['Weak SAQ', 'Small evidence misses add up quickly.', 'Practice 3-part responses with a 12-minute timer.', '#2A9D8F'],
    ['Weak DBQ', 'Rubric points can swing the estimate.', 'Rebuild thesis, grouping, sourcing, and outside evidence.', '#F4A261'],
    ['Weak LEQ', 'Argument structure protects late points.', 'Outline claims and evidence before writing full essays.', '#E76F51']
  ];
  return `<div class="guidance-grid visual-guidance">${cards.map(([title, why, action, color]) => `<div style="--accent:${color}"><span></span><strong>${title}</strong><p>${why}</p><em>${action}</em></div>`).join('')}</div>`;
}

function subjectMatrix() {
  const groups = ['STEM', 'English', 'Social Science'];
  return groups.map((group) => {
    const cards = subjects.filter((subject) => subjectCategory(subject) === group).map((subject) => `
      <a class="matrix-card" href="/${subject.slug}-score-calculator/">
        <span>${escapeHtml(subject.shortName)}</span>
        <strong>${escapeHtml(subject.title)}</strong>
        <em>${subject.sections.length} inputs · ${maxComposite(subject)} max estimated composite · shows gap to 3/4/5</em>
      </a>`).join('');
    return `<section class="matrix-group"><h3>${group}</h3><div class="matrix-grid">${cards}</div></section>`;
  }).join('\n');
}

function homepageSubjectCards() {
  const apush = subjects.find((subject) => subject.slug === 'apush');
  const others = subjects.filter((subject) => subject.slug !== 'apush');
  const renderCard = (subject) => {
    const featured = subject.slug === 'apush' ? ' featured' : '';
    const tone = subjectTone(subject);
    return `
      <a class="subject-card${featured}" href="/${subject.slug}-score-calculator/">
        <span>${escapeHtml(subject.shortName)}</span>
        <strong>${escapeHtml(subject.title)}</strong>
        <p>${escapeHtml(tone.promise)}</p>
        <em>${escapeHtml(subjectCardMeta(subject))}</em>
      </a>`;
  };
  return `
    <div class="subject-showcase featured-subject-row">
      <div class="subject-showcase-copy">
        <p class="eyebrow">Primary route</p>
        <h3>Start with the strongest single-subject page</h3>
        <p>APUSH has the most complete calculator flow: score estimate, target gap, study plan, reference drawer, and exam-format support. The rest of the hub stays nearby for students comparing multiple AP exams.</p>
      </div>
      ${renderCard(apush)}
    </div>
    <div class="subject-grid-balanced">${others.map(renderCard).join('')}</div>`;
}
function homepageHubPreview() {
  return `
  <div class="mini-hub-grid">
    ${['STEM', 'English', 'Social Science'].map((group) => {
      const groupSubjects = subjects.filter((subject) => subjectCategory(subject) === group);
      const sample = groupSubjects.slice(0, 3).map((subject) => `<a href="/${subject.slug}-score-calculator/">${escapeHtml(subject.shortName)}</a>`).join('');
      const copy = group === 'STEM'
        ? 'Calculator-first pages for math and science practice tests with MCQ/FRQ inputs.'
        : group === 'English'
          ? 'Essay-heavy pages keep confidence conservative and make rubric variation visible.'
          : 'APUSH is the featured route, with AP Gov and AP Psychology kept close for social science browsing.';
      return `<section class="mini-hub-card"><div><h3>${group}</h3><p>${copy}</p></div><div class="mini-hub-links">${sample}</div></section>`;
    }).join('')}
  </div>`;
}
function homepageFaqs() {
  return [
    { q: 'Is this AP score calculator official?', a: 'No. This is an independent, unofficial AP planning tool and is not affiliated with or endorsed by College Board.' },
    { q: 'Which calculator should I open first?', a: 'Open the subject you are actively practicing. APUSH is the featured route because it has the most complete score dashboard, study plan, and scoring reference flow.' },
    { q: 'Does the site save my score inputs?', a: 'No. Calculator inputs are processed locally in your browser and are not stored by us.' },
    { q: 'How should I read a near-cutoff estimate?', a: 'Treat any near-cutoff result as a range, not a guarantee. Build extra buffer points before exam day because official score setting can shift.' },
    { q: 'Why are subjects grouped by category?', a: 'The hub groups STEM, English, and Social Science calculators so students can browse related AP exams without losing the primary calculator path.' }
  ];
}

function hubFaqs() {
  return [
    { q: 'What is the AP Score Calculator 2026 hub?', a: 'It is a directory of free, unofficial AP subject calculators. Each subject page estimates an AP score from practice-test section points and shows the gap to 3, 4, and 5.' },
    { q: 'How do I find the APUSH score calculator?', a: 'APUSH is highlighted under Social Science, linked from the main navigation, and promoted as the strongest single-subject route on the homepage.' },
    { q: 'Do all calculators use the same formula?', a: 'No. Each calculator uses its own subject structure, cutoffs, section labels, confidence language, and risk note.' },
    { q: 'Are essay-heavy subjects less certain?', a: 'Yes. AP Lang, AP Lit, and other writing-heavy calculators use conservative confidence language because rubric scoring can vary by prompt and reader.' },
    { q: 'Does the hub store score inputs?', a: 'No. The calculators run in the browser and do not store score values.' }
  ];
}


const subjectSeoProfiles = {
  apush: {
    searchIntent: 'Students usually land here after a full APUSH practice exam and need to translate MCQ, SAQ, DBQ, and LEQ points into a usable study decision.',
    practiceUse: 'Use it after timed Bluebook-style APUSH practice, DBQ rubric review, or a weekly content-unit checkpoint.',
    improvementAngle: 'Because MCQ is 40% and DBQ is 25%, the fastest route is usually a missed-period MCQ drill or a rubric-point DBQ rewrite rather than broad rereading.',
    description: 'Free APUSH score calculator for 2026. Enter MCQ, SAQ, DBQ, and LEQ points to estimate your AP US History score, target gap, and next study focus.'
  },
  'ap-lang': {
    searchIntent: 'AP Lang users usually compare MCQ accuracy with three essay rubric scores and need a conservative read near the 4/5 boundary.',
    practiceUse: 'Use it after a synthesis, rhetorical analysis, or argument essay set to see whether rubric gains matter more than MCQ gains.',
    improvementAngle: 'If the estimate is close, improve the lowest essay rubric row first; one extra point across multiple essays can move the composite quickly.',
    description: 'Free AP Lang score calculator for 2026. Estimate AP English Language results from MCQ and essay rubric points with conservative cutoff guidance.'
  },
  'ap-lit': {
    searchIntent: 'AP Lit students need to combine MCQ performance with poetry, prose, and literary argument rubric scores without overtrusting one practice prompt.',
    practiceUse: 'Use it after a full MCQ set and three timed essays to compare rubric-point gains against the AP score band you want.',
    improvementAngle: 'Reader variation is real, so build a wider buffer by raising thesis, evidence, and commentary consistency across all three essays.',
    description: 'Free AP Lit score calculator for 2026. Estimate AP English Literature results from MCQ and three essay rubric scores with near-cutoff caution.'
  },
  'ap-chemistry': {
    searchIntent: 'AP Chemistry users usually have raw MCQ and FRQ points and want a quick estimate before deciding which units or FRQ skills to repair.',
    practiceUse: 'Use it after a released-style practice set to test whether stoichiometry, equilibrium, kinetics, or lab-analysis misses are holding down the estimate.',
    improvementAngle: 'FRQ partial credit can lift the estimate even when MCQ accuracy is flat, so review shown work and scoring-language misses first.',
    description: 'Free AP Chemistry score calculator for 2026. Estimate your AP Chem score from MCQ and FRQ points with raw score and target-gap guidance.'
  },
  'ap-calculus-ab': {
    searchIntent: 'AP Calculus AB users want to combine MCQ and FRQ practice points into a fast score estimate without splitting every calculator/no-calculator part.',
    practiceUse: 'Use it after a mixed derivative, integral, and applications practice exam to decide whether MCQ accuracy or FRQ setup work is the bottleneck.',
    improvementAngle: 'FRQ setup, units, and justification points can be efficient gains near a cutoff, especially when algebra mistakes are already under control.',
    description: 'Free AP Calculus AB score calculator for 2026. Estimate AP Calc AB score from MCQ and FRQ points with composite and gap-to-5 guidance.'
  },
  'ap-biology': {
    searchIntent: 'AP Biology users often know total MCQ and FRQ practice points and need a quick read on whether content recall or explanation points matter next.',
    practiceUse: 'Use it after a unit-mixed practice exam to compare MCQ misses with FRQ claim-evidence-reasoning weaknesses.',
    improvementAngle: 'If FRQ is weak, prioritize graph interpretation, experimental design, and concise biological reasoning before adding more memorization.',
    description: 'Free AP Biology score calculator for 2026. Estimate AP Bio score from MCQ and FRQ points with composite range and study-gap guidance.'
  },
  'ap-gov': {
    searchIntent: 'AP Government users need a fast estimate from MCQ and FRQ points, especially after practicing concept application, SCOTUS, and argument tasks.',
    practiceUse: 'Use it after a practice exam to see whether content recall, document use, or argument evidence should drive the next review block.',
    improvementAngle: 'Because FRQ tasks vary, raise the weakest task type first: concept application, quantitative analysis, SCOTUS comparison, or argument essay.',
    description: 'Free AP Government score calculator for 2026. Estimate AP Gov score from MCQ and FRQ points with target gap and cutoff caution.'
  },
  'ap-statistics': {
    searchIntent: 'AP Statistics users usually need to translate MCQ and FRQ points into a score estimate and identify whether interpretation or calculation is limiting.',
    practiceUse: 'Use it after mixed inference, probability, regression, and investigative-task practice to see how far the estimate is from your target.',
    improvementAngle: 'FRQ communication points can be high-leverage; practice context, conditions, and interpretation language rather than only formulas.',
    description: 'Free AP Statistics score calculator for 2026. Estimate AP Stats score from MCQ and FRQ points with raw score and target-gap guidance.'
  },
  'ap-psychology': {
    searchIntent: 'AP Psychology users need a conservative estimate while recent exam changes make exact conversions less certain.',
    practiceUse: 'Use it after a vocabulary-heavy MCQ set and FRQ practice to decide whether definitions, application, or written explanation needs more work.',
    improvementAngle: 'If the estimate is close, build buffer with applied-definition accuracy and FRQ term usage before assuming the band is secure.',
    description: 'Free AP Psychology score calculator for 2026. Estimate AP Psych score from MCQ and FRQ points with conservative confidence notes.'
  }
};

function subjectSeoProfile(subject) {
  return subjectSeoProfiles[subject.slug] || {
    searchIntent: `Use this ${subject.shortName} calculator after a practice test to turn section points into an unofficial score estimate.`,
    practiceUse: `Enter ${subject.shortName} section points, then use the target gap and weakest section to plan the next study block.`,
    improvementAngle: 'Focus first on the section with the most realistic point gain, especially when the estimate is close to a cutoff.',
    description: `Free unofficial ${subject.shortName} score calculator for 2026 AP planning with composite range, target gap, and study guidance.`
  };
}

function subjectFaqs(subject) {
  if (subject.slug === 'apush') {
    return [
      { q: 'Is this APUSH score calculator official?', a: 'No. It is an independent, unofficial AP US History planning tool and is not affiliated with or endorsed by College Board.' },
      { q: 'What APUSH scores should I enter?', a: 'Enter raw practice-test points for MCQ, SAQ, DBQ, and LEQ. The page converts those section points into a weighted-100 composite estimate.' },
      { q: 'Does the APUSH calculator work for the digital Bluebook exam?', a: 'Yes for planning. The calculator reflects the APUSH section structure and reminds students that APUSH is now fully digital in Bluebook, while official score setting can still vary.' },
      { q: 'What score do I need for a 5 on APUSH?', a: 'Enter your current MCQ, SAQ, DBQ, and LEQ points to see the estimated gap to a 5. Treat the gap as a study-planning buffer, not an official cutoff.' },
      { q: 'Which APUSH section should I study first?', a: 'Use the Personalized next-step plan below the calculator. It compares normalized section performance and weighted lost points to suggest the best next focus.' },
      { q: 'Does it store my scores?', a: 'No. Inputs are processed locally in your browser and are not stored by us.' }
    ];
  }
  const category = subjectCategory(subject);
  const profile = subjectSeoProfile(subject);
  const sectionNames = subject.sections.map((section) => section.label).join(', ');
  return [
    { q: `Is this ${subject.shortName} calculator official?`, a: `No. This ${subject.shortName} calculator is unofficial and independent. It is designed for practice-test planning, not official College Board score reporting.` },
    { q: `Which ${subject.shortName} points should I enter?`, a: `Enter raw practice scores for ${sectionNames}. The calculator clamps values to each section range and converts them into an estimated composite.` },
    { q: `What score do I need for a 5 on ${subject.shortName}?`, a: `Use the gap-to-5 result after entering your section points. The shown gap is a planning estimate, so build extra buffer if you are close to the cutoff.` },
    { q: `How should I use this ${subject.shortName} estimate?`, a: profile.practiceUse },
    { q: category === 'English' ? 'Why are essay-heavy estimates conservative?' : `Why can ${subject.shortName} cutoffs vary?`, a: `${confidenceCopy(subject)} ${subject.riskNote}` }
  ];
}

function relatedSubjects(subject) {
  const sameGroup = subjects.filter((item) => item.slug !== subject.slug && subjectCategory(item) === subjectCategory(subject));
  const featured = subjects.filter((item) => item.slug !== subject.slug && ['apush', 'ap-biology', 'ap-lang'].includes(item.slug));
  const fallback = subjects.filter((item) => item.slug !== subject.slug);
  const merged = [...sameGroup, ...featured, ...fallback];
  const seen = new Set();
  return merged.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  }).slice(0, 5);
}

function relatedCalculatorSection(subject) {
  const related = relatedSubjects(subject);
  return `<section class="section links related-calculators" aria-label="Related AP calculators">
    <div class="section-heading"><p class="eyebrow">Related calculators</p><h2>Keep comparing nearby AP score tools</h2><p>Open a related subject page or return to the full AP calculator hub. These are internal links only; calculator behavior stays unchanged.</p></div>
    <div class="related-grid">
      <a class="related-card hub-card" href="/ap-score-calculator-2026/"><span>Hub</span><strong>All AP score calculators</strong><p>Browse STEM, English, and Social Science calculators in one indexable directory.</p></a>
      ${related.map((item) => { const tone = subjectTone(item); return `<a class="related-card" href="/${item.slug}-score-calculator/"><span>${escapeHtml(item.shortName)}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(tone.focus)}</p></a>`; }).join('')}
    </div>
  </section>`;
}

function subjectSeoSupportSection(subject) {
  const profile = subjectSeoProfile(subject);
  const isApush = subject.slug === 'apush';
  return `<section class="section seo-support ${isApush ? 'apush-seo-support' : ''}">
    <div class="section-heading"><p class="eyebrow">${isApush ? 'APUSH 2026 practice notes' : `${escapeHtml(subject.shortName)} practice notes`}</p><h2>${isApush ? 'Use the APUSH estimate as a study checkpoint' : `Use the ${escapeHtml(subject.shortName)} estimate as a checkpoint`}</h2><p>${escapeHtml(profile.searchIntent)}</p></div>
    <div class="seo-support-grid">
      <article><span>When to use it</span><p>${escapeHtml(profile.practiceUse)}</p></article>
      <article><span>What to improve next</span><p>${escapeHtml(profile.improvementAngle)}</p></article>
      <article><span>How to read cutoffs</span><p>${escapeHtml(subject.riskNote)}</p></article>
    </div>
  </section>`;
}

function hubInternalLinksSection() {
  const lanes = ['STEM', 'English', 'Social Science'].map((group) => {
    const cards = subjects.filter((subject) => subjectCategory(subject) === group).map((subject) => `<a href="/${subject.slug}-score-calculator/"><strong>${escapeHtml(subject.shortName)}</strong><span>${escapeHtml(subjectTone(subject).promise)}</span></a>`).join('');
    return `<article class="hub-link-lane"><h3>${group} calculators</h3><div>${cards}</div></article>`;
  }).join('');
  return `<section class="section hub-link-clusters" aria-label="AP calculator internal links"><div class="section-heading"><p class="eyebrow">Internal calculator paths</p><h2>Jump by exam family</h2><p>These category links make the hub easier to crawl and easier for students to browse without changing any calculator function.</p></div><div class="hub-link-grid">${lanes}</div></section>`;
}

function homePage() {
  const faqs = homepageFaqs();
  const body = `
<section class="hero home-hero home-system">
  <div class="hero-copy-block">
    <p class="eyebrow">Free AP score calculators for 2026 planning</p>
    <h1>AP Score Calculator 2026</h1>
    <p class="hero-copy">Choose a subject, enter practice-test section points, and see an unofficial AP score estimate with the gap to your next target. Start with APUSH for the most complete calculator flow, or browse the full hub by category.</p>
    <div class="cta-row">
      <a class="button" href="/apush-score-calculator/">Start with APUSH</a>
      <a class="button secondary" href="/ap-score-calculator-2026/">Browse the hub</a>
    </div>
    <p class="hero-disclaimer">Independent and unofficial. Not affiliated with College Board. Browser-local calculation with no signup required.</p>
  </div>
  <aside class="hero-panel preview-card home-dashboard" aria-label="Homepage score dashboard preview">
    <span class="preview-label">Featured path</span>
    <strong>APUSH score dashboard</strong>
    <div class="preview-score">4</div>
    <div class="mini-bars"><span style="height:58%"></span><span style="height:42%"></span><span style="height:76%"></span><span style="height:64%"></span></div>
    <p>Score band preview, gap-to-target guidance, and subject browsing stay in one connected product system.</p>
  </aside>
  <div class="popular-paths" aria-label="Popular starting points">
    <div><span class="preview-label">Popular starting points</span><strong>Stay in the hero flow</strong></div>
    <a href="/apush-score-calculator/"><b>APUSH</b><span>Featured dashboard calculator</span></a>
    <a href="/ap-score-calculator-2026/"><b>All AP calculators</b><span>Browse by subject category</span></a>
    <a href="#subjects"><b>Subject matrix</b><span>Compare AP score tools</span></a>
  </div>
</section>
<section id="subjects" class="section">
  <div class="section-heading">
    <p class="eyebrow">Featured subject matrix</p>
    <h2>Choose your AP calculator</h2>
    <p>APUSH is visually featured as the strongest route, then a balanced grid keeps the rest of the subject family easy to compare. Each card explains what makes that calculator different.</p>
  </div>
  <div class="subject-matrix subject-matrix-home">${homepageSubjectCards()}</div>
</section>
<section class="section two-col">
  <div>
    <p class="eyebrow">How it works</p>
    <h2>How the calculators work</h2>
    <ol class="steps">
      <li>Enter the section points you earned on a practice test.</li>
      <li>Review the estimated AP score, composite range, and gap to 3, 4, or 5.</li>
      <li>Use the weakest section to decide what to study next.</li>
    </ol>
  </div>
  <aside class="note">
    <h2>When the estimate helps</h2>
    <p>It is a fast way to check whether your current practice score is on track and where a realistic gain is most likely.</p>
    <p>When you are near a cutoff, treat the estimate as a range and leave extra buffer points.</p>
  </aside>
</section>
<section class="section" id="hub-preview">
  <div class="section-heading">
    <p class="eyebrow">Hub preview</p>
    <h2>Hub preview</h2>
    <p>The hub is the browse mode: STEM, English, and Social Science lanes with APUSH still easy to find.</p>
  </div>
  ${homepageHubPreview()}
</section>
${hubInternalLinksSection()}
<section class="section two-col" id="methodology">
  <div>
    <p class="eyebrow">Trust</p>
    <h2>Transparent, unofficial assumptions</h2>
    <ol class="steps">
      <li>Calculator inputs are mapped through public exam structures and subject-specific cutoff assumptions.</li>
      <li>The result is a planning estimate, not a score guarantee.</li>
      <li>Official AP cutoffs can vary by year and exam form.</li>
      <li>Inputs are processed locally in your browser and are not stored by us.</li>
    </ol>
  </div>
  <aside class="note">
    <h2>2026 freshness</h2>
    <p>Last updated: ${lastUpdated}. The site is maintained for 2026 AP planning with an explicit unofficial disclaimer and clear privacy language.</p>
    <p>APUSH is the strongest entry point, but the rest of the matrix stays linked so the site feels like one connected product family.</p>
  </aside>
</section>
<section class="section faq">
  <div class="section-heading">
    <p class="eyebrow">FAQ</p>
    <h2>Before you start</h2>
  </div>
  ${faqs.map((qa) => `<details><summary>${escapeHtml(qa.q)}</summary><p>${escapeHtml(qa.a)}</p></details>`).join('\n')}
</section>
<section class="section cta-band">
  <div>
    <p class="eyebrow">Ready to start?</p>
    <h2>Pick your AP subject and estimate your score now.</h2>
  </div>
  <a class="button" href="#subjects">Choose a calculator</a>
</section>`;
  return pageShell({
    title: 'AP Score Calculator 2026 | Free AP Score Estimates',
    description: 'Free AP score calculators for 2026 planning with APUSH featured, browser-local estimates, gap-to-target guidance, and transparent unofficial assumptions.',
    path: '/',
    body,
    nav: 'home',
    schema: [webAppSchema(), faqSchema(faqs), breadcrumbs([{ name: 'AP Score Calculator 2026', item: '/' }])]
  });
}

function hubPage() {
  const faqs = hubFaqs();
  const body = `
<section class="hero hub-hero">
  <div class="hero-copy-block">
    <p class="eyebrow">Browse every AP calculator in one place</p>
    <h1>AP Score Calculator Hub</h1>
    <p class="hero-copy">Browse every AP calculator in one place. Each subject keeps its own section structure, confidence note, target gap, and internal links so the hub feels like a connected product instead of a list of duplicates.</p>
    <div class="cta-row">
      <a class="button" href="#calculator-start">Browse subjects</a>
      <a class="button secondary" href="#methodology">See methodology</a>
    </div>
    <p class="hero-disclaimer">Free to use. Browser-local. No signup. Not affiliated with College Board.</p>
  </div>
  <aside class="hero-panel preview-card" aria-label="Hub preview">
    <span class="preview-label">Category view</span>
    <strong>Subject paths stay clear</strong>
    <div class="preview-score">3 groups</div>
    <p>STEM, English, and Social Science lanes keep browsing predictable. APUSH is highlighted under Social Science, and Browse-first routing remains simple.</p>
    <ul>
      <li>Category-first browsing</li>
      <li>Subject-specific calculator copy</li>
      <li>FAQ and schema coverage</li>
      <li>SEO and legal pages preserved</li>
    </ul>
  </aside>
</section>
<section id="calculator-start" class="section intro-strip">
  <p>Subject matrix</p>
  <div class="quick-links"><a href="#stem">STEM</a><a href="#english">English</a><a href="#social-science">Social Science</a><a href="/apush-score-calculator/">APUSH</a></div>
</section>
<section id="subjects" class="section hub-directory">
  <div class="section-heading">
    <p class="eyebrow">Subject matrix</p>
    <h2>Pick an AP exam</h2>
    <p>Each lane uses subject-specific copy instead of repeating the same generic promise. APUSH stays visually featured without overpowering the rest of the hub.</p>
  </div>
  <div class="hub-grid">
    <section class="matrix-group" id="stem"><h3>STEM</h3><div class="matrix-grid">${subjects.filter((subject) => subjectCategory(subject) === 'STEM').map((subject) => { const tone = subjectTone(subject); return `<a class="matrix-card" href="/${subject.slug}-score-calculator/"><span>${escapeHtml(subject.shortName)}</span><strong>${escapeHtml(subject.title)}</strong><p>${escapeHtml(tone.focus)}</p><em>${escapeHtml(tone.proof)}</em></a>`; }).join('')}</div></section>
    <section class="matrix-group" id="english"><h3>English</h3><div class="matrix-grid">${subjects.filter((subject) => subjectCategory(subject) === 'English').map((subject) => { const tone = subjectTone(subject); return `<a class="matrix-card" href="/${subject.slug}-score-calculator/"><span>${escapeHtml(subject.shortName)}</span><strong>${escapeHtml(subject.title)}</strong><p>${escapeHtml(tone.focus)}</p><em>${escapeHtml(tone.proof)}</em></a>`; }).join('')}</div></section>
    <section class="matrix-group" id="social-science"><h3>Social Science</h3><div class="matrix-grid">${subjects.filter((subject) => subjectCategory(subject) === 'Social Science').map((subject) => { const tone = subjectTone(subject); return `<a class="matrix-card${subject.slug === 'apush' ? ' featured' : ''}" href="/${subject.slug}-score-calculator/"><span>${escapeHtml(subject.shortName)}</span><strong>${escapeHtml(subject.title)}</strong><p>${escapeHtml(tone.focus)}</p><em>${escapeHtml(tone.proof)}</em></a>`; }).join('')}</div></section>
  </div>
</section>
<section class="section two-col" id="methodology">
  <div>
    <p class="eyebrow">What each calculator shows</p>
    <h2>What each calculator shows</h2>
    <ol class="steps">
      <li>Estimated AP score</li>
      <li>Estimated composite range</li>
      <li>Gap to 3, 4, and 5</li>
      <li>Confidence label and near-cutoff note when needed</li>
    </ol>
  </div>
  <aside class="note">
    <h2>Browse-first direction</h2>
    <p>The hub is a product directory, not a duplicate homepage. It keeps the subject family connected and makes APUSH obvious under Social Science.</p>
    <p>Last updated: ${lastUpdated}. The same unofficial and browser-local messaging stays consistent across every page.</p>
  </aside>
</section>
<section class="section faq">
  <div class="section-heading">
    <p class="eyebrow">FAQ</p>
    <h2>Before you choose a calculator</h2>
  </div>
  ${faqs.map((qa) => `<details><summary>${escapeHtml(qa.q)}</summary><p>${escapeHtml(qa.a)}</p></details>`).join('\n')}
</section>`;
  return pageShell({
    title: 'AP Calculator Hub 2026 | All Free Score Tools',
    description: 'Browse all free AP score calculators for 2026 planning. Find APUSH, AP Lang, AP Lit, AP Gov, AP Biology, AP Chemistry, AP Calculus AB, AP Statistics, and more.',
    path: '/ap-score-calculator-2026/',
    body,
    nav: 'hub',
    schema: [webAppSchema(), faqSchema(faqs), breadcrumbs([{ name: 'AP Score Calculator 2026', item: '/ap-score-calculator-2026/' }])]
  });
}

function subjectPage(subject) {
  const isApush = subject.slug === 'apush';
  const sample = Object.fromEntries(subject.sections.map((section) => [section.key, Math.round(section.max * 0.7)]));
  const sampleResult = calculateScore(subject.slug, sample);
  const faqs = subjectFaqs(subject);
  const seoProfile = subjectSeoProfile(subject);
  const inputs = subject.sections.map((section) => `<label><span class="field-title">${escapeHtml(isApush ? apushLabel(section) : section.label)}</span><span class="field-range">0–${section.max}</span><input aria-label="${escapeHtml(isApush ? apushLabel(section) : section.label)}" inputmode="numeric" type="number" min="0" max="${section.max}" step="1" data-key="${section.key}" data-max="${section.max}" value=""></label>`).join('\n');
  const rows = conversionRows(subject).map((row) => `<tr><td>${row.apScore}</td><td>${escapeHtml(row.range)}</td><td>${row.apScore === 5 ? 'Estimated high-score range; keep reviewing misses.' : row.apScore >= 3 ? 'May be college-credit relevant, but policies vary by school.' : 'Use as a diagnostic baseline for study planning.'}</td></tr>`).join('\n');
  const data = escapeHtml(JSON.stringify(subject));
  const body = `
<section class="hero calculator-hero">
  <div class="calculator-intro">
    <p class="eyebrow">${isApush ? 'APUSH Score Calculator 2026 · calculator-first page' : `Maintained for 2026 · unofficial ${escapeHtml(subject.shortName)} estimate`}</p>
    <h1>${isApush ? 'APUSH Score Calculator 2026' : escapeHtml(subject.title)}</h1>
    <p class="hero-copy">${isApush ? 'Enter MCQ, SAQ, DBQ, and LEQ points to see an unofficial APUSH score estimate, composite range, the gap to your next target, and a study plan based on your weakest section.' : `${escapeHtml(subject.description)} Enter raw section points from a practice test to see an estimated AP score, target gap, weakest section, and a dynamic study plan. This is not an official AP score.`}</p>
    <div class="cta-row"><a class="button" href="#calculator">${isApush ? 'Estimate my APUSH score' : 'Estimate my score'}</a><a class="button secondary" href="#formula">${isApush ? 'See scoring formula' : 'See score ranges'}</a></div>
    <div class="trust-row"><span>Free</span><span>Browser-local</span><span>Unofficial</span><span>Not affiliated with College Board</span><span>2026 planning</span></div>
  </div>
  ${heroDashboardVisual(subject, sampleResult)}
</section>
<section class="section calculator-workspace${isApush ? ' apush-workspace v5-apush-workspace' : ''}" data-calculator data-subject="${data}" id="calculator">
  <div class="calculator-card">
    <div class="card-kicker">Enter scores</div>
    <form class="input-grid" aria-label="${escapeHtml(subject.shortName)} score inputs">${inputs}</form>
    <p class="input-helper">${isApush ? 'Use raw practice-test points: MCQ 0–55, SAQ 0–9, DBQ 0–7, LEQ 0–6.' : 'Use raw practice-test points for each section. Values are clamped to the allowed range.'}</p>
    <div class="result-panel unified-result-panel" aria-live="polite">
      <span class="label">Estimated AP score</span>
      <strong data-result-score>Enter scores</strong>
      <p data-result-composite>Estimated Composite Score will appear here.</p>
      <p data-result-explanation class="result-explanation">Add your raw points to see the score band, weakest section, and study gap.</p>
      <p class="confidence-badge" data-result-confidence>${escapeHtml(confidenceLabel(subject))}: ${escapeHtml(confidenceCopy(subject))}</p>
      <p class="validation-message" data-validation-message hidden></p>
      <ul data-result-needed></ul>
      <p class="microcopy">Unofficial estimate. Actual AP scores may differ. Your calculator inputs are processed in your browser and are not stored by us.</p>
    </div>
  </div>
</section>
  <section class="section v5-apush-followup">
  <div class="v5-followup-shell">
    <div class="section-heading v5-followup-heading"><p class="eyebrow">Plan first, reference second</p><h2>Next-step plan</h2><p>Update your scores above, then read the plan first. Open the reference drawer only when you need the cutoff math.</p></div>
    <div class="v5-followup-grid">
      <div class="v5-followup-primary">${studyPlanPanel(subject, sample)}</div>
      <div class="v5-followup-secondary">${referenceAccordions(subject, rows)}</div>
    </div>
  </div>
</section>
${subjectSeoSupportSection(subject)}
<section class="section faq">
  <div class="section-heading">
    <p class="eyebrow">FAQ</p>
    <h2>${escapeHtml(subject.shortName)} questions students ask after practice tests</h2>
  </div>
  ${faqs.map((qa) => `<details><summary>${escapeHtml(qa.q)}</summary><p>${escapeHtml(qa.a)}</p></details>`).join('\n')}
</section>
${relatedCalculatorSection(subject)}`;
  return pageShell({
    title: ['ap-lang', 'ap-lit'].includes(subject.slug)
      ? subject.title
      : `${subject.title} | 2026 Guide`,
    description: seoProfile.description,
    path: `/${subject.slug}-score-calculator/`,
    body,
    nav: 'subject',
    schema: [
      webAppSchema(subject),
      faqSchema(faqs),
      breadcrumbs([
        { name: 'AP Score Calculator 2026', item: '/ap-score-calculator-2026/' },
        { name: subject.title, item: `/${subject.slug}-score-calculator/` }
      ])
    ]
  });
}

function policyPage({ title, description, path, body }) {
  return pageShell({
    title,
    description,
    path,
    body: `<section class="section legal"><h1>${escapeHtml(title.replace(' | AP Score Calculator 2026', ''))}</h1>${body}</section>`,
    schema: [breadcrumbs([{ name: 'AP Score Calculator 2026', item: '/ap-score-calculator-2026/' }, { name: title.split('|')[0].trim(), item: path }])]
  });
}

export function sitePages() {
  return [
    { path: 'index.html', html: homePage() },
    { path: 'ap-score-calculator-2026/index.html', html: hubPage() },
    ...subjects.map((subject) => ({ path: `${subject.slug}-score-calculator/index.html`, html: subjectPage(subject) })),
    { path: 'privacy.html', html: policyPage({
      title: 'Privacy Policy | AP Score Calculator 2026',
      description: 'Privacy policy for AP Score Calculator 2026, covering local calculator inputs, analytics, hosting logs, and student data safeguards.',
      path: '/privacy.html',
      body: '<p>This static site does not require accounts and does not store calculator inputs. Calculator values are processed locally in your browser.</p><p>Hosting or CDN providers may process standard technical logs such as IP address, user agent, page path, and timestamp for security and delivery. If privacy-friendly analytics are added later, they should avoid collecting precise score inputs, names, school information, or official account details.</p><p>AP® and Advanced Placement® are trademarks registered by College Board. College Board is not affiliated with, and does not endorse, this website or calculator.</p>'
    }) },
    { path: 'terms.html', html: policyPage({
      title: 'Terms of Use | AP Score Calculator 2026 Site',
      description: 'Terms of use for AP Score Calculator 2026, including unofficial estimate limits, educational use, and no guarantee of AP results.',
      path: '/terms.html',
      body: '<p>Use this site for informational study planning only. The calculators provide unofficial estimates and do not guarantee any AP exam result, college credit, or placement outcome.</p><p>Do not rely on this site as a substitute for official College Board score reports, teacher guidance, or college credit policies.</p>'
    }) },
    { path: 'disclaimer.html', html: policyPage({
      title: 'Disclaimer | AP Score Calculator 2026 Site',
      description: 'Unofficial AP score estimate disclaimer for AP Score Calculator 2026, including College Board trademark notice and scoring limits.',
      path: '/disclaimer.html',
      body: `<p>${trademarkNotice}</p><p>All conversions and score-needed figures are transparent estimates based on public exam structure and historical patterns. Actual scoring may vary by year, exam form, and official process.</p>`
    }) },
    { path: 'contact.html', html: policyPage({
      title: 'Contact Us | AP Score Calculator 2026 Site',
      description: 'Contact AP Score Calculator 2026 for corrections, accessibility feedback, calculator questions, and responsible content updates.',
      path: '/contact.html',
      body: '<p>For corrections, accessibility feedback, or content questions, email <a href="mailto:hello@apscorecalculator.store">hello@apscorecalculator.store</a>.</p><p>Please do not send official score reports, student IDs, school records, AP numbers, or private College Board account information.</p>'
    }) }
  ];
}
