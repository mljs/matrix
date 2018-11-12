import AbstractMatrix from './abstractMatrix';

import { Matrix, WrapperMatrix2D, NNMF } from './index';

function linearCombination(X, epsilon) {
  if (X.rows > 1) {
    X = X.transpose();
  }
  let solutions = Matrix.zeros(1, X.columns);
  let notTheEnd = true;
  let vecVal = X.get(0, X.columns - 1);
  let tmp = 0;
  while (vecVal > epsilon && notTheEnd) {
    notTheEnd = false;
    for (let i = 0; i < X.columns; i++) {
      tmp = vecVal - X.get(0, i);
      if (tmp > epsilon) {
        solutions.set(0, i, solutions.get(0, i) + 1);
        vecVal = tmp;
        notTheEnd = true;
      }
    }
  }
  return (solutions);
}

/**
 *  Compute the linear dependencies of a vector and a set of base vectors
 * @param {Matrix} base
 * @param {Matrix} vector
 * @param {object} [options={}]
 * @param {number} [options.NNMF_maxIterations=100000]
 * @param {number} [options.NNMF_version=2]
 * @return {Matrix}
 */
export function positiveLinearCombination(base, vector, options = {}) {
  const { NNMFmaxIterations = 100000, NNMFversion = 2 } = options;

  base = WrapperMatrix2D.checkMatrix(base);
  vector = WrapperMatrix2D.checkMatrix(vector);
  let m = base.rows + 1;
  let n = base.columns;
  let solutions = Matrix.empty(1, m);
  let A = Matrix.empty(m, n);

  if (vector.rows > 1) {
    vector = vector.transpose();
  }
  if (vector.columns > 1 && vector.rows > 1) {
    console.log('ERROR, Vector must be a 1*n or n*1 vector');
    return (1);
  } else if (base.columns !== vector.columns) {
    console, log('ERROR, BASE COLUMNS sould be the same as VECTOR COLUMNS');
    return (1);
  } else {
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n; j++) {
        A.set(i, j, base.get(i, j));
      }
    }
    for (let j = 0; j < n; j++) {
      A.set(m - 1, j, vector.get(0, j));
    }
    let nA = new NNMF(A, 1, { maxIterations: NNMFmaxIterations, version: NNMFversion });
    solutions = linearCombination(nA.X, nA.X.min() - Number.EPSILON);
    return (solutions);
  }
}
