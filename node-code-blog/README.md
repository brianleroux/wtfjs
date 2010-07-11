node-code-blog
===

A pure JavaScript code blog backed up by Git and Node **v0.1.96-v0.1.98**. Everything you need (_and nothin you do not_) to get a simple coder friendly blog up and running _super fast_.

Features
---

- Posts are authored as basic Markdown and live in your Git repo.
- Posts with `<code>` elements are auto syntax highlighted.
- Automagic pagination and permalinks.
- RSS 2.0 feed.
- Fully theme-able with custom pages, templates client and serverside logic.
- Heroku NodeJS service friendly.

Quickstart
---

[Download the node-code-blog-example](http://github.com/brianleroux/node-code-blog-example) and from the root in your terminal run `node server.js`. Congrats on your new `node-code-blog`! 

The example `node-code-blog` directory structure looks like this:

    node-code-blog-example
    |
    |-node-code-blog ...................... This very library!
    |-posts ............................... Your blog posts go here.
    | '-yyyy-mm-dd-example-blog-post.md ... Typical post format.
    |
    '-server.js ........................... Heroku NodeJS friendly config.

Edit the config variables in `server.js` to suite your blog settings.

Posting
---

To post simply add a new Markdown file to the `/posts` directory. [Markdown reference here.](http://daringfireball.net/projects/markdown/) This makes it super easy to collaborate with other Git inclined folk.

Theming
---

Change themes with the theme setting in the config block in `server.js`. Available themes can be found under `lib/node-code-blog/themes`. 

Create your own theme by copying the default theme directory, renaming it and editing `/public/app.css` and the EJS templates found in `/views`. If its cool, you should fork the `node-code-blog` repo and contribute it back to the project, eh.

Adding pages
---
Its very easy to add new pages complete with serverside JavaScript logic to node-code-blog. Templates are basic EJS and the routing logic goes in `server.js`. For example, lets create a contact page. First, create this file `/node-code-blog/lib/node-code-blog-themes/yourtheme/views/contact.html.ejs` and add the following code:

    <h1>Contact <%= name %></h1>
    
    <p>You can reach me at: <%= email %></p>

Crack open `/server.js` and add the following route:

        require.paths.unshift("node-code-blog");
        require("node-code-blog");
        
        get('/contact', function() {
            this.display('contact.html.ejs', {
                name: 'brian'
                email:'spam@ham.com'
            });
        });
        
        init();
        
This code is saying: whenever there is a GET request to `/contact` display the `contact.html.ejs` template and pass it these local variables. EJS is super powerful too. Check out the wtfjs theme for more examples. And, of course, all this means _anything_ Node can do so can your `node-code-blog`. Gnarly, eh.

`node-code-blog` is [free software](http://wtfjs.com/license) extracted from the redevelopment of [wtfjs](http://wtfjs.com) by [Brian LeRoux](http://twitter.com/brianleroux).