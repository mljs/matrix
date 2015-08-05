'use strict';

var Matrix = require('../../');
var util = require('../util');

describe('utility methods', function () {
    var matrix;
    beforeEach(function () {
        matrix = util.getSquareMatrix();
    });

    it('clone', function () {
        var clone = matrix.clone();
        clone.should.not.equal(matrix);
        clone.should.eql(matrix);
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
});
