Did you know that JavaScript can compare arrays using lexicographical ordering?

<pre lang="javascript">
  [1, 2, 4] < [1, 2, 5]  // true
  [1, 3, 4] < [1, 2, 5]  // false
<pre lang="javascript">

Just don't expect trichotomy to hold.

<pre lang="javascript">
  [1, 2, 3] === [1, 2, 3]   // false
  [1, 2, 3] <   [1, 2, 3]   // false
  [1, 2, 3] ==  [1, 2, 3]   // false
  [1, 2, 3] >   [1, 2, 3]   // false
<pre lang="javascript">

Oh, and just in case you're wondering, it knows it's messing with you.

<pre lang="javascript">
  [1, 2, 3] <= [1, 2, 3]   // true
  [1, 2, 3] >= [1, 2, 3]   // true
<pre lang="javascript">

— [@pwnall][1]

[1]:https://twitter.com/pwnall

***

It's hard to understand, but ECMA always helps.

http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3

Paragraph 10 says that  "Comparison Algorithm" returns false if paragraphs 1-9 don't satisfy the condition.
9.If Type(x) is Object and Type(y) is either String or Number,
return the result of the comparison ToPrimitive(x) == y.
10.Return false.


<pre lang="javascript">
[] === []; // false
[] == []; // false

//its like
({}) === ({}); // false
({}) == ({}); // false

//BUT
[] == 0; // true
</pre>

http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.1

The Less-than Operator ( < ) and The Greater-than Operator ( > )
5.Let r be the result of performing abstract relational comparison lval < rval or lval > rval.
6.If r is undefined, return false. Otherwise, return r.

<pre lang="javascript">
[] < []; // false
[] > []; // false
// its like 1 < 1 ==> false and 1 > 1 ==> false
</pre>

http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.3

5.Let r be the result of performing abstract relational comparison rval < lval with LeftFirst equal to false.
6.If r is true or undefined, return false. Otherwise, return true.

<pre lang="javascript">
[] <= []; // true
[] >= []; // true
// its like 1 <= 1 ==> true and 1 >= 1 ==> true
</pre>

— [kirillov-artur][1]

[1]:https://github.com/kirillov-artur
