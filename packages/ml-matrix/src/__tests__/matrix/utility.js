import Matrix from '../..';
import * as util from '../../../testUtils';

describe('utility methods', () => {
    var matrix;
    beforeEach(() => {
        matrix = util.getSquareMatrix();
    });

    it('isMatrix', () => {
        function notAMatrix(val) {
            expect(Matrix.isMatrix(val)).toBe(false);
        }

        notAMatrix();
        notAMatrix(1);
        notAMatrix('string');
        notAMatrix(null);
        notAMatrix(new Array(6));
        notAMatrix([[]]);
        notAMatrix([[1, 2], [3, 4]]);

        expect(Matrix.isMatrix(new Matrix(4, 4))).toBe(true);
        expect(Matrix.isMatrix(Matrix.ones(4, 4))).toBe(true);
    });

    it('size', () => {
        expect(new Matrix(3, 4).size).toBe(12);
        expect(new Matrix(5, 5).size).toBe(25);
    });

    it('apply', () => {
        var matrix = Matrix.ones(6, 5);
        matrix[0][0] = 10;
        var called = 0;

        function cb(i, j) {
            called++;
            expect(this).toBeInstanceOf(Matrix);
            if (called === 1) {
                expect(this[i][j]).toBe(10);
            } else if (called === 30) {
                this[i][j] = 20;
            }
        }

        matrix.apply(cb);
        expect(matrix[5][4]).toBe(20);
        expect(called).toBe(30);
    });

    it('clone', () => {
        var clone = matrix.clone();
        expect(clone).not.toBe(matrix);
        expect(clone).toEqual(matrix);
        expect(clone).toBeInstanceOf(Matrix);
        expect(Matrix.isMatrix(clone)).toBe(true);
    });

    it('to1DArray', () => {
        var matrix = util.getSquareMatrix();
        var array = matrix.to1DArray();
        expect(array).toBeInstanceOf(Array);
        expect(array.length).toBe(9);
        expect(array).toEqual([9, 13, 5, 1, 11, 7, 2, 6, 3]);
        expect(array).not.toBeInstanceOf(Matrix);
        expect(Matrix.isMatrix(array)).toBe(false);
    });

    it('to2DArray', () => {
        var matrix = util.getSquareMatrix();
        var array = matrix.to2DArray();
        expect(array).toEqual(util.getSquareArray());
        expect(array).toBeInstanceOf(Array);
        expect(array.length).toBe(3);
        expect(array[0]).toBeInstanceOf(Array);
        expect(array[0].length).toBe(3);
        expect(array).not.toBeInstanceOf(Matrix);
        expect(Matrix.isMatrix(array)).toBe(false);
    });

    it('transpose square', () => {
        var transpose = matrix.transpose();
        expect(transpose[0][0]).toBe(matrix[0][0]);
        expect(transpose[1][0]).toBe(matrix[0][1]);
        expect(transpose[2][1]).toBe(matrix[1][2]);
    });

    it('determinant', () => {
        var determinant = matrix.det();
        expect(determinant).toBe(-18);
        var subMatrix = matrix.selection([1, 2], [1, 2]);
        determinant = subMatrix.det();
        expect(determinant).toBe(-9);
    });

    it('determinant synonym', () => {
        expect(matrix.det()).toBe(matrix.determinant());
    });

    it('determinant n>3', () => {
        var m = Matrix.rand(5, 5);
        expect(m.det()).toBeCloseTo(0, -1);
    });

    it('determinant wrong size', () => {
        var m1 = Matrix.ones(3, 5);
        var m2 = Matrix.ones(5, 3);
        expect(() => m1.det()).toThrow(/square/);
        expect(() => m2.det()).toThrow(/square/);
    });

    it('norm Frobenius', () => {
        var m1 = new Matrix([[1, 1, 1], [3, 3, 3], [1, 1, 1]]);
        expect(m1.norm()).toBeCloseTo(5.7445626465380286, 2);
    });

    it('norm Frobenius 2', () => {
        var m1 = new Matrix([[1, 1, 1], [3, 3, 3], [1, 1, 1]]);
        expect(m1.norm('frobenius')).toBeCloseTo(5.7445626465380286, 2);
    });

    it('norm max', () => {
        var m1 = new Matrix([[1, 1, 1], [3, 3, 3], [1, 1, 1]]);
        expect(m1.norm('max')).toBe(3);
    });

    it('transpose rectangular', () => {
        var matrix = new Matrix([[0, 1, 2], [3, 4, 5]]);
        var transpose = matrix.transpose();
        expect(transpose[0][0]).toBe(matrix[0][0]);
        expect(transpose[1][0]).toBe(matrix[0][1]);
        expect(transpose[2][1]).toBe(matrix[1][2]);
        expect(transpose.rows).toBe(3);
        expect(transpose.columns).toBe(2);
    });

    it('scale rows', () => {
        var matrix = new Matrix([[-1, 0, 1], [6, 9, 7]]);
        expect(matrix.scaleRows().to2DArray()).toEqual([[0, 1 / 2, 1], [0, 1, 1 / 3]]);
        expect(matrix.scaleRows(1, 2).to2DArray()).toEqual([[1, 3 / 2, 2], [1, 2, 4 / 3]]);
        expect(matrix.scaleRows(-2, -1).to2DArray()).toEqual([[-2, -3 / 2, -1], [-2, -1, -5 / 3]]);
        expect(() => matrix.scaleRows(2, 1)).toThrow(/min should be strictly smaller than max/);
    });

    it('scale columns', () => {
        var matrix = new Matrix([[1, 2], [-5, 3], [2, 4]]);
        expect(matrix.scaleColumns().to2DArray()).toEqual([[6 / 7, 0], [0, 1 / 2], [1, 1]]);
        expect(matrix.scaleColumns(1, 2).to2DArray()).toEqual([[13 / 7, 1], [1, 3 / 2], [2, 2]]);
        expect(matrix.scaleColumns(-2, -1).to2DArray()).toEqual([[-8 / 7, -2], [-2, -3 / 2], [-1, -1]]);
        expect(() => matrix.scaleColumns(2, 1)).toThrow(/min should be strictly smaller than max/);
    });

    it('set sub matrix', () => {
        var matrix = new Matrix([[1, 2], [-5, 3], [2, 4]]);
        expect(matrix.setSubMatrix([[1, 2]], 1, 0).to2DArray()).toEqual([[1, 2], [1, 2], [2, 4]]);
        expect(matrix.setSubMatrix([[10], [10]], 1, 1).to2DArray()).toEqual([[1, 2], [1, 10], [2, 10]]);
        expect(() => matrix.setSubMatrix([[1, 2]], 1, 1)).toThrow(RangeError);
    });

    it('selection matrix', () => {
        var matrix = new Matrix([[1, 2], [-5, 3], [2, 4]]);
        var selMatrix = matrix.selection([2, 1], [1]);
        expect(selMatrix.to2DArray()).toEqual([[4], [3]]);
    });

    it('repeat matrix', () => {
        var matrix = new Matrix([[1, 2], [3, 4]]);
        expect(matrix.repeat().to2DArray()).toEqual([[1, 2], [3, 4]]);
        expect(matrix.repeat(2, 2).to2DArray()).toEqual([[1, 2, 1, 2], [3, 4, 3, 4], [1, 2, 1, 2], [3, 4, 3, 4]]);
        expect(matrix.repeat(1, 2).to2DArray()).toEqual([[1, 2, 1, 2], [3, 4, 3, 4]]);
    });

    it('mmul strassen', () => {
        var matrix = new Matrix([[2, 4], [7, 1]]);
        var matrix2 = new Matrix([[2, 1], [1, 1]]);
        expect(matrix.mmulStrassen(matrix2).to2DArray()).toEqual([[8, 6], [15, 8]]);
    });

    it('mmul 2x2 and 3x3', () => {
        var matrix = new Matrix([[2, 4], [7, 1]]);
        var matrix2 = new Matrix([[2, 1], [1, 1]]);
        expect(matrix.strassen2x2(matrix2).to2DArray()).toEqual([[8, 6], [15, 8]]);

        matrix = new Matrix([[2, 4, 1], [7, 1, 2], [5, 1, 3]]);
        matrix2 = new Matrix([[2, 1, 3], [7, 1, 1], [6, 2, 7]]);
        expect(matrix.strassen3x3(matrix2).to2DArray()).toEqual([[38, 8, 17], [33, 12, 36], [35, 12, 37]]);
    });

    it('pseudoinverse', () => {
        // Actual values calculated by the Numpy library

        var matrix = new Matrix([[2, 4], [7, 1]]);
        var result = matrix.pseudoInverse().to2DArray();

        expect(result[0][0]).toBeCloseTo(-0.03846153846153843, 5);
        expect(result[0][1]).toBeCloseTo(0.15384615384615374, 5);
        expect(result[1][0]).toBeCloseTo(0.2692307692307691, 5);
        expect(result[1][1]).toBeCloseTo(-0.076923076923077, 5);

        matrix = new Matrix([[4, 7], [2, 6]]);
        result = matrix.pseudoInverse().to2DArray();
        expect(result[0][0]).toBeCloseTo(0.6, 5);
        expect(result[0][1]).toBeCloseTo(-0.7, 5);
        expect(result[1][0]).toBeCloseTo(-0.2, 5);
        expect(result[1][1]).toBeCloseTo(0.4, 5);

        // Example from http://reference.wolfram.com/language/ref/PseudoInverse.html
        matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        result = matrix.pseudoInverse().to2DArray();

        expect(result[0][0]).toBeCloseTo(-6.38888889e-01, 5);
        expect(result[0][1]).toBeCloseTo(-1.66666667e-01, 5);
        expect(result[0][2]).toBeCloseTo(3.05555556e-01, 5);

        expect(result[1][0]).toBeCloseTo(-5.55555556e-02, 5);
        expect(result[1][1]).toBeCloseTo(1.34337961e-16, 5);
        expect(result[1][2]).toBeCloseTo(5.55555556e-02, 5);

        expect(result[2][0]).toBeCloseTo(5.27777778e-01, 5);
        expect(result[2][1]).toBeCloseTo(1.66666667e-01, 5);
        expect(result[2][2]).toBeCloseTo(-1.94444444e-01, 5);

        // non-square matrix.
        matrix = new Matrix([[1, 0, 1], [2, 4, 5]]);
        result = matrix.pseudoInverse().to2DArray();

        expect(result[0][0]).toBeCloseTo(0.75609756, 5);
        expect(result[0][1]).toBeCloseTo(-0.07317073, 5);
        expect(result[1][0]).toBeCloseTo(-0.68292683, 5);
        expect(result[1][1]).toBeCloseTo(0.19512195, 5);
        expect(result[2][0]).toBeCloseTo(0.24390244, 5);
        expect(result[2][1]).toBeCloseTo(0.07317073, 5);

    });
});
