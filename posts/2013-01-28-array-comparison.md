Did you know that JavaScript can compare arrays using lexicographical ordering?

<code>
[1, 2, 4] < [1, 2, 5]  // true
[1, 3, 4] < [1, 2, 5]  // false
</code>

Just don't expect trichotomy to hold.

<code>
[1, 2, 3] === [1, 2, 3]   // false
[1, 2, 3] <   [1, 2, 3]   // false
[1, 2, 3] ==  [1, 2, 3]   // false
[1, 2, 3] >   [1, 2, 3]   // false
</code>

Oh, and just in case you're wondering, it knows it's messing with you.

<code>
[1, 2, 3] <= [1, 2, 3]   // true
[1, 2, 3] >= [1, 2, 3]   // true
</code>

— [@pwnall][1]

[1]:https://twitter.com/pwnall
