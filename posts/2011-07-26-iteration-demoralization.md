See if you can guess what this will output:

<code>
function allNames() {

  var names = [ 'dan', 'anthony', 'pavel' ];


  for (name in names) {

    console.log(name)

  }

}


</code>


If you guessed this:

> 'dan'

> 'anthony'

> 'pavel'


...then you are right! Congratulations!


What you might not have guessed, is what this will output:


<code>
console.log(window.name);

</code>

its:

> 'pavel'


Iteration is assignment, and without the use of the <code>var</code> keyword, you're really using the global object - which in the case of a browser is the window object.

Don't be too hard on your co-worker when you find his mistake :-)