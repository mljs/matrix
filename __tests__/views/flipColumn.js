import 'should';

import Matrix from '../../src';

describe('Flip column view', function () {
    it('should set and get values', function () {
        const m = Matrix.ones(5, 8);
        const view = m.flipColumnView();

        m.set(0, 3, 5);
        view.get(0, 4).should.equal(5);

        view.set(0, 0, 10);
        m.get(0, 7).should.equal(10);

        view.rows.should.equal(5);
        view.columns.should.equal(8);
    });
});
