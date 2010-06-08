
// ext.js - Function - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Function.prototype, {

  /**
   * Works like Function#curry() however accepts
   * a _context_ in which to evaluate the function.
   *
   * @param  {mixed} context
   * @param  {mixed} ...
   * @return {function}
   * @api public
   */

  bind: function(context) {
    var self = this,
        args = Object.values(arguments).drop(1)
    return function(){
      return self.apply(context, args.concat(Object.values(arguments)))
    }
  },
  
  /**
   * Returns a new function with the given args
   * "bound" to it.
   *
   * @param  {mixed} ...
   * @return {function}
   * @api public
   */
  
  curry: function() {
    if (!arguments.length) return this
    var self = this,
        args = Object.values(arguments)
    return function(){
      return self.apply(null, args.concat(Object.values(arguments)))
    }
  }
})
