```
new Date(10) == new Date(10) // false
new Date(10) < new Date(11) // true
new Date(11) > new Date(12) // false
new Date(11) > new Date(10) // true
```
Two object instances are always unequal. But they decided to overload operator < and > for Date and not ==. This renders the whole thing useless.
