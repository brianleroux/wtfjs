Checking a variable for one word with one to ten letters lowercase only?

Try this regular expression: `/^[a-z]{1,10}$/.test('wakaluba')`.

```
    /^[a-z]{1,10}$/.test(null);
    /^[a-z]{1,10}$/.test(undefined);
```

Both should obviously fail, but return **true**. srsly, WTF JS?

— [@damienklinnert][1]

[1]:https://twitter.com/damienklinnert]
