import BaseMatrix from '../../src';

test('simple BaseMatrix creation', () => {
    var baseMatrix = new BaseMatrix([
        [1, 0],
        [0, 1]
    ]);
    expect(baseMatrix.get(0, 0)).toBe(1);
    baseMatrix.set(0, 0, 2);
    expect(baseMatrix.get(0, 0)).toBe(2);
});

