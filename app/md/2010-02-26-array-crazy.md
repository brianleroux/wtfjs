Plausible code:

```
    [] == 0    // true
    +[] === 0  // true, wait whu?
    ++[] === 1 // sorta, though this is invalid js syntax, so...
```

Somewhat unlikely and, lets be honest, regrettable code:

```
    [[]][0] === []
    ++[[]][0] === 1
    ++[[]][+[]] === 1  // yay! wtf!
```

[John Resig explains here.](http://news.ycombinator.com/item?id=1154338)
