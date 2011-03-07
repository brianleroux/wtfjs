highlight
==============

**highlight** for node.js is based on [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) parser and is meant to highlight code syntax in languages that are not known beforehand (*highlight* detects the used language automatically). This is especially important for pages in Markdown format - there's no easy way to know which language is actually used.

Installation
------------

Use `npm` package manager

    npm install highlight

Usage
-----

Include syntax highlighter

    var hl = require("highlight").Highlight;
    
highlight code

    html = hl.highlight("for(var i=0;i<10;i++)alert(i);");

use special tab replacing string (default is 4 spaces)

    html = hl.highlight(code_string, "<span>  </span>");

convert code only between &lt;code&gt; blocks (leave everything else as is)

    html = hl.highlight("<p>PHP:</p><code><?php echo 'Hello world!';?></code>", false, true);

Styles
------

**highlight** outputs HTML code with predefined CSS class names for different elements. This doesn't make a lot of sense by default (it's just a bunch of SPAN's) so you need to use a CSS file that sets the used color set for the highlighting. There's some sample CSS files in /lib/vendor/highlight.js/styles that can be used with no modification - just include one of the files in the page you are showing the highlighted code.

    <link rel="stylesheet" href="/path/to/styles/acetic.css"/>