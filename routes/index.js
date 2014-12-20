var express = require('express');
var router = express.Router();

var indexCtr = require('../controlls/index_controller');
var merchantCtr = require('../controlls/merchant_controller');

/* index */
router.route('/')
	.get(function (req, res){
		res.redirect('/signup');
	});
/*  sign up  */
router.route('/signup')
	.get(merchantCtr.initSignUp)
	.post(merchantCtr.signUp);
/*  singIn   */
// router.route('/signIn')
// 		.get(customerCtr.signInPage)
// 		.post(customerCtr.signIn);


module.exports = router;
