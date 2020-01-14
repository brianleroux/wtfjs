So, `!!` converts a value to a boolean and ensures a boolean type.

<pre lang="javascript">
    !!false // --> false
    !!true // --> true
</pre>

Ok, that makes sense. What about strings?

<pre lang="javascript">
    !!"false" // --> true
    !!"true" // --> true
</pre>

Weird. But wait, does this mean...

<pre lang="javascript">
    !!"false" == !!"true" // --> true
</pre>

I bet if we also compare the type at least...


<pre lang="javascript">
    !!"false" === !!"true" // --> true
</pre>

Then again...

<pre lang="javascript">
    !!false == !!true // --> false
</pre>

..., but...

<pre lang="javascript">
    !!"false" == !!true // --> true
    !!"false" === !!true // --> true
</pre>
