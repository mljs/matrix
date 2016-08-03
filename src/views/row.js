'use strict';

var abstractMatrix = require('../abstractMatrix');

class MatrixRowView extends abstractMatrix() {
    constructor(matrix, row) {
        super();
        this.matrix = matrix;
        this.row = row;
        this.rows = 1;
        this.columns = matrix.columns;
    }

    set(rowIndex, columnIndex, value) {
        this.matrix.set(this.row, columnIndex, value);
        return this;
    }

    get(rowIndex, columnIndex) {
        return this.matrix.get(this.row, columnIndex);
    }
}

module.exports = MatrixRowView;
