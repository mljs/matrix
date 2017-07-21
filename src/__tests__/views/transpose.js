import Matrix from '../..';

describe('Transpose view', () => {
    it('should set and get opposite coordinates', () => {
        const m = Matrix.ones(5, 8);
        const mtv = m.transposeView();

        expect(m.get(1, 0)).toBe(1);
        mtv.set(0, 1, 5);
        expect(m.get(1, 0)).toBe(5);

        m.set(0, 0, 6);
        expect(mtv.get(0, 0)).toBe(6);

        m.set(2, 1, 10);
        expect(mtv.get(2, 1)).toBe(1);
        expect(mtv.get(1, 2)).toBe(10);
    });
});
