``` javascript
    13 + "-17"      // "13-17"
    "13" + -17      // "13-17"
    "13" + + -17    // "13-17"
    13 + + "-17"    // -4
```

This is kind of expected behaviour, it just looks really weird.

``` javascript
    13 + + "-17"    // -4   is the same as
    13 + (+ "-17")  // -4   and
    + "-17"         // -17  because the + acts as a unary operator, similar to -:
    var a = -b
```

— [@S0lll0s](https://github.com/S0lll0s)
