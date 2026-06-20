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
  it('Small integer powers', () => {
    let m = new Matrix([
      [1, 2],
      [3, 4],
    ]);
    let mpowByMmul = Matrix.eye(2);
    for (let i = 0; i < 10; ++i) {
      expect(m.mpow(i)).toStrictEqual(mpowByMmul);
      mpowByMmul = mpowByMmul.mmul(m);
    }
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
  it('Handles high integer exponent', () => {
    let e = Number.MAX_SAFE_INTEGER;
    let x = new Matrix([[-1]]).mpow(e);
    expect(x.size).toBe(1);
    expect(x.get(0, 0)).toBe(-1);
  });
  it('Exponentiates a small matrix correctly', () => {
    let u = new Matrix([
      [1, 2],
      [3, -1],
    ]);
    let e = 21;
    let resultLoop = Matrix.eye(2);
    for (let i = 0; i < e; ++i) {
      resultLoop = resultLoop.mmul(u);
    }
    let resultMpow = u.mpow(e);
    expect(resultLoop.to2DArray()).toStrictEqual(resultMpow.to2DArray());
  });
});
