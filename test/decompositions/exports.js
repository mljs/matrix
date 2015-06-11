'use strict';

var Matrix = require('../..');
var DC = Matrix.DC;

describe('Package exports', function () {
    it('should export full and short names', function () {
        Matrix.Decompositions.should.equal(Matrix.DC);
        DC.LuDecomposition.should.equal(DC.LU);
        DC.QrDecomposition.should.equal(DC.QR);
        DC.SingularValueDecomposition.should.equal(DC.SVD);
        DC.EigenvalueDecomposition.should.equal(DC.EVD);
        DC.CholeskyDecomposition.should.equal(DC.CHO);
    });
});
