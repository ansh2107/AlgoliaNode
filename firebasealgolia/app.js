var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var algoliasearch = require('algoliasearch');
var http = require('http'),
    https = require('https');
    fs = require('fs');

var client = algoliasearch('GSLW7H4FX6', '6d38326fdc63c2715698c888b55eb2d2');

var Firebase = require('firebase');
// Connect to our Firebase contacts data
var fb = new Firebase('https://brilliant-fire-6680.firebaseio.com/results');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();







var sslOptions = {
  key: fs.readFileSync('./ssl/myserver.key'),
  cert: fs.readFileSync('./ssl/myserver.crt'),
  ca: fs.readFileSync('./ssl/mykey.crt'),
  requestCert: true,
  rejectUnauthorized: false
};
var secureServer = https.createServer(sslOptions,app).listen('8000', function(){
  console.log("Secure Express server listening on port 8000");
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});






module.exports = app;
