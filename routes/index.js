var express = require('express');
var router = express.Router();

var indexCtr = require('../controlls/index_controller');
var userCtr = require('../controlls/customer_controller');

/* index */
router.route('/')
	.get(function (req, res){
		res.redirect('/signIn');
	});

/*  singIn   */
router.route('/signIn')
		.get(userCtr.signInPage)
		.post(userCtr.signIn);


module.exports = router;
