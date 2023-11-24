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

  it('upperRightEntries simple', () => {
    expect(Array.from(square.upperRightEntries())).toStrictEqual([
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [1, 1, 4],
      [1, 2, 5],
      [2, 2, 8],
    ]);

    // on no borderMax, fallback on number of rows, so on a wide rectangle, it reduce read to inset left-up square matrix
    expect(Array.from(rect.upperRightEntries())).toStrictEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 5],
    ]);
  });
  it('upperRightEntries expand columns', () => {
    expect(Array.from(rect.upperRightEntries(rect.columns))).toStrictEqual([
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [0, 3, 3],
      [1, 1, 5],
      [1, 2, 6],
      [1, 3, 7],
      [2, 2, 0],
      [2, 3, 0],
      [3, 3, 0],
    ]);
  });
  it('upperRightEntries expand columns with default values', () => {
    const value = Array.from(rect.upperRightEntries(rect.columns, '∅'));
    const expected = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [0, 3, 3],
      [1, 1, 5],
      [1, 2, 6],
      [1, 3, 7],
      [2, 2, '∅'],
      [2, 3, '∅'],
      [3, 3, '∅'],
    ];

    expect(value).toStrictEqual(expected);
  });
  it('upperRightEntries expand columns with computed default values', () => {
    const value = Array.from(
      rect.upperRightEntries(
        rect.columns,
        function index1DVirtualColumnExpand(row, col) {
          return row * this.columns + col;
        },
      ),
    );
    const expected = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [0, 3, 3],
      [1, 1, 5],
      [1, 2, 6],
      [1, 3, 7],
      [2, 2, 10],
      [2, 3, 11],
      [3, 3, 15],
    ];

    expect(value).toStrictEqual(expected);
  });
  it('upperRightEntries square expand between rows and columns', () => {
    const value = Array.from(rect.upperRightEntries(3));
    const expected = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 2, 2],
      [1, 1, 5],
      [1, 2, 6],
      [2, 2, 0],
    ];

    expect(value).toStrictEqual(expected);
  });

  it('upperRightValues simple', () => {
    expect(Array.from(square.upperRightValues())).toStrictEqual([
      0, 1, 2, 4, 5, 8,
    ]);

    expect(Array.from(rect.upperRightValues())).toStrictEqual([0, 1, 5]);
  });
  it('upperRightValues expand columns with default values', () => {
    const value = Array.from(rect.upperRightValues(rect.columns, '∅'));
    const expected = [0, 1, 2, 3, 5, 6, 7, '∅', '∅', '∅'];

    expect(value).toStrictEqual(expected);
  });
  it('upperRightValues expand columns with computed default values', () => {
    const value = Array.from(
      rect.upperRightValues(
        rect.columns,
        function index1DVirtualColumnExpand(row, col) {
          return row * this.columns + col;
        },
      ),
    );
    const expected = [0, 1, 2, 3, 5, 6, 7, 10, 11, 15];

    expect(value).toStrictEqual(expected);
  });
  it('upperRightValues square expand between rows and columns', () => {
    const value = Array.from(rect.upperRightValues(3));
    const expected = [0, 1, 2, 5, 6, 0];

    expect(value).toStrictEqual(expected);
  });
});
