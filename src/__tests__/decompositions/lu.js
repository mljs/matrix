import { Matrix, LU } from '../..';

describe('LU decomposition', () => {
  it('should compute lower triangular matrix', () => {
    // http://ch.mathworks.com/help/matlab/ref/lu.html
    let matrix = new Matrix([
      [1, -1, -1, -1, -1],
      [-1, 2, 0, 0, 0],
      [-1, 0, 3, 1, 1],
      [-1, 0, 1, 4, 2],
      [-1, 0, 1, 2, 5],
    ]);

    const lu = new LU(matrix);

    const ltm = lu.lowerTriangularMatrix;
    checkTriangular(ltm);

    expect(ltm.mmul(ltm.transpose())).toStrictEqual(matrix);
  });

  it('should work with arrays', () => {
    // http://ch.mathworks.com/help/matlab/ref/lu.html
    let matrix = [
      [1, -1, -1, -1, -1],
      [-1, 2, 0, 0, 0],
      [-1, 0, 3, 1, 1],
      [-1, 0, 1, 4, 2],
      [-1, 0, 1, 2, 5],
    ];

    const lu = new LU(matrix);

    const ltm = lu.lowerTriangularMatrix;
    checkTriangular(ltm);

    expect(ltm.mmul(ltm.transpose())).toStrictEqual(new Matrix(matrix));
  });

  it('should throw on bad input', () => {
    expect(
      () =>
        new LU([
          [0, 1, 2],
          [0, 1, 2],
        ]).determinant,
    ).toThrow('Matrix must be square');
  });

  it('should handle empty matrices', () => {
    const matrix = new Matrix([]);
    const decomp = new LU(matrix);
    expect(decomp.lowerTriangularMatrix.to2DArray()).toStrictEqual([]);
    expect(decomp.upperTriangularMatrix.to2DArray()).toStrictEqual([]);
    // https://en.wikipedia.org/wiki/Matrix_(mathematics)#Empty_matrices
    expect(decomp.determinant).toStrictEqual(1);
  });
});

function checkTriangular(matrix) {
  for (let i = 0; i < matrix.rows; i++) {
    for (let j = i + 1; j < matrix.columns; j++) {
      expect(matrix.get(i, j)).toBe(0);
    }
  }
}
