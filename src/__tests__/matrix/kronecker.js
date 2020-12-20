import { Matrix } from '../..';

describe('Kronecker product', () => {
  it('should compute the Kronecker product', () => {
    const matrix1 = new Matrix([
      [1, 2],
      [3, 4],
    ]);
    const matrix2 = new Matrix([
      [0, 5],
      [6, 7],
    ]);
    const product = matrix1.kroneckerProduct(matrix2);
    expect(product.to2DArray()).toStrictEqual([
      [0, 5, 0, 10],
      [6, 7, 12, 14],
      [0, 15, 0, 20],
      [18, 21, 24, 28],
    ]);
  });

  it('should compute on empty matrices', () => {
    const matrix1 = new Matrix([[]]);
    const matrix2 = new Matrix(0, 3);
    const matrix3 = new Matrix([
      [0, 5],
      [6, 7],
    ]);
    const product12 = matrix1.kroneckerProduct(matrix2);
    const product13 = matrix1.kroneckerProduct(matrix3);
    const product23 = matrix2.kroneckerProduct(matrix3);

    expect(product12.rows).toBe(0);
    expect(product12.columns).toBe(0);
    expect(product13.rows).toBe(2);
    expect(product13.columns).toBe(0);
    expect(product23.rows).toBe(0);
    expect(product23.columns).toBe(6);
  });
});
