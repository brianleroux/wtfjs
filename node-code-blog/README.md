node-code-blog
===

A pure JavaScript code blog backed up by Git and Node: **v0.1.96**. 

Features
---

- Posts are authored as basic Markdown and live in your Git repo.
- Posts with `<code>` elements are auto syntax highlighted.
- Automagic pagination and permalinks.
- RSS 2.0 feed.
- Heroku friendly.
- Everything you need (_and nothin you do not_) to get a simple code centric blog up and running _fast_.

Quickstart
---

[Download the example CodeBlog]() and in the root run `node server.js`. Congrats on your new `node-code-blog`! 

Maintainable start
---

[Copy this Gist]() and run in your terminal with `./generate-code-blog` or follow these steps:

1. Download the example CodeBlog and delete the `lib/codeblog` folder. 
2. Initialize it as a Git Repo.
3. Add codeblog as a Git Submodule to the lib/codeblog folder.
4. Push it to GitHub and/or Heroku.
5. Happy dance! 

The example `node-code-blog` directory structure looks like this:

    appname
    |
    |-lib
    | '-node-code-blog .................... This very library!
    |
    |-posts ............................... Your blog posts go here.
    | '-yyyy-mm-dd-example-blog-post.md ... A typical post.
    |
    |-public .............................. Static files. 
    | |-app.css
    | |-app.js
    | '-favicon.ico
    |
    |-views ............................... View templates.
    | |-about.html.ejs
    | |-archive.html.ejs
    | |-index.html.ejs
    | |-layout.html.ejs
    | '-post.html.ejs
    |
    '-server.js ........................... Heroku NodeJS friendly config.

Posting
---

To post simply add a new Markdown file to the `/posts` directory. Markdown reference here. 

Theming
---

Create your own theme by modifying `/public/app.css` and the EJS templates found in `/views`. 

Adding pages
---
Its very easy to add new pages complete with serverside JavaScript logic to CodeBlog. Lets create a contact page. First, create a file like so `/views/contact.html.ejs` and add the following code:

    <h1>Contact <%= name %></h1>
    
    <p>You can reach me at: <%= email %></p>

Crack open `/server.js` and add the following [ExpressJS](http://expressjs.com) compliant route:

        require.paths.unshift("lib/codeblog");
        require("codeblog");
        
        get('/contact', function(){
            render('contact.html.ejs', {locals:{
                name: 'brian'
                email:'spam@ham.com'
            }});
        });
        
        init();
        
Of course this means _anything_ Node can do so can your `node-code-blog`. Gnarly, eh.

`node-code-blog` is [free software]() extracted from the redevelopment of [wtfjs](http://wtfjs.com) by [Brian LeRoux](http://twitter.com/brianleroux).