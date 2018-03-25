process.env.NODE_ENV = process.env.NODE_ENV || 'local';

module.exports = require('./env/' + process.env.NODE_ENV + '.js');