'use strict';

var Matrix = require('..');

exports.getSquareArray = function getSquareArray() {
    return [
        [9, 13, 5],
        [1, 11, 7],
        [2, 6, 3]
    ];
};

exports.getSquareMatrix = function getSquareMatrix() {
    return new Matrix(exports.getSquareArray());
};
