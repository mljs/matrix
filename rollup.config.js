import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'matrix.js',
      format: 'cjs',
      exports: 'named',
    },
    external: ['ml-array-rescale'],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'mlMatrix',
      file: 'matrix.umd.js',
      format: 'umd',
      exports: 'named',
    },
    plugins: [resolve(), commonJS(), terser()],
  },
];
