import { describe, it, expect } from 'vitest';

import { Matrix, QrDecomposition } from '../..';

// the third column is 2 * second - first, so the rank is 2
const rankDeficient = new Matrix([
  [1, 2, 3],
  [2, 4, 6],
  [1, 1, 1],
  [3, 5, 7],
]);
const fullRank = new Matrix([
  [1, 2],
  [3, 4],
  [5, 7],
]);

function maxAbsDifference(a, b) {
  let largest = 0;
  for (let i = 0; i < a.rows; i++) {
    for (let j = 0; j < a.columns; j++) {
      largest = Math.max(largest, Math.abs(a.get(i, j) - b.get(i, j)));
    }
  }
  return largest;
}

function permuteColumns(matrix, permutation) {
  const result = new Matrix(matrix.rows, matrix.columns);
  for (let j = 0; j < permutation.length; j++) {
    result.setColumn(j, matrix.getColumn(permutation[j]));
  }
  return result;
}

describe('QR with column pivoting', () => {
  it('factors the permuted input', () => {
    const qr = new QrDecomposition(rankDeficient, { pivoting: true });
    const permuted = permuteColumns(rankDeficient, qr.columnPermutationVector);
    const product = qr.orthogonalMatrix.mmul(qr.upperTriangularMatrix);
    expect(maxAbsDifference(permuted, product)).toBeLessThan(1e-12);
  });

  it('orders the diagonal of R by decreasing magnitude', () => {
    const qr = new QrDecomposition(rankDeficient, { pivoting: true });
    const diagonal = qr.upperTriangularMatrix.diag().map(Math.abs);
    for (let i = 1; i < diagonal.length; i++) {
      expect(diagonal[i]).toBeLessThanOrEqual(diagonal[i - 1] + 1e-12);
    }
  });

  it('reports the rank of a deficient matrix', () => {
    const qr = new QrDecomposition(rankDeficient, { pivoting: true });
    expect(qr.rank).toBe(2);
    expect(qr.isFullRank()).toBe(false);
  });

  it('reports the rank of a full rank matrix', () => {
    const qr = new QrDecomposition(fullRank, { pivoting: true });
    expect(qr.rank).toBe(2);
    expect(qr.isFullRank()).toBe(true);
  });

  it('reports a rank of zero for a matrix of zeros', () => {
    const qr = new QrDecomposition(new Matrix(3, 2), { pivoting: true });
    expect(qr.rank).toBe(0);
  });

  it('returns a permutation of the column indices', () => {
    const permutation = new QrDecomposition(rankDeficient, {
      pivoting: true,
    }).columnPermutationVector;
    expect([...permutation].sort()).toStrictEqual([0, 1, 2]);
  });

  it('leaves the permutation as the identity without pivoting', () => {
    expect(
      new QrDecomposition(rankDeficient).columnPermutationVector,
    ).toStrictEqual([0, 1, 2]);
  });

  it('hands back a copy of the permutation', () => {
    const qr = new QrDecomposition(rankDeficient, { pivoting: true });
    const first = qr.columnPermutationVector;
    first[0] = 99;
    expect(qr.columnPermutationVector[0]).not.toBe(99);
  });

  it('rejects a wide matrix instead of indexing past its rows', () => {
    expect(
      () =>
        new QrDecomposition(
          [
            [1, 2, 3],
            [4, 5, 6],
          ],
          { pivoting: true },
        ),
    ).toThrow(/^Matrix must have at least as many rows as columns$/);
  });
});

describe('QR with column pivoting solves a rank deficient least squares', () => {
  const b = Matrix.columnVector([1, 2, 3, 4]);

  it('satisfies the normal equations', () => {
    const x = new QrDecomposition(rankDeficient, { pivoting: true }).solve(b);
    // a least squares solution leaves a residual orthogonal to every column
    const residual = rankDeficient.mmul(x).sub(b);
    const projected = rankDeficient.transpose().mmul(residual);
    expect(maxAbsDifference(projected, new Matrix(3, 1))).toBeLessThan(1e-10);
  });

  it('pins the dropped components to zero', () => {
    const qr = new QrDecomposition(rankDeficient, { pivoting: true });
    const x = qr.solve(b);
    const permutation = qr.columnPermutationVector;
    for (let k = qr.rank; k < permutation.length; k++) {
      expect(x.get(permutation[k], 0)).toBe(0);
    }
  });

  it('returns one row per column of the input', () => {
    const x = new QrDecomposition(rankDeficient, { pivoting: true }).solve(b);
    expect(x.rows).toBe(3);
    expect(x.columns).toBe(1);
  });

  it('solves several right hand sides at once', () => {
    const rhs = new Matrix([
      [1, 4],
      [2, 3],
      [3, 2],
      [4, 1],
    ]);
    const x = new QrDecomposition(rankDeficient, { pivoting: true }).solve(rhs);
    expect(x.rows).toBe(3);
    expect(x.columns).toBe(2);
    const residual = rankDeficient.mmul(x).sub(rhs);
    const projected = rankDeficient.transpose().mmul(residual);
    expect(maxAbsDifference(projected, new Matrix(3, 2))).toBeLessThan(1e-10);
  });

  it('still refuses a deficient matrix without pivoting', () => {
    const singular = new Matrix([
      [1, 1],
      [0, 0],
    ]);
    expect(() =>
      new QrDecomposition(singular).solve(Matrix.columnVector([1, 0])),
    ).toThrow(/^Matrix is rank deficient$/);
  });
});

describe('QR with column pivoting on a full rank input', () => {
  const b = Matrix.columnVector([1, 2, 3]);

  it('agrees with the unpivoted solution', () => {
    const plain = new QrDecomposition(fullRank).solve(b);
    const pivoted = new QrDecomposition(fullRank, { pivoting: true }).solve(b);
    expect(maxAbsDifference(plain, pivoted)).toBeLessThan(1e-10);
  });

  it('rejects a pivoting option that is not a boolean', () => {
    expect(() => new QrDecomposition(fullRank, { pivoting: 1 })).toThrow(
      /^pivoting must be a boolean$/,
    );
  });
});
