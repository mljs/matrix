import SVD from './dc/svd';
import Matrix from './matrix';

export function pseudoInverse(matrix, threshold = Number.EPSILON) {
  matrix = Matrix.checkMatrix(matrix);
  if (matrix.isEmpty()) {
    // with a zero dimension, the pseudo-inverse is the transpose, since all 0xn and nx0 matrices are singular
    // (0xn)*(nx0)*(0xn) = 0xn
    // (nx0)*(0xn)*(nx0) = nx0
    return matrix.transpose();
  }
  let svdSolution = new SVD(matrix, { autoTranspose: true });

  let U = svdSolution.leftSingularVectors;
  let V = svdSolution.rightSingularVectors;
  let s = svdSolution.diagonal;

  // Singular values scale with the matrix, so the cutoff must too. Same
  // tolerance as SVD.rank, and the `rcond * max(s)` rule used by LAPACK.
  const cutoff = threshold * Math.max(matrix.rows, matrix.columns) * s[0];

  for (let i = 0; i < s.length; i++) {
    if (Math.abs(s[i]) > cutoff) {
      s[i] = 1.0 / s[i];
    } else {
      s[i] = 0.0;
    }
  }

  return V.mmul(Matrix.diag(s).mmul(U.transpose()));
}
