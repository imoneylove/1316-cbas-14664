import test from 'node:test';
import assert from 'node:assert/strict';
import { fitImageToPage } from './pdfLayout';

test('fitImageToPage centers wide 16:9 card inside A4 landscape margins', () => {
  const rect = fitImageToPage(1200, 675, 297, 210, 10);
  assert.equal(rect.width, 277);
  assert.equal(rect.x, 10);
  assert.ok(rect.height <= 190);
  assert.ok(rect.y >= 10);
});

test('fitImageToPage shrinks tall card proportionally without clipping', () => {
  const rect = fitImageToPage(1200, 1200, 297, 210, 10);
  assert.equal(rect.height, 190);
  assert.equal(rect.width, 190);
  assert.equal(rect.y, 10);
  assert.ok(rect.x > 10);
});
