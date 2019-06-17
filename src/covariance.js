import Matrix from './matrix';

export function covariance(xMatrix, yMatrix = xMatrix, options = {}) {
  xMatrix = Matrix.checkMatrix(xMatrix);
  let yIsSame = false;
  if (typeof yMatrix === 'object' && !Matrix.isMatrix(yMatrix) && !Array.isArray(yMatrix)) {
    options = yMatrix;
    yMatrix = xMatrix;
    yIsSame = true;
  } else {
    yMatrix = Matrix.checkMatrix(yMatrix);
  }
  if (xMatrix.rows !== yMatrix.rows) {
    throw new TypeError('Both matrices must have the same number of rows');
  }
  const { center = true } = options;
  if (center) {
    xMatrix = xMatrix.center('column');
    if (!yIsSame) {
      yMatrix = yMatrix.center('column');
    }
  }
  const covariance = xMatrix.transpose().mmul(yMatrix);
  for (let i = 0; i < covariance.rows; i++) {
    for (let j = 0; j < covariance.columns; j++) {
      covariance.set(i, j, covariance.get(i, j) * (1 / (xMatrix.rows - 1)));
    }
  }
  return covariance;
}
