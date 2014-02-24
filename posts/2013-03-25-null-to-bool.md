```
    null == false // false
```
Okay, we know this. Null doesn't convert to boolean.

Now try this...
```
    !null // true
```

Well, this is awkward.

— [@noway421][1]

[1]:https://twitter.com/noway421

In this case, `null` is not a boolean and that's why `null == false` returns `false`.

However, when you do `!null`, JavaScript tries to cast `null` to a boolean value before applying the `!` (not)
operator, and `null`, along with other "falsy" values as `""` (empty string), `0`, `undefined`, `NaN` and others,
evaluates to `false`.

For a more detailed explanation, you might want to read [this article](http://james.padolsey.com/javascript/truthy-falsey/),
by [James Padolsey](http://james.padolsey.com/).

— [MarkLinus](https://github.com/MarkLinus)
