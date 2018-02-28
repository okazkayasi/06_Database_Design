-- Tables 

CREATE TABLE ADMIN_USER (
  Username varchar(250) NOT NULL,
  Position varchar(100) NOT NULL,
  PRIMARY KEY Username ()
);

CREATE TABLE USER (
  Username varchar(250) NOT NULL,
  Password varchar(60) NOT NULL,
  First_Name varchar(100) NOT NULL,
  Last_Name varchar(100) NOT NULL,
  Listed int unsigned NOT NULL,
  Sold int unsigned NOT NULL,
  Purchased int unsigned NOT NULL,
  Rated int unsigned NOT NULL,
  PRIMARY KEY (Username)
);


CREATE TABLE CATEGORY (
  Category_Name varchar(100) NOT NULL,
  Number_Of_Items int unsigned NOT NULL,
  Min_Price Decimal(19,2) NOT NULL,
  Max_Price Decimal(19,2) NOT NULL,
  Average_Price Decimal(19,2) NOT NULL,
  PRIMARY KEY (Category_Name)
);


CREATE TABLE ITEM (
  Item_ID int unsigned NOT NULL AUTO_INCREMENT,
  Item_Name varchar(250) NOT NULL,
  Description varchar(1000) NOT NULL,
  Condition smallint unsigned NOT NULL,
  Returnable boolean NOT NULL,
  Auction_Start_Datetime Timestamp NOT NULL,
  Min_Sale_Price Decimal(19,2) NOT NULL,
  Get_It_Now_Price Decimal(19,2) DEFAULT NULL, 
  Auction_Length smallint NOT NULL,
  Active boolean NOT NULL,
  Sale_Price Decimal(19,2) DEFAULT NULL,
  Buyer_Name varchar(250) DEFAULT NULL,
  Category varchar(100) NOT NULL,
  Lister_Name varchar(250) NOT NULL,
  PRIMARY KEY (ITEM_ID),
  FOREIGN KEY (Lister_Name) REFERENCES USER (Username),
  FOREIGN KEY (Category) REFERENCES Category (Category_Name)
);

CREATE TABLE BID (
  Bid_Datetime timestamp NOT NULL,
  Username varchar(250) NOT NULL,
  Item_ID int unsigned NOT NULL,
  Bid_Amount Decimal(19,2) NOT NULL,
  PRIMARY KEY (Bid_Datetime, Username, Item_ID),
  FOREIGN KEY (Username) REFERENCES USER (Username),
  FOREIGN KEY (Item_ID) REFERENCES ITEM (Item_ID)
);

CREATE TABLE RATING (
  Rating_Datetime timestamp NOT NULL,
  Username varchar(250) NOT NULL,
  Item_ID int unsigned NOT NULL,
  Number_Of_Stars smallint NOT NULL,
  Comment varchar(1000) NOT NULL,
  PRIMARY KEY (Rating_Datetime, Username, Item_ID),
  FOREIGN KEY (Username) REFERENCES USER (Username),
  FOREIGN KEY (Item_ID) REFERENCES ITEM (Item_ID)
);

