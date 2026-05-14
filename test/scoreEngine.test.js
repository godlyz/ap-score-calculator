import test from 'node:test';
import assert from 'node:assert/strict';
import { buildStudyPlan, calculateScore, scoreNeeded, sectionDiagnostics, subjectSlugs, getSubject } from '../src/scoreEngine.js';

test('APUSH calculator combines MCQ, SAQ, DBQ, and LEQ into a predicted AP score with gap guidance', () => {
  const result = calculateScore('apush', { mcq: 45, saq: 7, dbq: 5, leq: 4 });

  assert.equal(result.subject, 'AP US History');
  assert.equal(result.maxComposite, 100);
  assert.equal(result.composite, 76.2);
  assert.equal(result.predictedScore, 4);
  assert.equal(result.scoreBand, '4');
  assert.equal(result.nextAction, 'You may need about 3.8 more estimated composite points to reach a 5.');
  assert.deepEqual(scoreNeeded('apush', result.composite), {
    3: 0,
    4: 0,
    5: 3.8
  });
});

test('scoreNeeded reports remaining composite points for target scores', () => {
  const needed = scoreNeeded('ap-chemistry', 54);

  assert.deepEqual(needed, {
    3: 6,
    4: 20,
    5: 36
  });
});

test('calculator clamps invalid and out-of-range inputs instead of producing impossible composites', () => {
  const low = calculateScore('ap-calculus-ab', { mcq: -5, frq: 'bad input' });
  const high = calculateScore('ap-calculus-ab', { mcq: 999, frq: 999 });

  assert.equal(low.composite, 0);
  assert.equal(low.predictedScore, 1);
  assert.equal(high.composite, 108);
  assert.equal(high.predictedScore, 5);
});

test('MVP exposes the full subject matrix: hub plus all subject calculators', () => {
  const slugs = subjectSlugs();
  assert.ok(slugs.length >= 16, `expected at least 16 subjects, got ${slugs.length}`);
  assert.ok(slugs.includes('apush'));
  assert.ok(slugs.includes('ap-world-history'));
  assert.ok(slugs.includes('ap-physics-1'));
  assert.ok(slugs.includes('ap-macroeconomics'));
  assert.ok(slugs.includes('ap-human-geography'));
});

test('v5 APUSH 45/7/5/4 dynamic study plan targets AP 5 gap with DBQ gain options', () => {
  const plan = buildStudyPlan('apush', { mcq: 45, saq: 7, dbq: 5, leq: 4 });

  assert.equal(plan.result.composite, 76.2);
  assert.equal(plan.result.predictedScore, 4);
  assert.equal(plan.targetScore, 5);
  assert.equal(plan.gap, 3.8);
  assert.match(plan.gapText, /AP 5/);
  assert.match(plan.gapText, /3\.8/);
  assert.equal(plan.weakest.key, 'dbq');
  assert.match(plan.focus, /DBQ/);
  assert.match(plan.gainOptions[0].label, /\+1 DBQ/);
  assert.equal(plan.gainOptions[0].gain, 3.6);
  assert.equal(plan.gainOptions[1].gain, 4.3);
  assert.deepEqual(plan.timelines.map((item) => item.weeks), [2, 4, 8]);
});

test('v5 section diagnostics normalize weighted opportunity for weighted-100 APUSH', () => {
  const subject = getSubject('apush');
  const diagnostics = sectionDiagnostics(subject, { mcq: 45, saq: 7, dbq: 5, leq: 4 });
  const dbq = diagnostics.find((item) => item.key === 'dbq');

  assert.equal(dbq.weightedEarned, 17.9);
  assert.equal(dbq.weightedLost, 7.1);
  assert.equal(dbq.pointValue, 3.6);
  assert.equal(diagnostics[0].key, 'dbq');
});


test('v5 weighted-100 composite rounds cleanly to one decimal place', () => {
  const rounded = calculateScore('apush', { mcq: 45, saq: 7, dbq: 1, leq: 4 });

  assert.equal(rounded.composite, 61.9);
  assert.equal(String(rounded.composite), '61.9');
});

test('v5 balanced study-plan copy avoids strongest/weakest contradiction', () => {
  const plan = buildStudyPlan('ap-chemistry', { mcq: 30, frq: 30 });

  assert.notEqual(plan.weakest.key, plan.secondary?.key);
  assert.match(plan.focus, /balanced current section|best next focus/);
  assert.doesNotMatch(plan.focus, /Your strongest current section is .*most balanced current section/);
});
