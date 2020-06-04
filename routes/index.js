var express = require('express');
var router = express.Router();
var mysql = require('./dbcon.js')
router.get('/reset',function(req,res,next){
  console.log('mysql', mysql)
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    console.log(err)
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    console.log('createstring')
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      console.log(context)
      res.render('index',context);
    })
  });
});

/* Select Data */
router.get('/',function(req,res,next){
  console.log(mysql)
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    console.log(context.results)
    res.render('layout', context);
  });
});

/* Insert Data. */
router.post('/',function(req,res,next){
  var context = {};
  console.log('inserting', req.body, req.query)
  values = [req.body.Exercise, req.body.Reps, req.body.Weight, req.body.Date, req.body.Unit]
  mysql.pool.query("INSERT INTO workouts VALUES ($1, $2, $3 $4, $5)", values, function(err, result){
    if(err){
      next(err);
      return;
    }
    console.log('insert result', result)
    context = req.body
    res.render('layout',context);
  });
});

/* Update Data. */
router.post('/update', function(req, res, next) {
    var context = {};
    mysql.pool.query("UPDATE workouts SET name=?, done=?, due=? WHERE id=? ",
      [req.query.name, req.query.done, req.query.due, req.query.id],
      function(err, result){
      if(err){
        next(err);
        return;
      }
      context.results = "Updated " + result.changedRows + " rows.";
      res.render('layout',context);
    });
  });

/* Delete Data. */
router.get('/delete', function(req, res, next) {
  res.render('layout', context);
});
module.exports = router;
