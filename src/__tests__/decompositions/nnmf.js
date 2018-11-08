import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, NNMF } from '../..';
import WrapperMatrix2D from '../../wrap/WrapperMatrix2D';

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
  it('factorization', () => {
    let A = new Matrix([
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1]
    ]);

    let nA = new NNMF(A, 3);
    expect(nA.X.mmul(nA.Y)).toBeDeepCloseTo(A, 2);
    expect(nA.error).toBeDeepCloseTo(Matrix.zeros(5, 5));
    expect(positivity(nA)).toEqual(true);
  });
  it('Random factoriation tests', () => {
    for (let i = 0; i < 10; i++) {
      let A = Matrix.rand(10, 10);
      let nA = new NNMF(A, 8);
      expect(nA.error).toBeDeepCloseTo(Matrix.zeros(10, 10), 0);
      expect(positivity(nA)).toEqual(true);
    }
  });
});
