
// ext.js - Array - Iterators - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Array.prototype, {

  /**
   * Alias of #forEach()
   */

  each: [].forEach,
  
  /**
   * Alias of #some()
   */
  
  any: [].some,
  
  /**
   * Alias of #every()
   */
   
  all: [].every,
  
  /**
   * Alias of #filter()
   */
  
  select: [].filter,
  
  /**
   * Returns an array rejecting values when _fn_ returns true.
   *
   * @param {function} fn
   * @param {object} context
   * @return {object}
   * @api public
   */

  reject: function(fn, context) {
    var rejected = []
    for (var i = 0, len = this.length; i < len; ++i)
      if (!fn.call(context, this[i], i, this))
        rejected.push(this[i])
    return rejected
  },

  /**
   * Returns the first value for which the passed function returns true.
   *
   *  [1,2,3].find(function (e) { return e === 2 })
   *  // => 2
   *
   * @param  {function} fn
   * @param  {object} context
   * @return {mixed}
   * @api public
   */

  find: function(fn, context) {
    for (var i = 0, len = this.length; i < len; ++i)
      if (fn.call(context, this[i], i, this))
        return this[i]
  },

  /**
   * Check if _fn_ always evaluates to false, with
   * optional evaluation _context_.
   *
   * @param  {function} fn
   * @param  {mixed} context
   * @return {bool}
   * @api public
   */

  none: function(fn, context) {
    var state = true
    for (var i = 0, len = this.length; i < len; ++i)
      if (state)
        state = ! fn.call(context, this[i], i, this)
    return state
  }

})
