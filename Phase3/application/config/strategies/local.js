var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),
	mysql = require('mysql'),
    dbconfig = require('../mysql'),
    db = mysql.createConnection(dbconfig.connection),
    users = require('../../app/model/users.server.model');

module.exports = function() {
	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to login already exists
            users.signUp(req, username, password, done);
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with username and password from our form
            users.signIn(req, username, password, done);
        })
    );
};