var  async = require('async');

var Customer = require('../models/customer_model');
var unit = require('../unit/index');

var customerCtr = {
	init: function ( req, res) {
		unit.init(req, res, 'login', '会员登录');
	},
	login: function (req, res){
		var userName=req.body.userName;
		var passWord= req.body.userPassWord;
		var rememberUser = req.body.rememberUser;

		passWord= unit.setPassword( passWord )
		var query={'userName': userName, 'passWord': passWord};
		async.waterfall([
			function (callback) {
				Merchant.findOne(query, function (err, user) {
					if (err) {
						callback(err);
					}
					else if(!user){
						callback("用户名或密码错误！");
					} else {
						callback(null, user);
					}
				});
			},
			function (user, callback) {
				// 2 score for login
				Merchant.upScore( user._id, 2, function (err) {
					err ? callback(err) : callback(null, user);
				});
			},
			function (user, callback) {
				Merchant.upLogDate(user._id, function (err) {
					err ? callback(err) : callback(null, user);
				});
			}
			], function (err, result){
				if(err) {
				    req.flash('error', err);
					return res.redirect("/");
				}

				if( rememberUser ){
					result.rememberUser=true;
				}

				result.score+=1;
				req.session.user=result;
	 			return res.redirect('/admin/index');
			})
	},
}