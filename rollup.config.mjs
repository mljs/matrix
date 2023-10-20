import commonJS from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      esModule: false,
      file: 'matrix.js',
      format: 'cjs',
      exports: 'named',
    },
    external: ['is-any-array', 'ml-array-rescale'],
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
