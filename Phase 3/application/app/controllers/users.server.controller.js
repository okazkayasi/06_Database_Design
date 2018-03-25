
exports.renderSignin = function(req, res, next) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
  console.log('renderSignin======');
  
	if (!req.user) {
		res.render('signin', {
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		
		return res.status(301).redirect(req.pagetogo, { 
			user : req.user 
		});
	}
};

exports.renderSignup = function(req, res, next) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
    
	req.logout();
	
    console.log('renderSignup======');
  
	res.render('signup', {
			messages: req.flash('error'),
			firstName: req.flash('firstName'),
			lastName: req.flash('lastName'),
			email: req.flash('email'),
			username: req.flash('username'),
			password: req.flash('password')
	});
}

exports.signout = function(req, res) {
	req.logout();
	res.status(301).redirect('/');
};
