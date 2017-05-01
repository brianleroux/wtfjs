Have you ever thought that `Array(3)` will return you an array of 3 `undefined`'s,
the same as `[undefined,undefined,undefined]`?

So try this:
```
    Array(3).forEach(function(elem) { console.log(elem); });
```
And you will get no result at all, however
```
    [undefined,undefined,undefined].forEach(function(elem) { console.log(elem); });
```
will give you 3 nice log entries.

Are the first example's `undefined` less defined than the second example's `undefined`s?

Not really. According to [forEach spec][1]: "`callbackfn` is called only for
elements of the array which actually *exist*", and [constructor spec][2]
says nothing about putting in any elements (even `undefined`).

— [@tomalec][1]

In fact, specification of [Array constructor][2] explicitly says what happens,
when you pass `len` argument:

> If the argument len is a Number [...], then the length property of the newly
> constructed object is set to ToUint32(len).

In other words, `Array(1)` and `[undefined]` has nothing in common. First one
simply creates an empty array with presetted `length` property. Second creates
an array with values, and sets length to the amount of elements.

``` javascript
Array(3).length // => 3
```

Specification of [forEach][1] declares its workflow explicitly (pseudo-code):

```
let O         = ToObject(this)
let lenValue  = O.Get("length")
let len       = ToUint32(lenValue)
let T         = thisArg || undefined
let k         = 0

while k < len
  let Pk        = ToString(k)
  let kPresent  = O.HasProperty(Pk)

  if kPresent
    let kValue = O.Get(Pk)
    callbackfn.Call(this = T, args = [kValue, k, O])
  end

  k++;
end

return undefined
```

Notice that it checks whenever Array has property with given index or not prior
calling `callbackfn`. To visually explain what that means, take a look at this
snippet:

``` javascript
var arr = Array(99);

arr.push("Ninety nine");
console.log(arr.length);

arr[42] = "Answer to the Ultimate Question of Life, " +
          "the Universe, and Everything";

arr.forEach(function (value, index) {
  console.log(String(value) + " is " + String(index) + ".");
});
```

The above will print out:

```
100
Answer to the Ultimate Question of Life, the Universe, and Everything is 42.
Ninety nine is 99.
```

With that being said, think of `[undefined, undefined, undefined]` as
something similar to:

``` javascript
var len = 3;
var k   = 0;
var arr = new Array(len);

while (k < len) {
  arr[k] = undefined;
  k++;
}
```

- [@ixti][4]

[1]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18
[2]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.2.2
[3]: https://github.com/tomalec
[4]: https://github.com/ixti
