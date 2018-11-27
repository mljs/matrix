import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { Matrix, positiveLinearCombination } from '../..';

expect.extend({ toBeDeepCloseTo });

describe('Positive linear combination', () => {
  it('Base I', () => {
    let base = new Matrix([
      [0, 20, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 30, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 100, 5, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 100, 15, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 10, 100, 10, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 100, 10],
    ]);
    let vector = new Matrix(
      [[0, 20, 100, 20, 0, 0, 0, 0, 0, 5, 100, 5, 0, 0, 0, 20, 200, 20]]);
    let solutions = Matrix.zeros(1, base.columns);
    let expected = new Matrix([[1, 0, 1, 0, 0, 2]]);

    solutions = positiveLinearCombination(base, vector);


    expect(solutions).toEqual(expected);
  });


  it('Base I Decimal I', () => {
    let base = new Matrix([
      [0, 20, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 30, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 100, 5, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 100, 15, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 10, 100, 10, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 100, 10],
    ]);
    let vector = new Matrix(
      [[0, 20, 100, 20, 0, 0, 0, 0, 0, 5, 100, 5, 0, 0, 0, 5, 50, 5]]);
    let solutions = Matrix.zeros(1, base.columns);
    let expected = new Matrix([[1, 0, 1, 0, 0, 0.5]]);

    solutions = positiveLinearCombination(base, vector, { lowestDecimal:
        0.5 });

    expect(solutions).toEqual(expected);
  });


  it('Luc I', () => {
    let base = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);
    let vector = new Matrix([[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    let solutions = Matrix.zeros(1, base.columns);
    let expected = new Matrix([[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    solutions = positiveLinearCombination(base, vector);

    expect(solutions).toEqual(expected);
  });


  it('Luc II', () => {
    let base = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);
    let vector = new Matrix([[3, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    let solutions = Matrix.zeros(1, base.columns);


    let expected = new Matrix([[3, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    solutions = positiveLinearCombination(base, vector);
    expect(solutions).toEqual(expected);
  });


  it('Luc III', () => {
    let base = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);
    let vector = new Matrix([[0, 1, 0, 0, 0, 0, 0, 0, 0, 0]]);
    let solutions = Matrix.zeros(1, base.columns);


    let expected = new Matrix([[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    solutions = positiveLinearCombination(base, vector);
    expect(solutions).toEqual(expected);
  });
  it('Luc IV', () => {
    let base = new Matrix([
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);
    let vector = new Matrix([[0, 1, 1, 0, 0, 0, 0, 0, 0, 0]]);
    let solutions = Matrix.zeros(1, base.columns);


    let expected = new Matrix([[0, 1, 0, 0, 0, 0, 0, 0, 0, 0]]);

    solutions = positiveLinearCombination(base, vector);
    expect(solutions).toEqual(expected);
  });

  /*

    it('Luc V', () => {
      let base = new Matrix([
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]);
      let vector = new Matrix([[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]]);
      let solutions = Matrix.zeros(1, base.columns);


      let expected = new Matrix([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

      solutions = positiveLinearCombination(base, vector);
      expect(solutions).toEqual(expected);
    });
    */
});
