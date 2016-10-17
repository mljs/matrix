'use strict';

var x = parseInt(process.argv[2]) || 5;
var y = parseInt(process.argv[3]) || x;
// console.log(`mmul operations benchmark for ${x}x${y} matrix`);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var Matrix = require('../src/index');

// bad, very bad...
function strassen_nxn(a,b){
    if(a.rows == 2){
        return strassen_2x2(a, b);
    }
    else{
        var size = a.rows;
        var size1 = size - 1;
        var demi_size0 = parseInt(size/2);
        var demi_size1 = parseInt(demi_size0 - 1);
        // a et b must be the same size and rows = columns

        var a11 = a.subMatrix(0, demi_size1, 0, demi_size1);
        var b11 = b.subMatrix(0, demi_size1, 0, demi_size1);
        var a12 = a.subMatrix(0, demi_size1, demi_size0, size1);
        var b12 = b.subMatrix(0, demi_size1, demi_size0, size1);
        var a21 = a.subMatrix(demi_size0, size1, 0, demi_size1);
        var b21 = b.subMatrix(demi_size0, size1, 0, demi_size1);
        var a22 = a.subMatrix(demi_size0, size1, demi_size0, size1);
        var b22 = b.subMatrix(demi_size0, size1, demi_size0, size1);

        // Compute intermediate values.
        var m1 = strassen_nxn(Matrix.add(a11,a22),Matrix.add(b11,b22));
        var m2 = strassen_nxn(Matrix.add(a21,a22),b11);
        var m3 = strassen_nxn(a11,Matrix.sub(b12,b22));
        var m4 = strassen_nxn(a22,Matrix.sub(b21,b11));
        var m5 = strassen_nxn(Matrix.add(a11,a12),b22);
        var m6 = strassen_nxn(Matrix.sub(a21,a11),Matrix.add(b11,b12));
        var m7 = strassen_nxn(Matrix.sub(a12,a22),Matrix.add(b21,b22));

        // Combine intermediate values into the output.
        var c11 = Matrix.add(m1,m4).sub(m5).add(m7);
        var c12 = Matrix.add(m3,m5);
        var c21 = Matrix.add(m2,m4);
        var c22 = Matrix.sub(m1,m2).add(m3).add(m6);

        var c = new Matrix(size,size);
        c.setSubMatrix(c11,0,0);
        c.setSubMatrix(c12,0,demi_size0);
        c.setSubMatrix(c21,demi_size0,0);
        c.setSubMatrix(c22,demi_size0,demi_size0);
        return c;
    }
}


var m = Matrix.randInt(x, y);
var m2 = Matrix.randInt(y, x);

if(x == 2 && y == 2){
    suite
        .add('mmul1', function() {
            m.mmul(m2);
        })
        .add('mmul_strassen', function() {
            m.mmulStrassen(m, m2);
        })
        .add('strassen 2x2', function() {
            m.strassen2x2(m2); // a0 is a copy of m
        })
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        .run();
}
else if(x == 3 && y == 3){
    suite
        .add('mmul1', function() {
            m.mmul(m2);
        })
        .add('mmul_strassen', function() {
            m.mmulStrassen(m, m2);
        })
        .add('strassen 3x3', function() {
            m.strassen3x3(m2); // a0 is a copy of m
        })
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        .run();
}
else if(Math.max(x,y) < 200){
    suite
        .add('mmul1', function() {
            m.mmul(m2);
        })
        .add('mmul_strassen', function() {
            m.mmulStrassen(m, m2);
        })
        .on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        .run();
}
else{
    console.time("mmul");
    var r1 = m.mmul(m2);
    console.timeEnd("mmul")
    console.time("mmul strassen dynamic padding")
    var r2 = m.mmulStrassen(m, m2);
    console.timeEnd("mmul strassen dynamic padding")
}