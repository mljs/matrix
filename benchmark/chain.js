'use strict';

let Benchmark = require('benchmark');
let math = require('mathjs');
let numeric = require('numeric');

let { Matrix } = require('..');

let x = parseInt(process.argv[2], 10) || 5;
let y = parseInt(process.argv[3], 10) || x;
console.log(`Chain operations benchmark for ${x}x${y} matrix`);

let suite = new Benchmark.Suite();

let m = Matrix.rand(x, y);

let matrix = new Matrix(m.to2DArray());
let matrixNum = m.to2DArray();
let matrixMath = m.to2DArray();

suite
  .add('Matrix', function () {
    matrix.subS(5).mulS(Math.PI).abs();
  })
  .add('numeric', function () {
    numeric.abs(numeric.muleq(numeric.subeq(matrixNum, 5), Math.PI));
  })
  .add('mathjs', function () {
    math.chain(matrixMath).subtract(5).multiply(Math.PI).abs().done();
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
