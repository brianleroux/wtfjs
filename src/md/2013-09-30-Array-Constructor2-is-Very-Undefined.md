Have you ever thought that `Array(3)` will return you an array of 3 `undefined`'s,
the same as `[undefined,undefined,undefined]`?

So try this:
``` javascript
    Array(3).forEach(function(elem) { console.log(elem); });
```
And you will get no result at all, however
``` javascript
    [undefined,undefined,undefined].forEach(function(elem) { console.log(elem); });
```
will give you 3 nice log entries.

Are the first example's `undefined` less defined than the second example's `undefined`s?

Not really. According to [forEach spec](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18):
"`callbackfn` is called only for elements of the array which actually *exist*",
and [constructor spec](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.2.2)
says nothing about putting in any elements (even `undefined`).

— [@tomalec][1]

[1]:https://github.com/tomalec
