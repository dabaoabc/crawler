var url = require('url');
var path = require('path');
var fs = require('fs');
var MIME_TYPES = require('./mime.js');
var express = require('express');
var session = require('express-session');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('../routes/routes.js');

var app = express();
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'dabaoabc',
    cookie: {maxAge: 3600000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, '../res')));

// // 没有挂载路径的中间件，应用的每个请求都会执行该中间件
// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// });

app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.username) {
        return res.redirect("/login");
    }
    next();
});
app.use(routes);

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