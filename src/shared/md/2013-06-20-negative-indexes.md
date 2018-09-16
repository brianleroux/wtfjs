Negative numbers mean different things to different functions on the Array prototype.

```
    var nums = [1, 2, 3];
    nums.splice(nums.indexOf('wtf'), 1);
    nums; // [1, 2]
```

— [@markdalgleish][0]


Interestingly, negative numbers put inside Array.Splice splice the item that is that amount from the end of the array.

e.g.

```
    var nums = [1, 2, 3, 4, 5];
    nums.splice(-1, 1);  // removes the last item
    nums.splice(-2, 1);  // removes the second last item
```

until.......

you reach the start of your array - afterwards, the first item will always be the item spliced:

```
    var nums = [1, 2, 3];
    nums.splice(-12, 1);
    nums; // [2, 3]
```

— [@MichalPaszkiewicz][1]

[0]:https://twitter.com/markdalgleish
[1]:http://www.michalpaszkiewicz.co.uk/
