var fs = require('fs')
var path = require('path')
var arc = require('@architect/functions')
var layout = require('@architect/shared/layout')
var index = fs.readFileSync(path.join(__dirname, 'license.html')).toString()
let html = layout(index)

function route(req, res) {
  res({html})
}

exports.handler = arc.html.get(route)
