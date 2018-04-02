var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');

module.exports = function() {
	var app = express();
	
	if (process.env.NODE_ENV === 'local') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
  
    // set view engine
    app.set('views', './app/views');
	app.set('view engine', 'ejs');
  
    // required for passport
	app.use(session({
		saveUninitialized: true,
		rolling: true,
		resave: true,
		secret: config.sessionSecret,
        cookie: { maxAge : config.sessionCookieDuration } 
	})); // session secret
	
	app.use(flash());  // use connect-flash for flash messages stored in session
	app.use(passport.initialize());
	app.use(passport.session());  // persistent login sessions
	
	app.use('/static', express.static('./public'));

    // routes ======================================================================
    require('../app/routes/users.server.routes.js')(app, passport);
    require('../app/routes/items.server.routes.js')(app, passport);
    require('../app/routes/reports.server.routes.js')(app, passport);
	
	return app;
};