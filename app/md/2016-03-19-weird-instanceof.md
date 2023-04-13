```
function Test(){}
Test.prototype = null;
var a = new Test();
a instanceof Test; //Uncaught TypeError: Function has non-object prototype 'null' in instanceof check(…)
a instanceof Object; // true WTF?
```

[ref](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
"The instanceof operator tests whether an object has in its prototype chain the prototype property of a constructor."