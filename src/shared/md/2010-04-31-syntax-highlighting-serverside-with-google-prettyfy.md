This is much more awesome. I have to thank the guys at [HowToNode.org](http://howtonode.org) for the idea in their [WheatJS](http://github.com/creationix/wheat) static site blog engine. Essentially, it all boils down to running the rather awesome [Google Code Prettyfy](http://code.google.com/p/google-code-prettify/) _serverside_.

The only remaining problem with the syntax highlighting is now nested &lt;code&gt; elements have to be escaped to display correctly in the final render.

<pre lang="javascript">
    // replace the raw code blocks with prettyfied html
    t = t.replace(/&lt;code&gt;[^&lt;]+&lt;\/code&gt;/g, function(code) {
        return prettyfy(code.match(/&lt;code&gt;([\s\S]+)&lt;\/code&gt;/)[1]);
    });
</pre>

Perhaps, in the future, a quick routine to fetch only the root code elements rather than blinding fetching all of them. Problem: more solved than before!
