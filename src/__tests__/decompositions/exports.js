import {
  LuDecomposition,
  LU,
  QrDecomposition,
  QR,
  SingularValueDecomposition,
  SVD,
  EigenvalueDecomposition,
  EVD,
  CholeskyDecomposition,
  CHO,
} from '../..';

describe('Decompositions exports', () => {
  it('should export full and short names', () => {
    expect(LuDecomposition).toStrictEqual(LU);
    expect(QrDecomposition).toStrictEqual(QR);
    expect(SingularValueDecomposition).toStrictEqual(SVD);
    expect(EigenvalueDecomposition).toStrictEqual(EVD);
    expect(CholeskyDecomposition).toStrictEqual(CHO);
  });
});
