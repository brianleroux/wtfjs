True story bro!

<pre lang="javascript">
    'true' == true  // returns false
</pre>

— [ProfessorWeb][1]

The issue here is that strings are only implicitly converted to numbers
when using the equality operator.

See [The Abstract Equality Comparison Algorithm](http://es5.github.io/#x11.9.3)

>4. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).
>5. If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.
>8. If Type(x) is either String or Number and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).
>9. If Type(x) is Object and Type(y) is either String or Number, return the result of the comparison ToPrimitive(x) == y.

Failing to match any of these criteria, the algorithm returns `false`

— [@stevendesu][2]

[1]:https://github.com/ProfessorWeb
[2]:https://github.com/stevendesu
