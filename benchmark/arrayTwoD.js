'use strict';

class ExtendedArray extends Array {
  constructor(rows, columns) {
    super(rows);
    for (var i = 0; i < rows; i++) {
      this[i] = new Array(columns);
    }
  }
}

var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var rows = 1;
var columns = 150;

suite
  .add('Array', function () {
    var matrix = new Array(rows);
    for (var i = 0; i < rows; i++) {
      matrix[i] = new Array(columns);
    }
  })
  .add('ExtendedArray', function () {
    new ExtendedArray(rows, columns);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
