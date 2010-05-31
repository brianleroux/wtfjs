<code>
    var foo = { 
        toString: function () { 
            return 5; 
        }, 
        valueOf: function () { 
            return "foo"; 
        } 
    }; 
    alert(foo.toString() + 1); // 6 (bad!) 
    alert(foo + 1);            // "foo1" (no good!) 
    alert(+foo);               // NaN (the worst!)
</code>

Thanks to [Ajaxian](http://ajaxian.com/archives/a-very-detailed-look-at-object-to-primitive-conversions) for pointing out this [amazingly detailed look at object to primitive coercion](http://www.adequatelygood.com/2010/3/Object-to-Primitive-Conversions-in-JavaScript).