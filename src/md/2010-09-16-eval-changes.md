eval() is a mysterious function. More so than people believe, hell, its spec isn't even clear. And so i present... The two stages of eval denial.

Try out these functions with
<code>
	[foo("foo=2"),foo]
</code>
and take that path with me.

Tested on chrome, firefox, opera, and safari.


#### Apparently eval is evil.
Doesn't seem so evil.

```
	function foo(x){var foo=1;eval(x);return foo;};

	//[2,function foo(x){var foo=1;eval(x);return foo;}]
```

#### Apparently assigning eval to a variable changes how it acts. WTF.
...Ok I can deal with that I guess.

```
	function foo(x){var foo=1, bar=eval;bar(x);return foo;};

	//and just returning it, not saving it

	function foo(x){var foo=1;(function(){return eval})(x);return foo;};

	//[1, 2]
```