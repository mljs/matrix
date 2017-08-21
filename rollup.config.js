export default {
    input: 'src/index.js',
    exports: 'named',
    output: {
        file: 'matrix.js',
        format: 'cjs'
    },
    external: ['ml-array-rescale', 'ml-array-max']
}
