
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , parts = require('./routes/parts')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ItemProvider = require('./itemprovider').ItemProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var itemProvider= new ItemProvider('localhost', 27017);

app.request.itemProvider = app.response.itemProvider = itemProvider;

// Routes

app.get('/', index.index);
app.get('/parts', parts.index);




app.get('/item/new', function(req, res){
    res.render('item_new', {
	title: 'New Item'
    });
});

app.post('/item/new', function(req, res){
    itemProvider.save({
	title: req.param('title'),
	name: req.param('name')
    }, function(error, docs){
	res.redirect('/')
    });
});


//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
