In case someone tells you it doesn't matter how you access characters in strings, they're wrong:

``` javascript
  'hello'[1]          // 'e'
  'hello'.charAt(1)   // 'e'

  'hello'[-1]         // undefined
  'hello'.charAt(-1)  // ''
```

What better "character" than the empty string to say "no such index"?

— [@rtoal](https://twitter.com/rtoal)
