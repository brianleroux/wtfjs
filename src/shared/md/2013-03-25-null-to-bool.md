<pre lang="javascript">
    null == false // false
</pre>
Okay, we know this. Null doesn't convert to boolean.

Now try this...
<pre lang="javascript">
    !null // true
</pre>

Well, this is awkward.

— [@noway421][1]

The issue here is that Null **can** be converted to a boolean, it just
isn't **implicitly** converted:
<pre lang="javascript">
    Boolean(null) // false
</pre>

See [The Abstract Equality Comparison Algorithm](http://es5.github.io/#x11.9.3)
Null is only implicitly converted if compared to `undefined`

— [@stevendesu][2]

[1]:https://twitter.com/noway421
[2]:https://github.com/stevendesu
