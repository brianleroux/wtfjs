Be careful with those implicit .toString() calls in == comparison.

<code>
    typeof "abc" == "string"          // true
    typeof String("abc") == "string"  // true
    String("abc") == "abc"            // true -- same types get casted to equal each other    
</code>

Also, instantiation via _new_ operator can yield interesting results!

<code>
    String("abc") instanceof String        // false -- hmmm...
    (new String("abc")) instanceof String  // true
    String("abc") == (new String("abc"))   // true -- wait, wtf?
</code>

As always, we are reminded to test with strict equality operator: _===_.