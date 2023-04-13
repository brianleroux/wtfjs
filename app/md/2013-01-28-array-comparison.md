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

***

It's hard to understand, but ECMA always helps.

http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3

Paragraph 10 says that  "Comparison Algorithm" returns false if paragraphs 1-9 don't satisfy the condition.
9.If Type(x) is Object and Type(y) is either String or Number,
return the result of the comparison ToPrimitive(x) == y.
10.Return false.


```
[] === []; // false
[] == []; // false

//its like
({}) === ({}); // false
({}) == ({}); // false

//BUT
[] == 0; // true
```

http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.1

The Less-than Operator ( < ) and The Greater-than Operator ( > )
5.Let r be the result of performing abstract relational comparison lval < rval or lval > rval.
6.If r is undefined, return false. Otherwise, return r.

```
[] < []; // false
[] > []; // false
// its like 1 < 1 ==> false and 1 > 1 ==> false
```

http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.3

5.Let r be the result of performing abstract relational comparison rval < lval with LeftFirst equal to false.
6.If r is true or undefined, return false. Otherwise, return true.

```
[] <= []; // true
[] >= []; // true
// its like 1 <= 1 ==> true and 1 >= 1 ==> true
```

— [kirillov-artur][1]

[1]:https://github.com/kirillov-artur
