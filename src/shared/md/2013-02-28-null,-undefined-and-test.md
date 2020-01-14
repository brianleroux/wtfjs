Checking a variable for one word with one to ten letters lowercase only?

Try this regular expression: `/^[a-z]{1,10}$/.test('wakaluba')`.

<pre lang="javascript">
    /^[a-z]{1,10}$/.test(null);
    /^[a-z]{1,10}$/.test(undefined);
</pre>

Both should obviously fail, but return **true**. srsly, WTF JS?

— [@damienklinnert][1]

This happens because regex.test() converts its parameter to a string:

<pre lang="javascript">
    String(null) // "null"
</pre>

The string "null" matches the regular expression `/^[a-z]{1,10}$/`

— [@stevendesu][2]

[1]:https://twitter.com/damienklinnert
[2]:https://github.com/stevendesu
