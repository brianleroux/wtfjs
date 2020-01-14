Remember folks, parseInt() is not eval().

<pre lang="javascript">
  parseInt("1", 10); // 1
  eval("1") // 1
</pre>

Pretty much the same thing....wait.

<pre lang="javascript">
  parseInt("1 + 1", 10); // 1
  eval("1 + 1") // 2
</pre>

In the first example the first digit is recognized and the rest of the string is thrown away. How intuitive.
eval() at least gets it right.

<pre lang="javascript">
  parseInt("1 - 1", 10); // 1
  eval("1 - 1") // 0
</pre>

The string example takes the first digit and just throws out the rest of the string.
And again, eval() with the correct solution.

<pre lang="javascript">
  parseInt("1" + "1", 10) // 11
  eval("1" + "1") // 11
</pre>

This time they both get the wrong answer, because the strings are concatenated before the numbers are evaluated.

<pre lang="javascript">
  parseInt("1" - "1", 10); // 0
  eval ("1" - "1") // 0
</pre>

Both right answers, because the subtraction symbol forces the strings into numbers before they get used.

-- [@xjamundx](http://twitter.com/xjamundx)
