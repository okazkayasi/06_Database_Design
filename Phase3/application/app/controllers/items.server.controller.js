/*
 business logic for ITEM related tasks
*/
var config = require('../../config/config'),
    items = require('../model/items.server.model'),
    bids = require('../model/bids.server.model'),
    logger = require('../../config/logger');

// =====================================
// FORM for NEW ITEM ===================
// =====================================
exports.auction = function(req, res) {
    req.session.returnTo = req.url;	

    if (req.query.id != null) { // description editing mode
        var item = {
            itemid: req.query.id
        }

        logger.debug('item.itemid = ' + item.itemid);

        items.getItem(item, function(err, results) {
            logger.debug(results);    
            item = JSON.parse(results);

            item.description = results[0].description;
            logger.debug('results[0].Description = ' + results[0].description);
            
            res.render('auction', {
                    title: 'Edit Item',
                    menugroup: 'auction',
                    submenu: '',
                    itemId: item.itemid,
                    description: item.description,
                    messages: '',
                    backUrl: req.url,
                    userid: req.user.username,
                    username: req.user.firstName + ' ' + req.user.lastName,
                    position: req.user.position,
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });

        });
    } else {  // a form to add a new ITEM
    
        var jsonResult;

        items.getCategories(function(err, results) {
            if (err) {
                return done(err);			
            } else {	
                logger.debug(results);
                jsonResult = results;	

                res.render('auction', {
                    title: 'New Item for Auction',
                    menugroup: 'auction',
                    submenu: '',
                    itemId: '',
                    categories: jsonResult,
                    description: '',
                    messages: '',
                    backUrl: req.url,
                    userid: req.user.username,
                    username: req.user.firstName + ' ' + req.user.lastName,
                    position: req.user.position,
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });

            }
        });

    }
};


// =====================================
// ITEM SEARCH FORM ====================
// =====================================
exports.search = function(req, res) {

    req.session.returnTo = req.url;	
	
    items.getCategories(function(err, results) {
        if (err) {
            return done(err);			
        } else {	
            logger.debug(results);
            jsonResult = results;	

            res.render('search', {
                title: 'Item Search',
                menugroup: 'search',
                submenu: '',
                categories: jsonResult,
                messages: req.flash('error') || req.flash('info'),
                backUrl: req.url,
                userid: req.user.username,
                username: req.user.firstName + ' ' + req.user.lastName,
                position: req.user.position,
                membersince: req.user.created,
                sessionTimeOut: 'yes',
                sessionTimeOutDuration: config.sessionTimeOutDuration
            });

        }
    });
    
};


// =====================================
// Display Search Results View =========
// =====================================
exports.searchResult = function(req, res, done) {
  var k, c, min, max, cond;
  
  if (req.body.keyword == null)
    k = '';
  else
    k = req.body.keyword;
  
  if (req.body.category == null)
    c = '';
  else
    c = req.body.category;
  
  if (req.body.minSalePrice == null)
    min = '';
  else
    min = req.body.minSalePrice;
  
  if (req.body.maxSalePrice == null)
    max = '';
  else
    max = req.body.maxSalePrice;
	
  if (req.body.condition == null)
    cond = '';
  else
    cond = req.body.condition;
  
  var item = {
      keyword: k,
      category: c,
      minAuctionPrice: Number(min),
      maxAuctionPrice: Number(max),
      condition: Number(cond)
  };

  logger.debug(item);

  var jsonResult;

  items.getItems(item, function(err, results) {
      if (err) {
          return done(err);			
      } else {	
          logger.debug(results);
          jsonResult = results;	

          req.session.returnTo = req.url;	

          res.render('search-result', {
              title: 'Item Search Results',
              menugroup: 'sale',
              submenu: '',
              results: jsonResult,
              messages: '',
              backUrl: req.url,
              userid: req.user.username,
              username: req.user.firstName + ' ' + req.user.lastName,
              position: req.user.position,
              membersince: req.user.created,
              sessionTimeOut: 'yes',
              sessionTimeOutDuration: config.sessionTimeOutDuration
          });

      }
  });
	
};


// =====================================
// Auction Results View ================
// =====================================
exports.auctionResult = function(req, res, done) {
  var jsonResult;

  items.getAuctionResults(req.user.username, function(err, results) {
      if (err) {
          return done(err);			
      } else {	
          logger.debug(results);
          jsonResult = results;	

          req.session.returnTo = req.url;	

          res.render('auction-result', {
              title: 'Auction Results',
              menugroup: 'result',
              submenu: '',
              results: jsonResult,
              messages: '',
              backUrl: req.url,
              userid: req.user.username,
              username: req.user.firstName + ' ' + req.user.lastName,
              position: req.user.position,
              membersince: req.user.created,
              sessionTimeOut: 'yes',
              sessionTimeOutDuration: config.sessionTimeOutDuration
          });

      }
  });
    
    
	
};



// =====================================
// Ajax retrieve Search Results ========
// =====================================
exports.getItems = function(req, res, next) {
	
    var item = {
        keyword: req.body.keyword,
        category: req.body.category,
        minAuctionPrice: Number(req.body.minSalePrice),
        maxAuctionPrice: Number(req.body.maxSalePrice),
        condition: Number(req.body.condition)
    };
    
    logger.debug(item);
    
    items.getItems(item, function(err, results) {
		if (err) {
			return next(err);			
		} else {	
            logger.debug(results);
			res.json(results);		
		}
	});
    
};


// =====================================
// Add a new ITEM ======================
// =====================================
exports.insertUpdate = function(req, res, done) {
    req.session.returnTo = req.url;	
    
    // insert a new item
    if (req.body.itemId == '') {
        
        var newDate = new Date();
        var addedDays = req.body.auctionLength;
        var a;
        if (Number(req.body.getItNowPrice) == 0){
            a = null;
        }
        else{
            a = Number(req.body.getItNowPrice);
        }
        var item = {
            itemid: req.body.itemId,
            itemname: req.body.itemName,
            description: req.body.description,
            Cond: Number(req.body.condition),
            Returnable: (req.body.returnable === "true"),
            Auction_Start_Datetime: new Date(newDate.getTime()).toISOString().substring(0,19).replace('T',' '),
            Min_Sale_Price: Number(req.body.minSalePrice),
            Get_It_Now_Price: a,
            Auction_End_Datetime: new Date(newDate.setTime(newDate.getTime() + addedDays * 86400000 )).toISOString().substring(0,19).replace('T',' '),
            Category: req.body.category,
            Lister_Name: req.user.username,
            Starting_Bid: req.body.startingBid
        };

        logger.debug(item);
        
        items.insert(req, item, function(err, results) {
            console.log(JSON.stringify(results));
            res.status(301).redirect('/item/sale?id=' + results);

        });
    } else if (req.body.myBidPrice != null) { // insert/update your bid price
        var item = {
            itemid: req.body.itemId,
            myBidPrice: req.body.myBidPrice
        };
        logger.debug(JSON.stringify(req.body.myBidPrice))
        logger.debug(item);
        
        items.insert(req, item, function(err, results) {
            console.log(JSON.stringify(results));
            res.status(301).redirect('/item/sale?id=' + results);

        });
    } else {
        // update the item description
        var item = {
            itemid: req.body.itemId,
            description: req.body.description
        };
        
        logger.debug(item);
        
        items.update(req, item, function(err, results) {
            if (!results) {
                logger.debug('item update failed!');
                logger.debug(req.flash('error'));
                
                res.render('auction', {
                    title: 'Edit Item',
                    menugroup: 'auction',
                    submenu: '',
                    itemId: item.itemid,
                    description: item.description,
                    messages: req.flash('error') || req.flash('info'),
                    backUrl: req.url,
                    userid: req.user.username,
                    username: req.user.firstName + ' ' + req.user.lastName,
                    position: req.user.position,
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });

            } else {
                res.status(301).redirect('/item/sale?id=' + item.itemid);
            }
        });
    }
	
};


// =====================================
// Get it Now ==========================
// =====================================
exports.getItNow = function(req, res, done) {
    req.session.returnTo = req.url;	
    
    // insert a new bid
    if (req.query.id != '') {
        
        var newDate = new Date();
        var item = {
            itemid: req.query.id,
            username: req.user.username
        };

        logger.debug(item);

        bids.insert(req, item, function(err, results) {
          if (!results) {
            res.status(301).redirect('/item/sale?id=' + item.itemid);
          } else {
            res.status(301).redirect('/item/list');
          }
        });
    } 
	
};


// =====================================
// ITEM DETAIL =========================
// =====================================
exports.sale = function(req, res, done) {
    req.session.returnTo = req.url;	
    logger.debug('req.url=' + req.url);

    var item = {
        itemid: req.query.id,
        messages: req.flash('error') || req.flash('info')
    }
    
    logger.debug('item.itemid = ' + item.itemid);

	items.getItem(item, function(err, results) {
        logger.debug(results);    
        //item = JSON.parse(results);
        
        item.description = results[0].Description;
        logger.debug('results[0].Description = ' + results[0].Description);    

        item.itemName = results[0].Item_Name;
        item.category = results[0].Category;
        
        switch (results[0].Cond) {
            case 5:
                item.condition = 'New';
                break;
            case 4:
                item.condition = 'Very Good';
                break;
            case 3:
                item.condition = 'Good';
                break;
            case 2:
                item.condition = 'Fair';
                break;
            default:
                item.condition = 'Poor';
        }
        
        item.startingBid = results[0].Starting_Bid;
        item.minSalePrice = results[0].Min_Sale_Price;
        item.getItNowPrice = results[0].Get_It_Now_Price;
        item.listerName = results[0].Lister_Name;
        
        if (results[0].Returnable)
            item.returnable = "Yes";
        else 
            item.returnable = "No";
        
        item.auctionEndTime = results[0].Auction_End_Datetime;
    
        logger.debug('backUrl=' + req.url);
        
        res.render('sale', {
                    title: 'Item for Sale',
                    menugroup: 'sale',
                    submenu: '',
                    itemId: item.itemid,
                    itemName: item.itemName,
                    description: item.description,
                    category: item.category,
                    condition: item.condition,
                    startingBid: item.startingBid,
                    minSalePrice: item.minSalePrice,
                    auctionLength: item.auctionEndTime,
                    getItNowPrice: item.getItNowPrice,
                    returnable: item.returnable,
                    listerName: item.listerName,
                    backUrl: req.url,
                    messages: req.flash('error') || req.flash('info'),
                    userid: req.user.username,
                    username: req.user.firstName + ' ' + req.user.lastName,
                    position: req.user.position,
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });
    });
    
};

// =====================================
// ITEM Rating Form ====================
// =====================================
exports.rate = function(req, res, done) {
    var item = {
        itemid: req.query.id
    }
    
    logger.debug('item.itemid = ' + item.itemid);

	items.getItem(item, function(err, results) {
        logger.debug(results);    
        //item = JSON.parse(results);
        
        item.description = results[0].Description;
        logger.debug('results[0].Description = ' + results[0].Description);    

        item.itemName = results[0].Item_Name;
    
        req.session.returnTo = req.url;	

        res.render('sale-rate', {
                    title: 'Item Rating',
                    menugroup: 'sale',
                    submenu: '',
                    itemId: item.itemid,
                    itemName: item.itemName,
                    rate: '',
                    backUrl: req.url,
                    userid: req.user.username,
                    username: req.user.firstName + ' ' + req.user.lastName,
                    position: req.user.position,
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });
    });
    
};
