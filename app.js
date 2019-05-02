const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mongoConnectionUri = 'mongodb://autonline:is0zRqGcfl0aoYau@cluster0-shard-00-00-f6idp.mongodb.net:27017,cluster0-shard-00-01-f6idp.mongodb.net:27017,cluster0-shard-00-02-f6idp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(mongoConnectionUri, { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const car = require('./routes/car');
const classifiers = require('./routes/classifiers');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, '/dist/autonline')));
app.use('/car', express.static(path.join(__dirname, '/dist/autonline')));
app.use('/cars', express.static(path.join(__dirname, '/dist/autonline')));
app.use('/api/car', car);
app.use('/api/classifier', classifiers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

