$(function(){
    // change <code> into <pre class="sh_javascript_dom">
    $('code').each(function(){
        var node = $(this);
        
        node.hide()
            .after('<pre>')
            .next()
            .html(node.html())
            .addClass('sh_javascript_dom');
            
        node.remove();
    });
    
    // invoke clientside syntax highlighter
    sh_highlightDocument();
});