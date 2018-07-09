The **local storage** functionality in browsers is a bit limited and this can
lead to some rather surprising behaviour.

``` javascript
  localStorage[0] = false;

  if (localStorage[0]) {
      console.log('wtf'); // runs?!
  }
```

When checking the value stored in `localStorage`, it appears that the boolean
was silently converted to the string `"false"`, which is truthy.

Turns out that this is one of those cases where it pays off to carefully read
the [specification](https://html.spec.whatwg.org/multipage/webstorage.html#storage), which states
that local storage only accepts string values!

If you want to store an object or other type of value, you can serialize the
data with `JSON.stringify` and load it again with `JSON.parse`.

— [@Overv](http://twitter.com/Overv) of <http://while.io>
