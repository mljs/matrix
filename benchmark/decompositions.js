'use strict';

const Benchmark = require('benchmark');
const { XSadd } = require('ml-xsadd');

const { Matrix, SVD, LU, EVD } = require('..');

const size = parseInt(process.argv[2], 10) || 200;
console.log(`Decomposition benchmark for ${size}x${size} matrix`);

// Deterministic input so every run uses identical matrices.
const general = Matrix.rand(size, size, { random: new XSadd(size).random });
const symmetric = general.add(general.transpose());

// EVD has two code paths: orthes/hqr2 for general matrices and tred2/tql2 for
// symmetric ones. They are benchmarked separately ("EVD" vs "EVD (symmetric)").
new Benchmark.Suite()
  .add('SVD', () => {
    new SVD(general);
  })
  .add('LU', () => {
    new LU(general);
  })
  .add('EVD', () => {
    new EVD(general);
  })
  .add('EVD (symmetric)', () => {
    new EVD(symmetric, { assumeSymmetric: true });
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
