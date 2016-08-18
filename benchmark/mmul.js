'use strict';

var x = parseInt(process.argv[2]) || 5;
var y = parseInt(process.argv[3]) || x;
// console.log(`mmul operations benchmark for ${x}x${y} matrix`);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var Matrix = require('../src/index');

function strassen_2x2(a,b){
    const a11 = a.get(0,0);
    const b11 = b.get(0,0);
    const a12 = a.get(0,1);
    const b12 = b.get(0,1);
    const a21 = a.get(1,0);
    const b21 = b.get(1,0);
    const a22 = a.get(1,1);
    const b22 = b.get(1,1);

    // Compute intermediate values.
    const m1 = (a11+a22)*(b11+b22);
    const m2 = (a21+a22)*b11;
    const m3 = a11*(b12-b22);
    const m4 = a22*(b21-b11);
    const m5 = (a11+a12)*b22;
    const m6 = (a21-a11)*(b11+b12);
    const m7 = (a12-a22)*(b21+b22);

    // Combine intermediate values into the output.
    const c00 =m1+m4-m5+m7;
    const c01 = m3+m5;
    const c10 = m2+m4;
    const c11 = m1-m2+m3+m6;

    a.set(0,0,c00);
    a.set(0,1,c01);
    a.set(1,0,c10);
    a.set(1,1,c11);
    return a;
}

function strassen_3x3(a,b){
    const a00 = a.get(0,0);
    const a01 = a.get(0,1);
    const a02 = a.get(0,2);
    const a10 = a.get(1,0);
    const a11 = a.get(1,1);
    const a12 = a.get(1,2);
    const a20 = a.get(2,0);
    const a21 = a.get(2,1);
    const a22 = a.get(2,2);

    const b00 = b.get(0,0);
    const b01 = b.get(0,1);
    const b02 = b.get(0,2);
    const b10 = b.get(1,0);
    const b11 = b.get(1,1);
    const b12 = b.get(1,2);
    const b20 = b.get(2,0);
    const b21 = b.get(2,1);
    const b22 = b.get(2,2);

    const m1 = (a00+a01+a02-a10-a11-a21-a22)*b11;
    const m2 = (a00-a10)*(-b01+b11);
    const m3 = a11*(-b00+b01+b10-b11-b12-b20+b22);
    const m4 = (-a00+a10+a11)*(b00-b01+b11);
    const m5 = (a10+a11)*(-b00+b01);
    const m6 = a00*b00;
    const m7 = (-a00+a20+a21)*(b00-b02+b12);
    const m8 = (-a00+a20)*(b02-b12);
    const m9 = (a20+a21)*(-b00+b02);
    const m10 = (a00+a01+a02-a11-a12-a20-a21)*b12;
    const m11 = a21*(-b00+b02+b10-b11-b12-b20+b21);
    const m12 = (-a02+a21+a22)*(b11+b20-b21);
    const m13 = (a02-a22)*(b11-b21);
    const m14 = a02*b20;
    const m15 = (a21+a22)*(-b20+b21);
    const m16 = (-a02+a11+a12)*(b12+b20-b22);
    const m17 = (a02-a12)*(b12-b22);
    const m18 = (a11+a12)*(-b20+b22);
    const m19= a01*b10;
    const m20 = a12*b21;
    const m21 = a10*b02;
    const m22 = a20*b01;
    const m23 = a22*b22;

    const c00 = m6+m14+m19;
    const c01 = m1+m4+m5+m5+m12+m14+m15;
    const c02 = m6+m7+m9+m10+m14+m16+m18;
    const c10 = m2+m3+m4+m6+m14+m16+m17;
    const c11 = m2+m4+m5+m6+m20;
    const c12 = m14+m16+m17+m18+m21;
    const c20 = m6+m7+m8+m11+m12+m13+m14;
    const c21 = m12+m13+m14+m15+m22;
    const c22 = m6+m7+m8+m9+m23;

    a.set(0,0,c00);
    a.set(0,1,c01);
    a.set(0,2,c02);
    a.set(1,0,c10);
    a.set(1,1,c11);
    a.set(1,2,c12);
    a.set(2,0,c20);
    a.set(2,1,c21);
    a.set(2,2,c22);
    return a;
}

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
var a0 = m.clone();
var a1 = m.clone();

/*if(x == 2 && y == 2){
    console.log("Test avec Strassen 2*2")
    console.time("r3")
    var r3 =strassen_2x2(a0, m2);
    console.timeEnd("r3")
}
if(x == 3 && y == 3){
    console.log("Test avec Strassen 3*3")
    console.time("r3")
    var r3 =strassen_3x3(a1, m2);
    console.timeEnd("r3")
}*/
if(x == 2 && y == 2){
    suite
        .add('mmul1', function() {
            m.mmul(m2);
        })
        .add('mmul_strassen', function() {
            m.mmul_strassen(m, m2);
        })
        .add('strassen 2x2', function() {
            strassen_2x2(a0, m2); // a0 is a copy of m
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
            m.mmul_strassen(m, m2);
        })
        .add('strassen 3x3', function() {
            strassen_3x3(a0, m2); // a0 is a copy of m
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
            m.mmul_strassen(m, m2);
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
    var r2 = m.mmul_strassen(m, m2);
    console.timeEnd("mmul strassen dynamic padding")
}