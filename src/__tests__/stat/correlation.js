import { Matrix, correlation } from '../..';

describe('multivariate linear regression', () => {
  it('correlation should work with 1 or 2 matrix inputs', () => {
    let x = new Matrix([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
    ]);
    let y = new Matrix([
      [2, 4, 6, 8, 10],
      [4, 8, 120, 16, 20],
      [8, 16, 24, 32, 40],
    ]);
    expect(Array.from(correlation(y).data[2])).toStrictEqual([
      -0.042727630263691335,
      -0.042727630263691335,
      1.0000000000000002,
      -0.042727630263691335,
      -0.042727630263691335,
    ]);
    expect(Array.from(correlation(y, x).data[2])).toStrictEqual([
      0.14685194996208847,
      0.14685194996208847,
      0.14685194996208847,
      0.14685194996208847,
      0.14685194996208847,
    ]);
    expect(Array.from(correlation(x, y).data[2])).toStrictEqual([
      0.9819805060619657,
      0.9819805060619657,
      0.14685194996208847,
      0.9819805060619657,
      0.9819805060619657,
    ]);
    expect(Array.from(correlation(x).data[2])).toStrictEqual([1, 1, 1, 1, 1]);
  });
});
