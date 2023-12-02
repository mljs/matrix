


let { Matrix, SVD, LU, EVD } = require('../matrix');

const algorithms = [SVD, LU, EVD];

const benchmarks = [];

test(10);
test(100);
test(500);
test(1000);
test(1500);

console.table(benchmarks);

function test(size) {
  const benchmark = {};
  benchmark.size = size;
  benchmarks.push(benchmark);

  for (const Algo of algorithms) {
    const matrix = Matrix.rand(size, size);
    let count = 1;
    const start = performance.now();
    const results = [new Algo(matrix)];
    const current = performance.now() - start;
    if (current < 5000) {
      count = Math.ceil(5000 / current);
      for (let i = 0; i < count - 1; i++) {
        results.push(new Algo(matrix));
      }
    }
    const time = (performance.now() - start) / results.length;
    benchmark[Algo.name] = time;
    console.log(`${Algo.name} ${size}x${size} matrix: ${time}ms (${count}x)`)
  }
}