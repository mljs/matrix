import BaseView from './base';
import {checkColumnIndices} from '../util';

export default class MatrixColumnSelectionView extends BaseView {
    constructor(matrix, columnIndices) {
        columnIndices = checkColumnIndices(matrix, columnIndices);
        super(matrix, matrix.rows, columnIndices.length);
        this.columnIndices = columnIndices;
    }

    set(rowIndex, columnIndex, value) {
        this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);
        return this;
    }

    get(rowIndex, columnIndex) {
        return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);
    }
}
