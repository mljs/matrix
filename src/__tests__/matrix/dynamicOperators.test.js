import { describe, it, beforeEach, expect } from 'vitest';

import { Matrix } from '../..';

describe('Dynamic operators on matrices', () => {
  let matrix;

  beforeEach(() => {
    matrix = new Matrix([
      [0, 1, 2],
      [3, -4, -5],
      [-6, -7, -8],
    ]);
  });

  describe('inplace', () => {
    it('should return instance', () => {
      expect(matrix.mul(5)).toBe(matrix);
      expect(matrix.subtract(36)).toBe(matrix);
    });
    it('multiply', () => {
      matrix.multiply(2);
      expect(matrix.to2DArray()).toStrictEqual([
        [0, 2, 4],
        [6, -8, -10],
        [-12, -14, -16],
      ]);
    });
    it('or', () => {
      matrix.or(10);
      expect(matrix.to2DArray()).toStrictEqual([
        [10, 11, 10],
        [11, -2, -5],
        [-6, -5, -6],
      ]);
    });
  });

  describe('static', () => {
    it('should return a new Matrix', () => {
      expect(Matrix.multiply(matrix, 5)).not.toBe(matrix);
      let mul1 = Matrix.mul(matrix, 5);
      let mul2 = Matrix.mul(matrix, 5);
      expect(mul1).not.toBe(mul2);
    });
    it('should accept 2D array input', () => {
      let result = Matrix.mul([[-6]], 5);
      expect(result.get(0, 0)).toBe(-30);
    });
    it('should return a Matrix instance', () => {
      let result = Matrix.mul([[-6]], 5);
      expect(result).toBeInstanceOf(Matrix);
    });
    it('or', () => {
      expect(Matrix.or(matrix, 10).to2DArray()).toStrictEqual([
        [10, 11, 10],
        [11, -2, -5],
        [-6, -5, -6],
      ]);
    });
  });
});
