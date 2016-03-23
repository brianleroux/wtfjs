var fs        = require('fs')
,   sys       = require('util')
,   path      = require('path')
,   md2html   = require('marked')
,   prettyfy  = require('highlight').Highlight
,   postsPath = path.join(__dirname, '../posts')
,   sorter    = function(a,b) { return b.substr(0,10).replace(/-/g,'') - a.substr(0,10).replace(/-/g,'') }

var Post = function (filename) { this.filename = filename }

Post.all = function (files) {
    return files.map(function(f) {
        return new Post(f)
    })
}

Post.page = function (page) {
    var self = this
    ,   files = fs.readdirSync(postsPath).sort(sorter)
    ,   posts = Post.all(files)
    ,   count = 5
    ,   max   = Math.ceil(posts.length/count)
    ,   cur   = ~~page || 1
    ,   next  = cur + 1
    ,   prev  = cur - 1
    ,   start = cur == 1 ? 0 : prev*count
    ,   end   = start >= count ? start+count : count;
    return {
        posts:    posts.slice(start, end)
    ,   page:     cur
    ,   max:      max
    ,   nextPage: next > max ? max : next
    ,   prevPage: prev == 0 ? 1 : prev
    }
}

// FIXME - this whole method is an embarassing gross. wtf!
Post.rss = function () {
    var title   = 'wtfjs'
    ,   desc    = 'wtfjs'
    ,   domain  = 'http://wtfjs.com'
    ,   htmlesc = function(str){ return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    s = '<rss version="2.0">';
    s += '<channel>';
    s += '<description>' + htmlesc(desc) + '</description>';
    s += '<title>' + htmlesc(title) + '</title>';
    s += '<generator>http://github.com/brianleroux/node-code-blog</generator>';
    s += '<link>' + htmlesc(domain) + '/</link>';
    var posts = Post.all(fs.readdirSync(postsPath).sort(sorter));
    for (var i = 0; i < 5; i++) {
        s += '<item>';
        s += '<title>' + htmlesc(posts[i].title()) + '</title>';
        s += '<description>' + htmlesc(posts[i].html()) + '</description>';
        s += '<link>' + htmlesc(domain + posts[i].url()) + '</link>';
        s += '<guid>' + htmlesc(domain + posts[i].url()) + '</guid>';
        s += '<pubDate>' + htmlesc(posts[i].created().toUTCString()) + '</pubDate>';
        s += '</item>';
    }
    s += '</channel></rss>';
    return s.replace(/&nbsp;/g, '&#160;'); // oh the irony! fixes webkit bug w/ &nbsp; in xml documents
};

Post.prototype = {

    created: function() {
        var e = this.filename.split('-').slice(0,3)
        ,   y = e[0]
        ,   m = e[1] - 1 //wtfdate!
        ,   d = e[2]
        ,   c = new Date(y, m, d)
        return c
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
        var p = path.join(__dirname, "../posts", this.filename)
        ,   t = fs.readFileSync(p).toString()

        // replace the raw code blocks with prettyfied html
        t = t.replace(/<code>[^<]+<\/code>|```[a-z]*\n[\s\S]*?\n```/g, function(code) {
            var matches = code.match(/<code>([\s\S]+)<\/code>|```[a-z]*\n([\s\S]*?)\n```/)
            // sanitise matches, because of regex groups
            matches = matches.filter(function(e) { return e })
            
            return "<pre><code>" + prettyfy(matches[1]) + "</code></pre>";
        })

        // return markdown to html
        return md2html(t)
    }
};

exports.Post = Post
