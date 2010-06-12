node-code-blog
===

A pure JavaScript code blog backed up by Git and Node: **v0.1.96**. Everything you need (_and nothin you do not_) to get a simple coder friendly blog up and running _super fast_.

Features
---

- Posts are authored as basic Markdown and live in your Git repo.
- Posts with `<code>` elements are auto syntax highlighted.
- Automagic pagination and permalinks.
- RSS 2.0 feed.
- Heroku friendly.

Quickstart
---

[Download the example node-code-blog]() and from the root in your terminal run `node server.js`. Congrats on your new `node-code-blog`! 

Maintainable start
---

[Copy this Gist]() and run in your terminal with `./generate-code-blog` or follow these steps:

1. Download the example CodeBlog and delete the `node-code-blog` folder. 
2. Initialize it as a Git Repo.
3. Add node-code-blog as a Git Submodule.
4. Push it to your GitHub and/or Heroku deployment.
5. Happy dance! 

The example `node-code-blog` directory structure looks like this:

    node-code-blog-example
    |
    |-node-code-blog ...................... This very library!
    |-posts ............................... Your blog posts go here.
    | '-yyyy-mm-dd-example-blog-post.md ... Typical post format.
    |
    '-server.js ........................... Heroku NodeJS friendly config.

Posting
---

To post simply add a new Markdown file to the `/posts` directory. [Markdown reference here.](http://daringfireball.net/projects/markdown/)

Theming
---

Themes are found under `lib/node-code-blog/themes`. Create your own theme by copying the default theme directory, renaming it and editing `/public/app.css` and the EJS templates found in `/views`. 

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
        
This is saying: whenever you there is a GET request to `/contact` display the `contact.html.ejs` template and pass it these local variables. EJS is super powerful too. Check out the wtfjs theme for more examples. And, of course, all this means _anything_ Node can do so can your `node-code-blog`. Gnarly, eh.

`node-code-blog` is [free software](http://wtfjs.com/license) extracted from the redevelopment of [wtfjs](http://wtfjs.com) by [Brian LeRoux](http://twitter.com/brianleroux).