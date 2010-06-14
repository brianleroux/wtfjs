var sys = require('sys');

/**
 * Compiled template cache.
 */

var cache = {}

exports.render = function(str, options) {
  options = options || {}
  var fn = cache[str] = cache[str] ||
    new Function("locals",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +
      "with(locals){p.push('" +
      str.toString() // FIXME new kludge for node 0.1.98
        .replace(/[\r\t\n]/g, " ")
        .split("<%").join("\t")
        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
        .split("'").join("\\'")
        .replace(/\t=(.*?)%>/g, "',$1,'")
        .split("\t").join("');")
        .split("%>").join("p.push('")
        .split("\r").join("\\'")
    + "');}return p.join('');")
  return fn.call(options.context, options.locals || {})
}

