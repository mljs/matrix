import { Matrix } from '../..';

describe('product by row and columns', () => {
  const matrix = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  const emptyMatrix = new Matrix(0, 0);
  const zeroRowMatrix = new Matrix(0, 2);
  const zeroColumnMatrix = new Matrix(3, 0);

  it('product by row', () => {
    expect(matrix.product('row')).toStrictEqual([6, 120]);
  });

  it('product by column', () => {
    expect(matrix.product('column')).toStrictEqual([4, 10, 18]);
  });

  it('product all', () => {
    expect(matrix.product()).toBe(720);
  });

  it('product by row of empty matrix', () => {
    expect(emptyMatrix.product('row')).toStrictEqual([]);
  });

  it('product by column of empty matrix', () => {
    expect(emptyMatrix.product('column')).toStrictEqual([]);
  });

  it('product by column of 0 row matrix', () => {
    expect(zeroRowMatrix.product('column')).toStrictEqual([1, 1]);
  });

  it('product by row of 0 column matrix', () => {
    expect(zeroColumnMatrix.product('row')).toStrictEqual([1, 1, 1]);
  });
});
