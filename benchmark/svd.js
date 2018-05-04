'use strict';

var Benchmark = require('benchmark');
var numeric = require('numeric');

var { Matrix, SVD } = require('..');

var x = parseInt(process.argv[2], 10) || 5;
var y = parseInt(process.argv[3], 10) || x;
console.log(`SVD benchmark for ${x}x${y} matrix`);

var suite = new Benchmark.Suite();

var m = Matrix.rand(x, y);

var matrix = new Matrix(m.to2DArray());
var matrixNum = m.to2DArray();

suite
  .add('Matrix', function () {
    new SVD(matrix);
  })
  .add('numeric', function () {
    numeric.svd(matrixNum);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
