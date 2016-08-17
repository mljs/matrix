'use strict';

var x = parseInt(process.argv[2]) || 5;
var y = parseInt(process.argv[3]) || x;
// console.log(`mmul operations benchmark for ${x}x${y} matrix`);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var Matrix = require('../src/index');

Matrix.prototype.mmul_strassen = function(x, y){
    var r1 = x.rows;
    var c1 = x.columns;
    var r2 = y.rows;
    var c2 = y.columns;
    if(c1 != r2){
       console.log(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`)
    }

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


    // Make sure both matrices are the same size.
    // This is exclusively for simplicity:
    // this algorithm can be implemented with matrices of different sizes.

    var r = Math.max(r1, r2);
    var c = Math.max(c1, c2);
    var x = embed(x, r, c);
    var y = embed(y, r, c);

    // Our recursive multiplication function.
    function block_mult(a, b, rows, cols){
        // For small matrices, resort to naive multiplication.
        if (rows <= 512 || cols <= 512){
            //console.log(`multiplication de ${a} et ${b}`)
            //console.log(a.mmul(b));
            return a.mmul(b); // a is equivalent to this
        }

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
        var c11 = Matrix.add(m1, m4);
        c11.sub(m5);
        c11.add(m7);
        var c12 = Matrix.add(m3,m5);
        var c21 = Matrix.add(m2,m4);
        var c22 = Matrix.sub(m1,m2);
        c22.add(m3);
        c22.add(m6);

        //Crop output to the desired size (undo dynamic padding).
        var resultat = Matrix.zeros(2*c11.rows, 2*c11.columns);
        resultat = resultat.setSubMatrix(c11, 0, 0);
        resultat = resultat.setSubMatrix(c12, c11.rows, 0)
        resultat = resultat.setSubMatrix(c21, 0, c11.columns);
        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
        return resultat.subMatrix(0, rows - 1, 0, cols - 1);
    }

    var resultat_final =  block_mult(x, y, r, c);
    return resultat_final;
};

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

console.time("r1");
var r1 = m.mmul(m2);
console.timeEnd("r1")
console.time("r2")
var r2 = m.mmul_strassen(m, m2);
console.timeEnd("r2")

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