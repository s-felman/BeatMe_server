var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var compRouter = require('./routes/competition');
var mongoose= require('mongoose');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors())
app.use('/competition', compRouter);
app.use('/users', usersRouter);

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





//const mongodb = "mongodb+srv://ckmobile:password@nodetuts.qwlpv.mongodb.net/items-database?retryWrites=true&w=majority";
// const PORT = process.env.PORT || 3000;
// mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=>app.listen(PORT,console.log(`Server running on ${PORT}`)))
// .catch(err=>console.log(err));

module.exports = app;