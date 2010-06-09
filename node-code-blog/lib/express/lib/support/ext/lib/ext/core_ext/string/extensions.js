
// ext.js - String - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(String.prototype, {

  /**
   * Drop _n_ characters.
   *
   * @param  {int} n
   * @return {string}
   * @api public
   */

  drop: function(n) {
    return this.slice(n, this.length)
  },

  /**
   * Take _n_ characters.
   *
   * @param  {int} n
   * @return {string}
   * @api public
   */

  take: function(n) {
    return this.slice(0, n)
  },

  /**
   * Strip leading and trailing whitespace.
   *
   *   '  \n\n foo '.strip
   *   // => 'foo'
   *
   * @return {string}
   * @api public
   */

  get strip() { return this.trim() },

  /**
   * Wrap with the given string, or _prefix_ and _suffix_.
   *
   *    'text'.wrap('<p>', '</p>')
   *    // => '<p>text</p>'
   *
   *    'foo'.wrap('...')
   *    // => '...foo...'
   *
   * @param  {string} prefix
   * @param  {string} suffix
   * @return {string}
   * @api public
   */

  wrap: function (prefix, suffix) {
    return prefix + this + (suffix || prefix)
  },

  /**
   * Check if this string starts with _str_.
   *
   * @param  {string} str
   * @return {bool}
   * @api public
   */

  startsWith: function(str) {
    return this.indexOf(str) === 0
  },

  /**
   * Check if this string ends with _str_.
   *
   * @param  {string} str
   * @return {bool}
   * @api public
   */

  endsWith: function(str) {
    return this.lastIndexOf(str) === this.length - str.length
  },

  /**
   * Remove all substrings matching the given _pattern_.
   *
   * @param  {regexp} pattern
   * @return {bool}
   * @api public
   */

  remove: function(pattern) {
    return this.replace(pattern, '')
  },

  /**
   * Return substring after the first occurrence of _str_.
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */

  after: function(str) {
    var i = this.indexOf(str)
    return i === -1 ?  '' : this.substring(i + str.length)
  },

  /**
   * Return substring before the first occurrence of _str_.
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */

  before: function(str) {
    var i = this.indexOf(str)
    return i === -1 ? '' : this.substring(0, i)
  },

  /**
   * Left pad string _width_ with optional _char_,
   * which defaults to a space.
   *
   * @param  {int} width
   * @param  {string} char
   * @return {string}
   * @api public
   */

  padLeft: function(width, char) {
    return Array(++width - this.length).join(char || ' ') + this
  },

  /**
   * Right pad string _width_ with optional _char_,
   * which defaults to a space.
   *
   * @param  {int} width
   * @param  {string} char
   * @return {string}
   * @api public
   */

  padRight: function(width, char) {
    return this + Array(++width - this.length).join(char || ' ')
  },

  /**
   * Returns a Boolean value that indicates whether the current string includes the
   * given string.
   *
   *  'the answer is 42'.includes('42')
   *  // => true
   *
   *  'the answer is 42'.includes('43')
   *  // => false
   *
   * @param {string} str
   * @return {bool}
   * @api public
   */

  includes: function(str) {
    return this.indexOf(str) !== -1
  },

  /**
   * Returns the count of occurences of the given string.
   *
   *  'A.lot.of.dots'.count('.')
   *  // => 3
   *
   * @param {string} str
   * @return {bool}
   * @api public
   */

  count: function(str) {
    return this.split(str).length - 1
  }
})


