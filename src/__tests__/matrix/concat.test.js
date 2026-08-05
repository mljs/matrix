import { describe, it, expect } from 'vitest';

import { Matrix, MatrixTransposeView, SymmetricMatrix } from '../..';

describe('concat', () => {
  const matrix = new Matrix([
    [1, 2],
    [3, 4],
  ]);
  const other = new Matrix([
    [5, 6],
    [7, 8],
    [9, 10],
  ]);

  it('by row stacks the matrices vertically', () => {
    const result = matrix.concat(other, 'row');
    expect(result.rows).toBe(5);
    expect(result.columns).toBe(2);
    expect(result.to2DArray()).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ]);
  });

  it('by column stacks the matrices side by side', () => {
    const result = matrix.concat(other.transpose(), 'column');
    expect(result.rows).toBe(2);
    expect(result.columns).toBe(5);
    expect(result.to2DArray()).toStrictEqual([
      [1, 2, 5, 7, 9],
      [3, 4, 6, 8, 10],
    ]);
  });

  it('concatenates by row when the dimension is omitted', () => {
    expect(matrix.concat(other).to2DArray()).toStrictEqual(
      matrix.concat(other, 'row').to2DArray(),
    );
  });

  it('accepts a 2D array', () => {
    expect(matrix.concat([[5, 6]]).to2DArray()).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('leaves both operands untouched', () => {
    matrix.concat(other, 'row');
    expect(matrix.to2DArray()).toStrictEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(other.rows).toBe(3);
  });

  it('always returns a plain matrix', () => {
    const symmetric = new SymmetricMatrix([
      [1, 2],
      [2, 3],
    ]);
    const result = symmetric.concat(matrix, 'row');
    expect(result).toBeInstanceOf(Matrix);
    expect(result.to2DArray()).toStrictEqual([
      [1, 2],
      [2, 3],
      [1, 2],
      [3, 4],
    ]);
  });

  it('reads a view along the view dimensions', () => {
    const view = new MatrixTransposeView(
      new Matrix([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    );
    expect(view.concat([[7, 8]], 'row').to2DArray()).toStrictEqual([
      [1, 4],
      [2, 5],
      [3, 6],
      [7, 8],
    ]);
  });

  it('appends a column vector', () => {
    const result = matrix.concat(Matrix.columnVector([5, 6]), 'column');
    expect(result.to2DArray()).toStrictEqual([
      [1, 2, 5],
      [3, 4, 6],
    ]);
  });

  it('appends a row vector', () => {
    const result = matrix.concat(Matrix.rowVector([5, 6]), 'row');
    expect(result.to2DArray()).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('chains to gather several matrices', () => {
    const result = matrix
      .concat([[5, 6]], 'row')
      .concat(Matrix.columnVector([7, 8, 9]), 'column');
    expect(result.to2DArray()).toStrictEqual([
      [1, 2, 7],
      [3, 4, 8],
      [5, 6, 9],
    ]);
  });
});

describe('concat with degenerate matrices', () => {
  it('by row with a matrix without rows', () => {
    const result = new Matrix(0, 2).concat(new Matrix([[1, 2]]), 'row');
    expect(result.to2DArray()).toStrictEqual([[1, 2]]);
  });

  it('by row onto a matrix without rows', () => {
    const result = new Matrix([[1, 2]]).concat(new Matrix(0, 2), 'row');
    expect(result.to2DArray()).toStrictEqual([[1, 2]]);
  });

  it('by column with a matrix without columns', () => {
    const result = new Matrix(2, 0).concat(new Matrix([[1], [2]]), 'column');
    expect(result.to2DArray()).toStrictEqual([[1], [2]]);
  });

  it('by column onto a matrix without columns', () => {
    const result = new Matrix([[1], [2]]).concat(new Matrix(2, 0), 'column');
    expect(result.to2DArray()).toStrictEqual([[1], [2]]);
  });

  it('by column of two matrices without rows', () => {
    const result = new Matrix(0, 1).concat(new Matrix(0, 2), 'column');
    expect(result.rows).toBe(0);
    expect(result.columns).toBe(3);
  });

  it('by row of two matrices without columns', () => {
    const result = new Matrix(1, 0).concat(new Matrix(2, 0), 'row');
    expect(result.rows).toBe(3);
    expect(result.columns).toBe(0);
  });

  it('by row of two 0x0 matrices', () => {
    const result = new Matrix(0, 0).concat(new Matrix(0, 0), 'row');
    expect(result.rows).toBe(0);
    expect(result.columns).toBe(0);
  });
});

describe('concat error handling', () => {
  const matrix = new Matrix([
    [1, 2],
    [3, 4],
  ]);

  it('throws when the number of columns differs', () => {
    expect(() => matrix.concat(new Matrix([[1, 2, 3]]), 'row')).toThrow(
      /^both matrices must have the same number of columns$/,
    );
  });

  it('throws when the number of rows differs', () => {
    expect(() => matrix.concat(new Matrix([[1, 2, 3]]), 'column')).toThrow(
      /^both matrices must have the same number of rows$/,
    );
  });

  it('throws when the dimension is unknown', () => {
    expect(() => matrix.concat(matrix, 'diagonal')).toThrow(
      /^invalid option: diagonal$/,
    );
  });
});
