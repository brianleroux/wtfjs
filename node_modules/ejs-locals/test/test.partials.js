var express = require('express')
  , request = require('./support/http')
  , engine = require('../');

var app = express();
app.set('views',__dirname + '/fixtures');
app.engine('ejs', engine);

// this is not the default behavior, but you can set this
// if you want to load `layout.ejs` as the default layout
// (this was the default in Express 2.0 so it's handy for
// quick ports and upgrades)
app.locals({
  _layoutFile: true
})

app.locals.use(function(req,res){
  app.locals.hello = 'there';
})

app.get('/',function(req,res,next){
  res.render('index.ejs')
})

app.get('/no-layout',function(req,res,next){
  res.render('index.ejs',{_layoutFile:false})
})

app.get('/res-locals',function(req,res,next){
  res.render('locals.ejs',{hello:'here'})
})

app.get('/app-locals',function(req,res,next){
  res.render('locals.ejs')
})

app.get('/mobile',function(req,res,next){
  res.render('index.ejs',{_layoutFile:'mobile'})
})

app.get('/mobile.ejs',function(req,res,next){
  res.render('index.ejs',{_layoutFile:'mobile.ejs'})
})

app.get('/collection/_entry',function(req,res,next){
  res.render('collection.ejs',{name: 'entry', list:[{name:'one'},{name:'two'}]})
})

app.get('/collection/thing',function(req,res,next){
  res.render('collection.ejs',{name: 'thing', list:[{name:'one'},{name:'two'}]})
})

app.get('/collection/thing-path',function(req,res,next){
  res.render('collection.ejs',{name: 'path/to/thing', list:[{name:'one'},{name:'two'}]})
})

app.get('/with-layout',function(req,res,next){
  res.render('with-layout.ejs');
})

app.get('/with-layout-override',function(req,res,next){
  res.render('with-layout.ejs',{_layoutFile:false})
})

app.get('/with-include-here',function(req,res,next){
  res.render('with-include.ejs',{_layoutFile:false, hello:'here'});
})

app.get('/with-include-there',function(req,res,next){
  res.render('with-include.ejs',{_layoutFile:false});
})

app.get('/with-blocks',function(req,res,next){
  res.render('with-blocks.ejs',{_layoutFile:false});
})

app.get('/deep-inheritance',function(req,res,next){
  res.render('inherit-grandchild.ejs');
})

app.get('/deep-inheritance-blocks',function(req,res,next){
  res.render('inherit-grandchild-blocks.ejs');
})

describe('app',function(){

  describe('GET /',function(){
    it('should render with default layout.ejs',function(done){
      request(app)
        .get('/')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><h1>Index</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /no-layout',function(){
    it('should render without layout',function(done){
      request(app)
        .get('/no-layout')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<h1>Index</h1>');
          done();
        })
    })
  })

  describe('GET /res-locals',function(){
    it('should render "here"',function(done){
      request(app)
        .get('/res-locals')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><h1>here</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /app-locals',function(){
    it('should render "there"',function(done){
      request(app)
        .get('/app-locals')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><h1>there</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /mobile',function(){
    it('should render with mobile.ejs as layout',function(done){
      request(app)
        .get('/mobile')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals mobile</title></head><body><h1>Index</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /mobile.ejs',function(){
    it('should render with mobile.ejs as layout',function(done){
      request(app)
        .get('/mobile.ejs')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals mobile</title></head><body><h1>Index</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /collection/_entry',function(){
    it('should render _entry.ejs for every item with layout.ejs as layout',function(done){
      request(app)
        .get('/collection/_entry')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><ul><li>one</li><li>two</li></ul></body></html>');
          done();
        })
    })
  })

  describe('GET /collection/thing-path',function(){
    it('should render thing/index.ejs for every item with layout.ejs as layout',function(done){
      request(app)
        .get('/collection/thing-path')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><ul><li>one</li><li>two</li></ul></body></html>');
          done();
        })
    })
  })

  describe('GET /collection/thing',function(){
    it('should render thing/index.ejs for every item with layout.ejs as layout',function(done){
      request(app)
        .get('/collection/thing')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><ul><li>one</li><li>two</li></ul></body></html>');
          done();
        })
    })
  })

  describe('GET /with-layout',function(){
    it('should use layout.ejs when rendering with-layout.ejs',function(done){
      request(app)
        .get('/with-layout')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><h1>Index</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /with-layout-override',function(){
    it('should use layout.ejs when rendering with-layout.ejs, even if layout=false in options',function(done){
      request(app)
        .get('/with-layout-override')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><h1>Index</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /with-include-here',function(){
    it('should include and interpolate locals.ejs when rendering with-include.ejs',function(done){
      request(app)
        .get('/with-include-here')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><h1>here</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /with-include-there',function(){
    it('should include and interpolate locals.ejs when rendering with-include.ejs',function(done){
      request(app)
        .get('/with-include-there')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><h1>there</h1></body></html>');
          done();
        })
    })
  })

  describe('GET /with-blocks',function(){
    it('should arrange blocks into layout-with-blocks.ejs when rendering with-blocks.ejs',function(done){
      request(app)
        .get('/with-blocks')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<li><a href="hello.html">there</a></li><p>What\'s up?</p>© 2012');
          done();
        })
    })
  })

  describe('GET /deep-inheritance',function(){
    it('should recurse and keep applying layouts until done',function(done){
      request(app)
        .get('/deep-inheritance')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title></head><body><i>I am grandchild content.</i><b>I am child content.</b><u>I am parent content.</u></body></html>');
          done();
        })
    })
  })

  describe('GET /deep-inheritance-blocks',function(){
    it('should recurse and keep applying blocks to layouts until done',function(done){
      request(app)
        .get('/deep-inheritance-blocks')
        .end(function(res){
          res.should.have.status(200);
          res.body.should.equal('<html><head><title>ejs-locals</title><script src="gc.js"></script>\n<script src="c.js"></script><link rel="stylesheet" href="gc.css" />\n<link rel="stylesheet" href="c.css" /></head><body><i>I am grandchild content.</i><b>I am child content.</b><u>I am parent content.</u></body></html>');
          done();
        })
    })
  })

})
