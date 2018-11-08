import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, NNMF } from '../..';
import WrapperMatrix2D from '../../wrap/WrapperMatrix2D';

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

    let nA = new NNMF(A, 3);
    expect(nA.X.mmul(nA.Y)).toBeDeepCloseTo(A, 2);
    expect(nA.error).toBeDeepCloseTo(Matrix.zeros(5, 5));
    expect(nA.positivity).toEqual(true);
  });
  it('Random factoriation tests', () => {
    for (let i = 0; i < 5; i++) {
      let A = Matrix.rand(10, 10);
      let nA = new NNMF(A, 8);
      expect(nA.error).toBeDeepCloseTo(Matrix.zeros(10, 10), 0);
      expect(nA.positivity).toEqual(true);
    }
  });
});
