import { describe, it, expect } from 'vitest';

import { SymmetricMatrix } from '../../index';

describe('iterators methods', () => {
  const square = new SymmetricMatrix([
    [0, 1, 2],
    [1, 4, 5],
    [2, 5, 8],
  ]);

  it('upperRightEntries', () => {
    expect(Array.from(square.upperRightEntries())).toStrictEqual([
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [1, 1, 4],
      [1, 2, 5],
      [2, 2, 8],
    ]);
  });

  it('upperRightValues', () => {
    expect(Array.from(square.upperRightValues())).toStrictEqual([
      0, 1, 2, 4, 5, 8,
    ]);
  });
});
