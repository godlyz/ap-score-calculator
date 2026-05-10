import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { sitePages } from '../src/site.js';
import { subjects } from '../src/scoreEngine.js';

test('static site renders hub plus all nine subject pages and legal/contact pages', () => {
  const paths = sitePages().map((page) => page.path).sort();

  assert(paths.includes('ap-score-calculator-2026/index.html'));
  assert(paths.includes('privacy.html'));
  assert(paths.includes('terms.html'));
  assert(paths.includes('disclaimer.html'));
  assert(paths.includes('contact.html'));
  for (const subject of subjects) {
    assert(paths.includes(`${subject.slug}-score-calculator/index.html`));
  }
});

test('subject pages contain SEO, calculator, schema, internal links, and required disclaimers', () => {
  const pages = sitePages();

  for (const subject of subjects) {
    const page = pages.find((item) => item.path === `${subject.slug}-score-calculator/index.html`);
    assert(page, `missing page for ${subject.slug}`);
    assert.match(page.html, new RegExp(`<title>${subject.title}`));
    assert.match(page.html, new RegExp(`<h1>${subject.title}</h1>`));
    assert.match(page.html, /data-calculator/);
    assert.match(page.html, /Estimated AP score/);
    assert.match(page.html, /Result interpretation/);
    assert.match(page.html, /Estimate confidence|Conservative estimate|Moderate confidence estimate/);
    assert.match(page.html, /near-cutoff zone|safety buffer|wider buffer|planning range/);
    assert.match(page.html, /Estimated raw\/composite conversion chart|Raw score conversion/);
    assert.match(page.html, /What score do I need\?/);
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

  for (const subject of subjects) {
    assert.match(hub.html, new RegExp(`href="/${subject.slug}-score-calculator/"`));
    assert.match(hub.html, new RegExp(subject.title));
  }
  assert.match(hub.html, /Subject matrix/);
  assert.match(hub.html, /How results are estimated/);
  assert.match(hub.html, /Last updated/);
  assert.match(hub.html, /mobile-first/);
  assert.match(hub.html, /what score you need/i);
  assert.match(hub.html, /lower confidence|conservative confidence|near a cutoff/i);
  assert.doesNotMatch(hub.html, /example\.com/);
});

test('built calculator validation copy names adjusted fields and values', () => {
  const app = readFileSync(new URL('../dist/assets/app.js', import.meta.url), 'utf8');

  assert.match(app, /was adjusted to/);
  assert.match(app, /adjustments\.join\('; '\)/);
  assert.match(app, /near-cutoff zone; add buffer/);
  assert.match(app, /Estimate confidence/);
  assert.doesNotMatch(app, /Adjusted .* to the allowed range 0–/);
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
