Javascript numbers are facetious, sometimes they [play hide and seek](https://wtfjs.com/wtfs/2010-07-22-magic-increasing-number), sometimes they just won't obey:

``` javascript
1 << 32 // 1
```

--- please fill in the OP of this one

Left shifting in Javascript works with 32 bit integers, so the number 1 is converted to the 32 bit integer 1, then left shifted by the processor by 0 (a quirk makes it only take the lowest 5 bits of the shift amount, so shifting by 32 is the same as shifting by 0, or not shifting at all) then converted back to the Javascript numeric type.

--- [paulstelian97](http://github.com/paulstelian97)
