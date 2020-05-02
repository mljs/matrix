'use strict';

let Benchmark = require('benchmark');
let numeric = require('numeric');

let { Matrix, EVD } = require('..');

let n = parseInt(process.argv[2], 10) || 3;
console.log(`EVD benchmark for ${n}x${n} matrix`);

let suite = new Benchmark.Suite();

let m = Matrix.rand(n, n);

let matrix = new Matrix(m.to2DArray());
let matrixNum = m.to2DArray();

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
