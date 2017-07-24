See if you can guess what this will output:

<code>
    function allNames() {
      var names = [ 'dan', 'anthony', 'pavel' ];
      for (name in names) {
        console.log(name);
      }
    }

    allNames();
</code>

If you guessed this:

> 0<br/>
> 1<br/>
> 2<br/>


...then you are right! Congratulations!

What you might not have guessed, is what this will output:

<code>
    console.log(window.name);
</code>

it's:

> "2"


Iteration is assignment, and without the use of the `var` keyword, you're really using the global object - which in this context is the `window` object.

So the original function is equivalent to:

<code>
    function allNames() {
      var names = [ 'dan', 'anthony', 'pavel' ];
      for (window.name in names) {
        console.log(name);
      }
    }
</code>

By [@danlash][1]

[1]:https://twitter.com/danlash
