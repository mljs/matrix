import Matrix from '../..';

describe('min - max', () => {
    const matrix1 = new Matrix([[0, 1, 2], [3, 4, 5]]);
    const matrix2 = new Matrix([[3, 0, 2], [-6, 2, 12]]);

    it('min', () => {
        expect(Matrix.min(matrix1, matrix2).to2DArray()).toEqual([[0, 0, 2], [-6, 2, 5]]);
    });

    it('max', () => {
        expect(Matrix.max(matrix1, matrix2).to2DArray()).toEqual([[3, 1, 2], [3, 4, 12]]);
    });
});
