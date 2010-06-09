require.paths.unshift(__dirname + "/lib/express/lib");
require.paths.unshift(__dirname + "/lib/showdown-v0.9/src");
require.paths.unshift(__dirname + "/lib/prettyfy");
require.paths.unshift(__dirname + "/lib/express-clean-config");

require('express');
require('express/plugins');

Object.merge(global, require('express-clean-config'));

var path = require('path')
,   sys = require('sys')
,   fs = require('fs')
,   Post = require('post').Post;

// GET "/" - lists first 5 posts
get("/", Post.paginate);

// GET "/page/2" - lists 5 posts for the page passed
get("/page/:n", Post.paginate);

// GET "/about"
get("/about", function(){
    this.render("about.html.ejs");
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

// GET "/archive" - shows a summary of all posts by year/month
get("/archive", function() {
    this.render("archive.html.ejs");
});

// GET "/archive/2010" - shows posts for year
get("/archive/:year",function() {
    return "no implemented" 
});

// GET "/archive/2010/10"
get("/archive/:year/:month",function() {
    return "no implemented" 
});

// GET "/2010/05/10/title-of-article" - post permalink
get("/:y/:m/:d/:title", function() {
    var args  = [].splice.call(arguments, 0)
    ,   title = args.join('-') + '.md'
    ,   post  = Post.create(title);
    this.render("post.html.ejs", {locals:{ post:post }});
});