import {Matrix, CHO} from '../..';

describe('Cholesky decomposition', () => {
    it('should compute lower triangular matrix', () => {
        // http://ch.mathworks.com/help/matlab/ref/chol.html
        let matrix = new Matrix([
            [1, -1, -1, -1, -1],
            [-1, 2, 0, 0, 0],
            [-1, 0, 3, 1, 1],
            [-1, 0, 1, 4, 2],
            [-1, 0, 1, 2, 5]
        ]);

        const cho = new CHO(matrix);

        const ltm = cho.lowerTriangularMatrix;
        checkTriangular(ltm);

        expect(ltm.mmul(ltm.transpose())).toEqual(matrix);
    });
    it('should throw on bad input', () => {
        expect(() => new CHO([[0, 1], [2, 0]])).toThrow('Matrix is not symmetric');
        expect(() => new CHO([[1, 2], [2, 1]])).toThrow('Matrix is not positive definite');
    });
});

function checkTriangular(matrix) {
    for (let i = 0; i < matrix.rows; i++) {
        for (let j = i + 1; j < matrix.columns; j++) {
            expect(matrix[i][j]).toBe(0);
        }
    }
}
