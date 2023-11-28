import { describe, it, expect } from 'vitest';

import { DistanceMatrix } from '../../index';

describe('DistanceMatrix mutation', () => {
  it('addSide', () => {
    const matrix = new DistanceMatrix([
      [0, 1, 2],
      [1, 0, 3],
      [2, 3, 0],
    ]);

    matrix.addCross([3, 4, 5, 6]);
    expect(matrix.to2DArray()).toStrictEqual([
      [0, 1, 2, 3],
      [1, 0, 3, 4],
      [2, 3, 0, 5],
      [3, 4, 5, 0],
    ]);

    matrix.addCross(2, [9, 9, 9, 9, 9]);
    expect(matrix.to2DArray()).toStrictEqual([
      [0, 1, 9, 2, 3],
      [1, 0, 9, 3, 4],
      [9, 9, 0, 9, 9],
      [2, 3, 9, 0, 5],
      [3, 4, 9, 5, 0],
    ]);
  });

  it('set', () => {
    const matrix = DistanceMatrix.zeros(3);

    matrix.set(0, 2, 9);
    expect(matrix.get(2, 0)).toBe(9);

    matrix.set(1, 1, 9);
    expect(matrix.get(1, 1)).toBe(0);
  });
});
