It turns out that changing the value of an argument variable will change its
value in the `arguments` "array":

<code>
    > function hello(what) {
    .     what = "world";
    .     return "Hello, " + arguments[0] + "!";
    . }
    > hello("shazow")
    "Hello, world!"
</code>

This is documented behaviour (see *NOTE 1* in &#167;10.6 *Arguments Object* of
[ECMA-262](http://es5.github.com/#x10.6)).

I suspect, without evidence, that this allows named argument value lookups to
be transformed at compile time into a lookup into the `arguments` array (so,
for example, the `what = "world";` would be transformed into `arguments[0] =
"world"`; much like Python's fast locals).

[@wolever](http://twitter.com/wolever)
