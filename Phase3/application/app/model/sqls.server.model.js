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
      return "SELECT i.Item_ID, i.Item_Name, b.Current_Bid, b2.Username, i.Get_It_Now_Price, i.Auction_End_Datetime \
              FROM ITEM i LEFT JOIN \
                (SELECT Item_ID, MAX(Bid_Amount) Current_Bid FROM BID GROUP BY Item_ID) b \
                ON i.Item_ID = b.Item_ID LEFT JOIN \
                BID b2 ON b.Item_ID = b2.Item_ID AND b.Current_Bid = b2.Bid_Amount \
              WHERE ? \
              ORDER BY i.Auction_End_Datetime";
      break;
    case 5:  // search ITEM(s), of which auction end dates are passed
      return "SELECT i.Item_ID, i.Item_Name, b.Current_Bid, b2.Username, i.Get_It_Now_Price, i.Auction_End_Datetime \
              FROM ITEM i LEFT JOIN \
                (SELECT BID.Item_ID, ITEM.Min_Sale_Price, MAX(Bid_Amount) Current_Bid \
	               FROM BID JOIN ITEM ON BID.Item_ID = ITEM.Item_ID \
	               GROUP BY BID.Item_ID \
	               HAVING MAX(Bid_Amount) >= ITEM.Min_Sale_Price) b \
                ON i.Item_ID = b.Item_ID LEFT JOIN \
                BID b2 ON b.Item_ID = b2.Item_ID AND b.Current_Bid = b2.Bid_Amount \
              WHERE i.Auction_End_Datetime < NOW() AND i.Lister_Name = ? \
              ORDER BY i.Auction_End_Datetime DESC";
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
    case 3:  // update the item's Auction_End_Datetime to now
      return "UPDATE ITEM \
              SET `Auction_End_Datetime` = Now() \
            WHERE Item_ID = ?";
      break;
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
      return "SELECT i.Category, COUNT(*) Sum_Items, COALESCE(MIN(b.Bid_Amount), 0) Min_Price, \
                COALESCE(MAX(b.Bid_Amount), 0) Max_Price, COALESCE(AVG(b.Bid_Amount), 0) Avg_Price \
              FROM ITEM i LEFT JOIN BID b \
                ON i.Item_ID = b.Item_ID \
              GROUP BY i.Category \
              ORDER BY i.Category";
      break;
    case 2:  // get all users group by listed items, sold items, purchased items, rated items
      // TODO: SQL needs to be revised !!!!!!!!!*************************
      return "SELECT i.Lister_Name Username, COUNT(i.Item_ID) Listed, COUNT(s.Item_ID) Sold, \
                COUNT(s.Item_ID) Purchased, COUNT(s.Item_ID) Rated \
              FROM ITEM i LEFT JOIN \
                  (SELECT Item_ID \
                  FROM ITEM \
                  WHERE Auction_End_Datetime < NOW() ) s \
                ON i.Item_ID = s.Item_ID \
              GROUP BY i.Lister_Name \
              ORDER BY COUNT(i.Item_ID) DESC";
      break;
    default:
      return "";
  }
  
}