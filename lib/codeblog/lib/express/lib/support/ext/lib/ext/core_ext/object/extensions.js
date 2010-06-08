
// ext.js - Object - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Object, {

  /**
   * Merges all values from object _b_ to _a_.
   *
   * @param  {object} a
   * @param  {object} b
   * @return {object}
   * @api public
   */

  merge: function (a, b) {
    if (!b) return a
    var keys = Object.keys(b)
    for (var i = 0, len = keys.length; i < len; ++i)
      a[keys[i]] = b[keys[i]]
    return a
  },
  
  /**
   * Perform a deep merge with object _a_ and _b_.
   *
   * @param  {object} a
   * @param  {object} b
   * @return {object}
   * @api public
   */
  
  mergeDeep: function(a, b) {
    if (!b) return a
    var target = a,
        keys = Object.keys(b)
    for (var i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i]
      if (typeof b[key] === 'object')
        target = Object.mergeDeep((target[key] = target[key] || {}), b[key])
      else
        target[key] = b[key]
    }
    return a
  },
  
  /**
   * Return object values as an array.
   *
   * @param  {object} object
   * @return {array}
   * @api public
   */
  
  values: function(obj) {
    if (!obj || typeof obj !== 'object')
      return []
    var keys = Object.keys(obj),
        vals = []
    for (var i = 0, len = keys.length; i < len; ++i)
      vals.push(obj[keys[i]])
    return vals
  }
})

