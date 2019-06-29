import { Matrix, covariance } from '../..';

describe('multivariate linear regression', () => {
  it('covariance should work with 1 or 2 matrix inputs', () => {
    let x = new Matrix([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15]
    ]);
    let y = new Matrix([
      [2, 4, 6, 8, 10],
      [4, 8, 120, 16, 20],
      [8, 16, 24, 32, 40]
    ]);
    expect(Array.from(covariance(y).data[2].map(Math.round))).toStrictEqual([-8, -16, 3756, -32, -40]);
    expect(Array.from(covariance(y, x).data[2].map(Math.round))).toStrictEqual([45, 45, 45, 45, 45]);
    expect(Array.from(covariance(x, y).data[2].map(Math.round))).toStrictEqual([15, 30, 45, 60, 75]);
    expect(Array.from(covariance(x).data[2].map(Math.round))).toStrictEqual([25, 25, 25, 25, 25]);
  });
});
