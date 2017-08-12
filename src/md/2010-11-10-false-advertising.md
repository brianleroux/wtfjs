What do you think this constructor returns for `new Dude('Bob')`? Doug or Bob?

```
	function Dude(name){
		this.name = name;
		return {name: 'Doug'};
	}
```

Answer:
```
	var bob = new Dude('Bob');
	// { name: 'Doug' }
	bob instanceof Dude
	// false
```

Huh!? So you can just slip in anything? What about arrays?
```
	function Dude(name){
		this.name = name;
		return [1, 2, 3];
	}
	new Dude('Bob');
	// [1, 2, 3]
```

That can't be! What about...
```
	function Dude(name){
		this.name = name;
		return 3;
	}
	new Dude('Bob');
	// { name: 'Bob' }
```
Wah? No way! So, if you try to return a primitive type from a constructor(number, string, date), it
will ignore the return value and return the originally initialized object, but otherwise, the returned value overrides.

--- [@airportyh](http://twitter.com/airportyh)