var express = require('express');
var router = express.Router();

// Get Charity Page
router.get('/charityInfo',ensureAuthenticated, function(req, res){
	res.render('charityInfo');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/charity/login');
	}
}

// Add info
router.post('/charityInfo', function(req, res){
	var requirement = req.body.requirement;
	var city = req.body.city;
	var contact = req.body.contact;

	// Validation
	req.checkBody('requirement', 'Requirement is required').notEmpty();
	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('contact', 'Contact is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('charityInfo',{
			errors:errors
		});
	} else {
		var newUser = new UserCharity({
			requirement: requirement,
			city:city,
			contact: contact
		});

		UserCharity.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Your information is recorded!');

		res.redirect('/charity/login');
	}
});
module.exports = router;
