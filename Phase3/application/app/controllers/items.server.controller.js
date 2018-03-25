var config = require('../../config/config'),
	passport = require('passport');

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

exports.add = function(req, res) {
	
	req.session.returnTo = req.url;	
	
    res.render('auction', {
				title: 'Added Item for Auction',
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
