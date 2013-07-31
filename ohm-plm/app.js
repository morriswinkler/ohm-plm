
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , SectionModel = require('./models/part')
  , Section = mongoose.model('Section')
  , routes = require('./routes')
  , index = require('./routes/index')
  , parts = require('./routes/parts')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var MemoryStore = express.session.MemoryStore;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// session cookie
app.use(express.cookieParser());
app.use(express.session({
    secret: '1234567890QWERTY'
}));
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Database Connection

if ('development' == app.get('env')) {
  mongoose.connect('mongodb://localhost/ohm-plm');
} else {
  // insert db connection for production
}

// Routes

//app.get('/', index.index);
app.get('/', parts.index);

app.get('/part/', parts.index);
app.post('/part/addSection', parts.addSection);
app.post('/part/addPart', parts.addPart);




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

// Start Server w/ DB Connection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});

