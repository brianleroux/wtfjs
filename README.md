<pre>    
    :::       ::::::::::::::::::::::::::::::::::::::::::: 
    :+:       :+:    :+:    :+:           :+:   :+:    :+:
    +:+       +:+    +:+    +:+           +:+   +:+       
    +#+  +:+  +#+    +#+    :#::+::#      +#+   +#++:++#++
    +#+ +#+#+ +#+    +#+    +#+           +#+          +#+
     #+#+# #+#+#     #+#    #+#       #+# #+#   #+#    #+#
      ###   ###      ###    ###        #####     ######## 
      ---------------------------------------------------
      A pure JavaScript code blog. 
</pre>    


share your wtfjs moment
---

It has never been easier to contribute a wtf to wtfjs.com!

- fork this repo
- add your wtf under /posts (format: yyyy-mm-dd-title.md)
- send a pull request

the code
---

Currently supported Node: **v0.1.96**.

I'm working on separating the blog from the code blog. In the meantime to run this code blog open your terminal and...    
    
    $ node server.js
    
Deploy your own code blog to Heroku. It's super simple:

    $ git push heroku master

The code is pretty straightforward. Hack away!

    wtfjs
    |
    |-node-code-blog
    | |-post.js ..................... post model
    | |-node-code-blog.js ........... routes
    | |
    | '-lib ......................... dependencies ............. until pkg mgmt is stable in NodeJS land
    |   |-express ................... web framework ............ http://expressjs.com
    |   |-express-clean-config ...... hacked express config .... a code blog mini dsl for config
    |   |-prettyfy .................. syntax highlighter ....... http://code.google.com/p/google-code-prettify
    |   |-showdown .................. markdown ................. http://attacklab.net/showdown 
    |   '-node-code-blog-themes ..... themes ................... user contributed themes node-code-blog
    |     '-wtfjs
    |       |-public ................ imgs, css and client js  
    |       '-views ................. view templates
    |
    |-posts
    | '-2010-05-10-hello-world.md ... a typical post format
    |
    '-server.js ..................... config, custom routes and app init
    
http://wtfjs.com was created by [@brianleroux](http://twitter.com/brianleroux). Everything here is under the [WTFPL 2.0 license](http://wtfjs.com/license).