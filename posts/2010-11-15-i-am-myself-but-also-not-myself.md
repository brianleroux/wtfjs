Sometimes JavaScript has identity crisis:

<code>
var foo = [0];
console.log(foo == !foo);
console.log(foo == foo);
</code>

Is it time to have a "maybe" operator? :-P

--- [@diogobaeder](http://twitter.com/diogobaeder)

The point is that when you do `foo == foo` it does evaluate to `true` because the `==` operator looks for equality and you are comparing `foo` to itself.

However, `foo == !foo` is executed in a different way. Let's split it in some steps:
 1. `foo` remains `[0]`
 2. `!foo` evaluates to `0`
 3. `foo` then also evaluates to `0`
 4. `0 == 0` evaluates to `true`

— [MarkLinus](https://github.com/MarkLinus)
