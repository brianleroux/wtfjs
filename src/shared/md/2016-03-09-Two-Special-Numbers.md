There seems to be a number that fulfills all of these conditions:

<pre lang="javascript">
  i * i = 0
  i + 1 = 1
  i - 1 = -1
  i / i = 1
</pre>

Turns out that this magical number is not even an integer:

<pre lang="javascript">
  i = Number.MIN_VALUE
</pre>

It's the smallest possible fraction JavaScript can produce, and is treated as zero for the most part.

Conversely, the largest possible fraction claims to be greater than one, but reduces to zero:

<pre lang="javascript">
  i = Number.MAX_VALUE

  i > 1 // true
  i|0   // 0
</pre>

Furthermore, both the largest possible fraction and integer refuse to wrap around:

<pre lang="javascript">
  i = Number.MAX_VALUE
  j = 0xffffffffffffffff

  i === (i + 1) // true
  j === (j + 1) // true
</pre>

– [@ionpot](https://github.com/ionpot)
