In JavaScript, undefined is nothing but a global variable name without a default value. Therefore, its primitive value is undefined. You can change the value of undefined:

```
    var a = {};
    a.b === undefined; // true because property b is not set
    undefined = 42;
    a.b === undefined; // false
```

Due to the mutability of undefined, it is generally a better idea to check for undefined-ness through typeof:

```
    var a = {};
    typeof a.b == 'undefined'; // always true
```

– [@mathias](http://mathiasbynens.be/)

That is no longer the case in [ECMAScript 5](http://ecma-international.org/ecma-262/5.1/#sec-15.1.1.3)

In ECMAScript 3, a [trick you can use](http://www.2ality.com/2011/05/void-operator.html) is comparing to `void 0` because the **void** expression always evaluates to **undefined**:

```
    var a = {};
    a.b === void 0; // true
```

– [@specious](https://github.com/specious)