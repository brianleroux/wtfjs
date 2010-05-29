
// ext.js - String - Inflections - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

require('ext').extend(String.prototype, {

  /**
   * Capitalize the given _str_, optionally _all_ words.
   *
   *   'hello there'.capitalize()
   *    // => 'Hello there'
   *
   *   'hello there'.capitalize('all') // or true
   *    // => 'Hello There'
   *
   * @param  {bool} all
   * @return {string}
   * @api public
   */

  capitalize: function (all) {
    return this.split(/\s+/).map(function(word, i){
      return (i === 0 || all)
        ? word.charAt(0).uppercase + word.drop(1)
        : word
    }).join(' ')
  },

  /**
   * Return lowercase string.
   *
   *   'HELLO'.lowercase
   *    // => 'hello'
   *
   * @return {string}
   * @api public
   */

  get lowercase() { return this.toLowerCase() },

  /**
   * Return uppercase string.
   *
   *   'hello'.uppercase
   *    // => 'HELLO'
   *
   * @return {string}
   * @api public
   */

  get uppercase() { return this.toUpperCase() },

  /**
   * Convert to camel-case.
   *
   *   'hello there'.camelcase
   *   // => 'HelloThere'
   *
   * @return {string}
   * @api public
   */

  get camelcase() {
    return this.replace(/[^a-zA-Z0-9 ]+/g, ' ').capitalize(true).remove(/ +/g)
  },

  /**
   * Return a string of digits.
   *
   *   '$1,000'.digits
   *   // => '1000'
   *
   * @return {string}
   * @api public
   */

  get digits() { return this.remove(/[^\d]/g) },

  /**
   * Returns the plural of the string.
   *
   *   'potato'.plural
   *   // => 'potatoes'
   *
   * @return {string}
   * @api public
   */

  get plural() { return inflect(this, pluralRules) },

  /**
   * Returns the singular of the string.
   *
   *   'potatoes'.singular
   *   // => 'potato'
   *
   * @return {string}
   * @api public
   */

  get singular() { return inflect(this, singularRules) },

  /**
   * Check if the string is plural.
   *
   * @return {bool}
   * @api public
   */

  get isPlural() {
    var plural = this.plural
    return this === plural ||
           this + 's' === plural
  },

  /**
   * Check if the string is singular.
   *
   * @return {bool}
   * @api public
   */

  get isSingular() { return this === this.singular }

})

function inflect(str, rules) {
  var rule
  if (!uncountables.includes(str.lowercase))
    if (rule = rules.find(function (rule) { return str.match(rule.first) }))
      return str.replace(rule.first, rule.last)
  return str;
}

/**
 * Uncountable words.
 */

var uncountables = [
  'advice',
  'energy',
  'excretion',
  'digestion',
  'cooperation',
  'health',
  'justice',
  'labour',
  'machinery',
  'equipment',
  'information',
  'pollution',
  'sewage',
  'paprer',
  'money',
  'species',
  'series',
  'rain',
  'rice',
  'fish',
  'sheep',
  'moose',
  'deer',
  'news'
]

/**
 * Pluralization rules.
 */

var pluralRules = [
  [/(m)an$/gi, '$1en'],
  [/(pe)rson$/gi, '$1ople'],
  [/(child)$/gi, '$1ren'],
  [/^(ox)$/gi, '$1en'],
  [/(ax|test)is$/gi, '$1es'],
  [/(octop|vir)us$/gi, '$1i'],
  [/(alias|status)$/gi, '$1es'],
  [/(bu)s$/gi, '$1ses'],
  [/(buffal|tomat|potat)o$/gi, '$1oes'],
  [/([ti])um$/gi, '$1a'],
  [/sis$/gi, 'ses'],
  [/(?:([^f])fe|([lr])f)$/gi, '$1$2ves'],
  [/(hive)$/gi, '$1s'],
  [/([^aeiouy]|qu)y$/gi, '$1ies'],
  [/(x|ch|ss|sh)$/gi, '$1es'],
  [/(matr|vert|ind)ix|ex$/gi, '$1ices'],
  [/([m|l])ouse$/gi, '$1ice'],
  [/(quiz)$/gi, '$1zes'],
  [/s$/gi, 's'],
  [/$/gi, 's']
]

/**
 * Singularization rules.
 */

var singularRules = [
  [/(m)en$/gi, '$1an'],
  [/(pe)ople$/gi, '$1rson'],
  [/(child)ren$/gi, '$1'],
  [/([ti])a$/gi, '$1um'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$1$2sis'],
  [/(hive)s$/gi, '$1'],
  [/(tive)s$/gi, '$1'],
  [/(curve)s$/gi, '$1'],
  [/([lr])ves$/gi, '$1f'],
  [/([^fo])ves$/gi, '$1fe'],
  [/([^aeiouy]|qu)ies$/gi, '$1y'],
  [/(s)eries$/gi, '$1eries'],
  [/(m)ovies$/gi, '$1ovie'],
  [/(x|ch|ss|sh)es$/gi, '$1'],
  [/([m|l])ice$/gi, '$1ouse'],
  [/(bus)es$/gi, '$1'],
  [/(o)es$/gi, '$1'],
  [/(shoe)s$/gi, '$1'],
  [/(cris|ax|test)es$/gi, '$1is'],
  [/(octop|vir)i$/gi, '$1us'],
  [/(alias|status)es$/gi, '$1'],
  [/^(ox)en/gi, '$1'],
  [/(vert|ind)ices$/gi, '$1ex'],
  [/(matr)ices$/gi, '$1ix'],
  [/(quiz)zes$/gi, '$1'],
  [/s$/gi, '']
]

