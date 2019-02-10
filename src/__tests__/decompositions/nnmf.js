import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, NNMF } from '../..';

expect.extend({ toBeDeepCloseTo });

function positivity(An) {
  let positive = true;
  for (let i = 0; i < An.m; i++) {
    for (let j = 0; j < An.r; j++) {
      if (An.X.get(i, j) < 0) {
        positive = false;
      }
    }
  }
  for (let i = 0; i < An.r; i++) {
    for (let j = 0; j < An.n; j++) {
      if (An.X.get(i, j) < 0) {
        positive = false;
      }
    }
  }
  return (positive);
}

describe('Non-negative Matrix Factorization', () => {
  it('Factorization test I version 1', () => {
    /**
     * Global minimum :
     * X = [
     * [2, 4],
     * [8, 16],
     * [32, 64],
     * [128, 256]]
     *
     * Y = [
     * [1, 2, 3, 4],
     * [6, 7, 8, 9]]
     */
    let A = new Matrix([
      [26, 32, 38, 44],
      [104, 128, 152, 176],
      [416, 512, 608, 704],
      [1664, 2048, 2432, 2816]
    ]);

    let nA =
        new NNMF(A, 1, { targetRelativeError: 0.000001, maxIterations: 100, version: 1 });

    expect(positivity(nA)).toStrictEqual(true);
    expect(nA.error.max()).toBeLessThan(0.000001);
  });
  it('Factorization test I version 2', () => {
    /**
     * Global minimum :
     * X = [
     * [2, 4],
     * [8, 16],
     * [32, 64],
     * [128, 256]]
     *
     * Y = [
     * [1, 2, 3, 4],
     * [6, 7, 8, 9]]
     */
    let A = new Matrix([
      [26, 32, 38, 44],
      [104, 128, 152, 176],
      [416, 512, 608, 704],
      [1664, 2048, 2432, 2816]
    ]);

    let nA =
        new NNMF(A, 1, { targetRelativeError: 0.000001, maxIterations: 100 });

    expect(positivity(nA)).toStrictEqual(true);
    expect(nA.error.max()).toBeLessThan(0.000001);
  });
  it('Factorization test II', () => {
    let A = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [5, 4, 3, 2, 1, 0, 0, 0, 0, 0]
    ]);

    let nA = new NNMF(A, 3, { targetRelativeError: 1, maxIterations: 100 });

    expect(positivity(nA)).toStrictEqual(true);
    expect(nA.error.max()).toBeLessThan(1);
  });
  it('Comparation of the error with matlab', () => {
    // Working with 10*10 matrix and 100*100 matrix
    // Matlab as a max error of 0.8 for 10*10 matrix and 0.98 for 100*100 matrix
    // However, we don't have the same factorization
    // But we have the same position of zeros in X and Y matrix
    let A = Matrix.zeros(10, 10);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j <= i; j++) {
        A.set(i, j, 1);
      }
    }
    let nA = new NNMF(A, 1, { targetRelativeError: 1, maxIterations: 10 });

    expect(positivity(nA)).toStrictEqual(true);
    expect(nA.error.max()).toBeLessThan(1);
  });
});
