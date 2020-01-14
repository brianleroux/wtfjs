In Chrome
<pre lang="javascript">
document.all // HTMLAllCollection[843]
document.all[0] // <html>...</html>

typeof document.all // "undefined"!  WTF!
!{} // false. It's OK
!document.all // true! WTF!
</pre>
