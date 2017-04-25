import Matrix from './matrix';

export default Matrix;

import abstractMatrix from './abstractMatrix';
Matrix.abstractMatrix = abstractMatrix;

import {solve, inverse} from './decompositions';
import {default as SingularValueDecomposition, default as SVD} from './dc/svd.js';
import {default as EigenvalueDecomposition, default as EVD} from './dc/evd.js';
import {default as CholeskyDecomposition, default as CHO} from './dc/cholesky.js';
import {default as LuDecomposition, default as LU} from './dc/lu.js';
import {default as QrDecomposition, default as QR} from './dc/qr.js';

Matrix.inverse = Matrix.inv = inverse;
Matrix.prototype.inverse = Matrix.prototype.inv = function () {
    return inverse(this);
};

Matrix.solve = solve;
Matrix.prototype.solve = function (other) {
    return solve(this, other);
};

const DC = {
    SingularValueDecomposition,
    SVD,
    EigenvalueDecomposition,
    EVD,
    LuDecomposition,
    LU,
    QrDecomposition,
    QR,
    CholeskyDecomposition,
    CHO,
    inverse,
    solve
};
Matrix.Decompositions = Matrix.DC = DC;
