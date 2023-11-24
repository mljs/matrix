import { describe, it, expect } from 'vitest';

import { SymmetricMatrix } from '../../index';

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
});
