var path = require("path")
,   sys = require("sys")
,   fs = require('fs')
,   Post = require('post')
,   postsPath = path.join(__dirname, '..', '..', '/posts');

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
    var self = this;
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
    s = '<rss version="2.0">';
    s += '<channel>';
    s += '<description>JavaScript is a language we love despite it giving us so much to hate. This is a collection of those very special irregularities, inconstancies and just plain painfully unintuitive moments for the language of the web.</description>';
    s += '<title>wtfjs</title>';
    s += '<generator>@brianleroux</generator>';
    s += '<link>http://wtfjs.com/</link>';    
    var posts = Post.all(fs.readdirSync(postsPath)).reverse(); // FIXME! yes yes, horribly inefficent 
    for (var i = 0; i < 5; i++) {        
        s += '<item>';
        s += '<title>' + posts[i].title() + '</title>';
        s += '<description>' + posts[i].html() + '</description>';
        s += '<link>http://wtfjs.com' + posts[i].url() + '</link>';
        s += '<guid>http://wtfjs.com' + posts[i].url() + '</guid>';
        s += '<pubDate>' + posts[i].created() + '</pubDate>';
        s += '</item>';
    }   
    s += '</channel></rss>'; 
    return s; // FIXME - this whole method is an embarassing gross. wtf!
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

// GET "/2010/05/10/title-of-article" - post permalink
get("/:y/:m/:d/:title", function() {
    var args = [].splice.call(arguments,0)
    ,   title = args.join('-') + '.md'
    ,   post = Post.create(title);
    this.render("post.html.ejs", {locals:{ post:post }});
});