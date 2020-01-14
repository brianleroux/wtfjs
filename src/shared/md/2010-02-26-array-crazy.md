Plausible code:

<pre lang="javascript">
    [] == 0    // true
    +[] === 0  // true, wait whu?
    ++[] === 1 // sorta, though this is invalid js syntax, so...
</pre>

Somewhat unlikely and, lets be honest, regrettable code:

<pre lang="javascript">
    [[]][0] === []
    ++[[]][0] === 1
    ++[[]][+[]] === 1  // yay! wtf!
</pre>

[John Resig explains here.](http://news.ycombinator.com/item?id=1154338)
