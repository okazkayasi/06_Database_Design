/*
 SQL queries for all tasks
*/
var logger = require('../../config/logger');

// =====================================
// SQL queries related to USER =========
// =====================================
exports.user = function(queryId) {
    
  switch (queryId) {
    case 1:  // check if the same username already exists
      return "SELECT * FROM USER WHERE username = ?";
      break;
    case 2:  // Register a new USER
      return "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) \
              values (?,?,?,?)";
      break;
    case 3:  // Authenticate the user
      return "SELECT u.*, a.Position \
              FROM USER u LEFT JOIN ADMIN_USER a ON u.Username = a.Username \
              WHERE u.Username = ?";
      break;
    default:
      return "";
  }
  
}

// =====================================
// SQL queries related to ITEM =========
// =====================================
exports.item = function(queryId) {
    
  switch (queryId) {
    case 1:  // add a new ITEM
      return "INSERT INTO ITEM ( \
              `Item_Name`, `Description`, `Cond`, `Returnable`, `Auction_Start_Datetime`, `Min_Sale_Price`, \
              `Get_It_Now_Price`, `Auction_End_Datetime`, `Category`, `Lister_Name` ) \
            values (?,?,?,?,?,?,?,?,?,?)";
      break;
    case 2:  // search an ITEM by item_id
      return "SELECT * FROM ITEM WHERE `Item_ID`=?"
      break;
    case 3:  // update the description of an item
      return "UPDATE ITEM \
              SET `Description`=? \
              WHERE `Item_ID`=? ";
      break;
    case 4:  // search ITEM(s) by multiple conditions
            // conditions are managed in the business logic

      return "SELECT Item_ID, Item_Name, Highest_Bid as Current_Bid, Current_Bidder as Username, Get_It_Now_Price, Auction_End_Datetime   \
              FROM   (SELECT  ITEM.Item_ID, ITEM.Item_Name, Q.Highest_Bid, Q.Current_Bidder, ITEM.Get_It_Now_Price, ITEM.Auction_End_Datetime, \
                              ITEM.Cond, ITEM.Description, ITEM.Category\
                      FROM ITEM LEFT JOIN (SELECT Item_ID, Bid_Amount AS Highest_Bid, Username AS Current_Bidder\
                                           FROM   BID\
                                           WHERE (Item_ID, Bid_Amount) IN (SELECT  Item_ID, MAX(Bid_Amount) AS MaxPrice \
                                                                           FROM BID\
                                                                           GROUP BY  Item_ID)) AS Q ON Q.Item_ID = ITEM.Item_ID) AS P\
                                                                           WHERE NOW() < P.Auction_End_Datetime AND ? <= P.Cond \
                                                                                 AND (P.Highest_Bid IS NULL OR  ( ? > P.Highest_Bid AND ? < P.Highest_Bid))\
                                                                                 AND (P.Item_Name LIKE ? OR P.Description LIKE ?)\
                                                                                 AND (? = P.Category OR ? = '')\
              ORDER BY P.Auction_End_Datetime";
      break;
    case 5:  // search ITEM(s), of which auction end dates are passed
      return "SELECT Item_ID, Item_Name, COALESCE(Highest_Bid, '-') AS Current_Bid, COALESCE(Current_Bidder, '-') AS Username, Get_It_Now_Price, Auction_End_Datetime \
              FROM (SELECT ITEM.Item_ID, ITEM.Item_Name, Q.Highest_Bid, Q.Current_Bidder,\
                           ITEM.Auction_End_Datetime, ITEM.Min_Sale_Price, ITEM.Get_It_Now_Price\
                    FROM   ITEM LEFT JOIN (SELECT DISTINCT BID.Item_ID, Bid_Amount AS Highest_Bid, Username AS Current_Bidder\
                                           FROM   BID, ITEM\
                                           WHERE  ITEM.Min_Sale_Price <= BID.Bid_Amount \
                                                  AND BID.Item_ID = ITEM.Item_ID \
                                                  AND (BID.Item_ID, Bid_Amount) \
                                                  IN (SELECT BID.Item_ID, MAX(Bid_Amount) AS MaxPrice\
                                                      FROM  BID GROUP BY  BID.Item_ID)) AS Q \
                                                      ON Q.Item_ID = ITEM.Item_ID) AS P\
              WHERE NOW() > P.Auction_End_Datetime\
              ORDER BY P.Auction_End_Datetime DESC";
      break;
    case 6:  // update the item's Auction_End_Datetime to now
      return "UPDATE ITEM \
              SET `Auction_End_Datetime` = Now() \
            WHERE Item_ID = ?";
      break;
    case 7:  // search an ITEM by Lister_Name
      return "SELECT * FROM ITEM WHERE `Lister_Name`=? AND `Item_ID`=?"
      break;
    default:
      return "";
  }
  
}


// =====================================
// SQL queries related to BID ==========
// =====================================
exports.bid = function(queryId) {
    
  switch (queryId) {
    case 1:  // check if the auction time for this item has already been expired
      return "SELECT * \
            FROM ITEM \
            WHERE Auction_End_Datetime > NOW() AND Item_ID = ?";
      break;
    case 2:  // add a new BID with get it now price
      return "INSERT INTO BID ( \
              `Bid_Datetime`, `Username`, `Item_ID`, `Bid_Amount` ) \
            SELECT Now(), ?, Item_ID, Get_It_Now_Price \
            FROM ITEM \
            WHERE Item_ID = ?";
      break;

      case 3: //when a new BID is entered without get it now
       return"INSERT INTO BID (`Bid_Datetime`, `Username`, `Item_ID`, `Bid_Amount`) \
                          VALUES (NOW(), ?, ?, ?)";
       /* this part will be in bids.server.model

       db.query(sqls.bid(3), [item.username, item.itemid, item.bidamount] function (err, rows) {
          if err return done(err)
          done(null,true)
      })*/


    default:
      return "";
  }
  
}


// =====================================
// SQL queries related to CATEGORY =====
// =====================================
exports.category = function(queryId) {
    
  switch (queryId) {
    case 1:  // get all categories
      return "SELECT * FROM CATEGORY";
      break;
    default:
      return "";
  }
  
}


// =====================================
// SQL queries related to REPORT =======
// =====================================
exports.report = function(queryId) {
    
  switch (queryId) {
    case 1:  // get all categories group by total items, min price, max price, and average price
      return "SELECT   Category, Count(*) AS Sum_Items, MIN(Get_It_Now_Price) AS Min_Price, \
                        MAX(Get_It_Now_Price) AS Max_Price, \
                        AVG(Get_It_Now_Price) AS Avg_Price\
              FROM     ITEM\
              GROUP BY Category";
      break;
    case 2:  // get all users group by listed items, sold items, purchased items, rated items
        return"SELECT Username, Listed, Sold, Purchased, Rated \
               FROM ((SELECT Username, Sold, Purchased\
                      FROM SOLD NATURAL LEFT OUTER JOIN PURCHASED\
                      UNION\
                      SELECT Username, Sold, Purchased\
                      FROM PURCHASED NATURAL LEFT OUTER JOIN SOLD) AS A1\
                      NATURAL LEFT OUTER JOIN\
                     (SELECT Username, Listed, Rated\
                      FROM LISTED NATURAL LEFT OUTER JOIN RATED\
                      UNION\
                      SELECT Username, Listed, Rated\
                      FROM RATED NATURAL LEFT OUTER JOIN LISTED) AS A2)\
               UNION\
               SELECT Username, Listed, Sold, Purchased, Rated\
               FROM ((SELECT Username, Listed, Rated\
                      FROM LISTED NATURAL LEFT OUTER JOIN RATED\
                      UNION\
                      SELECT Username, Listed, Rated\
                      FROM RATED NATURAL LEFT OUTER JOIN LISTED) AS B1\
                      NATURAL LEFT OUTER JOIN\
                     (SELECT Username, Sold, Purchased\
                      FROM SOLD NATURAL LEFT OUTER JOIN PURCHASED\
                      UNION\
                      SELECT Username, Sold, Purchased\
                      FROM PURCHASED NATURAL LEFT OUTER JOIN SOLD) AS B2)\
               ORDER BY Username";
        break;
    default:
      return "";
  }
  
}