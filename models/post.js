require.paths.unshift("vendor/showdown-v0.9/src");

var sd = require("showdown")
,   fs = require("fs")
,   sys = require("sys")
,   path = require("path");


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

exports.Post.prototype = {
    
    created: function() {
        var e = this.filename.slice(0,3)
        ,   y = e[0]
        ,   m = e[1]
        ,   d = e[2]
        return new Date(y, m, d);
    },
    title: function() {
        var a = this.filename.split('-')
        ,   l = a.length
        ,   t = a.slice(3,l).join(' ').replace('.md','');
        return t;
    },
    anchor: function() {
        var everything = this.filename.replace('.md','').split('-')
        ,   length = everything.length
        ,   theDate = everything.slice(0,3).join('/')
        ,   article = everything.slice(3,length).join('-');

        return '<a href="/' + theDate  + '/' + article + '">' + this.title() + '</a>' 
    },
    html: function() {
        var p = path.normalize(path.join(__dirname, "..", "posts", this.filename))
        ,   t = fs.readFileSync(p);
        return sd.md2html(t);
    }
};
