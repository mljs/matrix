import Matrix from './matrix';

export function correlation(xMatrix, yMatrix = xMatrix, options = {}) {
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

  const { center = true, scale = true } = options;
  if (center) {
    xMatrix.center('column');
    if (!yIsSame) {
      yMatrix.center('column');
    }
  }
  if (scale) {
    xMatrix.scale('column');
    if (!yIsSame) {
      yMatrix.scale('column');
    }
  }

  const sdx = xMatrix.standardDeviation('column', { unbiased: true });
  const sdy = yIsSame ? sdx : yMatrix.standardDeviation('column', { unbiased: true });

  const correlation = xMatrix.transpose().mmul(yMatrix);
  for (let i = 0; i < correlation.rows; i++) {
    for (let j = 0; j < correlation.columns; j++) {
      correlation.set(i, j, correlation.get(i, j) * (1 / (sdx[i] * sdy[j])) * (1 / (xMatrix.rows - 1)));
    }
  }
  return correlation;
}
