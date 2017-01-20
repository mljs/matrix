import 'should';

import Matrix from '../../src';

describe('Dynamic operators on matrices', function () {

    var matrix;

    beforeEach(function () {
        matrix = new Matrix([
            [0, 1, 2],
            [3, -4, -5],
            [-6, -7, -8]
        ]);
    });

    describe('inplace', function () {
        it('should return instance', function () {
            matrix.mul(5).should.equal(matrix);
            matrix.subtract(36).should.equal(matrix);
        });
        it('multiply', function () {
            matrix.multiply(2);
            matrix.to2DArray().should.eql([
                [0, 2, 4],
                [6, -8, -10],
                [-12, -14, -16]
            ]);
        });
        it('or', function () {
            matrix.or(10);
            matrix.to2DArray().should.eql([
                [10, 11, 10],
                [11, -2, -5],
                [-6, -5, -6]
            ]);
        });
    });

    describe('static', function () {
        it('should return a new Matrix', function () {
            Matrix.multiply(matrix, 5).should.not.equal(matrix);
            var mul1 = Matrix.mul(matrix, 5);
            var mul2 = Matrix.mul(matrix, 5);
            mul1.should.not.equal(mul2);
        });
        it('should accept 2D array input', function () {
            var result = Matrix.mul([[-6]], 5);
            result[0][0].should.equal(-30);
        });
        it('should return a Matrix instance', function () {
            var result = Matrix.mul([[-6]], 5);
            result.should.be.instanceOf(Matrix);
        });
        it('or', function () {
            Matrix.or(matrix, 10).to2DArray().should.eql([
                [10, 11, 10],
                [11, -2, -5],
                [-6, -5, -6]
            ]);
        });
    });

});
