Sometimes JavaScript has identity crisis:

``` javascript
var foo = [0];
console.log(foo == !foo);
console.log(foo == foo);
```

Is it time to have a "maybe" operator? :-P

--- [@diogobaeder](http://twitter.com/diogobaeder)

This happens due to the type coercions done in the two expressions.
In the first expression, !foo is ! applied to a non-empty array; that ends up `!true`, or `false`. This means `foo == false`. OK, now an array with a single element can decay to its element in boolean conversions, so `[0] == false` is true.

In the second expression, you compare two Array references, and they are equal references, so `==` is the same as `===` and they both return `true`.

--- [paulstelian97](http://github.com/paulstelian97)
