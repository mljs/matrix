import {Matrix, LU} from '../..';

describe('LU decomposition', () => {
    it('should compute lower triangular matrix', () => {
        // http://ch.mathworks.com/help/matlab/ref/lu.html
        let matrix = new Matrix([
            [1, -1, -1, -1, -1],
            [-1, 2, 0, 0, 0],
            [-1, 0, 3, 1, 1],
            [-1, 0, 1, 4, 2],
            [-1, 0, 1, 2, 5]
        ]);

        const lu = new LU(matrix);

        const ltm = lu.lowerTriangularMatrix;
        checkTriangular(ltm);

        expect(ltm.mmul(ltm.transpose())).toEqual(matrix);
    });

    it('should work with arrays', () => {
        // http://ch.mathworks.com/help/matlab/ref/lu.html
        let matrix = [
            [1, -1, -1, -1, -1],
            [-1, 2, 0, 0, 0],
            [-1, 0, 3, 1, 1],
            [-1, 0, 1, 4, 2],
            [-1, 0, 1, 2, 5]
        ];

        const lu = new LU(matrix);

        const ltm = lu.lowerTriangularMatrix;
        checkTriangular(ltm);

        expect(ltm.mmul(ltm.transpose())).toEqual(new Matrix(matrix));
    });

    it('should throw on bad input', () => {
        expect(() => new LU([[0, 1, 2], [0, 1, 2]]).determinant).toThrow('Matrix must be square');
    });
});

function checkTriangular(matrix) {
    for (let i = 0; i < matrix.rows; i++) {
        for (let j = i + 1; j < matrix.columns; j++) {
            expect(matrix[i][j]).toBe(0);
        }
    }
}
