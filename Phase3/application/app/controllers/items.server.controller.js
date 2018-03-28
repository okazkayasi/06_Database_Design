/*
 business logic for ITEM related tasks
*/
var config = require('../../config/config'),
    items = require('../model/items.server.model'),
    logger = require('../../config/logger');;

// =====================================
// FORM for NEW ITEM ===================
// =====================================
exports.auction = function(req, res) {
	
	req.session.returnTo = req.url;	
	
    res.render('auction', {
				title: 'New Item for Auction',
                menugroup: 'auction',
                submenu: '',
                itemName: '',
                description: '',
                category: '',
                condition: '',
                startingBid: '',
                minSalePrice: '',
                auctionLength: '',
                getItNowPrice: '',
                returnable: '',
				userid: req.user.username,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});
    
};


// =====================================
// ITEM SEARCH FORM ====================
// =====================================
exports.search = function(req, res) {
	
	req.session.returnTo = req.url;	
	
    res.render('search', {
				title: 'Item Search',
                menugroup: 'search',
                submenu: '',
                itemName: '',
                description: '',
                category: '',
                condition: '2',
                startingBid: '',
                minSalePrice: '',
                auctionLength: '',
                getItNowPrice: '',
                returnable: '',
				userid: req.user.username,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});
    
};


// =====================================
// Display Search Results ==============
// =====================================
exports.getItems = function(req, res) {
	
	req.session.returnTo = req.url;	
	
    res.render('search-result', {
				title: 'Item Search Result',
                menugroup: 'search',
                submenu: '',
                itemName: '',
                description: '',
                category: '',
                condition: '2',
                startingBid: '',
                minSalePrice: '',
                auctionLength: '',
                getItNowPrice: '',
                returnable: '',
				userid: req.user.username,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});
    
};


// =====================================
// Add a new ITEM ======================
// =====================================
exports.create = function(req, res, done) {
	var newDate = new Date();
    var addedDays = req.body.auctionLength;
    
    var item = {
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
    
    items.create(item, function(err, results) {
        
        req.session.returnTo = req.url;	
        res.status(301).redirect('/item/sale?id=' + results);
    
    });
	
};

// =====================================
// ITEM DETAIL =========================
// =====================================
exports.sale = function(req, res, done) {
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
    
        req.session.returnTo = req.url;	

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
                    userid: req.user.username,
                    username: req.user.firstName + ' ' + req.user.lastName,
                    membersince: req.user.created,
                    sessionTimeOut: 'yes',
                    sessionTimeOutDuration: config.sessionTimeOutDuration
                });
    });
    
    //items.getAll(function(err, results) {
    //    logger.debug(results[0]);    
    //});
    
    
    
};
