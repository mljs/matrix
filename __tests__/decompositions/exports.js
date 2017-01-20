import 'should';

import {DC, Decompositions} from '../../src';

describe('Package exports', function () {
    it('should export full and short names', function () {
        Decompositions.should.equal(DC);
        DC.LuDecomposition.should.equal(DC.LU);
        DC.QrDecomposition.should.equal(DC.QR);
        DC.SingularValueDecomposition.should.equal(DC.SVD);
        DC.EigenvalueDecomposition.should.equal(DC.EVD);
        DC.CholeskyDecomposition.should.equal(DC.CHO);
    });
});
