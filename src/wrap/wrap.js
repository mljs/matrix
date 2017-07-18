import WrapperMatrix1D from './WrapperMatrix1D';
import WrapperMatrix2D from './WrapperMatrix2D';

/**
 * @param {Array<Array<number>>|Array<number>} array
 * @param {object} [options]
 * @param {object} [options.rows = 1]
 * @return {WrapperMatrix1D|WrapperMatrix2D}
 */
export function wrap(array, options) {
    if (Array.isArray(array)) {
        if (array[0] && Array.isArray(array[0])) {
            return new WrapperMatrix2D(array);
        } else {
            return new WrapperMatrix1D(array, options);
        }
    } else {
        throw new Error('the argument is not an array');
    }
}
