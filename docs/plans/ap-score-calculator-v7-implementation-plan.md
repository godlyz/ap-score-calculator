# AP Score Calculator V7 Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Implement the V7 post-launch SEO growth design for the already-live AP Score Calculator site, focused on Semrush/GSC-backed generic AP calculator coverage, weak URL repair, subject-page conversion depth, and crawlable internal linking.

**Architecture:** Keep the current static JS architecture. Add reusable metadata and renderer helpers rather than hand-copying sections. Preserve existing 22 generated pages unless a future decision explicitly adds support pages.

**Tech Stack:** Node.js static generation, `src/site.js`, `src/scoreEngine.js`, `scripts/build.js`, `node:test`, Cloudflare Pages static output.

---

## Implementation principles

- Work from tests first for each visible SEO/design requirement.
- Do not invent official score cutoffs, official dates, or fabricated score distribution data.
- Keep V7 as post-launch growth iteration; do not rewrite docs as new-site launch docs.
- Keep all page links crawlable with real `<a href>` values.
- Reuse section renderers across all subject pages.

---

## Task 1: Add V7 metadata model for keyword aliases and subject groups

**Objective:** Give renderers structured data for Semrush-backed aliases, priority labels, related links, and subject grouping.

**Files:**
- Modify: `src/scoreEngine.js`
- Modify: `test/site.test.js`

**Steps:**

1. Add a failing test that checks AP Psych, AP Gov, and AP Lang subject records expose aliases matching Semrush weak keywords.
2. Extend each subject object or add exported metadata map with:
   - `aliases`
   - `group`
   - `priorityReason`
   - `relatedSlugs`
   - `faqKeywords`
3. Include at minimum:
   - AP Psych: `ap psych calculator`, `ap psychology score calculator`
   - AP Gov: `ap gov calculator`, `ap us gov score calculator`, `ap gov curve`, `ap gov scoring calculator`
   - AP Lang: `ap lang score calculator`, `ap language and composition score calculator`
4. Run `npm test` or `npm run check`.

**Acceptance:** Metadata exists without breaking existing subject iteration.

---

## Task 2: Upgrade homepage to a broad AP calculator entry page

**Objective:** Make `/` a stronger trust-building AP score calculator landing page and route users into subject calculators.

**Files:**
- Modify: `src/site.js`
- Modify: `test/site.test.js`

**Steps:**

1. Add failing tests for homepage phrases:
   - `Free AP score calculators for 2026 planning`
   - `Find your AP subject calculator`
   - `16 AP calculators`
   - `AP Psych`, `AP Gov`, `AP Lang`
2. Add reusable subject finder render function.
3. Group subject cards by category.
4. Add priority subject callouts for AP Psych/AP Gov/AP Lang and high-volume calculator subjects.
5. Ensure homepage links to `/ap-score-calculator-2026/` and every important subject page.

**Acceptance:** Homepage remains distinct from hub and contains crawlable subject links and broad AP calculator language.

---

## Task 3: Upgrade hub `/ap-score-calculator-2026/` for generic AP calculator intent

**Objective:** Target `ap score calculator`, `ap calculator`, and `ap exam calculator` with a richer SEO hub.

**Files:**
- Modify: `src/site.js`
- Modify: `test/site.test.js`

**Steps:**

1. Add failing tests for hub text:
   - H1 contains `AP Score Calculator 2026`.
   - Body contains `AP score calculator`, `AP calculator`, `AP exam calculator`.
   - All 16 subject links are present.
   - Hub includes `AP exam schedule`, `AP score distribution`, and `score release` support copy.
2. Update hub hero title/meta/description.
3. Add all-subject matrix with aliases.
4. Add target score planner preview.
5. Add schedule/distribution FAQ blocks with disclaimers that dates/data should be verified from official sources.

**Acceptance:** Hub is the primary generic AP calculator SEO page and still links to every subject calculator.

---

## Task 4: Add reusable target-gap and study-plan components to subject pages

**Objective:** Turn subject pages from simple calculators into action-oriented calculators.

**Files:**
- Modify: `src/site.js`
- Modify: `test/site.test.js`

**Steps:**

1. Add failing tests that every subject page includes:
   - `Target gap`
   - `2-week plan`
   - `4-week plan`
   - `8-week plan`
   - `weakest section`
2. Implement reusable result action card markup.
3. Use existing calculator data to label section-specific improvement guidance.
4. Ensure fallback copy handles balanced inputs without saying the same section is both weakest and strongest.

**Acceptance:** Every subject page has visible target-score and study-plan language.

---

## Task 5: Add subject-specific SEO coverage blocks and FAQs

**Objective:** Improve exact-match and weak-keyword relevance for each subject page without APUSH-only copy.

**Files:**
- Modify: `src/site.js`
- Modify: `src/scoreEngine.js` if metadata from Task 1 needs expansion
- Modify: `test/site.test.js`

**Steps:**

1. Add failing tests for AP Gov/AP Psych/AP Lang alias phrases in their generated pages.
2. Add a reusable `renderSubjectSeoCoverage(subject)` section.
3. Add a reusable `renderSubjectFaq(subject)` function.
4. Ensure FAQ JSON-LD mirrors visible FAQ text.
5. Add tests preventing APUSH-only labels on non-APUSH pages.

**Acceptance:** Weak pages visibly cover weak keyword variants and every subject page keeps correct subject-specific labels.

---

## Task 6: Add score-band and conversion explanation visual sections

**Objective:** Improve student trust and make result interpretation clearer.

**Files:**
- Modify: `src/site.js`
- Modify: `test/site.test.js`

**Steps:**

1. Add failing tests for:
   - `score band`
   - `Actual cutoffs vary by year`
   - `unofficial estimate`
2. Add a reusable score-band component from 1 to 5.
3. Add conversion explanation copy that avoids official cutoff claims.
4. Keep existing calculator JS behavior intact.

**Acceptance:** Every subject page explains estimate uncertainty and visualizes score bands.

---

## Task 7: Strengthen internal linking and related calculators

**Objective:** Improve crawl paths and user continuation from every modified page.

**Files:**
- Modify: `src/site.js`
- Modify: `test/site.test.js`

**Steps:**

1. Add failing tests that every subject page links to:
   - hub `/ap-score-calculator-2026/`
   - at least two related subject calculator pages
2. Use `relatedSlugs` metadata to render related calculators.
3. Add descriptive anchors, e.g. `AP Chem score calculator`, not generic `Learn more`.

**Acceptance:** Internal links are crawlable and semantically descriptive.

---

## Task 8: Mobile and visual-system CSS updates inside `src/site.js`

**Objective:** Implement V7 visual direction without adding an unnecessary CSS architecture change.

**Files:**
- Modify: `src/site.js`
- Modify: `test/site.test.js` where static markers are testable

**Steps:**

1. Add CSS classes for:
   - subject finder grid
   - calculator/result two-column shell
   - score card
   - score band strip
   - study plan cards
   - FAQ cards
2. Add responsive rules for 375px mobile:
   - single-column calculator shell
   - 44px+ controls/buttons
   - no horizontal overflow
3. Add static test markers/classes where feasible.
4. Do not add external font dependency unless explicitly approved.

**Acceptance:** The markup expresses the V7 layout and mobile behavior; build still passes.

---

## Task 9: Update docs and README

**Objective:** Keep project docs aligned with V7 handoff and growth-plan state.

**Files:**
- Modify: `README.md`
- Optional modify: `docs/prd/ap-score-calculator-v7-content-seo-prd.md`

**Steps:**

1. Add README links to:
   - `docs/design/ap-score-calculator-v7-design-handoff.md`
   - `docs/plans/ap-score-calculator-v7-implementation-plan.md`
2. Ensure README still states competitor/GSC gates are now completed to the current documented level, while not claiming future SEO outcomes.
3. Keep post-launch wording.

**Acceptance:** Docs index points developers to the right V7 design and implementation sources.

---

## Task 10: Final verification

**Objective:** Prove the implementation is safe for development handoff or release preview.

**Files:**
- Generated: `dist/`

**Steps:**

1. Run `npm run check`.
2. Verify output includes expected page count.
3. If implemented, run a local preview and spot-check:
   - `/`
   - `/ap-score-calculator-2026/`
   - `/ap-gov-score-calculator/`
   - `/ap-psych-score-calculator/`
   - `/ap-lang-score-calculator/`
   - `/apush-score-calculator/`
4. Check no placeholder links, fake official claims, or APUSH-only copy leaked to other pages.

**Acceptance:** `npm run check` passes and preview pages satisfy V7 handoff acceptance criteria.
