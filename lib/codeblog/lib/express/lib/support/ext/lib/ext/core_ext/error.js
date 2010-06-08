
// ext.js - Error - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(Error, {

  /**
   * Shorthand for assigning a _name_ and offending _object_ as #object to an
   * Error object. Throws the error immediately after the function finished
   * executing.
   *
   * If no offending object is given, the function calling Error.raise() is
   * attached using arguments.callee.caller.
   *
   * All arguments are optional.
   *
   * @param {string} name
   * @param {string} message
   * @param {mixed} object
   * @throws
   */

  raise: function (name, message, object) {
    var e = new Error(message || 'Undefined error')
    e.name = name || e.name
    e.object = object || arguments.callee.caller
    throw e
  }
})

