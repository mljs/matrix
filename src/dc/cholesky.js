import Matrix from '../matrix';
import WrapperMatrix2D from '../wrap/WrapperMatrix2D';

/**
 * @class CholeskyDecomposition
 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
 * @param {Matrix} value
 */
export default class CholeskyDecomposition {
  constructor(value) {
    value = WrapperMatrix2D.checkMatrix(value);
    if (!value.isSymmetric()) {
      throw new Error('Matrix is not symmetric');
    }

    var a = value;
    var dimension = a.rows;
    var l = new Matrix(dimension, dimension);
    var positiveDefinite = true;
    var i, j, k;

    for (j = 0; j < dimension; j++) {
      var d = 0;
      for (k = 0; k < j; k++) {
        var s = 0;
        for (i = 0; i < k; i++) {
          s += l.get(k, i) * l.get(j, i);
        }
        s = (a.get(j, k) - s) / l.get(k, k);
        l.set(j, k, s);
        d = d + s * s;
      }

      d = a.get(j, j) - d;

      positiveDefinite &= d > 0;
      l.set(j, j, Math.sqrt(Math.max(d, 0)));
      for (k = j + 1; k < dimension; k++) {
        l.set(j, k, 0);
      }
    }

    if (!positiveDefinite) {
      throw new Error('Matrix is not positive definite');
    }

    this.L = l;
  }

  /**
   *
   * @param {Matrix} value
   * @return {Matrix}
   */
  solve(value) {
    value = WrapperMatrix2D.checkMatrix(value);

    var l = this.L;
    var dimension = l.rows;

    if (value.rows !== dimension) {
      throw new Error('Matrix dimensions do not match');
    }

    var count = value.columns;
    var B = value.clone();
    var i, j, k;

    for (k = 0; k < dimension; k++) {
      for (j = 0; j < count; j++) {
        for (i = 0; i < k; i++) {
          B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(k, i));
        }
        B.set(k, j, B.get(k, j) / l.get(k, k));
      }
    }

    for (k = dimension - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        for (i = k + 1; i < dimension; i++) {
          B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(i, k));
        }
        B.set(k, j, B.get(k, j) / l.get(k, k));
      }
    }

    return B;
  }

  /**
   *
   * @return {Matrix}
   */
  get lowerTriangularMatrix() {
    return this.L;
  }
}
