This installment of wtfjs has to do with the Abstract Equality Comparison Algorithm (as most do), Array's constructor, and expressions.

Let's take the following example:

<pre lang="javascript">
    new Array([],null,undefined,null) == ",,,"; // true
</pre>

WTF? Why does this work?

Firstly, the == causes type coersion (pretty common).  From the ECMAScript Specification, 5th edition (final draft),
11.9.3 The Abstract Equality Comparison Algorithm:

> The comparison `x == y`, where `x` and `y` are values produces true or false. Such a comparison is performed as follows:

[snip]

> 8. If `Type(x)` is either String or Number and Type(y) is Object, return the result of the comparison `x == ToPrimitive(y)`.
> 9. If `Type(x)` is Object and `Type(y)` is either String or Number, return the result of the comparison `ToPrimitive(x) == y`.

So both uses of `Array` are run through `ToPrimitive`.  But what does `ToPrimitive` do, exactly?  Well, according to another
part of the Final final final final draft Standard ECMA-262 5th edition (the document seriously has this title...), 9.1. ToPrimitive:

[snip]

> Object         Return a default value for the Object.  The default value of an object is retrieved by calling the `[[DefaultValue]]`
>                internal method of the object, passing the optional hint PreferredType.  The behavior of the `[[DefaultValue]]` internal
>                method is defined by this specification for all native ECMAScript objects in 8.12.8.

So we're hinting to the [[DefaultValue]] method within Array with the type of `String`, so according (again) to the spec,
8.12.8 [[DefaultValue]] (hint):

> 1. Let toString be the results of calling the `[[Get]]` internal method of object O with argument "toString".

Unless of course, `IsCallable(toString)` (i.e. the object has a `.toString` method on it's prototype).

> 2. If IsCallable(toString) is true, then,
>      a. Let str be the results of calling the [[Call]] internal method of toString with O as the this value and an empty argument list.

And according to 15.4.4.2 Array.prototype.toString ():

> When the toString method is called, the following steps are taken:
>
> 1. Let array be the result of calling `ToObject` on the this value.
> 2. Let func be the result of calling the `[[Get]]` internal method of array with argument "join".

Oh, but we're not done yet!

Stay with me - we're type-coersing to a string, and `Array.prototype.toString` calls `Array.prototype.join` with no arguments, so we're
joining all the internal members of the array with the default separator is the single-character String "," (again, according to the spec).
When an Array calls join on itself, it's going from 1 .. len (all it's members) and calling `ToString` on these members and concatenating
them together.  Essentially doing this:

<pre lang="javascript">
    Array.prototype.join = function (separator) {
        var result = "";
        if ("undefined" === typeof separator) {
            separator = ",";
        }
        for (var k = 0, len = this.length; k < len; ++k && result += separator) {
            var isToS = this[k] !== null && this[k] !== undefined && "function" === typeof this[k].toString
            result += isToS ? this[k].toString() : String(this[k]);
        }
        return result;
    };
</pre>

So in the end, we end up with weird stuff like this actually working, as `[]`, `null`, and `undefined` all result in "" when their
respective `ToPrimitive` methods ask for `[[DefaultValue]]` with String as the type hint.

Another similar WTF on the same topic:

<pre lang="javascript">
    ",,," == new Array(4); // true
</pre>

This is similar, but not quite the same.  When you call Array's constructor, if there are multiple arguments, they're intepretted as being
members of the Array.  If you've only put 1 Integer (n) as the argument, an Array object is initiatilized with (n) `undefined` items.
Again, from the spec 15.4.2.2 new Array (len):

>If the argument len is a `Number` and `ToUint32(len)` is equal to `len`, then the length property of the newly constructed object
>is set to `ToUint32(len)`.

So essentially end up with

<pre lang="javascript">
    [undefined,undefined,undefined,undefined].join(),
</pre>

Which yields something like:

<pre lang="javascript">
    "" + String(undefined) + "," + String(undefined) + "," + String(undefined) + "," + String(undefined)
</pre>

Which ends up being ",,," (which evaluates to `true`, as it matches).

Lastly, adding just one more level of WTF to this post, you can also accidentally (or intetionally?) add an expression within
Array's constructor function (and you can also omit new, as the spec also says: "When Array is called as a function rather than as a
constructor, it creates and initialises a new Array object.").

So we can finally end up with the weirdest rendition of this WTF as so:

<pre lang="javascript">
    ",,," == Array((null,'cool',false,NaN,4)); // true
</pre>

If this doesn't make you WTF, I'm not sure what will.

[@danbeam](http://twitter.com/danbeam)
