What do you think this constructor returns for `new Dude('Bob')`? Doug or Bob?

<pre lang="javascript">
	function Dude(name){
		this.name = name;
		return {name: 'Doug'};
	}
</pre>

Answer:
<pre lang="javascript">
	var bob = new Dude('Bob');
	// { name: 'Doug' }
	bob instanceof Dude
	// false
</pre>

Huh!? So you can just slip in anything? What about arrays?
<pre lang="javascript">
	function Dude(name){
		this.name = name;
		return [1, 2, 3];
	}
	new Dude('Bob');
	// [1, 2, 3]
</pre>

That can't be! What about...
<pre lang="javascript">
	function Dude(name){
		this.name = name;
		return 3;
	}
	new Dude('Bob');
	// { name: 'Bob' }
</pre>
Wah? No way! So, if you try to return a primitive type from a constructor(number, string, date), it
will ignore the return value and return the originally initialized object, but otherwise, the returned value overrides.

--- [@airportyh](http://twitter.com/airportyh)
