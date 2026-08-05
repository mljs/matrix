import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { describe, it, expect } from 'vitest';

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

  it('should not depend on the magnitude of the matrix', () => {
    // row 3 is 2 * row 1 whatever the scale, so the result must not change
    const rows = [
      [1, 2, 3],
      [4, 5, 6],
      [2, 4, 6],
    ];
    for (const k of [1e-9, 1e-3, 1, 1e3, 1e6, 1e9, 1e12]) {
      const dependencies = linearDependencies(new Matrix(rows).mul(k));
      expect(dependencies.to2DArray()).toBeDeepCloseTo(
        [
          [0, 0, 0.5],
          [0, 0, 0],
          [2, 0, 0],
        ],
        6,
      );
    }
  });

  it('should not report dependencies for a full rank matrix', () => {
    const rows = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 10],
    ];
    for (const k of [1e-9, 1e-3, 1, 1e3, 1e6, 1e9, 1e12]) {
      const dependencies = linearDependencies(new Matrix(rows).mul(k));
      expect(dependencies.to2DArray()).toStrictEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]);
    }
  });
});
