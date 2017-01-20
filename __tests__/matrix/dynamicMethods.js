import 'should';

import Matrix from '../../src';

describe('Dynamic methods on matrices', function () {

    var matrix;

    beforeEach(function () {
        matrix = new Matrix([
            [0, 1, 2],
            [3, -4, -5],
            [-6, -7, -8],
            [4.39, -0.61, -12.7]
        ]);
    });

    describe('inplace', function () {
        it('should return instance', function () {
            matrix.abs().should.equal(matrix);
            matrix.sqrt().should.equal(matrix);
        });
        it('abs', function () {
            matrix.abs();
            matrix.to2DArray().should.eql([
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [4.39, 0.61, 12.7]
            ]);
        });
        it('cbrt', function () {
            matrix.fill(27);
            matrix.cbrt();
            matrix.to2DArray().should.eql([
                [3, 3, 3],
                [3, 3, 3],
                [3, 3, 3],
                [3, 3, 3]
            ]);
        });
    });

    describe('static', function () {
        it('should return a new Matrix', function () {
            Matrix.abs(matrix).should.not.equal(matrix);
            var abs1 = Matrix.abs(matrix);
            var abs2 = Matrix.abs(matrix);
            abs1.should.not.equal(abs2);
        });
        it('should accept 2D array input', function () {
            var result = Matrix.abs([[-6]]);
            result[0][0].should.equal(6);
        });
        it('should return a Matrix instance', function () {
            var result = Matrix.abs([[-6]]);
            result.should.be.instanceOf(Matrix);
        });
        it('cbrt', function () {
            matrix.fill(27);
            Matrix.cbrt(matrix).to2DArray().should.eql([
                [3, 3, 3],
                [3, 3, 3],
                [3, 3, 3],
                [3, 3, 3]
            ]);
        });
    });

    describe('with one arg', function () {
        it('inplace MathPow with scalar', function () {
            matrix = matrix.subMatrix(0, 2, 0, 2);
            var retMatrix = matrix.pow(2);
            matrix.to2DArray().should.eql([
                [0, 1, 4],
                [9, 16, 25],
                [36, 49, 64]
            ]);
            retMatrix.should.equal(matrix);
        });

        it('static MathPow with scalar', function () {
            matrix = matrix.subMatrix(0, 2, 0, 2);
            var newMatrix = Matrix.pow(matrix, 2);
            newMatrix.should.not.eql(matrix);
            newMatrix.to2DArray().should.eql([
                [0, 1, 4],
                [9, 16, 25],
                [36, 49, 64]
            ]);
        });

        it('inplace MathPow with matrix', function () {
            matrix = matrix.subMatrix(0, 1, 0, 1);
            var retMatrix = matrix.pow([[1, 10], [2, 0]]);
            matrix.to2DArray().should.eql([
                [0, 1],
                [9, 1]
            ]);
            retMatrix.should.equal(matrix);
        });

        it('static MathPow with matrix', function () {
            matrix = matrix.subMatrix(0, 1, 0, 1);
            var newMatrix = Matrix.pow(matrix, [[1, 10], [2, 0]]);
            newMatrix.to2DArray().should.eql([
                [0, 1],
                [9, 1]
            ]);
        });
    });

});
