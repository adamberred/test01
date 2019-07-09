// © COPYRIGHT Adam BERRED 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var upload = require("express-fileupload")
var http = require('http').Server(app);
var io = require('socket.io')(http);



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var publicationRouter = require('./routes/publication');
var authRouter = require('./routes/auth')
var messageRouter = require('./routes/message')
var siteRouter = require("./routes/site")


var app = express();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images' , express.static(__dirname+'/public/images'))
app.use('/videos' , express.static(__dirname+'/public/videos'))
app.use('/files' , express.static(__dirname+'/public/files'))

app.use('/', indexRouter);
app.use('/message', messageRouter);
app.use('/users', usersRouter);
app.use('/publication',publicationRouter)
app.use('/auth',authRouter)
app.use('/site',siteRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
