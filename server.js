var post = require('./lib/post')
,   Post = post.Post
,   fs   = require('fs')
,   path = require('path')
,   app  = require('./lib/config').app
,   PORT = process.env.PORT || 4000
,   LICENSE = fs.readFileSync(path.join(__dirname, 'LICENSE'))

// GET "/" - lists first 5 get("/", Post.paginate);
app.get('/', function(req, res) {
    res.render('index.ejs', Post.page(1))
})

// GET "/page/2" - lists 5 posts for the page passed
app.get("/page/:n", function(req, res) {
   res.render('index.ejs', Post.page(req.params.n))
})

// GET "/2010/05/10/title-of-article" - post permalink
app.get("/:y/:m/:d/:title", function(req, res) {
    var y = req.params.y
    ,   m = req.params.m
    ,   d = req.params.d
    ,   t = req.params.title
    ,   p = new Post([y,m,d,t].join('-') + '.md')
    res.render("post.ejs", {post:p})
})

// GET "/rss"
app.get("/rss", function(req, res) {
    res.headers['Content-Type'] = 'text/xml; charset=utf-8'
    res.send(Post.rss())
})

// GET "/license" - diplays the WTFPL
app.get('/license', function(req, res) {
    res.send(LICENSE)
})

// GET "/about"
app.get("/about", function(req, res) {
    res.render('about.ejs')
})

console.log("server.js listening on http://localhost:"+PORT)
app.listen(PORT)
