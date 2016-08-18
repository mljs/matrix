'use strict';

var x = parseInt(process.argv[2]) || 5;
var y = parseInt(process.argv[3]) || x;
// console.log(`mmul operations benchmark for ${x}x${y} matrix`);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var Matrix = require('../src/index');
var math = require('mathjs');

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

Matrix.prototype.mmul_strassen = function(x, y){
    var r1 = x.rows;
    var c1 = x.columns;
    var r2 = y.rows;
    var c2 = y.columns;
    if(c1 != r2){
       console.log(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`)
    }

    // Make sure both matrices are the same size.
    // This is exclusively for simplicity:
    // this algorithm can be implemented with matrices of different sizes.

    var r = Math.max(r1, r2);
    var c = Math.max(c1, c2);
    var x = embed(x, r, c);
    var y = embed(y, r, c);

    // Put a matrix into the top left of a matrix of zeros.
    // `rows` and `cols` are the dimensions of the output matrix.
    function embed(mat, rows, cols){
        var r = mat.rows;
        var c = mat.columns;
        if((r==rows) && (c==cols)){
            return mat;
        }
        else{
            var resultat = Matrix.zeros(rows, cols);
            resultat = resultat.setSubMatrix(mat, 0, 0);
            return resultat;
        }
    }

    // Our recursive multiplication function.
    function block_mult(a, b, rows, cols){
        // For small matrices, resort to naive multiplication.
        if (rows <= 128 || cols <= 128){
            return a.mmul(b); // a is equivalent to this
        }
        /*else if (rows == 2 || cols == 2){
            return strassen_2x2(a,b); // a is equivalent to this
        }*/


        // Apply dynamic padding.
        if ((rows % 2 == 1) && (cols % 2 == 1)) {
            a = embed(a, rows + 1, cols + 1);
            b = embed(b, rows + 1, cols + 1);
        }
        else if (rows % 2 == 1){
            a = embed(a, rows + 1, cols);
            b = embed(b, rows + 1, cols);
        }
        else if (cols % 2 == 1){
            a = embed(a, rows, cols + 1);
            b = embed(b, rows, cols + 1);
        }

        var half_rows = parseInt(a.rows / 2);
        var half_cols = parseInt(a.columns / 2);
        // Subdivide input matrices.
        var a11 = a.subMatrix(0, half_rows -1, 0, half_cols - 1);
        var b11 = b.subMatrix(0, half_rows -1, 0, half_cols - 1);

        var a12 = a.subMatrix(0, half_rows -1, half_cols, a.columns - 1);
        var b12 = b.subMatrix(0, half_rows -1,  half_cols, b.columns - 1);

        var a21 = a.subMatrix(half_rows, a.rows - 1,  0, half_cols - 1);
        var b21 = b.subMatrix(half_rows, b.rows - 1,  0, half_cols - 1);

        var a22 = a.subMatrix(half_rows, a.rows - 1, half_cols, a.columns - 1);
        var b22 = b.subMatrix(half_rows, b.rows - 1, half_cols, b.columns - 1);

        // Compute intermediate values.
        var m1 = block_mult(Matrix.add(a11,a22), Matrix.add(b11,b22), half_rows, half_cols);
        var m2 = block_mult(Matrix.add(a21,a22), b11, half_rows, half_cols);
        var m3 = block_mult(a11, Matrix.sub(b12, b22), half_rows, half_cols);
        var m4 = block_mult(a22, Matrix.sub(b21,b11), half_rows, half_cols);
        var m5 = block_mult(Matrix.add(a11,a12), b22, half_rows, half_cols);
        var m6 = block_mult(Matrix.sub(a21, a11), Matrix.add(b11, b12), half_rows, half_cols);
        var m7 = block_mult(Matrix.sub(a12,a22), Matrix.add(b21,b22), half_rows, half_cols);

        // Combine intermediate values into the output.
        var c11 = Matrix.add(m1, m4).sub(m5).add(m7);
        var c12 = Matrix.add(m3,m5);
        var c21 = Matrix.add(m2,m4);
        var c22 = Matrix.sub(m1,m2).add(m3).add(m6);

        //Crop output to the desired size (undo dynamic padding).
        var resultat = Matrix.zeros(2*c11.rows, 2*c11.columns);
        resultat = resultat.setSubMatrix(c11, 0, 0);
        resultat = resultat.setSubMatrix(c12, c11.rows, 0)
        resultat = resultat.setSubMatrix(c21, 0, c11.columns);
        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
        return resultat.subMatrix(0, rows - 1, 0, cols - 1);
    }

    return  block_mult(x, y, r, c);
};

var m = Matrix.randInt(x, y);
var m2 = Matrix.randInt(y, x);

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
    console.log("Test avec math.js")
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