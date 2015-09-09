<a name="Matrix"></a>
## Matrix
Real matrix

**Kind**: global class  

* [Matrix](#Matrix)
  * [new Matrix(nRows, [nColumns])](#new_Matrix_new)
  * _instance_
    * [.size](#Matrix+size)
    * [.apply(callback)](#Matrix+apply) ⇒ <code>[Matrix](#Matrix)</code>
    * [.clone()](#Matrix+clone) ⇒ <code>[Matrix](#Matrix)</code>
    * [.to1DArray()](#Matrix+to1DArray) ⇒ <code>Array</code>
    * [.to2DArray()](#Matrix+to2DArray) ⇒ <code>Array</code>
    * [.isRowVector()](#Matrix+isRowVector) ⇒ <code>boolean</code>
    * [.isColumnVector()](#Matrix+isColumnVector) ⇒ <code>boolean</code>
    * [.isVector()](#Matrix+isVector) ⇒ <code>boolean</code>
    * [.isSquare()](#Matrix+isSquare) ⇒ <code>boolean</code>
    * [.isSymmetric()](#Matrix+isSymmetric) ⇒ <code>boolean</code>
    * [.set(rowIndex, columnIndex, value)](#Matrix+set) ⇒ <code>[Matrix](#Matrix)</code>
    * [.get(rowIndex, columnIndex)](#Matrix+get) ⇒ <code>number</code>
    * [.fill(value)](#Matrix+fill) ⇒ <code>[Matrix](#Matrix)</code>
    * [.neg()](#Matrix+neg) ⇒ <code>[Matrix](#Matrix)</code>
    * [.getRow(index)](#Matrix+getRow) ⇒ <code>Array</code>
    * [.getRowVector(index)](#Matrix+getRowVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.setRow(index, array)](#Matrix+setRow) ⇒ <code>[Matrix](#Matrix)</code>
    * [.removeRow(index)](#Matrix+removeRow) ⇒ <code>[Matrix](#Matrix)</code>
    * [.addRow([index], array)](#Matrix+addRow) ⇒ <code>[Matrix](#Matrix)</code>
    * [.swapRows(row1, row2)](#Matrix+swapRows) ⇒ <code>[Matrix](#Matrix)</code>
    * [.getColumn(index)](#Matrix+getColumn) ⇒ <code>Array</code>
    * [.getColumnVector(index)](#Matrix+getColumnVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.setColumn(index, array)](#Matrix+setColumn) ⇒ <code>[Matrix](#Matrix)</code>
    * [.removeColumn(index)](#Matrix+removeColumn) ⇒ <code>[Matrix](#Matrix)</code>
    * [.addColumn([index], array)](#Matrix+addColumn) ⇒ <code>[Matrix](#Matrix)</code>
    * [.swapColumns(column1, column2)](#Matrix+swapColumns) ⇒ <code>[Matrix](#Matrix)</code>
    * [.addRowVector(vector)](#Matrix+addRowVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.subRowVector(vector)](#Matrix+subRowVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.mulRowVector(vector)](#Matrix+mulRowVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.divRowVector(vector)](#Matrix+divRowVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.addColumnVector(vector)](#Matrix+addColumnVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.subColumnVector(vector)](#Matrix+subColumnVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.mulColumnVector(vector)](#Matrix+mulColumnVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.divColumnVector(vector)](#Matrix+divColumnVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.mulRow(index, value)](#Matrix+mulRow) ⇒ <code>[Matrix](#Matrix)</code>
    * [.mulColumn(index, value)](#Matrix+mulColumn) ⇒ <code>[Matrix](#Matrix)</code>
    * [.max()](#Matrix+max) ⇒ <code>number</code>
    * [.maxIndex()](#Matrix+maxIndex) ⇒ <code>Array</code>
    * [.min()](#Matrix+min) ⇒ <code>number</code>
    * [.minIndex()](#Matrix+minIndex) ⇒ <code>Array</code>
    * [.maxRow(row)](#Matrix+maxRow) ⇒ <code>number</code>
    * [.maxRowIndex(row)](#Matrix+maxRowIndex) ⇒ <code>Array</code>
    * [.minRow(row)](#Matrix+minRow) ⇒ <code>number</code>
    * [.minRowIndex(row)](#Matrix+minRowIndex) ⇒ <code>Array</code>
    * [.maxColumn(column)](#Matrix+maxColumn) ⇒ <code>number</code>
    * [.maxColumnIndex(column)](#Matrix+maxColumnIndex) ⇒ <code>Array</code>
    * [.minColumn(column)](#Matrix+minColumn) ⇒ <code>number</code>
    * [.minColumnIndex(column)](#Matrix+minColumnIndex) ⇒ <code>Array</code>
    * [.diag()](#Matrix+diag) ⇒ <code>Array</code>
    * [.sum()](#Matrix+sum) ⇒ <code>number</code>
    * [.mean()](#Matrix+mean) ⇒ <code>number</code>
    * [.prod()](#Matrix+prod) ⇒ <code>number</code>
    * [.cumulativeSum()](#Matrix+cumulativeSum) ⇒ <code>[Matrix](#Matrix)</code>
    * [.dot(vector2)](#Matrix+dot) ⇒ <code>number</code>
    * [.mmul()](#Matrix+mmul) ⇒ <code>[Matrix](#Matrix)</code>
    * [.transpose()](#Matrix+transpose) ⇒ <code>[Matrix](#Matrix)</code>
    * [.sortRows(compareFunction)](#Matrix+sortRows) ⇒ <code>[Matrix](#Matrix)</code>
    * [.sortColumns(compareFunction)](#Matrix+sortColumns) ⇒ <code>[Matrix](#Matrix)</code>
    * [.subMatrix(startRow, endRow, startColumn, endColumn)](#Matrix+subMatrix) ⇒ <code>[Matrix](#Matrix)</code>
    * [.subMatrixRow(indices, [startColumn], [endColumn])](#Matrix+subMatrixRow) ⇒ <code>[Matrix](#Matrix)</code>
    * [.subMatrixColumn(indices, [startRow], [endRow])](#Matrix+subMatrixColumn) ⇒ <code>[Matrix](#Matrix)</code>
    * [.trace()](#Matrix+trace) ⇒ <code>number</code>
  * _static_
    * [.from1DArray(newRows, newColumns, newData)](#Matrix.from1DArray) ⇒ <code>[Matrix](#Matrix)</code>
    * [.rowVector(newData)](#Matrix.rowVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.columnVector(newData)](#Matrix.columnVector) ⇒ <code>[Matrix](#Matrix)</code>
    * [.empty(rows, columns)](#Matrix.empty) ⇒ <code>[Matrix](#Matrix)</code>
    * [.zeros(rows, columns)](#Matrix.zeros) ⇒ <code>[Matrix](#Matrix)</code>
    * [.ones(rows, columns)](#Matrix.ones) ⇒ <code>[Matrix](#Matrix)</code>
    * [.rand(rows, columns, [rng])](#Matrix.rand) ⇒ <code>[Matrix](#Matrix)</code>
    * [.eye(rows, [columns])](#Matrix.eye) ⇒ <code>[Matrix](#Matrix)</code>
    * [.diag(data, [rows], [columns])](#Matrix.diag) ⇒ <code>[Matrix](#Matrix)</code>
    * [.min(matrix1, matrix2)](#Matrix.min) ⇒ <code>[Matrix](#Matrix)</code>
    * [.max(matrix1, matrix2)](#Matrix.max) ⇒ <code>[Matrix](#Matrix)</code>
    * [.checkMatrix(value)](#Matrix.checkMatrix) ⇒ <code>[Matrix](#Matrix)</code>
    * [.isMatrix(value)](#Matrix.isMatrix) ⇒ <code>boolean</code>

<a name="new_Matrix_new"></a>
### new Matrix(nRows, [nColumns])

| Param | Type | Description |
| --- | --- | --- |
| nRows | <code>number</code> &#124; <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Number of rows of the new matrix, 2D array containing the data or Matrix instance to clone |
| [nColumns] | <code>number</code> | Number of columns of the new matrix |

<a name="Matrix+size"></a>
### matrix.size
**Kind**: instance property of <code>[Matrix](#Matrix)</code>  
**Properties**

| Type | Description |
| --- | --- |
| <code>number</code> | The number of elements in the matrix. |

<a name="Matrix+apply"></a>
### matrix.apply(callback) ⇒ <code>[Matrix](#Matrix)</code>
Applies a callback for each element of the matrix. The function is called in the matrix (this) context.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function that will be called with two parameters : i (row) and j (column) |

<a name="Matrix+clone"></a>
### matrix.clone() ⇒ <code>[Matrix](#Matrix)</code>
Creates an exact and independent copy of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+to1DArray"></a>
### matrix.to1DArray() ⇒ <code>Array</code>
Returns a new 1D array filled row by row with the matrix values

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+to2DArray"></a>
### matrix.to2DArray() ⇒ <code>Array</code>
Returns a 2D array containing a copy of the data

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+isRowVector"></a>
### matrix.isRowVector() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>boolean</code> - true if the matrix has one row  
<a name="Matrix+isColumnVector"></a>
### matrix.isColumnVector() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>boolean</code> - true if the matrix has one column  
<a name="Matrix+isVector"></a>
### matrix.isVector() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>boolean</code> - true if the matrix has one row or one column  
<a name="Matrix+isSquare"></a>
### matrix.isSquare() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>boolean</code> - true if the matrix has the same number of rows and columns  
<a name="Matrix+isSymmetric"></a>
### matrix.isSymmetric() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>boolean</code> - true if the matrix is square and has the same values on both sides of the diagonal  
<a name="Matrix+set"></a>
### matrix.set(rowIndex, columnIndex, value) ⇒ <code>[Matrix](#Matrix)</code>
Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| rowIndex | <code>number</code> | Index of the row |
| columnIndex | <code>number</code> | Index of the column |
| value | <code>number</code> | The new value for the element |

<a name="Matrix+get"></a>
### matrix.get(rowIndex, columnIndex) ⇒ <code>number</code>
Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowIndex | <code>number</code> | Index of the row |
| columnIndex | <code>number</code> | Index of the column |

<a name="Matrix+fill"></a>
### matrix.fill(value) ⇒ <code>[Matrix](#Matrix)</code>
Fills the matrix with a given value. All elements will be set to this value.

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | New value |

<a name="Matrix+neg"></a>
### matrix.neg() ⇒ <code>[Matrix](#Matrix)</code>
Negates the matrix. All elements will be multiplied by (-1)

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  
<a name="Matrix+getRow"></a>
### matrix.getRow(index) ⇒ <code>Array</code>
Returns a new array from the given row index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Row index |

<a name="Matrix+getRowVector"></a>
### matrix.getRowVector(index) ⇒ <code>[Matrix](#Matrix)</code>
Returns a new row vector from the given row index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Row index |

<a name="Matrix+setRow"></a>
### matrix.setRow(index, array) ⇒ <code>[Matrix](#Matrix)</code>
Sets a row at the given index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Row index |
| array | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+removeRow"></a>
### matrix.removeRow(index) ⇒ <code>[Matrix](#Matrix)</code>
Removes a row from the given index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Row index |

<a name="Matrix+addRow"></a>
### matrix.addRow([index], array) ⇒ <code>[Matrix](#Matrix)</code>
Adds a row at the given index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [index] | <code>number</code> | <code>this.rows</code> | Row index |
| array | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> |  | Array or vector |

<a name="Matrix+swapRows"></a>
### matrix.swapRows(row1, row2) ⇒ <code>[Matrix](#Matrix)</code>
Swaps two rows

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| row1 | <code>number</code> | First row index |
| row2 | <code>number</code> | Second row index |

<a name="Matrix+getColumn"></a>
### matrix.getColumn(index) ⇒ <code>Array</code>
Returns a new array from the given column index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Column index |

<a name="Matrix+getColumnVector"></a>
### matrix.getColumnVector(index) ⇒ <code>[Matrix](#Matrix)</code>
Returns a new column vector from the given column index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Column index |

<a name="Matrix+setColumn"></a>
### matrix.setColumn(index, array) ⇒ <code>[Matrix](#Matrix)</code>
Sets a column at the given index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Column index |
| array | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+removeColumn"></a>
### matrix.removeColumn(index) ⇒ <code>[Matrix](#Matrix)</code>
Removes a column from the given index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Column index |

<a name="Matrix+addColumn"></a>
### matrix.addColumn([index], array) ⇒ <code>[Matrix](#Matrix)</code>
Adds a column at the given index

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [index] | <code>number</code> | <code>this.columns</code> | Column index |
| array | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> |  | Array or vector |

<a name="Matrix+swapColumns"></a>
### matrix.swapColumns(column1, column2) ⇒ <code>[Matrix](#Matrix)</code>
Swaps two columns

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| column1 | <code>number</code> | First column index |
| column2 | <code>number</code> | Second column index |

<a name="Matrix+addRowVector"></a>
### matrix.addRowVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Adds the values of a vector to each row

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+subRowVector"></a>
### matrix.subRowVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Subtracts the values of a vector from each row

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+mulRowVector"></a>
### matrix.mulRowVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Multiplies the values of a vector with each row

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+divRowVector"></a>
### matrix.divRowVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Divides the values of each row by those of a vector

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+addColumnVector"></a>
### matrix.addColumnVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Adds the values of a vector to each column

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+subColumnVector"></a>
### matrix.subColumnVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Subtracts the values of a vector from each column

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+mulColumnVector"></a>
### matrix.mulColumnVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Multiplies the values of a vector with each column

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+divColumnVector"></a>
### matrix.divColumnVector(vector) ⇒ <code>[Matrix](#Matrix)</code>
Divides the values of each column by those of a vector

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> &#124; <code>[Matrix](#Matrix)</code> | Array or vector |

<a name="Matrix+mulRow"></a>
### matrix.mulRow(index, value) ⇒ <code>[Matrix](#Matrix)</code>
Multiplies the values of a row with a scalar

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Row index |
| value | <code>number</code> |  |

<a name="Matrix+mulColumn"></a>
### matrix.mulColumn(index, value) ⇒ <code>[Matrix](#Matrix)</code>
Multiplies the values of a column with a scalar

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Column index |
| value | <code>number</code> |  |

<a name="Matrix+max"></a>
### matrix.max() ⇒ <code>number</code>
Returns the maximum value of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+maxIndex"></a>
### matrix.maxIndex() ⇒ <code>Array</code>
Returns the index of the maximum value

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+min"></a>
### matrix.min() ⇒ <code>number</code>
Returns the minimum value of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+minIndex"></a>
### matrix.minIndex() ⇒ <code>Array</code>
Returns the index of the minimum value

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+maxRow"></a>
### matrix.maxRow(row) ⇒ <code>number</code>
Returns the maximum value of one row

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>number</code> | Row index |

<a name="Matrix+maxRowIndex"></a>
### matrix.maxRowIndex(row) ⇒ <code>Array</code>
Returns the index of the maximum value of one row

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>number</code> | Row index |

<a name="Matrix+minRow"></a>
### matrix.minRow(row) ⇒ <code>number</code>
Returns the minimum value of one row

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>number</code> | Row index |

<a name="Matrix+minRowIndex"></a>
### matrix.minRowIndex(row) ⇒ <code>Array</code>
Returns the index of the maximum value of one row

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>number</code> | Row index |

<a name="Matrix+maxColumn"></a>
### matrix.maxColumn(column) ⇒ <code>number</code>
Returns the maximum value of one column

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>number</code> | Column index |

<a name="Matrix+maxColumnIndex"></a>
### matrix.maxColumnIndex(column) ⇒ <code>Array</code>
Returns the index of the maximum value of one column

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>number</code> | Column index |

<a name="Matrix+minColumn"></a>
### matrix.minColumn(column) ⇒ <code>number</code>
Returns the minimum value of one column

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>number</code> | Column index |

<a name="Matrix+minColumnIndex"></a>
### matrix.minColumnIndex(column) ⇒ <code>Array</code>
Returns the index of the minimum value of one column

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| column | <code>number</code> | Column index |

<a name="Matrix+diag"></a>
### matrix.diag() ⇒ <code>Array</code>
Returns an array containing the diagonal values of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+sum"></a>
### matrix.sum() ⇒ <code>number</code>
Returns the sum of all elements of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+mean"></a>
### matrix.mean() ⇒ <code>number</code>
Returns the mean of all elements of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+prod"></a>
### matrix.prod() ⇒ <code>number</code>
Returns the product of all elements of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+cumulativeSum"></a>
### matrix.cumulativeSum() ⇒ <code>[Matrix](#Matrix)</code>
Computes the cumulative sum of the matrix elements (in place, row by row)

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  
<a name="Matrix+dot"></a>
### matrix.dot(vector2) ⇒ <code>number</code>
Computes the dot (scalar) product between the matrix and another

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| vector2 | <code>[Matrix](#Matrix)</code> | vector |

<a name="Matrix+mmul"></a>
### matrix.mmul() ⇒ <code>[Matrix](#Matrix)</code>
Returns the matrix product between this and other

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+transpose"></a>
### matrix.transpose() ⇒ <code>[Matrix](#Matrix)</code>
Transposes the matrix and returns a new one containing the result

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+sortRows"></a>
### matrix.sortRows(compareFunction) ⇒ <code>[Matrix](#Matrix)</code>
Sorts the rows (in place)

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| compareFunction | <code>function</code> | usual Array.prototype.sort comparison function |

<a name="Matrix+sortColumns"></a>
### matrix.sortColumns(compareFunction) ⇒ <code>[Matrix](#Matrix)</code>
Sorts the columns (in place)

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| compareFunction | <code>function</code> | usual Array.prototype.sort comparison function |

<a name="Matrix+subMatrix"></a>
### matrix.subMatrix(startRow, endRow, startColumn, endColumn) ⇒ <code>[Matrix](#Matrix)</code>
Returns a subset of the matrix

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| startRow | <code>number</code> | First row index |
| endRow | <code>number</code> | Last row index |
| startColumn | <code>number</code> | First column index |
| endColumn | <code>number</code> | Last column index |

<a name="Matrix+subMatrixRow"></a>
### matrix.subMatrixRow(indices, [startColumn], [endColumn]) ⇒ <code>[Matrix](#Matrix)</code>
Returns a subset of the matrix based on an array of row indices

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| indices | <code>Array</code> |  | Array containing the row indices |
| [startColumn] | <code>number</code> | <code>0</code> | First column index |
| [endColumn] | <code>number</code> | <code>this.columns-1</code> | Last column index |

<a name="Matrix+subMatrixColumn"></a>
### matrix.subMatrixColumn(indices, [startRow], [endRow]) ⇒ <code>[Matrix](#Matrix)</code>
Returns a subset of the matrix based on an array of column indices

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| indices | <code>Array</code> |  | Array containing the column indices |
| [startRow] | <code>number</code> | <code>0</code> | First row index |
| [endRow] | <code>number</code> | <code>this.rows-1</code> | Last row index |

<a name="Matrix+trace"></a>
### matrix.trace() ⇒ <code>number</code>
Returns the trace of the matrix (sum of the diagonal elements)

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix.from1DArray"></a>
### Matrix.from1DArray(newRows, newColumns, newData) ⇒ <code>[Matrix](#Matrix)</code>
Constructs a Matrix with the chosen dimensions from a 1D array

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new matrix  

| Param | Type | Description |
| --- | --- | --- |
| newRows | <code>number</code> | Number of rows |
| newColumns | <code>number</code> | Number of columns |
| newData | <code>Array</code> | A 1D array containing data for the matrix |

<a name="Matrix.rowVector"></a>
### Matrix.rowVector(newData) ⇒ <code>[Matrix](#Matrix)</code>
Creates a row vector, a matrix with only one row.

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new matrix  

| Param | Type | Description |
| --- | --- | --- |
| newData | <code>Array</code> | A 1D array containing data for the vector |

<a name="Matrix.columnVector"></a>
### Matrix.columnVector(newData) ⇒ <code>[Matrix](#Matrix)</code>
Creates a column vector, a matrix with only one column.

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new matrix  

| Param | Type | Description |
| --- | --- | --- |
| newData | <code>Array</code> | A 1D array containing data for the vector |

<a name="Matrix.empty"></a>
### Matrix.empty(rows, columns) ⇒ <code>[Matrix](#Matrix)</code>
Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new matrix  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>number</code> | Number of rows |
| columns | <code>number</code> | Number of columns |

<a name="Matrix.zeros"></a>
### Matrix.zeros(rows, columns) ⇒ <code>[Matrix](#Matrix)</code>
Creates a matrix with the given dimensions. Values will be set to zero.

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new matrix  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>number</code> | Number of rows |
| columns | <code>number</code> | Number of columns |

<a name="Matrix.ones"></a>
### Matrix.ones(rows, columns) ⇒ <code>[Matrix](#Matrix)</code>
Creates a matrix with the given dimensions. Values will be set to one.

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new matrix  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>number</code> | Number of rows |
| columns | <code>number</code> | Number of columns |

<a name="Matrix.rand"></a>
### Matrix.rand(rows, columns, [rng]) ⇒ <code>[Matrix](#Matrix)</code>
Creates a matrix with the given dimensions. Values will be randomly set.

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - The new matrix  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>number</code> | Number of rows |
| columns | <code>number</code> | Number of columns |
| [rng] | <code>function</code> | Random number generator (default: Math.random) |

<a name="Matrix.eye"></a>
### Matrix.eye(rows, [columns]) ⇒ <code>[Matrix](#Matrix)</code>
Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and others will be 0.

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new identity matrix  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>number</code> | Number of rows |
| [columns] | <code>number</code> | Number of columns (Default: rows) |

<a name="Matrix.diag"></a>
### Matrix.diag(data, [rows], [columns]) ⇒ <code>[Matrix](#Matrix)</code>
Creates a diagonal matrix based on the given array.

**Kind**: static method of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>[Matrix](#Matrix)</code> - - The new diagonal matrix  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | Array containing the data for the diagonal |
| [rows] | <code>number</code> | Number of rows (Default: data.length) |
| [columns] | <code>number</code> | Number of columns (Default: rows) |

<a name="Matrix.min"></a>
### Matrix.min(matrix1, matrix2) ⇒ <code>[Matrix](#Matrix)</code>
Returns a matrix whose elements are the minimum between matrix1 and matrix2

**Kind**: static method of <code>[Matrix](#Matrix)</code>  

| Param |
| --- |
| matrix1 | 
| matrix2 | 

<a name="Matrix.max"></a>
### Matrix.max(matrix1, matrix2) ⇒ <code>[Matrix](#Matrix)</code>
Returns a matrix whose elements are the maximum between matrix1 and matrix2

**Kind**: static method of <code>[Matrix](#Matrix)</code>  

| Param |
| --- |
| matrix1 | 
| matrix2 | 

<a name="Matrix.checkMatrix"></a>
### Matrix.checkMatrix(value) ⇒ <code>[Matrix](#Matrix)</code>
Check that the provided value is a Matrix and tries to instantiate one if not

**Kind**: static method of <code>[Matrix](#Matrix)</code>  

| Param | Description |
| --- | --- |
| value | The value to check |

<a name="Matrix.isMatrix"></a>
### Matrix.isMatrix(value) ⇒ <code>boolean</code>
Returns true if the argument is a Matrix, false otherwise

**Kind**: static method of <code>[Matrix](#Matrix)</code>  

| Param | Description |
| --- | --- |
| value | The value to check |

