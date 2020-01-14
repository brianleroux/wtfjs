An update by [@deadlyicon](http://twitter.com/deadlyicon) on the previous post.

This is just a really silly way of saying this:

<pre lang="javascript">
    Function.prototype.call.apply(function (a) {return a}, [1,2])
    // 2
</pre>

If this still seems weird to you. Consider this:

<pre lang="javascript">
    function logThisAndArgs() {
        console.log(this, arguments);
    };
    Function.prototype.call.apply(logThisAndArgs, [{'some':'object'},1,2,3,4])
    // logs -> Object { some="object"} [1, 2, 3, 4]
</pre>

Now this!

<pre lang="javascript">
    Function.prototype.call.call(logThisAndArgs, {'some':'object'},1,2,3,4)
    // logs -> Object { some="object"} [1, 2, 3, 4]
</pre>
