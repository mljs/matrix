import {WrapperMatrix2D} from '../..';

test('simple WrapperMatrix2D creation', () => {
    var wrapperMatrix2D = new WrapperMatrix2D([
        [1, 0],
        [0, 1]
    ]);
    expect(wrapperMatrix2D.rows).toBe(2);
    expect(wrapperMatrix2D.columns).toBe(2);

    expect(wrapperMatrix2D.get(0, 0)).toBe(1);
    wrapperMatrix2D.set(0, 0, 2);
    expect(wrapperMatrix2D.get(0, 0)).toBe(2);
});

