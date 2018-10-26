import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, NNMF } from '../..';

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
    var zM = Matrix.zeros(5, 5);

    nA.doNnmf(1000);
    nA.doError();
    expect(nA.X.mmul(nA.Y)).toBeDeepCloseTo(A);
    expect(nA.error).toBeDeepCloseTo(zM);
  });
});
