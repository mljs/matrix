import { newArray } from './util';

export function sumByRow(matrix) {
  var sum = newArray(matrix.rows);
  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum[i] += matrix.get(i, j);
    }
  }
  return sum;
}

export function sumByColumn(matrix) {
  var sum = newArray(matrix.columns);
  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum[j] += matrix.get(i, j);
    }
  }
  return sum;
}

export function sumAll(matrix) {
  var v = 0;
  for (var i = 0; i < matrix.rows; i++) {
    for (var j = 0; j < matrix.columns; j++) {
      v += matrix.get(i, j);
    }
  }
  return v;
}

export function productByRow(matrix) {
  var sum = newArray(matrix.rows, 1);
  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum[i] *= matrix.get(i, j);
    }
  }
  return sum;
}

export function productByColumn(matrix) {
  var sum = newArray(matrix.columns, 1);
  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum[j] *= matrix.get(i, j);
    }
  }
  return sum;
}

export function productAll(matrix) {
  var v = 1;
  for (var i = 0; i < matrix.rows; i++) {
    for (var j = 0; j < matrix.columns; j++) {
      v *= matrix.get(i, j);
    }
  }
  return v;
}

export function varianceByRow(matrix, unbiased, mean) {
  const rows = matrix.rows;
  const cols = matrix.columns;
  const variance = [];

  for (var i = 0; i < rows; i++) {
    var sum1 = 0;
    var sum2 = 0;
    var x = 0;
    for (var j = 0; j < cols; j++) {
      x = matrix.get(j, i) - mean[i];
      sum1 += x;
      sum2 += x * x;
    }
    if (unbiased) {
      variance.push((sum2 - (sum1 * sum1) / cols) / (cols - 1));
    } else {
      variance.push((sum2 - (sum1 * sum1) / cols) / cols);
    }
  }
  return variance;
}

export function varianceByColumn(matrix, unbiased, mean) {
  const rows = matrix.rows;
  const cols = matrix.columns;
  const variance = [];

  for (var j = 0; j < cols; j++) {
    var sum1 = 0;
    var sum2 = 0;
    var x = 0;
    for (var i = 0; i < rows; i++) {
      x = matrix.get(i, j) - mean[j];
      sum1 += x;
      sum2 += x * x;
    }
    if (unbiased) {
      variance.push((sum2 - (sum1 * sum1) / rows) / (rows - 1));
    } else {
      variance.push((sum2 - (sum1 * sum1) / rows) / rows);
    }
  }
  return variance;
}

export function varianceAll(matrix, unbiased, mean) {
  const rows = matrix.rows;
  const cols = matrix.columns;
  const size = rows * cols;

  var sum1 = 0;
  var sum2 = 0;
  var x = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      x = matrix.get(i, j) - mean;
      sum1 += x;
      sum2 += x * x;
    }
  }
  if (unbiased) {
    return (sum2 - (sum1 * sum1) / size) / (size - 1);
  } else {
    return (sum2 - (sum1 * sum1) / size) / size;
  }
}
