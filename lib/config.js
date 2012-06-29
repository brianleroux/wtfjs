var express = require('express')
,   app     = express.createServer()
,   path    = require('path')
,   engine  = require('ejs-locals')

app.engine('ejs', engine);
app.set('views', path.join(__dirname, '..', '/views'))
app.set('view engine', 'ejs'); // so you can render('index')

app.configure(function() {
    app.use(express.methodOverride())
    app.use(express.bodyParser())
    app.use(app.router)
    app.use(express.static(path.join(__dirname, '..', 'public')))
})

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
    app.use(express.logger())
})

app.configure('production', function(){
    app.use(express.errorHandler())
})

exports.app = app
