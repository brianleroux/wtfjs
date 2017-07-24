```
    parseInt('fuck');     // NaN
    parseInt('fuck', 16); // 15
```

So remember kids, always supply a radix!


— [@kevincennis][1]

[1]:https://twitter.com/kevincennis


This behaviors happens because parseInt looks at the string until it finds an invalid character. If there are no valid characters, the result is NaN. The default radix is 10-ish, so parseInt gives up when it hits 'f'. When you set the radix to 16, it gives up when it hits 'u' and therefore returns 15.

The scarry thing is that the default radix is 16 if the string begins with "0x" (and 8 in some implementations if the string begins with "0"):
```
   parseInt('0x10');     // 16
   parseInt('0x10', 10); // 0
   parseInt('010');      // 8 on some (older) implementations
```

— [@alokmenghrajani](http://quaxio.com)
