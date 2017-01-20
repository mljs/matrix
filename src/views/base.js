import AbstractMatrix from '../abstractMatrix';
import Matrix from '../matrix';

export default class BaseView extends AbstractMatrix() {
    constructor(matrix, rows, columns) {
        super();
        this.matrix = matrix;
        this.rows = rows;
        this.columns = columns;
    }

    static get [Symbol.species]() {
        return Matrix;
    }
}
