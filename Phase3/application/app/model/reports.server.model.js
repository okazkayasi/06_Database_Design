/*
 Database queries for ITEM related tasks
*/
var mysql = require('mysql'),
    dbconfig = require('../../config/mysql'),
    db = mysql.createConnection(dbconfig.connection),
    logger = require('../../config/logger');


// =====================================
// Retrieve category report ============
// =====================================
exports.getCategoryReport = function(done) {
    var selectQuery = "SELECT * FROM CATEGORY";
    
    db.query(selectQuery, function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}

// =====================================
// Retrieve user report ============
// =====================================
exports.getUserReport = function(done) {
    var selectQuery = "SELECT * FROM CATEGORY";
    
    db.query(selectQuery, function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}
