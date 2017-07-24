var arc = require('@architect/functions')

function route(req, res) {
  // <article><h1></h1></article>
  console.log(JSON.stringify(req, null, 2))
  res({html:`hello world`})
}

exports.handler = arc.html.get(route)
