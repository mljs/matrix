'use strict';

let benchmark = require('benchmark');

let { Matrix, MatrixTransposeView } = require('..');

let n = 100;

let A1 = Matrix.rand(n, n);
let A2 = Matrix.rand(n, n);

let suite = new benchmark.Suite();

suite
  .add('transpose mmul', () => {
    A1.transpose().mmul(A2);
  })
  .add('transposeView mmul', () => {
    let transposeA1 = new MatrixTransposeView(A1);
    transposeA1.mmul(A2);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
