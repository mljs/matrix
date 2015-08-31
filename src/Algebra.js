/**
 * Created by acastillo on 8/24/15.
 */
/**
 * Non in-place function definitions, compatible with mathjs code *
 */

'use strict';

var Matrix = require('ml-matrix');

function matrix(A,B){
    return new Matrix(A,B);
}

function ones(rows, cols){
    return Matrix.ones(rows,cols);
}

function eye(rows, cols){
    return Matrix.eye(rows, cols);
}

function zeros(rows, cols){
    return Matrix.zeros(rows, cols);
}

function random(rows, cols){
    console.log(rows +" "+cols);
    return Matrix.rand(rows,cols);
}

function transpose(A){
    if(typeof A == 'number')
        return A;
    var result = A.clone();
    return result.transpose();
}

function add(A, B){
    if(typeof A == 'number'&&typeof B === 'number')
        return A+B;
    if(typeof A == 'number')
        return this.add(B,A);

    var result = A.clone();
    return result.add(B);

}

function subtract(A, B){
    if(typeof A == 'number'&&typeof B === 'number')
        return A-B;
    if(typeof A == 'number')
        return this.subtract(B,A);
    var result = A.clone();
    return result.sub(B);
}

function multiply(A, B){
    if(typeof A == 'number'&&typeof B === 'number')
        return A*B;
    if(typeof A == 'number')
        return this.multiply(B,A);

    var result = A.clone();

    if(typeof B === 'number')
        result.mul(B);
    else
        result = result.mmul(B);

    if(result.rows==1&&result.columns==1)
        return result[0][0];
    else
        return result;

}

function dotMultiply(A, B){
    var result = A.clone();
    return result.mul(B);
}

function dotDivide(A, B){
    var result = A.clone();
    return result.div(B);
}

function diag(A){
    var diag = null;
    var rows = A.rows, cols = A.columns, j, r;
    //It is an array
    if(typeof cols === "undefined" && (typeof A)=='object'){
        if(A[0]&&A[0].length){
            rows = A.length;
            cols = A[0].length;
            r = Math.min(rows,cols);
            diag = new Matrix.zeros(cols, cols);
            for (j = 0; j < cols; j++) {
                diag[j][j]=A[j][j];
            }
        }
        else{
            cols = A.length;
            diag = new Matrix.zeros(cols, cols);
            for (j = 0; j < cols; j++) {
                diag[j][j]=A[j];
            }
        }

    }
    if(rows == 1){
        diag = new Matrix.zeros(cols, cols);
        for (j = 0; j < cols; j++) {
            diag[j][j]=A[0][j];
        }
    }
    else{
        if(rows>0 && cols > 0){
            r = Math.min(rows,cols);
            diag = new Array(r);
            for (j = 0; j < r; j++) {
                diag[j] = A[j][j];
            }
        }
    }
    return diag;
}

function min(A, B){
    if(typeof A==='number' && typeof B ==='number')
        return Math.min(A,B);
    var ii = A.rows, jj = A.columns;
    var result = new Matrix(ii,jj);
    for (var i = 0; i < ii; i++) {
        for (var j = 0; j < jj; j++) {
            if (A[i][j] < B[i][j]) {
                result[i][j] = A[i][j];
            }
            else{
                result[i][j] = B[i][j];
            }
        }
    }
    return result;
}

function max(A, B){
    if(typeof A==='number' && typeof B ==='number')
        return Math.max(A,B);
    var ii = A.rows, jj = A.columns;
    var result = new Matrix(ii,jj);
    for (var i = 0; i < ii; i++) {
        for (var j = 0; j < jj; j++) {
            if (A[i][j] > B[i][j]) {
                result[i][j] = A[i][j];
            }
            else{
                result[i][j] = B[i][j];
            }
        }
    }
    return result;
}

function sqrt(A){
    if(typeof A==='number' )
        return Math.sqrt(A);
    var ii = A.rows, jj = A.columns;
    var result = new Matrix(ii,jj);
    for (var i = 0; i < ii; i++) {
        for (var j = 0; j < jj; j++) {
            result[i][j] = Math.sqrt(A[i][j]);

        }
    }
    return result;
}

function abs(A){
    if(typeof A==='number' )
        return Math.abs(A);
    var ii = A.rows, jj = A.columns;
    var result = new Matrix(ii,jj);
    for (var i = 0; i < ii; i++) {
        for (var j = 0; j < jj; j++) {
            result[i][j] = Math.abs(A[i][j]);

        }
    }
    return result;
}

function exp(A){
    if(typeof A==='number' )
        return Math.sqrt(A);
    var ii = A.rows, jj = A.columns;
    var result = new Matrix(ii,jj);
    for (var i = 0; i < ii; i++) {
        for (var j = 0; j < jj; j++) {
            result[i][j] = Math.exp(A[i][j]);
        }
    }
    return result;
}

function dotPow(A, b){
    if(typeof A==='number' )
        return Math.pow(A,b);
    //console.log(A);
    var ii = A.rows, jj = A.columns;
    var result = new Matrix(ii,jj);
    for (var i = 0; i < ii; i++) {
        for (var j = 0; j < jj; j++) {
            result[i][j] = Math.pow(A[i][j],b);
        }
    }
    return result;
}

function solve(A, B){
    return A.solve(B);
}

function inv(A){
    if(typeof A ==="number")
        return 1/A;
    return A.inverse();
}

module.exports = {
    transpose:transpose,
    add:add,
    subtract:subtract,
    multiply:multiply,
    dotMultiply:dotMultiply,
    dotDivide:dotDivide,
    diag:diag,
    min:min,
    max:max,
    solve:solve,
    inv:inv,
    sqrt:sqrt,
    exp:exp,
    dotPow:dotPow,
    abs:abs,
    matrix:matrix,
    ones:ones,
    zeros:zeros,
    random:random,
    eye:eye
};
