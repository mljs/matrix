import BaseView from './base';
import {checkRowIndices} from '../util';

export default class MatrixRowSelectionView extends BaseView {
    constructor(matrix, rowIndices) {
        rowIndices = checkRowIndices(matrix, rowIndices);
        super(matrix, rowIndices.length, matrix.columns);
        this.rowIndices = rowIndices;
    }

    set(rowIndex, columnIndex, value) {
        this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);
        return this;
    }

    get(rowIndex, columnIndex) {
        return this.matrix.get(this.rowIndices[rowIndex], columnIndex);
    }
}
