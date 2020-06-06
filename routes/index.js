var express = require('express');
var router = express.Router();
var mysql = require('./dbcon.js')
// router.get('/reset',function(req,res,next){
//   console.log('mysql', mysql)
//   var context = {};
//   mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
//     console.log(err)
//     var createString = "CREATE TABLE workouts("+
//     "id INT PRIMARY KEY AUTO_INCREMENT,"+
//     "name VARCHAR(255) NOT NULL,"+
//     "reps INT,"+
//     "weight INT,"+
//     "date DATE,"+
//     "lbs BOOLEAN)";
//     console.log('createstring')
//     mysql.pool.query(createString, function(err){
//       context.results = "Table reset";
//       console.log(context)
//       res.render('index',context);
//     })
//   });
// });

/* Select Data */

function getData() {
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      console.log(err)
      next(err);
      return;
    }
    res.json(rows)
})}

router.get('/',function(req,res,next){
  //console.log(mysql)
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      console.log(err)
      next(err);
      return;
    }
    console.log(rows)
    context.results = rows;
    res.render('layout.hbs', context);
  });
});

/* Insert Data. */
router.post('/',function(req,res,next){
  console.log(req)
  var values = [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs]
  console.log('inserting', values)
  mysql.pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?,?,?,?,?)", values , function(err, result){
    if(err){
      console.log('err', err)
      next(err);
      return;
    }
    console.log('result', result)
    res.send('hello')
  })
})

/* Update Data. */
router.put('/', function(req, res, next) {
    var context = {};
    mysql.pool.query("UPDATE workouts SET name=?, done=?, due=? WHERE id=? ",
      [req.query.name, req.query.done, req.query.due, req.query.id],
      function(err, result){
      if(err){
        next(err);
        return;
      }
      context.results = "Updated " + result.changedRows + " rows.";
      res.send(result)
    });
  });

/* Delete Data. */
router.delete('/', function(req, res, next) {
  mysql.pool.query("DELETE FROM workouts WHERE id=?", )
  res.send()
});
module.exports = router;
