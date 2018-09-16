var fs = require('fs')
var path = require('path')
var arc = require('@architect/functions')
var layout = require('@architect/shared/layout')
var about = fs.readFileSync(path.join(__dirname, 'about.html')).toString()

function route(req, res) {
  res({html:layout(about)})
}

exports.handler = arc.html.get(route)
