var parse = require('./parse-interval')

var CLASSES = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0]
/**
 * Get the [interval class](https://en.wikipedia.org/wiki/Interval_class) of
 * a given interval.
 *
 * In musical set theory, an interval class is the shortest distance in
 * pitch class space between two unordered pitch classes
 *
 * @param {String|Interval} interval - the Interval
 * @return {Integer} A value between 0 and 6
 *
 * @example
 * var intervalClass = require('tonal/interval-class')
 * intervalClass('P8') // => 0
 * intervalClass('m6') // => 4
 *
 * @resources Harmonic Materials of Modern Music, p. 8
 */
function intervalClass (interval) {
  interval = parse(interval)
  return CLASSES[Math.abs(interval.dist)]
}

module.exports = intervalClass