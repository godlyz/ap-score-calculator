import { calculateScore, conversionRows, maxComposite, subjects } from './scoreEngine.js';

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

function pageShell({ title, description, path, body, schema = [] }) {
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
  <link rel="stylesheet" href="/assets/styles.css">
  ${schemaTags}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/ap-score-calculator-2026/" aria-label="AP Score Calculator 2026 home"><span class="brand-mark" aria-hidden="true">▦</span><span>AP Score Calculator 2026</span></a>
    <nav aria-label="Primary navigation">
      <a href="/ap-score-calculator-2026/#calculator-start">Calculators</a>
      <a href="/ap-score-calculator-2026/#subjects">Subjects</a>
      <a href="/ap-score-calculator-2026/#methodology">Methodology</a>
      <a href="/privacy.html">Privacy</a>
    </nav>
  </header>
  <main>${body}</main>
  <footer class="site-footer">
    <div>
      <strong>Independent, transparent AP score estimates.</strong>
      <p>${trademarkNotice}</p>
    </div>
    <nav aria-label="Footer navigation">
      <a href="/ap-score-calculator-2026/">Home</a>
      <a href="/privacy.html">Privacy</a>
      <a href="/terms.html">Terms</a>
      <a href="/disclaimer.html">Disclaimer</a>
      <a href="/contact.html">Contact</a>
    </nav>
    <p class="fine-print">Calculator inputs are processed locally in your browser and are not stored by us. Please do not send score reports, student IDs, or College Board account details.</p>
  </footer>
  <script type="module" src="/assets/app.js"></script>
</body>
</html>`;
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

function hubPage() {
  const faqs = [
    { q: 'Is this AP score calculator official?', a: 'No. This calculator is unofficial and is not affiliated with or endorsed by College Board. It uses public exam structures, historical scoring patterns, and transparent assumptions to provide a planning estimate. Your official AP score may differ.' },
    { q: 'How accurate is the calculator?', a: 'Use it as a directional study-planning tool, not a score report. Actual AP scores can vary by year, exam form, and official score-setting process.' },
    { q: 'What score do I need for a 5?', a: 'Enter your section points in a subject calculator to see an estimated gap to a 5. The number is not an official cutoff. It is a planning estimate based on the calculator’s conversion assumptions.' },
    { q: 'Does this site store my scores?', a: 'No. Calculator inputs are processed in your browser by this static site and are not stored by us.' }
  ];
  const quickLinks = subjects.slice(0, 6).map((subject) => `<a href="/${subject.slug}-score-calculator/">${escapeHtml(subject.shortName)}</a>`).join('');
  const body = `
<section class="hero hub-hero">
  <div class="hero-copy-block">
    <p class="eyebrow">Maintained for 2026 AP planning · unofficial estimate · mobile-first</p>
    <h1>Know where your AP practice score stands — before test day.</h1>
    <p class="hero-copy">Choose your AP subject, enter raw section points from a practice test, and get an estimated 1–5 score band with the gap to a 3, 4, or 5. Built for students in the U.S. and Canada who want a fast, transparent check of what score you need without creating an account.</p>
    <div class="cta-row">
      <a class="button" href="#calculator-start">Choose your subject</a>
      <a class="button secondary" href="#methodology">How estimates work</a>
    </div>
    <p class="hero-disclaimer">This is an independent planning tool. It is not affiliated with or endorsed by College Board.</p>
  </div>
  <aside class="hero-panel preview-card" aria-label="Calculator preview">
    <span class="preview-label">Example preview</span>
    <strong>Estimated AP Score</strong>
    <div class="preview-score">4</div>
    <p>Estimated Composite Score: 74 / 100</p>
    <ul>
      <li>You may need about 8 more composite points to reach a 5.</li>
      <li>Inputs stay in your browser.</li>
      <li>Enter your real section points on a subject page to see your estimate.</li>
    </ul>
  </aside>
</section>
<section id="calculator-start" class="section intro-strip">
  <p>Popular starting points</p>
  <div class="quick-links">${quickLinks}<a href="#subjects">View all subjects</a></div>
</section>
<section id="subjects" class="section">
  <div class="section-heading">
    <p class="eyebrow">Subject matrix</p>
    <h2>Pick the AP exam you are practicing for</h2>
    <p>Grouped for quick mobile browsing. Each page includes input limits, an estimated composite range, result interpretation, FAQ, and clear unofficial-estimate disclaimers.</p>
  </div>
  <div class="subject-matrix">${subjectMatrix()}</div>
</section>
<section class="section two-col" id="methodology">
  <div>
    <p class="eyebrow">How results are estimated</p>
    <h2>Transparent raw score conversion without pretending to be official</h2>
    <ol class="steps">
      <li>Enter estimated MCQ, FRQ, DBQ, LEQ, or essay points from a practice attempt.</li>
      <li>The calculator clamps impossible inputs and maps valid points into an estimated composite score.</li>
      <li>The result compares that composite with historical score bands and shows estimated gaps to 3, 4, and 5.</li>
    </ol>
  </div>
  <aside class="note">
    <h2>2026 planning note</h2>
    <p>Last updated: ${lastUpdated}. These calculators are maintained for 2026 AP planning. They use public exam structures, historical scoring patterns, and transparent assumptions to estimate an AP score range.</p>
    <p>They are not official College Board score calculators. Your final AP score is determined by College Board and may differ from this estimate.</p>
  </aside>
</section>
<section class="section faq">
  <div class="section-heading">
    <p class="eyebrow">FAQ</p>
    <h2>Before you use the calculators</h2>
  </div>
  ${faqs.map((qa) => `<details><summary>${escapeHtml(qa.q)}</summary><p>${escapeHtml(qa.a)}</p></details>`).join('\n')}
</section>`;
  return pageShell({
    title: 'AP Score Calculator 2026 | Free Unofficial Raw Score Estimator',
    description: 'Free unofficial AP Score Calculator 2026 hub with subject calculators, estimated raw conversion charts, gap-to-5 guidance, and transparent assumptions.',
    path: '/ap-score-calculator-2026/',
    body,
    schema: [webAppSchema(), faqSchema(faqs), breadcrumbs([{ name: 'AP Score Calculator 2026', item: '/ap-score-calculator-2026/' }])]
  });
}

function subjectPage(subject) {
  const sample = Object.fromEntries(subject.sections.map((section) => [section.key, Math.round(section.max * 0.7)]));
  const sampleResult = calculateScore(subject.slug, sample);
  const faqs = [
    { q: `Is this ${subject.shortName} calculator official?`, a: 'No. This calculator is unofficial and is not affiliated with or endorsed by College Board. It uses public exam structures, historical scoring patterns, and transparent assumptions to provide a planning estimate. Your official AP score may differ.' },
    { q: `What score do I need for a 5 on ${subject.shortName}?`, a: 'Enter your section points in the calculator to see an estimated gap to a 5. The number is not an official cutoff. It is a planning estimate based on the calculator’s conversion assumptions.' },
    { q: 'How should I use the score-needed result?', a: 'Use it as study guidance. Try adjusting one section at a time to see which extra raw points may move your score fastest.' },
    { q: 'Are the raw score conversions exact?', a: 'No. This conversion chart is estimated from public exam structure and historical scoring patterns. It is not an official College Board conversion table.' }
  ];
  const inputs = subject.sections.map((section) => `<label>${escapeHtml(section.label)} <span>0–${section.max}</span><input inputmode="numeric" type="number" min="0" max="${section.max}" step="1" data-key="${section.key}" data-max="${section.max}" value=""></label>`).join('\n');
  const rows = conversionRows(subject).map((row) => `<tr><td>${row.apScore}</td><td>${escapeHtml(row.range)}</td><td>${row.apScore === 5 ? 'Estimated high-score range; keep reviewing misses.' : row.apScore >= 3 ? 'May be college-credit relevant, but policies vary by school.' : 'Use as a diagnostic baseline for study planning.'}</td></tr>`).join('\n');
  const related = subjects.filter((item) => item.slug !== subject.slug).slice(0, 4).map((item) => `<a href="/${item.slug}-score-calculator/">${escapeHtml(item.shortName)} calculator</a>`).join('');
  const data = escapeHtml(JSON.stringify(subject));
  const body = `
<section class="hero calculator-hero" data-calculator data-subject="${data}">
  <div class="calculator-intro">
    <p class="eyebrow">Maintained for 2026 · unofficial ${escapeHtml(subject.shortName)} estimate</p>
    <h1>${escapeHtml(subject.title)}</h1>
    <p class="hero-copy">${escapeHtml(subject.description)} Enter raw section points from a practice test to see an estimated AP score, estimated composite score, and the study gap to your next target. This is not an official AP score.</p>
    <div class="trust-row"><span>Local browser calculation</span><span>Transparent assumptions</span><span>No signup</span><span>Unofficial estimate</span></div>
  </div>
  <div class="calculator-card" id="calculator">
    <div class="card-kicker">Score input</div>
    <form class="input-grid" aria-label="${escapeHtml(subject.shortName)} score inputs">${inputs}</form>
    <div class="result-panel" aria-live="polite">
      <span class="label">Estimated AP score</span>
      <strong data-result-score>Enter scores</strong>
      <p data-result-composite>Estimated Composite Score will appear here.</p>
      <p data-result-explanation class="result-explanation">Add your raw points to see the score band and study gap.</p>
      <p class="validation-message" data-validation-message hidden></p>
      <ul data-result-needed></ul>
      <p class="microcopy">Unofficial estimate. Actual AP scores may differ. Your calculator inputs are processed in your browser and are not stored by us.</p>
    </div>
  </div>
</section>
<section class="section conversion-section">
  <div class="section-heading">
    <p class="eyebrow">Raw score conversion</p>
    <h2>Estimated ${escapeHtml(subject.shortName)} composite ranges</h2>
    <p class="note-inline">This conversion chart is an estimate based on public exam structure and historical scoring patterns. It is not an official College Board conversion table, and actual AP score cutoffs may vary by year and exam administration.</p>
  </div>
  <div class="table-wrap"><table><thead><tr><th>Estimated AP Score</th><th>Estimated composite range</th><th>How to read it</th></tr></thead><tbody>${rows}</tbody></table></div>
</section>
<section class="section two-col result-interpretation">
  <div>
    <p class="eyebrow">Result interpretation</p>
    <h2>What score do I need?</h2>
    <p>${escapeHtml(subject.structure)}</p>
    <p>Example preview: with a sample composite of ${sampleResult.composite}, this calculator estimates you may need about ${sampleResult.needed[5]} more composite points to reach a 5. Enter your own section points above for your estimate.</p>
    <p>Because raw section weights differ, the best study move is not always “more total questions.” Review the section inputs and prioritize the area where a realistic raw-point gain may move your composite past the next estimated range.</p>
  </div>
  <aside class="note">
    <h2>Methodology and assumptions</h2>
    <p>${escapeHtml(subject.assumptions)}</p>
    <p>This calculator combines your section inputs into an estimated raw or composite score, then maps that score to an AP 1–5 range using historical scoring patterns, public exam structure, and transparent assumptions. Because official AP score setting can vary by year and exam administration, this result should be used as an unofficial planning estimate.</p>
    <p>Last updated: ${lastUpdated}</p>
  </aside>
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
    title: `${subject.title} | Score Estimate`,
    description: `Free unofficial ${subject.shortName} score calculator for 2026 AP planning. Enter section points to estimate your AP score, composite range, and gap to 5.`,
    path: `/${subject.slug}-score-calculator/`,
    body,
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
    { path: 'ap-score-calculator-2026/index.html', html: hubPage() },
    { path: 'index.html', html: hubPage() },
    ...subjects.map((subject) => ({ path: `${subject.slug}-score-calculator/index.html`, html: subjectPage(subject) })),
    { path: 'privacy.html', html: policyPage({
      title: 'Privacy Policy | AP Score Calculator 2026',
      description: 'Privacy policy for the static AP Score Calculator 2026 calculator site.',
      path: '/privacy.html',
      body: '<p>This static site does not require accounts and does not store calculator inputs. Calculator values are processed locally in your browser.</p><p>Hosting or CDN providers may process standard technical logs such as IP address, user agent, page path, and timestamp for security and delivery. If privacy-friendly analytics are added later, they should avoid collecting precise score inputs, names, school information, or official account details.</p><p>AP® and Advanced Placement® are trademarks registered by College Board. College Board is not affiliated with, and does not endorse, this website or calculator.</p>'
    }) },
    { path: 'terms.html', html: policyPage({
      title: 'Terms of Use | AP Score Calculator 2026',
      description: 'Terms of use for AP Score Calculator 2026 unofficial educational estimates.',
      path: '/terms.html',
      body: '<p>Use this site for informational study planning only. The calculators provide unofficial estimates and do not guarantee any AP exam result, college credit, or placement outcome.</p><p>Do not rely on this site as a substitute for official College Board score reports, teacher guidance, or college credit policies.</p>'
    }) },
    { path: 'disclaimer.html', html: policyPage({
      title: 'Disclaimer | AP Score Calculator 2026',
      description: 'Unofficial AP score estimate disclaimer and trademark notice.',
      path: '/disclaimer.html',
      body: `<p>${trademarkNotice}</p><p>All conversions and score-needed figures are transparent estimates based on public exam structure and historical patterns. Actual scoring may vary by year, exam form, and official process.</p>`
    }) },
    { path: 'contact.html', html: policyPage({
      title: 'Contact | AP Score Calculator 2026',
      description: 'Contact AP Score Calculator 2026 for corrections and feedback.',
      path: '/contact.html',
      body: '<p>For corrections, accessibility feedback, or content questions, email <a href="mailto:hello@apscorecalculator.store">hello@apscorecalculator.store</a>.</p><p>Please do not send official score reports, student IDs, school records, AP numbers, or private College Board account information.</p>'
    }) }
  ];
}
