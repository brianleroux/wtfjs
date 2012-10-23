In JS you can represent numbers in hexadecimal, right?

<code>
    var hex = 0xFF55;
</code>

You can also perform shift operations, right?
Left shift is equivalent to a multiplication...

```
    var hex = 0xFF55 << 8;  // Shift 8 bits = add 0x00 at the end.
    alert(hex.toString(16)); // 0xFF5500
```

But from a certain point, this produces negative numbers

```
    // Before 0x800000 it's ok
    alert((0x777777 << 8).toString(16)); // 0x77777700

    // After 0x800000 it's not ok
    alert((0x888888 << 8).toString(16)); // -77777800, WTF?

    // The only way to remain positive is to multiply instead of shifting
    alert((0x888888 * 0x100).toString(16)); // 88888800
```

Thanks JS for making left shift different than a multiplication!

I do have an explanation!

ES5 states that the left-shift operator is a signed shift on 32 bits represented by two's complement which means
that the highest order bit defines the sign.

7 in hexa = 0111 in binary (every number below 7 starts with 0)
8 in hexa = 1000 in binary (every number above 8 starts with 1)

So in binary:

(0x777777 << 8) in hexa = 0111 0111 0111 0111 0111 0111 0111 0000 0000 in binary  (the 32nd bit is still 0)

(0x888888 << 8) in hexa = 1000 1000 1000 1000 1000 1000 0000 0000 in binary  (the 32nd bit becomes 1 => negative)

As for why multiplying 0x888888 * 0x100 yields a different result, both operands to the * operator are numeric, so
each is casted to a IEEE 64-bit double, then multiplied, which means this is what is really happening:

```
    0x888888 * 0x100 === 8947848.0 * 256.0 === 2290649088.0
```

When this is converted into a string with base 16, what you get is 88888800.

— [@MaximeEuziere](https://twitter.com/MaximeEuziere)
