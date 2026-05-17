# AP Score Calculator Official Source Evidence Pack

> Status: **completed for V8 P1 source gating**  
> Created: 2026-05-17  
> Purpose: official/authoritative citations required before publishing support pages such as `/ap-score-distribution/` and `/ap-exam-schedule/`.

## Official College Board sources

### AP exam schedule / test schedule

- Official AP Central schedule page: `https://apcentral.collegeboard.org/exam-administration-ordering-scores/exam-dates`
  - Evidence captured: “The 2026 AP Exams will be administered in schools over two weeks in May: May 4–8 and May 11–15.”
  - Use for: `/ap-exam-schedule/`, schedule summary, exam-week framing.
- Official AP Students schedule page: `https://apstudents.collegeboard.org/exam-dates`
  - Evidence captured: 2026 AP Exams are administered May 4–8 and May 11–15; student-facing exam dates.
  - Use for: student-facing schedule copy.
- AP 2025–26 key dates/deadlines: `https://apcentral.collegeboard.org/about-ap/school-year-timeline`
  - Evidence captured: AP coordinator order/change deadlines; useful only if a support page mentions school/admin deadlines.
  - Use cautiously: avoid overloading student calculator pages with coordinator-specific details.

### AP scores / score release

- View AP Scores: `https://apstudents.collegeboard.org/view-scores`
  - Evidence captured: “2026 AP Exam scores will be available starting Monday, July 6.”
  - Use for: score release FAQ and schedule page.
- AP Calendar: `https://apstudents.collegeboard.org/calendar`
  - Evidence captured: “AP scores will be available starting July 6.”
  - Use for: second official confirmation of score release date.
- About AP Scores: `https://apstudents.collegeboard.org/about-ap-scores`
  - Evidence captured: AP Exams are scored on a scale of 1 to 5; many U.S. colleges grant credit/placement for scores of 3 and above.
  - Use for: calculator disclaimer and “what does a 3/4/5 mean?” context.

### AP score distributions

- AP Students score distributions page: `https://apstudents.collegeboard.org/about-ap-scores/score-distributions`
  - Evidence captured: College Board publishes score distribution tables showing percentages of 1s, 2s, 3s, 4s, and 5s for each AP subject.
  - Use for: `/ap-score-distribution/` intro and source link.
- 2025 AP Score Distributions PDF: `https://apcentral.collegeboard.org/media/pdf/ap-score-distributions-by-subject-2025.pdf`
  - Evidence captured: official AP score distributions by subject for 2025.
  - Use for: 2025 distribution data if the page includes table values.
- Subject distribution PDFs examples:
  - AP Calculus AB 2025 distribution: `https://apcentral.collegeboard.org/media/pdf/ap25-calculus-ab-score-distributions.pdf`
  - AP Statistics 2025 distribution: `https://apcentral.collegeboard.org/media/pdf/ap25-statistics-score-distributions.pdf`
  - AP World History: Modern 2025 distribution: `https://apcentral.collegeboard.org/media/pdf/ap25-world-history-modern-score-distributions.pdf`

### Course/exam formats and scoring guidelines

- AP Central course and exam pages: `https://apcentral.collegeboard.org/courses`
  - Use for: official exam format/timing/FRQ references by subject.
- AP course changes overview: `https://apcentral.collegeboard.org/courses/how-ap-develops-courses-and-exams/course-changes-overview`
  - Use for: checking whether an exam format changed before claiming a 2026 calculator is current.
- Example course/exam docs discovered:
  - AP US History Course and Exam Description PDF: `https://apcentral.collegeboard.org/media/pdf/ap-us-history-course-and-exam-description.pdf`
  - AP Chemistry Course and Exam Description PDF: `https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf`

## P1 page publication gates

### `/ap-score-distribution/`

Can proceed when:

1. The page cites the official College Board score distribution page and/or official PDF.
2. The page clearly says score distributions are historical aggregate exam outcomes, not calculator cutoffs.
3. Any copied numeric distribution values are checked against the official PDF/table before deployment.
4. Subject calculator links are included as “estimate your own score” actions, not as official score predictions.

### `/ap-exam-schedule/`

Can proceed when:

1. The page cites AP Central/AP Students official exam-date pages.
2. The primary cycle is 2026, not stale 2025 framing.
3. The copy distinguishes exam dates from score release dates.
4. If listing every subject date/time, every row must be checked against College Board immediately before deployment.

## Disclaimer language to reuse

Recommended site-wide language:

> AP® and Advanced Placement® are registered trademarks of the College Board. This site is independent and is not affiliated with, endorsed by, or reviewed by the College Board. Calculator results are estimates based on publicly available exam formats and historical scoring information, not official score reports.

## Final source verdict

The P1 official-source gate is now sufficiently filled for planning and drafting support pages. Numeric tables and subject-by-subject schedule rows still require a final row-level verification pass immediately before deployment.
