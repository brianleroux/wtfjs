// a little sugar for the config
exports.config = function(opts) {
    configure(function() {
        // set codeblog specific vars
        set('root',        opts.root + '/node-code-blog/lib/node-code-blog-themes/' + opts.theme);
        set('title',       opts.title);
        set('description', opts.description);
        set('domain',      opts.domain);
        set('analytics',   opts.analytics);
        // plugins we will use
        use(Logger);
        use(Static);
        // wow, I hate this syntax!
        enable('show exceptions');
    });
};

// hide the fugly
exports.init = function() {
    run(parseInt(process.env.PORT || 8000), null);
};
