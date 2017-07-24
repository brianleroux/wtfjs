Plausible code:

<code>
    [] == 0    // true
    +[] === 0  // true, wait whu?
    ++[] === 1 // sorta, though this is invalid js syntax, so...
</code>

Somewhat unlikely and, lets be honest, regrettable code:

<code>
    [[]][0] === []
    ++[[]][0] === 1
    ++[[]][+[]] === 1  // yay! wtf!
</code>

[John Resig explains here.](http://news.ycombinator.com/item?id=1154338)
