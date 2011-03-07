/* node-highlight is based on highlight.js (see vendor/highlight.js)       */
/* usage: html = require("highlight").Highlight(code_string);              */
/* NB! You also need to include a CSS file from vendor/highlight.js/styles */

// load syntax highlighter
var hljs = require("./vendor/highlight.js/highlight.js").hljs;

// load langs
require("./vendor/highlight.js/languages/cs.js").lang(hljs);
require("./vendor/highlight.js/languages/python.js").lang(hljs);
require("./vendor/highlight.js/languages/mel.js").lang(hljs);
require("./vendor/highlight.js/languages/perl.js").lang(hljs);
require("./vendor/highlight.js/languages/axapta.js").lang(hljs);
require("./vendor/highlight.js/languages/cpp.js").lang(hljs);
require("./vendor/highlight.js/languages/sql.js").lang(hljs);
require("./vendor/highlight.js/languages/smalltalk.js").lang(hljs);
require("./vendor/highlight.js/languages/profile.js").lang(hljs);
require("./vendor/highlight.js/languages/bash.js").lang(hljs);
require("./vendor/highlight.js/languages/lua.js").lang(hljs);
require("./vendor/highlight.js/languages/html-xml.js").lang(hljs);
require("./vendor/highlight.js/languages/renderman.js").lang(hljs);
require("./vendor/highlight.js/languages/1c.js").lang(hljs);
require("./vendor/highlight.js/languages/delphi.js").lang(hljs);
require("./vendor/highlight.js/languages/dos.js").lang(hljs);
require("./vendor/highlight.js/languages/django.js").lang(hljs);
require("./vendor/highlight.js/languages/vbscript.js").lang(hljs);
require("./vendor/highlight.js/languages/ini.js").lang(hljs);
require("./vendor/highlight.js/languages/apache.js").lang(hljs);
require("./vendor/highlight.js/languages/nginx.js").lang(hljs);
require("./vendor/highlight.js/languages/ruby.js").lang(hljs);
require("./vendor/highlight.js/languages/css.js").lang(hljs);
require("./vendor/highlight.js/languages/lisp.js").lang(hljs);
require("./vendor/highlight.js/languages/java.js").lang(hljs);
require("./vendor/highlight.js/languages/javascript.js").lang(hljs);
require("./vendor/highlight.js/languages/php.js").lang(hljs);
require("./vendor/highlight.js/languages/diff.js").lang(hljs);
require("./vendor/highlight.js/languages/avrasm.js").lang(hljs);
require("./vendor/highlight.js/languages/parser3.js").lang(hljs);
require("./vendor/highlight.js/languages/scala.js").lang(hljs);
require("./vendor/highlight.js/languages/tex.js").lang(hljs);


/**
 * highlight(text, tabReplace, useCodeBlocks) -> HTML
 * - text (String): text to be highlighted
 * - tabReplace (String): defaults to 4 spaces if none, replaces \t chars
 * - useCodeBlocks (Boolean): If TRUE use only text between <code> and </code>
 *
 * Highlights program code inside a string by setting appropriate CSS class
 * elements.
 **/
this.Highlight = function(text, tabReplace, useCodeBlocks){
    tabReplace = tabReplace || '    ';
    if(!!useCodeBlocks){
        // JS regexpes have some multiline issues, so we temporarily remove them
        return text.replace(/\n/g,'\uffff').replace(/<code>(.*?)<\/code>/gm, function(original, source){
            return '<code>'+hljs.highlightText(source.replace(/\uffff/g,"\n"), tabReplace)+'</code>';
        }).replace(/&amp;(\w+;)/g,'&$1').replace(/\uffff/g,"\n");
    }else
        return hljs.highlightText(text, tabReplace);
}