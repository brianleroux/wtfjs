```javascript
    null == false // false
```
Okay, we know this. Null doesn't convert to boolean.

Now try this...
```javascript
    !null // true
```

This is because the *logical NOT operator* (`!`) converts any would-be-`false` value to true, and vice-versa. Furthermore, `null` and `false` are two very different values.

— [@noway421][1]

[1]:https://twitter.com/noway421
