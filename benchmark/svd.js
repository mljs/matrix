'use strict';

var x = parseInt(process.argv[2]) || 5;
var y = parseInt(process.argv[3]) || x;
console.log(`SVD benchmark for ${x}x${y} matrix`);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var Matrix = require('../src/index');
var numeric = require('numeric');

var m = Matrix.rand(x, y);

var matrix = new Matrix(m.to2DArray());
var matrixNum = m.to2DArray();

suite
    .add('Matrix', function() {
        new Matrix.DC.SVD(matrix);
    })
    .add('numeric', function() {
        numeric.svd(matrixNum);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();
