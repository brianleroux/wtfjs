`isFinite` function of JavaScript tests whether a number is finite.

<pre lang="javascript">
    isFinite(42); // true
    isFinite(1/0); // false
    isFinite(0/0); // NaN is not finite -> false
    isFinite('42'); // true
    isFinite('hi'); // false
</pre>

These are normal results.

<pre lang="javascript">
    isFinite(); // false
    isFinite(undefined); // false
</pre>

Undefined values are not finite. These are normal results too.

<pre lang="javascript">
    isFinite(null); // true
</pre>

Wait, what? Is null a number? [It is converted into 0](http://ecma-international.org/ecma-262/5.1/#sec-9.3)? Why?

Since `null != 0` and `null == undefined`, (even thought `null !== undefined`) I expected null will behave something like undefined!

— [@123jimin][1]

[1]:https://github.com/123jimin
