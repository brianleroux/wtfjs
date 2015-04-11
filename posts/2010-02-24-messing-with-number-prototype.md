[@rcanine](http://twitter.com/rcanine) shows us this interesting this coerce behaviour within the prototype of Number. Fun!

```
(1) === 1; // true

Number.prototype.isOne = function () { return this === 1; }

(1).isOne(); // false!

Number.prototype.reallyIsOne = function () { return this - 1 === 0; }

(1).reallyIsOne(); // true
```