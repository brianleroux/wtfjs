The following will return an Integer with a default of 0 from any String or Number.

<code>
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
</code>

Explanation
--

<code>
    number && x
</code>
will return <code>x</code> if <code>number</code> is truthy, and <code>number</code> otherwise.

<code>
    x || 0
</code>
will return <code>x</code> if <code>x</code> is truthy, and 0 otherwise.

<code>+ number</code> will convert number to a Number.

<code>12.34 | 0</code> will convert 12.34 to the integer <code>12</code>. It will do it, as all binary operations can only be done on 32 bit integers in JavaScript.

-- [@Poetro](http://twitter.com/Poetro)
