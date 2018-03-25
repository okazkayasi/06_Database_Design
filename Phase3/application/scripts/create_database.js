/**
 * Created by Daniel on 3/5/2018.
 */

var dbconfig = require('./database'),
	mysql = require('mysql');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('DROP DATABASE IF EXISTS ' + dbconfig.database);

connection.query('CREATE DATABASE ' + dbconfig.database);

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

// ADMIN_USER table
connection.query('\
CREATE TABLE `ADMIN_USER` ( \
    `Username` VARCHAR(250) NOT NULL, \
    `Position` VARCHAR(100) NOT NULL, \
        PRIMARY KEY (`Username`), \
        FOREIGN KEY (`Username`) REFERENCES USER (Username) \
)');

// CATEGORY table
connection.query('\
CREATE TABLE `CATEGORY` ( \
    `Category_Name` VARCHAR(100) NOT NULL, \
        PRIMARY KEY (`Category_Name`) \
)');

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
  PRIMARY KEY (`ITEM_ID`), \
  FOREIGN KEY (`Lister_Name`) REFERENCES USER (`Username`), \
  FOREIGN KEY (`Category`) REFERENCES CATEGORY (`Category_Name`) \
)');

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


console.log('Success: Database Created!')

connection.end();
