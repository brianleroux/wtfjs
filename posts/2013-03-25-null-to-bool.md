```javascript
    null == false // false
```
Okay, we know this. Null doesn't convert to boolean.

Now try this...
```javascript
    !null // true
```

This is because the [*logical NOT operator* (`!`)](http://www.ecma-international.org/ecma-262/5.1/#sec-11.4.9) converts any would-be-`false` value to true, and vice-versa. Furthermore, `null` and `false` are two very different values.

— [@noway421][1]

[1]:https://twitter.com/noway421
