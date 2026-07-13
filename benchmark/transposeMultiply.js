'use strict';

// Compares `A.transpose().mmul(B)` (materializes the transpose) with the fused
// `A.transposeMultiply(B)` (streams rows, never materializes the transpose).
// Run after `npm run compile`: node benchmark/transposeMultiply.js

let benchmark = require('benchmark');

let { Matrix } = require('..');
let { SparseMatrix } = require('ml-sparse-matrix');

// (m x n)ᵀ · (m x p) -> (n x p)
const cases = [
  { m: 256, n: 256, p: 256, label: 'dense 256' },
  { m: 512, n: 512, p: 512, label: 'dense 512' },
  { m: 252, n: 252, p: 210, label: 'dense 252x210 (NMR block)' },
];

for (const { m, n, p, label } of cases) {
  const A = Matrix.rand(m, n);
  const B = Matrix.rand(m, p);

  const reference = A.transpose().mmul(B);
  const fused = A.transposeMultiply(B);
  if (!reference.to2DArray().flat().every((v, i) => v === fused.to2DArray().flat()[i])) {
    throw new Error('transposeMultiply result differs from transpose().mmul()');
  }

  new benchmark.Suite(label)
    .add(`${label}: transpose().mmul()`, () => {
      A.transpose().mmul(B);
    })
    .add(`${label}: transposeMultiply()`, () => {
      A.transposeMultiply(B);
    })
    .on('cycle', (event) => {
      console.log(String(event.target));
    })
    .on('complete', function onComplete() {
      console.log(`  fastest: ${this.filter('fastest').map('name')}\n`);
    })
    .run();
}

// Sparse `this`: the zero-skip in transposeMultiply avoids most of the work.
// Build the sparse operand with the real ml-sparse-matrix package (a few
// non-zeros per row, as in the NMR spin-simulation operators) and densify it,
// the path such callers take before multiplying.
const builder = new SparseMatrix(512, 512);
for (let i = 0; i < 512; i++) {
  for (let k = 0; k < 9; k++) builder.set(i, (i * 31 + k * 101) % 512, k + 1);
}
const sparse = new Matrix(builder.to2DArray());
const dense = Matrix.rand(512, 256);
new benchmark.Suite('sparse')
  .add('sparse 512x512 (9 nnz/row): transpose().mmul()', () => {
    sparse.transpose().mmul(dense);
  })
  .add('sparse 512x512 (9 nnz/row): transposeMultiply()', () => {
    sparse.transposeMultiply(dense);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function onComplete() {
    console.log(`  fastest: ${this.filter('fastest').map('name')}`);
  })
  .run();
