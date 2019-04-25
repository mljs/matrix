declare module 'ml-matrix' {
  type MaybeMatrix = AbstractMatrix | number[][];
  type ScalarOrMatrix = number | MaybeMatrix;
  type MatrixDimension = 'row' | 'column';

  export interface IRandomOptions {
    random: () => number;
  }
  export interface IRandomIntOptions {
    min: number;
    max: number;
    random: () => number;
  }
  export interface IRepeatOptions {
    rows?: number;
    columns?: number;
  }
  export interface IScaleOptions {
    min?: number;
    max?: number;
  }
  export interface IVarianceOptions {
    unbiased?: boolean;
    mean?: number;
  }
  export interface IVarianceByOptions {
    unbiased?: boolean;
    mean?: number[];
  }

  export abstract class AbstractMatrix {
    readonly size: number;
    readonly rows: number;
    readonly columns: number;

    static from1DArray(
      newRows: number,
      newColumns: number,
      newData: number[]
    ): Matrix;
    static rowVector(newData: number[]): Matrix;
    static columnVector(newData: number[]): Matrix;
    static zeros(rows: number, columns: number): Matrix;
    static ones(rows: number, columns: number): Matrix;
    static rand(
      rows: number,
      columns: number,
      options?: IRandomOptions
    ): Matrix;
    static random(
      rows: number,
      columns: number,
      options?: IRandomOptions
    ): Matrix;
    static randInt(
      rows: number,
      columns: number,
      options?: IRandomIntOptions
    ): Matrix;
    static eye(rows: number, columns?: number, value?: number): Matrix;
    static identity(rows: number, columns?: number, value?: number): Matrix;
    static diag(data: number[], rows?: number, columns?: number): Matrix;
    static diagonal(data: number[], rows?: number, columns?: number): Matrix;
    static min(matrix1: MaybeMatrix, matrix2: MaybeMatrix): Matrix;
    static max(matrix1: MaybeMatrix, matrix2: MaybeMatrix): Matrix;
    static checkMatrix(value: any): Matrix;
    static isMatrix(value: any): value is AbstractMatrix;

    set(rowIndex: number, columnIndex: number, value: number): this;
    get(rowIndex: number, columnIndex: number): number;

    apply(callback: (row: number, column: number) => void): this;
    to1DArray(): number[];
    to2DArray(): number[][];
    toJSON(): number[][];
    isRowVector(): boolean;
    isColumnVector(): boolean;
    isVector(): boolean;
    isSquare(): boolean;
    isSymmetric(): boolean;
    isEchelonForm(): boolean;
    isReducedEchelonForm(): boolean;
    repeat(options?: IRepeatOptions): Matrix;
    fill(value: number): this;
    neg(): this;
    negate(): this;
    getRow(index: number): number[];
    getRowVector(index: number): Matrix;
    setRow(index: number, array: number[] | AbstractMatrix): this;
    swapRows(row1: number, row2: number): this;
    getColumn(index: number): number[];
    getColumnVector(index: number): Matrix;
    setColumn(index: number, array: number[] | AbstractMatrix): this;
    swapColumns(column1: number, column2: number): this;
    addRowVector(vector: number[] | AbstractMatrix): this;
    subRowVector(vector: number[] | AbstractMatrix): this;
    mulRowVector(vector: number[] | AbstractMatrix): this;
    divRowVector(vector: number[] | AbstractMatrix): this;
    addColumnVector(vector: number[] | AbstractMatrix): this;
    subColumnVector(vector: number[] | AbstractMatrix): this;
    mulColumnVector(vector: number[] | AbstractMatrix): this;
    divColumnVector(vector: number[] | AbstractMatrix): this;
    mulRow(index: number, value: number): this;
    mulColumn(index: number, value: number): this;
    max(): number;
    maxIndex(): [number, number];
    min(): number;
    minIndex(): [number, number];
    maxRow(row: number): number;
    maxRowIndex(row: number): [number, number];
    minRow(row: number): number;
    minRowIndex(row: number): [number, number];
    maxColumn(column: number): number;
    maxColumnIndex(column: number): [number, number];
    minColumn(column: number): number;
    minColumnIndex(column: number): [number, number];
    diag(): number[];
    diagonal(): number[];

    norm(type: 'frobenius' | 'max'): number;
    cumulativeSum(): this;
    dot(vector: AbstractMatrix): number;
    mmul(other: MaybeMatrix): Matrix;
    strassen2x2(other: MaybeMatrix): Matrix;
    strassen3x3(other: MaybeMatrix): Matrix;
    mmulStrassen(y: MaybeMatrix): Matrix;
    scaleRows(options?: IScaleOptions): Matrix;
    scaleColumns(options?: IScaleOptions): Matrix;
    flipRows(): this;
    flipColumns(): this;
    kroneckerProduct(other: MaybeMatrix): Matrix;
    tensorProduct(other: MaybeMatrix): Matrix;
    transpose(): Matrix;
    sortRows(compareFunction?: (a: number, b: number) => number): this;
    sortColumns(compareFunction?: (a: number, b: number) => number): this;
    subMatrix(
      startRow: number,
      endRow: number,
      startColumn: number,
      endColumn: number
    ): Matrix;
    subMatrixRow(
      indices: number[],
      startColumn?: number,
      endColumn?: number
    ): Matrix;
    subMatrixColumn(
      indices: number[],
      startRow?: number,
      endRow?: number
    ): Matrix;
    setSubMatrix(
      matrix: MaybeMatrix | number[],
      startRow: number,
      startColumn: number
    ): Matrix;
    selection(rowIndices: number[], columnIndices: number[]): Matrix;
    trace(): number;
    clone(): Matrix;

    /**
     * Returns the sum of all elements of the matrix.
     */
    sum(): number;

    /**
     * Returns the sum by the given dimension.
     * @param by - sum by 'row' or 'column'.
     */
    sum(by: MatrixDimension): number[];

    /**
     * Returns the product of all elements of the matrix.
     */
    product(): number;

    /**
     * Returns the product by the given dimension.
     * @param by - product by 'row' or 'column'.
     */
    product(by: MatrixDimension): number[];

    /**
     * Returns the mean of all elements of the matrix.
     */
    mean(): number;

    /**
     * Returns the mean by the given dimension.
     * @param by - mean by 'row' or 'column'.
     */
    mean(by: MatrixDimension): number[];

    variance(options?: IVarianceOptions): number;
    variance(by: MatrixDimension, options?: IVarianceByOptions): number[];

    standardDeviation(options?: IVarianceOptions): number;
    standardDeviation(
      by: MatrixDimension,
      options?: IVarianceByOptions
    ): number[];

    // From here we document methods dynamically generated from operators

    // Mathematical operators
    // inplace
    add(value: ScalarOrMatrix): this;
    sub(value: ScalarOrMatrix): this;
    subtract(value: ScalarOrMatrix): this;
    mul(value: ScalarOrMatrix): this;
    multiply(value: ScalarOrMatrix): this;
    div(value: ScalarOrMatrix): this;
    divide(value: ScalarOrMatrix): this;
    mod(value: ScalarOrMatrix): this;
    modulus(value: ScalarOrMatrix): this;
    and(value: ScalarOrMatrix): this;
    or(value: ScalarOrMatrix): this;
    xor(value: ScalarOrMatrix): this;
    leftShift(value: ScalarOrMatrix): this;
    signPropagatingRightShift(value: ScalarOrMatrix): this;
    rightShift(value: ScalarOrMatrix): this;
    zeroFillRightShift(value: ScalarOrMatrix): this;
    // new matrix
    static add(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static sub(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static subtract(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static mul(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static multiply(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static div(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static divide(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static mod(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static modulus(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static and(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static or(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static xor(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static leftShift(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static signPropagatingRightShift(
      matrix: MaybeMatrix,
      value: ScalarOrMatrix
    ): Matrix;
    static rightShift(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
    static zeroFillRightShift(
      matrix: MaybeMatrix,
      value: ScalarOrMatrix
    ): Matrix;

    // Functional operators (one arg)
    // inplace
    not(): this;
    abs(): this;
    acos(): this;
    acosh(): this;
    asin(): this;
    asinh(): this;
    atan(): this;
    atanh(): this;
    cbrt(): this;
    ceil(): this;
    clz32(): this;
    cos(): this;
    cosh(): this;
    exp(): this;
    expm1(): this;
    floor(): this;
    fround(): this;
    log(): this;
    log1p(): this;
    log10(): this;
    log2(): this;
    round(): this;
    sign(): this;
    sin(): this;
    sinh(): this;
    sqrt(): this;
    tan(): this;
    tanh(): this;
    trunc(): this;
    // new matrix
    static not(value: MaybeMatrix): Matrix;
    static abs(value: MaybeMatrix): Matrix;
    static acos(value: MaybeMatrix): Matrix;
    static acosh(value: MaybeMatrix): Matrix;
    static asin(value: MaybeMatrix): Matrix;
    static asinh(value: MaybeMatrix): Matrix;
    static atan(value: MaybeMatrix): Matrix;
    static atanh(value: MaybeMatrix): Matrix;
    static cbrt(value: MaybeMatrix): Matrix;
    static ceil(value: MaybeMatrix): Matrix;
    static clz32(value: MaybeMatrix): Matrix;
    static cos(value: MaybeMatrix): Matrix;
    static cosh(value: MaybeMatrix): Matrix;
    static exp(value: MaybeMatrix): Matrix;
    static expm1(value: MaybeMatrix): Matrix;
    static floor(value: MaybeMatrix): Matrix;
    static fround(value: MaybeMatrix): Matrix;
    static log(value: MaybeMatrix): Matrix;
    static log1p(value: MaybeMatrix): Matrix;
    static log10(value: MaybeMatrix): Matrix;
    static log2(value: MaybeMatrix): Matrix;
    static round(value: MaybeMatrix): Matrix;
    static sign(value: MaybeMatrix): Matrix;
    static sin(value: MaybeMatrix): Matrix;
    static sinh(value: MaybeMatrix): Matrix;
    static sqrt(value: MaybeMatrix): Matrix;
    static tan(value: MaybeMatrix): Matrix;
    static tanh(value: MaybeMatrix): Matrix;
    static trunc(value: MaybeMatrix): Matrix;

    // Functional operators with one arg
    // inplace
    pow(value: ScalarOrMatrix): this;
    // new matrix
    static pow(matrix: MaybeMatrix, value: ScalarOrMatrix): Matrix;
  }

  export class Matrix extends AbstractMatrix {
    constructor(nRows: number, nColumns: number);
    constructor(data: number[][]);
    constructor(otherMatrix: AbstractMatrix);
  }
  export default Matrix;

  export class MatrixColumnView extends AbstractMatrix {
    constructor(matrix: AbstractMatrix, column: number);
  }
  export class MatrixColumnSelectionView extends AbstractMatrix {
    constructor(matrix: AbstractMatrix, columnIndices: number[]);
  }
  export class MatrixFlipColumnView extends AbstractMatrix {
    constructor(matrix: AbstractMatrix);
  }
  export class MatrixFlipRowView extends AbstractMatrix {
    constructor(matrix: AbstractMatrix);
  }
  export class MatrixRowView extends AbstractMatrix {
    constructor(matrix: AbstractMatrix, row: number);
  }
  export class MatrixRowSelectionView extends AbstractMatrix {
    constructor(matrix: AbstractMatrix, rowIndices: number[]);
  }
  export class MatrixSelectionView extends AbstractMatrix {
    constructor(
      matrix: AbstractMatrix,
      rowIndices: number[],
      columnIndices: number[]
    );
  }
  export class MatrixSubView extends AbstractMatrix {
    constructor(
      matrix: AbstractMatrix,
      startRow: number,
      endRow: number,
      startColumn: number,
      endColumn: number
    );
  }
  export class MatrixTransposeView extends AbstractMatrix {
    constructor(matrix: AbstractMatrix);
  }

  export interface IWrap1DOptions {
    rows?: number;
  }
  export function wrap(
    array: number[],
    options?: IWrap1DOptions
  ): WrapperMatrix1D;
  export function wrap(twoDAray: number[][]): WrapperMatrix2D;

  export class WrapperMatrix1D extends AbstractMatrix {
    constructor(data: number[], options?: IWrap1DOptions);
  }

  export class WrapperMatrix2D extends AbstractMatrix {
    constructor(data: number[][]);
  }

  export function solve(
    leftHandSide: MaybeMatrix,
    rightHandSide: MaybeMatrix,
    useSVD?: boolean
  ): Matrix;

  export function inverse(matrix: MaybeMatrix, useSVD?: boolean): Matrix;

  export function determinant(matrix: MaybeMatrix): number;

  export interface ILinearDependenciesOptions {
    thresholdValue?: number;
    thresholdError?: number;
  }
  export function linearDependencies(
    matrix: MaybeMatrix,
    options?: ILinearDependenciesOptions
  ): Matrix;

  export function pseudoInverse(
    matrix: MaybeMatrix,
    threshold?: number
  ): Matrix;

  export interface ISVDOptions {
    computeLeftSingularVectors?: boolean;
    computeRightSingularVectors?: boolean;
    autoTranspose?: boolean;
  }
  export class SingularValueDecomposition {
    constructor(value: MaybeMatrix, options?: ISVDOptions);
    inverse(): Matrix;
    solve(value: Matrix): Matrix;
    solveForDiagonal(value: number[]): Matrix;
    readonly norm2: number;
    readonly threshold: number;
    readonly leftSingularVectors: Matrix;
    readonly condition: number;
    readonly rank: number;
    readonly rightSingularVectors: Matrix;
    readonly diagonal: number[];
    readonly diagonalMatrix: Matrix;
  }
  export { SingularValueDecomposition as SVD };

  export interface IEVDOptions {
    assumeSymmetric?: boolean;
  }
  export class EigenvalueDecomposition {
    constructor(value: MaybeMatrix, options?: IEVDOptions);
    readonly diagonalMatrix: Matrix;
    readonly eigenvectorMatrix: Matrix;
    readonly imaginaryEigenvalues: number[];
    readonly realEigenvalues: number[];
  }
  export { EigenvalueDecomposition as EVD };

  export class CholeskyDecomposition {
    constructor(value: MaybeMatrix);
    solve(value: Matrix): Matrix;
    readonly lowerTriangularMatrix: Matrix;
  }
  export { CholeskyDecomposition as CHO };

  export class LuDecomposition {
    constructor(value: MaybeMatrix);
    isSingular(): boolean;
    solve(value: Matrix): Matrix;
    readonly determinant: number;
    readonly lowerTriangularMatrix: Matrix;
    readonly pivotPermutationVector: number[];
    readonly upperTriangularMatrix: Matrix;
  }
  export { LuDecomposition as LU };

  class QrDecomposition {
    constructor(value: MaybeMatrix);
    isFullRank(): boolean;
    solve(value: Matrix): Matrix;
    readonly orthogonalMatrix: Matrix;
    readonly upperTriangularMatrix: Matrix;
  }
  export { QrDecomposition, QrDecomposition as QR };
}
