Less of a wtf and more of a gotcha. In  [ExpressJS](http://expressjs.com/). you can serve static files from a _/public_ directory with this simple directive in your configure block:

<pre lang="javascript">
    configure(function() {
        set("root", __dirname);
        // allow static file serving from public directory
        use(Static);
    });
</pre>

But be careful! This sets a the path to be _/public/app.css_ rather than _/app.css_. [More background here.](http://groups.google.com/group/express-js/browse_thread/thread/863ed1888597e630)
