A JavaScript syntax oddity with Numbers and Dots:

```
	// Ok, you may have seen wrapping a number literal with parens to call Number methods
	(42).toFixed(2); // "42.00"

	// And it is understandable that without parens you get a syntax error
	42.toFixed(2); // SyntaxError: identifier starts immediately after numeric literal

	// But numbers with decimals work fine without parens (WTF?)
	42.888.toFixed(2); // "42.89"

	// And whole numbers with two dots work as well (WTF?)
	42..toFixed(2); // "42.00"

	// Hey, so what about 3 dots!? Firefox gives XML-related error (WTF?)
	42...toFixed(2); // TypeError: XML descendants internal method called on incompatible Number
```

[kensnyder](https://github.com/kensnyder) via [@ryanflorence](https://twitter.com/ryanflorence/status/199523604092821504)

**Explanation**
JS processes the characters and when it finds the dot after 42 it thinks, 42 must be decimal and expects further digits after the dot. A string is obviously not a number therefore JS throws an error.

— [@shaedrich](https://github.com/shaedrich)
