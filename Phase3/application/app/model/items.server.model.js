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

    db.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price,               item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name], function(err, result) {
        
        if (err) return done(err)
        done(null, result.insertId)
    })
}

// =====================================
// Get an ITEM =========================
// =====================================
exports.getItem = function(item, done) {
    var item2 = {
        //itemid: req.params.id
    }
    
    logger.debug('item.itemid = ' + item.itemid);

    db.query('SELECT * FROM ITEM WHERE `Item_ID` = ?',[item.itemid], function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}

// =====================================
// Retrieve searched ITEMS =============
// =====================================
exports.getItems = function(item, done) {
    var selectQuery = "SELECT * FROM ITEM WHERE `Category`=? \
AND `Cond`=? ";
    if (item.keyword != '') {
       selectQuery = selectQuery + "AND (`Item_Name` LIKE '%" + db.escape(item.keyword) + "%'  \
OR `Description` LIKE '%" + db.escape(item.keyword) + "%') "; 
    }
    if (item.minAuctionPrice > 0) {
       selectQuery = selectQuery + "AND `Min_Sale_Price` <= " + db.escape(item.minAuctionPrice); 
    }
    if (item.maxAuctionPrice > 0) {
       selectQuery = selectQuery + "AND `Min_Sale_Price` >= " + db.escape(item.maxAuctionPrice); 
    }

    logger.debug('SQL = ' + selectQuery);

    
    db.query(selectQuery, [item.category, item.condition], function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}

// =====================================
// RETRIVE ALL ITEMS ===================
// =====================================
exports.getAll = function(done) {
    db.query('SELECT * FROM ITEM', function (err, rows) {
        if (err) return done(err)
        done(null, rows)
    })
}