import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, NNMF } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Non-negative Matrix Factorization', () => {
  it('factorization', () => {
    let A = new Matrix([
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1]
    ]);

    let nA = new NNMF(A, 4);
    expect(nA.X.mmul(nA.Y)).toBeDeepCloseTo(A);
    expect(nA.error).toBeDeepCloseTo(Matrix.zeros(5, 5));
    expect(nA.positivity).toEqual(true);
  });
});
