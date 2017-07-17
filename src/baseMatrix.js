import AbstractMatrix from './abstractMatrix';

export default class BaseMatrix extends AbstractMatrix() {
    constructor(data) {
        super();
        this.data = data;
    }

    set(rowIndex, columnIndex, value) {
        this.data[rowIndex][columnIndex] = value;
        return this;
    }

    get(rowIndex, columnIndex) {
        return this.data[rowIndex][columnIndex];
    }
}