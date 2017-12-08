import Matrix from '../..';

describe('Selection column view', () => {
    it('should correctly remap coordinates', () => {
        const m = Matrix.ones(5, 8);
        const msv = m.columnSelectionView([1, 2]);

        expect(m.get(0, 2)).toBe(1);
        msv.set(0, 1, 5);
        expect(m.get(0, 2)).toBe(5);
    });

    it('should throw when wrong arguments or range', () => {
        const m = Matrix.ones(2, 2);
        expect(() => m.columnSelectionView([1, 1, 2])).toThrow('column indices are out of range');
        expect(() => m.columnSelectionView(1)).toThrow('unexpected type for column indices');
    });
});
