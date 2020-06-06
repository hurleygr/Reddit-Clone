
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');


var handlebars = require('express-handlebars')


var app = express();
// var expressHbs =  require('express-handlebars');

// app.engine('.hbs', expressHbs({ defaultLayout: 'main', extname: '.hbs'}))
// app.set('view engine', '.hbs');

// var hbs = expressHbs.create({});


var helpers = require("./public/trim.js");

var hbs = handlebars.create({
      helpers: helpers,
  
      defaultLayout:'main'});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// register new function
// hbs.handlebars.registerHelper('trimDate', function(s) {
//   return s.slice(0,10);
// })

app.set('views', path.join(__dirname, 'views'));

app.set('port', 1137);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      
      res.render('layout.hbs',context)
    });
  });
});
    


const getData = (res) => {
  mysql.pool.query('SELECT * FROM workouts', (err, rows, fields) => {
    if(err){
      console.log(err)
      next(err);
      return;
    }
    res.json({rows: rows});
})};

app.get('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    context.results = rows;
    res.render('layout.hbs',context);
  });
});

/* Insert Data. */
app.post('/',function(req,res,next){
  var values = [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs]
  console.log('inserting', values)
  mysql.pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?,?,?,?,?)", values , (err, result) => {
    if(err){
      console.log('err', err)
      next(err);
      return;
    }
    getData(res);

  });
});

/* Update Data. */
app.put('/', function(req, res, next) {
    mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
      [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id],
      function(err, result){
      if(err){
        console.log('error', err)
        next(err);
        return;
      }
      getData(res)
    });
  });

/* Delete Data. */
app.delete('/', function(req, res, next) {
  mysql.pool.query("DELETE FROM workouts WHERE id=?", req.body.id, function(err, result) {
    if(err){
      next(err);
      return;
    }
    getData(res)
  })
});

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
  res.render('error.hbs');
});
module.exports = app;
