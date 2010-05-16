require("config");


// GET "/" - lists posts
get("/", function() {
    var o = {
        title:this.connection.remoteAddress,
        content:'blog content',
        author:'brian leroux'
    };
    this.render("post.html.ejs", {locals:o});
});

// GET "/2010/05/10/title-of-article" - post permalink 
// GET "/post/593017183/title-of-article" - legacy url


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



// go! <-------------------------------------!
run(parseInt(process.env.PORT || 8000), null);