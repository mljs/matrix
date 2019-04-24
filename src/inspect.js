export function inspectMatrix() {
  const indent = ' '.repeat(2);
  const indentData = ' '.repeat(4);
  return `${this.constructor.name} {
${indent}[
${indentData}${inspectData(this, indentData)}
${indent}]
${indent}rows: ${this.rows}
${indent}columns: ${this.columns}
}`;
}

const maxRows = 15;
const maxColumns = 10;
const maxNumSize = 8;

function inspectData(matrix, indent) {
  const { rows, columns } = matrix;
  const maxI = Math.min(rows, maxRows);
  const maxJ = Math.min(columns, maxColumns);
  const result = [];
  for (var i = 0; i < maxI; i++) {
    let line = [];
    for (var j = 0; j < maxJ; j++) {
      line.push(formatNumber(matrix.get(i, j)));
    }
    result.push(`${line.join(' ')}`);
  }
  if (maxJ !== columns) {
    result[result.length - 1] += ` ... ${columns - maxColumns} more columns`;
  }
  if (maxI !== rows) {
    result.push(`... ${rows - maxRows} more rows`);
  }
  return result.join(`\n${indent}`);
}

function formatNumber(num) {
  const numStr = String(num);
  if (numStr.length <= maxNumSize) {
    return numStr.padEnd(maxNumSize, ' ');
  }
  const precise = num.toPrecision(maxNumSize - 2);
  if (precise.length <= maxNumSize) {
    return precise;
  }
  const exponential = num.toExponential(maxNumSize - 2);
  const eIndex = exponential.indexOf('e');
  const e = exponential.substring(eIndex);
  return exponential.substring(0, maxNumSize - e.length) + e;
}
