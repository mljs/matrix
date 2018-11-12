import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, positiveLinearCombination } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Non-negative Matrix Factorization', () => {
  it('Base I', () => {
    let base = new Matrix([
      [0, 20, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 30, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 100, 5, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 100, 15, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 10, 100, 10, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 100, 10],
    ]);
    let vector = new Matrix([[0, 20, 100, 20, 0, 0, 0, 0, 0, 5, 100, 5, 0, 0, 0, 20, 200, 20]]);
    let solutions = Matrix.empty(1, base.columns);
    let expected = new Matrix([1, 0, 1, 0, 0, 2]);

    solutions = positiveLinearCombination(base, vector);

    expect(solutions).toEqual(expected);
  });
});

