import SVD from './dc/svd';
import Matrix from './matrix';

/**
 * Returns inverse of a matrix if it exists or the pseudoinverse
 * @param {number} threshold - threshold for taking inverse of singular values (default = 1e-15)
 * @return {Matrix} the (pseudo)inverted matrix.
 */
export function pseudoInverse(matrix, threshold = Number.EPSILON) {
  matrix = Matrix.checkMatrix(matrix);
  var svdSolution = new SVD(matrix, { autoTranspose: true });

  var U = svdSolution.leftSingularVectors;
  var V = svdSolution.rightSingularVectors;
  var s = svdSolution.diagonal;

  for (var i = 0; i < s.length; i++) {
    if (Math.abs(s[i]) > threshold) {
      s[i] = 1.0 / s[i];
    } else {
      s[i] = 0.0;
    }
  }

  return V.mmul(Matrix.diag(s).mmul(U.transpose()));
}
