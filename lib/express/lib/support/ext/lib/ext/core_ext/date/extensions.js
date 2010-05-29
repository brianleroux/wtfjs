
// ext.js - Date - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

/**
 * Module dependencies.
 */

var number = require('ext/core_ext/number'),
    parser = require('ext/core_ext/date/parser')

/**
 * Month names.
 */

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December']

/**
 * Day names.
 */

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']

// --- Extensions

require('ext').extend(Date.prototype, {

  /**
   * Shortcuts for getMETHOD
   */

  get milliseconds() { return this.getMilliseconds() },
  get seconds() { return this.getSeconds() },
  get minutes() { return this.getMinutes() },
  get hours() { return this.getHours() },
  get date() { return this.getDate() },
  get day() { return this.getDay() },
  get month() { return this.getMonth() },
  get year() { return this.getFullYear() },

  /**
   * Return month name string.
   *
   * @return {string}
   * @api public
   */

  get monthName() { return months[this.month] },

  /**
   * Return 3 character month name string.
   *
   * @return {string}
   * @api public
   */

  get shortMonthName() { return months[this.month].substr(0, 3) },

  /**
   * Return day name string.
   *
   * @return {string}
   * @api public
   */

  get dayName() { return days[this.day] },

  /**
   * Return 3 character day name string.
   *
   * @return {string}
   * @api public
   */

  get shortDayName() { return days[this.day].substr(0, 3) },

  /**
   * Format date using the given _str_ using the
   * following format syntax:
   *
   *  % [flag]specifier
   *
   *  Flags:
   *    - n  Passes numeric value through ordinalize() to produce '12th', '3rd', etc
   *
   *  Specifiers:
   *    - a  Short weekday name ('Mon')
   *    - A  Full weekday name ('Monday')
   *    - b  Short month name ('Jan')
   *    - B  Full month name ('January')
   *    - e  Day number (12)
   *    - p  AM / PM
   *    - P  am / pm
   *    - S  Seconds (34)
   *    - d  Day with leading zero (01, 30)
   *    - m  Month with leading zero (01, 12)
   *    - M  Minutes with leading zero (01, 60)
   *    - H  Hours with leading zero (01, 24)
   *    - Y  Year with century (2010)
   *
   * @param  {string} str
   * @return {string}
   * @api public
   */

  format: function(str) {
    var val, self = this
    function pad(n){ return n < 10 ? '0' + n : n }
    return str.replace(/%(\w)?(\w)/g, function(_, flag, specifier){
      val = (function(){
        switch (specifier) {
          case 'a': return self.shortDayName
          case 'A': return self.dayName
          case 'b': return self.shortMonthName
          case 'B': return self.monthName
          case 'd': return pad(self.date)
          case 'e': return self.date
          case 'P': return self.hours > 11 ? 'pm' : 'am'
          case 'p': return self.hours > 11 ? 'PM' : 'AM'
          case 'S': return pad(self.seconds)
          case 'm': return pad(self.month + 1)
          case 'M': return pad(self.minutes)
          case 'H': return pad(self.hours)
          case 'l': return self.hours > 12 ? self.hours - 12 : self.hours
          case 'Y': return pad(self.year)
        }
      })()
      return flag === 'n' ? val.ordinalize : val
    })
  },

  /**
   * Return in words since the given _date_.
   *
   *  'completed ' + (5).days.ago.inWordsSince(new Date) + ' ago'
   *  // => "completed 5 days ago"
   *
   * @param  {Date} date
   * @return {string}
   * @api public
   */

   inWordsSince: function(date) {
     if (this > date) return
     var ms = (Number(date) - Number(this))
     function as(type) {
       var n = parseInt(ms['to' + type + 's'].toFixed(0)),
           type = type.toLowerCase()
       return n === 1 ? 'one ' + type : n + ' ' + type + 's'
     }
     if (ms < (60).seconds)
       return 'less than one minute'
     else if (ms < (60).minutes)
       return as('Minute')
     else if (ms < (24).hours)
       return as('Hour')
     else if (ms < (7).days)
       return as('Day')
     else if (ms < (4).weeks)
       return as('Week')
     else if (ms < (12).months)
       return as('Month')
     else if (ms < (99).years)
       return as('Year')
   },

   /**
    * Parse date _str_ relative to this date.
    *
    * @param  {string} str
    * @return {date}
    * @api public
    */

   parse: function(str) {
     return parser.parse(str, this)
   },

   /**
    * Return in words since now.
    *
    *  'completed' + (5).days.ago.inWordsSinceNow + ' ago'
    *  // => "completed 5 days ago"
    *
    * @return {string}
    * @api public
    */

   get inWordsSinceNow() {
     return this.inWordsSince(new Date)
   }
})

