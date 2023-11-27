import { describe, it, expect } from 'vitest';

import { SymmetricMatrix } from '../../index';

describe('Symmetric export', () => {
  it('toCompact', () => {
    const matrix = new SymmetricMatrix([
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 2, 3],
      [3, 3, 3, 3],
    ]);
    expect(matrix.toCompact()).toStrictEqual([0, 1, 2, 3, 1, 2, 3, 2, 3, 3]);
  });
});
