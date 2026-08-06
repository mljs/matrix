import { XSadd } from 'ml-xsadd';
import { describe, it, expect } from 'vitest';

import { Matrix, SingularValueDecomposition } from '../..';

const wellBehaved = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 10],
  [2, 9, 4],
]);

function randomMatrix(rows, columns, seed) {
  return Matrix.rand(rows, columns, { random: new XSadd(seed).random });
}

describe('SVD sweep ceiling', () => {
  it('a decomposition that converges is untouched by the default', () => {
    const svd = new SingularValueDecomposition(wellBehaved);
    const product = svd.leftSingularVectors
      .mmul(Matrix.diag(svd.diagonal))
      .mmul(svd.rightSingularVectors.transpose());
    for (let i = 0; i < wellBehaved.rows; i++) {
      for (let j = 0; j < wellBehaved.columns; j++) {
        expect(product.get(i, j)).toBeCloseTo(wellBehaved.get(i, j), 10);
      }
    }
  });

  it('a ceiling of one sweep is reported rather than passed over', () => {
    expect(
      () =>
        new SingularValueDecomposition(randomMatrix(40, 25, 42), {
          maxIterations: 1,
        }),
    ).toThrow(
      /^SVD did not converge after 1 iteration on a single singular value$/,
    );
  });

  it('the ceiling is counted per singular value, not over the whole run', () => {
    expect(
      () =>
        new SingularValueDecomposition(randomMatrix(200, 150, 43), {
          maxIterations: 20,
        }),
    ).not.toThrow();
  });

  it('a generous ceiling behaves like the default', () => {
    const bounded = new SingularValueDecomposition(wellBehaved, {
      maxIterations: 1000,
    });
    const plain = new SingularValueDecomposition(wellBehaved);
    expect(bounded.diagonal).toStrictEqual(plain.diagonal);
  });

  it('rejects a ceiling that is not a positive integer', () => {
    for (const value of [0, -1, 2.5, '10', null]) {
      expect(
        () =>
          new SingularValueDecomposition(wellBehaved, {
            maxIterations: value,
          }),
      ).toThrow(/^maxIterations must be a positive integer$/);
    }
  });
});
