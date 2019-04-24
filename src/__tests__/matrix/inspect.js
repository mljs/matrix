import { inspect } from 'util';

import { Matrix } from '../..';

if (process.version.startsWith('8.')) {
  test('custom Node.js inspect (8.x)', () => {
    expect(true).toBe(true);
  });
} else {
  describe('custom Node.js inspect function', () => {
    it('should work with a simple matrix', () => {
      expect(
        inspect(new Matrix([[0, 10, 200], [-0.3, -0.44, -0.5555]]))
      ).toMatchSnapshot();
    });
  });
}
