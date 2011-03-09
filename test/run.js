require.paths.unshift(__dirname + '/../lib')

var testrunner = require('nodeunit').testrunner
,   Post = require('post').Post

exports['tests post'] = function(test){
    test.ok(Post, 'post exists')
    test.equals(Post.page(1).posts.length, 5, '5 post per page')

    var page1 = Post.page(1).posts


    test.done()
}

testrunner.run(['test']);
