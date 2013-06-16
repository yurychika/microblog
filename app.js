
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path'),
  util = require('util'),
  db = require('./models/db');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {
	layout: true
});


// app.use(function(req, res){
// 	console.log('this is the start of the request');
// });

app.use(function(req, res, next){
	console.log('this is the start of the request');
	next();

});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
// app.use(express.router(routes));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res){
	console.log('this is the start of the request');
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);
// app.get('/', function(req, res, next){
// 	console.log('get all routers');
// 	// res.send(util.inspect(req));
// 	// res.send('params is:' + req.params.name);

// 	res.send('params is:' + req.param('name') + ' ' + req.query.name);
// 	// next();
// });
// app.get('/', routes.index);
// app.get('/users', user.list);
// app.get('/stylesheets/style.css', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
