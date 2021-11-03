import { Matrix, EVD } from '../..';

describe('Eigenvalue decomposition', () => {
  it('simple example', () => {
    let matrix = new Matrix([
      [1, 0],
      [1, 3],
    ]);
    let evd = new EVD(matrix);
    expect(evd.realEigenvalues).toStrictEqual([1, 3]);
    expect(evd.diagonalMatrix.to2DArray()).toStrictEqual([
      [1, 0],
      [0, 3],
    ]);
  });

  it('empty matrix', () => {
    const matrix = new Matrix([]);
    expect(() => new EVD(matrix)).toThrow('Matrix must be non-empty');
  });
});
