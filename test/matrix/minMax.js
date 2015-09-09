'use strict';

var Matrix = require('../..');

describe('min - max', function () {
    var matrix1 = new Matrix([[0, 1, 2], [3, 4, 5]]);
    var matrix2 = new Matrix([[3, 0, 2], [-6, 2, 12]]);

    it('min', function () {
        Matrix.min(matrix1, matrix2).to2DArray().should.eql([[0, 0, 2], [-6, 2, 5]]);
    });

    it('max', function () {
        Matrix.max(matrix1, matrix2).to2DArray().should.eql([[3, 1, 2], [3, 4, 12]]);
    });
});
