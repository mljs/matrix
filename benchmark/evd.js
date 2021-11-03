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
  .add('Matrix', () => {
    new EVD(matrix);
  })
  .add('numeric', () => {
    numeric.eig(matrixNum);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
