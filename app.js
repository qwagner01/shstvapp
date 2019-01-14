var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1bnsajR4ySnuXZLLRkoVroenfnf6ULfa-6_9H2t0yD0Q');
var A = []
var B = []
var C = []
var D = []
var info = []
var special = []

doc.useServiceAccountAuth(creds, function(err) {
  if (err) {
    console.log("Auth error: ", err)
  }
  doc.getRows(1, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      A.push({
        period: rows[i].period,
        start: rows[i].start,
        end: rows[i].end,
        lunch: rows[i].lunch,
        num: rows[i].numofclassesandwaves,
        letter: "A"
      })
    }
  })
  doc.getRows(2, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      B.push({
        period: rows[i].period,
        start: rows[i].start,
        end: rows[i].end,
        lunch: rows[i].lunch,
        num: rows[0].numofclassesandwaves,
        letter: "B"
      })
    }
  })
  doc.getRows(3, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      C.push({
        period: rows[i].period,
        start: rows[i].start,
        end: rows[i].end,
        lunch: rows[i].lunch,
        num: rows[0].numofclassesandwaves,
        letter: "C"
      })
    }
  })
  doc.getRows(4, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      D.push({
        period: rows[i].period,
        start: rows[i].start,
        end: rows[i].end,
        lunch: rows[i].lunch,
        num: rows[0].numofclassesandwaves,
        letter: "D"
      })
    }
  })
  doc.getRows(5, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      info.push({
        letter: rows[0].letter,
        special: rows[0].specialschedule,
        image: rows[i].image,
        video: rows[0].video
      })
    }
  })
  doc.getRows(6, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      special.push({
        period: rows[i].period,
        start: rows[i].start,
        end: rows[i].end,
        lunch: rows[i].lunch,
        num: rows[i].numofclassesandwaves,
        letter: "special schedule"
      })
    }
  })
});

var app = express();
var request = require('request')

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
  //res.send(info[0].letter);
  if (info[0].letter==="A") { 
    schedule = A
  }
  else if (info[0].letter==="B") { 
    schedule = B
  }
  else if (info[0].letter==="C") { 
    schedule = C
  }
  else if (info[0].letter==="D") { 
    schedule = D
  }
  else if (info[0].special==="yes" || "Yes") { 
    schedule = special
  }
  res.render('index', { title: 'SHSTVApp', schedule:schedule, info:info});
});

app.get('/articles', function(req,res) {
  content = request.get("https://inkscraper.herokuapp.com", function(err, response, body) {
    res.send(body);
  })
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
