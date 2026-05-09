# AP Score Calculator post-launch hardening report

Workspace: /root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536
Date: 2026-05-09

## Summary

Completed post-launch Cloudflare Pages technical hardening for AP Score Calculator. The project now records deploy settings, generates Cloudflare Pages `_headers` and `_redirects`, preserves sitemap / robots / canonical behavior, and includes a regression test for the hardening files.

## Cloudflare Pages configuration

Added `wrangler.toml` with the current Cloudflare Pages/static-site configuration:

- Project name: `ap-score-calculator`
- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- SITE_ORIGIN: `https://apscorecalculator.store`
- Pages output dir: `dist`

Added `cloudflare-pages.md` as a human-readable deployment note for Cloudflare Dashboard settings and canonical policy.

## Headers added

`npm run build` now generates `dist/_headers` with:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone, geolocation, payment, USB, and Bluetooth
- `Content-Security-Policy` limited to self-hosted scripts/assets, with inline styles allowed for the current static CSS/runtime pattern
- long immutable cache for `/assets/*` and `/src/*`
- short cache for `/*.html`
- one-hour cache for `/robots.txt` and `/sitemap.xml`

## Redirect / canonical policy

`npm run build` now generates `dist/_redirects` as a documented no-op policy file.

Decision:

- Keep `/` reachable for users, ads, and campaign links.
- `/` currently has a canonical tag pointing to `https://apscorecalculator.store/ap-score-calculator-2026/`.
- Do not add a `/` to `/ap-score-calculator-2026/` redirect yet; wait for Search Console / analytics data to avoid hurting UX or paid/campaign traffic.
- For any `*.pages.dev` preview host exposure, prefer Cloudflare dashboard custom-domain redirect or host-aware redirect rule so `apscorecalculator.store` remains the indexed production host.

## SEO/static asset verification

Verified generated output after hardening:

- `dist/sitemap.xml` still uses `https://apscorecalculator.store/...` URLs.
- `dist/robots.txt` still points to `https://apscorecalculator.store/sitemap.xml`.
- Canonical tags still point at `https://apscorecalculator.store` URLs.
- Static asset cache rules cover `/assets/*` and `/src/*`.
- Header/redirect generation did not remove or alter generated site pages.

## Tests / commands run

- `npm run check` passed.
  - `npm run build` built 15 HTML pages into `dist/`.
  - `npm test` passed 10/10 Node tests.
- Local static preview smoke test on `http://127.0.0.1:4181` passed for:
  - `/_headers`
  - `/_redirects`
  - `/sitemap.xml`
  - `/robots.txt`
  - `/ap-score-calculator-2026/`
  - `/assets/styles.css`

## Changed files

- `wrangler.toml`
- `cloudflare-pages.md`
- `scripts/build.js`
- `test/site.test.js`
- `package.json`
- generated `dist/_headers`
- generated `dist/_redirects`

## Remaining follow-up

After Cloudflare Pages redeploys, verify production response headers with:

```bash
curl -I https://apscorecalculator.store/ap-score-calculator-2026/
curl -I https://apscorecalculator.store/assets/styles.css
curl -I https://apscorecalculator.store/sitemap.xml
curl -I https://apscorecalculator.store/robots.txt
```

If Search Console later reports duplicate/canonical conflicts between `/` and `/ap-score-calculator-2026/`, decide whether to add a permanent redirect from `/` to `/ap-score-calculator-2026/`.
