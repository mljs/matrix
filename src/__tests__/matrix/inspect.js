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
});
