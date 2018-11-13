import { Matrix, WrapperMatrix2D, NNMF } from './index';

function linearCombination2(X, useDecimal, lowestDecimal) {}

function linearCombination1(X, useDecimal, lowestDecimal) {
  if (X.rows > 1) {
    X = X.transpose();
  }
  const objValue = X.get(0, X.columns - 1);
  X.removeColumn(X.columns - 1);
  let solutions = Matrix.zeros(1, X.columns);
  let maxOcc = Matrix.zeros(1, X.columns);
  let diffSolutions = objValue + Number.EPSILON;

  let testSolutions = Matrix.zeros(1, X.columns);

  let notTheEnd = true;
  let tmp = 0;

  let coef = lowestDecimal;

  for (let j = 0; j < maxOcc.columns; j++) {
    if (X.get(0, j) !== 0) {
      maxOcc.set(0, j, Math.trunc(objValue / X.get(0, j)));
    }
  }
  let testV = 0;
  while (notTheEnd === true) {
    if (notTheEnd) {
      testSolutions.set(0, 0, testSolutions.get(0, 0) + coef);
    }

    tmp = 0;

    for (let j = 0; j < testSolutions.columns; j++) {
      tmp += testSolutions.get(0, j) * X.get(0, j);
    }
    if (Math.abs(tmp - objValue) < diffSolutions && notTheEnd) {
      for (let j = 0; j < maxOcc.columns; j++) {
        solutions.set(0, j, testSolutions.get(0, j));
      }
      diffSolutions = Math.abs(tmp - objValue);
    }
    if (testSolutions.get(0, testSolutions.columns - 1) ===
        maxOcc.get(0, maxOcc.columns - 1)) {
      notTheEnd = false;
    } else if (notTheEnd) {
      for (let j = 0; j < maxOcc.columns - 1; j++) {
        if (testSolutions.get(0, j) >= maxOcc.get(0, j) &&
            testSolutions.get(0, j) !== 0) {
          testSolutions.set(0, j, 0);
          testSolutions.set(0, j + 1, testSolutions.get(0, j + 1) + coef);
        } else if (testSolutions.get(0, j) > maxOcc.get(0, j)) {
          testSolutions.set(0, j, 0);
          testSolutions.set(0, j + 1, testSolutions.get(0, j + 1) + coef);
        }
      }
    }
  }

  return solutions;
}

/**
 *  Compute the linear dependencies of a vector and a set of base vectors
 * @param {Matrix} base
 * @param {Matrix} vector
 * @param {object} [options={}]
 * @param {number} [options.NNMF_maxIterations=100000]
 * @param {number} [options.NNMF_version=2]
 * @param {number} [options.PLC_version=1]
 * @param {number} [options.delta=1000]
 * @param {bool} [options.useDecimal=false]
 * @param {bool} [options.lowestDecimal=1]
 * @return {Matrix}
 */
export function positiveLinearCombination(base, vector, options = {}) {
  const { NNMFmaxIterations = 100000,
    NNMFversion = 2,
    PLCversion = 1,
    delta = 1000,
    useDecimal = false,
    lowestDecimal = 1 } = options;

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
    return 1;
  } else if (base.columns !== vector.columns) {
    console, log('ERROR, BASE COLUMNS sould be the same as VECTOR COLUMNS');
    return 1;
  } else {
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n; j++) {
        A.set(i, j, base.get(i, j));
      }
    }
    for (let j = 0; j < n; j++) {
      A.set(m - 1, j, vector.get(0, j));
    }

    let nA = new NNMF(A, 1, {
      targetRelativeError: 0.001,
      maxIterations: NNMFmaxIterations,
      version: NNMFversion
    });

    for (let i = 0; i < m; i++) {
      if (nA.X.get(m - 1, 0) / delta > nA.X.get(i, 0)) {
        nA.X.set(i, 0, 0);
      }
    }
    if (PLCversion === 1) {
      solutions = linearCombination1(nA.X, useDecimal, lowestDecimal);
    } else if (PLCversion === 2) {
      solutions = linearCombination2(nA.X, useDecimal, lowestDecimal);
    }

    return solutions;
  }
}
