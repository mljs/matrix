import { Matrix, MatrixRowSelectionView } from '../..';

describe('Selection view', () => {
  it('should correctly remap coordinates', () => {
    const m = Matrix.ones(5, 8);
    const msv = new MatrixRowSelectionView(m, [1, 2]);

    expect(m.get(1, 0)).toBe(1);
    msv.set(0, 0, 5);
    expect(msv.get(0, 0)).toBe(5);
    expect(m.get(1, 0)).toBe(5);
  });

  it('should throw when wrong arguments or range', () => {
    const m = Matrix.ones(2, 2);
    expect(() => new MatrixRowSelectionView(m, [1, 1, 2])).toThrow(
      'row indices are out of range',
    );
    expect(() => new MatrixRowSelectionView(m, 1)).toThrow(
      'unexpected type for row indices',
    );
  });
});
