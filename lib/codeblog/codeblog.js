require.paths.unshift(__dirname + "/lib/express/lib");
require.paths.unshift(__dirname + "/lib/showdown-v0.9/src");
require.paths.unshift(__dirname + "/lib/prettyfy");

require("express");
require("express/plugins");

configure(function() {
    set('root', __dirname);
    // set('views', __dirname + '/views');
    use(Logger);
    use(Static);
    enable('show exceptions');
});

var path = require("path")
,   sys = require("sys")
,   fs = require('fs')
,   Post = require('post')
,   postsPath = path.join(__dirname, '..', '..', '/posts');

var paginate = function(page) {
    var self = this;
    fs.readdir(postsPath, function(err, files){
        var posts = Post.all(files).reverse()
        ,   count = 5
        ,   max   = Math.ceil(posts.length/count)
        ,   cur   = ~~page || 1
        ,   next  = cur + 1
        ,   prev  = cur - 1
        ,   start = cur == 1 ? 0 : prev*count
        ,   end   = start >= count ? start+count : count;

        self.render('index.html.ejs', {locals:{ 
            posts:    posts.slice(start, end),
            page:     cur,
            max:      max,
            nextPage: next > max ? max : next,
            prevPage: prev == 0 ? 1 : prev
        }});
    });
};

// GET "/" - lists first 5 posts
get("/", paginate);

// GET "/page/2" - lists 5 posts for the page passed
get("/page/:n", paginate);

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
        s += '<description><style>.str{color:#080}.kwd{color:#008}.com{color:#800}.typ{color:#606}.lit{color:#066}.pun{color:#660}.pln{color:#000}.tag{color:#008}.atn{color:#606}.atv{color:#080}.dec{color:#606}pre.prettyprint{padding:2px;border:1px solid #888}@media print{.str{color:#060}.kwd{color:#006;font-weight:bold}.com{color:#600;font-style:italic}.typ{color:#404;font-weight:bold}.lit{color:#044}.pun{color:#440}.pln{color:#000}.tag{color:#006;font-weight:bold}.atn{color:#404}.atv{color:#060}}.lit,.typ {color:#009D57;}.com { color: #666;    }.pln { color: #C0C0C0; }.kwd { color: #4169E1; }.tag { color: #4169E1; }pre {border:1px solid #5d6778;border-radius:5px;-moz-border-radius: 5px;padding:10px 10px 20px 0;background:-webkit-gradient(linear, 0% 0%,0%100%,from(#000),to(#0F2925));background:-moz-linear-gradient(top, #000, #0F2925);}</style>' + posts[i].html() + '</description>';
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

// GET "/license" - diplays the WTFPL
get('/license', function(){
    return fs.readFileSync( path.normalize( path.join( __dirname, "..", "..", "LICENSE")));
});

// kicks off the process
run(parseInt(process.env.PORT || 8000), null);