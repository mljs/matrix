'use strict';

var Matrix = require('../..');
var EVD = Matrix.DC.EVD;

describe('Eigenvalue decomposition', function () {
    it('simple example', function () {
        var matrix = new Matrix([[1, 0], [1, 3]]);
        var evd = new EVD(matrix);
        evd.realEigenvalues.should.eql([1, 3]);
        evd.diagonalMatrix.to2DArray().should.eql([[1, 0], [0, 3]]);
    });
});
