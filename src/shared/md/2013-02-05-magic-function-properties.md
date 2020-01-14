<pre lang="javascript">
    var f = function() { };
    f.foo = 'foo'; // sets f.foo to 'foo'
</pre>

Functions are objects, so you can set properties on them after creation.

<pre lang="javascript">
    f.name; // is ''
    f.name = 'foo';
    f.name; // is still ''
</pre>

But not all the time.

<pre lang="javascript">
    var f = function myFunction() { };
    f.name; // is 'myFunction'
</pre>

Functions happen to have magic properties. One of them is the non-standard `.name`,
which stores the function's first name and read-only.

— [@tmcw][1]

[1]:https://twitter.com/tmcw
