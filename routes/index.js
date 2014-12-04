var express = require('express');
var router = express.Router();

var indexCtr = require('../controlls/admin/index_controller');
var userCtr = require('../controlls/admin/user_controller');

/* index */
router.route('/')
	.get(function (req, res){
		res.redirect('/login');
	});

/*  login   */
router.route('/login')
		.get(userCtr.init)
		.post(userCtr.login);

/* /admin/index */
router.route('/admin/index')
		.get(indexCtr.init);

module.exports = router;
