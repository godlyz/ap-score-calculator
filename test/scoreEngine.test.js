import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScore, scoreNeeded, subjectSlugs } from '../src/scoreEngine.js';

test('APUSH calculator combines MCQ, SAQ, DBQ, and LEQ into a predicted AP score with gap guidance', () => {
  const result = calculateScore('apush', { mcq: 42, saq: 7, dbq: 5, leq: 4 });

  assert.equal(result.subject, 'AP US History');
  assert.equal(result.maxComposite, 130);
  assert.equal(result.composite, 96);
  assert.equal(result.predictedScore, 5);
  assert.equal(result.scoreBand, '5');
  assert.equal(result.nextAction, 'You are in the estimated 5 range. Keep reviewing weak sections.');
  assert.deepEqual(scoreNeeded('apush', result.composite), {
    3: 0,
    4: 0,
    5: 0
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

test('MVP exposes exactly the PRD first-page matrix: hub plus nine subject calculators', () => {
  assert.deepEqual(subjectSlugs(), [
    'apush',
    'ap-lang',
    'ap-chemistry',
    'ap-calculus-ab',
    'ap-biology',
    'ap-gov',
    'ap-statistics',
    'ap-psychology',
    'ap-lit'
  ]);
});
