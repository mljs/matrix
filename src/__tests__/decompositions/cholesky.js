import { Matrix, CHO } from '../..';

describe('Cholesky decomposition', () => {
  it('should compute lower triangular matrix', () => {
    // http://ch.mathworks.com/help/matlab/ref/chol.html
    let matrix = new Matrix([
      [1, -1, -1, -1, -1],
      [-1, 2, 0, 0, 0],
      [-1, 0, 3, 1, 1],
      [-1, 0, 1, 4, 2],
      [-1, 0, 1, 2, 5],
    ]);

    const cho = new CHO(matrix);

    const ltm = cho.lowerTriangularMatrix;
    checkTriangular(ltm);

    expect(ltm.mmul(ltm.transpose())).toStrictEqual(matrix);
  });
  it('should throw if not symmetric', () => {
    expect(
      () =>
        new CHO([
          [0, 1],
          [2, 0],
        ]),
    ).toThrow('Matrix is not symmetric');
  });
  it('test for positive definiteness', () => {
    let A = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    let AtA = A.transpose().mmul(A);

    let choAtA = new CHO(AtA);

    let b = new Matrix([[1], [2], [3]]);

    expect(choAtA.isPositiveDefinite()).toStrictEqual(false);
    expect(() => choAtA.solve(b)).toThrow('Matrix is not positive definite');
  });
  it('should handle empty matrices', () => {
    const decomp = new CHO([]);
    expect(decomp.lowerTriangularMatrix.to2DArray()).toStrictEqual([]);
  });
});

function checkTriangular(matrix) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = i + 1; j < matrix.columns; j++) {
      expect(matrix.get(i, j)).toBe(0);
    }
  }
}
