/*
 request routing for ITEM related tasks
*/

var config = require('../../config/config'),
    reports = require('../controllers/reports.server.controller'),
    utils = require('./utils'),
    logger = require('../../config/logger');

module.exports = function(app, passport) {
    
    // =====================================
    // Reports =============================
    // =====================================
    app.route('/report/category')
		.get(utils.ensureAuthenticated, reports.category);  // show the category report
  
    app.route('/report/user')
		.get(utils.ensureAuthenticated, reports.user);  // show the user report
    
};