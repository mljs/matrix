'use strict';

var n = parseInt(process.argv[2]) || 3;
var runs = parseInt(process.argv[3]) || 1;
console.log(`EVD benchmark for ${n}x${n} matrix (${runs} runs)`);

var prettyHrtime = require('pretty-hrtime');

var Matrix = require('../src/index');
//var numeric = require('numeric');

var m = Matrix.rand(n, n);

var matrix = new Matrix(m.to2DArray());
//var matrixNum = m.to2DArray();

run(function(){
    new Matrix.DC.EVD(matrix);
}, 'Matrix');

//run(function(){
//    numeric.eig(matrixNum);
//}, 'numeric');

function run(func, desc) {
    let time = process.hrtime();
    for (let i = 0; i < runs; i++) {
        func();
    }
    console.log(desc, prettyHrtime(process.hrtime(time)));
}
