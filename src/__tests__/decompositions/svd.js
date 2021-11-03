import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, SVD, inverse, solve } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Singular value decomposition', () => {
  it('Regress 1', () => {
    const svdbug = require('./svdbug.json');
    // Should not hang
    let res = new SVD(svdbug);
    expect(res.diagonal).toHaveLength(73);
  });

  // https://en.wikipedia.org/wiki/Singular_value_decomposition#Example
  it('Wikipedia example - U and V should be unitary', () => {
    let matrix = new Matrix([
      [1, 0, 0, 0, 2],
      [0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 4, 0, 0, 0],
    ]);
    let svd = new SVD(matrix);
    let U = new Matrix(svd.U);
    let V = new Matrix(svd.V);
    expect(U.mmul(U.transpose()).to2DArray()).toStrictEqual(
      Matrix.eye(4).to2DArray(),
    );
    expect(V.mmul(V.transpose()).to2DArray()).toBeDeepCloseTo(
      Matrix.eye(5).to2DArray(),
      5,
    );
  });

  describe('inverse', () => {
    let value = new Matrix([
      [1, 1],
      [2, 2],
    ]);
    let target = new SVD(value);
    let expected = [
      [0.1, 0.2],
      [0.1, 0.2],
    ];

    it('should solve with identity matrix', () => {
      let actual = target.solve(Matrix.eye(2));
      expect(actual.to2DArray()).toBeDeepCloseTo(expected, 3);
    });

    it('should compute the inverse', () => {
      let actual = target.inverse();
      expect(actual.to2DArray()).toBeDeepCloseTo(expected, 3);
    });

    it('should compute the inverse with the inverse function', () => {
      let actual = inverse(value, true);
      expect(actual.to2DArray()).toBeDeepCloseTo(expected, 3);
    });

    it('should solve with identity matrix with the solve function', () => {
      let actual = solve(value, Matrix.eye(2), true);
      expect(actual.to2DArray()).toBeDeepCloseTo(expected, 3);
    });
  });

  describe('less rows than columns, no autotranspose', () => {
    let value = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]).transpose();
    let target = new SVD(value, {
      computeLeftSingularVectors: true,
      computeRightSingularVectors: true,
      autoTranspose: false,
    });

    it('should be possible to get back original matrix', () => {
      let actual = target.leftSingularVectors
        .mmul(Matrix.diag(target.diagonal))
        .mmul(target.rightSingularVectors.transpose());
      expect(actual.to2DArray()).toBeDeepCloseTo(value.to2DArray(), 2);
    });

    it('left singular vectors', () => {
      let U = [
        [-0.641423027995072, -0.767187395072177],
        [-0.767187395072177, 0.641423027995072],
      ];
      expect(target.leftSingularVectors.to2DArray()).toBeDeepCloseTo(U, 2);
    });

    it('right singular vectors', () => {
      let V = [
        [-0.152483233310201, 0.822647472225661],
        [-0.349918371807964, 0.42137528768458],
        [-0.547353510305727, 0.0201031031435023],
        [-0.74478864880349, -0.381169081397574],
      ];
      expect(
        target.rightSingularVectors.subMatrix(0, 3, 0, 1).to2DArray(),
      ).toBeDeepCloseTo(V, 4);
    });

    it('diagonal', () => {
      let S = [14.2690954992615, 0.626828232417543];
      expect(target.diagonal.slice(0, 2)).toBeDeepCloseTo(S, 3);
    });
  });

  describe('more rows than columns', () => {
    let value = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
    let target = new SVD(value, {
      computeLeftSingularVectors: true,
      computeRightSingularVectors: true,
      autoTranspose: false,
    });

    it('should be possible to get back original matrix', () => {
      let actual = target.leftSingularVectors
        .mmul(Matrix.diag(target.diagonal))
        .mmul(target.rightSingularVectors.transpose());
      expect(actual.to2DArray()).toBeDeepCloseTo(value.to2DArray(), 2);
    });

    it('left singular vectors', () => {
      let U = [
        [0.152483233310201, 0.822647472225661],
        [0.349918371807964, 0.42137528768458],
        [0.547353510305727, 0.0201031031435023],
        [0.74478864880349, -0.381169081397574],
      ];
      expect(
        target.leftSingularVectors.subMatrix(0, 3, 0, 1).to2DArray(),
      ).toBeDeepCloseTo(U, 2);
    });

    it('right singular vectors', () => {
      let V = [
        [0.641423027995072, -0.767187395072177],
        [0.767187395072177, 0.641423027995072],
      ];
      expect(target.rightSingularVectors.to2DArray()).toBeDeepCloseTo(V, 4);
    });

    it('diagonal', () => {
      let S = [14.2690954992615, 0.626828232417543];
      expect(target.diagonal.slice(0, 2)).toBeDeepCloseTo(S, 3);
    });
  });

  describe('less rows than columns, with autotranspose', () => {
    let value = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]).transpose();
    let target = new SVD(value, {
      computeLeftSingularVectors: true,
      computeRightSingularVectors: true,
      autoTranspose: true,
    });

    it('should be possible to get back original matrix', () => {
      let actual = target.leftSingularVectors
        .mmul(Matrix.diag(target.diagonal))
        .mmul(target.rightSingularVectors.transpose());
      expect(actual.to2DArray()).toBeDeepCloseTo(value.to2DArray(), 2);
    });

    it('left singular vectors', () => {
      let U = [
        [0.641423027995072, -0.767187395072177],
        [0.767187395072177, 0.641423027995072],
      ];
      expect(target.leftSingularVectors.to2DArray()).toBeDeepCloseTo(U, 2);
    });

    it('right singular vectors', () => {
      let V = [
        [0.152483233310201, 0.822647472225661],
        [0.349918371807964, 0.42137528768458],
        [0.547353510305727, 0.0201031031435023],
        [0.74478864880349, -0.381169081397574],
      ];
      expect(
        target.rightSingularVectors.subMatrix(0, 3, 0, 1).to2DArray(),
      ).toBeDeepCloseTo(V, 4);
    });

    it('diagonal', () => {
      let S = [14.2690954992615, 0.626828232417543];
      expect(target.diagonal.slice(0, 2)).toBeDeepCloseTo(S, 3);
    });
  });

  describe('less rows than column, with autotranspose, not computing right singular vectors', () => {
    let value = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]).transpose();
    let target = new SVD(value, {
      computeLeftSingularVectors: true,
      computeRightSingularVectors: false,
      autoTranspose: true,
    });

    it('left singular vectors', () => {
      let U = [
        [0.641423027995072, -0.767187395072177],
        [0.767187395072177, 0.641423027995072],
      ];
      expect(target.leftSingularVectors.to2DArray()).toBeDeepCloseTo(U, 3);
    });

    it('right singular vectors (0)', () => {
      let V = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];
      expect(target.rightSingularVectors.to2DArray()).toBeDeepCloseTo(V, 6);
    });

    it('diagonal', () => {
      let S = [14.2690954992615, 0.626828232417543];
      expect(target.diagonal.slice(0, 2)).toBeDeepCloseTo(S, 3);
    });
  });

  describe('less rows than column, with autotranspose, not computing left singular vectors', () => {
    let value = new Matrix([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]).transpose();
    let target = new SVD(value, {
      computeLeftSingularVectors: false,
      computeRightSingularVectors: true,
      autoTranspose: true,
    });

    it('left singular vectors', () => {
      let U = [
        [0, 0],
        [0, 0],
      ];
      expect(target.leftSingularVectors.to2DArray()).toBeDeepCloseTo(U, 6);
    });

    it('right singular vectors', () => {
      let V = [
        [0.152483233310201, 0.822647472225661],
        [0.349918371807964, 0.42137528768458],
        [0.547353510305727, 0.0201031031435023],
        [0.74478864880349, -0.381169081397574],
      ];
      expect(
        target.rightSingularVectors.subMatrix(0, 3, 0, 1).to2DArray(),
      ).toBeDeepCloseTo(V, 4);
    });

    it('diagonal', () => {
      let S = [14.2690954992615, 0.626828232417543];
      expect(target.diagonal.slice(0, 2)).toBeDeepCloseTo(S, 4);
    });
  });

  it('autotranspose', () => {
    let value1 = new Matrix([
      [2.5, 2.4],
      [0.5, 0.7],
      [2.2, 2.9],
      [1.9, 2.2],
      [3.1, 3.0],
      [2.3, 2.7],
      [2.0, 1.6],
      [1.0, 1.1],
      [1.5, 1.6],
      [1.1, 0.9],
    ]);
    let value2 = value1.transpose();

    let target1 = new SVD(value1, { autoTranspose: true });
    let target2 = new SVD(value2, { autoTranspose: true });

    expect(target1.rightSingularVectors).toStrictEqual(
      target2.leftSingularVectors,
    );
    expect(target1.leftSingularVectors).toStrictEqual(
      target2.rightSingularVectors,
    );
    expect(target1.diagonalMatrix).toStrictEqual(target2.diagonalMatrix);
  });

  describe('solve', () => {
    let count = 100;
    let value = new Matrix(count, 3);
    let output = new Array(count);

    for (let i = 0; i < count; i++) {
      let x = i + 1;
      let y = 2 * (i + 1) - 1;
      value.set(i, 0, x);
      value.set(i, 1, y);
      value.set(i, 2, 1);
      output[i] = 4 * x - y + 3;
    }

    let target = new SVD(value);

    it('should decompose correctly', () => {
      let actual = target.leftSingularVectors
        .mmul(target.diagonalMatrix)
        .mmul(target.rightSingularVectors.transpose());
      expect(actual.to2DArray()).toBeDeepCloseTo(value.to2DArray(), 8);
    });

    it('should find the solution', () => {
      let solution = target.solve(Matrix.columnVector(output));
      let actual = value.mmul(solution).to1DArray();
      expect(actual).toBeDeepCloseTo(output, 8);
    });
  });

  describe('empty matrix', () => {
    it('should throw for an empty matrix', () => {
      const matrix = new Matrix([]);
      expect(() => new SVD(matrix)).toThrow('Matrix must be non-empty');
    });
  });
});
