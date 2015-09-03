'use strict';

var Matrix = require('../..');

describe('Matrix#abs', function () {

    var matrix;

    beforeEach(function () {
        matrix = new Matrix([
            [0, 1, 2],
            [3, -4, -5],
            [-6, -7, -8],
            [4.39, -0.61, -12.7]
        ]);
    });

    it('should convert all elements to absolute value (in-place)', function () {
        matrix.abs();
        matrix.to2DArray().should.eql([
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [4.39, 0.61, 12.7]
        ]);
    });

    it('should return instance', function () {
        matrix.abs().should.equal(matrix);
    });

});
