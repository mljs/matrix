import {Matrix, WrapperMatrix2D} from './index';

import LuDecomposition from './dc/lu';
import QrDecomposition from './dc/qr';
import SingularValueDecomposition from './dc/svd';

/**
 * Computes the inverse of a Matrix
 * @param {Matrix} matrix
 * @param {boolean} [useSVD=false]
 * @return {Matrix}
 */
export function inverse(matrix, useSVD = false) {
    matrix = WrapperMatrix2D.checkMatrix(matrix);
    if (useSVD) {
        return new SingularValueDecomposition(matrix).inverse();
    } else {
        return solve(matrix, Matrix.eye(matrix.rows));
    }
}

/**
 *
 * @param {Matrix} leftHandSide
 * @param {Matrix} rightHandSide
 * @param {boolean} [useSVD = false]
 * @return {Matrix}
 */
export function solve(leftHandSide, rightHandSide, useSVD = false) {
    leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
    rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);
    if (useSVD) {
        return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
    } else {
        return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }
}
