import 'should';

import Matrix from '../../src';

describe('Column view', function () {
    it('should set and get row values', function () {
        const m = Matrix.ones(5, 8);
        const mcv1 = m.columnView(2);
        const mcv2 = m.columnView(3);

        m.set(2, 2, 12);
        m.set(0, 3, 5);
        m.set(3, 4, 10);

        mcv1.get(2, 0).should.equal(12);
        mcv2.get(2, 0).should.equal(1);

        mcv1.get(0, 0).should.equal(1);
        mcv2.get(0, 0).should.equal(5);

        mcv1.get(3, 0).should.equal(1);
        mcv2.get(3, 0).should.equal(1);

        mcv1.to1DArray().should.eql([1, 1, 12, 1, 1]);
        mcv2.to1DArray().should.eql([5, 1, 1, 1, 1]);

        mcv1.isColumnVector().should.be.true();
        mcv2.isColumnVector().should.be.true();
    });
});
