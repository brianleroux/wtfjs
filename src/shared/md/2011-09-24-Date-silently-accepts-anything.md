<pre lang="javascript">
    d = new Date("couldn't you please throw an exception here instead?");

    // No! You get the joy of discovering this error somewhere unrelated,
    // much later; at the point of use, in an innocent part of your code:

    d.getTime(); // => NaN
</pre>

[johan](https://github.com/johan) || [@ecmanaut](http://twitter.com/ecmanaut)
