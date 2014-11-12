```
true == 'true'     // true
false == 'false';  // false
```

This is expected behaviour as == doesn't do value equality,
but rather it does numeric value equality[1], thus 'false' is truethy, thus equals 1


— [@grnadav][2]

[1]:http://es5.github.com/#x11.9.1
[2]:https://twitter.com/grnadav
