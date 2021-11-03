import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, linearDependencies } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Linear Dependencies', () => {
  it('should compute the rows dependencies', () => {
    const A = new Matrix([
      [2, 0, 0, 1],
      [0, 1, 6, 0],
      [0, 3, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 2, 0],
    ]);
    const dependencies = linearDependencies(A);
    expect(dependencies.to2DArray()).toBeDeepCloseTo(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 4, 1],
        [0, 0, 0, 0, 0],
        [0, 0.25, 0, 0, -0.25],
        [0, 1, 0, -4, 0],
      ],
      3,
    );
  });
});
