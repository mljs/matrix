'use strict';

var Matrix = require('../..');

describe('Sub view', function () {
    it('should correctly remap coordinates', function () {
        var m = Matrix.ones(5, 8);
        var msv = m.subMatrixView([1,2], [2,1]);

        m.get(1, 2).should.equal(1);
        msv.set(0, 0, 5);
        m.get(1, 2).should.equal(5);

        m.get(2,1).should.equal(1);
        m.set(2,1, 10);
        msv.get(1,1).should.equal(10);

        msv = m.subMatrixView(3,4,6,7);
        m.get(4,7).should.equal(1);
        msv.set(1, 1, 20);
        m.get(4,7).should.equal(20);
    });

    it('should throw when wrong arguments or range', function () {
        var m = Matrix.ones(2,2);
        (function () {
            m.subMatrixView(0,1);
        }).should.throw(TypeError);

        (function () {
            m.subMatrixView(0,1,0,2);
        }).should.throw(RangeError);

        (function () {
            m.subMatrixView([1,1,2], [0,2]);
        }).should.throw(RangeError);

        (function () {
            m.subMatrixView([1,1,2])
        }).should.throw(TypeError);
    });
});
