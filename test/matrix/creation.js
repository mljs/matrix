'use strict';

var Matrix = require('../../');
var util = require('../util');

describe('Matrix creation', function () {
    it('should change original prototype', function () {
        var array = util.getSquareArray();
        var matrix = new Matrix(array);
        matrix.should.equal(array);
        Matrix.isMatrix(matrix).should.be.true;
    });
    it('should create a new array if asked', function () {
        var array = util.getSquareArray();
        var matrix = new Matrix(array, true);
        matrix.should.not.equal(array);
    });
    it('should throw with wrong arguments', function () {
        Matrix.bind(null, 0).should.throw(Matrix.MatrixError, /^Invalid dimensions: 0xundefined$/);
        Matrix.bind(null, [[]]).should.throw(Matrix.MatrixError, /^Invalid dimensions: 1x0$/);
        Matrix.bind(null, [0, 1, 2, 3]).should.throw(Matrix.MatrixError, /^Data must be a 2D array$/);
        Matrix.bind(null, [[0, 1], [0, 1, 2]]).should.throw(Matrix.MatrixError, /^Inconsistent array dimensions$/);
        Matrix.bind(null).should.throw(Matrix.MatrixError, /^Invalid arguments$/);
    });
    it('should correctly set rows, columns and values', function () {
        var matrix = util.getSquareMatrix();
        matrix.rows.should.exactly(3);
        matrix.columns.should.exactly(3);
        matrix[1][2].should.exactly(7);
    });
    it('should correctly check if argument is a matrix', function () {
        var array = util.getSquareArray();
        var matrix = Matrix.checkMatrix(array);
        Matrix.isMatrix(matrix).should.be.true;
        var check2 = Matrix.checkMatrix(matrix);
        check2.should.exactly(matrix);
        (function() {
            Matrix.checkMatrix();
        }).should.throw(Matrix.MatrixError, /^Argument has to be a matrix$/);
    });
    it('should create a matrix from 1D array', function () {
        var matrix = Matrix.from1DArray(3, 2, [0, 1, 2, 3, 4, 5]);
        matrix.rows.should.exactly(3);
        matrix.columns.should.exactly(2);
        (function () {
            var matrix = Matrix.from1DArray(3, 2, [0, 1, 2, 3]);
        }).should.throw(Matrix.MatrixError, /^Data length does not match given dimensions$/);
    });
});