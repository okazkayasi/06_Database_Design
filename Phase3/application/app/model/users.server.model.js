/*
 Database queries for USER related tasks
*/
var bcrypt = require('bcrypt-nodejs'),
    mysql = require('mysql'),
    dbconfig = require('../../config/mysql'),
    db = mysql.createConnection(dbconfig.connection),
    sqls = require('./sqls.server.model'),
    logger = require('../../config/logger');

// =====================================
// Register a new USER =================
// =====================================
exports.signUp = function(req, username, password, done) {
    // find a user whose username is the same as the forms username
    // we are checking to see if the user trying to login already exists
    
    db.query(sqls.user(1), [username], function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            logger.debug('passport.use.local-signup rows.length   ======');
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

            db.query(sqls.user(2),[user.username, user.password, user.firstName, user.lastName],function(err, rows) {
                if (err)
                  return done(err);

                logger.debug('passport.use.local-signup = ' + user.firstName + ' ' + user.lastName + ' (' + user.username + ')');
                return done(null, user);
            });
        }
    });
}

// =====================================
// Authenticate the user ===============
// =====================================
exports.signIn = function(req, username, password, done) {
    // find a user whose username and password are the same
    
    db.query(sqls.user(3),[username], function(err, rows){
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
                lastName: rows[0].Last_Name,
                position: rows[0].Position
            };

        logger.debug('passport.use.local-login = ' + user.firstName + ' ' + user.lastName + ' (' + user.username + ')');

        return done(null, user);
    });
}