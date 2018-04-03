/*
 Database queries for BID related tasks
*/
var mysql = require('mysql'),
    dbconfig = require('../../config/mysql'),
    db = mysql.createConnection(dbconfig.connection),
    sqls = require('./sqls.server.model'),
    logger = require('../../config/logger');

// =====================================
// add a new BID =======================
// =====================================
exports.insert = function(req, item, done) {
  logger.debug('SQL = ' + sqls.bid(1));
  
  db.query(sqls.bid(1),[item.itemid], function(err, rows) {
        
    if (err) return done(err)
    
    if (!rows.length) {
      logger.debug('The auction date has been expired for this item.');
      done(null, false, req.flash('error', 'The auction date has been expired for this item.'));
    } else {
      logger.debug('SQL = ' + sqls.bid(2));
      db.query(sqls.bid(2),[item.username, item.itemid], function(err, rows) {

        if (err) return done(err)
        
        logger.debug('SQL = ' + sqls.bid(3));
        db.query(sqls.bid(3),[item.itemid], function(err, rows) {

          if (err) return done(err)
          done(null, true)
        })
      })
    }
  })
}
