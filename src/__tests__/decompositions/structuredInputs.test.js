import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { describe, it, expect } from 'vitest';

import {
  Matrix,
  SymmetricMatrix,
  DistanceMatrix,
  LU,
  QR,
  CHO,
  NIPALS,
  determinant,
  inverse,
  solve,
} from '../..';

expect.extend({ toBeDeepCloseTo });

const fixtures = [
  {
    name: 'SymmetricMatrix',
    Type: SymmetricMatrix,
    values: [
      [4, 1, 2, 0.5],
      [1, 5, 3, 1],
      [2, 3, 6, 2],
      [0.5, 1, 2, 7],
    ],
    expectedDeterminant: 442.75,
  },
  {
    name: 'DistanceMatrix',
    Type: DistanceMatrix,
    values: [
      [0, 1, 2],
      [1, 0, 3],
      [2, 3, 0],
    ],
    expectedDeterminant: 12,
  },
];

function expectMatrixClose(actual, expected) {
  expect(actual.rows).toBe(expected.rows);
  expect(actual.columns).toBe(expected.columns);
  expect(actual.to2DArray()).toBeDeepCloseTo(expected.to2DArray(), 10);
}

describe.each(fixtures)(
  '$name algorithm inputs',
  ({ Type, values, expectedDeterminant }) => {
    it('reconstructs the pivoted input from LU factors', () => {
      const input = new Type(values);
      const lu = new LU(input);

      expectMatrixClose(
        lu.lowerTriangularMatrix.mmul(lu.upperTriangularMatrix),
        new Matrix(values).subMatrixRow(lu.pivotPermutationVector),
      );
      expect(input.to2DArray()).toStrictEqual(values);
    });

    it('computes the determinant', () => {
      const input = new Type(values);

      expect(determinant(input)).toBeCloseTo(expectedDeterminant, 10);
      expect(input.to2DArray()).toStrictEqual(values);
    });

    it('computes the inverse', () => {
      const input = new Type(values);

      expectMatrixClose(
        new Matrix(values).mmul(inverse(input)),
        Matrix.eye(input.rows),
      );
      expect(input.to2DArray()).toStrictEqual(values);
    });

    it('solves a linear system', () => {
      const input = new Type(values);
      const rhs = Matrix.columnVector(values.map((_, index) => index + 1));

      expectMatrixClose(new Matrix(values).mmul(solve(input, rhs)), rhs);
      expect(input.to2DArray()).toStrictEqual(values);
    });

    it('reconstructs the input from QR factors', () => {
      const input = new Type(values);
      const qr = new QR(input);

      expectMatrixClose(
        qr.orthogonalMatrix.mmul(qr.upperTriangularMatrix),
        new Matrix(values),
      );
      expect(input.to2DArray()).toStrictEqual(values);
    });

    it.each([QR, CHO])(
      'solves with a structured right-hand side using %s',
      (Decomposition) => {
        const rhs = new Type(values);
        const coefficient = Matrix.eye(rhs.rows)
          .mul(2)
          .add(Matrix.ones(rhs.rows, rhs.rows));
        const result = new Decomposition(coefficient).solve(rhs);

        expectMatrixClose(coefficient.mmul(result), new Matrix(values));
        expect(rhs.to2DArray()).toStrictEqual(values);
      },
    );

    it('computes an echelon form', () => {
      const input = new Type(values);

      expectMatrixClose(input.echelonForm(), new Matrix(values).echelonForm());
      expect(input.to2DArray()).toStrictEqual(values);
    });

    it('reduces an invertible input to the identity matrix', () => {
      const input = new Type(values);

      expectMatrixClose(input.reducedEchelonForm(), Matrix.eye(input.rows));
      expect(input.to2DArray()).toStrictEqual(values);
    });

    it.each(['X', 'Y', 'both'])(
      'preserves NIPALS residuals with structured %s',
      (structured) => {
        const dense = new Matrix(values);
        const other = Matrix.eye(dense.rows)
          .mul(2)
          .add(Matrix.ones(dense.rows, dense.rows));
        const X = structured === 'Y' ? dense : new Type(values);
        const Y = structured === 'X' ? other : new Type(values);
        const xValues = X.to2DArray();
        const yValues = Y.to2DArray();
        const model = new NIPALS(X, { Y });

        expectMatrixClose(
          new Matrix(model.xResidual).add(model.t.mmul(model.p)),
          new Matrix(xValues),
        );
        expectMatrixClose(
          new Matrix(model.yResidual).add(
            model.t
              .clone()
              .mul(model.betas.get(0, 0))
              .mmul(model.q.transpose()),
          ),
          new Matrix(yValues),
        );
        expect(X.to2DArray()).toStrictEqual(xValues);
        expect(Y.to2DArray()).toStrictEqual(yValues);
      },
    );
  },
);
