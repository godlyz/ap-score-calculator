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
  <link rel="stylesheet" href="/assets/styles.css?v=v6-ga4-20260513">
  ${schemaTags}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8YKL96LGT4"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-8YKL96LGT4');</script>
</head>
<body>
  ${siteHeader(nav, path)}
  <main>${body}</main>
  ${siteFooter()}
  <script type="module" src="/assets/app.js?v=v6-ga4-20260513"></script>
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

function apushDynamicResultsPanel(subject, result) {
  const rows = conversionRows(subject).slice().reverse();
  const sectionRows = subject.sections.map((section) => {
    const raw = Math.round(section.max * 0.7);
    const weighted = section.max > 0 ? (raw / section.max) * section.weight : 0;
    const pct = Math.max(0, Math.min(100, (raw / section.max) * 100));
    return `<div class="v4-contrib-row" data-contrib-row="${section.key}"><span>${escapeHtml(section.key.toUpperCase())} (${Math.round(section.weight)}%)</span><div><i data-contrib-bar="${section.key}" style="width:${pct.toFixed(1)}%"></i></div><strong data-contrib-value="${section.key}">${weighted.toFixed(1)}</strong></div>`;
  }).join('');
  const bandCards = rows.map((row) => `<div class="v4-band-card v4-band-${row.apScore}" data-v4-band="${row.apScore}"><strong>${row.apScore}</strong><span>${escapeHtml(row.range)}</span></div>`).join('');
  return `<aside class="v4-results-panel" data-v4-apush-results aria-live="polite" aria-label="Dynamic APUSH estimated results dashboard">
    <div class="v4-results-card">
      <div class="v4-results-head"><h2>Estimated Results</h2><p>Unofficial estimate — real curves vary slightly each year.</p></div>
      <div class="v4-score-row"><div><span>Predicted AP Score</span><strong data-v4-score>${result.predictedScore}</strong></div><div class="v4-stars" data-v4-stars aria-label="Predicted score stars"></div></div>
      <p class="v4-score-label" data-v4-label>Use your inputs to identify the weakest APUSH section.</p>
      <div class="v4-composite"><div><span>Composite (out of ${result.maxComposite})</span><strong data-v4-composite>${result.composite}</strong></div><div class="v4-progress-track"><i data-v4-composite-bar style="width:${Math.min(100, result.composite / result.maxComposite * 100).toFixed(1)}%"></i></div><div class="v4-scale"><span>0</span><span>${subject.cutoffs[2]}</span><span>${subject.cutoffs[3]}</span><span>${subject.cutoffs[4]}</span><span>${subject.cutoffs[5]}</span><span>${result.maxComposite}</span></div></div>
      <div class="v4-contrib"><h3>Section Contributions</h3>${sectionRows}</div>
      <div class="v4-band-grid">${bandCards}</div>
    </div>
    <div class="v4-next-card"><h3>📌 What to do with this result</h3><p>→ Find the section contributing the fewest composite points in the breakdown above — that is where to focus next.</p><p>→ Use the <a href="#formula">Scoring Explained</a> section to see how many composite points separate your current score from the next band.</p><p>→ Follow a 3-month APUSH study plan and systematically raise your weakest section.</p></div>
  </aside>`;
}


function apushHowItWorksDeepSection() {
  return `<section class="section v4-theme-section v4-how-works" id="scoring-explained">
    <div class="v4-theme-head"><h2>How This APUSH Score Calculator Works</h2><p>The calculator uses APUSH section weights and maps the resulting composite to a 1–5 score using estimated cutoffs. Here is the exact math so students can verify the result instead of trusting a black box.</p></div>
    <div class="v4-step-grid"><article class="v4-theme-card"><h3>Step 1 — Convert each section to its weighted score</h3><div class="v4-formula-list"><div><b class="blue">MCQ (40%)</b><code>(correct ÷ 55) × 40 = contribution</code><span>E.g. 45 correct → (45/55) × 40 = <strong>32.7</strong></span></div><div><b class="purple">SAQ (20%)</b><code>(points ÷ 9) × 20 = contribution</code><span>E.g. 7 pts → (7/9) × 20 = <strong>15.6</strong></span></div><div><b class="green">DBQ (25%)</b><code>(points ÷ 7) × 25 = contribution</code><span>E.g. 5 pts → (5/7) × 25 = <strong>17.9</strong></span></div><div><b class="orange">LEQ (15%)</b><code>(points ÷ 6) × 15 = contribution</code><span>E.g. 4 pts → (4/6) × 15 = <strong>10.0</strong></span></div></div></article><article class="v4-theme-card"><h3>Step 2 — Add to composite, map to 1–5</h3><p>Add all four weighted contributions. The total is your composite out of 100, then it maps to an estimated 1–5 AP score.</p><div class="v4-cutoff-bars"><div class="score5"><b>5</b><i style="width:100%"></i><span>80–100 pts</span></div><div class="score4"><b>4</b><i style="width:79%"></i><span>65–79 pts</span></div><div class="score3"><b>3</b><i style="width:64%"></i><span>45–64 pts</span></div><div class="score2"><b>2</b><i style="width:44%"></i><span>30–44 pts</span></div><div class="score1"><b>1</b><i style="width:30%"></i><span>&lt; 30 pts</span></div></div><p class="v4-note-line">Actual cutoffs can shift each year. Use this as planning guidance, not an official score report.</p></article></div>
    <article class="v4-worked-example"><h3>📝 Worked Example — Student Aiming for a 5</h3><div class="v4-example-grid"><div><b>MCQ: 45/55</b><span>(45/55) × 40 = 32.7</span></div><div><b>SAQ: 7/9</b><span>(7/9) × 20 = 15.6</span></div><div><b>DBQ: 5/7</b><span>(5/7) × 25 = 17.9</span></div><div><b>LEQ: 4/6</b><span>(4/6) × 15 = 10.0</span></div></div><p><strong>Composite: 32.7 + 15.6 + 17.9 + 10.0 = 76.2 → Predicted Score: 4</strong> — just below the 5 threshold. To push into a 5, this student needs about 3.8 more composite points.</p></article>

  </section>`;
}
function apushExamFormatDeepSection() {
  return `<section class="section v4-theme-section v4-exam-format" id="exam-format"><div class="v4-theme-head"><h2>2026 APUSH exam structure and digital format</h2><p>The AP U.S. History exam is 3 hours and 15 minutes long. Since May 2025 it is fully digital through College Board's Bluebook app; students type all essays while content, timing, and rubrics remain aligned with the APUSH exam.</p></div><div class="v4-table-wrap"><table><thead><tr><th>Section</th><th>Details</th><th>Time</th><th>Max Points</th><th>Score Weight</th></tr></thead><tbody><tr><td>Multiple Choice (MCQ)</td><td>55 stimulus-based questions; no wrong-answer penalty</td><td>55 min</td><td>55 pts</td><td>40%</td></tr><tr><td>Short Answer (SAQ)</td><td>3 questions; each worth 3 points</td><td>40 min</td><td>9 pts</td><td>20%</td></tr><tr><td>Document-Based Question (DBQ)</td><td>1 essay with 7 source documents</td><td>60 min</td><td>7 pts</td><td>25%</td></tr><tr><td>Long Essay (LEQ)</td><td>Choose 1 of 3 prompts: causation, comparison, or CCOT</td><td>40 min</td><td>6 pts</td><td>15%</td></tr></tbody></table></div><div class="v4-bluebook-callout"><h3>Digital Bluebook Exam — Key Facts for 2026</h3><ul><li>Download Bluebook and complete the preview before exam day.</li><li>Scratch paper is provided; outline DBQ and LEQ before typing.</li><li>Content, rubrics, and scoring are the same as the paper-style exam.</li><li>Practice timed typing for DBQ and LEQ.</li><li>You can tag and return to MCQs within the section.</li></ul></div><div class="v4-benchmark-grid"><article><h3>What Score Do You Need? Benchmarks for a 3, 4, and 5</h3><table><thead><tr><th>Section</th><th>For a 3</th><th>For a 4</th><th>For a 5</th></tr></thead><tbody><tr><td>MCQ 55 Qs</td><td>30–35</td><td>38–43</td><td>45+</td></tr><tr><td>SAQ 9 pts</td><td>4–5</td><td>6–7</td><td>7–8</td></tr><tr><td>DBQ 7 pts</td><td>2–3</td><td>4–5</td><td>5–6</td></tr><tr><td>LEQ 6 pts</td><td>2</td><td>3–4</td><td>4–5</td></tr></tbody></table></article><aside><h3>The Fastest Way to Raise Your Score</h3><p>DBQ is 25% of the score. Improving from 3/7 to 5/7 can add about 7 composite points, enough to move many students from a 3 toward a 4.</p></aside></div><div class="v4-credit-cards"><h3>APUSH Score & College Credit: What Each Score Gets You</h3><div><b class="score5">5</b><p><strong>Extremely Well Qualified.</strong> Many schools grant U.S. History credit or placement.</p></div><div><b class="score4">4</b><p><strong>Well Qualified.</strong> Often earns one semester or satisfies a general education requirement.</p></div><div><b class="score3">3</b><p><strong>Qualified.</strong> Minimum credit score at many institutions, but policies vary.</p></div><div><b class="score2">1–2</b><p><strong>Usually no credit.</strong> Still useful as a diagnostic for APUSH preparation.</p></div></div></section>`;
}
function apushResourcesDeepSection() {
  const cards = [['🏆','APUSH Tips for Getting a 5','Full exam strategy: section score targets, study schedule, essay priorities, and composite math behind a 5.'],['📄','APUSH DBQ Examples & Tips','Thesis examples, document grouping, sourcing strategies, and how to earn complexity on the 7-point DBQ rubric.'],['✍️','APUSH LEQ Examples & Tips','Thesis templates and examples for causation, comparison, and CCOT prompts.'],['📚','APUSH Resources & Practice Tests','Practice tests, question banks, review videos, and a weekly routine to combine them.'],['📐','APUSH Scoring Explained','The complete breakdown of how raw section scores convert to composite and final AP score.'],['🎯','Weak MCQ Strategy','How to lift the biggest section when content recall or stimulus pacing is holding your APUSH estimate down.'],['🗓️','3-Month APUSH Study Plan','12-week schedule with content review, practice questions, DBQ/LEQ writing, and calculator check-ins.']];
  return `<section class="section v4-theme-section v4-resources" id="resources"><div class="v4-theme-head"><h2>What to practice next: APUSH Study Resources — Use These With the Calculator</h2><p>The calculator is most powerful when combined with targeted study. These guides are built around the same rubrics and scoring logic, so every essay improvement directly moves the numbers you enter here.</p></div><div class="v4-resource-grid">${cards.map(([icon,title,copy], index) => `<a href="#resources" class="v4-resource-card card-${index}"><span>${icon}</span><strong>${title}</strong><p>${copy}</p></a>`).join('')}<a href="#resources" class="v4-resource-card wide"><span>🧭</span><strong>APUSH Tips & Guides Hub</strong><p>All strategy articles in one place — section by section, exam format, unit weights, MCQ tactics, and more.</p><em>→</em></a></div><div class="v4-faq-accordion"><h2>APUSH Score Calculator — Frequently Asked Questions</h2>${['How accurate is this APUSH score calculator?','Where do I get my MCQ, SAQ, DBQ, and LEQ scores to enter?','What if one section like DBQ is dragging my composite score down?','What score do I need for college credit?','How often should I use this calculator during APUSH prep?','Is APUSH hard? What is the pass rate?'].map((q)=>`<details><summary>${q}</summary><p>Use the calculator as an unofficial planning estimate. Enter practice-test section scores, then focus study on the section with the best realistic point gain.</p></details>`).join('')}</div></section>`;
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
  const faqs = isApush ? [
    { q: 'Is this APUSH calculator official?', a: 'No. It is an independent, unofficial planning tool and is not affiliated with or endorsed by College Board.' },
    { q: 'How accurate is it?', a: 'It is best used as a planning estimate, not a score guarantee. AP cutoffs can vary by year, exam form, and official score-setting process.' },
    { q: 'What score do I need for a 5?', a: 'Enter MCQ, SAQ, DBQ, and LEQ points to see an estimated gap to a 5. The result is a planning range, not an official cutoff.' },
    { q: 'Why do results differ from other sites?', a: 'Different calculators may use different assumptions, historical ranges, or conversion logic. This site shows transparent assumptions and a conservative planning approach.' },
    { q: 'Does it store my scores?', a: 'No. Inputs are processed locally in your browser and are not stored by us.' },
    { q: 'What if I am close to a cutoff?', a: 'Treat the result as a near-cutoff zone and aim for extra buffer points before test day.' }
  ] : [
    { q: `Is this ${subject.shortName} calculator official?`, a: 'No. This calculator is unofficial and is not affiliated with or endorsed by College Board. It uses public exam structures, historical scoring patterns, and transparent assumptions to provide a planning estimate. Your official AP score may differ.' },
    { q: `What score do I need for a 5 on ${subject.shortName}?`, a: 'Enter your section points in the calculator to see an estimated gap to a 5. The number is not an official cutoff. It is a planning estimate based on the calculator’s conversion assumptions.' },
    { q: 'How should I use the score-needed result?', a: 'Use it as study guidance. Try adjusting one section at a time to see which extra raw points may move your score fastest.' },
    { q: 'Are the raw score conversions exact?', a: 'No. This conversion chart is estimated from public exam structure and historical scoring patterns. It is not an official College Board conversion table.' },
    { q: `How confident is this ${subject.shortName} estimate?`, a: `${confidenceCopy(subject)} ${subject.riskNote}` }
  ];
  const inputs = subject.sections.map((section) => `<label><span class="field-title">${escapeHtml(isApush ? apushLabel(section) : section.label)}</span><span class="field-range">0–${section.max}</span><input aria-label="${escapeHtml(isApush ? apushLabel(section) : section.label)}" inputmode="numeric" type="number" min="0" max="${section.max}" step="1" data-key="${section.key}" data-max="${section.max}" value=""></label>`).join('\n');
  const rows = conversionRows(subject).map((row) => `<tr><td>${row.apScore}</td><td>${escapeHtml(row.range)}</td><td>${row.apScore === 5 ? 'Estimated high-score range; keep reviewing misses.' : row.apScore >= 3 ? 'May be college-credit relevant, but policies vary by school.' : 'Use as a diagnostic baseline for study planning.'}</td></tr>`).join('\n');
  const related = subjects.filter((item) => item.slug !== subject.slug).slice(0, 4).map((item) => `<a href="/${item.slug}-score-calculator/">${escapeHtml(item.shortName)} calculator</a>`).join('');
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
<section class="section faq">
  <div class="section-heading">
    <p class="eyebrow">FAQ</p>
    <h2>${escapeHtml(subject.shortName)} questions students ask after practice tests</h2>
  </div>
  ${faqs.map((qa) => `<details><summary>${escapeHtml(qa.q)}</summary><p>${escapeHtml(qa.a)}</p></details>`).join('\n')}
</section>
<section class="section links">
  <h2>Related AP calculators</h2>
  <a href="/ap-score-calculator-2026/">All AP score calculators</a>${related}
</section>`;
  return pageShell({
    title: ['ap-lang', 'ap-lit'].includes(subject.slug)
      ? subject.title
      : `${subject.title} | Raw Score & Gap to 5`,
    description: `Free unofficial ${subject.shortName} score calculator for 2026 AP planning. Estimate your score, confidence level, composite range, and gap to 3/4/5.`,
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
      description: 'Privacy policy for the static AP Score Calculator 2026 calculator site.',
      path: '/privacy.html',
      body: '<p>This static site does not require accounts and does not store calculator inputs. Calculator values are processed locally in your browser.</p><p>Hosting or CDN providers may process standard technical logs such as IP address, user agent, page path, and timestamp for security and delivery. If privacy-friendly analytics are added later, they should avoid collecting precise score inputs, names, school information, or official account details.</p><p>AP® and Advanced Placement® are trademarks registered by College Board. College Board is not affiliated with, and does not endorse, this website or calculator.</p>'
    }) },
    { path: 'terms.html', html: policyPage({
      title: 'Terms of Use | AP Score Calculator 2026 Site',
      description: 'Terms of use for AP Score Calculator 2026 unofficial educational estimates.',
      path: '/terms.html',
      body: '<p>Use this site for informational study planning only. The calculators provide unofficial estimates and do not guarantee any AP exam result, college credit, or placement outcome.</p><p>Do not rely on this site as a substitute for official College Board score reports, teacher guidance, or college credit policies.</p>'
    }) },
    { path: 'disclaimer.html', html: policyPage({
      title: 'Disclaimer | AP Score Calculator 2026 Site',
      description: 'Unofficial AP score estimate disclaimer and trademark notice.',
      path: '/disclaimer.html',
      body: `<p>${trademarkNotice}</p><p>All conversions and score-needed figures are transparent estimates based on public exam structure and historical patterns. Actual scoring may vary by year, exam form, and official process.</p>`
    }) },
    { path: 'contact.html', html: policyPage({
      title: 'Contact Us | AP Score Calculator 2026 Site',
      description: 'Contact AP Score Calculator 2026 for corrections and feedback.',
      path: '/contact.html',
      body: '<p>For corrections, accessibility feedback, or content questions, email <a href="mailto:hello@apscorecalculator.store">hello@apscorecalculator.store</a>.</p><p>Please do not send official score reports, student IDs, school records, AP numbers, or private College Board account information.</p>'
    }) }
  ];
}
