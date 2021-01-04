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
      -0.04272763026369126,
      -0.04272763026369126,
      1,
      -0.04272763026369126,
      -0.04272763026369126,
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
  it(`correlation doesn't change input matrices`, () => {
    const x = new Matrix([
      [1, 2, 3],
      [4, 3, 6],
      [7, 1, 9],
    ]);
    const y = new Matrix([
      [5, 2, 3],
      [4, 1, 6],
      [7, 1, 7],
    ]);
    correlation(x, y);
    expect(x.to1DArray()).toStrictEqual([1, 2, 3, 4, 3, 6, 7, 1, 9]);
    expect(y.to1DArray()).toStrictEqual([5, 2, 3, 4, 1, 6, 7, 1, 7]);
  });
  it('correlation should work on empty matrices', () => {
    const x = new Matrix(0, 0);
    const y = new Matrix(0, 3);
    const z = new Matrix(3, 0);
    expect(correlation(x).to2DArray()).toStrictEqual([]);
    expect(correlation(y).to2DArray()).toStrictEqual([
      [NaN, NaN, NaN],
      [NaN, NaN, NaN],
      [NaN, NaN, NaN],
    ]);
    expect(correlation(z).to2DArray()).toStrictEqual([]);
  });
});
