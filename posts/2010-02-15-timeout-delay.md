For Firefox only, any function executed by a setTimeout or setInterval invocation will get passed to it (whether you want it to or not) a mysterious “lateness” variable, which represents the number of milliseconds late the function is in executing. Sucks because it can clobber an intentionally unpassed “default” variable to your function. Sucks even more if this variable is intended to be boolean, because you end up with ”random” true/false’y values.

<code>
    // for FF only
    setTimeout(function(rand){ alert(rand); },10); // FF passes a "magic" param we call "rand"
    for (var i=0; i<100000; i++) { i; } // take some time
</code>