import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, NNMF, WrapperMatrix2D } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Non-negative Matrix Factorization', () => {
  it('factorization', () => {
    var A = new Matrix([
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1]
    ]);

    var nA = new NNMF(A, 4);
    nA.doNnmf(1000);
    expect(nA.X.mmul(nA.Y)).toBeDeepCloseTo(A);
  });
});
