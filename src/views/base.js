'use strict';

var abstractMatrix = require('../abstractMatrix');
var Matrix;

class BaseView extends abstractMatrix() {
    constructor(matrix, rows, columns) {
        super();
        this.matrix = matrix;
        this.rows = rows;
        this.columns = columns;
    }

    static get [Symbol.species]() {
        if (!Matrix) {
            Matrix = require('../matrix');
        }
        return Matrix;
    }
}

module.exports = BaseView;
