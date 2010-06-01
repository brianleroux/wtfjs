/*$(function(){
    // change <code> into <pre class="sh_javascript_dom">
    $('code').each(function(){
        var node = $(this)
        ,   attr = node.attr('class') || 'sh_javascript_dom';
        
        
        node.hide()
            .after('<pre>')
            .next()
            .html(node.html())
            .addClass(attr);
            
        node.remove();
    });
    
    // invoke clientside syntax highlighter
    sh_highlightDocument();
});*/