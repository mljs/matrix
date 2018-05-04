import AbstractMatrix from '../abstractMatrix';
import Matrix from '../matrix';

export default class WrapperMatrix2D extends AbstractMatrix() {
  /**
   * @class WrapperMatrix2D
   * @param {Array<Array<number>>} data
   */
  constructor(data) {
    super();
    this.data = data;
    this.rows = data.length;
    this.columns = data[0].length;
  }

  set(rowIndex, columnIndex, value) {
    this.data[rowIndex][columnIndex] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.data[rowIndex][columnIndex];
  }

  static get [Symbol.species]() {
    return Matrix;
  }
}
