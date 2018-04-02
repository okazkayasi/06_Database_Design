/*
 business logic for ITEM related tasks
*/
var config = require('../../config/config'),
    items = require('../model/items.server.model'),
    logger = require('../../config/logger');

// =====================================
// FORM for NEW ITEM ===================
// =====================================
exports.auction = function(req, res) {
    req.session.returnTo = req.url;	

    if (req.query.id != null) {
        var item = {
            itemid: req.query.id
        }

        logger.debug('item.itemid = ' + item.itemid);

        items.getItem(item, function(err, results) {
            logger.debug(results);    
            //item = JSON.parse(results);

            item.description = results[0].Description;
            logger.debug('results[0].Description = ' + results[0].Description);    
            
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
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });

        });
    } else {
    
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
                messages: '',
                backUrl: req.url,
                userid: req.user.username,
                username: req.user.firstName + ' ' + req.user.lastName,
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
	
    var item = {
        keyword: req.body.keyword,
        category: req.body.category,
        minAuctionPrice: Number(req.body.minSalePrice),
        maxAuctionPrice: Number(req.body.maxSalePrice),
        condition: Number(req.body.condition)
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
				title: 'Item Search Result',
                menugroup: 'search',
                submenu: '',
                results: jsonResult,
                messages: '',
                backUrl: req.url,
				userid: req.user.username,
				username: req.user.firstName + ' ' + req.user.lastName,
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

        var item = {
            itemid: req.body.itemId,
            itemname: req.body.itemName,
            description: req.body.description,
            Cond: Number(req.body.condition),
            Returnable: (req.body.returnable === "true"),
            Auction_Start_Datetime: new Date().toISOString(),
            Min_Sale_Price: Number(req.body.minSalePrice),
            Get_It_Now_Price: Number(req.body.getItNowPrice),
            Auction_End_Datetime: new Date(newDate.setTime( newDate.getTime() + addedDays * 86400000 )).toISOString(),
            Category: req.body.category,
            Lister_Name: req.user.username
        };

        logger.debug(item);
        
        items.insert(req, item, function(err, results) {

            res.status(301).redirect('/item/sale?id=' + results);

        });
    } else if (req.body.myBidPrice != null) { // insert/update your bid price
        var item = {
            itemid: req.body.itemId,
            myBidPrice: req.body.myBidPrice
        };

        logger.debug(item);
        
        items.insert(req, item, function(err, results) {

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
            case 1:
                item.condition = 'New';
                break;
            case 2:
                item.condition = 'Very Good';
                break;
            case 3:
                item.condition = 'Good';
                break;
            case 4:
                item.condition = 'Fair';
                break;
            default:
                item.condition = 'Poor';
        }
        
        item.startingBid = results[0].Min_Sale_Price;
        item.minSalePrice = results[0].Min_Sale_Price;
        item.getItNowPrice = results[0].Get_It_Now_Price;
        
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
                    backUrl: req.url,
                    userid: req.user.username,
                    username: req.user.firstName + ' ' + req.user.lastName,
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
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });
    });
    
};
