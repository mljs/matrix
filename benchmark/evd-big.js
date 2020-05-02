'use strict';

let numeric = require('numeric');
let prettyHrtime = require('pretty-hrtime');

let { Matrix, EVD } = require('..');

let n = parseInt(process.argv[2], 10) || 3;
let runs = parseInt(process.argv[3], 10) || 1;
console.log(`EVD benchmark for ${n}x${n} matrix (${runs} runs)`);

let m = Matrix.rand(n, n);

let matrix = new Matrix(m.to2DArray());
let matrixNum = m.to2DArray();

run(function () {
  new EVD(matrix);
}, 'Matrix');

run(function () {
  numeric.eig(matrixNum);
}, 'numeric');

function run(func, desc) {
  let time = process.hrtime();
  for (let i = 0; i < runs; i++) {
    func();
  }
  console.log(desc, prettyHrtime(process.hrtime(time)));
}
