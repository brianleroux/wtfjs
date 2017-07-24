```
    parseInt('fuck');     // NaN
    parseInt('fuck', 16); // 15
```

So remember kids, always supply a radix!


— [@kevincennis][1]

This occurs because parseInt will continue parsing character-by-character
until it hits a character it doesn't know. The `f` in `fuck` is hexadecimal
15. You can get similar behavior with:
```
    parseInt('3fucks') // 3
    parseInt('3fucks', 16) // 3f in hex = 63
```

[1]:https://twitter.com/kevincennis
[2]:https://github.com/stevendesu
