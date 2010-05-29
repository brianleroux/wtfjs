require.paths.unshift("lib/express/lib");
require.paths.unshift("lib/wtfjs");
require.paths.unshift("lib/showdown-v0.9/src");

require("express");
require("express/plugins");
require("wtf");

run(parseInt(process.env.PORT || 8000), null);