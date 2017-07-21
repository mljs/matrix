import {Matrix, EVD} from '../..';

describe('Eigenvalue decomposition', () => {
    it('simple example', () => {
        var matrix = new Matrix([[1, 0], [1, 3]]);
        var evd = new EVD(matrix);
        expect(evd.realEigenvalues).toEqual([1, 3]);
        expect(evd.diagonalMatrix.to2DArray()).toEqual([[1, 0], [0, 3]]);
    });
});
