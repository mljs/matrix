import { Matrix } from '../..';

describe('Centering matrix', () => {
  it('center should work for centering rows, columns and the whole matrix', () => {
    var x = new Matrix([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15]
    ]);

    var y = new Matrix([
      [1, 2, 3, 4, 5],
      [2, 4, 6, 8, 10],
      [3, 6, 9, 12, 15],
      [4, 8, 12, 16, 20],
      [5, 10, 15, 20, 25]
    ]);
    expect(Array.from(y.center().data[0].map(Math.round))).toStrictEqual([-8, -7, -6, -5, -4]);
    expect(Array.from(x.clone().center('row').data[0].map(Math.round))).toStrictEqual([-2, -1, 0, 1, 2]);
    expect(Array.from(x.clone().center('column').data[0].map(Math.round))).toStrictEqual([-5, -5, -5, -5, -5]);
    expect(Array.from(x.clone().center('column').data[1].map(Math.round))).toStrictEqual([0, 0, 0, 0, 0]);
    expect(Array.from(x.clone().center('column').data[2].map(Math.round))).toStrictEqual([5, 5, 5, 5, 5]);
  });
});

