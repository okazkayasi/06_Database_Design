/*
 business logic for ITEM related tasks
*/

var config = require('../../config/config');

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
