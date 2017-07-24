This one is fun and sneaky. 

<code>
    (function(){
        var x = y = 1;
    })();
    alert(x); // undefined
    alert(y); // 1 -- oops, auto-global!
</code>

It’s treated like: var x = (y = 1);  thus, “y=1” creates an auto-global since there’s no binding “var” statement for it. then that value gets copied into properly defined local var “x”.