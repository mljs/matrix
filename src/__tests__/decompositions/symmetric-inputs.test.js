import { describe, expect, it } from 'vitest';

import {
  CholeskyDecomposition,
  DistanceMatrix,
  LU,
  Matrix,
  NIPALS,
  QR,
  SymmetricMatrix,
  determinant,
  inverse,
  solve,
} from '../..';

const examples = [
  {
    name: 'SymmetricMatrix',
    Type: SymmetricMatrix,
    values: [
      [4, 1, 2, 0.5],
      [1, 5, 3, 1],
      [2, 3, 6, 2],
      [0.5, 1, 2, 7],
    ],
    det: 442.75,
  },
  {
    name: 'DistanceMatrix',
    Type: DistanceMatrix,
    values: [
      [0, 1, 2],
      [1, 0, 3],
      [2, 3, 0],
    ],
    det: 12,
  },
];

function expectMatrixClose(actual, expected) {
  expect(actual.rows).toBe(expected.rows);
  expect(actual.columns).toBe(expected.columns);
  for (let i = 0; i < actual.rows; i++) {
    for (let j = 0; j < actual.columns; j++) {
      expect(actual.get(i, j)).toBeCloseTo(expected.get(i, j), 10);
    }
  }
}

for (const { name, Type, values, det } of examples) {
  describe(`decompositions with ${name}`, () => {
    it('reconstructs the pivoted input from LU factors', () => {
      const input = new Type(values);
      const lu = new LU(input);
      expectMatrixClose(
        lu.lowerTriangularMatrix.mmul(lu.upperTriangularMatrix),
        new Matrix(values).subMatrixRow(lu.pivotPermutationVector),
      );
      expect(input.to2DArray()).toEqual(values);
    });

    it('computes the determinant and inverse', () => {
      const input = new Type(values);
      expect(determinant(input)).toBeCloseTo(det, 10);
      expectMatrixClose(
        new Matrix(values).mmul(inverse(input)),
        Matrix.eye(input.rows),
      );
      expect(input.to2DArray()).toEqual(values);
    });

    it('solves a linear system', () => {
      const input = new Type(values);
      const rhs = Matrix.columnVector(values.map((_, i) => i + 1));
      expectMatrixClose(new Matrix(values).mmul(solve(input, rhs)), rhs);
      expect(input.to2DArray()).toEqual(values);
    });

    it('reconstructs the input from QR factors', () => {
      const input = new Type(values);
      const qr = new QR(input);
      expectMatrixClose(
        qr.orthogonalMatrix.mmul(qr.upperTriangularMatrix),
        new Matrix(values),
      );
      expectMatrixClose(
        qr.orthogonalMatrix.transpose().mmul(qr.orthogonalMatrix),
        Matrix.eye(input.rows),
      );
      expect(input.to2DArray()).toEqual(values);
    });

    it('solves QR systems with a constrained right-hand side', () => {
      const rhs = new Type(values);
      expectMatrixClose(
        new QR(new Matrix(values)).solve(rhs),
        Matrix.eye(rhs.rows),
      );
      expect(rhs.to2DArray()).toEqual(values);
    });

    it('solves Cholesky systems with a constrained right-hand side', () => {
      const rhs = new Type(values);
      const coefficients = Matrix.eye(rhs.rows).mulS(4);
      for (let i = 1; i < rhs.rows; i++) {
        coefficients.set(i - 1, i, 1);
        coefficients.set(i, i - 1, 1);
      }
      const result = new CholeskyDecomposition(coefficients).solve(rhs);
      expectMatrixClose(coefficients.mmul(result), new Matrix(values));
      expect(rhs.to2DArray()).toEqual(values);
    });

    it('computes row echelon and reduced row echelon forms', () => {
      const input = new Type(values);
      const echelon = input.echelonForm();
      for (let i = 0; i < input.rows; i++) {
        expect(echelon.get(i, i)).toBeCloseTo(1, 10);
        for (let j = 0; j < i; j++) {
          expect(echelon.get(i, j)).toBeCloseTo(0, 10);
        }
      }
      expectMatrixClose(input.reducedEchelonForm(), Matrix.eye(input.rows));
      expect(input.to2DArray()).toEqual(values);
    });

    it('computes the NIPALS X residual without symmetric writes', () => {
      const input = new Type(values);
      const y = Matrix.columnVector(values.map((_, i) => i + 1));
      const model = new NIPALS(input, { Y: y });
      expectMatrixClose(
        model.xResidual,
        new Matrix(values).sub(model.t.mmul(model.p)),
      );
      expect(input.to2DArray()).toEqual(values);
    });

    it('computes the NIPALS Y residual without symmetric writes', () => {
      const input = new Type(values);
      const x = new Matrix(values.map((_, i) => [i + 1, (i + 1) ** 2]));
      const model = new NIPALS(x, { Y: input });
      const fitted = model.t
        .clone()
        .mulS(model.betas.get(0, 0))
        .mmul(model.q.transpose());
      expectMatrixClose(model.yResidual, new Matrix(values).sub(fitted));
      expect(input.to2DArray()).toEqual(values);
    });
  });
}
