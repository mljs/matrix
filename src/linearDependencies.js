import max from 'ml-array-max';

import Matrix from './matrix';
import SingularValueDecomposition from './dc/svd';

// function used by rowsDependencies
function xrange(n, exception) {
  var range = [];
  for (var i = 0; i < n; i++) {
    if (i !== exception) {
      range.push(i);
    }
  }
  return range;
}

// function used by rowsDependencies
function dependenciesOneRow(
  error,
  matrix,
  index,
  thresholdValue = 10e-10,
  thresholdError = 10e-10
) {
  if (error > thresholdError) {
    return new Array(matrix.rows + 1).fill(0);
  } else {
    var returnArray = matrix.addRow(index, [0]);
    for (var i = 0; i < returnArray.rows; i++) {
      if (Math.abs(returnArray.get(i, 0)) < thresholdValue) {
        returnArray.set(i, 0, 0);
      }
    }
    return returnArray.to1DArray();
  }
}

/**
 * Creates a matrix which represents the dependencies between rows.
 * If a row is a linear combination of others rows, the result will be a row with the coefficients of this combination.
 * For example : for A = [[2, 0, 0, 1], [0, 1, 6, 0], [0, 3, 0, 1], [0, 0, 1, 0], [0, 1, 2, 0]], the result will be [[0, 0, 0, 0, 0], [0, 0, 0, 4, 1], [0, 0, 0, 0, 0], [0, 0.25, 0, 0, -0.25], [0, 1, 0, -4, 0]]
 * @param {Matrix} matrix
 * @param {Object} [options] includes thresholdValue and thresholdError.
 * @param {number} [options.thresholdValue = 10e-10] If an absolute value is inferior to this threshold, it will equals zero.
 * @param {number} [options.thresholdError = 10e-10] If the error is inferior to that threshold, the linear combination found is accepted and the row is dependent from other rows.
 * @return {Matrix} the matrix which represents the dependencies between rows.
 */

export function linearDependencies(matrix, options = {}) {
  const { thresholdValue = 10e-10, thresholdError = 10e-10 } = options;

  var n = matrix.rows;
  var results = new Matrix(n, n);

  for (var i = 0; i < n; i++) {
    var b = Matrix.columnVector(matrix.getRow(i));
    var Abis = matrix.subMatrixRow(xrange(n, i)).transposeView();
    var svd = new SingularValueDecomposition(Abis);
    var x = svd.solve(b);
    var error = max(
      Matrix.sub(b, Abis.mmul(x))
        .abs()
        .to1DArray()
    );
    results.setRow(
      i,
      dependenciesOneRow(error, x, i, thresholdValue, thresholdError)
    );
  }
  return results;
}
