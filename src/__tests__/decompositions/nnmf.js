import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, NNMF } from '../..';

expect.extend({ toBeDeepCloseTo });

function positivity(An) {
  let positive = true;
  for (let i = 0; i < An.m; i++) {
    for (let j = 0; j < An.r; j++) {
      if (An.X.get(i, j) < 0) {
        positive = false;
      }
    }
  }
  for (let i = 0; i < An.r; i++) {
    for (let j = 0; j < An.n; j++) {
      if (An.X.get(i, j) < 0) {
        positive = false;
      }
    }
  }
  return (positive);
}

describe('Non-negative Matrix Factorization', () => {
  it('Factorization test I', () => {
  /**
   * Global minimum :
   * X = [
   *   [2,	  4],
   *   [8,	 16],
   *  [32,	 64],
   * [128,	256]]
   *
   * Y = [
   * [1,	2,	3,	4],
   * [6,	7,	8,	9]]
   */
    let A = new Matrix([
      [26, 32, 38, 44],
      [104, 128, 152, 176],
      [416, 512, 608, 704],
      [1664, 2048, 2432, 2816]
    ]);
    let nA = new NNMF(A, 3, 0.000000001);

    expect(positivity(nA)).toEqual(true);
    expect(nA.error.max()).toBeLessThan(0.000000001);
  });

  it('Factorization test II', () => {
    let A = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);

    let nA = new NNMF(A, 3, 0.000000001);

    expect(positivity(nA)).toEqual(true);
    expect(nA.error.max()).toBeLessThan(0.001);
  });
});
