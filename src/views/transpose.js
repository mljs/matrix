'use strict';

var abstractMatrix = require('../abstractMatrix');

class MatrixTransposeView extends abstractMatrix() {
    constructor(matrix) {
        super();
        this.matrix = matrix;
        this.rows = matrix.columns;
        this.columns = matrix.rows;
    }

    set(rowIndex, columnIndex, value) {
        this.matrix.set(columnIndex, rowIndex, value);
        return this;
    }

    get(rowIndex, columnIndex) {
        return this.matrix.get(columnIndex, rowIndex);
    }
}

module.exports = MatrixTransposeView;
