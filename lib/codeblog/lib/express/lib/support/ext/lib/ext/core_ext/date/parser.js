
// ext.js - Date - Parser - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Valid days.
 */

var days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday']

/**
 * Valid quantifiers.
 */

var quantifiers = [
  'second',
  'seconds',
  'minute',
  'minutes',
  'hour',
  'hours',
  'day',
  'days',
  'week',
  'weeks',
  'month',
  'months',
  'year',
  'years']

/**
 * Prefixes.
 */

var prefixes = {
  twenty:   20,
  thirty:   30,
  fourty:   40,
  fifty:    50,
  sixty:    60,
  seventy:  70,
  eighty:   80,
  ninety:   90
}

/**
 * Suffixes.
 */

var suffixes = {
  hundred:  100,
  thousand: 1000,
  million:  1000000,
  billion:  1000000000,
  trillion: 1000000000000
}

// --- Lexer

/**
 * Grammar tokens.
 */

var tokens = [
  ['filler', /^(and)/, false],
  ['space', /^[\n\t ]+/, false],
  ['in', /^in/],
  ['today', /^today/],
  ['next', /^next/],
  ['yesterday', /^yesterday/],
  ['quantifier', /^(seconds?|minutes?|hours?|days?|weeks?|months?|years?)/],
  ['day', /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/],
  ['prefix', /^(twenty|thirty|fourty|fifty|sixty|seventy|eighty|ninety)/],
  ['suffix', /^(hundred|thousand|million|billion|trillion)/],
  ['number', /^(\d+)/, function(val){ return parseInt(val) }],
  ['number', /^a +half/, 0.5],
  ['number', /^a +/, 1],
  ['number', /^one/, 1],
  ['number', /^two/, 2],
  ['number', /^three/, 3],
  ['number', /^four +/, 4],
  ['number', /^five/, 5],
  ['number', /^six +/, 6],
  ['number', /^seven +/, 7],
  ['number', /^eight +/, 8],
  ['number', /^nine +/, 9],
  ['number', /^ten/, 10],
  ['number', /^eleven/, 11],
  ['number', /^twelve/, 12],
  ['number', /^thirteen/, 13],
  ['number', /^fourteen/, 14],
  ['number', /^fifteen/, 15],
  ['number', /^sixteen/, 16],
  ['number', /^seventeen/, 17],
  ['number', /^eighteen/, 18],
  ['number', /^nineteen/, 19],
]

/**
 * Tokenize the given _str_.
 *
 * @param  {string} str
 * @return {array}
 * @api private
 */

function tokenize(str) {
  var stack = []
  while (str.length)
    tokens.find(function(token){
      if (str.match(token[1])) {
        if (token[2] !== false)
          stack.push({
            type: token[0],
            val: typeof token[2] === 'function'
              ? token[2](RegExp.$1)
              : token[2] === undefined
                ? RegExp.$1
                : token[2]
          })
        str = str.remove(token[1])
        return true
      }
    }) || Error.raise('SyntaxError', 'near "' + str + '"')
  return stack
}

// --- Parser

/**
 * Initialize with _str_ and optional _date_.
 */

function Parser(str, date) {
  this.input = str.lowercase
  this.tokens = tokenize(str)
  this.now = date || new Date
}

/**
 * Look-ahead a single token.
 *
 * @return {token}
 * @api public
 */

Parser.prototype.peek = function() {
  return this.tokens[0]
}

/**
 * Advance the parse a single token.
 *
 * @return {token}
 * @api public
 */

Parser.prototype.advance = function() {
  return this.current = this.tokens.shift()
}

/**
 * Accept token _type_, advancing or
 * returning undefined.
 *
 * @param  {string} type
 * @return {token}
 * @api private
 */

Parser.prototype.accept = function(type) {
  if (this.peek() && this.peek().type === type)
    return this.advance()
}

/**
 * Expect token _type_ or throw error.
 *
 * @param  {string} type
 * @return {token}
 * @api private
 */

Parser.prototype.expect = function(type) {
  var token = this.accept(type)
  if (!token) Error.raise('ParseError', 'expected ' + type + ' after ' + this.current.type)
  return token
}

/**
 *   day
 * | next
 * | yesterday
 * | in
 */

Parser.prototype.parse = function() {
  switch (this.peek().type) {
    case 'day':
      this.advance()
      this.nextDay()
      break
    case 'next':
      this.advance()
      this.expect('day')
      this.nextDay()
      break
    case 'yesterday':
      this.advance()
      this.now.setDate(this.now.date - 1)
      break
    case 'in':
      this.advance()
      this.now = new Date(Number(this.now) + this.numberString())
  }
  return this.now
}

/**
 * ( 'sunday'
 * | 'monday'
 * | 'tuesday'
 * | 'wednesday'
 * | 'thursday'
 * | 'friday'
 * | 'saturday')
 */

Parser.prototype.nextDay = function() {
  var start = this.now.day,
      end = days.indexOf(this.current.val),
      diff = end - start,
      n = diff > 0 ? diff : 7 + diff
  this.now.setDate(this.now.date + n)
}

/**
 * prefix? number ('a half')? suffix? quantifier
 */

Parser.prototype.numberString = function() {
  var prefix, suffix, number, ms, n = 0
  if (prefix = this.accept('prefix'))
    n = prefixes[prefix.val]
  n += this.expect('number').val
  if (number = this.accept('number'))
    n += number.val
  if (suffix = this.accept('suffix'))
    n *= suffixes[suffix.val]
  return n[this.expect('quantifier').val]
}

/**
 * Parse date _str_ with optional _date_
 * representing "now".
 *
 * @param  {string} str
 * @param  {date} date
 * @return {date}
 * @api public
 */

exports.parse = function(str, date) {
  return (new Parser(str, date)).parse()
}

