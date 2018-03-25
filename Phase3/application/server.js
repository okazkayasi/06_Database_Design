process.env.NODE_ENV = process.env.NODE_ENV || 'local';

var express = require('./config/express'),
	passport = require('./config/passport');

var app = express();
var passport = passport();

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
	console.log('Node environment is ' + process.env.NODE_ENV)
	console.log('Node app is running on port', app.get('port'));
});

module.exports = app;