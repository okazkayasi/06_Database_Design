var config = require('./config'),
	mysql = require('mysql');

module.exports = {
    connection : {
      host     : config.dbHost,
      user     : config.dbUser,
      password : config.dbPassword,
      port     : config.dbPort,
      database : config.db
    }
};