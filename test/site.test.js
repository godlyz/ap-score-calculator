import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { sitePages } from '../src/site.js';
import { subjects } from '../src/scoreEngine.js';

test('static site renders hub plus all nine subject pages and legal/contact pages', () => {
  const paths = sitePages().map((page) => page.path).sort();

  assert(paths.includes('ap-score-calculator-2026/index.html'));
  assert(paths.includes('privacy/index.html'));
  assert(paths.includes('terms/index.html'));
  assert(paths.includes('disclaimer/index.html'));
  assert(paths.includes('contact/index.html'));
  for (const subject of subjects) {
    assert(paths.includes(`${subject.slug}-score-calculator/index.html`));
  }
});

test('v7 Semrush-backed priority subjects expose alias metadata without invalid related slugs', () => {
  const subjectSlugs = new Set(subjects.map((subject) => subject.slug));
  const expectedMetadata = {
    'ap-psychology': {
      aliases: ['ap psych calculator', 'ap psychology score calculator'],
      group: 'social-science',
      relatedSlugs: ['ap-gov', 'ap-human-geography']
    },
    'ap-gov': {
      aliases: ['ap gov calculator', 'ap us gov score calculator', 'ap gov curve', 'ap gov scoring calculator'],
      group: 'social-science',
      relatedSlugs: ['apush', 'ap-psychology', 'ap-human-geography']
    },
    'ap-lang': {
      aliases: ['ap lang score calculator', 'ap language and composition score calculator'],
      group: 'english',
      relatedSlugs: ['ap-lit']
    }
  };

  for (const [slug, expected] of Object.entries(expectedMetadata)) {
    const subject = subjects.find((item) => item.slug === slug);
    assert(subject, `missing subject ${slug}`);
    assert(subject.aliases, `${slug} missing aliases`);
    assert(subject.group, `${slug} missing group`);
    assert(subject.priorityReason, `${slug} missing priorityReason`);
    assert(subject.relatedSlugs, `${slug} missing relatedSlugs`);
    assert(subject.faqKeywords, `${slug} missing faqKeywords`);
    assert.deepEqual(subject.aliases, expected.aliases);
    assert.equal(subject.group, expected.group);
    assert.deepEqual(subject.relatedSlugs, expected.relatedSlugs);
    assert(subject.priorityReason.length > 0, `${slug} priorityReason should be non-empty`);
    assert(subject.faqKeywords.length > 0, `${slug} faqKeywords should be non-empty`);
    for (const relatedSlug of subject.relatedSlugs) {
      assert(subjectSlugs.has(relatedSlug), `${slug} related slug does not exist: ${relatedSlug}`);
    }
  }
});

test('v3 homepage is distinct from hub and features APUSH with correct rebuilt links', () => {
  const pages = sitePages();
  const home = pages.find((page) => page.path === 'index.html');
  const hub = pages.find((page) => page.path === 'ap-score-calculator-2026/index.html');

  assert.notEqual(home.html, hub.html);
  assert.match(home.html, /Free AP score calculators for 2026 planning/);
  assert.match(home.html, /Featured subject matrix/);
  assert.match(home.html, /href="\/apush-score-calculator\/"/);
  assert.match(home.html, /APUSH is visually featured/);
  assert.match(home.html, /href="\/ap-score-calculator-2026\/"/);
  assert.doesNotMatch(home.html, /apushscorecalculator\.us|old APUSH route|v1\.2 iteration/);
});

test('v7 task 2 homepage is broad AP calculator entry with crawlable finder links', () => {
  const pages = sitePages();
  const home = pages.find((page) => page.path === 'index.html');
  const hub = pages.find((page) => page.path === 'ap-score-calculator-2026/index.html');

  assert.notEqual(home.html, hub.html);
  assert.match(home.html, /Free AP score calculators for 2026 planning/);
  assert.match(home.html, /Find your AP subject calculator/);
  assert.match(home.html, /16 AP calculators/);
  assert.match(home.html, /AP Psych/);
  assert.match(home.html, /AP Gov/);
  assert.match(home.html, /AP Lang/);
  assert.match(home.html, /href="\/ap-score-calculator-2026\/"/);

  const importantSubjectSlugs = [
    'ap-psychology',
    'ap-gov',
    'ap-lang',
    'apush',
    'ap-biology',
    'ap-chemistry',
    'ap-calculus-ab',
    'ap-statistics'
  ];
  for (const slug of importantSubjectSlugs) {
    assert.match(home.html, new RegExp(`href="/${slug}-score-calculator/"`));
  }
});

test('subject pages contain SEO, calculator, schema, internal links, and required disclaimers', () => {
  const pages = sitePages();

  for (const subject of subjects) {
    const page = pages.find((item) => item.path === `${subject.slug}-score-calculator/index.html`);
    assert(page, `missing page for ${subject.slug}`);
    assert.match(page.html, new RegExp(`<title>${subject.title}`));
    if (subject.slug === 'apush') {
      assert.match(page.html, /<h1>APUSH Score Calculator 2026<\/h1>/);
    } else {
      assert.match(page.html, new RegExp(`<h1>${subject.title}</h1>`));
    }
    assert.match(page.html, /data-calculator/);
    assert.match(page.html, /Estimated AP score/);
    assert.match(page.html, /Result interpretation|Personalized next-step plan/);
    assert.match(page.html, /Estimate confidence|Conservative estimate|Moderate confidence estimate/);
    assert.match(page.html, /near-cutoff zone|safety buffer|wider buffer|planning range|weighted points available/);
    assert.match(page.html, /Estimated raw\/composite conversion chart|Raw score conversion|Estimated .* composite ranges/);
    assert.match(page.html, /What score do I need\?|Target gap/);
    assert.match(page.html, /FAQPage/);
    assert.match(page.html, /WebApplication/);
    assert.match(page.html, /BreadcrumbList/);
    assert.match(page.html, /not affiliated with, endorsed by, or sponsored by College Board/);
    assert.match(page.html, /unofficial estimate|Unofficial estimate|not an official fixed table|not a fixed official cutoff/);
    assert.match(page.html, /href="\/ap-score-calculator-2026\/"/);
    assert.doesNotMatch(page.html, /example\.com/);
  }
});

test('hub links to all subject pages with indexable subject matrix and 2026 positioning', () => {
  const hub = sitePages().find((page) => page.path === 'ap-score-calculator-2026/index.html');

  assert.match(hub.html, /<h1>[^<]*AP Score Calculator 2026[^<]*<\/h1>/);
  assert.match(hub.html, /AP score calculator/);
  assert.match(hub.html, /AP calculator/);
  assert.match(hub.html, /AP exam calculator/);
  for (const subject of subjects) {
    assert.match(hub.html, new RegExp(`href="/${subject.slug}-score-calculator/"`));
    assert.match(hub.html, new RegExp(subject.title));
  }
  assert.match(hub.html, /Subject matrix/);
  assert.match(hub.html, /All-subject matrix/);
  for (const subject of subjects.filter((item) => item.aliases?.length)) {
    for (const alias of subject.aliases) {
      assert.match(hub.html, new RegExp(alias));
    }
  }
  assert.match(hub.html, /Target score planner preview/);
  assert.match(hub.html, /Target 3/);
  assert.match(hub.html, /Target 4/);
  assert.match(hub.html, /Target 5/);
  assert.match(hub.html, /AP exam schedule/);
  assert.match(hub.html, /AP score distribution/);
  assert.match(hub.html, /score release/);
  assert.match(hub.html, /official sources/);
  assert.match(hub.html, /verify/i);
  assert.match(hub.html, /What each calculator shows/);
  assert.match(hub.html, /Last updated/);
  assert.match(hub.html, /browser-local|Browse-first/);
  assert.match(hub.html, /Browse every AP calculator in one place/);
  assert.match(hub.html, /APUSH is highlighted under Social Science/);
  assert.doesNotMatch(hub.html, /official 2026 AP exam date|official AP score distribution|College Board affiliated calculator/);
  assert.doesNotMatch(hub.html, /example\.com/);
});

test('built calculator validation copy names adjusted fields and values', () => {
  const app = readFileSync(new URL('../dist/assets/app.js', import.meta.url), 'utf8');

  assert.match(app, /was adjusted to/);
  assert.match(app, /adjustments\.join\('; '\)/);
  assert.match(app, /near-cutoff zone; add buffer|Best next focus/);
  assert.match(app, /Estimate confidence|Best next focus/);
  assert.doesNotMatch(app, /Adjusted .* to the allowed range 0–/);
});

test('v3 APUSH page follows design handoff IA and trust requirements', () => {
  const apush = sitePages().find((page) => page.path === 'apush-score-calculator/index.html');

  assert.match(apush.html, /<h1>APUSH Score Calculator 2026<\/h1>/);
  assert.match(apush.html, /Estimate my APUSH score/);
  assert.match(apush.html, /See scoring formula/);
  assert.match(apush.html, /MCQ 0–55, SAQ 0–9, DBQ 0–7, LEQ 0–6/);
  assert.match(apush.html, /weighted-100 framing/);
  assert.match(apush.html, /Bluebook app|Bluebook/);
  assert.match(apush.html, /2026 APUSH exam structure and digital format|APUSH scoring reference/);
  assert.match(apush.html, /AP 5|Predicted Score: 4/);
  assert.match(apush.html, /3\.8|AP 5/);
  assert.match(apush.html, /Dynamic study plan|Personalized next-step plan/);
  assert.match(apush.html, /Does it store my scores\?/);
  assert.match(apush.html, /Not affiliated with College Board/);
  assert.match(apush.html, /href="\/ap-score-calculator-2026\/"/);
  assert.doesNotMatch(apush.html, /fake|testimonial|guaranteed|official AP score report/);
});

test('canonical URLs default to apscorecalculator.store and generated pages avoid dead placeholder links', () => {
  for (const page of sitePages()) {
    assert.match(page.html, /https:\/\/apscorecalculator\.store/);
    assert.doesNotMatch(page.html, /example\.com|href="#"|Lorem ipsum|Your Company/);
  }
});


test('Cloudflare Pages hardening files document deploy settings and preserve SEO assets', () => {
  const headersUrl = new URL('../dist/_headers', import.meta.url);
  const redirectsUrl = new URL('../dist/_redirects', import.meta.url);
  if (!existsSync(headersUrl) || !existsSync(redirectsUrl)) {
    return;
  }
  const headers = readFileSync(headersUrl, 'utf8');
  const redirects = readFileSync(redirectsUrl, 'utf8');
  const wrangler = readFileSync(new URL('../wrangler.toml', import.meta.url), 'utf8');

  assert.match(wrangler, /name = "ap-score-calculator"/);
  assert.match(wrangler, /pages_build_output_dir = "dist"/);
  assert.match(wrangler, /SITE_ORIGIN = "https:\/\/apscorecalculator\.store"/);
  assert.match(headers, /Strict-Transport-Security: max-age=31536000/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /Content-Security-Policy: default-src 'self'/);
  assert.match(headers, /\/assets\/\*/);
  assert.match(headers, /Cache-Control: public, max-age=31536000, immutable/);
  assert.match(headers, /\/sitemap\.xml/);
  assert.match(redirects, /canonical tag points to \/ap-score-calculator-2026\//);
});


test('v3.1 APUSH visual-rich redesign includes dashboard charts and mobile input acceptance markers', () => {
  const apush = sitePages().find((page) => page.path === 'apush-score-calculator/index.html');
  const home = sitePages().find((page) => page.path === 'index.html');

  assert.match(apush.html, /score-dashboard-visual/);
  assert.match(apush.html, /data-apush-dashboard/);
  assert.match(apush.html, /data-dashboard-score/);
  assert.match(apush.html, /data-dashboard-composite/);
  assert.match(apush.html, /data-score-band-strip/);
  assert.match(apush.html, /data-study-plan|data-target-strip/);
  assert.match(apush.html, /Score band dashboard|Dynamic study plan/);
  assert.match(apush.html, /score-band-strip/);
  assert.match(apush.html, /Section diagnostics|section weighting chart|APUSH section weighting chart/);
  assert.match(apush.html, /data-study-plan|target-strip/);
  assert.match(apush.html, /Best next focus|Weak MCQ/);
  assert.match(apush.html, /MCQ correct/);
  assert.match(apush.html, /SAQ total points/);
  assert.doesNotMatch(apush.html, /Multiple Choice <span>0–55/);
  assert.match(home.html, /popular-paths/);
  assert.match(home.html, /Stay in the hero flow/);
});

test('v3.1 APUSH dashboard stays synchronized with calculateScore-driven state', () => {
  const app = readFileSync(new URL('../dist/assets/app.js', import.meta.url), 'utf8');
  const apush = sitePages().find((page) => page.path === 'apush-score-calculator/index.html');

  assert.match(app, /data-apush-dashboard/);
  assert.match(app, /data-dashboard-score/);
  assert.match(app, /data-dashboard-composite/);
  assert.match(app, /data-score-band-strip/);
  assert.match(app, /data-target-strip/);
  assert.match(app, /syncDashboard\(root,/);
  assert.match(app, /calculateScore\(subject\.slug,values\)/);
  assert.match(app, /near-cutoff zone; add buffer|Best next focus/);
  assert.match(apush.html, /data-apush-dashboard/);
  assert.match(app, /raw\/section\.max\*section\.weight|weightedLost|weightedMax/);
  assert.doesNotMatch(app, /weighted=raw\*section\.weight/);
});




test('v3.2 every subject page includes shared visual dashboard and dynamic score bands', () => {
  const pages = sitePages();

  for (const subject of subjects) {
    const page = pages.find((item) => item.path === `${subject.slug}-score-calculator/index.html`);
    assert(page, `missing page for ${subject.slug}`);
    assert.match(page.html, /score-dashboard-visual/);
    assert.match(page.html, /data-score-dashboard/);
    assert.match(page.html, /data-dashboard-score/);
    assert.match(page.html, /data-dashboard-composite/);
    assert.match(page.html, /data-score-band-strip/);
    assert.match(page.html, /data-study-plan|data-target-strip/);
    assert.match(page.html, new RegExp(`${subject.shortName} scoring reference|See the ${subject.shortName} score bands`));
    assert.match(page.html, new RegExp(`AP 5: ${subject.cutoffs[5]}–${subject.displayMaxComposite ?? Math.round(subject.sections.reduce((sum, section) => sum + section.max * section.weight, 0))}`));
  }
});

test('v3.2 homepage uses featured APUSH plus balanced eight-card subject grid', () => {
  const home = sitePages().find((page) => page.path === 'index.html');
  const featuredStart = home.html.indexOf('featured-subject-row');
  const balancedStart = home.html.indexOf('subject-grid-balanced');

  assert(featuredStart > -1, 'missing featured subject row');
  assert(balancedStart > featuredStart, 'balanced grid should follow featured row');
  assert.match(home.html, /Featured APUSH dashboard path|Featured subject · calculator-first APUSH page/);
  assert.equal((home.html.match(/class="subject-card/g) || []).length, subjects.length);
  assert.match(home.html, /href="\/apush-score-calculator\/"/);
});

test('v5 every subject page includes reusable dynamic study plan with timeline variants', () => {
  const pages = sitePages();

  for (const subject of subjects) {
    const page = pages.find((item) => item.path === `${subject.slug}-score-calculator/index.html`);
    assert(page, `missing page for ${subject.slug}`);
    assert.match(page.html, /data-study-plan/);
    assert.match(page.html, /Dynamic study plan/);
    assert.match(page.html, /data-study-status/);
    assert.match(page.html, /data-study-diagnostics/);
    assert.match(page.html, /data-study-gains/);
    assert.match(page.html, /data-study-timeline="2"/);
    assert.match(page.html, /data-study-timeline="4"/);
    assert.match(page.html, /data-study-timeline="8"/);
    for (const section of subject.sections) {
      assert.match(page.html, new RegExp(`data-diagnostic-row="${section.key}"`));
    }
  }
});

test('v5 APUSH page removes duplicated v4 article modules and keeps one compact FAQ', () => {
  const apush = sitePages().find((page) => page.path === 'apush-score-calculator/index.html');

  assert.match(apush.html, /v5-apush-workspace/);
  assert.match(apush.html, /Dynamic study plan/);
  assert.match(apush.html, /APUSH scoring reference/);
  assert.doesNotMatch(apush.html, /visual-score-section/);
  assert.doesNotMatch(apush.html, /weight-section/);
  assert.doesNotMatch(apush.html, /v4-results-panel/);
  assert.doesNotMatch(apush.html, /v4-worked-example/);
  assert.doesNotMatch(apush.html, /What to practice next: APUSH Study Resources/);
  assert.doesNotMatch(apush.html, /href="#resources"/);
  assert.equal((apush.html.match(/<section class="section faq">/g) || []).length, 1);
  const buildJs = readFileSync(new URL('../scripts/build.js', import.meta.url), 'utf8');
  assert.doesNotMatch(buildJs, /class=\"v4-apush-workspace\"|class=\"v4-results-panel\"|class=\"v4-worked-example\"|class=\"v4-contrib-row\"|class=\"v4-band-card\"|class=\"v4-theme-section\"|class=\"v4-next-card\"|class=\"v4-resource-card\"/);
});

test('v7 every subject page includes actionable target-gap study-plan labels', () => {
  const pages = sitePages();

  for (const subject of subjects) {
    const page = pages.find((item) => item.path === `${subject.slug}-score-calculator/index.html`);
    assert(page, `missing page for ${subject.slug}`);
    assert.match(page.html, /data-result-action-cards/);
    assert.match(page.html, /Target gap/);
    assert.match(page.html, /Weakest section|weakest section/);
    assert.match(page.html, /Next drill/);
    assert.match(page.html, /2-week plan/);
    assert.match(page.html, /4-week plan/);
    assert.match(page.html, /8-week plan/);
    assert.doesNotMatch(page.html, /the same section is both weakest and strongest/i);
  }
});
