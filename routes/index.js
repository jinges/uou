var express = require('express');
var router = express.Router();

var indexCtr = require('../controlls/index_controller');
var customerCtr = require('../controlls/customer_controller');

/* index */
router.route('/')
	.get(function (req, res){
		res.render("index", {title:"首页"});
	});

/*  singIn   */
// router.route('/signIn')
// 		.get(customerCtr.signInPage)
// 		.post(customerCtr.signIn);


module.exports = router;
