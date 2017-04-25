import 'should';

import Matrix from '../src/index-cjs';

describe('CJS file for npm', function () {
    it('should export Matrix and add properties to it', function () {
        Matrix.should.be.a.Function();
        Matrix.should.have.properties(['abstractMatrix', 'Decompositions', 'DC', 'inverse', 'solve']);
    });
});
