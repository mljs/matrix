'use strict';

var Matrix = require('../../');
var util = require('../util');

describe('Matrix creation', function () {
    it('should create a new object', function () {
        var array = util.getSquareArray();
        var matrix = new Matrix(array);
        matrix.should.not.equal(array);
    });
    it('should extend Array', function () {
        var array = util.getSquareArray();
        var matrix = new Matrix(array);
        Matrix.isMatrix(matrix).should.be.true();
        matrix.should.be.instanceof(Matrix);
        matrix.should.be.instanceof(Array);
        Array.isArray(matrix).should.be.true();
    });
    it('should create a new array if asked', function () {
        var array = util.getSquareArray();
        var matrix = new Matrix(array, true);
        matrix.should.not.equal(array);
    });
    it('should throw with wrong arguments', function () {
        (function(){ new Matrix(0) }).should.throw(TypeError, /^First argument must be a positive number or an array$/);
        (function(){ new Matrix([[]]) }).should.throw(TypeError, /^Data must be a 2D array with at least one element$/);
        (function(){ new Matrix([0, 1, 2, 3]) }).should.throw(TypeError, /^Data must be a 2D array/);
        (function(){ new Matrix([[0, 1], [0, 1, 2]]) }).should.throw(RangeError, /^Inconsistent array dimensions$/);
        (function(){ new Matrix() }).should.throw(TypeError, /^First argument must be a positive number or an array$/);
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
        Matrix.isMatrix(matrix).should.be.true();
        var check2 = Matrix.checkMatrix(matrix);
        check2.should.exactly(matrix);
        (function() {
            Matrix.checkMatrix();
        }).should.throw(TypeError, /^Argument has to be a matrix$/);
    });
    it('should create a matrix from 1D array', function () {
        var matrix = Matrix.from1DArray(3, 2, [0, 1, 2, 3, 4, 5]);
        matrix.rows.should.exactly(3);
        matrix.columns.should.exactly(2);
        (function () {
            var matrix = Matrix.from1DArray(3, 2, [0, 1, 2, 3]);
        }).should.throw(RangeError, /^Data length does not match given dimensions$/);
    });
});
