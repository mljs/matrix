import Matrix from '../matrix';
import {hypotenuse} from './util';

/**
 * @class QrDecomposition
 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
 * @param {*} value
 */
export default class QrDecomposition {
    constructor(value) {
        value = Matrix.checkMatrix(value);

        var qr = value.clone();
        var m = value.rows;
        var n = value.columns;
        var rdiag = new Array(n);
        var i, j, k, s;

        for (k = 0; k < n; k++) {
            var nrm = 0;
            for (i = k; i < m; i++) {
                nrm = hypotenuse(nrm, qr[i][k]);
            }
            if (nrm !== 0) {
                if (qr[k][k] < 0) {
                    nrm = -nrm;
                }
                for (i = k; i < m; i++) {
                    qr[i][k] /= nrm;
                }
                qr[k][k] += 1;
                for (j = k + 1; j < n; j++) {
                    s = 0;
                    for (i = k; i < m; i++) {
                        s += qr[i][k] * qr[i][j];
                    }
                    s = -s / qr[k][k];
                    for (i = k; i < m; i++) {
                        qr[i][j] += s * qr[i][k];
                    }
                }
            }
            rdiag[k] = -nrm;
        }

        this.QR = qr;
        this.Rdiag = rdiag;
    }

    /**
     * Solve a problem of least square (Ax=b) by using the QR decomposition. Useful when A is rectangular, but not working when A is singular.
     * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
     * var qr = QrDecomposition(A);
     * var x = qr.solve(b);
     * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)
     * @return {Matrix} - The vector x
     */
    solve(value) {
        value = Matrix.checkMatrix(value);

        var qr = this.QR;
        var m = qr.rows;

        if (value.rows !== m) {
            throw new Error('Matrix row dimensions must agree');
        }
        if (!this.isFullRank()) {
            throw new Error('Matrix is rank deficient');
        }

        var count = value.columns;
        var X = value.clone();
        var n = qr.columns;
        var i, j, k, s;

        for (k = 0; k < n; k++) {
            for (j = 0; j < count; j++) {
                s = 0;
                for (i = k; i < m; i++) {
                    s += qr[i][k] * X[i][j];
                }
                s = -s / qr[k][k];
                for (i = k; i < m; i++) {
                    X[i][j] += s * qr[i][k];
                }
            }
        }
        for (k = n - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
                X[k][j] /= this.Rdiag[k];
            }
            for (i = 0; i < k; i++) {
                for (j = 0; j < count; j++) {
                    X[i][j] -= X[k][j] * qr[i][k];
                }
            }
        }

        return X.subMatrix(0, n - 1, 0, count - 1);
    }

    isFullRank() {
        var columns = this.QR.columns;
        for (var i = 0; i < columns; i++) {
            if (this.Rdiag[i] === 0) {
                return false;
            }
        }
        return true;
    }

    get upperTriangularMatrix() {
        var qr = this.QR;
        var n = qr.columns;
        var X = new Matrix(n, n);
        var i, j;
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (i < j) {
                    X[i][j] = qr[i][j];
                } else if (i === j) {
                    X[i][j] = this.Rdiag[i];
                } else {
                    X[i][j] = 0;
                }
            }
        }
        return X;
    }

    get orthogonalMatrix() {
        var qr = this.QR;
        var rows = qr.rows;
        var columns = qr.columns;
        var X = new Matrix(rows, columns);
        var i, j, k, s;

        for (k = columns - 1; k >= 0; k--) {
            for (i = 0; i < rows; i++) {
                X[i][k] = 0;
            }
            X[k][k] = 1;
            for (j = k; j < columns; j++) {
                if (qr[k][k] !== 0) {
                    s = 0;
                    for (i = k; i < rows; i++) {
                        s += qr[i][k] * X[i][j];
                    }

                    s = -s / qr[k][k];

                    for (i = k; i < rows; i++) {
                        X[i][j] += s * qr[i][k];
                    }
                }
            }
        }
        return X;
    }
}
