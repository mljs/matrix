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

  it('NIPALS with multi Y', () => {
    let multiY = new Matrix(metadata.length, 2);
    multiY.setColumn(0, metadata);
    multiY.setColumn(1, metadata);
    let model = new NIPALS(rawData, { Y: multiY });
    expect(model.yResidual.rows).toBeDeepCloseTo(150);
    expect(model.yResidual.columns).toBeDeepCloseTo(2);
    expect(model.q.getColumn(0)).toBeDeepCloseTo([
      0.7071067811865475,
      0.7071067811865475,
    ]);
    expect(model.w.getRow(0)).toBeDeepCloseTo([
      0.3327368933273334,
      -0.09548833727598557,
      0.8602363424202241,
      0.37438158667677224,
    ]);
    expect(model.betas.getRow(0)).toBeDeepCloseTo([0.08379809713380146]);
    expect(model.t.getRow(0)).toBeDeepCloseTo([2.6419561722271188]);
    expect(model.t.getRow(1)).toBeDeepCloseTo([2.623152962199645]);
    expect(model.t.getRow(2)).toBeDeepCloseTo([2.4514842818369593]);
    expect(model.p.getRow(0)).toBeDeepCloseTo([
      0.7412430875909641,
      0.361751117023612,
      0.536251754575879,
      0.1792452792825361,
    ]);
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
