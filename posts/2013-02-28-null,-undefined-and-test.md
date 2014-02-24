Checking a variable for one word with one to ten letters lowercase only?

Try this regular expression: `/^[a-z]{1,10}$/.test('wakaluba')`.

```
    /^[a-z]{1,10}$/.test(null);
    /^[a-z]{1,10}$/.test(undefined);
```

Both should obviously fail, but return **true**. srsly, WTF JS?

— [@damienklinnert][1]

[1]:https://twitter.com/damienklinnert]

That's because the `.test` method stringifies its first argument in order to apply the provided regex over it. Hence,
by doing `/^[a-z]{1,10}$/.test(null);` you're actually providing `"null"` as argument. This same behaviour affects the examples below:

```
    /^[a-z]{1,10}$/.test(false);    // true, false -> "false"
    /^[a-z]{1,10}$/.test(true);     // true, true -> "true"
    /^\[object Object\]/.test({});  // true, {} -> "[object Object]"
```

— [MarkLinus](https://github.com/MarkLinus)
