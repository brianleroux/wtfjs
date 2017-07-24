var fs = require('fs')
var path = require('path')
var arc = require('@architect/functions')
var layout = require('@wtfjs/theme')
var about = false

function route(req, res) {
  if (!about) about = fs.readFileSync(path.join(__dirname, 'about.html')).toString()
  res({html:layout(about)})
}

exports.handler = arc.html.get(route)
