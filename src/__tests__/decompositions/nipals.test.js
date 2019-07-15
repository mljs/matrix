import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { Matrix, correlation } from '../..';

import { nipals } from '../../dc/nipals';

expect.extend({ toBeDeepCloseTo });

describe('nipals', () => {
  it('test nipals dataArray to compare with R pca', () => {
    let rawData = require('../../../data/irisDataset.json');
    rawData = rawData.map((d) => d.slice(0, 4));
    let dataArray = new Matrix(150, 4);
    rawData.forEach((el, i) => dataArray.setRow(i, rawData[i]));
    let x = dataArray;

    x = x.center('column').scale('column');

    let irisPC = require('../../../data/irisPC1-4.json');
    /* data("iris");
    metadata = iris[,5]
    dataMatrix = iris[,1:4]
    X = dataMatrix
    Xcs = scale(as.matrix(X),center=TRUE)
    pca = prcomp(Xcs)
    plot(pca$x[,1], pca$x[,2], col=c(rep(1,50), rep(2,50), rep(3,50)))

    library(jsonlite)
    toJSON(t(pca$x)) */

    // first component
    let model = nipals(x);

    expect(model.t.to1DArray()).toHaveLength(150);
    let corr = correlation(model.t.clone(), Matrix.from1DArray(150, 1, irisPC[0]));
    expect(corr.get(0, 0)).toBeCloseTo(1, 6);
    expect(model.t.to1DArray().sort((a, b) => a - b)).toBeDeepCloseTo(
      irisPC[0].sort((a, b) => a - b), 4);

    // second component
    let model2 = nipals(model.residual);

    let corr2 = correlation(model2.t.clone(), Matrix.from1DArray(150, 1, irisPC[1]));
    // good correlation is expected, but it may diverge from pca
    expect(corr2.get(0, 0)).toBeCloseTo(-1, 6);

    // third component
    let model3 = nipals(model2.residual);
    let corr3 = correlation(model3.t.clone(), Matrix.from1DArray(150, 1, irisPC[2]));
    expect(corr3.get(0, 0)).toBeCloseTo(1, 2);

    // fourth component
    let model4 = nipals(model3.residual);
    let corr4 = correlation(model4.t.clone(), Matrix.from1DArray(150, 1, irisPC[3]));
    expect(corr4.get(0, 0)).toBeCloseTo(1, 2);
  });
});
