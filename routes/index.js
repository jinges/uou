var express = require('express');
var router = express.Router();

var indexCtr = require('../controlls/index_controller');
var merchantCtr = require('../controlls/merchant_controller');
var customerCtr = require('../controlls/customer_controller');
var categoryCtr = require('../controlls/category_controller');

/* default */
router.route('/')
	.get(function (req, res){
		res.redirect('/signup');
	});

/*  sign up  */
router.route('/signup')
	.get(merchantCtr.initSignUp)
	.post(merchantCtr.signUp);

/*  logn In   */
router.route('/login')
	.get(merchantCtr.initLogIn)
	.post(merchantCtr.logIn);

/*    admin/index      */
router.route('/admin/index')
	.get(indexCtr.initPage);

/*    admin/customer       */
router.route('/admin/customer')
	.get(customerCtr.initCustomer);
router.get('/api/selCustomers', customerCtr.selCustomers);	
// router.get('/api/delCustomer', customerCtr.delCustomer);

/*    admin/category        */
router.route('/admin/category')
	.get(categoryCtr.initCategory);
router.route('/admin/editcategory')
	.get(categoryCtr.initEditCategory);

module.exports = router;
