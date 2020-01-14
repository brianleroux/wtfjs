When I use regular expressions and I want to validate a range of letters, I can
do it using `a-z` or `A-Z`. Even when I use `A-z` it works fine too. The problem
comes doing some test:

<pre lang="javascript">
  /[A-Z]/.test("A"); // true
  /[A-Z]/.test("b"); // false
  /[A-Z]/.test("Z"); // true
  /[A-Z]/.test("z"); // false
  /[a-z]/.test("a"); // true
  /[a-z]/.test("A"); // false
  /[a-z]/.test("z"); // true
  /[a-z]/.test("Z"); // false
</pre>

The weird thing comes when I do this test:

<pre lang="javascript">
  /[A-z]/.test("A"); // true
  /[A-z]/.test("a"); // true
  /[A-z]/.test("Z"); // true
  /[A-z]/.test("z"); // true
  /[A-z]/.test("m"); // true
  /[A-z]/.test("D"); // true
  /[A-z]/.test("\\"); // true WTF?
</pre>

It's supposed to accept only letters from `A to Z` and `a to z`.
Can someone explain this?

&mdash; [@byoigres][1]


I had a look into this with the following code:
<pre lang="javascript">
  var re = /[A-z]/g,s=(function(){
    var f = String.fromCharCode;
    for(var i=0;i<6000;i++) f=f.bind(0, i);
    return f();
  })(),q,z=[];while((q=re.exec(s)) != null) z.push(q[0]);z
</pre>

It returns

<pre lang="javascript">
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
  "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\", "]", "^",
  "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
</pre>

A-z literally means 'any character between 'A' and
'z' in unicode code-point order, or at least charCode order. This allows (I
think non-standard) statements like `/[ -y]/g`:

<pre lang="javascript">
  var re = /[ -y]/g,s=(function(){
    var f = String.fromCharCode;
    for(var i=0;i<6000;i++) f=f.bind(0, i);
    return f();
  })(),q,z=[];while((q=re.exec(s)) != null) z.push(q[0]);z
</pre>

Which returns
<pre lang="javascript">
  [" ", "!", """, "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".",
  "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=",
  ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[",
  "\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y"]`
</pre>

This probably has some potential security implications because if you're using
[A-z] to sanitise something, you'll accept <code>[\]^_`</code>

A very interesting find!

&mdash; [zemnmez][2]

[1]:https://twitter.com/byoigres
[2]:https://twitter.com/zemnmez
