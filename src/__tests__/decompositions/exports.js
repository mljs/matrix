import {
    LuDecomposition, LU,
    QrDecomposition, QR,
    SingularValueDecomposition, SVD,
    EigenvalueDecomposition, EVD,
    CholeskyDecomposition, CHO
} from '../..';

describe('Decompositions exports', () => {
    it('should export full and short names', () => {
        expect(LuDecomposition).toEqual(LU);
        expect(QrDecomposition).toEqual(QR);
        expect(SingularValueDecomposition).toEqual(SVD);
        expect(EigenvalueDecomposition).toEqual(EVD);
        expect(CholeskyDecomposition).toEqual(CHO);
    });
});
