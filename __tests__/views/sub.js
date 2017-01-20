import 'should';

import Matrix from '../../src';

describe('Sub view', function () {
    it('should correctly remap coordinates', function () {
        const m = Matrix.ones(5, 8);
        const msv = m.subMatrixView(3, 4, 6, 7);
        m.get(4, 7).should.equal(1);
        msv.set(1, 1, 20);
        m.get(4, 7).should.equal(20);
    });

    it('should throw when wrong arguments or range', function () {
        const m = Matrix.ones(2, 2);
        (function () {
            m.subMatrixView(0, 1);
        }).should.throw(TypeError);

        (function () {
            m.subMatrixView(0, 1, 0, 2);
        }).should.throw(RangeError);
    });
});
