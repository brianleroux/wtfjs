
// Class - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Create a "class" with the given _proto_.
 *
 * Example:
 *
 *   var User = new Class({
 *     constructor: function(name){
 *       this.name = name
 *     },
 *     toString: function(){
 *       return '[User ' + this.name + ']'
 *     }
 *   })
 *
 *   var Admin = User.extend({
 *     extend: { name: 'Admin' },
 *     constructor: function(name) {
 *       User.call(this, name.toUpperCase())
 *     }
 *   })
 *
 *   puts(new Admin('tj'))
 *   // => "[User TJ]"
 *
 *   puts(Admin.name)
 *   // => "Admin"
 *
 * @param  {object} proto
 * @return {function}
 * @api public
 */

function Class(proto) {
  var self = this,
      isSubclass = typeof this === 'function',
      Class = proto.hasOwnProperty('constructor')
        ? proto.constructor
        : isSubclass 
          ? (proto.constructor = function(){ self.apply(this, arguments) })
          : (proto.constructor = function(){})
  if (proto.hasOwnProperty('extend'))
    extend(Class, proto.extend)
  Class.prototype = proto
  if (isSubclass) Class.prototype.__proto__ = this.prototype
  Class.extend = arguments.callee
  return Class
}

Class.prototype = Function.prototype
Class.prototype.include = function(proto){ extend(this.prototype, proto) }

/**
 * Extend object _a_ with _b_.
 *
 * @param  {object} a
 * @param  {object} b
 * @api public
 */

function extend(a, b) {
  for (var key in b)
    if (b.hasOwnProperty(key))
      a[key] = b[key]
}

/**
 * Exports.
 */

exports.Class = Class
