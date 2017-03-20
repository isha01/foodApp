var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/restaurantInfo', ensureAuthenticated, function(req, res){
	res.render('restaurantInfo');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/restaurants/login');
	}
}
// restaurant info
router.post('/register', function(req, res){
	var availability = req.body.availability;
	var city = req.body.city;
	var contact = req.body.contact;

	// Validation
	req.checkBody('availability', 'Availability is required').notEmpty();
	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('contact', 'Contact is required').notEmpty();


	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			requirement: requirement,
			city:city,
			contact: contact
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Your information is recorded!');

		res.redirect('/restaurants/login');
	}
});
module.exports = router;
