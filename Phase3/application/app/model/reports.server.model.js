/*
 Database queries for REPORT related tasks
*/
var mysql = require('mysql'),
    dbconfig = require('../../config/mysql'),
    db = mysql.createConnection(dbconfig.connection),
    sqls = require('./sqls.server.model'),
    logger = require('../../config/logger');


// =====================================
// Retrieve category report ============
// =====================================
exports.getCategoryReport = function(done) {

  db.query(sqls.report(1), function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

// =====================================
// Retrieve user report ============
// =====================================
exports.getUserReport = function(done) {
    
  db.query(sqls.report(1), function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
