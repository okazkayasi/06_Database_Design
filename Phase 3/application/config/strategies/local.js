var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),
	mysql = require('mysql'),
    dbconfig = require('../mysql'),
    db = mysql.createConnection(dbconfig.connection);

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
            db.query("SELECT * FROM USER WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    console.log('passport.use.local-signup rows.length   ======');
                    return done(null, false, req.flash('error', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var user = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    };

                    var insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

                    db.query(insertQuery,[user.username, user.password, user.firstName, user.lastName],function(err, rows) {
                        if (err)
                          return done(err);
                        
                        console.log('passport.use.local-signup = ' + user.firstName + ' ' + user.lastName + ' (' + user.username + ')');
                        return done(null, user);
                    });
                }
            });
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
            db.query("SELECT * FROM USER WHERE Username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('error', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].Password))
                    return done(null, false, req.flash('error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                var user = {
                        username: rows[0].Username,
                        firstName: rows[0].First_Name,
                        lastName: rows[0].Last_Name
                    };
                
                console.log('passport.use.local-login = ' + user.firstName + ' ' + user.lastName + ' (' + user.username + ')');
                
                return done(null, user);
            });
        })
    );
};