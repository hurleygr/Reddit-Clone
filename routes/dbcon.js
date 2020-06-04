// var mysql = require('mysql');
// var pool = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'Fuckthis1!',
//   database        : ''
// });

// module.exports.pool = pool

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_hurleygr',
  password        : '1135',
  database        : 'cs290_hurleygr'
});

module.exports.pool = pool;;