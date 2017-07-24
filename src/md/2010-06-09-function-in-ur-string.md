Old friend (_and clearly damaged by a career of JavaScript programming_) [@jakedevine](http://twitter.com/jakedevine) threw this down on twitter a few days ago.

<code>
    var Z = "constructor"; 
    Z[Z][Z]("alert('wtfjs!')")();
    // alerts wtfjs!
</code>

Ok. So wtf exactly is happening here?

<code>
    Z[Z]
    // function String() { [native code] }

    Z[Z][Z]
    // function Function() { [native code] }
</code>

AHA! The constructor property of a string is `String` and the constructor property of `String` is `Function`. Makes sense.

<code>
    Z[Z][Z]("console.log('new Function accepts string for eval as argument')")();
    // new Function accepts string for eval as argument
</code>

Of course. One wonders, as usual, wtf the programmer was up to when he discovered this!

--- [@brianleroux](http://twitter.com/brianleroux)