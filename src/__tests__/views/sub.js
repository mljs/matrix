import { Matrix, MatrixSubView } from '../..';

describe('Sub view', () => {
  it('should correctly remap coordinates', () => {
    const m = Matrix.ones(5, 8);
    const msv = new MatrixSubView(m, 3, 4, 6, 7);
    expect(m.get(4, 7)).toBe(1);
    msv.set(1, 1, 20);
    expect(msv.get(1, 1)).toBe(20);
    expect(m.get(4, 7)).toBe(20);
  });

  it('should throw when wrong arguments or range', () => {
    const m = Matrix.ones(2, 2);
    expect(() => new MatrixSubView(m, 0, 1)).toThrow(TypeError);
    expect(() => new MatrixSubView(m, 0, 1, 0, 2)).toThrow(RangeError);
  });
});
