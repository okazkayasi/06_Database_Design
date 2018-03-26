/*
 request routing for ITEM related tasks
*/

var config = require('../../config/config'),
    users = require('../controllers/users.server.controller'),
    utils = require('./utils'),
    logger = require('../../config/logger');

module.exports = function(app, passport) {
  
    // =====================================
	// LOGIN ===============================
	// =====================================	
    app.route('/user/signin')
		.get(users.renderSignin)  // show the login form
        .post(passport.authenticate('local-login', {   // process the login form
			successRedirect: '/',  // redirect to the secure home section
			failureRedirect: '/user/signin',  // redirect back to the signin page if there is an error
			failureFlash: true
		    }));
  
	
	// =====================================
	// SIGNUP ==============================
	// =====================================
    app.route('/user/signup')
		.get(users.renderSignup)  // show the signup form
		.post(passport.authenticate('local-signup', {
		    successRedirect: '/',  // redirect to the secure home section
		    failureRedirect : '/user/signup', // redirect back to the signup page if there is an error
		    failureFlash : true // allow flash messages
	     }));
  
  
	app.get('/user/signout', users.signout);
	
};