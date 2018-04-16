/**
 * Created by Daniel on 3/5/2018.
 * Initial DB setup scripts
 */

var dbconfig = require('./database'),
	mysql = require('mysql'),
    bcrypt = require('bcrypt-nodejs'),
    sleep = require('system-sleep'),
    logger = require('../config/logger');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('DROP DATABASE IF EXISTS ' + dbconfig.database);

connection.query('CREATE DATABASE ' + dbconfig.database);
logger.debug('Success: Database Created!')

connection.query('USE ' + dbconfig.database);

/*
connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `firstname` VARCHAR(50) NOT NULL, \
    `lastname` VARCHAR(50) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');
*/

// USER table
connection.query('\
CREATE TABLE `USER` ( \
    `Username` VARCHAR(250) NOT NULL, \
    `Password` VARCHAR(60) NOT NULL, \
    `First_Name` VARCHAR(50) NOT NULL, \
    `Last_Name` VARCHAR(50) NOT NULL, \
        PRIMARY KEY (`Username`) \
)');
logger.debug('Success: USER table Created!')

// ADMIN_USER table
connection.query('\
CREATE TABLE `ADMIN_USER` ( \
    `Username` VARCHAR(250) NOT NULL, \
    `Position` VARCHAR(100) NOT NULL, \
        PRIMARY KEY (`Username`), \
        FOREIGN KEY (`Username`) REFERENCES USER (Username) \
)');
logger.debug('Success: ADMIN_USER table Created!')

// CATEGORY table
connection.query('\
CREATE TABLE `CATEGORY` ( \
    `Category_Name` VARCHAR(100) NOT NULL, \
        PRIMARY KEY (`Category_Name`) \
)');
logger.debug('Success: CATEGORY table Created!')

// ITEM table
connection.query('\
CREATE TABLE `ITEM` ( \
  `Item_ID` int unsigned NOT NULL AUTO_INCREMENT, \
  `Item_Name` varchar(250) NOT NULL, \
  `Description` varchar(1000) NOT NULL, \
  `Cond` smallint unsigned NOT NULL, \
  `Returnable` boolean NOT NULL, \
  `Auction_Start_Datetime` Timestamp NOT NULL, \
  `Min_Sale_Price` Decimal(19,2) NOT NULL, \
  `Get_It_Now_Price` Decimal(19,2) DEFAULT NULL, \
  `Auction_End_Datetime` Timestamp NOT NULL, \
  `Category` varchar(100) NOT NULL, \
  `Lister_Name` varchar(250) NOT NULL, \
  `Starting_Bid` Decimal(19,2) NOT NULL, \
  PRIMARY KEY (`ITEM_ID`), \
  FOREIGN KEY (`Lister_Name`) REFERENCES USER (`Username`), \
  FOREIGN KEY (`Category`) REFERENCES CATEGORY (`Category_Name`) \
)');
logger.debug('Success: ITEM table Created!')

// BID table
connection.query('\
CREATE TABLE BID ( \
  `Bid_Datetime` timestamp NOT NULL, \
  `Username` varchar(250) NOT NULL, \
  `Item_ID` int unsigned NOT NULL, \
  `Bid_Amount` Decimal(19,2) NOT NULL, \
PRIMARY KEY (`Bid_Datetime`, `Username`, `Item_ID`), \
  FOREIGN KEY (`Username`) REFERENCES USER (`Username`), \
  FOREIGN KEY (`Item_ID`) REFERENCES ITEM (`Item_ID`) \
)');
logger.debug('Success: BID table Created!')

// RATING table
connection.query('\
CREATE TABLE RATING ( \
  `Rating_Datetime` timestamp NOT NULL, \
  `Username` varchar(250) NOT NULL, \
  `Item_ID` int unsigned NOT NULL, \
  `Number_Of_Stars` smallint NOT NULL, \
  `Comment` varchar(1000) NOT NULL, \
  PRIMARY KEY (`Rating_Datetime`, `Username`, `Item_ID`), \
  FOREIGN KEY (`Username`) REFERENCES USER (`Username`), \
  FOREIGN KEY (`Item_ID`) REFERENCES ITEM (`Item_ID`), \
  UNIQUE(`Username`, `Item_ID`), \
  CONSTRAINT Unq_User_Item Unique(`Username`, `Item_ID`) \
)');
logger.debug('Success: RATING table Created!')



// ---- Inserting Sample Data ---
// USER table
var user = {
    username: 'user1',
    password: bcrypt.hashSync('pass1', null, null),  // use the generateHash function in our user model
    firstName: 'Danite',
    lastName: 'Kelor'
};

var insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)

user = {
    username: 'user2',
    password: bcrypt.hashSync('pass2', null, null),  // use the generateHash function in our user model
    firstName: 'Dodra',
    lastName: 'Kiney'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)

user = {
    username: 'user3',
    password: bcrypt.hashSync('pass3', null, null),  // use the generateHash function in our user model
    firstName: 'Peran',
    lastName: 'Bishop'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)

user = {
    username: 'user4',
    password: bcrypt.hashSync('pass4', null, null),  // use the generateHash function in our user model
    firstName: 'Randy',
    lastName: 'Roran'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)


user = {
    username: 'user5',
    password: bcrypt.hashSync('pass5', null, null),  // use the generateHash function in our user model
    firstName: 'Ashod',
    lastName: 'Iankel'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)

user = {
    username: 'user6',
    password: bcrypt.hashSync('pass6', null, null),  // use the generateHash function in our user model
    firstName: 'Cany',
    lastName: 'Achant'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)

user = {
    username: 'admin1',
    password: bcrypt.hashSync('opensesame', null, null),  // use the generateHash function in our user model
    firstName: 'Riley',
    lastName: 'Fuiss'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)

user = {
    username: 'admin2',
    password: bcrypt.hashSync('opensesayou', null, null),  // use the generateHash function in our user model
    firstName: 'Tonnis',
    lastName: 'Kinser'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
logger.debug('Success: a new user is added = ' + user.username)


// ADMIN_USER table
var adminuser = {
    username: 'admin1',
    position: 'Technical Support'
};

insertQuery = "INSERT INTO ADMIN_USER ( Username, Position ) values (?,?)";

connection.query(insertQuery,[adminuser.username, adminuser.position]);
logger.debug('Success: a new admin user is added = ' + adminuser.username)


adminuser = {
    username: 'admin2',
    position: 'Chief Techy'
};

insertQuery = "INSERT INTO ADMIN_USER ( Username, Position ) values (?,?)";

connection.query(insertQuery,[adminuser.username, adminuser.position]);
logger.debug('Success: a new admin user is added = ' + adminuser.username)



// CATEGORY table
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Art')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Books')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Electronics')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Home & Garden')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Sporting Goods')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Toys')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Other')");

logger.debug('Success: categories are added');


// ITEM table

var newDate = new Date(2018, 2, 16, 03, 15, 10, 0);
var newDate1 = new Date(2018, 2, 31, 12, 22, 0, 0);
var addedDays = 7;
var item = {
    itemname: 'Garmin GPS',
    description: 'This is a great GPS.',
    Cond: 3,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 70,
    Get_It_Now_Price: 99,
    Auction_End_Datetime: newDate1.toISOString().substring(0,19).replace('T',' '),
    Category: 'Electronics',
    Lister_Name: 'admin2',
    Starting_Bid: 50
};

insertQuery = "INSERT INTO ITEM ( \
  `Item_Name`, `Description`, `Cond`, `Returnable`, `Auction_Start_Datetime`, `Min_Sale_Price`, \
  `Get_It_Now_Price`, `Auction_End_Datetime`, `Category`, `Lister_Name`, `Starting_Bid` ) values (?,?,?,?,?,?,?,?,?,?,?)";

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);



var newDate = new Date(2018, 2, 30, 03, 15, 0, 0);
var newDate1 = new Date(2018, 3, 1, 14, 14, 0, 0);
addedDays = 3;
item = {
    itemname: 'Canon Powershot',
    description: 'Point and shoot!',
    Cond: 2,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 60,
    Get_It_Now_Price: 80,
    Auction_End_Datetime: newDate1.toISOString().substring(0,19).replace('T',' '),
    Category: 'Electronics',
    Lister_Name: 'user1',
    Starting_Bid: 40
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);

var newDate = new Date(2018, 2, 30, 03, 15, 4, 0);
var newDate1 = new Date(2018, 3, 5, 9, 19, 0, 0);
addedDays = 3;
item = {
    itemname: 'Nikon D3',
    description: 'New and in box!',
    Cond: 4,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 1800,
    Get_It_Now_Price: 2000,
    Auction_End_Datetime: newDate1.toISOString().substring(0,19).replace('T',' '),
    Category: 'Electronics',
    Lister_Name: 'user2',
    Starting_Bid: 1500
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);

var newDate = new Date(2018, 2, 30, 03, 15, 2, 0);
var newDate1 = new Date(2018, 3, 5, 15, 23, 0, 0);
addedDays = 5;
item = {
    itemname: 'Danish Art Book',
    description: 'Delicious Danish Art',
    Cond: 3,
    Returnable: true,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 10,
    Get_It_Now_Price: 15,
    Auction_End_Datetime: newDate1.toISOString().substring(0,19).replace('T',' '),
    Category: 'Art',
    Lister_Name: 'user3',
    Starting_Bid: 10
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);

var newDate = new Date(2018, 2, 30, 03, 15, 1, 0);
var newDate1 = new Date(2018, 3, 5, 16, 48, 0, 0);
addedDays = 3;
item = {
    itemname: 'SQL in 10 Minutes',
    description: 'Learn SQL really fast!',
    Cond: 1,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 10,
    Get_It_Now_Price: 12,
    Auction_End_Datetime: newDate1.toISOString().substring(0,19).replace('T',' '),
    Category: 'Books',
    Lister_Name: 'admin1',
    Starting_Bid: 5
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);

var newDate = new Date(2018, 2, 30, 03, 15, 1, 0);
var newDate1 = new Date(2018, 3, 8, 10, 11, 0, 0);
addedDays = 7;
item = {
    itemname: 'SQL in 8 Minutes',
    description: 'Learn SQL even faster!',
    Cond: 2,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 8,
    Get_It_Now_Price: 10,
    Auction_End_Datetime: newDate1.toISOString().substring(0,19).replace('T',' '),
    Category: 'Books',
    Lister_Name: 'admin2',
    Starting_Bid: 5
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);

var newDate = new Date(2018, 2, 30, 03, 15, 1, 0);
var newDate1 = new Date(2018, 3, 9, 22, 9, 0, 0);
addedDays = 8;
item = {
    itemname: 'Pull-up Bar',
    description: 'Works on any door frame.',
    Cond: 4,
    Returnable: true,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 25,
    Get_It_Now_Price: 40,
    Auction_End_Datetime: newDate1.toISOString().substring(0,19).replace('T',' '),
    Category: 'Sporting Goods',
    Lister_Name: 'user6',
    Starting_Bid: 20
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);


var newDate = new Date(2018, 3, 16, 03, 15, 0, 0);
var addedDays = 7;
var item = {
    itemname: 'Garmin GPS',
    description: 'Regular GPS.',
    Cond: 2,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 50,
    Get_It_Now_Price: 75,
    Auction_End_Datetime: new Date(newDate.setTime( newDate.getTime() + addedDays * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    Category: 'Electronics',
    Lister_Name: 'admin2',
    Starting_Bid: 25
};

insertQuery = "INSERT INTO ITEM ( \
  `Item_Name`, `Description`, `Cond`, `Returnable`, `Auction_Start_Datetime`, `Min_Sale_Price`, \
  `Get_It_Now_Price`, `Auction_End_Datetime`, `Category`, `Lister_Name`, `Starting_Bid` ) values (?,?,?,?,?,?,?,?,?,?,?)";

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);


newDate = new Date(2018,3,16,1,1,0,0);
addedDays = 7;
item = {
    itemname: 'MacBook Pro',
    description: 'Looks good',
    Cond: 3,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 1500,
    Get_It_Now_Price: 0,
    Auction_End_Datetime: new Date(newDate.setTime( newDate.getTime() + addedDays * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    Category: 'Electronics',
    Lister_Name: 'user4',
    Starting_Bid: 1000
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);

newDate = new Date(2018,3,16,6,0,0,0);
addedDays = 7;
item = {
    itemname: 'Microsoft Surface',
    description: 'Keyboard sucks',
    Cond: 3,
    Returnable: false,
    Auction_Start_Datetime: newDate.toISOString().substring(0,19).replace('T',' '),
    Min_Sale_Price: 750,
    Get_It_Now_Price: 899,
    Auction_End_Datetime: new Date(newDate.setTime( newDate.getTime() + addedDays * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    Category: 'Electronics',
    Lister_Name: 'user5',
    Starting_Bid: 500
};

connection.query(insertQuery,[item.itemname, item.description, item.Cond, item.Returnable, item.Auction_Start_Datetime, item.Min_Sale_Price, item.Get_It_Now_Price, item.Auction_End_Datetime, item.Category, item.Lister_Name, item.Starting_Bid]);


logger.debug('Success: items are added');


// BID table
var newDate = new Date(2018, 3, 17, 03, 15, 0, 0);

var bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user4',
    itemId: 8,
    Bid_Amount: 30
};

insertQuery = "INSERT INTO BID ( \
  `Bid_Datetime`, `Username`, `Item_ID`, `Bid_Amount` ) values (?,?,?,?)";

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');


var newDate = new Date(2018, 3, 18, 03, 15, 0, 0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user5',
    itemId: 8,
    Bid_Amount: 31
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');

var newDate = new Date(2018, 3, 19, 03, 15, 0, 0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user3',
    itemId: 8,
    Bid_Amount: 33
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');

var newDate = new Date(2018, 3, 20, 03, 15, 0, 0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user4',
    itemId: 8,
    Bid_Amount: 40
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');


var newDate = new Date(2018, 3, 21, 03, 15, 0, 0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user6',
    itemId: 8,
    Bid_Amount: 45
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');

newDate = new Date(2018,2,30,14,53,0,0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user4',
    itemId: 1,
    Bid_Amount: 50
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');

newDate = new Date(2018,2,30,16,45,0,0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user5',
    itemId: 1,
    Bid_Amount: 55
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');

newDate = new Date(2018,2,30,19,28,0,0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user4',
    itemId: 1,
    Bid_Amount: 75
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');

newDate = new Date(2018,2,31,10,0,0,0);
bid1 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user5',
    itemId: 1,
    Bid_Amount: 85
};

connection.query(insertQuery,[bid1.bidDate, bid1.username, bid1.itemId, bid1.Bid_Amount]);
logger.debug('A new bidding (' + bid1.bidDate + '|' + bid1.username + '|' + bid1.itemId +') has been inserted.');



newDate = new Date(2018,3,1,13,55,0,0);
var bid2 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user6',
    itemId: 2,
    Bid_Amount: 80
};

connection.query(insertQuery,[bid2.bidDate, bid2.username, bid2.itemId, bid2.Bid_Amount]);
logger.debug('A new bidding (' + bid2.bidDate + '|' + bid2.username + '|' + bid2.itemId +') has been inserted.');

newDate = new Date(2018,3,4,8,37,0,0);
var bid3 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user1',
    itemId: 3,
    Bid_Amount: 1500
};

connection.query(insertQuery,[bid3.bidDate, bid3.username, bid3.itemId, bid3.Bid_Amount]);
logger.debug('A new bidding (' + bid3.bidDate + '|' + bid3.username + '|' + bid3.itemId +') has been inserted.');

newDate = new Date(2018,3,4,9,15,0,0);
bid3 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user3',
    itemId: 3,
    Bid_Amount: 1501
};

connection.query(insertQuery,[bid3.bidDate, bid3.username, bid3.itemId, bid3.Bid_Amount]);
logger.debug('A new bidding (' + bid3.bidDate + '|' + bid3.username + '|' + bid3.itemId +') has been inserted.');


newDate = new Date(2018,3,4,12,27,0,0);
bid3 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user1',
    itemId: 3,
    Bid_Amount: 1795
};

connection.query(insertQuery,[bid3.bidDate, bid3.username, bid3.itemId, bid3.Bid_Amount], function(){
  logger.debug('A new bidding (' + bid3.bidDate + '|' + bid3.username + '|' + bid3.itemId +') has been inserted.');
});


newDate = new Date(2018,3,8,20,20,0,0);
var bid7 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user4',
    itemId: 7,
    Bid_Amount: 20
};

connection.query(insertQuery,[bid7.bidDate, bid7.username, bid7.itemId, bid7.Bid_Amount]);
logger.debug('A new bidding (' + bid7.bidDate + '|' + bid7.username + '|' + bid7.itemId +') has been inserted.');


newDate = new Date(2018,3,9,21,15,0,0);
bid7 = {
    bidDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user2',
    itemId: 7,
    Bid_Amount: 25
};

connection.query(insertQuery,[bid7.bidDate, bid7.username, bid7.itemId, bid7.Bid_Amount]);
logger.debug('A new bidding (' + bid7.bidDate + '|' + bid7.username + '|' + bid7.itemId +') has been inserted.');
logger.debug('Success: bids are added');



// RATING table
newDate = new Date(2018,2,30,17,00,0,0);
var rate = {
    rateDate: newDate.toISOString().substring(0,19).replace('T',' '),
    username: 'user2',
    itemId: 1,
    numberOfStars: 5,
    comment: 'Great GPS!'
};

var insertQueryRate = "INSERT INTO RATING ( \
  `Rating_Datetime`, `Username`, `Item_ID`, `Number_Of_Stars`, `Comment` ) values (?,?,?,?,?)";

connection.query(insertQueryRate,[rate.rateDate, rate.username, rate.itemId, rate.numberOfStars, rate.comment]);

newDate = new Date()

rate = {
    rateDate: new Date(newDate.setTime( newDate.getTime() + 0.2 * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    username: 'user3',
    itemId: 1,
    numberOfStars: 2,
    comment: 'Not so great GPS!'
};

insertQueryRate = "INSERT INTO RATING ( \
  `Rating_Datetime`, `Username`, `Item_ID`, `Number_Of_Stars`, `Comment` ) values (?,?,?,?,?)";

connection.query(insertQueryRate,[rate.rateDate, rate.username, rate.itemId, rate.numberOfStars, rate.comment]);


rate = {
    rateDate: new Date(newDate.setTime( newDate.getTime() + 0.3 * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    username: 'user4',
    itemId: 1,
    numberOfStars: 4,
    comment: 'A favorite of mine.'
};

insertQueryRate = "INSERT INTO RATING ( \
  `Rating_Datetime`, `Username`, `Item_ID`, `Number_Of_Stars`, `Comment` ) values (?,?,?,?,?)";

connection.query(insertQueryRate,[rate.rateDate, rate.username, rate.itemId, rate.numberOfStars, rate.comment]);


rate = {
    rateDate: new Date(newDate.setTime( newDate.getTime() + 0.1 * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    username: 'user1',
    itemId: 4,
    numberOfStars: 1,
    comment: 'Go for the Italian stuff instead.'
};

insertQueryRate = "INSERT INTO RATING ( \
  `Rating_Datetime`, `Username`, `Item_ID`, `Number_Of_Stars`, `Comment` ) values (?,?,?,?,?)";

connection.query(insertQueryRate,[rate.rateDate, rate.username, rate.itemId, rate.numberOfStars, rate.comment]);


rate = {
    rateDate: new Date(newDate.setTime( newDate.getTime() + 0.1 * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    username: 'admin1',
    itemId: 6,
    numberOfStars: 1,
    comment: 'Not recommended.'
};

insertQueryRate = "INSERT INTO RATING ( \
  `Rating_Datetime`, `Username`, `Item_ID`, `Number_Of_Stars`, `Comment` ) values (?,?,?,?,?)";

connection.query(insertQueryRate,[rate.rateDate, rate.username, rate.itemId, rate.numberOfStars, rate.comment]);


rate = {
    rateDate: new Date(newDate.setTime( newDate.getTime() + 0.2 * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    username: 'user1',
    itemId: 6,
    numberOfStars: 3,
    comment: 'This book is okay.'
};

insertQueryRate = "INSERT INTO RATING ( \
  `Rating_Datetime`, `Username`, `Item_ID`, `Number_Of_Stars`, `Comment` ) values (?,?,?,?,?)";

connection.query(insertQueryRate,[rate.rateDate, rate.username, rate.itemId, rate.numberOfStars, rate.comment]);


rate = {
    rateDate: new Date(newDate.setTime( newDate.getTime() + 0.2 * 86400000 )).toISOString().substring(0,19).replace('T',' '),
    username: 'user2',
    itemId: 6,
    numberOfStars: 5,
    comment: 'I learned SQL in 8 minutes!'
};

insertQueryRate = "INSERT INTO RATING ( \
  `Rating_Datetime`, `Username`, `Item_ID`, `Number_Of_Stars`, `Comment` ) values (?,?,?,?,?)";

connection.query(insertQueryRate,[rate.rateDate, rate.username, rate.itemId, rate.numberOfStars, rate.comment]);


logger.debug('Success: rates are added');



connection.query("CREATE VIEW LISTED AS\
                  SELECT Lister_Name AS Username, Count(*) AS Listed \
                  FROM ITEM\
                  GROUP BY Lister_Name");


connection.query("CREATE VIEW SOLD AS \
                  SELECT Lister_Name AS Username, COUNT(Item_ID) AS Sold\
                  FROM (SELECT DISTINCT ITEM.Lister_Name, ITEM.Item_ID\
                        FROM   BID, ITEM\
                        WHERE  NOW() > ITEM.Auction_End_Datetime AND\
                        BID.Bid_Amount > ITEM.Min_Sale_Price AND\
                        BID.Item_ID = ITEM.Item_ID) AS P\
                  GROUP BY Lister_Name");

connection.query("CREATE VIEW PURCHASED AS \
                  SELECT Current_Bidder AS Username, COUNT(*) AS Purchased\
                  FROM   (SELECT ITEM.Item_ID, Item_Name, Q.Highest_Bid, Current_Bidder\
                          FROM ITEM JOIN (SELECT DISTINCT BID.Item_ID, Bid_Amount AS Highest_Bid,\
                                          Username AS Current_Bidder\
                                          FROM   BID, ITEM\
                                          WHERE ITEM.Min_Sale_Price <= BID.Bid_Amount\
                                                AND BID.Item_ID = ITEM.Item_ID\
                                                AND (BID.Item_ID, Bid_Amount)\
                                                IN(SELECT BID.Item_ID,MAX(Bid_Amount)AS MaxPrice\
                                                   FROM  BID GROUP BY  BID.Item_ID)) AS Q\
                                                   WHERE ITEM.Item_ID = Q.Item_ID AND\
                                                   NOW() > ITEM.Auction_End_Datetime) AS P\
                  GROUP BY Current_Bidder");

connection.query("CREATE VIEW RATED AS\
                  SELECT   Username, COUNT(Item_ID) AS Rated\
                  FROM     (SELECT DISTINCT RATING.Username, ITEM.Item_ID\
                            FROM   RATING, ITEM\
                            WHERE  RATING.Item_ID = ITEM.Item_ID) AS P\
                  GROUP BY Username");

logger.debug('Success: views are added');

connection.end();