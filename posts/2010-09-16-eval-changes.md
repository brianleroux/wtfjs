eval() is a mysterious function. More so than people believe, hell its spec isn't even clear. And so i present... The three stages of eval denial.

Tested on chrome, firefox ,opera, and safari

#### Apparently eval is evil.
Doesn't seem so evil.

<code>

	function foo(x){var foo=1;eval(x);return foo;};[foo("foo=2"),foo]

	//[2,function foo(x){var foo=1;eval(x);return foo;}]
</code>

#### Apparently assigning eval to a variable changes how it acts. WTF.
...Ok I can deal with that I guess.

<code>
	function foo(x){var foo=1, bar=eval;bar(x);return foo;};[foo("foo=2"),foo]
	//[1, 2]
</code>

#### Apparently moving eval across a scope changes how it acts.
WTFHITS

<code>
	function foo(x){var foo=1, bar=eval;(function(){return bar})(x);return foo;};[foo("foo=2"),foo]
	//[1, function foo(f,x,y){var foo=1,bar=eval;(function(){return bar})(x);return foo}]
</code>