import { describe, it, expect } from 'vitest';

import { Matrix, SymmetricMatrix } from '../../index';

describe('SymmetricMatrix creation', () => {
  it('should create a new object', () => {
    const payload = [
      [1, 2, 3],
      [2, 4, 5],
      [3, 5, 6],
    ];
    const matrix = new SymmetricMatrix(payload);
    expect(matrix).not.toBe(payload);
    expect(matrix).toBeInstanceOf(SymmetricMatrix);
    expect(SymmetricMatrix.isSymmetricMatrix(matrix)).toBe(true);
  });

  it('should work with a typed array', () => {
    const array = [
      Float64Array.of(1, 2, 3),
      Float64Array.of(2, 5, 6),
      Float64Array.of(3, 6, 9),
    ];
    const matrix = new SymmetricMatrix(array);
    expect(matrix.to2DArray()).toStrictEqual([
      [1, 2, 3],
      [2, 5, 6],
      [3, 6, 9],
    ]);
  });

  it('should clone existing symmetric matrix', () => {
    const original = new SymmetricMatrix([
      [1, 2, 3],
      [2, 4, 5],
      [3, 5, 6],
    ]);
    const matrix = new SymmetricMatrix(original);
    expect(matrix).not.toBe(original);
    expect(matrix).toBeInstanceOf(SymmetricMatrix);
    expect(SymmetricMatrix.isSymmetricMatrix(matrix)).toBe(true);
    expect(matrix).toStrictEqual(original);
  });

  it('should create a zero symmetric matrix', () => {
    const matrix = new SymmetricMatrix(9);
    expect(matrix.rows).toBe(9);
    expect(matrix.columns).toBe(9);
    expect(matrix.get(0, 0)).toBe(0);
  });

  it('should create an empty symmetric matrix', () => {
    const matrix00 = new SymmetricMatrix(0, 0);
    expect(matrix00.rows).toBe(0);
    expect(matrix00.columns).toBe(0);
  });

  it('should throw with wrong arguments', () => {
    expect(() => new SymmetricMatrix(-1)).toThrow(
      /^First argument must be a positive number or an array/,
    );
    expect(() => new SymmetricMatrix([0, 1, 2, 3])).toThrow(
      /^Data must be a 2D array/,
    );
    expect(
      () =>
        new SymmetricMatrix([
          [0, 1],
          [0, 1, 2],
        ]),
    ).toThrow(/^Inconsistent array dimensions$/);
    expect(() => new SymmetricMatrix()).toThrow(
      /^First argument must be a positive number or an array$/,
    );
    expect(
      () =>
        new SymmetricMatrix([
          [1, 2, 3],
          [4, 5, 6],
          [7, undefined, 9],
        ]),
    ).toThrow(/^Input data contains non-numeric values$/);
    expect(
      () =>
        new SymmetricMatrix([
          [0, 1, 2],
          [2, 1, 3],
        ]),
    ).toThrow('not symmetric data');
    expect(
      () =>
        new SymmetricMatrix([
          [0, 1, 2],
          [1, 1, 2],
          [3, 2, 1],
        ]),
    ).toThrow('not symmetric data');
    expect(
      () =>
        new SymmetricMatrix(
          new Matrix([
            [0, 1, 2],
            [1, 1, 2],
            [3, 2, 1],
          ]),
        ),
    ).toThrow('not symmetric data');
  });

  it('should correctly set rows, columns and values', () => {
    const matrix = new SymmetricMatrix([
      [5, 9, 4],
      [9, 6, 7],
      [4, 7, 1],
    ]);
    expect(matrix.rows).toBe(3);
    expect(matrix.columns).toBe(3);
    expect(matrix.sideSize).toBe(3);
    expect(matrix.get(1, 2)).toBe(7);
  });

  it('should create a symmetric matrix from compact 1D array', () => {
    const matrix = SymmetricMatrix.fromCompact([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(matrix.sideSize).toBe(4);
    expect(matrix).toStrictEqual(
      new SymmetricMatrix([
        [0, 1, 2, 3],
        [1, 4, 5, 6],
        [2, 5, 7, 8],
        [3, 6, 8, 9],
      ]),
    );
    expect(() =>
      SymmetricMatrix.fromCompact([0, 1, 2, 3, 4, 5, 6, 8, 9]),
    ).toThrow(
      /^This array is not a compact representation of a Symmetric Matrix/,
    );
  });

  it('zeros', () => {
    expect(SymmetricMatrix.zeros(3).to2DArray()).toStrictEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('ones', () => {
    expect(SymmetricMatrix.ones(3).to2DArray()).toStrictEqual([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]);
  });

  it('copy into a matrix', () => {
    const sMatrix = SymmetricMatrix.zeros(3);
    const matrix = sMatrix.toMatrix();
    expect(matrix).not.toBeInstanceOf(SymmetricMatrix);
    expect(matrix).toBeInstanceOf(Matrix);
  });
});
