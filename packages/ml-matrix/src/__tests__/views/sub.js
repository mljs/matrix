import Matrix from '../..';

describe('Sub view', () => {
    it('should correctly remap coordinates', () => {
        const m = Matrix.ones(5, 8);
        const msv = m.subMatrixView(3, 4, 6, 7);
        expect(m.get(4, 7)).toBe(1);
        msv.set(1, 1, 20);
        expect(m.get(4, 7)).toBe(20);
    });

    it('should throw when wrong arguments or range', () => {
        const m = Matrix.ones(2, 2);
        expect(() => m.subMatrixView(0, 1)).toThrow(TypeError);

        expect(() => m.subMatrixView(0, 1, 0, 2)).toThrow(RangeError);
    });
});
