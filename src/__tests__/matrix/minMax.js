import { Matrix } from '../..';
import { getSquareMatrix } from '../../../testUtils';

describe('elementwise min - max', () => {
  const matrix1 = new Matrix([
    [0, 1, 2],
    [3, 4, 5],
  ]);
  const matrix2 = new Matrix([
    [3, 0, 2],
    [-6, 2, 12],
  ]);

  const empty1 = new Matrix(2, 0);
  const empty2 = new Matrix(2, 0);

  it('min', () => {
    expect(Matrix.min(matrix1, matrix2).to2DArray()).toStrictEqual([
      [0, 0, 2],
      [-6, 2, 5],
    ]);
  });

  it('max', () => {
    expect(Matrix.max(matrix1, matrix2).to2DArray()).toStrictEqual([
      [3, 1, 2],
      [3, 4, 12],
    ]);
  });

  it('empty matrix max', () => {
    expect(Matrix.max(empty1, empty2).to2DArray()).toStrictEqual([[], []]);
  });

  it('empty matrix min', () => {
    expect(Matrix.min(empty1, empty2).to2DArray()).toStrictEqual([[], []]);
  });
});

describe('matrix min/max', () => {
  it('empty matrix', () => {
    const emptyMatrix = new Matrix(0, 3);
    const min = emptyMatrix.min();
    const max = emptyMatrix.max();

    expect(min).toBe(NaN);
    expect(max).toBe(NaN);

    expect(() => emptyMatrix.maxIndex()).toThrow(
      'Empty matrix has no elements to index',
    );
    expect(() => emptyMatrix.minIndex()).toThrow(
      'Empty matrix has no elements to index',
    );
  });

  it('3x2 matrix', () => {
    const mat = new Matrix([
      [1, 2],
      [7, 3],
      [-1, 5],
    ]);
    const min = mat.min();
    const max = mat.max();
    const minIndex = mat.minIndex();
    const maxIndex = mat.maxIndex();
    expect(min).toBe(-1);
    expect(max).toBe(7);
    expect(minIndex).toStrictEqual([2, 0]);
    expect(maxIndex).toStrictEqual([1, 0]);
  });
});

describe('vector min/max', () => {
  const emptyMatrix = new Matrix(0, 0);
  const zeroRowMatrix = new Matrix(0, 2);
  const zeroColumnMatrix = new Matrix(3, 0);
  const squareMatrix = getSquareMatrix();

  it('maxRowIndex', () => {
    expect(() => emptyMatrix.maxRowIndex(0)).toThrow('Row index out of range');
    expect(() => zeroColumnMatrix.maxRowIndex(0)).toThrow(
      'Empty matrix has no elements to index',
    );
    expect(squareMatrix.maxRowIndex(0)).toStrictEqual([0, 1]);
  });

  it('minRowIndex', () => {
    expect(() => emptyMatrix.minRowIndex(0)).toThrow('Row index out of range');
    expect(() => zeroColumnMatrix.minRowIndex(0)).toThrow(
      'Empty matrix has no elements to index',
    );
    expect(squareMatrix.minRowIndex(0)).toStrictEqual([0, 2]);
  });

  it('maxColumnIndex', () => {
    expect(() => emptyMatrix.maxColumnIndex(0)).toThrow(
      'Column index out of range',
    );
    expect(() => zeroRowMatrix.maxColumnIndex(0)).toThrow(
      'Empty matrix has no elements to index',
    );
    expect(squareMatrix.maxColumnIndex(2)).toStrictEqual([1, 2]);
  });

  it('minColumnIndex', () => {
    expect(() => emptyMatrix.minColumnIndex(0)).toThrow(
      'Column index out of range',
    );
    expect(() => zeroRowMatrix.minColumnIndex(0)).toThrow(
      'Empty matrix has no elements to index',
    );
    expect(squareMatrix.minColumnIndex(2)).toStrictEqual([2, 2]);
  });

  it('maxRow', () => {
    expect(zeroColumnMatrix.maxRow(0)).toBe(NaN);
    expect(squareMatrix.maxRow(1)).toBe(11);
  });

  it('minRow', () => {
    expect(zeroColumnMatrix.minRow(0)).toBe(NaN);
    expect(squareMatrix.minRow(1)).toBe(1);
  });

  it('maxColumn', () => {
    expect(zeroRowMatrix.maxColumn(0)).toBe(NaN);
    expect(squareMatrix.maxColumn(0)).toBe(9);
  });

  it('minColumn', () => {
    expect(zeroRowMatrix.minColumn(0)).toBe(NaN);
    expect(squareMatrix.minColumn(0)).toBe(1);
  });
});
