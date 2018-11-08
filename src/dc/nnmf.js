import { Matrix, WrapperMatrix2D } from '../index';

/**
 *
 * @class NNMF
 * @link http://papers.nips.cc/paper/1861-algorithms-for-non-negative-matrix-factorization.pdf
 * @param {Matrix} A
 * @param {number} r
 * @param {object} [options={}]
 * @param {number} [options.numberIterations=1000]
 */
export default class NNMF {
  constructor(A, r, options = {}) {
    const { numberIterations = 1000 } = options;
    A = WrapperMatrix2D.checkMatrix(A);
    var m = A.rows;
    var n = A.columns;

    this.r = r;
    this.A = A;
    this.m = m;
    this.n = n;
    this.X = Matrix.rand(m, r);
    this.Y = Matrix.rand(r, n);

    doNnmf.call(this, numberIterations);
  }

  /**
   * Compute the error
   */
  get error() {
    let error = new Matrix(this.m, this.n);
    let A2 = this.X.mmul(this.Y);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        error.set(
          i,
          j,
          Math.abs(A2.get(i, j) - this.A.get(i, j)) /
            (this.A.get(i, j) !== 0 ? this.A.get(i, j) : Number.EPSILON)
        );
      }
    }
    return (error);
  }
}

/**
 * Do the NNMF of a matrix A into two matrix X and Y
 * @param {number} [numberIterations=1000]
 */
function doNnmf(numberIterations = 1000) {
  let A2 = this.X.mmul(this.Y);
  let numX = Matrix.empty(this.m, this.r);
  let denumX = Matrix.empty(this.m, this.r);

  let numY = Matrix.empty(this.r, this.n);
  let denumY = Matrix.empty(this.r, this.n);

  let temp1 = Matrix.empty(this.m, this.n);
  let temp2 = Matrix.empty(this.n, this.m);

  for (let a = 0; a < numberIterations; a++) {
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        temp1.set(i, j, Math.pow(A2.get(i, j), -2) * this.A.get(i, j));
        temp2.set(i, j, Math.pow(A2.get(i, j), -1));
      }
    }
    numX = temp1.mmul(this.Y.transpose());
    denumX = temp2.mmul(this.Y.transpose());
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.r; j++) {
        numX.set(i, j, numX.get(i, j) + Number.EPSILON);
        denumX.set(i, j, denumX.get(i, j) + Number.EPSILON);
      }
    }
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.r; j++) {
        this.X.set(
          i,
          j,
          (this.X.get(i, j) * numX.get(i, j)) / denumX.get(i, j)
        );
      }
    }
    A2 = this.X.mmul(this.Y);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        A2.set(i, j, A2.get(i, j) + Number.EPSILON);
      }
    }

    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        temp1.set(i, j, Math.pow(A2.get(i, j), -2) * this.A.get(i, j));
        temp2.set(i, j, Math.pow(A2.get(i, j), -1));
      }
    }
    numY = this.X.transpose().mmul(temp1);
    denumY = this.X.transpose().mmul(temp2);
    for (let i = 0; i < this.r; i++) {
      for (let j = 0; j < this.n; j++) {
        numY.set(i, j, numY.get(i, j) + Number.EPSILON);
        denumY.set(i, j, denumY.get(i, j) + Number.EPSILON);
      }
    }
    for (let i = 0; i < this.r; i++) {
      for (let j = 0; j < this.n; j++) {
        this.Y.set(
          i,
          j,
          (this.Y.get(i, j) * numY.get(i, j)) / denumY.get(i, j)
        );
      }
    }
  }
}
