import { Matrix, MatrixSelectionView } from '../..';

describe('Selection view', () => {
  it('should correctly remap coordinates', () => {
    const m = Matrix.ones(5, 8);
    const msv = new MatrixSelectionView(m, [1, 2], [2, 1]);

    expect(m.get(1, 2)).toBe(1);
    msv.set(0, 0, 5);
    expect(m.get(1, 2)).toBe(5);

    expect(m.get(2, 1)).toBe(1);
    m.set(2, 1, 10);
    expect(msv.get(1, 1)).toBe(10);
  });

  it('should handle typed arrays', () => {
    const m = Matrix.ones(5, 8);
    const msv = new MatrixSelectionView(
      m,
      Int8Array.from([1, 2]),
      Int8Array.from([2, 1]),
    );

    expect(m.get(1, 2)).toBe(1);
    msv.set(0, 0, 5);
    expect(m.get(1, 2)).toBe(5);

    expect(m.get(2, 1)).toBe(1);
    m.set(2, 1, 10);
    expect(msv.get(1, 1)).toBe(10);
  });

  it('should throw when wrong arguments or range', () => {
    const m = Matrix.ones(2, 2);
    expect(() => new MatrixSelectionView(m, [1, 1, 2], [0, 2])).toThrow(
      RangeError,
    );
    expect(() => new MatrixSelectionView(m, [1, 1])).toThrow(TypeError);
  });
});
