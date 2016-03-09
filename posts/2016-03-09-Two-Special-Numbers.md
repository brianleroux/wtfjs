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

Conversely, the largest possible integer refuses to wrap around:

```
  i = Number.MAX_VALUE
  j = i + 1

  i === j // true
```

- [@ionpot](https://github.com/ionpot)
