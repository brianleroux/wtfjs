[@AtomFusion](http://twitter.com/AtomFusion) shows us that true sometimes has a value.

```
    (true + 1) === 2; // true
    (true + true) === 2; // true
    true === 2; // false
    true === 1; // false
```

Wow wtf.

*Explanation*: `true` is not actually `1`, but when you add `1` to it, `valueOf()` is called in order to cast it to a number so that JavaScript is able sum these two values which are now of the same type (double).
