export default {
  input: 'src/index.js',
  output: {
    file: 'matrix.js',
    format: 'cjs',
    exports: 'named'
  },
  external: ['ml-array-rescale', 'ml-array-max']
};
