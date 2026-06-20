import { describe, it, expect } from 'vitest';

import { DistanceMatrix, SymmetricMatrix } from '../../index';

describe('DistanceMatrix export', () => {
  it('toCompact', () => {
    const matrix = new DistanceMatrix([
      [0, 1, 2, 3],
      [1, 0, 2, 3],
      [2, 2, 0, 3],
      [3, 3, 3, 0],
    ]);
    expect(matrix.toCompact()).toStrictEqual([1, 2, 3, 2, 3, 3]);
  });

  it('toCompact empty', () => {
    expect(new DistanceMatrix(0).toCompact()).toStrictEqual([]);
  });

  it('toSymmetricMatrix', () => {
    const matrix = new DistanceMatrix([
      [0, 1, 2, 3],
      [1, 0, 2, 3],
      [2, 2, 0, 3],
      [3, 3, 3, 0],
    ]);
    const sMatrix = matrix.toSymmetricMatrix();
    expect(matrix).not.toBe(sMatrix);
    expect(sMatrix).not.toBeInstanceOf(DistanceMatrix);
    expect(sMatrix).toBeInstanceOf(SymmetricMatrix);
  });
});
