'use strict';

var Matrix = require('../..');

describe('Matrix views', function () {
    describe('Transpose view', function () {
        it('should set and get opposite coordinates', function () {
            var m = Matrix.ones(5, 8);
            var mtv = m.transposeView();

            m.get(1, 0).should.equal(1);
            mtv.set(0, 1, 5);
            m.get(1, 0).should.equal(5);

            m.set(0, 0, 6);
            mtv.get(0, 0).should.equal(6);

            m.set(2, 1, 10);
            mtv.get(2, 1).should.equal(1);
            mtv.get(1, 2).should.equal(10);
        });
    });
});
