require.paths.unshift("lib/express/lib");
require.paths.unshift("lib/wtfjs");
require.paths.unshift("lib/showdown-v0.9/src");
require.paths.unshift("lib/prettyfy");

require("express");
require("express/plugins");
require("wtf");

// config block; sorta fugly
configure(function() {
    set('root', __dirname + '/lib/wtfjs');
    // set('views', __dirname + '/views');
    use(Logger);
    use(Static);
    enable('show exceptions');
});

run(parseInt(process.env.PORT || 8000), null);