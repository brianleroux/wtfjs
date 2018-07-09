So, `!!` converts a value to a boolean and ensures a boolean type.

``` javascript
    !!false // --> false
    !!true // --> true
```

Ok, that makes sense. What about strings?

``` javascript
    !!"false" // --> true
    !!"true" // --> true
```

Weird. But wait, does this mean...

``` javascript
    !!"false" == !!"true" // --> true
```

I bet if we also compare the type at least...


``` javascript
    !!"false" === !!"true" // --> true
```

Then again...

``` javascript
    !!false == !!true // --> false
```

..., but...

``` javascript
    !!"false" == !!true // --> true
    !!"false" === !!true // --> true
```
