The following will return an Integer with a default of 0 from any String or Number.

``` javascript
    function toInt(number) {
      return number && + number | 0 || 0;
    }
    console.log(toInt("1"));  // 1
    console.log(toInt("1.2"));  // 1
    console.log(toInt("-1.2"));  // -1
    console.log(toInt(1.2));  // 1
    console.log(toInt(0));  // 0
    console.log(toInt("0"));  // 0
    console.log(toInt(Number.NaN));  // 0
    console.log(toInt(1/0));  // 0
```

Explanation
--

`number && x` will return `x` if `number` is truthy, and `number` otherwise.

`x || 0` will return `x` if `x` is truthy, and 0 otherwise.

`+ number` will convert number to a Number.

`12.34 | 0` will convert 12.34 to the integer `12`. It will do it, as all binary operations can only be done on 32 bit integers in JavaScript.

-- [@Poetro](http://twitter.com/Poetro)
