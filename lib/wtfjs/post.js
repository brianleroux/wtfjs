var fs = require("fs")
,   sys = require("sys")
,   path = require("path")
,   md2html = require("showdown").md2html
,   prettyfy = require('prettyfy').prettyPrintOne;


exports.Post = function(filename){
    this.filename = filename;
};

exports.all = function(files) {
    return files.map(function(f) { 
        return new exports.Post(f);
    });
};

exports.create = function(f) {
    return new exports.Post(f)
};

// FIXME ...should be get/set
exports.Post.prototype = {
    
    created: function() {
        var e = this.filename.split('-').slice(0,3)
        ,   y = e[0]
        ,   m = e[1]
        ,   d = e[2]
        ,   c = new Date(y, m, d);
        return c;
    },
    title: function() {
        var a = this.filename.split('-')
        ,   l = a.length
        ,   t = a.slice(3,l).join(' ').replace('.md','');
        return t;
    },
    url: function() {
        var everything = this.filename.replace('.md','').split('-')
        ,   length = everything.length
        ,   theDate = everything.slice(0,3).join('/')
        ,   article = everything.slice(3,length).join('-');
        return '/' + theDate  + '/' + article;
    },
    anchor: function() {
        return '<a href="' + this.url() + '">' + this.title() + '</a>';
    },
    html: function() {
        // read in the post text
        var p = path.normalize(path.join(__dirname, "..", "..", "posts", this.filename))
        ,   t = fs.readFileSync(p);
        
        // replace the raw code blocks with prettyfied html
        t = t.replace(/<code>[^<]+<\/code>/g, function(code) {
            return "<pre><code>" + prettyfy(code.match(/<code>([\s\S]+)<\/code>/)[1]) + "</code></pre>";
        });
        
        // return markdown to html  
        return md2html(t);
    }
};
