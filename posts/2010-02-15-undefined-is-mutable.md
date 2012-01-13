In JavaScript, undefined is nothing but a global variable name without a default value. Therefore, its primitive value is undefined. You can change the value of undefined:

<code>
    var a = {};
    a.b === undefined; // true because property b is not set
    undefined = 42;
    a.b === undefined; // false
</code>

Due to the mutability of undefined, it is generally a better idea to check for undefined-ness through typeof:

<code>
    var a = {};
    typeof a.b == 'undefined'; // always true
</code>

– [@mathias](http://mathiasbynens.be/)