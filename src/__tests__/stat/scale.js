import { Matrix } from '../..';

describe('scale matrix', () => {
  it('should scale by row', () => {
    const y = new Matrix([
      [1, 2, 3, 4, 5],
      [2, 4, 6, 8, 10],
      [3, 6, 9, 12, 15],
      [4, 8, 12, 16, 20],
      [5, 10, 15, 20, 25]
    ]);
    const scaled = y.scale('row');
    expect(scaled.data[0]).toStrictEqual([0.26967994498529685, 0.5393598899705937, 0.8090398349558905, 1.0787197799411874, 1.348399724926484]);
  });

  it('should scale by column', () => {
    const y = new Matrix([
      [1, 2, 3, 4, 5],
      [2, 4, 6, 8, 10],
      [3, 6, 9, 12, 15],
      [4, 8, 12, 16, 20],
      [5, 10, 15, 20, 25]
    ]);
    const scaled = y.scale('column');
    expect(scaled.data[0]).toStrictEqual([0.26967994498529685, 0.26967994498529685, 0.26967994498529685, 0.26967994498529685, 0.26967994498529685]);
  });
});
