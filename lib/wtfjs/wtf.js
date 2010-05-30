var path = require("path")
,   sys = require("sys")
,   fs = require('fs')
,   Post = require('post');

// config block; sorta fugly
configure(function() {
    set('root', __dirname);
    set('views', __dirname + '/views');
    use(Logger);
    use(Static);
    enable('show exceptions');
});

// GET "/" - lists first 5 posts
get("/", function() {
    var self = this
    ,   postsPath = path.join(__dirname, '..', '..', '/posts');
    fs.readdir(postsPath, function(err, files){
        var posts = Post.all(files).reverse();
        self.render('index.html.ejs', {locals:{ 
            posts:posts,
            length:posts.length,
            perPage:5,
            pages:posts.length/5
        }});
    });  
});

// GET "/page/2" - lists 5 posts for the page passed
get("/page/:n", function(){
    return "no implemento senior"
});

// GET "/about"
get("/about", function(){
    this.render("about.html.ejs");
});

// GET "/rss"
get("/rss", function(){
    this.response.headers['Content-Type'] = 'text/xml; charset=utf-8';
    return '<foo />';
});

// GET "/archive" - shows a summary of all posts by year/month
get("/archive", function(){
    this.render("archive.html.ejs");
});

// GET "/archive/2010" - shows posts for year
get("/archive/:year",function(){
    return "no implemented" 
});

// GET "/archive/2010/10"
get("/archive/:year/:month",function(){
    return "no implemented" 
});

// helper for rendering posts!
var renderPost = function() {
    // arguments
    this.render("post.html.ejs", {locals:{
        post:Post.create('2010-05-15-hello-world.md')
    }});
};

// GET "/2010/05/10/title-of-article" - post permalink
get("/:y/:m/:d/:title", renderPost);
 
// GET "/post/593017183/title-of-article" - legacy url
get("/post/:slug/:title", renderPost);