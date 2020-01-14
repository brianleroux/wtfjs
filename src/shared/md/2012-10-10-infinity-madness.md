<pre lang="javascript">
    parseFloat( 'Infinity' ) // returns Infinity
    Number( 'Infinity' ) // returns Infinity
    parseInt( 'Infinity' ) // returns NaN
</pre>
— [@fivetanley][1]

But of course, you should always specify a radix when calling `parseInt`:

<pre lang="javascript">
    parseInt( 'Infinity', 10 ) // returns NaN
    // ...
    parseInt( 'Infinity', 18 ) // returns NaN...
    parseInt( 'Infinity', 19 ) // returns 18
    // ...
    parseInt( 'Infinity', 23 ) // returns 18...
    parseInt( 'Infinity', 24 ) // returns 151176378
    // ...
    parseInt( 'Infinity', 29 ) // returns 385849803
    parseInt( 'Infinity', 30 ) // returns 13693557269
    // ...
    parseInt( 'Infinity', 34 ) // returns 28872273981
    parseInt( 'Infinity', 35 ) // returns 1201203301724
    parseInt( 'Infinity', 36 ) // returns 1461559270678...
    parseInt( 'Infinity', 37 ) // returns NaN
    // ...
</pre>
— [@stuartpb][2]

[1]: https://twitter.com/fivetanley
[2]: https://twitter.com/stuartpb
