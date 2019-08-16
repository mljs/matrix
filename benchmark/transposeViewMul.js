'use strict';

let benchmark = require('benchmark');

let { Matrix } = require('..');

let n = 100;

let A1 = Matrix.rand(n, n);
let A2 = Matrix.rand(n, n);

let suite = new benchmark.Suite();

suite
  .add('transpose mmul', function() {
    A1.transpose().mmul(A2);
  })
  .add('transposeView mmul', function() {
    A1.transposeView().mmul(A2);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
