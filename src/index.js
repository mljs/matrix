export { AbstractMatrix, default, default as Matrix } from './matrix.js';
export * from './views/index.js';

export { wrap } from './wrap/wrap.js';
export { default as WrapperMatrix1D } from './wrap/WrapperMatrix1D.js';
export { default as WrapperMatrix2D } from './wrap/WrapperMatrix2D.js';

export { solve, inverse } from './decompositions.js';
export { determinant } from './determinant.js';
export { linearDependencies } from './linearDependencies.js';
export { pseudoInverse } from './pseudoInverse.js';
export { covariance } from './covariance.js';
export { correlation } from './correlation.js';

export {
  default as SingularValueDecomposition,
  default as SVD,
} from './dc/svd.js';
export {
  default as EigenvalueDecomposition,
  default as EVD,
} from './dc/evd.js';
export {
  default as CholeskyDecomposition,
  default as CHO,
} from './dc/cholesky.js';
export { default as LuDecomposition, default as LU } from './dc/lu.js';
export { default as QrDecomposition, default as QR } from './dc/qr.js';
export { default as Nipals, default as NIPALS } from './dc/nipals.js';
