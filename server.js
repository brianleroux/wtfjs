require.paths.unshift("vendor/express/lib");
require.paths.unshift("vendor/showdown-v0.9/src");

require("express");
require("express/plugins");

// FIXME - this is ugly
var path = require("path");
var sys = require("sys");
var fs = require('fs');
var sd = require("showdown");

var staticPath = path.join(__dirname, "public");


// FIXME - config ceremony 
configure(function() {
    set("root", __dirname);  
    use(Logger);
    use(Static, { path:staticPath }); // FIXME - appears to be failing
    enable("show exceptions");
});


// FIXME - this should be done automagically w/ use(Static)
get('/app.css', function(){ 
    var f = path.join(staticPath, 'app.css');
    this.sendfile(f);
});

var Post = function(filename){
    this.filename = filename;
};

Post.all = function(files) {
    return files.map(function(f) { 
        return new Post(f);
    });
};

Post.prototype = {
    created: function() {
        var e = this.filename.slice(0,3)
        ,   y = e[0]
        ,   m = e[1]
        ,   d = e[2]
        return new Date(y, m, d);
    },
    title: function() {
        var a = this.filename.split('-')
        ,   l = a.length
        ,   t = a.slice(3,l).join(' ').replace('.md','');
        return t;
    },
    anchor: function() {
        var everything = this.filename.replace('.md','').split('-')
        ,   length = everything.length
        ,   theDate = everything.slice(0,3).join('/')
        ,   article = everything.slice(3,length).join('-');

        return '<a href="/' + theDate  + '/' + article + '">' + this.title() + '</a>' 
    },
    html: function() {
        var text = "Markdown *rocks*.";
        return sd.md2html(text);
    }
};



// GET "/" - lists posts
get("/", function() {
    var self = this;
    fs.readdir(__dirname + '/posts', function(err, files){
        self.render('index.html.ejs', {locals:{ 
            posts:Post.all(files) 
        }});
    });  
});

// GET "/about"
get("/about", function(){
    this.render("about.html.ejs");
});

// GET "/rss"
get("/rss", function(){
    this.render("rss.xml.ejs");
});

// GET "/archive"
// GET "/archive/2010/10"
get("/archive", function(){
    this.render("archive.html.ejs");
});

var renderPost = function() {
    this.render("post.html.ejs", {locals:{
        post:new Post('2010-05-10-title-of-article.md')
    }});
};

// GET "/2010/05/10/title-of-article" - post permalink
get("/:y/:m/:d/:title", renderPost);
 
// GET "/post/593017183/title-of-article" - legacy url
get("/post/:slug/:title", renderPost);

// go! <-------------------------------------!
run(parseInt(process.env.PORT || 8000), null);