import { describe, it, expect } from 'vitest';

import { Matrix, DistanceMatrix } from '../../index';

describe('DistanceMatrix creation', () => {
  it('should create a new object', () => {
    const payload = [
      [0, 2, 3],
      [2, 0, 5],
      [3, 5, 0],
    ];
    const matrix = new DistanceMatrix(payload);
    expect(matrix).not.toBe(payload);
    expect(matrix).toBeInstanceOf(DistanceMatrix);
    expect(DistanceMatrix.isDistanceMatrix(matrix)).toBe(true);
  });

  it('should throw with wrong arguments', () => {
    expect(() => new DistanceMatrix(-1)).toThrow(
      /^First argument must be a positive number or an array/,
    );
    expect(() => new DistanceMatrix([0, 1, 2, 3])).toThrow(
      /^Data must be a 2D array/,
    );
    expect(
      () =>
        new DistanceMatrix([
          [0, 1],
          [0, 1, 2],
        ]),
    ).toThrow(/^Inconsistent array dimensions$/);
    expect(() => new DistanceMatrix()).toThrow(
      /^First argument must be a positive number or an array$/,
    );
    expect(
      () =>
        new DistanceMatrix([
          [1, 2, 3],
          [4, 5, 6],
          [7, undefined, 9],
        ]),
    ).toThrow(/^Input data contains non-numeric values$/);
    expect(
      () =>
        new DistanceMatrix([
          [0, 1, 2],
          [2, 1, 3],
        ]),
    ).toThrow('not symmetric data');
    expect(
      () =>
        new DistanceMatrix([
          [0, 1, 2],
          [1, 1, 2],
          [3, 2, 1],
        ]),
    ).toThrow('not symmetric data');
    expect(
      () =>
        new DistanceMatrix(
          new Matrix([
            [0, 1, 2],
            [1, 0, 2],
            [2, 2, 1],
          ]),
        ),
    ).toThrow('Provided arguments do no produce a distance matrix');
  });

  it('should create a distance matrix from compact 1D array', () => {
    const matrix = DistanceMatrix.fromCompact([1, 2, 3, 4, 5, 6]);
    expect(matrix.sideSize).toBe(4);
    expect(matrix).toStrictEqual(
      new DistanceMatrix([
        [0, 1, 2, 3],
        [1, 0, 4, 5],
        [2, 4, 0, 6],
        [3, 5, 6, 0],
      ]),
    );
    expect(() => DistanceMatrix.fromCompact([0, 1, 2, 3, 4, 5, 6])).toThrow(
      /^This array is not a compact representation of a DistanceMatrix/,
    );
  });

  it('zeros', () => {
    expect(DistanceMatrix.zeros(3).to2DArray()).toStrictEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('ones', () => {
    expect(DistanceMatrix.ones(3).to2DArray()).toStrictEqual([
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ]);
  });

  it('clone', () => {
    const matrix = DistanceMatrix.zeros(3);
    const clone = matrix.clone();
    expect(clone).toBeInstanceOf(DistanceMatrix);
  });
});
