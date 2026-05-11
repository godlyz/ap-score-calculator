# AP Score Calculator v3 — Design Handoff

## 1. Redesign Decision

Do not patch the current APUSH page.
Treat the old APUSH implementation as a discarded draft.
Rebuild the experience from competitor analysis, new content, and a fresh visual system.

Primary reference competitor:
- https://apushscorecalculator.us/

What to borrow:
- Single-subject clarity
- Calculator-first page rhythm
- Transparent score explanation
- FAQ depth
- Study guidance near the calculator
- Strong SEO structure for high-intent searchers

What to improve:
- More modern and coherent visual system
- Better homepage → hub → APUSH continuity
- More useful result panel
- Better mobile experience
- Better scannability and stronger editorial hierarchy
- Stronger trust/privacy messaging
- No inserted-module feeling

## 2. Product Story

AP Score Calculator is a free AP score planning site for 2026 students.
The redesigned APUSH page should feel like the main product page, not a widget pasted into a generic site.

The full site should tell one story:

1. Homepage: discover the calculators
2. Hub: browse all AP calculators
3. APUSH: use the calculator, understand the score, and know what to study next

## 3. Information Architecture

### Homepage `/`
Purpose:
- Introduce the product
- Route users to key subjects
- Present the APUSH calculator as a featured path

Required sections:
1. Hero
2. Featured calculators
3. Subject matrix
4. Why it works / methodology
5. Privacy + unofficial disclaimer
6. FAQ preview
7. Footer

Homepage must link to the new APUSH route, not an old legacy page.

### Hub `/ap-score-calculator-2026/`
Purpose:
- Browse all calculators by subject category
- Highlight APUSH under Social Science
- Provide internal links to all subject pages

Required sections:
1. Hub hero
2. Category groups
3. Subject cards
4. Methodology strip
5. Related calculators / browse all
6. FAQ preview

### APUSH `/apush-score-calculator/`
Purpose:
- Main high-intent SEO page and tool page
- Convert searchers looking for APUSH score estimates

Required sections in order:
1. Hero / page intro
2. Calculator workspace
3. Result panel
4. Score conversion explanation
5. How to use the estimate
6. APUSH exam structure
7. Study guidance / next-step advice
8. FAQ
9. Related calculators
10. Footer trust links

## 4. APUSH Page Structure Details

### 4.1 Hero
Goals:
- Explain what the page does in one glance
- Communicate 2026 freshness
- Show trust and unofficial disclaimer early

Must include:
- H1 with keyword intent
- One short supporting sentence
- Primary CTA to calculator inputs
- Secondary CTA to score explanation or FAQ
- Small disclaimer: unofficial, browser-local, not College Board

Suggested H1 direction:
- AP US History Score Calculator 2026

### 4.2 Calculator Workspace
The calculator must be the visual center of the page.

Inputs:
- MCQ
- SAQ
- DBQ
- LEQ

Desktop layout:
- Two-column layout
- Inputs on left
- Result card on right
- Result card should feel stable and prominent

Mobile layout:
- Single-column stack
- Result appears near the inputs, not hidden below unrelated content
- No horizontal overflow

### 4.3 Result Panel
The result panel should be visually stronger than the old version.

Must show:
- Estimated AP score
- Estimated composite / raw result
- Gap to 3 / 4 / 5
- Confidence label
- Near-cutoff warning when relevant
- Short explanation of what drives the estimate

Result UI behavior:
- If score is near a boundary, show an amber warning
- If far from boundary, show a calm neutral success state
- If DBQ / LEQ are weak, mention them in the note

### 4.4 Score Conversion Section
Purpose:
- Show that the calculator is transparent, not magic
- Support SEO intent for score conversion research

Must include:
- Simplified conversion table or visual scale
- Explanation that official cutoffs vary by year
- Note that the site uses estimated mappings from public exam structure

### 4.5 How to Use the Estimate
Purpose:
- Help students act on the result

Include advice like:
- What to do if aiming for a 3 / 4 / 5
- Which section matters most near the cutoff
- Why DBQ and LEQ can move the final score materially
- How to prioritize weak sections

### 4.6 APUSH Exam Structure
Purpose:
- Explain the exam in plain English
- Support SEO and trust

Include:
- MCQ
- SAQ
- DBQ
- LEQ
- Simplified point ranges / maxima
- A short note about the unofficial estimation model

### 4.7 Study Guidance
Purpose:
- Give value beyond the calculator
- Make the page feel like a useful educational tool

Include:
- If MCQ is weak, focus on content review and timing
- If SAQ is weak, focus on concise evidence-based responses
- If DBQ / LEQ are weak, focus on thesis, evidence, and structure
- Keep it practical, not essay-like

### 4.8 FAQ
Must answer:
- Is this official?
- How accurate is it?
- What score do I need for a 3 / 4 / 5?
- Why do cutoffs change?
- Does the site store my score?
- Is this free?
- Who is this for?

### 4.9 Related Calculators
At the bottom, link to:
- AP Gov
- AP Lang
- AP Lit
- AP Psychology
- AP Calc AB
- AP Bio
- AP Chem
- AP Stats
- Hub page

## 5. Visual System

### Design direction
The site should feel like a credible education tool for US/Canada students:
- Clean
- Calm
- Helpful
- Modern
- Not template-like
- Not flashy
- Not fake startup-ish

### Overall tone
Use an editorial/product hybrid.
The page should feel intentionally designed, not auto-generated.

### Color palette
Recommended base palette:
- Background: `#F7F4EE` or `#F8FAFC`
- Surface: `#FFFFFF`
- Ink: `#172033`
- Muted text: `#64748B`
- Primary: deep navy `#1D3557`
- Accent: academic amber `#F4A261`
- Border: `#E2E8F0`

Optional secondary accent:
- Calm green `#2A9D8F` for positive states

### Typography
Recommended:
- Display: `Sora` or `Space Grotesk`
- Body: `DM Sans` or `Source Sans 3`

Avoid:
- Default-feeling Arial-only builds
- Overused purple-blue SaaS gradients
- Generic startup typography

### Layout rules
- Use generous whitespace
- Use strong section rhythm
- Keep cards rounded but disciplined
- Use bento-like organization where helpful
- Make the calculator/result area visually primary
- Keep SEO content scannable in short blocks, not walls of text

## 6. Component System

### Shared components
- Header
- Footer
- Hero block
- Subject matrix card
- Calculator input card
- Result card
- Score band / confidence badge
- FAQ accordion
- Related calculators strip
- Trust/disclaimer strip

### APUSH-specific components
- Score input list
- Live result panel
- Gap-to-target module
- Conversion table
- Study guidance callout
- Near-cutoff warning box

## 7. Page-to-Page Linking Rules

This is a critical requirement.

All navigation and cards must point to current routes only.
No old legacy APUSH route should remain in homepage, hub, header, footer, or subject cards.

Required routing behavior:
- Home → Hub link works
- Home featured APUSH card → new APUSH route
- Hub APUSH card → new APUSH route
- Footer and related links → current pages only

## 8. SEO Requirements

Preserve and improve:
- Canonical tags
- sitemap.xml
- robots.txt
- metadata for homepage / hub / APUSH
- schema where appropriate
- internal linking
- FAQ content for long-tail queries

APUSH page SEO goals:
- Rank for APUSH score calculator intent
- Support conversion intent and FAQ intent
- Keep 2026 freshness explicit
- Keep “unofficial” messaging visible but not dominant

## 9. Compliance / Trust Requirements

Must include:
- Unofficial disclaimer
- No official College Board claim
- No fake user counts
- No fake testimonials
- No guaranteed score accuracy claim
- No privacy overclaim like “we never store anything” unless truly true

Preferred trust copy:
- Browser-local inputs
- Free to use
- Unofficial estimate for planning
- Not affiliated with College Board

## 10. Responsive Behavior

### 360 / 390 / 414 px
Must ensure:
- No horizontal scroll
- Inputs remain readable
- Buttons have comfortable tap targets
- Result card remains visible and understandable
- No clipped labels or broken wrapping

### Tablet / desktop
- Calculator and result should feel like one system
- Use wider reading width for explanatory sections
- Keep the right-side result card visually persistent on desktop if possible

## 11. Developer Acceptance Criteria

The implementation should only be considered ready when:
- Homepage links to the new APUSH route
- Hub links to the new APUSH route
- APUSH page is visually distinct and complete
- APUSH page does not feel like an inserted block
- Desktop and mobile both work cleanly
- No old route leftovers remain
- SEO and legal pages still work
- Preview is shown to Ningge before production launch

## 12. Copy Tone Guidelines

Tone should be:
- Clear
- Calm
- Credible
- Student-friendly
- Not hypey
- Not corporate fluff

Avoid phrases like:
- revolutionary
- cutting-edge
- next-gen
- unlock your potential
- seamless

Prefer concrete copy like:
- Estimate your APUSH score
- See how close you are to a 4
- Check what you need to reach a 5
- Compare your score estimate with the target range

## 13. Build Guidance

Implementation should:
- Rebuild the page structure, not patch it
- Replace old link targets everywhere
- Keep existing static SEO infrastructure intact
- Update tests for route correctness and mobile sanity
- Preserve legal pages and metadata
- Keep the preview-first approval gate before production

## 14. File to Feed into Development

The developer should use this handoff together with:
- `full-redesign-rebuild-brief.md`
- content rewrite output
- competitor teardown output

The design handoff is the source of truth for layout, components, and visual behavior.
