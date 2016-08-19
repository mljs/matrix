'use strict';

var Matrix = require('../../');
var util = require('../util');

describe('utility methods', function () {
    var matrix;
    beforeEach(function () {
        matrix = util.getSquareMatrix();
    });

    it('isMatrix', function () {
        function notAMatrix(val) {
            Matrix.isMatrix(val).should.be.false();
        }

        notAMatrix();
        notAMatrix(1);
        notAMatrix('string');
        notAMatrix(null);
        notAMatrix(new Array(6));
        notAMatrix([[]]);
        notAMatrix([[1, 2], [3, 4]]);

        Matrix.isMatrix(new Matrix(4, 4)).should.be.true();
        Matrix.isMatrix(Matrix.ones(4, 4)).should.be.true();
    });

    it('size', function () {
        new Matrix(3, 4).size.should.equal(12);
        new Matrix(5, 5).size.should.equal(25);
    });

    it('apply', function () {
        var matrix = Matrix.ones(6, 5);
        matrix[0][0] = 10;
        var called = 0;

        function cb(i, j) {
            called++;
            this.should.be.instanceOf(Matrix);
            if (called === 1) {
                this[i][j].should.equal(10);
            } else if (called === 30) {
                this[i][j] = 20;
            }
        }

        matrix.apply(cb);
        matrix[5][4].should.equal(20);
        called.should.equal(30);
    });

    it('clone', function () {
        var clone = matrix.clone();
        clone.should.not.equal(matrix);
        clone.should.eql(matrix);
        clone.should.be.instanceOf(Matrix);
        Matrix.isMatrix(clone).should.be.true();
    });

    it('to1DArray', function () {
        var matrix = util.getSquareMatrix();
        var array = matrix.to1DArray();
        array.should.be.an.Array().with.lengthOf(9);
        array.should.eql([9, 13, 5, 1, 11, 7, 2, 6, 3]);
        array.should.not.be.instanceOf(Matrix);
        Matrix.isMatrix(array).should.be.false();
    });

    it('to2DArray', function () {
        var matrix = util.getSquareMatrix();
        var array = matrix.to2DArray();
        array.should.eql(util.getSquareArray());
        array.should.be.an.Array().with.lengthOf(3);
        array[0].should.be.an.Array().with.lengthOf(3);
        array.should.not.be.instanceOf(Matrix);
        Matrix.isMatrix(array).should.be.false();
    });

    it('transpose square', function () {
        var transpose = matrix.transpose();
        transpose[0][0].should.equal(matrix[0][0]);
        transpose[1][0].should.equal(matrix[0][1]);
        transpose[2][1].should.equal(matrix[1][2]);
    });

    it('transpose rectangular', function () {
        var matrix = new Matrix([[0, 1, 2], [3, 4, 5]]);
        var transpose = matrix.transpose();
        transpose[0][0].should.equal(matrix[0][0]);
        transpose[1][0].should.equal(matrix[0][1]);
        transpose[2][1].should.equal(matrix[1][2]);
        transpose.rows.should.equal(3);
        transpose.columns.should.equal(2);
    });

    it('scale rows', function () {
        var matrix = new Matrix([[-1, 0, 1], [6, 9, 7]]);
        matrix.scaleRows().to2DArray().should.eql([[0, 1 / 2, 1], [0, 1, 1 / 3]]);
        matrix.scaleRows(1, 2).to2DArray().should.eql([[1, 3 / 2, 2], [1, 2, 4 / 3]]);
        matrix.scaleRows(-2, -1).to2DArray().should.eql([[-2, -3 / 2, -1], [-2, -1, -5 / 3]]);
        (function () {
            matrix.scaleRows(2, 1);
        }).should.throw(/min should be strictly smaller than max/);
    });

    it('scale columns', function () {
        var matrix = new Matrix([[1, 2], [-5, 3], [2, 4]]);
        matrix.scaleColumns().to2DArray().should.eql([[6 / 7, 0], [0, 1 / 2], [1, 1]]);
        matrix.scaleColumns(1, 2).to2DArray().should.eql([[13 / 7, 1], [1, 3 / 2], [2, 2]]);
        matrix.scaleColumns(-2, -1).to2DArray().should.eql([[-8 / 7, -2], [-2, -3 / 2], [-1, -1]]);
        (function () {
            matrix.scaleColumns(2, 1);
        }).should.throw(/min should be strictly smaller than max/);
    });

    it('set sub matrix', function () {
        var matrix = new Matrix([[1, 2], [-5, 3], [2, 4]]);
        matrix.setSubMatrix([[1, 2]], 1, 0).to2DArray().should.eql([[1, 2], [1, 2], [2, 4]]);
        matrix.setSubMatrix([[10], [10]], 1, 1).to2DArray().should.eql([[1, 2], [1, 10], [2, 10]]);
        (function () {
            matrix.setSubMatrix([[1, 2]], 1, 1);
        }).should.throw(/Argument out of range/);
    });

    it('selection matrix', function () {
        var matrix = new Matrix([[1, 2], [-5, 3], [2, 4]]);
        var selMatrix = matrix.selection([2,1], [1]);
        selMatrix.to2DArray().should.eql([[4],[3]]);
    });

    it('repeat matrix', function () {
        var matrix = new Matrix([[1, 2], [3, 4]]);
        matrix.repeat().to2DArray().should.eql([[1, 2], [3, 4]]);
        matrix.repeat(2, 2).to2DArray().should.eql([[1, 2, 1, 2], [3, 4, 3, 4], [1, 2, 1, 2], [3, 4, 3, 4]]);
        matrix.repeat(1, 2).to2DArray().should.eql([[1, 2, 1, 2], [3, 4, 3, 4]]);
    });

    it('mmul strassen', function (){
        var matrix = new Matrix([[2,4],[7,1]]);
        var matrix2 = new Matrix([[2,1],[1,1]]);
        matrix.mmul_strassen(matrix2).to2DArray().should.eql([[8,6], [15,8]]);
    });

    it('mmul 2x2 and 3x3', function (){
        var matrix = new Matrix([[2,4],[7,1]]);
        var matrix2 = new Matrix([[2,1],[1,1]]);
        matrix.strassen_2x2(matrix2).to2DArray().should.eql([[8,6], [15,8]]);

        matrix = new Matrix([[2,4,1],[7,1,2],[5,1,3]]);
        matrix2 = new Matrix([[2,1,3],[7,1,1],[6,2,7]]);
        matrix.strassen_3x3(matrix2).to2DArray().should.eql([[38,8,17],[33,12,36],[35,12,37]]);
    });
});
