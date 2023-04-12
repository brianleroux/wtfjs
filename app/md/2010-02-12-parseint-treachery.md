```
    parseInt('06'); // 6
    parseInt('08'); // 0
```

This is because parseInt accepts a second argument for radix. If it is not supplied and the string starts with a 0 it will be parsed as an octal number. Riiiiiiight, of COURSE.