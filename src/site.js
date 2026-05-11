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
  <link rel="stylesheet" href="/assets/styles.css?v=v3-2-2223c56">
  ${schemaTags}
</head>
<body>
  ${siteHeader(nav, path)}
  <main>${body}</main>
  ${siteFooter()}
  <script type="module" src="/assets/app.js"></script>
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
  const primary = nav === 'home'
    ? `
      <a href="#subjects">Subjects</a>
      <a href="#hub-preview">Hub preview</a>
      <a href="#methodology">Methodology</a>
      <a href="/privacy.html">Privacy</a>`
    : nav === 'hub'
      ? `
      ${navItem(homePath, 'Home', currentPath, homePath)}
      ${navItem(hubPath, 'Hub', currentPath, hubPath)}
      ${navItem(apushPath, 'APUSH', currentPath, apushPath)}
      ${navItem('/privacy.html', 'Privacy', currentPath, '/privacy.html')}
      ${navItem('/terms.html', 'Terms', currentPath, '/terms.html')}`
      : `
      ${navItem(homePath, 'Home', currentPath, homePath)}
      ${navItem(hubPath, 'Hub', currentPath, hubPath)}
      ${navItem(apushPath, 'APUSH', currentPath, apushPath)}
      ${navItem('/privacy.html', 'Privacy', currentPath, '/privacy.html')}
      ${navItem('/disclaimer.html', 'Disclaimer', currentPath, '/disclaimer.html')}`;
  return `<header class="site-header">
    <a class="brand" href="/" aria-label="AP Score Calculator 2026 home"><span class="brand-mark" aria-hidden="true">▦</span><span>AP Score Calculator 2026</span></a>
    <nav aria-label="Primary navigation">${primary}</nav>
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
  return labels[subject.confidence] || 'Estimate confidence noted';
}

function confidenceCopy(subject) {
  if (subject.confidence === 'low') {
    return 'Confidence: conservative. This subject has essay-heavy, recent-change, or reader-dependent scoring, so leave a larger safety buffer around every estimated cutoff.';
  }
  return 'Confidence: moderate. The calculator is useful for planning, but yearly equating and section-level scoring can still move the official boundary.';
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
  return `<aside class="hero-panel score-dashboard-visual" data-score-dashboard${legacyApushAttr} aria-label="${escapeHtml(title)}">
    <div class="dashboard-top"><span class="preview-label">Live-style preview</span><b>${escapeHtml(subject.shortName)} score dashboard</b></div>
    <div class="dashboard-score"><span>Estimated AP</span><strong data-dashboard-score>${result.predictedScore}</strong><em data-dashboard-composite>${result.composite}/${result.maxComposite} composite</em></div>
    ${scoreBandStrip(subject, result.composite)}
    ${targetComparisonStrip(subject, result)}
  </aside>`;
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
    const line = subject.slug === 'apush'
      ? 'Featured subject · calculator-first APUSH page'
      : 'Free score estimate · gap to target';
    return `
      <a class="subject-card${featured}" href="/${subject.slug}-score-calculator/">
        <span>${escapeHtml(subject.shortName)}</span>
        <strong>${escapeHtml(subject.title)}</strong>
        <p>${escapeHtml(subject.slug === 'apush' ? 'Single-subject clarity, score gap guidance, and APUSH exam support.' : subject.description)}</p>
        <em>${line}</em>
      </a>`;
  };
  return `
    <div class="featured-subject-row">${renderCard(apush)}</div>
    <div class="subject-grid-balanced">${others.map(renderCard).join('')}</div>`;
}

function homepageHubPreview() {
  return `
  <div class="mini-hub-grid">
    ${['STEM', 'English', 'Social Science'].map((group) => {
      const sample = subjects.filter((subject) => subjectCategory(subject) === group).slice(0, 3).map((subject) => `<a href="/${subject.slug}-score-calculator/">${escapeHtml(subject.shortName)}</a>`).join('');
      return `<section class="mini-hub-card"><h3>${group}</h3><p>${group === 'STEM' ? 'Math and science calculators for quick score planning.' : group === 'English' ? 'Writing-heavy subjects with rubric-aware guidance.' : 'APUSH leads this group, with AP Gov and AP Psychology nearby.'}</p><div class="mini-hub-links">${sample}</div></section>`;
    }).join('')}
  </div>`;
}

function homepageFaqs() {
  return [
    { q: 'Is this official?', a: 'No. This is an independent, unofficial AP planning tool and is not affiliated with College Board.' },
    { q: 'Does it save my inputs?', a: 'No. Calculator inputs are processed locally in your browser and are not stored by us.' },
    { q: 'What if I am near a cutoff?', a: 'Treat the estimate as a range and add buffer points before test day.' },
    { q: 'Where should I start?', a: 'Choose the AP subject you are studying for, or open APUSH if you want the strongest single-subject tool page.' }
  ];
}

function hubFaqs() {
  return [
    { q: 'Why use a hub instead of only one calculator page?', a: 'The hub helps students browse all AP calculators quickly and jump straight to the right subject page.' },
    { q: 'How do I find APUSH?', a: 'APUSH is highlighted under Social Science and is also linked in the main navigation.' },
    { q: 'Do all calculators use the same assumptions?', a: 'No. Each subject uses its own section structure, cutoffs, and confidence language.' },
    { q: 'Does the site store score inputs?', a: 'No. The calculators are browser-local and do not store your values.' }
  ];
}

function homePage() {
  const faqs = homepageFaqs();
  const body = `
<section class="hero home-hero home-system">
  <div class="hero-copy-block">
    <p class="eyebrow">Free AP score calculators for 2026 planning</p>
    <h1>Plan your AP score with a clearer calculator path.</h1>
    <p class="hero-copy">Enter section points, see an estimated AP score, and check the gap to your next target before test day. APUSH is the featured single-subject experience, with the hub ready when you want every calculator.</p>
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
    <h2>Choose the AP subject you are practicing for</h2>
    <p>APUSH is visually featured as the highest-priority single-subject page. Every card routes to the rebuilt calculator pages with correct links.</p>
  </div>
  <div class="subject-matrix subject-matrix-home">${homepageSubjectCards()}</div>
</section>
<section class="section two-col">
  <div>
    <p class="eyebrow">How it works</p>
    <h2>Simple score planning, not an official report</h2>
    <ol class="steps">
      <li>Enter the section points you earned on a practice test.</li>
      <li>Review the estimated AP score, composite range, and gap to 3, 4, or 5.</li>
      <li>Use the weakest section to decide what to study next.</li>
    </ol>
  </div>
  <aside class="note">
    <h2>Why students use it</h2>
    <p>It is a fast way to check whether your current practice score is on track and where a realistic gain is most likely.</p>
    <p>When you are near a cutoff, treat the estimate as a range and leave extra buffer points.</p>
  </aside>
</section>
<section class="section" id="hub-preview">
  <div class="section-heading">
    <p class="eyebrow">Hub preview</p>
    <h2>Browse calculators by category</h2>
    <p>Use the hub when you want a clean directory of all AP calculators. It keeps APUSH easy to find under Social Science.</p>
  </div>
  ${homepageHubPreview()}
</section>
<section class="section two-col" id="methodology">
  <div>
    <p class="eyebrow">Methodology / trust</p>
    <h2>Transparent assumptions without official claims</h2>
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
    <p class="eyebrow">FAQ preview</p>
    <h2>Questions students ask before they start</h2>
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
    title: 'AP Score Calculator 2026 | Free Unofficial AP Score Estimates',
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
    <h1>Browse every AP calculator in one place</h1>
    <p class="hero-copy">Choose the AP subject you are practicing for, enter section points, and get a fast unofficial estimate with a clear gap to target. APUSH is highlighted under Social Science and sits one click away from the main hub.</p>
    <div class="cta-row">
      <a class="button" href="#calculator-start">Browse subjects</a>
      <a class="button secondary" href="#methodology">See methodology</a>
    </div>
    <p class="hero-disclaimer">Free to use. Browser-local. No signup. Not affiliated with College Board.</p>
  </div>
  <aside class="hero-panel preview-card" aria-label="Hub preview">
    <span class="preview-label">Category view</span>
    <strong>APUSH is easy to find</strong>
    <div class="preview-score">3 groups</div>
    <p>STEM, English, and Social Science make browsing simple. Each card links to the current redesigned calculator page.</p>
    <ul>
      <li>Cleaner browse-first routing</li>
      <li>APUSH highlighted under Social Science</li>
      <li>All subject links updated</li>
      <li>SEO and legal pages preserved</li>
    </ul>
  </aside>
</section>
<section id="calculator-start" class="section intro-strip">
  <p>Subject categories</p>
  <div class="quick-links"><a href="#stem">STEM</a><a href="#english">English</a><a href="#social-science">Social Science</a><a href="/apush-score-calculator/">APUSH</a></div>
</section>
<section id="subjects" class="section hub-directory">
  <div class="section-heading">
    <p class="eyebrow">Subject matrix</p>
    <h2>Pick the AP exam you are practicing for</h2>
    <p>Each category is a clear browsing lane. APUSH gets special visibility so students can jump into the primary single-subject page quickly.</p>
  </div>
  <div class="hub-grid">
    <section class="matrix-group" id="stem"><h3>STEM</h3><div class="matrix-grid">${subjects.filter((subject) => subjectCategory(subject) === 'STEM').map((subject) => `<a class="matrix-card" href="/${subject.slug}-score-calculator/"><span>${escapeHtml(subject.shortName)}</span><strong>${escapeHtml(subject.title)}</strong><em>Free score estimate · gap to target · 2026 planning</em></a>`).join('')}</div></section>
    <section class="matrix-group" id="english"><h3>English</h3><div class="matrix-grid">${subjects.filter((subject) => subjectCategory(subject) === 'English').map((subject) => `<a class="matrix-card" href="/${subject.slug}-score-calculator/"><span>${escapeHtml(subject.shortName)}</span><strong>${escapeHtml(subject.title)}</strong><em>Rubric-aware estimate · gap to 3/4/5 · browser-local</em></a>`).join('')}</div></section>
    <section class="matrix-group" id="social-science"><h3>Social Science</h3><div class="matrix-grid">${subjects.filter((subject) => subjectCategory(subject) === 'Social Science').map((subject) => `<a class="matrix-card${subject.slug === 'apush' ? ' featured' : ''}" href="/${subject.slug}-score-calculator/"><span>${escapeHtml(subject.shortName)}</span><strong>${escapeHtml(subject.title)}</strong><em>${subject.slug === 'apush' ? 'Featured APUSH route · calculator-first page' : 'Free score estimate · gap to target'}</em></a>`).join('')}</div></section>
  </div>
</section>
<section class="section two-col" id="methodology">
  <div>
    <p class="eyebrow">What each calculator shows</p>
    <h2>Fast estimates with the same trust language across the site</h2>
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
    title: 'AP Score Calculator Hub 2026 | Browse All Free AP Calculators',
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
    <p class="hero-copy">${isApush ? 'Enter MCQ, SAQ, DBQ, and LEQ points to see an unofficial APUSH score estimate, composite range, and the gap to your next target.' : `${escapeHtml(subject.description)} Enter raw section points from a practice test to see an estimated AP score, estimated composite score, and the study gap to your next target. This is not an official AP score.`}</p>
    <div class="cta-row"><a class="button" href="#calculator">${isApush ? 'Estimate my APUSH score' : 'Estimate my score'}</a><a class="button secondary" href="#formula">${isApush ? 'See scoring formula' : 'See score ranges'}</a></div>
    <div class="trust-row"><span>Free</span><span>Browser-local</span><span>Unofficial</span><span>Not affiliated with College Board</span><span>2026 planning</span></div>
  </div>
  ${heroDashboardVisual(subject, sampleResult)}
</section>
<section class="section calculator-workspace${isApush ? ' apush-workspace' : ''}" data-calculator data-subject="${data}" id="calculator">
  <div class="calculator-card">
    <div class="card-kicker">Enter scores</div>
    <form class="input-grid" aria-label="${escapeHtml(subject.shortName)} score inputs">${inputs}</form>
    <p class="input-helper">${isApush ? 'Use raw practice-test points: MCQ 0–55, SAQ 0–9, DBQ 0–7, LEQ 0–6.' : 'Use raw practice-test points for each section. Values are clamped to the allowed range.'}</p>
    <div class="result-panel" aria-live="polite">
      <span class="label">Estimated AP score</span>
      <strong data-result-score>Enter scores</strong>
      <p data-result-composite>Estimated Composite Score will appear here.</p>
      <p data-result-explanation class="result-explanation">Add your raw points to see the score band and study gap.</p>
      <p class="confidence-badge" data-result-confidence>${escapeHtml(confidenceLabel(subject))}: ${escapeHtml(confidenceCopy(subject))}</p>
      <p class="validation-message" data-validation-message hidden></p>
      <ul data-result-needed></ul>
      <p class="microcopy">Unofficial estimate. Actual AP scores may differ. Your calculator inputs are processed in your browser and are not stored by us.</p>
    </div>
  </div>
</section>
<section class="section visual-score-section" data-score-dashboard${isApush ? ' data-apush-dashboard' : ''}>
  <div class="section-heading"><p class="eyebrow">Score band dashboard</p><h2>See the ${escapeHtml(subject.shortName)} score bands before you interpret the estimate</h2><p>The color bands use this subject's estimated cutoffs and max composite. Use the target cards to decide whether to stabilize a 3, push toward a 4, or protect a 5.</p></div>
  ${scoreBandStrip(subject, sampleResult.composite)}
  ${targetComparisonStrip(subject, sampleResult)}
</section>
${isApush ? `<section class="section two-col weight-section">
  <div><p class="eyebrow">Section weighting</p><h2>APUSH points do not all move the estimate the same way</h2><p>MCQ, SAQ, DBQ, and LEQ combine into a composite estimate. This chart gives the page a study dashboard, not just a form.</p></div>
  ${sectionWeightChart()}
</section>` : ''}
<section class="section conversion-section" id="formula">
  <div class="section-heading">
    <p class="eyebrow">Raw score conversion</p>
    <h2>Estimated ${escapeHtml(subject.shortName)} composite ranges</h2>
    <p class="note-inline">This conversion chart is an estimate based on public exam structure and historical scoring patterns. It is not an official College Board conversion table, and actual AP score cutoffs may vary by year and exam administration. ${escapeHtml(subject.riskNote)}</p>
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
    <p>If the calculator says you are within about 5–8 composite points of a 3, 4, or 5, treat that as a near-cutoff zone. In that zone, use the result to choose your next study target instead of treating the predicted AP score as settled.</p>
  </div>
  <aside class="note">
    <h2>Methodology and assumptions</h2>
    <p>${escapeHtml(subject.assumptions)}</p>
    <p><strong>${escapeHtml(confidenceLabel(subject))}:</strong> ${escapeHtml(confidenceCopy(subject))}</p>
    <p>${escapeHtml(subject.riskNote)}</p>
    <p>This calculator combines your section inputs into an estimated raw or composite score, then maps that score to an AP 1–5 range using historical scoring patterns, public exam structure, and transparent assumptions. Because official AP score setting can vary by year and exam administration, this result should be used as an unofficial planning estimate.</p>
    <p>Last updated: ${lastUpdated}</p>
  </aside>
</section>
${isApush ? `<section class="section two-col apush-structure">
  <div>
    <p class="eyebrow">APUSH exam structure</p>
    <h2>MCQ, SAQ, DBQ, and LEQ all matter</h2>
    <div class="structure-grid">
      <div><strong>Multiple Choice</strong><span>55 questions</span></div>
      <div><strong>Short Answer</strong><span>3 questions · 9 points</span></div>
      <div><strong>DBQ</strong><span>1 document-based question · 7 points</span></div>
      <div><strong>LEQ</strong><span>1 long essay question · 6 points</span></div>
    </div>
  </div>
  <aside class="note"><h2>What to do with your result</h2><p>If you are aiming for a 3, 4, or 5, use the gap and confidence note to decide where a realistic point gain is most likely.</p><p>Near a cutoff, focus on buffer points instead of treating the estimate as settled.</p></aside>
</section>
<section class="section study-guidance">
  <div class="section-heading"><p class="eyebrow">What to practice next</p><h2>Use your weakest APUSH section as the next study target</h2><p>The calculator is a direction tool. If one section keeps dragging the estimate down, practice that section first.</p></div>
  ${recommendationCards()}
</section>` : ''}
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
    title: `${subject.title} | Raw Score Estimate & Gap to 5`,
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
