import { describe, it, expect } from 'vitest';

import Matrix from '../../matrix';

describe('iterators methods', () => {
  const square = new Matrix([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]);

  const rect = new Matrix([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
  ]);

  it('entries', () => {
    expect(Array.from(square.entries())).toStrictEqual([
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [1, 0, 3],
      [1, 1, 4],
      [1, 2, 5],
      [2, 0, 6],
      [2, 1, 7],
      [2, 2, 8],
    ]);
    expect(Array.from(rect.entries())).toStrictEqual([
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [0, 3, 3],
      [1, 0, 4],
      [1, 1, 5],
      [1, 2, 6],
      [1, 3, 7],
    ]);
  });
  it('Symbol.iterator is same as entries', () => {
    expect(Array.from(square)).toStrictEqual(Array.from(square.entries()));
    expect(Array.from(rect)).toStrictEqual(Array.from(rect.entries()));
  });
  it('values', () => {
    expect(Array.from(square.values())).toStrictEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);
    expect(Array.from(rect.values())).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });
});
