var config = require('../../config/config'),
    items = require('../controllers/items.server.controller'),
    utils = require('./utils');

module.exports = function(app, passport) {
    app.get('/', utils.ensureAuthenticated, items.auction);
    
    app.route('/item/auction')
		.get(utils.ensureAuthenticated, items.auction)  // show the item register form
        .post(utils.ensureAuthenticated, items.add);	
    
    app.route('/item/search')
		.get(utils.ensureAuthenticated, items.search)  // show the item search form
        .post(utils.ensureAuthenticated, items.search);	
    
    app.route('/item/sale')
		.get(utils.ensureAuthenticated, items.sale)  // show the item sale form
        .post(utils.ensureAuthenticated, items.sale);	
};