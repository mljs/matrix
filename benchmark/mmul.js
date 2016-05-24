'use strict';

var x = parseInt(process.argv[2]) || 5;
var y = parseInt(process.argv[3]) || x;
console.log(`mmul operations benchmark for ${x}x${y} matrix`);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var Matrix = require('../src/index');

Matrix.prototype.mmul2 = function (other) {
    other = Matrix.checkMatrix(other);
    if (this.columns !== other.rows)
        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

    var m = this.rows;
    var n = this.columns;
    var p = other.columns;

    var result = Matrix.zeros(m, p);
    for (var i = 0; i < m; i++) {
        for (var k = 0; k < n; k++) {
            for (var j = 0; j < p; j++) {
                result[i][j] += this[i][k] * other[k][j];
            }
        }
    }
    return result;
};

var m = Matrix.rand(x, y);
var m2 = Matrix.rand(y, x);

suite
    .add('mmul1', function() {
        m.mmul(m2);
    })
    .add('mmul2', function() {
        m.mmul2(m2);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
