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
      sourcemap: true,
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
      sourcemap: true,
    },
    plugins: [resolve(), commonJS(), terser()],
  },
];
