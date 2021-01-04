import { Matrix } from '../..';

describe('sum by row and columns', () => {
  const matrix = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  const emptyMatrix = new Matrix(0, 0);
  const zeroRowMatrix = new Matrix(0, 2);
  const zeroColumnMatrix = new Matrix(3, 0);

  it('sum by row', () => {
    expect(matrix.sum('row')).toStrictEqual([6, 15]);
  });

  it('sum by column', () => {
    expect(matrix.sum('column')).toStrictEqual([5, 7, 9]);
  });

  it('sum all', () => {
    expect(matrix.sum()).toBe(21);
  });

  it('sum by row of 0x0 matrix', () => {
    expect(emptyMatrix.sum('row')).toStrictEqual([]);
  });

  it('sum by column of 0x0 matrix', () => {
    expect(emptyMatrix.sum('column')).toStrictEqual([]);
  });

  it('sum all of 0x0 matrix', () => {
    expect(emptyMatrix.sum()).toStrictEqual(0);
  });

  /* these correspond to the empty sum: https://en.wikipedia.org/wiki/Empty_sum */
  it('sum by column of 0 row matrix', () => {
    expect(zeroRowMatrix.sum('column')).toStrictEqual([0, 0]);
  });

  it('sum by row of 0 column matrix', () => {
    expect(zeroColumnMatrix.sum('row')).toStrictEqual([0, 0, 0]);
  });
});
