'use strict';

var Suite = require('benchmark').Suite;
var Matrix = require('..').Matrix;

var n = 100;

var A1 = Matrix.rand(n, n);
var A2 = Matrix.rand(n, n);

var suite = new Suite();

suite
    .add('transpose mmul', function () {
        A1.transpose().mmul(A2);
    })
    .add('transposeView mmul', function () {
        A1.transposeView().mmul(A2);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
