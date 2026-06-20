import { writeFile } from 'node:fs/promises';

import matrixBuild from '../matrix.js';

const exportNames = Object.keys(matrixBuild);

const exports = exportNames.map((name) => {
  if (name === 'default') {
    return `export default matrix.default.Matrix ? matrix.default.Matrix : matrix.Matrix;`;
  }
  return `export const ${name} = matrix.${name};`;
});

await writeFile(
  new URL('../matrix.mjs', import.meta.url),
  `import * as matrix from './matrix.js';

${exports.join('\n')}
`,
);
