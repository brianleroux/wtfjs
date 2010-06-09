
// ext.js - Array - Collections - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Array.prototype, {

  /**
   * Return sum of values.
   *
   *  [1,2,3,4,5].sum
   *  // => 15
   *
   * @return {number}
   * @api public
   */

  get sum() {
    var sum = 0
    for (var i = 0, len = this.length; i < len; ++i)
      sum += this[i]
    return sum
  },

  /**
   * Return average of values.
   *
   *  [1,2,3,4,5].avg
   *  // => 5
   *
   * @return {number}
   * @api public
   */

  get avg() {
    if (!this.length) return 0
    return this.sum / this.length
  },

  /**
   * Return lowest value.
   *
   * @return {number}
   * @api public
   */

  get min() {
    var min = this[0] || 0
    for (var i = 1, len = this.length; i < len; ++i)
      min = this[i] < min ? this[i] : min
    return min
  },

  /**
   * Return largest value.
   *
   * @return {number}
   * @api public
   */

  get max() {
    var max = this[0] || 0
    for (var i = 1, len = this.length; i < len; ++i)
      max = this[i] > max ? this[i] : max
    return max
  }
})
