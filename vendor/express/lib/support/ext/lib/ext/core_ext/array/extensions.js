
// ext.js - Array - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Array.prototype, {

  /**
   * Returns a Boolean value that indicates whether the Array is empty.
   *
   *  [].isEmpty
   *  // => true
   *
   *  [1,2,3].isEmpty
   *  // => false
   *
   * @return {bool}
   * @api public
   */

  get isEmpty() { return this.length === 0 },

  /**
   * Removed all values strictly matching _obj_ from the array.
   *
   *  [1,2,2,2,3].remove(2)
   *  // => [1,3]
   *
   * @param {mixed} obj
   * @return {array}
   * @api public
   */

  remove: function (obj) {
    return this.reject(function(val){
      return val === obj
    })
  },

  /**
   * Removes all values.
   *
   *  [1,2,3].clear
   *  // => []
   *
   * @return {Array}
   * @api public
   */

  get clear() {
    this.length = 0
    return this
  },

  /**
   * Returns a Boolean value indicating the presence of the given item(s).
   * Accepts a single item, an array of items, or several arguments.
   *
   *  [1,2,3].includes(1)
   *  // => true
   *
   *  [1,2,3].includes(4)
   *  // => false
   *
   *  [1,2,3].includes([1,2,3,4])
   *  // => false
   *
   *  [1,2,3].includes([1,2,3])
   *  // => true
   *
   *  ['foo', 'bar'].includes('bar', 'foo')
   *  // => true
   *
   * @param  {mixed} items
   * @return {bool}
   * @api public
   */

  includes: function (items) {
    if (!(items instanceof Array))
      items = Object.values(arguments)
    for (var i = 0, len = items.length; i < len; ++i)
      if (this.indexOf(items[i]) === -1)
        return false
    return true
  },

  /**
   * Negated version of #includes().
   *
   * @param  {mixed} items
   * @return {bool}
   * @api public
   */

  excludes: function() {
    return ! this.includes.apply(this, arguments)
  },

  /**
   * Get / Set the first element of the Array.
   *
   * @return {mixed}
   * @api public
   */

  get first() { return this[0] },
  set first(val) { this[0] = val },

  /**
   * Get / Set the last element of the Array.
   *
   * @return {mixed}
   * @api public
   */

  get last() { return this[this.length - 1 || 0] },
  set last(val) { this[this.length - 1 || 0] = val },

  /**
   * Return a random value.
   *
   *  [1,2,3].sample
   *  // => 1
   *
   *  [1,2,3].sample
   *  // => 3
   *
   * @return {mixed}
   * @api public
   */

  get sample() {
    return this[Math.floor(Math.random() * this.length)]
  },

  /**
   * Get the value at the given _index_.
   *
   * @return {mixed}
   * @api public
   */

   at: function(index) { return this[index] },

   /**
    * Drop the first _n_ values.
    *
    * @param  {int} n
    * @return {array}
    * @api public
    */

   drop: function(n) {
     return this.slice(n, this.length)
   },

   /**
    * Take the first _n_ values.
    *
    * @param  {int} n
    * @return {array}
    * @api public
    */

   take: function(n) {
     return this.slice(0, n)
   },

   /**
    * Select values matching _pattern_.
    *
    *  ['foo', 'foobar', 'bar'].grep(/^foo(bar)?/)
    *  // => ['foo', 'foobar']
    *
    * @param  {regexp} pattern
    * @return {array}
    * @api public
    */

   grep: function(pattern) {
     return this.filter(function(val){
       return pattern.test(val)
     })
   },

  /**
   * Returns a new array void of the given args,
   * which default to [undefined, null].
   *
   *  [1,2,undefined,null].compact()
   *  // => [1,2]
   *
   *  [1,2,undefined,null].compact(null)
   *  // => [1,2,undefined]
   *
   *  [false, null, undefined, -1, 0].compact(null, undefined, false, -1, 0)
   *  // => []
   *
   * @param  {mixed} ...
   * @return {array}
   * @api public
   */

  compact: function() {
    var remove = arguments.length
          ? Object.values(arguments)
          : [undefined, null]
    return this.filter(function(val){
      return remove.excludes(val)
    })
  },

  /**
   * Returns a flattened version of the Array.
   *
   *  [1,[2,[3]]].flatten
   *  // => [1,2,3]
   *
   * @return {array}
   * @api public
   */

  get flattened() {
    return this.reduce(function(vals, val){
      return vals.concat(val.length ? val.flattened : val)
    }, [])
  },
  
  /**
   * Returns a transposed version of the Array.
   *
   *  [[1,2], [3,4], [5,6]].transposed
   *  // => [[1, 3, 5], [2, 4, 6]]
   *
   * @return {array}
   * @api public
   */

  get transposed() {
    var transposed = []
    if (!this.length) return transposed
    this[0].each(function (_, i) {
      transposed[i] = []
      this.each(function (_, j, a) {
        transposed[i][j] = a[j][i]
      })
    }, this)
    return transposed
  }

})
