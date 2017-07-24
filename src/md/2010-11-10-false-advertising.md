What do you think this constructor returns for `new Dude('Bob')`? Doug or Bob?
<code>
	function Dude(name){
		this.name = name;
		return {name: 'Doug'};
	}
</code>
Answer:
<code>
	var bob = new Dude('Bob');
	// { name: 'Doug' }
	bob instanceof Dude
	// false
</code>
Huh!? So you can just slip in anything? What about arrays?
<code>
	function Dude(name){
		this.name = name;
		return [1, 2, 3];
	}
	new Dude('Bob');
	// [1, 2, 3]
</code>
That can't be! What about...
<code>
	function Dude(name){
		this.name = name;
		return 3;
	}
	new Dude('Bob');
	// { name: 'Bob' }
</code>
Wah? No way! So, if you try to return a primitive type from a constructor(number, string, date), it
will ignore the return value and return the originally initialized object, but otherwise, the returned value overrides.

--- [@airportyh](http://twitter.com/airportyh)