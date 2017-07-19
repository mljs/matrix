# ml-matrix

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

Matrix manipulation and computation library.

## Installation

`$ npm install --save ml-matrix`

## Usage

### As an ES module

```js
import Matrix from 'ml-matrix';

const matrix = Matrix.ones(5, 5);
```

### As a CommonJS module

```js
const {Matrix} = require('ml-matrix');

const matrix = Matrix.ones(5, 5);
```

## [API Documentation](https://mljs.github.io/matrix/)

## Examples 

``` javascript
const {Matrix} = require('ml-matrix');

var A = new Matrix([[1, 1], [2, 2]]);
var B = new Matrix([[3, 3], [1, 1]]);
var C = new Matrix([[3, 3], [1, 1]]);

// ============================
// Operations with the matrix :
// =============================

// operations :
const addition = Matrix.add(A, B); // addition = Matrix [[4, 4], [3, 3], rows: 2, columns: 2]
const substraction = Matrix.sub(A, B); // substraction = Matrix [[-2, -2], [1, 1], rows: 2, columns: 2]
const multiplication = A.mmul(B); // multiplication = Matrix [[4, 4], [8, 8], rows: 2, columns: 2]
const mulByNumber = Matrix.mul(A, 10); // mulByNumber = Matrix [[10, 10], [20, 20], rows: 2, columns: 2]
const divByNumber = Matrix.div(A, 10); // divByNumber = Matrix [[0.1, 0.1], [0.2, 0.2], rows: 2, columns: 2]
const modulo = Matrix.mod(B, 2); // modulo = Matrix [[ 1, 1], [1, 1], rows: 2, columns: 2]
const maxMatrix = Matrix.max(A, B); // max = Matrix [[3, 3], [2, 2], rows: 2, columns: 2]
const minMatrix = Matrix.min(A, B); // max = Matrix [[1, 1], [1, 1], rows: 2, columns: 2]

// Inplace operations : (consider that Cinit = C before all the operations below)
C.add(A); // => C = Cinit + A
C.sub(A); // => C = Cinit
C.mul(10); // => C = 10 * Cinit
C.div(10); // => C = Cinit
C.mod(2); // => C = Cinit % 2

// Standard Math operations : (abs, cos, round, etc.)
var A = new Matrix([[1, 1], [-1, -1]]);
var expon = Matrix.exp(A); // expon = Matrix [[Math.exp(1), Math.exp(1)], [Math.exp(-1), Math.exp(-1)], rows: 2, columns: 2]. 
var cosinus = Matrix.cos(A); // cosinus = Matrix [[Math.cos(1), Math.cos(1)], [Math.cos(-1), Math.cos(-1)], rows: 2, columns: 2]. 
var absolute = Matrix.abs(A); // expon = absolute [[1, 1], [1, 1], rows: 2, columns: 2]. 
// you can use 'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil', 'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p', 'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'
// Note : you can do it inplace too as A.abs()

// ============================
// Manipulation of the matrix :
// =============================

var numberRows = A.rows; // A has 2 rows
var numberCols = A.columns; // A has 2 columns
var firstValue = A.get(0, 0); // get(rows, columns)
var numberElements = A.size; // 2 * 2 = 4 elements
var isRow = A.isRowVector(); // false because A has more that 1 row
var isColumn = A.isColumnVector(); // false because A has more that 1 column
var isSquare = A.isSquare(); // true, because A is 2 * 2 matrix
var isSym = A.isSymmetric(); // false, because A is not symmetric
// remember : A = Matrix [[1, 1], [-1, -1], rows: 2, columns: 2]
A.set(1, 0, 10); // A = Matrix [[1, 1], [10, -1], rows: 2, columns: 2]. We have change the second row and the first column
var diag = A.diag(); // diag = [1, -1], i.e values in the diagonal.
var m = A.mean(); // m = 2.75
var product = A.prod(); // product = -10, i.e product of all values of the matrix
var norm = A.norm(); // norm = 10.14889156509222, i.e Frobenius norm of the matrix
var transpose = A.transpose(); // tranpose = Matrix [[1, 10], [1, -1], rows: 2, columns: 2]

// ============================
// Instanciation of matrix :
// =============================

var z = Matrix.zeros(3, 2); // z = Matrix [[0, 0], [0, 0], [0, 0], rows: 3, columns: 2]
var z = Matrix.ones(2, 3); // z = Matrix [[1, 1, 1], [1, 1, 1], rows: 2, columns: 3]
var z = Matrix.eye(3, 4); // Matrix [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], rows: 3, columns: 4]. there are 1 only in the diagonal
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-matrix.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-matrix
[travis-image]: https://img.shields.io/travis/mljs/matrix/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/matrix
[download-image]: https://img.shields.io/npm/dm/ml-matrix.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-matrix
