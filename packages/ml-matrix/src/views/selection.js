import BaseView from './base';
import {checkIndices} from '../util';

export default class MatrixSelectionView extends BaseView {
    constructor(matrix, rowIndices, columnIndices) {
        var indices = checkIndices(matrix, rowIndices, columnIndices);
        super(matrix, indices.row.length, indices.column.length);
        this.rowIndices = indices.row;
        this.columnIndices = indices.column;
    }

    set(rowIndex, columnIndex, value) {
        this.matrix.set(this.rowIndices[rowIndex], this.columnIndices[columnIndex], value);
        return this;
    }

    get(rowIndex, columnIndex) {
        return this.matrix.get(this.rowIndices[rowIndex], this.columnIndices[columnIndex]);
    }
}
