Can someone tell me?

```
    "Why am I a " + typeof + ""; // "Why am I a number"
```

— [@jhnnns][1]

***

I think I can tell you.

typeof requires some value or expression that is evaluated and passed then to typeof as an argument. +"" is treated as expression because + operator
can be used as an unary operator (syntax is: + UnaryExpression). + converts its operand to Number type. So, + "" is evaluated to 0 and then 0 is passed to typeof.

Note that we can cast strings to numbers by preceding them with +:

```

(2 + "3");  // 23
(2 + +"3"); // 5
(+"");      // 0

```

- [@wojciechfornal][2]

[1]:https://twitter.com/jhnnns
[2]:https://twitter.com/wojciechfornal
