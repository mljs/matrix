import { describe, it, expect } from 'vitest';

import { Matrix, MatrixRowView } from '../..';

describe('Row view', () => {
  it('should set and get column values', () => {
    const m = Matrix.ones(5, 8);
    const mrv1 = new MatrixRowView(m, 0);
    const mrv2 = new MatrixRowView(m, 3);

    m.set(0, 3, 5);
    m.set(2, 2, 12);
    m.set(3, 4, 10);

    expect(mrv1.get(0, 3)).toBe(5);
    expect(mrv2.get(0, 3)).toBe(1);

    mrv2.set(0, 3, 11);
    expect(mrv2.get(0, 3)).toBe(11);

    expect(mrv1.get(0, 2)).toBe(1);
    expect(mrv2.get(0, 2)).toBe(1);

    expect(mrv1.get(0, 4)).toBe(1);
    expect(mrv2.get(0, 4)).toBe(10);

    expect(mrv1.to1DArray()).toStrictEqual([1, 1, 1, 5, 1, 1, 1, 1]);
    expect(mrv2.to1DArray()).toStrictEqual([1, 1, 1, 11, 10, 1, 1, 1]);

    expect(mrv1.isRowVector()).toBe(true);
    expect(mrv2.isRowVector()).toBe(true);
  });
});
