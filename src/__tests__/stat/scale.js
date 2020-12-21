import { Matrix } from '../..';

describe('scale matrix', () => {
  let emptyMatrix;
  let zeroRowMatrix;
  let zeroColumnMatrix;
  beforeEach(() => {
    emptyMatrix = new Matrix(0, 0);
    zeroRowMatrix = new Matrix(0, 3);
    zeroColumnMatrix = new Matrix(2, 0);
  });
  it('should scale by row', () => {
    const y = new Matrix([
      [1, 2, 3, 4, 5],
      [2, 4, 6, 8, 10],
      [3, 6, 9, 12, 15],
      [4, 8, 12, 16, 20],
      [5, 10, 15, 20, 25],
    ]);
    const scaled = y.scale('row');
    expect(Array.from(scaled.data[0])).toStrictEqual([
      0.26967994498529685,
      0.5393598899705937,
      0.8090398349558905,
      1.0787197799411874,
      1.348399724926484,
    ]);
  });

  it('should scale by row for an empty matrix', () => {
    emptyMatrix.scale('row');
    expect(emptyMatrix.rows).toBe(0);
    expect(emptyMatrix.columns).toBe(0);
    zeroRowMatrix.scale('row');
    expect(zeroRowMatrix.rows).toBe(0);
    expect(zeroRowMatrix.columns).toBe(3);
    zeroColumnMatrix.scale('row');
    expect(zeroColumnMatrix.rows).toBe(2);
    expect(zeroColumnMatrix.columns).toBe(0);
  });

  it('should scale by column', () => {
    const y = new Matrix([
      [1, 2, 3, 4, 5],
      [2, 4, 6, 8, 10],
      [3, 6, 9, 12, 15],
      [4, 8, 12, 16, 20],
      [5, 10, 15, 20, 25],
    ]);
    const scaled = y.scale('column');
    expect(Array.from(scaled.data[0])).toStrictEqual([
      0.26967994498529685,
      0.26967994498529685,
      0.26967994498529685,
      0.26967994498529685,
      0.26967994498529685,
    ]);
  });

  it('should scale by column for an empty matrix', () => {
    emptyMatrix.scale('column');
    expect(emptyMatrix.rows).toBe(0);
    expect(emptyMatrix.columns).toBe(0);
    zeroRowMatrix.scale('column');
    expect(zeroRowMatrix.rows).toBe(0);
    expect(zeroRowMatrix.columns).toBe(3);
    zeroColumnMatrix.scale('column');
    expect(zeroColumnMatrix.rows).toBe(2);
    expect(zeroColumnMatrix.columns).toBe(0);
  });
});
