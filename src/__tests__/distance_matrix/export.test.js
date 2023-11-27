import { describe, it, expect } from 'vitest';

import { DistanceMatrix } from '../../index';

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
});
