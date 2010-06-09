require.paths.unshift("node-code-blog");
require("node-code-blog");

config({ 
    root: __dirname + '/node-code-blog/lib/node-code-blog-themes/wtfjs',
    title: 'wtfjs',
    domain: 'wtfjs.com',
    desciption: 'JavaScript is a language we love despite it giving us so much to hate. This is a collection of those very special irregularities, inconstancies and just plain painfully unintuitive moments for the language of the web.',
    analytics:''
});

// GET "/license" - diplays the WTFPL
get('/license', function(){
    var fs = require('fs')
    ,   path = require('path');
    return fs.readFileSync( path.normalize( path.join( __dirname, 'LICENSE' )));
});

init();