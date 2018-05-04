'use strict';

var Benchmark = require('benchmark');
var numeric = require('numeric');

var { Matrix, EVD } = require('..');

var n = parseInt(process.argv[2], 10) || 3;
console.log(`EVD benchmark for ${n}x${n} matrix`);

var suite = new Benchmark.Suite();

var m = Matrix.rand(n, n);

var matrix = new Matrix(m.to2DArray());
var matrixNum = m.to2DArray();

suite
  .add('Matrix', function () {
    new EVD(matrix);
  })
  .add('numeric', function () {
    numeric.eig(matrixNum);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
