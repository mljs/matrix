import { inspect } from 'util';

import { Matrix } from '../..';

describe('custom Node.js inspect function', () => {
  it('should work with a simple matrix', () => {
    expect(
      inspect(
        new Matrix([
          [0, 10, 200],
          [-0.3, -0.44, -0.5555],
        ]),
      ),
    ).toMatchSnapshot();
  });
  it('should properly format numbers', () => {
    const a10 = Array.from({ length: 10 }, (_, i) => i);
    expect(
      inspect(
        new Matrix([
          a10,
          a10.map((e) => 0.123456789 * 10 ** e),
          a10.map((e) => 0.123456789 / 10 ** e),
          a10.map((e) => 0.123 * 10 ** e),
          a10.map((e) => 0.123 / 10 ** e),
          a10.map((e) => 0.12 * 10 ** e),
          a10.map((e) => 0.12 / 10 ** e),
        ]),
      ),
    ).toMatchSnapshot();
    expect(
      inspect(
        new Matrix([
          a10,
          a10.map((e) => (-1) ** e * 0.123456789 * 10 ** e),
          a10.map((e) => ((-1) ** e * -0.123456789) / 10 ** e),
          a10.map((e) => (-1) ** e * 0.123 * 10 ** e),
          a10.map((e) => ((-1) ** e * -0.123) / 10 ** e),
          a10.map((e) => (-1) ** e * 0.12 * 10 ** e),
          a10.map((e) => ((-1) ** e * -0.12) / 10 ** e),
        ]),
      ),
    ).toMatchSnapshot();
  });
});
