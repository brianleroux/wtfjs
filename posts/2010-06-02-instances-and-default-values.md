When you create instances of `String` or `Number`, they take the default value (`""` for strings and `0` for numbers). This is not the same for `Object` and `Array`.

<code>
    var a = new Number;
    a == 0 // true

    var a = new String;
    a == "" // true

    var a = new Object;
    a == {} // false

    var a = new Array;
    a == [] // false
</code>

This is even more confusing when using the JSON-style syntax to create objects and arrays.

<code>
    var a = {};
    a == {} // false

    var a = [];
    a == [] // false
</code>

-- [@remi](http://twitter.com/remi)

(Never forget: `====` - [@brianleroux](http://twitter.com/brianleroux))