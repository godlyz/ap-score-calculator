# AP Score Calculator GSC / Keyword Gap Execution Log

> Date: 2026-05-16 08:13 CST  
> Scope: User-selected A + B continuation.  
> Project: `apscorecalculator.store` / `/root/ap-score-calculator`  
> Status: **not complete — authoritative gated data still requires login/session access**

## A. GSC / index status attempt

### What was attempted

1. Opened Google Search Console directly:
   - `https://search.google.com/search-console?resource_id=sc-domain%3Aapscorecalculator.store`
   - Redirected to public Search Console landing page.
2. Clicked **Go to Google Search Console / Start now**.
3. Browser reached Google sign-in page.
4. Checked local environment for API/CLI access:
   - `GOOGLE_APPLICATION_CREDENTIALS`: not set
   - `GSC_SITE_URL`: not set
   - no `gws` command found in PATH
   - no local `*gsc*` files found under `/root`
5. Ran public search fallback for `site:apscorecalculator.store`.

### Result

Authoritative GSC values were **not available** in this environment because the browser is not signed into the Google account with Search Console access and no Search Console API credentials are configured.

### Weak public index evidence only

Public search returned visible Google-indexed results for at least these URLs:

- `https://apscorecalculator.store/`
- `https://apscorecalculator.store/ap-score-calculator-2026/`
- `https://apscorecalculator.store/apush-score-calculator/`
- `https://apscorecalculator.store/ap-psychology-score-calculator/`
- `https://apscorecalculator.store/ap-chemistry-score-calculator/`
- `https://apscorecalculator.store/ap-biology-score-calculator/`
- `https://apscorecalculator.store/ap-lit-score-calculator/`
- `https://apscorecalculator.store/ap-gov-score-calculator/`
- `https://apscorecalculator.store/ap-statistics-score-calculator/`
- `https://www.apscorecalculator.store/ap-macroeconomics-score-calculator/` shown with `www` variant in search result

This is **not** a substitute for GSC fields such as indexed status, Google-selected canonical, last crawl, clicks, impressions, query rows, or exclusion reason.

### Current gate status

- GSC checklist fill-in: **blocked by missing Google login/API access**
- Public index fallback: **partially collected, weak evidence only**
- Gate remains: **open**

## B. Semrush Keyword Gap attempt

### What was attempted

1. Loaded the project SOP/skill reference for dash.3ue.co / Semrush browser automation.
2. Tried direct Semrush proxy URL:
   - `https://sem.3ue.co/home/`
   - Result: redirected to `dash.3ue.co` with `登录过期或无效,请重新登录` in URL.
3. Opened shared tools dashboard:
   - `https://dash.3ue.co/zh-Hans/#/page/m/home`
   - In headless browser, login page appeared.
4. Started an existing VNC/Chrome profile on display `:1` using `/root/chrome-profile` and CDP port `9222`.
5. Confirmed dashboard session exists in that profile:
   - Account: `godkn`
   - Email shown: `kn197884@163.com`
   - SEO Tools subscription active until `2026-06-06 19:24`
   - Semrush node shown: `节点12 倍率 X 1 🔖 GURU 地区数据库 SA HK ✅`
   - Similarweb node shown: `节点1 倍率 X 1 🔖 PRO 全球版`
6. Attempted to click the first Semrush **打开** button through CDP.
7. Tried Semrush public page fallback:
   - `https://www.semrush.com/website/apscorecalculator.store/overview/`

### Result

The active dashboard loaded, but clicking **打开** did not navigate to Semrush within the automation window during the observed 20-second interval. The direct `sem.3ue.co` URL was rejected as expired/invalid outside the active dashboard flow. The public Semrush page triggered a browser-check/reCAPTCHA page.

No real Semrush Keyword Gap export was obtained. Therefore, no authoritative missing / weak / untapped keyword list can be claimed yet.

### Current gate status

- Full Semrush Keyword Gap export: **blocked by Semrush proxy/open flow not completing under automation**
- Public Semrush fallback: **blocked by reCAPTCHA/browser check**
- Gate remains: **open**

## Required next action to complete A + B

### For A — GSC

Use one of these:

1. Sign the VNC Chrome profile into the Google account that owns `apscorecalculator.store` Search Console property, then rerun URL inspection/export.
2. Provide/configure Search Console API credentials for the property.
3. Manually export Search Console data and place the CSV under the repo, e.g. `docs/seo/gsc-export-2026-05-16.csv`.

Required fields to fill in `docs/seo/current-index-checklist.md`:

- indexed / not indexed
- Google-selected canonical
- last crawl
- clicks
- impressions
- top queries
- exclusion reason
- next action

### For B — Semrush

Use one of these:

1. In VNC, manually open Semrush from dash.3ue.co, then export Keyword Gap.
2. Fix the dashboard **打开** flow for CDP automation and rerun.
3. Manually export Semrush Keyword Gap CSV and place it under `docs/research/`, e.g. `semrush-keyword-gap-apscorecalculator-2026-05-16.csv`.

Keyword Gap competitor set:

- `test-ninjas.com`
- `knowt.com`
- `gradgpt.com`
- `num8ers.com`
- `fiveable.me`
- `albert.io`

Required output:

- missing keywords
- weak keywords
- untapped keywords
- volume / KD / competitor URL / our current URL if any / proposed action

## Decision note

Because both required data sources are login/session-gated, the hard gate in `docs/research/ap-score-calculator-competitor-gap-checklist.md` remains valid and open. Do **not** mark competitor analysis complete yet.

## B2. Semrush Keyword Gap completion update

### What was completed after the initial block

Automation was resumed through the active VNC Chrome/CDP session and `sem.3ue.co` Keyword Gap URLs were generated directly after the dashboard Semrush proxy session became available. Because the Semrush UI accepts three competitors per comparison, the required six-competitor set was captured as two batches:

- Batch 1: `test-ninjas.com`, `knowt.com`, `gradgpt.com`
- Batch 2: `num8ers.com`, `fiveable.me`, `albert.io`

For each batch, rank types were captured for:

- `missing`
- `weak`
- `untapped`

### Output files

- Raw capture: `docs/research/semrush-keyword-gap-raw-2026-05-16.json`
- Prioritized summary: `docs/research/semrush-keyword-gap-summary-2026-05-16.md`

### Captured row counts

- Missing: 100 raw rows
- Weak: 18 raw rows
- Untapped: 100 raw rows

### Current gate status

- Full Semrush Keyword Gap export: **closed for domain-level missing/weak/untapped discovery**
- Follow-up still useful: URL-level competitor landing-page mapping for the top 20 selected keywords, because the captured table exposed domain positions but not competitor URLs.
- Remaining hard blocker: **GSC/index fields** for every sitemap URL.


## A2. GSC partial completion update

### What was captured after Google Search Console became accessible

Using the VNC Chrome profile, Search Console property `sc-domain:apscorecalculator.store` became accessible under Google account `haresrosli2@gmail.com`. The captured screen was **Indexing → Pages → Indexed pages** with sitemap filter `https://apscorecalculator.store/sitemap.xml`.

Captured facts:

- Sitemap last updated in GSC: `2026/5/11`
- Indexed pages count shown: `12`
- Indexed examples captured: `12` rows
- Indexed example URLs and last-crawl dates:
  - `http://www.apscorecalculator.store/` — `2026-05-12`
  - `https://www.apscorecalculator.store/` — `2026-05-12`
  - `https://apscorecalculator.store/ap-psychology-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-gov-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-lit-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/apush-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-lang-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-biology-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-statistics-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-calculus-ab-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-chemistry-score-calculator/` — `2026-05-10`
  - `https://apscorecalculator.store/ap-score-calculator-2026/` — `2026-05-10`

These values were written into `docs/seo/current-index-checklist.md`.

### What is still not complete

When navigating back toward the full Pages report, Google required identity re-verification. Therefore these requested fields are still **not captured**:

- URL Inspection for every sitemap URL
- Google-selected canonical for each URL
- Not-indexed / excluded reason for URLs absent from the indexed examples
- Performance clicks, impressions, and query rows

### Current gate status

- GSC Pages indexed examples: **partially filled**
- GSC Performance clicks/impressions: **still blocked by Google re-auth / no API credentials**
- GSC URL Inspection/canonical/excluded reason: **still blocked by Google re-auth / no API credentials**
- Gate remains: **open**, but narrowed to the missing Performance, URL Inspection, and excluded-reason exports.


## A3. GSC completion update after re-auth fixed

### Performance data captured

Search Console Performance → Search results became accessible.

- Search type: Web
- Visible report window: current 3-month report; chart dates shown `2026/5/8` to `2026/5/13`
- Last updated: 4 hours before capture
- Total clicks: `2`
- Total impressions: `80`
- Average CTR: `2.5%`
- Average position: `26.4`

Visible top queries captured:

- `ap psych score calculator 2026` — clicks `1`, impressions `1`
- `ap gov scoring calculator` — clicks `0`, impressions `3`
- `ap gov 2026 calculator` — clicks `0`, impressions `2`
- `ap gov curve` — clicks `0`, impressions `2`
- `ap score calculator 2026` — clicks `0`, impressions `1`
- `ap bio calculator 2026` — clicks `0`, impressions `1`
- `ap gov raw score conversion` — clicks `0`, impressions `1`
- `ap score calculator gov` — clicks `0`, impressions `1`
- `ap gov calculator score` — clicks `0`, impressions `1`
- `ap us gov score calculator` — clicks `0`, impressions `1`

Visible page rows captured:

- `https://apscorecalculator.store/ap-gov-score-calculator/` — clicks `1`, impressions `29`
- `https://apscorecalculator.store/` — clicks `1`, impressions `10`
- `https://apscorecalculator.store/ap-score-calculator-2026/` — clicks `0`, impressions `51`
- `https://apscorecalculator.store/apush-score-calculator/` — clicks `0`, impressions `9`
- `https://apscorecalculator.store/ap-psychology-score-calculator/` — clicks `0`, impressions `8`
- `https://apscorecalculator.store/ap-lang-score-calculator/` — clicks `0`, impressions `8`
- `https://apscorecalculator.store/ap-chemistry-score-calculator/` — clicks `0`, impressions `7`
- `https://apscorecalculator.store/ap-biology-score-calculator/` — clicks `0`, impressions `6`
- `https://apscorecalculator.store/ap-statistics-score-calculator/` — clicks `0`, impressions `6`
- `https://apscorecalculator.store/ap-lit-score-calculator/` — clicks `0`, impressions `6`
- `https://www.apscorecalculator.store/` — clicks `0`, impressions `6`
- `http://www.apscorecalculator.store/` — clicks `0`, impressions `1`

### Indexing exclusion data captured

Search Console Indexing → Pages with sitemap filter `https://apscorecalculator.store/sitemap.xml` showed:

- Indexed: `12`
- Not indexed: `6`
- Not indexed reasons:
  - Page with redirect / `网页会自动重定向`: `1`
  - Discovered currently not indexed / `已发现 - 尚未编入索引`: `4`
  - Crawled currently not indexed / `已抓取 - 尚未编入索引`: `1`

Excluded examples captured:

- `http://apscorecalculator.store/` — page with redirect, last crawl `2026-05-12`
- `https://apscorecalculator.store/contact.html` — discovered currently not indexed, last crawl N/A
- `https://apscorecalculator.store/disclaimer.html` — discovered currently not indexed, last crawl N/A
- `https://apscorecalculator.store/privacy.html` — discovered currently not indexed, last crawl N/A
- `https://apscorecalculator.store/terms.html` — discovered currently not indexed, last crawl N/A
- `https://apscorecalculator.store/` — crawled currently not indexed, last crawl `2026-05-12`

### Current gate status

- GSC Pages/indexed/excluded examples: **captured and written to `docs/seo/current-index-checklist.md`**
- GSC Performance clicks/impressions/pages/queries: **captured and written to `docs/seo/current-index-checklist.md`**
- Remaining non-blocking detail: per-URL **Google-selected canonical** still requires URL Inspection/API. The main requested fields — indexed, impressions, clicks, excluded reason — are now filled where GSC exposed rows.
