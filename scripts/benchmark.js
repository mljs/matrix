'use strict';

const { XSadd } = require('ml-xsadd');

const { Matrix, SVD, LU, EVD } = require('../matrix');

const sizes = [10, 100, 500, 1000];
const TARGET_MS = 3000;

// EVD has two code paths: orthes/hqr2 for general matrices and tred2/tql2 for
// symmetric ones. They are benchmarked separately ("EVD" vs "EVD (symmetric)").
const algorithms = [
  { name: 'SVD', make: (m) => new SVD(m), matrix: randomMatrix },
  { name: 'LU', make: (m) => new LU(m), matrix: randomMatrix },
  { name: 'EVD', make: (m) => new EVD(m), matrix: randomMatrix },
  {
    name: 'EVD (symmetric)',
    make: (m) => new EVD(m, { assumeSymmetric: true }),
    matrix: symmetricMatrix,
  },
];

const benchmarks = [];
for (const size of sizes) benchmarks.push(test(size));
console.table(benchmarks);

function test(size) {
  const benchmark = { size };
  for (const algorithm of algorithms) {
    // Fixed reusable matrix; decompositions clone internally so it is not mutated.
    const matrix = algorithm.matrix(size);

    // warm-up
    algorithm.make(matrix);

    let count = 1;
    const start = performance.now();
    algorithm.make(matrix);
    const first = performance.now() - start;
    if (first < TARGET_MS) {
      count = Math.ceil(TARGET_MS / first);
      for (let i = 0; i < count - 1; i++) algorithm.make(matrix);
    }
    const time = (performance.now() - start) / count;
    benchmark[algorithm.name] = Number(time.toFixed(4));
  }
  return benchmark;
}

// Deterministic seed so every run/layout uses identical input matrices.
function randomMatrix(size) {
  return Matrix.rand(size, size, { random: new XSadd(size).random });
}

function symmetricMatrix(size) {
  const base = Matrix.rand(size, size, { random: new XSadd(size).random });
  return base.add(base.transpose());
}
