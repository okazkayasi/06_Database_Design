var config = require('../config/config');

module.exports = {
    connection: {
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword
    },
	database: config.db,
    users_table: 'users'
};