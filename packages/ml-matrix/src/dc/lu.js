import {Matrix, WrapperMatrix2D} from '../index';

/**
 * @class LuDecomposition
 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
 * @param {Matrix} matrix
 */
export default class LuDecomposition {
    constructor(matrix) {
        matrix = WrapperMatrix2D.checkMatrix(matrix);

        var lu = matrix.clone();
        var rows = lu.rows;
        var columns = lu.columns;
        var pivotVector = new Array(rows);
        var pivotSign = 1;
        var i, j, k, p, s, t, v;
        var LUcolj, kmax;

        for (i = 0; i < rows; i++) {
            pivotVector[i] = i;
        }

        LUcolj = new Array(rows);

        for (j = 0; j < columns; j++) {

            for (i = 0; i < rows; i++) {
                LUcolj[i] = lu.get(i, j);
            }

            for (i = 0; i < rows; i++) {
                kmax = Math.min(i, j);
                s = 0;
                for (k = 0; k < kmax; k++) {
                    s += lu.get(i, k) * LUcolj[k];
                }
                LUcolj[i] -= s;
                lu.set(i, j, LUcolj[i]);
            }

            p = j;
            for (i = j + 1; i < rows; i++) {
                if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
                    p = i;
                }
            }

            if (p !== j) {
                for (k = 0; k < columns; k++) {
                    t = lu.get(p, k);
                    lu.set(p, k, lu.get(j, k));
                    lu.set(j, k, t);
                }

                v = pivotVector[p];
                pivotVector[p] = pivotVector[j];
                pivotVector[j] = v;

                pivotSign = -pivotSign;
            }

            if (j < rows && lu.get(j, j) !== 0) {
                for (i = j + 1; i < rows; i++) {
                    lu.set(i, j, lu.get(i, j) / lu.get(j, j));
                }
            }
        }

        this.LU = lu;
        this.pivotVector = pivotVector;
        this.pivotSign = pivotSign;
    }

    /**
     *
     * @return {boolean}
     */
    isSingular() {
        var data = this.LU;
        var col = data.columns;
        for (var j = 0; j < col; j++) {
            if (data[j][j] === 0) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param {Matrix} value
     * @return {Matrix}
     */
    solve(value) {
        value = Matrix.checkMatrix(value);

        var lu = this.LU;
        var rows = lu.rows;

        if (rows !== value.rows) {
            throw new Error('Invalid matrix dimensions');
        }
        if (this.isSingular()) {
            throw new Error('LU matrix is singular');
        }

        var count = value.columns;
        var X = value.subMatrixRow(this.pivotVector, 0, count - 1);
        var columns = lu.columns;
        var i, j, k;

        for (k = 0; k < columns; k++) {
            for (i = k + 1; i < columns; i++) {
                for (j = 0; j < count; j++) {
                    X[i][j] -= X[k][j] * lu[i][k];
                }
            }
        }
        for (k = columns - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
                X[k][j] /= lu[k][k];
            }
            for (i = 0; i < k; i++) {
                for (j = 0; j < count; j++) {
                    X[i][j] -= X[k][j] * lu[i][k];
                }
            }
        }
        return X;
    }

    /**
     *
     * @return {number}
     */
    get determinant() {
        var data = this.LU;
        if (!data.isSquare()) {
            throw new Error('Matrix must be square');
        }
        var determinant = this.pivotSign;
        var col = data.columns;
        for (var j = 0; j < col; j++) {
            determinant *= data[j][j];
        }
        return determinant;
    }

    /**
     *
     * @return {Matrix}
     */
    get lowerTriangularMatrix() {
        var data = this.LU;
        var rows = data.rows;
        var columns = data.columns;
        var X = new Matrix(rows, columns);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                if (i > j) {
                    X[i][j] = data[i][j];
                } else if (i === j) {
                    X[i][j] = 1;
                } else {
                    X[i][j] = 0;
                }
            }
        }
        return X;
    }

    /**
     *
     * @return {Matrix}
     */
    get upperTriangularMatrix() {
        var data = this.LU;
        var rows = data.rows;
        var columns = data.columns;
        var X = new Matrix(rows, columns);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                if (i <= j) {
                    X[i][j] = data[i][j];
                } else {
                    X[i][j] = 0;
                }
            }
        }
        return X;
    }

    /**
     *
     * @return {Array<number>}
     */
    get pivotPermutationVector() {
        return this.pivotVector.slice();
    }
}
