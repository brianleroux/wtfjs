There seems to be a number that fulfills all of these conditions:

```
  i * i = 0
  i + 1 = 1
  i - 1 = -1
  i / i = 1
```

Turns out that this magical number is not even an integer:

```
  i = Number.MIN_VALUE
```

It's the smallest possible fraction JavaScript can produce, and is treated as zero for the most part.

Conversely, the largest possible fraction claims to be greater than one, but reduces to zero:

```
  i = Number.MAX_VALUE

  i > 1 // true
  i|0   // 0
```

Furthermore, both the largest possible fraction and integer refuse to wrap around:

```
  i = Number.MAX_VALUE
  j = 0xffffffffffffffff

  i === (i + 1) // true
  j === (j + 1) // true
```

– [@ionpot](https://github.com/ionpot)
