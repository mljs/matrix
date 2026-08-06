import { describe, it, expect, vi, afterEach } from 'vitest';

import { Matrix } from '../..';

// https://github.com/mljs/matrix/issues/202
describe('mmul warns about an inner dimension that does not match', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function captureWarnings(callback) {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {
      // keep the reporter quiet
    });
    callback();
    return warn.mock.calls.map((call) => call[0]);
  }

  it('names both shapes when the other matrix is taller', () => {
    const messages = captureWarnings(() => {
      new Matrix([[1], [2], [3]]).mmul(
        new Matrix([
          [4, 5, 6],
          [4, 5, 6],
          [4, 5, 6],
        ]),
      );
    });
    expect(messages).toStrictEqual([
      'Multiplying 3 x 1 and 3 x 3 matrix: dimensions do not match.',
    ]);
  });

  it('names both shapes when the other matrix is shorter', () => {
    const messages = captureWarnings(() => {
      try {
        new Matrix([
          [1, 2, 3],
          [4, 5, 6],
        ]).mmul(new Matrix([[1], [2]]));
      } catch {
        // the call goes on to fail, the warning is what is under test here
      }
    });
    expect(messages).toStrictEqual([
      'Multiplying 2 x 3 and 2 x 1 matrix: dimensions do not match.',
    ]);
  });

  it('matches the wording the Strassen multiplication already uses', () => {
    const left = new Matrix([[1], [2], [3]]);
    const right = new Matrix([
      [4, 5, 6],
      [4, 5, 6],
      [4, 5, 6],
    ]);
    const fromMmul = captureWarnings(() => left.mmul(right));
    const fromStrassen = captureWarnings(() => left.mmulStrassen(right));
    expect(fromMmul).toStrictEqual(fromStrassen);
  });

  it('stays quiet on a pair that lines up', () => {
    const messages = captureWarnings(() => {
      new Matrix([
        [1, 2, 3],
        [4, 5, 6],
      ]).mmul(new Matrix([[1], [2], [3]]));
    });
    expect(messages).toStrictEqual([]);
  });

  it('stays quiet on a square product', () => {
    const messages = captureWarnings(() => {
      const square = new Matrix([
        [1, 2],
        [3, 4],
      ]);
      square.mmul(square);
    });
    expect(messages).toStrictEqual([]);
  });

  it('stays quiet when a degenerate pair still lines up', () => {
    const messages = captureWarnings(() => {
      new Matrix(2, 0).mmul(new Matrix(0, 3));
    });
    expect(messages).toStrictEqual([]);
  });

  it('leaves the computed values alone', () => {
    const messages = captureWarnings(() => {
      const result = new Matrix([[1], [2], [3]]).mmul(
        new Matrix([
          [4, 5, 6],
          [4, 5, 6],
          [4, 5, 6],
        ]),
      );
      expect(result.to2DArray()).toStrictEqual([
        [4, 5, 6],
        [8, 10, 12],
        [12, 15, 18],
      ]);
    });
    expect(messages).toHaveLength(1);
  });
});
