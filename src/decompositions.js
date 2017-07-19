import {Matrix, WrapperMatrix2D} from './index';

import LuDecomposition from './dc/lu';
import QrDecomposition from './dc/qr';
import SingularValueDecomposition from './dc/svd';

export function inverse(matrix, useSVD = false) {
    matrix = WrapperMatrix2D.checkMatrix(matrix);
    if (useSVD) {
        return SingularValueDecomposition(matrix).inverse();
    } else {
        return solve(matrix, Matrix.eye(matrix.rows));
    }
}

export function solve(leftHandSide, rightHandSide, useSVD = false) {
    leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
    rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);
    if (useSVD) {
        return SingularValueDecomposition(leftHandSide).solve(rightHandSide);
    } else {
        return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }
}
