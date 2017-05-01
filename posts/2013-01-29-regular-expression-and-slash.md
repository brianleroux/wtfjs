When I use regular expressions and I want to validate a range of letters, I can do it using `a-z` or `A-Z`. Even when I use `A-z` it works fine too. The problem comes doing some test:

```
/[A-Z]/.test("A"); // true
/[A-Z]/.test("b"); // false
/[A-Z]/.test("Z"); // true
/[A-Z]/.test("z"); // false
/[a-z]/.test("a"); // true
/[a-z]/.test("A"); // false
/[a-z]/.test("z"); // true
/[a-z]/.test("Z"); // false
```

The weird thing comes when I do this test:

```
/[A-z]/.test("A"); // true
/[A-z]/.test("a"); // true
/[A-z]/.test("Z"); // true
/[A-z]/.test("z"); // true
/[A-z]/.test("m"); // true
/[A-z]/.test("D"); // true
/[A-z]/.test("\\"); // true WTF?
```

It's supposed to accept only letters from `A to Z` and `a to z`.
Can someone explain this?

— [@byoigres][1]

[1]:https://twitter.com/byoigres