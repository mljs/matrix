'use strict';

var Matrix = require('../..');

describe('Selection view', function () {
    it('should correctly remap coordinates', function () {
        var m = Matrix.ones(5, 8);
        var msv = m.selectionView([1, 2], [2, 1]);

        m.get(1, 2).should.equal(1);
        msv.set(0, 0, 5);
        m.get(1, 2).should.equal(5);

        m.get(2, 1).should.equal(1);
        m.set(2, 1, 10);
        msv.get(1, 1).should.equal(10);
    });

    it('should throw when wrong arguments or range', function () {
        var m = Matrix.ones(2, 2);
        (function () {
            m.selectionView([1, 1, 2], [0, 2]);
        }).should.throw(RangeError);

        (function () {
            m.selectionView([1, 1, 2]);
        }).should.throw(TypeError);
    });
});
