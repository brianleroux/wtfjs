When you create instances of `String` or `Number`, they take the default value (`""` for strings and `0` for numbers). This is not the same for `Object` and `Array`.

```
var a = new Number;
a == 0 // true
var a = new String;
a == "" // true
var a = new Object;
a == {} // false
var a = new Array;
a == [] // false
```

This is even more confusing when using the JSON-style syntax to create objects and arrays.

```
var a = {};
a == {} // false
var a = [];
a == [] // false
```

-- [@remi](http://twitter.com/remi)

(Never forget: [====](http://crockfordfacts.com/MHDTvKwy3xGzI183Akuh_Q) - [@brianleroux](http://twitter.com/brianleroux))