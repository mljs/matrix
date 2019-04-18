import { Matrix } from '../..';

describe('revers rows and columns', () => {
  it('reverse rows', () => {
    const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const result = matrix.reverseRows();
    expect(result).toBe(matrix);
    expect(result.to2DArray()).toStrictEqual([[3, 2, 1], [6, 5, 4]]);
  });

  it('reverse columns', () => {
    const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const result = matrix.reverseColumns();
    expect(result).toBe(matrix);
    expect(result.to2DArray()).toStrictEqual([[4, 5, 6], [1, 2, 3]]);
  });
});
