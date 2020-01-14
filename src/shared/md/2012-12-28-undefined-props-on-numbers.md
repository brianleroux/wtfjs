<pre lang="javascript">
    function getBounds(node) {
        var n = node || 0;
        return { width: n.width, height: n.height };
    }
</pre>

If you call `getBounds()` with _null_, you'll get back `{ width: undefined, height: undefined }`
because in JS, numbers have properties (inherited from Number), and using an undefined
property doesn't throw, it just returns undefined.  `null` and `undefined` are propertyless.
Definitely not what I expected in a quick reading of code like this.

— [@unwiredben][1]

[1]:https://twitter.com/unwiredben
