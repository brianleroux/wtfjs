var marked = require('marked')
var fs = require('fs')
var path = require('path')
var exists = require('file-exists')
var arc = require('@architect/functions')
var layout = require('@wtfjs/theme')

function route(req, res) {
  var filename = req.params.wtfID + '.md'
  var filepath = path.join(__dirname, 'node_modules', '@wtfjs', 'md', filename)
  exists(filepath, function _exists(err, yasqueen) {
    if (err) {
      res({
        status: 500, 
        html: 'internal serverless error'
      })
    }
    else if (yasqueen === false) {
      res({
        status: 404, 
        html: layout('wtf! not found')
      })
    }
    else {
      var title = req.params.wtfID.replace(/-/g, ' ')
      var body = marked(fs.readFileSync(filepath).toString())
      var tmpl = `<article><h1>${title}</h1>${body}</article>`
      var html = layout(tmpl)
      res({
        html
      })
    }
  })
}

exports.handler = arc.html.get(route)
