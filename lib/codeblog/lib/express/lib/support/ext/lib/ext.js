
// ext.js - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Version.
 */

exports.version = '0.6.0'
  
/**
 * Extend _obj_ with _props_, where all _props_
 * are not enumerable.
 *
 * @param  {mixed} obj
 * @param  {hash} props
 * @api public
 */

exports.extend = function(obj, props) {
  Object.getOwnPropertyNames(props).forEach(function(prop){
    var descriptor = Object.getOwnPropertyDescriptor(props, prop)
    descriptor.enumerable = false
    Object.defineProperty(obj, prop, descriptor)
  })
}

/**
 * Warn using the given _msg_, the same message
 * is only displayed once.
 *
 * @param  {string} msg
 * @api private
 */

var warns = []
exports.warn = function(msg) {
  if (warns.indexOf(msg) === -1)
    warns.push(msg),
    process.binding('stdio').writeError('Warning: ' + msg + '\n')
}

require('ext/core_ext')
Object.merge(exports, require('ext/md5'))
Object.merge(exports, require('ext/base64'))
Object.merge(exports, require('ext/printf'))
