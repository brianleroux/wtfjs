
[@pbakaus](http://twitter.com/pbakaus) points out that Number.MAX_VALUE is close to infinity, but not too close.

``` javascript
    Number.MAX_VALUE*1.0000000000000001 === (1/0) // false
    Number.MAX_VALUE*1.0000000000000002 === (1/0) // true
```
