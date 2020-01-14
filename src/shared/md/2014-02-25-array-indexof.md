**Not empty array doesn't contain its element:**
<pre lang="javascript">
var a = [,];
a.length; //1, some element exists
a.indexOf(a[0]); //-1
// We have the array with non-zero length, which doesn't contain its first element. WTF?
</pre>

**The problem is in this:**

`a[0]` is `undefined`. `undefined` is the javascript primitive type. But when we init an array
the ES5 spec tells us the following about [array initialisers](http://es5.github.io/#x11.1.4):

<pre lang="javascript">
Elided array elements are not defined.
...
The missing array element contributes to the length of the Array and increases the index of subsequent elements.
</pre>

Elements are not `undefined`, they are `not initialized`.
When we invoke `indexOf` on an array this is one of the steps that happens:
<pre lang="javascript">
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument ToString(k).
</pre>

In that, `k` is a number corresponding to an array index and `O` is the array itself.
Since elided elements were not defined the array does not have a property for the corresponding index.

*Ok. But why do we get `undefined` when get the first array element?*

Javascript is a prototype-based scripting language and Array is an object, too.
So if there is no property `0` in an array, the internal engine goes deeper to the prototype
and there is no such property in the prototype chain - return undefined.
When we try to access the value `0` property of array the internal method `[[GetProperty]]` gets called.
If there is no such property `[[GetProperty]]` we try to get it from the prototype chain
and `undefined` is returned if it stops on `null` (end of prototype chains).


— [frontenddeveloping](https://github.com/frontenddeveloping)
