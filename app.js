// (1), (2), (3) create and export the app object

var createError = require('http-errors');
var express = require('express'); // (1)
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Imports modules from index.js and users.js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Import routes for "catalog" area of site
const catalogRouter = require("./routes/catalog");

var app = express();  // (2)

// Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "<mongodb url here>";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Add the middleware libraries that we imported above
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add our route-handling code that we imported above
app.use('/', indexRouter);
app.use('/users', usersRouter);
// Add catalog routes to middleware chain.
app.use("/catalog", catalogRouter);

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

module.exports = app; // (3) aka allow it to be imported to www
