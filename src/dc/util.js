/**
 * Transpose a square matrix in place, without allocating a copy.
 * Used to restore the logical layout of decomposition outputs that were
 * accumulated in transposed storage for cache-sequential inner loops.
 * @param {import('../matrix').default} matrix - square matrix, mutated in place
 * @returns {import('../matrix').default} the same matrix
 */
export function transposeSquareInPlace(matrix) {
  const data = matrix.data;
  const n = matrix.rows;
  for (let i = 0; i < n; i++) {
    const rowI = data[i];
    for (let j = i + 1; j < n; j++) {
      const tmp = rowI[j];
      rowI[j] = data[j][i];
      data[j][i] = tmp;
    }
  }
  return matrix;
}

export function hypotenuse(a, b) {
  let r = 0;
  if (Math.abs(a) > Math.abs(b)) {
    r = b / a;
    return Math.abs(a) * Math.sqrt(1 + r * r);
  }
  if (b !== 0) {
    r = a / b;
    return Math.abs(b) * Math.sqrt(1 + r * r);
  }
  return 0;
}
