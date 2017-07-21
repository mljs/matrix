import Matrix from '../..';

describe('Column view', () => {
    it('should set and get row values', () => {
        const m = Matrix.ones(5, 8);
        const mcv1 = m.columnView(2);
        const mcv2 = m.columnView(3);

        m.set(2, 2, 12);
        m.set(0, 3, 5);
        m.set(3, 4, 10);

        expect(mcv1.get(2, 0)).toBe(12);
        expect(mcv2.get(2, 0)).toBe(1);

        expect(mcv1.get(0, 0)).toBe(1);
        expect(mcv2.get(0, 0)).toBe(5);

        expect(mcv1.get(3, 0)).toBe(1);
        expect(mcv2.get(3, 0)).toBe(1);

        expect(mcv1.to1DArray()).toEqual([1, 1, 12, 1, 1]);
        expect(mcv2.to1DArray()).toEqual([5, 1, 1, 1, 1]);

        expect(mcv1.isColumnVector()).toBe(true);
        expect(mcv2.isColumnVector()).toBe(true);
    });
});
