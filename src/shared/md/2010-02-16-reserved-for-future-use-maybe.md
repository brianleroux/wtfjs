JavaScript has a [ludicrous list of reserved words](https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Reserved_Words); most of them aren’t even used as keywords in the language. Modern browsers allow using most of these words as identifiers, despite what the spec says. But Safari doesn’t like enum for some reason.

```
    // In Safari, try...
    var enum;
    //-> SyntaxError: Parse error
```