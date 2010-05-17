Hello World
-----------

At first, wtfjs was a silly little thought experiment. Almost like a solution log except documenting potential traps instead of, ya know, actual solutions! I set the whole thing up in 10 minutes w/ Tumblr and the help of GitHub's awesome Gists. This served us well enough to get things started but of course there where aspects of wtfjs that could be improved. The rss feed didn't show the code because it came from a gist embed. Hosting the site utilizing JavaScript on the server is another obvious improvement. For purity. And science. 

Anyhow, welcome to the new blog. Here's the score:

- 100% cloud friendly SSJS. Deployed on Heroku's new fabulous NodeJS service.
- Microframework! Utilizes the awesome sauce that is ExpressJS.
- Totally open source. Fork me GitHub.

Sure, there were a few wtf's along the way. Heroku literally just squeezed NodeJS hosting before Joyent a few short weeks ago and it is not without rough edges. 

What more is there to say? Lots. Improved workflow for contribution. A deeper look at the app code here.

<code>
    get("/about", function(){
        this.render("about.html.ejs");
    });
</code>

Looks nice, eh! You can see this source here. That's right. No database. Just simple markdown files.

What did I learn?

- package mgmt is a fuck up in ssjs
- both heroku and express have awesome communities / when it wasn't documented they helped
- the future is near. blog can be forked and deployed in a matter of a minute

Have fun! - <a href="http://twitter.com/brianleroux">brianleroux</a>