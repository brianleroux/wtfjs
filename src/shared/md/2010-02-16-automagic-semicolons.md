I’m certain that this will end all debate about where curly braces belong… right?

<pre lang="javascript">
    function laugh()
    {
      return
      {
        haha: "ha!"
      };
    }
    laugh();
    // returns undefined
</pre>

See also: [Automatic semicolon insertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Automatic_semicolon_insertion)
