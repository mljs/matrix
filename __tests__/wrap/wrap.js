import {wrap} from '../../src/index';

describe('manual creation', () => {
    it('WrapperMatrix1D creation', () => {
        var matrix = wrap([0, 1, 2, 3, 4, 5]);
        expect(matrix.get(0, 1)).toBe(1);
        matrix.set(0, 1, 2);
        expect(matrix.get(0, 1)).toBe(2);
    });

    it('WrapperMatrix2D creation', () => {
        var matrix = wrap([
            [1, 0],
            [0, 1]
        ]);
        expect(matrix.get(0, 0)).toBe(1);
        matrix.set(0, 0, 2);
        expect(matrix.get(0, 0)).toBe(2);
    });
});

test('error testing', () => {
    expect(() => wrap(2)).toThrow('the parameter is not an array');
});
