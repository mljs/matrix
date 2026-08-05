import { describe, it, expect } from 'vitest';

import {
  Matrix,
  LuDecomposition,
  QrDecomposition,
  SingularValueDecomposition,
  solve,
} from '../..';

const message = /^Matrix must have at least as many rows as columns$/;

describe('LU and QR need at least as many rows as columns', () => {
  const wide = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
  ]);

  it('LU rejects a wide matrix', () => {
    expect(() => new LuDecomposition(wide)).toThrow(message);
  });

  it('QR rejects a wide matrix', () => {
    expect(() => new QrDecomposition(wide)).toThrow(message);
  });

  it('LU rejects a wide 2D array', () => {
    expect(() => new LuDecomposition([[1, 2, 3, 4]])).toThrow(message);
  });

  it('QR rejects a wide 2D array', () => {
    expect(() => new QrDecomposition([[1, 2, 3, 4]])).toThrow(message);
  });

  it('solve reports the shape rather than a rank problem', () => {
    expect(() => solve(wide, Matrix.columnVector([1, 2]))).toThrow(message);
  });
});

describe('LU and QR keep working on the supported shapes', () => {
  const tall = new Matrix([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  const square = new Matrix([
    [4, 3],
    [6, 3],
  ]);

  it('QR on a tall matrix rebuilds the input', () => {
    const qr = new QrDecomposition(tall);
    const product = qr.orthogonalMatrix.mmul(qr.upperTriangularMatrix);
    for (let i = 0; i < tall.rows; i++) {
      for (let j = 0; j < tall.columns; j++) {
        expect(product.get(i, j)).toBeCloseTo(tall.get(i, j), 10);
      }
    }
  });

  it('LU on a tall matrix reports a usable triangular pair', () => {
    const lu = new LuDecomposition(tall);
    expect(lu.lowerTriangularMatrix.rows).toBe(3);
    expect(lu.upperTriangularMatrix.columns).toBe(2);
  });

  it('LU on a square matrix stays solvable', () => {
    const lu = new LuDecomposition(square);
    expect(lu.isSingular()).toBe(false);
    const x = lu.solve(Matrix.columnVector([10, 12]));
    const back = square.mmul(x);
    expect(back.get(0, 0)).toBeCloseTo(10, 10);
    expect(back.get(1, 0)).toBeCloseTo(12, 10);
  });

  it('an empty matrix is still accepted', () => {
    expect(() => new LuDecomposition(new Matrix(0, 0))).not.toThrow();
    expect(() => new QrDecomposition(new Matrix(0, 0))).not.toThrow();
  });
});

describe('SVD covers the wide case through autoTranspose', () => {
  const wide = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
  ]);

  it('rebuilds a wide matrix with autoTranspose', () => {
    const svd = new SingularValueDecomposition(wide, { autoTranspose: true });
    const product = svd.leftSingularVectors
      .mmul(Matrix.diag(svd.diagonal))
      .mmul(svd.rightSingularVectors.transpose());
    for (let i = 0; i < wide.rows; i++) {
      for (let j = 0; j < wide.columns; j++) {
        expect(product.get(i, j)).toBeCloseTo(wide.get(i, j), 10);
      }
    }
  });

  it('reports one singular value per row of a wide matrix', () => {
    const svd = new SingularValueDecomposition(wide, { autoTranspose: true });
    expect(svd.diagonal).toHaveLength(2);
    expect(svd.rank).toBe(2);
  });
});
