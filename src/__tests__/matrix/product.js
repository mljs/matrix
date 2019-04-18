import { Matrix } from '../..';

describe('product by row and columns', () => {
  const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
  it('product by row', () => {
    expect(matrix.product('row')).toStrictEqual([6, 120]);
  });

  it('product by column', () => {
    expect(matrix.product('column')).toStrictEqual([4, 10, 18]);
  });

  it('product all', () => {
    expect(matrix.product()).toBe(720);
  });
});
