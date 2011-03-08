var express = require('express')
,   app     = express.createServer()
,   path    = require('path')


app.configure(function() {
    app.use(express.methodOverride())
    app.use(express.bodyDecoder())
    app.use(app.router)
    app.use(express.staticProvider(path.join(__dirname, '..', 'public')))
})

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
    app.use(express.logger())
})

app.configure('production', function(){
    app.use(express.errorHandler())
})

exports.app = app
