import commonJS from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'matrix.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [resolve()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'matrix.mjs',
      format: 'esm',
      exports: 'named',
    },
    plugins: [resolve()],
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
