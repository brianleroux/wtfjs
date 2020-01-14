Interesting how IE and WebKit treat this differently than Firefox and Opera. Some sort of pre-compilation going on? Who knows. Thanks [@jeronevw](http://twitter.com/jeronevw)!

<pre lang="javascript">
    (function(){return 2*3;}).toString() === (function(){return 6;}).toString();  // true in FF & Opera, false in IE & WebKit
</pre>
