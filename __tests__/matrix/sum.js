import 'should';

import Matrix from '../../src';

describe('sum by row and columns', function () {
    const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
    it('sum by row', function () {
        matrix.sum('row').to2DArray().should.eql([[6], [15]]);
    });

    it('sum by column', function () {
        matrix.sum('column').to2DArray().should.eql([[5, 7, 9]]);
    });

    it('sum all', function () {
        matrix.sum().should.be.equal(21);
    });
});
