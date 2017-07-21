import Matrix from './matrix';

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
    matrix = Matrix.checkMatrix(matrix);
    if (useSVD) {
        return SingularValueDecomposition(matrix).inverse();
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
    leftHandSide = Matrix.checkMatrix(leftHandSide);
    rightHandSide = Matrix.checkMatrix(rightHandSide);
    if (useSVD) {
        return SingularValueDecomposition(leftHandSide).solve(rightHandSide);
    } else {
        return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }
}
