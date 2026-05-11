# AP Score Calculator — Full Redesign / Rebuild Brief

## Decision
Stop patching the current APUSH page. Treat the current implementation as a draft to be replaced.

User feedback:
- The APUSH page is not merely visually disconnected; the homepage links are still pointing users to old page routes.
- Do not fix old links as a standalone patch.
- Redesign and rebuild the overall experience from scratch.
- Use `apushscorecalculator.us` as the primary design/reference competitor, but do not copy it.

## Primary competitor to study
- https://apushscorecalculator.us/

Borrow from competitor:
- Single-subject clarity: APUSH page should feel like the primary product page, not an inserted module.
- Calculator-first flow.
- Clear score breakdown and conversion explanation.
- Study/resource guidance near the calculator.
- FAQ and explanatory SEO sections that support search intent.
- Simple navigation and page rhythm.

Improve beyond competitor:
- More modern visual system.
- Better mobile-first layout.
- Better result panel: estimated AP score, composite, gap to 3/4/5, near-cutoff warnings, confidence label.
- Better product connectivity: Home → Hub → APUSH must be real, visible, and linked correctly.
- Stronger internal linking across subject pages.
- Browser-local privacy message.
- Clear 2026 freshness and unofficial disclaimer.
- Better section hierarchy; no long wall of text.

## Non-negotiables
1. No patch-only fix.
2. No old-page link leftovers in homepage, hub, header, footer, or subject cards.
3. No APUSH section that looks inserted into the old layout.
4. No generic template look.
5. No fake official relationship, fake users, fake testimonials, or guaranteed accuracy claims.
6. Mobile width 360/390/414 must have no horizontal overflow.
7. Final preview must be shown to Ningge before production launch.

## New site structure

### Homepage `/`
Role: broad landing page and product overview.
Must include:
- Clear value proposition: free AP score calculators for 2026 planning.
- Subject matrix with correct links.
- Featured APUSH card that points to the new APUSH page, not old route.
- Explanation of how calculators work.
- Trust/privacy/unofficial disclaimer.
- Internal links to Hub and key subjects.

### Hub `/ap-score-calculator-2026/`
Role: browse all calculators.
Must include:
- Subject categories.
- Search/browse feel if possible.
- APUSH highlighted under Social Science.
- All subject links must route to current redesigned subject pages.

### APUSH page
Role: competitive single-subject SEO/tool page.
Must include:
1. Hero + calculator summary
   - Keyword-rich H1.
   - One-sentence value proposition.
   - CTA anchors to calculator and score table.
   - 2026 freshness + unofficial disclaimer.

2. Calculator workspace
   - Inputs: MCQ, SAQ, DBQ, LEQ.
   - Sticky or prominent result card on desktop.
   - On mobile, result card follows inputs naturally.
   - Result: estimated AP score, composite, gap to next target, confidence, warning if near cutoff.

3. Score conversion section
   - Transparent estimated composite table.
   - Explain that official cutoffs vary by year.

4. How to use your estimate
   - If aiming for 3/4/5.
   - What to improve when near boundary.
   - DBQ/LEQ importance.

5. APUSH exam structure
   - MCQ, SAQ, DBQ, LEQ overview.
   - Point maxima and simplified weights.

6. Resource/study guidance
   - What to practice based on weak section.
   - No fake endorsements.

7. FAQ
   - Is this official?
   - How accurate is it?
   - What score do I need for a 3/4/5?
   - Why do cutoffs change?
   - Does it store my scores?

8. Related calculators
   - AP Gov, AP Lang, AP Lit, AP Psychology, all AP calculators.

## Visual direction
Use an education-tool style for US/Canada students:
- Clean, modern, credible.
- Light background, but not plain white template.
- Editorial/product hybrid.
- Rounded but disciplined cards.
- Strong calculator workspace contrast.
- Avoid purple-blue AI SaaS look.

Suggested tokens:
- Background: `#F7F4EE` or `#F8FAFC`
- Surface: `#FFFFFF`
- Ink: `#172033`
- Muted: `#64748B`
- Primary: deep navy `#1D3557`
- Accent: academic amber `#F4A261` or green `#2A9D8F`
- Border: `#E2E8F0`

Typography:
- Display: Sora / Space Grotesk
- Body: Source Sans 3 / DM Sans
- Avoid default-looking Arial-only implementation.

Layout principles:
- Page should feel custom, not generated.
- Hero and calculator should be visually integrated.
- Use two-column desktop calculator/result layout.
- Use stacked mobile layout.
- Keep SEO content in scannable editorial cards.

## Build requirements
- Rebuild page templates, not just CSS patching.
- Replace homepage/Hub/subject navigation links as part of rebuild.
- Preserve canonical, sitemap, robots, GSC compatibility.
- Preserve all legal pages.
- Update tests for new links and no old APUSH route mistakes.
- Run build/test/mobile/link checks before preview.

## Acceptance criteria
- Homepage links to the redesigned APUSH route.
- Hub links to the redesigned APUSH route.
- APUSH page looks like a complete product page, not a module inserted into an old page.
- The design clearly borrows the competitor's single-subject clarity, but has our own modern visual system and better result guidance.
- No horizontal overflow at 360/390/414.
- All primary CTAs and nav links work.
- SEO metadata and schema remain valid.
- User preview approval is required before production deploy.
