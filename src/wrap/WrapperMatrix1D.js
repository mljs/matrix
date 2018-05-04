import AbstractMatrix from '../abstractMatrix';
import Matrix from '../matrix';

export default class WrapperMatrix1D extends AbstractMatrix() {
  /**
   * @class WrapperMatrix1D
   * @param {Array<number>} data
   * @param {object} [options]
   * @param {object} [options.rows = 1]
   */
  constructor(data, options = {}) {
    const { rows = 1 } = options;

    if (data.length % rows !== 0) {
      throw new Error('the data length is not divisible by the number of rows');
    }
    super();
    this.rows = rows;
    this.columns = data.length / rows;
    this.data = data;
  }

  set(rowIndex, columnIndex, value) {
    var index = this._calculateIndex(rowIndex, columnIndex);
    this.data[index] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    var index = this._calculateIndex(rowIndex, columnIndex);
    return this.data[index];
  }

  _calculateIndex(row, column) {
    return row * this.columns + column;
  }

  static get [Symbol.species]() {
    return Matrix;
  }
}
