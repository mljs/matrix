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
  it('Factorization test I', () => {
  /**
   * Global minimum :
   * X = [
   *   [2,	  4],
   *   [8,	 16],
   *  [32,	 64],
   * [128,	256]]
   *
   * Y = [
   * [1,	2,	3,	4],
   * [6,	7,	8,	9]]
   */
    let A = new Matrix([
      [26, 32, 38, 44],
      [104, 128, 152, 176],
      [416, 512, 608, 704],
      [1664, 2048, 2432, 2816]
    ]);

    let nA = new NNMF(A, 1, 0.000000001, { maxIterations: 100000, version: 2 });

    expect(positivity(nA)).toEqual(true);
    expect(nA.error.max()).toBeLessThan(0.000001);
  });

  /*

  it('Base I', () => {
    let A = new Matrix([
      [10, 100, 10, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 10, 100, 10],
      [1, 1, 1, 0, 0, 10, 100, 10, 0, 0],
      [0, 0, 0, 10, 100, 10, 0, 0, 0, 0],
      [10, 100, 10, 0, 0, 0, 0, 10, 100, 10]
    ]);

    let nA = new NNMF(A, 1, 0.000000001, 1000000);

    console.table(nA.X);
    console.table(nA.Y);

    expect(positivity(nA)).toEqual(true);
    expect(nA.error.max()).toBeLessThan(0.000001);
  });
  */

  it('Factorization test II', () => {
    let A = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);

    let nA = new NNMF(A, 8, 0.1);

    expect(positivity(nA)).toEqual(true);
    expect(nA.error.max()).toBeLessThan(0.5);
  });
  /*
  it('Factorization test III', () => {
    let A = new Matrix([
      [1, 60, 60, 60, 60, 60, 60, 60, 60, 60],
      [1, 1, 60, 60, 60, 60, 60, 60, 60, 60],
      [1, 1, 1, 60, 60, 60, 60, 60, 60, 60],
      [1, 1, 1, 1, 60, 60, 60, 60, 60, 60],
      [1, 1, 1, 1, 1, 60, 60, 60, 60, 60],
      [1, 1, 1, 1, 1, 1, 60, 60, 60, 60],
      [1, 1, 1, 1, 1, 1, 1, 60, 60, 60],
      [1, 1, 1, 1, 1, 1, 1, 1, 60, 60],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 60],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);

    let nA = new NNMF(A, 8, 0.1);

    expect(positivity(nA)).toEqual(true);
    expect(nA.error.max()).toBeLessThan(1);
  });
  */
  /*
  it('Factorization test IV', () => {
    let A = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [5, 4, 3, 2, 1, 0, 0, 0, 0, 0]
    ]);

    let nA = new NNMF(A, 3, 0.000000001, 100000);

    expect(positivity(nA)).toEqual(true);
    expect(nA.error.max()).toBeLessThan(1);
  }); */
});
