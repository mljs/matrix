'use strict';

const { Matrix, SVD, LU, EVD } = require('../matrix');

const algorithms = [SVD, LU, EVD];
const sizes = [10, 100, 500, 1000];
const TARGET_MS = 3000;

const benchmarks = [];
for (const size of sizes) benchmarks.push(test(size));
console.table(benchmarks);

function test(size) {
  const benchmark = { size };
  for (const Algo of algorithms) {
    // Fixed reusable matrix; decompositions clone internally so it is not mutated.
    const matrix = Matrix.rand(size, size, { random: mulberry32(size) });

    // warm-up
    void new Algo(matrix);

    let count = 1;
    const start = performance.now();
    void new Algo(matrix);
    const first = performance.now() - start;
    if (first < TARGET_MS) {
      count = Math.ceil(TARGET_MS / first);
      for (let i = 0; i < count - 1; i++) void new Algo(matrix);
    }
    const time = (performance.now() - start) / count;
    benchmark[Algo.name] = Number(time.toFixed(4));
  }
  return benchmark;
}

// Deterministic PRNG so every run/layout uses identical input matrices.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
