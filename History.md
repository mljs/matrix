<a name="3.0.0"></a>
# [3.0.0](https://github.com/mljs/matrix/compare/v2.3.0...v3.0.0) (2017-04-25)



<a name="2.3.0"></a>
# [2.3.0](https://github.com/mljs/matrix/compare/v2.2.0...v2.3.0) (2017-02-28)


### Features

* add pseudoinverse function based on SVD ([3279a15](https://github.com/mljs/matrix/commit/3279a15))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/mljs/matrix/compare/v2.1.0...v2.2.0) (2016-12-14)


### Bug Fixes

* Matrix and Lu circular dependency ([ab706b9](https://github.com/mljs/matrix/commit/ab706b9))
* styling issues picked up by Travis CI ([f211a1f](https://github.com/mljs/matrix/commit/f211a1f))


### Features

* **det:** add 2x2 and 3x3 determinants ([04ae195](https://github.com/mljs/matrix/commit/04ae195))
* **det:** add determinant based on LU decomposition ([90532ef](https://github.com/mljs/matrix/commit/90532ef))
* **det:** add determinant synonym ([5395b56](https://github.com/mljs/matrix/commit/5395b56))
* **sum:** sum by 'row' or 'column' ([bf5d070](https://github.com/mljs/matrix/commit/bf5d070))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/mljs/matrix/compare/v2.0.0...v2.1.0) (2016-10-07)


### Bug Fixes

* use Symbol.species as Matrix constructor in selection ([fee325e](https://github.com/mljs/matrix/commit/fee325e))
* use Symbol.species in evaluated static methods ([39800f9](https://github.com/mljs/matrix/commit/39800f9))


### Features

* add fast multiplication algorithm (strassen) ([fdc1c07](https://github.com/mljs/matrix/commit/fdc1c07))
* add maxValue option to Matrix.randInt ([e5a8541](https://github.com/mljs/matrix/commit/e5a8541))
* add value parameter to Matrix.eye ([f52e4fd](https://github.com/mljs/matrix/commit/f52e4fd))
* implement optimized algorithm for 2x2 and 3x3 multiplication ([4055ef9](https://github.com/mljs/matrix/commit/4055ef9))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mljs/matrix/compare/v1.4.0...v2.0.0) (2016-08-04)


### Features

* add column view ([5ff6680](https://github.com/mljs/matrix/commit/5ff6680))
* add concept of abstract matrix ([cbefc9b](https://github.com/mljs/matrix/commit/cbefc9b))
* add flipColumn and flipRow views ([55ee4a6](https://github.com/mljs/matrix/commit/55ee4a6))
* add method subMatrixView ([aa1df18](https://github.com/mljs/matrix/commit/aa1df18))
* add row view ([a9e99f2](https://github.com/mljs/matrix/commit/a9e99f2))
* add selection method and selection view ([59aa861](https://github.com/mljs/matrix/commit/59aa861))
* add transposeView ([fb0a0c9](https://github.com/mljs/matrix/commit/fb0a0c9))
* make use of Symbol.species to allow creating new matrices in any class ([eaee5de](https://github.com/mljs/matrix/commit/eaee5de))


### BREAKING CHANGES

* This is a non trivial change and could potentially break existing code.
There is no known backward incompatibility though.



<a name="1.4.0"></a>
# [1.4.0](https://github.com/mljs/matrix/compare/v1.3.0...v1.4.0) (2016-08-03)


### Features

* add method setSubMatrix ([89b4242](https://github.com/mljs/matrix/commit/89b4242))
* add method with one argument template ([b66ee9f](https://github.com/mljs/matrix/commit/b66ee9f))
* add repeat method ([8b9eecb](https://github.com/mljs/matrix/commit/8b9eecb))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/mljs/matrix/compare/v1.2.1...v1.3.0) (2016-07-25)


### Features

* add methods scaleRows and scaleColumns ([8516f83](https://github.com/mljs/matrix/commit/8516f83))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/mljs/matrix/compare/v1.2.0...v1.2.1) (2016-07-07)


### Bug Fixes

* do not use rest parameters ([2c4502e](https://github.com/mljs/matrix/commit/2c4502e))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/mljs/matrix/compare/v1.1.5...v1.2.0) (2016-07-07)


### Features

* add support for Math.pow ([2524b73](https://github.com/mljs/matrix/commit/2524b73))



1.1.5 / 2016-05-31
==================

* EVD: add assumeSymmetric option

1.1.4 / 2016-05-27
==================

* add support of Symbol.species for Chrome 51

1.1.2 / 2016-05-18
==================

* fix EVD bug introduced in last version

1.1.1 / 2016-05-18
==================

* make EVD compatible with SparseMatrix

1.1.0 / 2016-05-13
==================

* add kroneckerProduct method

1.0.4 / 2015-11-21
==================

* only include src directory on publish

1.0.3 / 2015-11-19
==================

* random not correctly filling rectangular matrices

1.0.2 / 2015-10-05
==================

* remove const and let for Safari support

1.0.0 / 2015-09-10
==================

* rename xxxFactor to xxxMatrix in decompositions
* add static min and max methods
* add fullname synonyms for some methods
* support all arithmetic operators and Math functions including static versions
* convert project to use ES2015 classes
* fix abs method not returning `this`

0.1.0 / 2015-06-11
==================

* use standard errors, remove MatrixError
* implement getColumnVector and getRowVector

0.0.4 / 2015-06-11
==================

* authorize call of decompositions without new
* fix bug in svd.inverse
* check for matrix argument in mmul

0.0.3 / 2015-04-24
==================

* use Array.isArray

0.0.2 / 2015-03-16
==================

* add matrix.inverse() and matrix.solve(other)

0.0.1 / 2014-10-24
==================

* first release
