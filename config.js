// FIXME - dependency ceremony 
require.paths.unshift("vendor/express/lib");
require("express");
require("express/plugins");

// FIXME - this is ugly
var path = require("path");
var sys = require("sys");

var staticPath = path.join(__dirname, "public");

// FIXME - config ceremony 
configure(function() {
    set("root", __dirname);  
    use(Logger);
    use(Static, { path:staticPath }); // FIXME - appears to be failing
    enable("show exceptions");
});

// FIXME - this should be done automagically w/ use(Static)
get('/*', function(file){ 
    var f = path.join(staticPath, file);
    var r = this;
    path.exists(f, function (exists) {
      if (exists) r.sendfile(f);
    });
});