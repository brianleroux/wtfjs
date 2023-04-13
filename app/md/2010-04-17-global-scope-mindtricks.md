An update by [@deadlyicon](http://twitter.com/deadlyicon) on the previous post.

This is just a really silly way of saying this:

```
    Function.prototype.call.apply(function (a) {return a}, [1,2])
    // 2
```

If this still seems weird to you. Consider this: 

```
    function logThisAndArgs() { 
        console.log(this, arguments); 
    };
    Function.prototype.call.apply(logThisAndArgs, [{'some':'object'},1,2,3,4])
    // logs -> Object { some="object"} [1, 2, 3, 4]
```

Now this! 

```
    Function.prototype.call.call(logThisAndArgs, {'some':'object'},1,2,3,4)
    // logs -> Object { some="object"} [1, 2, 3, 4]
```