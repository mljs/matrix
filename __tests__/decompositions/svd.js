import 'should';
import 'should-approximately-deep';

import {Matrix, SVD} from '../../src';

describe('Singular value decomposition', () => {
    describe('inverse', () => {
        var value = new Matrix([[1, 1], [2, 2]]);
        var target = new SVD(value);
        var expected = new Matrix([[0.1, 0.2], [0.1, 0.2]]);

        it('should solve with identity matrix', () => {
            var actual = target.solve(Matrix.eye(2));
            actual.should.approximatelyDeep(expected, 0.001);
        });

        it('should compute the inverse', () => {
            var actual = target.inverse();
            actual.should.approximatelyDeep(expected, 0.001);
        });
    });

    describe('less rows than columns, no autotranspose', () => {
        var value = new Matrix([[1, 2], [3, 4], [5, 6], [7, 8]]).transpose();
        var target = new SVD(value, {
            computeLeftSingularVectors: true,
            computeRightSingularVectors: true,
            autoTranspose: false
        });

        it('should be possible to get back original matrix', () => {
            var actual = target.leftSingularVectors.mmul(Matrix.diag(target.diagonal)).mmul(target.rightSingularVectors.transpose());
            actual.should.approximatelyDeep(value, 0.01);
        });

        it('left singular vectors', () => {
            var U = [[-0.641423027995072, -0.767187395072177], [-0.767187395072177, 0.641423027995072]];
            target.leftSingularVectors.should.approximatelyDeep(U, 0.01);
        });

        it('right singular vectors', () => {
            var V = [[-0.152483233310201, 0.822647472225661],
                [-0.349918371807964, 0.421375287684580],
                [-0.547353510305727, 0.0201031031435023],
                [-0.744788648803490, -0.381169081397574]];
            target.rightSingularVectors.subMatrix(0, 3, 0, 1).should.approximatelyDeep(V, 0.0001);
        });

        it('diagonal', () => {
            var S = [14.2690954992615, 0.626828232417543];
            target.diagonal.slice(0, 2).should.approximatelyDeep(S, 0.001);
        });
    });

    describe('more rows than columns', () => {
        var value = new Matrix([[1, 2], [3, 4], [5, 6], [7, 8]]);
        var target = new SVD(value, {
            computeLeftSingularVectors: true,
            computeRightSingularVectors: true,
            autoTranspose: false
        });

        it('should be possible to get back original matrix', () => {
            var actual = target.leftSingularVectors.mmul(Matrix.diag(target.diagonal)).mmul(target.rightSingularVectors.transpose());
            actual.should.approximatelyDeep(value, 0.01);
        });

        it('left singular vectors', () => {
            var U = [[0.152483233310201, 0.822647472225661],
                [0.349918371807964, 0.421375287684580],
                [0.547353510305727, 0.0201031031435023],
                [0.744788648803490, -0.381169081397574]];
            target.leftSingularVectors.subMatrix(0, 3, 0, 1).should.approximatelyDeep(U, 0.01);
        });

        it('right singular vectors', () => {
            var V = [[0.641423027995072, -0.767187395072177], [0.767187395072177, 0.641423027995072]];
            target.rightSingularVectors.should.approximatelyDeep(V, 0.0001);
        });

        it('diagonal', () => {
            var S = [14.2690954992615, 0.626828232417543];
            target.diagonal.slice(0, 2).should.approximatelyDeep(S, 0.001);
        });
    });

    describe('less rows than columns, with autotranspose', () => {
        var value = new Matrix([[1, 2], [3, 4], [5, 6], [7, 8]]).transpose();
        var target = new SVD(value, {
            computeLeftSingularVectors: true,
            computeRightSingularVectors: true,
            autoTranspose: true
        });

        it('should be possible to get back original matrix', () => {
            var actual = target.leftSingularVectors.mmul(Matrix.diag(target.diagonal)).mmul(target.rightSingularVectors.transpose());
            actual.should.approximatelyDeep(value, 0.01);
        });

        it('left singular vectors', () => {
            var U = [[0.641423027995072, -0.767187395072177], [0.767187395072177, 0.641423027995072]];
            target.leftSingularVectors.should.approximatelyDeep(U, 0.01);
        });

        it('right singular vectors', () => {
            var V = [[0.152483233310201, 0.822647472225661],
                [0.349918371807964, 0.421375287684580],
                [0.547353510305727, 0.0201031031435023],
                [0.744788648803490, -0.381169081397574]];
            target.rightSingularVectors.subMatrix(0, 3, 0, 1).should.approximatelyDeep(V, 0.0001);
        });

        it('diagonal', () => {
            var S = [14.2690954992615, 0.626828232417543];
            target.diagonal.slice(0, 2).should.approximatelyDeep(S, 0.001);
        });
    });

    describe('less rows than column, with autotranspose, not computing right singular vectors', () => {
        var value = new Matrix([[1, 2], [3, 4], [5, 6], [7, 8]]).transpose();
        var target = new SVD(value, {
            computeLeftSingularVectors: true,
            computeRightSingularVectors: false,
            autoTranspose: true
        });

        it('left singular vectors', () => {
            var U = [[0.641423027995072, -0.767187395072177], [0.767187395072177, 0.641423027995072]];
            target.leftSingularVectors.should.approximatelyDeep(U, 0.001);
        });

        it('right singular vectors (0)', () => {
            var V = [[0, 0], [0, 0], [0, 0], [0, 0]];
            target.rightSingularVectors.should.approximatelyDeep(V, 1e-6);
        });

        it('diagonal', () => {
            var S = [14.2690954992615, 0.626828232417543];
            target.diagonal.slice(0, 2).should.approximatelyDeep(S, 0.001);
        });
    });

    describe('less rows than column, with autotranspose, not computing left singular vectors', () => {
        var value = new Matrix([[1, 2], [3, 4], [5, 6], [7, 8]]).transpose();
        var target = new SVD(value, {
            computeLeftSingularVectors: false,
            computeRightSingularVectors: true,
            autoTranspose: true
        });

        it('left singular vectors', () => {
            var U = [[0, 0], [0, 0]];
            target.leftSingularVectors.should.approximatelyDeep(U, 1e-6);
        });

        it('right singular vectors', () => {
            var V = [[0.152483233310201, 0.822647472225661],
                [0.349918371807964, 0.421375287684580],
                [0.547353510305727, 0.0201031031435023],
                [0.744788648803490, -0.381169081397574]];
            target.rightSingularVectors.subMatrix(0, 3, 0, 1).should.approximatelyDeep(V, 0.0001);
        });

        it('diagonal', () => {
            var S = [14.2690954992615, 0.626828232417543];
            target.diagonal.slice(0, 2).should.approximatelyDeep(S, 0.001);
        });
    });

    it('autotranspose', () => {
        var value1 = new Matrix([[2.5, 2.4], [0.5, 0.7], [2.2, 2.9], [1.9, 2.2], [3.1, 3.0], [2.3, 2.7], [2.0, 1.6], [1.0, 1.1], [1.5, 1.6], [1.1, 0.9]]);
        var value2 = value1.transpose();

        var target1 = new SVD(value1, {autoTranspose: true});
        var target2 = new SVD(value2, {autoTranspose: true});

        expect(target1.rightSingularVectors).toEqual(target2.leftSingularVectors);
        expect(target1.leftSingularVectors).toEqual(target2.rightSingularVectors);
        expect(target1.diagonalMatrix).toEqual(target2.diagonalMatrix);
    });

    describe('solve', () => {
        var count = 100;
        var value = Matrix.empty(count, 3);
        var output = new Array(count);

        for (var i = 0; i < count; i++) {
            var x = i + 1;
            var y = 2 * (i + 1) - 1;
            value[i][0] = x;
            value[i][1] = y;
            value[i][2] = 1;
            output[i] = 4 * x - y + 3;
        }

        var target = new SVD(value);

        it('should decompose correctly', () => {
            var actual = target.leftSingularVectors.mmul(target.diagonalMatrix).mmul(target.rightSingularVectors.transpose());
            actual.should.approximatelyDeep(value, 1e-8);
        });

        it('should find the solution', () => {
            var solution = target.solve(Matrix.columnVector(output));
            var actual = value.mmul(solution).to1DArray();
            actual.should.approximatelyDeep(output, 1e-8);
        });
    });
});
