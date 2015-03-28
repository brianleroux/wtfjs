```javascript
    0 === -0        //true
    1/0 === 1/-0    //false
```

This is because positive nothing (`+0`) and negative nothing (`-0`)  are still nothing (`0`). So, the expression produces `true`. However, `1/0` is `Infinity`, while `1/-0` is `-Infinity`, this is because:

![equation](http://latex.codecogs.com/gif.latex?%0a%20%20%20%5c%66%72%61%63%7b%31%7d%7b%2d%30%7d%0a%3d%20%20%5c%66%72%61%63%7b%2d%31%7d%7b%30%7d%0a%3d%20%2d%5c%6c%65%66%74%28%20%5c%66%72%61%63%7b%31%7d%7b%30%7d%20%5c%72%69%67%68%74%29%0a)

```latex
   \frac{1}{-0}
=  \frac{-1}{0}
= -\left( \frac{1}{0} \right)
```

And `-Infinity` and `Infinity` are two very different things.
By [Benvie][1]

[1]:https://github.com/Benvie
