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

I'm debating separating the blog from the code blog. If there's interest; I'll do it. In the meantime to run this code blog open your terminal and...    
    
    $ node server.js
    
Deploy your own code blog to Heroku. It's super simple:

    $ git push heroku master

The code is pretty straightforward. Hack away!

    wtfjs
    |
    |-lib
    | |-express ........................... web framework ............ http://expressjs.com
    | |-showdown .......................... markdown ................. http://attacklab.net/showdown (hacked up to run serverside)
    | '-wtfjs ............................. the blog code ............ Perhaps this should be its own git repo?
    |   |-public .......................... imgs, css and client js 
    |   |-views ........................... view templates
    |   |-post.js ......................... post model
    |   '-wtf.js .......................... routes controller
    | 
    |-posts
    | '-2010-05-10-hello-world.md ........ typical post format
    |
    '-server.js .......................... where it all begins
    
http://wtfjs.com was created by [@brianleroux](http://twitter.com/brianleroux). Everything here is under the WTFPL 2.0 license.