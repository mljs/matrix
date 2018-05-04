'use strict';

var Benchmark = require('benchmark');
var numeric = require('numeric');

var { Matrix } = require('..');

var x = parseInt(process.argv[2], 10) || 5;
var y = parseInt(process.argv[3], 10) || x;
console.log(`Transpose benchmark for ${x}x${y} matrix`);

var suite = new Benchmark.Suite();

var m = Matrix.rand(x, y);

var matrix = new Matrix(m.to2DArray());
var matrixNum = m.to2DArray();

function transpose(m) {
  var r = m.length;
  var c = m[0].length;
  var i = 0;
  var j;
  var result = new Array(c);
  for (; i < c; i++) {
    result[i] = new Array(r);
  }
  for (i = 0; i < c; i++) {
    for (j = 0; j < r; j++) {
      result[i][j] = m[j][i];
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
