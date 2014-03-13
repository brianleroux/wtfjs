
```javascript
  "9" > "19" // true
  "01" == "1" // false
```

If you have accidently forgotten to parse integers, or you have a blind sort function for attributes, you might face this problem.

In JavaScript's string comparison, it takes the first character's code. So, what is really happening equivalent to:
```javascript
  "9".charCodeAt(0) > "19".charCodeAt(0) // 57 > 49 --> true
  "01".charCodeAt(0) == "1".charCodeAt(0) // 48 == 49 --> false
```

— [@rashad612](https://github.com/rashad612)
