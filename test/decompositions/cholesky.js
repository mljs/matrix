'use strict';

const Matrix = require('../..');
const Cho = Matrix.DC.CHO;

describe.only('Cholesky decomposition', function () {
    it('should compute lower triangular matrix', function () {
        // http://ch.mathworks.com/help/matlab/ref/chol.html
        let matrix = new Matrix([
            [ 1, -1, -1, -1, -1],
            [-1,  2,  0,  0,  0],
            [-1,  0,  3,  1,  1],
            [-1,  0,  1,  4,  2],
            [-1,  0,  1,  2,  5]
        ]);

        var cho = new Cho(matrix);

        var ltm = cho.lowerTriangularMatrix;
        checkTriangular(ltm);

        ltm.mmul(ltm.transpose()).should.eql(matrix);
    });
    it('should throw on bad input', function () {
        (function () {
            Cho([[0, 1], [2, 0]]);
        }).should.throw('Matrix is not symmetric');
        (function () {
            Cho([[1, 2], [2, 1]]);
        }).should.throw('Matrix is not positive definite');
    });
});

function checkTriangular(matrix) {
    for (var i = 0; i < matrix.rows; i++) {
        for (var j = i + 1; j < matrix.columns; j++) {
            matrix[i][j].should.equal(0);
        }
    }
}
