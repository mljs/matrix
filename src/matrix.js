import rescale from 'ml-array-rescale';

import {
  checkRowVector,
  checkRowIndex,
  checkColumnIndex,
  checkColumnVector,
  checkRange,
  checkIndices
} from './util';
import {
  sumByRow,
  sumByColumn,
  sumAll,
  productByRow,
  productByColumn,
  productAll,
  varianceByRow,
  varianceByColumn,
  varianceAll
} from './stat';
import { inspectMatrix } from './inspect';
import { installMathOperations } from './mathOperations';

export class AbstractMatrix {
  /**
   * Constructs a Matrix with the chosen dimensions from a 1D array
   * @param {number} newRows - Number of rows
   * @param {number} newColumns - Number of columns
   * @param {Array} newData - A 1D array containing data for the matrix
   * @return {Matrix} - The new matrix
   */
  static from1DArray(newRows, newColumns, newData) {
    var length = newRows * newColumns;
    if (length !== newData.length) {
      throw new RangeError('data length does not match given dimensions');
    }
    var newMatrix = new Matrix(newRows, newColumns);
    for (var row = 0; row < newRows; row++) {
      for (var column = 0; column < newColumns; column++) {
        newMatrix.set(row, column, newData[row * newColumns + column]);
      }
    }
    return newMatrix;
  }

  /**
   * Creates a row vector, a matrix with only one row.
   * @param {Array} newData - A 1D array containing data for the vector
   * @return {Matrix} - The new matrix
   */
  static rowVector(newData) {
    var vector = new Matrix(1, newData.length);
    for (var i = 0; i < newData.length; i++) {
      vector.set(0, i, newData[i]);
    }
    return vector;
  }

  /**
   * Creates a column vector, a matrix with only one column.
   * @param {Array} newData - A 1D array containing data for the vector
   * @return {Matrix} - The new matrix
   */
  static columnVector(newData) {
    var vector = new Matrix(newData.length, 1);
    for (var i = 0; i < newData.length; i++) {
      vector.set(i, 0, newData[i]);
    }
    return vector;
  }

  /**
   * Creates a matrix with the given dimensions. Values will be set to zero.
   * @param {number} rows - Number of rows
   * @param {number} columns - Number of columns
   * @return {Matrix} - The new matrix
   */
  static zeros(rows, columns) {
    return new Matrix(rows, columns);
  }

  /**
   * Creates a matrix with the given dimensions. Values will be set to one.
   * @param {number} rows - Number of rows
   * @param {number} columns - Number of columns
   * @return {Matrix} - The new matrix
   */
  static ones(rows, columns) {
    return new Matrix(rows, columns).fill(1);
  }

  /**
   * Creates a matrix with the given dimensions. Values will be randomly set.
   * @param {number} rows - Number of rows
   * @param {number} columns - Number of columns
   * @param {object} [options]
   * @param {function} [options.random=Math.random] - Random number generator
   * @return {Matrix} The new matrix
   */
  static rand(rows, columns, options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { random = Math.random } = options;
    var matrix = new Matrix(rows, columns);
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        matrix.set(i, j, random());
      }
    }
    return matrix;
  }

  /**
   * Creates a matrix with the given dimensions. Values will be random integers.
   * @param {number} rows - Number of rows
   * @param {number} columns - Number of columns
   * @param {object} [options]
   * @param {number} [options.min=0] - Minimum value
   * @param {number} [options.max=1000] - Maximum value
   * @param {function} [options.random=Math.random] - Random number generator
   * @return {Matrix} The new matrix
   */
  static randInt(rows, columns, options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { min = 0, max = 1000, random = Math.random } = options;
    if (!Number.isInteger(min)) throw new TypeError('min must be an integer');
    if (!Number.isInteger(max)) throw new TypeError('max must be an integer');
    if (min >= max) throw new RangeError('min must be smaller than max');
    var interval = max - min;
    var matrix = new Matrix(rows, columns);
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        var value = min + Math.round(random() * interval);
        matrix.set(i, j, value);
      }
    }
    return matrix;
  }

  /**
   * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and others will be 0.
   * @param {number} rows - Number of rows
   * @param {number} [columns=rows] - Number of columns
   * @param {number} [value=1] - Value to fill the diagonal with
   * @return {Matrix} - The new identity matrix
   */
  static eye(rows, columns, value) {
    if (columns === undefined) columns = rows;
    if (value === undefined) value = 1;
    var min = Math.min(rows, columns);
    var matrix = this.zeros(rows, columns);
    for (var i = 0; i < min; i++) {
      matrix.set(i, i, value);
    }
    return matrix;
  }

  /**
   * Creates a diagonal matrix based on the given array.
   * @param {Array} data - Array containing the data for the diagonal
   * @param {number} [rows] - Number of rows (Default: data.length)
   * @param {number} [columns] - Number of columns (Default: rows)
   * @return {Matrix} - The new diagonal matrix
   */
  static diag(data, rows, columns) {
    var l = data.length;
    if (rows === undefined) rows = l;
    if (columns === undefined) columns = rows;
    var min = Math.min(l, rows, columns);
    var matrix = this.zeros(rows, columns);
    for (var i = 0; i < min; i++) {
      matrix.set(i, i, data[i]);
    }
    return matrix;
  }

  /**
   * Returns a matrix whose elements are the minimum between matrix1 and matrix2
   * @param {Matrix} matrix1
   * @param {Matrix} matrix2
   * @return {Matrix}
   */
  static min(matrix1, matrix2) {
    matrix1 = this.checkMatrix(matrix1);
    matrix2 = this.checkMatrix(matrix2);
    var rows = matrix1.rows;
    var columns = matrix1.columns;
    var result = new Matrix(rows, columns);
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
      }
    }
    return result;
  }

  /**
   * Returns a matrix whose elements are the maximum between matrix1 and matrix2
   * @param {Matrix} matrix1
   * @param {Matrix} matrix2
   * @return {Matrix}
   */
  static max(matrix1, matrix2) {
    matrix1 = this.checkMatrix(matrix1);
    matrix2 = this.checkMatrix(matrix2);
    var rows = matrix1.rows;
    var columns = matrix1.columns;
    var result = new this(rows, columns);
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
      }
    }
    return result;
  }

  /**
   * Check that the provided value is a Matrix and tries to instantiate one if not
   * @param {*} value - The value to check
   * @return {Matrix}
   */
  static checkMatrix(value) {
    return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
  }

  /**
   * Returns true if the argument is a Matrix, false otherwise
   * @param {*} value - The value to check
   * @return {boolean}
   */
  static isMatrix(value) {
    return value != null && value.klass === 'Matrix';
  }

  /**
   * @prop {number} size - The number of elements in the matrix.
   */
  get size() {
    return this.rows * this.columns;
  }

  /**
   * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
   * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
   * @return {Matrix} this
   */
  apply(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        callback.call(this, i, j);
      }
    }
    return this;
  }

  /**
   * Returns a new 1D array filled row by row with the matrix values
   * @return {Array}
   */
  to1DArray() {
    var array = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        array.push(this.get(i, j));
      }
    }
    return array;
  }

  /**
   * Returns a 2D array containing a copy of the data
   * @return {Array}
   */
  to2DArray() {
    var copy = [];
    for (var i = 0; i < this.rows; i++) {
      copy.push([]);
      for (var j = 0; j < this.columns; j++) {
        copy[i].push(this.get(i, j));
      }
    }
    return copy;
  }

  toJSON() {
    return this.to2DArray();
  }

  /**
   * @return {boolean} true if the matrix has one row
   */
  isRowVector() {
    return this.rows === 1;
  }

  /**
   * @return {boolean} true if the matrix has one column
   */
  isColumnVector() {
    return this.columns === 1;
  }

  /**
   * @return {boolean} true if the matrix has one row or one column
   */
  isVector() {
    return this.rows === 1 || this.columns === 1;
  }

  /**
   * @return {boolean} true if the matrix has the same number of rows and columns
   */
  isSquare() {
    return this.rows === this.columns;
  }

  /**
   * @return {boolean} true if the matrix is square and has the same values on both sides of the diagonal
   */
  isSymmetric() {
    if (this.isSquare()) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j <= i; j++) {
          if (this.get(i, j) !== this.get(j, i)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  /**
   * @return true if the matrix is in echelon form
   */
  isEchelonForm() {
    let i = 0;
    let j = 0;
    let previousColumn = -1;
    let isEchelonForm = true;
    let checked = false;
    while (i < this.rows && isEchelonForm) {
      j = 0;
      checked = false;
      while (j < this.columns && checked === false) {
        if (this.get(i, j) === 0) {
          j++;
        } else if (this.get(i, j) === 1 && j > previousColumn) {
          checked = true;
          previousColumn = j;
        } else {
          isEchelonForm = false;
          checked = true;
        }
      }
      i++;
    }
    return isEchelonForm;
  }

  /**
   * @return true if the matrix is in reduced echelon form
   */
  isReducedEchelonForm() {
    let i = 0;
    let j = 0;
    let previousColumn = -1;
    let isReducedEchelonForm = true;
    let checked = false;
    while (i < this.rows && isReducedEchelonForm) {
      j = 0;
      checked = false;
      while (j < this.columns && checked === false) {
        if (this.get(i, j) === 0) {
          j++;
        } else if (this.get(i, j) === 1 && j > previousColumn) {
          checked = true;
          previousColumn = j;
        } else {
          isReducedEchelonForm = false;
          checked = true;
        }
      }
      for (let k = j + 1; k < this.rows; k++) {
        if (this.get(i, k) !== 0) {
          isReducedEchelonForm = false;
        }
      }
      i++;
    }
    return isReducedEchelonForm;
  }

  /**
   * Sets a given element of the matrix.
   * @abstract
   * @param {number} rowIndex - Index of the row
   * @param {number} columnIndex - Index of the column
   * @param {number} value - The new value for the element
   * @return {Matrix} this
   */
  // eslint-disable-next-line no-unused-vars
  set(rowIndex, columnIndex, value) {
    throw new Error('set method is unimplemented');
  }

  /**
   * Returns the given element of the matrix.
   * @abstract
   * @param {number} rowIndex - Index of the row
   * @param {number} columnIndex - Index of the column
   * @return {number}
   */
  // eslint-disable-next-line no-unused-vars
  get(rowIndex, columnIndex) {
    throw new Error('get method is unimplemented');
  }

  /**
   * Creates a new matrix that is a repetition of the current matrix. New matrix has rows times the number of
   * rows of the original matrix, and columns times the number of columns of the original matrix.
   * @param {object} [options]
   * @param {number} [options.rows=1] - Number of times the rows should be repeated
   * @param {number} [options.columns=1] - Number of times the columns should be repeated
   * @return {Matrix}
   * @example
   * var matrix = new Matrix([[1,2]]);
   * matrix.repeat({ rows: 2 }); // [[1,2],[1,2]]
   */
  repeat(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { rows = 1, columns = 1 } = options;
    if (!Number.isInteger(rows) || rows <= 0) {
      throw new TypeError('rows must be a positive integer');
    }
    if (!Number.isInteger(columns) || columns <= 0) {
      throw new TypeError('columns must be a positive integer');
    }
    var matrix = new Matrix(this.rows * rows, this.columns * columns);
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        matrix.setSubMatrix(this, this.rows * i, this.columns * j);
      }
    }
    return matrix;
  }

  /**
   * Fills the matrix with a given value. All elements will be set to this value.
   * @param {number} value - New value
   * @return {Matrix} this
   */
  fill(value) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, value);
      }
    }
    return this;
  }

  /**
   * Negates the matrix. All elements will be multiplied by (-1)
   * @return {Matrix} this
   */
  neg() {
    return this.mulS(-1);
  }

  /**
   * Returns a new array from the given row index
   * @param {number} index - Row index
   * @return {Array}
   */
  getRow(index) {
    checkRowIndex(this, index);
    var row = [];
    for (var i = 0; i < this.columns; i++) {
      row.push(this.get(index, i));
    }
    return row;
  }

  /**
   * Returns a new row vector from the given row index
   * @param {number} index - Row index
   * @return {Matrix}
   */
  getRowVector(index) {
    return Matrix.rowVector(this.getRow(index));
  }

  /**
   * Sets a row at the given index
   * @param {number} index - Row index
   * @param {Array|Matrix} array - Array or vector
   * @return {Matrix} this
   */
  setRow(index, array) {
    checkRowIndex(this, index);
    array = checkRowVector(this, array);
    for (var i = 0; i < this.columns; i++) {
      this.set(index, i, array[i]);
    }
    return this;
  }

  /**
   * Swaps two rows
   * @param {number} row1 - First row index
   * @param {number} row2 - Second row index
   * @return {Matrix} this
   */
  swapRows(row1, row2) {
    checkRowIndex(this, row1);
    checkRowIndex(this, row2);
    for (var i = 0; i < this.columns; i++) {
      var temp = this.get(row1, i);
      this.set(row1, i, this.get(row2, i));
      this.set(row2, i, temp);
    }
    return this;
  }

  /**
   * Returns a new array from the given column index
   * @param {number} index - Column index
   * @return {Array}
   */
  getColumn(index) {
    checkColumnIndex(this, index);
    var column = [];
    for (var i = 0; i < this.rows; i++) {
      column.push(this.get(i, index));
    }
    return column;
  }

  /**
   * Returns a new column vector from the given column index
   * @param {number} index - Column index
   * @return {Matrix}
   */
  getColumnVector(index) {
    return Matrix.columnVector(this.getColumn(index));
  }

  /**
   * Sets a column at the given index
   * @param {number} index - Column index
   * @param {Array|Matrix} array - Array or vector
   * @return {Matrix} this
   */
  setColumn(index, array) {
    checkColumnIndex(this, index);
    array = checkColumnVector(this, array);
    for (var i = 0; i < this.rows; i++) {
      this.set(i, index, array[i]);
    }
    return this;
  }

  /**
   * Swaps two columns
   * @param {number} column1 - First column index
   * @param {number} column2 - Second column index
   * @return {Matrix} this
   */
  swapColumns(column1, column2) {
    checkColumnIndex(this, column1);
    checkColumnIndex(this, column2);
    for (var i = 0; i < this.rows; i++) {
      var temp = this.get(i, column1);
      this.set(i, column1, this.get(i, column2));
      this.set(i, column2, temp);
    }
    return this;
  }

  /**
   * Adds the values of a vector to each row
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  addRowVector(vector) {
    vector = checkRowVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) + vector[j]);
      }
    }
    return this;
  }

  /**
   * Subtracts the values of a vector from each row
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  subRowVector(vector) {
    vector = checkRowVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) - vector[j]);
      }
    }
    return this;
  }

  /**
   * Multiplies the values of a vector with each row
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  mulRowVector(vector) {
    vector = checkRowVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) * vector[j]);
      }
    }
    return this;
  }

  /**
   * Divides the values of each row by those of a vector
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  divRowVector(vector) {
    vector = checkRowVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) / vector[j]);
      }
    }
    return this;
  }

  /**
   * Adds the values of a vector to each column
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  addColumnVector(vector) {
    vector = checkColumnVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) + vector[i]);
      }
    }
    return this;
  }

  /**
   * Subtracts the values of a vector from each column
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  subColumnVector(vector) {
    vector = checkColumnVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) - vector[i]);
      }
    }
    return this;
  }

  /**
   * Multiplies the values of a vector with each column
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  mulColumnVector(vector) {
    vector = checkColumnVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) * vector[i]);
      }
    }
    return this;
  }

  /**
   * Divides the values of each column by those of a vector
   * @param {Array|Matrix} vector - Array or vector
   * @return {Matrix} this
   */
  divColumnVector(vector) {
    vector = checkColumnVector(this, vector);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        this.set(i, j, this.get(i, j) / vector[i]);
      }
    }
    return this;
  }

  /**
   * Multiplies the values of a row with a scalar
   * @param {number} index - Row index
   * @param {number} value
   * @return {Matrix} this
   */
  mulRow(index, value) {
    checkRowIndex(this, index);
    for (var i = 0; i < this.columns; i++) {
      this.set(index, i, this.get(index, i) * value);
    }
    return this;
  }

  /**
   * Multiplies the values of a column with a scalar
   * @param {number} index - Column index
   * @param {number} value
   * @return {Matrix} this
   */
  mulColumn(index, value) {
    checkColumnIndex(this, index);
    for (var i = 0; i < this.rows; i++) {
      this.set(i, index, this.get(i, index) * value);
    }
    return this;
  }

  /**
   * Returns the maximum value of the matrix
   * @return {number}
   */
  max() {
    var v = this.get(0, 0);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (this.get(i, j) > v) {
          v = this.get(i, j);
        }
      }
    }
    return v;
  }

  /**
   * Returns the index of the maximum value
   * @return {Array}
   */
  maxIndex() {
    var v = this.get(0, 0);
    var idx = [0, 0];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (this.get(i, j) > v) {
          v = this.get(i, j);
          idx[0] = i;
          idx[1] = j;
        }
      }
    }
    return idx;
  }

  /**
   * Returns the minimum value of the matrix
   * @return {number}
   */
  min() {
    var v = this.get(0, 0);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (this.get(i, j) < v) {
          v = this.get(i, j);
        }
      }
    }
    return v;
  }

  /**
   * Returns the index of the minimum value
   * @return {Array}
   */
  minIndex() {
    var v = this.get(0, 0);
    var idx = [0, 0];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (this.get(i, j) < v) {
          v = this.get(i, j);
          idx[0] = i;
          idx[1] = j;
        }
      }
    }
    return idx;
  }

  /**
   * Returns the maximum value of one row
   * @param {number} row - Row index
   * @return {number}
   */
  maxRow(row) {
    checkRowIndex(this, row);
    var v = this.get(row, 0);
    for (var i = 1; i < this.columns; i++) {
      if (this.get(row, i) > v) {
        v = this.get(row, i);
      }
    }
    return v;
  }

  /**
   * Returns the index of the maximum value of one row
   * @param {number} row - Row index
   * @return {Array}
   */
  maxRowIndex(row) {
    checkRowIndex(this, row);
    var v = this.get(row, 0);
    var idx = [row, 0];
    for (var i = 1; i < this.columns; i++) {
      if (this.get(row, i) > v) {
        v = this.get(row, i);
        idx[1] = i;
      }
    }
    return idx;
  }

  /**
   * Returns the minimum value of one row
   * @param {number} row - Row index
   * @return {number}
   */
  minRow(row) {
    checkRowIndex(this, row);
    var v = this.get(row, 0);
    for (var i = 1; i < this.columns; i++) {
      if (this.get(row, i) < v) {
        v = this.get(row, i);
      }
    }
    return v;
  }

  /**
   * Returns the index of the maximum value of one row
   * @param {number} row - Row index
   * @return {Array}
   */
  minRowIndex(row) {
    checkRowIndex(this, row);
    var v = this.get(row, 0);
    var idx = [row, 0];
    for (var i = 1; i < this.columns; i++) {
      if (this.get(row, i) < v) {
        v = this.get(row, i);
        idx[1] = i;
      }
    }
    return idx;
  }

  /**
   * Returns the maximum value of one column
   * @param {number} column - Column index
   * @return {number}
   */
  maxColumn(column) {
    checkColumnIndex(this, column);
    var v = this.get(0, column);
    for (var i = 1; i < this.rows; i++) {
      if (this.get(i, column) > v) {
        v = this.get(i, column);
      }
    }
    return v;
  }

  /**
   * Returns the index of the maximum value of one column
   * @param {number} column - Column index
   * @return {Array}
   */
  maxColumnIndex(column) {
    checkColumnIndex(this, column);
    var v = this.get(0, column);
    var idx = [0, column];
    for (var i = 1; i < this.rows; i++) {
      if (this.get(i, column) > v) {
        v = this.get(i, column);
        idx[0] = i;
      }
    }
    return idx;
  }

  /**
   * Returns the minimum value of one column
   * @param {number} column - Column index
   * @return {number}
   */
  minColumn(column) {
    checkColumnIndex(this, column);
    var v = this.get(0, column);
    for (var i = 1; i < this.rows; i++) {
      if (this.get(i, column) < v) {
        v = this.get(i, column);
      }
    }
    return v;
  }

  /**
   * Returns the index of the minimum value of one column
   * @param {number} column - Column index
   * @return {Array}
   */
  minColumnIndex(column) {
    checkColumnIndex(this, column);
    var v = this.get(0, column);
    var idx = [0, column];
    for (var i = 1; i < this.rows; i++) {
      if (this.get(i, column) < v) {
        v = this.get(i, column);
        idx[0] = i;
      }
    }
    return idx;
  }

  /**
   * Returns an array containing the diagonal values of the matrix
   * @return {Array}
   */
  diag() {
    var min = Math.min(this.rows, this.columns);
    var diag = [];
    for (var i = 0; i < min; i++) {
      diag.push(this.get(i, i));
    }
    return diag;
  }

  /**
   * Returns the norm of a matrix.
   * @param {string} type - "frobenius" (default) or "max" return resp. the Frobenius norm and the max norm.
   * @return {number}
   */
  norm(type = 'frobenius') {
    var result = 0;
    if (type === 'max') {
      return this.max();
    } else if (type === 'frobenius') {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          result = result + this.get(i, j) * this.get(i, j);
        }
      }
      return Math.sqrt(result);
    } else {
      throw new RangeError(`unknown norm type: ${type}`);
    }
  }

  /**
   * Computes the cumulative sum of the matrix elements (in place, row by row)
   * @return {Matrix} this
   */
  cumulativeSum() {
    var sum = 0;
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        sum += this.get(i, j);
        this.set(i, j, sum);
      }
    }
    return this;
  }

  /**
   * Computes the dot (scalar) product between the matrix and another.
   * @param {Matrix} vector2 vector
   * @return {number}
   */
  dot(vector2) {
    if (AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
    var vector1 = this.to1DArray();
    if (vector1.length !== vector2.length) {
      throw new RangeError('vectors do not have the same size');
    }
    var dot = 0;
    for (var i = 0; i < vector1.length; i++) {
      dot += vector1[i] * vector2[i];
    }
    return dot;
  }

  /**
   * Returns the matrix product between this and other
   * @param {Matrix} other
   * @return {Matrix}
   */
  mmul(other) {
    other = Matrix.checkMatrix(other);
    if (this.columns !== other.rows) {
      // eslint-disable-next-line no-console
      console.warn(
        'Number of columns of left matrix are not equal to number of rows of right matrix.'
      );
    }

    var m = this.rows;
    var n = this.columns;
    var p = other.columns;

    var result = new Matrix(m, p);

    var Bcolj = new Array(n);
    for (var j = 0; j < p; j++) {
      for (var k = 0; k < n; k++) {
        Bcolj[k] = other.get(k, j);
      }

      for (var i = 0; i < m; i++) {
        var s = 0;
        for (k = 0; k < n; k++) {
          s += this.get(i, k) * Bcolj[k];
        }

        result.set(i, j, s);
      }
    }
    return result;
  }

  strassen2x2(other) {
    other = Matrix.checkMatrix(other);
    var result = new Matrix(2, 2);
    const a11 = this.get(0, 0);
    const b11 = other.get(0, 0);
    const a12 = this.get(0, 1);
    const b12 = other.get(0, 1);
    const a21 = this.get(1, 0);
    const b21 = other.get(1, 0);
    const a22 = this.get(1, 1);
    const b22 = other.get(1, 1);

    // Compute intermediate values.
    const m1 = (a11 + a22) * (b11 + b22);
    const m2 = (a21 + a22) * b11;
    const m3 = a11 * (b12 - b22);
    const m4 = a22 * (b21 - b11);
    const m5 = (a11 + a12) * b22;
    const m6 = (a21 - a11) * (b11 + b12);
    const m7 = (a12 - a22) * (b21 + b22);

    // Combine intermediate values into the output.
    const c00 = m1 + m4 - m5 + m7;
    const c01 = m3 + m5;
    const c10 = m2 + m4;
    const c11 = m1 - m2 + m3 + m6;

    result.set(0, 0, c00);
    result.set(0, 1, c01);
    result.set(1, 0, c10);
    result.set(1, 1, c11);
    return result;
  }

  strassen3x3(other) {
    other = Matrix.checkMatrix(other);
    var result = new Matrix(3, 3);

    const a00 = this.get(0, 0);
    const a01 = this.get(0, 1);
    const a02 = this.get(0, 2);
    const a10 = this.get(1, 0);
    const a11 = this.get(1, 1);
    const a12 = this.get(1, 2);
    const a20 = this.get(2, 0);
    const a21 = this.get(2, 1);
    const a22 = this.get(2, 2);

    const b00 = other.get(0, 0);
    const b01 = other.get(0, 1);
    const b02 = other.get(0, 2);
    const b10 = other.get(1, 0);
    const b11 = other.get(1, 1);
    const b12 = other.get(1, 2);
    const b20 = other.get(2, 0);
    const b21 = other.get(2, 1);
    const b22 = other.get(2, 2);

    const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
    const m2 = (a00 - a10) * (-b01 + b11);
    const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
    const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
    const m5 = (a10 + a11) * (-b00 + b01);
    const m6 = a00 * b00;
    const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
    const m8 = (-a00 + a20) * (b02 - b12);
    const m9 = (a20 + a21) * (-b00 + b02);
    const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
    const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
    const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
    const m13 = (a02 - a22) * (b11 - b21);
    const m14 = a02 * b20;
    const m15 = (a21 + a22) * (-b20 + b21);
    const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
    const m17 = (a02 - a12) * (b12 - b22);
    const m18 = (a11 + a12) * (-b20 + b22);
    const m19 = a01 * b10;
    const m20 = a12 * b21;
    const m21 = a10 * b02;
    const m22 = a20 * b01;
    const m23 = a22 * b22;

    const c00 = m6 + m14 + m19;
    const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
    const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
    const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
    const c11 = m2 + m4 + m5 + m6 + m20;
    const c12 = m14 + m16 + m17 + m18 + m21;
    const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
    const c21 = m12 + m13 + m14 + m15 + m22;
    const c22 = m6 + m7 + m8 + m9 + m23;

    result.set(0, 0, c00);
    result.set(0, 1, c01);
    result.set(0, 2, c02);
    result.set(1, 0, c10);
    result.set(1, 1, c11);
    result.set(1, 2, c12);
    result.set(2, 0, c20);
    result.set(2, 1, c21);
    result.set(2, 2, c22);
    return result;
  }

  /**
   * Returns the matrix product between x and y. More efficient than mmul(other) only when we multiply squared matrix and when the size of the matrix is > 1000.
   * @param {Matrix} y
   * @return {Matrix}
   */
  mmulStrassen(y) {
    y = Matrix.checkMatrix(y);
    var x = this.clone();
    var r1 = x.rows;
    var c1 = x.columns;
    var r2 = y.rows;
    var c2 = y.columns;
    if (c1 !== r2) {
      // eslint-disable-next-line no-console
      console.warn(
        `Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`
      );
    }

    // Put a matrix into the top left of a matrix of zeros.
    // `rows` and `cols` are the dimensions of the output matrix.
    function embed(mat, rows, cols) {
      var r = mat.rows;
      var c = mat.columns;
      if (r === rows && c === cols) {
        return mat;
      } else {
        var resultat = AbstractMatrix.zeros(rows, cols);
        resultat = resultat.setSubMatrix(mat, 0, 0);
        return resultat;
      }
    }

    // Make sure both matrices are the same size.
    // This is exclusively for simplicity:
    // this algorithm can be implemented with matrices of different sizes.

    var r = Math.max(r1, r2);
    var c = Math.max(c1, c2);
    x = embed(x, r, c);
    y = embed(y, r, c);

    // Our recursive multiplication function.
    function blockMult(a, b, rows, cols) {
      // For small matrices, resort to naive multiplication.
      if (rows <= 512 || cols <= 512) {
        return a.mmul(b); // a is equivalent to this
      }

      // Apply dynamic padding.
      if (rows % 2 === 1 && cols % 2 === 1) {
        a = embed(a, rows + 1, cols + 1);
        b = embed(b, rows + 1, cols + 1);
      } else if (rows % 2 === 1) {
        a = embed(a, rows + 1, cols);
        b = embed(b, rows + 1, cols);
      } else if (cols % 2 === 1) {
        a = embed(a, rows, cols + 1);
        b = embed(b, rows, cols + 1);
      }

      var halfRows = parseInt(a.rows / 2, 10);
      var halfCols = parseInt(a.columns / 2, 10);
      // Subdivide input matrices.
      var a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
      var b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);

      var a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
      var b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);

      var a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
      var b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);

      var a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
      var b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1);

      // Compute intermediate values.
      var m1 = blockMult(
        AbstractMatrix.add(a11, a22),
        AbstractMatrix.add(b11, b22),
        halfRows,
        halfCols
      );
      var m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
      var m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
      var m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
      var m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
      var m6 = blockMult(
        AbstractMatrix.sub(a21, a11),
        AbstractMatrix.add(b11, b12),
        halfRows,
        halfCols
      );
      var m7 = blockMult(
        AbstractMatrix.sub(a12, a22),
        AbstractMatrix.add(b21, b22),
        halfRows,
        halfCols
      );

      // Combine intermediate values into the output.
      var c11 = AbstractMatrix.add(m1, m4);
      c11.sub(m5);
      c11.add(m7);
      var c12 = AbstractMatrix.add(m3, m5);
      var c21 = AbstractMatrix.add(m2, m4);
      var c22 = AbstractMatrix.sub(m1, m2);
      c22.add(m3);
      c22.add(m6);

      // Crop output to the desired size (undo dynamic padding).
      var resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
      resultat = resultat.setSubMatrix(c11, 0, 0);
      resultat = resultat.setSubMatrix(c12, c11.rows, 0);
      resultat = resultat.setSubMatrix(c21, 0, c11.columns);
      resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
      return resultat.subMatrix(0, rows - 1, 0, cols - 1);
    }
    return blockMult(x, y, r, c);
  }

  /**
   * Returns a row-by-row scaled matrix
   * @param {object} [options]
   * @param {number} [options.min=0] - Minimum scaled value
   * @param {number} [optiens.max=1] - Maximum scaled value
   * @return {Matrix} - The scaled matrix
   */
  scaleRows(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { min = 0, max = 1 } = options;
    if (!Number.isFinite(min)) throw new TypeError('min must be a number');
    if (!Number.isFinite(max)) throw new TypeError('max must be a number');
    if (min >= max) throw new RangeError('min must be smaller than max');
    var newMatrix = new Matrix(this.rows, this.columns);
    for (var i = 0; i < this.rows; i++) {
      const row = this.getRow(i);
      rescale(row, { min, max, output: row });
      newMatrix.setRow(i, row);
    }
    return newMatrix;
  }

  /**
   * Returns a new column-by-column scaled matrix
   * @param {object} [options]
   * @param {number} [options.min=0] - Minimum scaled value
   * @param {number} [optiens.max=1] - Maximum scaled value
   * @return {Matrix} - The new scaled matrix
   * @example
   * var matrix = new Matrix([[1,2],[-1,0]]);
   * var scaledMatrix = matrix.scaleColumns(); // [[1,1],[0,0]]
   */
  scaleColumns(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { min = 0, max = 1 } = options;
    if (!Number.isFinite(min)) throw new TypeError('min must be a number');
    if (!Number.isFinite(max)) throw new TypeError('max must be a number');
    if (min >= max) throw new RangeError('min must be smaller than max');
    var newMatrix = new Matrix(this.rows, this.columns);
    for (var i = 0; i < this.columns; i++) {
      const column = this.getColumn(i);
      rescale(column, {
        min: min,
        max: max,
        output: column
      });
      newMatrix.setColumn(i, column);
    }
    return newMatrix;
  }

  flipRows() {
    const middle = Math.ceil(this.columns / 2);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < middle; j++) {
        var first = this.get(i, j);
        var last = this.get(i, this.columns - 1 - j);
        this.set(i, j, last);
        this.set(i, this.columns - 1 - j, first);
      }
    }
    return this;
  }

  flipColumns() {
    const middle = Math.ceil(this.rows / 2);
    for (var j = 0; j < this.columns; j++) {
      for (var i = 0; i < middle; i++) {
        var first = this.get(i, j);
        var last = this.get(this.rows - 1 - i, j);
        this.set(i, j, last);
        this.set(this.rows - 1 - i, j, first);
      }
    }
    return this;
  }

  /**
   * Returns the Kronecker product (also known as tensor product) between this and other
   * See https://en.wikipedia.org/wiki/Kronecker_product
   * @param {Matrix} other
   * @return {Matrix}
   */
  kroneckerProduct(other) {
    other = Matrix.checkMatrix(other);

    var m = this.rows;
    var n = this.columns;
    var p = other.rows;
    var q = other.columns;

    var result = new Matrix(m * p, n * q);
    for (var i = 0; i < m; i++) {
      for (var j = 0; j < n; j++) {
        for (var k = 0; k < p; k++) {
          for (var l = 0; l < q; l++) {
            result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
          }
        }
      }
    }
    return result;
  }

  /**
   * Transposes the matrix and returns a new one containing the result
   * @return {Matrix}
   */
  transpose() {
    var result = new Matrix(this.columns, this.rows);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        result.set(j, i, this.get(i, j));
      }
    }
    return result;
  }

  /**
   * Sorts the rows (in place)
   * @param {function} [compareFunction] - usual Array.prototype.sort comparison function
   * @return {Matrix} this
   */
  sortRows(compareFunction = compareNumbers) {
    for (var i = 0; i < this.rows; i++) {
      this.setRow(i, this.getRow(i).sort(compareFunction));
    }
    return this;
  }

  /**
   * Sorts the columns (in place)
   * @param {function} [compareFunction] - usual Array.prototype.sort comparison function
   * @return {Matrix} this
   */
  sortColumns(compareFunction = compareNumbers) {
    for (var i = 0; i < this.columns; i++) {
      this.setColumn(i, this.getColumn(i).sort(compareFunction));
    }
    return this;
  }

  /**
   * Returns a subset of the matrix
   * @param {number} startRow - First row index
   * @param {number} endRow - Last row index
   * @param {number} startColumn - First column index
   * @param {number} endColumn - Last column index
   * @return {Matrix}
   */
  subMatrix(startRow, endRow, startColumn, endColumn) {
    checkRange(this, startRow, endRow, startColumn, endColumn);
    var newMatrix = new Matrix(
      endRow - startRow + 1,
      endColumn - startColumn + 1
    );
    for (var i = startRow; i <= endRow; i++) {
      for (var j = startColumn; j <= endColumn; j++) {
        newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
      }
    }
    return newMatrix;
  }

  /**
   * Returns a subset of the matrix based on an array of row indices
   * @param {Array} indices - Array containing the row indices
   * @param {number} [startColumn = 0] - First column index
   * @param {number} [endColumn = this.columns-1] - Last column index
   * @return {Matrix}
   */
  subMatrixRow(indices, startColumn, endColumn) {
    if (startColumn === undefined) startColumn = 0;
    if (endColumn === undefined) endColumn = this.columns - 1;
    if (
      startColumn > endColumn ||
      startColumn < 0 ||
      startColumn >= this.columns ||
      endColumn < 0 ||
      endColumn >= this.columns
    ) {
      throw new RangeError('Argument out of range');
    }

    var newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);
    for (var i = 0; i < indices.length; i++) {
      for (var j = startColumn; j <= endColumn; j++) {
        if (indices[i] < 0 || indices[i] >= this.rows) {
          throw new RangeError(`Row index out of range: ${indices[i]}`);
        }
        newMatrix.set(i, j - startColumn, this.get(indices[i], j));
      }
    }
    return newMatrix;
  }

  /**
   * Returns a subset of the matrix based on an array of column indices
   * @param {Array} indices - Array containing the column indices
   * @param {number} [startRow = 0] - First row index
   * @param {number} [endRow = this.rows-1] - Last row index
   * @return {Matrix}
   */
  subMatrixColumn(indices, startRow, endRow) {
    if (startRow === undefined) startRow = 0;
    if (endRow === undefined) endRow = this.rows - 1;
    if (
      startRow > endRow ||
      startRow < 0 ||
      startRow >= this.rows ||
      endRow < 0 ||
      endRow >= this.rows
    ) {
      throw new RangeError('Argument out of range');
    }

    var newMatrix = new Matrix(endRow - startRow + 1, indices.length);
    for (var i = 0; i < indices.length; i++) {
      for (var j = startRow; j <= endRow; j++) {
        if (indices[i] < 0 || indices[i] >= this.columns) {
          throw new RangeError(`Column index out of range: ${indices[i]}`);
        }
        newMatrix.set(j - startRow, i, this.get(j, indices[i]));
      }
    }
    return newMatrix;
  }

  /**
   * Set a part of the matrix to the given sub-matrix
   * @param {Matrix|Array< Array >} matrix - The source matrix from which to extract values.
   * @param {number} startRow - The index of the first row to set
   * @param {number} startColumn - The index of the first column to set
   * @return {Matrix}
   */
  setSubMatrix(matrix, startRow, startColumn) {
    matrix = Matrix.checkMatrix(matrix);
    var endRow = startRow + matrix.rows - 1;
    var endColumn = startColumn + matrix.columns - 1;
    checkRange(this, startRow, endRow, startColumn, endColumn);
    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.columns; j++) {
        this.set(startRow + i, startColumn + j, matrix.get(i, j));
      }
    }
    return this;
  }

  /**
   * Return a new matrix based on a selection of rows and columns
   * @param {Array<number>} rowIndices - The row indices to select. Order matters and an index can be more than once.
   * @param {Array<number>} columnIndices - The column indices to select. Order matters and an index can be use more than once.
   * @return {Matrix} The new matrix
   */
  selection(rowIndices, columnIndices) {
    var indices = checkIndices(this, rowIndices, columnIndices);
    var newMatrix = new Matrix(rowIndices.length, columnIndices.length);
    for (var i = 0; i < indices.row.length; i++) {
      var rowIndex = indices.row[i];
      for (var j = 0; j < indices.column.length; j++) {
        var columnIndex = indices.column[j];
        newMatrix.set(i, j, this.get(rowIndex, columnIndex));
      }
    }
    return newMatrix;
  }

  /**
   * Returns the trace of the matrix (sum of the diagonal elements)
   * @return {number}
   */
  trace() {
    var min = Math.min(this.rows, this.columns);
    var trace = 0;
    for (var i = 0; i < min; i++) {
      trace += this.get(i, i);
    }
    return trace;
  }

  /**
   * Creates an exact and independent copy of the matrix
   * @return {Matrix}
   */
  clone() {
    var newMatrix = new Matrix(this.rows, this.columns);
    for (var row = 0; row < this.rows; row++) {
      for (var column = 0; column < this.columns; column++) {
        newMatrix.set(row, column, this.get(row, column));
      }
    }
    return newMatrix;
  }

  sum(by) {
    switch (by) {
      case 'row':
        return sumByRow(this);
      case 'column':
        return sumByColumn(this);
      case undefined:
        return sumAll(this);
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  product(by) {
    switch (by) {
      case 'row':
        return productByRow(this);
      case 'column':
        return productByColumn(this);
      case undefined:
        return productAll(this);
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  mean(by) {
    const sum = this.sum(by);
    switch (by) {
      case 'row': {
        for (let i = 0; i < this.rows; i++) {
          sum[i] /= this.columns;
        }
        return sum;
      }
      case 'column': {
        for (let i = 0; i < this.columns; i++) {
          sum[i] /= this.rows;
        }
        return sum;
      }
      case undefined:
        return sum / this.size;
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  variance(by, options = {}) {
    if (typeof by === 'object') {
      options = by;
      by = undefined;
    }
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object');
    }
    const { unbiased = true, mean = this.mean(by) } = options;
    if (typeof unbiased !== 'boolean') {
      throw new TypeError('unbiased must be a boolean');
    }
    switch (by) {
      case 'row': {
        if (!Array.isArray(mean)) {
          throw new TypeError('mean must be an array');
        }
        return varianceByRow(this, unbiased, mean);
      }
      case 'column': {
        if (!Array.isArray(mean)) {
          throw new TypeError('mean must be an array');
        }
        return varianceByColumn(this, unbiased, mean);
      }
      case undefined: {
        if (typeof mean !== 'number') {
          throw new TypeError('mean must be a number');
        }
        return varianceAll(this, unbiased, mean);
      }
      default:
        throw new Error(`invalid option: ${by}`);
    }
  }

  standardDeviation(by, options) {
    if (typeof by === 'object') {
      options = by;
      by = undefined;
    }
    const variance = this.variance(by, options);
    if (by === undefined) {
      return Math.sqrt(variance);
    } else {
      for (var i = 0; i < variance.length; i++) {
        variance[i] = Math.sqrt(variance[i]);
      }
      return variance;
    }
  }
}

AbstractMatrix.prototype.klass = 'Matrix';
if (typeof Symbol !== 'undefined') {
  AbstractMatrix.prototype[
    Symbol.for('nodejs.util.inspect.custom')
  ] = inspectMatrix;
}

function compareNumbers(a, b) {
  return a - b;
}

// Synonyms
AbstractMatrix.random = AbstractMatrix.rand;
AbstractMatrix.randomInt = AbstractMatrix.randInt;
AbstractMatrix.diagonal = AbstractMatrix.diag;
AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
AbstractMatrix.identity = AbstractMatrix.eye;
AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
AbstractMatrix.prototype.tensorProduct =
  AbstractMatrix.prototype.kroneckerProduct;

export default class Matrix extends AbstractMatrix {
  constructor(nRows, nColumns) {
    super();
    if (Matrix.isMatrix(nRows)) {
      return nRows.clone();
    } else if (Number.isInteger(nRows) && nRows > 0) {
      // Create an empty matrix
      this.data = [];
      if (Number.isInteger(nColumns) && nColumns > 0) {
        for (let i = 0; i < nRows; i++) {
          this.data.push([]);
          for (let j = 0; j < nColumns; j++) {
            this.data[i].push(0);
          }
        }
      } else {
        throw new TypeError('nColumns must be a positive integer');
      }
    } else if (Array.isArray(nRows)) {
      // Copy the values from the 2D array
      const arrayData = nRows;
      nRows = arrayData.length;
      nColumns = arrayData[0].length;
      if (typeof nColumns !== 'number' || nColumns === 0) {
        throw new TypeError(
          'Data must be a 2D array with at least one element'
        );
      }
      this.data = [];
      for (let i = 0; i < nRows; i++) {
        if (arrayData[i].length !== nColumns) {
          throw new RangeError('Inconsistent array dimensions');
        }
        this.data.push(arrayData[i].slice());
      }
    } else {
      throw new TypeError(
        'First argument must be a positive number or an array'
      );
    }
    this.rows = nRows;
    this.columns = nColumns;
    return this;
  }

  set(rowIndex, columnIndex, value) {
    this.data[rowIndex][columnIndex] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.data[rowIndex][columnIndex];
  }

  /**
   * Removes a row from the given index
   * @param {number} index - Row index
   * @return {Matrix} this
   */
  removeRow(index) {
    checkRowIndex(this, index);
    if (this.rows === 1) {
      throw new RangeError('A matrix cannot have less than one row');
    }
    this.data.splice(index, 1);
    this.rows -= 1;
    return this;
  }

  /**
   * Adds a row at the given index
   * @param {number} [index = this.rows] - Row index
   * @param {Array|Matrix} array - Array or vector
   * @return {Matrix} this
   */
  addRow(index, array) {
    if (array === undefined) {
      array = index;
      index = this.rows;
    }
    checkRowIndex(this, index, true);
    array = checkRowVector(this, array, true);
    this.data.splice(index, 0, array);
    this.rows += 1;
    return this;
  }

  /**
   * Removes a column from the given index
   * @param {number} index - Column index
   * @return {Matrix} this
   */
  removeColumn(index) {
    checkColumnIndex(this, index);
    if (this.columns === 1) {
      throw new RangeError('A matrix cannot have less than one column');
    }
    for (var i = 0; i < this.rows; i++) {
      this.data[i].splice(index, 1);
    }
    this.columns -= 1;
    return this;
  }

  /**
   * Adds a column at the given index
   * @param {number} [index = this.columns] - Column index
   * @param {Array|Matrix} array - Array or vector
   * @return {Matrix} this
   */
  addColumn(index, array) {
    if (typeof array === 'undefined') {
      array = index;
      index = this.columns;
    }
    checkColumnIndex(this, index, true);
    array = checkColumnVector(this, array);
    for (var i = 0; i < this.rows; i++) {
      this.data[i].splice(index, 0, array[i]);
    }
    this.columns += 1;
    return this;
  }
}

installMathOperations(AbstractMatrix, Matrix);
