import { Matrix, WrapperMatrix2D, NNMF } from './index';

function linearCombination(X) {
  if (X.rows > 1) {
    X = X.transpose();
  }
  let solutions = Matrix.zeros(1, X.columns);
  let notTheEnd = true;
  let vecVal = X.get(0, X.columns - 1);
  let tmp = 0;
  while ((vecVal > 0) && notTheEnd) {
    notTheEnd = false;
    for (let i = 0; i < X.columns - 1; i++) {
      tmp = vecVal - X.get(0, i);
      if (tmp >= 0 && X.get(0, i) > 0) {
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
 * @param {number} [options.delta=1000]
 * @return {Matrix}
 */
export function positiveLinearCombination(base, vector, options = {}) {
  const { NNMFmaxIterations = 100000, NNMFversion = 2, delta = 1000 } = options;

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


    for (let i = 0; i < m; i++) {
      if ((nA.X.get(m - 1, 0) / delta) > nA.X.get(i, 0)) {
        nA.X.set(i, 0, 0);
      }
    }

    solutions = linearCombination(nA.X, nA.X.min() + Number.EPSILON);
    return (solutions);
  }
}
