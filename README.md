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
    |-lib
    | |
    | '-codeblog .................... the blog code ............ soon to be its own repo
    |   |
    |   |-lib ....................... dependencies ............. until pkg mgmt is stable in NodeJS land
    |   | |-express ................. web framework ............ http://expressjs.com
    |   | '-showdown ................ markdown ................. http://attacklab.net/showdown (hacked up to run serverside)
    |   |
    |   |-post.js ................... post model
    |   '-wtf.js .................... routes controller
    |
    |-public ........................ imgs, css and client js  
    |
    |-posts
    | |
    | '-2010-05-10-hello-world.md ... typical post format
    |
    |-views ......................... view templates
    '-server.js ..................... where it all begins
    
http://wtfjs.com was created by [@brianleroux](http://twitter.com/brianleroux). Everything here is under the WTFPL 2.0 license.