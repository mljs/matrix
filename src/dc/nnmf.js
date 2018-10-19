import { Matrix } from '../index';

export function nnmf(A, m, n, r, nb) {
  let X = Matrix.rand(m, r);
  let Y = Matrix.rand(r, n);
  let A2 = X.mmul(Y);

  let numX = Matrix.empty(m, r);
  let denumX = Matrix.empty(m, r);

  let numY = Matrix.empty(r, n);
  let denumY = Matrix.empty(r, n);

  let temp1 = Matrix.empty(m, n);
  let temp2 = Matrix.empty(n, m);

  for (let a = 0; a < nb; a++) {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        temp1.set(i, j, Math.pow(A2.get(i, j), -2) * A.get(i, j));
        temp2.set(i, j, Math.pow(A2.get(i, j), -1));
      }
    }
    numX = temp1.mmul(Y.transpose());
    denumX = temp2.mmul(Y.transpose());
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < r; j++) {
        numX.set(i, j, numX.get(i, j) + Number.EPSILON);
        denumX.set(i, j, denumX.get(i, j) + Number.EPSILON);
      }
    }
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < r; j++) {
        X.set(i, j, X.get(i, j) * numX.get(i, j) / denumX.get(i, j));
      }
    }
    A2 = X.mmul(Y);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        A2.set(i, j, A2.get(i, j) + Number.EPSILON);
      }
    }

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        temp1.set(i, j, Math.pow(A2.get(i, j), -2) * A.get(i, j));
        temp2.set(i, j, Math.pow(A2.get(i, j), -1));
      }
    }
    numY = X.transpose().mmul(temp1);
    denumY = X.transpose().mmul(temp2);
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < n; j++) {
        numY.set(i, j, numY.get(i, j) + Number.EPSILON);
        denumY.set(i, j, denumY.get(i, j) + Number.EPSILON);
      }
    }
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < n; j++) {
        Y.set(i, j, Y.get(i, j) * numY.get(i, j) / denumY.get(i, j));
      }
    }
  }
  return [X, Y];
}
