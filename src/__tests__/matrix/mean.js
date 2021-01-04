import { Matrix } from '../..';

describe('mean by row and columns', () => {
  const matrix = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  const zeroRowMatrix = new Matrix(0, 2);
  const zeroColumnMatrix = new Matrix(1, 0);
  it('mean by row', () => {
    expect(matrix.mean('row')).toStrictEqual([2, 5]);
  });

  it('mean by column', () => {
    expect(matrix.mean('column')).toStrictEqual([2.5, 3.5, 4.5]);
  });

  it('mean all', () => {
    expect(matrix.mean()).toBe(3.5);
  });

  it('means of 0 row matrix', () => {
    expect(zeroRowMatrix.mean('row')).toStrictEqual([]);
    expect(zeroRowMatrix.mean('column')).toStrictEqual([NaN, NaN]);
    expect(zeroRowMatrix.mean()).toStrictEqual(NaN);
  });

  it('means of 0 column matrix', () => {
    expect(zeroColumnMatrix.mean('row')).toStrictEqual([NaN]);
    expect(zeroColumnMatrix.mean('column')).toStrictEqual([]);
    expect(zeroColumnMatrix.mean()).toStrictEqual(NaN);
  });
});
