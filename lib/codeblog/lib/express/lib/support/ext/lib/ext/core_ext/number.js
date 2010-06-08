
// ext.js - Number - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Number.prototype, {

  /**
   * Convert a the given number _n_ to an ordinal string used to denote the
   * position in an ordered sequence such as 1st, 2nd, 3rd, 4th, etc.
   *
   * @return {string}
   * @api public
   */

  get ordinalize() {
    if ([11, 12, 13].indexOf(this % 100) !== -1)
      return this + 'th'
    else
      switch (this % 10) {
        case 1:  return this + 'st'
        case 2:  return this + 'nd'
        case 3:  return this + 'rd'
        default: return this + 'th'
      }
  },

  /**
   * Return a currency formatted string based on the given number _n_.
   *
   *  (1000.99).currency
   *  // => '1,000.99'
   *
   * @return {string}
   * @api public
   */

  get currency() {
    var n = this.toString().split('.')
    n.first = n.first.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    return n.join('.')
  },
  
  /**
   * Convert milliseconds to seconds.
   */
  
  get toSeconds() { return this / 1000 },

  /**
   * Convert milliseconds to minutes.
   *
   * @return {number}
   * @api public
   */

  get toMinutes() { return this / (1).minute },

  /**
   * Convert milliseconds to hours.
   *
   * @return {number}
   * @api public
   */

  get toHours() { return this / (1).hour },

  /**
   * Convert milliseconds to days.
   *
   * @return {number}
   * @api public
   */

  get toDays() { return this / (1).day },

  /**
   * Convert milliseconds to weeks.
   *
   * @return {number}
   * @api public
   */

  get toWeeks() { return this / (1).week },

  /**
   * Convert milliseconds to months.
   *
   * @return {number}
   * @api public
   */

  get toMonths() { return this / (1).month },

  /**
   * Convert milliseconds to years.
   *
   * @return {number}
   * @api public
   */

  get toYears() { return this / (1).year },

  /**
   * Return a new Date representing n milliseconds ago.
   *
   *  (5).minutes.ago
   *  // => Date
   *
   * @return {Date}
   * @api public
   */

  get ago() {
    return new Date(Date.now() - this)
  },

  /**
   * Executes the given function n times with optional _context_.
   *
   *  (3).times(function(){ })
   *  (5).times(function(){ }, this)
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @api public
   */

  times: function (fn, context) {
    var times = this
    while (times--) fn.call(context || this)
  },

  /**
   * Check if this number is a float.
   *
   *  (3.14159265).isFloat
   *  // => true
   *
   *  (42).isFloat
   *  // => false
   *
   * @return {bool}
   * @api public
   */

  get isFloat() {
    return this.toString().indexOf('.') !== -1
  },
  
  /**
   * Return a hex string representation of this number.
   *
   * @return {string}
   * @api public
   */
  
  get hex() { return this.toString(16) },
  
  /**
   * Return a octal string representation of this number.
   *
   * @return {string}
   * @api public
   */
   
   get octal() { return this.toString(8) },

  /**
   * Return n seconds in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get second() { return this * 1000 },
  get seconds() { return this * 1000 },

  /**
   * Return n minutes in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get minute() { return this * 60 * 1000 },
  get minutes() { return this * 60 * 1000 },

  /**
   * Return n hours in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get hour() { return this * 3600 * 1000 },
  get hours() { return this * 3600 * 1000 },

  /**
   * Return n days in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get day() { return this * 86400 * 1000 },
  get days() { return this * 86400 * 1000 },

  /**
   * Return n weeks in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get week() { return this * 604800 * 1000 },
  get weeks() { return this * 604800 * 1000 },

  /**
   * Return n months in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get month() { return this * 2592000 * 1000 },
  get months() { return this * 2592000 * 1000 },

  /**
   * Return n years in milliseconds.
   *
   * @return {number}
   * @api public
   */

  get year() { return this * 31471200 * 1000 },
  get years() { return this * 31471200 * 1000 },
  
  /**
   * Return n bytes.
   *
   * @return {number}
   * @api public
   */
  
  get byte() { return this },
  get bytes() { return this },
  
  /**
   * Return n kilobytes in bytes.
   *
   * @return {number}
   * @api public
   */
  
  get kilobyte() { return this * 1024 },
  get kilobytes() { return this * 1024 },
  
  /**
   * Return n megabytes in bytes.
   *
   * @return {number}
   * @api public
   */
  
  get megabyte() { return this.kilobytes * 1024 },
  get megabytes() { return this.kilobytes * 1024 },
  
  /**
   * Return n gigabytes in bytes.
   *
   * @return {number}
   * @api public
   */
  
  get gigabyte() { return this.megabytes * 1024 },
  get gigabytes() { return this.megabytes * 1024 }
})

