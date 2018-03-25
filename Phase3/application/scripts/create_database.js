/**
 * Created by Daniel on 3/5/2018.
 */

var dbconfig = require('./database'),
	mysql = require('mysql'),
    bcrypt = require('bcrypt-nodejs');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('DROP DATABASE IF EXISTS ' + dbconfig.database);

connection.query('CREATE DATABASE ' + dbconfig.database);
console.log('Success: Database Created!')

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
console.log('Success: USER table Created!')

// ADMIN_USER table
connection.query('\
CREATE TABLE `ADMIN_USER` ( \
    `Username` VARCHAR(250) NOT NULL, \
    `Position` VARCHAR(100) NOT NULL, \
        PRIMARY KEY (`Username`), \
        FOREIGN KEY (`Username`) REFERENCES USER (Username) \
)');
console.log('Success: ADMIN_USER table Created!')

// CATEGORY table
connection.query('\
CREATE TABLE `CATEGORY` ( \
    `Category_Name` VARCHAR(100) NOT NULL, \
        PRIMARY KEY (`Category_Name`) \
)');
console.log('Success: CATEGORY table Created!')

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
console.log('Success: ITEM table Created!')

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
console.log('Success: BID table Created!')

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
console.log('Success: RATING table Created!')

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
console.log('Success: a new user is added = ' + user.username)

user = {
    username: 'user2',
    password: bcrypt.hashSync('pass2', null, null),  // use the generateHash function in our user model
    firstName: 'Dodra',
    lastName: 'Kiney'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)

user = {
    username: 'user3',
    password: bcrypt.hashSync('pass3', null, null),  // use the generateHash function in our user model
    firstName: 'Peran',
    lastName: 'Bishop'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)

user = {
    username: 'user4',
    password: bcrypt.hashSync('pass4', null, null),  // use the generateHash function in our user model
    firstName: 'Randy',
    lastName: 'Roran'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)


user = {
    username: 'user5',
    password: bcrypt.hashSync('pass5', null, null),  // use the generateHash function in our user model
    firstName: 'Ashod',
    lastName: 'Iankel'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)

user = {
    username: 'user6',
    password: bcrypt.hashSync('pass6', null, null),  // use the generateHash function in our user model
    firstName: 'Cany',
    lastName: 'Achant'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)

user = {
    username: 'admin1',
    password: bcrypt.hashSync('opensesame', null, null),  // use the generateHash function in our user model
    firstName: 'Riley',
    lastName: 'Fuiss'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)

user = {
    username: 'admin2',
    password: bcrypt.hashSync('opensesayou', null, null),  // use the generateHash function in our user model
    firstName: 'Tonnis',
    lastName: 'Kinser'
};

insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)


// ADMIN_USER table
var adminuser = {
    username: 'admin1',
    position: 'Technical Support'
};

var insertQuery = "INSERT INTO ADMIN_USER ( Username, Position ) values (?,?)";

connection.query(insertQuery,[adminuser.username, adminuser.position]);
console.log('Success: a new admin user is added = ' + adminuser.username)


adminuser = {
    username: 'admin2',
    position: 'Chief Techy'
};

var insertQuery = "INSERT INTO ADMIN_USER ( Username, Position ) values (?,?)";

connection.query(insertQuery,[adminuser.username, adminuser.position]);
console.log('Success: a new admin user is added = ' + adminuser.username)



// CATEGORY table
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Art')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Books')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Electronics')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Home & Garden')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Sporting Goods')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Toys')");
connection.query("INSERT INTO CATEGORY ( `Category_Name` ) values ('Other')");

console.log('Success: categories are added');

/*
// ITEM table
var item = {
    itemname: 'user1',
    description: 'Danite',
    Cond: 'Kelor',
    Returnable: 'Danite',
    Auction_Start_Datetime: 'Danite',
    Min_Sale_Price: 'Danite',
    Get_It_Now_Price: 'Danite',
    Auction_End_Datetime: 'Danite',
    Category: 'Danite',
    Lister_Name: 'Danite',
};

var insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

connection.query(insertQuery,[user.username, user.password, user.firstName, user.lastName]);
console.log('Success: a new user is added = ' + user.username)

&/

connection.end();
