Did you know that JavaScript can compare arrays using lexicographical ordering?

```
  [1, 2, 4] < [1, 2, 5]  // true
  [1, 3, 4] < [1, 2, 5]  // false
```

Just don't expect trichotomy to hold.

```
  [1, 2, 3] === [1, 2, 3]   // false
  [1, 2, 3] <   [1, 2, 3]   // false
  [1, 2, 3] ==  [1, 2, 3]   // false
  [1, 2, 3] >   [1, 2, 3]   // false
```

Oh, and just in case you're wondering, it knows it's messing with you.

```
  [1, 2, 3] <= [1, 2, 3]   // true
  [1, 2, 3] >= [1, 2, 3]   // true
```

— [@pwnall][1]

[1]:https://twitter.com/pwnall
