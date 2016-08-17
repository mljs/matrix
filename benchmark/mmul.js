'use strict';

var x = parseInt(process.argv[2]) || 5;
var y = parseInt(process.argv[3]) || x;
// console.log(`mmul operations benchmark for ${x}x${y} matrix`);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var Matrix = require('../src/index');

function strassen_2x2(a,b){
    var a11 = a.get(0,0);
    var b11 = b.get(0,0);
    var a12 = a.get(0,1);
    var b12 = b.get(0,1);
    var a21 = a.get(1,0);
    var b21 = b.get(1,0);
    var a22 = a.get(1,1);
    var b22 = b.get(1,1);

    // Compute intermediate values.
    var m1 = (a11+a22)*(b11+b22);
    var m2 = (a21+a22)*b11;
    var m3 = a11*(b12-b22);
    var m4 = a22*(b21-b11);
    var m5 = (a11+a12)*b22;
    var m6 = (a21-a11)*(b11+b12);
    var m7 = (a12-a22)*(b21+b22);

    // Combine intermediate values into the output.
    var c11 =m1+m4-m5+m7;
    var c12 = m3+m5;
    var c21 = m2+m4;
    var c22 = m1-m2+m3+m6;

    var c = new Matrix(2,2);
    c.set(0,0,c11);
    c.set(0,1,c12);
    c.set(1,0,c21);
    c.set(1,1,c22);
    return c;
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

/*console.log("test avec strassen n by n")
console.time("r0");
var r0 = m.mmul_strassen_2(m, m2);
console.timeEnd("r0")*/
console.log("test avec une implementation standard")
console.time("r1");
var r1 = m.mmul(m2);
console.timeEnd("r1")
console.log("test avec une implementation de Strassen basee sur du Dynamic Padding")
console.time("r2")
var r2 = m.mmul_strassen(m, m2);
console.timeEnd("r2")
if(x == 2 && y == 2){
    console.log("Test avec Strassen 2*2")
    console.time("r3")
    var r3 =strassen_2x2(m, m2);
    console.timeEnd("r3")
}

/*suite
    .add('mmul1', function() {
        m.mmul(m2);
    })
    .add('mmul2', function() {
        m.mmul_strassen(m, m2);
    })
    .on('cycle', function(event) {
         console.log(String(event.target));
    })
    .on('complete', function() {
         console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
*/