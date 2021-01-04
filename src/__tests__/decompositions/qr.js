import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, QR } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Qr decomposition', () => {
  it('should compute lower triangular matrix', () => {
    // http://ch.mathworks.com/help/matlab/ref/qr.html
    let matrix = new Matrix([
      [3 / 2, 1, 0, 0],
      [1, 1 / 2, 1, 0],
      [0, 1, 1 / 2, 1],
      [0, 0, 1, 3 / 2],
    ]);

    const qr = new QR(matrix);
    expect(qr.isFullRank()).toBe(true);
  });

  it('should work with arrays', () => {
    // http://ch.mathworks.com/help/matlab/ref/qr.html
    let matrix = [
      [3 / 2, 1, 0, 0],
      [1, 1 / 2, 1, 0],
      [0, 1, 1 / 2, 1],
      [0, 0, 1, 3 / 2],
    ];

    const qr = new QR(matrix);
    expect(qr.isFullRank()).toBe(true);

    let b = Matrix.columnVector([20001, 20003, 20005, 20007]);
    expect(qr.solve(b).to2DArray()).toBeDeepCloseTo(
      [[8000.1714], [8000.7429], [8002.45714], [8003.02857]],
      4,
    );
  });

  it('should solve the value', () => {
    let A = new Matrix([
      [10000, 10001],
      [10002, 10003],
      [10004, 10001],
      [10002, 10003],
      [10004, 10005],
    ]);
    let b = Matrix.columnVector([20001, 20003, 20005, 20007, 20009]);

    const qr = new QR(A);
    expect(qr.solve(b).to2DArray()).toBeDeepCloseTo([[1], [0.9999]], 4);
  });

  it('should work with the example in the documentation', () => {
    const A = [
      [2, 3, 5],
      [4, 1, 6],
      [1, 3, 0],
    ];
    const dc = new QR(A);
    const Q = dc.orthogonalMatrix;
    const R = dc.upperTriangularMatrix;
    const qR = Q.mmul(R);
    expect(qR.to2DArray()).toBeDeepCloseTo(A, 4);
  });

  it('should work with empty matrices', () => {
    const matrix = new Matrix([]);
    const decomp = new QR(matrix);
    expect(decomp.upperTriangularMatrix.to2DArray()).toStrictEqual([]);
    expect(decomp.orthogonalMatrix.to2DArray()).toStrictEqual([]);
    expect(decomp.isFullRank()).toStrictEqual(true);
  });
});
