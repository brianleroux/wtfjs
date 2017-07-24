So, '!!' converts a value to a boolean and ensures a boolean type.

```
    !!false // --> false
    !!true // --> true
```

Ok, that makes sense. What about strings?

```
    !!"false" // --> true
    !!"true" // --> true
```

Weird. But wait, does this mean...

```
    !!"false" == !!"true" // --> true
```

I bet if we also compare the type at least...


```
    !!"false" === !!"true" // --> true
```

Then again...

```
    !!false == !!true // --> false
```

..., but...

```
    !!"false" == !!true // --> true
    !!"false" === !!true // --> true
```
