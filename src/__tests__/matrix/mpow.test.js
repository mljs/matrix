import { describe, it, expect } from 'vitest';

import { Matrix } from '../..';
describe('matrix power', () => {
  it('power of a non-square matrix is not defined', () => {
    let x = new Matrix(3, 5);
    expect(() => x.mpow(2)).toThrowError();
  });
  it('negative power is rejected', () => {
    let x = new Matrix(3, 3);
    expect(() => x.mpow(-2)).toThrowError();
  });
  it('A matrix to the power 0 is identity', () => {
    expect(
      new Matrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
        .mpow(0)
        .to2DArray(),
    ).toStrictEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });
  it('Matches scalar exponentiation', () => {
    let x = new Matrix([[1.5]]).mpow(50);
    expect(x.size).toBe(1);
    expect(x.get(0, 0)).toBeCloseTo(1.5 ** 50);
  });
  it('Matches scalar exponentiation', () => {
    expect(
      new Matrix([
        [1, 2],
        [3, -1],
      ])
        .mpow(21)
        .to2DArray(),
    ).toStrictEqual([
      [282475249, 564950498],
      [847425747, -282475249],
    ]);
  });
});
