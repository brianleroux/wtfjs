In JS you an represent numbers in haxadecimal, right?

<code>
    var hex = 0xFF55;
</code>

You can also perform shift operations, right?
Left shift is equivalent to a multiplication...

<code>
    var hex = 0xFF55 << 8;  // Shift 8 bits = add 0x00 at the end.
    alert(hex.toString(16); // 0xFF5500
</code>

But from a certain point, this produces negative numbers

<code>
    // Before 0x800000 it's ok
    alert((0x777777 << 8).toString(16)); // 0x77777700
    
    // After 0x800000 it's not ok
    alert((0x888888 << 8).toString(16)); // -77777800, WTF?
    
    // The only way to remain positive is to multiply instead of shifting
    alert((0x888888 * 0x100).toString(16)); // 88888800
</code>

Thanks JS for making left shift different than a multiplication!

- [@MaximeEuziere]