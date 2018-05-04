'use strict';

class ExtendedArray extends Array {}
class ExtendedArray2 extends Array {
  constructor(size) {
    super(size);
  }
}

var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var length = 6;

suite
  .add('new Array', function () {
    new Array(length);
  })
  .add('Array', function () {
    Array(length);
  })
  .add('new ExtendedArray', function () {
    new ExtendedArray(length);
  })
  .add('new ExtendedArray2', function () {
    new ExtendedArray2(length);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
