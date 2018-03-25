var passport = require('passport');

module.exports = function() {
	
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
  
    // used to serialize the user for the session
	passport.serializeUser(function(user, done) {
        done(null, user);
	});
	
    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
	});
  
	require('./strategies/local.js')();
};