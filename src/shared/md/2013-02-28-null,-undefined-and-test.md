Checking a variable for one word with one to ten letters lowercase only?

Try this regular expression: `/^[a-z]{1,10}$/.test('wakaluba')`.

```
    /^[a-z]{1,10}$/.test(null);
    /^[a-z]{1,10}$/.test(undefined);
```

Both should obviously fail, but return **true**. srsly, WTF JS?

— [@damienklinnert][1]

This happens because regex.test() converts its parameter to a string:

```
    String(null) // "null"
```

The string "null" matches the regular expression `/^[a-z]{1,10}$/`

— [@stevendesu][2]

[1]:https://twitter.com/damienklinnert
[2]:https://github.com/stevendesu
