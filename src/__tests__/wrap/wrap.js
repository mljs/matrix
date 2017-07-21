import {Matrix, wrap} from '../..';

describe('matrix creation', () => {
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
    expect(() => wrap(2)).toThrow('the argument is not an array');
});


it('matrix methods', () => {
    var matrix1 = wrap([0, 1, 2, 3], {rows: 2});
    var matrix2 = wrap([
        [1, 0],
        [0, 1]
    ]);

    var result = matrix1.mmul(matrix2);
    expect(result).toBeInstanceOf(Matrix);
    expect(result.to2DArray()).toEqual([[0, 1], [2, 3]]);

    result = matrix2.mmul(matrix1);
    expect(result).toBeInstanceOf(Matrix);
    expect(result.to2DArray()).toEqual([[0, 1], [2, 3]]);
});

