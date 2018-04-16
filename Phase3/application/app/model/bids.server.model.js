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
  
  // check if auction end date earlier than now
  db.query(sqls.bid(1),[item.itemid], function(err, rows) {
        
    if (err) return done(err)
    
    if (!rows.length) {
      logger.debug('The auction date has been expired for this item.');
      return done(null, false, req.flash('error', 'The auction date has been expired for this item.'));
      
    } else {
      // check if the owner of the item is trying to bid
      logger.debug('SQL = ' + sqls.item(7));
      db.query(sqls.item(7),[item.username, item.itemid], function(err, rows) {
        if (err) return done(err)
        
        if (rows.length) {
          logger.debug('You cannot bid on the item you registered');
          return done(null, false, req.flash('error', 'You cannot bid on the item you registered'));
          
        } else {
        
          // insert a new bid
          logger.debug('SQL = ' + sqls.bid(2));
          db.query(sqls.bid(2),[item.username, item.itemid], function(err, rows) {

            if (err) return done(err)

            // update the auction end date to now
            logger.debug('SQL = ' + sqls.item(6));
            db.query(sqls.item(6),[item.itemid], function(err, rows) {

              if (err) return done(err)
              done(null, true)
            })
          })
        }
        
      })
    }
  })
  
};

exports.newBid = function (req,item,done) {
    //logger.debug('SQL = ' + sqls.item(7));
    logger.debug('SQL111 = ' + sqls.bid(3));
    // this part will be in bids.server.model
    logger.debuG('bid = ' + JSON.stringify(item));
    db.query(sqls.bid(3), [item.username, item.itemid, item.bidamount], function (err, rows) {
      if (err) return done(err)
      done(null,true)
    });
};
