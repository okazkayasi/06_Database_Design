/*
 Database queries for ITEM related tasks
*/
var mysql = require('mysql'),
    dbconfig = require('../../config/mysql'),
    db = mysql.createConnection(dbconfig.connection),
    sqls = require('./sqls.server.model'),
    logger = require('../../config/logger');

// =====================================
// ADD NEW ITEM ========================
// =====================================
exports.insert = function(req, item, done) {
  logger.debug('SQL = ' + sqls.item(1));
  
  db.query(sqls.item(1),[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price,               item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name], function(err, rows) {
        
    if (err) return done(err)
    done(null, rows.insertId)
  })
}

// =====================================
// Update ITEM ========================
// =====================================
exports.update = function(req, item, done) {
  logger.debug('items.server.model.update: start = ' + item.itemid);
  logger.debug('SQL = ' + sqls.item(2));

  db.query(sqls.item(2), [item.itemid], function (err, rows) {
      if (err) return done(err)
      if (!rows.length) {
          logger.debug('items.server.model.update: no item is found');

          done(null, false, req.flash('error', 'No item is update.')); // req.flash is the way to set flashdata using connect-flash
      } else {
          logger.debug('items.server.model.update: the item is found');

          db.query(sqls.item(3),[db.escape(item.description), item.itemid], function(err, rows) {
              if (err) return done(err);

              done(null, true);
          });
      }
  });
    
}

// =====================================
// Retrieve categories =================
// =====================================
exports.getCategories = function(done) {
  logger.debug('SQL = ' + sqls.category(1));
  
  db.query(sqls.category(1), function (err, rows) {
      if (err) return done(err)
      done(null, rows)
  })
}


// =====================================
// Get an ITEM =========================
// =====================================
exports.getItem = function(item, done) {
  logger.debug('item.itemid = ' + item.itemid);
  logger.debug('SQL = ' + sqls.item(2));

  db.query(sqls.item(2),[item.itemid], function (err, rows) {
      if (err) return done(err)
      done(null, rows)
  })
}

// =====================================
// Retrieve searched ITEMS =============
// =====================================
exports.getItems = function(item, done) {
  var selectQuery = '1=1 '; // = sqls.item(4);  //"SELECT * FROM ITEM WHERE 1=1 ";

  logger.debug('SQL = ' + sqls.item(4));

  if (item.keyword != '') {
     selectQuery = selectQuery + "AND (`Item_Name` LIKE '%" + db.escape(item.keyword) + "%'  \
OR `Description` LIKE '%" + db.escape(item.keyword) + "%') "; 
  }
  if (item.category != '') {
     selectQuery = selectQuery + "AND `Category` = '" + db.escape(item.category) + "'"; 
  }
  if (item.condition != '') {
     selectQuery = selectQuery + "AND `Cond` <= " + db.escape(item.condition); 
  }
  if (item.minAuctionPrice > 0) {
     selectQuery = selectQuery + "AND `Min_Sale_Price` <= " + db.escape(item.minAuctionPrice); 
  }
  if (item.maxAuctionPrice > 0) {
     selectQuery = selectQuery + "AND `Min_Sale_Price` >= " + db.escape(item.maxAuctionPrice); 
  }

  logger.debug('SQL = ' + selectQuery);


  db.query(sqls.item(4), [selectQuery], function (err, rows) {
      if (err) return done(err)
      done(null, rows)
  })
}


// =====================================
// Retrieve expired auction ITEMS ======
// =====================================
exports.getAuctionResults = function(username, done) {
  logger.debug('SQL = ' + sqls.item(5));

  db.query(sqls.item(5), [username], function (err, rows) {
      if (err) return done(err)
      done(null, rows)
  })
}
