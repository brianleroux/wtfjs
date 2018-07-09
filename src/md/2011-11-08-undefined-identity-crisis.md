Everyone loves Yoda Conditionals, right? They stop you from accidentally assigning stuff when you should be comparing, breaking everything! Or do they?

``` javascript
    function test (a) {
      if (undefined = a) {
        a = {}
      }
      return a;
    }
    undefined === test(null)
```

I encountered this gem recently. It's more a bug in the code than the implementation, but it's the implementation that allows this quirky disaster to occur. A single missing equals symbol in the comparison of undefined against a is the source of the chaos.

When the type equality comparison is evaluated, the state of undefined is stored, then test is executed and it's return value is stored, then the comparison is made. Before running test, undefined will be what we expect; undefined. But after running test, it will now be null. Because the value of undefined was stored for the comparison before running test, the first time running this will return false, while the second time will return true. Undefined identity crisis!

By [@stephenbelanger][1]

[1]:https://twitter.com/stephenbelanger

**EDIT**: This has been fixed in ECMAScript 5. `undefined` is now a constant instead of a global variable. The above sample code will now always return false. –[@TimoTijhof](https://twitter.com/TimoTijhof)
