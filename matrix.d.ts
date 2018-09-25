declare module "ml-matrix" {
  type NRows = number | Array<any> | Matrix;
  class BaseView extends Matrix {}
  class MatrixColumnView extends BaseView {
    set(rowIndex: number, columnIndex: number, value: any): MatrixColumnView;
    get(rowIndex: number): number;
  }
  class MatrixColumnSelectionView extends BaseView {
    set(
      rowIndex: number,
      columnIndex: number,
      value: any
    ): MatrixColumnSelectionView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class MatrixFlipColumnView extends BaseView {
    set(
      rowIndex: number,
      columnIndex: number,
      value: any
    ): MatrixFlipColumnView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class MatrixFlipRowView extends BaseView {
    set(rowIndex: number, columnIndex: number, value: any): MatrixFlipRowView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class MatrixRowView extends BaseView {
    set(rowIndex: number, columnIndex: number, value: any): MatrixRowView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class MatrixRowSelectionView extends BaseView {
    set(
      rowIndex: number,
      columnIndex: number,
      value: any
    ): MatrixRowSelectionView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class MatrixSelectionView extends BaseView {
    set(rowIndex: number, columnIndex: number, value: any): MatrixSelectionView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class MatrixSubView extends BaseView {
    set(rowIndex: number, columnIndex: number, value: any): MatrixSubView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class MatrixTransposeView extends BaseView {
    set(rowIndex: number, columnIndex: number, value: any): MatrixTransposeView;
    get(rowIndex: number, columnIndex: number): number;
  }
  class Matrix {
    readonly size: number;
    constructor(nRows: NRows, nColumns: number);
    static from1DArray(
      newRows: number,
      newColumns: number,
      newData: Array<any>
    ): Matrix;
    apply(callback: Function): Matrix;
    to1DArray<T = any>(): Array<T>;
    to2DArray<T = any>(): Array<Array<T>>;
    isRowVector(): boolean;
    isColumnVector(): boolean;
    isVector(): boolean;
    isSquare(): boolean;
    isSymmetric(): boolean;
    set(rowIndex: number, columnIndex: number, value: number): Matrix;
    get(rowIndex: number, columnIndex: number): number;
    repeat(rowRep: number, colRep: number): Matrix;
    fill(value: number): Matrix;
    neg(): Matrix;
    getRow<T = any>(index: number): Array<T>;
    getRowVector(index: number): Matrix;
    setRow(index: number, array: Array<any> | Matrix[]): Matrix;
    swapRows(row1: number, row2: number): Matrix;
    getColumn(index: number): Array<any>;
    getColumnVector(index: number): Matrix;
    setColumn(index: number, array: Array<any> | Matrix[]): Matrix;
    swapColumns(column1: number, column2: number): Matrix;
    addRowVector(vector: Array<any> | Matrix[]): Matrix;
    subRowVector(vector: Array<any> | Matrix[]): Matrix;
    mulRowVector(vector: Array<any> | Matrix[]): Matrix;
    divRowVector(vector: Array<any> | Matrix[]): Matrix;
    addColumnVector(vector: Array<any> | Matrix[]): Matrix;
    subColumnVector(vector: Array<any> | Matrix[]): Matrix;
    mulColumnVector(vector: Array<any> | Matrix[]): Matrix;
    divColumnVector(vector: Array<any> | Matrix[]): Matrix;
    mulRow(index: number, value: number): Matrix;
    mulColumn(index: number, value: number): Matrix;
    max(): number;
    maxIndex(): Array<any>;
    min(): number;
    minIndex(): Array<any>;
    maxRow(row: number): number;
    maxRowIndex(row: number): Array<any>;
    minRow(row: number): number;
    minRowIndex(row: number): Array<any>;
    maxColumn(column: number): number;
    maxColumnIndex(column: number): Array<any>;
    minColumn(column: number): number;
    minColumnIndex(column: number): Array<number>;
    diag(): Array<any>;
    sum(by: "row" | "column"): Matrix | number;
    mean(): number;
    prod(): number;
    norm(type: "frobenius" | "max"): number;
    cumulativeSum(): Matrix;
    dot(vector2: Matrix): number;
    mmul(other: Matrix): Matrix;
    strassen2x2(other: Matrix): Matrix;
    strassen3x3(other: Matrix): Matrix;
    mmulStrassen(y: Matrix): Matrix;
    scaleRows(min: number, max: number): Matrix;
    scaleColumns(min: number, max: number): Matrix;
    kroneckerProduct(other: Matrix): Matrix;
    transpose(): Matrix;
    sortRows(compareFunction: Function): Matrix;
    sortColumns(compareFunction: Function): Matrix;
    subMatrix(
      startRow: number,
      endRow: number,
      startColumn: number,
      endColumn: number
    ): Matrix;
    subMatrixRow(
      indices: Array<any>,
      startColumn: number,
      endColumn: number
    ): Matrix;
    subMatrixColumn(
      indices: Array<any>,
      startRow: number,
      endRow: number
    ): Matrix;
    setSubMatrix(
      matrix: Matrix | Array<any>,
      startRow: number,
      startColumn: number
    ): Matrix;
    selection(rowIndices: Array<number>, columnIndices: Array<number>): Matrix;
    trace(): number;
    transposeView(): MatrixTransposeView;
    rowView(row: number): MatrixRowView;
    columnView(column: number): MatrixColumnView;
    flipRowView(): MatrixFlipRowView;
    flipColumnView(): MatrixFlipColumnView;
    subMatrixView(
      startRow: number,
      endRow: number,
      startColumn: number,
      endColumn: number
    ): MatrixSubView;
    selectionView(
      rowIndices: Array<number>,
      columnIndices: Array<number>
    ): MatrixSelectionView;
    rowSelectionView(rowIndices: Array<number>): MatrixRowSelectionView;
    columnSelectionView(
      columnIndices: Array<number>
    ): MatrixColumnSelectionView;
    det(): number;
    pseudoInverse(threshold: number): Matrix;
    clone(): Matrix;
    static rowVector<T = any>(newData: Array<T>): Matrix;
    static columnVector<T = any>(newData: Array<T>): Matrix;
    static empty(rows: number, columns: number): Matrix;
    static zeros(rows: number, columns: number): Matrix;
    static ones(rows: number, columns: number): Matrix;
    static rand(rows: number, columns: number, rng: Function): Matrix;
    static randInt(
      rows: number,
      columns: number,
      maxValue: number,
      rng: Function
    ): Matrix;
    static eye(rows: number, columns: number, value: number): Matrix;
    static diag(data: Array<number>, rows: number, columns: number): Matrix;
    static min(matrix1: Matrix, matrix2: Matrix): Matrix;
    static max(matrix1: Matrix, matrix2: Matrix): Matrix;
    static checkMatrix(value: any): Matrix;
    static isMatrix(value: any): value is Matrix;
  }
  export default Matrix;
}
