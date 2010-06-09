
// ext.js - printf - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Module dependencies.
 */

var sys = require('sys'),
    md5 = require('ext/md5');

/**
 * Throw an error _msg_ prefixed with 'printf(): '
 *
 * @param  {string} msg
 * @api private
 */

function error(msg) {
  throw new Error('printf(): ' + msg)
}

/**
 * Return formatted _str_ using placeholders with the
 * following syntax:
 *
 *  % [flag][width][.precision]specifier
 *
 * Flags:
 *   - '-'  Align to the left, otherwise the right is default.
 *
 * Width:
 *   Specifys the total amount of characters the string may span.
 *
 * Precision
 *   Pads or restricts the number of decimal points of a float.
 *
 * Specifier
 *   All numeric specifiers may be a numeric string or a number
 *   - s converts to a string ('foo' -> '')
 *   - c converts to a character ('foo' -> 'f', 102 -> 'f')
 *   - d converts to base 10 integer (12 -> '12')
 *   - D converts to base 10 integer passed through ordinalize() (12 -> '12th')
 *   - b converts to base 2 binary (5 -> '101')
 *   - o converts to base 8 octal (8 -> '10')
 *   - x converts to base 16 hexidecimal (255 -> 'ff')
 *   - X converts to uppercase base 16 hexidecimal (255 -> 'FF')
 *   - f converts to a float (5.99 -> '5.99')
 *   - C converts to a currency formatted string (5000.99 -> '5,000.99', 1000000 -> '1,000,000.00')
 *   - M converts to an md5 hash ('foobar' -> '3858f62230ac3c915f300c664312c63f')
 *
 * @param  {string} str
 * @param  {mixed} ...
 * @return {string}
 * @api public
 */

exports.sprintf = function(str) {
  var args = arguments, i = 0
  return str.replace(/%(-)?(\d+)?(\.\d+)?(\w)/g, function(_, flag, width, precision, specifier){
    var arg = args[++i],
        width = parseInt(width),
        precision = parseInt((String(precision)).slice(1))
    function pad(str) {
      if (typeof str != 'string') return str
      return width
        ? flag == '-'
          ? str.padRight(width)
          : str.padLeft(width)
        : str
    }
    function numeric(str, base, fn) {
      fn = fn || parseInt
      return isNaN((fn)(str)) ?
        error('%' + specifier + ' requires a number of a numeric string') :
          (fn)(str).toString(base)
    }
    switch (specifier) {
      case 'c':
        switch (typeof arg) {
          case 'string': return pad(arg.charAt(0))
          case 'number': return pad(String.fromCharCode(arg))
          default:       error('%c requires a string or char code integer')
        }
      case 'M':
        return typeof arg == 'string' ?
          pad(arg.md5) :
            error('%M requires a string')
      case 's':
        return pad(arg)
      case 'C':
        return pad(Number.prototype.__lookupGetter__('currency')
                         .call(parseFloat(numeric(arg, 10, parseFloat)).toFixed(2)))
      case 'd':
        return pad(numeric(arg))
      case 'M':
        return pad(numeric(arg))
      case 'D':
        return pad(parseInt(numeric(arg)).ordinalize)
      case 'f':
        arg = numeric(arg, 10, parseFloat)
        if (precision) arg = parseFloat(arg).toFixed(precision)
        return pad(arg)
      case 'b':
        return pad(numeric(arg, 2))
      case 'o':
        return pad(numeric(arg, 8))
      case 'x':
      case 'X':
        arg = numeric(arg, 16)
        if (specifier == 'X') arg = arg.uppercase
        return pad(arg.length === 1 ? '0' + arg : arg)
      default:
        error('%' + specifier + ' is not a valid specifier')
    }
  })
}

/**
 * Write to stderr.
 *
 * @see sprintf()
 * @api public
 */

exports.eprintf = function() {
  process.binding('stdio').writeError(exports.sprintf.apply(this, arguments))
}

/**
 * Write to stdout.
 *
 * @see sprintf()
 * @api public
 */

exports.printf = function() {
  process.stdout.write(exports.sprintf.apply(this, arguments))
}

