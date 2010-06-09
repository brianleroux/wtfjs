var fs = require('fs')
,   sys = require('sys')
,   path = require('path')
,   md2html = require('showdown').md2html
,   prettyfy = require('prettyfy').prettyPrintOne
,   postsPath = path.join(__dirname, '..', '/posts');


var Post = function(filename){
    this.filename = filename;
};

Post.all = function(files) {
    return files.map(function(f) { 
        return new Post(f);
    });
};

Post.create = function(f) {
    return new Post(f)
};

Post.paginate = function(page) {
    var self = this;
    fs.readdir(postsPath, function(err, files){
        var posts = Post.all(files).reverse()
        ,   count = 5
        ,   max   = Math.ceil(posts.length/count)
        ,   cur   = ~~page || 1
        ,   next  = cur + 1
        ,   prev  = cur - 1
        ,   start = cur == 1 ? 0 : prev*count
        ,   end   = start >= count ? start+count : count;

        self.render('index.html.ejs', {locals:{ 
            posts:    posts.slice(start, end),
            page:     cur,
            max:      max,
            nextPage: next > max ? max : next,
            prevPage: prev == 0 ? 1 : prev
        }});
    });
};

// FIXME - this whole method is an embarassing gross. wtf!
Post.rss = function(title, desc, domain) {
    s = '<rss version="2.0">';
    s += '<channel>';
    s += '<description>' + desc + '</description>';
    s += '<title>' + title + '</title>';
    s += '<generator>http://github.com/brianleroux/node-code-blog</generator>';
    s += '<link>http://' + domain + '/</link>'; 
    var posts = Post.all(fs.readdirSync(postsPath).reverse());
    for (var i = 0; i < 5; i++) {        
        s += '<item>';
        s += '<title>' + posts[i].title() + '</title>';
        s += '<description>' + posts[i].html() + '</description>';
        s += '<link>http://' + domain + posts[i].url() + '</link>';
        s += '<guid>http://' + domain + posts[i].url() + '</guid>';
        s += '<pubDate>' + posts[i].created() + '</pubDate>';
        s += '</item>';
    }   
    s += '</channel></rss>';
    return s.replace(/&nbsp;/g, '&#160;'); // oh the irony! fixes webkit bug w/ &nbsp; in xml documents
};

// FIXME ...should be get/set
Post.prototype = {
    
    created: function() {
        var e = this.filename.split('-').slice(0,3)
        ,   y = e[0]
        ,   m = e[1] - 1 //wtfdate!
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
        var p = path.normalize(path.join(__dirname, "..", "posts", this.filename))
        ,   t = fs.readFileSync(p);
        
        // replace the raw code blocks with prettyfied html
        t = t.replace(/<code>[^<]+<\/code>/g, function(code) {
            return "<pre><code>" + prettyfy(code.match(/<code>([\s\S]+)<\/code>/)[1]) + "</code></pre>";
        });
        
        // return markdown to html  
        return md2html(t);
    }
};

exports.Post = Post;