'use strict';

let Benchmark = require('benchmark');
let numeric = require('numeric');

let { Matrix, inverse } = require('..');

let x = parseInt(process.argv[2], 10) || 5;
let y = parseInt(process.argv[3], 10) || x;
console.log(`Inverse benchmark for ${x}x${y} matrix`);

let suite = new Benchmark.Suite();

let m = Matrix.rand(x, y);

let matrix = new Matrix(m.to2DArray());
let matrixNum = m.to2DArray();

suite
  .add('Matrix', function () {
    inverse(matrix);
  })
  .add('numeric', function () {
    numeric.inv(matrixNum);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
