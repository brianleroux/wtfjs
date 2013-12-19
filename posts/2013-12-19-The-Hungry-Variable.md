Consider this JS:
``` javascript
x = /[/ + "javascript"[0] + '///'
```
What do you expect the value of `x` to be?

Those well-versed in Javascript's concatenation may either reject the statement or perhaps say:

``` javascript
"/[/j///"
```

Chromium's console, however says:
``` javascript
x = /[/ + "javascript"[0] + '///'
/[/ + "javascript"[0] + '/
```

###The Hungry Variable
Those who don't immediately see through this may notice a few things.

* Like `/(`, `/[/` throws an error.
* `"javascript"[0]` returns `"j"` as expected.
* `'///'` returns `"///"` as expected.

What should be noted is that the errors for `/(/` and `/[/` are subtly different. In Chromium console:

``` javascript
/(/
//SyntaxError: Invalid regular expression: /(/: Unterminated group

/[/
//SyntaxError: Invalid regular expression: missing /
```

[@zemnmez][1]

It seems that Javascript cannot see the second '/' for some reason. This is because choice groups (`/[any letter]/`) don't require escaping of the forward-slash, so `/[/]/` is perfectly acceptable and the same as `/\//`.

If the code was syntax highlighted, you would notice that the highlighter was just as confused as you in that regard, I've never seen a highligher that handles this correctly.

Thus, the regex extends across the apparent string addition statement and terminates at the "]" (you can't nest choice blocks).

The regex then extends to the slash after the typewriter single quote, and so the `//'` is simply a comment.


If you want the code to do as expected, add a single forward slash before the first "[":

``` javascript 
x = /\[/ + "javascript"[0] + '///'
"/\[/j///"

//for comparison
x = /[/ + "javascript"[0] + '///'
/[/ + "javascript"[0] + '/
```

It is an interesting example of a statement that can completely change meaning with the insertion of one character without creating any errors.
