How do you determine if a number is an integer in JavaScript?

    x = 1;
    
    x === Math.floor(x);
    // returns true

But what happens if we try to add a method for this to the Number prototype?

    Number.prototype.isInteger = function() {
      return this === Math.floor(this);
    }
    
    x = 1;
    
    x.isInteger();
    // returns false!

Why? It turns out that when you add methods to Number, the type of the number inside the method becomes "object" rather than "number", but Math.floor returns a result of type "number". If you use the === operator, the two values are no longer equal because they're different types. So the method can be fixed two ways.

Solution 1 is to avoid comparing types:

    Number.prototype.isInteger = function() {
      return this == Math.floor(this);
      // works but breaks if you care about 0 vs other falsy values
    }

Solution 2 is better; cast "this" to the Number type and then the types are equal.

    Number.prototype.isInteger = function() {
      return Number(this) === Math.floor(this);
    }

--- [@attaboy](http://twitter.com/attaboy)
