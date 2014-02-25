**Not empty array don't contains it element:**
```
var a = [,];
a.length;//1, some element exist
a.indexOf(a[0]);//-1
//We have the array with not-zero length, which don't contain its first element. WTF?
```

**The problem is in this:**

`a[0]` is `undefined`. `Undefined` is the javascript primitive type. But then we init an array 
the ES5 spec tells us the following of [array initialisers](http://es5.github.io/#x11.1.4):

```
Elided array elements are not defined.
...
The missing array element contributes to the length of the Array and increases the index of subsequent elements.
```

Elements are not `undefined`, them are `not initialized`.
When we invoke `indexOf` on an array this is one of the steps that happens:
```
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument ToString(k).
```

In that, `k` is a number corresponding to an array index and O is the array itself. 
Since elided elements were not defined the array does not have a property for the corresponding index.

*Ok. But why we get `undefined` when get first array element?*
Javascript is prototype-based scripting language and Array is a object too.
So if there is no property `0` in a array, the internal engine go deeper to prototype 
and there is no such property in prototype chain - return undefined.
When we trying to access to value `0` property of array the internal method `[[GetProperty]]` calls.
When there is no such property [[GetProperty]] try to get it from prototype chain 
and returns undefined if it stops on null(end of prototype chains).


— [frontenddeveloping](https://github.com/frontenddeveloping)
