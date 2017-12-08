import {WrapperMatrix1D} from '../..';

describe('manual creation', () => {
    it('default WrapperMatrix1D creation', () => {
        var wrapperMatrix1D = new WrapperMatrix1D([0, 1, 2, 3, 4, 5]);
        expect(wrapperMatrix1D.rows).toBe(1);
        expect(wrapperMatrix1D.columns).toBe(6);

        expect(wrapperMatrix1D.get(0, 1)).toBe(1);
        wrapperMatrix1D.set(0, 1, 2);
        expect(wrapperMatrix1D.get(0, 1)).toBe(2);
    });

    it('more rows WrapperMatrix1D creation', () => {
        var wrapperMatrix1D = new WrapperMatrix1D([0, 1, 2, 3, 4, 5], {rows: 2});
        expect(wrapperMatrix1D.rows).toBe(2);
        expect(wrapperMatrix1D.columns).toBe(3);

        expect(wrapperMatrix1D.get(1, 1)).toBe(4);
        wrapperMatrix1D.set(1, 1, 2);
        expect(wrapperMatrix1D.get(1, 1)).toBe(2);
    });
});

test('error testing', () => {
    expect(() => new WrapperMatrix1D([0, 1, 2, 3, 4, 5, 6], {rows: 2})).toThrow('the data length is not divisible by the number of rows');
});
