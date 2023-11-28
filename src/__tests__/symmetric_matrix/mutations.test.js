import { describe, it, expect } from 'vitest';

import { SymmetricMatrix } from '../../index';

describe('Symmetric mutation', () => {
  it('addSide', () => {
    const matrix = new SymmetricMatrix([
      [0, 1, 2],
      [1, 1, 0],
      [2, 0, 2],
    ]);

    matrix.addCross([4, 0, 0, 4]);
    expect(matrix.to2DArray()).toStrictEqual([
      [0, 1, 2, 4],
      [1, 1, 0, 0],
      [2, 0, 2, 0],
      [4, 0, 0, 4],
    ]);

    matrix.addCross(2, [1.5, 1.5, 1.5, 1.5, 1.5]);
    expect(matrix.to2DArray()).toStrictEqual([
      [0, 1, 1.5, 2, 4],
      [1, 1, 1.5, 0, 0],
      [1.5, 1.5, 1.5, 1.5, 1.5],
      [2, 0, 1.5, 2, 0],
      [4, 0, 1.5, 0, 4],
    ]);
  });

  it('removeSide', () => {
    const matrix = new SymmetricMatrix([
      [0, 1, 1.5, 2, 4],
      [1, 1, 1.5, 0, 0],
      [1.5, 1.5, 1.5, 1.5, 1.5],
      [2, 0, 1.5, 2, 0],
      [4, 0, 1.5, 0, 4],
    ]);

    matrix.removeCross(2);
    expect(matrix.to2DArray()).toStrictEqual([
      [0, 1, 2, 4],
      [1, 1, 0, 0],
      [2, 0, 2, 0],
      [4, 0, 0, 4],
    ]);
  });

  it('applyMask', () => {
    let matrix = new SymmetricMatrix([
      [0, 1, 1.5, 2, 4],
      [1, 1, 1.5, 0, 0],
      [1.5, 1.5, 1.5, 1.5, 1.5],
      [2, 0, 1.5, 2, 0],
      [4, 0, 1.5, 0, 4],
    ]);

    matrix.applyMask([1, 1, 0, 1, 0]);
    expect(matrix.to2DArray()).toStrictEqual([
      [0, 1, 2],
      [1, 1, 0],
      [2, 0, 2],
    ]);

    expect(() => matrix.applyMask([0, 1])).throw(
      RangeError,
      'Mask size do not match with matrix size',
    );
    expect(() => matrix.applyMask([0, 1, 1, 0])).throw(
      RangeError,
      'Mask size do not match with matrix size',
    );

    matrix = new SymmetricMatrix([
      [0, 1, 1.5, 2, 4],
      [1, 1, 1.5, 0, 0],
      [1.5, 1.5, 1.5, 1.5, 1.5],
      [2, 0, 1.5, 2, 0],
      [4, 0, 1.5, 0, 4],
    ]);

    // only falsy values are false and 0
    matrix.applyMask([true, false, 12, 0, -1]);
    expect(matrix.to2DArray()).toStrictEqual([
      [0, 1.5, 4],
      [1.5, 1.5, 1.5],
      [4, 1.5, 4],
    ]);
  });

  it('set', () => {
    const matrix = SymmetricMatrix.zeros(3);
    matrix.set(0, 2, 9);

    expect(matrix.get(2, 0)).toBe(9);
  });
});
