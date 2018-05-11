import { Matrix, WrapperMatrix2D } from '../index';

import { hypotenuse, getFilled2DArray } from './util';

/**
 * @class SingularValueDecomposition
 * @see https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
 * @param {Matrix} value
 * @param {object} [options]
 * @param {boolean} [options.computeLeftSingularVectors=true]
 * @param {boolean} [options.computeRightSingularVectors=true]
 * @param {boolean} [options.autoTranspose=false]
 */
export default class SingularValueDecomposition {
  constructor(value, options = {}) {
    value = WrapperMatrix2D.checkMatrix(value);

    var m = value.rows;
    var n = value.columns;

    const {
      computeLeftSingularVectors = true,
      computeRightSingularVectors = true,
      autoTranspose = false
    } = options;

    var wantu = Boolean(computeLeftSingularVectors);
    var wantv = Boolean(computeRightSingularVectors);

    var swapped = false;
    var a;
    if (m < n) {
      if (!autoTranspose) {
        a = value.clone();
        // eslint-disable-next-line no-console
        console.warn(
          'Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose'
        );
      } else {
        a = value.transpose();
        m = a.rows;
        n = a.columns;
        swapped = true;
        var aux = wantu;
        wantu = wantv;
        wantv = aux;
      }
    } else {
      a = value.clone();
    }

    var nu = Math.min(m, n);
    var ni = Math.min(m + 1, n);
    var s = new Array(ni);
    var U = getFilled2DArray(m, nu, 0);
    var V = getFilled2DArray(n, n, 0);

    var e = new Array(n);
    var work = new Array(m);

    var si = new Array(ni);
    for (let i = 0; i < ni; i++) si[i] = i;

    var nct = Math.min(m - 1, n);
    var nrt = Math.max(0, Math.min(n - 2, m));
    var mrc = Math.max(nct, nrt);

    for (let k = 0; k < mrc; k++) {
      if (k < nct) {
        s[k] = 0;
        for (let i = k; i < m; i++) {
          s[k] = hypotenuse(s[k], a[i][k]);
        }
        if (s[k] !== 0) {
          if (a[k][k] < 0) {
            s[k] = -s[k];
          }
          for (let i = k; i < m; i++) {
            a[i][k] /= s[k];
          }
          a[k][k] += 1;
        }
        s[k] = -s[k];
      }

      for (let j = k + 1; j < n; j++) {
        if (k < nct && s[k] !== 0) {
          let t = 0;
          for (let i = k; i < m; i++) {
            t += a[i][k] * a[i][j];
          }
          t = -t / a[k][k];
          for (let i = k; i < m; i++) {
            a[i][j] += t * a[i][k];
          }
        }
        e[j] = a[k][j];
      }

      if (wantu && k < nct) {
        for (let i = k; i < m; i++) {
          U[i][k] = a[i][k];
        }
      }

      if (k < nrt) {
        e[k] = 0;
        for (let i = k + 1; i < n; i++) {
          e[k] = hypotenuse(e[k], e[i]);
        }
        if (e[k] !== 0) {
          if (e[k + 1] < 0) {
            e[k] = 0 - e[k];
          }
          for (let i = k + 1; i < n; i++) {
            e[i] /= e[k];
          }
          e[k + 1] += 1;
        }
        e[k] = -e[k];
        if (k + 1 < m && e[k] !== 0) {
          for (let i = k + 1; i < m; i++) {
            work[i] = 0;
          }
          for (let i = k + 1; i < m; i++) {
            for (let j = k + 1; j < n; j++) {
              work[i] += e[j] * a[i][j];
            }
          }
          for (let j = k + 1; j < n; j++) {
            let t = -e[j] / e[k + 1];
            for (let i = k + 1; i < m; i++) {
              a[i][j] += t * work[i];
            }
          }
        }
        if (wantv) {
          for (let i = k + 1; i < n; i++) {
            V[i][k] = e[i];
          }
        }
      }
    }

    let p = Math.min(n, m + 1);
    if (nct < n) {
      s[nct] = a[nct][nct];
    }
    if (m < p) {
      s[p - 1] = 0;
    }
    if (nrt + 1 < p) {
      e[nrt] = a[nrt][p - 1];
    }
    e[p - 1] = 0;

    if (wantu) {
      for (let j = nct; j < nu; j++) {
        for (let i = 0; i < m; i++) {
          U[i][j] = 0;
        }
        U[j][j] = 1;
      }
      for (let k = nct - 1; k >= 0; k--) {
        if (s[k] !== 0) {
          for (let j = k + 1; j < nu; j++) {
            let t = 0;
            for (let i = k; i < m; i++) {
              t += U[i][k] * U[i][j];
            }
            t = -t / U[k][k];
            for (let i = k; i < m; i++) {
              U[i][j] += t * U[i][k];
            }
          }
          for (let i = k; i < m; i++) {
            U[i][k] = -U[i][k];
          }
          U[k][k] = 1 + U[k][k];
          for (let i = 0; i < k - 1; i++) {
            U[i][k] = 0;
          }
        } else {
          for (let i = 0; i < m; i++) {
            U[i][k] = 0;
          }
          U[k][k] = 1;
        }
      }
    }

    if (wantv) {
      for (let k = n - 1; k >= 0; k--) {
        if (k < nrt && e[k] !== 0) {
          for (let j = k + 1; j < n; j++) {
            let t = 0;
            for (let i = k + 1; i < n; i++) {
              t += V[i][k] * V[i][j];
            }
            t = -t / V[k + 1][k];
            for (let i = k + 1; i < n; i++) {
              V[i][j] += t * V[i][k];
            }
          }
        }
        for (let i = 0; i < n; i++) {
          V[i][k] = 0;
        }
        V[k][k] = 1;
      }
    }

    var pp = p - 1;
    var iter = 0;
    var eps = Number.EPSILON;
    while (p > 0) {
      let k, kase;
      for (k = p - 2; k >= -1; k--) {
        if (k === -1) {
          break;
        }
        const alpha =
          Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));
        if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
          e[k] = 0;
          break;
        }
      }
      if (k === p - 2) {
        kase = 4;
      } else {
        let ks;
        for (ks = p - 1; ks >= k; ks--) {
          if (ks === k) {
            break;
          }
          let t =
            (ks !== p ? Math.abs(e[ks]) : 0) +
            (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
          if (Math.abs(s[ks]) <= eps * t) {
            s[ks] = 0;
            break;
          }
        }
        if (ks === k) {
          kase = 3;
        } else if (ks === p - 1) {
          kase = 1;
        } else {
          kase = 2;
          k = ks;
        }
      }

      k++;

      switch (kase) {
        case 1: {
          let f = e[p - 2];
          e[p - 2] = 0;
          for (let j = p - 2; j >= k; j--) {
            let t = hypotenuse(s[j], f);
            let cs = s[j] / t;
            let sn = f / t;
            s[j] = t;
            if (j !== k) {
              f = -sn * e[j - 1];
              e[j - 1] = cs * e[j - 1];
            }
            if (wantv) {
              for (let i = 0; i < n; i++) {
                t = cs * V[i][j] + sn * V[i][p - 1];
                V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
                V[i][j] = t;
              }
            }
          }
          break;
        }
        case 2: {
          let f = e[k - 1];
          e[k - 1] = 0;
          for (let j = k; j < p; j++) {
            let t = hypotenuse(s[j], f);
            let cs = s[j] / t;
            let sn = f / t;
            s[j] = t;
            f = -sn * e[j];
            e[j] = cs * e[j];
            if (wantu) {
              for (let i = 0; i < m; i++) {
                t = cs * U[i][j] + sn * U[i][k - 1];
                U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
                U[i][j] = t;
              }
            }
          }
          break;
        }
        case 3: {
          const scale = Math.max(
            Math.abs(s[p - 1]),
            Math.abs(s[p - 2]),
            Math.abs(e[p - 2]),
            Math.abs(s[k]),
            Math.abs(e[k])
          );
          const sp = s[p - 1] / scale;
          const spm1 = s[p - 2] / scale;
          const epm1 = e[p - 2] / scale;
          const sk = s[k] / scale;
          const ek = e[k] / scale;
          const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
          const c = sp * epm1 * (sp * epm1);
          let shift = 0;
          if (b !== 0 || c !== 0) {
            if (b < 0) {
              shift = 0 - Math.sqrt(b * b + c);
            } else {
              shift = Math.sqrt(b * b + c);
            }
            shift = c / (b + shift);
          }
          let f = (sk + sp) * (sk - sp) + shift;
          let g = sk * ek;
          for (let j = k; j < p - 1; j++) {
            let t = hypotenuse(f, g);
            if (t === 0) t = Number.MIN_VALUE;
            let cs = f / t;
            let sn = g / t;
            if (j !== k) {
              e[j - 1] = t;
            }
            f = cs * s[j] + sn * e[j];
            e[j] = cs * e[j] - sn * s[j];
            g = sn * s[j + 1];
            s[j + 1] = cs * s[j + 1];
            if (wantv) {
              for (let i = 0; i < n; i++) {
                t = cs * V[i][j] + sn * V[i][j + 1];
                V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
                V[i][j] = t;
              }
            }
            t = hypotenuse(f, g);
            if (t === 0) t = Number.MIN_VALUE;
            cs = f / t;
            sn = g / t;
            s[j] = t;
            f = cs * e[j] + sn * s[j + 1];
            s[j + 1] = -sn * e[j] + cs * s[j + 1];
            g = sn * e[j + 1];
            e[j + 1] = cs * e[j + 1];
            if (wantu && j < m - 1) {
              for (let i = 0; i < m; i++) {
                t = cs * U[i][j] + sn * U[i][j + 1];
                U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
                U[i][j] = t;
              }
            }
          }
          e[p - 2] = f;
          iter = iter + 1;
          break;
        }
        case 4: {
          if (s[k] <= 0) {
            s[k] = s[k] < 0 ? -s[k] : 0;
            if (wantv) {
              for (let i = 0; i <= pp; i++) {
                V[i][k] = -V[i][k];
              }
            }
          }
          while (k < pp) {
            if (s[k] >= s[k + 1]) {
              break;
            }
            let t = s[k];
            s[k] = s[k + 1];
            s[k + 1] = t;
            if (wantv && k < n - 1) {
              for (let i = 0; i < n; i++) {
                t = V[i][k + 1];
                V[i][k + 1] = V[i][k];
                V[i][k] = t;
              }
            }
            if (wantu && k < m - 1) {
              for (let i = 0; i < m; i++) {
                t = U[i][k + 1];
                U[i][k + 1] = U[i][k];
                U[i][k] = t;
              }
            }
            k++;
          }
          iter = 0;
          p--;
          break;
        }
        // no default
      }
    }

    if (swapped) {
      var tmp = V;
      V = U;
      U = tmp;
    }

    this.m = m;
    this.n = n;
    this.s = s;
    this.U = U;
    this.V = V;
  }

  /**
   * Solve a problem of least square (Ax=b) by using the SVD. Useful when A is singular. When A is not singular, it would be better to use qr.solve(value).
   * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
   * var svd = SingularValueDecomposition(A);
   * var x = svd.solve(b);
   * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)
   * @return {Matrix} - The vector x
   */
  solve(value) {
    var Y = value;
    var e = this.threshold;
    var scols = this.s.length;
    var Ls = Matrix.zeros(scols, scols);

    for (let i = 0; i < scols; i++) {
      if (Math.abs(this.s[i]) <= e) {
        Ls[i][i] = 0;
      } else {
        Ls[i][i] = 1 / this.s[i];
      }
    }

    var U = this.U;
    var V = this.rightSingularVectors;

    var VL = V.mmul(Ls);
    var vrows = V.rows;
    var urows = U.length;
    var VLU = Matrix.zeros(vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;
        for (let k = 0; k < scols; k++) {
          sum += VL[i][k] * U[j][k];
        }
        VLU[i][j] = sum;
      }
    }

    return VLU.mmul(Y);
  }

  /**
   *
   * @param {Array<number>} value
   * @return {Matrix}
   */
  solveForDiagonal(value) {
    return this.solve(Matrix.diag(value));
  }

  /**
   * Get the inverse of the matrix. We compute the inverse of a matrix using SVD when this matrix is singular or ill-conditioned. Example :
   * var svd = SingularValueDecomposition(A);
   * var inverseA = svd.inverse();
   * @return {Matrix} - The approximation of the inverse of the matrix
   */
  inverse() {
    var V = this.V;
    var e = this.threshold;
    var vrows = V.length;
    var vcols = V[0].length;
    var X = new Matrix(vrows, this.s.length);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < vcols; j++) {
        if (Math.abs(this.s[j]) > e) {
          X[i][j] = V[i][j] / this.s[j];
        } else {
          X[i][j] = 0;
        }
      }
    }

    var U = this.U;

    var urows = U.length;
    var ucols = U[0].length;
    var Y = new Matrix(vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;
        for (let k = 0; k < ucols; k++) {
          sum += X[i][k] * U[j][k];
        }
        Y[i][j] = sum;
      }
    }

    return Y;
  }

  /**
   *
   * @return {number}
   */
  get condition() {
    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
  }

  /**
   *
   * @return {number}
   */
  get norm2() {
    return this.s[0];
  }

  /**
   *
   * @return {number}
   */
  get rank() {
    var tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
    var r = 0;
    var s = this.s;
    for (var i = 0, ii = s.length; i < ii; i++) {
      if (s[i] > tol) {
        r++;
      }
    }
    return r;
  }

  /**
   *
   * @return {Array<number>}
   */
  get diagonal() {
    return this.s;
  }

  /**
   *
   * @return {number}
   */
  get threshold() {
    return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
  }

  /**
   *
   * @return {Matrix}
   */
  get leftSingularVectors() {
    if (!Matrix.isMatrix(this.U)) {
      this.U = new Matrix(this.U);
    }
    return this.U;
  }

  /**
   *
   * @return {Matrix}
   */
  get rightSingularVectors() {
    if (!Matrix.isMatrix(this.V)) {
      this.V = new Matrix(this.V);
    }
    return this.V;
  }

  /**
   *
   * @return {Matrix}
   */
  get diagonalMatrix() {
    return Matrix.diag(this.s);
  }
}
