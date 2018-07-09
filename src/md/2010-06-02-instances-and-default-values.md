When you create instances of `String` or `Number`, they take the default value (`""` for strings and `0` for numbers). This is not the same for `Object` and `Array`.

``` javascript
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

``` javascript
    var a = {};
    a == {} // false

    var a = [];
    a == [] // false
```

-- [@remi](http://twitter.com/remi)

This is because `==` comparisons will compare references if both sides are of an object type (arrays are also objects); since they are two different references, they will compare unequal. That is, `==` is the same as `===` when you work with objects and arrays.

-- [paulstelian97](http://github.com/paulstelian97)


(Never forget: [====](http://crockfordfacts.com/MHDTvKwy3xGzI183Akuh_Q) - [@brianleroux](http://twitter.com/brianleroux))
