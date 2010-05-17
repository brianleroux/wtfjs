Syntax highlighting seems like a solved problem. Over solved. It would appear that the production of Sinatra clones and Syntax Highlighters are escalating. Perhaps its a sign.

After struggling w/ the overly complex Chili jQuery plugin I had a second look at the classic Syntax Highlighter which, while palatable, feels like overkill. Its a bummer b/c I would prefer a highlighter than can deal w/ nested DOM elements. Pygments does all this but Heroku won't let play with the sandbox, and I didn't want to pre-process the markdown treating it like an intermediate format, so I settled on SHJS which has the right characteristics: lightweight, simple install and straightforward docs. 

Only caveat: it only works on _pre_ tags. Thus:

<code>
    $(function(){
        // change code elemnts into pre elements with class sh_javascript_dom
        $('code').each(function(){
            var node = $(this);
            node.hide()
                .after('pre tag would be here')
                .next()
                .html(node.html())
                .addClass('sh_javascript_dom');
            node.remove();
        });
        // invoke clientside syntax highlighter
        sh_highlightDocument();
    });
</code>

Not entirely hideous but plenty to wtf about. Inspect the actual code and compare to the embed above you'll notice I had to swap a nested _pre_ element with a string "pre tag would be here". It gets better: double line breaks mindfuck SHJS forcing it to create new nested pre tags. So no line double breaks. If that wasn't enough all the underscores in the class identifier have been removed. Daaamnit wtf?!

Problem: unsolved. - <a href="http://twitter.com/brianleroux">brianleroux</a>