See if you can guess what this will output:

    function allNames() {
      var names = [ 'dan', 'anthony', 'pavel' ];
      for (name in names) {
        console.log(name);
      }
    }
    
    allNames();


If you guessed this:

> 0<br/>
> 1<br/>
> 2<br/>


...then you are right! Congratulations!

What you might not have guessed, is what this will output:


    console.log(window.name);

its:

> "2"


Iteration is assignment, and without the use of the <code>var</code> keyword, you're really using the <code>this</code> object - which in the context of a raw function declaration is the <code>window</code> object.

So the original function is equivalent to:

    function allNames() {
      var names = [ 'dan', 'anthony', 'pavel' ];
      for (this.name in names) {
        console.log(name);
      }
    }

Which is also equivalent to:

    function allNames() {
      var names = [ 'dan', 'anthony', 'pavel' ];
      for (window.name in names) {
        console.log(name);
      }
    }
    
    