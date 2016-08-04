'use strict';

var abstractMatrix = require('../abstractMatrix');

class BaseView extends abstractMatrix() {
    constructor(matrix, rows, columns) {
        super();
        this.matrix = matrix;
        this.rows = rows;
        this.columns = columns;
    }
}

module.exports = BaseView;
