'use strict';

const { Matrix, SVD } = require('..');

const m = Matrix.randInt(100, 200);
const n = Matrix.randInt(200, 100);

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
for (var i = 0; i < 10; i++) {
  test();
}
console.timeEnd('test');
