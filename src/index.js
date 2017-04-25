export {default as default, default as Matrix} from './matrix';
export {default as abstractMatrix} from './abstractMatrix';

export {solve, inverse} from './decompositions';
export {default as SingularValueDecomposition, default as SVD} from './dc/svd.js';
export {default as EigenvalueDecomposition, default as EVD} from './dc/evd.js';
export {default as CholeskyDecomposition, default as CHO} from './dc/cholesky.js';
export {default as LuDecomposition, default as LU} from './dc/lu.js';
export {default as QrDecomposition, default as QR} from './dc/qr.js';
