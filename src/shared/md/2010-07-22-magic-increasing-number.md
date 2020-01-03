Look at me, I'm the magic increasing number!

```
    9999999999999999
    //=> 10000000000000000
```


--- [@thomasfuchs](http://twitter.com/thomasfuchs)

That's because `9999999999999999` > [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). That's the highest integer possible without loosing precision. You can check if your integer is save using [`Number.isSafeInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

To keep precision above that integer, you have to use [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

--- [@shaedrich](https://github.com/shaedrich)
