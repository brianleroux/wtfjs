Why would you _ever_ use this function, or constructor, or ...?

``` javascript
> Boolean(false)
false
> new Boolean(false)
{}
> {} == true
false
> Boolean({})
true
> Boolean(new Boolean(false))
true
> new Boolean(Boolean(false))
{}
> if (new Boolean(false)) console.log('Indeed')
Indeed
```

You couldn't _make_ this stuff up.

— [@rtoal](https://twitter.com/rtoal)
