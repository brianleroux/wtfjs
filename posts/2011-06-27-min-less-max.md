This beauty is courtesy of [TiTi](https://github.com/TiTi) ...lets look at some code.

<code>

Math.max();
// -Infinity

Math.min();
// Infinity

</code>

Ok, so, there *is* a good reason for this behaviour. It might even make sense if you happen to occasionally omit args from your min/max calls. ;)

You see, the min/max implementations need something to compare to and Infinity and -Infinity are the only safe values to use for that comparison. [@kriskowell goes into more better detail here](https://twitter.com/#!/kriskowal/status/85402842650783744) and was quickly followed by [@brendaneich](https://twitter.com/#!/BrendanEich/status/85406752136368128) whom not only [wrote js in 10 days](http://brendaneich.com/2008/04/popularity/) but can rock out unicode Infinity symbols without looking them up ...I shit you not. 

Of course, due to this behaviour js allows for this code humour:
<code>

Math.min() < Math.max();
// false

</code>

Oh JavaScript, I still love you.
