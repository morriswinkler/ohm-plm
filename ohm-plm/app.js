
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

// graphiscsmagick for image crop
var gm = require('gm')
  , resizeX = 150
  , resizeY = 150

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



app.post('/api/photos', function(req, res){
  //console.log(JSON.stringify(req.files));
  var serverPath = '/images/parts/' + req.files.userPhoto.name;
  var pathToServer = './public';

  require('fs').rename(
    //userPhoto is the input name
    req.files.userPhoto.path,
    pathToServer + serverPath,
    function(error){
      if(error){
        console.log(error)
        res.send({
          error: 'File uploaded cancelled, error.'
        });
        return;
      }

      res.send({
        path: serverPath
      });
    }
  )

})

app.post('/api/crop', function(req, res){
  var src = req.body.src;
  var name = req.body.name;
  var coords = req.body.data;
  var pathToServer = './public';

  gm(pathToServer + src).crop(coords.w, coords.h, coords.x, coords.y).scale(resizeX,resizeY).write(pathToServer + '/images/parts/cropped_' + name, function(err){
    if (!err){
      console.log("Image: " + name + " Cropped");
      res.send("success");
    } 
    else
    {
	console.log(err)
	res.send(err);
    }
  })
})


//app.get('/users', user.list);

// Start Server w/ DB Connection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});

