import 'should';
import Matrix from '../../src';

describe('Selection view', function () {
    it('should correctly remap coordinates', function () {
        const m = Matrix.ones(5, 8);
        const msv = m.selectionRowView([1, 2]);

        m.get(1, 0).should.equal(1);
        msv.set(0, 0, 5);
        m.get(1, 0).should.equal(5);
    });

    it('should throw when wrong arguments or range', function () {
        const m = Matrix.ones(2, 2);
        (function () {
            m.selectionRowView([1, 1, 2]);
        }).should.throw(RangeError);

        (function () {
            m.selectionRowView(1);
        }).should.throw(TypeError);
    });
});
