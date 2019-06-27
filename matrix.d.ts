declare module 'ml-matrix' {
  type MaybeMatrix = AbstractMatrix | number[][];
  type ScalarOrMatrix = number | MaybeMatrix;
  type MatrixDimension = 'row' | 'column';

  export interface IRandomOptions {
    /**
     * Random number generator.
     * Default: `Math.random`
     */
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

  export interface ICenterOptions {
    center?: number;
  }
  export interface ICenterByOptions {
    center?: number[];
  }

  export interface IScaleOptions {
    scale?: number;
  }
  export interface IScaleByOptions {
    scale?: number[];
  }

  export interface ICovarianceOptions {
    /**
     * Default: true.
     */
    center?: boolean;
  }

  export interface ICorrelationOptions {
    /**
     * Default: true.
     */
    center?: boolean;
    /**
     * Default: true.
     */
    scale?: boolean;
  }

  export abstract class AbstractMatrix {
    /**
     * Total number of elements in the matrix.
     */
    readonly size: number;

    /**
     * Number of rows of the matrix.
     */
    readonly rows: number;

    /**
     * Number of columns of the matrix.
     */
    readonly columns: number;

  /**
   * Constructs a matrix with the chosen dimensions from a 1D array.
   * @param newRows - Number of rows.
   * @param newColumns - Number of columns.
   * @param newData - A 1D array containing data for the matrix.
   * @returns The new matrix.
   */
    static from1DArray(
      newRows: number,
      newColumns: number,
      newData: number[]
    ): Matrix;

    /**
     * Creates a row vector, a matrix with only one row.
     * @param newData - A 1D array containing data for the vector.
     * @returns The new matrix.
     */
    static rowVector(newData: number[]): Matrix;

    /**
     * Creates a column vector, a matrix with only one column.
     * @param newData - A 1D array containing data for the vector.
     * @returns The new matrix.
     */
    static columnVector(newData: number[]): Matrix;

    /**
     * Creates a matrix with the given dimensions. Values will be set to zero.
     * This is equivalent to calling the Matrix constructor.
     * @param rows - Number of rows.
     * @param columns - Number of columns.
     * @returns The new matrix.
     */
    static zeros(rows: number, columns: number): Matrix;

    /**
     * Creates a matrix with the given dimensions. Values will be set to one.
     * @param rows - Number of rows.
     * @param columns - Number of columns.
     * @returns The new matrix.
     */
    static ones(rows: number, columns: number): Matrix;

    /**
     * Creates a matrix with the given dimensions. Values will be randomly set.
     * @param rows - Number of rows.
     * @param columns - Number of columns.
     * @param options - Options object.
     * @returns The new matrix.
     */
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

    /**
     * Returns whether the matrix has the same number of rows and columns.
     */
    isSquare(): boolean;
    isSymmetric(): boolean;

    /**
     * Returns whether the matrix is in row echelon form.
     */
    isEchelonForm(): boolean;

    /**
     * Returns whether the matrix is in reduced row echelon form.
     */
    isReducedEchelonForm(): boolean;

    /**
     * Returns the row echelon form of the matrix computed using gaussian
     * elimination.
     */
    echelonForm(): Matrix;

    /**
     * Returns the reduced row echelon form of the matrix computed using
     * gaussian elimination.
     */
    reducedEchelonForm(): Matrix;

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

    /**
     * Returns the variance of all elements of the matrix.
     * @param options
     */
    variance(options?: IVarianceOptions): number;

    /**
     * Returns the variance by the given dimension.
     * @param by - variance by 'row' or 'column'.
     * @param options
     */
    variance(by: MatrixDimension, options?: IVarianceByOptions): number[];

    /**
     * Returns the standard deviation of all elements of the matrix.
     * @param options
     */
    standardDeviation(options?: IVarianceOptions): number;

    /**
     * Returns the standard deviation by the given dimension.
     * @param by - standard deviation by 'row' or 'column'.
     * @param options
     */
    standardDeviation(
      by: MatrixDimension,
      options?: IVarianceByOptions
    ): number[];

    /**
     * Center the matrix in-place. By default, the mean value of the matrix is
     * subtracted from every value.
     * @param options
     */
    center(options?: ICenterOptions): this;

    /**
     * Center the matrix in-place. By default, the mean values in the give
     * dimension are subtracted from the values.
     * @param by - center by 'row' or 'column'.
     * @param options
     */
    center(by: MatrixDimension, options?: ICenterByOptions): this;

    /**
     * Scale the matrix in-place. By default, values are divided by their
     * standard deviation.
     * @param options
     */
    scale(options?: IScaleOptions): this;

    /**
     * Scale the matrix in-place. By default, values are divided by the
     * standard deviation in the given dimension.
     * @param by - scale by 'row' or 'column'.
     * @param options
     */
    scale(by: MatrixDimension, options?: IScaleByOptions): this;

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
    /**
     * Default: 1.
     */
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

  /**
   * @param useSVD - Default: false.
   */
  export function solve(
    leftHandSide: MaybeMatrix,
    rightHandSide: MaybeMatrix,
    useSVD?: boolean
  ): Matrix;

  /**
   * Computes the inverse of a matrix.
   * @param matrix - Matrix to invert.
   * @param useSVD - Use the singular value decomposition to compute the inverse. Default: false.
   */
  export function inverse(matrix: MaybeMatrix, useSVD?: boolean): Matrix;

  /**
   * Calculates and returns the determinant of a matrix.
   * @param matrix
   */
  export function determinant(matrix: MaybeMatrix): number;

  export interface ILinearDependenciesOptions {
    /**
     * If an absolute value is inferior to this threshold, it will equals zero.
     * Default: 10e-10.
     */
    thresholdValue?: number;

    /**
     * If the error is inferior to that threshold, the linear combination found is accepted and the row is dependent from other rows.
     * Default: 10e-10.
     */
    thresholdError?: number;
  }

  /**
   * Creates a matrix which represents the dependencies between rows.
   * If a row is a linear combination of others rows, the result will be a row with the coefficients of this combination.
   * For example : for A = [[2, 0, 0, 1], [0, 1, 6, 0], [0, 3, 0, 1], [0, 0, 1, 0], [0, 1, 2, 0]], the result will be [[0, 0, 0, 0, 0], [0, 0, 0, 4, 1], [0, 0, 0, 0, 0], [0, 0.25, 0, 0, -0.25], [0, 1, 0, -4, 0]]
   * @param matrix
   * @param options
   * @returns - The matrix which represents the dependencies between rows.
   */
  export function linearDependencies(
    matrix: MaybeMatrix,
    options?: ILinearDependenciesOptions
  ): Matrix;

  /**
   * Returns inverse of a matrix if it exists or the pseudoinverse.
   * @param matrix
   * @param threshold - Threshold for taking inverse of singular values. Default: Number.EPSILON.
   * @returns - The (pseudo)inverted matrix.
   */
  export function pseudoInverse(
    matrix: MaybeMatrix,
    threshold?: number
  ): Matrix;

  export function covariance(
    matrix: MaybeMatrix,
    options?: ICovarianceOptions
  ): Matrix;

  export function covariance(
    xMatrix: MaybeMatrix,
    yMatrix: MaybeMatrix,
    options?: ICovarianceOptions
  ): Matrix;

  export function correlation(
    matrix: MaybeMatrix,
    options?: ICorrelationOptions
  ): Matrix;

  export function correlation(
    xMatrix: MaybeMatrix,
    yMatrix: MaybeMatrix,
    options?: ICorrelationOptions
  ): Matrix;

  export interface ISVDOptions {
    /**
     * Default: true.
     */
    computeLeftSingularVectors?: boolean;

    /**
     * Default: true.
     */
    computeRightSingularVectors?: boolean;

    /**
     * Default: false.
     */
    autoTranspose?: boolean;
  }

  /**
   * @see https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
   */
  export class SingularValueDecomposition {
    constructor(value: MaybeMatrix, options?: ISVDOptions);

    /**
     * Get the inverse of the matrix. We compute the inverse of a matrix using SVD when this matrix is singular or ill-conditioned. Example :
     * var svd = SingularValueDecomposition(A);
     * var inverseA = svd.inverse();
     * @returns - The approximation of the inverse of the matrix.
     */
    inverse(): Matrix;

    /**
     * Solve a problem of least square (Ax=b) by using the SVD. Useful when A is singular. When A is not singular, it would be better to use qr.solve(value).
     * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
     * var svd = SingularValueDecomposition(A);
     * var x = svd.solve(b);
     * @param value - Matrix 1D which is the vector b (in the equation Ax = b).
     * @returns - The vector x.
     */
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
    /**
     * Default: false.
     */
    assumeSymmetric?: boolean;
  }

  /**
   * @link https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
   */
  export class EigenvalueDecomposition {
    constructor(value: MaybeMatrix, options?: IEVDOptions);
    readonly diagonalMatrix: Matrix;
    readonly eigenvectorMatrix: Matrix;
    readonly imaginaryEigenvalues: number[];
    readonly realEigenvalues: number[];
  }

  export { EigenvalueDecomposition as EVD };

  /**
   * @link https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
   */
  export class CholeskyDecomposition {
    /**
     * 
     * @param value - The matrix to decompose
     */
    constructor(value: MaybeMatrix);
    solve(value: Matrix): Matrix;
    readonly lowerTriangularMatrix: Matrix;
  }

  export { CholeskyDecomposition as CHO };

  /**
   * @link https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
   */
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

  /**
   * @link https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
   */
  class QrDecomposition {
    constructor(value: MaybeMatrix);
    isFullRank(): boolean;

    /**
     * Solve a problem of least square (Ax=b) by using the QR decomposition. Useful when A is rectangular, but not working when A is singular.
     * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
     * var qr = QrDecomposition(A);
     * var x = qr.solve(b);
     * @param value - Matrix 1D which is the vector b (in the equation Ax = b).
     * @returns - The vector x.
     */
    solve(value: Matrix): Matrix;
    readonly orthogonalMatrix: Matrix;
    readonly upperTriangularMatrix: Matrix;
  }

  export { QrDecomposition, QrDecomposition as QR };
}
