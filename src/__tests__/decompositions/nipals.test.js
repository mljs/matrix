import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { getNumbers } from 'ml-dataset-iris';

import { Matrix, correlation, NIPALS } from '../..';

expect.extend({ toBeDeepCloseTo });

const rawData = getNumbers();
const metadata = require('../../../data/irisScaledClasses.json');

describe('NIPALS pca', () => {
  it('test NIPALS dataArray to compare with R pca', () => {
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
    let model = new NIPALS(x);

    expect(model.t.to1DArray()).toHaveLength(150);
    let corr = correlation(
      model.t.clone(),
      Matrix.from1DArray(150, 1, irisPC[0]),
    );
    expect(corr.get(0, 0)).toBeCloseTo(1, 6);
    expect(model.t.to1DArray().sort((a, b) => a - b)).toBeDeepCloseTo(
      irisPC[0].sort((a, b) => a - b),
      4,
    );
    expect(model.w.get(0, 0)).toBeCloseTo(0.5210659, 4);

    // second component
    let model2 = new NIPALS(model.xResidual);

    let corr2 = correlation(
      model2.t.clone(),
      Matrix.from1DArray(150, 1, irisPC[1]),
    );
    // good correlation is expected, but it may diverge from pca
    expect(corr2.get(0, 0)).toBeCloseTo(-1, 6);

    // third component
    let model3 = new NIPALS(model2.xResidual);
    let corr3 = correlation(
      model3.t.clone(),
      Matrix.from1DArray(150, 1, irisPC[2]),
    );
    expect(corr3.get(0, 0)).toBeCloseTo(1, 2);

    // fourth component
    let model4 = new NIPALS(model3.xResidual);
    let corr4 = correlation(
      model4.t.clone(),
      Matrix.from1DArray(150, 1, irisPC[3]),
    );
    expect(corr4.get(0, 0)).toBeCloseTo(1, 2);
  });
});

describe('NIPALS pls', () => {
  it('test NIPALS dataArray to compare with R pca', () => {
    let dataArray = new Matrix(150, 4);
    rawData.forEach((el, i) => dataArray.setRow(i, rawData[i]));
    let x = dataArray;
    x = x.center('column').scale('column');

    let y = Matrix.from1DArray(150, 1, metadata);

    let model = new NIPALS(x, { Y: y });
    /*    library(MetaboMate)
      data("iris");
      metadata = iris[,5]
      dataMatrix = iris[,1:4]
      X = dataMatrix
      Xcs = scale(as.matrix(X),center=TRUE)
      un = NIPALS_PLS_component(Xcs, cbind(metadata)) */

    expect(model.t.to1DArray()).toHaveLength(150);
    expect(model.t.to1DArray()[0]).toBeCloseTo(-2.26393268, 4);
    expect(model.w.get(0, 0)).toBeCloseTo(0.484385, 4);
  });
});

// https://cran.r-project.org/web/packages/nipals/vignettes/nipals_algorithm.pdf
describe('NIPALS with simple data set', () => {
  it('test NIPALS error propagation', () => {
    let simpleDataset = require('../../../data/simpleDataset.json');
    let x = Matrix.from1DArray(7, 5, simpleDataset);

    x = x.center('column').scale('column');

    /*
    library(nipals)
    B <-matrix(c(50, 67, 90, ..., 117, 133, 155), ncol=5, byrow=TRUE)
    m1 <- nipals::nipals(B, gramschmidt=FALSE)
    m2 <- nipals::nipals(B, gramschmidt=TRUE)*/

    // first component
    let model = new NIPALS(x, { scaleScores: true });

    let PC = require('../../../data/simpleDatasetPC1-5.json');
    let loadings = require('../../../data/simpleDatasetLoadings1-5.json');
    expect(model.t.to1DArray()).toHaveLength(7);
    let corr = correlation(model.t.clone(), Matrix.from1DArray(7, 1, PC[0]));
    expect(corr.get(0, 0)).toBeCloseTo(1, 6);
    expect(model.t.to1DArray().sort((a, b) => a - b)).toBeDeepCloseTo(
      PC[0].sort((a, b) => a - b),
      4,
    );
    expect(model.w.to1DArray().sort((a, b) => a - b)).toBeDeepCloseTo(
      loadings[0].sort((a, b) => a - b),
      4,
    );
    expect(model.s.get(0, 0)).toBeCloseTo(5.02051842, 6);

    // second component
    let model2 = new NIPALS(model.xResidual, { scaleScores: true });

    let corr2 = correlation(model2.t.clone(), Matrix.from1DArray(7, 1, PC[1]));
    expect(corr2.get(0, 0)).toBeCloseTo(1, 6);
    expect(model2.s.get(0, 0)).toBeCloseTo(1.8793235, 6);
    expect(model2.t.to1DArray().sort((a, b) => a - b)).toBeDeepCloseTo(
      PC[1].sort((a, b) => a - b),
      3,
    );
    expect(model2.w.to1DArray().sort((a, b) => a - b)).toBeDeepCloseTo(
      loadings[1].sort((a, b) => a - b),
      3,
    );

    // next components
    let model3 = new NIPALS(model2.xResidual, { scaleScores: true });
    let model4 = new NIPALS(model3.xResidual, { scaleScores: true });
    let model5 = new NIPALS(model4.xResidual, { scaleScores: true });

    let corr3 = correlation(model3.t.clone(), Matrix.from1DArray(7, 1, PC[2]));
    expect(corr3.get(0, 0)).toBeCloseTo(-1, 6);
    expect(model3.s.get(0, 0)).toBeCloseTo(1.10817664, 4);
    expect(model3.t.mul(-1).to1DArray()).toBeDeepCloseTo(PC[2], 3);
    expect(model3.w.mul(-1).to1DArray()).toBeDeepCloseTo(loadings[2], 3);

    let corr5 = correlation(model5.t.clone(), Matrix.from1DArray(7, 1, PC[4]));
    expect(corr5.get(0, 0)).toBeCloseTo(-1, 5);
    expect(model5.s.get(0, 0)).toBeCloseTo(0.06936703, 4);
    expect(model5.t.mul(-1).to1DArray()).toBeDeepCloseTo(PC[4], 3);
    expect(model5.w.mul(-1).to1DArray()).toBeDeepCloseTo(loadings[4], 3);
  });
});
