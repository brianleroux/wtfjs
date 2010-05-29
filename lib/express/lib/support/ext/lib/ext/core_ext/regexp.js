
// ext.js - RegExp - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(RegExp, {

  /**
   * Escape RegExp _chars_ in _string_. Where _chars_
   * defaults to regular expression special characters.
   *
   * _chars_ should be a space delimited list of characters,
   * for example '[ ] ( )'.
   *
   * @param  {string} str
   * @param  {string} chars
   * @return {Type}
   * @api public
   */

  escape: function(str, chars) {
    var specials = (chars || '/ . * + ? | ( ) [ ] { } \\ ^ ? ! = : $').split(' ').join('|\\')
    return str.replace(new RegExp('(\\' + specials + ')', 'g'), '\\$1')
  }
})

