import { AbstractMatrix } from '../matrix.js';

export default class BaseView extends AbstractMatrix {
  constructor(matrix, rows, columns) {
    super();
    this.matrix = matrix;
    this.rows = rows;
    this.columns = columns;
  }
}
