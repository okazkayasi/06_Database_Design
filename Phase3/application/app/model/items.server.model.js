/*
 Database queries for ITEM related tasks
*/
var dbconfig = require('./database'),
	mysql = require('mysql');

var db = mysql.createConnection(dbconfig.connection);

// =====================================
// ADD NEW ITEM ========================
// =====================================
exports.create = function(itemname, description, Cond, Returnable, Min_Sale_Price, Get_It_Now_Price, Auction_End_Datetime, Category, Lister_Name) {
  var item = [itemname, description, Cond, Returnable, new Date().toISOString(), Min_Sale_Price, Get_It_Now_Price, Auction_End_Datetime, Category, Lister_Name]
  
  var insertQuery = "INSERT INTO ITEM ( \
  `Item_Name`, `Description`, `Cond`, `Returnable`, `Auction_Start_Datetime`, `Min_Sale_Price`, \
  `Get_It_Now_Price`, `Auction_End_Datetime`, `Category`, `Lister_Name` ) values (?,?,?,?,?,?,?,?,?,?)";

  db.get().query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name], function(err, result) {
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