import { describe, it, expect } from 'vitest';

import { Matrix } from '../..';

// https://github.com/mljs/matrix/issues/114
describe('mmulStrassen agrees with mmul', () => {
  const shapes = [
    [1, 1, 1, 1],
    [1, 2, 2, 2],
    [1, 3, 3, 1],
    [3, 1, 1, 3],
    [3, 2, 2, 4],
    [4, 2, 2, 3],
    [2, 5, 5, 2],
    [5, 5, 5, 5],
    [7, 3, 3, 6],
  ];

  for (const [r1, c1, r2, c2] of shapes) {
    it(`${r1}x${c1} by ${r2}x${c2}`, () => {
      const a = Matrix.randInt(r1, c1, { min: 0, max: 9 });
      const b = Matrix.randInt(r2, c2, { min: 0, max: 9 });
      const expected = a.mmul(b);
      const result = a.mmulStrassen(b);
      expect(result.rows).toBe(r1);
      expect(result.columns).toBe(c2);
      expect(result.to2DArray()).toStrictEqual(expected.to2DArray());
    });
  }

  it('keeps the operands untouched', () => {
    const a = new Matrix([
      [1, 2],
      [3, 4],
    ]);
    const b = new Matrix([
      [5, 6],
      [7, 8],
    ]);
    a.mmulStrassen(b);
    expect(a.to2DArray()).toStrictEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(b.to2DArray()).toStrictEqual([
      [5, 6],
      [7, 8],
    ]);
  });

  it('accepts a 2D array', () => {
    const a = new Matrix([[1, 2]]);
    expect(
      a
        .mmulStrassen([
          [1, 2],
          [3, 4],
        ])
        .to2DArray(),
    ).toStrictEqual([[7, 10]]);
  });
});

describe('mmulStrassen above the recursion threshold', () => {
  // the recursive path only runs when both dimensions exceed 512, so anything
  // smaller was silently delegating to mmul and never exercised the block split
  const sizes = [513, 514, 600];

  for (const n of sizes) {
    it(`${n}x${n} matches mmul exactly`, () => {
      // small integers keep every intermediate exact in a float64
      const a = Matrix.randInt(n, n, { min: 0, max: 3 });
      const b = Matrix.randInt(n, n, { min: 0, max: 3 });
      const expected = a.mmul(b);
      const result = a.mmulStrassen(b);
      expect(result.rows).toBe(n);
      expect(result.columns).toBe(n);

      let differing = 0;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (result.get(i, j) !== expected.get(i, j)) differing++;
        }
      }
      expect(differing).toBe(0);
    });
  }

  it('handles a non square shape above the threshold', () => {
    const a = Matrix.randInt(520, 600, { min: 0, max: 3 });
    const b = Matrix.randInt(600, 530, { min: 0, max: 3 });
    const expected = a.mmul(b);
    const result = a.mmulStrassen(b);
    expect(result.rows).toBe(520);
    expect(result.columns).toBe(530);

    let differing = 0;
    for (let i = 0; i < 520; i++) {
      for (let j = 0; j < 530; j++) {
        if (result.get(i, j) !== expected.get(i, j)) differing++;
      }
    }
    expect(differing).toBe(0);
  });
});

describe('mmulStrassen with degenerate matrices', () => {
  it('a matrix without rows', () => {
    const result = new Matrix(0, 2).mmulStrassen(new Matrix(2, 3));
    expect(result.rows).toBe(0);
    expect(result.columns).toBe(3);
  });

  it('a matrix without columns', () => {
    const result = new Matrix(2, 3).mmulStrassen(new Matrix(3, 0));
    expect(result.rows).toBe(2);
    expect(result.columns).toBe(0);
  });

  it('two 0x0 matrices', () => {
    const result = new Matrix(0, 0).mmulStrassen(new Matrix(0, 0));
    expect(result.rows).toBe(0);
    expect(result.columns).toBe(0);
  });
});
