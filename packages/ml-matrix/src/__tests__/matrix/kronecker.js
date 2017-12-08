import Matrix from '../..';

describe('Kronecker product', () => {
    it('should compute the Kronecker product', () => {
        const matrix1 = new Matrix([[1, 2], [3, 4]]);
        const matrix2 = new Matrix([[0, 5], [6, 7]]);
        const product = matrix1.kroneckerProduct(matrix2);
        expect(product.to2DArray()).toEqual([
            [0, 5, 0, 10],
            [6, 7, 12, 14],
            [0, 15, 0, 20],
            [18, 21, 24, 28]
        ]);
    });
});
