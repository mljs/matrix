import 'should';

import Matrix from '../../src';
import MatrixTransposeView from '../../src/views/transpose';
import * as util from '../../test/util';

describe('Matrix creation', function () {
    it('should create a new object', function () {
        var array = util.getSquareArray();
        var matrix = new Matrix(array);
        matrix.should.not.equal(array);
    });

    it('should extend Array', function () {
        var array = util.getSquareArray();
        var matrix = new Matrix(array);
        matrix.should.be.instanceof(Matrix);
        matrix.should.be.instanceof(Array);
        Matrix.isMatrix(matrix).should.be.true();
        Array.isArray(matrix).should.be.true();
    });

    it('should clone existing matrix', function () {
        var original = util.getSquareMatrix();
        var matrix = new Matrix(original);
        matrix.should.not.equal(original);
        matrix.should.eql(original);
    });

    it('should create an empty matrix', function () {
        var matrix = new Matrix(3, 9);
        matrix.rows.should.equal(3);
        matrix.columns.should.equal(9);
        expect(matrix[0][0]).toEqual(undefined);
    });

    it('should throw with wrong arguments', function () {
        (() => new Matrix(6, -1)).should.throw(TypeError, /^nColumns must be a positive integer/);
        (() => new Matrix(0, 0)).should.throw(TypeError, /^First argument must be a positive number or an array$/);
        (() => new Matrix([[]])).should.throw(TypeError, /^Data must be a 2D array with at least one element$/);
        (() => new Matrix([0, 1, 2, 3])).should.throw(TypeError, /^Data must be a 2D array/);
        (() => new Matrix([[0, 1], [0, 1, 2]])).should.throw(RangeError, /^Inconsistent array dimensions$/);
        (() => new Matrix()).should.throw(TypeError, /^First argument must be a positive number or an array$/);
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
        (function () {
            Matrix.checkMatrix();
        }).should.throw(TypeError, /^Argument has to be a matrix$/);
    });

    it('should create a matrix from 1D array', function () {
        var matrix = Matrix.from1DArray(3, 2, [0, 1, 2, 3, 4, 5]);
        matrix.rows.should.exactly(3);
        matrix.columns.should.exactly(2);
        (function () {
            Matrix.from1DArray(3, 2, [0, 1, 2, 3]);
        }).should.throw(RangeError, /^Data length does not match given dimensions$/);
    });

    it('row vector', function () {
        var vector = Matrix.rowVector([0, 1, 2, 3]);
        vector.rows.should.equal(1);
        vector.columns.should.equal(4);
        vector.to2DArray().should.eql([[0, 1, 2, 3]]);
    });

    it('column vector', function () {
        var vector = Matrix.columnVector([0, 1, 2, 3]);
        vector.rows.should.equal(4);
        vector.columns.should.equal(1);
        vector.to2DArray().should.eql([[0], [1], [2], [3]]);
    });

    it('empty', function () {
        Matrix.empty(3, 3).should.eql(new Matrix(3, 3));
    });

    it('zeros', function () {
        Matrix.zeros(2, 3).to2DArray().should.eql([[0, 0, 0], [0, 0, 0]]);
    });

    it('ones', function () {
        Matrix.ones(2, 3).to2DArray().should.eql([[1, 1, 1], [1, 1, 1]]);
    });

    it('random', function () {
        var random = Matrix.rand(2, 3);
        var random2 = Matrix.rand(2, 3);
        random.to2DArray().should.not.eql(random2.to2DArray());
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 3; j++) {
                random[i][j].should.be.within(0, 1);
            }
        }
    });

    it('random with custom RNG', function () {
        var fakeRNG = () => 2;
        Matrix.rand(2, 2, fakeRNG).to2DArray().should.eql([[2, 2], [2, 2]]);
    });

    it('eye/identity', function () {
        var eye1 = Matrix.eye(3);
        eye1.should.eql(Matrix.identity(3));
        eye1.to2DArray().should.eql([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

        var eye2 = Matrix.eye(3, 2);
        eye2.to2DArray().should.eql([[1, 0], [0, 1], [0, 0]]);
    });

    it('eye with other value than 1', function () {
        var eye1 = Matrix.eye(3, 3, 3);
        eye1.to2DArray().should.eql([[3, 0, 0], [0, 3, 0], [0, 0, 3]]);
    });

    it('diag/diagonal', function () {
        var arr = [1, 2, 3];
        var diag = Matrix.diag(arr);
        diag.should.eql(Matrix.diagonal(arr));
        diag.to2DArray().should.eql([[1, 0, 0], [0, 2, 0], [0, 0, 3]]);

        Matrix.diag(arr, 2).to2DArray().should.eql([[1, 0], [0, 2]]);
        Matrix.diag(arr, 2, 4).to2DArray().should.eql([[1, 0, 0, 0], [0, 2, 0, 0]]);
        Matrix.diag(arr, 4, 4).to2DArray().should.eql([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 0]]);
    });

    it('regression test for Symbol.species (V8 5.1)', function () {
        var matrix = Matrix.ones(1, 2);
        matrix.map(() => 1).should.eql([1]);
    });

    it('Symbol.species should work for views', function () {
        var matrix = new Matrix([[1, 1, 1], [1, 1, 1]]);
        var view = matrix.transposeView();
        matrix.transpose().mmul(matrix).should.eql(view.mmul(matrix));
    });

    it('Symbol.species should work on static evaluated methods', function () {
        var a = [[1, 2]];
        var b = [[3, 1]];
        Matrix.subtract(a, b).to2DArray().should.eql([[-2, 1]]);
        MatrixTransposeView.subtract(a, b).to2DArray().should.eql([[-2, 1]]);
    });
});
