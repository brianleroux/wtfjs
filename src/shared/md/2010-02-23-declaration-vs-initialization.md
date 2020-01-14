<pre lang="javascript">
    var a = 8;
    var someFunc = function(){
        document.write(a);
        var a = 8;
    };
    someFunc(); // writes undefined
</pre>

Of course, the variable is undefined because its being declared but not initialized until after the document.write in the function context which itself runs before the first declaration of a. Yowza. Cheers to [Boaz, Al & Rick](http://weblog.bocoup.com/weird-var-behavior-in-javascript) for this one!
