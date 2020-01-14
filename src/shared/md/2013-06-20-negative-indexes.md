Negative numbers mean different things to different functions on the Array prototype.

<pre lang="javascript">
    var nums = [1, 2, 3];
    nums.splice(nums.indexOf('wtf'), 1);
    nums; // [1, 2]
</pre>

— [@markdalgleish][0]


Interestingly, negative numbers put inside Array.Splice splice the item that is that amount from the end of the array.

e.g.

<pre lang="javascript">
    var nums = [1, 2, 3, 4, 5];
    nums.splice(-1, 1);  // removes the last item
    nums.splice(-2, 1);  // removes the second last item
</pre>

until.......

you reach the start of your array - afterwards, the first item will always be the item spliced:

<pre lang="javascript">
    var nums = [1, 2, 3];
    nums.splice(-12, 1);
    nums; // [2, 3]
</pre>

— [@MichalPaszkiewicz][1]

[0]:https://twitter.com/markdalgleish
[1]:http://www.michalpaszkiewicz.co.uk/
