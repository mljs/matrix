import { Matrix } from './src/index';

export function getSquareArray() {
  return [
    [9, 13, 5],
    [1, 11, 7],
    [2, 6, 3],
  ];
}

export function getSquareMatrix() {
  return new Matrix(getSquareArray());
}
