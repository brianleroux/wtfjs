```
window.recurse = function(times) {
    if (times !== 0)
        recurse(times - 1);
};
recurse(13); // stack overflow at: 0
```

[@tlrobinson](http://twitter.com/tlrobinson) of [280 North](http://280north.com/), [Cappuccino](http://cappuccino.org/), [Narwhal](http://narwhaljs.org/) and [CommonJS](http://commonjs.org/) points out some lovely IE behavior in [this great blog post](http://cappuccino.org/discuss/2010/03/01/internet-explorer-global-variables-and-stack-overflows/).

WTFIE should really be a blog of its own.
