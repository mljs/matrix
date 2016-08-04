'use strict';

var BaseView = require('./base');
var util = require('../util');

class MatrixSubView extends BaseView {
    constructor(matrix, rowIndices, columnIndices, startColumn, endColumn) {
        var rowI, columnI;
        if(typeof rowIndices === 'number') {
            var startRow = rowIndices, endRow = columnIndices;
            util.checkRange(matrix, startRow, endRow, startColumn, endColumn);
            rowI = util.getRange(startRow, endRow);
            columnI = util.getRange(startColumn, endColumn);
        } else {
            var indices = util.checkIndices(matrix, rowIndices, columnIndices);
            rowI = indices.row;
            columnI = indices.column;
        }
        super(matrix, rowI.length, columnI.length);
        this.rowIndices = rowI;
        this.columnIndices = columnI;
    }

    set(rowIndex, columnIndex, value) {
        this.matrix.set(this.rowIndices[rowIndex], this.columnIndices[columnIndex] , value);
        return this;
    }

    get(rowIndex, columnIndex) {
        return this.matrix.get(this.rowIndices[rowIndex], this.columnIndices[columnIndex]);
    }
}

module.exports = MatrixSubView;
