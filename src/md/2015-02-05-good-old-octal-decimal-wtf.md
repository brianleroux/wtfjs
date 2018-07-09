0-prefixed numbers are handled are automatically treated as octals. Or not.
``` javascript
  038 - 037 // 7 !?
  037 // 31 thx to silent octal-to-decimal conversion
  038 // 38 .. Silently switch to octal, silently fails to, and silently fallback to decimal
```

Instead of throwing a SyntaxError (8 & 9 should be invalid characters),
octal mode silently switches to decimal if possible.


— [@nlesconnec](https://twitter.com/nlesconnec)
