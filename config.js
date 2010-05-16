// FIXME - dependency ceremony 
require.paths.unshift("vendor/express/lib");
require("express");
require("express/plugins");


// FIXME - config ceremony 
configure(function() {
    set("root", __dirname);  
    use(Logger);
    use(Static, { path: require("path").join(__dirname, "..", "public") });
    enable("show exceptions");
});

