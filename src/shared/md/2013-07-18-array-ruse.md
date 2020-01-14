<pre lang="javascript"> javascript
[,,,].join() // ==> ",,"
</pre>

wtf?

— [@eliranmal][1]



Turns out that the trailing comma is removed (trailing commas are allowed in
javascript, but not JSON). Once removed, there are only three "elements" in the
array, and both are undefined. When `join` is called, by default it uses a comma,
yielding ",,". I think this is what happens.

— [@DDTrejo][2]


JSON has nothing to do with this issue. Although a trailing comma is really
allowed by Javascript and that's the case. So `[1,2,3,]` equals to `[1,2,3]`.
So literally `[,,,]` is something like `[undefined, undefined, undefined,]`.
You can add `undefined` to the end explicitly to get an array with 4 elements:

<pre lang="javascript"> javascript
[,,,undefined].join() // ==> ',,,'
</pre>

— [@ixti][3]


Each beginning or ending comma is Elision (except comma after AssignmentExpression). Each Elision are evaluated as one array field.
http://www.ecma-international.org/ecma-262/5.1/#sec-11.1.4

— [@tomi77]


[1]:https://twitter.com/eliranmal]
[2]:https://twitter.com/ddtrejo
[3]:http://ixti.net
