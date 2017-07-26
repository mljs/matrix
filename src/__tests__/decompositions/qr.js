import {Matrix, QR} from '../..';
import {toBeDeepCloseTo} from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

describe('Qr decomposition', () => {
    it('should compute lower triangular matrix', () => {
        // http://ch.mathworks.com/help/matlab/ref/qr.html
        let matrix = new Matrix([
            [3 / 2, 1, 0, 0],
            [1, 1 / 2, 1, 0],
            [0, 1, 1 / 2, 1],
            [0, 0, 1, 3 / 2]
        ]);

        const qr = new QR(matrix);
        expect(qr.isFullRank()).toBe(true);
    });

    it('should solve the value', () => {
        let A = new Matrix([
            [10000, 10001],
            [10002, 10003],
            [10004, 10001],
            [10002, 10003],
            [10004, 10005]
        ]);
        let b = Matrix.columnVector([20001, 20003, 20005, 20007, 20009]);

        const qr = new QR(A);
        expect(qr.solve(b)).toBeDeepCloseTo([[1], [0.9999]], 4);
    });
});

