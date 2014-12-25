var express = require('express');
var router = express.Router();

var indexCtr = require('../controlls/index_controller');
var merchantCtr = require('../controlls/merchant_controller');

/* index */
router.route('/')
	.get(function (req, res){
		res.redirect('/login');
	});

/*  sign up  */
router.route('/signup')
	.get(merchantCtr.initSignUp)
	.post(merchantCtr.signUp);

/*  singIn   */
router.route('/logIn')
	.get(merchantCtr.initLogIn)
	.post(merchantCtr.logIn);

module.exports = router;
