import { describe, expect, it } from 'vitest';

import { Matrix, MatrixTransposeView, SymmetricMatrix } from '../..';

describe('applyAlongAxis', () => {
  const matrix = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
  ]);

  function sum(vector) {
    return vector.reduce((accumulator, value) => accumulator + value, 0);
  }

  it('by row returns a column vector', () => {
    const result = matrix.applyAlongAxis(sum, 'row');
    expect(result).toStrictEqual([6, 15]);
  });

  it('by column returns a row vector', () => {
    const result = matrix.applyAlongAxis(sum, 'column');
    expect(result).toStrictEqual([5, 7, 9]);
  });

  it('the callback gets the vector and its index', () => {
    const seen = [];
    matrix.applyAlongAxis((vector, index) => {
      seen.push([index, vector]);
      return index;
    }, 'column');
    expect(seen).toStrictEqual([
      [0, [1, 4]],
      [1, [2, 5]],
      [2, [3, 6]],
    ]);
  });

  it('the source matrix is left untouched', () => {
    matrix.applyAlongAxis(sum, 'row');
    expect(matrix.to2DArray()).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('works with a callback that is not a reduction', () => {
    const result = matrix.applyAlongAxis(
      (vector) => Math.max(...vector),
      'row',
    );
    expect(result).toStrictEqual([3, 6]);
  });

  it('receives the matrix as `this`', () => {
    const matrix = Matrix.zeros(1, 1);
    let that;
    matrix.applyAlongAxis(function cb() {
      // eslint-disable-next-line no-invalid-this
      that = this;
    }, 'row');
    expect(that).toBe(matrix);
  });

  it('can return any type', () => {
    const rows = matrix.applyAlongAxis((row) => row, 'row');
    expect(rows).toStrictEqual(matrix.to2DArray());
  });
});

describe('applyAlongAxis on other matrix kinds', () => {
  function sum(vector) {
    return vector.reduce((accumulator, value) => accumulator + value, 0);
  }

  it('reads a transpose view along the view dimensions', () => {
    const view = new MatrixTransposeView(
      new Matrix([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    );
    expect(view.applyAlongAxis(sum, 'row')).toStrictEqual([5, 7, 9]);
  });

  it('works on a symmetric matrix', () => {
    const symmetric = new SymmetricMatrix([
      [1, 2],
      [2, 3],
    ]);
    expect(symmetric.applyAlongAxis(sum, 'column')).toStrictEqual([3, 5]);
  });
});

describe('applyAlongAxis with degenerate matrices', () => {
  const emptyMatrix = new Matrix(0, 0);
  const zeroRowMatrix = new Matrix(0, 2);
  const zeroColumnMatrix = new Matrix(3, 0);

  function count(vector) {
    return vector.length;
  }

  it('by row of a 0x0 matrix', () => {
    const result = emptyMatrix.applyAlongAxis(count, 'row');
    expect(result).toStrictEqual([]);
  });

  it('by column of a 0x0 matrix', () => {
    const result = emptyMatrix.applyAlongAxis(count, 'column');
    expect(result).toStrictEqual([]);
  });

  it('by column of a 0 row matrix', () => {
    expect(zeroRowMatrix.applyAlongAxis(count, 'column')).toStrictEqual([0, 0]);
  });

  it('by row of a 0 column matrix', () => {
    expect(zeroColumnMatrix.applyAlongAxis(count, 'row')).toStrictEqual([
      0, 0, 0,
    ]);
  });
});

describe('applyAlongAxis error handling', () => {
  const matrix = new Matrix([
    [1, 2],
    [3, 4],
  ]);

  function sum(vector) {
    return vector.reduce((accumulator, value) => accumulator + value, 0);
  }

  it('throws when the callback is missing', () => {
    expect(() => matrix.applyAlongAxis(undefined, 'row')).toThrow(
      /^callback must be a function$/,
    );
  });

  it('throws when the callback is not a function', () => {
    expect(() => matrix.applyAlongAxis(42, 'column')).toThrow(
      /^callback must be a function$/,
    );
  });

  it('throws when the dimension is missing', () => {
    expect(() => matrix.applyAlongAxis(sum)).toThrow(
      /^invalid option: undefined$/,
    );
  });

  it('throws when the dimension is unknown', () => {
    expect(() => matrix.applyAlongAxis(sum, 'diagonal')).toThrow(
      /^invalid option: diagonal$/,
    );
  });
});
