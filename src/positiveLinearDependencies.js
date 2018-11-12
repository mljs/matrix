import { Matrix, WrapperMatrix2D, NNMF } from '../index';

export function positiveLinearDependencies(base, vector, options = {}) {
  const { NNMF_version = 2, NNMF_maxIterations = 100000 } = options;

  base = WrapperMatrix2D.checkMatrix(base);
  vector = WrapperMatrix2D.checkMatrix(vector);
  let m = base.rows + 1;
  let n = base.columns;
  let solutions = Matrix.empty(1, n);
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
    return (solutions);
  }
}
