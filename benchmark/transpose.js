'use strict';

let Benchmark = require('benchmark');
let numeric = require('numeric');

let { Matrix } = require('..');

let x = parseInt(process.argv[2], 10) || 5;
let y = parseInt(process.argv[3], 10) || x;
console.log(`Transpose benchmark for ${x}x${y} matrix`);

let suite = new Benchmark.Suite();

let m = Matrix.rand(x, y);

let matrix = new Matrix(m.to2DArray());
let matrixNum = m.to2DArray();

function transpose(mat) {
  let r = mat.length;
  let c = mat[0].length;
  let i = 0;
  let j;
  let result = new Array(c);
  for (; i < c; i++) {
    result[i] = new Array(r);
  }
  for (i = 0; i < c; i++) {
    for (j = 0; j < r; j++) {
      result[i][j] = mat[j][i];
    }
  }
  return result;
}

suite
  .add('Matrix', function () {
    matrix.transpose();
  })
  .add('numeric', function () {
    numeric.transpose(matrixNum);
  })
  .add('custom', function () {
    transpose(matrixNum);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
