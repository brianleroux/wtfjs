var connect = require('./');
var app = connect();

function delay(ms) {
  return function(req, res, next){
    setTimeout(next, ms);
  }
}

var set = true
setTimeout(function(){
  set = false;
  console.log('setting');
}, 3000);
app.use(connect.logger('dev'));
app.use(connect.staticCache());
app.use(function(req, res, next){
  if (set) {
    console.log('setting cookie');
    res.setHeader('Set-Cookie', 'name=tj');
  }
  next();
});
app.use(connect.static(__dirname, { maxAge: 100000 }));

app.listen(3000);

// 8500 without
// 8300 with
// 6100 with cookie 7500 without signed check