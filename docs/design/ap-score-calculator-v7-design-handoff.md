# AP Score Calculator V7 Post-Launch SEO Design Handoff

> **Date:** 2026-05-16  
> **Status:** Ready for development planning  
> **Source inputs:** GSC/index checklist, Semrush Keyword Gap raw/summary, content opportunity backlog, current `src/site.js` architecture.  
> **Positioning:** This is a post-launch SEO growth design handoff for an already-live 16-subject AP calculator site. It is not a new-site PRD.

## 1. Goal

Turn verified Semrush and GSC gaps into a focused V7 design iteration that increases search relevance, click confidence, and internal crawl strength for the existing AP Score Calculator site.

Primary SEO targets:

- Capture generic calculator intent: `ap score calculator`, `ap calculator`, `ap exam calculator`.
- Improve weak existing URLs: AP Psychology, AP US Government, AP Lang variants.
- Strengthen high-volume subject pages: APUSH, AP Bio, AP Chem, AP World, AP Calc AB/BC, AP Stats, AP Lit, AP Physics 1, APES.
- Add scoped support for AP schedule / score distribution intent without turning the site into a generic school calendar or grade-calculator site.

## 2. Non-goals / scope guardrails

Do **not** build in V7:

- Generic `grade calculator`, `test grade calculator`, `final grade calculator` pages.
- SAT / ACT pages.
- Practice-test content clusters.
- College Board login / AP Classroom navigational content.
- Any fake official cutoff table or unsupported official claim.

These appear in Semrush untapped/missing data, but are broader than the current AP score calculator product scope and should remain watchlist items.

## 3. Current site constraints

- Static site generated from JS.
- Core UI, layout, and CSS are in `src/site.js`; there is no standalone CSS file.
- Subject scoring data lives in `src/scoreEngine.js`.
- Build is controlled by `scripts/build.js` and currently generates 22 HTML pages.
- Any V7 design must be implemented as reusable JS rendering sections, not one-off static HTML pasted per page.

## 4. Page IA changes

### 4.1 Homepage `/`

**Role:** Trust-building entry page and broad AP calculator landing page.

Add / strengthen sections:

1. **Hero: “Free AP score calculators for 2026 planning”**
   - Search-aligned headline around AP score calculator.
   - Primary CTA: “Find your AP subject calculator”.
   - Secondary CTA: “See all 2026 AP calculators”.
   - Include compact proof strip: 16 calculators, unofficial estimates, no login.

2. **Subject finder module**
   - Search/filter by subject name and aliases.
   - Subject cards grouped by category: History/Social Science, English, Math, Science.
   - Each card must include exact-match variants where relevant, e.g. `APUSH score calculator`, `AP Chem score calculator`.

3. **How the calculator works**
   - 3-step visual explanation: enter section scores → weighted composite → estimated 1–5 score.
   - Make clear results are unofficial estimates.

4. **Priority subject callouts**
   - Feature AP Psych, AP Gov, AP Lang because GSC/Semrush show weak-but-existing demand.
   - Feature APUSH, AP Bio, AP Chem, AP Calc AB/BC, AP Stats due high Semrush volume and low KD.

5. **Support intent cards**
   - “AP score distribution” and “AP exam schedule / score release” as informational cards.
   - In V7 these can link to support sections/pages if implemented; otherwise anchor to hub sections.

### 4.2 Hub `/ap-score-calculator-2026/`

**Role:** Primary SEO hub for `ap score calculator`, `ap calculator`, `ap exam calculator`.

Required modules:

1. **Exact-match SEO hero**
   - H1 should contain “AP Score Calculator 2026”.
   - Intro copy must include `AP score calculator`, `AP calculator`, and `AP exam calculator` naturally.

2. **All-subject calculator matrix**
   - Indexable links to all 16 subject calculators.
   - Include aliases and “best for” microcopy.
   - Add “weak opportunity” badges internally for AP Psych/AP Gov/AP Lang only if not visible to users as SEO jargon.

3. **Target score planner preview**
   - Explain: choose target score → compare estimated score → see which section to improve.
   - Link into subject pages.

4. **AP schedule / score release FAQ block**
   - Answer broad missing keywords at a limited depth.
   - Avoid claiming official dates unless sourced.
   - CTA should route back to calculators, not away from product intent.

5. **AP score distribution support block**
   - Brief explanation of distribution vs calculator estimate.
   - Can become a P1 page later.

### 4.3 Subject calculator pages `/{subject}-score-calculator/`

**Role:** Conversion page for exact subject keywords and weak keyword repair.

Shared reusable page structure:

1. **Subject SEO hero**
   - H1 exact-match format: `{Subject Title} Score Calculator`.
   - Above-fold trust copy: unofficial estimate, 2026 planning, section-weight aware.
   - Subject-specific alias line, e.g. AP Gov page covers `ap gov calculator`, `ap us gov score calculator`, `ap gov scoring calculator`.

2. **Calculator panel**
   - Desktop: two-column layout.
     - Left: section inputs.
     - Right: live result card and target-score gap.
   - Mobile: single-column, result card appears immediately after inputs.
   - Inputs must be 16px+ text and 44px+ tap targets.

3. **Result action card**
   - Estimated AP score.
   - Composite score / weighted percentage.
   - Target gap: “To reach a 4/5, improve approximately X points.”
   - Weakest weighted section insight.
   - 2-week / 4-week / 8-week study plan variants.

4. **Score range / conversion explanation**
   - Visual score band from 1 to 5.
   - Text: “Actual cutoffs vary by year; this uses public-style weighting and conservative estimates.”
   - No fake official cutoff tables.

5. **Subject-specific scoring breakdown**
   - Section names pulled from subject data.
   - Must not use APUSH-only labels for other subjects.

6. **FAQ schema-ready section**
   - 4–6 questions per subject.
   - Include weak/missing keyword variants where natural.
   - Required disclaimers in at least one FAQ.

7. **Related calculators**
   - Same-category links.
   - Link back to hub.
   - Use exact descriptive anchors, not “click here”.

## 5. Priority page-specific changes

### P0-A: Hub generic AP calculator coverage

- Update title/meta/H1 around `AP Score Calculator 2026`.
- Add all-subject matrix with indexable text and aliases.
- Add schedule/distribution FAQ blocks.
- Add internal links from homepage and every subject page to hub.

### P0-B: Weak URL repair

1. **AP Psychology**
   - Add alias copy: `ap psych calculator`, `ap psychology score calculator`.
   - Improve H1/meta if current title is too generic.
   - Add target-score guidance and FAQ.

2. **AP US Government**
   - Add alias copy: `ap gov calculator`, `ap us gov score calculator`, `ap gov curve`, `ap gov scoring calculator`.
   - Add stronger internal anchors from homepage, hub, and related social science pages.

3. **AP Lang**
   - Add alias copy: `ap lang score calculator`, `ap language and composition score calculator`.
   - Ensure essay-section language is not generic MCQ-only copy.

### P0-C: High-volume subject coverage block

For APUSH, Bio, Chem, World, Calc AB/BC, Stats, Lit, Physics 1, APES:

- Confirm exact-match title/H1.
- Add target-score planner.
- Add subject-specific FAQ.
- Add related links.
- Add visible disclaimer.

## 6. Visual direction

Design tone: **student utility dashboard**, not generic SaaS landing page.

### Tokens

- Background: `#F8FAFC` main, `#EEF4FF` soft blue section tint.
- Text: `#172033` primary, `#475569` secondary.
- Primary: `#2563EB` accessible blue.
- Accent: `#F59E0B` amber for score/target emphasis.
- Success: `#16A34A`; Warning: `#EA580C`; Risk: `#DC2626`.
- Card border: `#D8E1F0`.
- Radius: 18px for major cards, 12px for inputs/buttons.
- Shadow: subtle only; avoid heavy SaaS gradients.

### Typography

- Prefer system-safe implementation for current static site unless adding font loading is explicitly approved.
- Hierarchy:
  - H1: 40–56px desktop, 32–38px mobile.
  - H2: 28–36px desktop, 24–30px mobile.
  - Body: 16–18px.
  - Form labels: 14–16px, always readable.

### Components

1. **Score card**
   - Large score number.
   - Colored score band.
   - Target gap line.
   - CTA: “See how to raise this score”.

2. **Subject card**
   - Subject name.
   - Alias keyword.
   - Short “best for” text.
   - Direct link.

3. **Opportunity callout**
   - Used for schedule/distribution support intent.
   - Must feel informational, not a banner ad.

4. **FAQ accordion or static cards**
   - Static indexable cards preferred for SEO.

5. **Study-plan card**
   - 2-week / 4-week / 8-week tabs can be static buttons or generated blocks.
   - Should work without server state.

## 7. SEO requirements

For every modified page:

- Unique `<title>` and meta description.
- One H1 only.
- Canonical points to production URL.
- Internal links are crawlable `<a href>` links.
- JSON-LD remains valid.
- FAQ content must be visible on page if included in FAQ schema.
- No `noindex`.
- No unsupported official College Board claims.

## 8. Mobile requirements

- No horizontal scroll at 375px width.
- Calculator inputs must stack cleanly.
- Result card must be visible without excessive scrolling after input section.
- Subject matrix becomes one column.
- Tap targets ≥ 44px.
- Hero title max 2–3 lines on mobile.

## 9. Acceptance criteria

Development is accepted only if:

- `npm run check` passes.
- Generated site still has all 22 expected pages unless a deliberate page-count change is documented.
- Hub contains indexable links to all 16 subject calculators.
- AP Psych/AP Gov/AP Lang pages include their weak-keyword alias coverage.
- Every subject page has calculator, result, target-gap, scoring explanation, FAQ/disclaimer, and related links.
- No APUSH-only labels appear on non-APUSH pages.
- No fake official cutoff or fabricated score distribution data is introduced.
- README links to this V7 handoff and implementation plan.

## 10. Developer notes

Recommended implementation pattern:

- Add reusable section renderers in `src/site.js` instead of duplicating HTML.
- Extend subject metadata in `src/scoreEngine.js` only if needed for aliases, related groups, FAQ, or study-plan labels.
- Add tests in `test/site.test.js` for visible SEO phrases, internal links, mobile-safe markup markers where feasible, and schema/disclaimer continuity.
