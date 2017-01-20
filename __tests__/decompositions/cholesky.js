import 'should';

import {Matrix, Decompositions} from '../../src';

const CHO = Decompositions.CHO;

describe('Cholesky decomposition', function () {
    it('should compute lower triangular matrix', function () {
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

        ltm.mmul(ltm.transpose()).should.eql(matrix);
    });
    it('should throw on bad input', function () {
        (function () {
            CHO([[0, 1], [2, 0]]);
        }).should.throw('Matrix is not symmetric');
        (function () {
            CHO([[1, 2], [2, 1]]);
        }).should.throw('Matrix is not positive definite');
    });
});

function checkTriangular(matrix) {
    for (let i = 0; i < matrix.rows; i++) {
        for (let j = i + 1; j < matrix.columns; j++) {
            matrix[i][j].should.equal(0);
        }
    }
}
