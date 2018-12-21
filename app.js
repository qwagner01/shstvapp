var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1bnsajR4ySnuXZLLRkoVroenfnf6ULfa-6_9H2t0yD0Q');
var schedule = []

doc.useServiceAccountAuth(creds, function(err) {
  if (err) {
    console.log("Auth error: ", err)
  }
  doc.getRows(1, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      schedule.push({
        period: rows[i].period,
        start: rows[i].start,
        end: rows[i].end,
        lunch: rows[i].lunch
      })
    }
    // console.log(schedule);
  })
});

var app = express();

// view engine setup
app.locals.basedir = path.join(__dirname, 'views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', { title: 'SHSTVApp', schedule: schedule });
})

app.get('/schedule', function(req, res) {
  const example = {
    "A": [
        { period: '1',
          start: '07:30 A.M.',
          end: '08:20 A.M.',
          lunch: '0' },
        { period: '2',
          start: '08:25 A.M.',
          end: '09:45 A.M.',
          lunch: '0' },
        { period: '3',
          start: '09:50 A.M.',
          end: '10:40 A.M.',
          lunch: '0' },
        { period: '5',
          start: '10:45 A.M.',
          end: '11:15 A.M.',
          lunch: '1' },
        { period: '5',
          start: '11:20 A.M.',
          end: '11:50 A.M.',
          lunch: '2' },
        { period: '5',
          start: '11:55 A.M.',
          end: '12:25 P.M.',
          lunch: '3' },
        { period: '8',
          start: '12:30 P.M.',
          end: '01:20 P.M.',
          lunch: '0' },
        { period: '7',
          start: '01:25 P.M.',
          end: '02:15 P.M.',
          lunch: '0' }
    ],
    "B": [

    ]
  }
  res.send(example)
})

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
