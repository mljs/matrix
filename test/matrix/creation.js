'use strict';

var Matrix = require('../../');

function getSquareMatrix() {
    return [
        [9, 13, 5],
        [1, 11, 7],
        [2, 6, 3]
    ];
}

describe('Matrix creation', function () {
    describe('New matrix without clone', function() {
        var matrix = getSquareMatrix();
        var newMatrix = new Matrix(matrix);
        it('should change original prototype', function () {
            newMatrix.should.equal(matrix);
        });
    });
});