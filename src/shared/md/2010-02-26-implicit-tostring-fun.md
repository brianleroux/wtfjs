Be careful with those implicit .toString() calls in == comparisons.

<pre lang="javascript">
    typeof "abc" == "string"          // true
    typeof String("abc") == "string"  // true
    String("abc") == "abc"            // true -- same types get casted to equal each other
</pre>

Also, instantiation via the _new_ operator can yield interesting results!

<pre lang="javascript">
    String("abc") instanceof String        // false -- hmmm...
    (new String("abc")) instanceof String  // true
    String("abc") == (new String("abc"))   // true -- wait, wtf?
</pre>

As always, we are reminded to test with the strict equality operator: _===_.
