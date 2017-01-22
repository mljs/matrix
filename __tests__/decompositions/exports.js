import 'should';

import {
    LuDecomposition, LU,
    QrDecomposition, QR,
    SingularValueDecomposition, SVD,
    EigenvalueDecomposition, EVD,
    CholeskyDecomposition, CHO
} from '../../src';

describe('Decompositions exports', function () {
    it('should export full and short names', function () {
        LuDecomposition.should.equal(LU);
        QrDecomposition.should.equal(QR);
        SingularValueDecomposition.should.equal(SVD);
        EigenvalueDecomposition.should.equal(EVD);
        CholeskyDecomposition.should.equal(CHO);
    });
});
