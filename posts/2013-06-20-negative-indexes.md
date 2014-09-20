Negative numbers mean different things to different functions on the Array prototype.

<code>
    var nums = [1, 2, 3];
    nums.splice(nums.indexOf('wtf'), 1);
    nums; // [1, 2]
</code>

— [@markdalgleish][1]

[1]:https://twitter.com/markdalgleish

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#Parameters):
> If the index is  negative, the splice method will begin that many elements from the end.

Which means that if `nums = [1, 2, 3, 4, 5]` and you do `nums.splice(-2)`, `nums` will lose its last two items and will become `[1, 2, 3]` (note that the second argument is not needed in this case). This also applies to `Array.prototype.slice` method.

— [MarkLinus](https://github.com/MarkLinus)
