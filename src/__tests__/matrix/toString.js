import { Matrix } from '../..';

describe('custom toString function', () => {
  it('should work with a simple matrix', () => {
    expect(
      new Matrix([
        [0, 10, 200],
        [-0.3, -0.44, -0.5555],
      ]).toString(),
    ).toMatchSnapshot();
  });

  it('should use clamp options', () => {
    expect(
      new Matrix([
        [10, 200, 3000000, 0, 1],
        [-0.5555, 901569741, 3, 4, 5],
      ]).toString({ maxRows: 1, maxColumns: 3, maxNumSize: 6 }),
    ).toMatchSnapshot();
  });
});
