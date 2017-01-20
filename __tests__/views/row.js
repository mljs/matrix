import 'should';

import Matrix from '../../src';

describe('Row view', function () {
    it('should set and get column values', function () {
        const m = Matrix.ones(5, 8);
        const mrv1 = m.rowView(0);
        const mrv2 = m.rowView(3);

        m.set(0, 3, 5);
        m.set(2, 2, 12);
        m.set(3, 4, 10);

        mrv1.get(0, 3).should.equal(5);
        mrv2.get(0, 3).should.equal(1);

        mrv1.get(0, 2).should.equal(1);
        mrv2.get(0, 2).should.equal(1);

        mrv1.get(0, 4).should.equal(1);
        mrv2.get(0, 4).should.equal(10);

        mrv1.to1DArray().should.eql([1, 1, 1, 5, 1, 1, 1, 1]);
        mrv2.to1DArray().should.eql([1, 1, 1, 1, 10, 1, 1, 1]);

        mrv1.isRowVector().should.be.true();
        mrv2.isRowVector().should.be.true();
    });
});
