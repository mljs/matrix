'use strict';

const { Matrix, SVD } = require('..');

const m = Matrix.randInt(200, 300);
const n = Matrix.randInt(300, 200);

function test() {
  const x = n.mmul(m);
  x.add(10);
  return new SVD(x);
}

test();
test();
test();

console.log('now test');

console.time('test');
for (let i = 0; i < 10; i++) {
  test();
}
console.timeEnd('test');
