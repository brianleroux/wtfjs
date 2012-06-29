
/**
 * Module dependencies.
 */

var connect = require('./lib/connect');

connect.createServer(
  connect.router(function(app){
    app.get('/user/:id/:op', function(req, res){
      res.writeHead(200, { 'Content-Length': 5 })
      res.end('Hello');
    });
  })
).listen(3000);
