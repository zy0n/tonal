var pitch = require('./pitch')
var interval = require('../interval/props')

var LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

/**
 * Transpose a pitch by an interval
 *
 * This is an _strict_ function: if pitch or interval are not valid, an exception
 * is thrown
 *
 * @param {String} pitch - the pitch to be transposed
 * @param {String} interval - (Optional) the interval. If not present, a partially
 * applied function with the pitch is returned
 * @return {String} the resulting pitch
 *
 * @example
 * transpose('E', 'M2') // => 'F#4'
 * transpose('C', 'M-2') // => 'Bb3'
 * ['M2', 'm3', 'P-8'].map(tranapose('C')) // => ['D4', 'Eb4', 'C3']
 * ['C', 'D', 'E'].map(transpose.by('M2')) // => ['D4', 'E4', 'F#4']
 */
function transpose (p, i) {
  if (arguments.length === 1) {
    return function (i) { return transpose(p, i) }
  }
  p = assert(pitch(p), 'Note not valid: ', p)
  i = assert(interval(i), 'Interval not valid: ', i)

  var oct = p.oct + i.dir * i.oct

  // if its a perfect octave, do a short path
  if (i.quality === 'P' && (i.simple === 8 || i.simple === 1)) {
    return p.pitchClass + oct
  }

  var letterIndex = LETTERS.indexOf(p.letter) + i.dir * (i.simple - 1)
  if (letterIndex > 6) {
    letterIndex = letterIndex % 7
    oct++
  } else if (letterIndex < 0) {
    letterIndex += 7
    oct--
  }
  var dest = pitch(LETTERS[letterIndex], oct, 0)
  return pitch(dest, oct, i.semitones - (dest.midi - p.midi)).name
}

transpose.by = function (i) {
  return function (p) {
    return transpose(p, i)
  }
}

function assert (value, error, cause) {
  if (value) return value
  else throw Error(error + cause)
}

module.exports = transpose