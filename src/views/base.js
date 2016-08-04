'use strict';

var abstractMatrix = require('../abstractMatrix');

class BaseView extends abstractMatrix() {
    constructor(matrix, rows, columns) {
        super();
        this.matrix = matrix;
        this.rows = rows;
        this.columns = columns;
    }

    // Native array methods should return instances of Array, not Matrix
    static get[Symbol.species]() {
        return require('../matrix');
    }
}

module.exports = BaseView;
