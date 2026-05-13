# APSC v5 Page Trim Plan — APUSH De-duplication Audit

Date: 2026-05-12
Task: t_de47d42b
Scope: Current APUSH v4 page and v5 target IA
Production instruction: Do not deploy production. Do not replace port 3000 until QA GO and user preview handoff.

---

## 1. Purpose

This trim plan answers the user's core rejection:

- The reference site should inspire quality, not be copied as extra content blocks.
- The whole page must be audited for repetition.
- Study guidance must be dynamic and based on entered scores.
- The same dynamic plan must exist for every subject page.

v5 must remove bloated repeated modules and turn the calculator into a focused product flow.

---

## 2. Current APUSH v4 section inventory

Listed in current top-to-bottom page order from `src/site.js` / generated APUSH page.

| # | Current section / block | Heading or purpose | What it shows | v5 decision | Reason |
|---|---|---|---|---|---|
| 1 | Header / nav | Primary navigation | Home, hub, APUSH, legal links | KEEP | Useful global navigation. |
| 2 | `.hero.calculator-hero` | APUSH Score Calculator 2026 | Hero copy, CTA, trust row, hero dashboard | KEEP but SIMPLIFY | Hero is necessary, but mini dashboard must not duplicate full result system. |
| 3 | `heroDashboardVisual()` | APUSH score dashboard preview | Estimated score, composite, score-band strip, target cards | KEEP MINI ONLY | Keep score + composite + tiny band marker. Remove target cards from hero. |
| 4 | `#calculator .calculator-card` | Enter scores | MCQ, SAQ, DBQ, LEQ inputs; generic result panel | KEEP | Core product input area. Must stay first-class. |
| 5 | `.result-panel` inside calculator card | Estimated AP score | Generic score, composite, needed list, confidence badge | MERGE / STREAMLINE | This overlaps with APUSH dynamic panel. v5 should have one result panel, not generic plus APUSH-specific duplicate. |
| 6 | `apushDynamicResultsPanel()` | Estimated Results | Score, composite, section contribution bars, 5 band cards, static what-to-do card | KEEP AS SINGLE RESULT HUB, REDESIGN | This becomes the shared v5 result panel. Remove 5 band cards. Replace static what-to-do with dynamic study plan. |
| 7 | `.visual-score-section` | See the APUSH score bands before you interpret the estimate | Full score-band strip + target cards | REMOVE | Duplicates hero dashboard, conversion table, target cards, and result panel. |
| 8 | `.weight-section` | APUSH points do not all move the estimate the same way | Standalone section weight chart | MERGE INTO RESULT PANEL | Section contribution bars already communicate this. Add labels there instead of keeping separate chart. |
| 9 | `#formula .conversion-section` | Estimated APUSH composite ranges | AP 1-5 conversion table | KEEP ONCE, COLLAPSE | Useful as reference, but it must be the only full cutoff table. Put in accordion/drawer below calculator. |
| 10 | `.result-interpretation` | What score do I need? | Generic interpretation, sample composite, near-cutoff advice | CONVERT TO DYNAMIC | This should be computed from entered scores in the result panel. Remove standalone section. |
| 11 | `.note` inside result interpretation | Methodology and assumptions | Assumptions, confidence, risk note, full explanation, last updated | COMPRESS | Keep one compact trust note / accordion. Avoid repeating confidence text in multiple locations. |
| 12 | `#scoring-explained` | How This APUSH Score Calculator Works | Step-by-step formulas, cutoff bars, hardcoded worked example | FOLD INTO ACCORDION | Keep transparency, but not as full section. Remove hardcoded example unless generated from user inputs. |
| 13 | `#exam-format` | 2026 APUSH exam structure and digital format | Exam table, Bluebook note, benchmark table, fastest-way cards | COMPRESS / SPLIT | Keep exam table + Bluebook note in accordion. Remove benchmark table and static recommendation cards. |
| 14 | `#resources` | What to practice next: APUSH Study Resources | Static resource cards, many placeholder `#resources` links | REMOVE / REPLACE | Replaced by dynamic study plan. Placeholder links are not acceptable. |
| 15 | FAQ inside resources | APUSH Score Calculator FAQ | 6 FAQ items | KEEP ONCE | Promote to a single compact FAQ section. |
| 16 | Standalone `.faq` | APUSH questions students ask after practice tests | Another FAQ section | MERGE | Keep one FAQ only. Current page has duplicate FAQ intent. |
| 17 | `.links` | Related AP calculators | Hub and other subject links | KEEP | Useful routing, not repetitive. |
| 18 | Footer | Legal / privacy / disclaimer | Trademark, privacy, legal links | KEEP | Required trust/legal surface. |

---

## 3. Duplication audit

| Repeated information | Current locations | Problem | v5 canonical location |
|---|---|---|---|
| Score-band visual | Hero panel, standalone score dashboard, dynamic result band cards, conversion table, scoring cutoff bars, benchmark table | Same cutoff story shown 5-6 ways | One mini visual in hero OR result; one conversion accordion. No standalone dashboard. |
| Gap to 3 / 4 / 5 | Hero target cards, standalone target cards, result text/list | User sees target gaps before entering own scores; feels redundant | Result panel only, after user input. |
| Section weighting | Dynamic contribution rows, standalone weight chart, scoring formula | Repeated APUSH weight explanation | Result diagnostics + optional scoring accordion. |
| "What score do I need?" | Result interpretation section, target cards, benchmark table, result text | Generic and static | Dynamic interpretation based on current score and gap. |
| Methodology / confidence | Result badge, methodology aside, conversion note, footer | Trust copy overwhelms page | One short note plus footer/legal. |
| Study advice | Static what-to-do card, recommendation cards, resource grid | Not based on user's score | Dynamic study plan only. |
| FAQ | Resource FAQ + standalone FAQ | Duplicated SEO content | One compact FAQ section. |
| Worked example | Scoring section hardcoded sample, calculator initial sample | Looks like filler and repeats sample data | Optional generated "Your math" drawer based on actual inputs. |

---

## 4. Remove / merge / fold / convert decisions

### 4.1 Remove entirely

1. Standalone score-band dashboard section.
2. Standalone APUSH section-weight chart.
3. APUSH benchmark table inside exam-format section.
4. Static recommendation cards such as Weak MCQ / Weak SAQ / Weak DBQ / Weak LEQ.
5. Static APUSH resource cards with `href="#resources"`.
6. Hardcoded worked example block using 45 / 7 / 5 / 4.
7. Duplicate FAQ block.

### 4.2 Merge into result panel

1. Target gap cards -> result panel interpretation layer.
2. Section weights -> result panel diagnostics bars.
3. "What score do I need?" -> result panel dynamic status line.
4. "What to do with this result" -> dynamic study plan.
5. Near-cutoff advice -> dynamic plan state.

### 4.3 Fold into accordion / drawer

1. Estimated conversion table.
2. How scoring works.
3. Exam format table.
4. Bluebook note.
5. Methodology and assumptions.

### 4.4 Convert to dynamic

1. Static study recommendations -> generated 2-week / 4-week / 8-week plan.
2. Static example -> optional user-input-based "Your math" drawer.
3. Generic score-needed copy -> current target + exact gap + feasible raw-point options.

---

## 5. Target v5 APUSH IA

```text
1. Header

2. Hero
   - H1: APUSH Score Calculator 2026
   - Copy: estimate score + get a study plan based on weakest section
   - CTA: Estimate my APUSH score
   - Secondary CTA: See scoring assumptions
   - Mini dashboard only: estimated score + composite + small band marker

3. Calculator workspace
   - Input card: MCQ, SAQ, DBQ, LEQ
   - Unified result panel:
     a. Estimated AP score
     b. Composite out of 100
     c. Gap to next target
     d. Section diagnostics
     e. Dynamic study plan with 2-week / 4-week / 8-week variants
     f. Optional "Your math" drawer generated from inputs

4. Reference accordion group
   - Estimated APUSH composite ranges
   - How APUSH scoring works
   - 2026 APUSH exam format and Bluebook note
   - Methodology / assumptions

5. Compact FAQ
   - 5-6 questions max
   - FAQ schema must match visible FAQ

6. Related calculators

7. Footer
```

Top-level sections target: 6-7 plus header/footer.

---

## 6. All-subject v5 IA

All subject pages should follow the same skeleton:

```text
1. Header
2. Subject hero
3. Calculator workspace with unified result panel
4. Reference accordions
5. FAQ
6. Related calculators
7. Footer
```

Subject-specific variations are allowed only in:

- Input labels
- Section advice language
- Exam-format accordion content
- Confidence / risk note
- FAQ wording

Subject-specific variations are not allowed to create new one-off page structures or duplicate score-band modules.

---

## 7. Dynamic study-plan logic summary

The implementation source of truth should be `v5-product-ux-handoff.md`; this trim plan summarizes the required behavior.

The plan generator must:

1. Read subject sections and user values.
2. Normalize section performance.
3. Calculate weighted lost points.
4. Rank weakest sections using normalized performance and weighted opportunity.
5. Determine target score:
   - 1/2 -> target 3
   - 3 -> target 4
   - 4 -> target 5
   - 5 -> protect or maintain
6. Calculate target gap and confidence buffer.
7. Convert gap into feasible raw-point improvement options.
8. Render 2-week, 4-week, and 8-week plan variants.
9. Use subject-specific advice map rather than APUSH-only hardcoding.

---

## 8. Required APUSH dynamic plan examples for QA

### 8.1 Near AP 5 fixture

Input:

```text
MCQ 45
SAQ 7
DBQ 5
LEQ 4
```

Expected result:

```text
Composite: 76.2
Estimated AP score: 4
Gap to AP 5: 3.8
Plan target: AP 5
Plan language: close the 5 gap, focus on highest-yield section gains
```

Expected gain-option style:

```text
+1 DBQ point -> about +3.6 composite points
+1 DBQ point + 1 MCQ correct -> about +4.3 composite points
```

### 8.2 Below AP 3 fixture

Expected result:

```text
Plan target: AP 3
Plan language: build a passing-score path first
8-week plan emphasizes foundations before timed full practice
```

### 8.3 Already AP 5 fixture

Expected result:

```text
Plan state: protect 5 or maintain 5
Plan language: protect buffer, reduce avoidable misses, maintain timing
No language promising a higher AP score than 5
```

---

## 9. Content rules for v5

### Keep

- Clear unofficial estimate language.
- Browser-local privacy reassurance.
- Subject-specific scoring assumptions.
- A compact explanation of score conversion.
- A compact FAQ for SEO.
- Related calculator routing.

### Remove / avoid

- Repeated score-band sections.
- Repeated benchmark tables.
- Copied competitor-style content blocks.
- Placeholder resource links.
- Static "what to practice next" lists that ignore the user's input.
- APUSH-only copy on other subject pages.
- Generic AI marketing language.
- Fake testimonials or unsupported claims.

---

## 10. Developer acceptance checklist

### APUSH de-duplication

- [ ] No standalone score-band dashboard after calculator.
- [ ] No standalone section-weighting chart.
- [ ] No `v4-band-card` grid.
- [ ] No APUSH benchmark table duplicating 3/4/5 targets.
- [ ] No static resource grid with `href="#resources"`.
- [ ] No duplicate FAQ sections.
- [ ] No hardcoded 45 / 7 / 5 / 4 worked example as a standalone page block.
- [ ] Conversion table appears only once.
- [ ] Methodology appears as one compact note/drawer plus footer/legal.
- [ ] APUSH top-level sections are 8 or fewer, excluding header/footer.

### All-subject dynamic plans

- [ ] Every subject page has a dynamic study-plan component.
- [ ] The component updates after input changes.
- [ ] Weakest section uses normalized performance + weighted lost points.
- [ ] Target gap uses the next realistic AP target.
- [ ] Plan includes concrete raw-point gain options.
- [ ] Plan includes 2-week / 4-week / 8-week variants.
- [ ] APUSH advice uses MCQ / SAQ / DBQ / LEQ correctly.
- [ ] AP Lang / AP Lit advice uses essay names correctly.
- [ ] AP Bio / AP Chem / AP Calc / AP Stats / AP Gov / AP Psych advice does not mention APUSH-only concepts.
- [ ] Empty state appears before input.
- [ ] Score 5 state uses protect / maintain language.

### UX / QA

- [ ] 360 / 390 / 414px mobile widths have no horizontal overflow.
- [ ] Input labels and fields remain readable.
- [ ] Result panel is visually connected to inputs.
- [ ] Study-plan controls have comfortable tap targets.
- [ ] Accordions are below the calculator and do not obscure the primary product flow.
- [ ] FAQ schema matches the single visible FAQ.
- [ ] Sitemap / canonical / legal pages remain intact.
- [ ] `npm run check` passes.

---

## 11. Exact tests requested for implementation worker

### Unit tests

1. APUSH 45 / 7 / 5 / 4 produces 76.2, AP 4, AP 5 gap 3.8, target 5.
2. APUSH low-score fixture targets AP 3 and generates foundation plan.
3. APUSH high-score fixture generates protect-5 / maintain plan.
4. Weakest section selection is not raw-lowest; it considers weighted lost points.
5. Gain options never suggest more points than a section has available.
6. AP Lang weak essay fixture generates AP Lang-specific advice and no APUSH terms.
7. AP Chem or AP Bio two-section fixture generates correct MCQ/FRQ advice.
8. Empty input returns empty plan state.

### HTML / generated site tests

1. Every subject page contains `[data-dynamic-study-plan]`.
2. Every subject page contains 2-week / 4-week / 8-week plan controls.
3. APUSH page does not contain `v4-band-card`.
4. APUSH page does not contain `href="#resources"`.
5. APUSH page does not contain duplicate FAQ sections.
6. APUSH page does not contain the removed standalone headings:
   - "See the APUSH score bands before you interpret the estimate"
   - "APUSH points do not all move the estimate the same way"
   - "What to practice next: APUSH Study Resources"
7. Non-APUSH pages do not contain APUSH-only section names such as DBQ/LEQ unless the subject legitimately uses them.

### Browser checks

1. APUSH desktop: enter 45 / 7 / 5 / 4 and verify score, composite, gap, dynamic plan.
2. APUSH mobile 360 / 390 / 414: no horizontal overflow; result and plan readable.
3. AP Lang: enter weak essay scores and verify AP Lang-specific plan.
4. AP Chem or AP Bio: verify two-section plan and no APUSH language.

---

## 12. Handoff note

This is a design/product UX task only. No production code was changed by this task. The implementation worker should use:

- `v5-product-ux-handoff.md` for the full dynamic study-plan model and developer criteria.
- `v5-page-trim-plan.md` for APUSH section-by-section removal / merge / conversion decisions.
