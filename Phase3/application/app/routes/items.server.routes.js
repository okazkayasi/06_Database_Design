/*
 request routing for ITEM related tasks
*/

var config = require('../../config/config'),
    items = require('../controllers/items.server.controller'),
    utils = require('./utils'),
    logger = require('../../config/logger');

module.exports = function(app, passport) {
  // =====================================
  // Homepage after logging in ===========
  // =====================================
  app.get('/', utils.ensureAuthenticated, items.search);

  // =====================================
  // FORM for NEW ITEM ===================
  // =====================================
  app.route('/item/auction')
      .get(utils.ensureAuthenticated, items.auction)  // show the item register form
      .post(utils.ensureAuthenticated, items.insertUpdate);	

  // =====================================
  // ITEM SEARCH FORM ====================
  // =====================================
  app.route('/item/search')
      .get(utils.ensureAuthenticated, items.search)  // show the item search form
      .post(utils.ensureAuthenticated, items.searchResult);	// show item search result

  app.route('/item/list')
      .get(utils.ensureAuthenticated, items.searchResult);  // list the items for sale
  
  app.route('/item/result')
      .get(utils.ensureAuthenticated, items.auctionResult);  // list the items for sale

  app.route('/item/sale-rate')
      .get(utils.ensureAuthenticated, items.rate);  // show the item rating form 
  
  app.route('/item/ajax/search')
      .post(utils.ensureAuthenticated, items.getItems);  // retrieve the search result

  // =====================================
  // ITEM DETAIL =========================
  // =====================================
  app.route('/item/sale')
      .get(utils.ensureAuthenticated, items.sale)  // show the item sale form
      .post(utils.ensureAuthenticated, items.sale);	
};