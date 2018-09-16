ECMAScript allows you to use unicode variable names, just use the usual \uXXXX codes:

```
    var \u1000 = {
      \u1001: 'foo',
      \u1011: 'bar'
    };

    console.log( \u1000.\u1001 ); // prints 'foo'
    console.log( \u1000.\u1011 ); // prints 'bar'
```

WTF right?


By [@manekinekko][1]

[1]:https://twitter.com/manekinekko
