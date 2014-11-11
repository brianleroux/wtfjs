Nice arguments hackery going on here. 

```
(function(a,b,c) {
    print(a,b,c); // one two three
    print(arguments[0], arguments[1], arguments[2]); // one two three
    arguments[0] = "uno";
    print(a,b,c); // uno two three
    print(arguments[0], arguments[1], arguments[2]); // uno two three
    // a is magically married to arguments[0], b to arguments[1] etc
    // so one could change locally scoped variables from another scope like so:
    changeArguments(arguments);
    print(a,b,c); // I messed up your dataz
})("one", "two", "three");
// not cool.
function changeArguments(args){
    args[0] = "I messed"
    args[1] = "up your";
    args[2] = "dataz";
}
```
    
```
// A more real world example:
(function(arg1, arg2) {
    print(arg1, arg2);
    //-> uno dose
    Array.prototype.shift.apply(arguments);
    print(arg1, arg2);
    //-> dose undefined
})('uno', 'dose');
```

Thanks to [@deadlyicon](http://twitter.com/deadlyicon)!