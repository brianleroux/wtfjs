What happens when we set empty objects as keys:

<code>
(function() {
    var foo = new Object();
    var bar = new Object();
    var map = new Object();

    map[foo] = 'foo';
    map[bar] = 'bar';

    return map[foo]; // "bar"
})();
</code>

Explained:

<code>
var result = (function() {
    var foo = new Object(); // {}
    var bar = new Object(); // {}
    var map = new Object(); // {}

    map[foo] = "foo"; // map["[object Object] "] = "foo"
    map[bar] = "bar"; // map["[object Object] "] = "bar"

  // Behind the scenes the key the toString method is called for object keys, so:
  // {}.toString() = "[object Object]"

  console.log({}.toString()); // "[object Object]"

  // Notice that only one key is returned because of the same key name:
  console.log(Object.keys(map)); // ["[object Object]"]

    // map["[object Object]"]
    return map[foo];
})();

console.log(result); // "bar"
</code>

Thanks [Miguel Mota](http://www.miguelmota.com/).
