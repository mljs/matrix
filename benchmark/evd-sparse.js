'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const prettyHrtime = require('pretty-hrtime');

var Matrix = require('../src/index');
//const numeric = require('numeric');

test('../data/9S.csv');
test('../data/10S.csv');

function test(filename) {
    let contents = fs.readFileSync(path.join(__dirname, filename), 'utf8');
    parse(contents, {delimiter: ',', auto_parse: true}, function (err, mat) {
        const base = new Matrix(matrix);
        const matrix = new Matrix(base.to2DArray());
        //const matrixNum = base.to2DArray();

        console.log(`EVD benchmark for ${mat.length}x${mat.length} sparse matrix`);

        run(function(){
            new Matrix.DC.EVD(matrix);
        }, 'Matrix');

        //run(function(){
        //    numeric.eig(matrixNum);
        //}, 'numeric');

    });
}

function run(func, desc) {
    let time = process.hrtime();
    for (let i = 0; i < 1; i++) {
        func();
    }
    console.log(desc, prettyHrtime(process.hrtime(time)));
}
