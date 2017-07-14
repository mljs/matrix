import 'should';
import Matrix from '../../src';

describe('Selection column view', function () {
    it('should correctly remap coordinates', function () {
        const m = Matrix.ones(5, 8);
        const msv = m.selectionColumnView([1, 2]);

        m.get(0, 2).should.equal(1);
        msv.set(0, 1, 5);
        m.get(0, 2).should.equal(5);
    });

    it('should throw when wrong arguments or range', function () {
        const m = Matrix.ones(2, 2);
        (function () {
            m.selectionColumnView([1, 1, 2]);
        }).should.throw(RangeError);

        (function () {
            m.selectionColumnView(1);
        }).should.throw(TypeError);
    });
});
