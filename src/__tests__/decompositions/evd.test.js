import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { describe, it, expect } from 'vitest';

import { Matrix, EVD } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Eigenvalue decomposition', () => {
  it('simple example', () => {
    let matrix = new Matrix([
      [1, 0],
      [1, 3],
    ]);
    let evd = new EVD(matrix);
    expect(evd.realEigenvalues).toStrictEqual([1, 3]);
    expect(evd.diagonalMatrix.to2DArray()).toStrictEqual([
      [1, 0],
      [0, 3],
    ]);
  });

  it('empty matrix', () => {
    const matrix = new Matrix([]);
    expect(() => new EVD(matrix)).toThrow('Matrix must be non-empty');
  });

  it('symmetric matrix: A·V = V·D and V is orthogonal', () => {
    const matrix = new Matrix([
      [2, -1, 0, 1],
      [-1, 2, -1, 0],
      [0, -1, 2, -1],
      [1, 0, -1, 2],
    ]);
    const evd = new EVD(matrix);
    const V = evd.eigenvectorMatrix;
    const D = evd.diagonalMatrix;

    // eigen relation
    expect(matrix.mmul(V).to2DArray()).toBeDeepCloseTo(
      V.mmul(D).to2DArray(),
      8,
    );
    // eigenvectors of a symmetric matrix are orthonormal: VᵀV = I
    expect(V.transpose().mmul(V).to2DArray()).toBeDeepCloseTo(
      Matrix.eye(4).to2DArray(),
      8,
    );
  });

  it('non-symmetric matrix with real eigenvalues: A·V = V·D', () => {
    const matrix = new Matrix([
      [4, 1, 2],
      [0, 3, -1],
      [0, 0, 2],
    ]);
    const evd = new EVD(matrix);
    const V = evd.eigenvectorMatrix;
    const D = evd.diagonalMatrix;
    expect(evd.realEigenvalues.slice().sort((a, b) => a - b)).toBeDeepCloseTo(
      [2, 3, 4],
      8,
    );
    expect(matrix.mmul(V).to2DArray()).toBeDeepCloseTo(
      V.mmul(D).to2DArray(),
      8,
    );
  });

  it('larger symmetric matrix: A·V = V·D', () => {
    const n = 12;
    const base = Matrix.rand(n, n, { random: seededRandom(42) });
    // make it symmetric
    const matrix = base.add(base.transpose());
    const evd = new EVD(matrix, { assumeSymmetric: true });
    const V = evd.eigenvectorMatrix;
    const D = evd.diagonalMatrix;
    expect(matrix.mmul(V).to2DArray()).toBeDeepCloseTo(
      V.mmul(D).to2DArray(),
      6,
    );
    expect(V.transpose().mmul(V).to2DArray()).toBeDeepCloseTo(
      Matrix.eye(n).to2DArray(),
      6,
    );
  });

  it('matrix with a complex eigenvalue pair', () => {
    // rotation-like block has eigenvalues 1 ± i
    const matrix = new Matrix([
      [1, -1],
      [1, 1],
    ]);
    const evd = new EVD(matrix);
    expect(evd.realEigenvalues).toBeDeepCloseTo([1, 1], 8);
    expect(
      evd.imaginaryEigenvalues.slice().sort((a, b) => a - b),
    ).toBeDeepCloseTo([-1, 1], 8);
  });
});

function seededRandom(seed) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
