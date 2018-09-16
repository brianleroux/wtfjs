var fs = require('fs')
var path = require('path')
var arc = require('@architect/functions')
var layout = require('@architect/shared/layout')
var filter = f=> f.includes('.md')
var files = fs.readdirSync(__dirname + '/node_modules/@architect/shared/md').filter(filter).reverse()
var index = false

function link(file) {
  var val = file.replace('.md', '')
  var name = val.replace(/-/g, ' ')
  return `<li><a href=/wtfs/${val}>${name}</a></li>`
}

function route(req, res) {
  if (!index) index = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
  var list = files.map(link).join('')
  res({html:layout(index + list)})
}

exports.handler = arc.html.get(route)
