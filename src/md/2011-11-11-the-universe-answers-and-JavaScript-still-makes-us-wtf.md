This installment of wtfjs has to do with implicit type conversion during
arithmetics and operator ambiguity / overloading.

If you can figure out what this returns on the first guess, I'll give you a
great big hug the next time I see you:

<code>
    // is there an error (if not, what do I return?)
    "3" -+-+-+ "1" + "1" / "3" * "6" + "2"
</code>

Now, I won't spoil the fun for those of you at home trying to do this mentally,
but the answer probably isn't what you'd expect.  Go ahead, run it in a
JavaScript console - WTF?! ^)*&#) right?

Firstly, I'm not sure about you guys, but I forgot some basic stuff from
elementary school math - order of operations.  One usually doesn't look at these
when doing (supposed) string concatenation (but we're doing a little bit more
than that, aren't we?).

The precedence of operators in JavaScript are (from highest to lowest):

<code>
    delete
    void
    typeof
    ++
    --
    +
    -
    ~
    !

           *
           /
           %

              +
              -
              <<
              >>
              >>>

                   <
                   >
                   <=
                   >=
                   instanceof
                   in

                              ==
                              !=
                              ===
                              !==

                                   &
                                   ^
                                   |

                                      &&
                                      ||

                                          ? :

                                               =
                                               *=
                                               /=
                                               %=
                                               +=
                                               -=
                                               <<=
                                               >>=
                                               >>>=
                                               &=
                                               ^=
                                               |=
</code>

http://es5.github.com/#x11.4.6

First you'll notice that the `+` occurs twice (already a bit confusing), but
additionally can be used for string concatenation based on contextual cues and
type hints (i.e. `5 + "2" = "52"`, not `7`).

> 11.6.1 The Addition operator ( + )
> The addition operator either performs string concatenation or numeric addition.

[snip]

> If Type(lprim) is String or Type(rprim) is String, then

> Return the String that is the result of concatenating ToString(lprim) followed by ToString(rprim)

> [Else,]

> Return the result of applying the addition operation to ToNumber(lprim) and ToNumber(rprim).

So this means we'll have to find out what which + is doing what.

Additionally, you can throw a unary `+` or `-` operator onto `UnaryExpression`s
like candy to change their signs and make things prettier and easier to
understand for your fellow developers.  Note that every `-` flips the sign, but
`+` does essentially nothing functionally to the result of the `UnaryExpression`
(i.e.  `+1 === 1`).

NOTE: Unary `+` can be useful to cast to numbers (hence the `+new Date` hack we
often see to emulate `Date.now()`) and to guarantee you're casting to decimal
(i.e.  `+"013"` is `13` but `parseInt("013")` is `11`).  This method has the
drawback, however, that it can't handle letters in the string (i.e. `+"1a"`
gives `NaN` whereas `parseInt("1a")` gives `1`, and accidental octal conversion
number guessing by `parseInt` can be fixed by adding a base to `parseInt` (i.e.
`parseInt("08", 10)` is `8`).

http://es5.github.com/#x11.6.1

These unary operators are evaluated first as they have the highest precedence,
so we start with the result of `+-+-+"1"` (notice how the first `-` is treated
as the operator when evaluating an `AdditiveExpression`).  The result of this is
simply `1`.

NOTE: This ignores your grammar teacher's rules about double negatives.

Let's make this line into an expression tree.  After unary operators are
evaluated, we have:

<code>
              +

         "2"         +

              *              -

          /     "6"      1      "3"

     "1"     "3"
</code>

However, we don't know what types are implicitly cast yet.  Let's make another
tree showing non-ambiguous operations (`/`, `*`, `-`):

<code>
              +

         "2"         +

              *              -

          /      6       1       3

      1       3
</code>

This greatly simplifies the bottom of the tree as they're all now numbers. We
continue evaluating from bottom left most child up, which evaluates the
expression as so: (3-1)+((1/3)*2) = 2 + 2 = 4.  This leaves us with this tree:

<code>
          +

     "2"      4
</code>


This last operation is ambiguous, so we look to see if either operand is a
string (which `"2"` is), so the type of `lprim` or `rprim` is `String` after
calling `ToPrimitive` (which `rprim is`), so the final result is

<code>
    "42"
</code>

(which is the obvious answer to life the universe and everything, really).

[@danbeam](http://twitter.com/danbeam)
