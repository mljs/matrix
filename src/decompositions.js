import LuDecomposition from './dc/lu.js';
import QrDecomposition from './dc/qr.js';
import SingularValueDecomposition from './dc/svd.js';
import Matrix from './matrix.js';
import WrapperMatrix2D from './wrap/WrapperMatrix2D.js';

export function inverse(matrix, useSVD = false) {
  matrix = WrapperMatrix2D.checkMatrix(matrix);
  if (useSVD) {
    return new SingularValueDecomposition(matrix).inverse();
  } else {
    return solve(matrix, Matrix.eye(matrix.rows));
  }
}

export function solve(leftHandSide, rightHandSide, useSVD = false) {
  leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
  rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);
  if (useSVD) {
    return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
  } else {
    return leftHandSide.isSquare()
      ? new LuDecomposition(leftHandSide).solve(rightHandSide)
      : new QrDecomposition(leftHandSide).solve(rightHandSide);
  }
}
