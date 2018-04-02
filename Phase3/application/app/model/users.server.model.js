/*
 Database queries for USER related tasks
*/
var bcrypt = require('bcrypt-nodejs'),
    mysql = require('mysql'),
    dbconfig = require('../../config/mysql'),
    db = mysql.createConnection(dbconfig.connection),
    logger = require('../../config/logger');

// =====================================
// Register a new USER =================
// =====================================
exports.signUp = function(req, username, password, done) {
    // find a user whose username is the same as the forms username
    // we are checking to see if the user trying to login already exists
    
    db.query("SELECT * FROM USER WHERE username = ?", [username], function(err, rows) {
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

            var insertQuery = "INSERT INTO USER ( Username, Password, First_Name, Last_Name ) values (?,?,?,?)";

            db.query(insertQuery,[user.username, user.password, user.firstName, user.lastName],function(err, rows) {
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
    
    db.query("SELECT u.*, a.Position FROM USER u LEFT JOIN ADMIN_USER a ON u.Username = a.Username WHERE u.Username = ?",[username], function(err, rows){
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