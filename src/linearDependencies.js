import Matrix from './matrix';
import SingularValueDecomposition from './dc/svd';

function xrange(n, exception) {
  var range = [];
  for (var i = 0; i < n; i++) {
    if (i !== exception) {
      range.push(i);
    }
  }
  return range;
}

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

export function linearDependencies(matrix, options = {}) {
  const { thresholdValue = 10e-10, thresholdError = 10e-10 } = options;
  matrix = Matrix.checkMatrix(matrix);

  var n = matrix.rows;
  var results = new Matrix(n, n);

  for (var i = 0; i < n; i++) {
    var b = Matrix.columnVector(matrix.getRow(i));
    var Abis = matrix.subMatrixRow(xrange(n, i)).transpose();
    var svd = new SingularValueDecomposition(Abis);
    var x = svd.solve(b);
    var error = Matrix.sub(b, Abis.mmul(x))
      .abs()
      .max();
    results.setRow(
      i,
      dependenciesOneRow(error, x, i, thresholdValue, thresholdError)
    );
  }
  return results;
}
