**Never add items to array usin indexes. Never trust them!**

Lets create an empty array, and check its length is `0`
```
  var arr = [];
  arr.length; // 0
```

Lets add something to its first place:

```
  arr[0] = 'I am the first';
  arr.length; // 1
```

Oh, what if...

```
  arr[15] = 'actually, i am the second';
  arr.length; // 16
```

***WTF?***

Array actually looks like
```
["I am the first", empty × 14, "actually, i am the second"]
```

** Explanation **

This is how array's `.length` works. It takes index of the last elemnt, and returns `index+1`.

Use native array methods to add items to it: `push`, `unshift`.

— [@dogusev][1]

[1]:https://github.com/dogusev