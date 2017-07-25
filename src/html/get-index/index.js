var fs = require('fs')
var path = require('path')
var arc = require('@architect/functions')
var layout = require('@wtfjs/theme')
var index = false

function route(req, res) {
  if (!index) index = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
  res({html:layout(index)})
}

exports.handler = arc.html.get(route)
