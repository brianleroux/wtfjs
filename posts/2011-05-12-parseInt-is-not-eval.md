Remember folks, parseInt() is not eval().

<code>
  parseInt("1", 10); // 1
  eval("1") // 1
</code>

Pretty much the same thing....wait.

<code>
  parseInt("1 + 1", 10); // 1
  eval("1 + 1") // 2
</code>

In the first example the first digit is recognized and the rest of the string is thrown away. How intuitive.
eval() at least gets it right.

<code>
  parseInt("1 - 1", 10); // 1
  eval("1 - 1") // 0
</code>

The string example takes the first digit and just throws out the rest of the string.
And again, eval() with the correct solution.

<code>
  parseInt("1" + "1", 10) // 11
  eval("1" + "1") // 11
</code>

This time they both get the wrong answer, because the strings are concatenated before the numbers are evaluated.

<code>
  parseInt("1" - "1", 10); // 0
  eval ("1" - "1") // 0
</code>

Both right answers, because the subtraction symbol forces the strings into numbers before they get used.

-- [@xjamundx](http://twitter.com/xjamundx)
