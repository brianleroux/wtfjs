```
var foo = ["lval0", "lval1", "lval2", "lval3"];
foo[this.length] = "lval4";
foo[0]; //result same as foo.splice(0,1,"lval4"); =>lval4
```