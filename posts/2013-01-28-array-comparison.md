Did you know that JavaScript can compare arrays using lexicographical ordering?

```js
  [1, 2, 4] < [1, 2, 5]  // true
  [1, 3, 4] < [1, 2, 5]  // false
```

Just don't expect trichotomy to hold.

```js
  [1, 2, 3] === [1, 2, 3]   // false
  [1, 2, 3] <   [1, 2, 3]   // false
  [1, 2, 3] ==  [1, 2, 3]   // false
  [1, 2, 3] >   [1, 2, 3]   // false
```

Oh, and just in case you're wondering, it knows it's messing with you.

```js
  [1, 2, 3] <= [1, 2, 3]   // true
  [1, 2, 3] >= [1, 2, 3]   // true
```

— [@pwnall][1]

[1]:https://twitter.com/pwnall

---

By the way, when we say "lexicographical ordering"...

```js
  [4, 5, 6] < [10, 15, 18] // false
  [3, 2, 1] > [20, 9999, Infinity] // true
```

— [@stuartpb][2]

[2]:https://twitter.com/stuartpb
