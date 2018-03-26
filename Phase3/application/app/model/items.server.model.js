/*
 Database queries for ITEM related tasks
*/
var mysql = require('mysql'),
    dbconfig = require('../../config/mysql'),
    db = mysql.createConnection(dbconfig.connection),
    logger = require('../../config/logger');

// =====================================
// ADD NEW ITEM ========================
// =====================================
exports.create = function(item, done) {
  /*var item2 = [itemname, description, Cond, Returnable, new Date().toISOString(), Min_Sale_Price, Get_It_Now_Price, Auction_End_Datetime, Category, Lister_Name]
  */
  var insertQuery = "INSERT INTO ITEM ( \
  `Item_Name`, `Description`, `Cond`, `Returnable`, `Auction_Start_Datetime`, `Min_Sale_Price`, \
  `Get_It_Now_Price`, `Auction_End_Datetime`, `Category`, `Lister_Name` ) values (?,?,?,?,?,?,?,?,?,?)";

  db.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name], function(err, result) {
    if (err) return done(err)
    done(null, result.insertId)
  })
}

// =====================================
// RETRIVE ALL ITEMS ===================
// =====================================
exports.getAll = function(done) {
  db.get().query('SELECT * FROM ITEM', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}