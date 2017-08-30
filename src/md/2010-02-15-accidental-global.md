This one is fun and sneaky. 

```
    (function(){
        var x = y = 1;
    })();
    alert(x); // undefined
    alert(y); // 1 -- oops, auto-global!
```

It’s treated like: var x = (y = 1);  thus, “y=1” creates an auto-global since there’s no binding “var” statement for it. Afterwards, that value gets copied into the properly defined local var “x”.