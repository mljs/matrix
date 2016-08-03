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
