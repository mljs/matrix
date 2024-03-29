import { describe, it, beforeEach, expect } from 'vitest';

import { Matrix } from '../..';

describe('Dynamic methods on matrices', () => {
  let matrix;

  beforeEach(() => {
    matrix = new Matrix([
      [0, 1, 2],
      [3, -4, -5],
      [-6, -7, -8],
      [4.39, -0.61, -12.7],
    ]);
  });

  describe('inplace', () => {
    it('should return instance', () => {
      expect(matrix.abs()).toBe(matrix);
      expect(matrix.sqrt()).toBe(matrix);
    });
    it('abs', () => {
      matrix.abs();
      expect(matrix.to2DArray()).toStrictEqual([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [4.39, 0.61, 12.7],
      ]);
    });
    it('cbrt', () => {
      matrix.fill(27);
      matrix.cbrt();
      expect(matrix.to2DArray()).toStrictEqual([
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
      ]);
    });
  });

  describe('static', () => {
    it('should return a new Matrix', () => {
      expect(Matrix.abs(matrix)).not.toBe(matrix);
      let abs1 = Matrix.abs(matrix);
      let abs2 = Matrix.abs(matrix);
      expect(abs1).not.toBe(abs2);
    });
    it('should accept 2D array input', () => {
      let result = Matrix.abs([[-6]]);
      expect(result.get(0, 0)).toBe(6);
    });
    it('should return a Matrix instance', () => {
      let result = Matrix.abs([[-6]]);
      expect(result).toBeInstanceOf(Matrix);
    });
    it('cbrt', () => {
      matrix.fill(27);
      expect(Matrix.cbrt(matrix).to2DArray()).toStrictEqual([
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
      ]);
    });
  });

  describe('with one arg', () => {
    it('inplace MathPow with scalar', () => {
      matrix = matrix.subMatrix(0, 2, 0, 2);
      let retMatrix = matrix.pow(2);
      expect(matrix.to2DArray()).toStrictEqual([
        [0, 1, 4],
        [9, 16, 25],
        [36, 49, 64],
      ]);
      expect(retMatrix).toBe(matrix);
    });

    it('static MathPow with scalar', () => {
      matrix = matrix.subMatrix(0, 2, 0, 2);
      let newMatrix = Matrix.pow(matrix, 2);
      expect(newMatrix).not.toStrictEqual(matrix);
      expect(newMatrix.to2DArray()).toStrictEqual([
        [0, 1, 4],
        [9, 16, 25],
        [36, 49, 64],
      ]);
    });

    it('inplace MathPow with matrix', () => {
      matrix = matrix.subMatrix(0, 1, 0, 1);
      let retMatrix = matrix.pow([
        [1, 10],
        [2, 0],
      ]);
      expect(matrix.to2DArray()).toStrictEqual([
        [0, 1],
        [9, 1],
      ]);
      expect(retMatrix).toBe(matrix);
    });

    it('static MathPow with matrix', () => {
      matrix = matrix.subMatrix(0, 1, 0, 1);
      let newMatrix = Matrix.pow(matrix, [
        [1, 10],
        [2, 0],
      ]);
      expect(newMatrix.to2DArray()).toStrictEqual([
        [0, 1],
        [9, 1],
      ]);
    });
  });
});
