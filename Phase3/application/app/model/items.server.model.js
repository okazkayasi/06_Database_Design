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
exports.insert = function(req, item, done) {
    var insertQuery = "INSERT INTO ITEM ( \
        `Item_Name`, `Description`, `Cond`, `Returnable`, `Auction_Start_Datetime`, `Min_Sale_Price`, \
        `Get_It_Now_Price`, `Auction_End_Datetime`, `Category`, `Lister_Name` ) values (?,?,?,?,?,?,?,?,?,?)";

    db.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price,               item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name], function(err, rows) {
        
        if (err) return done(err)
        done(null, rows.insertId)
    })
}

// =====================================
// Update ITEM ========================
// =====================================
exports.update = function(req, item, done) {
    var selectQuery = "SELECT * FROM ITEM WHERE `Item_ID`=?";
    
    logger.debug('items.server.model.update: start = ' + item.itemid);
    
    db.query(selectQuery, [item.itemid], function (err, rows) {
        if (err) return done(err)
        if (!rows.length) {
            logger.debug('items.server.model.update: rows.length is 0');
                         
            done(null, false, req.flash('error', 'No item is update.')); // req.flash is the way to set flashdata using connect-flash
        } else {
            var updateQuery = "UPDATE ITEM \
            SET `Description`=? \
            WHERE `Item_ID`=? ";
            
            logger.debug('items.server.model.update: the item is found');

            db.query(updateQuery,[db.escape(item.description), item.itemid], function(err, rows) {
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
    var selectQuery = "SELECT * FROM CATEGORY";
    
    db.query(selectQuery, function (err, rows) {
        if (err) return done(err)
        done(null, rows)
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
    var selectQuery = "SELECT * FROM ITEM WHERE 1=1 ";
    
    if (item.keyword != '') {
       selectQuery = selectQuery + "AND (`Item_Name` LIKE '%" + db.escape(item.keyword) + "%'  \
OR `Description` LIKE '%" + db.escape(item.keyword) + "%') "; 
    }
    if (item.category != '') {
       selectQuery = selectQuery + "AND `Category` = '" + db.escape(item.category) + "'"; 
    }
    if (item.condition != '') {
       selectQuery = selectQuery + "AND `Cond` = " + db.escape(item.condition); 
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