'use strict';

var Matrix = require('../..');

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

});
