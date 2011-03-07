/*
config({ 
    root:       __dirname,
    theme:      'wtfjs',
    title:      'wtfjs',
    domain:     'wtfjs.com',
    desciption: 'JavaScript is a language we love despite it giving us so much to hate. This is a collection of those very special irregularities, inconstancies and just plain painfully unintuitive moments for the language of the web.',
    analytics:  'UA-190386-6'
});
*/

require.paths.unshift('node_modules')

var express = require('express')
  , app = express.createServer()
  , get = app.get

app.configure(function(){
  app.use(express.methodOverride())
  app.use(express.bodyDecoder())
  app.use(app.router)
  app.use(express.staticProvider(__dirname + '/public'))
})

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
  app.use(express.logger())
})

app.configure('production', function(){
  app.use(express.errorHandler());
})

// GET "/" - lists first 5 get("/", Post.paginate);

// GET "/page/2" - lists 5 posts for the page passed
get("/page/:n", function(req, res) {
    res.render('index.html.ejs', {locals:Post.paginate})
})

// GET "/about"
get("/about", function(){
    this.display("about.html.ejs");
});

// GET "/rss"
get("/rss", function(){
    this.response.headers['Content-Type'] = 'text/xml; charset=utf-8';
    var title  = set('title')
    ,   desc   = set('description')
    ,   domain = set('domain')
    ,   rss    = Post.rss(title, desc, domain);
    return rss;
});

// GET "/2010/05/10/title-of-article" - post permalink
get("/:y/:m/:d/:title", function() {
    var args  = [].splice.call(arguments, 0)
    ,   title = args.join('-') + '.md'
    ,   post  = Post.create(title);
    this.display("post.html.ejs", {post:post});
});

// GET "/license" - diplays the WTFPL
get('/license', function() {
    var fs = require('fs')
    ,   path = require('path');
    return fs.readFileSync( path.normalize( path.join( __dirname, 'LICENSE' )));
})

app.listen(process.env.PORT || 4000)
