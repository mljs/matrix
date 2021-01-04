import { Matrix, pseudoInverse, determinant } from '../..';
import * as util from '../../../testUtils';

describe('utility methods', () => {
  let squareMatrix;
  let zeroColumnMatrix;
  let zeroRowMatrix;
  beforeEach(() => {
    squareMatrix = util.getSquareMatrix();
    zeroColumnMatrix = new Matrix(3, 0);
    zeroRowMatrix = new Matrix(0, 2);
  });

  it('isMatrix', () => {
    function notAMatrix(val) {
      expect(Matrix.isMatrix(val)).toBe(false);
    }

    notAMatrix();
    notAMatrix(1);
    notAMatrix('string');
    notAMatrix(null);
    notAMatrix(new Array(6));
    notAMatrix([[]]);
    notAMatrix([
      [1, 2],
      [3, 4],
    ]);

    expect(Matrix.isMatrix(new Matrix(4, 4))).toBe(true);
    expect(Matrix.isMatrix(Matrix.ones(4, 4))).toBe(true);
  });

  it('size', () => {
    expect(new Matrix(3, 4).size).toBe(12);
    expect(new Matrix(5, 5).size).toBe(25);
    expect(zeroRowMatrix.size).toBe(0);
    expect(zeroColumnMatrix.size).toBe(0);
  });

  it('apply', () => {
    let matrix = Matrix.ones(6, 5);
    matrix.set(0, 0, 10);
    let called = 0;

    function cb(i, j) {
      called++;
      expect(this).toBeInstanceOf(Matrix);
      if (called === 1) {
        expect(this.get(i, j)).toBe(10);
      } else if (called === 30) {
        this.set(i, j, 20);
      }
    }

    matrix.apply(cb);
    expect(matrix.get(5, 4)).toBe(20);
    expect(called).toBe(30);

    called = 0;
    zeroRowMatrix.apply(cb);
    expect(called).toBe(0);
  });

  it('should throw if apply is called without a callback', () => {
    expect(() => squareMatrix.apply()).toThrow(/^callback must be a function$/);
    expect(() => squareMatrix.apply(null)).toThrow(
      /^callback must be a function$/,
    );
    expect(() => squareMatrix.apply(1)).toThrow(
      /^callback must be a function$/,
    );
    expect(() => squareMatrix.apply([])).toThrow(
      /^callback must be a function$/,
    );
  });

  it('clone', () => {
    let clone = squareMatrix.clone();
    expect(clone).not.toBe(squareMatrix);
    expect(clone).toStrictEqual(squareMatrix);
    expect(clone).toBeInstanceOf(Matrix);
    expect(Matrix.isMatrix(clone)).toBe(true);
  });

  it('to1DArray', () => {
    let matrix = util.getSquareMatrix();
    let array = matrix.to1DArray();
    expect(array).toBeInstanceOf(Array);
    expect(array).toHaveLength(9);
    expect(array).toStrictEqual([9, 13, 5, 1, 11, 7, 2, 6, 3]);
    expect(array).not.toBeInstanceOf(Matrix);
    expect(Matrix.isMatrix(array)).toBe(false);

    expect(zeroRowMatrix.to1DArray()).toStrictEqual([]);
    expect(zeroColumnMatrix.to1DArray()).toStrictEqual([]);
  });

  it('to2DArray', () => {
    let matrix = util.getSquareMatrix();
    let array = matrix.to2DArray();
    expect(array).toStrictEqual(util.getSquareArray());
    expect(array).toBeInstanceOf(Array);
    expect(array).toHaveLength(3);
    expect(array[0]).toBeInstanceOf(Array);
    expect(array[0]).toHaveLength(3);
    expect(array).not.toBeInstanceOf(Matrix);
    expect(Matrix.isMatrix(array)).toBe(false);

    expect(zeroRowMatrix.to2DArray()).toStrictEqual([]);
    expect(zeroColumnMatrix.to2DArray()).toStrictEqual([[], [], []]);
  });

  it('transpose square', () => {
    let transpose = squareMatrix.transpose();
    expect(transpose.get(0, 0)).toBe(squareMatrix.get(0, 0));
    expect(transpose.get(1, 0)).toBe(squareMatrix.get(0, 1));
    expect(transpose.get(2, 1)).toBe(squareMatrix.get(1, 2));
  });

  it('determinant', () => {
    let det = determinant(squareMatrix);
    expect(det).toBe(-18);
    let subMatrix = squareMatrix.selection([1, 2], [1, 2]);
    det = determinant(subMatrix);
    expect(det).toBe(-9);

    expect(determinant(new Matrix(0, 0))).toBe(1);
  });

  it('determinant n>3', () => {
    let m = Matrix.rand(5, 5);
    expect(determinant(m)).toBeCloseTo(0, -1);
  });

  it('determinant wrong size', () => {
    let m1 = Matrix.ones(3, 5);
    let m2 = Matrix.ones(5, 3);
    expect(() => determinant(m1)).toThrow(/square/);
    expect(() => determinant(m2)).toThrow(/square/);
  });

  it('norm Frobenius', () => {
    let m1 = new Matrix([
      [1, 1, 1],
      [3, 3, 3],
      [1, 1, 1],
    ]);
    expect(m1.norm()).toBeCloseTo(5.7445626465380286, 2);

    expect(new Matrix(0, 0).norm()).toBe(0);
  });

  it('norm max', () => {
    let m1 = new Matrix([
      [1, 1, 1],
      [3, 3, 3],
      [1, 1, 1],
    ]);
    expect(m1.norm('max')).toBe(3);

    expect(new Matrix(0, 0).norm('max')).toBe(NaN);
  });

  it('transpose rectangular', () => {
    let matrix = new Matrix([
      [0, 1, 2],
      [3, 4, 5],
    ]);
    let transpose = matrix.transpose();
    expect(transpose.get(0, 0)).toBe(matrix.get(0, 0));
    expect(transpose.get(1, 0)).toBe(matrix.get(0, 1));
    expect(transpose.get(2, 1)).toBe(matrix.get(1, 2));
    expect(transpose.rows).toBe(3);
    expect(transpose.columns).toBe(2);

    const zeroColumnTranspose = zeroColumnMatrix.transpose();
    expect(zeroColumnTranspose.rows).toBe(0);
    expect(zeroColumnTranspose.columns).toBe(3);

    const zeroRowTranspose = zeroRowMatrix.transpose();
    expect(zeroRowTranspose.rows).toBe(2);
    expect(zeroRowTranspose.columns).toBe(0);
  });

  it('scale rows', () => {
    let matrix = new Matrix([
      [-1, 0, 1],
      [6, 9, 7],
    ]);
    expect(matrix.scaleRows().to2DArray()).toStrictEqual([
      [0, 1 / 2, 1],
      [0, 1, 1 / 3],
    ]);
    expect(matrix.scaleRows({ min: 1, max: 2 }).to2DArray()).toStrictEqual([
      [1, 3 / 2, 2],
      [1, 2, 4 / 3],
    ]);
    expect(matrix.scaleRows({ min: -2, max: -1 }).to2DArray()).toStrictEqual([
      [-2, -3 / 2, -1],
      [-2, -1, -5 / 3],
    ]);
    expect(zeroRowMatrix.scaleRows().to2DArray()).toStrictEqual([]);
    expect(zeroColumnMatrix.scaleRows().to2DArray()).toStrictEqual([
      [],
      [],
      [],
    ]);
    expect(() => matrix.scaleRows({ min: 2, max: 1 })).toThrow(
      /^min must be smaller than max$/,
    );
  });

  it('scale columns', () => {
    let matrix = new Matrix([
      [1, 2],
      [-5, 3],
      [2, 4],
    ]);
    expect(matrix.scaleColumns().to2DArray()).toStrictEqual([
      [6 / 7, 0],
      [0, 1 / 2],
      [1, 1],
    ]);
    expect(matrix.scaleColumns({ min: 1, max: 2 }).to2DArray()).toStrictEqual([
      [13 / 7, 1],
      [1, 3 / 2],
      [2, 2],
    ]);
    expect(matrix.scaleColumns({ min: -2, max: -1 }).to2DArray()).toStrictEqual(
      [
        [-8 / 7, -2],
        [-2, -3 / 2],
        [-1, -1],
      ],
    );
    expect(zeroRowMatrix.scaleColumns().to2DArray()).toStrictEqual([]);
    expect(zeroColumnMatrix.scaleColumns().to2DArray()).toStrictEqual([
      [],
      [],
      [],
    ]);

    expect(() => matrix.scaleColumns({ min: 2, max: 1 })).toThrow(
      /^min must be smaller than max$/,
    );
  });

  it('set sub matrix', () => {
    let matrix = new Matrix([
      [1, 2],
      [-5, 3],
      [2, 4],
    ]);
    expect(matrix.setSubMatrix([[1, 2]], 1, 0).to2DArray()).toStrictEqual([
      [1, 2],
      [1, 2],
      [2, 4],
    ]);
    expect(matrix.setSubMatrix([[10], [10]], 1, 1).to2DArray()).toStrictEqual([
      [1, 2],
      [1, 10],
      [2, 10],
    ]);
    expect(
      matrix.setSubMatrix(new Matrix(0, 0), 2, 0).to2DArray(),
    ).toStrictEqual([
      [1, 2],
      [1, 10],
      [2, 10],
    ]);

    expect(() => matrix.setSubMatrix([[1, 2]], 1, 1)).toThrow(RangeError);
  });

  it('selection matrix', () => {
    let matrix = new Matrix([
      [1, 2],
      [-5, 3],
      [2, 4],
    ]);
    let selMatrix = matrix.selection([2, 1], [1]);
    expect(selMatrix.to2DArray()).toStrictEqual([[4], [3]]);
  });

  it('repeat matrix', () => {
    let matrix = new Matrix([
      [1, 2],
      [3, 4],
    ]);
    expect(matrix.repeat().to2DArray()).toStrictEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(matrix.repeat({ rows: 2, columns: 2 }).to2DArray()).toStrictEqual([
      [1, 2, 1, 2],
      [3, 4, 3, 4],
      [1, 2, 1, 2],
      [3, 4, 3, 4],
    ]);
    expect(matrix.repeat({ columns: 2 }).to2DArray()).toStrictEqual([
      [1, 2, 1, 2],
      [3, 4, 3, 4],
    ]);
    expect(
      zeroRowMatrix.repeat({ columns: 2, rows: 2 }).to2DArray(),
    ).toStrictEqual([]);
    expect(
      zeroColumnMatrix.repeat({ columns: 2, rows: 2 }).to2DArray(),
    ).toStrictEqual([[], [], [], [], [], []]);
  });

  it('mmul strassen', () => {
    let matrix = new Matrix([
      [2, 4],
      [7, 1],
    ]);
    let matrix2 = new Matrix([
      [2, 1],
      [1, 1],
    ]);
    expect(matrix.mmulStrassen(matrix2).to2DArray()).toStrictEqual([
      [8, 6],
      [15, 8],
    ]);
  });

  it('mmul strassen on empty matrices', () => {
    // https://github.com/mljs/matrix/issues/114
    // while the mathematically correct result is 0x0, we assert a 2x2 padded result that the current implementation produces
    // (this call is actually just delegated to standard multiplication in mmul())
    expect(
      new Matrix(0, 2).mmulStrassen(new Matrix(2, 0)).to2DArray(),
    ).toStrictEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  it('mmul 2x2 and 3x3', () => {
    let matrix = new Matrix([
      [2, 4],
      [7, 1],
    ]);
    let matrix2 = new Matrix([
      [2, 1],
      [1, 1],
    ]);
    expect(matrix.strassen2x2(matrix2).to2DArray()).toStrictEqual([
      [8, 6],
      [15, 8],
    ]);

    matrix = new Matrix([
      [2, 4, 1],
      [7, 1, 2],
      [5, 1, 3],
    ]);
    matrix2 = new Matrix([
      [2, 1, 3],
      [7, 1, 1],
      [6, 2, 7],
    ]);
    expect(matrix.strassen3x3(matrix2).to2DArray()).toStrictEqual([
      [38, 8, 17],
      [33, 12, 36],
      [35, 12, 37],
    ]);
  });

  it('pseudoinverse', () => {
    // Actual values calculated by the Numpy library

    let matrix = new Matrix([
      [2, 4],
      [7, 1],
    ]);
    let result = pseudoInverse(matrix).to2DArray();

    expect(result[0][0]).toBeCloseTo(-0.03846153846153843, 5);
    expect(result[0][1]).toBeCloseTo(0.15384615384615374, 5);
    expect(result[1][0]).toBeCloseTo(0.2692307692307691, 5);
    expect(result[1][1]).toBeCloseTo(-0.076923076923077, 5);

    matrix = new Matrix([
      [4, 7],
      [2, 6],
    ]);
    result = pseudoInverse(matrix).to2DArray();
    expect(result[0][0]).toBeCloseTo(0.6, 5);
    expect(result[0][1]).toBeCloseTo(-0.7, 5);
    expect(result[1][0]).toBeCloseTo(-0.2, 5);
    expect(result[1][1]).toBeCloseTo(0.4, 5);

    // Example from http://reference.wolfram.com/language/ref/PseudoInverse.html
    matrix = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    result = pseudoInverse(matrix).to2DArray();

    expect(result[0][0]).toBeCloseTo(-6.38888889e-1, 5);
    expect(result[0][1]).toBeCloseTo(-1.66666667e-1, 5);
    expect(result[0][2]).toBeCloseTo(3.05555556e-1, 5);

    expect(result[1][0]).toBeCloseTo(-5.55555556e-2, 5);
    expect(result[1][1]).toBeCloseTo(1.34337961e-16, 5);
    expect(result[1][2]).toBeCloseTo(5.55555556e-2, 5);

    expect(result[2][0]).toBeCloseTo(5.27777778e-1, 5);
    expect(result[2][1]).toBeCloseTo(1.66666667e-1, 5);
    expect(result[2][2]).toBeCloseTo(-1.94444444e-1, 5);

    // non-square matrix.
    matrix = new Matrix([
      [1, 0, 1],
      [2, 4, 5],
    ]);
    result = pseudoInverse(matrix).to2DArray();

    expect(result[0][0]).toBeCloseTo(0.75609756, 5);
    expect(result[0][1]).toBeCloseTo(-0.07317073, 5);
    expect(result[1][0]).toBeCloseTo(-0.68292683, 5);
    expect(result[1][1]).toBeCloseTo(0.19512195, 5);
    expect(result[2][0]).toBeCloseTo(0.24390244, 5);
    expect(result[2][1]).toBeCloseTo(0.07317073, 5);

    result = pseudoInverse(zeroColumnMatrix).to2DArray();
    expect(result).toStrictEqual([]);

    result = pseudoInverse(zeroRowMatrix).to2DArray();
    expect(result).toStrictEqual([[], []]);
  });

  it('isEchelonForm', () => {
    const matrix = new Matrix([
      [1, 0],
      [0, 1],
    ]);
    const matrix2 = new Matrix([
      [2, 1],
      [1, 1],
    ]);
    expect(matrix.isEchelonForm()).toStrictEqual(true);
    expect(matrix2.isEchelonForm()).toStrictEqual(false);
  });

  it('isReducedEchelonForm', () => {
    const matrix = new Matrix([
      [1, 0],
      [0, 1],
    ]);
    const matrix2 = new Matrix([
      [1, 1],
      [0, 1],
    ]);
    expect(matrix.isReducedEchelonForm()).toStrictEqual(true);
    expect(matrix2.isReducedEchelonForm()).toStrictEqual(false);
  });

  it('echelonForm', () => {
    const matrix = new Matrix([
      [1, 3],
      [4, 8],
    ]);
    const result = [
      [1, 2],
      [0, 1],
    ];
    expect(matrix.echelonForm().to2DArray()).toStrictEqual(result);
  });

  it('reducedEchelonForm', () => {
    const matrix = new Matrix([
      [1, 3],
      [4, 8],
    ]);
    const result = [
      [1, 0],
      [0, 1],
    ];
    const matrix2 = new Matrix([
      [1, 3],
      [2, 6],
    ]);
    const result2 = [
      [1, 3],
      [0, 0],
    ];
    const matrix3 = new Matrix([
      [1, 3, -1],
      [0, 2, 14],
    ]);
    const result3 = [
      [1, 0, -22],
      [0, 1, 7],
    ];
    expect(matrix.reducedEchelonForm().to2DArray()).toStrictEqual(result);
    expect(matrix2.reducedEchelonForm().to2DArray()).toStrictEqual(result2);
    expect(matrix3.reducedEchelonForm().to2DArray()).toStrictEqual(result3);
  });

  it('isRowVector', () => {
    let m = new Matrix(1, 3);
    expect(m.isRowVector()).toBe(true);
    m = new Matrix(3, 1);
    expect(m.isRowVector()).toBe(false);
    m = new Matrix(4, 5);
    expect(m.isRowVector()).toBe(false);
  });

  it('isColumnVector', () => {
    let m = new Matrix(1, 3);
    expect(m.isColumnVector()).toBe(false);
    m = new Matrix(3, 1);
    expect(m.isColumnVector()).toBe(true);
    m = new Matrix(4, 5);
    expect(m.isColumnVector()).toBe(false);
  });

  it('isVector', () => {
    let m = new Matrix(1, 3);
    expect(m.isVector()).toBe(true);
    m = new Matrix(3, 1);
    expect(m.isVector()).toBe(true);
    m = new Matrix(4, 5);
    expect(m.isVector()).toBe(false);
  });

  it('isSymmetric', () => {
    let m = new Matrix([
      [1, 0, 2],
      [0, 4, 9],
      [2, 9, 3],
    ]);
    expect(m.isSymmetric()).toBe(true);
    m = new Matrix([
      [1, 0, 4],
      [0, 4, 1],
      [2, 9, 3],
    ]);
    expect(m.isSymmetric()).toBe(false);
    m = new Matrix([
      [1, 0, 2],
      [0, 4, 9],
    ]);
    expect(m.isSymmetric()).toBe(false);
  });

  it('isEmpty', () => {
    expect(new Matrix(0, 0).isEmpty()).toBe(true);
    expect(new Matrix(0, 1).isEmpty()).toBe(true);
    expect(new Matrix(1, 0).isEmpty()).toBe(true);
    expect(new Matrix(1, 1).isEmpty()).toBe(false);
  });

  it('neg', () => {
    let m = new Matrix([
      [-1, 0, 2],
      [3, -42, 4],
    ]);
    m.neg();
    expect(m.to2DArray()).toStrictEqual([
      [1, -0, -2],
      [-3, 42, -4],
    ]);

    zeroColumnMatrix.neg();
    expect(zeroColumnMatrix.to2DArray()).toStrictEqual([[], [], []]);
  });

  it('dot product', () => {
    expect(new Matrix([[1, 2, 3]]).dot(new Matrix([[3, 2, 1]]))).toStrictEqual(
      10,
    );
  });

  it('simple multiplication', () => {
    const empty1 = new Matrix(3, 0);
    const empty2 = new Matrix(0, 3);
    const mat1 = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    const mat2 = new Matrix([
      [6, 5, 4],
      [3, 2, 1],
    ]);

    expect(mat2.mmul(mat1).to2DArray()).toStrictEqual([
      [6 * 1 + 5 * 3 + 4 * 5, 6 * 2 + 5 * 4 + 4 * 6],
      [3 * 1 + 2 * 3 + 1 * 5, 3 * 2 + 2 * 4 + 1 * 6],
    ]);
    expect(empty1.mmul(empty2).to2DArray()).toStrictEqual(
      Matrix.zeros(3, 3).to2DArray(),
    );

    const emptyMult = mat2.mmul(empty1);
    expect(emptyMult.rows).toStrictEqual(2);
    expect(emptyMult.columns).toStrictEqual(0);
  });

  it('columns and rows modification', () => {
    expect(zeroRowMatrix.removeColumn(1).columns).toStrictEqual(1);
    expect(zeroColumnMatrix.removeRow(2).rows).toStrictEqual(2);

    expect(squareMatrix.removeColumn(0).to2DArray()).toStrictEqual([
      [13, 5],
      [11, 7],
      [6, 3],
    ]);
    expect(squareMatrix.removeRow(1).to2DArray()).toStrictEqual([
      [13, 5],
      [6, 3],
    ]);
    expect(squareMatrix.addRow(0, [1, 11]).to2DArray()).toStrictEqual([
      [1, 11],
      [13, 5],
      [6, 3],
    ]);
    expect(squareMatrix.addColumn(2, [2, 22, 222]).to2DArray()).toStrictEqual([
      [1, 11, 2],
      [13, 5, 22],
      [6, 3, 222],
    ]);
  });
});
