'use strict';

var Benchmark = require('benchmark');
var numeric = require('numeric');
var math = require('mathjs');

var { Matrix } = require('..');

var x = parseInt(process.argv[2], 10) || 5;
var y = parseInt(process.argv[3], 10) || x;
console.log(`Chain operations benchmark for ${x}x${y} matrix`);

var suite = new Benchmark.Suite();

var m = Matrix.rand(x, y);

var matrix = new Matrix(m.to2DArray());
var matrixNum = m.to2DArray();
var matrixMath = m.to2DArray();

suite
  .add('Matrix', function () {
    matrix
      .subS(5)
      .mulS(Math.PI)
      .abs();
  })
  .add('numeric', function () {
    numeric.abs(numeric.muleq(numeric.subeq(matrixNum, 5), Math.PI));
  })
  .add('mathjs', function () {
    math
      .chain(matrixMath)
      .subtract(5)
      .multiply(Math.PI)
      .abs()
      .done();
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
