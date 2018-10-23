import { Matrix, WrapperMatrix2D } from '../index';

/**
 * @class Non-negativeMatrixFactorization
 * @param {Matrix} A
 * @param {number} r
 * @param {number} it
 */
export default class NNMF {
  constructor(A, r) {
    A = WrapperMatrix2D.checkMatrix(A);
    var m = this.A.rows;
    var n = this.A.columns;

    let X = Matrix.rand(m, r);
    let Y = Matrix.rand(r, n);

    let error = new Matrix(this.m, this.n);
  }
  /**
 * Do the NNMF of a matrix A into two matrix X and Y
 * @param {number} it
 * @return {Array} [X,Y]
 */
  nnmf(it) {
    let A2 = this.X.mmul(this.Y);

    let numX = Matrix.empty(this.m, this.r);
    let denumX = Matrix.empty(this.m, this.r);

    let numY = Matrix.empty(this.r, this.n);
    let denumY = Matrix.empty(this.r, this.n);

    let temp1 = Matrix.empty(this.m, this.n);
    let temp2 = Matrix.empty(this.n, this.m);

    for (let a = 0; a < it; a++) {
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
          this.X.set(i, j, this.X.get(i, j) * numX.get(i, j) / denumX.get(i, j));
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
          this.Y.set(i, j, this.Y.get(i, j) * numY.get(i, j) / denumY.get(i, j));
        }
      }
    }
    return [this.X, this.Y];
  }
  /** Compute the error
   *@returns {matrix} error
   */

  error() {
    let A2 = this.X.mmul(this.Y);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.error.set(i, j, (Math.abs(A2.get(i, j) - this.A.get(i, j))) / this.A.get(i, j));
      }
    }
    return (this.error);
  }
}
