<code>
    [,,,].join() // ==> ",,"
</code>

wtf?

— [@eliranmal][1]



Turns out that the trailing comma is removed (trailing commas are allowed in
javascript, but not JSON). Once removed, there are only two "elements" in the
array, and both are undefined. When `join` is called, by default it uses a comma,
yielding ",,". I think this is what happens

— [@DDTrejo][2]

[1]:https://twitter.com/eliranmal]
[2]:https://twitter.com/ddtrejo
