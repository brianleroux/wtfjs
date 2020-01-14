<pre lang="javascript">
    true == 'true'     // true
    false == 'false';  // false
</pre>

This is expected behaviour as == doesn't do value equality,
but rather it does numeric value [equality][1], thus 'false' is truthy, thus equals 1


— [@grnadav][2]

[1]:http://es5.github.com/#x11.9.1
[2]:https://twitter.com/grnadav
