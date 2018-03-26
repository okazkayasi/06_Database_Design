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
// Add a new ITEM ======================
// =====================================
exports.create = function(req, res, next, done) {
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
    
    console.log(item);
    
    items.create(item, done);
    
	req.session.returnTo = req.url;	
	
};

// =====================================
// ITEM DETAIL =========================
// =====================================
exports.sale = function(req, res) {
	req.session.returnTo = req.url;	
	
    res.render('sale', {
				title: 'Item for Sale',
                menugroup: 'sale',
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
