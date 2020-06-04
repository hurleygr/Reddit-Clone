// form with inputs for name of exercise, reps, weight, and date
// submit action would be post to insert route
// edit would be post to update route
// after both need to get select route again. or just insert/delete row, update whatever. but what about when the site is revisited? i guess order doesn't matter.
// but how to avoid adding stuff to table that is already there. is that ever even a worry. 
// do i need to edit in separate page?
// database to contain those
// insert delete update queries
// don't need to pull from database because everything entered in form is put in table?
// table that shows that data
// buttons to edit and delete every row
// edit could just do an update and manually change table. but database rows don't have to be unique
// so table would need primary key?

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
