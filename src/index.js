export { AbstractMatrix, default, default as Matrix } from './matrix';
export * from './views/index';

export { wrap } from './wrap/wrap';
export { default as WrapperMatrix1D } from './wrap/WrapperMatrix1D';
export { default as WrapperMatrix2D } from './wrap/WrapperMatrix2D';

export { solve, inverse } from './decompositions';
export { determinant } from './determinant';
export { linearDependencies } from './linearDependencies';
export { pseudoInverse } from './pseudoInverse';

export {
  default as SingularValueDecomposition,
  default as SVD
} from './dc/svd.js';
export {
  default as EigenvalueDecomposition,
  default as EVD
} from './dc/evd.js';
export {
  default as CholeskyDecomposition,
  default as CHO
} from './dc/cholesky.js';
export { default as LuDecomposition, default as LU } from './dc/lu.js';
export { default as QrDecomposition, default as QR } from './dc/qr.js';
