require.paths.unshift("vendor/express/lib");
require("express");
require("express/plugins");


configure(function() {
    set("root", __dirname);  
    use(Logger);
    use(Static, { path: require("path").join(__dirname, "..", "public") });
    enable("show exceptions");
});


// GET "/"
get("/", function() {
    return "Hello there from home"
    /*
    this.render("index.html.haml", {
        locals: { remoteIp: this.connection.remoteAddress}
    });
    */
});


// GET "/2010/05/10/title-of-article"
// GET "/about"
// GET "/rss"

// old urls
// 
// GET "/post/593017183/title-of-article"
// GET "/archive"
// GET "/archive/2010/10"
// 

/*
templates
pages 
articles
*/

//<-------------------------------------------
run(parseInt(process.env.PORT || 8000), null);
