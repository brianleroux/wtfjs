Maybe you want to deploy a code blog quickly. Maybe you want an excuse to play with NodeJS. I don't know what it is you are up to but here's a quick guide to building your own wtfjs. This requires a <a href="http://blog.heroku.com/archives/2010/4/30/node_js_feedback/">Heroku NodeJS</a> access, of course. 

```
    $ git clone git@github.com:brianleroux/wtfjs.git
    $ cd wtfjs/
    $ heroku create --stack beech 
    $ git push heroku master
```

You're done!
